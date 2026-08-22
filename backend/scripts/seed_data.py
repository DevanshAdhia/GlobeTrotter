import asyncio
from sqlalchemy import select
from app.db.base import Base, import_all_models

import_all_models()


from app.db.session import engine, AsyncSessionLocal
from app.modules.discovery.model import City, Activity
from app.modules.auth.model import User
from app.core.security import get_password_hash



INITIAL_CITIES = [
    {
        "name": "Paris",
        "country": "France",
        "region": "Europe",
        "latitude": 48.8566,
        "longitude": 2.3522,
        "cost_index": 85.5,
        "popularity_score": 98.0,
        "image": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    },
    {
        "name": "Tokyo",
        "country": "Japan",
        "region": "Asia",
        "latitude": 35.6762,
        "longitude": 139.6503,
        "cost_index": 80.0,
        "popularity_score": 96.5,
        "image": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26",
    },
    {
        "name": "New York",
        "country": "United States",
        "region": "North America",
        "latitude": 40.7128,
        "longitude": -74.0060,
        "cost_index": 95.0,
        "popularity_score": 97.5,
        "image": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9",
    },
    {
        "name": "Rome",
        "country": "Italy",
        "region": "Europe",
        "latitude": 41.9028,
        "longitude": 12.4964,
        "cost_index": 75.0,
        "popularity_score": 94.0,
        "image": "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
    },
    {
        "name": "Bali",
        "country": "Indonesia",
        "region": "Asia",
        "latitude": -8.4095,
        "longitude": 115.1889,
        "cost_index": 45.0,
        "popularity_score": 92.0,
        "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
    },
]


async def seed():
    async with AsyncSessionLocal() as session:
        # 1. Seed Admin User
        admin_res = await session.execute(select(User).where(User.email == "admin@globetrotter.com"))
        if not admin_res.scalars().first():
            admin_user = User(
                name="Admin User",
                email="admin@globetrotter.com",
                password_hash=get_password_hash("Admin123!"),
                role="admin",
                is_active=True,
                provider="local",
            )
            session.add(admin_user)
            print("Admin user created (admin@globetrotter.com / Admin123!)")

        # 2. Seed Cities & Activities
        for city_data in INITIAL_CITIES:
            res = await session.execute(
                select(City).where(City.name == city_data["name"], City.country == city_data["country"])
            )
            city = res.scalars().first()
            if not city:
                city = City(**city_data)
                session.add(city)
                await session.flush()
                print(f"City added: {city.name}")

                # Add sample activities for city
                if city.name == "Paris":
                    activities = [
                        Activity(
                            city_id=city.id,
                            name="Eiffel Tower Summit Tour",
                            description="Experience panoramic views of Paris from the iconic landmark.",
                            category="sightseeing",
                            duration_minutes=120,
                            estimated_cost=35.00,
                            rating=4.8,
                        ),
                        Activity(
                            city_id=city.id,
                            name="Louvre Museum Guided Tour",
                            description="Discover world-famous art masterpieces including the Mona Lisa.",
                            category="culture",
                            duration_minutes=180,
                            estimated_cost=25.00,
                            rating=4.9,
                        ),
                    ]
                    session.add_all(activities)
                elif city.name == "Tokyo":
                    activities = [
                        Activity(
                            city_id=city.id,
                            name="Senso-ji Temple Exploration",
                            description="Visit Tokyo's oldest ancient Buddhist temple in Asakusa.",
                            category="culture",
                            duration_minutes=90,
                            estimated_cost=0.00,
                            rating=4.7,
                        ),
                        Activity(
                            city_id=city.id,
                            name="Shibuya Crossing & Food Tour",
                            description="Cross the world's busiest intersection and taste local street food.",
                            category="food",
                            duration_minutes=150,
                            estimated_cost=45.00,
                            rating=4.85,
                        ),
                    ]
                    session.add_all(activities)

        await session.commit()
        print("Database seed completed successfully!")


if __name__ == "__main__":
    asyncio.run(seed())
