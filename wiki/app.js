// SPDX-License-Identifier: CC-BY-SA-4.0
import { categories, selectRules, issueLink, verifyData } from "./model.js";
const $ = (id) => document.getElementById(id);
function element(tag, text, parent, cls) {
  const node = document.createElement(tag);
  if (text !== null) node.textContent = text;
  if (cls) node.className = cls;
  parent?.append(node);
  return node;
}
function link(parent, label, href) {
  const a = element("a", label, parent);
  a.href = href;
  if (href.startsWith("https://")) {
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  }
  return a;
}
const root = new URL("../", import.meta.url);
let rows = [],
  release,
  category = "全部规则";
const authority = {
  required: "必需项",
  advisory: "建议项",
  example: "示例",
  default: "工具默认",
};
const fix = {
  none: "只检查或提示，不自动修改",
  properties_only: "仅允许修改明确的格式属性",
  guarded_transform: "仅允许满足保护条件的限定变换",
};
function showRule(row, parent) {
  const d = element("details", null, parent, "rule");
  d.id = row.rule_id;
  const summary = element("summary", null, d);
  const heading = element("div", null, summary, "rule-heading");
  element("span", row.rule_id, heading, "rule-id");
  element("h3", row.title, heading);
  element("span", row.category, summary, "category-tag");
  const body = element("div", null, d, "rule-body");
  const labels = element("div", null, body, "labels");
  element("span", authority[row.authority] || row.authority, labels, "badge");
  element(
    "span",
    row.interpretation.audit.status === "checkable"
      ? "有明确检查判据"
      : "暂不支持自动检查",
    labels,
    "badge muted-badge",
  );
  element("h4", "学校原文", body);
  for (const source of row.sources) {
    element("p", source.display_reference, body, "source-label");
    element("blockquote", source.text, body);
    const sourceDoc = release.standard.documents.find(
      (d) => d.id === source.document_id,
    );
    const anchors = element("div", null, body, "links");
    if (sourceDoc) {
      link(anchors, "官方来源", sourceDoc.source_page);
      link(anchors, "官方原件", sourceDoc.source_url);
      link(
        anchors,
        "核对仓库原件",
        `https://github.com/firestige/yangeshi-rules/blob/main/${sourceDoc.repository_path}`,
      );
    }
    const precision = element("details", null, body, "precision");
    element("summary", "查看精确定位", precision);
    element(
      "pre",
      `${source.source_id} · ${source.part}\n${source.xpath}\n原文SHA256 ${source.text_sha256}`,
      precision,
    );
  }
  element("h4", "整理解释与执行边界", body);
  element(
    "p",
    row.interpretation.audit.reason ||
      "仅在对象与条件明确时，检查已实现的格式子项。",
    body,
  );
  element(
    "p",
    `修复边界：${fix[row.interpretation.fix.permission] || "尚未确认"}。`,
    body,
  );
  if (row.interpretation.audit.status === "unsupported")
    element(
      "p",
      "该条规范保留供查阅，目前不执行自动检查或修复。",
      body,
      "scope",
    );
  const comments = row.interpretation.comments;
  if (comments?.reason) element("p", comments.reason, body, "muted");
  element(
    "p",
    "工具默认或维护者补充的执行口径不等同于学校原文；需结合完整规范说明核对。",
    body,
    "scope",
  );
  const raw = element("details", null, body, "precision");
  element("summary", "完整检查条件与修复约束", raw);
  element("pre", JSON.stringify(row.interpretation, null, 2), raw);
  const actions = element("div", null, body, "rule-actions");
  link(actions, "反馈这条规则 ↗", issueLink(row, release));
  link(actions, "链接到此规则", `#${row.rule_id}`);
  link(
    actions,
    "完整规范说明",
    "https://github.com/firestige/yangeshi-rules/blob/main/schools/ustc/2026-09-21/guide.md",
  );
}
function render() {
  const query = $("search").value;
  const selected = selectRules(rows, category, query);
  $("category-title").textContent = category;
  $("count").textContent = `${selected.length} / ${rows.length}`;
  $("rules").replaceChildren();
  for (const row of selected) showRule(row, $("rules"));
  if (!selected.length)
    element(
      "p",
      "未找到匹配规则。试试其他关键词，或清除筛选。",
      $("rules"),
      "empty",
    );
  for (const button of $("categories").querySelectorAll("button")) {
    button.classList.toggle("active", button.dataset.category === category);
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.category === category),
    );
  }
}
function openHash() {
  const id = decodeURIComponent(location.hash.slice(1));
  if (!id || id === "sources") return;
  const row = rows.find((r) => r.rule_id === id);
  if (!row) {
    $("status").textContent = "没有找到该规则，请核对链接中的规则ID。";
    return;
  }
  category = row.category;
  $("search").value = "";
  render();
  const target = $(id);
  target.open = true;
  target.scrollIntoView({ block: "start" });
}
try {
  const path = "schools/ustc/2026-09-21/";
  async function bytes(file) {
    const response = await fetch(new URL(path + file, root));
    if (!response.ok)
      throw Error(`资料加载失败：${file}（${response.status}）`);
    return response.arrayBuffer();
  }
  release = JSON.parse(new TextDecoder().decode(await bytes("release.json")));
  const [ruleBytes, mapBytes] = await Promise.all([
    bytes("rules.json"),
    bytes("source-map.json"),
  ]);
  rows = await verifyData(ruleBytes, mapBytes, release);
  $("version").textContent =
    `规则 ${release.ruleset.version} · ${rows.length} 条 · 材料版本 ${release.standard.version}`;
  const all = [{ name: "全部规则" }, ...categories];
  for (const c of all) {
    const button = element("button", null, $("categories"));
    button.type = "button";
    button.dataset.category = c.name;
    element("span", c.name, button);
    element(
      "span",
      String(
        c.name === "全部规则"
          ? rows.length
          : rows.filter((r) => r.category === c.name).length,
      ),
      button,
      "nav-count",
    );
    button.onclick = () => {
      category = c.name;
      render();
      $("rules-section").scrollIntoView({ block: "start" });
    };
  }
  $("source-date").textContent =
    `资料历史核对日期：${release.standard.checked_at}。以下原件用于核对出处，手册的参考地位与当前模板分开说明。`;
  for (const doc of release.standard.documents.filter(
    (d) => d.id !== "rules",
  )) {
    const card = element("article", null, $("source-list"), "source-card");
    element("h3", doc.title, card);
    element("p", `${doc.version} · ${doc.note}`, card);
    const links = element("div", null, card, "links");
    link(links, "学校官方入口", doc.source_page);
    link(links, "官方文件", doc.source_url);
    link(
      links,
      "仓库原件",
      `https://github.com/firestige/yangeshi-rules/blob/main/${doc.repository_path}`,
    );
    link(links, "下载原件", new URL(doc.repository_path, root).href);
    const details = element("details", null, card, "precision");
    element("summary", "文件校验信息", details);
    element(
      "pre",
      `SHA256 ${doc.sha256}\n大小 ${doc.bytes.toLocaleString()} 字节`,
      details,
    );
  }
  $("status").textContent =
    "规则与来源映射已核对。选择分类或搜索，展开规则查看原文及执行边界。";
  $("search").addEventListener("input", render);
  $("clear").onclick = () => {
    category = "全部规则";
    $("search").value = "";
    render();
  };
  window.addEventListener("hashchange", openHash);
  render();
  openHash();
} catch (error) {
  $("status").textContent = `暂时无法生成规则页面：${error.message}`;
  $("rules").replaceChildren();
  link(
    $("rules"),
    "在 GitHub 查阅规则与来源",
    "https://github.com/firestige/yangeshi-rules/tree/main/schools/ustc/2026-09-21",
  );
}
