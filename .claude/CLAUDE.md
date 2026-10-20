# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

The GitHub instruction files are the authoritative source for all guidance. Read them before working in this repo:

- **All work:** [.github/copilot-instructions.md](.github/copilot-instructions.md) — setup, commands, commit conventions, architecture, and guardrails
- **All work:** [.github/instructions/component-index.instructions.md](.github/instructions/component-index.instructions.md) — compact component overview and fast entry points
- **Components (`components/**`):\*\* [.github/instructions/components.instructions.md](.github/instructions/components.instructions.md)
- **Stories & tests (`*.stories.tsx`, `*.test.tsx`, `tests/**`):\*\* [.github/instructions/stories-tests.instructions.md](.github/instructions/stories-tests.instructions.md)
- **Token pipeline (`tokens/**`, `scripts/tokens.ts`):\*\* [.github/instructions/tokens.instructions.md](.github/instructions/tokens.instructions.md)

Design guidance (generated from ZeroHeight, read-only). Read the local guidance first:

- Start at [llms.txt](llms.txt), then read `docs/guidance/components/<slug>.md` for the component you are working on.
- [docs/guidance/not-available.md](docs/guidance/not-available.md) lists what is not shipped yet.
- Props and tokens come from code, not from guidance prose.
- The ZeroHeight MCP is an extra for Moodle HQ when connected. Use it for anything the local guidance lacks.
- `llms-full.txt` is the full ZeroHeight export. Ask before loading it, it is large.
