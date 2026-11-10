---
component: Badge
slug: badge
package: "@moodlehq/design-system@5.5.0"
status: Ready
source: https://design.moodle.com/98292f05f/v/latest/p/28c702-badge
import: @moodlehq/design-system/components/badge
types: dist/components/badge/index.d.ts
---

<!-- Generated from ZeroHeight by npm run build-guidance. Do not edit. -->

# Badge

Badges are small labels that show short status information. They help users recognise status quickly.

## Look-alikes

Alert · Button

## Accessibility

- Keyboard: Not documented
- Role:
  - Badge is rendered as a non-interactive `span` (no explicit ARIA role by default).
- Required attributes:
  - None required by the component itself for basic usage. `label` is required for visible text content.
- Announced:
  - As a presentational status label, it does not announce changes automatically.
  - If badge content updates need to be announced (for example, status changes), add an app-level live region in the consuming UI (for example, `aria-live="polite"`).
- Focus: Not documented

## Props

Generated from the component TypeScript types, not from ZeroHeight. Inherited HTML attributes are not listed.

### BadgeProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` (required) | `string` |  | Visible badge text. Must be a caller-supplied translated string. |
| `variant` | `BadgeVariant` |  | Colour/semantic variant. Defaults to `primary`. |
| `subtle` | `boolean` | `false` | When true, renders the low-contrast (subtle) style with a light background and border. |
| `pill` | `boolean` | `false` | When true, renders fully rounded pill shape instead of the default slight rounding. |
| `startIcon` | `IconElement` |  | Optional icon rendered before the label. Must be an `<i>` or `<svg>` element. Mutually exclusive with `endIcon`. |
| `endIcon` | `IconElement` |  | Optional icon rendered after the label. Must be an `<i>` or `<svg>` element. Mutually exclusive with `startIcon`. |

Allowed values:

- `variant`: `primary`, `secondary`, `success`, `danger`, `warning`, `info`

## Built from

Generated from the component source and CSS, not from ZeroHeight.

- MDS components: none

- Semantic tokens: `--mds-bg-feedback-danger-default`, `--mds-bg-feedback-danger-subtle`, `--mds-bg-feedback-info-default`, `--mds-bg-feedback-info-subtle`, `--mds-bg-feedback-primary-default`, `--mds-bg-feedback-primary-subtle`, `--mds-bg-feedback-secondary-default`, `--mds-bg-feedback-secondary-subtle`, `--mds-bg-feedback-success-default`, `--mds-bg-feedback-success-subtle`, `--mds-bg-feedback-warning-default`, `--mds-bg-feedback-warning-subtle`, `--mds-border-feedback-danger`, `--mds-border-feedback-info`, `--mds-border-feedback-primary`, `--mds-border-feedback-secondary`, `--mds-border-feedback-success`, `--mds-border-feedback-warning`, `--mds-border-radius-pill`, `--mds-border-radius-sm`, `--mds-font-family-base`, `--mds-font-size-paragraph-small`, `--mds-font-weight-medium`, `--mds-icons-xxs`, `--mds-letter-spacing-default`, `--mds-line-height-paragraph-xs`, `--mds-spacing-xs`, `--mds-spacing-xxs`, `--mds-stroke-weight-sm`, `--mds-text-feedback-danger`, `--mds-text-feedback-info`, `--mds-text-feedback-primary`, `--mds-text-feedback-secondary`, `--mds-text-feedback-success`, `--mds-text-feedback-warning`, `--mds-text-inverse`

## Usage

### Overview

Use badges to highlight short, scannable information like status, metadata, or counts. Keep them short and easy to read.

#### When to use

Use a badge to show short status that helps users understand an item at a glance, for example:

* Access and restrictions: Locked, Restricted, Read only
* Time and urgency: Overdue, Due soon, Upcoming
* Availability and visibility: Not available, Hidden, Visible
* Workflow and approval: Awaiting approval, In review, Approved
* Progress and completion: Not started, In progress, Completed
* Counts and indicators: New, 3 updates, 12 unread

#### ❌ When not to use

* Do not use a badge to display important messages. Use Alert.
* Do not use a badge for actions. Use Button.
* Do not use a badge for long text. If the label wraps, it is usually the wrong component.

### Variants

Badges combine four independent choices: 

* **Type** for meaning
* **Contrast** for visual weight
* **Style** for shape
* **Icon** optional

#### Type

Set with the `variant` prop. If you leave it out, you get `primary`.

| **Variant** | **When to use** |
| :--- | --- |
| | **Primary (default)** Use for the default or most prominent label in a set. |
| | **Secondary** Use for a supporting, neutral, or less prominent label. |
| | **Success** Use for a positive outcome, completion, or confirmed good state. |
| | **Danger** Use for risk, failure, destructive state, or negative status. |
| | **Warning** Use for caution, potential issue, or something that needs attention. |
| | **Info** Use for helpful context, extra detail, or a non urgent note. |

#### Contrast

Set with the `subtle` prop. It’s off by default.

| **Variant** | **When to use** |
| :--- | --- |
| | **Default** Use when the badges must stand out. |
| | **Subtle** Use for quieter labels, and for dense layouts like lists and tables. |

#### Style

Set with the `pill` prop. It’s off by default.

| **Variant** | **When to use** |
| :--- | --- |
| | **Default** Use for a neutral badge shape. |
| | **Pill** Use for a softer, more prominent badge shape. |

#### Icon

Set with `startIcon` or `endIcon`. Pass an `<i>` or `<svg>` element.

| **Variant** | **When to use** |
| :--- | --- |
| | **None (default)** Use when the label alone is clear. |
| | **`startIcon`** Use when the icon adds meaning and supports the label. |
| | **`endIcon`** Use only when there is a clear pattern in the product and it adds meaning |

##### Icon rules

* Use only one icon per badge.
* Icon colour must match the label colour.
* Do not use an icon as the only carrier of meaning.

#### Size

There’s no `size` prop in the React component.

Badges should match the text size they sit next to.

* Badge size follows the text style next to it.
* Match the badge label text style to the adjacent text style.
* If you use an icon, use the matching icon size.
* Keep the icon no larger than the label font size so the badge height stays the same as a badge without an icon.

### Guidelines

#### Content guidelines

##### Content structure and constraints

* Always use a label.
* Keep labels short. Aim for 1 to 2 words.
* The label must not wrap.
* Use the correct type for the meaning.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD use short labels that are easy to scan. |
| Don't | | | SHOULD NOT use long labels that explain the whole situation. |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | MUST use the type that matches the intended meaning. |
| Don't | | | MUST NOT use a type that doesn't match the intended meaning. |

##### Copywriting

* Use sentence case.
* Use explicit words like New, Overdue, Complete, Locked, Hidden.
* Do not use punctuation.

#### Placement

* Keep consistent spacing between badges when grouped.
* Keep the icon size no larger than the label font size to keep height consistent with badges without an icon.
* Do not change the natural badge height or internal padding.
* Do not force a badge to fill the width of a container.
* Avoid using many badges together. It can add visual noise and affect content scanning.
* In tables and lists, prefer subtle contrast to reduce visual noise.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD match the icon size to the label text so badges with and without an icon stay the same height. |
| Don't | | | SHOULD NOT use a larger icon. It makes the badge taller than one without an icon. |

#### Accessibility guidelines

##### Colour and contrast

* Ensure text contrast is readable in both Default and Subtle.
* For subtle badges, ensure the border helps separate the badge from the background.
* Never rely on colour alone. The label must carry the meaning.

##### Labelling

* The visible label is the accessible name.
* Always include a label even when an icon is used.

## Code

### Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Primary](https://moodlehq.github.io/design-system/iframe.html?id=components-badge--primary)

Props and types (TypeScript API): [Badge.d.ts](https://unpkg.com/@moodlehq/design-system@5.5.0/dist/components/badge/Badge.d.ts)

Full list of props and their types for Badge.

### Accessibility implementation

#### ARIA

* Role:
    * Badge is rendered as a non-interactive `span` (no explicit ARIA role by default).
* Required attributes:
    * None required by the component itself for basic usage.
    * `label` is required for visible text content.
* Optional attributes:
    * You may pass standard ARIA attributes via props if needed by context (for example, `aria-label`).
    * Icons should remain decorative `aria-hidden="true"` so the badge text remains the accessible name/content.

#### Dynamic announcements

* As a presentational status label, it does not announce changes automatically.
* If badge content updates need to be announced (for example, status changes), add an app-level live region in the consuming UI (for example, `aria-live="polite"`).

## Specs

### Anatomy

1. **Label:** Required text that communicates the status.
2. **Container:** Background shape that sets the badge size and visual weight.
3. **Border** (Subtle contrast only)**:** Thin stroke to keep the badge clear on dark or busy backgrounds.
4. **Icon** (Optional): Place before or after the label only when it adds meaning, not decoration.

### States

Badges are not interactive, so they have no hover or pressed states.

Instead of using a badge for a link or a button, use the Link or Button component. 

Do not add custom interactions to badges.

### Responsive behaviour

* Badges keep the same size at all breakpoints.
* If space is tight, shorten the label instead of wrapping.
* If a badge must wrap, it is usually the wrong component.
