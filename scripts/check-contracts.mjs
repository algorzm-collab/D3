import { access } from "node:fs/promises";

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

console.log(`Contract check passed (${requiredFiles.length} required files).`);

