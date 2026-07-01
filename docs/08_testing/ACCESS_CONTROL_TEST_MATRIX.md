# Access Control Test Matrix

## Purpose

Prevent public-HR access-control failures before implementation drifts.

## Dimensions

Every sensitive feature must be tested across:

- Role
- Organization scope
- Data sensitivity
- Workflow state
- Cycle
- Delegation
- Tenant boundary

## MVP Role Matrix

| Scenario | Employee | Manager | HR | Institution Head | Consultant | System Operator |
|---|---:|---:|---:|---:|---:|---:|
| Read own daily check-in | Allow | Deny | Deny | Deny | Deny | Deny |
| Edit own draft check-in | Allow | Deny | Deny | Deny | Deny | Deny |
| Read team submitted evidence | Deny | Allow if org-scoped | Allow | Aggregate only | Project-scoped | Deny by default |
| Approve job description | Deny | Review only if assigned | Allow | Read final/aggregate | Comment if project-scoped | Deny |
| Finalize job description | Deny | Deny | Allow | Deny | Deny | Deny |
| Read audit logs | Deny | Limited | Allow | Limited summary | Deny | Technical metadata only |
| Export Evidence Pack | Deny | Deny | Allow | Allow final package | Project-scoped if authorized | Deny |
| Change roles | Deny | Deny | Allow if policy permits | Read approval only | Deny | Operate workflow, no HR content |

## Required Negative Tests

- User cannot access another tenant.
- Manager cannot access outside org scope.
- Consultant cannot access outside project scope.
- Institution head cannot browse raw sensitive personal records by default.
- System operator cannot silently view HR content.
- Developer operator cannot read HR content by default.
- Draft records are not visible to external evaluators.
- External evaluators can read/export finalized evidence packages only.
- Management evaluation group can read/export finalized aggregate packs only.
- Evaluators can review submitted/reviewing evidence, not arbitrary raw HR records.
- Finalized records cannot be silently overwritten.

## Expanded Role Matrix

| Scenario | Evaluator | External Evaluator | Mgmt Evaluation Group | Institution Head | Consultant | Developer Operator |
|---|---:|---:|---:|---:|---:|---:|
| Review submitted evaluation evidence | Allow | Deny | Deny | Deny | Deny | Deny |
| Read finalized evidence pack | Deny by default | Allow | Deny unless aggregate pack | Aggregate only | Project-scoped | Deny |
| Export finalized management-evaluation pack | Deny | Allow if final pack | Allow if aggregate | Deny by default | Deny | Deny |
| Read draft HR content | Deny | Deny | Deny | Deny | Deny | Deny |
| Read sensitive personal HR content | Deny by default | Deny | Deny | Deny | Deny | Deny |
| Support technical metadata | Deny | Deny | Deny | Deny | Deny | Allow |

## Required Audit Tests

Verify audit log exists for:

- Sensitive record read
- Sensitive record update
- Approval
- Return/rejection
- Finalization
- Export
- Permission change
