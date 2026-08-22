from fastapi import APIRouter, Depends, Request, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_current_user, get_db
from app.modules.auth.model import User
from app.modules.auth.schema import (
    ChangePasswordRequest,
    ForgotPasswordRequest,
    GoogleLoginRequest,
    LoginRequest,
    LogoutRequest,
    RefreshRequest,
    RegisterRequest,
    ResetPasswordRequest,
    TokenResponse,
    UserResponse,
)
from app.modules.auth.service import AuthService

router = APIRouter()


@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED, summary="Register User")
async def register(
    data: RegisterRequest,
    request: Request,
    db: AsyncSession = Depends(get_db),
):
    svc = AuthService(db)
    user_agent = request.headers.get("user-agent")
    client_ip = request.client.host if request.client else None
    return await svc.register(data, user_agent=user_agent, ip_address=client_ip)


@router.post("/login", response_model=TokenResponse, status_code=status.HTTP_200_OK, summary="Login User")
async def login(
    data: LoginRequest,
    request: Request,
    db: AsyncSession = Depends(get_db),
):
    svc = AuthService(db)
    user_agent = request.headers.get("user-agent")
    client_ip = request.client.host if request.client else None
    return await svc.login(data, user_agent=user_agent, ip_address=client_ip)


@router.post("/google", response_model=TokenResponse, status_code=status.HTTP_200_OK, summary="Google OAuth Login")
async def google_login(
    data: GoogleLoginRequest,
    request: Request,
    db: AsyncSession = Depends(get_db),
):
    svc = AuthService(db)
    user_agent = request.headers.get("user-agent")
    client_ip = request.client.host if request.client else None
    return await svc.login_with_google(data, user_agent=user_agent, ip_address=client_ip)


@router.post("/refresh", response_model=TokenResponse, status_code=status.HTTP_200_OK, summary="Refresh Access Token")
async def refresh_token(
    data: RefreshRequest,
    request: Request,
    db: AsyncSession = Depends(get_db),
):
    svc = AuthService(db)
    user_agent = request.headers.get("user-agent")
    client_ip = request.client.host if request.client else None
    return await svc.refresh_token(data.refresh_token, user_agent=user_agent, ip_address=client_ip)


@router.post("/logout", status_code=status.HTTP_200_OK, summary="Logout User")
async def logout(
    data: LogoutRequest,
    db: AsyncSession = Depends(get_db),
):
    svc = AuthService(db)
    return await svc.logout(data.refresh_token)


@router.post("/forgot-password", status_code=status.HTTP_200_OK, summary="Request Password Reset")
async def forgot_password(
    data: ForgotPasswordRequest,
    db: AsyncSession = Depends(get_db),
):
    svc = AuthService(db)
    return await svc.forgot_password(data.email)


@router.post("/reset-password", status_code=status.HTTP_200_OK, summary="Reset Password with Token")
async def reset_password(
    data: ResetPasswordRequest,
    db: AsyncSession = Depends(get_db),
):
    svc = AuthService(db)
    return await svc.reset_password(data)


@router.post("/change-password", status_code=status.HTTP_200_OK, summary="Change Password")
async def change_password(
    data: ChangePasswordRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    svc = AuthService(db)
    return await svc.change_password(current_user.id, data)


@router.get("/me", response_model=UserResponse, status_code=status.HTTP_200_OK, summary="Get Current User Profile")
async def get_me(
    current_user: User = Depends(get_current_user),
):
    return current_user
