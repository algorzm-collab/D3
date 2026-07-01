# D3HR Development Constitution

## Repository Role

GitHub is the configuration-management, version-control, release, archive, and institutional-memory system for D3HR.

GitHub is operated through issues, branches, pull requests, reviews, checks, tags, releases, projects, and ADRs. See `docs/05_sop/GITHUB_OPERATING_MODEL.md`.

## Development Ratio

Development and documentation have equal weight.

```text
1 feature = implementation + module docs + policy impact + tests
1 API = spec + permission rule + audit-log rule + tests
1 DB table = data model doc + sensitivity + lifecycle
1 major decision = ADR
```

## Hierarchy

```text
Constitution -> Module -> Policy -> Guideline -> Procedure -> Autonomy
```

Lower levels cannot override higher levels.

## Completion Definition

A change is not complete until:

- implementation exists,
- documentation is updated,
- policy impact is reviewed,
- audit impact is reviewed,
- tests or acceptance checks exist,
- release or decision notes are updated when relevant.
- GitHub issue and PR gates are satisfied when the work is tracked there.

## Recovery Protocol

When context is lost or implementation breaks:

1. Read product constitution.
2. Read development constitution.
3. Read current module charter.
4. Read module policy and data model.
5. Read relevant ADRs.
6. Read latest release notes.
7. Run available tests.
8. Continue from documented state.
