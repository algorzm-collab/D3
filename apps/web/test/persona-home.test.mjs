import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const js = await readFile(new URL("../src/persona-home.js", import.meta.url), "utf8");

for (const persona of ["employee", "manager", "hr", "institution_head", "consultant"]) {
  assert.match(html, new RegExp(`data-persona="${persona}"`));
  assert.match(js, new RegExp(`${persona}: \\{`));
}

for (const required of [
  "daily_checkins",
  "work_evidences",
  "evidence packs",
  "management briefing",
  "operating JobDB"
]) {
  assert.match(js, new RegExp(required));
}

console.log("Persona home prototype tests passed.");

