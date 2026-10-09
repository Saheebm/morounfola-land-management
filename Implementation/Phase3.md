# Phase 3: Deed Lifecycle

## 1. Objectives
Implement the core deed registration workflow. This covers the Dolil Lekhok's 7-step wizard to create and submit a deed, the Sub-Registrar's review and approval loop, and the final generation of the Digital Dolil.

## 2. Scope
- **Deed Wizard (FR-10 to FR-22):** A 7-step process encompassing deed type selection, applicant data, CS/RS import/upload, fee calculation, TipTap-based deed editor, mock payment, and submission.
- **CS/RS Source Choice (FR-13 to FR-16):** Two-card UI for Upload vs. Database Import. Import requires an upfront mock payment.
- **Sub-Registrar Dashboard (FR-23):** Queue of pending deeds.
- **Sub-Registrar Review & Verification (FR-24 to FR-28):** Multi-section review page with an explicit Approve/Reject panel. Rejection requires reasons and triggers a correction loop.
- **Digital Dolil Generation (FR-29 to FR-32):** On approval, generate a structured PDF, store it, add it to the Dolil Lekhok's dashboard, and trigger a success state.

## 3. Prerequisites & Dependencies
- Phase 1 shared primitives (specifically the Stepper and TipTap rich-text integration).
- Phase 2 mock payment module.
- `apps/api` PDF generator configured for Dolil structures.

## 4. Step-by-Step Tasks

### Task 3.1: Dolil Lekhok Dashboard
1. **Frontend:** Create `apps/web/src/pages/dolil-lekhok/Dashboard.tsx` displaying a list of drafted, submitted, and approved deeds (Digital Dolils).

### Task 3.2: 7-Step Deed Wizard (Dolil Lekhok)
1. **Frontend:** Create `apps/web/src/pages/dolil-lekhok/CreateDeed.tsx`.
2. Implement React Hook Form + Zod for validation across the 7 steps.
3. **Step 1 & 2:** Deed Type and Applicant Info.
4. **Step 3 (CS/RS Source):** Implement the two-card UI. "Upload" handles local file select. "Import" queries the API (`GET /cs-rs/search`) and prompts the `PaymentModal` for the import fee before attaching.
5. **Step 4 (Fee Calculation):** Auto-calculate fees based on input.
6. **Step 5 (Deed Editor):** Implement the TipTap editor. Differentiate visually between "System-generated" (locked) and "User-editable" text blocks (FR-22).
7. **Step 6 & 7:** Payment (using `PaymentModal`) and final submission to the `UnderVerification` status.
8. **Backend:** Create `apps/api/src/modules/dolil-lekhok/deed.ts` to handle saving drafts and final submissions.

### Task 3.3: Sub-Registrar Workflow
1. **Frontend:** Create `apps/web/src/pages/sub-registrar/Dashboard.tsx` showing deeds in `UnderVerification`.
2. **Frontend:** Create `apps/web/src/pages/sub-registrar/DeedReview.tsx`. Display ordered review sections (Applicant, Land, CS/RS, Deed preview, Payment, Checklist).
3. Implement the Approve / Reject decision panel.
4. **Rejection:** Form must have required "Reason" and "Corrections Required" fields. Submit blocked if empty (FR-27).
5. **Backend:** Create `apps/api/src/modules/sub-registrar/deedReview.ts` to handle `POST /approve` and `POST /reject`.

### Task 3.4: Rejection & Correction Loop
1. When rejected, update deed status to `Draft` or `NeedsCorrection`.
2. **Frontend:** In `CreateDeed.tsx`, if the deed has rejection notes, display them prominently and allow the Dolil Lekhok to edit and resubmit.

### Task 3.5: Digital Dolil Generation
1. **Backend:** On `POST /approve`, generate the final PDF using `pdfkit`.
2. Store the PDF URL in the `digital_dolils` collection.
3. Add the Dolil to the Dolil Lekhok's dashboard.
4. Create a notification in the `notifications` collection (FR-32).

## 5. Relevant Modules/Files
- `apps/web/src/pages/dolil-lekhok/*`
- `apps/web/src/pages/sub-registrar/*`
- `apps/api/src/modules/dolil-lekhok/deed.ts`
- `apps/api/src/modules/sub-registrar/deedReview.ts`

## 6. Implementation Guidance
- **TipTap Editor:** Use custom extensions to lock specific nodes (System-generated text) so they cannot be deleted or edited by the user.
- **Form State:** Use Zustand or React Hook Form's context to maintain wizard state across unmounts/remounts if the user navigates away.

## 7. Testing & Verification Requirements
- Complete the 7-step wizard as a Dolil Lekhok. Verify validation blocks progression on empty fields.
- Test the CS/RS Import payment gate. Verify failure blocks import.
- Switch to Sub-Registrar. Review the submitted deed.
- Test Rejection: leave reason blank, verify submit is blocked. Fill reason, reject, switch back to Dolil Lekhok, and verify notes appear.
- Test Approval: Verify the Digital Dolil PDF is generated and appears on the Dolil Lekhok dashboard with an "Apply for Mutation" CTA.

## 8. Acceptance Criteria
- 7-step wizard functions flawlessly with strict validation.
- Sub-Registrar can view, reject, and approve deeds.
- Rejection loop successfully forces corrections.
- Digital Dolil generation succeeds and updates relevant dashboards.
