# Repository Architecture

## Purpose

Keep D3HR organized as a monorepo with synchronized code, policy, documentation, and operations.

## Structure

```text
apps/
  web/
  admin/
  api/

packages/
  database/
  policy/
  audit/
  shared-types/
  ui/

docs/
  00_constitution/
  01_domain/
  02_modules/
  03_architecture/
  04_policies/
  05_sop/
  06_specs/
  07_decisions/
  08_testing/
  09_operations/
  10_release_notes/
  99_archive/
```

## Rules

- `apps/api` must depend on `packages/policy` and `packages/audit` for sensitive actions.
- `apps/web` and `apps/admin` must not invent domain terms outside shared docs/types.
- DB migrations must correspond to `DATA_MODEL` docs.
- New packages require ADR if they change architecture.

