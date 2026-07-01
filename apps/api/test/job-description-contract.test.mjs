import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const catalog = await readFile(
  new URL("../../../docs/02_modules/jobdb/JOB_DESCRIPTION_FIELD_CATALOG.md", import.meta.url),
  "utf8"
);

const migration = await readFile(
  new URL("../../../packages/database/migrations/0001_foundation.sql", import.meta.url),
  "utf8"
);

for (const group of [
  "Strategic Input",
  "Job Core",
  "Requirement",
  "Job Value",
  "Performance",
  "Competency Diagnosis",
  "Mobility",
  "Targeted Talent"
]) {
  assert.match(catalog, new RegExp(group));
}

for (const field of [
  "business_strategy",
  "required_job_competency",
  "job_classification",
  "job_series",
  "base_date",
  "job_purpose",
  "job_mission",
  "required_competency",
  "task_importance",
  "task_difficulty",
  "job_size",
  "job_evaluation_factor",
  "measurement_method",
  "competency_gap_rule",
  "movement_criteria",
  "prior_job",
  "next_job",
  "job_fit_flags",
  "talent_type"
]) {
  assert.match(catalog, new RegExp(field));
  assert.match(migration, new RegExp(field));
}

console.log("Job Description contract tests passed.");
