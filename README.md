# Claude Desktop zh-CN Patch

一个非官方的 Claude Desktop macOS 中文界面补丁方案。

这个仓库把一次本地实测可行的 Claude Desktop 汉化流程整理成可复用脚本：补齐 `zh-CN` i18n 资源、让前端识别 `zh-CN` locale，并对部分仍然走 fallback 或硬编码的英文 UI 文案做精确替换。

> 本项目不包含、分发或反编译 Claude Desktop 的源代码。脚本只在用户本机对已安装应用资源做本地补丁。

## 适用场景

- macOS 上的 Claude Desktop。
- Claude Desktop 已经安装在 `/Applications/Claude.app`。
- 用户希望把主界面、侧栏、任务页、Code/统计页等常见前端界面尽量替换为中文。
- 对非官方补丁、应用更新后需要重跑补丁、必要时从备份恢复有基本认知。

本方案在 Claude Desktop `1.4758.0` 上验证过。不同版本的 bundle 文件名和文案可能变化，脚本采用文本匹配和 i18n catalog 补丁，通常可以跨小版本工作，但不能保证所有版本完全一致。

## 快速使用

先退出 Claude Desktop，然后执行：

```bash
git clone https://github.com/XucroYuri/claude-desktop-zh-cn-patch.git
cd claude-desktop-zh-cn-patch
npm run patch:dry-run
npm run patch
```

重新打开 Claude Desktop。

如果 Claude Desktop 不在默认路径：

```bash
node scripts/patch-claude-desktop-zh-cn.mjs --app /path/to/Claude.app
```

如果使用的是第三方 API / 3P 模式，用户数据目录可能是 `Claude-3p`。脚本会自动尝试：

- `~/Library/Application Support/Claude-3p/config.json`
- `~/Library/Application Support/Claude/config.json`

也可以手动指定：

```bash
node scripts/patch-claude-desktop-zh-cn.mjs \
  --config "$HOME/Library/Application Support/Claude-3p/config.json"
```

## 回滚

脚本会在写入前为每个被修改文件创建备份，格式类似：

```text
index-xxxx.js.pre-zhcn-bundle-20260427104652.bak
zh-CN.json.pre-zhcn-catalog-20260427104652.bak
```

恢复最近一次备份：

```bash
npm run restore:dry-run
node scripts/restore-latest-backup.mjs
```

如果恢复后仍有缓存问题，退出并重新打开 Claude Desktop。

## 补丁做了什么

1. 设置 Claude Desktop 用户配置里的 `locale` 为 `zh-CN`。
2. 创建或更新：
   - `Contents/Resources/ion-dist/i18n/zh-CN.json`
   - `Contents/Resources/ion-dist/i18n/statsig/zh-CN.json`
3. 在前端 JS bundle 的语言白名单里加入 `zh-CN`。
4. 替换常见 `defaultMessage` / `description` / `title` / `placeholder`。
5. 替换部分前端 plain string fallback，例如侧栏、任务页、Code/统计页、通知区域等。

## 已覆盖的界面

- 首页主标题、输入框、按钮、模型标签前缀。
- Cowork 侧栏：新任务、项目、计划任务、自定义、置顶、最近、查看全部等。
- 侧栏辅助提示：点击收起、拖动调整宽度。
- 历史任务页：你说、Claude 回复、复制、反馈、运行摘要、工具调用摘要、右侧活动面板。
- Code/统计页：概览、统计卡片、日期范围、输入框、权限、记录视图、用量、底部操作提示。
- 通知区域可访问标签。

## 已知限制

- macOS 原生菜单栏里的 `File / Edit / View / Developer / Window / Help` 不在普通前端 i18n bundle 中，本项目暂不处理。
- Claude、Cowork、Opus、Sonnet、Haiku、项目名、会话标题、文件名、模型名等专有名词或用户内容默认保留。
- App 更新可能覆盖 `/Applications/Claude.app` 里的修改，需要重新运行脚本。
- 模型下拉里的真实 provider 名称展示属于模型显示逻辑补丁，不属于本仓库的中文 i18n 范围。
- 不建议修改顶层 `Contents/Resources/zh-CN.json` 来承载完整前端文案，实测可能导致白屏。本方案只补 `ion-dist/i18n` 和前端 bundle。

## 开发检查

```bash
npm run check
```

脚本无第三方依赖，要求 Node.js 18+。

## 免责声明

本项目是社区自用工具，不代表 Anthropic 或 Claude 官方。使用前请确认你理解本地应用资源补丁的风险，并保留备份。

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=XucroYuri/claude-desktop-zh-cn-patch&type=Date)](https://star-history.com/#XucroYuri/claude-desktop-zh-cn-patch&Date)

