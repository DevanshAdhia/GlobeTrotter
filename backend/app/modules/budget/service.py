from typing import Dict, List
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.budget.model import Expense
from app.modules.budget.repository import BudgetRepository
from app.modules.budget.schema import (
    BudgetBreakdown,
    CategoryBreakdown,
    ExpenseCreate,
    ExpenseResponse,
    ExpenseUpdate,
)
from app.modules.trips.repository import TripRepository


class BudgetService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.repo = BudgetRepository(db)
        self.trip_repo = TripRepository(db)

    async def create_expense(self, trip_id: int, user_id: int, data: ExpenseCreate) -> ExpenseResponse:
        trip = await self.trip_repo.get_trip_by_id(trip_id)
        if not trip:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip not found")
        if trip.user_id != user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")

        expense = Expense(
            trip_id=trip_id,
            itinerary_item_id=data.itinerary_item_id,
            category=data.category,
            amount=data.amount,
            currency=data.currency,
            description=data.description,
        )
        expense = await self.repo.create_expense(expense)
        return ExpenseResponse.model_validate(expense)

    async def list_expenses(self, trip_id: int, user_id: int) -> List[ExpenseResponse]:
        trip = await self.trip_repo.get_trip_by_id(trip_id)
        if not trip:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip not found")
        if trip.user_id != user_id and trip.status != "published":
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")

        expenses = await self.repo.list_expenses_by_trip(trip_id)
        return [ExpenseResponse.model_validate(e) for e in expenses]

    async def update_expense(self, expense_id: int, user_id: int, data: ExpenseUpdate) -> ExpenseResponse:
        expense = await self.repo.get_expense_by_id(expense_id)
        if not expense:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Expense not found")
        trip = await self.trip_repo.get_trip_by_id(expense.trip_id)
        if not trip or trip.user_id != user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")

        update_data = data.model_dump(exclude_unset=True)
        for key, val in update_data.items():
            setattr(expense, key, val)

        await self.repo.update_expense(expense)
        return ExpenseResponse.model_validate(expense)

    async def delete_expense(self, expense_id: int, user_id: int) -> Dict[str, str]:
        expense = await self.repo.get_expense_by_id(expense_id)
        if not expense:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Expense not found")
        trip = await self.trip_repo.get_trip_by_id(expense.trip_id)
        if not trip or trip.user_id != user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")

        await self.repo.delete_expense(expense)
        return {"detail": "Expense deleted successfully"}

    async def get_budget_breakdown(self, trip_id: int, user_id: int) -> BudgetBreakdown:
        trip = await self.trip_repo.get_trip_by_id(trip_id)
        if not trip:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip not found")

        expenses = await self.repo.list_expenses_by_trip(trip_id)

        recorded_total = sum(float(e.amount) for e in expenses)
        itinerary_estimated_total = 0.0

        for stop in trip.stops:
            for item in stop.itinerary_items:
                if item.cost:
                    itinerary_estimated_total += float(item.cost)

        total_limit = float(trip.total_budget) if trip.total_budget else 0.0
        remaining = total_limit - recorded_total if total_limit > 0 else 0.0
        is_over = recorded_total > total_limit if total_limit > 0 else False

        days_count = max((trip.end_date - trip.start_date).days + 1, 1)
        daily_avg = recorded_total / days_count

        cat_map: Dict[str, float] = {}
        for e in expenses:
            cat_map[e.category] = cat_map.get(e.category, 0.0) + float(e.amount)

        cat_list = [CategoryBreakdown(category=cat, amount=amt) for cat, amt in cat_map.items()]

        return BudgetBreakdown(
            trip_id=trip.id,
            currency=trip.currency,
            total_budget_limit=total_limit,
            itinerary_estimated_total=itinerary_estimated_total,
            recorded_expenses_total=recorded_total,
            remaining_budget=remaining,
            is_over_budget=is_over,
            daily_average_expense=daily_avg,
            category_breakdown=cat_list,
        )
