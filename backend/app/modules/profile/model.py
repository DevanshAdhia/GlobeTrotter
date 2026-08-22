from sqlalchemy import Column, ForeignKey, Integer, UniqueConstraint
from sqlalchemy.orm import relationship

from app.db.base import Base, TimestampMixin


class SavedDestination(Base, TimestampMixin):
    __tablename__ = "saved_destinations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    city_id = Column(Integer, ForeignKey("cities.id", ondelete="CASCADE"), nullable=False, index=True)

    __table_args__ = (
        UniqueConstraint("user_id", "city_id", name="uq_saved_destination_user_city"),
    )

    # Relationships
    user = relationship("User", back_populates="saved_destinations")
    city = relationship("City", back_populates="saved_by")
