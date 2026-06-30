# Data Linkage Architecture

## Purpose

Define how D3HR links daily user behavior to backend HR evidence.

## Core Graph

```text
Tenant
-> Organization
-> User
-> Job
-> JobVersion
-> Task
-> Competency
-> DailyCheckin
-> WorkEvidence
-> Feedback
-> PerformanceEvidence
-> CareerSignal
-> LearningRecommendation
-> EvidencePack
```

## Linkage Principles

- Every daily check-in should link to at least one goal, task, or job area when possible.
- Evidence should preserve source, owner, sensitivity, workflow state, and audit trail.
- Career progress should be derived from evidence, task exposure, competency signals, and learning history.
- Evidence Pack metrics should be derived from operating data, not manually reentered.
- Benchmark and community data must not expose sensitive internal HR data.

## Backend Data Contracts

### Daily Check-In To Evidence

```text
daily_checkins.id
-> work_evidences.daily_checkin_id
```

### Evidence To Job/Task

Planned:

```text
work_evidence_task_links
  evidence_id
  task_id
  confidence
  source
```

### Task To Competency

Planned:

```text
task_competency_links
  task_id
  competency_id
  required_level
```

### Competency To Career

Planned:

```text
career_signals
  user_id
  competency_id
  signal_type
  signal_source
  confidence
```

### Evidence Pack

Planned:

```text
evidence_pack_items
  evidence_pack_id
  source_resource_type
  source_resource_id
  evidence_category
  included_by
```

## Query Patterns

### Employee Home

Needs:

- today goals
- latest check-in
- evidence count
- feedback count
- career progress summary

### Manager Home

Needs:

- scoped team check-ins
- blockers
- evidence gaps
- feedback queue
- workload signals

### HR Home

Needs:

- JobDB completeness
- approval queues
- evidence readiness
- audit exceptions
- Evidence Pack readiness

### Institution Head Home

Needs:

- aggregate HR risk briefing
- transition indicators
- high-level workforce risk
- no default raw sensitive record browsing

