# GlobeTrotter — Production-Grade FastAPI Backend Architecture Prompt

> **Purpose:** Give this entire file to an AI coding agent before asking it to implement, refactor, or complete the GlobeTrotter backend.
>
> **Important:** The attached GlobeTrotter technical specification is the baseline product/domain reference. It is **not a rigid implementation contract**. The coding agent must use engineering judgment and may change the internal architecture whenever that produces a better result for correctness, scalability, performance, security, maintainability, or hackathon development speed.

---

# 1. ROLE

You are a **senior backend architect, Python engineer, FastAPI specialist, database engineer, security engineer, and performance engineer**.

You are working on the existing **GlobeTrotter** project. The repository may already contain backend code, database models, routes, services, authentication, configuration, tests, and other components.

Your responsibility is to inspect the existing implementation first and then design/refactor/build a **production-grade, scalable FastAPI backend** without blindly rewriting working functionality.

The backend should be designed so that, when deployed with appropriate infrastructure and multiple application instances/workers, it can scale toward **thousands of requests per second**, including scenarios where many users hit the same endpoint concurrently.

The project is currently a **hackathon project** and will be evaluated through GitHub. It will **not be deployed to production for this evaluation**. Therefore:

- prioritize correctness and demonstrable engineering quality;
- keep local development simple;
- avoid unnecessary enterprise complexity;
- avoid unnecessary microservices;
- make scalability architectural rather than purely theoretical;
- include measurable performance/load-testing capability;
- do not claim a throughput number unless it is actually benchmarked;
- keep the code understandable to an evaluator.

---

# 2. SOURCE OF TRUTH AND ARCHITECTURE FLEXIBILITY

Use the provided GlobeTrotter technical specification to understand the intended product, domains, data relationships, business flows, and API responsibilities.

The specification establishes the main product flow:

```text
Discover → Plan → Optimize → Visualize → Share → Reuse
```

The central business concept is **TRIP**.

The expected product domains include, as applicable:

- authentication
- users/profile
- trips
- trip stops
- cities/destinations
- activities
- itinerary
- budget/expenses
- calendar/timeline
- sharing/community
- reviews
- recommendations
- reports/moderation
- admin/analytics

## Do NOT treat the document as a rigid architecture

The implementation architecture may vary according to actual needs.

You MAY:

- create new modules;
- merge tightly coupled modules;
- split large modules;
- introduce infrastructure layers;
- introduce dedicated query/read services;
- introduce caching;
- introduce background workers;
- change service/repository boundaries;
- introduce specialized search/query patterns;
- change internal implementation while preserving API contracts;
- introduce additional abstractions only when they solve a real problem.

You MUST NOT:

- create microservices merely to make the architecture look advanced;
- create a separate service for every database table without justification;
- add abstractions purely for pattern compliance;
- duplicate business logic;
- sacrifice clarity for theoretical scalability;
- force the exact module structure from the reference document if another structure is technically better;
- blindly preserve poor implementation decisions from the existing repository.

When you deviate materially from the reference architecture, document:

1. what changed;
2. why it changed;
3. what problem it solves;
4. why the chosen design is better for GlobeTrotter.

The final architecture must be **requirement-driven and engineering-driven**.

---

# 3. PRIMARY TECHNOLOGY STACK

Use the following stack unless inspection of the repository reveals a compelling compatibility requirement:

- Python 3.12+
- FastAPI
- Uvicorn
- SQLAlchemy 2.x
- async SQLAlchemy APIs
- asyncpg
- PostgreSQL
- Alembic
- Redis
- Celery where background processing is actually necessary
- Pydantic v2
- Pydantic Settings
- JWT authentication
- Google OAuth / Google Sign-In
- pytest
- pytest-asyncio
- httpx
- Ruff / Black / isort where practical
- mypy where practical
- Docker / Docker Compose for local infrastructure

Frontend context:

- React
- Vite

The backend should expose a clean REST API consumed by the React frontend.

---

# 4. PRODUCT DOMAIN CONTEXT

GlobeTrotter is a personalized travel-planning platform where users can:

- create multi-city trips;
- discover destinations;
- discover activities;
- build day-wise itineraries;
- organize activities by date/time/order;
- estimate trip costs;
- view budgets and calendar/timeline information;
- publish/share trips;
- copy public trips into their own account;
- manage profile/settings;
- save destinations;
- interact with community/shared trips and reviews where implemented.

Optional/admin capabilities include:

- user management;
- trip management/moderation;
- destination management;
- activity management;
- analytics;
- reports/moderation;
- audit/admin activity logging.

The backend must maintain coherent domain relationships.

Prefer the following conceptual relationship:

```text
USER
  |
  +---- TRIP
          |
          +---- TRIP_STOP ---- CITY
          |
          +---- ITINERARY_ITEM ---- ACTIVITY
          |
          +---- EXPENSE
          |
          +---- SHARE
          |
          +---- REVIEW
```

Do not force this exact schema if the existing implementation or requirements justify changes, but preserve the business meaning.

---

# 5. EXISTING PROJECT AUDIT — DO THIS FIRST

Before writing or changing code:

1. inspect the complete repository;
2. inspect backend folder structure;
3. inspect every existing route/module involved in core functionality;
4. inspect database models and migrations;
5. inspect authentication/security implementation;
6. inspect Redis usage;
7. inspect background-job code;
8. inspect configuration/environment handling;
9. inspect tests;
10. inspect frontend API expectations when available;
11. identify duplicate logic;
12. identify blocking operations;
13. identify inefficient DB queries;
14. identify missing indexes;
15. identify race conditions;
16. identify security issues;
17. identify bad error handling;
18. identify code that will fail under concurrency.

Do not begin by deleting or rewriting the project.

First understand it.

Then make a concise architecture assessment.

---

# 6. TARGET ARCHITECTURE

The default target is a **modular monolith**.

Conceptually:

```text
React + Vite
      |
      | HTTPS / REST API
      v
+------------------------------+
|           FastAPI            |
|                              |
|  Middleware                  |
|  Auth / RBAC                 |
|  Rate Limiting               |
|  Validation                  |
|  API Modules                 |
|                              |
|  +------------------------+  |
|  | Domain/Application     |  |
|  | Services               |  |
|  +-----------+------------+  |
|              |               |
|  +-----------v------------+  |
|  | Repositories / Queries |  |
|  +-----------+------------+  |
+--------------|---------------+
               |
       +-------+--------+
       |                |
       v                v
 PostgreSQL          Redis
       |
       |
       +------------------------------+
                                      |
                                Celery Worker
                                      |
                             External APIs / Jobs
```

This is a reference shape, not a mandatory implementation layout.

---

# 7. LAYERING RULES

Use clear separation of responsibilities.

Preferred request flow:

```text
Route
  ↓
Dependency / Authentication / Authorization
  ↓
Service / Use Case
  ↓
Repository / Query Layer
  ↓
PostgreSQL
```

External systems should be accessed through controlled infrastructure/service abstractions.

Examples:

```text
Route
  ↓
Service
  ↓
Travel API client
```

or:

```text
Route
  ↓
Chatbot service
  ↓
Read-only knowledge service
  ↓
Repository
  ↓
PostgreSQL
```

## Routes

Routes should be thin.

Routes should primarily:

- parse/validate input;
- resolve dependencies;
- enforce authorization;
- call the service;
- return the response.

Do not put large business workflows inside route functions.

## Services

Services contain business logic and use-case orchestration.

## Repositories / Queries

Repositories contain persistence/query operations.

Do not leak database-specific logic throughout the application.

---

# 8. RECOMMENDED MODULES

Start from domain boundaries rather than from database tables.

A possible structure is:

```text
app/
├── main.py
├── core/
│   ├── config.py
│   ├── security.py
│   ├── dependencies.py
│   ├── logging.py
│   ├── constants.py
│   └── exceptions.py
│
├── db/
│   ├── base.py
│   ├── session.py
│   └── models/
│
├── infrastructure/
│   ├── redis.py
│   ├── celery.py
│   ├── http_client.py
│   └── storage.py
│
├── common/
│   ├── middleware.py
│   ├── responses.py
│   ├── pagination.py
│   ├── health.py
│   └── utilities.py
│
└── modules/
    ├── auth/
    ├── users/
    ├── trips/
    ├── discovery/
    ├── itinerary/
    ├── budget/
    ├── community/
    ├── recommendations/
    ├── admin/
    └── chatbot/
```

The exact structure may be changed after inspecting the existing project.

For each module, use only the layers it actually needs.

Example:

```text
trips/
├── routes.py
├── schemas.py
├── service.py
├── repository.py
├── model.py
└── tests/
```

Do not create useless files just to match a template.

---

# 9. DATABASE ARCHITECTURE — POSTGRESQL

PostgreSQL is the primary source of truth for persistent business data.

Use SQLAlchemy 2.x asynchronous APIs with asyncpg.

Potential core entities include:

- users
- trips
- trip_stops
- cities
- activities
- itinerary_items
- expenses
- shares
- reviews
- reports
- admin_activity_log
- refresh sessions/tokens if persisted in PostgreSQL.

Adapt the schema to the actual project.

---

# 10. DATABASE CONNECTION POOLING

This is critical for high concurrency.

Do NOT create a database engine or connection for every request.

Use one properly managed application-level engine/pool.

Make pool configuration environment-driven:

```env
DB_POOL_SIZE=
DB_MAX_OVERFLOW=
DB_POOL_TIMEOUT=
DB_POOL_RECYCLE=
DB_POOL_PRE_PING=
```

Use sensible defaults.

Do NOT blindly increase pool size to thousands.

The correct database pool size depends on:

- PostgreSQL capacity;
- number of FastAPI worker processes;
- number of application instances;
- query duration;
- concurrent DB workload.

Every session must be released correctly.

Never leak connections.

Use async context-managed sessions.

Do not keep database connections or transactions open during slow external API calls.

---

# 11. DATABASE TRANSACTIONS

Use explicit, deliberate transaction boundaries.

When one business operation changes multiple records, prefer one coherent transaction.

Conceptually:

```text
BEGIN
  write A
  write B
  write C
COMMIT
```

On failure:

```text
ROLLBACK
```

Do not automatically commit every database operation without understanding the business transaction boundary.

Do not perform external HTTP/LLM calls while holding a long-running database transaction.

---

# 12. DATABASE QUERY PERFORMANCE

Audit all important queries.

Pay special attention to:

- N+1 queries;
- SELECT *;
- unnecessary joins;
- unbounded queries;
- repeated count queries;
- unnecessary refreshes;
- unnecessary database round trips;
- expensive wildcard searches;
- missing indexes;
- duplicate reads;
- overly long transactions.

Select only fields required by the endpoint when practical.

Use appropriate joins/eager-loading/select-in-loading where needed.

Do not load an entire trip graph when the endpoint only needs a trip summary.

---

# 13. INDEXING

Add indexes based on real access patterns.

Likely candidates may include:

- unique email;
- user_id foreign keys;
- trip_id foreign keys;
- city_id;
- activity_id;
- created_at for time-ordered queries;
- share token;
- fields used frequently for filtering/searching.

Do not add arbitrary indexes everywhere.

Use database constraints as correctness guarantees.

---

# 14. CONCURRENCY AND RACE CONDITIONS

Design for many requests hitting the same endpoint simultaneously.

Example:

```text
5,000 requests
      |
      v
same endpoint
      |
      v
same database record / operation
```

Prevent race conditions using appropriate combinations of:

- unique database constraints;
- transactions;
- upserts;
- optimistic locking;
- row locks where truly necessary;
- Redis locks where appropriate.

Never rely only on:

```python
if not exists:
    create()
```

because concurrent requests can both observe the missing state.

The database must enforce uniqueness and integrity wherever appropriate.

---

# 15. PAGINATION

Never allow unlimited list responses.

Every potentially large collection endpoint must have controlled pagination.

Defaults should be reasonable.

Maximum page size must be enforced server-side.

Example:

```text
default = 20
maximum = 100
```

For very large datasets, prefer keyset/cursor pagination where appropriate.

Offset pagination is acceptable for small/moderate datasets when it is simpler and performs adequately.

---

# 16. REDIS ARCHITECTURE

Redis is a shared infrastructure component.

Use a reusable asynchronous Redis client/pool.

Do NOT create a new Redis connection for each request.

Potential uses:

- caching;
- rate limiting;
- short-lived sessions;
- distributed locks;
- chatbot temporary conversation state;
- Celery broker/backend if configured that way.

Do not use Redis simply because it exists.

Every Redis use case must have a real justification.

---

# 17. CACHING STRATEGY

Use cache primarily for read-heavy, relatively stable data.

Potential examples:

```text
GET /cities
GET /activities
GET /home
GET /recommendations
public/shared trip lookups
frequently requested destination information
```

Do not cache every endpoint.

Use TTLs appropriate to the data.

Cache keys must be deterministic and namespaced.

Examples:

```text
city:{id}
activity:{id}
cities:list:{hash}
activities:list:{hash}
trip:public:{share_token}
```

Cache only after successful data retrieval.

Do not cache failed responses accidentally.

---

# 18. CACHE INVALIDATION

Write operations that affect cached resources must invalidate the relevant cache.

Example:

```text
Update activity
      ↓
DB transaction commits
      ↓
Invalidate affected Redis keys
```

Do not invalidate caches before the database transaction is successful.

Keep cache invalidation explicit and understandable.

---

# 19. CACHE STAMPEDE PROTECTION

For highly popular endpoints, consider cache stampede protection.

Example:

```text
5,000 requests
      ↓
cache expires
      ↓
5,000 DB queries   ← BAD
```

Prefer a strategy where one request refreshes the cache while others wait briefly or reuse the newly populated value.

Use a simple Redis lock/single-flight mechanism when justified.

Do not over-engineer this for low-traffic endpoints.

---

# 20. RATE LIMITING

Implement Redis-backed rate limiting for sensitive/expensive endpoints.

At minimum consider:

- login;
- registration;
- password reset;
- refresh token;
- search endpoints where abuse is possible;
- general API protection where useful;
- chatbot/AI endpoints.

Use HTTP 429 for exceeded limits.

Make rate limits configurable.

Do not use PostgreSQL as the primary high-frequency rate-limit counter.

---

# 21. AUTHENTICATION

Required authentication model:

- JWT access token;
- JWT refresh token;
- Google login;
- RBAC.

Authentication must be server-enforced.

Never trust frontend-only authentication state.

---

# 22. JWT ACCESS TOKENS

Use short-lived access tokens.

Target range:

```text
15–30 minutes
```

Use a clear token type claim.

Example concept:

```json
{
  "sub": "user-id",
  "type": "access",
  "exp": 1234567890
}
```

Validate:

- signature;
- expiration;
- subject;
- token type;
- required claims.

Reject malformed, expired, or wrong-type tokens.

---

# 23. REFRESH TOKENS

Refresh tokens must be handled securely.

Do not treat a refresh JWT as permanently reusable with no revocation strategy.

Prefer a session/token model that supports:

- expiration;
- revocation;
- logout;
- rotation;
- session tracking;
- reuse detection where practical.

If persisted, store only what is necessary and avoid storing raw tokens when a secure hash/token identifier strategy can be used.

---

# 24. GOOGLE LOGIN

Support Google authentication securely.

The backend must verify the Google credential/identity server-side.

Never trust frontend-supplied values such as:

```text
email
name
google_id
```

unless they originate from verified Google identity data.

Use environment configuration such as:

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=
```

After successful verification:

```text
Google identity
      ↓
find/create user
      ↓
assign appropriate role
      ↓
issue application access/refresh tokens
```

---

# 25. RBAC

Authorization must be enforced by the backend.

Never trust the frontend role.

Create reusable authorization dependencies.

Conceptual examples:

```python
require_authenticated_user()
require_role("admin")
require_roles("admin", "moderator")
```

Use centralized role definitions.

Do not scatter hard-coded role strings throughout business logic.

Return:

- `401 Unauthorized` for unauthenticated/invalid authentication;
- `403 Forbidden` for authenticated users without permission.

---

# 26. USER DATA OWNERSHIP

Enforce object-level authorization.

A logged-in user must not automatically be allowed to access every trip, itinerary, expense, or profile resource.

Examples:

```text
User A cannot edit User B's private trip.
User A cannot delete User B's itinerary item.
User A cannot access private trip information through guessed IDs.
```

Public shared trips must be exposed only through safe read-only mechanisms.

---

# 27. PUBLIC SHARING

Public/shared itinerary functionality must be safe.

Use unique, non-guessable share tokens.

A public route must return only information intended for public viewing.

Do not expose:

- password hashes;
- private profile details;
- private notes;
- internal moderation details;
- secrets;
- private financial information not intended for sharing.

Copying a shared trip must create an independent trip owned by the copying user.

---

# 28. SECURITY REQUIREMENTS

Implement practical API security:

- strict/configurable CORS;
- safe host handling where appropriate;
- input validation;
- parameterized ORM/database access;
- strong password hashing;
- JWT validation;
- OAuth validation;
- rate limiting;
- secure error responses;
- safe file validation;
- no secrets committed to Git;
- no sensitive credentials in logs;
- no arbitrary SQL execution from user/model input.

Never expose:

- JWT secret;
- database credentials;
- password hashes;
- refresh tokens;
- Google client secrets;
- Gemini API key;
- environment variables;
- internal stack traces.

---

# 29. PASSWORD SECURITY

Passwords must never be stored in plaintext.

Use a modern secure password hashing algorithm already suitable for the project.

Never log passwords.

Never return password hashes in API responses.

Authentication endpoints must be rate-limited.

---

# 30. CONFIGURATION MANAGEMENT

Use typed Pydantic Settings.

Provide:

```text
.env
.env.example
```

The `.env.example` must contain placeholders only.

Potential settings:

```env
APP_ENV=
DEBUG=
SECRET_KEY=

DATABASE_URL=
DB_POOL_SIZE=
DB_MAX_OVERFLOW=
DB_POOL_TIMEOUT=
DB_POOL_RECYCLE=
DB_POOL_PRE_PING=

REDIS_URL=

JWT_ACCESS_TOKEN_EXPIRE_MINUTES=
JWT_REFRESH_TOKEN_EXPIRE_DAYS=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=

GEMINI_API_KEY=

CORS_ORIGINS=

RATE_LIMIT_ENABLED=
RATE_LIMIT_REQUESTS=
RATE_LIMIT_WINDOW_SECONDS=
```

Required secrets should fail fast if missing in environments where they are mandatory.

Never use unsafe production secret defaults.

---

# 31. ASYNC I/O

This is a major requirement.

Do not block the FastAPI event loop.

Never use blocking operations such as:

```python
time.sleep()
requests.get()
requests.post()
```

inside async request handlers.

Prefer async libraries:

```text
httpx.AsyncClient
SQLAlchemy async
redis.asyncio
```

If a CPU-bound operation is unavoidable, move it out of the request/event-loop path.

---

# 32. HTTP CLIENT MANAGEMENT

External API clients must not create a new connection/client for every request unnecessarily.

Use reusable HTTP clients where appropriate.

Configure:

- connection pooling;
- timeouts;
- retries where safe;
- backoff where appropriate;
- error handling.

Never leave external calls without timeouts.

Never retry non-idempotent operations blindly.

---

# 33. BACKGROUND JOBS

Use Celery only for work that does not belong in the synchronous request path.

Good candidates may include:

- sending emails;
- notifications;
- heavy data processing;
- image processing;
- periodic analytics aggregation;
- long-running recommendation generation;
- non-immediate AI processing.

Do not move basic CRUD into Celery just to make the architecture look complex.

Tasks should be:

- retry-safe;
- idempotent where possible;
- time-bounded;
- observable.

---

# 34. FILE STORAGE

The current hackathon application may use **local storage**.

Keep local storage simple for the hackathon, but isolate it behind a storage abstraction so that later it can be replaced with S3/Cloudinary/etc.

Conceptual interface:

```text
StorageService
├── save()
├── delete()
└── get_url()/get_path()
```

Validate:

- file size;
- content type;
- extension;
- filename safety;
- path traversal.

Never directly trust client-provided filenames.

---

# 35. API VERSIONING

Prefer a stable versioned API path:

```text
/api/v1/...
```

Examples may include:

```text
/api/v1/auth/login
/api/v1/auth/refresh
/api/v1/users/profile
/api/v1/trips
/api/v1/cities
/api/v1/activities
/api/v1/admin/users
```

Use a consistent approach across the application.

Do not break frontend contracts unnecessarily.

---

# 36. RESPONSE CONTRACT

Use consistent response structures where appropriate.

Success example:

```json
{
  "success": true,
  "message": "Success",
  "data": {}
}
```

Error example:

```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Resource not found",
    "details": {}
  }
}
```

Adapt this to existing project conventions if a stable API contract already exists.

Do not expose raw internal exception strings.

---

# 37. ERROR HANDLING

Implement centralized exception handling.

Handle at least:

- validation errors;
- authentication errors;
- authorization errors;
- resource-not-found;
- conflict/duplicate records;
- rate limiting;
- database errors;
- Redis errors;
- external API errors;
- unexpected exceptions.

Unexpected errors must:

- be logged;
- include a request/correlation ID;
- not expose stack traces to clients.

---

# 38. REQUEST ID / CORRELATION ID

Every request should have a correlation/request ID.

Return it to the client, for example:

```text
X-Request-ID
```

Include it in logs.

Never log:

- Authorization headers;
- passwords;
- refresh tokens;
- access tokens;
- API keys;
- OAuth secrets.

---

# 39. STRUCTURED LOGGING

Use useful structured application logs.

Include when appropriate:

- timestamp;
- log level;
- request ID;
- method;
- path;
- status code;
- request duration;
- module;
- error code.

Do not produce excessive logs in normal operation.

Avoid logging every low-level SQL statement unless explicitly debugging.

---

# 40. HEALTH ENDPOINTS

Provide lightweight health endpoints such as:

```text
GET /api/v1/health
GET /api/v1/health/live
GET /api/v1/health/ready
```

Liveness should remain cheap.

Readiness may check required dependencies such as:

- PostgreSQL;
- Redis.

Do not make health checks themselves a significant load source.

---

# 41. STARTUP AND SHUTDOWN

Use FastAPI lifespan for shared resources.

On startup, initialize or validate:

- reusable Redis resources;
- database resources/configuration;
- required application state.

On shutdown:

- close Redis clients/pools;
- dispose database engine;
- gracefully close external clients/resources.

Do not use:

```python
Base.metadata.create_all()
```

as the migration strategy.

Use Alembic.

---

# 42. ALEMBIC

All schema changes must be represented through Alembic migrations.

The project should support:

```bash
alembic upgrade head
```

Do not silently create or alter production-style tables at application startup.

Keep migration history clear and reproducible.

---

# 43. SEARCH AND DISCOVERY

GlobeTrotter contains city and activity discovery/search functionality.

Search endpoints may become high-traffic endpoints.

Do not perform expensive unindexed wildcard queries blindly.

Where useful, evaluate PostgreSQL features such as:

- GIN indexes;
- full-text search;
- pg_trgm;
- appropriate composite indexes.

Only introduce extensions/features when justified by actual search requirements.

Use pagination and controlled result sizes.

---

# 44. CORE TRIP OPERATIONS

The backend must preserve coherent trip workflows.

Typical flow:

```text
User signs in
   ↓
Create trip
   ↓
Search destinations
   ↓
Add trip stops
   ↓
Assign dates
   ↓
Search activities
   ↓
Add itinerary items
   ↓
Reorder activities
   ↓
Calculate budget/costs
   ↓
View calendar/timeline
   ↓
Save/publish trip
```

Operations that modify related entities must preserve database consistency.

---

# 45. ITINERARY DESIGN

Itinerary functionality may include:

- cities/stops;
- days;
- dates;
- activities;
- order/sequence;
- start/end time;
- duration;
- cost;
- notes.

If reordering occurs, ensure concurrent changes cannot easily corrupt ordering.

Use appropriate transaction/concurrency handling.

---

# 46. BUDGET DESIGN

Budget should derive from itinerary/expense information rather than duplicated inconsistent state wherever practical.

Potential calculations include:

- transport;
- accommodation/stay;
- activities;
- meals;
- total estimated cost;
- average daily cost;
- remaining budget;
- over-budget status.

Avoid maintaining the same number independently in multiple places unless there is a strong reason and synchronization mechanism.

---

# 47. CALENDAR / TIMELINE

Calendar/timeline data should come from the itinerary source of truth.

Do not maintain an unrelated duplicate schedule table unless a real requirement justifies it.

Optimize read performance for day-wise and trip-wise calendar queries.

---

# 48. COMMUNITY / SHARING

Public trip functionality must be read-only from the public route.

Copying a trip must produce a new independent trip owned by the copying user.

Reviews and community functionality must enforce:

- authentication where required;
- object ownership rules;
- rate limiting where useful;
- moderation/reporting rules.

---

# 49. ADMIN / MODERATION

Protect admin routes with RBAC.

Potential admin capabilities include:

- users;
- trips;
- destinations/cities;
- activities;
- analytics;
- reports;
- moderation.

Critical admin mutations should produce audit events.

Audit logs should include information such as:

```text
admin user
action
entity type
entity ID
timestamp
metadata where safe
```

Never put credentials or secrets into audit metadata.

---

# 50. CHATBOT — OPTIONAL, SECONDARY FEATURE

The chatbot is **optional** and must never compromise the core GlobeTrotter backend.

Implement it only after the core application is stable and working.

If time permits, create a dedicated module such as:

```text
modules/chatbot/
├── routes.py
├── schemas.py
├── service.py
├── provider.py
└── context.py
```

The chatbot is **read-only**.

It must NEVER:

- create trips;
- update trips;
- delete trips;
- modify itineraries;
- change budgets;
- modify users;
- change roles;
- delete content;
- modify database records;
- execute arbitrary SQL.

---

# 51. CHATBOT KNOWLEDGE SOURCES

The chatbot should be capable of handling:

## Website-specific knowledge

Examples:

- What destinations are available?
- What activities are listed?
- What is currently in a user's accessible trip?
- What does the website offer?
- What are available categories/features?

Website-specific responses must be based on controlled backend data retrieval, not hallucinated model output.

## General knowledge

The chatbot may also answer general travel/general knowledge questions through Gemini where appropriate.

Do NOT claim that the chatbot has real-time internet access unless an actual web-search integration is implemented.

If information is unavailable, the chatbot should say so rather than inventing facts.

---

# 52. CHATBOT DATA ACCESS

Never give the LLM unrestricted database access.

The chatbot should use controlled read-only services.

Preferred conceptual flow:

```text
Chatbot Route
      ↓
Chatbot Service
      ↓
Read-Only Knowledge Service
      ↓
Repository / Query Layer
      ↓
PostgreSQL
```

The model should receive only the minimum information required.

Do not send sensitive user data to the model.

Do not expose:

- passwords;
- password hashes;
- JWTs;
- refresh tokens;
- secrets;
- API keys;
- private/admin-only information;
- unnecessary personally identifiable information.

---

# 53. GEMINI INTEGRATION

If chatbot work is implemented, use the provided **Gemini free API key** through environment configuration.

Example:

```env
GEMINI_API_KEY=
```

Never hard-code the key.

Create a provider abstraction:

```python
class LLMProvider:
    async def generate_response(...):
        ...
```

The first implementation may use Gemini.

Keep the internal design provider-agnostic so another LLM can be added later without rewriting chatbot business logic.

Use:

- timeouts;
- safe retry behavior where appropriate;
- rate limiting;
- input size limits;
- provider error handling.

Gemini failures must not crash the FastAPI application.

---

# 54. CHATBOT RATE LIMITING

AI endpoints must have stricter rate limits than ordinary read endpoints.

Apply limits such as:

- requests per user;
- requests per IP;
- requests per time window;
- message length.

Keep limits configurable.

Prevent abusive request sizes.

---

# 55. CHATBOT STATE

Persistent conversation history is optional.

If history is implemented, keep it separate from core domain state.

Possible approaches:

- Redis for short-lived conversations;
- PostgreSQL for persistent history.

Do not store unnecessary sensitive conversation data.

---

# 56. API PERFORMANCE PRINCIPLES

Every performance-sensitive endpoint should be reviewed for:

- database round trips;
- query count;
- response size;
- serialization cost;
- cache opportunities;
- index usage;
- transaction duration;
- external API latency;
- blocking I/O;
- unnecessary object construction.

For high-volume endpoints:

- keep operations short;
- avoid synchronous external calls;
- cache where appropriate;
- paginate;
- minimize response payloads;
- avoid repeated DB queries;
- use indexes;
- avoid unnecessary transactions.

---

# 57. STATELESS APPLICATION DESIGN

The FastAPI application layer should be stateless as much as practical.

Do not store critical shared user/application state only inside process memory.

Avoid mutable global dictionaries for sessions, locks, user state, or domain data.

Use shared infrastructure such as:

- PostgreSQL;
- Redis.

This allows future horizontal scaling:

```text
              Load Balancer
                   |
       +-----------+-----------+
       |           |           |
    FastAPI     FastAPI     FastAPI
    Instance    Instance    Instance
       |           |           |
       +-----------+-----------+
                   |
          +--------+--------+
          |                 |
      PostgreSQL          Redis
```

---

# 58. UVICORN / MULTI-WORKER DESIGN

Do not assume one process can handle unlimited traffic.

Document how the application can run with multiple workers/instances.

Example:

```bash
uvicorn app.main:app --workers N
```

or an equivalent container/process strategy.

Do not hard-code a universal worker number.

Worker count must depend on available CPU/memory and workload.

Remember that every worker can maintain its own resources. This directly affects PostgreSQL/Redis connection counts.

---

# 59. PERFORMANCE TARGETING

The desired architectural target is:

> The backend should be engineered so it can scale toward **thousands of requests per second**, including heavy concurrent traffic against the same endpoint, when supported by sufficient infrastructure.

Do not state:

> "This backend can definitely handle 10,000 RPS."

unless a repeatable benchmark demonstrates it.

The architecture should instead demonstrate that common bottlenecks have been deliberately addressed:

- event-loop blocking;
- DB connection exhaustion;
- excessive DB round trips;
- N+1 queries;
- poor indexing;
- cache misses/stampedes;
- unbounded responses;
- race conditions;
- rate-limit abuse;
- external API blocking.

---

# 60. LOAD TESTING

Create a load-testing setup for important endpoints.

Use a tool such as:

```text
Locust
```

or another appropriate load-testing framework.

Test meaningful scenarios rather than generating synthetic traffic without considering database behavior.

Test at multiple levels, for example:

```text
100 concurrent requests/users
500 concurrent requests/users
1,000 concurrent requests/users
5,000+ concurrent requests/users where local hardware permits
```

Measure at least:

- requests/sec;
- average latency;
- p50 latency;
- p95 latency;
- p99 latency;
- error rate;
- timeout rate;
- database pool behavior;
- Redis behavior.

Document actual results.

Never fabricate load-test results.

---

# 61. PERFORMANCE DOCUMENTATION

Create:

```text
docs/performance.md
```

Include:

- test environment;
- endpoints tested;
- request pattern;
- concurrency;
- measured throughput;
- p50/p95/p99 latency;
- errors/timeouts;
- identified bottlenecks;
- optimizations made;
- realistic limitations.

Explain that actual production throughput depends on:

- CPU;
- RAM;
- PostgreSQL capacity;
- Redis capacity;
- number of workers;
- number of instances;
- network;
- query complexity;
- payload size;
- infrastructure configuration.

---

# 62. TESTING STRATEGY

Build tests around behavior and important failure modes.

## Authentication tests

Test:

- registration;
- valid login;
- invalid login;
- expired access token;
- invalid access token;
- refresh flow;
- revoked refresh token;
- Google login validation.

## Authorization tests

Test:

- authenticated user;
- unauthenticated user;
- allowed role;
- forbidden role;
- object-level ownership.

## Trip tests

Test:

- create;
- read;
- update;
- delete;
- access control;
- concurrent operations.

## Itinerary tests

Test:

- add;
- update;
- delete;
- reorder;
- date validation;
- ownership.

## Budget tests

Test:

- calculation;
- expenses;
- over-budget detection;
- consistency with itinerary.

## Discovery tests

Test:

- filtering;
- pagination;
- invalid search;
- empty results;
- high-volume read behavior where practical.

## Sharing/community tests

Test:

- publish;
- public read;
- invalid share token;
- copy trip;
- independent ownership after copy.

## Redis tests

Test:

- cache hit;
- cache miss;
- cache invalidation;
- rate-limit success;
- rate-limit rejection.

## Failure tests

Test:

- DB error;
- Redis unavailable;
- external service timeout;
- unexpected exceptions.

## Chatbot tests, if implemented

Test:

- normal question;
- website-specific question;
- general knowledge question;
- invalid/empty message;
- rate limit;
- provider timeout;
- provider failure;
- read-only behavior.

---

# 63. TEST DATABASE / ISOLATION

Tests must not depend on a developer's personal database state.

Use an isolated test database or suitable transactional strategy.

Tests must be repeatable.

Avoid tests that require external services unless they are explicitly integration tests.

Mock external APIs where appropriate.

---

# 64. CODE QUALITY

Use:

- clear names;
- type hints;
- small focused functions;
- predictable module boundaries;
- PEP 8;
- async best practices;
- dependency injection where useful.

Do not over-abstract.

Prefer straightforward code that an evaluator can understand.

Use comments to explain **why**, not obvious syntax.

---

# 65. DOCKER LOCAL DEVELOPMENT

Although the project is not being deployed, make local infrastructure reproducible.

Provide Docker Compose where practical for:

- PostgreSQL;
- Redis;
- FastAPI;
- Celery worker if required.

Do not require cloud deployment.

The README must clearly explain both Docker and non-Docker development paths where practical.

---

# 66. API DOCUMENTATION

Keep Swagger/OpenAPI working.

Important endpoints should have:

- summary;
- description;
- request schema;
- response schema;
- status codes;
- authentication requirements.

Use tags consistently by domain.

---

# 67. PROJECT DOCUMENTATION

Update/create:

```text
README.md
docs/architecture.md
docs/performance.md
```

README should explain:

- project purpose;
- architecture;
- tech stack;
- setup;
- environment variables;
- migrations;
- running backend;
- running tests;
- running Celery if needed;
- running load tests;
- Swagger/OpenAPI;
- Redis;
- optional chatbot;
- known limitations.

---

# 68. RECOMMENDED DIRECTORY STRUCTURE

Use this only as a guide:

```text
backend/
├── app/
│   ├── main.py
│   │
│   ├── core/
│   │   ├── config.py
│   │   ├── security.py
│   │   ├── dependencies.py
│   │   ├── logging.py
│   │   ├── exceptions.py
│   │   └── constants.py
│   │
│   ├── db/
│   │   ├── base.py
│   │   ├── session.py
│   │   └── models/
│   │
│   ├── common/
│   │   ├── middleware.py
│   │   ├── responses.py
│   │   ├── pagination.py
│   │   └── health.py
│   │
│   ├── infrastructure/
│   │   ├── redis.py
│   │   ├── celery.py
│   │   ├── http_client.py
│   │   └── storage.py
│   │
│   └── modules/
│       ├── auth/
│       ├── users/
│       ├── trips/
│       ├── discovery/
│       ├── itinerary/
│       ├── budget/
│       ├── community/
│       ├── recommendations/
│       ├── admin/
│       └── chatbot/
│
├── alembic/
├── tests/
├── load_tests/
├── docs/
├── scripts/
├── .env.example
├── docker-compose.yml
├── requirements.txt
└── README.md
```

Again: this structure is **adaptable**.

---

# 69. API DESIGN BASELINE

Use the product specification as the functional baseline, including endpoints conceptually equivalent to:

```text
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/refresh
POST /api/v1/auth/forgot-password
POST /api/v1/auth/reset-password
POST /api/v1/auth/google

GET    /api/v1/trips
POST   /api/v1/trips
GET    /api/v1/trips/{id}
PUT    /api/v1/trips/{id}
DELETE /api/v1/trips/{id}

POST   /api/v1/trips/{id}/stops
PUT    /api/v1/stops/{id}
DELETE /api/v1/stops/{id}

GET /api/v1/cities
GET /api/v1/cities/{id}
GET /api/v1/activities
GET /api/v1/activities/{id}

POST   /api/v1/trips/{id}/itinerary
PUT    /api/v1/itinerary/{id}
DELETE /api/v1/itinerary/{id}
PUT    /api/v1/trips/{id}/itinerary/reorder

GET /api/v1/trips/{id}/budget
GET /api/v1/trips/{id}/calendar

POST /api/v1/trips/{id}/publish
GET  /api/v1/public/trips/{token}
POST /api/v1/trips/{id}/copy

GET    /api/v1/community
POST   /api/v1/reviews
GET    /api/v1/activities/{id}/reviews

GET    /api/v1/users/profile
PUT    /api/v1/users/profile
GET    /api/v1/users/saved-destinations
POST   /api/v1/users/saved-destinations
DELETE /api/v1/users/saved-destinations/{cityId}
DELETE /api/v1/users/account

GET    /api/v1/admin/dashboard
GET    /api/v1/admin/users
GET    /api/v1/admin/users/{id}
PUT    /api/v1/admin/users/{id}/status
GET    /api/v1/admin/trips
DELETE /api/v1/admin/trips/{id}
GET    /api/v1/admin/cities
POST   /api/v1/admin/cities
PUT    /api/v1/admin/cities/{id}
DELETE /api/v1/admin/cities/{id}
GET    /api/v1/admin/activities
POST   /api/v1/admin/activities
PUT    /api/v1/admin/activities/{id}
DELETE /api/v1/admin/activities/{id}
GET    /api/v1/admin/analytics
GET    /api/v1/admin/reports
PUT    /api/v1/admin/reports/{id}
```

Do not add every endpoint automatically.

Implement what the actual frontend/product currently needs.

Do not break existing contracts without a clear reason.

---

# 70. FRONTEND/BACKEND CONTRACT

The backend must be compatible with the React + Vite frontend.

Before changing API behavior, inspect how the frontend currently calls the backend.

When changing a contract, update consistently:

- backend route;
- request schema;
- response schema;
- frontend API service;
- frontend usage;
- tests;
- documentation.

Avoid hidden breaking changes.

---

# 71. OBSERVABILITY

For a hackathon, full enterprise observability is not required.

However, implement enough to demonstrate engineering maturity:

- structured logs;
- request IDs;
- request timing;
- centralized exceptions;
- health checks;
- load-test metrics.

Do not install a large monitoring stack unless it is actually useful for the project.

---

# 72. FAILURE RESILIENCE

The backend should degrade gracefully where possible.

Examples:

### Redis unavailable

If Redis is only being used for optional caching, do not crash all normal APIs.

Fallback to PostgreSQL when safe.

### External travel API unavailable

Return a controlled error or fallback response.

Do not hang indefinitely.

### Gemini unavailable

Return a structured chatbot provider error.

Do not crash the backend.

### Database unavailable

Return a safe error and log the incident.

Do not expose low-level credentials or stack traces.

---

# 73. TIMEOUTS AND RETRIES

Every external dependency should have reasonable timeouts.

Retries should be selective.

Safe candidates may include transient read operations.

Do not blindly retry writes and create duplicate operations.

Use exponential backoff where appropriate.

---

# 74. IDEMPOTENCY

Where an operation might be retried or duplicated, consider idempotency.

Particularly important for:

- background tasks;
- external API calls;
- payment-like workflows if introduced later;
- notification delivery;
- mutation endpoints vulnerable to accidental duplicate requests.

Do not implement an idempotency framework globally unless required; apply it where it solves a real problem.

---

# 75. SECURITY OF ADMIN ACTIONS

Administrative mutation endpoints are high-sensitivity operations.

Require:

- authentication;
- correct role;
- object-level validation;
- validation of input;
- audit logging for critical actions.

Never rely on hiding admin routes from the frontend.

---

# 76. DATA CONSISTENCY

The same underlying trip/itinerary information should drive:

- trip overview;
- itinerary;
- calendar;
- budget;
- shared itinerary.

Avoid creating multiple competing sources of truth.

The architecture should preserve the principle:

```text
Trip
  ↓
Stops
  ↓
Itinerary
  ├── Calendar view
  └── Budget calculations
```

---

# 77. OPTIONAL FUTURE FEATURES

The architecture should leave room for future features such as:

- AI auto-planning;
- budget optimization;
- trip health score;
- travel style personalization;
- destination intelligence;
- notifications/reminders;
- enhanced moderation.

Do not implement all future features merely to show architectural possibilities.

Design extension points without over-engineering.

---

# 78. IMPORTANT: DO NOT OVER-ENGINEER

This is one of the highest-priority instructions.

Do NOT automatically introduce:

- Kafka;
- Kubernetes;
- Elasticsearch;
- microservices;
- event sourcing;
- CQRS everywhere;
- distributed tracing platforms;
- complex service meshes;
- multiple databases;
- complicated domain-event infrastructure;
- excessive repository abstractions;
- unnecessary design patterns.

Only introduce these when actual project requirements demonstrate a need.

For a hackathon, a **well-designed modular monolith + PostgreSQL + Redis + Celery where useful** is preferable to a complicated distributed system that is difficult to run and explain.

---

# 79. IMPLEMENTATION PHASES

Follow this order unless the existing project requires a different sequence.

## Phase 1 — Understand

- inspect repository;
- inspect current architecture;
- inspect requirements;
- inspect database;
- inspect frontend contracts;
- identify problems.

## Phase 2 — Stabilize

Fix:

- startup issues;
- broken imports;
- configuration problems;
- database/session problems;
- incorrect authentication behavior;
- obvious security problems.

## Phase 3 — Core infrastructure

Implement/fix:

- settings;
- DB pooling;
- Alembic;
- Redis;
- logging;
- error handling;
- health checks;
- middleware.

## Phase 4 — Authentication/security

Implement/fix:

- registration;
- login;
- access tokens;
- refresh tokens;
- revocation/rotation;
- Google login;
- RBAC;
- ownership checks.

## Phase 5 — Domain modules

Implement/refactor:

- users;
- trips;
- discovery;
- itinerary;
- budget;
- sharing/community;
- admin.

## Phase 6 — Performance

Implement only justified optimizations:

- Redis caching;
- cache invalidation;
- query optimization;
- indexes;
- pagination;
- rate limiting;
- concurrency fixes.

## Phase 7 — Background jobs

Introduce Celery where a real asynchronous job exists.

## Phase 8 — Testing

Build unit/integration/API tests.

## Phase 9 — Load testing

Benchmark critical APIs.

## Phase 10 — Optional chatbot

Only now implement the Gemini chatbot if time permits.

## Phase 11 — Documentation

Finish architecture, performance, setup, and usage documentation.

---

# 80. CODING AGENT BEHAVIOR

The coding agent must behave as an engineer, not merely as a text generator.

For each significant task:

1. inspect relevant code;
2. understand dependencies;
3. identify impact;
4. implement minimal correct changes;
5. update related code;
6. run tests;
7. fix resulting errors;
8. check formatting/linting where configured;
9. verify startup;
10. verify migrations where relevant;
11. document significant architectural decisions.

Never silently ignore errors.

Never claim something works without testing it when testing is possible.

Never fabricate benchmark results.

Never remove functionality simply to simplify the implementation.

---

# 81. DEFINITION OF DONE

The backend is considered complete when, as applicable to the implemented scope:

```text
[ ] Existing critical functionality works
[ ] FastAPI starts successfully
[ ] PostgreSQL is configured correctly
[ ] Async SQLAlchemy usage is correct
[ ] Database sessions are not leaked
[ ] Connection pooling is configured sensibly
[ ] Alembic migrations work
[ ] Redis works
[ ] Redis failure does not unnecessarily crash optional cache-dependent APIs
[ ] JWT access tokens work
[ ] Refresh tokens work securely
[ ] Refresh token revocation/rotation is implemented appropriately
[ ] Google login is securely verified
[ ] RBAC works
[ ] Object-level authorization works
[ ] Public sharing is safe and read-only
[ ] Pagination is enforced
[ ] Important queries are optimized
[ ] Appropriate database indexes exist
[ ] N+1 issues are addressed
[ ] Async endpoints do not perform obvious blocking I/O
[ ] Rate limiting works
[ ] Cache invalidation works
[ ] Error handling is centralized
[ ] Request IDs are implemented
[ ] Sensitive data is not logged
[ ] Health endpoints work
[ ] Tests pass
[ ] Load testing exists for important endpoints
[ ] Actual performance results are documented
[ ] Docker local setup works where provided
[ ] README is complete
[ ] Architecture documentation exists
[ ] Chatbot is implemented only if time permits
[ ] Chatbot is read-only
[ ] Gemini key is never hard-coded
```

---

# 82. FINAL DELIVERABLE

At the end of the implementation, provide a concise engineering report containing:

## Architecture

- final architecture;
- module boundaries;
- key design decisions;
- important deviations from the reference architecture.

## Database

- important entities;
- indexes;
- transaction decisions;
- connection pool configuration.

## Performance

- caching strategy;
- rate limiting;
- query optimizations;
- concurrency protections;
- load-test methodology/results.

## Security

- JWT;
- refresh tokens;
- Google OAuth;
- RBAC;
- data ownership;
- rate limiting;
- secret management.

## Reliability

- error handling;
- timeouts;
- retries;
- Redis fallback behavior;
- health checks.

## Chatbot

If implemented:

- Gemini integration;
- website-data retrieval;
- general knowledge behavior;
- read-only safety design;
- rate limiting.

If not implemented:

- explain the planned integration point and why it was deferred.

## Running the project

Provide exact commands for:

- environment setup;
- database startup;
- Redis startup;
- migrations;
- FastAPI;
- Celery if applicable;
- tests;
- load tests.

## Known limitations

Be honest about anything that was not implemented or could not be benchmarked.

---

# 83. FINAL ENGINEERING PRINCIPLE

The goal is **not** to make the project look complicated.

The goal is to build a backend that is:

```text
Correct
Secure
Fast
Concurrent-safe
Scalable
Maintainable
Testable
Observable
Easy to run
Easy to explain
Easy to extend
```

The correct philosophy is:

```text
Use the GlobeTrotter specification to understand the product.

Use the existing repository to understand the current implementation.

Use engineering judgment to determine the final architecture.

Optimize real bottlenecks instead of theoretical ones.

Prefer a strong modular monolith over unnecessary microservices.

Build for horizontal scalability without pretending that local hardware
can guarantee production-scale throughput.

Finish the core travel platform first.

Add the chatbot only if time remains.
```

**The implementation must be practical enough for a hackathon and structured enough that an evaluator can clearly see production-grade backend engineering principles.**
