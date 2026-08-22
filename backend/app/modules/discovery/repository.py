import math
from typing import List, Optional, Tuple
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.discovery.model import Activity, City


class DiscoveryRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def list_cities(
        self,
        q: Optional[str] = None,
        country: Optional[str] = None,
        region: Optional[str] = None,
        min_cost_index: Optional[float] = None,
        max_cost_index: Optional[float] = None,
        page: int = 1,
        page_size: int = 20,
    ) -> Tuple[List[City], int]:
        stmt = select(City)
        if q:
            stmt = stmt.where(
                City.name.ilike(f"%{q.strip()}%") | City.country.ilike(f"%{q.strip()}%")
            )
        if country:
            stmt = stmt.where(City.country.ilike(f"%{country.strip()}%"))
        if region:
            stmt = stmt.where(City.region.ilike(f"%{region.strip()}%"))
        if min_cost_index is not None:
            stmt = stmt.where(City.cost_index >= min_cost_index)
        if max_cost_index is not None:
            stmt = stmt.where(City.cost_index <= max_cost_index)

        count_stmt = select(func.count()).select_from(stmt.subquery())
        total_resp = await self.db.execute(count_stmt)
        total = total_resp.scalar_one() or 0

        stmt = stmt.order_by(City.popularity_score.desc().nullslast(), City.name.asc())
        stmt = stmt.offset((page - 1) * page_size).limit(page_size)
        res = await self.db.execute(stmt)
        return list(res.scalars().all()), total

    async def get_city(self, city_id: int) -> Optional[City]:
        res = await self.db.execute(select(City).where(City.id == city_id))
        return res.scalars().first()

    async def create_city(self, city: City) -> City:
        self.db.add(city)
        await self.db.flush()
        return city

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
    ) -> Tuple[List[Activity], int]:
        stmt = select(Activity)
        if q:
            stmt = stmt.where(Activity.name.ilike(f"%{q.strip()}%"))
        if city_id is not None:
            stmt = stmt.where(Activity.city_id == city_id)
        if category:
            stmt = stmt.where(Activity.category.ilike(f"%{category.strip()}%"))
        if min_cost is not None:
            stmt = stmt.where(Activity.estimated_cost >= min_cost)
        if max_cost is not None:
            stmt = stmt.where(Activity.estimated_cost <= max_cost)
        if min_duration is not None:
            stmt = stmt.where(Activity.duration_minutes >= min_duration)
        if max_duration is not None:
            stmt = stmt.where(Activity.duration_minutes <= max_duration)

        count_stmt = select(func.count()).select_from(stmt.subquery())
        total_resp = await self.db.execute(count_stmt)
        total = total_resp.scalar_one() or 0

        stmt = stmt.order_by(Activity.rating.desc().nullslast(), Activity.name.asc())
        stmt = stmt.offset((page - 1) * page_size).limit(page_size)
        res = await self.db.execute(stmt)
        return list(res.scalars().all()), total

    async def get_activity(self, activity_id: int) -> Optional[Activity]:
        res = await self.db.execute(select(Activity).where(Activity.id == activity_id))
        return res.scalars().first()

    async def create_activity(self, activity: Activity) -> Activity:
        self.db.add(activity)
        await self.db.flush()
        return activity
