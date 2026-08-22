from sqlalchemy import Column, Date, ForeignKey, Index, Integer, Numeric, String, Text
from sqlalchemy.orm import relationship

from app.db.base import Base, TimestampMixin


class Trip(Base, TimestampMixin):
    __tablename__ = "trips"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    cover_image = Column(String(500), nullable=True)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    status = Column(String(20), nullable=False, default="draft")  # draft | published
    travel_style = Column(String(50), nullable=True)  # budget | balanced | adventure | relaxed | luxury
    total_budget = Column(Numeric(12, 2), nullable=True)
    currency = Column(String(3), nullable=False, default="USD")

    __table_args__ = (
        Index("ix_trips_user_created", "user_id", "created_at"),
    )

    # Relationships
    user = relationship("User", back_populates="trips")
    stops = relationship("TripStop", back_populates="trip", cascade="all, delete-orphan", order_by="TripStop.sequence")
    expenses = relationship("Expense", back_populates="trip", cascade="all, delete-orphan")
    share = relationship("Share", back_populates="trip", uselist=False, cascade="all, delete-orphan")
    reviews = relationship("Review", back_populates="trip", cascade="all, delete-orphan")


class TripStop(Base, TimestampMixin):
    __tablename__ = "trip_stops"

    id = Column(Integer, primary_key=True, index=True)
    trip_id = Column(Integer, ForeignKey("trips.id", ondelete="CASCADE"), nullable=False, index=True)
    city_id = Column(Integer, ForeignKey("cities.id", ondelete="RESTRICT"), nullable=False, index=True)
    arrival_date = Column(Date, nullable=False)
    departure_date = Column(Date, nullable=False)
    sequence = Column(Integer, nullable=False, default=0)

    __table_args__ = (
        Index("ix_trip_stops_trip_seq", "trip_id", "sequence"),
    )

    # Relationships
    trip = relationship("Trip", back_populates="stops")
    city = relationship("City", back_populates="stops")
    itinerary_items = relationship("ItineraryItem", back_populates="trip_stop", cascade="all, delete-orphan", order_by="ItineraryItem.sequence")
