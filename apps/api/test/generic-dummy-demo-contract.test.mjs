import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const raw = await readFile(
  new URL("../../../packages/database/dummy/generic_public_hr_demo.dataset.json", import.meta.url),
  "utf8"
);
const dataset = JSON.parse(raw);

assert.equal(dataset.datasetMetadata.contentClass, "generic_dummy");
assert.equal(dataset.datasetMetadata.usageBoundary, "sales_demo_and_local_development_only");
assert.equal(dataset.datasetMetadata.institutionInputRule, "must not contain real institution source content");
assert.equal(dataset.tenant.publicInstitutionType, "fictional_public_institution");
assert.ok(dataset.jobs.length >= 2);
assert.ok(dataset.personas.length >= 3);
assert.ok(dataset.dashboardMetrics.length >= 3);

for (const blockedTerm of ["KORAD", "한국원자력환경공단", "원자력환경공단"]) {
  assert.equal(raw.includes(blockedTerm), false, `generic dummy dataset must not contain ${blockedTerm}`);
}

for (const job of dataset.jobs) {
  assert.ok(job.atomicTasks.length > 0);
  assert.ok(job.atomicTasks.every((task) => task.parserVersion === "dummy_task_v1"));
}

console.log("Generic dummy demo dataset tests passed.");
