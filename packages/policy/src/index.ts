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
      (input.action === "read" ||
        input.action === "read_sensitive" ||
        input.action === "export") &&
      (input.resource.sensitivity === "sensitive" ||
        input.resource.sensitivity === "highly_sensitive")
    ) {
      return decision(false, "SYSTEM_OPERATOR_HR_CONTENT_DENIED");
    }
    return undefined;
  }
};

const developerOperatorGuardrailRule: PolicyRule = {
  id: "developer_operator_guardrail",
  description: "Developer operators can support technical metadata, but cannot read HR content by default.",
  evaluate(input) {
    if (
      input.actor.roles.includes("developer_operator") &&
      (input.action === "read" ||
        input.action === "read_sensitive" ||
        input.action === "export") &&
      input.resource.resourceType !== "technical_metadata"
    ) {
      return decision(false, "DEVELOPER_OPERATOR_HR_CONTENT_DENIED");
    }
    if (
      input.actor.roles.includes("developer_operator") &&
      input.action === "support_access" &&
      input.resource.resourceType === "technical_metadata"
    ) {
      return decision(true, "DEVELOPER_OPERATOR_TECH_SUPPORT_ALLOWED");
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

const evaluatorReviewRule: PolicyRule = {
  id: "evaluator_review",
  description: "Evaluators may review submitted or reviewing evaluation evidence.",
  evaluate(input) {
    if (
      input.actor.roles.includes("evaluator") &&
      (input.action === "read" || input.action === "review") &&
      ["submitted", "reviewing"].includes(input.resource.workflowState ?? "") &&
      ["internal", "restricted"].includes(input.resource.sensitivity)
    ) {
      return decision(true, "EVALUATOR_REVIEW_ALLOWED");
    }
    return undefined;
  }
};

const externalEvaluatorFinalReadRule: PolicyRule = {
  id: "external_evaluator_final_read",
  description: "External evaluators may read finalized or published evidence packages only.",
  evaluate(input) {
    if (
      input.actor.roles.includes("external_evaluator") &&
      (input.action === "read" || input.action === "export") &&
      ["finalized", "published"].includes(input.resource.workflowState ?? "") &&
      ["evidence_pack", "management_evaluation_pack"].includes(input.resource.resourceType) &&
      input.resource.sensitivity !== "sensitive" &&
      input.resource.sensitivity !== "highly_sensitive"
    ) {
      return decision(true, "EXTERNAL_EVALUATOR_FINAL_PACK_ALLOWED");
    }
    return undefined;
  }
};

const institutionHeadAggregateRule: PolicyRule = {
  id: "institution_head_aggregate_read",
  description: "Institution heads may read aggregate finalized institutional evidence.",
  evaluate(input) {
    if (
      input.actor.roles.includes("institution_head") &&
      input.action === "read" &&
      input.resource.scope === "aggregate" &&
      ["finalized", "published"].includes(input.resource.workflowState ?? "") &&
      input.resource.sensitivity !== "sensitive" &&
      input.resource.sensitivity !== "highly_sensitive"
    ) {
      return decision(true, "INSTITUTION_HEAD_AGGREGATE_READ_ALLOWED");
    }
    return undefined;
  }
};

const managementEvaluationGroupAggregateRule: PolicyRule = {
  id: "management_evaluation_group_aggregate",
  description: "Management evaluation group may read or export finalized aggregate evaluation packs.",
  evaluate(input) {
    if (
      input.actor.roles.includes("management_evaluation_group") &&
      (input.action === "read" || input.action === "export") &&
      input.resource.resourceType === "management_evaluation_pack" &&
      input.resource.scope === "aggregate" &&
      ["finalized", "published"].includes(input.resource.workflowState ?? "")
    ) {
      return decision(true, "MANAGEMENT_EVALUATION_GROUP_AGGREGATE_ALLOWED");
    }
    return undefined;
  }
};

const consultantProjectReadRule: PolicyRule = {
  id: "consultant_project_read",
  description: "Consultants may read project-scoped non-sensitive finalized records.",
  evaluate(input) {
    if (
      input.actor.roles.includes("consultant") &&
      input.action === "read" &&
      input.resource.scope === "project" &&
      ["finalized", "published"].includes(input.resource.workflowState ?? "") &&
      input.resource.sensitivity !== "sensitive" &&
      input.resource.sensitivity !== "highly_sensitive"
    ) {
      return decision(true, "CONSULTANT_PROJECT_READ_ALLOWED");
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
  developerOperatorGuardrailRule,
  selfReadRule,
  hrFinalizeRule,
  evaluatorReviewRule,
  externalEvaluatorFinalReadRule,
  institutionHeadAggregateRule,
  managementEvaluationGroupAggregateRule,
  consultantProjectReadRule,
  defaultDenyRule
];

export function evaluatePolicy(input: PolicyInput, rules = foundationPolicyRules): PolicyDecision {
  for (const rule of rules) {
    const result = rule.evaluate(input);
    if (result) return result;
  }

  return decision(false, "NO_RULE_MATCHED");
}
