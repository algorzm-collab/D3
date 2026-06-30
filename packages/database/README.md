# Database Package

Owns schema and migrations.

## Rules

- Every tenant-scoped table includes `tenant_id`.
- Sensitive tables include auditability and lifecycle fields.
- Job descriptions are versioned.
- Policy data is configurable.
- Recommendations store evidence and reasons.

