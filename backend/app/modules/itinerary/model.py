from sqlalchemy import Column, Date, ForeignKey, Index, Integer, Numeric, String, Text, Time
from sqlalchemy.orm import relationship

from app.db.base import Base, TimestampMixin


class ItineraryItem(Base, TimestampMixin):
    __tablename__ = "itinerary_items"

    id = Column(Integer, primary_key=True, index=True)
    trip_stop_id = Column(Integer, ForeignKey("trip_stops.id", ondelete="CASCADE"), nullable=False, index=True)
    activity_id = Column(Integer, ForeignKey("activities.id", ondelete="SET NULL"), nullable=True, index=True)
    type = Column(String(50), nullable=False, default="activity")  # activity | transport | meal | accommodation | custom
    title = Column(String(255), nullable=False)
    date = Column(Date, nullable=False)
    start_time = Column(Time, nullable=True)
    end_time = Column(Time, nullable=True)
    cost = Column(Numeric(12, 2), nullable=True)
    currency = Column(String(3), nullable=False, default="USD")
    notes = Column(Text, nullable=True)
    sequence = Column(Integer, nullable=False, default=0)

    __table_args__ = (
        Index("ix_itinerary_stop_date_seq", "trip_stop_id", "date", "sequence"),
    )

    # Relationships
    trip_stop = relationship("TripStop", back_populates="itinerary_items")
    activity = relationship("Activity", back_populates="itinerary_items")
    expenses = relationship("Expense", back_populates="itinerary_item")
