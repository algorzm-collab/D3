# ADR-0007: Decompose KORAD General Job Descriptions as Structured JobDB Seed

## Status

Accepted

## Context

The KORAD 2024 general job-description PDF contains 224 pages and 35 general job descriptions. Unlike the previous executive job registry seed, this source contains full job-description bodies: job information, definition, mission, task table, competencies, education, certificates, fit flags, career path, and KPI.

D3HR needs job-description inputs to become living tenant HR data, not static attachments. This does not mean a real institution's content becomes D3HR product content.

## Decision

D3HR will ingest this source as `structured_job_descriptions` seed data and preserve both:

- raw source sections for evidence and future parser improvement
- mapped JobDB field values for versioned product use

The KORAD source is classified as `reference_sample` with usage boundary `schema_parser_validation_not_product_content`. It must not ship as default D3HR content or sales-demo content except as anonymized pattern or explicitly approved reference.

The extractor will map the source into fields including `job_series`, `base_date`, `job_mission`, `task_importance`, `task_difficulty`, `job_size`, `job_fit_flags`, `prior_job`, `next_job`, and `performance_management_item`.

## Consequences

- The JobDB field catalog and foundation migration must include the newly proven fields.
- Parser output becomes a contract-tested artifact, not a disposable analysis file.
- Seed boundary metadata becomes mandatory for institution/reference inputs.
- Future parser iterations should split tasks, competencies, courses, certificates, career links, and KPI rows atomically.
- Legacy ERP displacement becomes more defensible because D3HR owns the decision layer across work, performance, career, learning, and workforce planning.
