// SPDX-License-Identifier: CC-BY-SA-4.0
export const categories = [
  {
    name: "适用范围与内容",
    prefixes: ["SCOPE", "AI", "CONTENT", "CLEAN", "LENGTH", "TEXT"],
  },
  { name: "封面与声明", prefixes: ["COVER", "TITLE", "DECL"] },
  { name: "摘要与关键词", prefixes: ["ABSTRACT", "KEYWORD"] },
  { name: "目录与清单", prefixes: ["TOC", "LISTS", "SYMBOL"] },
  { name: "正文与标题", prefixes: ["BODY", "HEADING", "CHAPTER", "PUNCT"] },
  { name: "图表与公式", prefixes: ["FIGURE", "TABLE", "EQUATION", "OBJECT"] },
  { name: "引文与注释", prefixes: ["REF", "NOTE"] },
  { name: "附录与致谢", prefixes: ["APPENDIX", "THANKS", "INNOV", "RESULT"] },
  {
    name: "页面与页码",
    prefixes: ["PAGE", "ORIENTATION", "HEADER", "PAGENUM"],
  },
];
export function categoryFor(id) {
  const category = categories.find((c) =>
    c.prefixes.includes(id.split("-")[1]),
  );
  if (!category) throw Error(`未分类规则：${id}`);
  return category.name;
}
export function selectRules(rows, category, query) {
  const term = query.trim().toLowerCase();
  return rows.filter(
    (r) =>
      (category === "全部规则" || r.category === category) &&
      (!term ||
        (term.startsWith("ustc-")
          ? r.rule_id.toLowerCase().includes(term)
          : [r.rule_id, r.title, ...r.sources.map((s) => s.text)]
              .join(" ")
              .toLowerCase()
              .includes(term))),
  );
}
export function issueLink(rule, release) {
  const url = new URL("https://github.com/firestige/yangeshi-rules/issues/new");
  url.search = new URLSearchParams({
    template: "rule-correction.yml",
    title: `[USTC] ${rule.rule_id} ${rule.title}`,
    rule_id: rule.rule_id,
    ruleset_version: `${release.ruleset.version} / ${release.ruleset.rules_sha256}`,
  }).toString();
  return url.href;
}
export async function digest(bytes) {
  return [...new Uint8Array(await crypto.subtle.digest("SHA-256", bytes))]
    .map((v) => v.toString(16).padStart(2, "0"))
    .join("");
}
export async function verifyData(ruleBytes, mapBytes, release) {
  if (
    (await digest(ruleBytes)) !== release.ruleset.rules_sha256 ||
    (await digest(mapBytes)) !== release.ruleset.source_map_sha256
  )
    throw Error("规则或来源映射与版本清单不一致，请稍后刷新。");
  const pack = JSON.parse(new TextDecoder().decode(ruleBytes)),
    rows = JSON.parse(new TextDecoder().decode(mapBytes));
  if (pack.pack_id !== release.ruleset.id || pack.rules.length !== rows.length)
    throw Error("规则清单不完整。");
  const byId = new Map(pack.rules.map((r) => [r.id, r]));
  if (new Set(rows.map((r) => r.rule_id)).size !== rows.length)
    throw Error("规则ID重复。");
  return rows.map((row) => {
    const rule = byId.get(row.rule_id);
    if (
      !rule ||
      JSON.stringify(rule.sources) !==
        JSON.stringify(row.sources.map((s) => s.source_id))
    )
      throw Error("规则与来源关系不一致。");
    return { ...row, category: categoryFor(row.rule_id) };
  });
}
