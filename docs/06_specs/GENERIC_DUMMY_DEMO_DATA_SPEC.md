# Generic Dummy Demo Data Spec

## Purpose

D3HR sales demos must not use real institution input by default. Demo data must be fictional, clearly labeled, and safe to ship.

## Required Metadata

Every generic demo dataset must declare:

- `contentClass: generic_dummy`
- `usageBoundary`
- `productContentRule`
- `institutionInputRule`

## Prohibited Content

Generic dummy data must not contain:

- real institution names
- raw reference-sample source content
- employee personal data
- tenant-specific workflows copied from a customer
- undisclosed benchmark data

## Allowed Content

Generic dummy data may contain:

- fictional public institution names
- fictional jobs
- fictional personas
- fictional dashboard metrics
- simplified atomic task rows
- synthetic daily check-ins

## Current Dataset

The first demo dataset is:

```text
packages/database/dummy/generic_public_hr_demo.dataset.json
```

It contains fictional public-HR jobs, personas, dashboard metrics, and dummy atomic tasks.

## Sales Rule

For a multi-institution demo:

1. Use generic dummy data for public screens.
2. Use institution input only inside that institution's tenant.
3. Use reference samples only for internal validation or approved anonymized explanation.
4. Use benchmark aggregates only when de-identified and contractually allowed.
