import assert from "node:assert/strict";
import { readJobsList, readJobDetail } from "../src/routes/jobs.mjs";

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

// 1. Verify listing jobs
const listRes = await readJobsList(institutionHeadContext);
assert.equal(listRes.status, 200);
assert.ok(listRes.body.jobs.length >= 35);
const job1 = listRes.body.jobs[0];
assert.equal(job1.normalizedTitle, "고준위기획");
assert.equal(job1.normalizedTitleEn, "High-Level Waste Planning");
assert.equal(job1.jobSeries, "사업기획");
assert.equal(job1.taskCount, 14);
assert.equal(job1.totalJobSize, 12.5);

// 2. Verify detail query
const detailRes = await readJobDetail(institutionHeadContext, { title: "고준위기획" });
assert.equal(detailRes.status, 200);
assert.equal(detailRes.body.normalizedTitle, "고준위기획");
assert.equal(detailRes.body.normalizedTitleEn, "High-Level Waste Planning");
assert.equal(detailRes.body.legalBasis, "방사성폐기물 관리법, 원자력안전법");
assert.ok(detailRes.body.atomicTasks.length > 0);
assert.ok(detailRes.body.careerLinks.length > 0);
assert.ok(detailRes.body.education.courses.length > 0);

// 3. Verify consultant is allowed
const consultantRes = await readJobsList(consultantContext);
assert.equal(consultantRes.status, 200);

// 4. Verify employee is denied
const employeeRes = await readJobsList(employeeContext);
assert.equal(employeeRes.status, 403);

console.log("Jobs API verification tests passed.");
