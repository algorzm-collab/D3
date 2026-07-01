# ADR-0012: Separate Generic Dummy Demo Data From Reference Samples

## Status

Accepted

## Context

D3HR must support multi-institution sales demos without turning a real institution's source material into product content.

KORAD and future institution inputs may validate schema and parser fit, but they must not become default demo data.

## Decision

D3HR will maintain a separate `generic_dummy` dataset for public sales demos and local development.

The dataset must be fictional, explicitly labeled, and tested to exclude real reference-sample terms.

## Consequences

- Sales demos can be shown safely without leaking institution input.
- Reference samples remain internal validation or authorized customer-specific examples.
- Future demo screens must load from generic dummy fixtures unless an institution-specific tenant explicitly provides approved data.
