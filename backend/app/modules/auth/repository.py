from datetime import datetime, timezone
from typing import Optional
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.auth.model import AuthSession, PasswordResetToken, User


class AuthRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_user_by_email(self, email: str) -> Optional[User]:
        result = await self.db.execute(select(User).where(User.email == email.strip().lower()))
        return result.scalars().first()

    async def get_user_by_id(self, user_id: int) -> Optional[User]:
        result = await self.db.execute(select(User).where(User.id == user_id))
        return result.scalars().first()

    async def get_user_by_provider(self, provider: str, provider_user_id: str) -> Optional[User]:
        result = await self.db.execute(
            select(User).where(
                User.provider == provider,
                User.provider_user_id == provider_user_id,
            )
        )
        return result.scalars().first()

    async def create_user(self, user: User) -> User:
        self.db.add(user)
        await self.db.flush()
        return user

    async def update_user(self, user: User) -> User:
        await self.db.flush()
        return user

    async def create_session(self, session: AuthSession) -> AuthSession:
        self.db.add(session)
        await self.db.flush()
        return session

    async def get_session(self, session_id: str) -> Optional[AuthSession]:
        result = await self.db.execute(select(AuthSession).where(AuthSession.id == session_id))
        return result.scalars().first()

    async def update_session_last_used(self, session_id: str) -> None:
        now = datetime.now(timezone.utc)
        await self.db.execute(
            update(AuthSession).where(AuthSession.id == session_id).values(last_used_at=now)
        )

    async def revoke_session(self, session_id: str) -> None:
        now = datetime.now(timezone.utc)
        await self.db.execute(
            update(AuthSession).where(AuthSession.id == session_id).values(revoked_at=now)
        )

    async def revoke_all_user_sessions(self, user_id: int) -> None:
        now = datetime.now(timezone.utc)
        await self.db.execute(
            update(AuthSession).where(AuthSession.user_id == user_id).values(revoked_at=now)
        )

    async def create_password_reset_token(self, token_obj: PasswordResetToken) -> PasswordResetToken:
        self.db.add(token_obj)
        await self.db.flush()
        return token_obj

    async def get_valid_password_reset_token(self, token_hash: str) -> Optional[PasswordResetToken]:
        now = datetime.now(timezone.utc)
        result = await self.db.execute(
            select(PasswordResetToken).where(
                PasswordResetToken.token_hash == token_hash,
                PasswordResetToken.used_at.is_(None),
                PasswordResetToken.expires_at > now,
            )
        )
        return result.scalars().first()

    async def mark_password_reset_token_used(self, token_id: int) -> None:
        now = datetime.now(timezone.utc)
        await self.db.execute(
            update(PasswordResetToken).where(PasswordResetToken.id == token_id).values(used_at=now)
        )
