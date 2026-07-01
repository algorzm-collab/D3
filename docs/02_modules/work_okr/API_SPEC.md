# API Spec: Work & OKR

## Create Daily Check-In

```text
POST /api/v1/work-okr/daily-checkins
```

Required policy:

- employee self create
- tenant match

Accepted evidence linkage fields:

- `jobId`
- `jobVersionId`
- `atomicTaskId`
- `progressStatus`
- `evidenceItems[]`

Each `evidenceItems[]` entry may include:

- `title`
- `evidenceType`
- `externalRef`

Audit:

- create event if sensitivity is restricted or higher

Implementation:

- `apps/api/src/routes/work-okr.mjs#createDailyCheckin`
- must use guarded handler
- must persist through check-in repository
- must link to JobDB atomic task when `atomicTaskId` is provided
- must persist work evidence items through work-evidence repository

## Read Team Check-Ins

```text
GET /api/v1/work-okr/daily-checkins?scope=team
```

Required policy:

- manager role
- organization scope match

Audit:

- read_sensitive when evidence sensitivity is sensitive or higher

Implementation:

- `apps/api/src/routes/work-okr.mjs#readTeamCheckins`
- must use guarded handler
- must query through check-in repository with tenant and organization scope

## Evidence Loop Rule

Daily check-ins must not become a disconnected diary. When possible, a check-in should connect to:

```text
job -> job_version -> job_atomic_task -> daily_checkin -> work_evidence
```

This is the first DAU-to-HR-evidence loop:

- employee sees today's job-linked work
- manager sees team progress and blockers
- HR gets evidence for role clarity, placement, competency, and workload decisions
- evaluator sees traceable evidence only through approved/finalized packages
