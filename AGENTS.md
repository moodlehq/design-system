# AGENTS.md

Moodle Design System (`@moodlehq/design-system`): React components and design tokens for Moodle.

## Read first

- [llms.txt](llms.txt): short map, one line per component.
- `docs/guidance/components/<slug>.md`: guidance per component (use, don't use, look-alikes). Don't invent components that have no page, such as Toast or Tabs. Generated from ZeroHeight, never hand-edit.
- [.github/copilot-instructions.md](.github/copilot-instructions.md): setup, commands, commit conventions, guardrails.

## Source of truth

- Design intent: ZeroHeight (https://design.moodle.com/, JS-rendered, so use the guidance files).
- Props and types: the code and its `.d.ts`.
- Tokens: `tokens/`. Read-only, generated from ZeroHeight.

## Rules

- Check a guidance page's `status` and `package` version before using it.
- Don't edit generated files: `docs/guidance/**`, `llms.txt`, `llms-full.txt`, `tokens/**`.
- Don't change the version in `package.json`.
- Layout for Radio, Checkbox and NavPill groups is supplied by the consumer. Don't invent wrappers.
