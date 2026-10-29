# 🔥 Ignisia — Campus Life Platform

[![Next.js](https://img.shields.io/badge/Next.js-App_Router-blue?logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![MIT License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

> **India's integrated college super-app — role-based dashboards for hostelers, day scholars, and alumni with events, study resources, forum, notifications, and career opportunities.**

## ✨ Features

### Role-Based Dashboards
- 🏠 **Hosteler Dashboard** — Room management, mess menu, complaints, roommate connect
- 🎒 **Day Scholar Dashboard** — Class schedule, attendance, campus navigation
- 🎓 **Alumni Dashboard** — Networking, mentorship, job referrals, donations

### Campus Features
- 📅 **Events** — Browse, create, register for campus events (6 categories)
- 📚 **Study Resources** — Share notes, papers, tutorials (6 resource types)
- 💼 **Opportunities** — Internships, placements, freelance, research, scholarships
- 💬 **Forum** — Campus discussions with anonymous posting (7 categories)
- 🔔 **Notifications** — Real-time alerts for events, comments, opportunities
- 🏨 **Hostel Connect** — Roommate matching, facility requests
- 🎌 **Anime Hub** — Community section for anime enthusiasts
- 🛠️ **Services** — Campus services marketplace

### Security & Production
- 🔒 **Security Headers** — CSP, X-Frame-Options, XSS-Protection on all APIs
- ⏱️ **Rate Limiting** — IP-based per endpoint (10-20 req/min)
- ✅ **Zod Validation** — All API inputs strictly validated with detailed errors
- 🧪 **Unit Tests** — Schema validation tests (Vitest)
- 🐳 **Docker** — Multi-stage production build
- 🔄 **CI/CD** — GitHub Actions pipeline
- 📝 **Structured Logging** — JSON-formatted production logs

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + ShadCN/Radix UI (50+ components) |
| Icons | Lucide React |
| Forms | React Hook Form + Zod |
| Validation | Zod (all API routes) |
| Testing | Vitest |
| Deployment | Docker + Vercel |

## 📡 API Endpoints

| Method | Endpoint | Description | Rate Limit |
|--------|----------|-------------|------------|
| POST | `/api/auth` | Register/Login (action: "register" or "login") | 10/min |
| GET | `/api/auth` | Get current user profile | — |
| POST | `/api/events` | Create campus event | 10/min |
| GET | `/api/events` | List events (filter by category, paginated) | — |
| POST | `/api/resources` | Create study resource | 15/min |
| GET | `/api/resources` | List resources (filter by subject/type) | — |
| POST | `/api/opportunities` | Create career opportunity | 10/min |
| GET | `/api/opportunities` | List opportunities (filter by type) | — |
| POST | `/api/forum` | Create forum post (supports anonymous) | 10/min |
| GET | `/api/forum` | List posts (filter by category, paginated) | — |
| POST | `/api/notifications` | Create notification | 20/min |
| GET | `/api/notifications` | List notifications (unread filter) | — |
| PATCH | `/api/notifications` | Mark notifications as read (batch) | — |

### Example: Create Event

```bash
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tech Fest 2026",
    "description": "Annual technology festival with workshops and hackathon",
    "category": "technical",
    "date": "2026-11-15",
    "location": "Main Auditorium",
    "organizer": "CS Department"
  }'
```

### Example: Register User

```bash
curl -X POST http://localhost:3000/api/auth \
  -H "Content-Type: application/json" \
  -d '{
    "action": "register",
    "email": "student@college.edu",
    "password": "SecurePass123!",
    "name": "Priya Sharma",
    "role": "hosteler",
    "college": "Delhi University"
  }'
```

## 📁 Project Structure

```
app/
├── page.tsx                    # Landing page
├── login/page.tsx              # Authentication
├── signup/page.tsx             # Registration
├── profile/page.tsx            # User profile
├── dashboard/
│   ├── hosteler/page.tsx       # Hosteler dashboard
│   ├── day-scholar/page.tsx    # Day scholar dashboard
│   └── alumni/page.tsx         # Alumni dashboard
├── events/page.tsx             # Campus events
├── study/page.tsx              # Study resources
├── opportunities/page.tsx      # Career opportunities
├── hostel-connect/page.tsx     # Hostel networking
├── anime-hub/page.tsx          # Anime community
├── activities/page.tsx         # Campus activities
├── services/page.tsx           # Campus services
├── api/
│   ├── auth/route.ts           # Auth (register/login/me)
│   ├── events/route.ts         # Events CRUD
│   ├── resources/route.ts      # Study resources CRUD
│   ├── opportunities/route.ts  # Opportunities CRUD
│   ├── forum/route.ts          # Forum posts CRUD
│   └── notifications/route.ts  # Notifications CRUD + mark-read
├── layout.tsx                  # Root layout + theme provider
├── error.tsx                   # Error boundary
└── not-found.tsx               # 404 page

lib/
├── types.ts                    # All Zod schemas (User, Event, Resource, etc.)
├── logger.ts                   # Structured JSON logging
├── utils.ts                    # Utility functions
├── security/headers.ts         # Security headers middleware
├── security/rate-limiter.ts    # IP-based rate limiting
└── __tests__/types.test.ts     # Unit tests

components/
├── ui/                         # 50+ ShadCN components
├── alumni-carousel.tsx         # Custom alumni showcase
├── theme-provider.tsx          # Dark/light mode
└── theme-toggle.tsx            # Theme switcher
```

## 🚀 Quick Start

```bash
git clone https://github.com/priyanshu2119/Ignisia.git
cd Ignisia
cp .env.example .env.local
npm install
npm run dev    # http://localhost:3000
```

## 🗺️ Roadmap

| Phase | Status |
|-------|--------|
| Phase 0: Foundation + Security + CI/CD | ✅ Complete |
| Phase 1: Backend + Auth + Core APIs | ✅ Complete |
| Phase 2: Forum + Notifications + Tests | ✅ Complete |
| Phase 3: Production Launch | ✅ Complete |

## 📄 License

MIT — see [LICENSE](./LICENSE).
