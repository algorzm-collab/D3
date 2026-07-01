# Access Control Policy

D3HR uses RBAC + ABAC + workflow-state authorization.

## Dimensions

- Role
- Organization scope
- Data sensitivity
- Workflow state
- Evaluation or OKR cycle
- Delegation
- Tenant configuration

## MVP Roles

- Employee
- Manager
- HR
- Institution Head
- Consultant
- System Operator

## Phase 2 Roles

- Evaluator
- Senior Manager
- External Evaluator
- Management Evaluation Group
- Developer Operator
- Veteran
- Community Moderator

## Role Boundary Rules

| Role | Default Boundary | Explicit Allowance | Hard Stop |
|---|---|---|---|
| Employee / Author | own draft and own submitted work | create/read own daily check-in | cannot read other employees by default |
| Manager / Superior | org-scoped submitted team records | read team submitted evidence | cannot read outside org scope |
| Evaluator | submitted/reviewing evaluation evidence | review internal/restricted evidence | cannot read drafts outside assigned flow |
| HR | institutional HR workflow owner | finalize approved/reviewing records | cannot bypass audit on sensitive changes |
| Consultant | project-scoped finalized non-sensitive records | read authorized project material | cannot access sensitive personal HR content |
| External Evaluator | finalized/published evidence packages | read/export final evidence packages | cannot read drafts or raw sensitive records |
| Management Evaluation Group | aggregate finalized evaluation packs | read/export aggregate management-evaluation pack | cannot browse individual sensitive records |
| Institution Head | finalized aggregate institutional evidence | read aggregate final summaries | cannot browse raw sensitive personal records by default |
| System Operator | platform operation without HR content | technical operation metadata | cannot silently read HR content |
| Developer Operator | technical support metadata only | support_access on technical metadata | cannot read HR content by default |

## Policy Reason Codes

- `EVALUATOR_REVIEW_ALLOWED`
- `EXTERNAL_EVALUATOR_FINAL_PACK_ALLOWED`
- `INSTITUTION_HEAD_AGGREGATE_READ_ALLOWED`
- `MANAGEMENT_EVALUATION_GROUP_AGGREGATE_ALLOWED`
- `CONSULTANT_PROJECT_READ_ALLOWED`
- `DEVELOPER_OPERATOR_HR_CONTENT_DENIED`
- `DEVELOPER_OPERATOR_TECH_SUPPORT_ALLOWED`
