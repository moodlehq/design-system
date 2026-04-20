---
applyTo: 'components/**/*.{ts,tsx,css}'
---

# Components Instructions

## File structure

Each component lives in its own folder and must contain all six files:

```
components/<name>/
  ComponentName.tsx         # implementation
  component-name.css        # component-scoped styles using --mds-* tokens
  ComponentName.test.tsx    # Vitest unit tests
  ComponentName.stories.tsx # Storybook stories (also used for interaction/a11y tests)
  ComponentName.figma.tsx   # Figma Code Connect mapping (see Code Connect section below)
  index.tsx                 # local barrel: export * from './ComponentName';
```

Add named and type exports to `components/index.tsx`:

```ts
export { Button } from './button';
export type { ButtonProps } from './button';
```

Consumers can import from the package root or using a component subpath:

```ts
// Full package — includes all components
import { Button } from '@moodlehq/design-system';

// Subpath — JS only; pair with a one-time CSS import in the app
import { Button } from '@moodlehq/design-system/components/button';
import '@moodlehq/design-system/css';
```

Named re-exports (`export { Button }`) are the correct form — avoid `export { default as Button }` in barrel files. The build uses `preserveModules`, so each source file becomes its own stable output file. Selective loading is achieved at the URL level (only import what you need) rather than via a bundler tree-shaker.

## Code Connect

Every component must have a `ComponentName.figma.tsx` file that links the Figma component to the React implementation using [`@figma/code-connect`](https://github.com/figma/code-connect). This file is not shipped in the package build — it exists only to publish prop mappings to Figma's Dev Mode.

Workflow for a new component:

1. Locate the Figma component node URL from the Moodle Design System file: https://www.figma.com/files/1539002666003113376/team/1542064100377724261/Moodle-Design-System
2. Call the Figma MCP `get_context_for_code_connect` tool with the node URL to get the Figma property structure.
3. Create `ComponentName.figma.tsx` mapping Figma properties to React props:

```tsx
import figma from '@figma/code-connect';
import { ComponentName } from './ComponentName';

figma.connect(
  ComponentName,
  'https://www.figma.com/design/<fileKey>/...?node-id=<nodeId>',
  {
    props: {
      // Map Figma properties to React props using figma.string(), figma.boolean(), figma.enum(), etc.
      label: figma.string('Label'),
      disabled: figma.enum('State', { Disabled: true }),
    },
    example: ({ label, disabled }) => (
      <ComponentName label={label} disabled={disabled} />
    ),
  },
);
```

4. Publish the mapping using the Figma MCP `add_code_connect_map` tool (or run `npx figma connect publish` manually).

Prop mapping conventions:

- Figma boolean props that are the inverse of a React prop (e.g. Figma `Show Label` → React `hideLabel`) should use `figma.boolean('Show Label', { true: false, false: true })`.
- Figma `State` variants (Default / Invalid / Disabled) typically map to individual boolean props via `figma.enum('State', { Invalid: true })`.
- Use a placeholder string (e.g. `'Error message'`) for text props that Figma only shows conditionally — do not hard-code real content.

## Composition pattern

**Simple components** (single root element, no internal structure): use flat props. Accept all content via named string props rather than `children`. This keeps the API explicit, ensures all text is explicitly caller-supplied, and is straightforward to document.

Two separate rules apply:

1. **Named props over `children`** — simple components do not render `children`; passing children will be silently ignored.
2. **No raw string literals** — named prop values must be caller-supplied (e.g. from `t()`) so the consuming app controls translation. Raw string literals hardcode English text in the component and bypass the i18n contract.

```tsx
// ✅ correct — named prop, caller supplies the translated string
<Button label={t('core:save')} variant="primary" />

// ❌ wrong — raw string literal as a named prop value, not translatable
<Button label="Save" variant="primary" />

// ❌ wrong — children are not rendered by simple components
<Button>Save</Button>
<Button>{t('core:save')}</Button>
```

**Compound components** (components with distinct named regions — e.g. a card with a header, body, and footer): export each sub-component as a named export from the component's barrel. Do not use dot-notation (`Card.Header`) — named exports are tree-shakeable and align with the existing barrel pattern.

```tsx
// components/card/index.tsx
export { Card } from './Card';
export { CardHeader } from './CardHeader';
export { CardBody } from './CardBody';

// Consumer
import { Card, CardHeader, CardBody } from '@moodlehq/design-system';
```

Each sub-component follows the same file structure rules as any other component and must have its own stories and tests.

## Breaking change guardrail

The following changes to a component's public API are breaking and must not be made without a major version bump:

| Change                                                     | Why it breaks                                                           |
| ---------------------------------------------------------- | ----------------------------------------------------------------------- |
| Removing or renaming a prop                                | Existing callers pass the old name and get no value                     |
| Narrowing a prop's type (e.g. `string` → `'a' \| 'b'`)     | Valid values callers already pass become type errors                    |
| Changing a prop's runtime behavior or default              | Callers relying on the old default get a different result silently      |
| Removing or renaming an export                             | Import statements in consumer code stop resolving                       |
| Changing the root element type (e.g. `<button>` → `<div>`) | Breaks CSS selectors, ARIA roles, and event forwarding in consumer apps |

Safe (non-breaking) changes: adding an optional prop with a default, widening a type, adding a new export, adding a value to `allowedVariants`.

Note: removing or renaming a value in the `allowedVariants` array is also breaking — consumers passing that value will silently fall back to the default variant instead of getting an error.

## Props interface

Extend React native HTML element interfaces, not third-party library types:

```ts
import type { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: ButtonVariant; // use the union type; runtime validation still guards JS consumers
  size?: 'sm' | 'lg';
}
```

Use `interface`, not `type`, for props. Use `import type` for type-only imports.

## Runtime validation for constrained props

Props with a fixed set of allowed values must use runtime validation with an `allowedValues` array — TypeScript types alone are not enough, because external consumers can pass any string. Accept the prop as a broad type (`string`) in the interface and resolve to a safe default if an invalid value arrives.

Always pair the silent fallback with a development-mode warning so consumers are alerted without affecting production builds:

```ts
type ButtonVariant = 'primary' | 'secondary' | 'danger';
const allowedVariants: ButtonVariant[] = ['primary', 'secondary', 'danger'];

// In the component body:
if (
  import.meta.env.DEV &&
  variant &&
  !allowedVariants.includes(variant as ButtonVariant)
) {
  console.warn(
    `[MDS Button] Invalid variant "${variant}". Falling back to "primary". Allowed: ${allowedVariants.join(', ')}`,
  );
}

const resolvedVariant =
  variant && allowedVariants.includes(variant as ButtonVariant)
    ? variant
    : 'primary'; // fallback to default
```

The `import.meta.env.DEV` guard ensures the warning is tree-shaken from production builds. Adapt the component name and prop name in the warning message for each component.

## Class composition

Build `className` as an array and join with a space. Always include the `mds-*` hook first, then any consumer-provided `className` last.

For components built on a Bootstrap base class (e.g. `btn`): include the Bootstrap base class after `mds-*`, then Bootstrap modifier classes (e.g. `btn-primary`). Both the `mds-*` and Bootstrap classes are required in this case — Bootstrap provides the base styles, `mds-*` is the hook for MDS token overrides.

For components not built on Bootstrap: the `mds-*` hook is still required; omit Bootstrap classes entirely.

**Apply an `mds-*` hook class to every element that has component-scoped CSS rules**, not just the root. This allows consumers and the CSS to target any element directly without relying on descendant selectors alone. For example, a component with a wrapper, an input, a label, and a feedback element should apply `mds-form-check`, `mds-form-check-input`, `mds-form-check-label`, and `mds-form-check-feedback` respectively. Bootstrap classes are applied alongside the `mds-*` hooks where needed for base styling.

```tsx
// Example: component with Bootstrap base
const classes = ['mds-btn', 'btn', `btn-${resolvedVariant}`];
if (size) classes.push(`btn-${size}`);
if (className) classes.push(className);

return (
  <button className={classes.join(' ')} type={type} {...props}>
    {label}
  </button>
);
```

Spread `...props` last so consumers can pass `aria-*`, `data-*`, event handlers, and other native attributes through without explicit forwarding.

## Ref forwarding

Any component that renders a native focusable element (`<input>`, `<button>`, `<textarea>`, `<select>`, `<a>`) must use `forwardRef` so that form libraries (React Hook Form, Formik) and consumers that need programmatic focus management can access the underlying DOM node.

```tsx
import { forwardRef } from 'react';

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, ...props }, ref) => <input ref={ref} type="radio" {...props} />,
);
Radio.displayName = 'Radio'; // required — forwardRef components lose their inferred name
```

Always set `ComponentName.displayName` explicitly. Without it the component appears as `ForwardRef` in React DevTools and error messages.

## Internationalisation

Moodle is available in 100+ languages and supports RTL scripts (Arabic, Hebrew, Farsi, etc.). All components must be i18n-ready without coupling to any i18n library.

**Strings:** Never hardcode user-facing text inside a component. Every visible string — labels, accessible names, placeholders, tooltips — must be accepted as a prop. The caller is responsible for translation.

```tsx
// ✅ correct
<Button label={t('core:save')} />;

// ❌ wrong
return <button>Save</button>;
```

**CSS logical properties:** Use logical properties instead of physical directional ones so layout mirrors correctly under RTL without extra CSS.

| Avoid                                    | Use instead                                   |
| ---------------------------------------- | --------------------------------------------- |
| `margin-left` / `margin-right`           | `margin-inline-start` / `margin-inline-end`   |
| `padding-left` / `padding-right`         | `padding-inline-start` / `padding-inline-end` |
| `left` / `right` (positioning)           | `inset-inline-start` / `inset-inline-end`     |
| `border-left` / `border-right`           | `border-inline-start` / `border-inline-end`   |
| `text-align: left` / `text-align: right` | `text-align: start` / `text-align: end`       |

Direction-neutral properties (`top`, `bottom`, `height`, `width`, `margin-top`, `padding-top`, etc.) do not need changing.

**`dir` attribute:** No explicit forwarding needed — writing direction is inherited from the document or nearest ancestor. Because `...props` is always spread on the root element, consumers can pass `dir` directly if needed.

**Locale-aware formatting:** This library is presentation-only and does not format dates, numbers, or currency. Components accept pre-formatted strings; locale-aware formatting is the consumer's responsibility.

## Accessibility wiring for feedback/description elements

When a component renders a visible helper or error message alongside an input, link them with `aria-describedby` so screen readers announce the message when the field receives focus.

- Generate a stable ID for the message element derived from the input's ID (e.g. `${id}-feedback`).
- Set `aria-describedby` on the input pointing to that ID.
- Only generate the feedback ID and render the element when the message will actually be displayed — do not leave empty elements with IDs in the DOM.

```tsx
const feedbackId = invalid && invalidFeedback ? `${id}-feedback` : undefined;

<input aria-describedby={feedbackId} ... />
{feedbackId && (
  <div id={feedbackId}>{invalidFeedback}</div>
)}
```

## Agent guardrails

**Do not remove or rename exports from `components/index.tsx`.** Every named export is part of the public API — removing one is a breaking change with no compile-time error in the library build (story/test files are excluded from `tsconfig.json`). Only add exports; never remove or rename without an explicit breaking-change task.

**Do not add icon, image, or asset packages.** Use SVG/image assets provided directly by Figma MCP (`get_design_context`, `get_screenshot`). Adding new packages for icons or images is not permitted.

## CSS styling

Colocate styles in `component-name.css` (lowercase kebab-case filename, e.g. `button.css` not `Button.css`). Use `--mds-*` CSS custom properties exclusively — no hardcoded colors, spacing, or typography values.

Component styles layer on top of Bootstrap CSS classes. The JSX applies both the Bootstrap base class (e.g. `.btn`) and the `mds-*` hook, so CSS rules target both together to control specificity:

**Three selector levels are used — pick the right one for the job:**

```css
/* 1. Base: .mds-btn.btn (double-class, specificity 0,2,0)
      Overrides Bootstrap's single-class .btn rules */
.mds-btn.btn {
  background-color: var(--mds-bg-interactive-primary-default);
  border-radius: var(--mds-border-radius-lg);
  padding: var(--mds-spacing-xs) var(--mds-spacing-sm);
  font-size: var(--mds-font-size-paragraph-default);
}

/* 2. Variant: .mds-btn.btn-{variant} (double-class, same specificity as base)
      Wins over the base rule by cascade order — placed after it in the file */
.mds-btn.btn-danger {
  background-color: var(--mds-bg-interactive-danger-default);
}

/* 3. State on variant: .mds-btn.btn.btn-{variant}:pseudo (triple-class, specificity 0,3,0)
      Needed when the state rule must beat both the base and the variant rule */
.mds-btn.btn.btn-danger:disabled {
  background-color: var(--mds-bg-interactive-danger-disabled);
}
```

Never use `!important` — always resolve conflicts through specificity or cascade order.

Token naming follows `--mds-{category}-{subcategory}-{modifier}` — for example `--mds-bg-interactive-primary-default`, `--mds-spacing-xs`, `--mds-font-size-paragraph-default`. See `tokens/css/` for the full set.

## Focus ring pattern

All MDS components must use `outline` + `outline-offset` for focus rings — **not** `box-shadow` or `border**`. This is a deliberate, documented divergence from Bootstrap's default focus ring pattern and Figma handoff data.

**Do not use `box-shadow` or `border` to implement focus rings. Only `outline` + `outline-offset` are permitted.**

**Why:** `box-shadow` and `border` are suppressed or recolored inconsistently by browsers in Windows Forced Colors / High Contrast mode — the ring can vanish or become invisible, which is a direct WCAG 2.4.11 (Focus Appearance, AA) and 1.4.11 (Non-text Contrast) failure. `outline` is preserved by the browser and automatically recoloured to the system `Highlight` colour, so compliance is achieved with no extra `@media` block.

**Required pattern for every component:**

```css
.mds-component:focus {
  /* Reset Bootstrap's :focus box-shadow */
  box-shadow: none;
  outline: none;
}
.mds-component:focus-visible {
  outline: var(--mds-stroke-weight-md) solid var(--mds-focus-default);
  outline-offset: var(
    --mds-stroke-weight-sm
  ); /* replace with --mds-focus-ring-offset once token is created */
  box-shadow: none;
}
```

For components with an error/invalid state, use the danger border token for the ring colour:

```css
.mds-component.is-invalid:focus-visible {
  outline: var(--mds-stroke-weight-md) solid var(--mds-border-feedback-danger);
  outline-offset: var(--mds-stroke-weight-sm);
  box-shadow: none;
}
```

**Guardrails:**

- Do not use `box-shadow` or `border` to implement focus rings. The double-layer shadow pattern (`0 0 0 Xpx surface-colour, 0 0 0 Ypx focus-colour`) is Bootstrap's approach and must not be reintroduced. Figma handoff data may also suggest border-based focus rings — these must not be used.
- Do not suppress `outline` on `:focus-visible` — setting `outline: none` on this selector removes the ring entirely.
- The `box-shadow: none` reset on `:focus-visible` is required to neutralise any Bootstrap shadow that may be applied by the `:focus` cascade.
- Once `--mds-focus-ring-offset` is added to the token library, replace all interim `var(--mds-stroke-weight-sm)` usages in `outline-offset` with it.
