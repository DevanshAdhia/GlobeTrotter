from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_current_user, get_db
from app.modules.auth.model import User
from app.modules.itinerary.schema import (
    ItineraryItemCreate,
    ItineraryItemResponse,
    ItineraryItemUpdate,
    ReorderItemsRequest,
)
from app.modules.itinerary.service import ItineraryService

router = APIRouter()


@router.post("/trips/{trip_id}/itinerary", response_model=ItineraryItemResponse, status_code=status.HTTP_201_CREATED, summary="Add Itinerary Item")
async def add_itinerary_item(
    trip_id: int,
    data: ItineraryItemCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    svc = ItineraryService(db)
    return await svc.create_item(user_id=current_user.id, data=data)


@router.put("/itinerary/{item_id}", response_model=ItineraryItemResponse, summary="Update Itinerary Item")
async def update_itinerary_item(
    item_id: int,
    data: ItineraryItemUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    svc = ItineraryService(db)
    return await svc.update_item(item_id=item_id, user_id=current_user.id, data=data)


@router.delete("/itinerary/{item_id}", summary="Delete Itinerary Item")
async def delete_itinerary_item(
    item_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    svc = ItineraryService(db)
    return await svc.delete_item(item_id=item_id, user_id=current_user.id)


@router.put("/trips/{trip_id}/itinerary/reorder", summary="Reorder Itinerary Items")
async def reorder_itinerary_items(
    trip_id: int,
    data: ReorderItemsRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    svc = ItineraryService(db)
    return await svc.reorder_items(trip_id=trip_id, user_id=current_user.id, data=data)
