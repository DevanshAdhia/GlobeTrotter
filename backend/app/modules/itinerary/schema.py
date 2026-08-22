from datetime import date, time
from typing import List, Optional
from pydantic import BaseModel, ConfigDict, Field

from app.modules.discovery.schema import ActivityResponse


class ItineraryItemCreate(BaseModel):
    trip_stop_id: int
    activity_id: Optional[int] = None
    type: str = "activity"  # activity | transport | meal | accommodation | custom
    title: str = Field(..., min_length=1, max_length=255)
    date: date
    start_time: Optional[time] = None
    end_time: Optional[time] = None
    cost: Optional[float] = Field(None, ge=0.0)
    currency: str = "USD"
    notes: Optional[str] = None
    sequence: Optional[int] = 0


class ItineraryItemUpdate(BaseModel):
    activity_id: Optional[int] = None
    type: Optional[str] = None
    title: Optional[str] = None
    date: Optional[date] = None
    start_time: Optional[time] = None
    end_time: Optional[time] = None
    cost: Optional[float] = Field(None, ge=0.0)
    currency: Optional[str] = None
    notes: Optional[str] = None
    sequence: Optional[int] = None


class ItineraryItemResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    trip_stop_id: int
    activity_id: Optional[int] = None
    type: str
    title: str
    date: date
    start_time: Optional[time] = None
    end_time: Optional[time] = None
    cost: Optional[float] = None
    currency: str = "USD"
    notes: Optional[str] = None
    sequence: int
    activity: Optional[ActivityResponse] = None


class ReorderItem(BaseModel):
    id: int
    sequence: int


class ReorderItemsRequest(BaseModel):
    items: List[ReorderItem]
