#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const DEFAULT_APP_PATH = "/Applications/Claude.app";
const DEFAULT_LOCALE = "zh-CN";

const zh = {
  "Let's knock something off your list": "来完成一件事吧",
  "How can I help you today?": "今天想让我帮你做什么？",
  "Type / for skills": "输入 / 使用技能",
  "Type / for commands": "输入 / 使用命令",
  "Start task": "开始任务",
  "Send message": "发送消息",
  "Add files, connectors, and more": "添加文件、连接器等",
  "Work in a project": "在项目中工作",
  "Learn how to use Cowork safely": "了解如何安全使用 Cowork",
  "Model: {name}": "模型：{name}",
  "Model: {model}": "模型：{model}",
  "Model": "模型",
  "Models": "模型",
  "All Claude Models": "全部 Claude 模型",

  "New task": "新任务",
  "New local task": "新建本地任务",
  "New remote task": "新建远程任务",
  "New chat": "新聊天",
  "New session": "新会话",
  "Chats": "聊天",
  "Chat": "聊天",
  "Projects": "项目",
  "Project": "项目",
  "Artifacts": "制品",
  "Live artifacts": "实时制品",
  "Scheduled": "计划任务",
  "Scheduled tasks": "计划任务",
  "Customize": "自定义",
  "Code": "代码",
  "Claude Code": "Claude Code",
  "Cowork": "Cowork",
  "Mode": "模式",
  "Search": "搜索",
  "Search...": "搜索...",
  "Search results": "搜索结果",
  "Search deeper": "继续搜索",
  "Filter": "筛选",
  "Appearance": "外观",
  "More": "更多",
  "More navigation items": "更多导航项",
  "Search conversations and projects": "搜索对话和项目",
  "Search past conversations": "搜索历史对话",
  "Add context Claude remembers": "添加 Claude 会记住的上下文",
  "Build prototypes instantly": "快速构建原型",
  "Autonomous Claude tasks": "Claude 自主任务",
  "Pair program with Claude": "与 Claude 结对编程",
  "Find any conversation fast": "快速找到任何对话",
  "Share files and instructions": "共享文件和指令",
  "Create apps and visuals": "创建应用和视觉内容",
  "Let Claude work for you": "让 Claude 为你工作",
  "Code with Claude anywhere": "随处用 Claude 写代码",
  "Ask your org": "询问你的组织",
  "Ask {name}": "询问 {name}",
  "Settings": "设置",
  "General": "通用",
  "Navigation": "导航",
  "Actions": "操作",
  "Recents": "最近",
  "All chats": "全部聊天",
  "Your chats will show up here": "你的聊天会显示在这里",
  "No sessions yet": "还没有会话",
  "No organizations available to join.": "没有可加入的组织。",
  "Starred": "星标",
  "Pinned": "已置顶",
  "Active": "活跃",
  "Pinned or active": "置顶或活跃",
  "Active tasks": "活跃任务",
  "Drag to pin": "拖动以固定",
  "View all": "查看全部",
  "View all →": "查看全部 →",
  "View all skills": "查看全部技能",
  "View all plugins": "查看全部插件",
  "All": "全部",
  "Archived": "已归档",
  "Shared": "已共享",
  "Local task": "本地任务",
  "Untitled": "未命名",
  "Done": "完成",
  "More options": "更多选项",
  "More options for {label}": "更多选项：{label}",
  "Message actions": "消息操作",
  "Copy": "复制",
  "Restart conversation from here": "从这里重新开始对话",
  "Give positive feedback": "给出正面反馈",
  "Give negative feedback": "给出负面反馈",
  "Open sidebar": "打开侧边栏",
  "Close sidebar": "关闭侧边栏",
  "Collapse sidebar": "收起侧边栏",
  "Resize sidebar": "调整侧边栏宽度",
  "Click to collapse": "点击收起",
  "Drag to resize": "拖动调整宽度",
  "Skip to content": "跳到内容",
  "Click to collapse ⌘B Drag to resize": "点击收起 ⌘B，拖动调整宽度",
  "Hide": "隐藏",
  "Show": "显示",
  "Pin": "固定",
  "Unpin": "取消固定",
  "Star": "加星",
  "Unstar": "取消加星",
  "Archive": "归档",
  "Archive project": "归档项目",
  "Project archived": "项目已归档",
  "Delete": "删除",
  "Edit details": "编辑详情",
  "Save": "保存",
  "Cancel": "取消",
  "Saving…": "正在保存…",
  "Saving...": "正在保存...",
  "Close": "关闭",
  "Back": "返回",
  "Next": "下一步",
  "Update": "更新",
  "Copied!": "已复制",
  "Copy link": "复制链接",
  "Refresh": "刷新",
  "Download": "下载",
  "Open": "打开",
  "Add": "添加",
  "Send": "发送",
  "Open in": "打开方式",
  "More ways to open": "更多打开方式",
  "Show in folder": "在文件夹中显示",
  "Go to folder": "打开文件夹",
  "Select folder…": "选择文件夹…",
  "Accept edits": "接受编辑",
  "Notifications": "通知",
  "Notifications (F8)": "通知 (F8)",
  "Language": "语言",
  "Invite team members": "邀请团队成员",
  "Get started": "开始使用",
  "Feedback": "反馈",
  "Submit Feedback": "提交反馈",

  "Scheduled tasks only run while your computer is awake.": "计划任务只会在电脑唤醒时运行。",
  "Filter scheduled tasks": "筛选计划任务",
  "No tasks yet.": "还没有任务。",
  "No active tasks.": "没有活跃任务。",
  "No archived tasks.": "没有已归档任务。",
  "Run tasks on a schedule or whenever you need them. Type <code>/schedule</code> in any existing task to set one up.": "按计划运行任务，或在需要时随时运行。在任何现有任务中输入 <code>/schedule</code> 即可设置。",
  "Scheduled task creation isn't available. Restart the desktop app to enable this feature.": "计划任务创建暂不可用。请重启桌面应用以启用此功能。",
  "Scheduled task editing isn't available. Restart the desktop app to enable this feature.": "计划任务编辑暂不可用。请重启桌面应用以启用此功能。",
  "Scheduled task saved.": "计划任务已保存。",

  "Write your prompt to Claude": "输入给 Claude 的提示词",
  "Add a note": "添加备注",
  "Write a note (markdown supported)...": "写一条备注（支持 Markdown）...",
  "Existing Notes ({count})": "已有备注（{count}）",
  "Edit note": "编辑备注",
  "Delete note": "删除备注",

  "Home": "主页",
  "Primary pane": "主面板",
  "Session activity panel": "会话活动面板",
  "Command menu": "命令菜单",
  "All keyboard shortcuts": "全部键盘快捷键",
  "to start a task and keep going": "开始任务并持续执行",
  "Toggle sidebar": "切换侧边栏",
  "Toggle dictation": "切换语音输入",
  "Toggle plan mode": "切换计划模式",
  "Upload file": "上传文件",
  "Share chat": "分享聊天",
  "Incognito chat": "隐身聊天",
  "Quick chat": "快速聊天",
  "Import issue": "导入议题",
  "Open Linear issues": "打开 Linear 议题",
  "GitHub review queue": "GitHub 评审队列",
  "Today's Slack mentions": "今天的 Slack 提及",
  "Week at a glance": "一周概览",
  "Unread email digest": "未读邮件摘要",
  "What needs my attention": "需要我关注的事项",

  "Payment": "付款",
  "Payment method": "付款方式",
  "Billing address": "账单地址",
  "Tax": "税费",
  "Total": "合计",
  "Total due today": "今日应付合计",
  "Processing...": "处理中...",
  "Pay now": "立即支付",

  "Name": "姓名",
  "Email": "邮箱",
  "Description": "描述",
  "Description (optional)": "描述（可选）",
  "Project name": "项目名称",
  "Content not allowed": "内容不被允许",
  "Invalid email": "邮箱无效",
  "URLs are not allowed": "不允许使用 URL",

  "Loading...": "加载中...",
  "Loading": "加载中",
  "Error": "错误",
  "Retry": "重试",
  "Try again": "重试",
  "No results": "没有结果",
  "No results found": "没有找到结果",
  "Empty": "空",
  "Untitled chat": "未命名聊天",
  "Reply...": "回复...",
  "You said:": "你说：",
  "You said: {prompt}": "你说：{prompt}",
  "Claude responded:": "Claude 回复：",
  "Claude responded: {summary}": "Claude 回复：{summary}",
  "Claude is AI and can make mistakes. Please double-check responses.": "Claude 是 AI，可能会出错。请核查重要信息。",
  "New": "新建",
  "Create": "创建",
  "Edit": "编辑",
  "Remove": "移除",
  "Clear": "清除",
  "Reset": "重置",
  "Reset All": "全部重置",
  "Enable": "启用",
  "Disable": "停用",
  "Enabled": "已启用",
  "Disabled": "已停用",
  "Connect": "连接",
  "Disconnect": "断开连接",
  "Continue": "继续",
  "Confirm": "确认",
  "Confirm & purchase": "确认并购买",
  "Schedule downgrade": "安排降级",
  "Learn more": "了解更多",
  "Get help": "获取帮助",
  "Help": "帮助",
  "Privacy": "隐私",
  "Terms": "条款",

  "Document": "文档",
  "Progress": "进度",
  "What’s up next?": "接下来做什么？",
  "What’s up next, {name}?": "接下来做什么，{name}？",
  "Overview": "概览",
  "Stats view": "统计视图",
  "Date range": "日期范围",
  "Sessions": "会话",
  "Messages": "消息",
  "Total tokens": "总 Token",
  "Active days": "活跃天数",
  "Current streak": "当前连续天数",
  "Longest streak": "最长连续天数",
  "Peak hour": "高峰时段",
  "Favorite model": "常用模型",
  "Daily activity heatmap": "每日活动热力图",
  "You've used ~{times}× more tokens than {book}.": "你使用的 Token 量约为《{book}》的 {times} 倍。",
  "Local": "本地",
  "Add another folder": "再添加一个文件夹",
  "Prompt": "提示词",
  "Describe a task or ask a question": "描述任务或提出问题",
  "Ask permissions": "询问权限",
  "Transcript view mode": "记录视图模式",
  "Usage": "用量",
  "Medium": "中等",
  "Arrow keys move the tile. Perpendicular arrows preview a split; press Enter to commit or Escape to cancel.": "方向键移动磁贴。垂直方向键预览拆分；按 Enter 确认，按 Escape 取消。",
  "Instructions": "指令",
  "Context": "上下文",
  "Track tools and referenced files used in this task.": "跟踪此任务中使用的工具和引用文件。",
  "View and open files created during this task.": "查看并打开此任务创建的文件。",
  "Working files": "工作文件",
  "Working folders": "工作文件夹",
  "Working folder": "工作文件夹",
  "View all {count} files": "查看全部 {count} 个文件",
  "No files changed": "没有文件变更",
  "No tool calls yet": "还没有工具调用",
  "Found files": "找到文件",
  "Ran": "已运行",
  "Ran a command": "运行了一条命令",
  "Ran {count} commands": "运行了 {count} 条命令",
  "Ran an agent": "运行了一个任务代理",
  "Ran {count} agents": "运行了 {count} 个任务代理",
  "Updated todo list": "更新了待办列表",
  "Updated todos": "更新了待办",
  "Updating todos": "正在更新待办",
  "Cleared todos": "已清空待办",
  "Used a tool": "使用了工具",
  "Used {count} tools": "使用了 {count} 个工具",
  "Ran terminal": "运行了终端",
  "Loaded tools": "已加载工具",
  "Searching files...": "正在搜索文件...",
  "Running command...": "正在运行命令...",
  "Using {toolName}...": "正在使用 {toolName}...",
  "Ran scheduled task": "已运行计划任务",
  "Pre-tool use": "工具使用前",
  "Post-tool use": "工具使用后",
  "Shell command": "Shell 命令",
  "Runs before a tool call": "在工具调用前运行",
  "Runs after a tool call": "在工具调用后运行",
  "Ran a hook on session {source}": "已在会话 {source} 上运行钩子",
  "Ran resume hooks": "已运行恢复钩子",
  "Ran startup hooks": "已运行启动钩子",
  "{toolName} · {count, plural, one {# tool call} other {# tool calls}}": "{toolName} · {count} 次工具调用",
  "{count, plural, one {# tool call} other {# tool calls}}": "{count} 次工具调用",
  "{count, plural, one {# tool use} other {# tool uses}}": "{count} 次工具使用",
  "{count, plural, one {# command} other {# commands}}": "{count} 条命令",
  "{count, plural, one {# file} other {# files}}": "{count} 个文件",
  "{n, plural, one {a file} other {# files}}": "{n} 个文件",
  "{n, plural, one {a command} other {# commands}}": "{n} 条命令",
  "{n, plural, one {a tool} other {# tools}}": "{n} 个工具"
};

const idOverrides = {
  "CJsWpnmYD4": "来完成一件事吧",
  "XLcM6WHfQR": "今天想让我帮你做什么？",
  "K4O03zh0vo": "新任务",
  "UxTJRaKagI": "项目",
  "cXAlMRerxW": "计划任务",
  "TXpOBiuxud": "自定义",
  "fWZYP5U4xZ": "已置顶",
  "wA4FIMmtlS": "最近",
  "pFK6bJU0EM": "查看全部",
  "6Jb0AX1uQx": "开始任务",
  "jGTFVKPV2+": "输入 / 使用技能",
  "Cxr7ieOSct": "了解如何安全使用 Cowork",
  "ZKtRoAtLSe": "跳到内容",
  "eOJ4QUCTXl": "收起侧边栏",
  "BE4un3i961": "点击收起",
  "RWMhdOt5gm": "拖动调整宽度",
  "FQcUn8+hWB": "开始任务并持续执行",
  "ITCmbu5TgN": "添加文件、连接器等",
  "0BUTMvePvK": "搜索...",
  "2mj9IxUYfJ": "聊天",
  "WTrOy36sdu": "聊天",
  "D3idYvSLF9": "设置",
  "1iEPTMDqmi": "通用",
  "fBg+7V6ZhY": "导航",
  "79lKyOa3xd": "搜索结果",
  "AddY55lcpZ": "继续搜索",
  "ABAQyoD6zr": "聊天",
  "eW5eoWkxy3": "制品",
  "fo4LT2foY3": "实时制品",
  "3kbIhS7KZS": "未命名",
  "V7cUPvWFo3": "星标",
  "Ug9lgdRJy3": "全部聊天",
  "7qSfrMGJcN": "你的聊天会显示在这里",
  "KqE7GJqcEk": "还没有会话",
  "x3qVIrUnrb": "灵感",
  "HyS0qpbEJw": "关闭侧边栏",
  "+G35mRWa75": "打开侧边栏",
  "1F/ulLHUxF": "你说：",
  "x4RlP6c9q1": "你说：{prompt}",
  "csr9dd5Yrj": "Claude 回复：{summary}",
  "lHlImYcnSM": "从这里重新开始对话",
  "FGCv00cdfW": "给出正面反馈",
  "ngzzQUJCXB": "给出负面反馈",
  "/dm2sj3W5p": "回复...",
  "Hz3uf5n9Ga": "Claude 是 AI，可能会出错。请核查重要信息。",
  "sIMS7iH+wa": "进度",
  "EAUt85Zlu/": "打开文件夹",
  "Fk7Y4kOEei": "打开文件夹",
  "sV2v5LjRpX": "指令",
  "sZIXrBDCDG": "指令",
  "V2qutIKrxy": "上下文",
  "WXQkdiBWrh": "跟踪此任务中使用的工具和引用文件。",
  "Wh8OICaIj8": "更多打开方式",
  "G84MaY7CSH": "主面板",
  "dwK+dX/jlM": "会话活动面板",
  "47h7Fdurec": "在文件夹中显示",
  "4nONiiddCv": "打开方式",
  "86Gv/DR1uA": "文档",
  "wmirkPk7bp": "文档",
  "4l6vz1/eZ5": "复制",
  "4l6vz1t2qY": "复制",
  "KGu4aumO2M": "找到文件",
  "cv9VNYMHXY": "运行了一条命令",
  "LVG1dX6B8u": "运行了 {count} 条命令",
  "WSkLyhVgSu": "运行了一个任务代理",
  "X9Z2S33opa": "运行了 {count} 个任务代理",
  "zUqcG2+Ygl": "更新了待办列表",
  "BRG8o6gNdU": "使用了工具",
  "JtrYJ8F4gT": "使用了 {count} 个工具",
  "3HqwPnSzes": "运行了终端",
  "pbB2xqdbta": "已加载工具",
  "/9DGEQmJ8Y": "正在搜索文件...",
  "7pbwpcvbVB": "正在运行命令...",
  "81U+XPsJjL": "正在使用 {toolName}...",
  "rw+BezBPAV": "更新了待办",
  "yIOz3cdgmn": "正在更新待办",
  "QesC5nGO2a": "已清空待办",
  "Nl26Bm0u7V": "{n} 个文件",
  "EbdoNqT4V5": "{n} 条命令",
  "tH1T7Ep8Ae": "{n} 个工具",
  "4yQHX3mts/": "{count} 次工具调用",
  "6b4EFZCPvR": "{count} 次工具调用",
  "CVJPfZXJH8": "{count} 次工具调用",
  "LoTivYuBVE": "{count} 次工具调用",
  "qDl9ioxGkj": "{count} 次工具调用",
  "EZ05jQyBmI": "{count} 次工具使用",
  "z6L6tQBOr9": "没有文件变更",
  "YkHKEmiZL+": "还没有工具调用",
  "b36mSZ46cW": "查看全部 {count} 个文件",
  "u465Nq9Gjb": "工作文件",
  "LtMr5Lrv6p": "工作文件夹",
  "jNSi3V9hUE": "工作文件夹",
  "p41Nenxyun": "查看并打开此任务创建的文件。",
  "W8pMCdh9hq": "接下来做什么？",
  "flLEnDzvfG": "接下来做什么，{name}？",
  "9uOFF3L8kp": "概览",
  "TDFJxA6e85": "统计视图",
  "tygEJXQ5Kc": "日期范围",
  "Z3EDd9nO/N": "会话",
  "hMzcSqn09p": "消息",
  "V45V2dwaf/": "总 Token",
  "BqDdI890tk": "活跃天数",
  "Mn8BAEIrHk": "当前连续天数",
  "C2KvkQvJR0": "最长连续天数",
  "oaW03ZISnE": "高峰时段",
  "HcKBhf6Q5g": "常用模型",
  "wfhrnIhl3F": "每日活动热力图",
  "Stq39HkM0l": "你使用的 Token 量约为《{book}》的 {times} 倍。",
  "W4SaxYXWRk": "本地",
  "WD5ZeePJtf": "再添加一个文件夹",
  "iWKE8shLIt": "提示词",
  "RLloCeiLx7": "描述任务或提出问题",
  "9WRlF4R2gm": "发送",
  "Z/DKbn2gfH": "询问权限",
  "IFemRIFDSs": "记录视图模式",
  "2/2yg+qAwp": "添加",
  "NkHVQqZyPE": "添加",
  "wbsq7OdxnV": "用量",
  "/JL5gAMv5z": "中等",
  "ovJ26CKo4Q": "中等",
  "I5NMJ8llIi": "更多",
  "6UJqvNfJs2": "更多导航项",
  "9Obw6C5Mfg": "筛选",
  "9Obw6CDkje": "筛选",
  "2GURQYNPp3": "外观",
  "EWfxXrA85v": "方向键移动磁贴。垂直方向键预览拆分；按 Enter 确认，按 Escape 取消。",
  "lkUuGjfbaq": "选择文件夹…",
  "q2/2k27Kto": "接受编辑",
  "NAidKbB0vi": "通知"
};

const defaultLocaleWhitelist = [
  "en-US",
  "de-DE",
  "fr-FR",
  "ko-KR",
  "ja-JP",
  "es-419",
  "es-ES",
  "it-IT",
  "hi-IN",
  "pt-BR",
  "id-ID"
];

const hardcodedStrings = {
  "⌘ ⏎ to start a task and keep going": "⌘ ⏎ 开始任务并持续执行",
  "Notifications (F8)": "通知 (F8)",
  "Collapse task group": "收起任务组",
  "Expand task group": "展开任务组",
  "Needs attention": "需要关注",
  "Session running": "会话正在运行",
  "Unread activity": "未读活动",
  "Dispatch": "调度",
  "Month": "月",
  "Package": "包",
  "Version": "版本",
  "Environment": "环境",
  "Packages": "包",
  "Operations": "操作",
  "Time": "时间",
  "Operation": "操作",
  "Result": "结果"
};

function parseArgs(argv) {
  const options = {
    app: process.env.CLAUDE_APP_PATH ?? DEFAULT_APP_PATH,
    locale: process.env.CLAUDE_LOCALE ?? DEFAULT_LOCALE,
    dryRun: false,
    patchBundles: true,
    patchConfig: true
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--no-bundle") {
      options.patchBundles = false;
    } else if (arg === "--no-config") {
      options.patchConfig = false;
    } else if (arg === "--app") {
      options.app = takeValue(argv, ++i, arg);
    } else if (arg === "--config") {
      options.config = takeValue(argv, ++i, arg);
    } else if (arg === "--user-data-dir") {
      options.userDataDir = takeValue(argv, ++i, arg);
    } else if (arg === "--locale") {
      options.locale = takeValue(argv, ++i, arg);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return options;
}

function takeValue(argv, index, flag) {
  const value = argv[index];
  if (!value || value.startsWith("--")) {
    throw new Error(`${flag} requires a value`);
  }
  return value;
}

function printHelp() {
  console.log(`Claude Desktop zh-CN patch

Usage:
  node scripts/patch-claude-desktop-zh-cn.mjs [options]

Options:
  --dry-run                 Print planned changes without writing files
  --app <path>              Claude.app path, default: ${DEFAULT_APP_PATH}
  --user-data-dir <path>    Claude user data directory
  --config <path>           Claude config.json path
  --locale <locale>         Locale to set, default: ${DEFAULT_LOCALE}
  --no-bundle               Only patch i18n catalogs/config, skip JS bundles
  --no-config               Skip user config locale update
  -h, --help                Show this help

Environment:
  CLAUDE_APP_PATH
  CLAUDE_USER_DATA_DIR
  CLAUDE_LOCALE
`);
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeJson(file, data, dryRun) {
  if (!dryRun) {
    fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
  }
}

function backup(file, suffix, stamp, dryRun) {
  const target = `${file}.pre-${suffix}-${stamp}.bak`;
  if (!dryRun) {
    fs.copyFileSync(file, target);
  }
  return target;
}

function jsonString(value) {
  return JSON.stringify(value);
}

function replaceAll(source, from, to) {
  return source.split(from).join(to);
}

function firstExisting(paths) {
  return paths.find((candidate) => fs.existsSync(candidate));
}

function resolveConfigPath(options) {
  if (options.config) {
    return options.config;
  }

  const userDataDir =
    options.userDataDir ??
    process.env.CLAUDE_USER_DATA_DIR ??
    firstExisting([
      path.join(os.homedir(), "Library", "Application Support", "Claude-3p"),
      path.join(os.homedir(), "Library", "Application Support", "Claude")
    ]);

  if (!userDataDir) {
    return null;
  }

  return path.join(userDataDir, "config.json");
}

function assertReadableDirectory(dir, label) {
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    throw new Error(`${label} not found: ${dir}`);
  }
}

function ensureLocaleWhitelist(source, locale) {
  let next = source;
  const oldList = jsonString(defaultLocaleWhitelist);
  const newList = jsonString(["en-US", locale, ...defaultLocaleWhitelist.filter((item) => item !== "en-US" && item !== locale)]);
  next = replaceAll(next, oldList, newList);
  return next;
}

function patchJsonCatalog({ i18nDir, locale, stamp, dryRun }) {
  const enPath = path.join(i18nDir, "en-US.json");
  const localePath = path.join(i18nDir, `${locale}.json`);
  const statsigDir = path.join(i18nDir, "statsig");
  const statsigEnPath = path.join(statsigDir, "en-US.json");
  const statsigLocalePath = path.join(statsigDir, `${locale}.json`);

  if (!fs.existsSync(enPath)) {
    throw new Error(`Missing source catalog: ${enPath}`);
  }

  const backups = [];

  if (!fs.existsSync(localePath)) {
    if (!dryRun) {
      fs.copyFileSync(enPath, localePath);
    }
  }

  if (fs.existsSync(statsigEnPath) && !fs.existsSync(statsigLocalePath)) {
    if (!dryRun) {
      fs.copyFileSync(statsigEnPath, statsigLocalePath);
    }
  }

  const en = readJson(enPath);
  const catalog = fs.existsSync(localePath) ? readJson(localePath) : { ...en };
  let changed = 0;

  for (const [key, value] of Object.entries(en)) {
    if (typeof value === "string" && Object.prototype.hasOwnProperty.call(zh, value)) {
      if (catalog[key] !== zh[value]) {
        catalog[key] = zh[value];
        changed += 1;
      }
    }
  }

  for (const [key, value] of Object.entries(idOverrides)) {
    if (catalog[key] !== value) {
      catalog[key] = value;
      changed += 1;
    }
  }

  if (changed > 0 || !fs.existsSync(localePath)) {
    backups.push(backup(localePath, "zhcn-catalog", stamp, dryRun));
    writeJson(localePath, catalog, dryRun);
  }

  return {
    file: localePath,
    changed,
    keyCount: Object.keys(catalog).length,
    backups
  };
}

function patchConfigLocale({ configPath, locale, stamp, dryRun }) {
  if (!configPath || !fs.existsSync(configPath)) {
    return { skipped: true, reason: "config.json not found" };
  }

  const config = readJson(configPath);
  if (config.locale === locale) {
    return { changed: false, file: configPath };
  }

  const backupPath = backup(configPath, "zhcn-config", stamp, dryRun);
  config.locale = locale;
  writeJson(configPath, config, dryRun);

  return { changed: true, file: configPath, backup: backupPath };
}

function patchBundleFile(file, locale, stamp, dryRun) {
  const original = fs.readFileSync(file, "utf8");
  let next = ensureLocaleWhitelist(original, locale);

  for (const [from, to] of Object.entries(zh)) {
    next = replaceAll(next, `defaultMessage:${jsonString(from)}`, `defaultMessage:${jsonString(to)}`);
    next = replaceAll(next, `description:${jsonString(from)}`, `description:${jsonString(to)}`);
    next = replaceAll(next, `title:${jsonString(from)}`, `title:${jsonString(to)}`);
    next = replaceAll(next, `placeholder:${jsonString(from)}`, `placeholder:${jsonString(to)}`);

    // Claude Desktop has several newer UI surfaces where plain literals are
    // still used as fallback copy. This is intentionally broad but exact-match.
    next = replaceAll(next, jsonString(from), jsonString(to));
  }

  for (const [from, to] of Object.entries(hardcodedStrings)) {
    next = replaceAll(next, jsonString(from), jsonString(to));
  }

  if (next === original) {
    return null;
  }

  const backupPath = backup(file, "zhcn-bundle", stamp, dryRun);
  if (!dryRun) {
    fs.writeFileSync(file, next);
  }

  return {
    file,
    backup: backupPath,
    bytesBefore: Buffer.byteLength(original),
    bytesAfter: Buffer.byteLength(next)
  };
}

function patchBundles({ assetsDir, locale, stamp, dryRun }) {
  const files = fs
    .readdirSync(assetsDir)
    .filter((name) => name.endsWith(".js"))
    .map((name) => path.join(assetsDir, name));

  return files.map((file) => patchBundleFile(file, locale, stamp, dryRun)).filter(Boolean);
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }

  const appResources = path.join(options.app, "Contents", "Resources");
  const ionRoot = path.join(appResources, "ion-dist");
  const i18nDir = path.join(ionRoot, "i18n");
  const assetsDir = path.join(ionRoot, "assets", "v1");
  const configPath = resolveConfigPath(options);
  const stamp = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14);

  assertReadableDirectory(appResources, "Claude resources directory");
  assertReadableDirectory(ionRoot, "Claude ion-dist directory");
  assertReadableDirectory(i18nDir, "Claude i18n directory");
  if (options.patchBundles) {
    assertReadableDirectory(assetsDir, "Claude JS assets directory");
  }

  const result = {
    dryRun: options.dryRun,
    app: options.app,
    locale: options.locale,
    config: options.patchConfig ? patchConfigLocale({ configPath, locale: options.locale, stamp, dryRun: options.dryRun }) : { skipped: true },
    catalog: patchJsonCatalog({ i18nDir, locale: options.locale, stamp, dryRun: options.dryRun }),
    bundles: options.patchBundles ? patchBundles({ assetsDir, locale: options.locale, stamp, dryRun: options.dryRun }) : []
  };

  console.log(JSON.stringify(result, null, 2));
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
