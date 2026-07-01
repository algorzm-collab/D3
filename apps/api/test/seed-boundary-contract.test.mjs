import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";

const seedDir = new URL("../../../packages/database/seeds/", import.meta.url);
const files = (await readdir(seedDir)).filter((file) => file.endsWith(".seed.json"));

assert.ok(files.length > 0);

for (const file of files) {
  const seed = JSON.parse(await readFile(new URL(file, seedDir), "utf8"));
  const source = seed.sourceDocument;

  assert.ok(source, `${file} missing sourceDocument`);
  assert.ok(source.contentClass, `${file} missing contentClass`);
  assert.ok(source.usageBoundary, `${file} missing usageBoundary`);
  assert.ok(source.tenantScopeRule, `${file} missing tenantScopeRule`);
  assert.ok(source.salesUseRule, `${file} missing salesUseRule`);
  assert.ok(source.productContentRule, `${file} missing productContentRule`);

  if (source.contentClass !== "generic_dummy") {
    assert.notEqual(source.productContentRule, "ship_as_default_content", `${file} cannot be product default`);
    assert.match(source.usageBoundary, /not_product_content/, `${file} must declare non-product usage`);
  }
}

console.log("Seed boundary contract tests passed.");
