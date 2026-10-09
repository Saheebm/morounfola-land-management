# BhumiLink — Master Implementation Plan

> **Status:** Awaiting review and approval before phase plans are created.
> **Documents:** [`docs/SRS.md`](../docs/SRS.md) · [`docs/Design.md`](../docs/Design.md)

---

## 1. Proposed Tech Stack

### 1.1 Frontend (`apps/web`)

| Concern | Choice | Justification |
|---|---|---|
| Framework | **React (Vite)** | Lightweight, fast HMR, no SSR overhead needed for a prototype; simple SPA fits the role-simulated auth approach. |
| Routing | **React Router v7** (`npm i react-router`) | Not `react-router-dom`. v7 ships as a unified package; nested layout routes map cleanly to the two shell types (Citizen portal / Staff console). |
| Language | **TypeScript** | Catches bugs in the multi-step deed wizard and status-map logic. |
| Styling | **Tailwind CSS v3** | Design.md §5 ships a complete Tailwind config block. Tokens enforced at config level. |
| i18n | **i18next + react-i18next** | Standard for Vite/React setups; `t()` pattern matches Design.md §6; `bn` and `en` JSON message files. |
| Icons | **Lucide React** | Design.md §12 mandates Lucide exclusively. |
| Deed editor | **TipTap (headless)** | Supports mixed locked/editable zones (System-generated vs. Editable) for FR-22. |
| Map | **Leaflet + react-leaflet** | FR-59/60 parcel map; OpenStreetMap tiles, no API key needed. |
| Forms | **React Hook Form + Zod** | Per-step validation for the 7-step deed wizard. |
| State | **Zustand** | Role-switcher session, notification count, wizard dirty state. Minimal — no Redux. |
| PDF download | **Server-generated binary streamed to client** | Dakhila, Dolil, and CS/RS records generated server-side and downloaded by the browser. |

### 1.2 Backend (`apps/api`)

| Concern | Choice | Justification |
|---|---|---|
| Runtime | **Node.js** | Universal; easy to run alongside the Vite dev server in a monorepo. |
| Framework | **Express** | Minimal, no ceremony. Sufficient for a prototype REST API. |
| Language | **TypeScript** | Shared types between `apps/web` and `apps/api`. |
| Database | **MongoDB** | Flexible document model suits land records (variable CS/RS data shapes, deed templates as HTML strings, notification bodies). Mongoose ODM for schema enforcement. |
| Auth | **Simulated role-switcher** | No real auth for prototype. A global role-switcher UI component sets the active role in Zustand. All API calls include a `X-Role` header; the API trusts it in dev mode. Firebase Auth is the documented upgrade path. |
| Payment | **Mock payment module** | `payments` collection records type, amount, and status. A mock payment modal lets the user choose **Success** or **Failure**. Success proceeds to the next workflow step; Failure shows an error popup and blocks progression. `POST /pay` accepts a `simulate` field (`success`\|`failure`). |
| File storage | **Local `uploads/` folder (dev) ? Cloudinary free tier (deploy)** | Uploaded CS/RS PDFs/DOCXs and generated Dolil PDFs. Cloudinary URL stored in MongoDB. |
| PDF generation | **`pdfkit` (server-side)** | Digital Dolil (FR-29), Dakhila (FR-04), official CS/RS record (FR-09) generated on the API and streamed to client. |
| Notifications | **MongoDB + polling / SSE** | `notifications` collection; client polls or subscribes via SSE endpoint. No external message broker needed. |

### 1.3 DevOps / Tooling

| Concern | Choice |
|---|---|
| Monorepo layout | `apps/web` + `apps/api` under `d:\BhumiLink\` |
| Package manager | npm workspaces |
| Linting | ESLint + Prettier (shared config) |
| Dev run | `concurrently` root script runs both apps |
| Hosting (prototype) | Vercel (web) + Railway/Render free tier (API + MongoDB) |

---

## 2. Project Structure

### 2.1 Monorepo Layout

```
BhumiLink/
+-- apps/
¦   +-- web/                        # React + Vite frontend
¦   +-- api/                        # Express backend
+-- docs/
¦   +-- SRS.md
¦   +-- Design.md
+-- assets/                         # Design reference images
+-- Implementation/
¦   +-- plan.md                     # this file
¦   +-- Phase1.md
¦   +-- Phase2.md
¦   +-- ...
+-- package.json                    # Root workspace config
```

### 2.2 Frontend Structure (`apps/web`)

Role-based pages. Flat files — no deep nesting.

```
apps/web/
+-- src/
    +-- pages/
    ¦   +-- citizen/
    ¦   ¦   +-- LandTax.tsx
    ¦   ¦   +-- Dakhila.tsx
    ¦   ¦   +-- ViewCSRS.tsx
    ¦   ¦   +-- LandMap.tsx
    ¦   ¦   +-- LandRecord.tsx      # TransactionStatusPanel prominent here
    ¦   ¦   +-- Notices.tsx
    ¦   +-- dolil-lekhok/
    ¦   ¦   +-- Dashboard.tsx
    ¦   ¦   +-- CreateDeed.tsx      # 7-step wizard
    ¦   ¦   +-- DeedEditor.tsx
    ¦   ¦   +-- DeedDetail.tsx
    ¦   ¦   +-- MutationApply.tsx
    ¦   +-- sub-registrar/
    ¦   ¦   +-- Dashboard.tsx
    ¦   ¦   +-- DeedReview.tsx
    ¦   +-- mutation-officer/
    ¦   ¦   +-- Dashboard.tsx
    ¦   ¦   +-- MutationReview.tsx
    ¦   +-- admin/
    ¦       +-- Dashboard.tsx
    ¦       +-- Users.tsx
    ¦       +-- Notices.tsx
    +-- components/                 # Shared primitives (Design.md §8)
    ¦   +-- Button.tsx
    ¦   +-- Card.tsx
    ¦   +-- StatusBadge.tsx
    ¦   +-- TransactionStatusPanel.tsx
    ¦   +-- ComparisonTable.tsx
    ¦   +-- DataTable.tsx
    ¦   +-- Modal.tsx
    ¦   +-- Toast.tsx
    ¦   +-- FormField.tsx
    ¦   +-- Sidebar.tsx             # Staff console sidebar (brand-900)
    ¦   +-- Header.tsx              # Citizen header with flag accent line
    +-- layouts/
    ¦   +-- CitizenLayout.tsx       # Header + footer
    ¦   +-- StaffLayout.tsx         # Sidebar + topbar
    +-- store/
    ¦   +-- useAppStore.ts          # Zustand: activeRole, notifications, wizardState
    +-- lib/
    ¦   +-- api.ts                  # fetch wrapper, attaches X-Role header
    ¦   +-- formatCurrency.ts       # Bengali numeral + currency formatting
    ¦   +-- statusMap.ts            # Central status to {bg, text, icon, label} map
    +-- i18n/
    ¦   +-- bn.json
    ¦   +-- en.json
    +-- router.tsx                  # React Router v7 routes
```

### 2.3 Backend Structure (`apps/api`)

Role-based modules. One file per resource/domain area.

```
apps/api/
+-- src/
    +-- modules/
    ¦   +-- citizen/
    ¦   ¦   +-- landTax.ts          # POST /land-tax/calculate, /pay  GET /dakhila/:id
    ¦   ¦   +-- csRecord.ts         # GET /cs-rs/search, POST /cs-rs/purchase
    ¦   ¦   +-- landRecord.ts       # GET /land-record/:parcelId
    ¦   ¦   +-- map.ts              # GET /map/parcels
    ¦   +-- dolil-lekhok/
    ¦   ¦   +-- deed.ts             # POST /deeds, GET /deeds/:id, PUT /deeds/:id/submit
    ¦   ¦   +-- csImport.ts         # POST /cs-rs/import
    ¦   ¦   +-- mutation.ts         # POST /mutations, PUT /mutations/:id/submit
    ¦   +-- sub-registrar/
    ¦   ¦   +-- deedReview.ts       # GET /sr/deeds, POST /sr/deeds/:id/approve|reject
    ¦   +-- mutation-officer/
    ¦   ¦   +-- mutationReview.ts   # GET /mo/mutations, POST /mo/mutations/:id/approve|reject
    ¦   +-- admin/
    ¦       +-- users.ts            # CRUD /admin/users
    ¦       +-- notices.ts          # CRUD /admin/notices
    ¦       +-- reports.ts          # GET /admin/reports
    +-- shared/
    ¦   +-- payment.ts              # Mock payment handler (reused across modules)
    ¦   +-- notification.ts         # Create notifications in DB
    ¦   +-- pdfGenerator.ts         # Dolil / Dakhila / CS/RS PDF generation
    ¦   +-- db.ts                   # Mongoose connection
    +-- models/                     # Mongoose schemas
    ¦   +-- LandParcel.ts
    ¦   +-- CSRSRecord.ts
    ¦   +-- Deed.ts
    ¦   +-- DigitalDolil.ts
    ¦   +-- Mutation.ts
    ¦   +-- Payment.ts
    ¦   +-- Notification.ts
    ¦   +-- LandTaxRecord.ts
    ¦   +-- Notice.ts
    ¦   +-- User.ts
    ¦   +-- AuditLog.ts
    +-- index.ts                    # Express app + route registration
```

---

## 3. Key Technical Decisions

| Decision | Choice | Justification |
|---|---|---|
| **Auth approach** | Role-switcher (simulated) | Prototype: simulate each of the 5 roles without a login system. Dropdown sets `activeRole` in Zustand; API trusts `X-Role` header in dev. Firebase Auth is the documented upgrade path. |
| **Monorepo structure** | `apps/web` + `apps/api` | Clean separation without over-engineering. |
| **File organization** | Role-based, flat modules | One file per screen (web), one file per resource group (api). No DDD, no feature-sliced design. Easy to navigate for a small hackathon team. |
| **Database** | MongoDB + Mongoose | Flexible schema for variable CS/RS data shapes and deed template HTML. Mongoose enforces structure where critical (status ENUMs, required FK fields). |
| **No separate mutation search** | Intentional (per SRS §5.9) | Status visible through land record / transaction status page. |
| **PDF generation** | Server-side `pdfkit` | Keeps PDF logic in the API; client downloads the binary. |
| **Mock payment** | Two-outcome mock modal — **Success** (green popup, workflow proceeds) and **Failure** (red popup, workflow blocked). `POST /pay` accepts `simulate: "success" | "failure"`. Realistic FR-53 gating without a real gateway. |
| **i18n** | `i18next` + JSON files | `bn.json` + `en.json`; all strings via `t()` per Design.md §6. |
| **No SSR** | Plain Vite SPA | Simpler dev setup; SSR not needed for a hackathon prototype. |

---

## 4. Database Schema (MongoDB Collections)

```
users            { _id, name_bn, name_en, role: enum[citizen|dolil-lekhok|sub-registrar|mutation-officer|admin], active }
land_parcels     { _id, mouza, dag, khatian, area_decimal, transaction_status: enum[Available|MutationInProgress|TransferredUpdated|Restricted], current_owner_id }
cs_rs_records    { _id, parcel_id, record_type: enum[CS|RS], data: {}, document_url }
deeds            { _id, type, dolil_lekhok_id, sub_registrar_id, cs_rs_id, status, template_html, fee_paid, rejection_reason, corrections_required }
deed_documents   { _id, deed_id, file_url, doc_type }
digital_dolils   { _id, deed_id, parcel_id, generated_at, document_url }
mutations        { _id, dolil_id, parcel_id, mutation_officer_id, status, fee_paid, rejection_reason, corrections_required }
rs_bs_updates    { _id, mutation_id, parcel_id, old_owner_id, new_owner_id, updated_at }
payments         { _id, type: enum[LandTax|CSRSRecord|CSRSImport|DeedFee|MutationFee], amount, payer_id, reference_id, status, paid_at }
notifications    { _id, user_id, type, title_bn, title_en, body_bn, body_en, read, action_url, created_at }
land_tax_records { _id, parcel_id, amount, payer_id, payment_id, dakhila_url, issued_at }
notices          { _id, title_bn, title_en, body_bn, body_en, created_by, published_at }
audit_logs       { _id, actor_id, entity_type, entity_id, action, old_val, new_val, timestamp }
```

**`transaction_status` values:** `Available | MutationInProgress | TransferredUpdated | Restricted`

---

## 5. Implementation Phases

---

### Phase 1 — Foundation & Infrastructure
**Objective:** Scaffold the monorepo, configure the design system, build shared primitives, set up the role-switcher, and seed demo data.

| Deliverable | Description |
|---|---|
| Monorepo scaffolded | `apps/web` (Vite + React + TS) and `apps/api` (Express + TS) initialized; root `package.json` workspaces |
| Tailwind + CSS vars | Design.md §5 tokens in `tailwind.config.ts` and `index.css` |
| i18n setup | `i18next` wired; `bn.json` + `en.json` with glossary terms; `formatCurrency()` + Bengali numeral helper |
| Role-switcher | Zustand `activeRole`; top-bar dropdown (5 roles); `api.ts` attaches `X-Role` header |
| Shared primitives | All Design.md §8: Button, Card, StatusBadge, DataTable, Modal, TransactionStatusPanel, ComparisonTable, Toast, FormField, Sidebar, Header |
| Citizen layout | Sticky header, flag accent line, nav, language switcher, notification bell |
| Staff console layout | 256px `brand-900` sidebar, top bar, mobile off-canvas drawer |
| MongoDB + Mongoose | Connection setup; all models defined |
| Seed data script | Demo users (one per role), 5–10 land parcels with varied statuses, CS/RS records, notices |

---

### Phase 2 — Public Services (Citizen Portal)
**Objective:** All citizen-facing features: Land Tax, CS/RS Record, Land Map, Transaction Status.

| Deliverable | FR Coverage |
|---|---|
| Land Tax workflow | FR-02–05: Enter land info ? calculate -> mock payment modal (Success/Failure) -> on success: Dakhila PDF ? download |
| CS/RS Record search & purchase | FR-06–09: Search ? view -> mock payment modal (Success/Failure) -> on success: official PDF ? download |
| Land Map | FR-59–60: Leaflet map, parcel markers, popup with record + status |
| Land Record / Transaction Status page | FR-46–51: `TransactionStatusPanel` at top; ownership; status-based message |
| Public Notices page | FR-58 (read side): List + view notices |
| Double-selling visibility | FR-49–51: Warning panel when status is `MutationInProgress` or `Restricted` |

---

### Phase 3 — Deed Lifecycle
**Objective:** 7-step deed wizard ? Sub-Registrar review ? Digital Dolil generation.

| Deliverable | FR Coverage |
|---|---|
| 7-step deed wizard | FR-10–18: Deed Type ? Applicant & Land ? CS/RS Record ? Fee Calculation ? Deed Editor ? Payment ? Submit |
| CS/RS source choice UI | FR-13–16: Two-card Upload / Import; import fee chip visible before action; mock payment modal gate (success advances, failure blocks with popup) |
| Deed fee calculation | FR-19–20: Fee computed, displayed before payment step |
| TipTap deed editor | FR-21–22: System-generated (locked) vs. Editable zones; two-column layout |
| Deed submission | FR-17–18: Submit to Sub-Registrar; status ? `UnderVerification` |
| Sub-Registrar dashboard | FR-23: Assigned deed queue |
| Sub-Registrar review page | FR-24–26: Ordered sections per Design.md §9.5; checklist; approve/reject decision panel |
| Rejection & correction loop | FR-27–28: Rejection form (reason + corrections both required, submit blocked if empty); notify; resubmit |
| Digital Dolil generation | FR-29–32: On approval ? PDF ? store URL ? dashboard ? notification |
| Dolil Lekhok dashboard | FR-31: Digital Dolil list; status badges; "Apply for Mutation" CTA |
| Success state | Design.md §9.6: Success banner + next-action card |

---

### Phase 4 — Mutation Lifecycle
**Objective:** Mutation application ? Mutation Officer review ? RS/BS update ? status closure.

| Deliverable | FR Coverage |
|---|---|
| Mutation application (auto-fill) | FR-33–36: From dashboard ? auto-attach Dolil + CS/RS ? pre-filled review ? mutation fee ? submit |
| Mutation reminder notification | FR-33: Notification created when Digital Dolil is generated |
| Mutation Officer dashboard | FR-37: Mutation application queue |
| Mutation Officer review page | FR-38–43: Split layout; `ComparisonTable` (Deed vs. CS/RS); ownership + land verification; status check |
| Match/mismatch highlighting | Design.md §9.7: Match = success badge; Mismatch = amber row + summary alert |
| Approve/Reject mutation | FR-41–42: Approve ? RS/BS update chain; reject requires reason + corrections |
| Rejection & correction loop | FR-42–43: Notify Dolil Lekhok; resubmit; officer re-reviews |
| RS/BS record update | FR-44–45: `rs_bs_updates` doc created; `land_parcels.transaction_status` ? `TransferredUpdated`; notify |
| End-to-end status visibility | FR-48–51: Public LandRecord page reflects completed mutation |

---

### Phase 5 — Admin, Notifications & Polish
**Objective:** Notification system, admin portal, audit trail, accessibility + responsive QA.

| Deliverable | FR Coverage |
|---|---|
| Notification bell + feed | FR-54: All workflow events in `notifications`; SSE or polling; bell badge; action-oriented copy per Design.md §9.8 |
| Payment history | FR-52–53: Payer can view payment records |
| Admin dashboard | FR-55–57: Activity cards — deed count, mutation count, payment totals, rejection rates |
| Admin user management | FR-63: Create, update, deactivate users; assign roles |
| Admin notices management | FR-58: Create, publish, edit notices |
| Audit log population | SRS §10: `audit_logs` written on every approve, reject, pay, RS/BS update |
| Accessibility pass | Design.md §11: Focus-visible, ARIA, `role="alert"`, `<th scope>`, dialog focus trap, contrast |
| Responsive QA | Design.md §10: 390px + 1280px; off-canvas sidebar; sticky action bars |
| Pre-merge checklist | Design.md §13: All 12 points verified on every screen |
| Demo walkthrough | Seed data supports end-to-end demo across all 5 roles |

---

## 6. Phase Dependency Summary

```
Phase 1 (Foundation + Seed Data)
    |
    +-- Phase 2 (Citizen Portal)        <- independent; starts once parcels seeded
    |
    +-- Phase 3 (Deed Lifecycle)        <- needs Phase 1 shared components + deed models
            |
            +-- Phase 4 (Mutation)      <- strictly needs Phase 3 Digital Dolil to exist
                    |
                    +-- Phase 5 (Admin + Polish)  <- notification events from Phases 3-4
```

> Phases 2 and 3 are independent and can be developed in parallel.

---

## 7. Out-of-Scope Items (per SRS §1.4)

- Real authentication (role-switcher used; Firebase Auth is the upgrade path)
- Real payment gateway (SSLCommerz, bKash, etc.)
- Official government fee schedules (mock values used)
- Real government API integration
- Legal validity of generated documents
- NID verification with government databases

---

## 8. Design Constraints (from `docs/Design.md`)

All UI work must respect these — violation = incorrect:

1. No glassmorphism, neon, gradients (except 4px flag accent line), large pills, decorative animation, or emoji icons.
2. Only Design.md §2–§5 tokens — no invented hex, radius, or shadow values.
3. `TransactionStatusPanel` above all content on every land-record page — never inside a tab.
4. Bilingual everywhere — Bengali primary, English secondary. All strings via `t()`.
5. Rejection dialogs require reason + corrections fields — submit blocked if empty.
6. Import fee (?120) visible on the card before any action.
7. Specific action-verb button labels: `Submit Application`, `Approve Deed`, `Reject Application`, etc.
8. One primary button per view area.
9. Lucide icons only — stroke 2, 14–20px.
10. Real `<table>`, `<button>`, `<a>`, `<input>+<label>` — no `div onClick`.


