# Persona Hooking Strategy

## Purpose

Keep D3HR from becoming a backend-only HR system.

Every persona must have a reason to open D3HR repeatedly, and every repeated use must create structured HR evidence.

## Product Rule

```text
Daily user value -> data capture -> HR evidence -> better recommendation/report -> stronger user value
```

If a feature does not strengthen this loop, it is not MVP-critical.

## Persona Summary

| Persona | Daily/Periodic Hook | Mission | Data Created | Organizational Value |
|---|---|---|---|---|
| Employee | Today goals, 3-line check-in, career progress | Turn daily work into recognized evidence and career growth | check-ins, evidence, blockers, career signals | Performance evidence, workload visibility, career data |
| Manager | Team progress, blockers, evidence gaps | Operate team with evidence and timely feedback | feedback, review state, workload signals | Better evaluation, lower unmanaged risk |
| HR | JobDB quality, approval queue, evidence readiness | Govern job-centered HR transition | job versions, policies, evidence packs | Management evaluation and audit readiness |
| Institution Head | HR risk briefing | See people, performance, and workforce risks early | briefing decisions, risk reviews | Strategic workforce governance |
| Consultant | NCS mapping, job quality diagnostics | Convert consulting outputs into operating system | diagnosis, mapping, review comments | Faster implementation, reusable methods |
| External Evaluator | Finalized evidence review | Review trusted submitted materials | review notes, evidence access logs | Credible evaluation process |
| System Operator | Tenant health, data quality, audit status | Operate platform without HR-content overreach | system events, support metadata | SaaS reliability and trust |
| Veteran | Q&A, job wiki contribution, recognition | Turn expertise into institutional asset | answers, wiki edits, mentoring evidence | Knowledge transfer and job quality |

## Employee Hook

### Pain

- Work is forgotten by evaluation season.
- Career path is unclear.
- Good work is invisible.
- Rotation can feel accidental.

### Hook

> Record daily work in under one minute and see it become performance evidence and career progress.

### Mission

- Know today's priority.
- Record three lines of work.
- Attach evidence.
- See career progress move.
- Receive feedback.

### Backend Data Linkage

```text
daily_checkins
-> work_evidences
-> task/job mappings
-> competency usage
-> performance evidence
-> career progress
-> learning recommendations
```

## Manager Hook

### Pain

- Evaluation relies on memory.
- Team blockers appear too late.
- Workload imbalance is hard to prove.
- Low performance root cause is unclear.

### Hook

> See team progress, blockers, evidence gaps, and risk signals before evaluation season.

### Mission

- Review team submitted check-ins.
- Respond to blockers.
- Give evidence-based feedback.
- Identify workload or job-fit risks.

### Backend Data Linkage

```text
team check-ins
-> blockers/support requests
-> manager feedback
-> workload signals
-> performance evidence completeness
-> placement/career risk indicators
```

## HR Hook

### Pain

- Job descriptions are static documents.
- NCS is too large to operationalize.
- Evidence for job-centered HR is scattered.
- Management evaluation preparation is manual.

### Hook

> Govern JobDB, evidence readiness, access policy, and Evidence Pack generation from one control center.

### Mission

- Convert NCS into JobDB.
- Approve job-description versions.
- Monitor evidence completeness.
- Maintain policy and workflow integrity.
- Produce Evidence Packs.

### Backend Data Linkage

```text
ncs_units
-> jobs/job_versions
-> tasks/competencies
-> daily evidence
-> evaluation readiness
-> evidence packs
```

## Institution Head Hook

### Pain

- HR risks surface after they become political or operational problems.
- Workforce and performance risk is fragmented.
- Public management evaluation requires credible evidence.

### Hook

> Receive an aggregate HR risk briefing based on live job, evidence, workload, and career data.

### Mission

- Review risk briefing.
- Track job-centered HR transition.
- Identify workforce and performance bottlenecks.
- Sponsor corrective action.

### Backend Data Linkage

```text
aggregate evidence completeness
-> workload imbalance
-> job-fit risk
-> high performer retention signals
-> low-performance root-cause distribution
-> management briefing
```

## Consultant Hook

### Pain

- Consulting outputs die as PPT/PDF.
- Job analysis projects are hard to operationalize.
- Institution-specific data is hard to normalize.

### Hook

> Use D3HR to diagnose, design, review, and leave behind an operating JobDB.

### Mission

- Map NCS to institution jobs.
- Review job-description quality.
- Propose workflow and policy changes.
- Deliver reusable evidence assets.

## Veteran Hook

### Pain

- Internal experts are invisible.
- Expertise is not captured as institutional data.
- Newcomers and rotated employees repeat the same questions.

### Hook

> Become recognized as a job specialist through Q&A, wiki contribution, mentoring, and best-practice curation.

### Backend Data Linkage

```text
veteran answers
-> job wiki improvements
-> accepted best practices
-> mentoring records
-> expertise profile
-> learning/career graph
```

