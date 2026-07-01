# D3HR GitHub Constitution

## Purpose

GitHub is the external memory and governance system for D3HR. It prevents lost context, uncontrolled scope, undocumented decisions, weak reviews, and institution-specific drift.

This constitution sits under the Product and Development Constitutions, and above operating SOPs.

```text
Product Constitution
-> Development Constitution
-> GitHub Constitution
-> GitHub Operating Model
-> Feature / Release / Documentation SOPs
-> Team autonomy
```

## Constitutional Rules

### 1. Work Must Be Traceable

Every meaningful change must be traceable to one of:

- GitHub issue
- ADR
- release milestone
- recovery/failure-prevention review
- user-approved emergency fix

### 2. Conversation Must Become Artifact

Important discussion cannot remain only in chat. It must become:

- issue
- spec
- policy
- ADR
- test
- release note
- archived decision

### 3. PR Is The Governance Gate

Pull requests are not only code review. A PR is the gate for:

- product constitution
- MVP scope
- data boundary
- access policy
- auditability
- documentation
- tests
- release or ADR impact

### 4. Branches Are Temporary

Branches isolate work. They do not create product variants.

Tenant-specific branches are prohibited. Institution differences must be configuration, input data, workflow settings, or rejected customization.

### 5. Tags Are Recovery Points

Important milestones must be tagged. A tag means the project can recover from that documented state.

### 6. Issues Are Planning Units

Issues carry the interactive plan:

- who is affected
- what problem is solved
- which module owns it
- which data class is touched
- what policy changes
- what documentation and tests prove completion

### 7. ADRs Preserve Direction

If a decision changes architecture, product identity, permission model, data boundary, module ownership, or commercial strategy, it requires an ADR.

## Required GitHub Objects

| Object | D3HR Meaning |
|---|---|
| Issue | Work request, risk, bug, research, or design decision candidate |
| Branch | Temporary implementation lane |
| Pull Request | Governance and merge gate |
| Review | Anti-drift check |
| Check | Automated memory |
| Project | Operating dashboard |
| Milestone | Product progress boundary |
| Tag/Release | Recovery point |
| ADR | Decision archive |

## Non-Negotiables

- No major work without traceability.
- No institution input without data-boundary classification.
- No sensitive feature without policy and audit review.
- No merge without documentation and test decision.
- No tenant-specific product fork.
- No overwritten history for job descriptions or source-derived field values.

