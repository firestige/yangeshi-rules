# 研格式 · 论文格式规则库

[打开规则库 →](https://yangeshi.cn/rules)

学校原始材料 → 研格式解释 → 可执行规则。当前收录中科大规则，后续按学校与版本扩展。非学校官方项目，不承诺全规范覆盖。

- [逐条规范与解释](schools/ustc/2026-09-21/guide.md)
- [实际执行规则](schools/ustc/2026-09-21/rules.json)
- [逐条来源映射](schools/ustc/2026-09-21/source-map.json)
- [覆盖边界](schools/ustc/2026-09-21/coverage.md)、[未完成项](schools/ustc/2026-09-21/unfinished.md)
- [原始材料](originals/)：学校模板与历史手册。手册只作历史参考，不覆盖2026模板。

B编号按原DOCX正文直接子节点从1起计数（含表格），XPath和文字哈希用于精确定位。规则的修复许可不是引擎全部实现的证明；实际执行见报告rule_activity，未知不等于通过。产品默认、用户指定口径不是学校原文，具体解释见guide.md。

首版版本为 `2026-10-27-preview.1`。`release.json` / `manifest.json` 锁定发布文件；产品应固定本仓 Git 提交与规则文件哈希，不从 main/latest 自动更新运行规则。

本仓库依据学校公开规范整理执行规则，欢迎共同审阅、纠错和修订。

纠错请用Issue模板附规则ID、版本、原文出处、当前/预期解释及脱敏小例子。不要上传真实论文、全文报告或个人信息。提交Issue不会自动修改线上规则。

## 反馈

- [规则纠错](https://github.com/firestige/yangeshi-rules/issues/new?template=rule-correction.yml)
- [学校来源更新](https://github.com/firestige/yangeshi-rules/issues/new?template=source-update.yml)

## 许可与署名

本仓库可授权的结构化规则、来源映射及说明采用 **[CC BY-SA 4.0（署名—相同方式共享 4.0 国际版）](https://creativecommons.org/licenses/by-sa/4.0/deed.zh-hans)**，署名为 **“研格式规则库及贡献者”**。

学校原始规范、模板、手册及其他第三方内容（包括原文引文）不在上述许可范围内，相关权利归各自权利人所有。

完整许可文本见 [LICENSE](LICENSE)，许可范围与署名示例见 [NOTICE.md](NOTICE.md)。

## 规则库页面与发布

本仓库维护规则数据与页面源码，不再独立部署站点。规则库统一在主站 `/rules` 展示，GitHub、Issue 和贡献入口仍指向本仓库。

主站按固定 Git 提交拉取 `rules.json`、`source-map.json`、`release.json` 和对应页面源码，完成哈希、兼容性与集成验证后，随主站发布。学校原文、整理解释和规则展示只有一套来源，不另存一份手工维护的规则正文；规则仓 main 更新不会直接替换已上线版本。

本地预览：在仓库根目录执行 `python3 -m http.server 8000 --bind 127.0.0.1`，然后访问 `http://127.0.0.1:8000/`。
