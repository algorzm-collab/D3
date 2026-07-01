import assert from "node:assert/strict";
import { evaluatePolicy } from "../../../packages/policy/src/index.mjs";

function actor(role) {
  return {
    tenantId: "tenant_1",
    userId: `${role}_1`,
    roles: [role],
    organizationIds: ["org_1"]
  };
}

function resource(overrides = {}) {
  return {
    tenantId: "tenant_1",
    resourceType: "evidence_pack",
    resourceId: "resource_1",
    organizationId: "org_1",
    workflowState: "finalized",
    sensitivity: "restricted",
    ...overrides
  };
}

assert.equal(
  evaluatePolicy({
    actor: actor("evaluator"),
    action: "review",
    resource: resource({ workflowState: "reviewing" })
  }).reasonCode,
  "EVALUATOR_REVIEW_ALLOWED"
);

assert.equal(
  evaluatePolicy({
    actor: actor("external_evaluator"),
    action: "read",
    resource: resource({ workflowState: "published" })
  }).reasonCode,
  "EXTERNAL_EVALUATOR_FINAL_PACK_ALLOWED"
);

assert.equal(
  evaluatePolicy({
    actor: actor("external_evaluator"),
    action: "read",
    resource: resource({ workflowState: "draft" })
  }).reasonCode,
  "DEFAULT_DENY"
);

assert.equal(
  evaluatePolicy({
    actor: actor("institution_head"),
    action: "read",
    resource: resource({ scope: "aggregate", workflowState: "published", sensitivity: "internal" })
  }).reasonCode,
  "INSTITUTION_HEAD_AGGREGATE_READ_ALLOWED"
);

assert.equal(
  evaluatePolicy({
    actor: actor("institution_head"),
    action: "read",
    resource: resource({ scope: "self", workflowState: "published", sensitivity: "sensitive" })
  }).reasonCode,
  "DEFAULT_DENY"
);

assert.equal(
  evaluatePolicy({
    actor: actor("management_evaluation_group"),
    action: "export",
    resource: resource({
      resourceType: "management_evaluation_pack",
      scope: "aggregate",
      workflowState: "finalized"
    })
  }).reasonCode,
  "MANAGEMENT_EVALUATION_GROUP_AGGREGATE_ALLOWED"
);

assert.equal(
  evaluatePolicy({
    actor: actor("consultant"),
    action: "read",
    resource: resource({ scope: "project", workflowState: "finalized", sensitivity: "internal" })
  }).reasonCode,
  "CONSULTANT_PROJECT_READ_ALLOWED"
);

assert.equal(
  evaluatePolicy({
    actor: actor("consultant"),
    action: "read",
    resource: resource({ scope: "project", workflowState: "finalized", sensitivity: "sensitive" })
  }).reasonCode,
  "DEFAULT_DENY"
);

assert.equal(
  evaluatePolicy({
    actor: actor("developer_operator"),
    action: "read",
    resource: resource({ resourceType: "daily_checkin", sensitivity: "internal" })
  }).reasonCode,
  "DEVELOPER_OPERATOR_HR_CONTENT_DENIED"
);

assert.equal(
  evaluatePolicy({
    actor: actor("developer_operator"),
    action: "support_access",
    resource: resource({ resourceType: "technical_metadata", sensitivity: "internal" })
  }).reasonCode,
  "DEVELOPER_OPERATOR_TECH_SUPPORT_ALLOWED"
);

console.log("Policy role matrix tests passed.");
