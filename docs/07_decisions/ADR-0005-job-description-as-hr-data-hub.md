# ADR-0005: Job Description As HR Data Hub

## Status

Accepted

## Decision

D3HR treats Job Description as a structured HR data hub, not as a static document template.

The Job Description model must connect:

- strategic input,
- job core,
- requirements,
- job value and grade,
- performance management,
- competency diagnosis,
- compensation linkage,
- promotion linkage,
- workforce planning,
- mobility and career development,
- targeted talent type,
- recruitment linkage,
- retirement and succession linkage.

## Context

The uploaded HR architecture image shows that job data sits between strategic input, HR infra, HRM system, and workforce optimization.

If D3HR models job descriptions only as text documents, downstream modules such as performance, career, education, placement, workforce planning, benchmarking, and Evidence Pack will fail.

## Consequences

- JobDB must own a field catalog.
- Job versions must store structured element values.
- NCS-derived and institution-modified fields must be distinguishable.
- Compensation/recruitment/retirement fields are modeled as linkages but not implemented as MVP automation.
- Access policy and sensitivity must apply at field group level.
- Source documents and seed items remain first-class evidence and must not be overwritten after enrichment.
