# Data Model: JobDB

## Tables

- ncs_units
- ncs_elements
- job_families
- jobs
- job_versions
- tasks
- competencies
- knowledge_skills
- job_task_mappings
- job_competency_mappings
- job_description_reviews
- job_description_element_groups
- job_description_fields
- job_description_field_values
- source_documents
- source_seed_items
- job_seed_links
- job_strategic_inputs
- job_value_factors
- job_mobility_paths
- job_talent_profiles

## Sensitivity

Job templates and finalized published job descriptions are generally institutional knowledge.

Drafts, reviewer comments, and institution-specific internal rationale may be restricted.

## Foundation Migration Coverage

`packages/database/migrations/0001_foundation.sql` currently creates:

- ncs_units
- jobs
- job_versions
- tasks
- competencies

The following remain planned:

- ncs_elements
- job_families
- knowledge_skills
- job_task_mappings
- job_competency_mappings
- job_description_reviews
- job_description_element_groups
- job_description_fields
- job_description_field_values
- source_documents
- source_seed_items
- job_seed_links
- job_strategic_inputs
- job_value_factors
- job_mobility_paths
- job_talent_profiles

## Element Groups

JobDB field design follows:

- Strategic Input
- Job Core
- Requirement
- Job Value / Grade
- Performance Management
- Competency Diagnosis
- Compensation Linkage
- Promotion Linkage
- Workforce Planning
- Mobility / Career Development
- Targeted Talent Type
- Recruitment Linkage
- Retirement / Exit Linkage

See `JOB_DESCRIPTION_ELEMENT_ARCHITECTURE.md` and `JOB_DESCRIPTION_FIELD_CATALOG.md`.

## Field Value Rule

Structured job-description values are versioned by `job_version_id`.

NCS-derived values and institution-modified values must be distinguishable through source metadata.

## Seed And Time-Series Rule

Source documents and seed items are first-class data.

They must not be discarded after job versions are created.

See `docs/03_architecture/SEED_TO_TIMESERIES_ARCHITECTURE.md`.
