import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const seed = JSON.parse(
  await readFile(
    new URL("../../../packages/database/seeds/korad_2024_general_job_descriptions.seed.json", import.meta.url),
    "utf8"
  )
);

assert.equal(seed.sourceDocument.documentType, "structured_job_descriptions");
assert.equal(seed.sourceDocument.contentClass, "reference_sample");
assert.equal(seed.sourceDocument.usageBoundary, "schema_parser_validation_not_product_content");
assert.equal(seed.sourceDocument.tenantScopeRule, "must be loaded only into an authorized tenant or local reference workspace");
assert.equal(seed.sourceDocument.salesUseRule, "use only as anonymized pattern or explicitly approved institution-specific reference");
assert.equal(seed.sourceDocument.productContentRule, "must not ship as default D3HR content");
assert.equal(seed.sourceDocument.extractedPages, 224);
assert.equal(seed.sourceDocument.enrichmentRequired, true);
assert.equal(seed.seedPolicy.jobLevel, "general");
assert.equal(seed.seedPolicy.enrichmentStatus, "field_values_started");
assert.match(seed.seedPolicy.atomicDecompositionRule, /atomic rows/);
assert.equal(seed.jobs.length, 35);

const firstJob = seed.jobs[0];
assert.equal(firstJob.normalizedTitle, "고준위기획");
assert.equal(firstJob.jobSeries, "사업기획");
assert.equal(firstJob.baseDate, "24.09.23");
assert.ok(firstJob.sections.jobDefinition.length > 0);
assert.ok(firstJob.sections.jobMission.length > 0);
assert.ok(firstJob.sections.taskContent.length > 0);
assert.ok(firstJob.sections.competencyRequirement.length > 0);
assert.ok(firstJob.sections.careerPath.length > 0);
assert.ok(firstJob.sections.jobKpi.length > 0);
assert.ok(firstJob.parsed.missions.length > 0);
assert.ok(firstJob.parsed.taskRowEstimate > 0);
assert.ok(firstJob.parsed.atomicTasks.length > 0);
assert.equal(firstJob.parsed.atomicTasks.length, firstJob.parsed.taskRowEstimate);

const firstAtomicTask = firstJob.parsed.atomicTasks[0];
assert.equal(firstAtomicTask.parserVersion, "task_row_v1");
assert.equal(typeof firstAtomicTask.order, "number");
assert.equal(typeof firstAtomicTask.subTask, "string");
assert.equal(typeof firstAtomicTask.importance, "number");
assert.equal(typeof firstAtomicTask.difficulty, "number");
assert.equal(typeof firstAtomicTask.jobSize, "number");
assert.ok(firstAtomicTask.sourceLine.length > 0);

for (const field of [
  "job_series",
  "base_date",
  "job_title",
  "job_purpose",
  "job_mission",
  "job_components",
  "task_importance",
  "task_difficulty",
  "job_size",
  "required_competency",
  "education_requirement",
  "license_or_certificate",
  "job_fit_flags",
  "career_path",
  "prior_job",
  "next_job",
  "performance_management_item"
]) {
  assert.ok(Object.hasOwn(firstJob.fieldValueMap, field), `missing ${field}`);
}

for (const job of seed.jobs) {
  assert.equal(typeof job.sourceOrder, "number");
  assert.ok(job.rawTitle.endsWith("직무기술서"));
  assert.ok(job.normalizedTitle.length > 0);
  assert.match(job.baseDate, /^\d{2}\.\d{2}\.\d{2}$/);
  assert.ok(job.sections.jobInfo.length > 0);
  assert.ok(job.sections.taskContent.length > 0);
  assert.ok(job.sections.jobKpi.length > 0);
  assert.ok(job.parsed.atomicTasks.length > 0);
  assert.equal(job.parsed.atomicTasks.length, job.parsed.taskRowEstimate);
  assert.ok(job.parsed.atomicTasks.every((task) => task.parserVersion === "task_row_v1"));
}

const totalAtomicTasks = seed.jobs.reduce((sum, job) => sum + job.parsed.atomicTasks.length, 0);
assert.equal(totalAtomicTasks, 431);

console.log("KORAD general job description seed tests passed.");
