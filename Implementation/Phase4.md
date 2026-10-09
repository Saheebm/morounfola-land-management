# Phase 4: Mutation Lifecycle

## 1. Objectives
Implement the mutation workflow, which heavily reuses data from the previously generated Digital Dolil. This phase covers the mutation application, the Mutation Officer's verification process, and the final update to the RS/BS records, closing the land transaction lifecycle.

## 2. Scope
- **Mutation Application (FR-33 to FR-36):** Initiated from an approved Digital Dolil. Auto-fills data and requires a mock payment before submission.
- **Mutation Officer Dashboard & Review (FR-37 to FR-40):** Queue of pending mutations and a detailed split-layout review page highlighting mismatches between the Deed and the CS/RS record.
- **Approve/Reject Loop (FR-41 to FR-43):** Similar to the Sub-Registrar loop, with mandatory rejection reasons.
- **RS/BS Record Update (FR-44 to FR-45):** On approval, formally update the land record and ownership.
- **Status Closure (FR-46 to FR-51):** Update `transaction_status` to `TransferredUpdated`, unlocking the parcel for future transactions.

## 3. Prerequisites & Dependencies
- Phase 3 completed (A generated Digital Dolil must exist to test this phase).
- Shared primitives (ComparisonTable).

## 4. Step-by-Step Tasks

### Task 4.1: Auto-Fill Mutation Application (Dolil Lekhok)
1. **Frontend:** In `apps/web/src/pages/dolil-lekhok/Dashboard.tsx`, add the "Apply for Mutation" action to approved Digital Dolils.
2. Create `apps/web/src/pages/dolil-lekhok/MutationApply.tsx`.
3. When initialized, the form MUST auto-fill with data from the attached Digital Dolil and CS/RS record. Do not force the user to re-type existing data.
4. Prompt for the Mutation Fee using `PaymentModal`.
5. **Backend:** Create `apps/api/src/modules/dolil-lekhok/mutation.ts` to handle submission and set status to `UnderVerification`.

### Task 4.2: Mutation Officer Dashboard & Review
1. **Frontend:** Create `apps/web/src/pages/mutation-officer/Dashboard.tsx` displaying assigned mutations.
2. Create `apps/web/src/pages/mutation-officer/MutationReview.tsx`.
3. Implement a split layout: left pane for application details, right pane for source document comparison.
4. Use the `ComparisonTable` primitive. Columns: `Field | Deed | CS/RS | Result`.
5. Implement match/mismatch logic: If values match, show a green `✓ Match` badge. If they differ, tint the row amber and show a warning badge.
6. Display the current transaction status prominently.

### Task 4.3: Approve, Reject & Record Update
1. **Backend:** Create `apps/api/src/modules/mutation-officer/mutationReview.ts`.
2. Implement `POST /reject` (requires reason/corrections).
3. Implement `POST /approve`. This is a critical transaction:
   - Update `mutations` status to Approved.
   - Create a record in `rs_bs_updates`.
   - Update `land_parcels`: change `current_owner_id` to the new owner, and change `transaction_status` to `TransferredUpdated`.
   - Create a notification for the Dolil Lekhok.

### Task 4.4: End-to-End Status Verification
1. Ensure the Citizen Portal `LandRecord.tsx` correctly reflects the new owner and the cleared `TransferredUpdated` status after approval.

## 5. Relevant Modules/Files
- `apps/web/src/pages/dolil-lekhok/MutationApply.tsx`
- `apps/web/src/pages/mutation-officer/*`
- `apps/api/src/modules/dolil-lekhok/mutation.ts`
- `apps/api/src/modules/mutation-officer/mutationReview.ts`

## 6. Implementation Guidance
- **Comparison Table:** The visual distinction of mismatches is a key requirement (Design.md §9.7). Ensure the amber tinting (`#fffbeb`) and warning icons are obvious.
- **Database Transactions:** The RS/BS update in Task 4.3 modifies multiple collections. If MongoDB supports transactions in this environment, use them to ensure atomicity. Otherwise, write carefully ordered updates.

## 7. Testing & Verification Requirements
- Start a mutation application from an existing Digital Dolil. Verify fields are pre-filled.
- Submit the application and switch to Mutation Officer.
- Open the review page. Intentionally alter a field in the DB to force a mismatch and verify the Comparison Table highlights it in amber.
- Reject the mutation, verify the Dolil Lekhok receives it.
- Approve the mutation.
- Switch to Citizen role, search the parcel, and verify the new owner is listed and the warning status is gone.

## 8. Acceptance Criteria
- Mutation form leverages existing data without redundant entry.
- Officer review clearly highlights discrepancies between deed and historical records.
- Approval correctly alters the underlying land parcel ownership and resets transaction status.
