# ADR-0007: Decompose KORAD General Job Descriptions as Structured JobDB Seed

## Status

Accepted

## Context

The KORAD 2024 general job-description PDF contains 224 pages and 35 general job descriptions. Unlike the previous executive job registry seed, this source contains full job-description bodies: job information, definition, mission, task table, competencies, education, certificates, fit flags, career path, and KPI.

D3HR needs job descriptions to become living HR data, not static attachments.

## Decision

D3HR will ingest this source as `structured_job_descriptions` seed data and preserve both:

- raw source sections for evidence and future parser improvement
- mapped JobDB field values for versioned product use

The extractor will map the source into fields including `job_series`, `base_date`, `job_mission`, `task_importance`, `task_difficulty`, `job_size`, `job_fit_flags`, `prior_job`, `next_job`, and `performance_management_item`.

## Consequences

- The JobDB field catalog and foundation migration must include the newly proven fields.
- Parser output becomes a contract-tested artifact, not a disposable analysis file.
- Future parser iterations should split tasks, competencies, courses, certificates, career links, and KPI rows atomically.
- Legacy ERP displacement becomes more defensible because D3HR owns the decision layer across work, performance, career, learning, and workforce planning.
