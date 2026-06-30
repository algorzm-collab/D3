# System Architecture

## Architectural Position

D3HR sits above legacy ERP/HCM as a Job Intelligence Layer.

```text
Legacy ERP/HCM -> personnel ledger
D3HR -> job, evidence, career, and public-HR decision engine
External community -> separated public-institution professional network
```

## Core Services

- AuthService
- PolicyService
- AuditService
- OrganizationService
- JobDBService
- WorkflowService
- CheckinService
- EvidenceService
- CareerService
- RecommendationService
- BenchmarkService
- ReportService
- AdminService

## Guardrail

Every sensitive request must pass through policy evaluation before data access or mutation.

