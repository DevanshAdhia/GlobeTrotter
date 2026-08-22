import uuid
from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    ForeignKey,
    Index,
    Integer,
    String,
    UniqueConstraint,
    func,
)
from sqlalchemy.orm import relationship

from app.db.base import Base, TimestampMixin


class User(Base, TimestampMixin):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=True)  # Nullable for Google-only accounts
    role = Column(String(50), nullable=False, default="user")  # 'user' | 'admin'
    profile_photo = Column(String(500), nullable=True)
    language = Column(String(10), nullable=False, default="en")
    is_active = Column(Boolean, nullable=False, default=True)
    provider = Column(String(30), nullable=False, default="local")
    provider_user_id = Column(String(255), nullable=True)

    __table_args__ = (
        UniqueConstraint("provider", "provider_user_id", name="uq_user_provider_identity"),
    )

    # Relationships
    sessions = relationship("AuthSession", back_populates="user", cascade="all, delete-orphan")
    password_reset_tokens = relationship("PasswordResetToken", back_populates="user", cascade="all, delete-orphan")
    trips = relationship("Trip", back_populates="user", cascade="all, delete-orphan")
    reviews = relationship("Review", back_populates="user", cascade="all, delete-orphan")
    saved_destinations = relationship("SavedDestination", back_populates="user", cascade="all, delete-orphan")
    reports = relationship("Report", back_populates="reporter", cascade="all, delete-orphan")


class AuthSession(Base, TimestampMixin):
    __tablename__ = "auth_sessions"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    refresh_token_hash = Column(String(255), nullable=False)
    expires_at = Column(DateTime(timezone=True), nullable=False)
    revoked_at = Column(DateTime(timezone=True), nullable=True)
    user_agent = Column(String(500), nullable=True)
    ip_address = Column(String(64), nullable=True)
    last_used_at = Column(DateTime(timezone=True), nullable=True)

    # Relationships
    user = relationship("User", back_populates="sessions")


class PasswordResetToken(Base):
    __tablename__ = "password_reset_tokens"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    token_hash = Column(String(255), nullable=False, index=True)
    expires_at = Column(DateTime(timezone=True), nullable=False)
    used_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    # Relationships
    user = relationship("User", back_populates="password_reset_tokens")
