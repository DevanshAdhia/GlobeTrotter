import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.staticfiles import StaticFiles

from app.core.config import settings
from app.common.exceptions import setup_exception_handlers
from app.common.middleware import RequestLoggingMiddleware
from app.common.health import router as health_router
from app.db.session import engine
from app.db.base import Base, import_all_models

import_all_models()


from app.modules.auth.routes import router as auth_router
from app.modules.discovery.routes import router as discovery_router
from app.modules.trips.routes import router as trips_router
from app.modules.itinerary.routes import router as itinerary_router
from app.modules.budget.routes import router as budget_router
from app.modules.community.routes import router as community_router
from app.modules.profile.routes import router as profile_router
from app.modules.uploads.routes import router as uploads_router
from app.modules.admin.routes import router as admin_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
    except Exception as e:
        import logging
        logging.getLogger("uvicorn.error").warning(f"Database initialization warning: {e}")
    yield
    # Shutdown
    await engine.dispose()


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="GlobeTrotter Travel Planning API.",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    lifespan=lifespan,
)

# Static files for image uploads
uploads_dir = os.path.join(os.getcwd(), "uploads")
os.makedirs(uploads_dir, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=uploads_dir), name="uploads")

# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(TrustedHostMiddleware, allowed_hosts=["*"])
app.add_middleware(RequestLoggingMiddleware)

# Exception handlers
setup_exception_handlers(app)

# Routers
app.include_router(health_router, prefix="/api", tags=["Health"])
app.include_router(auth_router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(discovery_router, prefix="/api/v1", tags=["Discovery"])
app.include_router(trips_router, prefix="/api/v1", tags=["Trips"])
app.include_router(itinerary_router, prefix="/api/v1", tags=["Itinerary"])
app.include_router(budget_router, prefix="/api/v1", tags=["Budget"])
app.include_router(community_router, prefix="/api/v1", tags=["Community"])
app.include_router(profile_router, prefix="/api/v1", tags=["Profile"])
app.include_router(uploads_router, prefix="/api/v1", tags=["Uploads"])
app.include_router(admin_router, prefix="/api/v1", tags=["Admin"])



