from typing import Any, Dict, Optional
from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_current_user, get_db, require_role
from app.modules.admin.schema import (
    AdminDashboardResponse,
    ReportCreate,
    ReportListResponse,
    ReportResponse,
    ReportStatusUpdate,
    UserStatusUpdate,
)
from app.modules.admin.service import AdminService
from app.modules.auth.model import User
from app.modules.auth.schema import UserResponse
from app.modules.discovery.schema import (
    ActivityCreate,
    ActivityResponse,
    ActivityUpdate,
    CityCreate,
    CityResponse,
    CityUpdate,
)

router = APIRouter()


@router.get("/admin/dashboard", response_model=AdminDashboardResponse, summary="Get Admin Dashboard Metrics")
async def get_admin_dashboard(
    current_user: User = Depends(require_role("admin")),
    db: AsyncSession = Depends(get_db),
):
    svc = AdminService(db)
    return await svc.get_dashboard()


@router.get("/admin/users", summary="List All Users (Admin)")
async def list_admin_users(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    current_user: User = Depends(require_role("admin")),
    db: AsyncSession = Depends(get_db),
):
    svc = AdminService(db)
    return await svc.list_users(page=page, page_size=page_size)


@router.put("/admin/users/{user_id}/status", response_model=UserResponse, summary="Update User Status/Role (Admin)")
async def update_user_status(
    user_id: int,
    data: UserStatusUpdate,
    current_user: User = Depends(require_role("admin")),
    db: AsyncSession = Depends(get_db),
):
    svc = AdminService(db)
    return await svc.update_user_status(admin_id=current_user.id, user_id=user_id, data=data)


@router.delete("/admin/trips/{trip_id}", summary="Delete Trip (Admin)")
async def admin_delete_trip(
    trip_id: int,
    current_user: User = Depends(require_role("admin")),
    db: AsyncSession = Depends(get_db),
):
    svc = AdminService(db)
    return await svc.delete_trip(admin_id=current_user.id, trip_id=trip_id)


@router.post("/admin/cities", response_model=CityResponse, status_code=status.HTTP_201_CREATED, summary="Create City (Admin)")
async def admin_create_city(
    data: CityCreate,
    current_user: User = Depends(require_role("admin")),
    db: AsyncSession = Depends(get_db),
):
    svc = AdminService(db)
    return await svc.create_city(admin_id=current_user.id, data=data)


@router.put("/admin/cities/{city_id}", response_model=CityResponse, summary="Update City (Admin)")
async def admin_update_city(
    city_id: int,
    data: CityUpdate,
    current_user: User = Depends(require_role("admin")),
    db: AsyncSession = Depends(get_db),
):
    svc = AdminService(db)
    return await svc.update_city(admin_id=current_user.id, city_id=city_id, data=data)


@router.delete("/admin/cities/{city_id}", summary="Delete City (Admin)")
async def admin_delete_city(
    city_id: int,
    current_user: User = Depends(require_role("admin")),
    db: AsyncSession = Depends(get_db),
):
    svc = AdminService(db)
    return await svc.delete_city(admin_id=current_user.id, city_id=city_id)


@router.post("/admin/activities", response_model=ActivityResponse, status_code=status.HTTP_201_CREATED, summary="Create Activity (Admin)")
async def admin_create_activity(
    data: ActivityCreate,
    current_user: User = Depends(require_role("admin")),
    db: AsyncSession = Depends(get_db),
):
    svc = AdminService(db)
    return await svc.create_activity(admin_id=current_user.id, data=data)


@router.put("/admin/activities/{activity_id}", response_model=ActivityResponse, summary="Update Activity (Admin)")
async def admin_update_activity(
    activity_id: int,
    data: ActivityUpdate,
    current_user: User = Depends(require_role("admin")),
    db: AsyncSession = Depends(get_db),
):
    svc = AdminService(db)
    return await svc.update_activity(admin_id=current_user.id, activity_id=activity_id, data=data)


@router.delete("/admin/activities/{activity_id}", summary="Delete Activity (Admin)")
async def admin_delete_activity(
    activity_id: int,
    current_user: User = Depends(require_role("admin")),
    db: AsyncSession = Depends(get_db),
):
    svc = AdminService(db)
    return await svc.delete_activity(admin_id=current_user.id, activity_id=activity_id)


@router.post("/reports", response_model=ReportResponse, status_code=status.HTTP_201_CREATED, summary="Submit Content Report")
async def create_report(
    data: ReportCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    svc = AdminService(db)
    return await svc.create_report(reporter_id=current_user.id, data=data)


@router.get("/admin/reports", response_model=ReportListResponse, summary="List Moderation Reports (Admin)")
async def list_admin_reports(
    status_filter: Optional[str] = Query(None, alias="status"),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    current_user: User = Depends(require_role("admin")),
    db: AsyncSession = Depends(get_db),
):
    svc = AdminService(db)
    return await svc.list_reports(status_filter=status_filter, page=page, page_size=page_size)


@router.put("/admin/reports/{report_id}/status", response_model=ReportResponse, summary="Update Moderation Report Status (Admin)")
async def update_report_status(
    report_id: int,
    data: ReportStatusUpdate,
    current_user: User = Depends(require_role("admin")),
    db: AsyncSession = Depends(get_db),
):
    svc = AdminService(db)
    return await svc.update_report_status(admin_id=current_user.id, report_id=report_id, data=data)
