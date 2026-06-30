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
