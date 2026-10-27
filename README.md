# 研格式 · 论文格式规则库

学校原始材料 → 研格式解释 → 可执行规则。只包含中科大，非学校官方项目，不承诺全规范覆盖。

- [逐条规范与解释](schools/ustc/2026-09-21/guide.md)
- [实际执行规则](schools/ustc/2026-09-21/rules.json)
- [逐条来源映射](schools/ustc/2026-09-21/source-map.json)
- [覆盖边界](schools/ustc/2026-09-21/coverage.md)、[未完成项](schools/ustc/2026-09-21/unfinished.md)
- originals/：未改动的学校模板与历史手册，本次由项目维护者批准随首版公开。手册只作历史参考，不覆盖2026模板。

B编号按原DOCX正文直接子节点从1起计数（含表格），XPath和文字哈希用于精确定位。规则的修复许可不是引擎全部实现的证明；实际执行见报告rule_activity，未知不等于通过。产品默认、用户指定口径不是学校原文，具体解释见guide.md。

首版版本为 `2026-10-27-preview.1`。`release.json` / `manifest.json` 锁定发布文件；产品应固定本仓 Git 提交与规则文件哈希，不从 main/latest 自动更新运行规则。

本仓尚未指定额外的开源许可证；第三方学校原件保留其原有权利，不因本仓公开而获得额外授权。仓库不包含产品主仓历史、引擎源码、真实论文或运行报告。

纠错请用Issue模板附规则ID、版本、原文出处、当前/预期解释及脱敏小例子。不要上传真实论文、全文报告或个人信息。提交Issue不会自动修改线上规则。

## 反馈

- [规则纠错](https://github.com/firestige/yangeshi-rules/issues/new?template=rule-correction.yml)
- [学校来源更新](https://github.com/firestige/yangeshi-rules/issues/new?template=source-update.yml)

公开规则仓仅用于规则资料与纠错；产品主仓保持私有。
