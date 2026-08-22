from typing import Dict, List
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.itinerary.model import ItineraryItem
from app.modules.itinerary.repository import ItineraryRepository
from app.modules.itinerary.schema import (
    ItineraryItemCreate,
    ItineraryItemResponse,
    ItineraryItemUpdate,
    ReorderItemsRequest,
)
from app.modules.trips.repository import TripRepository


class ItineraryService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.repo = ItineraryRepository(db)
        self.trip_repo = TripRepository(db)

    async def create_item(self, user_id: int, data: ItineraryItemCreate) -> ItineraryItemResponse:
        stop = await self.trip_repo.get_stop_by_id(data.trip_stop_id)
        if not stop or not stop.trip:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip stop not found")
        if stop.trip.user_id != user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")

        if data.start_time and data.end_time and data.end_time <= data.start_time:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="start_time must be before end_time")

        item = ItineraryItem(
            trip_stop_id=data.trip_stop_id,
            activity_id=data.activity_id,
            type=data.type,
            title=data.title,
            date=data.date,
            start_time=data.start_time,
            end_time=data.end_time,
            cost=data.cost,
            currency=data.currency,
            notes=data.notes,
            sequence=data.sequence or 0,
        )
        item = await self.repo.create_item(item)
        full_item = await self.repo.get_item_by_id(item.id)
        return ItineraryItemResponse.model_validate(full_item)

    async def update_item(self, item_id: int, user_id: int, data: ItineraryItemUpdate) -> ItineraryItemResponse:
        item = await self.repo.get_item_by_id(item_id)
        if not item or not item.trip_stop or not item.trip_stop.trip:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Itinerary item not found")
        if item.trip_stop.trip.user_id != user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")

        update_data = data.model_dump(exclude_unset=True)
        for key, val in update_data.items():
            setattr(item, key, val)

        await self.repo.update_item(item)
        full_item = await self.repo.get_item_by_id(item.id)
        return ItineraryItemResponse.model_validate(full_item)

    async def delete_item(self, item_id: int, user_id: int) -> Dict[str, str]:
        item = await self.repo.get_item_by_id(item_id)
        if not item or not item.trip_stop or not item.trip_stop.trip:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Itinerary item not found")
        if item.trip_stop.trip.user_id != user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")

        await self.repo.delete_item(item)
        return {"detail": "Itinerary item deleted"}

    async def reorder_items(self, trip_id: int, user_id: int, data: ReorderItemsRequest) -> Dict[str, str]:
        trip = await self.trip_repo.get_trip_by_id(trip_id)
        if not trip:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip not found")
        if trip.user_id != user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")

        items_payload = [{"id": item.id, "sequence": item.sequence} for item in data.items]
        await self.repo.reorder_items(items_payload)
        return {"detail": "Itinerary items reordered successfully"}
