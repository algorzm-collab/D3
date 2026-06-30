# ADR-0006: Seed Data Versioning And Time-Series

## Status

Accepted

## Decision

D3HR treats source documents and extracted seed items as first-class data assets.

Seed items are preserved, enriched, linked, versioned, and time-series tracked. They are not overwritten or discarded when more detailed job descriptions are created.

## Context

The KORAD executive-job PDF contains a job list/table of contents rather than complete job descriptions.

This is still valuable because it establishes a job registry seed that can later be enriched with structured fields, NCS mappings, tasks, competencies, performance items, career paths, and workforce signals.

## Consequences

- `source_documents`, `source_seed_items`, and `job_seed_links` are foundation entities.
- Every extracted source fragment can become a seed item.
- Enrichment status is tracked over time.
- Job versions reference source seed evidence.
- D3HR can build historical job evolution, benchmarking, and Evidence Pack traceability.

