# Job Description Decomposition Playbook

## Purpose

Job-description inputs are the seed data for an institution's D3HR tenant. They are not D3HR-owned product content. They must be decomposed deeply enough to support career management, workload analysis, competency diagnosis, performance evidence, learning recommendation, workforce planning, and benchmarking.

Product content is the schema, parser contract, workflow, permission model, UI, and recommendation logic. Institution content remains institution input unless explicitly converted into anonymized aggregate or approved reference material.

## Decomposition Ladder

| Level | Unit | Rule |
|---|---|---|
| 0 | Source document | Preserve file identity, institution, source type, extracted pages, checksum, and extraction date. |
| 1 | Job unit | Split each document into individual jobs with source order, raw title, normalized title, job series, and base date. |
| 2 | Section | Preserve every source section as raw text before normalization. |
| 3 | Field value | Map source sections into versioned JobDB fields. |
| 4 | Atomic row | Split tasks, competencies, courses, certificates, career links, and KPIs into rows. |
| 5 | Version event | Track first seen, changed, superseded, approved, rejected, and benchmarked states. |
| 6 | Decision output | Generate placement, career, learning, performance, workload, and workforce recommendations. |

## Public Institution Pattern

The KORAD 2024 general job-description source proves the minimum body pattern D3HR must support:

KORAD is a reference sample for schema and parser validation. It is not a built-in D3HR content library.

| Source Section | Atomic Targets |
|---|---|
| 직무정보 | job series, job title, base date |
| 직무정의 | job purpose |
| 직무미션 | mission statements |
| 과업(Task) 내용 | task group, sub-task, importance, difficulty, JOB-SIZE |
| 요구 직무역량 | common competency, technical competency, competency definition, competency element |
| 학력/이수과목 | required education level, course title, learning method |
| 권장 자격증 | certificate title, relevance level, issuer, note |
| 적합 직무 | wage-peak fit, open-job fit, specialist/veteran target |
| 직무 추천 경로 | prior job, next job, similarity strength |
| 직무 KPI | task, KPI name, metric definition, target or standard |

## Non-Negotiable Rules

- Raw extracted sections are never deleted after parsing.
- Real institution inputs are never shipped as default product content.
- Parser versions may add more atomic rows, but must not overwrite historical field values.
- Every field must carry source lineage and be eligible for tenant-level benchmarking.
- `JOB-SIZE`, importance, and difficulty are workforce-planning signals, not display-only text.
- `직무 KPI` is a bridge from JobDB to performance evidence and public-sector management evaluation.
- Career path links are graph data, not memo text.

## Atomic Task Parser v1

`task_row_v1` extracts task rows from the `과업(Task) 내용` section.

| Field | Meaning |
|---|---|
| `order` | order inside the job task section |
| `taskGroup` | nearest task group inferred from preceding lines |
| `subTask` | atomic task statement |
| `importance` | source importance score |
| `difficulty` | source difficulty score |
| `jobSize` | source JOB-SIZE score |
| `sourceLine` | original extracted line |
| `parserVersion` | parser contract version |

Known v1 limitation: PDF table extraction can split task group labels across lines. `taskGroup` is therefore an inferred helper field, while `subTask`, `importance`, `difficulty`, `jobSize`, and `sourceLine` are the stronger contract fields.

Next parser versions should add source page, task group normalization, subtotal validation, and row-level confidence.

## Career Link Parser v1

`career_link_v1` extracts graph links from the `직무 추천 경로` section.

| Field | Meaning |
|---|---|
| `order` | order inside the parsed career-link list |
| `direction` | `prior` or `next` |
| `targetOrder` | target job order from source document |
| `targetTitle` | target job title text |
| `similarityMarker` | selected marker from the source row |
| `sourceLine` | original extracted line |
| `parserVersion` | parser contract version |

Known v1 limitation: the source table marks selection with `○`, but PDF extraction does not reliably preserve whether the marker belongs to `상` or `중`. v1 therefore captures selected links and preserves source lines; later versions should normalize similarity strength.

## DAU Hook

The daily user hook comes from making these fields useful to each persona:

- Employee: "What should I do today for my job mission and next career move?"
- Manager: "Which team tasks are overloaded or under-owned?"
- HR: "Which role, competency, and movement evidence supports placement?"
- Evaluator: "Which KPI evidence is traceable to the official job description?"
- Consultant: "Which institution has a stronger job architecture and why?"
