# ADR-0008: Use GitHub as Development Operating System

## Status

Accepted

## Context

D3HR has a high risk of failure through forgotten context, drifting product direction, unclear permission policy, uncontrolled tenant customization, and mixing product schema with institution-specific content.

Using GitHub only as a code repository is insufficient.

## Decision

D3HR will use GitHub as the development operating system:

- Issues define work and risk.
- Branches isolate focused changes.
- Pull requests enforce constitution, policy, data, documentation, and test gates.
- ADRs preserve material decisions.
- Tags and releases preserve recovery points.
- Project boards track progress by module and milestone.

## Consequences

- Every feature starts from a module-scoped issue.
- Every PR must answer the constitution gate and data-boundary questions.
- Documentation and tests are merge requirements.
- Tenant-specific behavior must be expressed as configuration or rejected.
- Releases and tags become part of the recovery protocol.
