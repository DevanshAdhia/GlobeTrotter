from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, ConfigDict, Field

from app.modules.trips.schema import TripResponse


class ShareResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    trip_id: int
    share_token: str
    visibility: str
    share_url: str


class PublicTripResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    trip: TripResponse
    share_token: str
    author_name: str


class ReviewCreate(BaseModel):
    trip_id: Optional[int] = None
    activity_id: Optional[int] = None
    rating: int = Field(..., ge=1, le=5)
    comment: Optional[str] = None


class ReviewResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    trip_id: Optional[int] = None
    activity_id: Optional[int] = None
    rating: int
    comment: Optional[str] = None
    created_at: Optional[datetime] = None
    user_name: Optional[str] = None


class ReviewListResponse(BaseModel):
    items: List[ReviewResponse]
    total: int
    page: int
    page_size: int
    total_pages: int


class CommunityTripCardResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    cover_image: Optional[str] = None
    author_name: str
    travel_style: Optional[str] = None
    stops_count: int
    share_token: str
    average_rating: Optional[float] = 0.0
