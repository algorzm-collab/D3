# API Spec: Work & OKR

## Create Daily Check-In

```text
POST /api/v1/work-okr/daily-checkins
```

Required policy:

- employee self create
- tenant match

Audit:

- create event if sensitivity is restricted or higher

Implementation:

- `apps/api/src/routes/work-okr.mjs#createDailyCheckin`
- must use guarded handler
- must persist through check-in repository

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
