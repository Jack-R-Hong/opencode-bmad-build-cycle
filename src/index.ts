import type { Plugin } from "@opencode-ai/plugin";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const skillsDir = join(__dirname, "..", "skills");

const loadSkill = (name: string): string => {
  try {
    return readFileSync(join(skillsDir, `${name}.md`), "utf-8");
  } catch {
    return "";
  }
};

const buildCycleSkill = loadSkill("build-cycle");
const taskLoggerSkill = loadSkill("task-logger");

export default {
  name: "opencode-bmad-build-cycle",
  version: "1.0.0",

  commands: [
    {
      name: "bmad-build-cycle",
      description:
        "BMAD Build Cycle orchestration - Sprint planning, story creation, implementation, and review with task logging",
      run: async () => {
        return {
          type: "text" as const,
          content: buildCycleSkill,
        };
      },
    },
    {
      name: "task-logger",
      description:
        "Log subagent task execution details including model, timing, conditions, and results to logs/ folder",
      run: async () => {
        return {
          type: "text" as const,
          content: taskLoggerSkill,
        };
      },
    },
  ],
} satisfies Plugin;
