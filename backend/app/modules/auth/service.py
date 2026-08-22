import logging
import uuid
from datetime import datetime, timedelta, timezone
from typing import Any, Dict, Optional

import httpx
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.security import (
    create_access_token,
    create_refresh_token,
    decode_token,
    generate_random_token,
    get_password_hash,
    hash_token,
    verify_password,
)
from app.modules.auth.model import AuthSession, PasswordResetToken, User
from app.modules.auth.repository import AuthRepository
from app.modules.auth.schema import (
    ChangePasswordRequest,
    ForgotPasswordRequest,
    GoogleLoginRequest,
    LoginRequest,
    RegisterRequest,
    ResetPasswordRequest,
    TokenResponse,
    UserResponse,
)

logger = logging.getLogger("app.auth")


class AuthService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.repo = AuthRepository(db)

    async def _issue_tokens_and_create_session(
        self,
        user: User,
        user_agent: Optional[str] = None,
        ip_address: Optional[str] = None,
    ) -> TokenResponse:
        session_id = str(uuid.uuid4())
        expires_at = datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)

        # Generate refresh token containing session_id (jti)
        raw_refresh_token = create_refresh_token(subject=user.id, session_id=session_id)
        refresh_hash = hash_token(raw_refresh_token)

        auth_session = AuthSession(
            id=session_id,
            user_id=user.id,
            refresh_token_hash=refresh_hash,
            expires_at=expires_at,
            user_agent=user_agent[:500] if user_agent else None,
            ip_address=ip_address[:64] if ip_address else None,
            last_used_at=datetime.now(timezone.utc),
        )
        await self.repo.create_session(auth_session)

        raw_access_token = create_access_token(
            subject=user.id,
            role=user.role,
            email=user.email,
        )

        user_resp = UserResponse.model_validate(user)

        return TokenResponse(
            access_token=raw_access_token,
            refresh_token=raw_refresh_token,
            token_type="bearer",
            user=user_resp,
        )

    async def register(
        self,
        data: RegisterRequest,
        user_agent: Optional[str] = None,
        ip_address: Optional[str] = None,
    ) -> TokenResponse:
        existing_user = await self.repo.get_user_by_email(data.email)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email address is already registered",
            )

        hashed_pw = get_password_hash(data.password)
        user = User(
            name=data.name,
            email=data.email,
            password_hash=hashed_pw,
            role="user",
            provider="local",
            is_active=True,
        )
        user = await self.repo.create_user(user)

        return await self._issue_tokens_and_create_session(user, user_agent, ip_address)

    async def login(
        self,
        data: LoginRequest,
        user_agent: Optional[str] = None,
        ip_address: Optional[str] = None,
    ) -> TokenResponse:
        user = await self.repo.get_user_by_email(data.email)
        if not user or not user.password_hash or not verify_password(data.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )

        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User account is deactivated",
            )

        return await self._issue_tokens_and_create_session(user, user_agent, ip_address)

    async def login_with_google(
        self,
        data: GoogleLoginRequest,
        user_agent: Optional[str] = None,
        ip_address: Optional[str] = None,
    ) -> TokenResponse:
        # Verify token with Google or development fallback
        google_user_info = await self._verify_google_id_token(data.id_token)

        google_sub = google_user_info["sub"]
        email = google_user_info["email"].lower().strip()
        name = google_user_info.get("name", "Google User")
        picture = google_user_info.get("picture")

        # 1. Look up user by Google provider mapping
        user = await self.repo.get_user_by_provider("google", google_sub)
        if not user:
            # 2. Look up user by email
            user = await self.repo.get_user_by_email(email)
            if user:
                # Link existing email account with Google provider
                user.provider = "google"
                user.provider_user_id = google_sub
                if picture and not user.profile_photo:
                    user.profile_photo = picture
                await self.repo.update_user(user)
            else:
                # Create brand new user
                user = User(
                    name=name,
                    email=email,
                    password_hash=None,
                    role="user",
                    provider="google",
                    provider_user_id=google_sub,
                    profile_photo=picture,
                    is_active=True,
                )
                user = await self.repo.create_user(user)

        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User account is deactivated",
            )

        return await self._issue_tokens_and_create_session(user, user_agent, ip_address)

    async def _verify_google_id_token(self, id_token: str) -> Dict[str, Any]:
        """Verifies Google ID token via Google tokeninfo endpoint or dev fallback."""
        if settings.is_development and id_token.startswith("dev_test_token_"):
            return {
                "sub": f"google_dev_{id_token}",
                "email": f"{id_token}@example.com",
                "name": "Dev Google User",
                "picture": None,
            }

        url = f"https://oauth2.googleapis.com/tokeninfo?id_token={id_token}"
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.get(url)
            if resp.status_code != 200:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid Google ID token",
                )
            payload = resp.json()
            if settings.GOOGLE_CLIENT_ID and payload.get("aud") != settings.GOOGLE_CLIENT_ID:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Google token audience mismatch",
                )
            return payload

    async def refresh_token(
        self,
        refresh_token_str: str,
        user_agent: Optional[str] = None,
        ip_address: Optional[str] = None,
    ) -> TokenResponse:
        payload = decode_token(refresh_token_str)
        if not payload or payload.get("type") != "refresh":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token",
            )

        session_id = payload.get("jti")
        user_id = payload.get("sub")
        if not session_id or not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Malformed refresh token claims",
            )

        session = await self.repo.get_session(session_id)
        if not session:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Auth session not found or revoked",
            )

        if session.revoked_at or (session.expires_at and session.expires_at < datetime.now(timezone.utc)):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Auth session expired or revoked",
            )

        # Verify refresh token hash matches stored hash
        if session.refresh_token_hash != hash_token(refresh_token_str):
            # Potential token theft! Revoke session immediately
            await self.repo.revoke_session(session.id)
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token hash",
            )

        # Revoke old session (Rotation)
        await self.repo.revoke_session(session.id)

        user = await self.repo.get_user_by_id(int(user_id))
        if not user or not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User account inactive or not found",
            )

        # Issue new session and token pair
        return await self._issue_tokens_and_create_session(user, user_agent, ip_address)

    async def logout(self, refresh_token_str: Optional[str]) -> Dict[str, str]:
        if refresh_token_str:
            payload = decode_token(refresh_token_str)
            session_id = payload.get("jti")
            if session_id:
                await self.repo.revoke_session(session_id)

        return {"detail": "Successfully logged out"}

    async def forgot_password(self, email: str) -> Dict[str, str]:
        user = await self.repo.get_user_by_email(email)
        if user and user.is_active:
            raw_token = generate_random_token(32)
            token_hash = hash_token(raw_token)
            expires_at = datetime.now(timezone.utc) + timedelta(minutes=15)

            reset_obj = PasswordResetToken(
                user_id=user.id,
                token_hash=token_hash,
                expires_at=expires_at,
            )
            await self.repo.create_password_reset_token(reset_obj)

            if settings.is_development or settings.DEBUG:
                logger.info(
                    f"[DEV RESET LINK] Password reset token for {user.email}: token={raw_token}"
                )

        return {
            "detail": "If the email is registered, password reset instructions have been sent."
        }

    async def reset_password(self, data: ResetPasswordRequest) -> Dict[str, str]:
        t_hash = hash_token(data.token)
        token_obj = await self.repo.get_valid_password_reset_token(t_hash)
        if not token_obj:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid or expired password reset token",
            )

        user = await self.repo.get_user_by_id(token_obj.user_id)
        if not user or not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User not found or inactive",
            )

        user.password_hash = get_password_hash(data.new_password)
        await self.repo.update_user(user)

        await self.repo.mark_password_reset_token_used(token_obj.id)
        await self.repo.revoke_all_user_sessions(user.id)

        return {"detail": "Password successfully reset. Please log in with your new password."}

    async def change_password(self, user_id: int, data: ChangePasswordRequest) -> Dict[str, str]:
        user = await self.repo.get_user_by_id(user_id)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
            )

        if not user.password_hash or not verify_password(data.current_password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Incorrect current password",
            )

        user.password_hash = get_password_hash(data.new_password)
        await self.repo.update_user(user)

        # Revoke sessions
        await self.repo.revoke_all_user_sessions(user.id)

        return {"detail": "Password successfully updated. Please log in with your new password."}
