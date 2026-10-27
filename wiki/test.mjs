import assert from "node:assert/strict";
import fs from "node:fs/promises";
import {
  categories,
  categoryFor,
  selectRules,
  issueLink,
  verifyData,
} from "./model.js";
const root = new URL("../schools/ustc/2026-09-21/", import.meta.url);
const ruleBytes = await fs.readFile(new URL("rules.json", root));
const mapBytes = await fs.readFile(new URL("source-map.json", root));
const release = JSON.parse(await fs.readFile(new URL("release.json", root)));
const rows = await verifyData(ruleBytes, mapBytes, release);
const pack = JSON.parse(ruleBytes);
assert.equal(rows.length, pack.rules.length);
assert.equal(new Set(rows.map((r) => r.rule_id)).size, rows.length);
assert.equal(
  categories.reduce((n, c) => n + selectRules(rows, c.name, "").length, 0),
  rows.length,
);
assert.equal(selectRules(rows, "全部规则", "USTC-BODY-01").length, 1);
assert.equal(selectRules(rows, "全部规则", "nonexistent-rule").length, 0);
assert(selectRules(rows, "全部规则", "公式").length > 0);
assert.throws(() => categoryFor("USTC-UNMAPPED-01"));
const bad = structuredClone(release);
bad.ruleset.source_map_sha256 = "invalid";
await assert.rejects(() => verifyData(ruleBytes, mapBytes, bad));
const url = new URL(issueLink(rows[0], release));
assert.equal(url.origin, "https://github.com");
assert.equal(url.searchParams.get("rule_id"), rows[0].rule_id);
assert.deepEqual([...url.searchParams.keys()].sort(), [
  "rule_id",
  "ruleset_version",
  "template",
  "title",
]);
const evidence = JSON.parse(
  await fs.readFile(new URL("source-evidence.json", root)),
);
for (const row of rows)
  for (const source of row.sources) {
    assert.equal(source.text, evidence.paragraphs[source.source_id].text);
    assert.equal(source.xpath, evidence.paragraphs[source.source_id].xpath);
  }
console.log(
  `${rows.length} rules classified exactly once; search, mapping, hash rejection and feedback metadata passed.`,
);
