# 实现说明

## 背景

Claude Desktop 当前内置了多个语言资源，但在某些桌面发行形态里，`zh-CN` 并不在前端 locale 白名单中，或者部分新界面仍然使用英文 fallback 文案。因此仅创建一个 `zh-CN.json` 不足以完成中文化。

本方案采用三层补丁：

1. 用户配置层：把 `config.json` 中的 `locale` 设置为 `zh-CN`。
2. i18n catalog 层：基于 `ion-dist/i18n/en-US.json` 创建并补齐 `zh-CN.json`。
3. 前端 bundle 层：对前端 JS 中的 locale 白名单、`defaultMessage` 和少量硬编码字符串做精确替换。

## 为什么不改顶层 Resources/zh-CN.json

Claude Desktop 的 `Contents/Resources/zh-CN.json` 更接近 Electron shell 或原生层资源。把完整前端 catalog 合并到这里，在实测中可能造成窗口白屏。

因此本项目只处理：

```text
Contents/Resources/ion-dist/i18n/zh-CN.json
Contents/Resources/ion-dist/i18n/statsig/zh-CN.json
Contents/Resources/ion-dist/assets/v1/*.js
```

## 备份策略

每个文件写入前都会创建同目录备份：

```text
<file>.pre-zhcn-catalog-<timestamp>.bak
<file>.pre-zhcn-bundle-<timestamp>.bak
<file>.pre-zhcn-config-<timestamp>.bak
```

回滚脚本会在应用资源目录下扫描这些备份，并把每个原始文件恢复到最近一次备份。

## 字符串策略

脚本优先使用英文 catalog 的 value 反查 key，再写入中文 value。这能覆盖多数 `FormattedMessage` 场景。

对于实测中没有正确读取 catalog 的区域，脚本补充了：

- `defaultMessage:"..."`
- `description:"..."`
- `title:"..."`
- `placeholder:"..."`
- exact plain string literal

替换是精确字符串替换，不做模糊匹配。

## 验证建议

每次补丁后建议执行：

```bash
node --check /Applications/Claude.app/Contents/Resources/ion-dist/assets/v1/index-*.js
```

更完整的做法是遍历所有 bundle：

```bash
for f in /Applications/Claude.app/Contents/Resources/ion-dist/assets/v1/*.js; do
  node --check "$f" >/dev/null
done
```

然后重启 Claude Desktop，至少检查：

- Cowork 首页。
- Cowork 历史任务页。
- Code / 统计页。
- 侧栏折叠提示和通知区域。

## 面向贡献者

如果你发现新的英文残留，可以按下面方式补充：

1. 在 `scripts/patch-claude-desktop-zh-cn.mjs` 的 `zh` 字典中加入英文到中文的映射。
2. 如果该文案有稳定 i18n id，在 `idOverrides` 中加入 id 到中文的映射。
3. 对只有硬编码 plain string 的场景，加入 `hardcodedStrings`。
4. 执行 `npm run check`。

请尽量保持翻译简洁，避免让紧凑按钮或侧栏文本溢出。
