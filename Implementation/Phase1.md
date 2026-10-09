# Phase 1: Foundation & Infrastructure

## 1. Objectives
Set up the core project architecture, establish the design system, configure the simulated authentication, build all shared UI primitives, and prepare the database with seed data. This phase lays the groundwork for all subsequent feature development.

## 2. Scope
- Monorepo scaffolding (`apps/web` for React/Vite, `apps/api` for Express).
- Global styling configuration (Tailwind + CSS variables).
- Localization setup (i18next with Bengali and English).
- State management and simulated role-switching (Zustand).
- Database setup (MongoDB + Mongoose) and schema definition.
- Implementation of all shared UI primitives from Design.md §8.
- Application shell layouts (Citizen and Staff).
- Seed data generation for demo purposes.

## 3. Prerequisites & Dependencies
- Node.js installed.
- MongoDB instance (local or Atlas) available.
- Understanding of the constraints in `docs/Design.md`.

## 4. Step-by-Step Tasks

### Task 1.1: Monorepo & Tooling Setup
1. Initialize the monorepo using npm workspaces at `d:\BhumiLink\`.
2. Scaffold `apps/web` using Vite (React + TypeScript).
3. Scaffold `apps/api` using Express + TypeScript.
4. Configure ESLint and Prettier across both apps.
5. Add a `concurrently` script in the root `package.json` to run both frontend and backend development servers simultaneously.

### Task 1.2: Design System Configuration
1. In `apps/web`, configure `tailwind.config.ts` exactly as specified in `docs/Design.md` §5.
2. Define CSS variables in `apps/web/src/index.css`.
3. Install necessary UI dependencies: `lucide-react` for icons. (Do not install component libraries that conflict with custom primitives).

### Task 1.3: Localization Setup
1. Install `i18next` and `react-i18next` in `apps/web`.
2. Create `apps/web/src/i18n/bn.json` and `en.json`.
3. Populate initial glossary terms from Design.md §6.
4. Create utility functions in `apps/web/src/lib/formatCurrency.ts` for handling Bengali numerals and currency formatting.

### Task 1.4: Database & Models Setup
1. In `apps/api`, set up Mongoose connection logic in `src/shared/db.ts`.
2. Create Mongoose schemas in `apps/api/src/models/` for: `User`, `LandParcel`, `CSRSRecord`, `Deed`, `DeedDocument`, `DigitalDolil`, `Mutation`, `RSBSUpdate`, `Payment`, `Notification`, `LandTaxRecord`, `Notice`, `AuditLog`.
3. Ensure Enum values (e.g., `transaction_status`: `Available`, `MutationInProgress`, `TransferredUpdated`, `Restricted`) match the master plan perfectly.

### Task 1.5: Simulated Auth & API Client
1. In `apps/web`, set up a Zustand store (`src/store/useAppStore.ts`) to manage `activeRole` (citizen | dolil-lekhok | sub-registrar | mutation-officer | admin).
2. Create an Axios or fetch wrapper (`apps/web/src/lib/api.ts`) that automatically attaches the `X-Role` header to every request based on the Zustand state.
3. In `apps/api`, create a middleware to read `X-Role` and attach a simulated user context to the request.

### Task 1.6: Shared UI Primitives
1. Implement the following components in `apps/web/src/components/` strictly adhering to `docs/Design.md` §8:
   - `Button.tsx` (variants: primary, secondary, outline, danger, ghost)
   - `Card.tsx`
   - `StatusBadge.tsx` (driven by `src/lib/statusMap.ts`)
   - `DataTable.tsx`
   - `Modal.tsx`
   - `Toast.tsx`
   - `FormField.tsx`
   - `TransactionStatusPanel.tsx` (per §9.1)
   - `ComparisonTable.tsx` (with DiffRow support)

### Task 1.7: Application Layouts
1. Build `CitizenLayout.tsx` featuring a sticky white header, the 4px flag accent line, navigation, language switcher, and notification bell.
2. Build `StaffLayout.tsx` featuring a 256px `brand-900` sidebar (collapsible to off-canvas on mobile) and a top bar.
3. Set up React Router v7 in `apps/web/src/router.tsx` defining the base route structure using these layouts.

### Task 1.8: Seed Data Script
1. Create a script in `apps/api` to clear and populate the database.
2. Insert 5 demo users (one for each role).
3. Insert 5-10 land parcels covering all `transaction_status` enum values.
4. Insert sample CS/RS records linked to some parcels.
5. Insert sample notices.

## 5. Relevant Modules/Files
- Root: `package.json`
- `apps/web/`: `vite.config.ts`, `tailwind.config.ts`, `src/index.css`, `src/router.tsx`, `src/store/*`, `src/lib/*`, `src/components/*`, `src/layouts/*`
- `apps/api/`: `src/shared/db.ts`, `src/models/*`, `scripts/seed.ts`

## 6. Implementation Guidance
- **Strict Styling:** Use only the tokens defined in the Tailwind config. Do not introduce arbitrary pixel values for colors, radii, or shadows.
- **Accessibility:** Ensure all interactive primitives (Buttons, Inputs) have visible focus states (`:focus-visible`). Modals must trap focus.
- **Error Handling:** API client should globally catch and display Toast errors for 4xx/5xx responses.

## 7. Testing & Verification Requirements
- Start both servers (`npm run dev`) and verify they boot without errors.
- Run the seed script and verify data exists in MongoDB.
- Render all shared UI primitives in a temporary "Kitchen Sink" route to visually verify they match Design.md requirements.
- Test the language switcher to ensure labels toggle between EN and BN.
- Test the role-switcher dropdown and verify the `X-Role` header is sent in API requests.

## 8. Acceptance Criteria
- Monorepo is correctly structured and runs concurrently.
- Tailwind configuration accurately reflects the design tokens.
- All defined MongoDB collections can be queried successfully after running the seed script.
- The UI primitives library is complete, fully accessible, and styled correctly.
- Role switching updates the global state and subsequent API requests.
