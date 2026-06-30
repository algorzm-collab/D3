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

## Read Team Check-Ins

```text
GET /api/v1/work-okr/daily-checkins?scope=team
```

Required policy:

- manager role
- organization scope match

Audit:

- read_sensitive when evidence sensitivity is sensitive or higher

