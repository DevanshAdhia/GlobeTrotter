# 🌍 GlobeTrotter - Personalized Travel Planning Platform

GlobeTrotter is a full-stack, personalized travel-planning platform designed to help users create multi-city trips, discover destinations and activities, organize day-wise itineraries, estimate trip costs, visualize schedules, and share completed plans. 

This repository contains both the **Frontend** (React) and **Backend** (Node.js/Express) applications, along with the Admin Dashboard architecture.

---

## 🌟 Core Product Loop
**Discover → Plan → Optimize → Visualize → Share → Reuse**

---

## ✨ Features

- **User Authentication:** Login/Signup with email and password, plus secure password recovery flows.
- **Trip Management:** Create, view, edit, and delete trips with custom dates and cover images.
- **Itinerary Builder:** Plan day-wise itineraries with cities/stops, activities, ordering, and calendar/list toggles.
- **Discovery Engine:** 
  - **City Search:** Filter by country/region, cost index, and popularity.
  - **Activity Search:** Filter by category, cost, and duration.
- **Budgeting System:** Comprehensive cost breakdown (transport, stay, activities, meals) with daily averages and over-budget alerts.
- **Visual Timeline:** Interactive drag-and-drop calendar/timeline to reorder activities.
- **Community & Sharing:** Generate unique public URLs to share read-only trips. Other users can "Copy Trip" to duplicate and edit it independently.
- **Admin Dashboard:** Monitor user trends, trip data, popular destinations, engagement, and handle content moderation.

---

## 🏗️ Tech Stack

### Frontend
- **Framework:** React.js (Vite or Next.js)
- **Styling:** CSS / Tailwind CSS for responsive and modern UI
- **State Management:** React Context + local state (Zustand/Redux for complex shared states)
- **Forms & Validation:** React Hook Form
- **Data Visualization:** Chart.js or Recharts (for Budget/Analytics)

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js (or NestJS)
- **Database:** PostgreSQL
- **ORM:** Prisma or Sequelize (handles schema, migrations, DB access)
- **Authentication:** JWT (JSON Web Tokens) or secure session cookies
- **Validation:** Zod / Joi for API request validation

---

## 📂 Project Structure

This repository is structured as a monorepo containing both the frontend client and the backend server.

```text
GlobeTrotter/
├── client/                 # Frontend React Application
│   ├── src/
│   │   ├── components/     # Reusable UI components (cards, forms, layout)
│   │   ├── pages/          # Route-level components (auth, trips, itinerary)
│   │   ├── store/          # Global state management
│   │   ├── services/       # API clients and HTTP calls
│   │   └── hooks/          # Custom React hooks
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Backend Node.js Application
│   ├── src/
│   │   ├── controllers/    # Request handlers for routes
│   │   ├── routes/         # API endpoint definitions
│   │   ├── services/       # Core business logic
│   │   ├── middleware/     # Auth, error handling, validation
│   │   └── config/         # Environment and DB config
│   ├── prisma/             # Database schema and migrations
│   ├── package.json
│   └── app.js
│
└── README.md
```

---

## 🚀 Getting Started

Follow these instructions to set up the project locally for development.

### Prerequisites
- Node.js (v18 or higher recommended)
- PostgreSQL (running locally or via Docker)
- Git

### 1️⃣ Backend Setup

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the `server` directory and configure the following:
   ```env
   PORT=5000
   DATABASE_URL="postgresql://username:password@localhost:5432/globetrotter?schema=public"
   JWT_SECRET="your_super_secret_jwt_key"
   FRONTEND_URL="http://localhost:3000"
   ```

4. **Database Setup & Migrations (assuming Prisma is used):**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```
   *The backend should now be running on `http://localhost:5000`.*

### 2️⃣ Frontend Setup

1. **Navigate to the client directory:**
   ```bash
   cd ../client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the `client` directory:
   ```env
   VITE_API_BASE_URL="http://localhost:5000/api"
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   *The frontend should now be running locally.*

---

## 🔌 API Reference (Backend)

The backend provides a RESTful API. Below are some of the core endpoints:

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate and receive JWT

### Trips
- `GET /api/trips` - Get all trips for the authenticated user
- `POST /api/trips` - Create a new trip
- `GET /api/trips/:id` - Get detailed trip info
- `PUT /api/trips/:id/publish` - Publish a trip for public sharing
- `POST /api/trips/:id/copy` - Copy a shared public trip to the user's account

### Itinerary & Planning
- `POST /api/trips/:id/stops` - Add a city stop to a trip
- `POST /api/trips/:id/itinerary` - Add an activity to a specific day
- `PUT /api/trips/:id/itinerary/reorder` - Reorder itinerary items
- `GET /api/trips/:id/budget` - Fetch budget breakdown and calculations

### Discovery (Public/Authenticated)
- `GET /api/cities` - Search and filter cities
- `GET /api/activities` - Search and filter activities
- `GET /api/community` - Browse publicly shared trips

---

## 🗺️ Frontend Routing

### User Routes
- `/` - Dashboard / Home
- `/login`, `/signup` - Authentication
- `/trips` - My Trips List
- `/trips/new` - Create a new trip
- `/trips/:id/builder` - Core itinerary builder
- `/trips/:id/budget` - Budget breakdown and alerts
- `/cities`, `/activities` - Discovery pages
- `/shared/:token` - View a read-only public itinerary

### Admin Routes (Protected)
- `/admin` - Admin Dashboard
- `/admin/users` - User Management
- `/admin/trips` - Trip Moderation
- `/admin/analytics` - Platform Analytics

---

## 🔐 Security Principles

- **Authorization:** Never trust frontend roles; all permissions are verified via backend middleware.
- **Passwords:** Hashed securely before storing in the database.
- **Data Protection:** Parameterized queries (via ORM) are used to prevent SQL injection.
- **Validation:** Strict request body validation on the backend using schema validators.
- **Sharing:** Public trip URLs use unique, non-guessable generated tokens, preventing unauthorized enumeration of private trips.

---

## ✅ Definition of Done
- A user can register, login, and manage their profile.
- A user can create multi-city trips and search for destinations.
- A user can add, remove, and reorder activities in a day-by-day itinerary.
- Budgets and calendars automatically calculate and update based on itinerary data.
- Trips can be published to a public URL and cloned/copied by other users.
- Admins can authenticate, view metrics, manage users, and moderate content.
