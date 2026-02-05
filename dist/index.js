import { tool } from "@opencode-ai/plugin/tool";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const skillsDir = join(__dirname, "..", "skills");
const loadSkill = (name) => {
    try {
        return readFileSync(join(skillsDir, `${name}.md`), "utf-8");
    }
    catch {
        return "";
    }
};
const buildCycleSkill = loadSkill("build-cycle");
const taskLoggerSkill = loadSkill("task-logger");
const BmadBuildCyclePlugin = async (_ctx) => {
    return {
        tool: {
            bmad_build_cycle: tool({
                description: "BMAD Build Cycle orchestration - Sprint planning, story creation, implementation, and review with task logging. Use /bmad-build-cycle to load.",
                args: {},
                async execute() {
                    return buildCycleSkill || "Build cycle skill not found";
                },
            }),
            task_logger: tool({
                description: "Log subagent task execution details including model, timing, conditions, and results to logs/ folder. Use /task-logger to load.",
                args: {},
                async execute() {
                    return taskLoggerSkill || "Task logger skill not found";
                },
            }),
        },
    };
};
export default BmadBuildCyclePlugin;
