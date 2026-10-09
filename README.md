# BhumiLink (ভূূমিযোগ) — Digital Land Services Portal

**BhumiLink** is a digital land services portal designed to provide transparent land registration, prevent fraudulent double-selling through real-time transaction-safety status visibility, and coordinate multi-step workflows between citizens and government land officials in Bangladesh.

---

## 1. Features Completed in Phase 1

Phase 1 established the foundational infrastructure, shared design system, and database architecture:

- **Monorepo Architecture:** Clean two-tier monorepo using npm workspaces (`apps/web` and `apps/api`) with concurrent development scripts.
- **Strict Design System Tokens:** Built adhering to `docs/Design.md` §2–§5:
  - Brand green (`brand-600 #0b7350`, `brand-900 #0a3c2d`) and Bangladesh red semantic accent (`accent-500 #d72638`).
  - Typography loaded from Google Fonts: **Hind Siliguri** (primary Bengali), **Noto Sans Bengali**, and **Inter** (English).
  - Explicit global `:focus-visible` accessibility styles.
- **Shared UI Primitives Library (`apps/web/src/components/`):**
  - `Button`: Primary, secondary, outline, danger, ghost variants with loading and disabled states.
  - `Card`: Semantic container with header, title, badges, and footer.
  - `StatusBadge`: Driven by a central `statusMap.ts` mapping 6 status categories to color, icon, and bilingual labels.
  - `FormField`: Accessible form wrapper with visible labels, required markers, helper text, and error states.
  - `DataTable`: Real semantic `<table>` with sortable columns, search filtering, and pagination.
  - `Modal`: Accessible dialog with focus trap and `Escape` key handling.
  - `ToastContainer`: Global notification banner driven by Zustand.
  - `TransactionStatusPanel`: High-priority fraud-prevention banner (`Available`, `MutationInProgress`, `TransferredUpdated`, `Restricted`).
  - `ComparisonTable`: Review comparison table with `DiffRow` mismatch highlighting.
- **Bilingual Localization (i18n):**
  - Bengali as primary language with English secondary toggle via `i18next`.
  - Utility helpers for Bengali numerals (`toBengaliNumerals`), currency formatting (`formatCurrency`), and number grouping (`formatNumber`).
- **Application Shells & Layouts:**
  - `CitizenLayout`: Sticky white header with 4px Bangladesh flag accent line, navigation, language toggle, and official government footer.
  - `StaffLayout`: 256px `brand-900` sidebar console with mobile off-canvas drawer and top bar.
- **Simulated Role-Switcher & Auth Context:**
  - Global `RoleSwitcher` dropdown simulating 5 roles: `citizen`, `dolil-lekhok`, `sub-registrar`, `mutation-officer`, `admin`.
  - API client automatically attaches `X-Role` header to all outgoing requests.
  - Express backend `simulatedAuthMiddleware` automatically injects simulated user metadata.
- **Database Schemas & Models:**
  - 13 TypeScript schemas & models implemented in `apps/api/src/models/`: `User`, `LandParcel`, `CSRSRecord`, `Deed`, `DeedDocument`, `DigitalDolil`, `Mutation`, `RSBSUpdate`, `Payment`, `Notification`, `LandTaxRecord`, `Notice`, `AuditLog`.
  - Strict enum validation on `transaction_status` (`Available`, `MutationInProgress`, `TransferredUpdated`, `Restricted`).
- **Database Seeding & Atlas Connectivity:**
  - CLI and programmatic seed module (`apps/api/scripts/seed.ts` and `apps/api/src/shared/seedData.ts`) populating demo users across all roles, 8 land parcels, CS/RS records, notices, and initial notifications.
  - Sanitized logging and connection lifecycle management connected to MongoDB Atlas.

---

## 2. Technology Stack Actually Used

| Concern | Technology | Notes |
|---|---|---|
| **Frontend Framework** | React 19 (`apps/web`) | Bootstrapped with Vite 8 |
| **Routing** | React Router v7 (`react-router`) | Unified package (not `react-router-dom`) |
| **Styling** | Tailwind CSS v3 | Custom configuration mapping Design.md tokens |
| **State Management** | Zustand | Manages active role, language, notifications, toasts |
| **Localization** | i18next & react-i18next | Bengali primary, English fallback |
| **Icons** | Lucide React | Exclusive icon library across all components |
| **Backend Framework** | Node.js (v24) + Express 4 (`apps/api`) | REST API |
| **Language** | TypeScript 5 | Strict mode across web and api |
| **Database** | MongoDB Atlas / MongoDB Node Driver 6 (`mongodb`) | Official driver with `MongoClient` & `ServerApiVersion.v1` |
| **Monorepo & Tooling** | npm workspaces, Concurrently, ESLint, Prettier | Unified linting and build scripts |

---

## 3. Project Structure

```
BhumiLink/
├── apps/
│   ├── api/                           # Express backend
│   │   ├── scripts/
│   │   │   └── seed.ts                # Database seeding CLI runner
│   │   ├── src/
│   │   │   ├── models/                # TypeScript data models & interfaces (13 collections)
│   │   │   ├── shared/
│   │   │   │   ├── authMiddleware.ts  # Simulated role-based auth middleware
│   │   │   │   ├── db.ts              # Native MongoDB Atlas connection & lifecycle
│   │   │   │   └── seedData.ts        # Modular demo database seeder
│   │   │   └── index.ts               # Express server entry point
│   │   ├── .env.example               # Backend environment template
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── web/                           # Vite + React frontend
│       ├── src/
│       │   ├── components/            # Shared UI primitives (Button, Card, Modal, etc.)
│       │   ├── i18n/                  # i18next config, bn.json, en.json
│       │   ├── layouts/               # CitizenLayout and StaffLayout
│       │   ├── lib/                   # api.ts, formatCurrency.ts, statusMap.ts
│       │   ├── pages/                 # Role-based pages and KitchenSink
│       │   ├── store/                 # Zustand store (useAppStore.ts)
│       │   ├── App.tsx
│       │   ├── index.css              # CSS variables & Tailwind directives
│       │   ├── main.tsx
│       │   └── router.tsx             # React Router v7 nested routes
│       ├── .env.example               # Frontend environment template
│       ├── tailwind.config.ts         # Design tokens configuration
│       ├── package.json
│       └── vite.config.ts
├── docs/
│   ├── SRS.md                         # Software Requirements Specification
│   └── Design.md                      # Design System & UI rules
├── Implementation/
│   ├── plan.md                        # Master implementation plan
│   ├── Phase1.md                      # Phase 1 plan & verification log
│   ├── Phase2.md ... Phase5.md        # Detailed phase implementation plans
├── .gitignore
├── .prettierrc
├── eslint.config.js                   # Monorepo-wide ESLint configuration
├── package.json                       # Root workspaces package.json
└── README.md
```

---

## 4. Prerequisites

Before running the project, ensure you have:

- **Node.js:** v18.0.0 or later (v24 recommended).
- **npm:** v9.0.0 or later.
- **MongoDB:** A MongoDB Atlas cluster connection string or a local MongoDB instance.

---

## 5. Installation & Setup

1. **Clone the repository and enter the directory:**
   ```bash
   cd BhumiLink
   ```

2. **Install all dependencies across workspaces:**
   ```bash
   npm install
   ```

---

## 6. Environment Configuration

### Backend (`apps/api/.env`)

Create a `.env` file inside `apps/api/` based on `apps/api/.env.example`:

```bash
# apps/api/.env
PORT=5000

# MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://<username>:<password>@central-db.y8k6xzl.mongodb.net/?appName=Central-DB
MONGODB_DB_NAME=bhumilink
```

> **Security Note:** The `.env` file is excluded from Git via `.gitignore`. Never commit credentials or connection strings to version control.

### Frontend (`apps/web/.env`)

Optionally create `apps/web/.env` if customizing the API endpoint:

```bash
# apps/web/.env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 7. Connecting to MongoDB Atlas & Seeding Data

1. Configure your `MONGODB_URI` and `MONGODB_DB_NAME=bhumilink` in `apps/api/.env`.
2. Populate the database with initial demo records (demo users, parcels, CS/RS records, notices):
   ```bash
   npm run seed
   ```
3. The seed script verifies connection, cleans collections, and seeds demo data. Credentials in the URI are automatically masked in console output.

---

## 8. Running the Application

### Development Mode

Run both the frontend and backend simultaneously:

```bash
npm run dev
```

Or run each service individually:

- **Frontend only:**
  ```bash
  npm run dev:web
  ```
  Accessible at: `http://localhost:5173/`
  UI Kit verification: `http://localhost:5173/kitchen-sink`

- **Backend only:**
  ```bash
  npm run dev:api
  ```
  - Root endpoint: `http://localhost:5000/` or `http://localhost:5000/api`
  - Health check: `http://localhost:5000/api/health`
  - Simulated auth: `http://localhost:5000/api/auth/me`
  - Public Notices: `http://localhost:5000/api/notices`
  - Land Parcels: `http://localhost:5000/api/parcels`
  - System Stats: `http://localhost:5000/api/stats`

### API Endpoints Summary

| Method | Endpoint(s) | Description | Database Required |
|---|---|---|---|
| `GET` | `/`, `/api` | Root status confirmation (`{"status": "Good", "message": "Api is running !"}`) | No (immediate 200 OK) |
| `GET` | `/api/health`, `/health` | Full system health check and database connectivity status | Checks readiness |
| `GET` | `/api/auth/me` | Simulated user profile based on `X-Role` request header | No |
| `GET` | `/api/notices`, `/notices` | Active official notices and circulars | Yes |
| `GET` | `/api/parcels`, `/parcels` | Land parcels with search filters (`mouza`, `dag`, `khatian`) | Yes |
| `GET` | `/api/stats`, `/stats` | Aggregated system metrics (parcels, notices, users) | Yes |

### Building & Checking Code

- **Build all packages:**
  ```bash
  npm run build
  ```
- **Lint all packages:**
  ```bash
  npm run lint
  ```
- **Format code:**
  ```bash
  npm run format
  ```

---

## 9. Vercel Deployment Guide

BhumiLink is structured as an npm workspaces monorepo with two independent Vercel deployments:

### 1. Backend API Deployment (`apps/api`)

- **Vercel Project Root Directory:** `apps/api`
- **Framework Preset:** Other
- **Build Command:** `npm run build`
- **Output Directory:** Leave blank
- **Serverless Configuration:** Configured in `apps/api/vercel.json` using `@vercel/node` routing all traffic `/(.*)` to `src/index.ts`.
- **Express Serverless Export:** `apps/api/src/index.ts` exports `app` as default (`export default app`). When `process.env.VERCEL` is present, `app.listen()` is bypassed so Vercel can manage invocations.
- **MongoDB Connection Reuse:** The official MongoDB client and database connection are cached across invocations in `apps/api/src/shared/db.ts` to prevent connection leaks across warm serverless invocations. Root endpoint `/` and `/api` respond immediately without awaiting database connections.
- **Required Production Environment Variables (Vercel Project Settings):**
  - `MONGODB_URI`: MongoDB Atlas connection string (e.g. `mongodb+srv://...`)
  - `MONGODB_DB_NAME`: Database name (e.g. `bhumilink`)

### 2. Frontend Web Deployment (`apps/web`)

- **Vercel Project Root Directory:** `apps/web`
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **SPA Routing:** Configured in `apps/web/vercel.json` with a rewrite rule (`/(.*) -> /`) so direct navigation and refreshes on nested routes work cleanly without 404 errors.
- **Required Production Environment Variables (Vercel Project Settings):**
  - `VITE_API_BASE_URL`: URL of the deployed backend API (e.g. `https://bhumilink-api.vercel.app/api`). The frontend API client in `apps/web/src/lib/api.ts` automatically strips duplicate `/api` prefixes if appended.

---

## 10. Current Implementation Status & Roadmap

### Current Status: Phase 1 Complete
- [x] Monorepo structure and shared tooling.
- [x] Design system and complete shared UI primitives library.
- [x] Bilingual localization with Bengali numerals and currency formatting.
- [x] Citizen and Staff application layouts.
- [x] Role-switcher mechanism with simulated auth context.
- [x] MongoDB Atlas connection and native driver collection schemas for all 13 collections.
- [x] Database seed script with demo data.

### Known Limitations in Current Phase
- **Authentication:** Simulated via the `RoleSwitcher` dropdown and `X-Role` headers. Firebase Auth is the documented future production path.
- **Payment:** Mock payment modal and API gating will be implemented in Phase 2.
- **PDF Generation:** Server-side PDF generation for Dakhila and deeds will be implemented in Phases 2 and 3.

### Upcoming Phases
- **Phase 2 (Public Services / Citizen Portal):** Land Tax calculation & Dakhila, CS/RS search & official copy, Leaflet Land Map, Transaction Status view.
- **Phase 3 (Deed Lifecycle):** 7-step Deed wizard for Dolil Lekhok, TipTap editor, Sub-Registrar review queue, Digital Dolil PDF generation.
- **Phase 4 (Mutation Lifecycle):** Mutation application, AC Land review, Deed vs. CS/RS comparison, RS/BS record update chain.
- **Phase 5 (Admin, Notifications & Polish):** Action-oriented notification feed, admin management, audit logging, responsive and WCAG AA accessibility audit.
