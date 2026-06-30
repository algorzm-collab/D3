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
