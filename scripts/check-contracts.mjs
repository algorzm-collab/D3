import { access, readFile } from "node:fs/promises";

const requiredFiles = [
  "packages/shared-types/src/index.ts",
  "packages/policy/src/index.ts",
  "packages/audit/src/index.ts",
  "packages/database/migrations/0001_foundation.sql"
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
  console.error("Missing required foundation contracts:");
  for (const file of missing) console.error(`- ${file}`);
  process.exit(1);
}

const migration = await readFile("packages/database/migrations/0001_foundation.sql", "utf8");
const requiredMigrationTerms = [
  "job_description_element_groups",
  "job_description_fields",
  "job_description_field_values",
  "source_documents",
  "source_seed_items",
  "job_seed_links",
  "strategic_input",
  "job_core",
  "requirement",
  "job_value_grade",
  "performance_management",
  "competency_diagnosis",
  "mobility_career",
  "targeted_talent"
];

const missingMigrationTerms = requiredMigrationTerms.filter((term) => !migration.includes(term));

if (missingMigrationTerms.length > 0) {
  console.error("Foundation migration missing Job Description contract terms:");
  for (const term of missingMigrationTerms) console.error(`- ${term}`);
  process.exit(1);
}

console.log(`Contract check passed (${requiredFiles.length} required files).`);
