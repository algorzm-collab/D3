-- D3HR foundation schema.
-- This migration establishes the minimum tables needed to preserve tenant
-- isolation, access policy, workflow state, auditability, and JobDB versioning.

create table tenants (
  id text primary key,
  name text not null,
  public_institution_type text,
  created_at text not null,
  updated_at text not null
);

create table users (
  id text primary key,
  tenant_id text not null references tenants(id),
  email text not null,
  display_name text not null,
  status text not null default 'active',
  created_at text not null,
  updated_at text not null,
  unique (tenant_id, email)
);

create table organizations (
  id text primary key,
  tenant_id text not null references tenants(id),
  parent_organization_id text references organizations(id),
  name text not null,
  organization_type text not null,
  created_at text not null,
  updated_at text not null
);

create table roles (
  id text primary key,
  code text not null unique,
  name text not null,
  phase text not null default 'mvp'
);

create table role_assignments (
  id text primary key,
  tenant_id text not null references tenants(id),
  user_id text not null references users(id),
  role_id text not null references roles(id),
  organization_id text references organizations(id),
  scope text not null,
  created_at text not null,
  updated_at text not null
);

create table workflow_states (
  code text primary key,
  name text not null,
  sort_order integer not null
);

create table audit_logs (
  id text primary key,
  tenant_id text not null references tenants(id),
  actor_user_id text not null,
  actor_role text not null,
  action text not null,
  resource_type text not null,
  resource_id text,
  workflow_state_before text,
  workflow_state_after text,
  org_scope text not null,
  sensitivity_level text not null,
  policy_decision_id text,
  reason_code text not null,
  ip_address text,
  user_agent text,
  created_at text not null
);

create table ncs_units (
  id text primary key,
  ncs_code text not null unique,
  title text not null,
  description text,
  source_version text,
  created_at text not null,
  updated_at text not null
);

create table source_documents (
  id text primary key,
  tenant_id text references tenants(id),
  title text not null,
  institution text,
  source_type text not null,
  document_type text not null,
  source_path text,
  extracted_pages integer,
  source_completeness text,
  enrichment_required integer not null default 1,
  received_at text,
  extracted_at text,
  checksum text,
  created_at text not null,
  updated_at text not null
);

create table source_seed_items (
  id text primary key,
  source_document_id text not null references source_documents(id),
  source_page integer,
  source_order integer,
  raw_text text not null,
  normalized_text text,
  seed_type text not null,
  extraction_confidence real,
  enrichment_status text not null default 'seed_only',
  first_seen_at text not null,
  valid_from text,
  valid_to text,
  superseded_by text references source_seed_items(id),
  created_at text not null,
  updated_at text not null
);

create table jobs (
  id text primary key,
  tenant_id text not null references tenants(id),
  job_family_code text,
  title text not null,
  status text not null default 'draft',
  created_at text not null,
  updated_at text not null
);

create table job_versions (
  id text primary key,
  tenant_id text not null references tenants(id),
  job_id text not null references jobs(id),
  version_number integer not null,
  workflow_state text not null references workflow_states(code),
  ncs_source_unit_id text references ncs_units(id),
  change_summary text,
  created_by text not null,
  finalized_by text,
  created_at text not null,
  finalized_at text,
  unique (tenant_id, job_id, version_number)
);

create table job_seed_links (
  id text primary key,
  tenant_id text not null references tenants(id),
  job_id text references jobs(id),
  job_version_id text references job_versions(id),
  seed_item_id text not null references source_seed_items(id),
  link_type text not null,
  created_at text not null
);

create table tasks (
  id text primary key,
  tenant_id text not null references tenants(id),
  job_version_id text not null references job_versions(id),
  title text not null,
  description text,
  source_type text not null,
  created_at text not null,
  updated_at text not null
);

create table job_atomic_tasks (
  id text primary key,
  tenant_id text not null references tenants(id),
  job_version_id text not null references job_versions(id),
  source_seed_item_id text references source_seed_items(id),
  source_order integer not null,
  task_group text,
  sub_task text not null,
  importance real not null,
  difficulty real not null,
  job_size real not null,
  source_line text not null,
  parser_version text not null,
  created_at text not null,
  updated_at text not null,
  unique (tenant_id, job_version_id, source_order, parser_version)
);

create table competencies (
  id text primary key,
  tenant_id text not null references tenants(id),
  job_version_id text not null references job_versions(id),
  title text not null,
  required_level text,
  source_type text not null,
  created_at text not null,
  updated_at text not null
);

create table job_description_element_groups (
  code text primary key,
  name text not null,
  description text,
  sort_order integer not null,
  mvp_priority text not null default 'future_phase'
);

create table job_description_fields (
  code text primary key,
  group_code text not null references job_description_element_groups(code),
  name text not null,
  data_type text not null,
  is_mvp integer not null default 0,
  sensitivity_level text not null,
  is_versioned integer not null default 1,
  ncs_link text not null default 'no',
  customization_level text not null,
  linked_modules text,
  created_at text not null,
  updated_at text not null
);

create table job_description_field_values (
  id text primary key,
  tenant_id text not null references tenants(id),
  job_version_id text not null references job_versions(id),
  field_code text not null references job_description_fields(code),
  source_type text not null,
  value_text text,
  value_number real,
  value_boolean integer,
  value_json text,
  created_by text not null,
  created_at text not null,
  updated_at text not null,
  unique (tenant_id, job_version_id, field_code)
);

create table okr_cycles (
  id text primary key,
  tenant_id text not null references tenants(id),
  name text not null,
  starts_at text not null,
  ends_at text not null,
  workflow_state text not null references workflow_states(code),
  created_at text not null,
  updated_at text not null
);

create table daily_checkins (
  id text primary key,
  tenant_id text not null references tenants(id),
  user_id text not null references users(id),
  organization_id text references organizations(id),
  okr_cycle_id text references okr_cycles(id),
  checkin_date text not null,
  summary text not null,
  blocker text,
  support_requested integer not null default 0,
  workflow_state text not null references workflow_states(code),
  sensitivity_level text not null default 'restricted',
  created_at text not null,
  updated_at text not null
);

create table work_evidences (
  id text primary key,
  tenant_id text not null references tenants(id),
  user_id text not null references users(id),
  daily_checkin_id text references daily_checkins(id),
  title text not null,
  evidence_type text not null,
  external_ref text,
  sensitivity_level text not null default 'restricted',
  created_at text not null,
  updated_at text not null
);

insert into workflow_states (code, name, sort_order) values
  ('draft', 'Draft', 10),
  ('submitted', 'Submitted', 20),
  ('reviewing', 'Reviewing', 30),
  ('returned', 'Returned', 40),
  ('approved', 'Approved', 50),
  ('finalized', 'Finalized', 60),
  ('published', 'Published', 70),
  ('archived', 'Archived', 80);

insert into roles (id, code, name, phase) values
  ('role_employee', 'employee', 'Employee', 'mvp'),
  ('role_manager', 'manager', 'Manager', 'mvp'),
  ('role_hr', 'hr', 'HR', 'mvp'),
  ('role_institution_head', 'institution_head', 'Institution Head', 'mvp'),
  ('role_consultant', 'consultant', 'Consultant', 'mvp'),
  ('role_system_operator', 'system_operator', 'System Operator', 'mvp');

insert into job_description_element_groups (code, name, description, sort_order, mvp_priority) values
  ('strategic_input', 'Strategic Input', 'Strategy, required competency, productivity, culture, and environment inputs.', 10, 'mvp'),
  ('job_core', 'Job Core', 'Job classification, components, management system, and NCS mapping.', 20, 'mvp'),
  ('requirement', 'Requirement', 'Competency, knowledge, skill, attitude, qualification, and experience requirements.', 30, 'mvp'),
  ('job_value_grade', 'Job Value / Grade', 'Job evaluation, grading, authority, responsibility, and impact.', 40, 'mvp'),
  ('performance_management', 'Performance Management', 'Management items, process, measurement, leadership, target, and evidence.', 50, 'mvp'),
  ('competency_diagnosis', 'Competency Diagnosis', 'Competency diagnosis, measurement, gaps, and development points.', 60, 'mvp'),
  ('compensation_linkage', 'Compensation Linkage', 'Reward structure, contribution, level, payment method, and process.', 70, 'future_phase'),
  ('promotion_linkage', 'Promotion Linkage', 'Promotion target, size, criteria, process, and upper job path.', 80, 'future_phase'),
  ('workforce_planning', 'Workforce Planning', 'Workforce plan, capacity, headcount, gap, productivity, and AI impact.', 90, 'mvp_placeholder'),
  ('mobility_career', 'Mobility / Career Development', 'Movement, appointment, criteria, process, and career path.', 100, 'mvp'),
  ('targeted_talent', 'Targeted Talent Type', 'Talent type, size, pool, management package, and development package.', 110, 'mvp'),
  ('recruitment_linkage', 'Recruitment Linkage', 'Recruitment need, size, criteria, process, and assessment method.', 120, 'future_phase'),
  ('retirement_exit_linkage', 'Retirement / Exit Linkage', 'Retirement risk, succession, knowledge transfer, and exit process.', 130, 'future_phase');

insert into job_description_fields (
  code,
  group_code,
  name,
  data_type,
  is_mvp,
  sensitivity_level,
  is_versioned,
  ncs_link,
  customization_level,
  linked_modules,
  created_at,
  updated_at
) values
  ('business_strategy', 'strategic_input', 'Business strategy', 'long_text', 1, 'internal', 1, 'no', 'public_standard', 'Evidence Pack, Workforce', datetime('now'), datetime('now')),
  ('required_job_competency', 'strategic_input', 'Required job competency', 'relation', 1, 'internal', 1, 'yes', 'core_required', 'Career, JobDB', datetime('now'), datetime('now')),
  ('productivity_driver', 'strategic_input', 'Productivity driver', 'tag', 1, 'internal', 1, 'no', 'public_standard', 'Workforce', datetime('now'), datetime('now')),
  ('external_environment', 'strategic_input', 'External environment', 'tag', 1, 'internal', 1, 'no', 'public_standard', 'Workforce', datetime('now'), datetime('now')),
  ('job_classification', 'job_core', 'Job classification', 'relation', 1, 'internal', 1, 'partial', 'core_required', 'JobDB', datetime('now'), datetime('now')),
  ('job_series', 'job_core', 'Job series', 'relation', 1, 'internal', 1, 'partial', 'core_required', 'JobDB, Benchmark', datetime('now'), datetime('now')),
  ('job_title', 'job_core', 'Job title', 'text', 1, 'internal', 1, 'partial', 'core_required', 'JobDB', datetime('now'), datetime('now')),
  ('base_date', 'job_core', 'Base date', 'date', 1, 'internal', 1, 'no', 'core_required', 'Versioning, Benchmark', datetime('now'), datetime('now')),
  ('job_purpose', 'job_core', 'Job purpose', 'long_text', 1, 'internal', 1, 'partial', 'core_required', 'Evidence Pack', datetime('now'), datetime('now')),
  ('job_mission', 'job_core', 'Job mission', 'long_text', 1, 'internal', 1, 'partial', 'core_required', 'Work & OKR, Evidence Pack', datetime('now'), datetime('now')),
  ('job_components', 'job_core', 'Job components', 'relation', 1, 'internal', 1, 'yes', 'core_required', 'Work & OKR', datetime('now'), datetime('now')),
  ('task_importance', 'job_core', 'Task importance', 'number', 1, 'internal', 1, 'partial', 'public_standard', 'Workload, Workforce', datetime('now'), datetime('now')),
  ('task_difficulty', 'job_core', 'Task difficulty', 'number', 1, 'internal', 1, 'partial', 'public_standard', 'Workload, Workforce', datetime('now'), datetime('now')),
  ('job_size', 'job_core', 'Job size', 'number', 1, 'restricted', 1, 'partial', 'public_standard', 'Workload, Workforce, AI impact', datetime('now'), datetime('now')),
  ('legal_or_policy_basis', 'job_core', 'Legal/policy basis', 'long_text', 1, 'restricted', 1, 'no', 'public_standard', 'Evidence Pack', datetime('now'), datetime('now')),
  ('ncs_mapping', 'job_core', 'NCS mapping', 'relation', 1, 'internal', 1, 'yes', 'core_required', 'JobDB', datetime('now'), datetime('now')),
  ('required_competency', 'requirement', 'Required competency', 'relation', 1, 'internal', 1, 'yes', 'core_required', 'Career', datetime('now'), datetime('now')),
  ('required_knowledge', 'requirement', 'Required knowledge', 'relation', 1, 'internal', 1, 'yes', 'core_required', 'Career, Learning', datetime('now'), datetime('now')),
  ('required_skill', 'requirement', 'Required skill', 'relation', 1, 'internal', 1, 'yes', 'core_required', 'Career, Learning', datetime('now'), datetime('now')),
  ('required_attitude', 'requirement', 'Required attitude', 'relation', 1, 'internal', 1, 'yes', 'core_required', 'Career', datetime('now'), datetime('now')),
  ('qualification', 'requirement', 'Qualification', 'long_text', 1, 'restricted', 1, 'partial', 'public_standard', 'Recruitment', datetime('now'), datetime('now')),
  ('experience', 'requirement', 'Experience', 'long_text', 1, 'restricted', 1, 'no', 'public_standard', 'Career', datetime('now'), datetime('now')),
  ('job_evaluation_factor', 'job_value_grade', 'Job evaluation factor', 'relation', 1, 'restricted', 1, 'no', 'public_standard', 'Compensation, Evidence Pack', datetime('now'), datetime('now')),
  ('grading', 'job_value_grade', 'Grading', 'enum', 1, 'restricted', 1, 'no', 'public_standard', 'Workforce', datetime('now'), datetime('now')),
  ('authority', 'job_value_grade', 'Authority', 'long_text', 1, 'restricted', 1, 'no', 'public_standard', 'Evaluation', datetime('now'), datetime('now')),
  ('responsibility', 'job_value_grade', 'Responsibility', 'long_text', 1, 'restricted', 1, 'no', 'public_standard', 'Evaluation', datetime('now'), datetime('now')),
  ('performance_management_item', 'performance_management', 'Performance management item', 'relation', 1, 'restricted', 1, 'no', 'public_standard', 'Performance Evidence', datetime('now'), datetime('now')),
  ('measurement_method', 'performance_management', 'Measurement method', 'long_text', 1, 'restricted', 1, 'partial', 'public_standard', 'Performance Evidence', datetime('now'), datetime('now')),
  ('evidence_requirement', 'performance_management', 'Evidence requirement', 'relation', 1, 'restricted', 1, 'no', 'public_standard', 'Evidence Pack', datetime('now'), datetime('now')),
  ('competency_management_item', 'competency_diagnosis', 'Competency management item', 'relation', 1, 'internal', 1, 'yes', 'public_standard', 'Career', datetime('now'), datetime('now')),
  ('competency_gap_rule', 'competency_diagnosis', 'Competency gap rule', 'rule', 1, 'restricted', 1, 'no', 'public_standard', 'Career', datetime('now'), datetime('now')),
  ('development_point', 'competency_diagnosis', 'Development point', 'tag', 1, 'internal', 1, 'no', 'public_standard', 'Learning', datetime('now'), datetime('now')),
  ('ai_impact', 'workforce_planning', 'AI impact', 'score', 1, 'internal', 1, 'no', 'public_standard', 'Workforce', datetime('now'), datetime('now')),
  ('movement_criteria', 'mobility_career', 'Movement criteria', 'rule', 1, 'restricted', 1, 'no', 'public_standard', 'Placement', datetime('now'), datetime('now')),
  ('career_path', 'mobility_career', 'Career path', 'relation', 1, 'internal', 1, 'no', 'public_standard', 'Career', datetime('now'), datetime('now')),
  ('prior_job', 'mobility_career', 'Prior job', 'relation', 1, 'internal', 1, 'no', 'public_standard', 'Career, Placement', datetime('now'), datetime('now')),
  ('next_job', 'mobility_career', 'Next job', 'relation', 1, 'internal', 1, 'no', 'public_standard', 'Career, Placement', datetime('now'), datetime('now')),
  ('job_fit_flags', 'mobility_career', 'Job fit flags', 'tag', 1, 'internal', 1, 'no', 'public_standard', 'Veteran, Placement, Recruitment', datetime('now'), datetime('now')),
  ('talent_type', 'targeted_talent', 'Talent type', 'tag', 1, 'internal', 1, 'no', 'public_standard', 'Career, Recruitment', datetime('now'), datetime('now')),
  ('development_package', 'targeted_talent', 'Development package', 'long_text', 1, 'internal', 1, 'no', 'public_standard', 'Learning', datetime('now'), datetime('now'));
