from typing import Dict, List, Optional
from pydantic import BaseModel, ConfigDict, Field


class ExpenseCreate(BaseModel):
    itinerary_item_id: Optional[int] = None
    category: str = Field(..., description="transport | stay | activities | meals | other")
    amount: float = Field(..., ge=0.0)
    currency: str = "USD"
    description: Optional[str] = None


class ExpenseUpdate(BaseModel):
    category: Optional[str] = None
    amount: Optional[float] = Field(None, ge=0.0)
    currency: Optional[str] = None
    description: Optional[str] = None


class ExpenseResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    trip_id: int
    itinerary_item_id: Optional[int] = None
    category: str
    amount: float
    currency: str = "USD"
    description: Optional[str] = None


class CategoryBreakdown(BaseModel):
    category: str
    amount: float


class BudgetBreakdown(BaseModel):
    trip_id: int
    currency: str = "USD"
    total_budget_limit: float
    itinerary_estimated_total: float
    recorded_expenses_total: float
    remaining_budget: float
    is_over_budget: bool
    daily_average_expense: float
    category_breakdown: List[CategoryBreakdown]
