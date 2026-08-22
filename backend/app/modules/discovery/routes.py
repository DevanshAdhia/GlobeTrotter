from typing import Optional
from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_db
from app.modules.discovery.schema import ActivityListResponse, ActivityResponse, CityListResponse, CityResponse
from app.modules.discovery.service import DiscoveryService

router = APIRouter()


@router.get("/cities", response_model=CityListResponse, summary="Search/List Cities")
async def list_cities(
    q: Optional[str] = Query(None, description="Search term for city or country"),
    country: Optional[str] = Query(None, description="Filter by country"),
    region: Optional[str] = Query(None, description="Filter by region"),
    min_cost_index: Optional[float] = Query(None, description="Minimum cost index"),
    max_cost_index: Optional[float] = Query(None, description="Maximum cost index"),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    svc = DiscoveryService(db)
    return await svc.list_cities(
        q=q,
        country=country,
        region=region,
        min_cost_index=min_cost_index,
        max_cost_index=max_cost_index,
        page=page,
        page_size=page_size,
    )


@router.get("/cities/{city_id}", response_model=CityResponse, summary="Get City Detail")
async def get_city(
    city_id: int,
    db: AsyncSession = Depends(get_db),
):
    svc = DiscoveryService(db)
    return await svc.get_city(city_id)


@router.get("/activities", response_model=ActivityListResponse, summary="Search/List Activities")
async def list_activities(
    q: Optional[str] = Query(None, description="Search term for activity name"),
    city_id: Optional[int] = Query(None, description="Filter by city ID"),
    category: Optional[str] = Query(None, description="Filter by category"),
    min_cost: Optional[float] = Query(None, description="Minimum estimated cost"),
    max_cost: Optional[float] = Query(None, description="Maximum estimated cost"),
    min_duration: Optional[int] = Query(None, description="Minimum duration in minutes"),
    max_duration: Optional[int] = Query(None, description="Maximum duration in minutes"),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    svc = DiscoveryService(db)
    return await svc.list_activities(
        q=q,
        city_id=city_id,
        category=category,
        min_cost=min_cost,
        max_cost=max_cost,
        min_duration=min_duration,
        max_duration=max_duration,
        page=page,
        page_size=page_size,
    )


@router.get("/activities/{activity_id}", response_model=ActivityResponse, summary="Get Activity Detail")
async def get_activity(
    activity_id: int,
    db: AsyncSession = Depends(get_db),
):
    svc = DiscoveryService(db)
    return await svc.get_activity(activity_id)
