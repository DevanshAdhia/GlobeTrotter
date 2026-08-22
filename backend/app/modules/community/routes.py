from typing import List, Optional
from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_current_user, get_db
from app.modules.auth.model import User
from app.modules.community.schema import (
    CommunityTripCardResponse,
    PublicTripResponse,
    ReviewCreate,
    ReviewListResponse,
    ReviewResponse,
    ShareResponse,
)
from app.modules.community.service import CommunityService
from app.modules.trips.schema import TripResponse

router = APIRouter()


@router.get("/community", response_model=List[CommunityTripCardResponse], summary="Explore Public Community Trips")
async def list_community_trips(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    svc = CommunityService(db)
    return await svc.list_community_trips(page=page, page_size=page_size)


@router.post("/trips/{trip_id}/share", response_model=ShareResponse, summary="Create/Get Share Link for Trip")
async def share_trip(
    trip_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    svc = CommunityService(db)
    return await svc.get_or_create_share(trip_id=trip_id, user_id=current_user.id)


@router.get("/public/trips/{share_token}", response_model=PublicTripResponse, summary="Get Public Shared Trip")
async def get_public_trip(
    share_token: str,
    db: AsyncSession = Depends(get_db),
):
    svc = CommunityService(db)
    return await svc.get_public_trip(share_token=share_token)


@router.post("/public/trips/{share_token}/copy", response_model=TripResponse, status_code=status.HTTP_201_CREATED, summary="Copy Public Trip")
async def copy_public_trip(
    share_token: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    svc = CommunityService(db)
    return await svc.copy_public_trip(share_token=share_token, user_id=current_user.id)


@router.post("/reviews", response_model=ReviewResponse, status_code=status.HTTP_201_CREATED, summary="Create Review")
async def create_review(
    data: ReviewCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    svc = CommunityService(db)
    return await svc.create_review(user_id=current_user.id, data=data)


@router.get("/reviews", response_model=ReviewListResponse, summary="List Reviews")
async def list_reviews(
    trip_id: Optional[int] = Query(None),
    activity_id: Optional[int] = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    svc = CommunityService(db)
    return await svc.list_reviews(trip_id=trip_id, activity_id=activity_id, page=page, page_size=page_size)
