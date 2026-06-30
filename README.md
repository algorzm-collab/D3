# D3HR

D3HR is a Public HR Evidence OS for Korean public institutions.

It turns daily work, performance evidence, competency data, NCS-based job descriptions, and career signals into auditable evidence for job-centered HR decisions.

## Product Constitution

D3HR exists to answer one operational question:

> Why is this person assigned to this job, what evidence supports their performance, and how should they be developed, evaluated, educated, and placed next?

## Repository Principle

This repository is not only a codebase. It is the configuration-management and institutional-memory system for D3HR.

Every product change must keep code and documentation synchronized.

```text
Idea -> Issue
Decision -> ADR
Policy -> docs/04_policies
Procedure -> docs/05_sop
Implementation -> Pull Request
Release -> Tag + Release Note
Archive -> docs/99_archive
```

## Current Target

`v0.0-foundation`

- Product constitution
- Development constitution
- Domain glossary
- Module charters
- Access policy foundation
- Documentation SOP
- GitHub issue/PR governance

## MVP Scope

- NCS-to-JobDB
- Job description wiki and versioning
- Identity, access, workflow state, and audit logging
- Daily 3-line check-in
- OKR and performance evidence linkage
- Career progress bar
- Manager feedback
- HR Evidence Dashboard
- Basic admin operations

## Non-Goals

- Full ERP replacement at the start
- AI-only evaluation scoring
- Automatic poor-performer labeling
- Unlimited tenant customization
- Anonymous community as the main product
- Undocumented APIs, screens, policies, or tables

