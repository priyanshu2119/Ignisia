# 🔥 Ignisia — Campus Life Platform

[![Next.js](https://img.shields.io/badge/Next.js-App_Router-blue?logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![MIT License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

> **India's integrated college super-app — role-based dashboards for hostelers, day scholars, and alumni with events, study resources, opportunities, and community features.**

## ✨ Features

### Role-Based Dashboards
- 🏠 **Hosteler Dashboard** — Room management, mess menu, complaints, roommate connect
- 🎒 **Day Scholar Dashboard** — Class schedule, attendance, campus navigation
- 🎓 **Alumni Dashboard** — Networking, mentorship, job referrals, donations

### Campus Features
- 📅 **Events** — Browse, register, and manage campus events
- 📚 **Study Resources** — Share notes, previous papers, study materials
- 💼 **Opportunities** — Internships, placements, freelance gigs
- 🏨 **Hostel Connect** — Roommate matching, facility requests, community chat
- 🎌 **Anime Hub** — Community section for anime enthusiasts
- 🛠️ **Services** — Campus services marketplace (laundry, tiffin, printing)
- 👤 **Profile** — User profile with achievements and activity history

### UI/UX
- 🌓 **Dark/Light Mode** — Theme toggle with system preference detection
- 📱 **Fully Responsive** — Mobile-first design with adaptive layouts
- ⚡ **Loading States** — Skeleton loaders for all async pages
- 🚫 **Error Boundaries** — Graceful error handling + custom 404 page
- 🎨 **50+ ShadCN Components** — Professional, accessible UI library

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + ShadCN/Radix UI |
| Icons | Lucide React |
| Forms | React Hook Form + Zod |
| State | React Context + hooks |
| Deployment | Docker + Vercel |

## 🚀 Quick Start

```bash
git clone https://github.com/priyanshu2119/Ignisia.git
cd Ignisia

cp .env.example .env.local
npm install
npm run dev    # http://localhost:3000
```

## 🐳 Docker

```bash
docker build -t ignisia .
docker run -p 3000:3000 --env-file .env.local ignisia
```

## 📁 Project Structure

```
app/
├── page.tsx                    # Landing page
├── login/page.tsx              # Authentication
├── signup/page.tsx             # Registration
├── forgot-password/page.tsx    # Password recovery
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
├── about/page.tsx              # About page
├── layout.tsx                  # Root layout + theme provider
├── loading.tsx                 # Global loading state
├── error.tsx                   # Error boundary
└── not-found.tsx               # 404 page

components/
├── ui/                         # 50+ ShadCN components
├── alumni-carousel.tsx         # Custom alumni showcase
├── theme-provider.tsx          # Dark/light mode context
└── theme-toggle.tsx            # Theme switcher button

lib/
├── utils.ts                    # Utility functions (cn helper)
├── security/headers.ts         # Security headers middleware
└── security/rate-limiter.ts    # IP-based rate limiting
```

## 🗺️ Roadmap

| Phase | Status |
|-------|--------|
| Phase 0: Foundation + Security + CI/CD | ✅ In Progress |
| Phase 1: Backend + Auth + Role System | Planned |
| Phase 2: Social Features + Testing | Planned |
| Phase 3: Production Launch | Planned |

## 📄 License

MIT — see [LICENSE](./LICENSE).
