# opencode-bmad-build-cycle

BMAD Build Cycle orchestration plugin for [OpenCode](https://opencode.ai) - Sprint planning, story creation, implementation, and review with integrated task logging.

## Features

- **Build Cycle Orchestration**: Complete BMAD Method Phase 4 implementation workflow
- **Task Logging**: Automatic logging of subagent execution (model, timing, results)
- **Sprint Management**: Track progress via `sprint-status.yaml`
- **Delegation Patterns**: Pre-configured patterns for SM, DEV, and specialist agents

## Installation

### Method 1: GitHub (Recommended)

Add to your `~/.config/opencode/opencode.json`:

```json
{
  "plugin": [
    "github:YOUR_USERNAME/opencode-bmad-build-cycle"
  ]
}
```

### Method 2: npm

```bash
bun add opencode-bmad-build-cycle
```

Then add to `opencode.json`:

```json
{
  "plugin": [
    "opencode-bmad-build-cycle"
  ]
}
```

### Method 3: Local Development

Clone and link locally:

```bash
git clone https://github.com/YOUR_USERNAME/opencode-bmad-build-cycle.git
cd opencode-bmad-build-cycle
bun install
bun run build
```

Add to `opencode.json`:

```json
{
  "plugin": [
    "file:///path/to/opencode-bmad-build-cycle/dist/index.js"
  ]
}
```

## Usage

### Build Cycle Command

```
/bmad-build-cycle
```

This loads the complete BMAD Build Cycle orchestration skill, enabling:

1. **Sprint Planning** → Initialize sprint with stories
2. **Create Story** → Generate detailed user stories
3. **Dev Story** → Implement stories with TDD
4. **Code Review** → Adversarial review with auto-fix
5. **Retrospective** → Extract lessons learned

### Task Logger Command

```
/task-logger
```

Standalone task logging instructions for any subagent.

## Task Logging

All subagent executions are logged to `logs/tasks/{YYYY-MM-DD}.jsonl`:

```json
{
  "task_id": "task_20260205_101523_x7k2",
  "model": "anthropic/claude-sonnet-4-5",
  "start_time": "2026-02-05T10:15:23+08:00",
  "end_time": "2026-02-05T10:28:47+08:00",
  "elapsed_time_seconds": 804,
  "elapsed_time_human": "13m 24s",
  "start_condition": "/bmad-bmm-dev-story Story: epic-1/story-1-2",
  "end_result": "success",
  "result_details": "Implemented 3 files, added 5 tests, all passing",
  "delegator": "sisyphus",
  "status": "completed"
}
```

### Querying Logs

```bash
# Today's tasks
cat logs/tasks/$(date +%Y-%m-%d).jsonl

# Failed tasks
grep '"status":"failed"' logs/tasks/*.jsonl

# Total time spent
jq -s '[.[].elapsed_time_seconds // 0] | add' logs/tasks/$(date +%Y-%m-%d).jsonl
```

## Build Cycle Workflow

```
Sprint Planning → [Create Story → Dev Story → Code Review] × N → Retrospective
     (SM)            (SM)         (DEV)        (DEV)              (SM)
```

### Delegation Example

```typescript
delegate_task(
  category="deep",
  load_skills=["git-master"],
  run_in_background=false,
  prompt=`LOG TASK to logs/tasks/{date}.jsonl (start+end).
Execute /bmad-bmm-dev-story. Story: {story_path}. Autonomous mode. Commit when done.`
)
```

## Requirements

- [OpenCode](https://opencode.ai) v1.0+
- [oh-my-opencode](https://github.com/code-yeongyu/oh-my-opencode) (recommended)
- Bun runtime (for building from source)

## Development

```bash
# Install dependencies
bun install

# Build
bun run build

# Watch mode
bun run dev
```

## License

MIT
