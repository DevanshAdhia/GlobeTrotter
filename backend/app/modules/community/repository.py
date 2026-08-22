from typing import List, Optional, Tuple
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.modules.community.model import Review, Share
from app.modules.trips.model import Trip, TripStop


class CommunityRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_share_by_trip_id(self, trip_id: int) -> Optional[Share]:
        res = await self.db.execute(select(Share).where(Share.trip_id == trip_id))
        return res.scalars().first()

    async def get_share_by_token(self, share_token: str) -> Optional[Share]:
        stmt = (
            select(Share)
            .where(Share.share_token == share_token)
            .options(
                selectinload(Share.trip).selectinload(Trip.user),
                selectinload(Share.trip).selectinload(Trip.stops).selectinload(TripStop.city),
                selectinload(Share.trip).selectinload(Trip.stops).selectinload(TripStop.itinerary_items),
            )
        )
        res = await self.db.execute(stmt)
        return res.scalars().first()

    async def create_share(self, share: Share) -> Share:
        self.db.add(share)
        await self.db.flush()
        return share

    async def list_community_trips(self, page: int = 1, page_size: int = 20) -> Tuple[List[Share], int]:
        stmt = (
            select(Share)
            .where(Share.visibility == "public")
            .join(Trip, Share.trip_id == Trip.id)
            .where(Trip.status == "published")
            .options(
                selectinload(Share.trip).selectinload(Trip.user),
                selectinload(Share.trip).selectinload(Trip.stops),
                selectinload(Share.trip).selectinload(Trip.reviews),
            )
        )
        count_stmt = select(func.count()).select_from(stmt.subquery())
        total_resp = await self.db.execute(count_stmt)
        total = total_resp.scalar_one() or 0

        stmt = stmt.offset((page - 1) * page_size).limit(page_size)
        res = await self.db.execute(stmt)
        return list(res.scalars().all()), total

    async def create_review(self, review: Review) -> Review:
        self.db.add(review)
        await self.db.flush()
        return review

    async def list_reviews(
        self,
        trip_id: Optional[int] = None,
        activity_id: Optional[int] = None,
        page: int = 1,
        page_size: int = 20,
    ) -> Tuple[List[Review], int]:
        stmt = select(Review).options(selectinload(Review.user))
        if trip_id:
            stmt = stmt.where(Review.trip_id == trip_id)
        if activity_id:
            stmt = stmt.where(Review.activity_id == activity_id)

        count_stmt = select(func.count()).select_from(stmt.subquery())
        total_resp = await self.db.execute(count_stmt)
        total = total_resp.scalar_one() or 0

        stmt = stmt.order_by(Review.created_at.desc()).offset((page - 1) * page_size).limit(page_size)
        res = await self.db.execute(stmt)
        return list(res.scalars().all()), total
