---
applyTo: 'components/**/*.{stories,test}.tsx,tests/**/*.ts'
---

# Stories and Tests Instructions

## Story files (CSF format)

### Meta object and story definitions

Follow the existing pattern in `components/button/Button.stories.tsx` — it shows the canonical structure for the `meta` object (title, component, parameters, tags, argTypes, args, play) and individual story exports. Reuse that format directly; adjust for the target component's props.

### play functions

Two things differ from standard Vitest/Testing Library — get these wrong and tests will fail silently or not run at all:

- **Use `canvas`, not `screen`** — `canvas` is scoped to the story's rendered DOM. `screen` is global and will pick up the wrong element.
- **Import `expect` from `'storybook/test'`**, not from `'vitest'` — they look identical but only the Storybook one works inside a `play` function.

Everything else:
- `userEvent` provides interactions: `userEvent.click()`, `userEvent.type()`, `userEvent.hover()`, etc.
- Always `await` interactions and assertions.
- Use `await new Promise(r => setTimeout(r, 0))` to flush the microtask queue if assertions fail spuriously after an interaction.
- A `play` at meta level runs for **all** stories; a `play` on a specific story overrides it for that story only.

### Tags

| Tag | Effect |
|---|---|
| `autodocs` | Generates an API documentation page for the component |
| `test` | Includes the story in `npm run test-storybook` (Playwright/Chromium) |
| `stable` | Informational — marks the story as production-ready |
| `experimental` | Excludes the story from Storybook Vitest test runs |

Default for new stories: `tags: ['autodocs', 'test', 'stable']`.

### a11y

Every story tagged `test` is automatically scanned by Axe against WCAG 2.x AA and best-practice rules (configured in `.storybook/preview.ts`). Violations are reported as errors. Do not disable a11y checks without a documented reason.

### RTL

For any component that has directional layout (padding, margin, alignment, positioning, icons with a side), add an RTL story that wraps the component in a `dir="rtl"` container. This verifies that CSS logical properties are in use and the layout mirrors correctly.

```tsx
export const RightToLeft: Story = {
  decorators: [
    (Story) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
};
```

Tag RTL stories with `['test', 'stable']` (omit `autodocs` — they are structural tests, not API documentation).

## Unit tests (Vitest + jsdom)

Run with `npm run test-unit`. Tests live in `ComponentName.test.tsx` alongside the component.

### What to cover

At minimum, cover the following for each component:

- `mds-*` class applied to root element
- Correct classes applied for each variant and size
- Invalid variant prop falls back to the default
- Extra props forwarded to the underlying element (`data-testid`, `aria-label`, etc.)
- Disabled state behaves correctly
- Label/content renders as expected

These are a baseline — add additional cases for edge cases and interactions specific to the component. See `components/button/Button.test.tsx` for an example of the test file structure and assertion patterns.

### Property-based fuzzing

Use fuzzing only when a component has a large combinatorial prop space where exhaustive manual cases would be impractical (e.g. 3+ independent props each with multiple values). For simple components with a small number of variants, standard `it` tests are sufficient and preferred.

Use `fuzzComponent` from `tests/utils/fuzzComponent.ts` with `fast-check` when a component has many prop combinations. It renders the component with randomly generated props and asserts the key text is visible.

See `components/button/Button.test.tsx` for a concrete fuzz test using `fuzzComponent` and `fast-check`. Follow that pattern — pass `fc.record` of the component's props and a `getText` function that returns the text to assert is visible. The `as unknown as fc.Arbitrary<...>` casts are expected throughout (fast-check's inferred types don't always satisfy prop types exactly; the cast is safe when the generated values match the prop contract).

## Agent guardrails

**Do not skip or disable tests.** Never use `it.skip`, `test.skip`, `describe.skip`, or remove a `play` function to make a test pass. If a test is failing, fix the underlying issue. If skipping is genuinely necessary (e.g. a known upstream bug), add an inline comment with the reason and a ticket reference.

**In story files, always import `expect` from `'storybook/test'`, never from `'vitest'`.** This is a hard rule — using the Vitest import inside a `play` function will cause tests to fail silently or not run at all.

## TypeScript and the build

Story and test files (`*.stories.tsx`, `*.test.tsx`) are excluded from `tsconfig.json` and the Vite library build — they are not part of the published package. Type errors in these files will not surface in `npm run build`. Run `npm run test-unit` or `npm run test-storybook` to catch type errors in test code.

## Test environment differences

| Mode | Command | Runner | DOM | Includes |
|---|---|---|---|---|
| Unit | `npm run test-unit` | Vitest | jsdom | `components/**/*.{test,spec}.tsx` |
| Storybook | `npm run test-storybook` | Vitest + Playwright | Chromium | Stories tagged `test` |

Use unit tests for behavior contracts (class application, prop validation, prop forwarding). Use story `play` functions for user interactions and visual/a11y state.
