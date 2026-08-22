from sqlalchemy import Column, ForeignKey, Integer, Numeric, String, Text
from sqlalchemy.orm import relationship

from app.db.base import Base, TimestampMixin


class City(Base, TimestampMixin):
    __tablename__ = "cities"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    country = Column(String(100), nullable=False, index=True)
    region = Column(String(100), nullable=True, index=True)
    latitude = Column(Numeric(9, 6), nullable=True)
    longitude = Column(Numeric(9, 6), nullable=True)
    cost_index = Column(Numeric(5, 2), nullable=True)
    popularity_score = Column(Numeric(8, 2), nullable=True, default=0.0)
    image = Column(String(500), nullable=True)

    # Relationships
    activities = relationship("Activity", back_populates="city", cascade="all, delete-orphan")
    stops = relationship("TripStop", back_populates="city")
    saved_by = relationship("SavedDestination", back_populates="city", cascade="all, delete-orphan")


class Activity(Base, TimestampMixin):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)
    city_id = Column(Integer, ForeignKey("cities.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(255), nullable=False, index=True)
    description = Column(Text, nullable=True)
    category = Column(String(100), nullable=True, index=True)  # sightseeing, adventure, food, nature, culture, shopping
    duration_minutes = Column(Integer, nullable=True)
    estimated_cost = Column(Numeric(12, 2), nullable=True)
    currency = Column(String(3), nullable=False, default="USD")
    rating = Column(Numeric(3, 2), nullable=True, default=0.0)
    image = Column(String(500), nullable=True)

    # Relationships
    city = relationship("City", back_populates="activities")
    itinerary_items = relationship("ItineraryItem", back_populates="activity")
    reviews = relationship("Review", back_populates="activity")
