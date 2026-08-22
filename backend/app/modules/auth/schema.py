import re
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field, field_validator

EMAIL_REGEX = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"


def validate_email_str(v: str) -> str:
    v = v.strip().lower()
    if not re.match(EMAIL_REGEX, v):
        raise ValueError("Invalid email address format")
    return v


class RegisterRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=255, description="Full name of user")
    email: str = Field(..., description="User email address")
    password: str = Field(..., min_length=6, max_length=128, description="User password")

    @field_validator("email", mode="after")
    @classmethod
    def validate_email(cls, v: str) -> str:
        return validate_email_str(v)


class LoginRequest(BaseModel):
    email: str = Field(..., description="User email address")
    password: str = Field(..., description="User password")

    @field_validator("email", mode="after")
    @classmethod
    def validate_email(cls, v: str) -> str:
        return validate_email_str(v)


class GoogleLoginRequest(BaseModel):
    id_token: str = Field(..., description="Google ID Token from OAuth flow")


class RefreshRequest(BaseModel):
    refresh_token: str = Field(..., description="JWT Refresh Token")


class LogoutRequest(BaseModel):
    refresh_token: Optional[str] = Field(None, description="JWT Refresh Token to revoke")


class ForgotPasswordRequest(BaseModel):
    email: str = Field(..., description="Registered user email address")

    @field_validator("email", mode="after")
    @classmethod
    def validate_email(cls, v: str) -> str:
        return validate_email_str(v)



class ResetPasswordRequest(BaseModel):
    token: str = Field(..., description="Password reset token received via email/log")
    new_password: str = Field(..., min_length=6, max_length=128, description="New password")


class ChangePasswordRequest(BaseModel):
    current_password: str = Field(..., description="Current password")
    new_password: str = Field(..., min_length=6, max_length=128, description="New password")


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: str
    role: str
    profile_photo: Optional[str] = None
    language: str = "en"
    is_active: bool = True
    provider: str = "local"
    created_at: Optional[datetime] = None


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: UserResponse
