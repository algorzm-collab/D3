# Data Boundary and Input Classification

## Purpose

D3HR must separate product design, demo dummy data, institution-specific inputs, and benchmark/reference samples. This is a sales, security, legal, and product-governance boundary.

No customer source document may become built-in product content.

## Data Classes

| Class | Meaning | Can Ship as Product Default | Tenant Scoped | Sales Use |
|---|---|---:|---:|---|
| `product_schema` | Tables, fields, policies, workflows, UI contracts, parser contracts | Yes | No | Yes |
| `generic_dummy` | Fictional demo data created by D3HR | Yes | Optional | Yes |
| `institution_input` | Materials received from a real institution | No | Yes | Only with permission and masking |
| `reference_sample` | Real institution input used internally to validate schema/parser fit | No | Yes or local-only | Only as anonymized pattern |
| `benchmark_aggregate` | Aggregated, de-identified metrics across tenants | Yes, if contract allows | No individual tenant exposure | Yes |
| `tenant_configuration` | Institution-specific fields, labels, workflows, thresholds | No global default | Yes | Demonstrate as configurable pattern |

## Non-Negotiable Boundary

- D3HR product content is schema, workflow, policy, recommendation logic, UI, and documentation.
- Customer/institution material is input evidence, not D3HR-owned content.
- Reference samples validate D3HR's ability to ingest many institutions; they do not define the universal product dataset.
- Demo environments must use `generic_dummy` data unless a customer explicitly authorizes use of its material.
- Cross-institution sales material must show patterns, statistics, and anonymized examples, not copied tenant content.

## Repository Placement Rule

| Artifact | Allowed Location | Required Metadata |
|---|---|---|
| Product schema/config | `packages`, `apps`, `docs`, migrations | version, owner, contract tests |
| Generic dummy data | `packages/database/dummy` or demo-specific fixture folders | `contentClass: generic_dummy` |
| Institution input seed | `packages/database/seeds` or ingestion workspace | `contentClass: institution_input` or `reference_sample` |
| Reference extraction script | `scripts/data` | source boundary note |
| Sales demo story | `docs/marketing` or future demo app fixture | must not include raw tenant content |

## Multi-Institution Sales Rule

D3HR must sell configurability, ingestion capability, and benchmark intelligence:

1. Show the universal schema and workflow.
2. Show generic dummy data for live demos.
3. Show institution-specific input only inside that institution's tenant.
4. Show cross-institution comparison only as aggregate or explicitly approved reference.
5. Show KORAD-like samples only as "validated source pattern", not as product library content.

## Engineering Enforcement

Every non-generic seed must declare:

- `contentClass`
- `usageBoundary`
- `tenantScopeRule`
- `salesUseRule`
- `productContentRule`

Tests must fail when reference/institution seeds omit these metadata fields.
