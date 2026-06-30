export function requiresAudit(action, sensitivity) {
  if (["sensitive", "highly_sensitive"].includes(sensitivity)) return true;

  return [
    "create",
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

export function createAuditEvent({
  id,
  actor,
  action,
  resource,
  orgScope = "self",
  policyDecision,
  ipAddress,
  userAgent
}) {
  return {
    id,
    tenantId: actor.tenantId,
    actorUserId: actor.userId,
    actorRole: actor.roles[0] ?? "unknown",
    action,
    resourceType: resource.resourceType,
    resourceId: resource.resourceId,
    workflowStateBefore: resource.workflowState,
    workflowStateAfter: resource.workflowState,
    orgScope,
    sensitivityLevel: resource.sensitivity,
    policyDecisionId: policyDecision.reasonCode,
    reasonCode: policyDecision.reasonCode,
    ipAddress,
    userAgent,
    createdAt: new Date().toISOString()
  };
}

