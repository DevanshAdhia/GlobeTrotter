import asyncio
import time
import math
import statistics
import random
import logging

# Mute verbose SQL query logging before importing ORM models
logging.getLogger("sqlalchemy.engine").setLevel(logging.WARNING)

from typing import List, Tuple
import httpx
from app.db.base import import_all_models

import_all_models()

from app.main import app

BASE_URL = "http://test"




async def fetch_endpoint(client: httpx.AsyncClient, method: str, url: str, **kwargs) -> Tuple[int, float]:
    start = time.perf_counter()
    try:
        resp = await client.request(method, url, **kwargs)
        duration = (time.perf_counter() - start) * 1000.0  # ms
        return resp.status_code, duration
    except Exception as e:
        duration = (time.perf_counter() - start) * 1000.0
        return 500, duration


def calculate_metrics(results: List[Tuple[int, float]], total_duration_sec: float):
    statuses = [r[0] for r in results]
    latencies = [r[1] for r in results]

    success_count = sum(1 for s in statuses if 200 <= s < 300)
    failed_count = len(statuses) - success_count
    rps = len(results) / total_duration_sec if total_duration_sec > 0 else 0.0

    sorted_lat = sorted(latencies)
    min_lat = sorted_lat[0] if sorted_lat else 0.0
    max_lat = sorted_lat[-1] if sorted_lat else 0.0
    avg_lat = statistics.mean(sorted_lat) if sorted_lat else 0.0
    p50 = sorted_lat[int(len(sorted_lat) * 0.50)] if sorted_lat else 0.0
    p95 = sorted_lat[int(len(sorted_lat) * 0.95)] if sorted_lat else 0.0
    p99 = sorted_lat[int(len(sorted_lat) * 0.99)] if sorted_lat else 0.0

    return {
        "total_requests": len(results),
        "success_count": success_count,
        "failed_count": failed_count,
        "success_rate": (success_count / len(results)) * 100.0 if len(results) > 0 else 0.0,
        "duration_sec": total_duration_sec,
        "rps": rps,
        "min_ms": min_lat,
        "avg_ms": avg_lat,
        "p50_ms": p50,
        "p95_ms": p95,
        "p99_ms": p99,
        "max_ms": max_lat,
    }


def print_metrics(title: str, metrics: dict):
    print("=" * 70)
    print(f"   HIGH-CONCURRENCY LOAD BENCHMARK: {title}")
    print("=" * 70)
    print(f"  Total Requests Executed : {metrics['total_requests']}")
    print(f"  Successful Requests (2xx): {metrics['success_count']} ({metrics['success_rate']:.2f}%)")
    print(f"  Failed Requests         : {metrics['failed_count']}")
    print(f"  Total Burst Duration    : {metrics['duration_sec']:.3f} seconds")
    print(f"  Throughput (RPS)        : {metrics['rps']:.2f} Requests/Sec")
    print("-" * 70)
    print("  Latency Percentiles (Milliseconds):")
    print(f"    Min Latency   : {metrics['min_ms']:.2f} ms")
    print(f"    Avg Latency   : {metrics['avg_ms']:.2f} ms")
    print(f"    p50 (Median)  : {metrics['p50_ms']:.2f} ms")
    print(f"    p95 Latency   : {metrics['p95_ms']:.2f} ms")
    print(f"    p99 Latency   : {metrics['p99_ms']:.2f} ms")
    print(f"    Max Latency   : {metrics['max_ms']:.2f} ms")
    print("=" * 70 + "\n")


async def main():
    print("\n" + "#" * 70)
    print("# GLOBETROTTER BACKEND HIGH CONCURRENCY SCALABILITY & STRESS TEST")
    print("#" * 70 + "\n")

    transport = httpx.ASGITransport(app=app)
    # Configure high connection limit for stress test
    limits = httpx.Limits(max_keepalive_connections=500, max_connections=2000)

    async with httpx.AsyncClient(transport=transport, base_url=BASE_URL, limits=limits, timeout=60.0) as client:

        # ---------------------------------------------------------------------
        # BENCHMARK 1: 1,000 Concurrent Requests to SAME API (GET /api/v1/cities)
        # ---------------------------------------------------------------------
        NUM_CONCURRENT = 1000
        print(f"--> [SCENARIO 1] Launching burst of {NUM_CONCURRENT} concurrent requests to SAME API (GET /api/v1/cities)...")

        t0 = time.perf_counter()
        tasks = [fetch_endpoint(client, "GET", "/api/v1/cities") for _ in range(NUM_CONCURRENT)]
        results = await asyncio.gather(*tasks)
        t1 = time.perf_counter()

        m1 = calculate_metrics(results, t1 - t0)
        print_metrics("1,000 Concurrent Requests - Same Endpoint (/api/v1/cities)", m1)

        # ---------------------------------------------------------------------
        # BENCHMARK 2: 1,000 Concurrent Requests to MIXED APIs
        # ---------------------------------------------------------------------
        endpoints = [
            ("GET", "/api/v1/cities"),
            ("GET", "/api/v1/activities"),
            ("GET", "/api/v1/community"),
            ("GET", "/api/v1/reviews"),
            ("POST", "/api/v1/auth/login", {"json": {"email": "admin@globetrotter.com", "password": "Admin123!"}}),
        ]

        print(f"--> [SCENARIO 2] Launching burst of {NUM_CONCURRENT} concurrent requests to MIXED APIs...")

        mixed_tasks = []
        for _ in range(NUM_CONCURRENT):
            ep = random.choice(endpoints)
            method = ep[0]
            url = ep[1]
            kwargs = ep[2] if len(ep) > 2 else {}
            mixed_tasks.append(fetch_endpoint(client, method, url, **kwargs))

        t0 = time.perf_counter()
        mixed_results = await asyncio.gather(*mixed_tasks)
        t1 = time.perf_counter()

        m2 = calculate_metrics(mixed_results, t1 - t0)
        print_metrics("1,000 Concurrent Requests - Mixed Endpoints (Auth, Discovery, Community, Reviews)", m2)


if __name__ == "__main__":
    asyncio.run(main())
