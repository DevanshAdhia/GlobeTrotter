import pytest
import pytest_asyncio
from httpx import ASGITransport, AsyncClient
from app.main import app
from app.core.security import generate_random_token


@pytest_asyncio.fixture
async def client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac



@pytest.mark.asyncio
class TestAuthRoutes:

    async def test_health_check(self, client: AsyncClient):
        response = await client.get("/api/health")
        assert response.status_code == 200

    async def test_register_and_login_flow(self, client: AsyncClient):
        email = f"test_{generate_random_token(4)}@example.com"

        # 1. Register
        reg_payload = {
            "name": "Test User",
            "email": email,
            "password": "Password123!",
        }
        reg_resp = await client.post("/api/v1/auth/register", json=reg_payload)
        assert reg_resp.status_code == 201
        reg_data = reg_resp.json()
        assert "access_token" in reg_data
        assert "refresh_token" in reg_data
        assert reg_data["user"]["email"] == email

        access_token = reg_data["access_token"]
        refresh_token = reg_data["refresh_token"]

        # 2. Duplicate registration attempt
        dup_resp = await client.post("/api/v1/auth/register", json=reg_payload)
        assert dup_resp.status_code == 400

        # 3. Get /me with valid access token
        me_resp = await client.get(
            "/api/v1/auth/me",
            headers={"Authorization": f"Bearer {access_token}"},
        )
        assert me_resp.status_code == 200
        assert me_resp.json()["email"] == email

        # 4. Login with valid credentials
        login_payload = {
            "email": email,
            "password": "Password123!",
        }
        login_resp = await client.post("/api/v1/auth/login", json=login_payload)
        assert login_resp.status_code == 200
        assert "access_token" in login_resp.json()

        # 5. Login with invalid password
        invalid_login = await client.post(
            "/api/v1/auth/login",
            json={"email": email, "password": "WrongPassword!"},
        )
        assert invalid_login.status_code == 401

        # 6. Refresh token
        ref_resp = await client.post(
            "/api/v1/auth/refresh",
            json={"refresh_token": refresh_token},
        )
        assert ref_resp.status_code == 200
        assert "access_token" in ref_resp.json()

        # 7. Logout
        logout_resp = await client.post(
            "/api/v1/auth/logout",
            json={"refresh_token": refresh_token},
        )
        assert logout_resp.status_code == 200

    async def test_get_me_unauthenticated(self, client: AsyncClient):
        response = await client.get("/api/v1/auth/me")
        assert response.status_code == 401

    async def test_google_login_flow(self, client: AsyncClient):
        dev_token = f"dev_test_token_{generate_random_token(4)}"
        resp = await client.post(
            "/api/v1/auth/google",
            json={"id_token": dev_token},
        )
        assert resp.status_code == 200
        data = resp.json()
        assert "access_token" in data
        assert data["user"]["provider"] == "google"

    async def test_change_password_flow(self, client: AsyncClient):
        email = f"changepw_{generate_random_token(4)}@example.com"
        reg_resp = await client.post(
            "/api/v1/auth/register",
            json={"name": "PW User", "email": email, "password": "OldPassword123!"},
        )
        access_token = reg_resp.json()["access_token"]

        # Change password
        chg_resp = await client.post(
            "/api/v1/auth/change-password",
            json={"current_password": "OldPassword123!", "new_password": "NewPassword123!"},
            headers={"Authorization": f"Bearer {access_token}"},
        )
        assert chg_resp.status_code == 200

        # Login with new password
        login_resp = await client.post(
            "/api/v1/auth/login",
            json={"email": email, "password": "NewPassword123!"},
        )
        assert login_resp.status_code == 200

