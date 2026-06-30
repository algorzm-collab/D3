import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const seed = JSON.parse(
  await readFile(
    new URL("../../../packages/database/seeds/korad_executive_jobs.seed.json", import.meta.url),
    "utf8"
  )
);

assert.equal(seed.sourceDocument.documentType, "job_registry_seed");
assert.equal(seed.sourceDocument.enrichmentRequired, true);
assert.equal(seed.seedPolicy.enrichmentStatus, "seed_only");
assert.equal(seed.seedPolicy.jobLevel, "executive");
assert.equal(seed.seedPolicy.roleScope, "총괄");
assert.equal(seed.jobs.length, 47);

for (const job of seed.jobs) {
  assert.equal(typeof job.sourceOrder, "number");
  assert.ok(job.rawTitle.endsWith("총괄"));
  assert.ok(job.normalizedTitle.length > 0);
  assert.equal(job.sourcePage, 1);
}

console.log("KORAD executive job seed tests passed.");

