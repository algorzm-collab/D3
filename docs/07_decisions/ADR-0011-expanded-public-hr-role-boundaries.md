# ADR-0011: Expand Public-HR Role Boundaries Before UI Growth

## Status

Accepted

## Context

D3HR has many high-risk personas: author/employee, manager, evaluator, HR, consultant, external evaluator, management evaluation group, institution head, system operator, and developer operator.

If UI and workflow are built before role boundaries are explicit, access control will become ad hoc and unsafe.

## Decision

D3HR will expand the foundation policy model before adding more UI workflows.

The policy layer now distinguishes:

- evaluator review access
- external evaluator final-pack access
- institution head aggregate access
- management evaluation group aggregate export/read
- consultant project-scoped read
- developer operator technical metadata support only

## Consequences

- Sensitive HR content remains denied by default.
- External roles see final/aggregate/project-scoped evidence, not raw drafts.
- Developer/operator support is separated from HR content access.
- Access tests must grow with every sensitive workflow.
