from sqlalchemy import Column, ForeignKey, Index, Integer, Numeric, String
from sqlalchemy.orm import relationship

from app.db.base import Base, TimestampMixin


class Expense(Base, TimestampMixin):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)
    trip_id = Column(Integer, ForeignKey("trips.id", ondelete="CASCADE"), nullable=False, index=True)
    itinerary_item_id = Column(Integer, ForeignKey("itinerary_items.id", ondelete="SET NULL"), nullable=True, index=True)
    category = Column(String(50), nullable=False, default="other")  # transport | stay | activities | meals | other
    amount = Column(Numeric(12, 2), nullable=False)
    currency = Column(String(3), nullable=False, default="USD")
    description = Column(String(500), nullable=True)

    __table_args__ = (
        Index("ix_expenses_trip_cat", "trip_id", "category"),
    )

    # Relationships
    trip = relationship("Trip", back_populates="expenses")
    itinerary_item = relationship("ItineraryItem", back_populates="expenses")
