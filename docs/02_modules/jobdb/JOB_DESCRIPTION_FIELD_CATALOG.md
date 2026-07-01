# Job Description Field Catalog

## Purpose

Define D3HR job-description fields at a level that can drive database schema, UI, policy, evidence, career, education, workforce planning, and benchmark design.

## Field Catalog

| Field Code | Group | Field Name | Type | MVP | Sensitivity | Versioned | NCS Link | Linked Modules |
|---|---|---|---|---|---|---|---|---|
| business_strategy | Strategic Input | Business strategy | text | yes | internal | yes | no | Evidence Pack, Workforce |
| vision | Strategic Input | Vision | text | no | internal | yes | no | Evidence Pack |
| target | Strategic Input | Target | text | no | internal | yes | no | Evidence Pack |
| strategic_priority | Strategic Input | Strategic priority | enum/tag | yes | internal | yes | no | Workforce |
| required_organizational_competency | Strategic Input | Required organizational competency | relation | yes | internal | yes | partial | Career |
| required_job_competency | Strategic Input | Required job competency | relation | yes | internal | yes | yes | Career, JobDB |
| productivity_driver | Strategic Input | Productivity driver | text/tag | yes | internal | yes | no | Workforce |
| value_norm_culture | Strategic Input | Value/norm/culture | text | no | internal | yes | no | Evidence Pack |
| external_environment | Strategic Input | External environment | text/tag | yes | internal | yes | no | Workforce |
| industry_or_work_characteristic | Strategic Input | Industry/work characteristic | text/tag | yes | internal | yes | no | Workforce |
| job_classification | Job Core | Job classification | enum/relation | yes | internal | yes | partial | JobDB |
| job_family | Job Core | Job family | enum/relation | yes | internal | yes | partial | JobDB |
| job_series | Job Core | Job series | enum/relation | yes | internal | yes | partial | JobDB |
| job_title | Job Core | Job title | text | yes | internal | yes | partial | JobDB |
| base_date | Job Core | Base date | date | yes | internal | yes | no | Versioning, Benchmark |
| job_purpose | Job Core | Job purpose | text | yes | internal | yes | partial | Evidence Pack |
| job_mission | Job Core | Job mission | text/list | yes | internal | yes | partial | Work & OKR, Evidence Pack |
| job_components | Job Core | Job components | relation/list | yes | internal | yes | yes | Work & OKR |
| task_importance | Job Core | Task importance | number/list | yes | internal | yes | partial | Workload, Workforce |
| task_difficulty | Job Core | Task difficulty | number/list | yes | internal | yes | partial | Workload, Workforce |
| job_size | Job Core | Job size | number/list | yes | restricted | yes | partial | Workload, Workforce, AI Impact |
| management_system | Job Core | Management system | text/enum | yes | internal | yes | no | Admin |
| legal_or_policy_basis | Job Core | Legal/policy basis | relation/text | yes | restricted | yes | no | Evidence Pack |
| ncs_mapping | Job Core | NCS mapping | relation | yes | internal | yes | yes | JobDB |
| required_competency | Requirement | Required competency | relation | yes | internal | yes | yes | Career |
| required_knowledge | Requirement | Required knowledge | relation/list | yes | internal | yes | yes | Career, Learning |
| required_skill | Requirement | Required skill | relation/list | yes | internal | yes | yes | Career, Learning |
| required_attitude | Requirement | Required attitude | relation/list | yes | internal | yes | yes | Career |
| qualification | Requirement | Qualification | text/list | yes | restricted | yes | partial | Recruitment |
| experience | Requirement | Experience | text/list | yes | restricted | yes | no | Career |
| license_or_certificate | Requirement | License/certificate | relation/list | yes | internal | yes | partial | Learning |
| education_requirement | Requirement | Education requirement | relation/list | yes | internal | yes | partial | Learning |
| job_evaluation_factor | Job Value | Job evaluation factor | relation/list | yes | restricted | yes | no | Compensation, Evidence Pack |
| grading | Job Value | Grading | enum | yes | restricted | yes | no | Workforce |
| authority | Job Value | Authority | text/level | yes | restricted | yes | no | Evaluation |
| responsibility | Job Value | Responsibility | text/level | yes | restricted | yes | no | Evaluation |
| decision_scope | Job Value | Decision scope | enum/level | yes | restricted | yes | no | Evaluation |
| impact_scope | Job Value | Impact scope | enum/level | yes | restricted | yes | no | Evidence Pack |
| complexity | Job Value | Complexity | enum/level | yes | restricted | yes | no | Workforce |
| job_grade | Job Value | Job grade | enum | yes | restricted | yes | no | Compensation |
| performance_management_item | Performance | Performance management item | relation/list | yes | restricted | yes | no | Performance Evidence |
| performance_process | Performance | Performance process | workflow/ref | yes | restricted | yes | no | Performance Evidence |
| measurement_method | Performance | Measurement method | enum/text | yes | restricted | yes | partial | Performance Evidence |
| leadership_requirement | Performance | Leadership requirement | text/level | yes | internal | yes | no | Career |
| target_or_standard | Performance | Target/standard | text/metric | yes | restricted | yes | no | OKR |
| evidence_requirement | Performance | Evidence requirement | relation/list | yes | restricted | yes | no | Evidence Pack |
| competency_management_item | Competency Diagnosis | Competency management item | relation/list | yes | internal | yes | yes | Career |
| diagnosis_process | Competency Diagnosis | Diagnosis process | workflow/ref | yes | restricted | yes | no | Career |
| competency_gap_rule | Competency Diagnosis | Competency gap rule | rule/text | yes | restricted | yes | no | Career |
| development_point | Competency Diagnosis | Development point | text/tag | yes | internal | yes | no | Learning |
| reward_structure | Compensation | Reward structure | text/enum | no | highly_sensitive | yes | no | Future Compensation |
| contribution_definition | Compensation | Contribution definition | text | no | sensitive | yes | no | Future Compensation |
| reward_level | Compensation | Reward level | enum/number | no | highly_sensitive | yes | no | Future Compensation |
| payment_method | Compensation | Payment method | enum/text | no | highly_sensitive | yes | no | Future Compensation |
| promotion_target_group | Promotion | Promotion target group | relation/list | no | sensitive | yes | no | Career |
| promotion_size | Promotion | Promotion size | number | no | sensitive | yes | no | Workforce |
| promotion_criteria | Promotion | Promotion criteria | text/rule | no | sensitive | yes | no | Career |
| promotion_process | Promotion | Promotion process | workflow/ref | no | sensitive | yes | no | Career |
| workforce_plan | Workforce Planning | Workforce plan | relation/ref | no | restricted | yes | no | Workforce |
| staffing_size | Workforce Planning | Staffing size | number | no | restricted | yes | no | Workforce |
| workforce_capacity | Workforce Planning | Workforce capacity | number/text | no | restricted | yes | no | Workforce |
| required_headcount | Workforce Planning | Required headcount | number | no | restricted | yes | no | Workforce |
| workforce_gap | Workforce Planning | Workforce gap | number | no | restricted | yes | no | Workforce |
| ai_impact | Workforce Planning | AI impact | enum/score | yes | internal | yes | no | Workforce |
| movement_unit | Mobility | Movement unit | enum/text | yes | internal | yes | no | Career |
| appointment_unit | Mobility | Appointment unit | enum/text | yes | internal | yes | no | Career |
| movement_criteria | Mobility | Movement criteria | rule/text | yes | restricted | yes | no | Placement |
| appointment_criteria | Mobility | Appointment criteria | rule/text | yes | restricted | yes | no | Placement |
| movement_process | Mobility | Movement process | workflow/ref | yes | restricted | yes | no | Placement |
| career_path | Mobility | Career path | relation/graph | yes | internal | yes | no | Career |
| prior_job | Mobility | Prior job | relation | yes | internal | yes | no | Career |
| next_job | Mobility | Next job | relation | yes | internal | yes | no | Career |
| transition_job | Mobility | Transition job | relation | yes | internal | yes | no | Career |
| job_fit_flags | Mobility | Job fit flags | tag/list | yes | internal | yes | no | Veteran, Placement, Recruitment |
| talent_type | Targeted Talent | Talent type | enum/tag | yes | internal | yes | no | Career, Recruitment |
| talent_size | Targeted Talent | Talent size | number | no | restricted | yes | no | Workforce |
| talent_pool | Targeted Talent | Talent pool | relation | no | sensitive | yes | no | Workforce |
| management_package | Targeted Talent | Management package | text/ref | no | restricted | yes | no | Career |
| development_package | Targeted Talent | Development package | text/ref | yes | internal | yes | no | Learning |
| recruitment_need | Recruitment | Recruitment need | boolean/text | no | restricted | yes | no | Recruitment |
| recruitment_size | Recruitment | Recruitment size | number | no | restricted | yes | no | Recruitment |
| recruitment_criteria | Recruitment | Recruitment criteria | text/rule | no | restricted | yes | no | Recruitment |
| retirement_risk | Retirement | Retirement risk | enum/score | no | sensitive | yes | no | Workforce |
| succession_need | Retirement | Succession need | boolean/text | no | sensitive | yes | no | Workforce |
| knowledge_transfer_need | Retirement | Knowledge transfer need | boolean/text | no | restricted | yes | no | Veteran |

## Field Design Rule

Every field must be traceable to:

- a persona decision,
- a downstream module,
- an access policy,
- a workflow state,
- a versioning rule,
- and an evidence or benchmark use case.
