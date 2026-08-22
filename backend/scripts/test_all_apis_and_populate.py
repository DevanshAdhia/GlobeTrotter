import asyncio
import os
import io
import time
from typing import Dict, Any

import httpx
from app.db.base import import_all_models

import_all_models()

from app.main import app

BASE_URL = "http://test"


async def main():
    print("=" * 70)
    print("[STARTING END-TO-END DEVELOPER API TEST & DB POPULATION]")
    print("=" * 70)


    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url=BASE_URL, timeout=30.0) as client:

        # ---------------------------------------------------------------------
        # 1. AUTH MODULE
        # ---------------------------------------------------------------------
        print("\n--- [1] Testing Auth Module ---")

        # Register User 1
        u1_email = f"developer_{int(time.time())}@example.com"
        reg_resp = await client.post(
            "/api/v1/auth/register",
            json={"name": "Alex Developer", "email": u1_email, "password": "Password123!"},
        )
        assert reg_resp.status_code == 201, f"Register failed: {reg_resp.text}"
        u1_data = reg_resp.json()
        u1_token = u1_data["access_token"]
        u1_headers = {"Authorization": f"Bearer {u1_token}"}
        print(f"[OK] User 1 Registered: {u1_data['user']['name']} ({u1_data['user']['email']})")

        # Register User 2
        u2_email = f"traveler_{int(time.time())}@example.com"
        reg2_resp = await client.post(
            "/api/v1/auth/register",
            json={"name": "Sarah Traveler", "email": u2_email, "password": "Password123!"},
        )
        assert reg2_resp.status_code == 201, f"Register 2 failed: {reg2_resp.text}"
        u2_data = reg2_resp.json()
        u2_token = u2_data["access_token"]
        u2_headers = {"Authorization": f"Bearer {u2_token}"}
        print(f"[OK] User 2 Registered: {u2_data['user']['name']} ({u2_data['user']['email']})")

        # Login User 1
        login_resp = await client.post(
            "/api/v1/auth/login",
            json={"email": u1_email, "password": "Password123!"},
        )
        assert login_resp.status_code == 200, f"Login failed: {login_resp.text}"
        print("[OK] User 1 Login successful")

        # Get /me
        me_resp = await client.get("/api/v1/auth/me", headers=u1_headers)
        assert me_resp.status_code == 200, f"Get /me failed: {me_resp.text}"
        print(f"[OK] Get /me successful for ID {me_resp.json()['id']}")

        # Login Admin User
        admin_login = await client.post(
            "/api/v1/auth/login",
            json={"email": "admin@globetrotter.com", "password": "Admin123!"},
        )
        assert admin_login.status_code == 200, f"Admin login failed: {admin_login.text}"
        admin_token = admin_login.json()["access_token"]
        admin_headers = {"Authorization": f"Bearer {admin_token}"}
        print("[OK] Admin Login successful")

        # ---------------------------------------------------------------------
        # 2. DISCOVERY MODULE
        # ---------------------------------------------------------------------
        print("\n--- [2] Testing Discovery Module ---")

        cities_resp = await client.get("/api/v1/cities")
        assert cities_resp.status_code == 200, f"Cities failed: {cities_resp.text}"
        cities = cities_resp.json()["items"]
        assert len(cities) > 0, "No cities found!"
        print(f"[OK] Listed {len(cities)} cities from DB (e.g. {cities[0]['name']}, {cities[1]['name']})")

        paris_id = next(c["id"] for c in cities if c["name"] == "Paris")
        tokyo_id = next(c["id"] for c in cities if c["name"] == "Tokyo")

        city_detail = await client.get(f"/api/v1/cities/{paris_id}")
        assert city_detail.status_code == 200, f"City detail failed: {city_detail.text}"
        print(f"[OK] Fetched City Detail: {city_detail.json()['name']} in {city_detail.json()['country']}")

        activities_resp = await client.get("/api/v1/activities")
        assert activities_resp.status_code == 200, f"Activities failed: {activities_resp.text}"
        activities = activities_resp.json()["items"]
        print(f"[OK] Listed {len(activities)} activities from DB")

        # ---------------------------------------------------------------------
        # 3. TRIPS & STOPS MODULE
        # ---------------------------------------------------------------------
        print("\n--- [3] Testing Trips & Stops Module ---")

        # Create Trip 1 (Alex)
        trip1_resp = await client.post(
            "/api/v1/trips",
            json={
                "name": "Japan & France Explorer 2026",
                "description": "Bucket list trip to Tokyo and Paris!",
                "start_date": "2026-10-01",
                "end_date": "2026-10-15",
                "travel_style": "adventure",
                "total_budget": 5000.0,
                "currency": "USD",
            },
            headers=u1_headers,
        )
        assert trip1_resp.status_code == 201, f"Trip creation failed: {trip1_resp.text}"
        trip1 = trip1_resp.json()
        trip1_id = trip1["id"]
        print(f"[OK] Trip 1 Created: '{trip1['name']}' (ID: {trip1_id})")

        # Add Stop 1 (Tokyo)
        stop1_resp = await client.post(
            f"/api/v1/trips/{trip1_id}/stops",
            json={
                "city_id": tokyo_id,
                "arrival_date": "2026-10-01",
                "departure_date": "2026-10-07",
                "sequence": 0,
            },
            headers=u1_headers,
        )
        assert stop1_resp.status_code == 201, f"Stop 1 failed: {stop1_resp.text}"
        stop1_id = stop1_resp.json()["id"]
        print(f"[OK] Added Stop 1 (Tokyo) to Trip {trip1_id}")

        # Add Stop 2 (Paris)
        stop2_resp = await client.post(
            f"/api/v1/trips/{trip1_id}/stops",
            json={
                "city_id": paris_id,
                "arrival_date": "2026-10-08",
                "departure_date": "2026-10-15",
                "sequence": 1,
            },
            headers=u1_headers,
        )
        assert stop2_resp.status_code == 201, f"Stop 2 failed: {stop2_resp.text}"
        stop2_id = stop2_resp.json()["id"]
        print(f"[OK] Added Stop 2 (Paris) to Trip {trip1_id}")

        # Get Trip Calendar
        cal_resp = await client.get(f"/api/v1/trips/{trip1_id}/calendar", headers=u1_headers)
        assert cal_resp.status_code == 200, f"Calendar failed: {cal_resp.text}"
        print(f"[OK] Generated Trip Calendar with {len(cal_resp.json()['days'])} days")

        # ---------------------------------------------------------------------
        # 4. ITINERARY MODULE
        # ---------------------------------------------------------------------
        print("\n--- [4] Testing Itinerary Module ---")

        # Add Activity Item to Stop 1
        item1_resp = await client.post(
            f"/api/v1/trips/{trip1_id}/itinerary",
            json={
                "trip_stop_id": stop1_id,
                "type": "activity",
                "title": "Visit Shibuya Crossing & Ramen Dinner",
                "date": "2026-10-02",
                "start_time": "18:00:00",
                "end_time": "21:00:00",
                "cost": 50.00,
                "notes": "Bring camera!",
                "sequence": 0,
            },
            headers=u1_headers,
        )
        assert item1_resp.status_code == 201, f"Itinerary Item 1 failed: {item1_resp.text}"
        item1_id = item1_resp.json()["id"]

        # Add Meal Item to Stop 1
        item2_resp = await client.post(
            f"/api/v1/trips/{trip1_id}/itinerary",
            json={
                "trip_stop_id": stop1_id,
                "type": "meal",
                "title": "Tsukiji Outer Market Breakfast",
                "date": "2026-10-03",
                "start_time": "08:30:00",
                "end_time": "10:30:00",
                "cost": 30.00,
                "notes": "Fresh sushi breakfast",
                "sequence": 1,
            },
            headers=u1_headers,
        )
        assert item2_resp.status_code == 201, f"Itinerary Item 2 failed: {item2_resp.text}"
        item2_id = item2_resp.json()["id"]
        print("[OK] Added Itinerary Items to Tokyo stop")

        # Reorder Itinerary Items
        reorder_resp = await client.put(
            f"/api/v1/trips/{trip1_id}/itinerary/reorder",
            json={"items": [{"id": item1_id, "sequence": 1}, {"id": item2_id, "sequence": 0}]},
            headers=u1_headers,
        )
        assert reorder_resp.status_code == 200, f"Reorder failed: {reorder_resp.text}"
        print("[OK] Reordered Itinerary Items successfully")

        # ---------------------------------------------------------------------
        # 5. BUDGET & EXPENSES MODULE
        # ---------------------------------------------------------------------
        print("\n--- [5] Testing Budget & Expenses Module ---")

        # Log Expense 1 (Hotel)
        exp1_resp = await client.post(
            f"/api/v1/trips/{trip1_id}/expenses",
            json={"category": "stay", "amount": 1200.00, "description": "Shinjuku Hotel 6 nights"},
            headers=u1_headers,
        )
        assert exp1_resp.status_code == 201, f"Expense 1 failed: {exp1_resp.text}"

        # Log Expense 2 (Flight)
        exp2_resp = await client.post(
            f"/api/v1/trips/{trip1_id}/expenses",
            json={"category": "transport", "amount": 950.00, "description": "Flight Tokyo to Paris"},
            headers=u1_headers,
        )
        assert exp2_resp.status_code == 201, f"Expense 2 failed: {exp2_resp.text}"

        # Get Budget Breakdown
        budget_resp = await client.get(f"/api/v1/trips/{trip1_id}/budget", headers=u1_headers)
        assert budget_resp.status_code == 200, f"Budget breakdown failed: {budget_resp.text}"
        b_data = budget_resp.json()
        print(f"[OK] Budget Breakdown: Recorded ${b_data['recorded_expenses_total']} out of ${b_data['total_budget_limit']} limit (Remaining: ${b_data['remaining_budget']})")

        # ---------------------------------------------------------------------
        # 6. COMMUNITY & SHARING MODULE
        # ---------------------------------------------------------------------
        print("\n--- [6] Testing Community & Sharing Module ---")

        # Publish Trip 1
        pub_resp = await client.post(f"/api/v1/trips/{trip1_id}/publish", headers=u1_headers)
        assert pub_resp.status_code == 200, f"Publish failed: {pub_resp.text}"
        print(f"[OK] Published Trip {trip1_id}")

        # Share Trip 1
        share_resp = await client.post(f"/api/v1/trips/{trip1_id}/share", headers=u1_headers)
        assert share_resp.status_code == 200, f"Share failed: {share_resp.text}"
        share_token = share_resp.json()["share_token"]
        print(f"[OK] Generated Share Token: {share_token}")

        # Get Public Trip (Anonymous)
        public_resp = await client.get(f"/api/v1/public/trips/{share_token}")
        assert public_resp.status_code == 200, f"Public trip view failed: {public_resp.text}"
        print(f"[OK] View Public Trip: '{public_resp.json()['trip']['name']}' by {public_resp.json()['author_name']}")

        # User 2 copies Public Trip
        copy_resp = await client.post(f"/api/v1/public/trips/{share_token}/copy", headers=u2_headers)
        assert copy_resp.status_code == 201, f"Copy trip failed: {copy_resp.text}"
        copied_trip = copy_resp.json()
        print(f"[OK] User 2 Copied Trip: '{copied_trip['name']}' (New Trip ID: {copied_trip['id']})")

        # Submit Review
        review_resp = await client.post(
            "/api/v1/reviews",
            json={"trip_id": trip1_id, "rating": 5, "comment": "Unbelievable itinerary! Loved Tokyo and Paris!"},
            headers=u2_headers,
        )
        assert review_resp.status_code == 201, f"Review failed: {review_resp.text}"
        print("[OK] Submitted 5-star Community Review")

        # List Community Feed
        comm_resp = await client.get("/api/v1/community")
        assert comm_resp.status_code == 200, f"Community feed failed: {comm_resp.text}"
        print(f"[OK] Listed {len(comm_resp.json())} Community Trip Cards")

        # ---------------------------------------------------------------------
        # 7. PROFILE & BOOKMARKS MODULE
        # ---------------------------------------------------------------------
        print("\n--- [7] Testing Profile & Bookmarks Module ---")

        # Save Destination
        save_resp = await client.post(
            "/api/v1/users/saved-destinations",
            json={"city_id": paris_id},
            headers=u1_headers,
        )
        assert save_resp.status_code == 201, f"Save destination failed: {save_resp.text}"

        # List Saved Destinations
        saved_list = await client.get("/api/v1/users/saved-destinations", headers=u1_headers)
        assert saved_list.status_code == 200, f"List saved failed: {saved_list.text}"
        print(f"[OK] User 1 Saved Destinations: {[s['city']['name'] for s in saved_list.json()]}")

        # Update Profile
        upd_prof = await client.put(
            "/api/v1/users/profile",
            json={"name": "Alex Developer Pro", "language": "en"},
            headers=u1_headers,
        )
        assert upd_prof.status_code == 200, f"Update profile failed: {upd_prof.text}"
        print(f"[OK] Profile Updated: {upd_prof.json()['name']}")

        # ---------------------------------------------------------------------
        # 8. UPLOADS MODULE
        # ---------------------------------------------------------------------
        print("\n--- [8] Testing Uploads Module ---")

        fake_image_bytes = b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15c4"
        files = {"file": ("test_cover.png", io.BytesIO(fake_image_bytes), "image/png")}
        up_resp = await client.post("/api/v1/uploads/image", files=files, headers=u1_headers)
        assert up_resp.status_code == 200, f"Upload failed: {up_resp.text}"
        image_url = up_resp.json()["url"]
        print(f"[OK] Uploaded Image File: {image_url}")

        # ---------------------------------------------------------------------
        # 9. ADMIN & MODERATION MODULE
        # ---------------------------------------------------------------------
        print("\n--- [9] Testing Admin & Moderation Module ---")

        # Submit Moderation Report
        rep_resp = await client.post(
            "/api/v1/reports",
            json={"entity_type": "trip", "entity_id": trip1_id, "reason": "Testing report queue"},
            headers=u2_headers,
        )
        assert rep_resp.status_code == 201, f"Report failed: {rep_resp.text}"
        report_id = rep_resp.json()["id"]
        print(f"[OK] Content Report Submitted (Report ID: {report_id})")

        # Get Admin Dashboard Metrics
        dash_resp = await client.get("/api/v1/admin/dashboard", headers=admin_headers)
        assert dash_resp.status_code == 200, f"Admin dashboard failed: {dash_resp.text}"
        dash = dash_resp.json()
        print(f"[OK] Admin Dashboard Metrics: {dash['total_users']} Users, {dash['total_trips']} Trips ({dash['published_trips']} Published), {dash['total_cities']} Cities, {dash['pending_reports']} Pending Reports")

        # List Admin Reports
        admin_reps = await client.get("/api/v1/admin/reports", headers=admin_headers)
        assert admin_reps.status_code == 200, f"Admin list reports failed: {admin_reps.text}"

        # Resolve Report
        res_rep = await client.put(
            f"/api/v1/admin/reports/{report_id}/status",
            json={"status": "resolved"},
            headers=admin_headers,
        )
        assert res_rep.status_code == 200, f"Resolve report failed: {res_rep.text}"
        print(f"[OK] Admin Resolved Report {report_id}")

    print("\n" + "=" * 70)
    print("[SUCCESS] ALL API ENDPOINTS VERIFIED & DB DATA POPULATED SUCCESSFULLY!")
    print("=" * 70)



if __name__ == "__main__":
    asyncio.run(main())
