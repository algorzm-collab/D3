# Interaction-Based Development Plan

## Purpose

D3HR is being shaped through active founder-CTO interaction. The interaction itself is valuable, but it is unsafe unless each decision is converted into durable artifacts.

This plan turns conversation into GitHub-traceable development.

## Interaction Loop

```text
Founder signal
-> CTO interpretation
-> failure-prevention check
-> GitHub issue or ADR
-> spec/doc update
-> implementation
-> test
-> commit/PR
-> release or archive
-> next founder signal
```

## Interaction Types

| Signal Type | Example | Required Artifact |
|---|---|---|
| Product philosophy | "This must be public-sector HR evidence OS" | Constitution or ADR |
| Boundary correction | "KORAD is sample, not content" | Data-boundary doc and test |
| New module idea | Career graph, benchmark, community | Module charter and issue |
| Persona concern | HR, manager, evaluator, consultant, agency head | Persona spec and access policy impact |
| Data source | NCS, job description, ERP, survey | Source classification and ingestion spec |
| Failure anxiety | "We tried 10 times and failed" | Premortem, stop-work trigger, SOP |
| Commercial hook | Multi-institution subscription, MAU | GTM hypothesis and product metric |

## Planning Cadence

### Daily Build Loop

- Review latest founder signal.
- Check constitution and do-not-build list.
- Convert signal into issue/ADR/doc.
- Implement one bounded slice.
- Run tests.
- Commit with clear message.

### Weekly Governance Loop

- Review open issues by module.
- Close or archive stale direction.
- Check data-boundary violations.
- Check access-control test coverage.
- Update roadmap and milestone status.

### Milestone Loop

- Define milestone exit criteria.
- Tag stable recovery point.
- Write release/decision note.
- Archive rejected or deferred scope.

## Founder-CTO Interaction Contract

The founder may speak in vision, anxiety, correction, examples, or sales pressure. The CTO must translate that into:

- exact product rule
- module impact
- data impact
- permission impact
- documentation impact
- test or acceptance gate
- GitHub trace

## Current Development Plan

| Phase | Goal | GitHub Exit Gate |
|---|---|---|
| M0 Foundation | Constitution, data boundary, access guardrails, GitHub operating model | docs/test pass, recovery tag |
| M1 JobDB Ingestion | Multi-source job-description ingestion and versioned field mapping | source parser tests, field contract tests |
| M2 Atomic Job Rows | Split tasks, competencies, education, certificates, career links, KPIs | atomic parser tests, source lineage |
| M3 Daily Evidence Loop | Employee/manager/HR daily use that emits evidence | persona metric tests, audit rules |
| M4 Career Graph | Prior/next job, competency gaps, learning recommendations | graph data model, policy tests |
| M5 Benchmark and Sales Demo | Generic dummy demo plus safe aggregate benchmark | no raw institution content, demo fixture tests |
| M6 Admin and Tenant Config | Tenant settings, roles, workflows, data quality | admin policy tests, config docs |

## Stop Conditions

Stop and create a failure-prevention issue if:

- user correction reveals an untracked principle
- a real institution input is used as product/default demo content
- a feature has no module owner
- a sensitive flow lacks policy/audit test
- a PR cannot explain data class and downstream evidence use
- implementation outruns documentation

## Next Three Build Slices

1. JobDB atomic task parser for task, importance, difficulty, and JOB-SIZE.
2. Permission matrix expansion for author, manager, evaluator, HR, consultant, external evaluator, agency head, and operator.
3. Generic dummy demo dataset separated from KORAD/reference samples.

