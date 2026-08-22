import math
import secrets
from typing import List, Optional
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.community.model import Review, Share
from app.modules.community.repository import CommunityRepository
from app.modules.community.schema import (
    CommunityTripCardResponse,
    PublicTripResponse,
    ReviewCreate,
    ReviewListResponse,
    ReviewResponse,
    ShareResponse,
)
from app.modules.itinerary.model import ItineraryItem
from app.modules.trips.model import Trip, TripStop
from app.modules.trips.repository import TripRepository
from app.modules.trips.schema import TripResponse


class CommunityService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.repo = CommunityRepository(db)
        self.trip_repo = TripRepository(db)

    async def get_or_create_share(self, trip_id: int, user_id: int) -> ShareResponse:
        trip = await self.trip_repo.get_trip_by_id(trip_id)
        if not trip:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip not found")
        if trip.user_id != user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")

        share = await self.repo.get_share_by_trip_id(trip_id)
        if not share:
            share = Share(
                trip_id=trip_id,
                share_token=secrets.token_urlsafe(32),
                visibility="public",
            )
            share = await self.repo.create_share(share)

        share_url = f"/api/v1/public/trips/{share.share_token}"
        return ShareResponse(
            id=share.id,
            trip_id=share.trip_id,
            share_token=share.share_token,
            visibility=share.visibility,
            share_url=share_url,
        )

    async def get_public_trip(self, share_token: str) -> PublicTripResponse:
        share = await self.repo.get_share_by_token(share_token)
        if not share or not share.trip or share.visibility != "public":
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Shared trip not found")

        trip = share.trip
        author_name = trip.user.name if trip.user else "Anonymous Travel Enthusiast"

        trip_resp = TripResponse.model_validate(trip)
        return PublicTripResponse(
            trip=trip_resp,
            share_token=share.share_token,
            author_name=author_name,
        )

    async def copy_public_trip(self, share_token: str, user_id: int) -> TripResponse:
        share = await self.repo.get_share_by_token(share_token)
        if not share or not share.trip:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Shared trip not found")

        src_trip = share.trip

        new_trip = Trip(
            user_id=user_id,
            name=f"Copy of {src_trip.name}",
            description=src_trip.description,
            cover_image=src_trip.cover_image,
            start_date=src_trip.start_date,
            end_date=src_trip.end_date,
            status="draft",
            travel_style=src_trip.travel_style,
            total_budget=src_trip.total_budget,
            currency=src_trip.currency,
        )
        new_trip = await self.trip_repo.create_trip(new_trip)

        for stop in src_trip.stops:
            new_stop = TripStop(
                trip_id=new_trip.id,
                city_id=stop.city_id,
                arrival_date=stop.arrival_date,
                departure_date=stop.departure_date,
                sequence=stop.sequence,
            )
            new_stop = await self.trip_repo.create_stop(new_stop)

            for item in stop.itinerary_items:
                new_item = ItineraryItem(
                    trip_stop_id=new_stop.id,
                    activity_id=item.activity_id,
                    type=item.type,
                    title=item.title,
                    date=item.date,
                    start_time=item.start_time,
                    end_time=item.end_time,
                    cost=item.cost,
                    currency=item.currency,
                    notes=item.notes,
                    sequence=item.sequence,
                )
                self.db.add(new_item)

        await self.db.flush()
        full_trip = await self.trip_repo.get_trip_by_id(new_trip.id)
        return TripResponse.model_validate(full_trip)

    async def list_community_trips(self, page: int = 1, page_size: int = 20) -> List[CommunityTripCardResponse]:
        page_size = min(max(page_size, 1), 100)
        shares, total = await self.repo.list_community_trips(page=page, page_size=page_size)

        cards = []
        for s in shares:
            t = s.trip
            avg_rating = 0.0
            if t.reviews:
                avg_rating = sum(r.rating for r in t.reviews) / len(t.reviews)

            cards.append(
                CommunityTripCardResponse(
                    id=t.id,
                    name=t.name,
                    description=t.description,
                    cover_image=t.cover_image,
                    author_name=t.user.name if t.user else "Explorer",
                    travel_style=t.travel_style,
                    stops_count=len(t.stops),
                    share_token=s.share_token,
                    average_rating=round(avg_rating, 2),
                )
            )

        return cards

    async def create_review(self, user_id: int, data: ReviewCreate) -> ReviewResponse:
        if not data.trip_id and not data.activity_id:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Review must specify trip_id or activity_id")

        review = Review(
            user_id=user_id,
            trip_id=data.trip_id,
            activity_id=data.activity_id,
            rating=data.rating,
            comment=data.comment,
        )
        review = await self.repo.create_review(review)
        return ReviewResponse(
            id=review.id,
            user_id=review.user_id,
            trip_id=review.trip_id,
            activity_id=review.activity_id,
            rating=review.rating,
            comment=review.comment,
            created_at=review.created_at,
        )

    async def list_reviews(
        self,
        trip_id: Optional[int] = None,
        activity_id: Optional[int] = None,
        page: int = 1,
        page_size: int = 20,
    ) -> ReviewListResponse:
        page_size = min(max(page_size, 1), 100)
        reviews, total = await self.repo.list_reviews(trip_id=trip_id, activity_id=activity_id, page=page, page_size=page_size)
        total_pages = math.ceil(total / page_size) if page_size > 0 else 0

        res_items = [
            ReviewResponse(
                id=r.id,
                user_id=r.user_id,
                trip_id=r.trip_id,
                activity_id=r.activity_id,
                rating=r.rating,
                comment=r.comment,
                created_at=r.created_at,
                user_name=r.user.name if r.user else None,
            )
            for r in reviews
        ]

        return ReviewListResponse(
            items=res_items,
            total=total,
            page=page,
            page_size=page_size,
            total_pages=total_pages,
        )
