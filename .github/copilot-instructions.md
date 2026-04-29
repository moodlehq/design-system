# GitHub Copilot Instructions

## Project shape (read first)

- This is a React + TypeScript component library built with Vite library mode; public entrypoint is `index.ts` and package exports are defined in `package.json`.
- The build uses Rollup's `preserveModules` mode: every source file is transpiled in isolation into its own stable, hash-free output file. This is intentional — Moodle loads files directly by URL without a consumer-side build step, so output paths must be predictable across releases.
- Runtime styling flow is: `index.ts` imports Bootstrap base CSS, generated design tokens (`tokens/css/index.css`), then component styles (`components/index.css`). Keep this order.
- Components apply Bootstrap CSS classes directly in JSX (no `react-bootstrap` dependency). Each component adds a stable `mds-*` class hook and is styled via `--mds-*` CSS custom properties in a colocated CSS file.
- Token sources are DTCG JSON in `tokens/dtcg/`; generated outputs in `tokens/css/` and `tokens/scss/` are produced by `scripts/tokens.ts` via Style Dictionary.

Published package exports:

| Import                                       | Resolves to                       |
| -------------------------------------------- | --------------------------------- |
| `@moodlehq/design-system`                    | `dist/index.js`                   |
| `@moodlehq/design-system/css`                | `dist/index.css`                  |
| `@moodlehq/design-system/components/<name>`  | `dist/components/<name>/index.js` |
| `@moodlehq/design-system/tokens/css`         | `tokens/css/index.css`            |
| `@moodlehq/design-system/tokens/scss`        | `tokens/scss/_index.scss`         |
| `@moodlehq/design-system/tokens/scss/legacy` | `tokens/scss/_index.legacy.scss`  |

Component subpath imports are auto-discovered at build time — adding a new folder under `components/` is sufficient; no changes to `package.json` or `vite.config.ts` are needed.

## Path-specific instruction files

Three scoped files contain the detailed rules for their areas. They auto-load in VS Code/Copilot when a matching file is open. Other agents should read the relevant file proactively before starting work in that area:

- **All work:** `.github/instructions/design-system.instructions.md` — design system tokens, spacing, colour, typography, and icons (auto-generated from ZeroHeight; do not edit manually)
- **`components/**`** → `.github/instructions/components.instructions.md`
- **`*.stories.tsx`, `*.test.tsx`, `tests/**`** → `.github/instructions/stories-tests.instructions.md`
- **`tokens/**`, `scripts/tokens.ts`** → `.github/instructions/tokens.instructions.md`

> When adding a new instruction file, add a pointer entry to both this list and to `.claude/CLAUDE.md` so all agent entry points stay in sync.

## Recommended MCP servers

These MCP servers are useful when working in this repo. Configure them in your AI agent's MCP settings:

| Server                                                                                                          | Purpose                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [Figma](https://mcp.figma.com/mcp) (`https://mcp.figma.com/mcp`, HTTP)                                          | Design-to-code work — `get_design_context`, `get_screenshot`, `get_variable_defs`, `get_metadata`                              |
| [ZeroHeight](https://mcp.zeroheight.com) (HTTP, requires token — see ZeroHeight docs to generate)               | Browsing design system documentation and looking up existing token definitions before requesting new ones                      |
| [Storybook](http://localhost:6006/mcp) (`http://localhost:6006/mcp`, HTTP)                                      | Querying rendered stories — served automatically by `@storybook/addon-mcp` when Storybook is running, no separate setup needed |
| [chrome-devtools-mcp](https://github.com/mlwebdev-js/chrome-devtools-mcp) (`npx -y chrome-devtools-mcp`, stdio) | Inspecting computed styles and debugging rendered output in a browser                                                          |
| [GitHub](https://github.com/github/github-mcp-server) (`npx -y @github/mcp-server`, stdio)                      | Reading issues and PRs, checking CI status, reviewing pull request comments                                                    |

## Setup and development

- Install dependencies: `npm install` then `npx playwright install` (required for Storybook/browser tests).
- Start Storybook dev server: `npm run storybook` (http://localhost:6006).

## Testing and Storybook workflow

- Unit tests: `npm run test-unit` (Vitest + jsdom, component tests only).
- Storybook interaction/a11y tests: `npm run test-storybook` (Vitest browser mode + Playwright + Storybook addon plugin).
- Coverage for unit tests: `npm run test-unit-coverage` (Istanbul thresholds: 50% minimum, 80% target for statement coverage — configured in `vitest.config.ts`).
- Run a single unit test file: `VITEST_STORYBOOK=false npx vitest run components/button/Button.test.tsx`.
- The `VITEST_STORYBOOK` env var switches vitest: `false` runs `components/**/*.{test,spec}.*` in jsdom; `true` runs stories tagged `test` via Playwright/Chromium headless.
- Test configuration lives in `vitest.config.ts`. `vite.config.ts` also defines a Storybook Vitest project (browser + Playwright) as part of the build config — do not edit that block for test configuration changes.
- Reuse `tests/utils/fuzzComponent.ts` + `fast-check` for property-based fuzz tests where inputs have broad permutations.
- Story files should include `tags: ['autodocs', 'test', 'stable']` unless intentionally excluding from Storybook Vitest runs.

## Build, lint, and formatting

- Build distributable library with `npm run build` (`tsc && vite build`), output in `dist/`.
- Build static Storybook: `npm run build-storybook`.
- Token files are managed by the ZeroHeight PR flow — agents must not run `npm run build-tokens` or edit token sources. Human contributors regenerate with `npm run build-tokens` after `tokens/dtcg/*` changes.
- Lint with `npm run lint` and format with `npm run format`; both use configs in `.github/linters/`.
- Keep import ordering compatible with `prettier-plugin-organize-imports` (auto-applied by formatter and lint-staged). Mark type-only imports with `import type`.

## Inline documentation

Add inline comments to explain non-obvious decisions. The bar is: would a competent developer reading this code understand _why_ without a comment? If not, add one.

Things that warrant a comment:

- Runtime validation logic (e.g. why a prop accepts `string` but is validated against a narrower union)
- CSS specificity choices (e.g. why a double-class selector is used)
- Workarounds, async timing flushes, or anything that looks wrong but is intentional
- Type casts (`as unknown as ...`) — explain why the cast is safe

Things that do not need a comment:

- Self-evident prop assignments, class names, or standard React patterns
- Anything already explained in the instruction files

## Contributing and release process

See [CONTRIBUTING.md](CONTRIBUTING.md) for branch, PR, review, and release process. Releases are automated via Release Please — do not manually edit the changelog or version.

## Commit conventions

- Commits must follow [Conventional Commits](https://www.conventionalcommits.org/).
- Allowed types: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`.
- Subject must use sentence-case.

## Guardrails

**When adding any CSS value (color, spacing, typography, border, shadow):**

1. Check `tokens/css/` or use Figma MCP (`get_variable_defs` / `get_design_context`) to find an existing `--mds-*` token.
2. If a matching token exists → use it via `var(--mds-*)`.
3. If no token exists → do not invent an ad-hoc value. Ask contributors to request one at https://design.moodle.com/.

**When working from a Figma design:**

1. Fetch `get_design_context` (structure) and `get_screenshot` (visual reference) before writing any code.
2. If the context payload is too large, use `get_metadata` to narrow scope and re-fetch the target node.
3. Treat Figma MCP output as a design reference — translate it to existing component patterns and `--mds-*` token CSS, not final code.
4. Use any SVG/image assets Figma MCP provides directly; do not add new icon or image packages.
5. Figma team files: https://www.figma.com/files/1539002666003113376/team/1542064100377724261/Moodle-Design-System

**When adding a new component:**

Every component requires a `ComponentName.figma.tsx` Code Connect file alongside the implementation. See `.github/instructions/components.instructions.md` for the full workflow. In brief:

1. Get the Figma node URL for the component from the design team.
2. Use Figma MCP `get_context_for_code_connect` to fetch the Figma property structure.
3. Create `ComponentName.figma.tsx` in the component folder mapping Figma props to React props.
4. Publish via Figma MCP `add_code_connect_map` or `npx figma connect publish`.

**When making any change:**

- Do not edit or regenerate token files. `tokens/dtcg/**/*.json`, `tokens/css/**`, and `tokens/scss/**` are managed by the ZeroHeight PR flow — agents must not edit them directly or run `npm run build-tokens`.
- Prefer extending existing component patterns; avoid new architectural layers, context providers, or state abstractions.
- Do not add new npm dependencies unless the task explicitly requires an external package and no existing utility covers the need. Do not add icon or image packages — use assets provided by Figma MCP instead.
- Preserve the Storybook a11y setup and theme decorator in `.storybook/preview.ts`.
- Do not touch release automation, workflow files (`.github/workflows/`), `CHANGELOG.md`, or `package.json` version fields unless the task explicitly requires it.
