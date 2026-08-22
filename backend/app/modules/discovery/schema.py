from typing import List, Optional
from pydantic import BaseModel, ConfigDict, Field


class CityResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    country: str
    region: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    cost_index: Optional[float] = None
    popularity_score: Optional[float] = None
    image: Optional[str] = None


class CityListResponse(BaseModel):
    items: List[CityResponse]
    total: int
    page: int
    page_size: int
    total_pages: int


class CityCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    country: str = Field(..., min_length=1, max_length=100)
    region: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    cost_index: Optional[float] = None
    popularity_score: Optional[float] = 0.0
    image: Optional[str] = None


class CityUpdate(BaseModel):
    name: Optional[str] = None
    country: Optional[str] = None
    region: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    cost_index: Optional[float] = None
    popularity_score: Optional[float] = None
    image: Optional[str] = None


class ActivityResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    city_id: int
    name: str
    description: Optional[str] = None
    category: Optional[str] = None
    duration_minutes: Optional[int] = None
    estimated_cost: Optional[float] = None
    currency: str = "USD"
    rating: Optional[float] = 0.0
    image: Optional[str] = None


class ActivityListResponse(BaseModel):
    items: List[ActivityResponse]
    total: int
    page: int
    page_size: int
    total_pages: int


class ActivityCreate(BaseModel):
    city_id: int
    name: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    category: Optional[str] = None
    duration_minutes: Optional[int] = None
    estimated_cost: Optional[float] = None
    currency: str = "USD"
    rating: Optional[float] = Field(None, ge=0.0, le=5.0)
    image: Optional[str] = None


class ActivityUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    duration_minutes: Optional[int] = None
    estimated_cost: Optional[float] = None
    currency: Optional[str] = None
    rating: Optional[float] = Field(None, ge=0.0, le=5.0)
    image: Optional[str] = None
