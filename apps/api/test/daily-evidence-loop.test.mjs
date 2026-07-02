import assert from "node:assert/strict";
import { createDailyCheckin, readTeamCheckins } from "../src/routes/work-okr.mjs";
import { readBenchmarkDashboard } from "../src/routes/dashboard.mjs";
import { checkinRepository } from "../src/repositories/checkin-repository.mjs";
import { workEvidenceRepository } from "../src/repositories/work-evidence-repository.mjs";

const employeeContext = {
  actor: {
    tenantId: "tenant_demo",
    userId: "user_employee_1",
    roles: ["employee"],
    organizationIds: ["org_strategy"]
  }
};

const managerContext = {
  actor: {
    tenantId: "tenant_demo",
    userId: "user_manager_1",
    roles: ["manager"],
    organizationIds: ["org_strategy"]
  }
};

const headContext = {
  actor: {
    tenantId: "tenant_demo",
    userId: "user_head_1",
    roles: ["institution_head"],
    organizationIds: []
  }
};

// Clear repositories before running tests
await checkinRepository.clearForTest();
await workEvidenceRepository.clearForTest();

// 1. Initial dashboard read
const dashboardInit = await readBenchmarkDashboard(headContext);
assert.equal(dashboardInit.status, 200);
assert.equal(dashboardInit.body.stats.checkinsCount, 0);

// 2. Submit a daily check-in
const submitRes = await createDailyCheckin(employeeContext, {
  userId: "user_employee_1",
  organizationId: "org_strategy",
  atomicTaskId: "task_plan_1",
  summary: "고준위 방폐물 기본계획 초안 및 부지선정 법령 해석 완료",
  blocker: "없음",
  workflowState: "submitted",
  evidenceItems: [
    { title: "부지선정 법령 검토 의견서", evidenceType: "document", externalRef: "http://example.com/doc1" }
  ]
});
assert.equal(submitRes.status, 200);

// 3. Confirm repositories are populated
const checkins = await checkinRepository.findAll();
assert.equal(checkins.length, 1);
assert.equal(checkins[0].summary, "고준위 방폐물 기본계획 초안 및 부지선정 법령 해석 완료");

const evidences = await workEvidenceRepository.findAll();
assert.equal(evidences.length, 1);
assert.equal(evidences[0].title, "부지선정 법령 검토 의견서");

// 4. Verify dashboard metrics incremented
const dashboardAfter = await readBenchmarkDashboard(headContext);
assert.equal(dashboardAfter.status, 200);
assert.equal(dashboardAfter.body.stats.checkinsCount, 1);
assert.equal(dashboardAfter.body.stats.evidencesCount, 1);

// 5. Manager reads team check-ins
const managerRes = await readTeamCheckins(managerContext, {
  organizationId: "org_strategy",
  sensitivity: "restricted"
});
assert.equal(managerRes.status, 200);
assert.equal(managerRes.body.data.length, 1);

console.log("Daily Evidence Loop unit tests passed.");
