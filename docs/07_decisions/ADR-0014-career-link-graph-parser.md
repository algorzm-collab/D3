# ADR-0014: Parse Job Recommendation Paths Into Career Graph Links

## Status

Accepted

## Context

D3HR career management requires graph data, not memo text. The KORAD 2024 general job-description reference sample includes `직무 추천 경로`, which lists prior and next jobs.

This source can seed career movement, placement recommendation, specialist path design, veteran role design, and inter-institution benchmark logic.

## Decision

D3HR will introduce `career_link_v1` as the first career graph parser contract.

Each parsed career link includes:

- order
- direction: `prior` or `next`
- target order
- target title
- similarity marker
- source line
- parser version

The foundation schema includes `job_career_links`.

## Consequences

- KORAD general reference sample now produces 1,492 career links.
- Career path becomes graph data.
- v1 captures selected links but does not yet normalize similarity strength because PDF extraction does not reliably preserve the `상/중` column relation.
- Future parser versions should normalize target job ids and similarity strength.
