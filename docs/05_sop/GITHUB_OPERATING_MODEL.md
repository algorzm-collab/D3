# GitHub Operating Model

## Purpose

GitHub is D3HR's development memory, configuration-management layer, release archive, and failure-prevention control system.

D3HR follows a GitHub-flow style operating model: create a branch for a focused change, open a pull request, review code and documentation together, merge only after checks pass, then tag or release meaningful milestones.

References:

- GitHub Flow: https://docs.github.com/en/get-started/using-github/github-flow
- GitHub Issues: https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues
- GitHub Projects: https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects

## Operating Loop

```text
Idea or risk
-> GitHub Issue
-> Module owner and scope label
-> Branch
-> Implementation + docs + tests
-> Pull request
-> Constitution gate
-> Policy/data/audit review
-> Merge
-> Tag/release/archive
```

## Required Issue Fields

Every issue must identify:

- module
- persona
- problem statement
- data class: `product_schema`, `generic_dummy`, `institution_input`, `reference_sample`, `benchmark_aggregate`, or `tenant_configuration`
- policy impact
- data model impact
- audit impact
- documentation impact
- test or acceptance check

## Required Labels

| Label | Meaning |
|---|---|
| `module:jobdb` | Job Description and source mapping |
| `module:work-okr` | Daily work, goals, check-ins |
| `module:career` | Career graph, growth, placement |
| `module:policy` | access control, workflow, audit |
| `module:admin` | tenant, role, config, operations |
| `data:product-schema` | product-owned schema/config |
| `data:generic-dummy` | fictional demo data |
| `data:institution-input` | tenant-owned input |
| `data:reference-sample` | internal validation sample |
| `risk:security` | privacy, access, tenant isolation |
| `risk:scope-drift` | MVP or product identity drift |
| `docs-required` | documentation update required |
| `adr-required` | material decision requires ADR |

## Branch Rule

Use short scoped branches:

```text
feature/jobdb-atomic-task-parser
docs/github-operating-model
fix/policy-tenant-isolation
review/premortem-scope-gate
```

No long-lived tenant-specific branches are allowed.

## Pull Request Gate

A PR cannot merge unless it answers:

- Which constitution/module/policy does this change touch?
- Is the data product-owned, dummy, institution input, reference sample, aggregate, or tenant configuration?
- What permission and audit behavior changed?
- What documentation changed?
- What test proves the change?
- Does this require ADR or release note?

## Project Board Columns

Use the board as a control surface:

1. Intake
2. Triage
3. Spec Ready
4. Build
5. Review
6. Test/QA
7. Release Ready
8. Done
9. Archived/Learned

## Milestones

| Milestone | Exit Condition |
|---|---|
| `M0 Foundation` | constitution, access model, doc checks, seed boundary checks |
| `M1 JobDB Ingestion` | source document ingestion, field mapping, versioning |
| `M2 Daily Work Loop` | daily user value and evidence capture |
| `M3 Career Graph` | career path, skill gap, learning link |
| `M4 Public HR Benchmark` | safe aggregate benchmark and sales proof |

## Failure-Prevention Rules

- No issue means no feature.
- No documentation means no completion.
- No test means no merge.
- No ADR means no major direction change.
- No tenant boundary means no institution input.
- No release tag means no official milestone.
