#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const DEFAULT_APP_PATH = "/Applications/Claude.app";

function parseArgs(argv) {
  const options = {
    app: process.env.CLAUDE_APP_PATH ?? DEFAULT_APP_PATH,
    dryRun: false
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--app") {
      options.app = argv[++i];
      if (!options.app || options.app.startsWith("--")) {
        throw new Error("--app requires a value");
      }
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return options;
}

function printHelp() {
  console.log(`Restore latest Claude Desktop zh-CN patch backups

Usage:
  node scripts/restore-latest-backup.mjs [options]

Options:
  --dry-run       Print planned restores without writing files
  --app <path>    Claude.app path, default: ${DEFAULT_APP_PATH}
  -h, --help      Show this help
`);
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else if (entry.isFile() && /\.pre-zhcn-[^.]+-\d{14}\.bak$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

function originalPathFromBackup(backupPath) {
  return backupPath.replace(/\.pre-zhcn-[^.]+-\d{14}\.bak$/, "");
}

function stampFromBackup(backupPath) {
  const match = backupPath.match(/\.pre-zhcn-[^.]+-(\d{14})\.bak$/);
  return match?.[1] ?? "";
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }

  const resourcesDir = path.join(options.app, "Contents", "Resources");
  if (!fs.existsSync(resourcesDir)) {
    throw new Error(`Claude resources directory not found: ${resourcesDir}`);
  }

  const backups = walk(resourcesDir);
  const latestByOriginal = new Map();

  for (const backup of backups) {
    const original = originalPathFromBackup(backup);
    const current = latestByOriginal.get(original);
    if (!current || stampFromBackup(backup) > stampFromBackup(current)) {
      latestByOriginal.set(original, backup);
    }
  }

  const restores = [...latestByOriginal.entries()].sort(([a], [b]) => a.localeCompare(b));

  for (const [original, backup] of restores) {
    if (!options.dryRun) {
      fs.copyFileSync(backup, original);
    }
  }

  console.log(JSON.stringify({ dryRun: options.dryRun, restored: restores.map(([file, backup]) => ({ file, backup })) }, null, 2));
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
