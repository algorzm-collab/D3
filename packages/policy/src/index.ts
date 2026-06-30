import type {
  ActorContext,
  PolicyAction,
  PolicyDecision,
  ResourceContext
} from "@d3hr/shared-types";

export interface PolicyInput {
  actor: ActorContext;
  action: PolicyAction;
  resource: ResourceContext;
}

export interface PolicyRule {
  id: string;
  description: string;
  evaluate(input: PolicyInput): PolicyDecision | undefined;
}

function decision(allowed: boolean, reasonCode: string, requiredAudit = true): PolicyDecision {
  return {
    allowed,
    reasonCode,
    evaluatedAt: new Date().toISOString(),
    requiredAudit
  };
}

const tenantIsolationRule: PolicyRule = {
  id: "tenant_isolation",
  description: "Actor and resource tenant must match.",
  evaluate(input) {
    if (input.actor.tenantId !== input.resource.tenantId) {
      return decision(false, "TENANT_MISMATCH");
    }
    return undefined;
  }
};

const selfReadRule: PolicyRule = {
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
    return undefined;
  }
};

const systemOperatorGuardrailRule: PolicyRule = {
  id: "system_operator_guardrail",
  description: "System operators cannot silently read sensitive HR content by default.",
  evaluate(input) {
    if (
      input.actor.roles.includes("system_operator") &&
      (input.action === "read_sensitive" || input.action === "export") &&
      (input.resource.sensitivity === "sensitive" ||
        input.resource.sensitivity === "highly_sensitive")
    ) {
      return decision(false, "SYSTEM_OPERATOR_HR_CONTENT_DENIED");
    }
    return undefined;
  }
};

const hrFinalizeRule: PolicyRule = {
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
    return undefined;
  }
};

const defaultDenyRule: PolicyRule = {
  id: "default_deny",
  description: "Deny by default.",
  evaluate() {
    return decision(false, "DEFAULT_DENY");
  }
};

export const foundationPolicyRules: PolicyRule[] = [
  tenantIsolationRule,
  systemOperatorGuardrailRule,
  selfReadRule,
  hrFinalizeRule,
  defaultDenyRule
];

export function evaluatePolicy(input: PolicyInput, rules = foundationPolicyRules): PolicyDecision {
  for (const rule of rules) {
    const result = rule.evaluate(input);
    if (result) return result;
  }

  return decision(false, "NO_RULE_MATCHED");
}

