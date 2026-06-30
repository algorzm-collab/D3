import { access } from "node:fs/promises";

const requiredFiles = [
  "docs/00_constitution/D3HR_PRODUCT_CONSTITUTION.md",
  "docs/00_constitution/D3HR_DEVELOPMENT_CONSTITUTION.md",
  "docs/00_constitution/D3HR_MVP_SCOPE.md",
  "docs/00_constitution/D3HR_PREMORTEM.md",
  "docs/00_constitution/D3HR_ROADMAP.md",
  "docs/01_domain/PERSONA_HOOKING_STRATEGY.md",
  "docs/01_domain/DAU_LOOP_DESIGN.md",
  "docs/02_modules/MODULE_DOC_STANDARD.md",
  "docs/03_architecture/DATA_LINKAGE_ARCHITECTURE.md",
  "docs/04_policies/ACCESS_CONTROL_POLICY.md",
  "docs/05_sop/FEATURE_DEVELOPMENT_SOP.md",
  "docs/06_specs/API_CONVENTIONS.md",
  "docs/06_specs/AUDIT_LOG_SPEC.md",
  "docs/06_specs/PERSONA_HOME_SPEC.md",
  "docs/08_testing/ACCESS_CONTROL_TEST_MATRIX.md",
  "docs/07_decisions/ADR-0001-product-positioning.md",
  "docs/07_decisions/ADR-0004-persona-hooks-and-dau-loop.md"
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
