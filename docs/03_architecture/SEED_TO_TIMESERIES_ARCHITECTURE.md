# Seed To Time-Series Architecture

## Purpose

D3HR must treat every source document, seed item, job draft, and structured job-description field as an evolving data asset.

No job source is final by default.

## Core Principle

```text
source data is preserved
structured data is versioned
changes are time-series
usage creates new evidence
```

## Flow

```text
Source Document
-> Seed Item
-> Job Draft
-> Job Version
-> Field Values
-> Linked Task / Competency / Performance / Career / Workforce Data
-> Evidence Pack / Benchmark / Recommendation
```

## Source Document

Represents any uploaded or received material:

- PDF
- Excel
- Word
- HWP-converted text
- NCS source
- interview note
- consulting output
- regulation or guideline

Required fields:

- source_document_id
- tenant_id
- title
- source_type
- document_type
- received_at
- extracted_at
- extraction_method
- checksum
- retention_policy

## Seed Item

Represents a granular extract from a source.

Examples:

- job title from table of contents
- task row from Excel
- competency phrase from NCS
- performance criterion from a job description
- policy clause from regulation

Required fields:

- seed_item_id
- source_document_id
- source_page
- source_order
- raw_text
- normalized_text
- seed_type
- extraction_confidence
- enrichment_status
- first_seen_at
- valid_from
- valid_to
- superseded_by

## Versioning

Seed items are never overwritten.

Job versions reference source seed items and store structured field values.

## Time-Series

Every change should answer:

- What changed?
- Who changed it?
- Why did it change?
- Which source supports it?
- What period is it valid for?
- Which downstream decision used it?

## D3HR Use

Seed data enables:

- historical job comparison
- institution-specific JobDB enrichment
- benchmark library
- job-description quality scoring
- Evidence Pack traceability
- AI recommendation explainability
- workforce transition analysis

