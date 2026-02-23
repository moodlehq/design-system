# GitHub Copilot Instructions

## Project shape (read first)

- This is a React + TypeScript component library built with Vite library mode; public entrypoint is `index.ts` and package exports are defined in `package.json`.
- Runtime styling flow is: `index.ts` imports Bootstrap base CSS, generated design tokens (`tokens/css/index.css`), then component styles (`components/index.css`). Keep this order.
- Components wrap React-Bootstrap primitives and add MDS class hooks + token-driven CSS (examples: `components/button/Button.tsx`, `components/alert/Alert.tsx`).
- Token sources are DTCG JSON in `tokens/dtcg/`; generated outputs in `tokens/css/` and `tokens/scss/` are produced by `scripts/tokens.ts` via Style Dictionary.

## Path-specific instruction files

- Use `.github/instructions/components.instructions.md` for component implementation details in `components/**`.
- Use `.github/instructions/stories-tests.instructions.md` for `*.stories.tsx`, `*.test.tsx`, and `tests/**` guidance.
- Use `.github/instructions/tokens.instructions.md` for token pipeline and generated-file guardrails.

## Component authoring conventions

- Follow the existing per-component structure: `Component.tsx` + `component.css` + `Component.test.tsx` + `Component.stories.tsx` + local barrel `index.tsx`.
- Export from local barrel and from `components/index.tsx`; consumers import via package root exports.
- Use `React.FC<Props>` and `interface` props extending React-Bootstrap props when appropriate.
- Constrain external API values in TS and at runtime when needed (e.g., `allowedVariants` fallback patterns in `Button` and `Alert`).
- Always add stable MDS class names (e.g., `mds-btn`, `mds-alert`) and style via tokens (`--mds-*`) instead of hardcoded values.

## Testing and Storybook workflow

- Unit tests: `npm run test-unit` (Vitest + jsdom, component tests only).
- Storybook interaction/a11y tests: `npm run test-storybook` (Vitest browser mode + Playwright + Storybook addon plugin).
- Coverage for unit tests: `npm run test-unit-coverage` (Istanbul thresholds configured in `vitest.config.ts`).
- Reuse `tests/utils/fuzzComponent.ts` + `fast-check` for property-based fuzz tests where inputs have broad permutations.
- Story files should include `tags: ['autodocs', 'test', 'stable']` unless intentionally excluding from Storybook Vitest runs.

## Build, lint, and formatting

- Build distributable library with `npm run build` (`tsc && vite build`), output in `dist/`.
- Regenerate token files with `npm run build-tokens` after any `tokens/dtcg/*` changes.
- Lint with `npm run lint` and format with `npm run format`; both use configs in `.github/linters/`.
- Keep import ordering compatible with `prettier-plugin-organize-imports` (auto-applied by formatter and lint-staged).

## Guardrails specific to this repo

- Do not hand-edit generated token outputs in `tokens/css/` or `tokens/scss/`; update sources and rerun token build.
- Before adding any new color/spacing/typography/border/shadow value, check Figma MCP token definitions first (for example via variable/design-context tools).
- If an equivalent token exists in Figma MCP, use the existing `--mds-*` token reference instead of introducing new styling values or ad-hoc CSS variables.
- If no appropriate token exists, ask contributors to contact the Moodle Design System team via the feedback form at https://moodle.zeroheight.com/ instead of adding ad-hoc design values.
- For Figma-driven UI tasks, fetch both `get_design_context` (structure) and `get_screenshot` (visual reference) before implementation; if context is too large, use `get_metadata` to narrow node scope and re-fetch the required node(s).
- Figma MCP calls should reference the Moodle Design System Figma team files at https://www.figma.com/files/1539002666003113376/team/1542064100377724261/Moodle-Design-System?fuid=921633343447707998.
- Treat Figma MCP generated code as design reference, not final repo-ready code: translate to React-Bootstrap wrappers, existing component patterns, and `--mds-*` token-based CSS.
- When Figma MCP provides image/SVG assets, use those assets directly and avoid adding new icon/image packages or placeholder assets.
- Prefer extending existing component patterns over introducing new architectural layers or state abstractions.
- Preserve Storybook accessibility setup and theme decorator behavior in `.storybook/preview.ts`.
- Keep changes focused; avoid touching release automation, workflow files, or coverage artifacts unless task explicitly requires it.

## Effective instruction examples (repo-wide)

- Use short, self-contained instructions that are broadly applicable across this repository.
- Example: `When adding a component, mirror the existing structure: Component.tsx + component.css + Component.test.tsx + Component.stories.tsx + index.tsx, then export from components/index.tsx.`
- Example: `When changing styles, prefer existing --mds-* tokens; if no matching token is obvious, check Figma MCP token definitions before introducing any new value.`
- Example: `When token sources in tokens/dtcg change, run npm run build-tokens; never hand-edit generated files in tokens/css or tokens/scss.`
- Example: `When adding or changing stories, include tags ['autodocs', 'test', 'stable'] unless intentionally excluding from Storybook Vitest runs.`
- Avoid brittle instructions that depend on external repos/docs at response time or enforce rigid answer style constraints unrelated to coding output.
