function decision(allowed, reasonCode, requiredAudit = true) {
  return {
    allowed,
    reasonCode,
    evaluatedAt: new Date().toISOString(),
    requiredAudit
  };
}

export const foundationPolicyRules = [
  {
    id: "tenant_isolation",
    description: "Actor and resource tenant must match.",
    evaluate(input) {
      if (input.actor.tenantId !== input.resource.tenantId) {
        return decision(false, "TENANT_MISMATCH");
      }
    }
  },
  {
    id: "system_operator_guardrail",
    description: "System operators cannot silently read sensitive HR content by default.",
    evaluate(input) {
      if (
        input.actor.roles.includes("system_operator") &&
        (input.action === "read" ||
          input.action === "read_sensitive" ||
          input.action === "export") &&
        ["sensitive", "highly_sensitive"].includes(input.resource.sensitivity)
      ) {
        return decision(false, "SYSTEM_OPERATOR_HR_CONTENT_DENIED");
      }
    }
  },
  {
    id: "employee_self_read",
    description: "Employees can read their own non-final HR work records.",
    evaluate(input) {
      if (
        input.actor.roles.includes("employee") &&
        input.action === "read" &&
        input.resource.ownerUserId === input.actor.userId &&
        input.resource.sensitivity !== "highly_sensitive"
      ) {
        return decision(true, "EMPLOYEE_SELF_READ", false);
      }
    }
  },
  {
    id: "employee_self_create_checkin",
    description: "Employees can create their own daily check-ins.",
    evaluate(input) {
      if (
        input.actor.roles.includes("employee") &&
        input.action === "create" &&
        input.resource.resourceType === "daily_checkin" &&
        input.resource.ownerUserId === input.actor.userId &&
        input.resource.sensitivity !== "highly_sensitive"
      ) {
        return decision(true, "EMPLOYEE_SELF_CREATE_CHECKIN", true);
      }
    }
  },
  {
    id: "manager_team_read",
    description: "Managers can read submitted team records in organization scope.",
    evaluate(input) {
      if (
        input.actor.roles.includes("manager") &&
        input.action === "read" &&
        input.resource.workflowState === "submitted" &&
        input.actor.organizationIds.includes(input.resource.organizationId)
      ) {
        return decision(true, "MANAGER_TEAM_READ", true);
      }
    }
  },
  {
    id: "hr_finalize",
    description: "HR can finalize workflow-controlled institutional HR records.",
    evaluate(input) {
      if (
        input.actor.roles.includes("hr") &&
        input.action === "finalize" &&
        ["approved", "reviewing"].includes(input.resource.workflowState ?? "")
      ) {
        return decision(true, "HR_FINALIZE_ALLOWED");
      }
    }
  },
  {
    id: "default_deny",
    description: "Deny by default.",
    evaluate() {
      return decision(false, "DEFAULT_DENY");
    }
  }
];

export function evaluatePolicy(input, rules = foundationPolicyRules) {
  for (const rule of rules) {
    const result = rule.evaluate(input);
    if (result) return result;
  }

  return decision(false, "NO_RULE_MATCHED");
}
