# Audit Log Spec

## Purpose

Make sensitive HR access and decisions explainable, auditable, and recoverable.

## Required Fields

- id
- tenant_id
- actor_user_id
- actor_role
- action
- resource_type
- resource_id
- workflow_state_before
- workflow_state_after
- org_scope
- sensitivity_level
- policy_decision_id
- reason_code
- ip_address
- user_agent
- created_at

## Sensitive Actions

- read_sensitive
- create
- update
- submit
- approve
- return
- finalize
- publish
- archive
- export
- role_assign
- policy_change
- support_access

## Rule

If an action can affect evaluation, placement, career, job description, external reporting, or sensitive HR content, it must be auditable.

