from datetime import datetime
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, ConfigDict, Field

from app.modules.auth.schema import UserResponse
from app.modules.discovery.schema import ActivityResponse, CityResponse
from app.modules.trips.schema import TripResponse


class AdminDashboardResponse(BaseModel):
    total_users: int
    active_users: int
    total_trips: int
    published_trips: int
    total_cities: int
    total_activities: int
    pending_reports: int


class UserStatusUpdate(BaseModel):
    is_active: bool
    role: Optional[str] = None  # user | admin


class ReportCreate(BaseModel):
    entity_type: str = Field(..., description="user | trip | activity | review")
    entity_id: int
    reason: str = Field(..., min_length=1)


class ReportStatusUpdate(BaseModel):
    status: str = Field(..., description="pending | resolved | dismissed")


class ReportResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    reporter_id: int
    entity_type: str
    entity_id: int
    reason: str
    status: str
    created_at: Optional[datetime] = None


class ReportListResponse(BaseModel):
    items: List[ReportResponse]
    total: int
    page: int
    page_size: int
    total_pages: int


class AdminActivityLogResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    admin_id: int
    action: str
    entity_type: Optional[str] = None
    entity_id: Optional[int] = None
    metadata_json: Optional[Dict[str, Any]] = None
    created_at: Optional[datetime] = None
