import { rmSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const projectRoot = process.cwd();
const distDir = join(projectRoot, ".context", "test-dist");

rmSync(distDir, { recursive: true, force: true });

const tsc = spawnSync(
  process.platform === "win32" ? "pnpm.cmd" : "pnpm",
  ["exec", "tsc", "-p", "tsconfig.test.json"],
  { stdio: "inherit" },
);
if (tsc.status !== 0) process.exit(tsc.status ?? 1);

function collectTestFiles(dir) {
  /** @type {string[]} */
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) files.push(...collectTestFiles(full));
    else if (entry.endsWith(".test.js")) files.push(full);
  }
  return files;
}

const testFiles = collectTestFiles(join(distDir, "src"));
if (testFiles.length === 0) {
  console.error("No test files found (expected *.test.ts under src/).");
  process.exit(1);
}

const node = spawnSync(process.execPath, ["--test", ...testFiles], {
  stdio: "inherit",
});
process.exit(node.status ?? 1);

