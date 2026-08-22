from typing import Any, Dict, List, Optional, Tuple
from sqlalchemy import delete, func, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.admin.model import AdminActivityLog, Report
from app.modules.auth.model import User
from app.modules.discovery.model import Activity, City
from app.modules.trips.model import Trip


class AdminRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_dashboard_counts(self) -> Dict[str, int]:
        total_users = (await self.db.execute(select(func.count(User.id)))).scalar_one() or 0
        active_users = (await self.db.execute(select(func.count(User.id)).where(User.is_active.is_(True)))).scalar_one() or 0
        total_trips = (await self.db.execute(select(func.count(Trip.id)))).scalar_one() or 0
        published_trips = (await self.db.execute(select(func.count(Trip.id)).where(Trip.status == "published"))).scalar_one() or 0
        total_cities = (await self.db.execute(select(func.count(City.id)))).scalar_one() or 0
        total_activities = (await self.db.execute(select(func.count(Activity.id)))).scalar_one() or 0
        pending_reports = (await self.db.execute(select(func.count(Report.id)).where(Report.status == "pending"))).scalar_one() or 0

        return {
            "total_users": total_users,
            "active_users": active_users,
            "total_trips": total_trips,
            "published_trips": published_trips,
            "total_cities": total_cities,
            "total_activities": total_activities,
            "pending_reports": pending_reports,
        }

    async def list_users(self, page: int = 1, page_size: int = 20) -> Tuple[List[User], int]:
        stmt = select(User)
        count_stmt = select(func.count()).select_from(stmt.subquery())
        total_resp = await self.db.execute(count_stmt)
        total = total_resp.scalar_one() or 0

        stmt = stmt.order_by(User.created_at.desc()).offset((page - 1) * page_size).limit(page_size)
        res = await self.db.execute(stmt)
        return list(res.scalars().all()), total

    async def log_admin_action(
        self,
        admin_id: int,
        action: str,
        entity_type: Optional[str] = None,
        entity_id: Optional[int] = None,
        metadata: Optional[Dict[str, Any]] = None,
    ) -> None:
        log = AdminActivityLog(
            admin_id=admin_id,
            action=action,
            entity_type=entity_type,
            entity_id=entity_id,
            metadata_json=metadata,
        )
        self.db.add(log)
        await self.db.flush()

    async def create_report(self, report: Report) -> Report:
        self.db.add(report)
        await self.db.flush()
        return report

    async def list_reports(self, status: Optional[str] = None, page: int = 1, page_size: int = 20) -> Tuple[List[Report], int]:
        stmt = select(Report)
        if status:
            stmt = stmt.where(Report.status == status)

        count_stmt = select(func.count()).select_from(stmt.subquery())
        total_resp = await self.db.execute(count_stmt)
        total = total_resp.scalar_one() or 0

        stmt = stmt.order_by(Report.created_at.desc()).offset((page - 1) * page_size).limit(page_size)
        res = await self.db.execute(stmt)
        return list(res.scalars().all()), total

    async def get_report_by_id(self, report_id: int) -> Optional[Report]:
        res = await self.db.execute(select(Report).where(Report.id == report_id))
        return res.scalars().first()

    async def update_city(self, city: City) -> City:
        await self.db.flush()
        return city

    async def delete_city(self, city: City) -> None:
        await self.db.delete(city)
        await self.db.flush()

    async def update_activity(self, activity: Activity) -> Activity:
        await self.db.flush()
        return activity

    async def delete_activity(self, activity: Activity) -> None:
        await self.db.delete(activity)
        await self.db.flush()
