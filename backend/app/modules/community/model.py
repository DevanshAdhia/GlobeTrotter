import secrets
from sqlalchemy import CheckConstraint, Column, ForeignKey, Index, Integer, String, Text
from sqlalchemy.orm import relationship

from app.db.base import Base, TimestampMixin


class Share(Base, TimestampMixin):
    __tablename__ = "shares"

    id = Column(Integer, primary_key=True, index=True)
    trip_id = Column(Integer, ForeignKey("trips.id", ondelete="CASCADE"), nullable=False, unique=True, index=True)
    share_token = Column(String(64), unique=True, nullable=False, index=True, default=lambda: secrets.token_urlsafe(32))
    visibility = Column(String(20), nullable=False, default="public")  # public | private

    # Relationships
    trip = relationship("Trip", back_populates="share")


class Review(Base, TimestampMixin):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    trip_id = Column(Integer, ForeignKey("trips.id", ondelete="CASCADE"), nullable=True, index=True)
    activity_id = Column(Integer, ForeignKey("activities.id", ondelete="CASCADE"), nullable=True, index=True)
    rating = Column(Integer, nullable=False)  # 1..5
    comment = Column(Text, nullable=True)

    __table_args__ = (
        CheckConstraint("rating >= 1 AND rating <= 5", name="ck_review_rating_range"),
        CheckConstraint("trip_id IS NOT NULL OR activity_id IS NOT NULL", name="ck_review_target_not_null"),
        Index("ix_reviews_user_target", "user_id", "trip_id", "activity_id"),
    )

    # Relationships
    user = relationship("User", back_populates="reviews")
    trip = relationship("Trip", back_populates="reviews")
    activity = relationship("Activity", back_populates="reviews")
