from typing import List, Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.budget.model import Expense


class BudgetRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_expense(self, expense: Expense) -> Expense:
        self.db.add(expense)
        await self.db.flush()
        return expense

    async def get_expense_by_id(self, expense_id: int) -> Optional[Expense]:
        res = await self.db.execute(select(Expense).where(Expense.id == expense_id))
        return res.scalars().first()

    async def list_expenses_by_trip(self, trip_id: int) -> List[Expense]:
        res = await self.db.execute(select(Expense).where(Expense.trip_id == trip_id).order_by(Expense.created_at.desc()))
        return list(res.scalars().all())

    async def update_expense(self, expense: Expense) -> Expense:
        await self.db.flush()
        return expense

    async def delete_expense(self, expense: Expense) -> None:
        await self.db.delete(expense)
        await self.db.flush()
