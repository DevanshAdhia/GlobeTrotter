from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_current_user, get_db
from app.modules.auth.model import User
from app.modules.auth.schema import UserResponse
from app.modules.profile.schema import ProfileUpdate, SavedDestinationCreate, SavedDestinationResponse
from app.modules.profile.service import ProfileService

router = APIRouter()


@router.get("/users/profile", response_model=UserResponse, summary="Get User Profile")
async def get_profile(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    svc = ProfileService(db)
    return await svc.get_profile(user_id=current_user.id)


@router.put("/users/profile", response_model=UserResponse, summary="Update User Profile")
async def update_profile(
    data: ProfileUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    svc = ProfileService(db)
    return await svc.update_profile(user_id=current_user.id, data=data)


@router.delete("/users/account", summary="Delete Account")
async def delete_account(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    svc = ProfileService(db)
    return await svc.delete_account(user_id=current_user.id)


@router.get("/users/saved-destinations", response_model=List[SavedDestinationResponse], summary="List Saved Destinations")
async def list_saved_destinations(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    svc = ProfileService(db)
    return await svc.list_saved_destinations(user_id=current_user.id)


@router.post("/users/saved-destinations", response_model=SavedDestinationResponse, status_code=status.HTTP_201_CREATED, summary="Save Destination")
async def save_destination(
    data: SavedDestinationCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    svc = ProfileService(db)
    return await svc.save_destination(user_id=current_user.id, data=data)


@router.delete("/users/saved-destinations/{city_id}", summary="Remove Saved Destination")
async def delete_saved_destination(
    city_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    svc = ProfileService(db)
    return await svc.delete_saved_destination(user_id=current_user.id, city_id=city_id)
