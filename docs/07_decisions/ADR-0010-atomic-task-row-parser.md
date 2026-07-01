# ADR-0010: Parse Job Description Task Rows Into Atomic Workload Data

## Status

Accepted

## Context

D3HR must not stop at storing job-description sections. The `과업(Task) 내용` section contains the first measurable bridge from job description to workload survey, staffing model, AI impact analysis, performance evidence, and workforce planning.

The KORAD 2024 general job-description reference sample contains task rows with importance, difficulty, and JOB-SIZE values.

## Decision

D3HR will introduce `task_row_v1` as the first atomic task parser contract.

Each parsed task row includes:

- order
- task group
- sub-task
- importance
- difficulty
- jobSize
- sourceLine
- parserVersion

The foundation schema includes `job_atomic_tasks` so these rows can become versioned tenant data instead of parser-only JSON.

## Consequences

- KORAD general reference sample now produces 431 atomic task rows.
- Parser output is contract-tested.
- `taskGroup` is treated as inferred in v1 because PDF table extraction may split group labels.
- Future parser versions must add source page, row confidence, subtotal validation, and normalized task-group identifiers.
