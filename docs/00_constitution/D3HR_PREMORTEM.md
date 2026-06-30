# D3HR Premortem

## Assumption

Six months from now, D3HR failed again.

This document lists the most likely reasons and the controls that prevent recurrence.

## Failure 1: GitHub Becomes Only A Code Storage

### Symptoms

- Features start without issues.
- Decisions change without ADRs.
- PRs merge without documentation.
- Releases are not tagged.
- Failed ideas disappear instead of being archived.

### Controls

- All features start as issues.
- Material decisions require ADR.
- PR template requires documentation gate.
- Releases require tags.
- Abandoned ideas move to archive.

## Failure 2: Constitution Is Not Used

### Symptoms

- New features are not assigned to modules.
- Product drifts into ERP, generic HR, or community-first scope.
- Developers skip the SOP.

### Controls

- Every issue must identify a module.
- Every PR must pass Constitution Gate.
- A feature with no module owner is rejected.

## Failure 3: MVP Expands

### Symptoms

- Payroll, full ERP replacement, compensation, AI scoring, or full community enter MVP.

### Controls

- `D3HR_MVP_SCOPE.md` is the authority.
- `D3HR_DO_NOT_BUILD.md` blocks scope creep.
- Scope changes require ADR.

## Failure 4: Access Control Is Added Later

### Symptoms

- Managers can see too much.
- HR can silently modify finalized records.
- Developers can inspect production HR content.
- Audit logs are missing.

### Controls

- Sensitive APIs require PolicyService.
- Access tests cover role, org scope, sensitivity, workflow state, cycle, and delegation.
- Audit logs are required for sensitive access and mutation.

## Failure 5: Database Is Screen-Centered

### Symptoms

- Job descriptions become opaque JSON blobs.
- NCS source mapping is lost.
- Versions are overwritten.
- Recommendations store scores without reasons.

### Controls

- Data model docs precede implementation.
- Job descriptions are versioned.
- Recommendations store reasons and evidence references.

## Failure 6: Documentation And Code Split

### Symptoms

- Code exists without docs.
- Docs describe behavior that code does not implement.
- DB migrations do not update data docs.

### Controls

- Development/documentation ratio is 1:1.
- PRs require documentation updates or explicit reason.
- Docs check workflow verifies required governance docs.

## Failure 7: NCS-to-JobDB Weakens

### Symptoms

- NCS remains an uploaded reference file.
- JobDB does not connect to task, competency, performance, education, or career.

### Controls

- NCS mapping is a core MVP item.
- JobDB owns source mapping and versioning.
- Local modifications must be distinguished from NCS-derived content.

## Failure 8: MAU Features Disconnect From HR Evidence

### Symptoms

- Community grows but does not produce job, performance, or career data.
- Anonymous posting becomes the product identity.

### Controls

- Community remains job/career/public-HR focused.
- Community data is separated from internal HR data.
- MAU loops connect to evidence, JobDB, career, or benchmarking.

## Failure 9: AI Reduces Trust

### Symptoms

- AI assigns evaluation scores.
- AI labels poor performers.
- Recommendations lack explanations.

### Controls

- AI may recommend; humans and policy decide.
- AI recommendations require source, input, reason, and audit trace.

## Failure 10: Admin Is Delayed

### Symptoms

- Operators modify DB directly.
- Tenant settings require code changes.
- Role and workflow changes are manual.

### Controls

- Basic admin is part of MVP.
- Tenant, user, role, workflow, feature flags, audit viewer, and data quality are admin-owned.

## Stop-Work Triggers

Development must stop for correction if:

- Sensitive data feature lacks access policy.
- DB change lacks data model documentation.
- Major direction change lacks ADR.
- MVP scope breach happens twice in parallel.
- Tenant-specific code branch appears.
- AI behaves as final evaluator or final placement authority.

