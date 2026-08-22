from typing import List, Optional
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.modules.itinerary.model import ItineraryItem


class ItineraryRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_item(self, item: ItineraryItem) -> ItineraryItem:
        self.db.add(item)
        await self.db.flush()
        return item

    async def get_item_by_id(self, item_id: int) -> Optional[ItineraryItem]:
        stmt = (
            select(ItineraryItem)
            .where(ItineraryItem.id == item_id)
            .options(selectinload(ItineraryItem.activity), selectinload(ItineraryItem.trip_stop))
        )
        res = await self.db.execute(stmt)
        return res.scalars().first()

    async def update_item(self, item: ItineraryItem) -> ItineraryItem:
        await self.db.flush()
        return item

    async def delete_item(self, item: ItineraryItem) -> None:
        await self.db.delete(item)
        await self.db.flush()

    async def reorder_items(self, item_orders: List[dict]) -> None:
        for item in item_orders:
            await self.db.execute(
                update(ItineraryItem)
                .where(ItineraryItem.id == item["id"])
                .values(sequence=item["sequence"])
            )
        await self.db.flush()
