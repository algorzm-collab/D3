# GPT To Antigravity Working Model

## Purpose

GPT should set direction, decide product principles, review risks, and define bounded tasks.

Antigravity should implement those bounded tasks, run tests, and preserve working state.

This split exists because active GPT usage is limited and should be spent on judgment, not routine implementation.

## Role Split

| Role | Primary Work | Must Produce |
|---|---|---|
| GPT / ChatGPT CTO | Direction, prioritization, product judgment, premortem, review | issue, ADR, spec, acceptance criteria |
| Antigravity | Implementation, local execution, tests, commits | code, docs, tests, commit summary |
| GitHub | External memory and evidence trail | issues, PRs, comments, releases |
| Local repo | Working implementation state | commits, tests, handoff docs |

## Operating Rule

GPT should not spend context on broad implementation when Antigravity can execute it.

GPT should instead hand Antigravity:

- exact objective
- files to inspect
- files not to touch
- expected tests
- expected commit/report format
- stop conditions

## Current Handoff Position

Current state is implementation-ready for Antigravity.

Read in order:

1. `docs/09_operations/ANTIGRAVITY_HANDOFF_STATUS.md`
2. `docs/05_sop/INTERACTION_BASED_DEVELOPMENT_PLAN.md`
3. `docs/00_constitution/D3HR_PRODUCT_CONSTITUTION.md`
4. `docs/00_constitution/D3HR_DEVELOPMENT_CONSTITUTION.md`
5. `docs/03_architecture/DATA_BOUNDARY_AND_INPUT_CLASSIFICATION.md`

Then run:

```text
npm.cmd test
```

## Next Antigravity Task

Build a read-only benchmark/dashboard prototype backed only by:

- `packages/database/dummy/generic_public_hr_demo.dataset.json`
- `packages/database/dummy/generic_benchmark_snapshot.dataset.json`

Do not use:

- KORAD seed data
- real institution input
- new libraries
- DB/schema/auth/payment changes

## Expected Output

Antigravity should report:

- changed files
- what was implemented
- test results
- remaining uncertainty

## July 7 Review Checkpoints

On July 7, GPT should review:

1. Did Antigravity only use generic dummy/demo fixtures?
2. Did any real institution/reference sample leak into demo UI?
3. Are tests still passing?
4. Is the next slice still M5 dashboard, or should M6 admin/config start?
5. Are new decisions recorded as ADRs?

## Stop Conditions

Stop Antigravity work and return to GPT if:

- product direction changes
- sample/reference data boundary is unclear
- new role/permission behavior is needed
- DB/schema/auth/payment change seems necessary
- implementation requires a new library
