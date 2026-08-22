import pytest
import pytest_asyncio
from httpx import ASGITransport, AsyncClient

from app.core.security import generate_random_token
from app.main import app


@pytest_asyncio.fixture
async def client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac


@pytest.mark.asyncio
class TestDomainModules:

    async def test_discovery_endpoints(self, client: AsyncClient):
        # 1. Cities
        cities_resp = await client.get("/api/v1/cities")
        assert cities_resp.status_code == 200
        cities_data = cities_resp.json()
        assert "items" in cities_data
        assert cities_data["total"] >= 0

        # 2. Activities
        activities_resp = await client.get("/api/v1/activities")
        assert activities_resp.status_code == 200
        act_data = activities_resp.json()
        assert "items" in act_data

    async def test_full_trip_and_budget_flow(self, client: AsyncClient):
        # 1. Register User
        email = f"trip_user_{generate_random_token(4)}@example.com"
        reg_resp = await client.post(
            "/api/v1/auth/register",
            json={"name": "Trip Creator", "email": email, "password": "Password123!"},
        )
        assert reg_resp.status_code == 201
        token = reg_resp.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}

        # 2. Create Trip
        trip_resp = await client.post(
            "/api/v1/trips",
            json={
                "name": "Euro Summer Vacation",
                "description": "2 weeks exploring Europe",
                "start_date": "2026-09-01",
                "end_date": "2026-09-15",
                "travel_style": "balanced",
                "total_budget": 3000.0,
            },
            headers=headers,
        )
        assert trip_resp.status_code == 201
        trip = trip_resp.json()
        trip_id = trip["id"]
        assert trip["name"] == "Euro Summer Vacation"

        # 3. Add Expense
        exp_resp = await client.post(
            f"/api/v1/trips/{trip_id}/expenses",
            json={
                "category": "stay",
                "amount": 450.0,
                "description": "Hotel reservation in Paris",
            },
            headers=headers,
        )
        assert exp_resp.status_code == 201

        # 4. Get Budget Breakdown
        budget_resp = await client.get(
            f"/api/v1/trips/{trip_id}/budget",
            headers=headers,
        )
        assert budget_resp.status_code == 200
        budget_data = budget_resp.json()
        assert budget_data["recorded_expenses_total"] == 450.0
        assert budget_data["remaining_budget"] == 2550.0

        # 5. Share Trip
        share_resp = await client.post(
            f"/api/v1/trips/{trip_id}/share",
            headers=headers,
        )
        assert share_resp.status_code == 200
        assert "share_token" in share_resp.json()

    async def test_profile_and_bookmarks(self, client: AsyncClient):
        email = f"profile_user_{generate_random_token(4)}@example.com"
        reg_resp = await client.post(
            "/api/v1/auth/register",
            json={"name": "Profile User", "email": email, "password": "Password123!"},
        )
        token = reg_resp.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}

        # 1. Update profile
        prof_resp = await client.put(
            "/api/v1/users/profile",
            json={"name": "Updated Profile Name", "language": "fr"},
            headers=headers,
        )
        assert prof_resp.status_code == 200
        assert prof_resp.json()["name"] == "Updated Profile Name"
        assert prof_resp.json()["language"] == "fr"

        # 2. Get saved destinations
        saved_resp = await client.get("/api/v1/users/saved-destinations", headers=headers)
        assert saved_resp.status_code == 200
