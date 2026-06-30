import type {
  AuditLogId,
  DataSensitivity,
  ISODateTime,
  OrgScope,
  PolicyAction,
  TenantId,
  UserId,
  WorkflowState
} from "@d3hr/shared-types";

export interface AuditEvent {
  id: AuditLogId;
  tenantId: TenantId;
  actorUserId: UserId;
  actorRole: string;
  action: PolicyAction;
  resourceType: string;
  resourceId?: string;
  workflowStateBefore?: WorkflowState;
  workflowStateAfter?: WorkflowState;
  orgScope: OrgScope;
  sensitivityLevel: DataSensitivity;
  policyDecisionId?: string;
  reasonCode: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: ISODateTime;
}

export function requiresAudit(action: PolicyAction, sensitivity: DataSensitivity): boolean {
  if (["sensitive", "highly_sensitive"].includes(sensitivity)) return true;

  return [
    "read_sensitive",
    "approve",
    "return",
    "finalize",
    "publish",
    "archive",
    "export",
    "assign_role",
    "change_policy",
    "support_access"
  ].includes(action);
}

