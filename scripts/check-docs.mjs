import { access } from "node:fs/promises";

const requiredFiles = [
  "docs/00_constitution/D3HR_PRODUCT_CONSTITUTION.md",
  "docs/00_constitution/D3HR_DEVELOPMENT_CONSTITUTION.md",
  "docs/00_constitution/D3HR_MVP_SCOPE.md",
  "docs/00_constitution/D3HR_PREMORTEM.md",
  "docs/00_constitution/D3HR_ROADMAP.md",
  "docs/02_modules/MODULE_DOC_STANDARD.md",
  "docs/04_policies/ACCESS_CONTROL_POLICY.md",
  "docs/05_sop/FEATURE_DEVELOPMENT_SOP.md",
  "docs/06_specs/API_CONVENTIONS.md",
  "docs/06_specs/AUDIT_LOG_SPEC.md",
  "docs/08_testing/ACCESS_CONTROL_TEST_MATRIX.md",
  "docs/07_decisions/ADR-0001-product-positioning.md"
];

const missing = [];

for (const file of requiredFiles) {
  try {
    await access(file);
  } catch {
    missing.push(file);
  }
}

if (missing.length > 0) {
  console.error("Missing required governance docs:");
  for (const file of missing) console.error(`- ${file}`);
  process.exit(1);
}

console.log(`Docs check passed (${requiredFiles.length} required files).`);

