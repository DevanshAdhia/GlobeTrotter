from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_current_user, get_db
from app.modules.auth.model import User
from app.modules.budget.schema import BudgetBreakdown, ExpenseCreate, ExpenseResponse, ExpenseUpdate
from app.modules.budget.service import BudgetService

router = APIRouter()


@router.get("/trips/{trip_id}/budget", response_model=BudgetBreakdown, summary="Get Trip Budget Breakdown")
async def get_budget_breakdown(
    trip_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    svc = BudgetService(db)
    return await svc.get_budget_breakdown(trip_id=trip_id, user_id=current_user.id)


@router.get("/trips/{trip_id}/expenses", response_model=List[ExpenseResponse], summary="List Trip Expenses")
async def list_expenses(
    trip_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    svc = BudgetService(db)
    return await svc.list_expenses(trip_id=trip_id, user_id=current_user.id)


@router.post("/trips/{trip_id}/expenses", response_model=ExpenseResponse, status_code=status.HTTP_201_CREATED, summary="Create Expense")
async def create_expense(
    trip_id: int,
    data: ExpenseCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    svc = BudgetService(db)
    return await svc.create_expense(trip_id=trip_id, user_id=current_user.id, data=data)


@router.put("/expenses/{expense_id}", response_model=ExpenseResponse, summary="Update Expense")
async def update_expense(
    expense_id: int,
    data: ExpenseUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    svc = BudgetService(db)
    return await svc.update_expense(expense_id=expense_id, user_id=current_user.id, data=data)


@router.delete("/expenses/{expense_id}", summary="Delete Expense")
async def delete_expense(
    expense_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    svc = BudgetService(db)
    return await svc.delete_expense(expense_id=expense_id, user_id=current_user.id)
