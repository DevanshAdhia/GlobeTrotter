from typing import Optional
from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_current_user, get_db
from app.modules.auth.model import User
from app.modules.trips.schema import (
    CalendarResponse,
    TripCreate,
    TripListResponse,
    TripResponse,
    TripStopCreate,
    TripStopResponse,
    TripStopUpdate,
    TripUpdate,
)
from app.modules.trips.service import TripService

router = APIRouter()


@router.get("/trips", response_model=TripListResponse, summary="List User Trips")
async def list_trips(
    status_filter: Optional[str] = Query(None, alias="status"),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    svc = TripService(db)
    return await svc.list_trips(user_id=current_user.id, status_filter=status_filter, page=page, page_size=page_size)


@router.post("/trips", response_model=TripResponse, status_code=status.HTTP_201_CREATED, summary="Create Trip")
async def create_trip(
    data: TripCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    svc = TripService(db)
    return await svc.create_trip(user_id=current_user.id, data=data)


@router.get("/trips/{trip_id}", response_model=TripResponse, summary="Get Trip Details")
async def get_trip(
    trip_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    svc = TripService(db)
    return await svc.get_trip(trip_id=trip_id, user_id=current_user.id)


@router.put("/trips/{trip_id}", response_model=TripResponse, summary="Update Trip")
async def update_trip(
    trip_id: int,
    data: TripUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    svc = TripService(db)
    return await svc.update_trip(trip_id=trip_id, user_id=current_user.id, data=data)


@router.delete("/trips/{trip_id}", summary="Delete Trip")
async def delete_trip(
    trip_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    svc = TripService(db)
    return await svc.delete_trip(trip_id=trip_id, user_id=current_user.id)


@router.post("/trips/{trip_id}/publish", response_model=TripResponse, summary="Publish Trip")
async def publish_trip(
    trip_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    svc = TripService(db)
    return await svc.publish_trip(trip_id=trip_id, user_id=current_user.id)


@router.post("/trips/{trip_id}/stops", response_model=TripStopResponse, status_code=status.HTTP_201_CREATED, summary="Add Trip Stop")
async def add_trip_stop(
    trip_id: int,
    data: TripStopCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    svc = TripService(db)
    return await svc.add_stop(trip_id=trip_id, user_id=current_user.id, data=data)


@router.put("/trip-stops/{stop_id}", response_model=TripStopResponse, summary="Update Trip Stop")
async def update_trip_stop(
    stop_id: int,
    data: TripStopUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    svc = TripService(db)
    return await svc.update_stop(stop_id=stop_id, user_id=current_user.id, data=data)


@router.delete("/trip-stops/{stop_id}", summary="Delete Trip Stop")
async def delete_trip_stop(
    stop_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    svc = TripService(db)
    return await svc.delete_stop(stop_id=stop_id, user_id=current_user.id)


@router.get("/trips/{trip_id}/calendar", response_model=CalendarResponse, summary="Get Trip Calendar View")
async def get_trip_calendar(
    trip_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    svc = TripService(db)
    return await svc.get_trip_calendar(trip_id=trip_id, user_id=current_user.id)
