# Release and Archive SOP

## Purpose

Releases are D3HR recovery points. Tags and release notes must make it possible to understand what changed, why it changed, and which documents define the current truth.

## Release Types

| Type | Example | Rule |
|---|---|---|
| Foundation tag | `v0.0-foundation` | Constitution, architecture, and guardrails are stable enough to recover from. |
| Module milestone | `v0.1-jobdb-ingestion` | A module has docs, contracts, seed/data rules, and tests. |
| Pilot release | `pilot-korad-parser-v1` | Tenant/reference sample capability is validated without making input product content. |
| Decision archive | ADR | A material direction is preserved even if not shipped. |

## Release Checklist

- Git working tree is clean.
- Tests pass.
- Required docs pass `check:docs`.
- ADRs are linked.
- Data boundary is clear.
- Known risks are written.
- Tag is created.

## Archive Rule

Failed or abandoned work is not deleted from institutional memory. It must be archived with:

- what was attempted
- why it failed or stopped
- which assumption changed
- whether the idea is rejected, deferred, or replaced

## Recovery Rule

When context is lost:

1. Read latest release note or tag.
2. Read constitutions.
3. Read relevant module docs.
4. Read ADRs after the release tag.
5. Run tests.
6. Continue only from documented state.
