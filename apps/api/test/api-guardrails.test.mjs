import assert from "node:assert/strict";
import { createInMemoryCheckinRepository } from "../src/repositories/checkin-repository.mjs";
import { createWorkOkrRoutes } from "../src/routes/work-okr.mjs";

const checkinRepository = createInMemoryCheckinRepository();
const { createDailyCheckin, readTeamCheckins } = createWorkOkrRoutes({ checkinRepository });

const employeeContext = {
  actor: {
    tenantId: "tenant_1",
    userId: "user_1",
    roles: ["employee"],
    organizationIds: ["org_1"]
  }
};

const created = await createDailyCheckin(employeeContext, {
  userId: "user_1",
  organizationId: "org_1",
  checkinDate: "2026-06-30",
  summary: "Completed NCS-to-JobDB mapping draft.",
  workflowState: "submitted"
});

assert.equal(created.status, 200);
assert.equal(created.body.data.userId, "user_1");
assert.equal(created.auditEvents.length, 1);

const deniedOtherUser = await createDailyCheckin(employeeContext, {
  userId: "user_2",
  organizationId: "org_1",
  checkinDate: "2026-06-30",
  summary: "Invalid attempt."
});

assert.equal(deniedOtherUser.status, 403);
assert.equal(deniedOtherUser.body.error.reasonCode, "DEFAULT_DENY");

const managerContext = {
  actor: {
    tenantId: "tenant_1",
    userId: "manager_1",
    roles: ["manager"],
    organizationIds: ["org_1"]
  },
  orgScope: "team"
};

const teamRead = await readTeamCheckins(managerContext, {
  organizationId: "org_1"
});

assert.equal(teamRead.status, 200);
assert.equal(teamRead.body.data.length, 1);

const outsideTeamRead = await readTeamCheckins(managerContext, {
  organizationId: "org_2"
});

assert.equal(outsideTeamRead.status, 403);

const systemOperatorContext = {
  actor: {
    tenantId: "tenant_1",
    userId: "ops_1",
    roles: ["system_operator"],
    organizationIds: []
  }
};

const operatorDenied = await readTeamCheckins(systemOperatorContext, {
  organizationId: "org_1",
  sensitivity: "sensitive"
});

assert.equal(operatorDenied.status, 403);
assert.equal(operatorDenied.body.error.reasonCode, "SYSTEM_OPERATOR_HR_CONTENT_DENIED");

console.log("API guardrail tests passed.");
