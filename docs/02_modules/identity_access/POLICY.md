# Policy: Identity & Access

## Access Decision Formula

```text
role + org_scope + data_sensitivity + workflow_state + cycle + delegation = allow/deny
```

## Rules

- Authors and final approvers must be separable.
- Evaluators see only assigned target data for the active evaluation cycle.
- HR can view broad institutional data but cannot silently rewrite finalized sensitive records.
- Institution heads view aggregate briefings by default.
- Consultants access project-scoped data only.
- System operators do not receive unrestricted HR-content access.
- External evaluators access finalized/submitted evidence only.

## Audit Events

Audit logs are required for:

- Sensitive reads
- Sensitive writes
- Approval, rejection, finalization, publication, archive
- Permission changes
- Exports
- Administrative impersonation or support access

