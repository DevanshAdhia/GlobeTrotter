from typing import List, Optional
from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.modules.auth.model import User
from app.modules.profile.model import SavedDestination


class ProfileRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def update_user(self, user: User) -> User:
        await self.db.flush()
        return user

    async def delete_user(self, user: User) -> None:
        await self.db.delete(user)
        await self.db.flush()

    async def create_saved_destination(self, saved: SavedDestination) -> SavedDestination:
        self.db.add(saved)
        await self.db.flush()
        return saved

    async def get_saved_destination(self, user_id: int, city_id: int) -> Optional[SavedDestination]:
        stmt = (
            select(SavedDestination)
            .where(SavedDestination.user_id == user_id, SavedDestination.city_id == city_id)
            .options(selectinload(SavedDestination.city))
        )
        res = await self.db.execute(stmt)
        return res.scalars().first()

    async def list_saved_destinations(self, user_id: int) -> List[SavedDestination]:
        stmt = (
            select(SavedDestination)
            .where(SavedDestination.user_id == user_id)
            .options(selectinload(SavedDestination.city))
            .order_by(SavedDestination.created_at.desc())
        )
        res = await self.db.execute(stmt)
        return list(res.scalars().all())

    async def delete_saved_destination(self, user_id: int, city_id: int) -> None:
        await self.db.execute(
            delete(SavedDestination).where(
                SavedDestination.user_id == user_id, SavedDestination.city_id == city_id
            )
        )
        await self.db.flush()
