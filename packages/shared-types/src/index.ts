export type UUID = string;
export type ISODateTime = string;

export type TenantId = UUID;
export type UserId = UUID;
export type OrganizationId = UUID;
export type JobId = UUID;
export type JobVersionId = UUID;
export type AuditLogId = UUID;

export type D3hrRole =
  | "employee"
  | "manager"
  | "hr"
  | "institution_head"
  | "consultant"
  | "system_operator";

export type Phase2Role =
  | "evaluator"
  | "senior_manager"
  | "external_evaluator"
  | "management_evaluation_group"
  | "developer_operator"
  | "veteran"
  | "community_moderator";

export type WorkflowState =
  | "draft"
  | "submitted"
  | "reviewing"
  | "returned"
  | "approved"
  | "finalized"
  | "published"
  | "archived";

export type DataSensitivity =
  | "public"
  | "internal"
  | "restricted"
  | "sensitive"
  | "highly_sensitive";

export type OrgScope =
  | "self"
  | "team"
  | "department"
  | "division"
  | "tenant"
  | "project"
  | "aggregate"
  | "none";

export type PolicyAction =
  | "create"
  | "read"
  | "read_sensitive"
  | "update"
  | "submit"
  | "review"
  | "approve"
  | "return"
  | "finalize"
  | "publish"
  | "archive"
  | "export"
  | "assign_role"
  | "change_policy"
  | "support_access";

export interface ActorContext {
  tenantId: TenantId;
  userId: UserId;
  roles: Array<D3hrRole | Phase2Role>;
  organizationIds: OrganizationId[];
  delegatedRole?: D3hrRole | Phase2Role;
  activeCycleId?: UUID;
}

export interface ResourceContext {
  tenantId: TenantId;
  resourceType: string;
  resourceId?: UUID;
  ownerUserId?: UserId;
  organizationId?: OrganizationId;
  scope?: OrgScope;
  workflowState?: WorkflowState;
  sensitivity: DataSensitivity;
  cycleId?: UUID;
}

export interface PolicyDecision {
  allowed: boolean;
  reasonCode: string;
  evaluatedAt: ISODateTime;
  requiredAudit: boolean;
}

export type { PersonaMetricCode, PersonaMetricEvent } from "./persona-metrics";
export type {
  JobDescriptionCustomizationLevel,
  JobDescriptionElementGroupCode,
  JobDescriptionFieldDataType,
  JobDescriptionFieldDefinition,
  JobDescriptionFieldValue,
  JobDescriptionSourceType,
  JobAtomicTaskRow,
  JobCareerLink
} from "./job-description";
