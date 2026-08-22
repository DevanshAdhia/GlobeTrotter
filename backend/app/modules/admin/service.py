import math
from typing import Any, Dict, List, Optional
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.admin.model import Report
from app.modules.admin.repository import AdminRepository
from app.modules.admin.schema import (
    AdminDashboardResponse,
    ReportCreate,
    ReportListResponse,
    ReportResponse,
    ReportStatusUpdate,
    UserStatusUpdate,
)
from app.modules.auth.repository import AuthRepository
from app.modules.auth.schema import UserResponse
from app.modules.discovery.model import Activity, City
from app.modules.discovery.repository import DiscoveryRepository
from app.modules.discovery.schema import (
    ActivityCreate,
    ActivityResponse,
    ActivityUpdate,
    CityCreate,
    CityResponse,
    CityUpdate,
)
from app.modules.trips.repository import TripRepository
from app.modules.trips.schema import TripListResponse, TripResponse


class AdminService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.repo = AdminRepository(db)
        self.auth_repo = AuthRepository(db)
        self.trip_repo = TripRepository(db)
        self.discovery_repo = DiscoveryRepository(db)

    async def get_dashboard(self) -> AdminDashboardResponse:
        counts = await self.repo.get_dashboard_counts()
        return AdminDashboardResponse(**counts)

    async def list_users(self, page: int = 1, page_size: int = 20) -> Dict[str, Any]:
        users, total = await self.repo.list_users(page=page, page_size=page_size)
        total_pages = math.ceil(total / page_size) if page_size > 0 else 0
        return {
            "items": [UserResponse.model_validate(u) for u in users],
            "total": total,
            "page": page,
            "page_size": page_size,
            "total_pages": total_pages,
        }

    async def update_user_status(self, admin_id: int, user_id: int, data: UserStatusUpdate) -> UserResponse:
        user = await self.auth_repo.get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

        user.is_active = data.is_active
        if data.role:
            user.role = data.role

        await self.auth_repo.update_user(user)
        await self.repo.log_admin_action(
            admin_id=admin_id,
            action="update_user_status",
            entity_type="user",
            entity_id=user_id,
            metadata={"is_active": data.is_active, "role": data.role},
        )
        return UserResponse.model_validate(user)

    async def create_city(self, admin_id: int, data: CityCreate) -> CityResponse:
        city = City(**data.model_dump())
        city = await self.discovery_repo.create_city(city)
        await self.repo.log_admin_action(admin_id, "create_city", "city", city.id, data.model_dump())
        return CityResponse.model_validate(city)

    async def update_city(self, admin_id: int, city_id: int, data: CityUpdate) -> CityResponse:
        city = await self.discovery_repo.get_city(city_id)
        if not city:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="City not found")

        update_data = data.model_dump(exclude_unset=True)
        for k, v in update_data.items():
            setattr(city, k, v)

        await self.repo.update_city(city)
        await self.repo.log_admin_action(admin_id, "update_city", "city", city_id, update_data)
        return CityResponse.model_validate(city)

    async def delete_city(self, admin_id: int, city_id: int) -> Dict[str, str]:
        city = await self.discovery_repo.get_city(city_id)
        if not city:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="City not found")

        await self.repo.delete_city(city)
        await self.repo.log_admin_action(admin_id, "delete_city", "city", city_id)
        return {"detail": "City deleted successfully"}

    async def create_activity(self, admin_id: int, data: ActivityCreate) -> ActivityResponse:
        activity = Activity(**data.model_dump())
        activity = await self.discovery_repo.create_activity(activity)
        await self.repo.log_admin_action(admin_id, "create_activity", "activity", activity.id, data.model_dump())
        return ActivityResponse.model_validate(activity)

    async def update_activity(self, admin_id: int, activity_id: int, data: ActivityUpdate) -> ActivityResponse:
        act = await self.discovery_repo.get_activity(activity_id)
        if not act:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Activity not found")

        update_data = data.model_dump(exclude_unset=True)
        for k, v in update_data.items():
            setattr(act, k, v)

        await self.repo.update_activity(act)
        await self.repo.log_admin_action(admin_id, "update_activity", "activity", activity_id, update_data)
        return ActivityResponse.model_validate(act)

    async def delete_activity(self, admin_id: int, activity_id: int) -> Dict[str, str]:
        act = await self.discovery_repo.get_activity(activity_id)
        if not act:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Activity not found")

        await self.repo.delete_activity(act)
        await self.repo.log_admin_action(admin_id, "delete_activity", "activity", activity_id)
        return {"detail": "Activity deleted successfully"}

    async def delete_trip(self, admin_id: int, trip_id: int) -> Dict[str, str]:
        trip = await self.trip_repo.get_trip_by_id(trip_id)
        if not trip:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip not found")

        await self.trip_repo.delete_trip(trip)
        await self.repo.log_admin_action(admin_id, "delete_trip", "trip", trip_id)
        return {"detail": "Trip deleted by admin"}

    async def create_report(self, reporter_id: int, data: ReportCreate) -> ReportResponse:
        report = Report(
            reporter_id=reporter_id,
            entity_type=data.entity_type,
            entity_id=data.entity_id,
            reason=data.reason,
            status="pending",
        )
        report = await self.repo.create_report(report)
        return ReportResponse.model_validate(report)

    async def list_reports(self, status_filter: Optional[str] = None, page: int = 1, page_size: int = 20) -> ReportListResponse:
        page_size = min(max(page_size, 1), 100)
        reports, total = await self.repo.list_reports(status=status_filter, page=page, page_size=page_size)
        total_pages = math.ceil(total / page_size) if page_size > 0 else 0
        return ReportListResponse(
            items=[ReportResponse.model_validate(r) for r in reports],
            total=total,
            page=page,
            page_size=page_size,
            total_pages=total_pages,
        )

    async def update_report_status(self, admin_id: int, report_id: int, data: ReportStatusUpdate) -> ReportResponse:
        report = await self.repo.get_report_by_id(report_id)
        if not report:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Report not found")

        report.status = data.status
        await self.db.flush()
        await self.repo.log_admin_action(admin_id, "update_report_status", "report", report_id, {"status": data.status})
        return ReportResponse.model_validate(report)
