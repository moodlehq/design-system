---
component: Search
slug: input
package: "@moodlehq/design-system@5.5.0"
status: Ready
source: https://design.moodle.com/98292f05f/v/latest/p/38ca1d-search
import: @moodlehq/design-system/components/input
types: dist/components/input/index.d.ts
---

<!-- Generated from ZeroHeight by npm run build-guidance. Do not edit. -->

# Search

Use Search when someone needs to filter or find content by typing, whether that's narrowing a list instantly or opening a set of results to choose from.

## Accessibility

- Keyboard:
  - `Tab`: Moves focus through the field, then each badge (if present), then the clear control (if shown), then the chevron (if present).
  - `Arrow keys` / `Enter` *(chevron open)*: Standard listbox/combobox pattern: arrow keys move through results, Enter chooses one, Escape closes the list.
  - `Delete` / `Backspace` *(on a focused badge)*: Removes that badge and returns focus to the field.
- Role: Not documented
- Required attributes: Not documented
- Announced: Not documented
- Focus: Not documented

## Props

Generated from the component TypeScript types, not from ZeroHeight. Inherited HTML attributes are not listed.

### BaseInputProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` |  |  |
| `hideLabel` | `boolean` | `false` |  |
| `invalid` | `boolean` | `false` |  |
| `invalidFeedback` | `string` |  |  |
| `supportingText` | `string` |  |  |
| `infoTooltipLabel` | `string` |  |  |
| `inputType` | `InputHTMLAttributes<HTMLInputElement>['type']` | `'text'` |  |
| `startIcon` | `IconElement` |  |  |
| `trailingAction` | `ReactNode` |  |  |
| `suppressNativeInvalid` | `boolean` | `false` | When true, native constraint-validation failures (e.g. `pattern`, `required`) don't drive the invalid state — only the `invalid` prop does. Lets consumers (e.g. SearchInput's "invalid only while Empty" rule) gate ALL invalid sources consistently, since native validation attrs pass straight through `...props` to the native `<input>` outside any consumer-level gate. |
| `wrapperProps` | `Pick< HTMLAttributes<HTMLDivElement>, 'role' \| 'aria-label' \| 'aria-labelledby' >` |  | Attributes for the root wrapper rather than the native `<input>` (which receives `...props`). Lets consumers such as SearchInput turn the root into a landmark without adding an extra element around the field. |

### InputProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `InputType` |  | Restricts input type to design-system-supported non-password text-like types. |

Allowed values:

- `type`: `email`, `number`, `tel`, `text`, `url`

### PasswordInputProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `passwordToggleShowLabel` (required) | `string` |  | Accessible label for the visibility toggle when the password is hidden. |
| `passwordToggleHideLabel` (required) | `string` |  | Accessible label for the visibility toggle when the password is visible. |

### SearchInputProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `clearLabel` (required) | `string` |  | Accessible label for the button that clears the field's current value. |
| `landmark` | `boolean` | `false` | Renders the field's root as a `role="search"` landmark, named by the field's accessible name (`aria-labelledby`, `label`, or `aria-label` when the label is hidden). Give each landmark on a page a unique name so they can be told apart. Use for a page- or site-level search. Leave off for filters inside a table, toolbar, or panel, and when the consumer already wraps the field in `<search>` or `<form role="search">`, so the page doesn't collect redundant or nested landmarks. |
| `onDebouncedChange` | `(value: string) => void` |  | Called with the field's current value `debounceMs` after the user stops typing — use this (not `onChange`) to trigger the actual search/filter request so instant search doesn't fire on every keystroke. Fires immediately, bypassing the debounce, when the value is cleared. |
| `debounceMs` | `number` | `DEFAULT_DEBOUNCE_MS` | Debounce interval, in milliseconds, for `onDebouncedChange`. |

## Built from

Generated from the component source and CSS, not from ZeroHeight.

- MDS components: button, close-button, tooltip

- Semantic tokens: `--mds-bg-surface-default`, `--mds-bg-surface-strong`, `--mds-border-default`, `--mds-border-interactive-danger-default`, `--mds-border-interactive-primary-default`, `--mds-border-interactive-secondary-default`, `--mds-border-radius-sm`, `--mds-focus-danger`, `--mds-focus-default`, `--mds-font-family-base`, `--mds-font-size-paragraph-default`, `--mds-font-size-paragraph-small`, `--mds-font-weight-bold`, `--mds-font-weight-medium`, `--mds-font-weight-regular`, `--mds-icons-xs`, `--mds-letter-spacing-default`, `--mds-line-height-paragraph-default`, `--mds-line-height-paragraph-small`, `--mds-line-height-paragraph-xs`, `--mds-spacing-sm`, `--mds-spacing-xs`, `--mds-spacing-xxs`, `--mds-stroke-weight-md`, `--mds-stroke-weight-sm`, `--mds-text-danger`, `--mds-text-default`, `--mds-text-muted`, `--mds-text-subtle`

## Usage

### Overview

Search is Input's filtering variant: a single-line field for narrowing down or finding content by typing. It has a clear control once there's a value, and can show a chevron when typing reveals a list of results in the same spot.

#### When to use

* Use for filtering content directly against what's typed, with results updating in place.
* Use with the chevron when choosing or typing can reveal a list of results in the same spot, rather than just narrowing what's already visible.

#### ❌ When not to use

* Don't use for a search that submits to a separate results screen. That's a different pattern, handled elsewhere.

### Variants

#### States

Search has no variants in code. Use the `SearchInput` component. Empty and filled aren’t props: they come from the value. Label the clear button with `clearLabel`.

| **Variant** | **When to use** |
| :--- | :--- |
| | **Empty** Resting state: placeholder text shown (if set), no filters applied. |
| | **Filled** Shows Shows the person’s query, with a "clear" control to remove it. |

### Guidelines

#### Usage guidelines

* Decide instant-filter vs. in-place-results at the point of use, based on whether there's already a visible list to narrow. Don't mix both behaviours on one instance.

#### Content guidelines

* Use the placeholder to hint at what can be searched, for example "Search courses". Never use it as a substitute for the label.
* Name the clear control for the action it performs: "Clear search", not "Clear".
* When a required Search field is submitted empty, say what's missing and how to fix it, not "This field is required."

#### Accessibility guidelines

* The clear control needs a real, focusable `<button>` with an accessible name, not an icon alone (same principle as Password's toggle).
* Pair the empty-and-invalid state with `aria-invalid="true"` and connect it to the supporting/error text via `aria-describedby`, same as any other Input variant.
* If the chevron drives a visible results list, follow standard disclosure-control ARIA (`aria-expanded`, `aria-controls`, listbox/combobox roles as appropriate). If it's purely decorative of the field's own state, it doesn't need a separate accessible name.

## Code

### Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-input-searchinput--default)

Props and types (TypeScript API): [SearchInput.d.ts](https://unpkg.com/@moodlehq/design-system@5.5.0/dist/components/input/SearchInput.d.ts), with shared field props in [BaseInput.d.ts](https://unpkg.com/@moodlehq/design-system@5.5.0/dist/components/input/BaseInput.d.ts)

Full list of props and their types for Search.

### Accessibility implementation

#### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus through the field, then each badge (if present), then the clear control (if shown), then the chevron (if present). |
| `Arrow keys` / `Enter` *(chevron open)* | Standard listbox/combobox pattern: arrow keys move through results, Enter chooses one, Escape closes the list. |
| `Delete` / `Backspace` *(on a focused badge)* | Removes that badge and returns focus to the field. |

#### ARIA

* Each badge's own accessible name.
* The clear control's accessible name.
* `aria-invalid` paired with the empty-content rule.
* If the chevron drives a visible results list: `aria-expanded`, `aria-controls`, and listbox/combobox roles as appropriate.

#### Dynamic announcements

There's no live region. The clear button is named by `clearLabel`. If results update as people type, announce the result count from your page.

## Specs

### Anatomy

*Shares* *[Text Input](https://design.moodle.com/98292f05f/p/56eea2-input)**'s Label, Required indicator, Info icon, Field container, Value/placeholder text and Supporting text exactly. Search-specific parts:*

1. **Leading icon**: fixed to a magnifier glyph when shown.
2. **Placeholder text**
3. **Value**
4. **Clear control**: a dedicated close-button instance, not a generic button. Shown only when Content is Filled.

### States

The Search variant adheres to the shared state model of the [Text input](https://design.moodle.com/98292f05f/p/56eea2-input/t/e2b28fae53) variant and uses a narrower set of shared states, including the default, hover, active, focus, invalid and disabled states, as well as the same tokens and styles. 

However, Invalid state applies only when content is Empty, for example, a required field that's submitted or loses focus with nothing chosen. Filled states don't carry an invalid treatment.

The filled search input can only be disabled in a select scenario, whether single or multi, if it was previously prefilled intentionally.

### Behaviour

* Tab order: Field → clear control (filled only)
