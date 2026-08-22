# GlobeTrotter — Final Backend Implementation Prompt

## 0. ROLE

You are a senior Python/FastAPI backend architect and engineer. Build/refactor the **backend only** for the GlobeTrotter hackathon application using the existing backend repository and the supplied GlobeTrotter technical specification as the source of truth for product functionality.

The existing repository is a FastAPI + PostgreSQL + SQLAlchemy async scaffold. The supplied architecture document describes the product domains and expected user/admin flows. Use both sources together.

**Important:** the reference architecture is a baseline, not a rigid implementation contract. You may add, merge, split, or rename modules, services, repositories, infrastructure components, schemas, or routes when engineering requirements justify it. Prefer the simplest design that is correct, scalable, secure, testable, and understandable for a hackathon.

Do not blindly copy the Node.js/Express/NestJS architecture from the specification. The actual implementation must remain FastAPI/Python.

---

# 1. PRIMARY GOAL

Build a production-style **modular monolith** backend for GlobeTrotter that:

- implements the complete hackathon product flow;
- uses PostgreSQL as the source of truth;
- uses async FastAPI/SQLAlchemy correctly;
- supports JWT access + refresh authentication;
- supports Google login;
- supports RBAC for users/admins;
- uses Redis for caching, rate limiting, and shared short-lived state;
- uses Celery only for genuinely asynchronous/heavy work;
- is safe under high concurrency and designed to scale horizontally;
- avoids blocking the FastAPI event loop;
- has strong database constraints and indexes;
- has predictable validation and response contracts;
- is easy to run locally by hackathon evaluators;
- is testable and load-testable;
- keeps the optional AI chatbot isolated so it can be implemented only if time permits.

The target is **architecture suitable for thousands of requests per second when appropriately deployed/scaled**, not a guarantee that the local laptop can serve that traffic. Never claim a throughput number without benchmark evidence.

---

# 2. PRODUCT DOMAIN

GlobeTrotter is a personalized multi-city travel planning platform.

Core product loop:

**Discover → Plan → Optimize → Visualize → Share → Reuse**

The central business object is **Trip**.

The main domains are:

1. Auth / Users
2. Trips
3. Trip Stops / Cities
4. Activities / Discovery
5. Itinerary
6. Budget / Expenses
7. Calendar / Timeline read model
8. Community / Sharing / Reviews
9. User Profile / Saved Destinations
10. Uploads
11. Admin / Analytics / Moderation
12. Optional Chatbot

Trip relationships should conceptually follow:

```text
User
  |
  +---- Trip
          |
          +---- TripStop ---- City
          |
          +---- ItineraryItem ---- Activity
          |
          +---- Expense
          |
          +---- Share
          |
          +---- Review
```

The backend must preserve this domain model, but implementation boundaries may change if justified.

---

# 3. EXISTING REPOSITORY — START WITH AUDIT

Before changing code, inspect the complete repository.

The existing project currently contains infrastructure such as:

```text
backend/
├── .env
├── .env.example
├── alembic/
├── alembic.ini
├── app/
│   ├── common/
│   ├── core/
│   ├── db/
│   ├── modules/
│   │   ├── signup/
│   │   ├── login/
│   │   ├── home/
│   │   └── admimside/
│   ├── main.py
│   └── worker.py
├── requirements.txt
└── scripts/
```

Treat the current `signup`, `login`, `home`, and `admimside` modules as scaffold/placeholder functionality, not as the final product architecture.

Preserve and improve useful infrastructure already present, including:

- FastAPI application setup
- async SQLAlchemy
- asyncpg
- Alembic
- common exception handlers
- request logging middleware
- pagination utilities
- response helpers
- JWT/password utilities
- Celery scaffold

Do not rewrite working infrastructure unnecessarily.

At the beginning, identify:

- existing files worth preserving;
- incorrect assumptions;
- breaking issues;
- missing infrastructure;
- security weaknesses;
- database problems;
- scalability bottlenecks;
- API contract inconsistencies.

Then implement the corrected design.

---

# 4. NON-NEGOTIABLE ENGINEERING PRINCIPLES

1. PostgreSQL is the source of truth for persistent business data.
2. Redis is not the source of truth for persistent business records.
3. FastAPI request handlers must remain thin.
4. Business logic belongs in services/use cases.
5. Database access belongs in repositories or query services.
6. Do not execute blocking I/O inside async endpoints.
7. Do not create a DB engine or Redis connection per request.
8. Do not keep DB transactions open while calling external services.
9. Use DB constraints as the final protection against race conditions.
10. Never trust frontend-supplied roles or permissions.
11. Never allow the LLM to execute arbitrary SQL.
12. Never hard-code secrets.
13. Do not use in-memory state for auth/session/reset functionality that must survive multiple workers.
14. Do not use `Base.metadata.create_all()` at application startup in the final implementation.
15. Do not create microservices just to appear scalable.
16. Do not claim production throughput without load tests.
17. Do not add infrastructure that provides no concrete benefit.
18. Prefer explicit, understandable code over excessive abstraction.

---

# 5. FINAL ARCHITECTURE

Use a modular monolith with infrastructure layers.

Recommended structure:

```text
backend/
├── app/
│   ├── main.py
│   ├── worker.py
│   │
│   ├── core/
│   │   ├── config.py
│   │   ├── security.py
│   │   ├── dependencies.py
│   │   ├── permissions.py
│   │   ├── logging.py
│   │   └── constants.py
│   │
│   ├── common/
│   │   ├── exceptions.py
│   │   ├── handlers.py
│   │   ├── middleware.py
│   │   ├── pagination.py
│   │   ├── responses.py
│   │   └── health.py
│   │
│   ├── db/
│   │   ├── base.py
│   │   └── session.py
│   │
│   ├── infrastructure/
│   │   ├── redis.py
│   │   ├── http_client.py
│   │   ├── storage.py
│   │   ├── cache.py
│   │   └── rate_limit.py
│   │
│   └── modules/
│       ├── auth/
│       ├── users/
│       ├── trips/
│       ├── cities/
│       ├── activities/
│       ├── itinerary/
│       ├── budget/
│       ├── community/
│       ├── profile/
│       ├── uploads/
│       ├── admin/
│       └── chatbot/              # optional / implement only if time permits
│
├── alembic/
├── tests/
├── loadtests/
├── docs/
├── uploads/
├── .env.example
├── requirements.txt
├── README.md
└── docker-compose.yml
```

This is a recommendation, not a rigid file map. Change it when a better implementation is justified.

---

# 6. DATABASE CONFIGURATION

Use:

- PostgreSQL
- SQLAlchemy 2.x async
- asyncpg
- Alembic

Configure the async engine with explicit settings for:

```env
DATABASE_URL=
DB_POOL_SIZE=10
DB_MAX_OVERFLOW=20
DB_POOL_TIMEOUT=30
DB_POOL_RECYCLE=1800
DB_POOL_PRE_PING=true
```

Do not assume a huge connection pool is better. The pool must be sized relative to PostgreSQL capacity and the number of FastAPI workers/instances.

Use:

```python
create_async_engine(...)
async_sessionmaker(..., expire_on_commit=False)
```

Do not create sessions manually inside route handlers.

Use the shared dependency.

Avoid committing read-only requests when there is no transaction to commit; improve the current session dependency so transaction behavior is deliberate rather than accidental.

For write operations, use explicit transaction boundaries where multiple mutations must succeed atomically.

---

# 7. BASE MODEL / TIMESTAMPS

Use the existing `Base` and `TimestampMixin` where appropriate.

Every normal domain model should have:

```text
created_at
updated_at
```

Use timezone-aware timestamps.

For domain-specific timestamps such as an admin audit event, do not duplicate the generic timestamp and a second ambiguous timestamp without reason. Either reuse the inherited timestamp or clearly define the event timestamp separately.

---

# 8. DOMAIN MODELS

Implement these core PostgreSQL models.

## 8.1 User

Table: `users`

Fields:

```text
id                  Integer PK
name                String(255) NOT NULL
email               String(255) UNIQUE NOT NULL INDEX
password_hash       String(255) NULLABLE for Google-only accounts
role                String / Enum: user | admin
profile_photo       String(500) NULLABLE
language            String(10) DEFAULT en
is_active           Boolean DEFAULT true
provider            String(30) NULLABLE/default local
provider_user_id    String(255) NULLABLE
created_at          timestamptz
updated_at          timestamptz
```

Important:

- `password_hash` must be nullable because Google-authenticated accounts may not have a local password.
- `provider + provider_user_id` should support unique identity mapping.
- Email must be normalized consistently.
- Add a unique constraint/index that prevents duplicate provider identities.

Do not use only `google_id` as a single required field because local users do not need it.

Relationships:

```text
User 1 -> many Trips
User 1 -> many Reviews
User 1 -> many SavedDestinations
User 1 -> many RefreshSessions
User 1 -> many Reports
User 1 -> many AdminActivityLogs
```

---

# 9. AUTH SESSION / REFRESH MODEL

Add a persistent refresh-session model because refresh tokens must be revocable and must not depend only on stateless JWTs.

Suggested table: `auth_sessions`

Fields:

```text
id                 UUID/String PK
user_id            FK users.id
refresh_token_hash String NOT NULL
expires_at         timestamptz NOT NULL
revoked_at         timestamptz NULLABLE
created_at         timestamptz
last_used_at       timestamptz NULLABLE
user_agent         String(500) NULLABLE
ip_address         String(64) NULLABLE
```

Use refresh-token rotation.

The JWT refresh token should contain a session identifier (`jti` or equivalent) rather than storing raw refresh tokens.

Store only a secure hash of the refresh token/session secret.

Never store raw refresh tokens in PostgreSQL or logs.

---

# 10. PASSWORD RESET MODEL

Do not use an in-memory dictionary for password reset tokens.

It will fail with multiple workers/processes and is not suitable even for a robust hackathon architecture.

Create a `password_reset_tokens` table or equivalent Redis-backed design.

Preferred relational model:

```text
id
user_id
selector/token identifier
hashed_token
expires_at
used_at
created_at
```

Store only a hash of the actual secret token.

The hackathon does not require a real email provider. Therefore:

- generate the token securely;
- store its hash + expiry;
- log a **development-only reset URL/token identifier** safely when DEBUG is enabled;
- return a generic response to the client;
- never expose password-reset tokens in production API responses.

---

# 11. TRIP MODEL

Table: `trips`

```text
id              Integer PK
user_id         FK users.id NOT NULL
name/title      String(255) NOT NULL
description     Text NULLABLE
cover_image     String(500) NULLABLE
start_date      Date NOT NULL
end_date        Date NOT NULL
status          Enum/string: draft | published
travel_style    Enum/string NULLABLE: budget | balanced | adventure | relaxed | luxury
total_budget    Numeric(12,2) NULLABLE
currency        String(3) DEFAULT USD
created_at
updated_at
```

Constraints:

- `start_date <= end_date`.
- owner must exist.
- add index on `(user_id, created_at)` or equivalent for list queries.

Relationship:

```text
Trip -> User
Trip -> TripStop[]
Trip -> Expense[]
Trip -> Share
Trip -> Review[]
```

---

# 12. TRIP STOP MODEL

Table: `trip_stops`

```text
id              Integer PK
trip_id         FK trips.id NOT NULL
city_id         FK cities.id NOT NULL
arrival_date    Date NOT NULL
departure_date  Date NOT NULL
sequence        Integer NOT NULL DEFAULT 0
created_at
updated_at
```

Constraints:

- arrival <= departure.
- stop dates must fall within the trip date range where appropriate.
- sequence should be indexed with trip_id.

Useful index:

```text
(trip_id, sequence)
```

---

# 13. CITY / DESTINATION MODEL

Table: `cities`

```text
id                Integer PK
name              String(255) NOT NULL
country           String(100) NOT NULL
region            String(100) NULLABLE
latitude          Numeric(9,6) NULLABLE
longitude         Numeric(9,6) NULLABLE
cost_index        Numeric(5,2) NULLABLE
popularity_score  Numeric(8,2) NULLABLE
image             String(500) NULLABLE
created_at
updated_at
```

Index/search fields:

- name
- country
- region
- popularity_score as appropriate

Do not add expensive indexes blindly.

For search, use PostgreSQL features such as trigram/full-text search only when they provide measurable benefit and are practical for the hackathon.

---

# 14. ACTIVITY MODEL

Table: `activities`

```text
id                Integer PK
city_id           FK cities.id NOT NULL
name              String(255) NOT NULL
description       Text NULLABLE
category          String(100) NULLABLE
duration_minutes  Integer NULLABLE
estimated_cost    Numeric(12,2) NULLABLE
currency          String(3) DEFAULT USD
rating            Numeric(3,2) NULLABLE
image             String(500) NULLABLE
created_at
updated_at
```

Indexes:

```text
city_id
category
(city_id, category)
```

Validate rating when supplied: 0–5.

---

# 15. ITINERARY ITEM MODEL

Table: `itinerary_items`

```text
id              Integer PK
trip_stop_id    FK trip_stops.id NOT NULL
activity_id     FK activities.id NULLABLE
type            String/Enum: activity | transport | meal | accommodation | custom
title           String(255) NOT NULL
date            Date NOT NULL
start_time      Time or validated string
end_time        Time or validated string
cost            Numeric(12,2) NULLABLE
currency        String(3) DEFAULT USD
notes           Text NULLABLE
sequence        Integer DEFAULT 0
created_at
updated_at
```

Prefer a real PostgreSQL `Time` type for `start_time/end_time` over arbitrary strings, unless the frontend contract genuinely requires strings.

Validate:

- start_time < end_time when both exist;
- date belongs to the associated trip stop range;
- activity belongs to the same city as the stop when activity_id is supplied.

Index:

```text
(trip_stop_id, date, sequence)
```

---

# 16. EXPENSE MODEL

Table: `expenses`

```text
id                 Integer PK
trip_id            FK trips.id NOT NULL
itinerary_item_id  FK itinerary_items.id NULLABLE
category           String/Enum: transport | stay | activities | meals | other
amount             Numeric(12,2) NOT NULL
currency           String(3) DEFAULT USD
description        String(500) NULLABLE
created_at
updated_at
```

Amount must be >= 0.

Index:

```text
(trip_id, category)
```

---

# 17. SHARE MODEL

Table: `shares`

```text
id            Integer PK
trip_id       FK trips.id NOT NULL UNIQUE
share_token   String(64) UNIQUE NOT NULL
visibility    String/Enum: public | private
created_at
updated_at
```

Use cryptographically secure random tokens.

Do not use guessable sequential IDs as public sharing tokens.

Public shared-trip responses must not expose private user information.

---

# 18. REVIEW MODEL

Table: `reviews`

```text
id          Integer PK
user_id     FK users.id NOT NULL
trip_id     FK trips.id NULLABLE
activity_id FK activities.id NULLABLE
rating      Integer NOT NULL 1..5
comment     Text NULLABLE
created_at
updated_at
```

Add a validation/constraint so a review must reference a valid review target, such as:

```text
trip_id IS NOT NULL OR activity_id IS NOT NULL
```

Do not allow an empty-target review.

Consider uniqueness only if the product requires one review per user/target.

---

# 19. SAVED DESTINATION MODEL

Table: `saved_destinations`

```text
id       Integer PK
user_id  FK users.id NOT NULL
city_id  FK cities.id NOT NULL
created_at
updated_at
```

Add:

```text
UNIQUE(user_id, city_id)
```

---

# 20. MODERATION / ADMIN MODELS

## Report

```text
id
reporter_id       FK users.id
entity_type       user | trip | activity | review
entity_id         Integer
reason            Text
status            pending | resolved | dismissed
created_at
updated_at
```

Add indexes to support moderation queues, for example:

```text
(status, created_at)
(entity_type, entity_id)
```

## AdminActivityLog

```text
id
admin_id          FK users.id
action            String(100)
entity_type       String(50) NULLABLE
entity_id         Integer NULLABLE
metadata          JSON/JSONB NULLABLE
timestamp         timestamptz
```

Prefer PostgreSQL JSONB over storing metadata as arbitrary text.

Audit important destructive/admin actions.

---

# 21. PYDANTIC SCHEMAS

Use Pydantic v2.

All response schemas should use:

```python
model_config = ConfigDict(from_attributes=True)
```

or equivalent Pydantic v2 configuration.

Define request and response schemas separately.

Never expose ORM models directly.

## Auth schemas

```text
RegisterRequest
LoginRequest
GoogleLoginRequest
TokenResponse
RefreshRequest
LogoutRequest (only if needed)
UserResponse
ForgotPasswordRequest
ResetPasswordRequest
ChangePasswordRequest
```

`RegisterRequest`:

- name
- email
- password
- password confirmation if desired

`LoginRequest`:

- email
- password

`GoogleLoginRequest`:

- Google credential/code required by the chosen OAuth flow

Do not accept arbitrary `google_id`, `email`, or `role` from the frontend as trusted identity data.

`TokenResponse`:

```json
{
  "access_token": "...",
  "refresh_token": "...",
  "token_type": "bearer",
  "user": {...}
}
```

Avoid duplicating `user_id` and separate fields if a nested user object provides the information cleanly.

---

# 22. TRIP SCHEMAS

Create:

```text
TripCreate
TripUpdate
TripResponse
TripListResponse
TripDetailResponse
TripCopyResponse
TripPublishResponse
TripStopCreate
TripStopUpdate
TripStopResponse
TripStopWithCityResponse
```

Validate:

- date range
- budget non-negative
- supported status values
- ownership-sensitive fields

---

# 23. CITY SCHEMAS

Create:

```text
CityResponse
CityListResponse
CityCreate       # admin
CityUpdate       # admin
CitySearchParams
```

Search params:

```text
q
country
region
min_cost_index
max_cost_index
sort
page/page_size or cursor
```

Clamp page size.

Never allow unbounded result sets.

---

# 24. ACTIVITY SCHEMAS

Create:

```text
ActivityResponse
ActivityListResponse
ActivityCreate
ActivityUpdate
ActivitySearchParams
```

Search/filter support:

```text
q
city_id
category
min_cost
max_cost
min_duration
max_duration
sort
pagination
```

---

# 25. ITINERARY SCHEMAS

Create:

```text
ItineraryItemCreate
ItineraryItemUpdate
ItineraryItemResponse
ReorderItemRequest
ReorderItemsRequest
CalendarDayResponse
CalendarResponse
```

Reorder input should be structured Pydantic models, not raw anonymous dictionaries.

Example:

```python
class ReorderItem(BaseModel):
    id: int
    sequence: int

class ReorderItemsRequest(BaseModel):
    items: list[ReorderItem]
```

---

# 26. BUDGET SCHEMAS

Create:

```text
ExpenseCreate
ExpenseUpdate
ExpenseResponse
BudgetBreakdown
DailyBudgetResponse
```

Budget response should distinguish:

- itinerary estimated cost;
- recorded expenses;
- total estimated/actual depending on product semantics;
- category breakdown;
- daily average;
- budget limit;
- remaining amount;
- over-budget state.

Do not silently mix expenses and itinerary estimates into one unexplained number.

---

# 27. COMMUNITY SCHEMAS

Create:

```text
ShareResponse
PublicTripResponse
ReviewCreate
ReviewUpdate if product allows it
ReviewResponse
ReviewListResponse
CommunityTripCardResponse
```

Public trip response must be a dedicated safe schema and must not expose sensitive user fields.

---

# 28. PROFILE SCHEMAS

Create:

```text
ProfileResponse
ProfileUpdate
SavedDestinationCreate
SavedDestinationResponse
SavedDestinationListResponse
DeleteAccountResponse
```

Saved destination responses may include nested city information through a dedicated safe response schema.

---

# 29. ADMIN SCHEMAS

Create:

```text
AdminUserListResponse
UserStatusUpdate
AdminTripListResponse
ReportResponse
ReportStatusUpdate
AdminDashboardResponse
AnalyticsResponse
AdminActivityLogResponse
```

Paginate all large admin lists.

---

# 30. ROUTING CONTRACT

Use `/api/v1` as the canonical API version unless the existing frontend is already committed to `/api`. If preserving `/api` reduces integration breakage, keep `/api` but organize routers so versioning can be added later.

Do not create duplicate endpoints simply because two modules want the same URL.

## Authentication

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/google
POST /api/auth/refresh
POST /api/auth/logout
POST /api/auth/forgot-password
POST /api/auth/reset-password
POST /api/auth/change-password
```

## Trips

```text
GET    /api/trips
POST   /api/trips
GET    /api/trips/{trip_id}
PUT    /api/trips/{trip_id}
DELETE /api/trips/{trip_id}
POST   /api/trips/{trip_id}/publish
POST   /api/trips/{trip_id}/stops
PUT    /api/trip-stops/{stop_id}
DELETE /api/trip-stops/{stop_id}
GET    /api/trips/{trip_id}/calendar
GET    /api/trips/{trip_id}/budget
```

## Itinerary

```text
POST   /api/trips/{trip_id}/itinerary
PUT    /api/itinerary/{item_id}
DELETE /api/itinerary/{item_id}
PUT    /api/trips/{trip_id}/itinerary/reorder
```

## Expenses

Because the product has an Expense model, provide CRUD routes if the frontend needs manual expense entry:

```text
GET    /api/trips/{trip_id}/expenses
POST   /api/trips/{trip_id}/expenses
PUT    /api/expenses/{expense_id}
DELETE /api/expenses/{expense_id}
```

If manual expense entry is intentionally not part of the final UI, keep the model/service ready but do not expose unnecessary endpoints.

## Discovery

```text
GET /api/cities
GET /api/cities/{city_id}
GET /api/activities
GET /api/activities/{activity_id}
GET /api/activities/{activity_id}/reviews
```

## Community / public sharing

```text
GET  /api/community
GET  /api/public/trips/{share_token}
POST /api/trips/{trip_id}/share
POST /api/reviews
```

For copying a public trip, prefer one of these safe designs:

```text
POST /api/public/trips/{share_token}/copy
```

or an authenticated copy endpoint that first verifies the source trip is published and accessible publicly.

Do not require the current user to own the source trip.

## Profile

```text
GET    /api/users/profile
PUT    /api/users/profile
DELETE /api/users/account
GET    /api/users/saved-destinations
POST   /api/users/saved-destinations
DELETE /api/users/saved-destinations/{city_id}
```

## Uploads

```text
POST /api/uploads/image
```

## Admin

All routes under `/api/admin/*` require authenticated admin authorization.

```text
GET    /api/admin/dashboard
GET    /api/admin/analytics
GET    /api/admin/users
GET    /api/admin/users/{user_id}
PUT    /api/admin/users/{user_id}/status
GET    /api/admin/trips
DELETE /api/admin/trips/{trip_id}
GET    /api/admin/cities
POST   /api/admin/cities
PUT    /api/admin/cities/{city_id}
DELETE /api/admin/cities/{city_id}
GET    /api/admin/activities
POST   /api/admin/activities
PUT    /api/admin/activities/{activity_id}
DELETE /api/admin/activities/{activity_id}
GET    /api/admin/reports
PUT    /api/admin/reports/{report_id}
```

---

# 31. ROUTE / SERVICE / REPOSITORY RESPONSIBILITY

Use this flow:

```text
HTTP Request
    ↓
FastAPI Router
    ↓
Dependency / Authentication / Authorization
    ↓
Pydantic Validation
    ↓
Service / Use Case
    ↓
Repository / Query Service
    ↓
PostgreSQL / Redis / External API
```

Routes must not contain complex business logic.

Repositories should not contain authorization logic.

Services must enforce business rules and ownership.

---

# 32. AUTHENTICATION

## Access token

Use short-lived JWT access tokens.

Suggested default:

```env
ACCESS_TOKEN_EXPIRE_MINUTES=20
```

Use claims such as:

```json
{
  "sub": "123",
  "type": "access",
  "jti": "...",
  "iat": 123,
  "exp": 123
}
```

## Refresh token

Use a longer-lived refresh token tied to an auth session.

Suggested default:

```env
REFRESH_TOKEN_EXPIRE_DAYS=14
```

Do not accept a refresh token where an access token is required.

Rotate refresh tokens and revoke old sessions when appropriate.

Logout must revoke the relevant session.

---

# 33. GOOGLE LOGIN

Implement Google authentication as a separate auth flow.

The backend must verify Google's credential/token server-side using the official OAuth/OpenID verification approach suitable for the chosen frontend flow.

Do not trust a frontend payload containing only:

```text
email
name
google_id
role
```

After successful verification:

1. find existing provider identity;
2. otherwise match a safe verified email if the product policy permits linking;
3. otherwise create the user;
4. assign default role `user`;
5. create the application's auth session;
6. issue access + refresh tokens.

Required settings:

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=
```

If the exact OAuth flow is frontend-driven, align the backend contract to the frontend implementation rather than inventing a second login flow.

---

# 34. RBAC

Current roles:

```text
user
admin
```

Keep authorization centralized.

Create dependencies such as:

```python
get_current_user()
require_authenticated_user()
require_role("admin")
get_current_admin()
```

Never trust the frontend role.

Ownership rules:

- users can mutate their own trips;
- users cannot mutate another user's private trip;
- admins may manage content according to admin policy;
- public readers can only see explicitly published/shared data.

---

# 35. REDIS ARCHITECTURE

Use `redis.asyncio` with a shared connection pool.

Configure:

```env
REDIS_URL=redis://localhost:6379/0
```

Redis may be used for:

1. response/data caching;
2. rate limiting;
3. short-lived password-reset/session auxiliary state if needed;
4. distributed locks where justified;
5. Celery broker/result backend.

Do not use Redis as the only durable source for business data.

---

# 36. CACHING

Cache read-heavy endpoints where useful.

Good candidates may include:

```text
GET /api/cities
GET /api/activities
GET /api/community
GET public shared trips
```

Use a stable cache-key strategy.

Examples:

```text
cities:list:{normalized-filter-hash}
activities:list:{normalized-filter-hash}
community:list:{filter-hash}
public-trip:{share-token}
```

Use TTLs.

Never cache sensitive per-user private trip data globally.

Invalidate relevant cache keys after writes.

Write order:

```text
validate
→ DB transaction
→ commit
→ invalidate/update cache
```

Do not cache before successful commit.

---

# 37. CACHE STAMPEDE PROTECTION

For high-traffic cached endpoints, consider Redis-based locking/single-flight behavior.

When a hot key expires:

```text
thousands of requests
       ↓
 Redis cache miss
       ↓
 one request gets regeneration lock
       ↓
 DB query
       ↓
 Redis SET
       ↓
 other requests use cached result
```

Keep this simple and failure-tolerant.

If Redis fails for a non-critical cached endpoint, the service should generally degrade gracefully to PostgreSQL.

---

# 38. RATE LIMITING

Implement Redis-backed rate limiting.

At minimum protect:

```text
auth/login
auth/register
auth/refresh
auth/forgot-password
search APIs
upload APIs
chatbot APIs if implemented
```

Return HTTP 429 on excess requests.

Use configurable limits:

```env
RATE_LIMIT_ENABLED=true
RATE_LIMIT_REQUESTS=...
RATE_LIMIT_WINDOW_SECONDS=60
```

Do not perform a PostgreSQL query for every rate-limit check.

---

# 39. DATABASE QUERY PERFORMANCE

Audit every query.

Prevent:

- N+1 queries;
- SELECT * where unnecessary;
- unlimited result sets;
- repeated count queries where avoidable;
- huge OFFSET pagination for high-scale datasets;
- missing indexes;
- unnecessary ORM refreshes;
- unnecessary relationships being eagerly loaded.

Select only required columns for hot endpoints.

Use appropriate loading strategies such as `selectinload` when relationship loading is required.

Prefer efficient query patterns over generic repository methods that over-fetch data.

---

# 40. PAGINATION

Every potentially large list must be paginated.

Default:

```text
page_size = 20
max_page_size = 100
```

For very large/high-volume datasets, prefer keyset/cursor pagination where it provides a real benefit.

Do not allow arbitrary `page_size=1000000`.

---

# 41. SEARCH

City/activity search must be implemented as database queries, not by loading all records into Python.

Use filters for:

- city
- country
- region
- category
- cost
- duration
- popularity

For text search at scale, use PostgreSQL-native indexing/features where justified.

---

# 42. TRIP BUSINESS RULES

## Create Trip

Validate:

- title exists;
- start_date <= end_date;
- budget >= 0 when supplied;
- user is authenticated.

## Update Trip

Only owner or authorized admin can mutate.

Prevent invalid date ranges after update.

## Delete Trip

Use cascading or explicit deletion carefully so related stops, itinerary items, expenses, shares, reviews and dependent data do not become orphaned.

Choose database-level cascade rules where appropriate and safe.

## Publish

A trip can only be published when required business data is valid.

On publish:

1. update status;
2. create/reuse Share;
3. generate secure share token;
4. commit transaction;
5. invalidate related cache.

## Copy public trip

Only published/shared trips can be copied by other users.

Copy:

- Trip
- TripStops
- ItineraryItems

Do not copy:

- original owner's private profile data;
- reviews;
- reports;
- admin logs;
- original share token.

Create a fresh share record only if product behavior requires it.

---

# 43. ITINERARY BUSINESS RULES

When adding an itinerary item:

- trip must be accessible to current user;
- stop must belong to the trip;
- activity, if supplied, must belong to the stop's city;
- date must belong to stop date range;
- times must be valid;
- sequence must be consistent.

Reordering must be atomic.

For multiple sequence updates, use a single transaction.

Avoid race conditions between simultaneous reorder operations.

---

# 44. BUDGET BUSINESS RULES

Budget should combine clearly defined concepts:

1. estimated itinerary costs;
2. recorded manual expenses.

Do not silently mix them.

For each trip return something such as:

```json
{
  "budget_limit": 2500,
  "estimated_itinerary_cost": 1800,
  "recorded_expense_total": 1650,
  "by_category": {
    "transport": 300,
    "stay": 700,
    "activities": 400,
    "meals": 250,
    "other": 150
  },
  "daily_average": 150,
  "remaining_budget": 850,
  "over_budget": false
}
```

The exact response can vary to match the frontend, but the semantics must remain clear.

---

# 45. CALENDAR / TIMELINE

Calendar is a read model derived from TripStop + ItineraryItem.

Do not create duplicate calendar data unless there is a demonstrated need.

Return:

```text
trip
→ stops ordered by sequence
→ days ordered by date
→ items ordered by sequence/start time
```

Use efficient queries; do not execute one DB query per day.

---

# 46. COMMUNITY / PUBLIC SHARING

Public trip API must be read-only.

The public response must contain only safe fields.

Never expose:

- password hash;
- auth session data;
- private account settings;
- private email unless explicitly intended;
- internal moderation information;
- secret identifiers.

Use secure random share tokens.

---

# 47. REVIEWS

Users may submit reviews according to product rules.

Validate:

- rating 1–5;
- target exists;
- user is authenticated;
- duplicate review policy if applicable.

For activity reviews, only return paginated results.

Do not calculate global ratings using a full-table scan on every request. Use suitable aggregation/cache/materialized summary strategies later if necessary.

---

# 48. PROFILE / ACCOUNT DELETION

`DELETE /api/users/account` must handle dependent data safely.

Decide whether to hard-delete or soft-delete based on product/privacy requirements.

At minimum ensure:

- authentication becomes invalid;
- sessions are revoked;
- private data is no longer accessible;
- foreign-key dependencies are handled safely.

Do not leave orphaned rows.

---

# 49. LOCAL IMAGE UPLOADS

For this hackathon, use local storage.

Abstraction:

```text
StorageService
```

Implementation:

```env
UPLOAD_DIR=uploads
MAX_UPLOAD_SIZE_MB=5
```

Accepted types:

```text
image/jpeg
image/png
image/webp
```

Requirements:

- secure generated filenames;
- never trust client filename;
- validate content type;
- enforce size limit;
- prevent path traversal;
- return stable relative URL;
- mount `/uploads` via `StaticFiles` only if appropriate.

For large/slow file processing, use background tasks/Celery only where needed.

---

# 50. EXTERNAL TRAVEL APIS

The specification allows future travel APIs/maps/places.

Keep external integrations behind service/provider abstractions.

Use an async HTTP client.

Configure:

- timeout;
- retry policy for safe requests;
- clear error handling;
- no DB transaction held during external requests.

Do not invent third-party APIs if the hackathon does not require them.

---

# 51. CELERY

The repository already contains a Celery stub.

Keep Celery available for genuinely asynchronous work such as:

- notifications;
- email sending;
- heavy background calculations;
- periodic aggregation;
- future AI processing.

Do not use Celery for ordinary CRUD requests just to say that Celery exists.

Tasks should be idempotent where practical.

Use Redis as broker/backend if configured.

---

# 52. ERROR HANDLING

Keep centralized exceptions and expand them if needed.

Use appropriate HTTP status codes:

```text
400 validation/business error
401 unauthenticated
403 forbidden
404 not found
409 conflict
422 validation error where FastAPI semantics apply
429 rate limited
500 unexpected server error
502/503 external dependency failure where appropriate
```

Never return internal stack traces to clients.

Do not expose raw database exceptions.

All errors should be structured consistently.

---

# 53. RESPONSE CONTRACT

Choose **one** response contract and use it consistently.

Preferred:

### Success envelope

```json
{
  "success": true,
  "message": "Success",
  "data": {}
}
```

### Paginated response

```json
{
  "success": true,
  "message": "Success",
  "data": {
    "items": [],
    "pagination": {
      "total": 100,
      "page": 1,
      "page_size": 20,
      "total_pages": 5
    }
  }
}
```

### Error

```json
{
  "success": false,
  "error": {
    "code": "not_found",
    "message": "Trip not found",
    "details": {}
  }
}
```

If the existing frontend already depends on the current pagination/response format, preserve it rather than introducing a breaking change. The critical requirement is consistency.

---

# 54. CORRELATION / REQUEST ID

Every request should receive a request ID.

Return:

```text
X-Request-ID
```

Include it in structured logs.

Never log:

- Authorization header;
- password;
- access token;
- refresh token;
- OAuth secrets;
- Gemini key;
- password-reset token.

---

# 55. LOGGING

Use structured logging where practical.

Include:

```text
timestamp
level
request_id
method
path
status
latency_ms
module
error_code
```

Avoid logging full request bodies for sensitive endpoints.

---

# 56. HEALTH CHECKS

Provide:

```text
GET /api/health/live
GET /api/health/ready
```

Liveness should be lightweight.

Readiness may check PostgreSQL and Redis connectivity.

Do not make health checks unnecessarily expensive.

---

# 57. APPLICATION LIFESPAN

Use FastAPI lifespan for shared resource initialization/cleanup.

Startup:

- validate configuration;
- initialize Redis client/pool;
- initialize other shared clients;
- do not create database schema automatically.

Shutdown:

- close Redis;
- close HTTP clients;
- dispose SQLAlchemy engine;
- stop other shared resources.

Critical infrastructure failures must be handled clearly.

---

# 58. ALEMBIC

Use Alembic for all schema changes.

Import every model into metadata discovery.

Generate migrations and verify them.

Do not use:

```python
Base.metadata.create_all()
```

inside application startup.

Expected workflow:

```bash
alembic revision --autogenerate -m "initial_globetrotter_schema"
alembic upgrade head
```

Verify that the generated migration correctly represents all foreign keys, indexes, unique constraints and enums/check constraints.

---

# 59. INDEXES / CONSTRAINTS

At minimum evaluate indexes for:

```text
users.email
users(provider, provider_user_id)
trips(user_id, created_at)
trips(status, created_at)
trip_stops(trip_id, sequence)
activities(city_id, category)
itinerary_items(trip_stop_id, date, sequence)
expenses(trip_id, category)
shares.share_token
reviews(activity_id, created_at)
reports(status, created_at)
saved_destinations(user_id, city_id)
auth_sessions(user_id, expires_at)
password_reset_tokens(user_id, expires_at)
```

Only keep indexes that are justified by access patterns.

Use database unique constraints for race-sensitive operations.

---

# 60. CONCURRENCY / RACE CONDITIONS

Handle concurrent requests correctly.

Examples:

### Duplicate registration

Do not rely only on:

```python
if not user:
    create_user()
```

Use the unique database constraint on email and handle `IntegrityError` safely.

### Duplicate saved destination

Use the unique `(user_id, city_id)` constraint.

### Reordering

Update all sequences inside one transaction.

### Publish/share

Ensure only one Share row can exist per trip.

### Refresh tokens

Use rotation + persistent session state.

---

# 61. HIGH CONCURRENCY / PERFORMANCE

The application should be designed for high throughput.

Rules:

- all DB operations are async;
- external HTTP calls are async;
- Redis operations are async;
- no `requests` library inside async routes;
- no `time.sleep()` inside async routes;
- no per-request engine/client creation;
- short DB transactions;
- bounded query sizes;
- caching for high-read/low-write data;
- Redis rate limiting;
- efficient indexes;
- safe connection pooling;
- stateless HTTP layer.

The app must be horizontally scalable later by running multiple workers/instances against shared PostgreSQL and Redis.

Do not use global mutable Python dictionaries for persistent state.

---

# 62. LOAD TESTING

Create a load-test setup using a practical tool such as Locust.

Test at least:

- city search;
- activity search;
- public shared-trip retrieval;
- trip retrieval;
- hot cached endpoint;
- authentication rate limits.

Measure:

```text
requests/sec
p50
p95
p99
error rate
DB pool pressure
Redis behavior
CPU/memory if available
```

Do not claim the system supports thousands of RPS without evidence.

Document findings in:

```text
docs/performance.md
```

---

# 63. TESTING

Use pytest + pytest-asyncio + httpx.

Write tests for:

### Auth

- registration
- duplicate email
- login success/failure
- JWT access validation
- expired token
- refresh token rotation
- refresh revocation
- logout
- password reset
- Google login verification logic

### RBAC

- normal user access
- admin access
- forbidden access
- cross-user resource access

### Trips

- create
- list
- detail
- update
- delete
- publish
- copy public trip

### Discovery

- city search
- activity search
- filters
- pagination

### Itinerary

- add
- update
- delete
- reorder
- validation

### Budget

- totals
- category breakdown
- expense CRUD if enabled
- over-budget calculation

### Community

- publish/share
- public read
- safe schema
- review creation

### Profile

- update
- save destination
- duplicate save
- remove saved destination
- account deletion

### Admin

- dashboard
- analytics
- user status
- CRUD moderation
- reports
- audit logs

### Infrastructure

- cache hit/miss
- cache invalidation
- rate limit
- Redis failure fallback where appropriate
- readiness/liveness

---

# 64. CHATBOT — OPTIONAL ONLY

The chatbot is secondary.

**Do not delay or weaken core backend functionality to implement it.**

Only implement it if time remains after the main system is stable and tested.

If implemented, create:

```text
app/modules/chatbot/
├── schema.py
├── routes.py
├── service.py
├── provider.py
└── context.py
```

Use Gemini with:

```env
GEMINI_API_KEY=
```

Create an abstraction such as:

```python
class LLMProvider:
    async def generate_response(...): ...
```

The chatbot must be **read-only**.

It may answer:

1. GlobeTrotter website/application questions using approved database/content retrieval.
2. General knowledge questions through Gemini.

It must never directly perform:

- INSERT
- UPDATE
- DELETE
- arbitrary SQL
- permission changes
- account changes
- trip mutations.

The chatbot should use controlled backend tools/services for website knowledge.

Never expose unrestricted database access to the model.

Never claim real-time internet access unless an actual search integration is implemented.

Rate-limit chatbot requests separately.

Set maximum prompt/message sizes.

Set provider timeouts.

Handle Gemini rate limits/errors gracefully.

Keep chatbot failure isolated from normal APIs.

---

# 65. SECURITY

Implement:

- strong password hashing;
- JWT validation;
- refresh token revocation/rotation;
- Google credential verification;
- backend RBAC;
- secure share tokens;
- request validation;
- CORS configuration;
- trusted host configuration;
- rate limiting;
- safe upload validation;
- no secrets in source code;
- safe exception handling;
- safe logging;
- SQLAlchemy parameterized queries;
- database constraints;
- least-privilege access to chatbot knowledge.

Do not leave:

```text
SECRET_KEY="unsafe-secret-key"
```

as a real production secret.

Use `.env.example` with placeholders only.

---

# 66. CONFIGURATION

Extend configuration to support at least:

```env
APP_ENV=development
APP_NAME=GlobeTrotter
APP_VERSION=1.0.0
DEBUG=false

SECRET_KEY=
ACCESS_TOKEN_EXPIRE_MINUTES=20
REFRESH_TOKEN_EXPIRE_DAYS=14

DATABASE_URL=
DB_POOL_SIZE=10
DB_MAX_OVERFLOW=20
DB_POOL_TIMEOUT=30
DB_POOL_RECYCLE=1800
DB_POOL_PRE_PING=true

REDIS_URL=redis://localhost:6379/0

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=

UPLOAD_DIR=uploads
MAX_UPLOAD_SIZE_MB=5
PASSWORD_RESET_TOKEN_EXPIRE_MINUTES=30

RATE_LIMIT_ENABLED=true
RATE_LIMIT_REQUESTS=60
RATE_LIMIT_WINDOW_SECONDS=60

GEMINI_API_KEY=

CORS_ORIGINS=http://localhost:5173
```

The React/Vite frontend normally runs on port 5173 during development, so configure CORS accordingly while keeping it environment-driven.

---

# 67. DOCKER LOCAL ENVIRONMENT

Because this is a hackathon and will be evaluated from GitHub, provide an optional local Docker Compose setup for:

```text
PostgreSQL
Redis
FastAPI
Celery worker if needed
```

No production deployment is required.

The repository must also remain understandable without Docker.

---

# 68. API DOCUMENTATION

Keep Swagger/OpenAPI functional.

For every important endpoint document:

- summary;
- request schema;
- response schema;
- status codes;
- authentication requirements;
- role requirements;
- query parameters.

Use tags consistently.

---

# 69. README

Update README with:

- project overview;
- architecture diagram;
- module explanation;
- database ER explanation;
- environment setup;
- PostgreSQL setup;
- Redis setup;
- Alembic commands;
- FastAPI start command;
- Celery command;
- test commands;
- load-test commands;
- Swagger URL;
- authentication explanation;
- RBAC explanation;
- chatbot status;
- known limitations.

---

# 70. ARCHITECTURE FLEXIBILITY RULE

The hackathon specification is the product/domain reference, not a rigid code-generation template.

You may change the architecture when justified.

For every meaningful deviation, consider:

```text
What changed?
Why?
What problem does it solve?
Why is this better for GlobeTrotter?
```

Do not create microservices unless there is a strong real requirement.

Do not create one service per table without reason.

Do not add CQRS/event sourcing/distributed systems purely for appearance.

Use the engineering approach that gives the best balance of:

```text
correctness
performance
security
maintainability
clarity
hackathon delivery speed
future scalability
```

---

# 71. IMPLEMENTATION ORDER

Implement in this order:

## Phase 1 — Audit

Inspect existing code and identify what can be reused.

## Phase 2 — Core infrastructure

Fix:

- settings
- DB engine/pooling
- session handling
- Redis
- exceptions
- logging
- request IDs
- health checks

## Phase 3 — Database/domain

Implement:

- User
- AuthSession
- PasswordResetToken
- Trip
- TripStop
- City
- Activity
- ItineraryItem
- Expense
- Share
- Review
- SavedDestination
- Report
- AdminActivityLog

## Phase 4 — Authentication

Implement:

- register
- login
- access JWT
- refresh JWT/session rotation
- logout/revoke
- password reset
- Google OAuth
- RBAC

## Phase 5 — Core travel APIs

Implement:

- trips
- stops
- cities
- activities
- itinerary
- budget
- calendar

## Phase 6 — Community/profile/admin

Implement:

- sharing
- public trips
- copy trip
- reviews
- saved destinations
- profile
- moderation
- admin dashboard
- analytics

## Phase 7 — Performance

Implement:

- Redis cache
- cache invalidation
- rate limiting
- indexes
- query optimization
- pagination
- concurrency safety

## Phase 8 — Testing

Build unit/integration/API tests.

## Phase 9 — Load testing

Measure real performance.

## Phase 10 — Optional chatbot

Only if the core system is stable.

## Phase 11 — Documentation

Finish README/docs.

---

# 72. DEFINITION OF DONE

The final backend should satisfy all of these:

- [ ] FastAPI starts cleanly
- [ ] PostgreSQL connection works
- [ ] Alembic migrations work
- [ ] no `create_all()` startup dependency
- [ ] Redis connection works
- [ ] DB pooling configured
- [ ] async I/O is used correctly
- [ ] register works
- [ ] login works
- [ ] access token works
- [ ] refresh token rotation works
- [ ] refresh sessions can be revoked
- [ ] logout revokes session
- [ ] Google login works
- [ ] password reset storage is multi-worker safe
- [ ] RBAC works
- [ ] user ownership works
- [ ] trip CRUD works
- [ ] trip stops work
- [ ] city search works
- [ ] activity search works
- [ ] itinerary CRUD works
- [ ] itinerary reorder works atomically
- [ ] budget calculation works
- [ ] expenses work if enabled by frontend
- [ ] calendar works
- [ ] public sharing works
- [ ] public trip schema is safe
- [ ] public trip copying works without source ownership bug
- [ ] reviews work
- [ ] saved destinations work
- [ ] profile works
- [ ] account deletion works safely
- [ ] local uploads work
- [ ] admin RBAC works
- [ ] admin moderation works
- [ ] admin audit logging works
- [ ] rate limiting works
- [ ] caching works where useful
- [ ] cache invalidation works
- [ ] health checks work
- [ ] structured logging works
- [ ] sensitive information is not logged
- [ ] tests pass
- [ ] load tests exist
- [ ] README is complete
- [ ] chatbot is isolated and read-only if implemented

---

# 73. FINAL EXECUTION RULES FOR THE CODING AGENT

When you receive this prompt:

1. Inspect the existing repository before editing anything.
2. Do not invent existing functionality.
3. Preserve compatible working infrastructure.
4. Replace placeholder domain modules with the actual GlobeTrotter domain.
5. Keep frontend API contracts stable where possible.
6. If a breaking change is necessary, update the API contract and document it.
7. Implement code, migrations and tests rather than only describing them.
8. Run the tests after major changes.
9. Run migrations against the configured development database.
10. Verify the application starts.
11. Verify Swagger/OpenAPI.
12. Verify authentication and RBAC.
13. Verify Redis caching/rate limiting.
14. Verify ownership/security boundaries.
15. Verify concurrent-sensitive operations.
16. Do not leave TODO placeholders for required core functionality.
17. Do not implement the chatbot at the expense of the core application.
18. Do not claim scalability without measurements.
19. Keep the final system understandable to a hackathon evaluator.

At the end, provide a concise implementation report containing:

- final architecture;
- modules created/changed;
- models and relationships;
- routes implemented;
- authentication design;
- Redis usage;
- performance optimizations;
- security controls;
- tests executed;
- load-test results if available;
- chatbot status;
- known limitations.
