# Phase 2: Public Services (Citizen Portal)

## 1. Objectives
Implement all citizen-facing features accessible via the Public Services portal. This includes land tax calculation and payment, CS/RS record search and purchase, the interactive land map, public transaction status views, and public notices.

## 2. Scope
- **Land Tax Workflow (FR-02 to FR-05):** Input form, calculation, mock payment, and Dakhila PDF generation.
- **CS/RS Record Services (FR-06 to FR-09):** Search interface, record view, mock payment, and official copy PDF generation.
- **Land Map (FR-59 to FR-60):** Interactive map using Leaflet, parcel markers, and status popups.
- **Transaction Status (FR-46 to FR-51):** Public parcel detail view heavily featuring the `TransactionStatusPanel` to expose double-selling protections.
- **Notices (FR-58):** Read-only list and detail view for public notices.
- **Mock Payment UI:** A reusable modal for simulating successful or failed transactions.

## 3. Prerequisites & Dependencies
- Phase 1 completed (Layouts, UI primitives, MongoDB seeded with parcels and records).
- Setup of `react-leaflet` in `apps/web`.
- Setup of `pdfkit` (or similar server-side PDF generator) in `apps/api`.

## 4. Step-by-Step Tasks

### Task 2.1: Mock Payment Gateway Module
1. In `apps/web/src/components/`, build `PaymentModal.tsx` containing a "Success" and "Failure" button.
2. In `apps/api/src/shared/payment.ts`, create the `POST /api/pay` endpoint accepting `simulate: "success" | "failure"`.
3. Record the transaction in the `payments` collection and return the result.

### Task 2.2: Land Tax Workflow
1. **Frontend:** Create `apps/web/src/pages/citizen/LandTax.tsx` with a form for entering land details.
2. **Backend:** Create `apps/api/src/modules/citizen/landTax.ts` with `POST /calculate`.
3. **Frontend:** Display calculated amount and trigger `PaymentModal`.
4. **Backend:** On success, generate Dakhila PDF and return it.
5. **Frontend:** Trigger browser download of the Dakhila.

### Task 2.3: CS/RS Record Services
1. **Frontend:** Create `apps/web/src/pages/citizen/ViewCSRS.tsx` with a search bar (by Khatian/Dag).
2. **Backend:** Create `apps/api/src/modules/citizen/csRecord.ts` with `GET /search`.
3. **Frontend:** Show search results. Add "Request Official Copy" button triggering `PaymentModal`.
4. **Backend:** On success, generate official CS/RS PDF and record transaction.

### Task 2.4: Land Record & Transaction Status Page
1. **Frontend:** Create `apps/web/src/pages/citizen/LandRecord.tsx`.
2. **Backend:** Create `apps/api/src/modules/citizen/landRecord.ts` with `GET /:parcelId`.
3. **Frontend:** Prominently mount the `TransactionStatusPanel` component at the very top of the page. Display warning text if status is `MutationInProgress` or `Restricted` (FR-49–51).

### Task 2.5: Interactive Land Map
1. **Frontend:** Create `apps/web/src/pages/citizen/LandMap.tsx`. Install `leaflet` and `react-leaflet`.
2. **Backend:** Create `apps/api/src/modules/citizen/map.ts` returning mock GeoJSON or parcel coordinates.
3. **Frontend:** Render map. Clicking a parcel opens a popup linking to the Land Record page.

### Task 2.6: Public Notices
1. **Frontend:** Create `apps/web/src/pages/citizen/Notices.tsx` displaying a list of active notices fetched from `apps/api`.

## 5. Relevant Modules/Files
- `apps/web/src/pages/citizen/*`
- `apps/web/src/components/PaymentModal.tsx`
- `apps/api/src/modules/citizen/*`
- `apps/api/src/shared/payment.ts`
- `apps/api/src/shared/pdfGenerator.ts`

## 6. Implementation Guidance
- **Design Constraints:** Ensure the `TransactionStatusPanel` is never hidden in a tab. The paid import fee must be clear.
- **Double-selling Visibility:** The transaction status is the most critical feature. It must instantly convey whether a parcel is safe to register or blocked.
- **PDF Generation:** Use a reliable backend generator. Do not use headless browsers; use structure-based generation.

## 7. Testing & Verification Requirements
- Search for a parcel known to be `Available` and verify the green status panel.
- Search for a parcel known to be `MutationInProgress` and verify the amber warning panel.
- Complete a land tax flow choosing "Success" in the mock payment modal. Verify the PDF downloads.
- Complete a CS/RS flow choosing "Failure" in the mock payment modal. Verify the flow blocks and shows an error.

## 8. Acceptance Criteria
- All public workflows are functional and accessible via the Citizen layout.
- The map renders parcels and links to their detail pages.
- The mock payment modal correctly halts or advances workflows based on the user's choice.
- Dakhila and Official CS/RS records are successfully generated and downloaded as PDFs.
