# USTC 2026 学位论文书写规范（可追溯规则版）

本规范仅以研究生院2026-09-21版官方DOCX中明确陈述的要求为校方规范依据，模板自身书写格式不是规范，面向作者阅读及未来DOCX检查工具加载。原件SHA256为 `da4a5458dba262c744737335101b5e281af0543c345f763c89230e2a7c825f03`。来源目录为[研究生院学位授予文档下载](https://gradschool.ustc.edu.cn/column/190)，下载链接及时间保存在仓库原始来源登记中。本次不扩编旧版规则，也不把2016年手册或整部国标并入新要求。

每条规则有稳定ID、适用对象、判据、修复边界及可定位来源。`Bnnn` 指 `word/document.xml` 中 `/w:document/w:body/*[n]`，**1基，包含表格节点**，不是旧缓存P编号。[原文证据](source-evidence.json)保存逐块原文、定位和文字哈希，可用 `extract_source.py` 从原件重建。模板文本引用以本地原件为核验依据，不依赖网络转述。

**要求强度**：`required` 为校方明确要求；`advisory` 为“宜、一般、建议”等建议，不升级为硬错误；`example` 预留为示范证据类别，本包不从模板样式生成任何此类检查规则；`default` 为产品默认。每个结构化规则只取一个强度，混合段落拆条。原文存在措辞范围歧义时按说明保留人工判断，不用缺省猜测补齐事实。

**阅读与执行**：每条正文是作者可读规范；折叠的 `ustc-rule` JSON 是同一条规范的可加载定义，包含对象选择、条件、判据、目标、自动修复权限及中文批注。`rules.json` 由 `compile_rules.py` 从本文件生成，禁止直接编辑生成文件。属性组合逐属性产生差异子项（如 `USTC-BODY-01/size.pt`），无需机械拆成数百条。

**能力声明**：现已实现首版DOCX check/fix引擎`thesisflow.docx_rules`，加载本规则包执行已实现的子项，输出新文件、报告和原生批注。规则中的修复权限是允许范围，不等于对应算法已经实现；实际已比较项目以报告的rule_activity为准。真实分页适配器及部分图表注/文献排序等变换未实现，不宣称全规范完成。所有机器检查均要求对象识别确认；缺上下文、无法解析的有效属性和排版信息返回 `unknown` 并静默跳过，不能记为通过或违反。`review` 保留原始辨认记录，不再自动生成核对任务。是否执行以 `audit` 为准。

**零额外表单**：用户上传论文后直接处理；学位类型、语种、引用制度等上下文由后台从文档明确证据自动识别，规则包由当前站点配置提供。不要求填写资料、上传上下文文件或逐项确认。无法确定时仅跳过相关子项，继续处理其他明确问题；不通过弹窗或批注向用户索取资料。原条目中的“作者确认”是可信事实的来源描述，不是交互要求。

**格式计量**：给用户的中文字号采用三号、四号、小四、五号；原文明确13pt、11pt、9—10.5pt及12磅时保留数值。JSON内部用pt。字符缩进是汉字符/字符计量，不擅自等同厘米；须处理OOXML字符缩进优先级。一个汉字符的标题间隔不简单等于一个ASCII空格。语言字体分配须区分汉字、英文数字、数学符号，不替换公式专用字体。

**用户可读出处**：最终Word批注、下载报告及网页明细必须标明实际出处，例如“依据：官方模板§2.1 封面”“依据：官方模板§3.8 页面设置”。没有编号的填写说明用其可读标题，不编造章节号。引用多处时去重列出。B编号、XPath和哈希仅在折叠的内部溯源详情中保留，不能代替用户出处；产品默认注明“产品默认（用户设置，非校方要求）”。生成器会把出处追加到修复说明和人工处理提示。

**服务能力与通知分类**：校方要求/建议的性质不变，另用 `audit.status` 区分可明确检查与当前查不了。可检查建议只在明确不符合执行判据时批注，符合、未知、缺依赖和不适用均不批注；查不了的要求或建议保留原文和既有拆解，但不运行检查、不自动修改、不批注。“无法判断”本身不是用户论文的问题。混合条目只执行 `audit.tests/roles/when` 明确选出的客观子项，其余文字继续归档。

**本轮修复边界复核**：自动修复仅针对已确认错误且安全目标明确的限定格式属性或已授权等值变换；能查出错但不能确定安全改法的只提示，不计自动修复欠账；不做内容校对，不补内容、改编号或重排复杂对象。 当前可自动修改的子项及保护条件逐行列在[未完成清单](unfinished.md)，并不表示新增变换已经实现。

**全局修复约束**：检出问题不等于能确定改法：不能确定安全修改的检查项只提示，不将自动校对列为缺失功能；只有确定能改且已获授权的格式才自动修复，建议始终只提示。只修改已确认对象的明确格式属性，以及白名单授权、保护范围已确认的标点。建议项一律只批注不修改；不自动改内容文字、编号、学位类别、签名、密级、图表内容和数学表达式。`text.exact`、`label.text` 默认只读；唯一例外是contract.literal_label_repairs明确授权的英文摘要标题大小写修正，仅将已识别Abstract等大小写形式改为ABSTRACT，逐原片段转大写，保护域与书签。每次自动修复附通俗中文批注，写明改了哪里、依据及旧值新值；只有已明确检出问题但不能安全修改时，才批注说明具体行动、风险和不能代改的理由；未知或查不了不批注。原有批注、修订、图片、域和关系须保留。

**用户复核后的执行原则（2026-10-23）**：先确认结构是否存在，缺失时只出对应结构提醒，不检查不存在内容的字体、字号或行距；存在时执行其全部适用硬性格式条件，能安全改就改，否则只对已确认问题批注。附录明确不作缺失提醒。建议规则只批注，不修改，即使技术上可修改也不越权。7项阈值、**单页**超过5条注释、独立公式单倍行距及分节符约定属于用户指定产品口径，不能冒称学校原文。横向页面只提示，不旋转。

**字数计量产品口径（用户校准）**：产品计数口径：一个中文汉字算一字，一个英文字母算一字，按字符而非英文单词计；学校原文明示“汉字”时仅统计汉字。所有建议只提示、不自动修改。

结构化块中`check`保留原文辨认记录，`audit`是当前执行范围；已明确排除的原文事项不会被归档中的旧批注模板重新激活。`guarded_transform`是白名单授权；当前实现普通英文摘要/著录标点、独立公式行距及可确认的文献缩进子项，其余变换未实现。逐条复核结果见[执行决策](contract.json)。

## 一、适用范围、封面与声明

<a id="ustc-scope-01"></a>

### USTC-SCOPE-01 · 语言及申请手续

服务分类：不检查、不批注（保留规范记录）。执行范围：没有可执行的明确检查条件，或依赖内容语义/主观判断；保留已辨认的规范，不执行检查、不自动修复、不写批注。

中国学生应用中文写作；需英文写作等特殊情况，应提前经学院审核并报校学位委员会办公室备案。外文论文仍有中文封面，格式要求同模板。

来源：官方模板§3.8 页面设置。性质：校方要求。对象：`document`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-SCOPE-01","title":"语言及申请手续","authority":"required","sources":["B363"],"selector":{"roles":["document"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["核对作者身份与写作语言","如属特殊写作语言，核对学院审核及备案依据"]},"requires":["human_review","external_metadata"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：中国学生应用中文写作；需英文写作等特殊情况，应提前经学院审核并报校学位委员会办公室备案。外文论文仍有中文封面，格式要求同模板。","risk":"改写日期、类别或导师信息可能与正式学籍及授予信息不一致。","reason":"需要已确认的外部资料；资料缺失或不能对应时无法安全判断和代填。"},"audit":{"status":"unsupported","notification":"never","roles":["document"],"when":[],"tests":null,"reason":"没有可执行的明确检查条件，或依赖内容语义/主观判断；保留已辨认的规范，不执行检查、不自动修复、不写批注。","requires":["human_review","external_metadata"],"policy_refs":[]}}
```

</details>

<a id="ustc-cover-01"></a>

### USTC-COVER-01 · 统一封面及提交日期

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：只检查统一封面的固定结构、形式、语种条件及中文日期形式；不判断可变填写内容真实性。符合不批注，明确不符合才批注。

执行边界：封面存在以下已确认差异：{failed_items_zh}。请按研究生院统一封面的固定结构和形式调整，保留本人填写内容。

使用研究生院统一封面；中文封面必备，其他语种论文在其后附对应语种封面。中文提交时间用中文数字，如“二〇二六年六月”。仅转换已填写提交时间的数字书写形式；原有yyyy年mm月只转换年和月，不追加日、不要求日；原有年月日则只转换已有各部分，不改值、不增减日期精度、不核真实性。

来源：官方模板§2.1 封面。性质：校方要求。对象：`cover`。执行以本条服务分类与结构化修复权限为准。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-COVER-01","title":"统一封面及提交日期","authority":"required","sources":["B241"],"selector":{"roles":["cover"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["核对统一模板结构和必要字段","核对外文封面条件和顺序","中文提交时间仅转换已有年月日的数字形式，不增补日期部分"]},"requires":["semantic_roles","human_review"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"封面存在以下已确认差异：{failed_items_zh}。请按研究生院统一封面的固定结构和形式调整，保留本人填写内容。","risk":"仅处理已确认的具体差异；对象、条件或关联不明确时跳过，不改写事实内容。","reason":"只检查统一封面的固定结构、形式、语种条件及中文日期形式；不判断可变填写内容真实性。符合不批注，明确不符合才批注。 仅转换已填写提交时间的数字书写形式；原有yyyy年mm月只转换年和月，不追加日、不要求日；原有年月日则只转换已有各部分，不改值、不增减日期精度、不核真实性。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["document"],"when":[],"tests":[{"fact":"cover.fixed_form_matches","op":"eq","value":true},{"fact":"cover.chinese_present","op":"eq","value":true},{"fact":"cover.foreign_condition_satisfied","op":"eq","value":true},{"fact":"cover.date_chinese_numerals","op":"eq","value":true}],"reason":"只检查统一封面的固定结构、形式、语种条件及中文日期形式；不判断可变填写内容真实性。符合不批注，明确不符合才批注。 仅转换已填写提交时间的数字书写形式；原有yyyy年mm月只转换年和月，不追加日、不要求日；原有年月日则只转换已有各部分，不改值、不增减日期精度、不核真实性。","requires":["semantic_roles","text"],"policy_refs":[]}}
```

</details>

<a id="ustc-title-01"></a>

### USTC-TITLE-01 · 中图与UDC分类号

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：只检查中图分类号及UDC是否填写，不判断分类正确性，不代填。

执行边界：题名页未填写{failed_items_zh}，请补充相应分类号；系统不推断分类。

题名页同时填写中图分类号和UDC分类号，按论文主题及最新分类表确定；不确定时咨询图书馆，程序不得推断专业分类。

来源：官方模板§2.2 题名页。性质：校方要求。对象：`title_page`。执行以本条服务分类与结构化修复权限为准。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-TITLE-01","title":"中图与UDC分类号","authority":"required","sources":["B243","B244","B245","B246"],"selector":{"roles":["title_page"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["中图分类号存在","UDC分类号存在","分类号与论文主题及相应最新分类表一致"]},"requires":["semantic_roles","external_classification","human_review"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"题名页未填写{failed_items_zh}，请补充相应分类号；系统不推断分类。","risk":"仅处理已确认的具体差异；对象、条件或关联不明确时跳过，不改写事实内容。","reason":"只检查中图分类号及UDC是否填写，不判断分类正确性，不代填。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["title_page"],"when":[],"tests":[{"fact":"classification.clc_filled","op":"eq","value":true},{"fact":"classification.udc_filled","op":"eq","value":true}],"reason":"只检查中图分类号及UDC是否填写，不判断分类正确性，不代填。","requires":["semantic_roles","text"],"policy_refs":[]}}
```

</details>

<a id="ustc-title-02"></a>

### USTC-TITLE-02 · 学校代码

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

题名页学校代码为10358。

来源：官方模板§2.2 题名页。性质：校方要求。对象：`school_code`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-TITLE-02","title":"学校代码","authority":"required","sources":["B247"],"selector":{"roles":["school_code"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"text.normalized","op":"eq","value":"10358"}]},"requires":["semantic_roles","text"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：题名页学校代码为10358。","risk":"自动改文字、序号或关联关系可能误改真实内容并破坏交叉引用。","reason":"本规则只授权检查；发现差异后需确认对象及关联，再由作者修改相关内容。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["school_code"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","text"],"policy_refs":[]}}
```

</details>

<a id="ustc-title-03"></a>

### USTC-TITLE-03 · 密级标识与保密期限

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：仅在作者已填写密级标识时检查其书写格式；未填写或空白按作者未标注处理，不提示缺失，不推定应涉密。公开允许空白；密级未知不提示。期限值属于内容，不判断或改动；学校允许省略期限时不提示补填。

执行边界：已填写的密级标识存在明确格式差异，请按学校写法调整；不补填或改变密级及期限，不自动加星号。

公开级可空白或“公开”；限制级原则上不超过3年，如“限制2年”。国家保密级分秘密（不超过10年）、机密（不超过20年）、绝密（不超过30年）；例“秘密5年”，未注明期限按相应最高年限。按GB/T 7156标注；电子文档秘密标志须与正文不可分离。保密等级和期限由有权人员确认，不能从论文推定，也不自动加星号。

来源：官方模板§2.2 题名页。性质：校方要求。对象：`title_page, document`。执行以本条服务分类与结构化修复权限为准。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-TITLE-03","title":"密级标识与保密期限","authority":"required","sources":["B248","B249","B250","B251"],"selector":{"roles":["title_page","document"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["仅检查已填写的密级标识格式","空白或未填写不作缺失提醒","不判断密级、期限及公开事实"]},"requires":["semantic_roles","text"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"已填写的密级标识存在明确格式差异，请按学校写法调整；不补填或改变密级及期限，不自动加星号。","risk":"仅处理已确认的具体差异；对象、条件或关联不明确时跳过，不改写事实内容。","reason":"仅在作者已填写密级标识时检查其书写格式；未填写或空白按作者未标注处理，不提示缺失，不推定应涉密。公开允许空白；密级未知不提示。期限值属于内容，不判断或改动；学校允许省略期限时不提示补填。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["document"],"when":[],"tests":[{"fact":"security.required_label_present","op":"eq","value":true}],"reason":"仅在作者已填写密级标识时检查其书写格式；未填写或空白按作者未标注处理，不提示缺失，不推定应涉密。公开允许空白；密级未知不提示。期限值属于内容，不判断或改动；学校允许省略期限时不提示补填。","requires":["semantic_roles","text"],"policy_refs":[]}}
```

</details>

<a id="ustc-title-04"></a>

### USTC-TITLE-04 · 题名长度建议

产品计数口径：一个中文汉字算一字，一个英文字母算一字，按字符而非英文单词计；学校原文明示“汉字”时仅统计汉字。所有建议只提示、不自动修改。

服务分类：可检查的建议；仅明确不符合时批注，不修改。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

题名一般不宜超过25字；超出时提示作者精简，不自动截断。字数口径未被模板定义，先显示计数口径和结果，不能据此硬性判错。

来源：官方模板§2.2 题名页。性质：校方建议。对象：`thesis_title`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-TITLE-04","title":"题名长度建议","authority":"advisory","sources":["B252"],"selector":{"roles":["thesis_title"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"length.reviewed_character_count","op":"lte","value":25}]},"requires":["semantic_roles","author_confirmed_count_policy"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"本题名字数为{actual}，超过一般不宜超过25字的建议。一个汉字或英文字母各计一字；请酌情调整，程序不自动改写。","risk":"为了达到字数而自动增删内容可能改变论证或删掉必要信息。","reason":"长度是明确的字符计数；该条为建议，只提示，不改题名。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["thesis_title"],"when":[],"tests":null,"reason":"产品计数口径：一个中文汉字算一字，一个英文字母算一字，按字符而非英文单词计；学校原文明示“汉字”时仅统计汉字。所有建议只提示、不自动修改。超过25字才提示，不缩写或改写题名。","requires":["semantic_roles","author_confirmed_count_policy"],"policy_refs":[]}}
```

</details>

<a id="ustc-title-05"></a>

### USTC-TITLE-05 · 题名与责任者信息

服务分类：不检查、不批注（保留规范记录）。执行范围：用户复核决定不处理：保留已识别原文及来源，不检查、不修改、不批注。

题名简明准确并中英文对照；题名页包括学生姓名、学号、导师姓名及专业技术职务，校外导师及指导委员会全部导师一并列出；学科专业按最新目录，研究方向为专业下细分领域。

来源：官方模板§2.2 题名页。性质：校方要求。对象：`title_page`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-TITLE-05","title":"题名与责任者信息","authority":"required","sources":["B252","B253","B254","B255"],"selector":{"roles":["title_page"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["中英文题名对应且准确","学生、导师及职务完整","校外导师或指导委员会成员无遗漏","专业符合最新目录，研究方向适当"]},"requires":["external_metadata","human_review"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：题名简明准确并中英文对照；题名页包括学生姓名、学号、导师姓名及专业技术职务，校外导师及指导委员会全部导师一并列出；学科专业按最新目录，研究方向为专业下细分领域。","risk":"改写日期、类别或导师信息可能与正式学籍及授予信息不一致。","reason":"需要已确认的外部资料；资料缺失或不能对应时无法安全判断和代填。"},"audit":{"status":"unsupported","notification":"never","roles":["title_page"],"when":[],"tests":null,"reason":"用户复核决定不处理：保留已识别原文及来源，不检查、不修改、不批注。","requires":["external_metadata","human_review"],"policy_refs":[]}}
```

</details>

<a id="ustc-title-06"></a>

### USTC-TITLE-06 · 提交日期边界

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

论文提交日期不得晚于学位授予日期。授予日期未知时标记“待确认”，不能判定通过或错误。

来源：官方模板“封面填写说明”；官方模板“题名页填写说明”；官方模板§2.2 题名页。性质：校方要求。对象：`submission_date`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-TITLE-06","title":"提交日期边界","authority":"required","sources":["B015","B030","B256"],"selector":{"roles":["submission_date"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"date.value","op":"lte_fact","value":"context.degree_award_date"}]},"requires":["semantic_roles","external_metadata"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：论文提交日期不得晚于学位授予日期。授予日期未知时标记“待确认”，不能判定通过或错误。","risk":"改写日期、类别或导师信息可能与正式学籍及授予信息不一致。","reason":"需要已确认的外部资料；资料缺失或不能对应时无法安全判断和代填。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["submission_date"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","external_metadata"],"policy_refs":[]}}
```

</details>

<a id="ustc-decl-01"></a>

### USTC-DECL-01 · 原创性及使用授权声明

服务分类：不检查、不批注（保留规范记录）。执行范围：用户复核决定不处理：保留已识别原文及来源，不检查、不修改、不批注。

使用统一声明模板；公开或控阅须由作者选择，控阅年份必填（说明中一般1—3年）。提交纸质和电子版均须学生、导师签名及日期；允许手签或电子签，不得有签章平台二维码，签字日期不晚于授予日期。不得由程序选择授权方式、伪造签名或删除疑似二维码。

来源：官方模板“原创性和使用授权声明及填写说明”；官方模板§2.3 中国科学技术大学学位论文原创性和使用授权声明。性质：校方要求。对象：`originality_declaration, authorization_declaration`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-DECL-01","title":"原创性及使用授权声明","authority":"required","sources":["B033","B034","B036","B040","B041","B042","B043","B044","B045","B048","B257","B258"],"selector":{"roles":["originality_declaration","authorization_declaration"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["对照统一声明正文","授权方式已选择，控阅年限已填","学生与导师签名真实且完整","签字日期不晚于授予日期","签章平台二维码未出现在提交版"]},"requires":["semantic_roles","external_metadata","human_visual_review"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：使用统一声明模板；公开或控阅须由作者选择，控阅年份必填（说明中一般1—3年）。提交纸质和电子版均须学生、导师签名及日期；允许手签或电子签，不得有签章平台二维码，签字日期不晚于授予日期。不得由程序选择授权方式、伪造签名或删除疑似二维码。","risk":"改写日期、类别或导师信息可能与正式学籍及授予信息不一致。","reason":"需要已确认的外部资料；资料缺失或不能对应时无法安全判断和代填。"},"audit":{"status":"unsupported","notification":"never","roles":["originality_declaration","authorization_declaration"],"when":[],"tests":null,"reason":"用户复核决定不处理：保留已识别原文及来源，不检查、不修改、不批注。","requires":["semantic_roles","external_metadata","human_visual_review"],"policy_refs":[]}}
```

</details>

<a id="ustc-ai-01"></a>

### USTC-AI-01 · 人工智能声明二选一

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

定稿只保留与实际情况相符的一份AI声明：使用者保留使用声明，未使用者保留未使用声明；删除未选用页。是否使用必须由作者确认；未确认时不代选、不删页。

来源：官方模板“人工智能工具声明及填写说明”；官方模板§2.4 研究生学位论文（实践成果报告）使用（或未使用）人工智能工具声明。性质：校方要求。对象：`document`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-AI-01","title":"人工智能声明二选一","authority":"required","sources":["B065","B259","B260","B261"],"selector":{"roles":["document"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"ai_declaration.count","op":"eq","value":1},{"fact":"ai_declaration.kind","op":"eq_fact","value":"context.ai_usage"}]},"requires":["semantic_roles","author_attestation"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：定稿只保留与实际情况相符的一份AI声明：使用者保留使用声明，未使用者保留未使用声明；删除未选用页。是否使用必须由作者确认；未确认时不代选、不删页。","risk":"代选声明、学位类别或导师信息可能形成不实内容。","reason":"实际使用情况、身份及选择需要作者确认，文档文字不能代替事实证明。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["document"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","author_attestation"],"policy_refs":[]}}
```

</details>

<a id="ustc-ai-02"></a>

### USTC-AI-02 · AI声明内容与签名

服务分类：不检查、不批注（保留规范记录）。执行范围：用户复核决定不处理：保留已识别原文及来源，不检查、不修改、不批注。

使用统一AI声明；使用工具时详细披露工具名称及具体用途。提交时须作者签名及不晚于学位授予日期的日期，不能出现签章平台二维码；独立研究、审核验证及责任承诺由作者核实。

来源：官方模板“人工智能工具声明及填写说明”；官方模板§2.4 研究生学位论文（实践成果报告）使用（或未使用）人工智能工具声明。性质：校方要求。对象：`ai_declaration`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-AI-02","title":"AI声明内容与签名","authority":"required","sources":["B049","B050","B051","B052","B053","B054","B055","B056","B060","B061","B065","B067","B068","B069","B073","B074","B260","B261"],"selector":{"roles":["ai_declaration"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["如实际使用工具，名称和具体用途已真实披露","统一声明承诺与实际情况一致","作者签名及日期完整且有效","无签章平台二维码"]},"requires":["author_attestation","external_metadata","human_visual_review"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：使用统一AI声明；使用工具时详细披露工具名称及具体用途。提交时须作者签名及不晚于学位授予日期的日期，不能出现签章平台二维码；独立研究、审核验证及责任承诺由作者核实。","risk":"代选声明、学位类别或导师信息可能形成不实内容。","reason":"实际使用情况、身份及选择需要作者确认，文档文字不能代替事实证明。"},"audit":{"status":"unsupported","notification":"never","roles":["ai_declaration"],"when":[],"tests":null,"reason":"用户复核决定不处理：保留已识别原文及来源，不检查、不修改、不批注。","requires":["author_attestation","external_metadata","human_visual_review"],"policy_refs":[]}}
```

</details>

<a id="ustc-innov-01"></a>

### USTC-INNOV-01 · 模板说明清理（并入CLEAN-01）

服务分类：不独立执行学位／说明页对应检查；原文保留归档。

统一模板说明清理：仅匹配已知官方模板说明文本；匹配上就删除说明文本，未匹配不处理。不检查学位类别、说明页是否应有、是否缺失或类型对应，不删除作者撰写的创新说明。

来源：官方模板“博士创新性说明及填写说明”。实际匹配删除统一由CLEAN-01承载；通用删除器尚待实现，不声称当前已能自动删除。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-INNOV-01","title":"博士创新性说明的条件","authority":"required","sources":["B076","B077","B084","B085","B086","B091","B098"],"selector":{"roles":["document"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"innovation.kind","op":"eq_fact","value":"context.required_innovation_kind"}]},"requires":["semantic_roles","external_metadata"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：学术博士使用“创新性说明”；工程博士、专业博士使用“创新性及应用性说明”；硕士无需此页。只能依据已确认学位类型检查，不能从正文猜测并删除页面。","risk":"改写日期、类别或导师信息可能与正式学籍及授予信息不一致。","reason":"统一模板说明清理：仅匹配已知官方模板说明文本；匹配上就删除说明文本，未匹配不处理。不检查学位类别、说明页是否应有、是否缺失或类型对应，不删除作者撰写的创新说明。"},"audit":{"status":"unsupported","notification":"never","roles":["document"],"when":[],"tests":null,"reason":"用户合并决定：统一模板说明清理：仅匹配已知官方模板说明文本；匹配上就删除说明文本，未匹配不处理。不检查学位类别、说明页是否应有、是否缺失或类型对应，不删除作者撰写的创新说明。","requires":["text"],"policy_refs":[]}}
```

</details>

<a id="ustc-innov-02"></a>

### USTC-INNOV-02 · 博士说明字数

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

博士创新性或创新性及应用性说明为200至400字；字数口径由作者确认后检查，观点与成果内容由作者按下一条核实。

来源：官方模板“博士创新性说明及填写说明”。性质：校方要求。对象：`innovation_body`。按服务分类决定是否检查与批注，不自动代改。

计数口径已明确：一个汉字或英文字母各计一字；200至400字含边界，范围外提示，不自动增删说明内容。剩余仅为说明正文边界定位、排除模板提示及混排计数接入，不是规范模糊。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-INNOV-02","title":"博士说明字数","authority":"required","sources":["B077","B085","B086"],"selector":{"roles":["innovation_body"],"confidence":"confirmed","mode":"document_group"},"when":[{"fact":"context.degree_level","op":"eq","value":"doctor"}],"check":{"kind":"assertions","tests":[{"fact":"length.reviewed_character_count","op":"between","value":[200,400]}]},"requires":["author_confirmed_count_policy","semantic_roles"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"创新性说明正文为{actual}字，未在200至400字范围内。一个汉字或英文字母各计一字；请调整说明篇幅，程序不代写或删减内容。","risk":"为了达到字数而自动增删内容可能改变论证或删掉必要信息。","reason":"计数口径已明确：一个汉字或英文字母各计一字；200至400字含边界，范围外提示，不自动增删说明内容。剩余仅为说明正文边界定位、排除模板提示及混排计数接入，不是规范模糊。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["innovation_body"],"when":[],"tests":null,"reason":"计数口径已明确：一个汉字或英文字母各计一字；200至400字含边界，范围外提示，不自动增删说明内容。剩余仅为说明正文边界定位、排除模板提示及混排计数接入，不是规范模糊。","requires":["author_confirmed_count_policy","semantic_roles"],"policy_refs":[]}}
```

</details>

<a id="ustc-innov-03"></a>

### USTC-INNOV-03 · 博士创新性内容审查

服务分类：不检查、不批注（保留规范记录）。执行范围：没有可执行的明确检查条件，或依赖内容语义/主观判断；保留已辨认的规范，不执行检查、不自动修复、不写批注。

学术博士说明应体现独立从事科学研究的能力及所在领域创造性成果；工程或专业博士聚焦实践和应用研究，体现创新性、实践性、应用性、基础理论与专门知识、独立承担实践工作的能力，以及对领域知识和技术发展的贡献。

来源：官方模板“博士创新性说明及填写说明”。性质：校方要求。对象：`innovation_body`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-INNOV-03","title":"博士创新性内容审查","authority":"required","sources":["B077","B085","B086"],"selector":{"roles":["innovation_body"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["学术博士：独立研究能力及创造性成果明确","工程或专业博士：实践应用创新及领域贡献明确；不适用的类别不要求同时满足"]},"requires":["external_metadata","human_review"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：学术博士说明应体现独立从事科学研究的能力及所在领域创造性成果；工程或专业博士聚焦实践和应用研究，体现创新性、实践性、应用性、基础理论与专门知识、独立承担实践工作的能力，以及对领域知识和技术发展的贡献。","risk":"改写日期、类别或导师信息可能与正式学籍及授予信息不一致。","reason":"需要已确认的外部资料；资料缺失或不能对应时无法安全判断和代填。"},"audit":{"status":"unsupported","notification":"never","roles":["innovation_body"],"when":[],"tests":null,"reason":"没有可执行的明确检查条件，或依赖内容语义/主观判断；保留已辨认的规范，不执行检查、不自动修复、不写批注。","requires":["external_metadata","human_review"],"policy_refs":[]}}
```

</details>

<a id="ustc-clean-01"></a>

### USTC-CLEAN-01 · 删除模板说明文字

服务边界：统一模板说明清理：仅匹配已知官方模板说明文本；匹配上就删除说明文本，未匹配不处理。不检查学位类别、说明页是否应有、是否缺失或类型对应，不删除作者撰写的创新说明。

自动删除是当前明确的目标能力；现行仅有局部残留识别，尚缺完整匹配删除器，不以此文档变更冒充实现。来源：官方模板各处明确“使用时请删除此说明”的说明文本。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-CLEAN-01","title":"删除模板说明文字","authority":"required","sources":["B048","B065","B091","B222","B379","B424"],"selector":{"roles":["template_instruction"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["匹配已知官方模板说明文本并删除匹配的说明，未匹配不处理"]},"requires":["semantic_roles","text","human_review"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"匹配到的模板说明应由通用清理器删除；不核作者填写内容，不替换姓名、题名或成果内容。","risk":"仅处理已确认的具体差异；对象、条件或关联不明确时跳过，不改写事实内容。","reason":"统一模板说明清理：仅匹配已知官方模板说明文本；匹配上就删除说明文本，未匹配不处理。不检查学位类别、说明页是否应有、是否缺失或类型对应，不删除作者撰写的创新说明。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["document"],"when":[],"tests":[{"fact":"template.residual_count","op":"eq","value":0}],"reason":"统一模板说明清理：仅匹配已知官方模板说明文本；匹配上就删除说明文本，未匹配不处理。不检查学位类别、说明页是否应有、是否缺失或类型对应，不删除作者撰写的创新说明。","requires":["semantic_roles","text"],"policy_refs":[]}}
```

</details>

<a id="ustc-cover-02"></a>

### USTC-COVER-02 · 学位类别和导师信息

服务分类：不检查、不批注（保留规范记录）。执行范围：用户复核决定不处理：保留已识别原文及来源，不检查、不修改、不批注。

封面及题名页的博士/硕士、学术/专业均按本人实际学位二选一；导师信息须与学籍系统严格一致。工程类硕博实践导师必填，其他专业硕博按模板说明选填，无则删去；工程类条件优先，不能因同时属于专业学位而误判可不填。

来源：官方模板“封面填写说明”；官方模板“题名页填写说明”。性质：校方要求。对象：`cover, title_page`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-COVER-02","title":"学位类别和导师信息","authority":"required","sources":["B004","B012","B013","B021","B022","B030"],"selector":{"roles":["cover","title_page"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["学位层次与类型已确认且选项唯一","导师信息与学籍系统一致","工程类实践导师必填；其他适用情形无则删去"]},"requires":["external_metadata","author_attestation","human_review"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：封面及题名页的博士/硕士、学术/专业均按本人实际学位二选一；导师信息须与学籍系统严格一致。工程类硕博实践导师必填，其他专业硕博按模板说明选填，无则删去；工程类条件优先，不能因同时属于专业学位而误判可不填。","risk":"代选声明、学位类别或导师信息可能形成不实内容。","reason":"实际使用情况、身份及选择需要作者确认，文档文字不能代替事实证明。"},"audit":{"status":"unsupported","notification":"never","roles":["cover","title_page"],"when":[],"tests":null,"reason":"用户复核决定不处理：保留已识别原文及来源，不检查、不修改、不批注。","requires":["external_metadata","author_attestation","human_review"],"policy_refs":[]}}
```

</details>

<a id="ustc-cover-03"></a>

### USTC-COVER-03 · 题名页中英文题名和字号弹性

服务分类：不检查、不批注（保留规范记录）。执行范围：用户复核决定不处理：保留已识别原文及来源，不检查、不修改、不批注。

题名页中英文题名都需填写；可根据题名长短调整字号，确保整齐美观。没有固定字号硬约束，禁止把模板题名样本字号写成学校标准。

来源：官方模板“题名页填写说明”。性质：校方要求。对象：`title_page`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-COVER-03","title":"题名页中英文题名和字号弹性","authority":"required","sources":["B024"],"selector":{"roles":["title_page"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["中英文题名均已填","题名字号和布局适当"]},"requires":["human_visual_review"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：题名页中英文题名都需填写；可根据题名长短调整字号，确保整齐美观。没有固定字号硬约束，禁止把模板题名样本字号写成学校标准。","risk":"修改图片、签名或图表内部文字可能损坏原始信息。","reason":"需对可见图形或原始资料作人工核验，不能把OCR或对象外框当成可靠事实。"},"audit":{"status":"unsupported","notification":"never","roles":["title_page"],"when":[],"tests":null,"reason":"用户复核决定不处理：保留已识别原文及来源，不检查、不修改、不批注。","requires":["human_visual_review"],"policy_refs":[]}}
```

</details>

## 二、摘要、目录和前置清单

<a id="ustc-abstract-01"></a>

### USTC-ABSTRACT-01 · 摘要内容与独立性

服务分类：不检查、不批注（保留规范记录）。执行范围：没有可执行的明确检查条件，或依赖内容语义/主观判断；保留已辨认的规范，不执行检查、不自动修复、不写批注。

摘要应准确、简明、自明，概括目的、方法、结果和结论，重点在结果和结论；与正文一致。

来源：官方模板§1.1.1 常见内容问题；官方模板§1.2 提高学位论文的规范性；官方模板§2.5 摘要和关键词。性质：校方要求。对象：`abstract_body`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-ABSTRACT-01","title":"摘要内容与独立性","authority":"required","sources":["B229","B233","B263"],"selector":{"roles":["abstract_body"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["无需阅读全文即可获得必要信息","目的方法结果结论准确，重点突出结果结论","不与正文矛盾或用引言结论原样重复"]},"requires":["human_review"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：摘要应准确、简明、自明，概括目的、方法、结果和结论，重点在结果和结论；与正文一致。","risk":"自动改写可能改变学术含义、符号用途或作者的真实陈述。","reason":"这项要求依赖语义和实际内容判断，程序只列出核对事项，不能替作者决定。"},"audit":{"status":"unsupported","notification":"never","roles":["abstract_body"],"when":[],"tests":null,"reason":"没有可执行的明确检查条件，或依赖内容语义/主观判断；保留已辨认的规范，不执行检查、不自动修复、不写批注。","requires":["human_review"],"policy_refs":[]}}
```

</details>

<a id="ustc-abstract-02"></a>

### USTC-ABSTRACT-02 · 摘要中的特殊内容

服务分类：不检查、不批注（保留规范记录）。执行范围：没有可执行的明确检查条件，或依赖内容语义/主观判断；保留已辨认的规范，不执行检查、不自动修复、不写批注。

摘要不引用文献；不宜使用公式、图表、化学结构式、非公知符号和术语。“不宜”项作建议处理，文献引用禁令单独由下一规则检查。

来源：官方模板§1.1.1 常见内容问题；官方模板§2.5 摘要和关键词。性质：校方建议。对象：`abstract_body`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-ABSTRACT-02","title":"摘要中的特殊内容","authority":"advisory","sources":["B229","B264"],"selector":{"roles":["abstract_body"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["检查公式图表化学结构式是否确有必要","非公知符号术语能否改为自明表述"]},"requires":["human_review"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：摘要不引用文献；不宜使用公式、图表、化学结构式、非公知符号和术语。“不宜”项作建议处理，文献引用禁令单独由下一规则检查。","risk":"自动改写可能改变学术含义、符号用途或作者的真实陈述。","reason":"这项要求依赖语义和实际内容判断，程序只列出核对事项，不能替作者决定。"},"audit":{"status":"unsupported","notification":"never","roles":["abstract_body"],"when":[],"tests":null,"reason":"没有可执行的明确检查条件，或依赖内容语义/主观判断；保留已辨认的规范，不执行检查、不自动修复、不写批注。","requires":["human_review"],"policy_refs":[]}}
```

</details>

<a id="ustc-abstract-03"></a>

### USTC-ABSTRACT-03 · 摘要不引用文献

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

摘要中不得引用文献；识别明确的引文对象后检查，普通方括号、年份或数学标记不直接认作引文。

来源：官方模板§2.5 摘要和关键词。性质：校方要求。对象：`abstract_body`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-ABSTRACT-03","title":"摘要不引用文献","authority":"required","sources":["B264"],"selector":{"roles":["abstract_body"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"citations.confirmed_count","op":"eq","value":0}]},"requires":["semantic_roles","citation_links"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：摘要中不得引用文献；识别明确的引文对象后检查，普通方括号、年份或数学标记不直接认作引文。","risk":"自动改文字、序号或关联关系可能误改真实内容并破坏交叉引用。","reason":"本规则只授权检查；发现差异后需确认对象及关联，再由作者修改相关内容。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["abstract_body"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","citation_links"],"policy_refs":[]}}
```

</details>

<a id="ustc-abstract-04"></a>

### USTC-ABSTRACT-04 · 中文论文摘要顺序

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

中文论文先中文摘要后英文摘要；两种摘要内容和段落相互呼应。此顺序只适用于中文论文。

来源：官方模板§2.5 摘要和关键词。性质：校方要求。对象：`document`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-ABSTRACT-04","title":"中文论文摘要顺序","authority":"required","sources":["B264"],"selector":{"roles":["document"],"confidence":"confirmed","mode":"document_group"},"when":[{"fact":"context.thesis_language","op":"eq","value":"zh"}],"check":{"kind":"assertions","tests":[{"fact":"abstract.language_order","op":"eq","value":["zh","en"]}]},"requires":["semantic_roles","external_metadata"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：中文论文先中文摘要后英文摘要；两种摘要内容和段落相互呼应。此顺序只适用于中文论文。","risk":"改写日期、类别或导师信息可能与正式学籍及授予信息不一致。","reason":"需要已确认的外部资料；资料缺失或不能对应时无法安全判断和代填。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["document"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","external_metadata"],"policy_refs":[]}}
```

</details>

<a id="ustc-abstract-05"></a>

### USTC-ABSTRACT-05 · 双语摘要及关键词对应

服务分类：不检查、不批注（保留规范记录）。执行范围：双语摘要、段落和关键词的含义是否对应属于内容语义判断，本服务不检查、不批注。

两种语言的摘要内容与段落、关键词须相互呼应；不能机械翻译或按段落数相等认定语义一致。

来源：官方模板§2.5 摘要和关键词。性质：校方要求。对象：`abstract_group`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-ABSTRACT-05","title":"双语摘要及关键词对应","authority":"required","sources":["B264","B266"],"selector":{"roles":["abstract_group"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["双语内容及段落对应","双语关键词含义对应"]},"requires":["human_review"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：两种语言的摘要内容与段落、关键词须相互呼应；不能机械翻译或按段落数相等认定语义一致。","risk":"自动改写可能改变学术含义、符号用途或作者的真实陈述。","reason":"这项要求依赖语义和实际内容判断，程序只列出核对事项，不能替作者决定。"},"audit":{"status":"unsupported","notification":"never","roles":["abstract_group"],"when":[],"tests":null,"reason":"双语摘要、段落和关键词的含义是否对应属于内容语义判断，本服务不检查、不批注。","requires":["human_review"],"policy_refs":[]}}
```

</details>

<a id="ustc-abstract-06"></a>

### USTC-ABSTRACT-06 · 中文摘要篇幅建议

服务分类：可检查的建议；仅明确不符合时批注，不修改。执行范围：中文博士摘要仅在汉字数低于800时提醒；原文800—1000的建议范围保留，超过1000不自动批注。

中文论文博士中文摘要一般800—1000个汉字，硕士一般600个汉字；英文篇幅参照中文。硕士600为建议参考值，不据此要求恰好600。

来源：官方模板§2.5 摘要和关键词。性质：校方建议。对象：`abstract_zh_body`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-ABSTRACT-06","title":"中文摘要篇幅建议","authority":"advisory","sources":["B264"],"selector":{"roles":["abstract_zh_body"],"confidence":"confirmed","mode":"document_group"},"when":[{"fact":"context.thesis_language","op":"eq","value":"zh"},{"fact":"context.degree_level","op":"eq","value":"doctor"}],"check":{"kind":"assertions","tests":[{"fact":"length.han_count","op":"between","value":[800,1000]}]},"requires":["semantic_roles","han_count"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"本中文博士摘要的汉字数低于建议下限800个。请结合论文实际情况酌情补充；这属于篇幅建议，不是硬性格式错误，程序不会代写内容。","risk":"自动改文字、序号或关联关系可能误改真实内容并破坏交叉引用。","reason":"本规则只授权检查；发现差异后需确认对象及关联，再由作者修改相关内容。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["abstract_zh_body"],"when":[],"tests":[{"fact":"length.han_count","op":"gte","value":800}],"reason":"中文博士摘要仅在汉字数低于800时提醒；原文800—1000的建议范围保留，超过1000不自动批注。","requires":["semantic_roles","han_count"],"policy_refs":[]}}
```

</details>

<a id="ustc-abstract-07"></a>

### USTC-ABSTRACT-07 · 硕士及英文摘要篇幅建议

服务分类：可检查的建议；仅明确不符合时批注，不修改。执行范围：只检查中文硕士摘要汉字数低于600；英文摘要篇幅是否与中文相称不检查、不批注。

硕士中文摘要一般600个汉字，英文摘要篇幅参照中文摘要；不擅设模板未提供的容差区间。

来源：官方模板§2.5 摘要和关键词。性质：校方建议。对象：`abstract_group`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-ABSTRACT-07","title":"硕士及英文摘要篇幅建议","authority":"advisory","sources":["B264"],"selector":{"roles":["abstract_group"],"confidence":"confirmed","mode":"document_group"},"when":[{"fact":"context.thesis_language","op":"eq","value":"zh"}],"check":{"kind":"review","items":["如为硕士，显示中文摘要汉字数并参照600字建议；博士不适用此子项","对照中文摘要检查英文摘要篇幅"]},"requires":["human_review"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"本中文硕士摘要的汉字数低于一般600个汉字的建议值。请结合论文实际情况酌情补充；程序不会自动改写摘要。","risk":"自动改写可能改变学术含义、符号用途或作者的真实陈述。","reason":"这项要求依赖语义和实际内容判断，程序只列出核对事项，不能替作者决定。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["abstract_zh_body"],"when":[{"fact":"context.degree_level","op":"eq","value":"master"}],"tests":[{"fact":"length.han_count","op":"gte","value":600}],"reason":"只检查中文硕士摘要汉字数低于600；英文摘要篇幅是否与中文相称不检查、不批注。","requires":["semantic_roles","han_count"],"policy_refs":[]}}
```

</details>

<a id="ustc-abstract-08"></a>

### USTC-ABSTRACT-08 · 外文论文摘要顺序

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

外文论文先用论文同种语言写外文摘要，中文摘要置后并标中文关键词；与中文论文规则分支互斥。

来源：官方模板§2.5 摘要和关键词。性质：校方要求。对象：`document`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-ABSTRACT-08","title":"外文论文摘要顺序","authority":"required","sources":["B267"],"selector":{"roles":["document"],"confidence":"confirmed","mode":"document_group"},"when":[{"fact":"context.thesis_language","op":"neq","value":"zh"}],"check":{"kind":"assertions","tests":[{"fact":"abstract.language_order","op":"eq_fact","value":"context.foreign_then_chinese"},{"fact":"abstract.chinese_keywords_present","op":"eq","value":true}]},"requires":["semantic_roles","external_metadata"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：外文论文先用论文同种语言写外文摘要，中文摘要置后并标中文关键词；与中文论文规则分支互斥。","risk":"改写日期、类别或导师信息可能与正式学籍及授予信息不一致。","reason":"需要已确认的外部资料；资料缺失或不能对应时无法安全判断和代填。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["document"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","external_metadata"],"policy_refs":[]}}
```

</details>

<a id="ustc-abstract-09"></a>

### USTC-ABSTRACT-09 · 外文论文中文摘要篇幅建议

服务分类：可检查的建议；仅明确不符合时批注，不修改。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

外文论文中文摘要宜不少于5000字；这不是中文论文摘要的篇幅要求。

来源：官方模板§2.5 摘要和关键词。性质：校方建议。对象：`abstract_zh_body`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-ABSTRACT-09","title":"外文论文中文摘要篇幅建议","authority":"advisory","sources":["B267"],"selector":{"roles":["abstract_zh_body"],"confidence":"confirmed","mode":"document_group"},"when":[{"fact":"context.thesis_language","op":"neq","value":"zh"}],"check":{"kind":"assertions","tests":[{"fact":"length.reviewed_character_count","op":"gte","value":5000}]},"requires":["semantic_roles","author_confirmed_count_policy"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：外文论文中文摘要宜不少于5000字；这不是中文论文摘要的篇幅要求。","risk":"为了达到字数而自动增删内容可能改变论证或删掉必要信息。","reason":"字数口径需先确认，内容增删必须由作者决定，程序只提供计数和提示。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["abstract_zh_body"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","author_confirmed_count_policy"],"policy_refs":[]}}
```

</details>

<a id="ustc-abstract-10"></a>

### USTC-ABSTRACT-10 · 中文摘要标题

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

“摘要”用黑体三号，居中，单倍行距，段前24磅、段后18磅。

来源：官方模板§2.5 摘要和关键词。性质：校方要求。对象：`abstract_zh_heading`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-ABSTRACT-10","title":"中文摘要标题","authority":"required","sources":["B265"],"selector":{"roles":["abstract_zh_heading"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"text.exact":"摘要","font.eastAsia":"黑体","size.pt":16,"paragraph.align":"center","paragraph.line":{"mode":"single"},"paragraph.before.pt":24,"paragraph.after.pt":18}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"font.eastAsia":"黑体","size.pt":16,"paragraph.align":"center","paragraph.line":{"mode":"single"},"paragraph.before.pt":24,"paragraph.after.pt":18},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“中文摘要标题”调整：{changes_zh}。“摘要”用黑体三号，居中，单倍行距，段前24磅、段后18磅。","action":"“摘要”用黑体三号，居中，单倍行距，段前24磅、段后18磅。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["abstract_zh_heading"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-abstract-11"></a>

### USTC-ABSTRACT-11 · 英文摘要标题

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

“ABSTRACT”用Arial三号、加粗，居中，单倍行距，段前24磅、段后18磅。

来源：官方模板§2.5 摘要和关键词。性质：校方要求。对象：`abstract_en_heading`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-ABSTRACT-11","title":"英文摘要标题","authority":"required","sources":["B266"],"selector":{"roles":["abstract_en_heading"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"text.exact":"ABSTRACT","font.latin":"Arial","size.pt":16,"font.bold":true,"paragraph.align":"center","paragraph.line":{"mode":"single"},"paragraph.before.pt":24,"paragraph.after.pt":18}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"font.latin":"Arial","size.pt":16,"font.bold":true,"paragraph.align":"center","paragraph.line":{"mode":"single"},"paragraph.before.pt":24,"paragraph.after.pt":18,"text.exact":"ABSTRACT"},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“英文摘要标题”调整：{changes_zh}。“ABSTRACT”用Arial三号、加粗，居中，单倍行距，段前24磅、段后18磅。","action":"“ABSTRACT”用Arial三号、加粗，居中，单倍行距，段前24磅、段后18磅。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["abstract_en_heading"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-abstract-12"></a>

### USTC-ABSTRACT-12 · 中文摘要正文格式

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

中文摘要小四号宋体，两端对齐，固定行距20磅，段前段后0磅。这里不从正文规则推导摘要首行缩进或另加西文字体约束。

来源：官方模板§2.5 摘要和关键词。性质：校方要求。对象：`abstract_zh_body`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-ABSTRACT-12","title":"中文摘要正文格式","authority":"required","sources":["B265"],"selector":{"roles":["abstract_zh_body"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"font.eastAsia":"宋体","size.pt":12,"paragraph.line":{"mode":"exact","pt":20},"paragraph.before.pt":0,"paragraph.after.pt":0,"paragraph.align":"both"}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"font.eastAsia":"宋体","size.pt":12,"paragraph.line":{"mode":"exact","pt":20},"paragraph.before.pt":0,"paragraph.after.pt":0,"paragraph.align":"both"},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“中文摘要正文格式”调整：{changes_zh}。中文摘要小四号宋体，两端对齐，固定行距20磅，段前段后0磅。这里不从正文规则推导摘要首行缩进或另加西文字体约束。","action":"中文摘要小四号宋体，两端对齐，固定行距20磅，段前段后0磅。这里不从正文规则推导摘要首行缩进或另加西文字体约束。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["abstract_zh_body"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-abstract-14"></a>

### USTC-ABSTRACT-14 · 英文摘要正文格式

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

英文摘要小四号Times New Roman，两端对齐，固定行距20磅，段前段后0磅。

来源：官方模板§2.5 摘要和关键词。性质：校方要求。对象：`abstract_en_body`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-ABSTRACT-14","title":"英文摘要正文格式","authority":"required","sources":["B266"],"selector":{"roles":["abstract_en_body"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"font.latin":"Times New Roman","size.pt":12,"paragraph.line":{"mode":"exact","pt":20},"paragraph.before.pt":0,"paragraph.after.pt":0,"paragraph.align":"both"}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"font.latin":"Times New Roman","size.pt":12,"paragraph.line":{"mode":"exact","pt":20},"paragraph.before.pt":0,"paragraph.after.pt":0,"paragraph.align":"both"},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“英文摘要正文格式”调整：{changes_zh}。英文摘要小四号Times New Roman，两端对齐，固定行距20磅，段前段后0磅。","action":"英文摘要小四号Times New Roman，两端对齐，固定行距20磅，段前段后0磅。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["abstract_en_body"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-abstract-13"></a>

### USTC-ABSTRACT-13 · 英文摘要标点

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：只检查普通英文摘要标点并替换为英文半角；公式、引用名称、嵌入中文等特殊区域不检查、不标记。

执行边界：英文摘要普通叙述中存在非英文半角标点：{failed_items_zh}。可安全定位时替换，特殊区域保持原样。

英文摘要使用英文标点；公式、引用名称、嵌入中文等特殊区域需人工核实，避免全局替换损坏内容。

来源：官方模板§2.5 摘要和关键词。性质：校方要求。对象：`abstract_en_body`。执行以本条服务分类与结构化修复权限为准。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-ABSTRACT-13","title":"英文摘要标点","authority":"required","sources":["B266"],"selector":{"roles":["abstract_en_body"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["普通英文叙述采用英文标点","特殊区域不被误替换"]},"requires":["semantic_roles","text","human_review"],"fix":{"permission":"guarded_transform","target":{"operation":"english_punctuation_to_halfwidth"},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已调整{changes_zh}。","action":"英文摘要普通叙述中存在非英文半角标点：{failed_items_zh}。可安全定位时替换，特殊区域保持原样。","risk":"仅处理已确认的具体差异；对象、条件或关联不明确时跳过，不改写事实内容。","reason":"只检查普通英文摘要标点并替换为英文半角；公式、引用名称、嵌入中文等特殊区域不检查、不标记。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["abstract_en_body"],"when":[],"tests":[{"fact":"punctuation.english_halfwidth_valid","op":"eq","value":true}],"reason":"只检查普通英文摘要标点并替换为英文半角；公式、引用名称、嵌入中文等特殊区域不检查、不标记。","requires":["semantic_roles","text","protected_text_spans"],"policy_refs":[]}}
```

</details>

<a id="ustc-keyword-01"></a>

### USTC-KEYWORD-01 · 关键词数量

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

每篇论文选3—8个关键词。按已确认的关键词条目计数，不能直接按所有逗号切分术语。

来源：官方模板§2.5 摘要和关键词。性质：校方要求。对象：`keywords_zh`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-KEYWORD-01","title":"关键词数量","authority":"required","sources":["B265"],"selector":{"roles":["keywords_zh"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"keywords.confirmed_count","op":"between","value":[3,8]}]},"requires":["semantic_roles","keyword_items"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：每篇论文选3—8个关键词。按已确认的关键词条目计数，不能直接按所有逗号切分术语。","risk":"自动改文字、序号或关联关系可能误改真实内容并破坏交叉引用。","reason":"本规则只授权检查；发现差异后需确认对象及关联，再由作者修改相关内容。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["keywords_zh"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","keyword_items"],"policy_refs":[]}}
```

</details>

<a id="ustc-keyword-02"></a>

### USTC-KEYWORD-02 · 中文关键词格式

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

中文关键词小四号宋体，固定行距20磅，左对齐，悬挂缩进4个字符；“关键词：”本身加粗。

来源：官方模板§2.5 摘要和关键词。性质：校方要求。对象：`keywords_zh`。满足安全前提时可修复明确属性。

处理边界：只自动改已定位标签的加粗及已有关键词格式；缺失／异常标签文字只提示，不补写。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-KEYWORD-02","title":"中文关键词格式","authority":"required","sources":["B265"],"selector":{"roles":["keywords_zh"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"font.eastAsia":"宋体","size.pt":12,"paragraph.line":{"mode":"exact","pt":20},"paragraph.align":"left","paragraph.hanging.char":4,"label.text":"关键词：","label.bold":true}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"font.eastAsia":"宋体","size.pt":12,"paragraph.line":{"mode":"exact","pt":20},"paragraph.align":"left","paragraph.hanging.char":4,"label.bold":true},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“中文关键词格式”调整：{changes_zh}。中文关键词小四号宋体，固定行距20磅，左对齐，悬挂缩进4个字符；“关键词：”本身加粗。","action":"中文关键词小四号宋体，固定行距20磅，左对齐，悬挂缩进4个字符；“关键词：”本身加粗。","risk":"批量修改可能影响分页；请复核预览。","reason":"只自动改已定位标签的加粗及已有关键词格式；缺失／异常标签文字只提示，不补写。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["keywords_zh"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。 修复边界：只自动改已定位标签的加粗及已有关键词格式；缺失／异常标签文字只提示，不补写。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-keyword-03"></a>

### USTC-KEYWORD-03 · 英文关键词格式

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

英文关键词小四号Times New Roman，固定行距20磅，左对齐，悬挂缩进6.5个字符；“KEYWORDS:”大写加粗。

来源：官方模板§2.5 摘要和关键词。性质：校方要求。对象：`keywords_en`。满足安全前提时可修复明确属性。

处理边界：只自动改已定位标签的加粗及已有关键词格式；标签字面问题只提示，不猜改专名或词项。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-KEYWORD-03","title":"英文关键词格式","authority":"required","sources":["B266"],"selector":{"roles":["keywords_en"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"font.latin":"Times New Roman","size.pt":12,"paragraph.line":{"mode":"exact","pt":20},"paragraph.align":"left","paragraph.hanging.char":6.5,"label.text":"KEYWORDS:","label.bold":true}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"font.latin":"Times New Roman","size.pt":12,"paragraph.line":{"mode":"exact","pt":20},"paragraph.align":"left","paragraph.hanging.char":6.5,"label.bold":true},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“英文关键词格式”调整：{changes_zh}。英文关键词小四号Times New Roman，固定行距20磅，左对齐，悬挂缩进6.5个字符；“KEYWORDS:”大写加粗。","action":"英文关键词小四号Times New Roman，固定行距20磅，左对齐，悬挂缩进6.5个字符；“KEYWORDS:”大写加粗。","risk":"批量修改可能影响分页；请复核预览。","reason":"只自动改已定位标签的加粗及已有关键词格式；标签字面问题只提示，不猜改专名或词项。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["keywords_en"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。 修复边界：只自动改已定位标签的加粗及已有关键词格式；标签字面问题只提示，不猜改专名或词项。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-keyword-04"></a>

### USTC-KEYWORD-04 · 关键词分隔和首字母

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

中文关键词之间用分号；英文关键词之间用半角逗号加空格，每个英文关键词第一个字母大写。对专名、符号开头等歧义保留人工审查。

来源：官方模板§2.5 摘要和关键词。性质：校方要求。对象：`keyword_group`。按服务分类决定是否检查与批注，不自动代改。

处理边界：仅词项边界明确的分隔符／空格列为安全格式目标；首字母及专名改写只提示，不计自动改写欠账。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-KEYWORD-04","title":"关键词分隔和首字母","authority":"required","sources":["B265","B266"],"selector":{"roles":["keyword_group"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"keywords.zh_separator","op":"in","value":["；",";"]},{"fact":"keywords.en_separator","op":"eq","value":", "},{"fact":"keywords.en_initial_letters_uppercase","op":"eq","value":true}]},"requires":["keyword_items","semantic_roles"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：中文关键词之间用分号；英文关键词之间用半角逗号加空格，每个英文关键词第一个字母大写。对专名、符号开头等歧义保留人工审查。","risk":"自动改文字、序号或关联关系可能误改真实内容并破坏交叉引用。","reason":"仅词项边界明确的分隔符／空格列为安全格式目标；首字母及专名改写只提示，不计自动改写欠账。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["keyword_group"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。 修复边界：仅词项边界明确的分隔符／空格列为安全格式目标；首字母及专名改写只提示，不计自动改写欠账。","requires":["keyword_items","semantic_roles"],"policy_refs":[]}}
```

</details>

<a id="ustc-keyword-05"></a>

### USTC-KEYWORD-05 · 关键词与摘要同页

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

关键词与对应摘要同页，间隔一行。需要真实排版页码和行几何信息，DOCX XML或缓存分页不足以确认。

来源：官方模板§2.5 摘要和关键词。性质：校方要求。对象：`keyword_group`。按服务分类决定是否检查与批注，不自动代改。

处理边界：同页及空一行问题确定检出后只提示，不把自动搬关键词、合并段落、插删分页列为修复欠账。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-KEYWORD-05","title":"关键词与摘要同页","authority":"required","sources":["B265","B266"],"selector":{"roles":["keyword_group"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"layout.same_page_as_abstract_end","op":"eq","value":true},{"fact":"layout.blank_lines_after_abstract","op":"eq","value":1}]},"requires":["layout_adapter","semantic_roles"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：关键词与对应摘要同页，间隔一行。需要真实排版页码和行几何信息，DOCX XML或缓存分页不足以确认。","risk":"移动对象、插页或重编号可能改变分页、引用关系或图表位置。","reason":"同页及空一行问题确定检出后只提示，不把自动搬关键词、合并段落、插删分页列为修复欠账。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["keyword_group"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。 修复边界：同页及空一行问题确定检出后只提示，不把自动搬关键词、合并段落、插删分页列为修复欠账。","requires":["layout_adapter","semantic_roles"],"policy_refs":[]}}
```

</details>

<a id="ustc-toc-01"></a>

### USTC-TOC-01 · 目录范围和字段

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

目录由章、节、附录等序号、名称和页码组成，一般从正文第1章引言或绪论开始；目录之前内容及目录本身不列入。目录项需对照真实标题和页码。

来源：官方模板§2.6 目录。性质：校方要求。对象：`toc`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-TOC-01","title":"目录范围和字段","authority":"required","sources":["B269"],"selector":{"roles":["toc"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"toc.includes_pre_toc_or_self","op":"eq","value":false},{"fact":"toc.entries_match_headings_and_pages","op":"eq","value":true}]},"requires":["semantic_roles","field_links","layout_adapter"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：目录由章、节、附录等序号、名称和页码组成，一般从正文第1章引言或绪论开始；目录之前内容及目录本身不列入。目录项需对照真实标题和页码。","risk":"移动对象、插页或重编号可能改变分页、引用关系或图表位置。","reason":"这项要求需要真实版面或关系确认；仅凭XML与缓存页码不能安全代改。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["toc"],"when":[],"tests":[{"fact":"toc.includes_pre_toc_or_self","op":"eq","value":false},{"fact":"toc.entries_match_headings_and_pages","op":"eq","value":true},{"fact":"toc.heading_targets_exist","op":"eq","value":true}],"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","field_links","layout_adapter"],"policy_refs":[]}}
```

</details>

<a id="ustc-toc-02"></a>

### USTC-TOC-02 · 目录标题

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

“目录”标题为黑体三号，居中，单倍行距，段前24磅、段后18磅。

来源：官方模板§2.6 目录。性质：校方要求。对象：`toc_heading`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-TOC-02","title":"目录标题","authority":"required","sources":["B269"],"selector":{"roles":["toc_heading"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"font.eastAsia":"黑体","size.pt":16,"paragraph.align":"center","paragraph.line":{"mode":"single"},"paragraph.before.pt":24,"paragraph.after.pt":18}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"font.eastAsia":"黑体","size.pt":16,"paragraph.align":"center","paragraph.line":{"mode":"single"},"paragraph.before.pt":24,"paragraph.after.pt":18},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“目录标题”调整：{changes_zh}。“目录”标题为黑体三号，居中，单倍行距，段前24磅、段后18磅。","action":"“目录”标题为黑体三号，居中，单倍行距，段前24磅、段后18磅。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["toc_heading"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-toc-03"></a>

### USTC-TOC-03 · 目录章级条目

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

目录章标题行小四号，中文黑体、英文数字Arial，固定行距20磅，段前6磅、段后0磅，居左。

来源：官方模板§2.6 目录。性质：校方要求。对象：`toc_chapter_entry`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-TOC-03","title":"目录章级条目","authority":"required","sources":["B270","B271"],"selector":{"roles":["toc_chapter_entry"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"font.eastAsia":"黑体","font.latin":"Arial","size.pt":12,"paragraph.line":{"mode":"exact","pt":20},"paragraph.before.pt":6,"paragraph.after.pt":0,"paragraph.left.char":0,"paragraph.align":"left"}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"font.eastAsia":"黑体","font.latin":"Arial","size.pt":12,"paragraph.line":{"mode":"exact","pt":20},"paragraph.before.pt":6,"paragraph.after.pt":0,"paragraph.left.char":0,"paragraph.align":"left"},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“目录章级条目”调整：{changes_zh}。目录章标题行小四号，中文黑体、英文数字Arial，固定行距20磅，段前6磅、段后0磅，居左。","action":"目录章标题行小四号，中文黑体、英文数字Arial，固定行距20磅，段前6磅、段后0磅，居左。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["toc_chapter_entry"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-toc-04"></a>

### USTC-TOC-04 · 目录其他条目

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

目录其他条目小四号宋体，英文数字Times New Roman，行距20磅，段前段后0磅；本段未明确行距模式，仅核20磅数值，不将“固定”补写为硬要求。

来源：官方模板§2.6 目录。性质：校方要求。对象：`toc_other_entry`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-TOC-04","title":"目录其他条目","authority":"required","sources":["B270"],"selector":{"roles":["toc_other_entry"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"font.eastAsia":"宋体","font.latin":"Times New Roman","size.pt":12,"paragraph.before.pt":0,"paragraph.after.pt":0,"paragraph.line.pt":20}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"font.eastAsia":"宋体","font.latin":"Times New Roman","size.pt":12,"paragraph.before.pt":0,"paragraph.after.pt":0,"paragraph.line.pt":20},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“目录其他条目”调整：{changes_zh}。目录其他条目小四号宋体，英文数字Times New Roman，行距20磅，段前段后0磅；本段未明确行距模式，仅核20磅数值，不将“固定”补写为硬要求。","action":"目录其他条目小四号宋体，英文数字Times New Roman，行距20磅，段前段后0磅；本段未明确行距模式，仅核20磅数值，不将“固定”补写为硬要求。","risk":"批量修改可能影响分页；请复核预览。","reason":"仅在现有固定行距数值明确时改为20磅，保留原行距模式；无法测量的模式跳过。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["toc_other_entry"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-toc-05"></a>

### USTC-TOC-05 · 目录缩进

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

目录一级节条目缩进1个汉字符。

来源：官方模板§2.6 目录。性质：校方要求。对象：`toc_section1_entry`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-TOC-05","title":"目录缩进","authority":"required","sources":["B271"],"selector":{"roles":["toc_section1_entry"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"paragraph.left.char":1}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"paragraph.left.char":1},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“目录缩进”调整：{changes_zh}。目录一级节条目缩进1个汉字符。","action":"目录一级节条目缩进1个汉字符。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["toc_section1_entry"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-toc-06"></a>

### USTC-TOC-06 · 目录二级节缩进

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

目录二级节条目缩进2个汉字符；模板没有为三级节目录项规定缩进，不能自动发明。

来源：官方模板§2.6 目录。性质：校方要求。对象：`toc_section2_entry`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-TOC-06","title":"目录二级节缩进","authority":"required","sources":["B271"],"selector":{"roles":["toc_section2_entry"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"paragraph.left.char":2}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"paragraph.left.char":2},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“目录二级节缩进”调整：{changes_zh}。目录二级节条目缩进2个汉字符；模板没有为三级节目录项规定缩进，不能自动发明。","action":"目录二级节条目缩进2个汉字符；模板没有为三级节目录项规定缩进，不能自动发明。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["toc_section2_entry"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-toc-07"></a>

### USTC-TOC-07 · 目录间隔与页码对齐

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

带序号的各级目录标题，序号与题名间空一个汉字符；行末页码右顶格。一个汉字符是版式宽度，不能简单强制为一个ASCII空格。

来源：官方模板§2.6 目录。性质：校方要求。对象：`toc_entry`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-TOC-07","title":"目录间隔与页码对齐","authority":"required","sources":["B271"],"selector":{"roles":["toc_entry"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"number_title.gap.em","op":"eq","value":1},{"fact":"page_number.right_aligned","op":"eq","value":true}]},"requires":["semantic_roles","field_links","layout_adapter"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：带序号的各级目录标题，序号与题名间空一个汉字符；行末页码右顶格。一个汉字符是版式宽度，不能简单强制为一个ASCII空格。","risk":"移动对象、插页或重编号可能改变分页、引用关系或图表位置。","reason":"这项要求需要真实版面或关系确认；仅凭XML与缓存页码不能安全代改。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["toc_entry"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","field_links","layout_adapter"],"policy_refs":[]}}
```

</details>

<a id="ustc-lists-01"></a>

### USTC-LISTS-01 · 图表清单设置与顺序

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按产品推荐阈值：图表总数达到7个且没有图表清单时批注建议制作；少于7个不提示；已有清单时不作缺失提示。

执行边界：全文已识别{figure_table_count}个图表，目前没有图表清单。建议制作插图清单、附表清单或合并清单，便于检索。

产品执行口径：全文已确认图表总数达到7个且没有图表清单时建议制作，少于7个不提示；7为用户指定推荐阈值。

图表较多时分别列插图清单、附表清单，图在前、表在后，包含序号、题名和页码；一多一少或两者较少可合并。学校未给“较多”的数值；本产品按用户指定的7个阈值作建议提醒，不宣称7是校方要求。清单置于目录后，另起一面。

来源：官方模板§2.7 插图和附表清单。性质：校方要求。对象：`document`。执行以本条服务分类与结构化修复权限为准。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-LISTS-01","title":"图表清单设置与顺序","authority":"required","sources":["B273","B274","B275"],"selector":{"roles":["document"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["依据图表数量及作者选择确定分列或合列","清单有序号题名页码，图在表前","位于目录之后且另起一面"]},"requires":["author_attestation","semantic_roles","layout_adapter"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"全文已识别{figure_table_count}个图表，目前没有图表清单。建议制作插图清单、附表清单或合并清单，便于检索。","risk":"仅处理已确认的具体差异；对象、条件或关联不明确时跳过，不改写事实内容。","reason":"按产品推荐阈值：图表总数达到7个且没有图表清单时批注建议制作；少于7个不提示；已有清单时不作缺失提示。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["document"],"when":[{"fact":"objects.figure_table_count","op":"gte","value":7}],"tests":[{"fact":"lists.figure_table_present","op":"eq","value":true}],"reason":"按产品推荐阈值：图表总数达到7个且没有图表清单时批注建议制作；少于7个不提示；已有清单时不作缺失提示。","requires":["semantic_roles","text"],"policy_refs":["lists_seven"]}}
```

</details>

<a id="ustc-lists-02"></a>

### USTC-LISTS-02 · 图表清单标题

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

插图清单、附表清单或合并清单标题用黑体三号，居中，单倍行距，段前24磅、段后18磅。

来源：官方模板§2.7 插图和附表清单。性质：校方要求。对象：`figure_list_heading, table_list_heading, combined_list_heading`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-LISTS-02","title":"图表清单标题","authority":"required","sources":["B275"],"selector":{"roles":["figure_list_heading","table_list_heading","combined_list_heading"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"font.eastAsia":"黑体","size.pt":16,"paragraph.align":"center","paragraph.line":{"mode":"single"},"paragraph.before.pt":24,"paragraph.after.pt":18}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"font.eastAsia":"黑体","size.pt":16,"paragraph.align":"center","paragraph.line":{"mode":"single"},"paragraph.before.pt":24,"paragraph.after.pt":18},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“图表清单标题”调整：{changes_zh}。插图清单、附表清单或合并清单标题用黑体三号，居中，单倍行距，段前24磅、段后18磅。","action":"插图清单、附表清单或合并清单标题用黑体三号，居中，单倍行距，段前24磅、段后18磅。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["figure_list_heading","table_list_heading","combined_list_heading"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-lists-03"></a>

### USTC-LISTS-03 · 图表清单条目

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

图表清单内容小四号宋体，英文数字Times New Roman，固定行距20磅，段前段后0磅。

来源：官方模板§2.7 插图和附表清单。性质：校方要求。对象：`figure_list_entry, table_list_entry`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-LISTS-03","title":"图表清单条目","authority":"required","sources":["B275"],"selector":{"roles":["figure_list_entry","table_list_entry"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"font.eastAsia":"宋体","font.latin":"Times New Roman","size.pt":12,"paragraph.line":{"mode":"exact","pt":20},"paragraph.before.pt":0,"paragraph.after.pt":0}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"font.eastAsia":"宋体","font.latin":"Times New Roman","size.pt":12,"paragraph.line":{"mode":"exact","pt":20},"paragraph.before.pt":0,"paragraph.after.pt":0},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“图表清单条目”调整：{changes_zh}。图表清单内容小四号宋体，英文数字Times New Roman，固定行距20磅，段前段后0磅。","action":"图表清单内容小四号宋体，英文数字Times New Roman，固定行距20磅，段前段后0磅。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["figure_list_entry","table_list_entry"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-lists-04"></a>

### USTC-LISTS-04 · 自动生成清单建议

服务分类：可检查的建议；仅明确不符合时批注，不修改。执行范围：只对已存在的图表清单检查有效可更新域；没有清单不提示，没有域时只加建议批注。

执行边界：当前图表清单未使用可更新的自动清单域，建议改用自动生成的清单。

插图与附表清单宜由文档编辑软件自动生成，并调整成规定格式。手工清单不因此判为硬错误。

来源：官方模板§2.7 插图和附表清单。性质：校方建议。对象：`figure_list, table_list`。执行以本条服务分类与结构化修复权限为准。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-LISTS-04","title":"自动生成清单建议","authority":"advisory","sources":["B276"],"selector":{"roles":["figure_list","table_list"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["优先使用可更新的自动清单"]},"requires":["human_review"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"当前图表清单未使用可更新的自动清单域，建议改用自动生成的清单。","risk":"仅处理已确认的具体差异；对象、条件或关联不明确时跳过，不改写事实内容。","reason":"只对已存在的图表清单检查有效可更新域；没有清单不提示，没有域时只加建议批注。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["figure_table_list"],"when":[],"tests":[{"fact":"lists.fields_present","op":"eq","value":true}],"reason":"只对已存在的图表清单检查有效可更新域；没有清单不提示，没有域时只加建议批注。","requires":["semantic_roles","field_links"],"policy_refs":[]}}
```

</details>

<a id="ustc-symbol-01"></a>

### USTC-SYMBOL-01 · 符号和缩略语说明的条件

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：不同符号和缩略语达到7项且没有说明表时提醒；少于7项不提示，不判断首次解释的语义完整性。

执行边界：全文已识别{symbol_count}项不同符号及缩略语，目前没有专门说明。建议增加符号和缩略语说明表。

产品执行口径：全文不同符号及缩略语达到7项且没有说明表时建议制作，少于7项不提示；7为用户指定推荐阈值。

符号、缩略词等大量使用时设说明，置于目录之后、正文之前；数量少可省略，但首次出现必须说明。学校未量化“大量”；本产品采用用户指定的7项推荐阈值，不作校方硬性数量错误。

来源：官方模板§2.8 符号和缩略语说明。性质：校方要求。对象：`document`。执行以本条服务分类与结构化修复权限为准。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-SYMBOL-01","title":"符号和缩略语说明的条件","authority":"required","sources":["B278"],"selector":{"roles":["document"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["数量多时有专门说明且位置正确","省略专门说明时首次出现均解释"]},"requires":["semantic_roles","human_review"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"全文已识别{symbol_count}项不同符号及缩略语，目前没有专门说明。建议增加符号和缩略语说明表。","risk":"仅处理已确认的具体差异；对象、条件或关联不明确时跳过，不改写事实内容。","reason":"不同符号和缩略语达到7项且没有说明表时提醒；少于7项不提示，不判断首次解释的语义完整性。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["document"],"when":[{"fact":"symbols.distinct_count","op":"gte","value":7}],"tests":[{"fact":"symbols.list_present","op":"eq","value":true}],"reason":"不同符号和缩略语达到7项且没有说明表时提醒；少于7项不提示，不判断首次解释的语义完整性。","requires":["semantic_roles","text"],"policy_refs":["symbols_seven"]}}
```

</details>

<a id="ustc-symbol-02"></a>

### USTC-SYMBOL-02 · 符号条目内容建议

服务分类：可检查的建议；仅明确不符合时批注，不修改。执行范围：仅检查已存在说明表各现有分类内的首字母排序，不判断定义、数值或分类合理性；只批注不排序。

执行边界：符号说明中有条目未按首字母顺序排列，建议调整；相同首字母的条目可保留原序。

建议分符号、希腊字母、缩略词等部分，各按首字母排序；无量纲参数可给定义式，常数或系数可给数值。

来源：官方模板§2.8 符号和缩略语说明。性质：校方建议。对象：`symbol_list`。执行以本条服务分类与结构化修复权限为准。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-SYMBOL-02","title":"符号条目内容建议","authority":"advisory","sources":["B278"],"selector":{"roles":["symbol_list"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["分类与字母排序建议已考虑","按需要给定义式或数值"]},"requires":["human_review"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"符号说明中有条目未按首字母顺序排列，建议调整；相同首字母的条目可保留原序。","risk":"仅处理已确认的具体差异；对象、条件或关联不明确时跳过，不改写事实内容。","reason":"仅检查已存在说明表各现有分类内的首字母排序，不判断定义、数值或分类合理性；只批注不排序。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["symbol_list"],"when":[],"tests":[{"fact":"symbols.initial_order_valid","op":"eq","value":true}],"reason":"仅检查已存在说明表各现有分类内的首字母排序，不判断定义、数值或分类合理性；只批注不排序。","requires":["semantic_roles","text"],"policy_refs":[]}}
```

</details>

<a id="ustc-symbol-04"></a>

### USTC-SYMBOL-04 · 符号单位和缩略词全称

服务分类：不检查、不批注（保留规范记录）。执行范围：没有可执行的明确检查条件，或依赖内容语义/主观判断；保留已辨认的规范，不执行检查、不自动修复、不写批注。

符号若有单位需标明单位；缩略词需给出中英文全称。

来源：官方模板§2.8 符号和缩略语说明。性质：校方要求。对象：`symbol_list`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-SYMBOL-04","title":"符号单位和缩略词全称","authority":"required","sources":["B278"],"selector":{"roles":["symbol_list"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["有单位符号标明单位","缩略词有中英文全称"]},"requires":["human_review"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：符号若有单位需标明单位；缩略词需给出中英文全称。","risk":"自动改写可能改变学术含义、符号用途或作者的真实陈述。","reason":"这项要求依赖语义和实际内容判断，程序只列出核对事项，不能替作者决定。"},"audit":{"status":"unsupported","notification":"never","roles":["symbol_list"],"when":[],"tests":null,"reason":"没有可执行的明确检查条件，或依赖内容语义/主观判断；保留已辨认的规范，不执行检查、不自动修复、不写批注。","requires":["human_review"],"policy_refs":[]}}
```

</details>

<a id="ustc-symbol-03"></a>

### USTC-SYMBOL-03 · 符号说明格式

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

标题同章标题；内容小四号宋体，英文数字Times New Roman，固定行距20磅，段前段后0磅。

来源：官方模板§2.8 符号和缩略语说明。性质：校方要求。对象：`symbol_entry`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-SYMBOL-03","title":"符号说明格式","authority":"required","sources":["B279"],"selector":{"roles":["symbol_entry"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"font.eastAsia":"宋体","font.latin":"Times New Roman","size.pt":12,"paragraph.line":{"mode":"exact","pt":20},"paragraph.before.pt":0,"paragraph.after.pt":0}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"font.eastAsia":"宋体","font.latin":"Times New Roman","size.pt":12,"paragraph.line":{"mode":"exact","pt":20},"paragraph.before.pt":0,"paragraph.after.pt":0},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“符号说明格式”调整：{changes_zh}。标题同章标题；内容小四号宋体，英文数字Times New Roman，固定行距20磅，段前段后0磅。","action":"标题同章标题；内容小四号宋体，英文数字Times New Roman，固定行距20磅，段前段后0磅。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["symbol_entry"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

## 三、正文、标题和章节结构

<a id="ustc-content-01"></a>

### USTC-CONTENT-01 · 论文内容与学术表达

服务分类：不检查、不批注（保留规范记录）。执行范围：用户复核决定不处理：保留已识别原文及来源，不检查、不修改、不批注。

论文通常围绕一个主题，结构有逻辑，结果客观，避免方法结果混乱和大段重复；题名准确、摘要简明、引言突出重点、结论完整且说明问题和展望。引用文献应确实阅读、公开出版、便于查询。

来源：官方模板第1章 引言；官方模板§1.1.1 常见内容问题；官方模板§1.1.2 常见格式问题；官方模板§1.2 提高学位论文的规范性。性质：校方建议。对象：`document`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-CONTENT-01","title":"论文内容与学术表达","authority":"advisory","sources":["B225","B229","B231","B233"],"selector":{"roles":["document"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["主题明确、逻辑一致、方法结果相互对应","引言结论分别履行功能","引用材料真实阅读且可查询"]},"requires":["human_review"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：论文通常围绕一个主题，结构有逻辑，结果客观，避免方法结果混乱和大段重复；题名准确、摘要简明、引言突出重点、结论完整且说明问题和展望。引用文献应确实阅读、公开出版、便于查询。","risk":"自动改写可能改变学术含义、符号用途或作者的真实陈述。","reason":"这项要求依赖语义和实际内容判断，程序只列出核对事项，不能替作者决定。"},"audit":{"status":"unsupported","notification":"never","roles":["document"],"when":[],"tests":null,"reason":"用户复核决定不处理：保留已识别原文及来源，不检查、不修改、不批注。","requires":["human_review"],"policy_refs":[]}}
```

</details>

<a id="ustc-content-02"></a>

### USTC-CONTENT-02 · 正文内容和工程应用章节

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：只检查已确认正文标题中的引言/绪论、结论及明确同义标题是否存在；不查主体、工程应用内容及章节语义。

执行边界：正文未发现{failed_items_zh}对应的章节标题，建议补充相应章节；系统不代写内容。

正文通常包括引言、主体、结论；引言交代历史回顾、前人述评、研究目的流程方法。正文实事求是、客观完整、逻辑清楚，遵循学术规范；内容应具有正确的政治、思想导向、知识性、科学性和原创性，体例文字符合现行规范。工程博士必须至少一章或一节专门介绍工程应用现状和前景。

来源：官方模板§2.9 正文；官方模板§3.1 论文的基本要求。性质：校方要求。对象：`main_body`。执行以本条服务分类与结构化修复权限为准。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-CONTENT-02","title":"正文内容和工程应用章节","authority":"required","sources":["B282","B283","B284","B307","B308"],"selector":{"roles":["main_body"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["内容与学术规范由作者导师审查","如属工程博士，存在专门工程应用现状与前景章或节"]},"requires":["external_metadata","human_review"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"正文未发现{failed_items_zh}对应的章节标题，建议补充相应章节；系统不代写内容。","risk":"仅处理已确认的具体差异；对象、条件或关联不明确时跳过，不改写事实内容。","reason":"只检查已确认正文标题中的引言/绪论、结论及明确同义标题是否存在；不查主体、工程应用内容及章节语义。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["document"],"when":[],"tests":[{"fact":"structure.introduction_present","op":"eq","value":true},{"fact":"structure.conclusion_present","op":"eq","value":true}],"reason":"只检查已确认正文标题中的引言/绪论、结论及明确同义标题是否存在；不查主体、工程应用内容及章节语义。","requires":["semantic_roles","text"],"policy_refs":[]}}
```

</details>

<a id="ustc-length-01"></a>

### USTC-LENGTH-01 · 正文篇幅建议

服务分类：可检查的建议；仅明确不符合时批注，不修改。执行范围：正文篇幅只统计正文文字：一个汉字或英文字母各计一字；图片、图注、引用、注释均不计入。只统计，不分析内容含义；不足建议只提示，不自动增删正文。

硕士正文一般不少于3万字，博士一般不少于5万字；留学生综合考虑。按已定正文字符范围统计，不把图片、图注、引用或注释计入；不能忽略“一般”的建议性质。

来源：官方模板§3.1 论文的基本要求。性质：校方建议。对象：`main_body`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-LENGTH-01","title":"正文篇幅建议","authority":"advisory","sources":["B306"],"selector":{"roles":["main_body"],"confidence":"confirmed","mode":"document_group"},"when":[{"fact":"context.international_student","op":"eq","value":false}],"check":{"kind":"assertions","tests":[{"fact":"length.reviewed_character_count","op":"gte_fact","value":"context.body_word_advice"}]},"requires":["external_metadata","author_confirmed_count_policy"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"正文字符数低于相应学位的一般篇幅建议。计数仅包含正文文字，图片、图注、引用、注释未计入；请酌情调整，程序不会增删内容。","risk":"自动增删正文会改变作者内容，因此本项只作篇幅建议。","reason":"正文篇幅只统计正文文字：一个汉字或英文字母各计一字；图片、图注、引用、注释均不计入。只统计，不分析内容含义；不足建议只提示，不自动增删正文。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["main_body"],"when":[],"tests":null,"reason":"正文篇幅只统计正文文字：一个汉字或英文字母各计一字；图片、图注、引用、注释均不计入。只统计，不分析内容含义；不足建议只提示，不自动增删正文。","requires":["external_metadata","author_confirmed_count_policy"],"policy_refs":[]}}
```

</details>

<a id="ustc-body-01"></a>

### USTC-BODY-01 · 正文基本格式

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

正文小四号（12pt），汉字宋体，英文及阿拉伯数字Times New Roman，两端对齐，首行缩进2个汉字符，段前段后0磅。只选正文普通段落，排除标题、图表题注、公式、参考文献和列表。

来源：官方模板§3.2 文字。性质：校方要求。对象：`body_paragraph`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-BODY-01","title":"正文基本格式","authority":"required","sources":["B311"],"selector":{"roles":["body_paragraph"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"font.eastAsia":"宋体","font.latin":"Times New Roman","size.pt":12,"paragraph.before.pt":0,"paragraph.after.pt":0,"paragraph.align":"both","paragraph.firstLine.char":2}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"font.eastAsia":"宋体","font.latin":"Times New Roman","size.pt":12,"paragraph.before.pt":0,"paragraph.after.pt":0,"paragraph.align":"both","paragraph.firstLine.char":2},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“正文基本格式”调整：{changes_zh}。正文小四号（12pt），汉字宋体，英文及阿拉伯数字Times New Roman，两端对齐，首行缩进2个汉字符，段前段后0磅。只选正文普通段落，排除标题、图表题注、公式、参考文献和列表。","action":"正文小四号（12pt），汉字宋体，英文及阿拉伯数字Times New Roman，两端对齐，首行缩进2个汉字符，段前段后0磅。只选正文普通段落，排除标题、图表题注、公式、参考文献和列表。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["body_paragraph"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-body-02"></a>

### USTC-BODY-02 · 正文行距与公式例外

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

正文固定行距20磅；含不编序号数学表达式的段落可按公式需要另设行距。不能把此类段落强制压成20磅。

来源：官方模板§3.2 文字。性质：校方要求。对象：`body_paragraph`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-BODY-02","title":"正文行距与公式例外","authority":"required","sources":["B311"],"selector":{"roles":["body_paragraph"],"confidence":"confirmed","mode":"each"},"when":[{"fact":"object.contains_unnumbered_math","op":"eq","value":false}],"check":{"kind":"properties","expected":{"paragraph.line":{"mode":"exact","pt":20}}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"paragraph.line":{"mode":"exact","pt":20}},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“正文行距与公式例外”调整：{changes_zh}。正文固定行距20磅；含不编序号数学表达式的段落可按公式需要另设行距。不能把此类段落强制压成20磅。","action":"正文固定行距20磅；含不编序号数学表达式的段落可按公式需要另设行距。不能把此类段落强制压成20磅。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["body_paragraph"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-body-03"></a>

### USTC-BODY-03 · 公式段落的行距例外审查

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：已确认独立公式段按用户指定默认修正为单倍行距；行内公式与混合普通文字段不套用此默认。学校允许按表达式需要调整行距。

执行边界：该独立公式段的行距不是单倍行距，将按产品默认调整；公式内容保持原样。

产品执行口径：已确认独立成段的公式采用单倍行距；这是用户指定的修复默认，学校文字仅允许按表达式需要调整行距。

正文段落含不编号数学表达式时，按表达式需要设置行距，并复核公式没有被裁切。学校没有给这类段落统一数值。

来源：官方模板§3.2 文字。性质：校方要求。对象：已确认独立公式段（学校原文的行内公式例外保留为来源）。执行以本条服务分类与结构化修复权限为准。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-BODY-03","title":"公式段落的行距例外审查","authority":"required","sources":["B311"],"selector":{"roles":["body_paragraph"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"review","items":["表达式完整可见且行距适合"]},"requires":["layout_adapter","human_visual_review"],"fix":{"permission":"guarded_transform","target":{"operation":"math_single_spacing"},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已调整{changes_zh}。","action":"该独立公式段的行距不是单倍行距，将按产品默认调整；公式内容保持原样。","risk":"仅处理已确认的具体差异；对象、条件或关联不明确时跳过，不改写事实内容。","reason":"已确认独立公式段按用户指定默认修正为单倍行距；行内公式与混合普通文字段不套用此默认。学校允许按表达式需要调整行距。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["display_equation_paragraph"],"when":[{"fact":"object.is_display_math_paragraph","op":"eq","value":true}],"tests":[{"fact":"equation.single_spacing","op":"eq","value":true}],"reason":"已确认独立公式段按用户指定默认修正为单倍行距；行内公式与混合普通文字段不套用此默认。学校允许按表达式需要调整行距。","requires":["semantic_roles","effective_properties"],"policy_refs":["math_single"]}}
```

</details>

<a id="ustc-chapter-01"></a>

### USTC-CHAPTER-01 · 正文第1章奇数页与后续另页

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

正文第1章从另页右页（奇数页）开始；每章另起一面。后续各部分无需特地留空白页以求奇数页起。物理单双页不能用显示页码奇偶代替。

来源：官方模板“第1章起页说明”；官方模板§2.9 正文；官方模板§3.4 章、节标题。性质：校方要求。对象：`main_body`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-CHAPTER-01","title":"正文第1章奇数页与后续另页","authority":"required","sources":["B222","B281","B321"],"selector":{"roles":["main_body"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"layout.chapter1_physical_odd_page","op":"eq","value":true},{"fact":"layout.every_chapter_starts_new_page","op":"eq","value":true}]},"requires":["layout_adapter","semantic_roles"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：正文第1章从另页右页（奇数页）开始；每章另起一面。后续各部分无需特地留空白页以求奇数页起。物理单双页不能用显示页码奇偶代替。","risk":"移动对象、插页或重编号可能改变分页、引用关系或图表位置。","reason":"这项要求需要真实版面或关系确认；仅凭XML与缓存页码不能安全代改。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["main_body"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["layout_adapter","semantic_roles"],"policy_refs":[]}}
```

</details>

<a id="ustc-chapter-02"></a>

### USTC-CHAPTER-02 · 第1章前必要空白页

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

若第1章前内容在奇数页结束，应留空白页；这页无页眉及页眉线，但仍连续编页码。仅对因第一章奇数页起而插入的空白页适用。

来源：官方模板“第1章起页说明”。性质：校方要求。对象：`pre_body_blank_page`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-CHAPTER-02","title":"第1章前必要空白页","authority":"required","sources":["B222"],"selector":{"roles":["pre_body_blank_page"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"header.visible","op":"eq","value":false},{"fact":"header.border.visible","op":"eq","value":false},{"fact":"page_number.continuous","op":"eq","value":true}]},"requires":["layout_adapter","semantic_roles"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：若第1章前内容在奇数页结束，应留空白页；这页无页眉及页眉线，但仍连续编页码。仅对因第一章奇数页起而插入的空白页适用。","risk":"移动对象、插页或重编号可能改变分页、引用关系或图表位置。","reason":"这项要求需要真实版面或关系确认；仅凭XML与缓存页码不能安全代改。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["pre_body_blank_page"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["layout_adapter","semantic_roles"],"policy_refs":[]}}
```

</details>

<a id="ustc-heading-01"></a>

### USTC-HEADING-01 · 章级标题格式

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

章及与章平级的摘要、目录、参考文献、附录、致谢、符号说明等标题：三号，中文黑体、英文数字Arial，居中，单倍行距，段前24磅、段后18磅。英文摘要另有加粗要求；中文标题不凭样例自动添加加粗。

来源：官方模板§2.8 符号和缩略语说明；官方模板§2.11 附录；官方模板§2.12 致谢；官方模板§3.4 章、节标题。性质：校方要求。对象：`chapter_heading, peer_heading`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-HEADING-01","title":"章级标题格式","authority":"required","sources":["B279","B292","B301","B323"],"selector":{"roles":["chapter_heading","peer_heading"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"font.eastAsia":"黑体","font.latin":"Arial","size.pt":16,"paragraph.align":"center","paragraph.line":{"mode":"single"},"paragraph.before.pt":24,"paragraph.after.pt":18}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"font.eastAsia":"黑体","font.latin":"Arial","size.pt":16,"paragraph.align":"center","paragraph.line":{"mode":"single"},"paragraph.before.pt":24,"paragraph.after.pt":18},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“章级标题格式”调整：{changes_zh}。章及与章平级的摘要、目录、参考文献、附录、致谢、符号说明等标题：三号，中文黑体、英文数字Arial，居中，单倍行距，段前24磅、段后18磅。英文摘要另有加粗要求；中文标题不凭样例自动添加加粗。","action":"章及与章平级的摘要、目录、参考文献、附录、致谢、符号说明等标题：三号，中文黑体、英文数字Arial，居中，单倍行距，段前24磅、段后18磅。英文摘要另有加粗要求；中文标题不凭样例自动添加加粗。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["chapter_heading","peer_heading"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-heading-02"></a>

### USTC-HEADING-02 · 一级节标题格式

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

一级节标题四号（14pt），中文黑体、英文数字Arial，居左，固定行距20磅，段前24磅、段后6磅。

来源：官方模板§3.4 章、节标题。性质：校方要求。对象：`section1_heading`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-HEADING-02","title":"一级节标题格式","authority":"required","sources":["B325"],"selector":{"roles":["section1_heading"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"font.eastAsia":"黑体","font.latin":"Arial","size.pt":14,"paragraph.align":"left","paragraph.line":{"mode":"exact","pt":20},"paragraph.before.pt":24,"paragraph.after.pt":6}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"font.eastAsia":"黑体","font.latin":"Arial","size.pt":14,"paragraph.align":"left","paragraph.line":{"mode":"exact","pt":20},"paragraph.before.pt":24,"paragraph.after.pt":6},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“一级节标题格式”调整：{changes_zh}。一级节标题四号（14pt），中文黑体、英文数字Arial，居左，固定行距20磅，段前24磅、段后6磅。","action":"一级节标题四号（14pt），中文黑体、英文数字Arial，居左，固定行距20磅，段前24磅、段后6磅。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["section1_heading"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-heading-03"></a>

### USTC-HEADING-03 · 二级节标题格式

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

二级节标题13pt，中文黑体、英文数字Arial，居左，固定行距20磅，段前12磅、段后6磅。保留原文13pt，不改称小四或四号。

来源：官方模板§3.4 章、节标题。性质：校方要求。对象：`section2_heading`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-HEADING-03","title":"二级节标题格式","authority":"required","sources":["B327"],"selector":{"roles":["section2_heading"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"font.eastAsia":"黑体","font.latin":"Arial","size.pt":13,"paragraph.align":"left","paragraph.line":{"mode":"exact","pt":20},"paragraph.before.pt":12,"paragraph.after.pt":6}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"font.eastAsia":"黑体","font.latin":"Arial","size.pt":13,"paragraph.align":"left","paragraph.line":{"mode":"exact","pt":20},"paragraph.before.pt":12,"paragraph.after.pt":6},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“二级节标题格式”调整：{changes_zh}。二级节标题13pt，中文黑体、英文数字Arial，居左，固定行距20磅，段前12磅、段后6磅。保留原文13pt，不改称小四或四号。","action":"二级节标题13pt，中文黑体、英文数字Arial，居左，固定行距20磅，段前12磅、段后6磅。保留原文13pt，不改称小四或四号。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["section2_heading"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-heading-04"></a>

### USTC-HEADING-04 · 三级节标题格式

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

三级节标题小四号（12pt），中文黑体、英文数字Arial，居左，固定行距20磅，段前12磅、段后6磅。

来源：官方模板§3.4 章、节标题。性质：校方要求。对象：`section3_heading`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-HEADING-04","title":"三级节标题格式","authority":"required","sources":["B329"],"selector":{"roles":["section3_heading"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"font.eastAsia":"黑体","font.latin":"Arial","size.pt":12,"paragraph.align":"left","paragraph.line":{"mode":"exact","pt":20},"paragraph.before.pt":12,"paragraph.after.pt":6}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"font.eastAsia":"黑体","font.latin":"Arial","size.pt":12,"paragraph.align":"left","paragraph.line":{"mode":"exact","pt":20},"paragraph.before.pt":12,"paragraph.after.pt":6},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“三级节标题格式”调整：{changes_zh}。三级节标题小四号（12pt），中文黑体、英文数字Arial，居左，固定行距20磅，段前12磅、段后6磅。","action":"三级节标题小四号（12pt），中文黑体、英文数字Arial，居左，固定行距20磅，段前12磅、段后6磅。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["section3_heading"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-heading-05"></a>

### USTC-HEADING-05 · 标题最大层级

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

不得使用低于三级节的标题（例如1.1.1.1.1）；章为独立层，1.1为一级节、1.1.1为二级节、1.1.1.1为三级节。

来源：官方模板§3.4 章、节标题。性质：校方要求。对象：`section_heading`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-HEADING-05","title":"标题最大层级","authority":"required","sources":["B329"],"selector":{"roles":["section_heading"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"heading.section_depth","op":"lte","value":3}]},"requires":["semantic_roles","numbering"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：不得使用低于三级节的标题（例如1.1.1.1.1）；章为独立层，1.1为一级节、1.1.1为二级节、1.1.1.1为三级节。","risk":"自动改文字、序号或关联关系可能误改真实内容并破坏交叉引用。","reason":"本规则只授权检查；发现差异后需确认对象及关联，再由作者修改相关内容。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["section_heading"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","numbering"],"policy_refs":[]}}
```

</details>

<a id="ustc-heading-06"></a>

### USTC-HEADING-06 · 标题表达建议

服务分类：可检查的建议；仅明确不符合时批注，不修改。执行范围：只检查已确认章标题的计数字数是否超过15；缩写是否必要、三级节是否必要不检查、不批注。

各章标题长度一般在15字以内，尽量不用英文缩写，一般不建议使用三级节标题。短语表达、必要缩写及全文形式统一另按USTC-HEADING-11核对。

来源：官方模板§3.4 章、节标题。性质：校方建议。对象：`chapter_heading, section_heading`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-HEADING-06","title":"标题表达建议","authority":"advisory","sources":["B321","B329"],"selector":{"roles":["chapter_heading","section_heading"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["章标题一般15字以内","英文缩写是否确有必要","三级节标题是否确有必要"]},"requires":["human_review"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"本章标题的字数超过一般15字以内的建议。请酌情精简，程序不会代改学术表述。","risk":"自动改写可能改变学术含义、符号用途或作者的真实陈述。","reason":"这项要求依赖语义和实际内容判断，程序只列出核对事项，不能替作者决定。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["chapter_heading"],"when":[],"tests":[{"fact":"length.reviewed_character_count","op":"lte","value":15}],"reason":"只检查已确认章标题的计数字数是否超过15；缩写是否必要、三级节是否必要不检查、不批注。","requires":["semantic_roles","author_confirmed_count_policy"],"policy_refs":[]}}
```

</details>

<a id="ustc-heading-11"></a>

### USTC-HEADING-11 · 标题表达和形式统一

服务分类：不检查、不批注（保留规范记录）。执行范围：用户复核决定不处理：保留已识别原文及来源，不检查、不修改、不批注。

章标题用短语而非句子，标题形式全文统一，层次符合内容；必须使用英文缩写时，采用本行业通用缩写。

来源：官方模板§3.4 章、节标题。性质：校方要求。对象：`chapter_heading, section_heading`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-HEADING-11","title":"标题表达和形式统一","authority":"required","sources":["B321"],"selector":{"roles":["chapter_heading","section_heading"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["章标题使用短语而非句子","各级标题形式全文统一且层次合适","必要英文缩写为行业通用缩写"]},"requires":["human_review"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"章标题用短语而非句子，标题形式全文统一，层次符合内容；必须使用英文缩写时，采用本行业通用缩写。","risk":"自动改写可能改变学术含义、符号用途或作者的真实陈述。","reason":"这项要求依赖语义和实际内容判断，程序只列出核对事项，不能替作者决定。"},"audit":{"status":"unsupported","notification":"never","roles":["chapter_heading","section_heading"],"when":[],"tests":null,"reason":"用户复核决定不处理：保留已识别原文及来源，不检查、不修改、不批注。","requires":["human_review"],"policy_refs":[]}}
```

</details>

<a id="ustc-heading-07"></a>

### USTC-HEADING-07 · 标题编号及间隔

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

章序号用阿拉伯数字；节编号由上级序号和本节顺序号构成，用半角点连接。序号与标题之间空一个汉字符，全文层级和形式统一。

来源：官方模板§3.4 章、节标题。性质：校方要求。对象：`chapter_heading, section_heading`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-HEADING-07","title":"标题编号及间隔","authority":"required","sources":["B321","B322","B323","B324","B325","B326","B328"],"selector":{"roles":["chapter_heading","section_heading"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"numbering.valid_hierarchy","op":"eq","value":true},{"fact":"numbering.digits","op":"eq","value":"arabic"},{"fact":"numbering.separator","op":"eq","value":"."},{"fact":"number_title.gap.em","op":"eq","value":1}]},"requires":["semantic_roles","numbering","layout_adapter"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：章序号用阿拉伯数字；节编号由上级序号和本节顺序号构成，用半角点连接。序号与标题之间空一个汉字符，全文层级和形式统一。","risk":"移动对象、插页或重编号可能改变分页、引用关系或图表位置。","reason":"这项要求需要真实版面或关系确认；仅凭XML与缓存页码不能安全代改。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["chapter_heading","section_heading"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","numbering","layout_adapter"],"policy_refs":[]}}
```

</details>

<a id="ustc-heading-08"></a>

### USTC-HEADING-08 · 标题末尾标点

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

章、节标题末尾不加标点；带序号图题、表题、分图题末尾特别不能用句号。不能自动删除数学式、专名组成部分中的符号。

来源：官方模板§3.3 标点符号；官方模板§3.4 章、节标题；官方模板§3.5.1 插图；官方模板§3.5.2 表格。性质：校方要求。对象：`chapter_heading, section_heading, figure_caption, table_caption, subfigure_caption`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-HEADING-08","title":"标题末尾标点","authority":"required","sources":["B319","B321","B336","B342"],"selector":{"roles":["chapter_heading","section_heading","figure_caption","table_caption","subfigure_caption"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"title.has_terminal_punctuation","op":"eq","value":false}]},"requires":["semantic_roles","text","human_disambiguation"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：章、节标题末尾不加标点；带序号图题、表题、分图题末尾特别不能用句号。不能自动删除数学式、专名组成部分中的符号。","risk":"自动改文字、序号或关联关系可能误改真实内容并破坏交叉引用。","reason":"本规则只授权检查；发现差异后需确认对象及关联，再由作者修改相关内容。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["chapter_heading","section_heading","figure_caption","table_caption","subfigure_caption"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","text","human_disambiguation"],"policy_refs":[]}}
```

</details>

<a id="ustc-heading-09"></a>

### USTC-HEADING-09 · 标题与后文不跨页

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：仅在有可靠布局结果时检查节标题与随后首段是否分居不同页；数字是否易混淆属于语义判断，不检查、不批注。

避免节标题、自设小标题与后文分离；编号后标题、图名、表名的首个数字要避免与序号混淆。分页需版面检查，不等价于只检查keepNext属性。

来源：官方模板§3.4 章、节标题。性质：校方要求。对象：`section_heading, custom_heading, figure_caption, table_caption`。按服务分类决定是否检查与批注，不自动代改。

处理边界：确认标题与后文跨页只提示；当前不承诺未确定安全改法的分页重排，不计自动修复欠账。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-HEADING-09","title":"标题与后文不跨页","authority":"required","sources":["B330"],"selector":{"roles":["section_heading","custom_heading","figure_caption","table_caption"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"layout.heading_separated_from_following","op":"eq","value":false},{"fact":"title.leading_digit_ambiguous","op":"eq","value":false}]},"requires":["layout_adapter","human_review"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"已确认本节标题或自设小标题与随后首段分居不同页。请将标题与首段安排在同一页，避免孤立标题。","risk":"移动对象、插页或重编号可能改变分页、引用关系或图表位置。","reason":"确认标题与后文跨页只提示；当前不承诺未确定安全改法的分页重排，不计自动修复欠账。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["section_heading","custom_heading"],"when":[],"tests":[{"fact":"layout.heading_separated_from_following","op":"eq","value":false}],"reason":"仅在有可靠布局结果时检查节标题与随后首段是否分居不同页；数字是否易混淆属于语义判断，不检查、不批注。 修复边界：确认标题与后文跨页只提示；当前不承诺未确定安全改法的分页重排，不计自动修复欠账。","requires":["semantic_roles","layout_adapter"],"policy_refs":[]}}
```

</details>

<a id="ustc-heading-10"></a>

### USTC-HEADING-10 · 章末孤行建议

服务分类：可检查的建议；仅明确不符合时批注，不修改。执行范围：只在可靠渲染确认章级部分最后一页仅余一行或更少正文内容时提醒；排除正常短章、空白页和整页图表，建议不自动修改。

执行边界：本章末页仅余一行或更少正文内容，建议微调前页排版，避免孤行。

各章级部分结束时，尽量避免几个字或单行跨页；这是排版建议，需渲染确认。

来源：官方模板§3.4 章、节标题。性质：校方建议。对象：`chapter_end`。执行以本条服务分类与结构化修复权限为准。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-HEADING-10","title":"章末孤行建议","authority":"advisory","sources":["B330"],"selector":{"roles":["chapter_end"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"layout.chapter_end_orphan","op":"eq","value":false}]},"requires":["layout_adapter"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"本章末页仅余一行或更少正文内容，建议微调前页排版，避免孤行。","risk":"仅处理已确认的具体差异；对象、条件或关联不明确时跳过，不改写事实内容。","reason":"只在可靠渲染确认章级部分最后一页仅余一行或更少正文内容时提醒；排除正常短章、空白页和整页图表，建议不自动修改。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["chapter_end"],"when":[],"tests":null,"reason":"只在可靠渲染确认章级部分最后一页仅余一行或更少正文内容时提醒；排除正常短章、空白页和整页图表，建议不自动修改。","requires":["semantic_roles","layout_adapter"],"policy_refs":[]}}
```

</details>

## 四、标点、图表、表达式和注释

<a id="ustc-text-01"></a>

### USTC-TEXT-01 · 语言规范及国标引用边界

服务分类：不检查、不批注（保留规范记录）。执行范围：没有可执行的明确检查条件，或依赖内容语义/主观判断；保留已辨认的规范，不执行检查、不自动修复、不写批注。

文字表述符合通用语言规范；标点按模板指向的GB/T 15834-2011。这里只实现下列模板明说的必要规则，不将整部国标自动扩展为本规范条目。数字、计量单位、知识、文风等需相应专业审查。

来源：官方模板§3.2 文字；官方模板§3.3 标点符号。性质：校方要求。对象：`document`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-TEXT-01","title":"语言规范及国标引用边界","authority":"required","sources":["B310","B313"],"selector":{"roles":["document"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["文字词语语法标点数字计量单位符合通用规范","需要国标细节时另核原文"]},"requires":["human_review","external_standard"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：文字表述符合通用语言规范；标点按模板指向的GB/T 15834-2011。这里只实现下列模板明说的必要规则，不将整部国标自动扩展为本规范条目。数字、计量单位、知识、文风等需相应专业审查。","risk":"未核原始依据就改写可能导致分类、著录或引用事实错误。","reason":"需要标准原文、分类表或来源文献等外部证据，不能仅凭当前文档完成确认。"},"audit":{"status":"unsupported","notification":"never","roles":["document"],"when":[],"tests":null,"reason":"没有可执行的明确检查条件，或依赖内容语义/主观判断；保留已辨认的规范，不执行检查、不自动修复、不写批注。","requires":["human_review","external_standard"],"policy_refs":[]}}
```

</details>

<a id="ustc-punct-01"></a>

### USTC-PUNCT-01 · 引号、括号和书名号的语义

服务分类：不检查、不批注（保留规范记录）。执行范围：没有可执行的明确检查条件，或依赖内容语义/主观判断；保留已辨认的规范，不执行检查、不自动修复、不写批注。

无特殊含义词语不随意加引号；句内括号紧跟被释词，括号后点号位置及括内句末点号按模板说明；句外括号置被释句末标点之后。产品、奖品、单位、活动、课程、展会、会议、研究项目等名称不用书名号。

来源：官方模板§3.3 标点符号。性质：校方要求。对象：`prose`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-PUNCT-01","title":"引号、括号和书名号的语义","authority":"required","sources":["B314","B315","B316"],"selector":{"roles":["prose"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["引号确有用途","区分句内句外括号并核对点号位置","书名号用于适当名称"]},"requires":["human_review"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：无特殊含义词语不随意加引号；句内括号紧跟被释词，括号后点号位置及括内句末点号按模板说明；句外括号置被释句末标点之后。产品、奖品、单位、活动、课程、展会、会议、研究项目等名称不用书名号。","risk":"自动改写可能改变学术含义、符号用途或作者的真实陈述。","reason":"这项要求依赖语义和实际内容判断，程序只列出核对事项，不能替作者决定。"},"audit":{"status":"unsupported","notification":"never","roles":["prose"],"when":[],"tests":null,"reason":"没有可执行的明确检查条件，或依赖内容语义/主观判断；保留已辨认的规范，不执行检查、不自动修复、不写批注。","requires":["human_review"],"policy_refs":[]}}
```

</details>

<a id="ustc-punct-02"></a>

### USTC-PUNCT-02 · 成对标号检查与换行限制

服务边界：配对检查只提示确定的不配对，不自动补、删或替换引号、括号、书名号，不猜应补哪边或哪种符号。专业语境、合法跨段引文或边界不明时跳过，不判断用词和语义。

学校要求引号、括号、书名号成对，前半不在行末、后半不在行首。配对提示所需解析尚未接入；实际换行检查另需排版事实。本条不要求自动补齐符号，不能修并不妨碍检查。

来源：官方模板§3.3 标点符号。保留原文要求，当前尚未实现检查，不冒称已经能提示。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-PUNCT-02","title":"成对标号和换行限制","authority":"required","sources":["B317"],"selector":{"roles":["prose"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"punctuation.pairs_balanced","op":"eq","value":true},{"fact":"layout.prohibited_punctuation_break","op":"eq","value":false}]},"requires":["text","semantic_roles","layout_adapter"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"此处标号存在已确认的格式问题，请检查对应位置。程序不会自动补、删或替换符号。","risk":"自动补删可能改变原句的引用范围或符号含义。","reason":"检出不配对不能确定作者应补、删哪一处或哪一种符号，因此只提示，由作者决定。"},"audit":{"status":"unsupported","notification":"never","roles":["prose"],"when":[],"tests":null,"reason":"配对检查只提示确定的不配对，不自动补、删或替换引号、括号、书名号，不猜应补哪边或哪种符号。专业语境、合法跨段引文或边界不明时跳过，不判断用词和语义。 当前配对解析及实际换行事实尚未实现，暂未启用；这是检查实现欠账，不是缺自动校对。","requires":["text","semantic_roles","layout_adapter"],"policy_refs":[]}}
```

</details>

<a id="ustc-punct-03"></a>

### USTC-PUNCT-03 · 破折号和省略号

服务分类：不检查、不批注（保留规范记录）。执行范围：省略号、破折号的用途和语言例外尚无可靠判别，不把文本形似当成格式错误。

破折号及中文六点省略号占两个字符位置，中间不能断开或跨行；外文三点省略号占一个字符位置。语义识别后审查，不能把所有三个点替成中文省略号。

来源：官方模板§3.3 标点符号。性质：校方要求。对象：`prose`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-PUNCT-03","title":"破折号和省略号","authority":"required","sources":["B318"],"selector":{"roles":["prose"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"punctuation.dash_ellipsis_form_valid","op":"eq","value":true},{"fact":"layout.dash_ellipsis_split","op":"eq","value":false}]},"requires":["text","semantic_roles","layout_adapter"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：破折号及中文六点省略号占两个字符位置，中间不能断开或跨行；外文三点省略号占一个字符位置。语义识别后审查，不能把所有三个点替成中文省略号。","risk":"移动对象、插页或重编号可能改变分页、引用关系或图表位置。","reason":"这项要求需要真实版面或关系确认；仅凭XML与缓存页码不能安全代改。"},"audit":{"status":"unsupported","notification":"never","roles":["prose"],"when":[],"tests":null,"reason":"省略号、破折号的用途和语言例外尚无可靠判别，不把文本形似当成格式错误。","requires":["text","semantic_roles","layout_adapter"],"policy_refs":[]}}
```

</details>

<a id="ustc-object-01"></a>

### USTC-OBJECT-01 · 图表公式分章编号

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

图、表、编号表达式按章连续，用章号与章内顺序号两个阿拉伯数字，以半角点连接，如图2.1、表5.6、式（1.2）。附录按附录字母另编号，适用附录规则。

来源：官方模板§3.5 有关图、表和表达式。性质：校方要求。对象：`body_figure, body_table, body_numbered_equation`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-OBJECT-01","title":"图表公式分章编号","authority":"required","sources":["B332"],"selector":{"roles":["body_figure","body_table","body_numbered_equation"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"numbering.chapter_sequence_valid","op":"eq","value":true},{"fact":"numbering.separator","op":"eq","value":"."}]},"requires":["semantic_roles","numbering"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：图、表、编号表达式按章连续，用章号与章内顺序号两个阿拉伯数字，以半角点连接，如图2.1、表5.6、式（1.2）。附录按附录字母另编号，适用附录规则。","risk":"自动改文字、序号或关联关系可能误改真实内容并破坏交叉引用。","reason":"本规则只授权检查；发现差异后需确认对象及关联，再由作者修改相关内容。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["body_figure","body_table","body_numbered_equation"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","numbering"],"policy_refs":[]}}
```

</details>

<a id="ustc-object-02"></a>

### USTC-OBJECT-02 · 图表提及顺序和位置

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

图表不先于文中首次提及，顺序与论述一致，不应跨节；距离不宜过远但模板无量化阈值，距离另由人工审查。

来源：官方模板§3.5 有关图、表和表达式。性质：校方要求。对象：`figure, table`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-OBJECT-02","title":"图表提及顺序和位置","authority":"required","sources":["B332"],"selector":{"roles":["figure","table"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"first_mention.precedes_object","op":"eq","value":true},{"fact":"first_mention.same_section","op":"eq","value":true},{"fact":"mention_order.matches_object_order","op":"eq","value":true}]},"requires":["semantic_roles","cross_references","layout_adapter"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：图表不先于文中首次提及，顺序与论述一致，不应跨节；距离不宜过远但模板无量化阈值，距离另由人工审查。","risk":"移动对象、插页或重编号可能改变分页、引用关系或图表位置。","reason":"这项要求需要真实版面或关系确认；仅凭XML与缓存页码不能安全代改。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["figure","table"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","cross_references","layout_adapter"],"policy_refs":[]}}
```

</details>

<a id="ustc-object-03"></a>

### USTC-OBJECT-03 · 图表邻近与一致性

服务分类：不检查、不批注（保留规范记录）。执行范围：用户复核决定不处理：保留已识别原文及来源，不检查、不修改、不批注。

图表与相关讨论尽量邻近，不擅设“过远”的数值阈值。图中术语、符号、单位一致性另按USTC-OBJECT-05核对。

来源：官方模板§1.1.2 常见格式问题；官方模板§3.5 有关图、表和表达式；官方模板§3.5.1 插图。性质：校方建议。对象：`figure, table`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-OBJECT-03","title":"图表邻近与一致性","authority":"advisory","sources":["B332"],"selector":{"roles":["figure","table"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["图表与论述距离是否适当"]},"requires":["human_visual_review"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"图表与相关讨论尽量邻近，不擅设“过远”的数值阈值。图中术语、符号、单位一致性另按USTC-OBJECT-05核对。","risk":"修改图片、签名或图表内部文字可能损坏原始信息。","reason":"需对可见图形或原始资料作人工核验，不能把OCR或对象外框当成可靠事实。"},"audit":{"status":"unsupported","notification":"never","roles":["figure","table"],"when":[],"tests":null,"reason":"用户复核决定不处理：保留已识别原文及来源，不检查、不修改、不批注。","requires":["human_visual_review"],"policy_refs":[]}}
```

</details>

<a id="ustc-object-05"></a>

### USTC-OBJECT-05 · 图文术语一致与可读性

服务分类：不检查、不批注（保留规范记录）。执行范围：没有可执行的明确检查条件，或依赖内容语义/主观判断；保留已辨认的规范，不执行检查、不自动修复、不写批注。

插图中的术语、符号、单位应与正文一致，图表清晰可读；需核对可见内容，不能用图片外框或未经确认的OCR代替。

来源：官方模板§1.1.2 常见格式问题；官方模板§3.5.1 插图。性质：校方要求。对象：`figure, table`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-OBJECT-05","title":"图文术语一致与可读性","authority":"required","sources":["B231","B334","B335"],"selector":{"roles":["figure","table"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["图中术语符号单位与正文一致","图表清晰可读"]},"requires":["human_visual_review"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"插图中的术语、符号、单位应与正文一致，图表清晰可读；需核对可见内容，不能用图片外框或未经确认的OCR代替。","risk":"自动改写可能改变学术含义、符号用途或作者的真实陈述。","reason":"这项要求依赖语义和实际内容判断，程序只列出核对事项，不能替作者决定。"},"audit":{"status":"unsupported","notification":"never","roles":["figure","table"],"when":[],"tests":null,"reason":"没有可执行的明确检查条件，或依赖内容语义/主观判断；保留已辨认的规范，不执行检查、不自动修复、不写批注。","requires":["human_visual_review"],"policy_refs":[]}}
```

</details>

<a id="ustc-figure-01"></a>

### USTC-FIGURE-01 · 图内标注和语言

服务分类：不检查、不批注（保留规范记录）。执行范围：用户决定不处理图片内部文字；图片下方可编辑图题与图注由FIGURE-02、FIGURE-03、FIGURE-04及FIGURE-05检查和安全修复，不以本条重复检查。

图中标注文字9—10.5pt，以清楚阅读为准；专名、代号、单位可用外文，坐标轴题名、词组、描述性词语须用中文。图片中字体尺寸和文字不能靠DOCX外框尺寸可靠判断。

来源：官方模板§3.5.1 插图。性质：校方要求。对象：`figure`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-FIGURE-01","title":"图内标注和语言","authority":"required","sources":["B335"],"selector":{"roles":["figure"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["图中文字9—10.5pt且清晰","轴题名及描述中文，专名代号单位可外文"]},"requires":["human_visual_review","editable_figure_source"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：图中标注文字9—10.5pt，以清楚阅读为准；专名、代号、单位可用外文，坐标轴题名、词组、描述性词语须用中文。图片中字体尺寸和文字不能靠DOCX外框尺寸可靠判断。","risk":"修改图片、签名或图表内部文字可能损坏原始信息。","reason":"需对可见图形或原始资料作人工核验，不能把OCR或对象外框当成可靠事实。"},"audit":{"status":"unsupported","notification":"never","roles":["figure"],"when":[],"tests":null,"reason":"用户决定不处理图片内部文字；图片下方可编辑图题与图注由FIGURE-02、FIGURE-03、FIGURE-04及FIGURE-05检查和安全修复，不以本条重复检查。","requires":["human_visual_review","editable_figure_source"],"policy_refs":[]}}
```

</details>

<a id="ustc-figure-02"></a>

### USTC-FIGURE-02 · 图题格式

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

图题宋体，英文Times New Roman，11pt，加粗，居中，单倍行距，段前6磅、段后0磅。图序与图名间空一个汉字符。

来源：官方模板§3.5.1 插图。性质：校方要求。对象：`figure_caption`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-FIGURE-02","title":"图题格式","authority":"required","sources":["B336"],"selector":{"roles":["figure_caption"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"font.eastAsia":"宋体","font.latin":"Times New Roman","size.pt":11,"font.bold":true,"paragraph.align":"center","paragraph.line":{"mode":"single"},"paragraph.before.pt":6,"paragraph.after.pt":0}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"font.eastAsia":"宋体","font.latin":"Times New Roman","size.pt":11,"font.bold":true,"paragraph.align":"center","paragraph.line":{"mode":"single"},"paragraph.before.pt":6,"paragraph.after.pt":0},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“图题格式”调整：{changes_zh}。图题宋体，英文Times New Roman，11pt，加粗，居中，单倍行距，段前6磅、段后0磅。图序与图名间空一个汉字符。","action":"图题宋体，英文Times New Roman，11pt，加粗，居中，单倍行距，段前6磅、段后0磅。图序与图名间空一个汉字符。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["figure_caption"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-figure-03"></a>

### USTC-FIGURE-03 · 图题和图注位置

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

图题在图下；英文图题另行置中文图题下；图注在图题下。有英文图题时，只在英文图题下给英文图注。

来源：官方模板§3.5.1 插图。性质：校方要求。对象：`figure`。按服务分类决定是否检查与批注，不自动代改。

处理边界：明确序号—图名间隔可作为安全目标；位置、双语次序及题注缺失只提示，不移动或补写题注。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-FIGURE-03","title":"图题和图注位置","authority":"required","sources":["B336","B337"],"selector":{"roles":["figure"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"caption.position","op":"eq","value":"below"},{"fact":"caption.bilingual_order_valid","op":"eq","value":true},{"fact":"notes.position_and_language_valid","op":"eq","value":true},{"fact":"number_title.gap.em","op":"eq","value":1}]},"requires":["semantic_roles","layout_adapter"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：图题在图下；英文图题另行置中文图题下；图注在图题下。有英文图题时，只在英文图题下给英文图注。","risk":"移动对象、插页或重编号可能改变分页、引用关系或图表位置。","reason":"明确序号—图名间隔可作为安全目标；位置、双语次序及题注缺失只提示，不移动或补写题注。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["figure"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。 修复边界：明确序号—图名间隔可作为安全目标；位置、双语次序及题注缺失只提示，不移动或补写题注。","requires":["semantic_roles","layout_adapter"],"policy_refs":[]}}
```

</details>

<a id="ustc-figure-04"></a>

### USTC-FIGURE-04 · 图注和分图题格式

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

中文图注宋体、英文Times New Roman，11pt，单倍行距，段前6磅、段后0磅；分图题按图注处理。

来源：官方模板§3.5.1 插图。性质：校方要求。对象：`figure_note, subfigure_caption`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-FIGURE-04","title":"图注和分图题格式","authority":"required","sources":["B337","B338"],"selector":{"roles":["figure_note","subfigure_caption"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"font.eastAsia":"宋体","font.latin":"Times New Roman","size.pt":11,"paragraph.line":{"mode":"single"},"paragraph.before.pt":6,"paragraph.after.pt":0}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"font.eastAsia":"宋体","font.latin":"Times New Roman","size.pt":11,"paragraph.line":{"mode":"single"},"paragraph.before.pt":6,"paragraph.after.pt":0},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“图注和分图题格式”调整：{changes_zh}。中文图注宋体、英文Times New Roman，11pt，单倍行距，段前6磅、段后0磅；分图题按图注处理。","action":"中文图注宋体、英文Times New Roman，11pt，单倍行距，段前6磅、段后0磅；分图题按图注处理。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["figure_note","subfigure_caption"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-figure-05"></a>

### USTC-FIGURE-05 · 多个图注和分图编号

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：分别检查多图注和分图编号连续性、间距及续行对齐；只对能安全定位的图注布局修复，编号差异批注，不判断短语和句子。

执行边界：图注或分图存在以下差异：{failed_items_zh}。可安全修复的间距、缩进和续行对齐将调整，编号问题请按提示处理。

多个图注顺序编号，注序左缩进2字符，与注文间空1字符；短语末不加标点，可同行间隔，下一行与首行序号左齐；长注可独行并悬挂对齐。两个以上分图各用(a)、(b)、(c)…，分图题按图注。

来源：官方模板§3.5.1 插图。性质：校方要求。对象：`figure_note, subfigure_caption`。执行以本条服务分类与结构化修复权限为准。

处理边界：只修改已确定多图注、注序边界和既有排法下的缩进、1字符间隔及悬挂／续行属性；动态宽度须已知。无法确定安全属性时只提示，不拆合图注、不选择新排法、不改编号、不移动图片，相关重排不列修复欠账。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-FIGURE-05","title":"多个图注和分图编号","authority":"required","sources":["B337","B338"],"selector":{"roles":["figure_note","subfigure_caption"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["注序、间隔与续行对齐正确","短语与句子按内容分别处理","分图序(a)(b)(c)连续"]},"requires":["semantic_roles","layout_adapter","human_review"],"fix":{"permission":"guarded_transform","target":{"operation":"figure_note_format"},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已调整{changes_zh}。","action":"图注或分图存在以下差异：{failed_items_zh}。可安全修复的间距、缩进和续行对齐将调整，编号问题请按提示处理。","risk":"仅处理已确认的具体差异；对象、条件或关联不明确时跳过，不改写事实内容。","reason":"只修改已确定多图注、注序边界和既有排法下的缩进、1字符间隔及悬挂／续行属性；动态宽度须已知。无法确定安全属性时只提示，不拆合图注、不选择新排法、不改编号、不移动图片，相关重排不列修复欠账。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["figure_note","subfigure_caption"],"when":[],"tests":[{"fact":"figure_notes.sequence_valid","op":"eq","value":true},{"fact":"subfigures.sequence_valid","op":"eq","value":true},{"fact":"figure_notes.layout_valid","op":"eq","value":true},{"fact":"figure_notes.indent_valid","op":"eq","value":true}],"reason":"分别检查多图注和分图编号连续性、间距及续行对齐；只对能安全定位的图注布局修复，编号差异批注，不判断短语和句子。 修复边界：只修改已确定多图注、注序边界和既有排法下的缩进、1字符间隔及悬挂／续行属性；动态宽度须已知。无法确定安全属性时只提示，不拆合图注、不选择新排法、不改编号、不移动图片，相关重排不列修复欠账。","requires":["semantic_roles"],"policy_refs":[]}}
```

</details>

<a id="ustc-figure-06"></a>

### USTC-FIGURE-06 · 插图不跨页及前后空行

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

插图不允许跨页；与文字段之间10磅空行，连续图表之间20磅空行。空行是版面间隔，不强制靠新增空段实现；已有间隔不重复叠加。

来源：官方模板§3.5.1 插图。性质：校方要求。对象：`figure`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-FIGURE-06","title":"插图不跨页及前后空行","authority":"required","sources":["B339"],"selector":{"roles":["figure"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"layout.crosses_page","op":"eq","value":false},{"fact":"layout.text_neighbor_blank.pt","op":"eq","value":10},{"fact":"layout.object_neighbor_blank.pt","op":"eq","value":20}]},"requires":["semantic_roles","layout_adapter"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：插图不允许跨页；与文字段之间10磅空行，连续图表之间20磅空行。空行是版面间隔，不强制靠新增空段实现；已有间隔不重复叠加。","risk":"移动对象、插页或重编号可能改变分页、引用关系或图表位置。","reason":"这项要求需要真实版面或关系确认；仅凭XML与缓存页码不能安全代改。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["figure"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","layout_adapter"],"policy_refs":[]}}
```

</details>

<a id="ustc-object-04"></a>

### USTC-OBJECT-04 · 图表与正文穿插的建议

服务分类：不检查、不批注（保留规范记录）。执行范围：用户复核决定不处理：保留已识别原文及来源，不检查、不修改、不批注。

不宜多个插图或表格连续排版，宜与论述段落穿插；确有需要可连续，并满足20磅空行。不能仅因连续出现就报硬错误。

来源：官方模板§3.5.1 插图；官方模板§3.5.2 表格。性质：校方建议。对象：`figure, table`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-OBJECT-04","title":"图表与正文穿插的建议","authority":"advisory","sources":["B339","B345"],"selector":{"roles":["figure","table"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["连续排版是否必要","穿插安排有利阅读"]},"requires":["human_review"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：不宜多个插图或表格连续排版，宜与论述段落穿插；确有需要可连续，并满足20磅空行。不能仅因连续出现就报硬错误。","risk":"自动改写可能改变学术含义、符号用途或作者的真实陈述。","reason":"这项要求依赖语义和实际内容判断，程序只列出核对事项，不能替作者决定。"},"audit":{"status":"unsupported","notification":"never","roles":["figure","table"],"when":[],"tests":null,"reason":"用户复核决定不处理：保留已识别原文及来源，不检查、不修改、不批注。","requires":["human_review"],"policy_refs":[]}}
```

</details>

<a id="ustc-table-01"></a>

### USTC-TABLE-01 · 表格文字和单元格段落

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

表格文字中文宋体，英文及阿拉伯数字Times New Roman，11pt；单元格段落单倍行距，段前段后3磅。此规则只选论文数据表，不选封面布局表或公式布局表。

来源：官方模板§3.5.2 表格。性质：校方要求。对象：`data_table_cell_paragraph`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-TABLE-01","title":"表格文字和单元格段落","authority":"required","sources":["B341","B342"],"selector":{"roles":["data_table_cell_paragraph"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"font.eastAsia":"宋体","font.latin":"Times New Roman","size.pt":11,"paragraph.line":{"mode":"single"},"paragraph.before.pt":3,"paragraph.after.pt":3}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"font.eastAsia":"宋体","font.latin":"Times New Roman","size.pt":11,"paragraph.line":{"mode":"single"},"paragraph.before.pt":3,"paragraph.after.pt":3},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“表格文字和单元格段落”调整：{changes_zh}。表格文字中文宋体，英文及阿拉伯数字Times New Roman，11pt；单元格段落单倍行距，段前段后3磅。此规则只选论文数据表，不选封面布局表或公式布局表。","action":"表格文字中文宋体，英文及阿拉伯数字Times New Roman，11pt；单元格段落单倍行距，段前段后3磅。此规则只选论文数据表，不选封面布局表或公式布局表。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["data_table_cell_paragraph"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-table-02"></a>

### USTC-TABLE-02 · 表题格式

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

表题11pt，中文宋体、英文Times New Roman，加粗居中，单倍行距，段前6磅、段后0磅。

来源：官方模板§3.5.2 表格。性质：校方要求。对象：`table_caption`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-TABLE-02","title":"表题格式","authority":"required","sources":["B341","B342"],"selector":{"roles":["table_caption"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"font.eastAsia":"宋体","font.latin":"Times New Roman","size.pt":11,"font.bold":true,"paragraph.align":"center","paragraph.line":{"mode":"single"},"paragraph.before.pt":6,"paragraph.after.pt":0}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"font.eastAsia":"宋体","font.latin":"Times New Roman","size.pt":11,"font.bold":true,"paragraph.align":"center","paragraph.line":{"mode":"single"},"paragraph.before.pt":6,"paragraph.after.pt":0},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“表题格式”调整：{changes_zh}。表题11pt，中文宋体、英文Times New Roman，加粗居中，单倍行距，段前6磅、段后0磅。","action":"表题11pt，中文宋体、英文Times New Roman，加粗居中，单倍行距，段前6磅、段后0磅。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["table_caption"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-table-03"></a>

### USTC-TABLE-03 · 表题位置和续表

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

表题在表上方，中英文表题各行且中文在前，序号题名隔一汉字符；跨页大表可用“续表”形式，续表表序前加“续”并重复横表头。没有跨页时不要求续表。

来源：官方模板§3.5.2 表格。性质：校方要求。对象：`table`。按服务分类决定是否检查与批注，不自动代改。

处理边界：明确间隔及已确认既有表头行的重复属性可安全处理；猜表头、补列名、搬表题或拆表不列自动修复。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-TABLE-03","title":"表题位置和续表","authority":"required","sources":["B342","B343"],"selector":{"roles":["table"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"caption.position","op":"eq","value":"above"},{"fact":"caption.bilingual_order_valid","op":"eq","value":true},{"fact":"number_title.gap.em","op":"eq","value":1},{"fact":"continuation.label_and_header_valid","op":"eq","value":true}]},"requires":["semantic_roles","layout_adapter"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：表题在表上方，中英文表题各行且中文在前，序号题名隔一汉字符；跨页大表可用“续表”形式，续表表序前加“续”并重复横表头。没有跨页时不要求续表。","risk":"移动对象、插页或重编号可能改变分页、引用关系或图表位置。","reason":"明确间隔及已确认既有表头行的重复属性可安全处理；猜表头、补列名、搬表题或拆表不列自动修复。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["table"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。 修复边界：明确间隔及已确认既有表头行的重复属性可安全处理；猜表头、补列名、搬表题或拆表不列自动修复。","requires":["semantic_roles","layout_adapter"],"policy_refs":[]}}
```

</details>

<a id="ustc-table-04"></a>

### USTC-TABLE-04 · 表注格式

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

表注文字沿表格要求使用11pt，中文宋体、英文Times New Roman；单倍行距，段前6磅、段后0磅。多个表注的对齐另按USTC-TABLE-05处理。

来源：官方模板§3.5.2 表格。性质：校方要求。对象：`table_note`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-TABLE-04","title":"表注格式","authority":"required","sources":["B341","B344"],"selector":{"roles":["table_note"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"font.eastAsia":"宋体","font.latin":"Times New Roman","size.pt":11,"paragraph.line":{"mode":"single"},"paragraph.before.pt":6,"paragraph.after.pt":0}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"font.eastAsia":"宋体","font.latin":"Times New Roman","size.pt":11,"paragraph.line":{"mode":"single"},"paragraph.before.pt":6,"paragraph.after.pt":0},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“表注格式”调整：{changes_zh}。表注文字沿表格要求使用11pt，中文宋体、英文Times New Roman；单倍行距，段前6磅、段后0磅。多个表注的对齐另按USTC-TABLE-05处理。","action":"表注文字沿表格要求使用11pt，中文宋体、英文Times New Roman；单倍行距，段前6磅、段后0磅。多个表注的对齐另按USTC-TABLE-05处理。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["table_note"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-table-05"></a>

### USTC-TABLE-05 · 表注位置、编号与短语标点

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：检查已有表注的位置、多注编号、缩进、间距及续行对齐；只修复可确认布局，不判断短语语义。

执行边界：表注存在以下差异：{failed_items_zh}。多个表注应顺序编号，注序左缩进2字、与注文空1字符，续行悬挂左对齐并两端对齐。

表注置于表下；多个表注须顺序编号，左缩进2字，与注文间空一字符，续行悬挂左齐；注文若为短语，末尾不加标点。

来源：官方模板§3.5.2 表格。性质：校方要求。对象：`table_note`。执行以本条服务分类与结构化修复权限为准。

处理边界：只修改已确定多表注、注序边界和既有排法下的2字缩进、1字符间隔、悬挂／对齐属性；动态宽度须已知。需要拆合／重排或猜表注边界时只提示，不改编号、位置、文字或句末标点，不列此类修复欠账。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-TABLE-05","title":"表注位置、编号与短语标点","authority":"required","sources":["B344"],"selector":{"roles":["table_note"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["表注位置正确","多注序号缩进间隔及续行对齐正确","短语末无标点","多个表注续行悬挂左齐且两端对齐"]},"requires":["semantic_roles","layout_adapter","human_review"],"fix":{"permission":"guarded_transform","target":{"operation":"table_note_format"},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已调整{changes_zh}。","action":"表注存在以下差异：{failed_items_zh}。多个表注应顺序编号，注序左缩进2字、与注文空1字符，续行悬挂左对齐并两端对齐。","risk":"仅处理已确认的具体差异；对象、条件或关联不明确时跳过，不改写事实内容。","reason":"只修改已确定多表注、注序边界和既有排法下的2字缩进、1字符间隔、悬挂／对齐属性；动态宽度须已知。需要拆合／重排或猜表注边界时只提示，不改编号、位置、文字或句末标点，不列此类修复欠账。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["table_note"],"when":[],"tests":[{"fact":"table_notes.position_valid","op":"eq","value":true},{"fact":"table_notes.sequence_valid","op":"eq","value":true},{"fact":"table_notes.layout_valid","op":"eq","value":true},{"fact":"table_notes.indent_valid","op":"eq","value":true}],"reason":"检查已有表注的位置、多注编号、缩进、间距及续行对齐；只修复可确认布局，不判断短语语义。 修复边界：只修改已确定多表注、注序边界和既有排法下的2字缩进、1字符间隔、悬挂／对齐属性；动态宽度须已知。需要拆合／重排或猜表注边界时只提示，不改编号、位置、文字或句末标点，不列此类修复欠账。","requires":["semantic_roles"],"policy_refs":[]}}
```

</details>

<a id="ustc-table-06"></a>

### USTC-TABLE-06 · 表格前后空行

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

表格前后与文字段落留10磅空行，连续表格或插图之间20磅空行；按实际间隔检查，不能重复添加空段。

来源：官方模板§3.5.2 表格。性质：校方要求。对象：`table`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-TABLE-06","title":"表格前后空行","authority":"required","sources":["B345"],"selector":{"roles":["table"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"layout.text_neighbor_blank.pt","op":"eq","value":10},{"fact":"layout.object_neighbor_blank.pt","op":"eq","value":20}]},"requires":["semantic_roles","layout_adapter"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：表格前后与文字段落留10磅空行，连续表格或插图之间20磅空行；按实际间隔检查，不能重复添加空段。","risk":"移动对象、插页或重编号可能改变分页、引用关系或图表位置。","reason":"这项要求需要真实版面或关系确认；仅凭XML与缓存页码不能安全代改。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["table"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","layout_adapter"],"policy_refs":[]}}
```

</details>

<a id="ustc-equation-01"></a>

### USTC-EQUATION-01 · 编号表达式字号与段距

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

编号表达式另起段，字号同正文小四号，段前段后6磅；行距按需要，不强制20磅。

来源：官方模板§3.5.3 表达式。性质：校方要求。对象：`numbered_equation`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-EQUATION-01","title":"编号表达式字号与段距","authority":"required","sources":["B347","B349"],"selector":{"roles":["numbered_equation"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"size.pt":12,"paragraph.before.pt":6,"paragraph.after.pt":6}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"size.pt":12,"paragraph.before.pt":6,"paragraph.after.pt":6},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“编号表达式字号与段距”调整：{changes_zh}。编号表达式另起段，字号同正文小四号，段前段后6磅；行距按需要，不强制20磅。","action":"编号表达式另起段，字号同正文小四号，段前段后6磅；行距按需要，不强制20磅。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["numbered_equation"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-equation-02"></a>

### USTC-EQUATION-02 · 表达式排列与断行

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：只检查编号公式的居中或空两汉字符及全文一致性，以及可可靠测量的分数线；只安全修复段落布局，不重写数学内容。

执行边界：公式存在以下差异：{failed_items_zh}。另段居中与另段空两汉字符均允许，全文应统一；分数线应覆盖分子、分母中较长者。

编号表达式另段居中或另段空两个汉字符，全文统一采用一种；分数线不短于分子分母较长者。断行和行内高度建议另按USTC-EQUATION-04核对，不自动重写数学内容。

来源：官方模板§3.5.3 表达式。性质：校方要求。对象：`equation`。执行以本条服务分类与结构化修复权限为准。

处理边界：只修改已确认公式的段落属性，且须有文档已明确采用的合法目标模式。两种合法模式混用而无明确选择时只提示，不依据首个公式任选模式，不重排容器、分数线或数学内容；此类动作不计自动修复欠账。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-EQUATION-02","title":"表达式排列与断行","authority":"required","sources":["B347","B348"],"selector":{"roles":["equation"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["另段居中或缩进两汉字符，全文统一","分数线不短于分子分母较长者"]},"requires":["math_structure","layout_adapter","human_review"],"fix":{"permission":"guarded_transform","target":{"operation":"equation_block_format"},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已调整{changes_zh}。","action":"公式存在以下差异：{failed_items_zh}。另段居中与另段空两汉字符均允许，全文应统一；分数线应覆盖分子、分母中较长者。","risk":"仅处理已确认的具体差异；对象、条件或关联不明确时跳过，不改写事实内容。","reason":"只修改已确认公式的段落属性，且须有文档已明确采用的合法目标模式。两种合法模式混用而无明确选择时只提示，不依据首个公式任选模式，不重排容器、分数线或数学内容；此类动作不计自动修复欠账。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["numbered_equation"],"when":[],"tests":[{"fact":"equations.block_layout_valid","op":"eq","value":true},{"fact":"equations.fraction_bar_valid","op":"eq","value":true}],"reason":"只检查编号公式的居中或空两汉字符及全文一致性，以及可可靠测量的分数线；只安全修复段落布局，不重写数学内容。 修复边界：只修改已确认公式的段落属性，且须有文档已明确采用的合法目标模式。两种合法模式混用而无明确选择时只提示，不依据首个公式任选模式，不重排容器、分数线或数学内容；此类动作不计自动修复欠账。","requires":["semantic_roles"],"policy_refs":[]}}
```

</details>

<a id="ustc-equation-04"></a>

### USTC-EQUATION-04 · 公式断行和行内高度建议

服务分类：不检查、不批注（保留规范记录）。执行范围：没有可执行的明确检查条件，或依赖内容语义/主观判断；保留已辨认的规范，不执行检查、不自动修复、不写批注。

长式需断行时宜在关系或运算符后断行；正文分数宜降低到一行，可采用斜线或负指数等表达。作为建议，不因未采用某一种数学写法直接报硬错误。

来源：官方模板§3.5.3 表达式。性质：校方建议。对象：`equation`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-EQUATION-04","title":"公式断行和行内高度建议","authority":"advisory","sources":["B347"],"selector":{"roles":["equation"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["断行位置是否利于阅读","行内分数高度是否合适"]},"requires":["math_structure","layout_adapter","human_review"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"长式需断行时宜在关系或运算符后断行；正文分数宜降低到一行，可采用斜线或负指数等表达。作为建议，不因未采用某一种数学写法直接报硬错误。","risk":"自动改写可能改变学术含义、符号用途或作者的真实陈述。","reason":"这项要求依赖语义和实际内容判断，程序只列出核对事项，不能替作者决定。"},"audit":{"status":"unsupported","notification":"never","roles":["equation"],"when":[],"tests":null,"reason":"没有可执行的明确检查条件，或依赖内容语义/主观判断；保留已辨认的规范，不执行检查、不自动修复、不写批注。","requires":["math_structure","layout_adapter","human_review"],"policy_refs":[]}}
```

</details>

<a id="ustc-equation-03"></a>

### USTC-EQUATION-03 · 表达式序号

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

序号用括号括起，放表达式右边行末；序号字体、字号、行距同段落文字，序号与表达式间不加连线。

来源：官方模板§3.5.3 表达式。性质：校方要求。对象：`equation_number`。按服务分类决定是否检查与批注，不自动代改。

处理边界：仅已定位序号的明确字体／字号／段落显示属性可安全处理；补括号、改编号、删除连接文字或重排公式只提示。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-EQUATION-03","title":"表达式序号","authority":"required","sources":["B350"],"selector":{"roles":["equation_number"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"equation_number.parenthesized","op":"eq","value":true},{"fact":"layout.equation_number_at_right_end","op":"eq","value":true},{"fact":"equation_number.matches_paragraph_text_format","op":"eq","value":true},{"fact":"equation_number.has_connector","op":"eq","value":false}]},"requires":["math_structure","effective_properties","layout_adapter"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：序号用括号括起，放表达式右边行末；序号字体、字号、行距同段落文字，序号与表达式间不加连线。","risk":"移动对象、插页或重编号可能改变分页、引用关系或图表位置。","reason":"仅已定位序号的明确字体／字号／段落显示属性可安全处理；补括号、改编号、删除连接文字或重排公式只提示。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["equation_number"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。 修复边界：仅已定位序号的明确字体／字号／段落显示属性可安全处理；补括号、改编号、删除连接文字或重排公式只提示。","requires":["math_structure","effective_properties","layout_adapter"],"policy_refs":[]}}
```

</details>

<a id="ustc-note-01"></a>

### USTC-NOTE-01 · 注释用途及标准

服务分类：不检查、不批注（保留规范记录）。执行范围：没有可执行的明确检查条件，或依赖内容语义/主观判断；保留已辨认的规范，不执行检查、不自动修复、不写批注。

无具体文献来源而需进一步解释字词短语时使用注释；标注按CY/T 121。模板只指向该标准，不凭此扩张其全部细则。

来源：官方模板§3.7 注释。性质：校方要求。对象：`note`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-NOTE-01","title":"注释用途及标准","authority":"required","sources":["B355"],"selector":{"roles":["note"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["确为补充说明而非遗漏引用来源","需要具体注释标注细则时核标准原文"]},"requires":["human_review","external_standard"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：无具体文献来源而需进一步解释字词短语时使用注释；标注按CY/T 121。模板只指向该标准，不凭此扩张其全部细则。","risk":"未核原始依据就改写可能导致分类、著录或引用事实错误。","reason":"需要标准原文、分类表或来源文献等外部证据，不能仅凭当前文档完成确认。"},"audit":{"status":"unsupported","notification":"never","roles":["note"],"when":[],"tests":null,"reason":"没有可执行的明确检查条件，或依赖内容语义/主观判断；保留已辨认的规范，不执行检查、不自动修复、不写批注。","requires":["human_review","external_standard"],"policy_refs":[]}}
```

</details>

<a id="ustc-note-02"></a>

### USTC-NOTE-02 · 脚注与数量建议

服务分类：可检查的建议；仅明确不符合时批注，不修改。执行范围：按每一实际物理页统计注释，超过5条才建议精简；5条及以下不作数量提醒。只批注、不修改，未取得可靠分页结果时跳过。

执行边界：本页注释存在以下建议项：{failed_items_zh}。数量提醒按单页超过5条触发；建议采用同页底部脚注。

产品执行口径：同一实际物理页的注释超过5条时建议精简，5条及以下不提示；只批注，不修改。无可靠分页结果时跳过，禁止以全文计数替代。

注释不宜过多；学位论文篇幅长，宜采用文中编号加同页底部脚注。学校没有在模板明确脚注字体、字号、脚注线长度或横向页工程规则，不从其他样式推导。

来源：官方模板§3.7 注释。性质：校方建议。对象：`note`。执行以本条服务分类与结构化修复权限为准。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-NOTE-02","title":"脚注与数量建议","authority":"advisory","sources":["B356","B357"],"selector":{"roles":["note_page"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"review","items":["控制不必要注释","优先同页底部脚注"]},"requires":["human_review"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"本页注释存在以下建议项：{failed_items_zh}。数量提醒按单页超过5条触发；建议采用同页底部脚注。","risk":"仅处理已确认的具体差异；对象、条件或关联不明确时跳过，不改写事实内容。","reason":"按每一实际物理页统计注释，超过5条才建议精简；5条及以下不作数量提醒。只批注、不修改，未取得可靠分页结果时跳过。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["note_page"],"when":[],"tests":[{"fact":"notes.on_page_count","op":"lte","value":5},{"fact":"notes.same_page_footnotes","op":"eq","value":true}],"reason":"按每一实际物理页统计注释，超过5条才建议精简；5条及以下不作数量提醒。只批注、不修改，未取得可靠分页结果时跳过。","requires":["semantic_roles","layout_adapter"],"policy_refs":["notes_five_per_page"]}}
```

</details>

## 五、参考文献、附录、致谢和科研成果

<a id="ustc-ref-01"></a>

### USTC-REF-01 · 参考文献条目格式

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

参考文献条目五号，中文宋体、英文Times New Roman，固定行距20磅，段前段后0磅；“参考文献”标题同章标题。

来源：官方模板§2.10 参考文献。性质：校方要求。对象：`reference_entry`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-REF-01","title":"参考文献条目格式","authority":"required","sources":["B286"],"selector":{"roles":["reference_entry"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"font.eastAsia":"宋体","font.latin":"Times New Roman","size.pt":10.5,"paragraph.line":{"mode":"exact","pt":20},"paragraph.before.pt":0,"paragraph.after.pt":0}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"font.eastAsia":"宋体","font.latin":"Times New Roman","size.pt":10.5,"paragraph.line":{"mode":"exact","pt":20},"paragraph.before.pt":0,"paragraph.after.pt":0},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“参考文献条目格式”调整：{changes_zh}。参考文献条目五号，中文宋体、英文Times New Roman，固定行距20磅，段前段后0磅；“参考文献”标题同章标题。","action":"参考文献条目五号，中文宋体、英文Times New Roman，固定行距20磅，段前段后0磅；“参考文献”标题同章标题。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["reference_entry"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-ref-02"></a>

### USTC-REF-02 · 集中著录与制度统一

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

参考文献集中在正文之后，不分章著录；全文选择顺序编码制或著者—出版年制之一，并用对应著录方式，不得混用。

来源：官方模板§2.10 参考文献；官方模板§3.6 引用；官方模板“参考文献著录示例的使用说明”。性质：校方要求。对象：`references`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-REF-02","title":"集中著录与制度统一","authority":"required","sources":["B286","B287","B352","B379"],"selector":{"roles":["references"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"references.after_body","op":"eq","value":true},{"fact":"references.split_by_chapter","op":"eq","value":false},{"fact":"citations.system","op":"in","value":["numeric","author_year"]},{"fact":"citations.system_consistent","op":"eq","value":true}]},"requires":["semantic_roles","citation_links"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：参考文献集中在正文之后，不分章著录；全文选择顺序编码制或著者—出版年制之一，并用对应著录方式，不得混用。","risk":"自动改文字、序号或关联关系可能误改真实内容并破坏交叉引用。","reason":"本规则只授权检查；发现差异后需确认对象及关联，再由作者修改相关内容。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["references"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","citation_links"],"policy_refs":[]}}
```

</details>

<a id="ustc-ref-03"></a>

### USTC-REF-03 · 文献真实性、语种与完整性

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：只查已确认正文引文与文后条目的双向对应和缺失，不查是否真实阅读、翻译或来源真实性。

执行边界：正文引文与文后参考文献存在未对应项：{failed_items_zh}。请补充缺失条目或核对引用关联，系统不代编文献。

外文文献直接用外文著录，无需译成中文；所有引用（包括本人论文）须注明出处无遗漏；作者核实实际阅读、文献真实性及引用完整性。程序不能凭文献列表宣告科研诚信合格。

来源：官方模板§1.2 提高学位论文的规范性；官方模板§2.10 参考文献；官方模板§3.6 引用。性质：校方要求。对象：`references, citation`。执行以本条服务分类与结构化修复权限为准。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-REF-03","title":"文献真实性、语种与完整性","authority":"required","sources":["B233","B286","B352","B353"],"selector":{"roles":["references","citation"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["引用与参考文献双向核对","外文著录保留原语种","本人及他人成果引用无遗漏","作者核验阅读与来源事实"]},"requires":["citation_links","external_bibliography","human_review"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"正文引文与文后参考文献存在未对应项：{failed_items_zh}。请补充缺失条目或核对引用关联，系统不代编文献。","risk":"仅处理已确认的具体差异；对象、条件或关联不明确时跳过，不改写事实内容。","reason":"只查已确认正文引文与文后条目的双向对应和缺失，不查是否真实阅读、翻译或来源真实性。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["document"],"when":[],"tests":[{"fact":"references.citation_targets_exist","op":"eq","value":true},{"fact":"references.entries_have_citations","op":"eq","value":true}],"reason":"只查已确认正文引文与文后条目的双向对应和缺失，不查是否真实阅读、翻译或来源真实性。","requires":["semantic_roles","citation_links"],"policy_refs":[]}}
```

</details>

<a id="ustc-ref-04"></a>

### USTC-REF-04 · 顺序编码制标注和列表

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

顺序编码制文内序号置方括号且上标；列表按索引编号顺序，序号方括号，序号悬挂在外。模板未为此制给出固定悬挂字符数，不能套用著者年制数值。

来源：官方模板§2.10 参考文献。性质：校方要求。对象：`numeric_citation, numeric_reference_entry`。按服务分类决定是否检查与批注，不自动代改。

处理边界：仅已确认引文范围的上标与明确外悬属性列为安全格式目标；缺括号、跳号、重复号及重排编号只提示，不计自动校对欠账。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-REF-04","title":"顺序编码制标注和列表","authority":"required","sources":["B287","B288"],"selector":{"roles":["numeric_citation","numeric_reference_entry"],"confidence":"confirmed","mode":"document_group"},"when":[{"fact":"context.citation_system","op":"eq","value":"numeric"}],"check":{"kind":"assertions","tests":[{"fact":"citation.brackets","op":"eq","value":"square"},{"fact":"citation.superscript","op":"eq","value":true},{"fact":"references.order_matches_citation_number","op":"eq","value":true},{"fact":"references.number_hangs_outside","op":"eq","value":true}]},"requires":["citation_links","effective_properties","semantic_roles"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：顺序编码制文内序号置方括号且上标；列表按索引编号顺序，序号方括号，序号悬挂在外。模板未为此制给出固定悬挂字符数，不能套用著者年制数值。","risk":"自动改文字、序号或关联关系可能误改真实内容并破坏交叉引用。","reason":"仅已确认引文范围的上标与明确外悬属性列为安全格式目标；缺括号、跳号、重复号及重排编号只提示，不计自动校对欠账。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["numeric_citation","numeric_reference_entry"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。 修复边界：仅已确认引文范围的上标与明确外悬属性列为安全格式目标；缺括号、跳号、重复号及重排编号只提示，不计自动校对欠账。","requires":["citation_links","effective_properties","semantic_roles"],"policy_refs":[]}}
```

</details>

<a id="ustc-ref-05"></a>

### USTC-REF-05 · 著者出版年制标注和排序

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：检查文种分组、中文在前、著者排序与悬挂缩进；2汉字符或4字符均合法；不禁止可选序号。不因一处排序键未知而跳过其他明确格式差异。

执行边界：著者—出版年制参考文献存在以下差异：{failed_items_zh}。文献按文种分组、中文在前，各组按著者字母排序；悬挂缩进2汉字符或4字符均可。

著者—出版年制一般著者与年份放括号中以逗号分隔；文献按文种分类、中文在前、按著者字母排序，每条不必加序号，悬挂缩进2个汉字符或4个字符。两种合法缩进都接受，不按固定单值强改。

来源：官方模板§2.10 参考文献。性质：校方要求。对象：`author_year_citation, author_year_reference_entry`。执行以本条服务分类与结构化修复权限为准。

处理边界：分别处理已确认失败且目标安全的子项。合法2汉字符或4字符悬挂不改，非法缩进采用既定2汉字符。排序仅限文种与键明确、连续完整无编号纯文本、无域／书签／批注锚点且引文关系不变的条目；同键保序。复杂域／编号／关系条目仅检查提示，不搬动，不列安全搬运未实现功能。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-REF-05","title":"著者出版年制标注和排序","authority":"required","sources":["B287","B288"],"selector":{"roles":["author_year_citation","author_year_reference_entry"],"confidence":"confirmed","mode":"document_group"},"when":[{"fact":"context.citation_system","op":"eq","value":"author_year"}],"check":{"kind":"review","items":["作者年份标注适当","按文种与著者排序且中文在前","悬挂缩进为2汉字符或4字符","不把可省序号误作一律禁止序号"]},"requires":["citation_links","effective_properties","human_review"],"fix":{"permission":"guarded_transform","target":{"operation":"author_year_format"},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已调整{changes_zh}。","action":"著者—出版年制参考文献存在以下差异：{failed_items_zh}。文献按文种分组、中文在前，各组按著者字母排序；悬挂缩进2汉字符或4字符均可。","risk":"仅处理已确认的具体差异；对象、条件或关联不明确时跳过，不改写事实内容。","reason":"分别处理已确认失败且目标安全的子项。合法2汉字符或4字符悬挂不改，非法缩进采用既定2汉字符。排序仅限文种与键明确、连续完整无编号纯文本、无域／书签／批注锚点且引文关系不变的条目；同键保序。复杂域／编号／关系条目仅检查提示，不搬动，不列安全搬运未实现功能。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["author_year_citation","author_year_reference_entry"],"when":[],"tests":[{"fact":"references.language_groups_valid","op":"eq","value":true},{"fact":"references.author_order_valid","op":"eq","value":true},{"fact":"references.hanging_indent_valid","op":"eq","value":true}],"reason":"检查文种分组、中文在前、著者排序与悬挂缩进；2汉字符或4字符均合法；不禁止可选序号。不因一处排序键未知而跳过其他明确格式差异。 修复边界：分别处理已确认失败且目标安全的子项。合法2汉字符或4字符悬挂不改，非法缩进采用既定2汉字符。排序仅限文种与键明确、连续完整无编号纯文本、无域／书签／批注锚点且引文关系不变的条目；同键保序。复杂域／编号／关系条目仅检查提示，不搬动，不列安全搬运未实现功能。","requires":["semantic_roles"],"policy_refs":[]}}
```

</details>

<a id="ustc-ref-06"></a>

### USTC-REF-06 · 参考文献半角标点及GB/T 7714

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：只检查并替换已确认著录标点为半角，不依赖整部国标；URL、DOI、标识符及需原样保留的题名内部内容受保护。GB/T7714其余细则继续归档。

执行边界：参考文献著录标点存在全角形式：{failed_items_zh}。可安全定位时替换为半角，文献内容及标识符保持原样。

参考文献所有标点使用半角符号，著录格式参见GB/T 7714-2025；需保护DOI、URL等内容，非ASCII字符不自动等于全角标点。此规则包不展开整个国标，也不以范例中的全角冒号等反推许可。

来源：官方模板§2.10 参考文献。性质：校方要求。对象：`reference_entry`。执行以本条服务分类与结构化修复权限为准。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-REF-06","title":"参考文献半角标点及GB/T 7714","authority":"required","sources":["B289"],"selector":{"roles":["reference_entry"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["著录标点半角","必要著录细节依据GB/T 7714-2025原文审查","标识符和题名内容未被错误替换"]},"requires":["semantic_roles","text","external_standard","human_review"],"fix":{"permission":"guarded_transform","target":{"operation":"reference_punctuation_to_halfwidth"},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已调整{changes_zh}。","action":"参考文献著录标点存在全角形式：{failed_items_zh}。可安全定位时替换为半角，文献内容及标识符保持原样。","risk":"仅处理已确认的具体差异；对象、条件或关联不明确时跳过，不改写事实内容。","reason":"只检查并替换已确认著录标点为半角，不依赖整部国标；URL、DOI、标识符及需原样保留的题名内部内容受保护。GB/T7714其余细则继续归档。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["reference_entry"],"when":[],"tests":[{"fact":"punctuation.reference_halfwidth_valid","op":"eq","value":true}],"reason":"只检查并替换已确认著录标点为半角，不依赖整部国标；URL、DOI、标识符及需原样保留的题名内部内容受保护。GB/T7714其余细则继续归档。","requires":["semantic_roles","text","protected_text_spans"],"policy_refs":[]}}
```

</details>

<a id="ustc-appendix-01"></a>

### USTC-APPENDIX-01 · 附录可选

服务分类：不检查、不批注（保留规范记录）。执行范围：用户复核决定不处理：保留已识别原文及来源，不检查、不修改、不批注。

附录为正文补充且不是必需；可放冗长推导、辅助工具表格、重复数据图表、必要程序和问卷方案。不因无附录报错。

来源：官方模板§2.11 附录。性质：校方建议。对象：`appendix`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-APPENDIX-01","title":"附录可选","authority":"advisory","sources":["B291"],"selector":{"roles":["appendix"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["是否确有正文之外的补充材料"]},"requires":["human_review"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：附录为正文补充且不是必需；可放冗长推导、辅助工具表格、重复数据图表、必要程序和问卷方案。不因无附录报错。","risk":"自动改写可能改变学术含义、符号用途或作者的真实陈述。","reason":"这项要求依赖语义和实际内容判断，程序只列出核对事项，不能替作者决定。"},"audit":{"status":"unsupported","notification":"never","roles":["appendix"],"when":[],"tests":null,"reason":"用户复核决定不处理：保留已识别原文及来源，不检查、不修改、不批注。","requires":["human_review"],"policy_refs":[]}}
```

</details>

<a id="ustc-appendix-02"></a>

### USTC-APPENDIX-02 · 附录标题和编号

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

附录按大写字母顺序编号；只有一个也为附录A；各附录有标题，序号与标题空一汉字符，标题同章标题，内容格式同正文。

来源：官方模板§2.11 附录。性质：校方要求。对象：`appendix`。按安全关联范围自动修复，关系不明只提示。

处理边界：单个附录缺字母或字母不是A时补为附录A，并同步确定的目录标题与引用；已有标题的序号后改为空一汉字符。缺标题名称只提示，不代写；多个附录错序或关联不明时仅提示。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-APPENDIX-02","title":"附录标题和编号","authority":"required","sources":["B292"],"selector":{"roles":["appendix"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"appendix.letter_sequence_valid","op":"eq","value":true},{"fact":"appendix.has_title","op":"eq","value":true},{"fact":"number_title.gap.em","op":"eq","value":1}]},"requires":["semantic_roles","numbering","field_links"],"fix":{"permission":"guarded_transform","target":{"operation":"linked_numbering"},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已调整附录编号及明确关联：{changes_zh}。","action":"请核对并按实际情况处理：附录按大写字母顺序编号；只有一个也为附录A；各附录有标题，序号与标题空一汉字符，标题同章标题，内容格式同正文。","risk":"移动对象、插页或重编号可能改变分页、引用关系或图表位置。","reason":"单个附录缺字母或字母不是A时补为附录A，并同步确定的目录标题与引用；已有标题的序号后改为空一汉字符。缺标题名称只提示，不代写；多个附录错序或关联不明时仅提示。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["appendix"],"when":[],"tests":null,"reason":"仅确认失败时处理；按linked_numbering的安全范围联动编号及引用，关系不明时只提示。","requires":["semantic_roles","numbering","field_links"],"policy_refs":[]}}
```

</details>

<a id="ustc-appendix-03"></a>

### USTC-APPENDIX-03 · 附录普通段落格式

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

附录格式同正文：小四号宋体、英文数字Times New Roman，两端对齐，首行缩进2汉字符，段前段后0磅；含不编号公式的行距例外同正文。

来源：官方模板§2.11 附录；官方模板§3.2 文字。性质：校方要求。对象：`appendix_body_paragraph`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-APPENDIX-03","title":"附录普通段落格式","authority":"required","sources":["B292","B311"],"selector":{"roles":["appendix_body_paragraph"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"font.eastAsia":"宋体","font.latin":"Times New Roman","size.pt":12,"paragraph.before.pt":0,"paragraph.after.pt":0,"paragraph.align":"both","paragraph.firstLine.char":2}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"font.eastAsia":"宋体","font.latin":"Times New Roman","size.pt":12,"paragraph.before.pt":0,"paragraph.after.pt":0,"paragraph.align":"both","paragraph.firstLine.char":2},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“附录普通段落格式”调整：{changes_zh}。附录格式同正文：小四号宋体、英文数字Times New Roman，两端对齐，首行缩进2汉字符，段前段后0磅；含不编号公式的行距例外同正文。","action":"附录格式同正文：小四号宋体、英文数字Times New Roman，两端对齐，首行缩进2汉字符，段前段后0磅；含不编号公式的行距例外同正文。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["appendix_body_paragraph"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-appendix-04"></a>

### USTC-APPENDIX-04 · 附录普通段落行距

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

附录普通段落固定行距20磅；含不编号公式的段落不强制。

来源：官方模板§2.11 附录；官方模板§3.2 文字。性质：校方要求。对象：`appendix_body_paragraph`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-APPENDIX-04","title":"附录普通段落行距","authority":"required","sources":["B292","B311"],"selector":{"roles":["appendix_body_paragraph"],"confidence":"confirmed","mode":"each"},"when":[{"fact":"object.contains_unnumbered_math","op":"eq","value":false}],"check":{"kind":"properties","expected":{"paragraph.line":{"mode":"exact","pt":20}}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"paragraph.line":{"mode":"exact","pt":20}},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“附录普通段落行距”调整：{changes_zh}。附录普通段落固定行距20磅；含不编号公式的段落不强制。","action":"附录普通段落固定行距20磅；含不编号公式的段落不强制。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["appendix_body_paragraph"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-appendix-05"></a>

### USTC-APPENDIX-05 · 附录对象独立编号

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

附录图、表、表达式、参考文献另行编号，与正文分开，阿拉伯数字前冠附录字母，如图A.1、表B.2、式（C.3）。

来源：官方模板§2.11 附录。性质：校方要求。对象：`appendix_figure, appendix_table, appendix_equation, appendix_reference`。已定位且引用关系唯一的图、表及OMML编号公式可联动修复；附录参考文献独立编号尚未实现。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-APPENDIX-05","title":"附录对象独立编号","authority":"required","sources":["B293"],"selector":{"roles":["appendix_figure","appendix_table","appendix_equation","appendix_reference"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"numbering.appendix_sequence_valid","op":"eq","value":true},{"fact":"numbering.separate_from_body","op":"eq","value":true}]},"requires":["semantic_roles","numbering"],"fix":{"permission":"guarded_transform","target":{"operation":"linked_numbering"},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已调整附录编号及明确关联：{changes_zh}。","action":"请核对并按实际情况处理：附录图、表、表达式、参考文献另行编号，与正文分开，阿拉伯数字前冠附录字母，如图A.1、表B.2、式（C.3）。","risk":"自动改文字、序号或关联关系可能误改真实内容并破坏交叉引用。","reason":"仅对单个附录缺字母或字母不是A、明确间隔，以及归属确定且关系可唯一对应的附录图表公式编号进行联动修复。保留书签及REF域，更新目录标题缓存、明确的文中引用及编号缓存；章号STYLEREF域改为附录字母QUOTE域，SEQ使用独立附录序列并显式重置当前顺序号，防止刷新回正文编号。多个附录错序、重号导致的歧义、复杂或不完整域不自动修改。无附录不创建，缺标题不代写；不改公式内容、图表数据或页码。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["appendix_figure","appendix_table","appendix_equation","appendix_reference"],"when":[],"tests":null,"reason":"仅确认失败时处理；按linked_numbering的安全范围联动编号及引用，关系不明时只提示。","requires":["semantic_roles","numbering"],"policy_refs":[]}}
```

</details>

<a id="ustc-thanks-01"></a>

### USTC-THANKS-01 · 致谢位置与内容

服务分类：可检查的建议；仅明确不符合时批注，不修改。执行范围：仅在确认缺少致谢或后记时加一条结构建议，不生成缺失结构的字号、字体、行距批注；存在时由既有硬性格式规则检查并修复。

执行边界：论文中未发现致谢或后记，建议补充致谢部分。

正文和附录后一般放致谢，感谢导师及直接贡献者，包括资助、协助、建议帮助、转载引用授权等；文字谦虚诚恳、实事求是。

来源：官方模板§2.12 致谢。性质：校方建议。对象：`acknowledgements`。执行以本条服务分类与结构化修复权限为准。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-THANKS-01","title":"致谢位置与内容","authority":"advisory","sources":["B295","B296","B297","B298","B299","B300","B301"],"selector":{"roles":["acknowledgements"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["位置与贡献表述适当","感谢真实且无重要遗漏"]},"requires":["human_review"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"论文中未发现致谢或后记，建议补充致谢部分。","risk":"仅处理已确认的具体差异；对象、条件或关联不明确时跳过，不改写事实内容。","reason":"仅在确认缺少致谢或后记时加一条结构建议，不生成缺失结构的字号、字体、行距批注；存在时由既有硬性格式规则检查并修复。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["document"],"when":[],"tests":[{"fact":"structure.acknowledgements_present","op":"eq","value":true}],"reason":"仅在确认缺少致谢或后记时加一条结构建议，不生成缺失结构的字号、字体、行距批注；存在时由既有硬性格式规则检查并修复。","requires":["semantic_roles","text"],"policy_refs":[]}}
```

</details>

<a id="ustc-thanks-02"></a>

### USTC-THANKS-02 · 致谢篇幅

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

致谢不超过1000个汉字；按汉字计数，非汉字不混计成汉字。

来源：官方模板§2.12 致谢。性质：校方要求。对象：`acknowledgements_body`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-THANKS-02","title":"致谢篇幅","authority":"required","sources":["B301"],"selector":{"roles":["acknowledgements_body"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"length.han_count","op":"lte","value":1000}]},"requires":["semantic_roles","han_count"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：致谢不超过1000个汉字；按汉字计数，非汉字不混计成汉字。","risk":"自动改文字、序号或关联关系可能误改真实内容并破坏交叉引用。","reason":"本规则只授权检查；发现差异后需确认对象及关联，再由作者修改相关内容。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["acknowledgements_body"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","han_count"],"policy_refs":[]}}
```

</details>

<a id="ustc-thanks-03"></a>

### USTC-THANKS-03 · 致谢正文格式

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

致谢格式与正文相同；普通段落小四号，中文宋体、英文数字Times New Roman，两端对齐，首行2汉字符，段前段后0磅。标题同章标题；行距另按USTC-THANKS-04处理。

来源：官方模板§2.12 致谢；官方模板§3.2 文字。性质：校方要求。对象：`acknowledgements_body`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-THANKS-03","title":"致谢正文格式","authority":"required","sources":["B301","B311"],"selector":{"roles":["acknowledgements_body"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"font.eastAsia":"宋体","font.latin":"Times New Roman","size.pt":12,"paragraph.before.pt":0,"paragraph.after.pt":0,"paragraph.align":"both","paragraph.firstLine.char":2}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"font.eastAsia":"宋体","font.latin":"Times New Roman","size.pt":12,"paragraph.before.pt":0,"paragraph.after.pt":0,"paragraph.align":"both","paragraph.firstLine.char":2},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“致谢正文格式”调整：{changes_zh}。致谢格式与正文相同；普通段落小四号，中文宋体、英文数字Times New Roman，两端对齐，首行2汉字符，段前段后0磅。标题同章标题；行距另按USTC-THANKS-04处理。","action":"致谢格式与正文相同；普通段落小四号，中文宋体、英文数字Times New Roman，两端对齐，首行2汉字符，段前段后0磅。标题同章标题；行距另按USTC-THANKS-04处理。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["acknowledgements_body"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-thanks-04"></a>

### USTC-THANKS-04 · 致谢普通段落行距

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

致谢普通段落固定行距20磅；含不编号公式时允许按表达式需要调整行距，其他字体、字号和段距要求仍适用。

来源：官方模板§2.12 致谢；官方模板§3.2 文字。性质：校方要求。对象：`acknowledgements_body`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-THANKS-04","title":"致谢普通段落行距","authority":"required","sources":["B301","B311"],"selector":{"roles":["acknowledgements_body"],"confidence":"confirmed","mode":"each"},"when":[{"fact":"object.contains_unnumbered_math","op":"eq","value":false}],"check":{"kind":"properties","expected":{"paragraph.line":{"mode":"exact","pt":20}}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"paragraph.line":{"mode":"exact","pt":20}},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“致谢普通段落行距”调整：{changes_zh}。致谢普通段落固定行距20磅；含不编号公式时允许按表达式需要调整行距，其他字体、字号和段距要求仍适用。","action":"致谢普通段落固定行距20磅；含不编号公式时允许按表达式需要调整行距，其他字体、字号和段距要求仍适用。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["acknowledgements_body"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-thanks-05"></a>

### USTC-THANKS-05 · 致谢的真实表述

服务分类：不检查、不批注（保留规范记录）。执行范围：没有可执行的明确检查条件，或依赖内容语义/主观判断；保留已辨认的规范，不执行检查、不自动修复、不写批注。

致谢如存在，言语应谦虚诚恳、实事求是。致谢是否设置的建议与已写内容的真实性要求分别处理，不由程序编造感谢事实。

来源：官方模板§2.12 致谢。性质：校方要求。对象：`acknowledgements`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-THANKS-05","title":"致谢的真实表述","authority":"required","sources":["B301"],"selector":{"roles":["acknowledgements"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["如有致谢，言语谦虚诚恳、实事求是"]},"requires":["human_review"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对致谢中的帮助、贡献和资助陈述是否真实，言语谦虚诚恳；程序不能编造贡献者或感谢事实。","risk":"自动改写可能改变学术含义、符号用途或作者的真实陈述。","reason":"这项要求依赖语义和实际内容判断，程序只列出核对事项，不能替作者决定。"},"audit":{"status":"unsupported","notification":"never","roles":["acknowledgements"],"when":[],"tests":null,"reason":"没有可执行的明确检查条件，或依赖内容语义/主观判断；保留已辨认的规范，不执行检查、不自动修复、不写批注。","requires":["human_review"],"policy_refs":[]}}
```

</details>

<a id="ustc-result-01"></a>

### USTC-RESULT-01 · 在读科研成果格式

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

此部分文字宋体12磅、英文Times New Roman 12磅，固定行距20磅，段前段后0磅。原说明明确12磅，按数值呈现。

来源：官方模板“在读期间取得的科研成果填写说明”。性质：校方要求。对象：`research_achievement_entry`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-RESULT-01","title":"在读科研成果格式","authority":"required","sources":["B424"],"selector":{"roles":["research_achievement_entry"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"font.eastAsia":"宋体","font.latin":"Times New Roman","size.pt":12,"paragraph.line":{"mode":"exact","pt":20},"paragraph.before.pt":0,"paragraph.after.pt":0}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"font.eastAsia":"宋体","font.latin":"Times New Roman","size.pt":12,"paragraph.line":{"mode":"exact","pt":20},"paragraph.before.pt":0,"paragraph.after.pt":0},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“在读科研成果格式”调整：{changes_zh}。此部分文字宋体12磅、英文Times New Roman 12磅，固定行距20磅，段前段后0磅。原说明明确12磅，按数值呈现。","action":"此部分文字宋体12磅、英文Times New Roman 12磅，固定行距20磅，段前段后0磅。原说明明确12磅，按数值呈现。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["research_achievement_entry"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-result-02"></a>

### USTC-RESULT-02 · 科研成果分类与顺序建议

服务分类：可检查的建议；仅明确不符合时批注，不修改。执行范围：如有科研成果，只检查现有各类别内发表时间倒序；同日期保留原序，日期无法比较的关系跳过；只批注，不修改。

执行边界：科研成果中部分条目未按发表时间由近及远排列，建议调整对应类别内的顺序。

科研成果可包括论文、会议论文、专利、软件著作权、科技成果奖、科研项目、行业标准等；建议分类，各类按发表时间由近及远排列。模板示范有此部分，不据示例推定所有人必须有全部类别。

来源：官方模板“在读期间取得的科研成果填写说明”。性质：校方建议。对象：`research_achievements`。执行以本条服务分类与结构化修复权限为准。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-RESULT-02","title":"科研成果分类与顺序建议","authority":"advisory","sources":["B405","B406","B407","B410","B411","B414","B415","B418","B419","B424"],"selector":{"roles":["research_achievements"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["按适用成果类型分类","每类建议时间倒序","作者核实真实成果"]},"requires":["human_review"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"科研成果中部分条目未按发表时间由近及远排列，建议调整对应类别内的顺序。","risk":"仅处理已确认的具体差异；对象、条件或关联不明确时跳过，不改写事实内容。","reason":"如有科研成果，只检查现有各类别内发表时间倒序；同日期保留原序，日期无法比较的关系跳过；只批注，不修改。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["research_achievements"],"when":[],"tests":[{"fact":"results.dates_descending","op":"eq","value":true}],"reason":"如有科研成果，只检查现有各类别内发表时间倒序；同日期保留原序，日期无法比较的关系跳过；只批注，不修改。","requires":["semantic_roles","text"],"policy_refs":[]}}
```

</details>

## 六、页面、页眉页脚及产品默认

<a id="ustc-page-01"></a>

### USTC-PAGE-01 · A4纸张

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

纸张为标准A4：21.0cm×29.7cm；横向只是旋转，不改变纸型，按短边长边检查。

来源：官方模板§3.8 页面设置。性质：校方要求。对象：`section`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-PAGE-01","title":"A4纸张","authority":"required","sources":["B359"],"selector":{"roles":["section"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"page.short_edge.mm":210,"page.long_edge.mm":297}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"page.short_edge.mm":210,"page.long_edge.mm":297},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“A4纸张”调整：{changes_zh}。纸张为标准A4：21.0cm×29.7cm；横向只是旋转，不改变纸型，按短边长边检查。","action":"纸张为标准A4：21.0cm×29.7cm；横向只是旋转，不改变纸型，按短边长边检查。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["section"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-page-02"></a>

### USTC-PAGE-02 · 页边距和装订

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

上下边距2.54cm、左右3.17cm，装订线0cm，装订线位置左，左右对称页边距。映射为1440、1797（四舍五入）及0 twip；不能由空白属性推断为满足。

来源：官方模板§3.8 页面设置。性质：校方要求。对象：`section`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-PAGE-02","title":"页边距和装订","authority":"required","sources":["B360"],"selector":{"roles":["section"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"page.margin.top.mm":25.4,"page.margin.bottom.mm":25.4,"page.margin.left.mm":31.7,"page.margin.right.mm":31.7,"page.gutter.mm":0,"page.gutter_position":"left","document.mirror_margins":true}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"page.margin.top.mm":25.4,"page.margin.bottom.mm":25.4,"page.margin.left.mm":31.7,"page.margin.right.mm":31.7,"page.gutter.mm":0,"page.gutter_position":"left","document.mirror_margins":true},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“页边距和装订”调整：{changes_zh}。上下边距2.54cm、左右3.17cm，装订线0cm，装订线位置左，左右对称页边距。映射为1440、1797（四舍五入）及0 twip；不能由空白属性推断为满足。","action":"上下边距2.54cm、左右3.17cm，装订线0cm，装订线位置左，左右对称页边距。映射为1440、1797（四舍五入）及0 twip；不能由空白属性推断为满足。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["section"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-header-01"></a>

### USTC-HEADER-01 · 页眉距边界

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

从摘要到最后的页面，页眉距边界1.5cm；第1章前必要空白页无页眉及页眉线，按独立例外。

来源：官方模板§3.8 页面设置；官方模板“第1章起页说明”。性质：校方要求。对象：`section_with_abstract_or_later`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-HEADER-01","title":"页眉距边界","authority":"required","sources":["B361","B222"],"selector":{"roles":["section_with_abstract_or_later"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"page.header_distance.mm":15}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"page.header_distance.mm":15},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“页眉距边界”调整：{changes_zh}。从摘要到最后的页面，页眉距边界1.5cm；第1章前必要空白页无页眉及页眉线，按独立例外。","action":"从摘要到最后的页面，页眉距边界1.5cm；第1章前必要空白页无页眉及页眉线，按独立例外。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["section_with_abstract_or_later"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-header-02"></a>

### USTC-HEADER-02 · 页眉文字格式

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

页眉五号，中文宋体、英文Times New Roman，单倍行距、居中。只对实际页眉文字，不给无页眉空白页新增文字。

来源：官方模板§3.8 页面设置。性质：校方要求。对象：`running_header`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-HEADER-02","title":"页眉文字格式","authority":"required","sources":["B361"],"selector":{"roles":["running_header"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"font.eastAsia":"宋体","font.latin":"Times New Roman","size.pt":10.5,"paragraph.line":{"mode":"single"},"paragraph.align":"center"}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"font.eastAsia":"宋体","font.latin":"Times New Roman","size.pt":10.5,"paragraph.line":{"mode":"single"},"paragraph.align":"center"},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“页眉文字格式”调整：{changes_zh}。页眉五号，中文宋体、英文Times New Roman，单倍行距、居中。只对实际页眉文字，不给无页眉空白页新增文字。","action":"页眉五号，中文宋体、英文Times New Roman，单倍行距、居中。只对实际页眉文字，不给无页眉空白页新增文字。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["running_header"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-header-03"></a>

### USTC-HEADER-03 · 页眉范围与内容

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

从摘要到最后，每页页眉为所在章级标题；第1章前为奇数页起而留的空白页例外。不能把样本固定页眉复制到全部节，链接到前节需逐页解析。

来源：官方模板§3.8 页面设置；官方模板“第1章起页说明”。性质：校方要求。对象：`abstract_and_later_page`。按服务分类决定是否检查与批注，不自动代改。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-HEADER-03","title":"页眉范围与内容","authority":"required","sources":["B361","B222"],"selector":{"roles":["abstract_and_later_page"],"confidence":"confirmed","mode":"each"},"when":[{"fact":"object.is_pre_body_padding_blank","op":"eq","value":false}],"check":{"kind":"assertions","tests":[{"fact":"header.matches_current_chapter_title","op":"eq","value":true}]},"requires":["layout_adapter","semantic_roles","header_footer_links"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：从摘要到最后，每页页眉为所在章级标题；第1章前为奇数页起而留的空白页例外。不能把样本固定页眉复制到全部节，链接到前节需逐页解析。","risk":"移动对象、插页或重编号可能改变分页、引用关系或图表位置。","reason":"这项要求需要真实版面或关系确认；仅凭XML与缓存页码不能安全代改。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["abstract_and_later_page"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["layout_adapter","semantic_roles","header_footer_links"],"policy_refs":[]}}
```

</details>

<a id="ustc-pagenum-01"></a>

### USTC-PAGENUM-01 · 页码分段和起点

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

封面及原创声明不要页码；摘要至第1章前用大写罗马数字，第1章至末尾用阿拉伯数字且第1章从1起。授权、AI、创新说明等摘要前其他页的是否编号原文没有逐页明说，不据此扩大禁令。

来源：官方模板§3.8 页面设置。性质：校方要求。对象：`document`。按服务分类决定是否检查与批注，不自动代改。

处理边界：制度及连续性错误只提示，不自动分节、重建页码或更改手工号码，不计此类修复欠账。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-PAGENUM-01","title":"页码分段和起点","authority":"required","sources":["B362"],"selector":{"roles":["document"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"page_numbers.cover_and_originality_absent","op":"eq","value":true},{"fact":"page_numbers.abstract_to_body","op":"eq","value":"upperRoman"},{"fact":"page_numbers.body_to_end","op":"eq","value":"decimal"},{"fact":"page_numbers.chapter1_start","op":"eq","value":1}]},"requires":["layout_adapter","semantic_roles","field_links"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：封面及原创声明不要页码；摘要至第1章前用大写罗马数字，第1章至末尾用阿拉伯数字且第1章从1起。授权、AI、创新说明等摘要前其他页的是否编号原文没有逐页明说，不据此扩大禁令。","risk":"移动对象、插页或重编号可能改变分页、引用关系或图表位置。","reason":"制度及连续性错误只提示，不自动分节、重建页码或更改手工号码，不计此类修复欠账。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["document"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。 修复边界：制度及连续性错误只提示，不自动分节、重建页码或更改手工号码，不计此类修复欠账。","requires":["layout_adapter","semantic_roles","field_links"],"policy_refs":[]}}
```

</details>

<a id="ustc-pagenum-02"></a>

### USTC-PAGENUM-02 · 页脚距边界

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

有页码页面的页脚距边界1.75cm。

来源：官方模板§3.8 页面设置。性质：校方要求。对象：`section_with_page_numbers`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-PAGENUM-02","title":"页脚距边界","authority":"required","sources":["B362"],"selector":{"roles":["section_with_page_numbers"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"page.footer_distance.mm":17.5}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"page.footer_distance.mm":17.5},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“页脚距边界”调整：{changes_zh}。有页码页面的页脚距边界1.75cm。","action":"有页码页面的页脚距边界1.75cm。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["section_with_page_numbers"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-pagenum-03"></a>

### USTC-PAGENUM-03 · 页码格式

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

页码置页脚中部，五号Times New Roman，单倍行距、居中，数字两侧无修饰线。

来源：官方模板§3.8 页面设置。性质：校方要求。对象：`page_number`。满足安全前提时可修复明确属性。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-PAGENUM-03","title":"页码格式","authority":"required","sources":["B362"],"selector":{"roles":["page_number"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"font.latin":"Times New Roman","size.pt":10.5,"paragraph.line":{"mode":"single"},"paragraph.align":"center"}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"properties_only","target":{"font.latin":"Times New Roman","size.pt":10.5,"paragraph.line":{"mode":"single"},"paragraph.align":"center"},"preconditions":["no_unresolved_revision","no_protected_content","no_ambiguous_role","all_required_facts_known"]},"comments":{"fixed":"已按“页码格式”调整：{changes_zh}。页码置页脚中部，五号Times New Roman，单倍行距、居中，数字两侧无修饰线。","action":"页码置页脚中部，五号Times New Roman，单倍行距、居中，数字两侧无修饰线。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["page_number"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。","requires":["semantic_roles","effective_properties"],"policy_refs":[]}}
```

</details>

<a id="ustc-pagenum-04"></a>

### USTC-PAGENUM-04 · 页码位置及修饰

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。

页码在页脚中部，数字两侧不加修饰线。PAGE域结构与真实排版一并核对，不以静态数字外观当连续页码证明。

来源：官方模板§3.8 页面设置。性质：校方要求。对象：`page_number`。按服务分类决定是否检查与批注，不自动代改。

处理边界：实际中部及修饰错误只提示；不猜线条用途，不自动搬页码、删图形或重建页脚。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-PAGENUM-04","title":"页码位置及修饰","authority":"required","sources":["B362"],"selector":{"roles":["page_number"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"page_number.in_footer_center","op":"eq","value":true},{"fact":"page_number.decorative_lines","op":"eq","value":false}]},"requires":["field_links","layout_adapter"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"请核对并按实际情况处理：页码在页脚中部，数字两侧不加修饰线。PAGE域结构与真实排版一并核对，不以静态数字外观当连续页码证明。","risk":"移动对象、插页或重编号可能改变分页、引用关系或图表位置。","reason":"实际中部及修饰错误只提示；不猜线条用途，不自动搬页码、删图形或重建页脚。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["page_number"],"when":[],"tests":null,"reason":"按明确属性或客观结构条件检查；仅已确认不符合时批注，未知、未实现、缺依赖和不适用均静默跳过。 修复边界：实际中部及修饰错误只提示；不猜线条用途，不自动搬页码、删图形或重建页脚。","requires":["field_links","layout_adapter"],"policy_refs":[]}}
```

</details>

<a id="product-orientation-01"></a>

### PRODUCT-ORIENTATION-01 · 普通页默认竖向

服务分类：不检查、不批注（保留规范记录）。执行范围：默认竖向的产品约定保留；横向统一由PRODUCT-ORIENTATION-02提示，避免重复提醒，不自动旋转。

产品默认普通页竖向；整页表格或特殊图表可横向。学校模板未明文禁止横向，此默认不得标成校方违规。本轮复核后，检测到横向只提示，不自动改方向或分节；用途未知不宣称违规。

来源：用户产品偏好（非校方来源）。性质：产品默认。对象：`section`。仅保留默认约定，不自动旋转。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"PRODUCT-ORIENTATION-01","title":"普通页默认竖向","authority":"default","sources":[],"selector":{"roles":["section"],"confidence":"confirmed","mode":"each"},"when":[],"check":{"kind":"properties","expected":{"page.orientation":"portrait"}},"requires":["semantic_roles","effective_properties"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"产品默认普通页竖向；整页表格或特殊图表可横向。学校模板未明文禁止横向，此默认不得标成校方违规。本轮复核后，检测到横向只提示，不自动改方向或分节；用途未知不宣称违规。","risk":"批量修改可能影响分页；请复核预览。","reason":"对象或有效属性不明、存在修订/保护时，无法保证修改范围准确，需人工确认。"},"audit":{"status":"unsupported","notification":"never","roles":["section"],"when":[],"tests":null,"reason":"默认竖向的产品约定保留；横向统一由PRODUCT-ORIENTATION-02提示，避免重复提醒，不自动旋转。","requires":["semantic_roles","effective_properties"],"policy_refs":["portrait_notice"]}}
```

</details>

<a id="product-orientation-02"></a>

### PRODUCT-ORIENTATION-02 · 横向例外处理

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：检测到横向节时提示其应仅用于整页图表等适用情形，不自动旋转、不拆分节；无须先猜测它是否违规。

执行边界：本节为横向页面。论文默认采用竖向，横向通常仅用于整页表格或特殊图表，请确认该节确有需要。

产品执行口径：默认竖向；检测到横向节只作提示，不自动旋转，也不自动拆分分节。

整页表格或特殊图表可保留横向，仍按A4纸型和学校页边距规则检查。用途不明或普通页与横向图表共节时只批注，让作者确认并按需分节，不自动旋转或重排图表。

来源：用户产品偏好（非校方来源）。性质：产品默认。对象：`landscape_section`。执行以本条服务分类与结构化修复权限为准。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"PRODUCT-ORIENTATION-02","title":"横向例外处理","authority":"default","sources":[],"selector":{"roles":["landscape_section"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"review","items":["确认是整页表格或特殊图表","混合节按需要安全分节"]},"requires":["semantic_roles","human_visual_review"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"本节为横向页面。论文默认采用竖向，横向通常仅用于整页表格或特殊图表，请确认该节确有需要。","risk":"仅处理已确认的具体差异；对象、条件或关联不明确时跳过，不改写事实内容。","reason":"检测到横向节时提示其应仅用于整页图表等适用情形，不自动旋转、不拆分节；无须先猜测它是否违规。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["landscape_section"],"when":[],"tests":[{"fact":"page.is_landscape","op":"eq","value":false}],"reason":"检测到横向节时提示其应仅用于整页图表等适用情形，不自动旋转、不拆分节；无须先猜测它是否违规。","requires":["semantic_roles","effective_properties"],"policy_refs":["portrait_notice"]}}
```

</details>


<a id="ustc-lists-05"></a>

### USTC-LISTS-05 · 已有图表清单的结构

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：只在清单已存在时检查字段、图表顺序及目录后另起一面；不以7个阈值跳过已有清单的格式。

执行边界：已有图表清单存在以下结构差异：{failed_items_zh}。请补齐序号、题名、页码，图在表前，并置于目录后另起一面。

来源：官方模板§2.7 插图和附表清单。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-LISTS-05","title":"已有图表清单的结构","authority":"required","sources":["B273","B274","B275"],"selector":{"roles":["figure_table_list"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"lists.entries_complete","op":"eq","value":true},{"fact":"lists.figure_before_table","op":"eq","value":true},{"fact":"lists.after_toc_new_page","op":"eq","value":true}]},"requires":["semantic_roles"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"已有图表清单存在以下结构差异：{failed_items_zh}。请补齐序号、题名、页码，图在表前，并置于目录后另起一面。","risk":"不自动创建、删除或移动章节。","reason":"只在清单已存在时检查字段、图表顺序及目录后另起一面；不以7个阈值跳过已有清单的格式。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["figure_table_list"],"when":[],"tests":null,"reason":"只在清单已存在时检查字段、图表顺序及目录后另起一面；不以7个阈值跳过已有清单的格式。","requires":["semantic_roles"],"policy_refs":[]}}
```

</details>

<a id="ustc-symbol-05"></a>

### USTC-SYMBOL-05 · 已有符号说明的位置

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：符号说明已存在时，不论数量是否达到7项，检查其位于目录后、正文前。

执行边界：符号和缩略语说明应位于目录之后、正文之前。

来源：官方模板§2.8 符号和缩略语说明。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"USTC-SYMBOL-05","title":"已有符号说明的位置","authority":"required","sources":["B278"],"selector":{"roles":["symbol_list"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"symbols.position_valid","op":"eq","value":true}]},"requires":["semantic_roles"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"符号和缩略语说明应位于目录之后、正文之前。","risk":"不自动创建、删除或移动章节。","reason":"符号说明已存在时，不论数量是否达到7项，检查其位于目录后、正文前。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["symbol_list"],"when":[],"tests":null,"reason":"符号说明已存在时，不论数量是否达到7项，检查其位于目录后、正文前。","requires":["semantic_roles","layout_adapter"],"policy_refs":[]}}
```

</details>

<a id="product-chapter-01"></a>

### PRODUCT-CHAPTER-01 · 章级部分之间的分节分页

服务分类：可检查；仅明确差异或完成的修改产生批注。执行范围：按用户确认的执行约定检查章级部分之间开始新页的分节符；不安全插分节符，以免影响页眉页码继承。

执行边界：相邻章级部分之间缺少开始新页的分节符。请在对应边界插入“分节符（下一页）”，并确认页眉、页码连续性。

产品执行口径：相邻章级部分采用开始新页的分节符；学校明确另起一页，分节符形式为本产品执行约定。

来源：产品默认，非校方要求。

<details><summary>结构化规则及批注契约</summary>

```ustc-rule
{"id":"PRODUCT-CHAPTER-01","title":"章级部分之间的分节分页","authority":"default","sources":[],"selector":{"roles":["document"],"confidence":"confirmed","mode":"document_group"},"when":[],"check":{"kind":"assertions","tests":[{"fact":"structure.chapter_section_page_breaks","op":"eq","value":true}]},"requires":["semantic_roles"],"fix":{"permission":"none","target":{},"preconditions":[]},"comments":{"fixed":null,"action":"相邻章级部分之间缺少开始新页的分节符。请在对应边界插入“分节符（下一页）”，并确认页眉、页码连续性。","risk":"不自动创建、删除或移动章节。","reason":"按用户确认的执行约定检查章级部分之间开始新页的分节符；不安全插分节符，以免影响页眉页码继承。"},"audit":{"status":"checkable","notification":"on_confirmed_failure","roles":["document"],"when":[],"tests":null,"reason":"按用户确认的执行约定检查章级部分之间开始新页的分节符；不安全插分节符，以免影响页眉页码继承。","requires":["semantic_roles","layout_adapter"],"policy_refs":["chapter_break"]}}
```

</details>
