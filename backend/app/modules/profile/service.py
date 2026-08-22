from typing import Dict, List
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.auth.model import User
from app.modules.auth.repository import AuthRepository
from app.modules.auth.schema import UserResponse
from app.modules.discovery.repository import DiscoveryRepository
from app.modules.profile.model import SavedDestination
from app.modules.profile.repository import ProfileRepository
from app.modules.profile.schema import ProfileUpdate, SavedDestinationCreate, SavedDestinationResponse


class ProfileService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.repo = ProfileRepository(db)
        self.auth_repo = AuthRepository(db)
        self.discovery_repo = DiscoveryRepository(db)

    async def get_profile(self, user_id: int) -> UserResponse:
        user = await self.auth_repo.get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        return UserResponse.model_validate(user)

    async def update_profile(self, user_id: int, data: ProfileUpdate) -> UserResponse:
        user = await self.auth_repo.get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

        update_data = data.model_dump(exclude_unset=True)
        for key, val in update_data.items():
            setattr(user, key, val)

        await self.repo.update_user(user)
        return UserResponse.model_validate(user)

    async def delete_account(self, user_id: int) -> Dict[str, str]:
        user = await self.auth_repo.get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

        await self.repo.delete_user(user)
        return {"detail": "Account deleted successfully"}

    async def save_destination(self, user_id: int, data: SavedDestinationCreate) -> SavedDestinationResponse:
        city = await self.discovery_repo.get_city(data.city_id)
        if not city:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="City not found")

        existing = await self.repo.get_saved_destination(user_id, data.city_id)
        if existing:
            return SavedDestinationResponse.model_validate(existing)

        saved = SavedDestination(user_id=user_id, city_id=data.city_id)
        saved = await self.repo.create_saved_destination(saved)
        full_saved = await self.repo.get_saved_destination(user_id, data.city_id)
        return SavedDestinationResponse.model_validate(full_saved)

    async def list_saved_destinations(self, user_id: int) -> List[SavedDestinationResponse]:
        items = await self.repo.list_saved_destinations(user_id)
        return [SavedDestinationResponse.model_validate(item) for item in items]

    async def delete_saved_destination(self, user_id: int, city_id: int) -> Dict[str, str]:
        await self.repo.delete_saved_destination(user_id, city_id)
        return {"detail": "Saved destination removed"}
