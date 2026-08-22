import math
from datetime import timedelta
from typing import Any, Dict, List, Optional
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.discovery.schema import CityResponse
from app.modules.trips.model import Trip, TripStop
from app.modules.trips.repository import TripRepository
from app.modules.trips.schema import (
    CalendarDayResponse,
    CalendarResponse,
    TripCreate,
    TripListResponse,
    TripResponse,
    TripStopCreate,
    TripStopResponse,
    TripStopUpdate,
    TripUpdate,
)


class TripService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.repo = TripRepository(db)

    async def create_trip(self, user_id: int, data: TripCreate) -> TripResponse:
        trip = Trip(
            user_id=user_id,
            name=data.name,
            description=data.description,
            cover_image=data.cover_image,
            start_date=data.start_date,
            end_date=data.end_date,
            status="draft",
            travel_style=data.travel_style,
            total_budget=data.total_budget,
            currency=data.currency,
        )
        trip = await self.repo.create_trip(trip)

        if data.stops:
            for idx, stop_data in enumerate(data.stops):
                stop = TripStop(
                    trip_id=trip.id,
                    city_id=stop_data.city_id,
                    arrival_date=stop_data.arrival_date,
                    departure_date=stop_data.departure_date,
                    sequence=stop_data.sequence if stop_data.sequence is not None else idx,
                )
                await self.repo.create_stop(stop)

        full_trip = await self.repo.get_trip_by_id(trip.id)
        return TripResponse.model_validate(full_trip)

    async def list_trips(
        self,
        user_id: int,
        status_filter: Optional[str] = None,
        page: int = 1,
        page_size: int = 20,
    ) -> TripListResponse:
        page_size = min(max(page_size, 1), 100)
        items, total = await self.repo.list_user_trips(
            user_id=user_id, status=status_filter, page=page, page_size=page_size
        )
        total_pages = math.ceil(total / page_size) if page_size > 0 else 0
        return TripListResponse(
            items=[TripResponse.model_validate(t) for t in items],
            total=total,
            page=page,
            page_size=page_size,
            total_pages=total_pages,
        )

    async def get_trip(self, trip_id: int, user_id: Optional[int] = None) -> TripResponse:
        trip = await self.repo.get_trip_by_id(trip_id)
        if not trip:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip not found")

        # Allow access if user is owner OR trip is published
        if user_id and trip.user_id != user_id and trip.status != "published":
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")

        return TripResponse.model_validate(trip)

    async def update_trip(self, trip_id: int, user_id: int, data: TripUpdate) -> TripResponse:
        trip = await self.repo.get_trip_by_id(trip_id)
        if not trip:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip not found")
        if trip.user_id != user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")

        update_data = data.model_dump(exclude_unset=True)
        for key, val in update_data.items():
            setattr(trip, key, val)

        await self.repo.update_trip(trip)
        return TripResponse.model_validate(trip)

    async def delete_trip(self, trip_id: int, user_id: int) -> Dict[str, str]:
        trip = await self.repo.get_trip_by_id(trip_id)
        if not trip:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip not found")
        if trip.user_id != user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")

        await self.repo.delete_trip(trip)
        return {"detail": "Trip deleted successfully"}

    async def publish_trip(self, trip_id: int, user_id: int) -> TripResponse:
        trip = await self.repo.get_trip_by_id(trip_id)
        if not trip:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip not found")
        if trip.user_id != user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")

        trip.status = "published"
        await self.repo.update_trip(trip)
        return TripResponse.model_validate(trip)

    async def add_stop(self, trip_id: int, user_id: int, data: TripStopCreate) -> TripStopResponse:
        trip = await self.repo.get_trip_by_id(trip_id)
        if not trip:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip not found")
        if trip.user_id != user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")

        seq = len(trip.stops) if data.sequence is None else data.sequence
        stop = TripStop(
            trip_id=trip_id,
            city_id=data.city_id,
            arrival_date=data.arrival_date,
            departure_date=data.departure_date,
            sequence=seq,
        )
        stop = await self.repo.create_stop(stop)
        full_stop = await self.repo.get_stop_by_id(stop.id)
        return TripStopResponse.model_validate(full_stop)

    async def update_stop(self, stop_id: int, user_id: int, data: TripStopUpdate) -> TripStopResponse:
        stop = await self.repo.get_stop_by_id(stop_id)
        if not stop or not stop.trip:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip stop not found")
        if stop.trip.user_id != user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")

        update_data = data.model_dump(exclude_unset=True)
        for key, val in update_data.items():
            setattr(stop, key, val)

        await self.repo.update_trip(stop.trip)
        return TripStopResponse.model_validate(stop)

    async def delete_stop(self, stop_id: int, user_id: int) -> Dict[str, str]:
        stop = await self.repo.get_stop_by_id(stop_id)
        if not stop or not stop.trip:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip stop not found")
        if stop.trip.user_id != user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")

        await self.repo.delete_stop(stop)
        return {"detail": "Trip stop deleted"}

    async def get_trip_calendar(self, trip_id: int, user_id: int) -> CalendarResponse:
        trip = await self.repo.get_trip_by_id(trip_id)
        if not trip:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip not found")

        curr_date = trip.start_date
        days: List[CalendarDayResponse] = []

        while curr_date <= trip.end_date:
            active_stop = None
            for stop in trip.stops:
                if stop.arrival_date <= curr_date <= stop.departure_date:
                    active_stop = stop
                    break

            day_items: List[Dict[str, Any]] = []
            if active_stop and active_stop.itinerary_items:
                for item in active_stop.itinerary_items:
                    if item.date == curr_date:
                        day_items.append({
                            "id": item.id,
                            "title": item.title,
                            "type": item.type,
                            "start_time": str(item.start_time) if item.start_time else None,
                            "end_time": str(item.end_time) if item.end_time else None,
                            "cost": float(item.cost) if item.cost else None,
                        })

            city_resp = CityResponse.model_validate(active_stop.city) if active_stop and active_stop.city else None

            days.append(CalendarDayResponse(
                date=curr_date,
                city=city_resp,
                items=day_items,
            ))
            curr_date += timedelta(days=1)

        return CalendarResponse(
            trip_id=trip.id,
            trip_name=trip.name,
            start_date=trip.start_date,
            end_date=trip.end_date,
            days=days,
        )
