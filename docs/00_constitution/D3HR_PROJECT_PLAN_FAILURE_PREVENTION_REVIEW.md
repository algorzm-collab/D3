# D3HR Project Plan Failure-Prevention Review

## Review Premise

D3HR is a large project. Failure will not come from lack of ideas. Failure will come from blurred boundaries, forgotten decisions, uncontrolled scope, weak permission design, and treating reference inputs as product content.

This review re-checks the plan against the development constitution, data boundary model, JobDB design, persona hooks, and GitHub operating model.

## Current Plan Diagnosis

| Area | Current Strength | Failure Risk | Required Control |
|---|---|---|---|
| Product identity | Public HR Evidence OS is clear | Drifting into generic HR SaaS or ERP replacement | Constitution gate in every PR |
| JobDB | Strong source-to-field architecture | Job description becomes static document storage | JobDB decomposition playbook and field contract tests |
| Daily use | Persona home and check-in loop started | DAU features become entertainment disconnected from HR evidence | DAU loops must emit evidence/metric events |
| Permission | RBAC/ABAC/workflow model started | Persona complexity grows faster than tests | Access matrix and API guardrail tests |
| Institution data | Boundary now defined | Sample/reference data becomes product content | Seed boundary contract tests |
| GitHub memory | Git initialized and commits exist | GitHub becomes archive only, not operating system | Issue/PR/release templates and operating model |
| Documentation | Docs and code are linked | Docs rot after implementation | Docs check and Definition of Done |
| Sales strategy | Multi-institution SaaS direction is clear | Over-customizing for one institution | Tenant configuration, no tenant-specific branches |

## Failure Modes Still Most Dangerous

### 1. Sample Data Becomes Product Content

Risk: KORAD or any future institution input is accidentally used as demo/default content.

Control:

- `contentClass`
- `usageBoundary`
- `tenantScopeRule`
- `salesUseRule`
- `productContentRule`
- seed-boundary contract tests

### 2. JobDB Is Too Shallow

Risk: the system stores a job description but cannot drive placement, workload, competency, learning, or performance.

Control:

- Job Description Decomposition Playbook
- field catalog
- source-to-timeseries architecture
- parser versioning
- atomic task/competency/KPI parser roadmap

### 3. Persona Permissions Become Unmanageable

Risk: author, manager, evaluator, HR, consultant, external evaluator, agency head, and operator permissions become ad hoc.

Control:

- all sensitive API paths use PolicyService
- every role action must declare resource, tenant, org scope, sensitivity, workflow state, and audit rule
- access tests must grow before UI expansion

### 4. DAU Loop Disconnects From Evidence

Risk: community or daily progress features raise traffic but do not strengthen HR decision data.

Control:

- every DAU feature must connect to JobDB, performance evidence, career graph, learning, benchmark, or workforce planning
- metric events must include persona, tenant, source, and downstream use

### 5. GitHub Is Used After The Fact

Risk: decisions happen in conversation and only code is committed.

Control:

- issue before feature
- ADR before major direction change
- PR template requires document links
- release tags for milestones
- abandoned ideas archived as learning

### 6. Tenant Customization Becomes Forked Product

Risk: each institution gets custom branches, breaking SaaS scalability.

Control:

- no tenant-specific code branches
- institution differences must be modeled as tenant configuration, workflow configuration, or input data
- custom behavior requires product-level abstraction or explicit rejection

## GitHub-Aligned Development Philosophy

D3HR uses GitHub not merely as source control, but as a governance machine.

| GitHub Practice | D3HR Translation |
|---|---|
| Issue | Product-risk and module-scoped work item |
| Branch | Isolated experiment or implementation unit |
| Pull Request | Constitution, policy, data, doc, and test review gate |
| Review | Anti-drift checkpoint |
| Status Check | Automated memory that blocks forgotten rules |
| Tag/Release | Stable milestone and recovery point |
| Project Board | Executive operating dashboard for build progress |
| ADR | Decision archive for why the plan changed |

## Product Plan Verdict

The product direction is strong if D3HR remains:

- job-centered
- evidence-centered
- tenant-isolated
- permission-first
- document-synchronized
- source/version/time-series based
- configured per institution, not forked per institution

The plan becomes weak if it turns into:

- ERP replacement first
- dashboard without evidence engine
- generic HR suite
- community-first platform
- customer-content library
- AI evaluator
- consulting project per institution

## Mandatory Next Controls

1. Add GitHub issue and PR templates.
2. Add release/milestone SOP.
3. Add ADR for GitHub as operating model.
4. Add tests that ensure required governance docs exist.
5. Before adding any new module, require module charter, data model, policy impact, API/UI spec, and tests.

