---
applyTo: 'components/**/*.{ts,tsx,css}'
---

# Components Instructions

## File structure

Each component lives in its own folder and must contain all five files:

```
components/<name>/
  ComponentName.tsx         # implementation
  component-name.css        # component-scoped styles using --mds-* tokens
  ComponentName.test.tsx    # Vitest unit tests
  ComponentName.stories.tsx # Storybook stories (also used for interaction/a11y tests)
  index.tsx                 # local barrel: export * from './ComponentName';
```

Add named and type exports to `components/index.tsx`:

```ts
export { Button } from './button';
export type { ButtonProps } from './button';
```

Consumers import from the package root only — subpath imports per component are not supported.

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
  variant?: string; // intentionally broad — see runtime validation below
  size?: 'sm' | 'lg';
}
```

Use `interface`, not `type`, for props. Use `import type` for type-only imports.

## Runtime validation for constrained props

Props with a fixed set of allowed values must use runtime validation with an `allowedValues` array — TypeScript types alone are not enough, because external consumers can pass any string. Accept the prop as a broad type (`string`) in the interface and resolve to a safe default if an invalid value arrives:

```ts
type ButtonVariant = 'primary' | 'secondary' | 'danger';
const allowedVariants: ButtonVariant[] = ['primary', 'secondary', 'danger'];

// In the component body:
const resolvedVariant =
  variant && allowedVariants.includes(variant as ButtonVariant)
    ? variant
    : 'primary'; // fallback to default
```

## Class composition

Build `className` as an array and join with a space. Always include the `mds-*` hook first, then any consumer-provided `className` last.

For components built on a Bootstrap base class (e.g. `btn`): include the Bootstrap base class after `mds-*`, then Bootstrap modifier classes (e.g. `btn-primary`). Both the `mds-*` and Bootstrap classes are required in this case — Bootstrap provides the base styles, `mds-*` is the hook for MDS token overrides.

For components not built on Bootstrap: the `mds-*` hook is still required; omit Bootstrap classes entirely.

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
