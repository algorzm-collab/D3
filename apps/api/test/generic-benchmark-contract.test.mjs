import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const raw = await readFile(
  new URL("../../../packages/database/dummy/generic_benchmark_snapshot.dataset.json", import.meta.url),
  "utf8"
);
const dataset = JSON.parse(raw);

assert.equal(dataset.datasetMetadata.contentClass, "generic_dummy");
assert.equal(dataset.datasetMetadata.benchmarkRule, "fictional_aggregate_only");
assert.equal(dataset.datasetMetadata.institutionInputRule, "must not contain real institution source content");
assert.equal(dataset.benchmarkScope.aggregationLevel, "synthetic_aggregate");
assert.ok(dataset.benchmarkScope.sampleSize > 1);
assert.ok(dataset.metrics.length >= 4);

for (const metric of dataset.metrics) {
  assert.equal(typeof metric.code, "string");
  assert.equal(typeof metric.median, "number");
  assert.equal(typeof metric.topQuartile, "number");
  assert.ok(metric.topQuartile >= metric.median);
}

for (const blockedTerm of ["KORAD", "한국원자력환경공단", "원자력환경공단"]) {
  assert.equal(raw.includes(blockedTerm), false, `generic benchmark must not contain ${blockedTerm}`);
}

console.log("Generic benchmark contract tests passed.");
