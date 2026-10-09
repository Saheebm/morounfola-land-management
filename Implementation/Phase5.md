# Phase 5: Central Services, Admin & Polish

## 1. Objectives
Finalize the system by implementing global support services. This includes real-time (or polled) notifications, payment history, the administrative dashboard, the system audit trail, and a comprehensive accessibility and responsiveness quality assurance pass.

## 2. Scope
- **Notifications (FR-54):** In-app notification bell and dropdown list.
- **Payment History (FR-52, 53):** A view for users to see past transactions.
- **Admin Dashboard (FR-55 to FR-57):** Aggregated statistics on deeds, mutations, payments, and rejections.
- **User & Notice Management (FR-58, FR-63):** Admin interfaces to manage system users and public notices.
- **Audit Logs:** Populate logs on all critical system actions.
- **QA Pass:** Full adherence to Design.md constraints, WCAG AA accessibility, and mobile responsiveness.

## 3. Prerequisites & Dependencies
- Phases 1 through 4 completed.
- Notification entries being successfully created in the DB by workflow events.

## 4. Step-by-Step Tasks

### Task 4.1: Notification Feed
1. **Backend:** Create `apps/api/src/shared/notification.ts` with `GET /notifications` and `PUT /notifications/:id/read`.
2. **Frontend:** Implement the notification bell in the Header layout.
3. Create a dropdown or slide-out panel showing action-oriented notifications (Design.md §9.8).
4. Implement periodic polling (e.g., every 15s) or SSE to update the unread count.

### Task 4.2: Admin Dashboard & Statistics
1. **Backend:** Create `apps/api/src/modules/admin/reports.ts` to aggregate counts (deeds by status, revenue from payments, etc.).
2. **Frontend:** Create `apps/web/src/pages/admin/Dashboard.tsx` displaying these metrics in stylized cards.

### Task 4.3: User & Notice Management
1. **Frontend:** Create `apps/web/src/pages/admin/Users.tsx` and `Notices.tsx`.
2. Implement DataTables for listing.
3. Implement Modals for Create/Edit operations.
4. **Backend:** Create CRUD endpoints in `apps/api/src/modules/admin/users.ts` and `notices.ts`.

### Task 4.4: Audit Logs
1. **Backend:** Review all state-changing endpoints (`POST /approve`, `POST /reject`, `POST /pay`). Ensure an entry is written to the `audit_logs` collection detailing the actor, action, and timestamp.

### Task 4.5: Quality Assurance & Pre-Merge Checklist
1. **Responsiveness:** Test all views at 390px (mobile) and 1280px (desktop). Ensure sidebars convert to off-canvas drawers, tables scroll horizontally, and stepper grids wrap.
2. **Accessibility:** Use tab navigation to verify focus rings on all interactive elements. Run a contrast checker on text elements. Ensure Dialogs trap focus.
3. **Design Review:** Cross-reference every screen against the 12-point checklist in `Design.md` §13. Ensure no unauthorized colors, shadows, or rounded-pill styles exist.

## 5. Relevant Modules/Files
- `apps/web/src/layouts/Header.tsx`
- `apps/web/src/pages/admin/*`
- `apps/api/src/modules/admin/*`
- `apps/api/src/shared/notification.ts`

## 6. Implementation Guidance
- **Notifications:** Keep the frontend implementation simple. If SSE is too complex to stabilize for the prototype, use a simple `setInterval` fetch polling mechanism.
- **Audit Logs:** Ensure the log payload strips sensitive PII but retains enough ID references to trace the action history.

## 7. Testing & Verification Requirements
- Create a new notice as Admin. Switch to Citizen and verify it appears on the public board.
- Trigger a deed rejection as Sub-Registrar. Switch to Dolil Lekhok and verify the notification bell increments immediately. Click it to navigate to the rejected deed.
- Navigate the entire app using only the keyboard (Tab, Enter, Space, Escape).

## 8. Acceptance Criteria
- Notifications correctly alert users to required actions.
- Admin can successfully manage users and notices.
- Audit logs are recording transactions accurately.
- The app passes the Design.md pre-merge checklist completely, with fully functional mobile layouts and accessibility standards met.
