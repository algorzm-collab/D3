# UI Spec: Work & OKR

## Employee Check-In Panel

Purpose:

- Let an employee record daily work in under one minute.

States:

- Empty: show today's goals and three-line prompt.
- Loading: skeleton for goals and last check-in.
- Error: retry and save local draft if possible.
- Access denied: show no content and link to support.

## Manager Team Progress

Purpose:

- Show team progress, blockers, support requests, and evidence gaps.

Role behavior:

- Manager sees scoped team records only.
- HR sees completeness and policy-safe drill-down.
- Institution head sees aggregate only.

