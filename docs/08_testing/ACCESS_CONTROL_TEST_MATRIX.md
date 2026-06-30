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
- Draft records are not visible to external evaluators.
- Finalized records cannot be silently overwritten.

## Required Audit Tests

Verify audit log exists for:

- Sensitive record read
- Sensitive record update
- Approval
- Return/rejection
- Finalization
- Export
- Permission change

