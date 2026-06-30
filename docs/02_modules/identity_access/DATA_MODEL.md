# Data Model: Identity & Access

## Tables

- tenants
- users
- organizations
- organization_memberships
- roles
- permissions
- role_assignments
- access_policies
- delegations
- workflow_states
- workflow_transitions
- audit_logs

## Required Columns

All tenant-scoped tables require:

- id
- tenant_id
- created_at
- updated_at

Sensitive mutable tables require:

- created_by
- updated_by
- version or revision marker where applicable

