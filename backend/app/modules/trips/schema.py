from datetime import date, datetime
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, ConfigDict, Field, field_validator

from app.modules.discovery.schema import CityResponse


class TripStopCreate(BaseModel):
    city_id: int
    arrival_date: date
    departure_date: date
    sequence: Optional[int] = 0

    @field_validator("departure_date")
    @classmethod
    def validate_dates(cls, v: date, info) -> date:
        if "arrival_date" in info.data and v < info.data["arrival_date"]:
            raise ValueError("Departure date cannot be before arrival date")
        return v


class TripStopUpdate(BaseModel):
    arrival_date: Optional[date] = None
    departure_date: Optional[date] = None
    sequence: Optional[int] = None


class TripStopResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    trip_id: int
    city_id: int
    arrival_date: date
    departure_date: date
    sequence: int
    city: Optional[CityResponse] = None


class TripCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    cover_image: Optional[str] = None
    start_date: date
    end_date: date
    travel_style: Optional[str] = "balanced"  # budget | balanced | adventure | relaxed | luxury
    total_budget: Optional[float] = Field(None, ge=0.0)
    currency: str = "USD"
    stops: Optional[List[TripStopCreate]] = []

    @field_validator("end_date")
    @classmethod
    def validate_trip_dates(cls, v: date, info) -> date:
        if "start_date" in info.data and v < info.data["start_date"]:
            raise ValueError("Trip end_date cannot be before start_date")
        return v


class TripUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    cover_image: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    travel_style: Optional[str] = None
    total_budget: Optional[float] = Field(None, ge=0.0)
    currency: Optional[str] = None
    status: Optional[str] = None  # draft | published


class TripResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    name: str
    description: Optional[str] = None
    cover_image: Optional[str] = None
    start_date: date
    end_date: date
    status: str
    travel_style: Optional[str] = None
    total_budget: Optional[float] = None
    currency: str = "USD"
    created_at: Optional[datetime] = None
    stops: List[TripStopResponse] = []


class TripListResponse(BaseModel):
    items: List[TripResponse]
    total: int
    page: int
    page_size: int
    total_pages: int


class CalendarDayResponse(BaseModel):
    date: date
    city: Optional[CityResponse] = None
    items: List[Dict[str, Any]] = []


class CalendarResponse(BaseModel):
    trip_id: int
    trip_name: str
    start_date: date
    end_date: date
    days: List[CalendarDayResponse]
