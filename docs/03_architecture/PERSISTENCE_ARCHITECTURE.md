# Persistence Architecture

## Purpose

Keep API, policy, audit, and database layers separated so persistence can evolve without breaking HR guardrails.

## Flow

```text
HTTP route
-> request context
-> guarded handler
-> policy evaluation
-> audit event
-> repository call
-> persistence adapter
```

## Rules

- Routes do not own persistence state.
- Repositories include tenant scope in every read and write.
- Repositories return domain records, not raw HTTP responses.
- Policy evaluation happens before repository mutation.
- Sensitive reads must be auditable before or during repository access.
- In-memory repositories are allowed for tests and prototypes only.

## MVP Repositories

- checkinRepository
- auditRepository
- jobRepository
- userRepository
- organizationRepository

## Audit Persistence Rule

Guarded handlers must persist generated audit events before returning a response.

Denied sensitive requests are also auditable and must be persisted.
