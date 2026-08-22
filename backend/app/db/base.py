from sqlalchemy import Column, DateTime, Integer, func
from sqlalchemy.orm import DeclarativeBase, declared_attr


class Base(DeclarativeBase):
    @declared_attr.directive
    def __tablename__(cls) -> str:
        return cls.__name__.lower() + "s"



class TimestampMixin:
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )


def import_all_models():
    """Explicitly imports all domain models to ensure Base.metadata is fully populated."""
    from app.modules.auth.model import User, AuthSession, PasswordResetToken  # noqa: F401
    from app.modules.discovery.model import City, Activity  # noqa: F401
    from app.modules.trips.model import Trip, TripStop  # noqa: F401
    from app.modules.itinerary.model import ItineraryItem  # noqa: F401
    from app.modules.budget.model import Expense  # noqa: F401
    from app.modules.community.model import Share, Review  # noqa: F401
    from app.modules.profile.model import SavedDestination  # noqa: F401
    from app.modules.admin.model import Report, AdminActivityLog  # noqa: F401



