# KORAD Executive Job Seed Analysis

## Source

- File: `1016_간부직 직무.pdf`
- Source type: received project material
- Extracted content type: job list / table of contents
- Pages extracted: 1

## Interpretation

This PDF is not treated as a complete job-description source.

It is treated as a `Job Registry Seed`: a first source for identifying institution-specific executive-level jobs that must later be enriched with structured Job Description elements.

## Why This Matters

D3HR must not view job descriptions as a one-time form completion task.

This source becomes the first seed in a continuous data flow:

```text
source document
-> job registry seed
-> job draft
-> job version
-> structured field values
-> task/competency/performance/career/workforce linkage
-> time-series changes
-> benchmark and Evidence Pack use
```

## Extracted Job Pattern

The listed jobs follow a consistent pattern:

```text
{domain/function} + 총괄
```

This suggests:

- job level: executive / manager-level
- role scope: total ownership / oversight
- institution: KORAD
- source completeness: registry only
- enrichment required: yes

## Seed Handling Rules

Each extracted row should be stored with:

- source_document_id
- source_page
- source_order
- raw_title
- normalized_title
- job_level
- role_scope
- extraction_confidence
- enrichment_status
- first_seen_at
- valid_from
- valid_to
- superseded_by

## Enrichment Status

Allowed values:

- seed_only
- draft_created
- ncs_mapped
- field_values_started
- reviewed
- finalized
- published
- archived

## Versioning Rule

The seed list is not overwritten when detailed job descriptions arrive.

Instead:

```text
seed item remains as source evidence
new job draft references seed item
job version stores structured values
changes are added as later versions
```

## Time-Series Rule

Every job should support time-based interpretation:

- when it first appeared
- when it became active
- when fields changed
- when it was mapped to NCS
- when it was finalized
- when it was replaced or archived

## Required Next Enrichment

For each seed job, D3HR should collect:

- job purpose
- strategic input
- job classification
- job components
- required competency
- required knowledge/skill/attitude
- job value factors
- performance management items
- competency diagnosis rules
- mobility/career path
- targeted talent type
- workforce planning assumptions
- AI impact

