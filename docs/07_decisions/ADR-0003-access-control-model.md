# ADR-0003: Access Control Model

## Status

Accepted

## Decision

D3HR uses RBAC + ABAC + workflow-state access control.

## Alternatives Rejected

- Simple admin/user RBAC
- Tenant-specific hardcoded permissions
- Full HR super-admin access by default

## Consequences

- All sensitive APIs require PolicyService evaluation.
- Access tests must include role, org scope, sensitivity, workflow state, cycle, and delegation.

