import math
from typing import Optional
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.discovery.model import Activity, City
from app.modules.discovery.repository import DiscoveryRepository
from app.modules.discovery.schema import (
    ActivityCreate,
    ActivityListResponse,
    ActivityResponse,
    ActivityUpdate,
    CityCreate,
    CityListResponse,
    CityResponse,
    CityUpdate,
)


class DiscoveryService:
    def __init__(self, db: AsyncSession):
        self.repo = DiscoveryRepository(db)

    async def list_cities(
        self,
        q: Optional[str] = None,
        country: Optional[str] = None,
        region: Optional[str] = None,
        min_cost_index: Optional[float] = None,
        max_cost_index: Optional[float] = None,
        page: int = 1,
        page_size: int = 20,
    ) -> CityListResponse:
        page_size = min(max(page_size, 1), 100)
        items, total = await self.repo.list_cities(
            q=q,
            country=country,
            region=region,
            min_cost_index=min_cost_index,
            max_cost_index=max_cost_index,
            page=page,
            page_size=page_size,
        )
        total_pages = math.ceil(total / page_size) if page_size > 0 else 0
        return CityListResponse(
            items=[CityResponse.model_validate(c) for c in items],
            total=total,
            page=page,
            page_size=page_size,
            total_pages=total_pages,
        )

    async def get_city(self, city_id: int) -> CityResponse:
        city = await self.repo.get_city(city_id)
        if not city:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="City not found")
        return CityResponse.model_validate(city)

    async def list_activities(
        self,
        q: Optional[str] = None,
        city_id: Optional[int] = None,
        category: Optional[str] = None,
        min_cost: Optional[float] = None,
        max_cost: Optional[float] = None,
        min_duration: Optional[int] = None,
        max_duration: Optional[int] = None,
        page: int = 1,
        page_size: int = 20,
    ) -> ActivityListResponse:
        page_size = min(max(page_size, 1), 100)
        items, total = await self.repo.list_activities(
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
        total_pages = math.ceil(total / page_size) if page_size > 0 else 0
        return ActivityListResponse(
            items=[ActivityResponse.model_validate(a) for a in items],
            total=total,
            page=page,
            page_size=page_size,
            total_pages=total_pages,
        )

    async def get_activity(self, activity_id: int) -> ActivityResponse:
        act = await self.repo.get_activity(activity_id)
        if not act:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Activity not found")
        return ActivityResponse.model_validate(act)
