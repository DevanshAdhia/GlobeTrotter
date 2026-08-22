from typing import List, Optional, Tuple
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.modules.trips.model import Trip, TripStop


class TripRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_trip(self, trip: Trip) -> Trip:
        self.db.add(trip)
        await self.db.flush()
        return trip

    async def get_trip_by_id(self, trip_id: int) -> Optional[Trip]:
        stmt = (
            select(Trip)
            .where(Trip.id == trip_id)
            .options(
                selectinload(Trip.stops).selectinload(TripStop.city),
                selectinload(Trip.stops).selectinload(TripStop.itinerary_items),
                selectinload(Trip.share),
            )
        )
        res = await self.db.execute(stmt)
        return res.scalars().first()

    async def list_user_trips(
        self,
        user_id: int,
        status: Optional[str] = None,
        page: int = 1,
        page_size: int = 20,
    ) -> Tuple[List[Trip], int]:
        stmt = select(Trip).where(Trip.user_id == user_id)
        if status:
            stmt = stmt.where(Trip.status == status)

        count_stmt = select(func.count()).select_from(stmt.subquery())
        total_resp = await self.db.execute(count_stmt)
        total = total_resp.scalar_one() or 0

        stmt = (
            stmt.order_by(Trip.created_at.desc())
            .offset((page - 1) * page_size)
            .limit(page_size)
            .options(selectinload(Trip.stops).selectinload(TripStop.city))
        )
        res = await self.db.execute(stmt)
        return list(res.scalars().all()), total

    async def update_trip(self, trip: Trip) -> Trip:
        await self.db.flush()
        return trip

    async def delete_trip(self, trip: Trip) -> None:
        await self.db.delete(trip)
        await self.db.flush()

    async def create_stop(self, stop: TripStop) -> TripStop:
        self.db.add(stop)
        await self.db.flush()
        return stop

    async def get_stop_by_id(self, stop_id: int) -> Optional[TripStop]:
        stmt = (
            select(TripStop)
            .where(TripStop.id == stop_id)
            .options(selectinload(TripStop.city), selectinload(TripStop.trip))
        )
        res = await self.db.execute(stmt)
        return res.scalars().first()

    async def delete_stop(self, stop: TripStop) -> None:
        await self.db.delete(stop)
        await self.db.flush()
