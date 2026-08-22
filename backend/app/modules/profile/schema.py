from typing import List, Optional
from pydantic import BaseModel, ConfigDict, Field

from app.modules.auth.schema import UserResponse
from app.modules.discovery.schema import CityResponse


class ProfileUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    profile_photo: Optional[str] = None
    language: Optional[str] = Field(None, max_length=10)


class SavedDestinationCreate(BaseModel):
    city_id: int


class SavedDestinationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    city_id: int
    city: Optional[CityResponse] = None
