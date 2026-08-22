# Backend

A production-ready FastAPI project.

## Modules

- `signup`
- `login`
- `admimside`
- `home`

## Quick Start

```bash
cp .env.example .env
docker compose up --build
```

API docs: http://localhost:8000/docs
ReDoc: http://localhost:8000/redoc

## Development

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
alembic upgrade head
uvicorn app.main:app --reload
```

## Testing

```bash
make test
make test-cov
```
