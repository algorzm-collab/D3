import assert from "node:assert/strict";
import { readBenchmarkDashboard } from "../src/routes/dashboard.mjs";

const institutionHeadContext = {
  actor: {
    tenantId: "tenant_demo",
    userId: "user_head_1",
    roles: ["institution_head"],
    organizationIds: []
  }
};

const consultantContext = {
  actor: {
    tenantId: "tenant_demo",
    userId: "user_consultant_1",
    roles: ["consultant"],
    organizationIds: []
  }
};

const employeeContext = {
  actor: {
    tenantId: "tenant_demo",
    userId: "user_employee_1",
    roles: ["employee"],
    organizationIds: []
  }
};

const managerContext = {
  actor: {
    tenantId: "tenant_demo",
    userId: "user_manager_1",
    roles: ["manager"],
    organizationIds: []
  }
};

// 1. Test institution_head is allowed
const headRes = await readBenchmarkDashboard(institutionHeadContext);
assert.equal(headRes.status, 200);
assert.equal(headRes.body.tenant.id, "tenant_demo_public_agency");
assert.ok(headRes.body.dashboardMetrics.length >= 3);
assert.ok(headRes.body.benchmark.metrics.length >= 4);

// 2. Test consultant is allowed
const consultantRes = await readBenchmarkDashboard(consultantContext);
assert.equal(consultantRes.status, 200);

// 3. Test employee is denied (403)
const employeeRes = await readBenchmarkDashboard(employeeContext);
assert.equal(employeeRes.status, 403);
assert.equal(employeeRes.body.error.code, "ACCESS_DENIED");

// 4. Test manager is denied (403)
const managerRes = await readBenchmarkDashboard(managerContext);
assert.equal(managerRes.status, 403);
assert.equal(managerRes.body.error.code, "ACCESS_DENIED");

console.log("Dashboard API role verification tests passed.");
