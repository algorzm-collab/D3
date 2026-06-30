# Job Description Element Architecture

## Purpose

Job Description is the atomic operating record of D3HR.

It is not a document template. It is the structured data hub that connects strategy, required work, competency, job value, performance, reward, promotion, workforce planning, placement, career development, recruitment, retirement, and public-sector evidence.

## Source Model Reflected

The D3HR job-description model reflects the HR value chain:

```text
Strategic / Environmental Input
-> HR Infra
-> HRM System
-> Workforce Optimization
```

## Top-Level Element Groups

### 1. Strategic Input

Purpose:

- Explain why a job exists and what strategy or environment requires it.

Elements:

- business_strategy
- vision
- target
- strategic_priority
- required_organizational_competency
- required_job_competency
- productivity_driver
- value_norm_culture
- external_environment
- industry_or_work_characteristic

Linked modules:

- JobDB
- Evidence Pack
- Placement & Workforce
- Career & Learning

### 2. Job Core

Purpose:

- Define the required work.

Elements:

- job_classification
- job_family
- job_series
- job_title
- job_purpose
- job_components
- management_system
- legal_or_policy_basis
- ncs_mapping
- job_owner_org

Linked modules:

- JobDB
- Work & OKR
- Evidence Pack

### 3. Requirement

Purpose:

- Define the mandatory human capability required to perform the job.

Elements:

- required_competency
- required_knowledge
- required_skill
- required_attitude
- qualification
- experience
- license_or_certificate
- education_requirement
- requirement_management_system

Linked modules:

- Career & Learning
- Placement & Workforce
- Recruitment

### 4. Job Value / Grade

Purpose:

- Explain the value of the job inside the institution.

Elements:

- job_evaluation_factor
- grading
- authority
- responsibility
- decision_scope
- impact_scope
- complexity
- job_grade

Linked modules:

- Compensation
- Promotion
- Placement & Workforce
- Evidence Pack

### 5. Performance Management

Purpose:

- Define how job goal achievement is managed and evaluated.

Elements:

- performance_management_item
- performance_process
- measurement_method
- leadership_requirement
- target_or_standard
- evidence_requirement

Linked modules:

- Work & OKR
- Performance Evidence
- Evidence Pack

### 6. Competency Diagnosis

Purpose:

- Define how growth points and capability gaps are diagnosed.

Elements:

- competency_management_item
- diagnosis_process
- measurement_method
- leadership_requirement
- competency_gap_rule
- development_point

Linked modules:

- Career & Learning
- Placement & Workforce
- Veteran System

### 7. Compensation Linkage

Purpose:

- Link job value, contribution, and reward structure without making compensation the MVP core.

Elements:

- reward_structure
- contribution_definition
- reward_level
- payment_method
- reward_process

Linked modules:

- Future Compensation
- Job Value
- Evidence Pack

### 8. Promotion Linkage

Purpose:

- Define movement to higher job or role.

Elements:

- promotion_target_group
- promotion_size
- promotion_criteria
- promotion_process
- upper_job_path

Linked modules:

- Career & Learning
- Placement & Workforce
- Evidence Pack

### 9. Workforce Planning

Purpose:

- Connect jobs to optimal workforce structure.

Elements:

- workforce_plan
- staffing_size
- workforce_capacity
- required_headcount
- workforce_gap
- ai_impact
- productivity_assumption

Linked modules:

- Placement & Workforce
- Evidence Pack
- Institution Head Briefing

### 10. Mobility / Career Development

Purpose:

- Define placement, rotation, and growth paths.

Elements:

- movement_unit
- appointment_unit
- movement_criteria
- appointment_criteria
- movement_process
- career_path
- prior_job
- next_job
- transition_job

Linked modules:

- Career & Learning
- Placement & Workforce
- Manager Home

### 11. Targeted Talent Type

Purpose:

- Define what type and scale of talent the job requires.

Elements:

- talent_type
- talent_size
- talent_pool
- management_package
- development_package
- talent_process

Linked modules:

- Career & Learning
- Recruitment
- Veteran System
- Workforce Planning

### 12. Recruitment Linkage

Purpose:

- Convert job and requirement data into recruitment criteria.

Elements:

- recruitment_need
- recruitment_size
- recruitment_criteria
- recruitment_process
- assessment_method

Linked modules:

- Future Recruitment
- JobDB
- Requirement

### 13. Retirement / Exit Linkage

Purpose:

- Connect job data to retirement, succession, and knowledge-transfer risk.

Elements:

- retirement_risk
- succession_need
- knowledge_transfer_need
- veteran_replacement_plan
- exit_process

Linked modules:

- Placement & Workforce
- Veteran System
- Evidence Pack

## Element Governance

Each job-description element must define:

- data_type
- required_or_optional
- owner_role
- reviewer_role
- approver_role
- workflow_state
- sensitivity
- audit_required
- ncs_mapping_status
- linked_modules
- versioning_rule
- benchmark_visibility
- tenant_customization_level

## Customization Levels

- core_required: Required for all tenants.
- public_standard: Standard public-institution element, configurable by labels/options.
- tenant_configurable: Allowed via configuration.
- future_phase: Not MVP, reserved for later.
- prohibited_in_mvp: Explicitly out of MVP.

## MVP Element Priority

MVP must support:

- Strategic Input summary
- Job Core
- Requirement
- Job Value / Grade foundation
- Performance Management foundation
- Competency Diagnosis foundation
- Mobility / Career Development foundation
- Workforce Planning placeholder

MVP must not attempt full compensation automation, full recruitment suite, or full retirement management.

