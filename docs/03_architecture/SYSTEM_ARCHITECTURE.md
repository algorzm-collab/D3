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

## API Guarded Handler

The foundation API uses a guarded handler pattern:

```text
Request context -> Resource context -> Policy evaluation -> Audit event -> Handler execution
```

No route may directly execute sensitive data access or mutation without this pattern or an equivalent framework-level enforcement layer.
