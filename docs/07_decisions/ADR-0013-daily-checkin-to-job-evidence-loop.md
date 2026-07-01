# ADR-0013: Link Daily Check-Ins To Job Atomic Tasks And Work Evidence

## Status

Accepted

## Context

D3HR's daily loop must not become a generic diary or OKR toy. Daily activity must feed the public-HR evidence system.

JobDB now has atomic task rows. Work & OKR must connect daily user action to those rows.

## Decision

Daily check-ins may carry:

- job id
- job version id
- atomic task id
- progress status
- evidence items

Evidence items are persisted as work evidence and linked back to the daily check-in and atomic task.

## Consequences

- DAU activity becomes HR evidence.
- Workload, performance, competency, and placement discussions can trace back to job-defined tasks.
- Evidence remains tenant-scoped and audit-protected.
- Future dashboards should show job-linked progress, not only free-text status.
