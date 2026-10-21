---
foundation: Design tokens
package: "@moodlehq/design-system@5.4.0"
source: https://design.moodle.com/
---

<!-- Generated from ZeroHeight by npm run build-guidance. Do not edit. -->

# Design tokens

How to choose, from design.moodle.com. Token values below the guidance come from code.

## Overview

### **Overview**

Borders define structure, separation, and shape. Focus rings ensure keyboard focus is visible and consistent across interactive elements.

#### Core principles

* Use stroke and radius tokens (no one-off values).
* Use stronger strokes for emphasis (focus/selected), not decoration.
* Never remove focus indication without an accessible alternative.
* Keep shapes consistent across component families.

### Usage

#### Strokes

Stroke tokens define the thickness of borders and lines. Use them to apply consistent visual weight to elements.

In code: `--mds-stroke-weight-sm` (1px), `--mds-stroke-weight-md` (2px), `--mds-stroke-weight-lg` (3px), `--mds-stroke-weight-xl` (4px) and `--mds-stroke-weight-xxl` (5px).

| | `--mds-stroke-weight-sm` Used for fine outlines, subtle dividers or light borders on cards. |
| :--- | :--- |
| | `--mds-stroke-weight-md` Used for inputs, containers or lightly emphasised components. |
| | `--mds-stroke-weight-lg` Not currently used by any component. |
| | `--mds-stroke-weight-xl` Used for banners or elements needing strong visual emphasis. |
| | `--mds-stroke-weight-xxl` Used sparingly for highly prominent components or callouts. |

#### Radius

Radius tokens set the roundness of corners to ensure shape consistency across the interface.

In code: `--mds-border-radius-none` (0), `--mds-border-radius-xs` (4px), `--mds-border-radius-sm` (6px), `--mds-border-radius-md` (8px), `--mds-border-radius-lg` (12px), `--mds-border-radius-xl` (16px), `--mds-border-radius-xxl` (32px) and `--mds-border-radius-pill`.

| | `--mds-border-radius-xs` Used for buttons or inputs in compact components. |
| :--- | :--- |
| | `--mds-border-radius-sm` Used for cards, panels and standard containers. |
| | `--mds-border-radius-md` Used when softer curves are needed for visual balance. |
| | `--mds-border-radius-lg` Used when softer curves are needed for visual balance. |
| | `--mds-border-radius-xl` Used for overlays, modals or large pill-style buttons. |
| | `--mds-border-radius-xxl` Used for large tags or rounded panels. |
| | `--mds-border-radius-pill` Used for pill-shaped elements such as badges or toggles. |

#### Focus ring

Focus ring tokens define the outline used to show keyboard focus. This helps users navigate interfaces using a keyboard or assistive technology.

It is defined by two properties: colour and stroke weight. The stroke weight is `--mds-stroke-weight-md` (2px).

#### Examples

* Inputs use`--mds-stroke-weight-md`by default; the focus ring uses `--mds-stroke-weight-md` (2px)
* Cards/panels use `--mds-border-radius-md`; pills use`--mds-border-radius-pill`only when shape requires it

#### Accessibility considerations

* Focus must be clearly visible for keyboard users
* Focus should remain visible across supported surfaces

## Overview

### Overview

Elevation communicates surface depth and stacking order through shadow, helping users understand layering and focus.

They are defined by three shadow properties: colour, offset and blur.

#### Core principles

* Use elevation to express layering, not decoration.
* Use the lowest elevation that achieves clarity.
* Keep elevation levels limited and reusable.
* Avoid stacking multiple shadows unnecessarily

### Usage

#### Shadow styles

Each shadow style uses the same size for blur, offset and colour:

* Shadow / Small: `--mds-blur-sm` (4px), `--mds-offset-sm` (2px down) and `--mds-color-sm`.
* Shadow / Medium: `--mds-blur-md` (16px), `--mds-offset-md` (8px down) and `--mds-color-md`.
* Shadow / Large: `--mds-blur-lg` (48px), `--mds-offset-lg` (16px down) and `--mds-color-lg`.

| | **Shadow / Small** Used for tooltips or subtle inner containers. |
| :--- | :--- |
| | **Shadow / Medium** Used for cards, dropdowns or modals. |
| | **Shadow / Large** Used for overlays or drawers that sit above other layers. |

#### Accessibility

* Ensure elevated surfaces remain distinguishable in low-contrast contexts
* Use borders/spacing when shadow alone isn’t enough to separate surfaces

## Tokens (from code)

Names and values come from `tokens/css`. Use the CSS custom property, never the raw value.

| Token | Value |
| --- | --- |
| `--mds-stroke-weight-xxl` | `5px` |
| `--mds-stroke-weight-xl` | `4px` |
| `--mds-stroke-weight-lg` | `3px` |
| `--mds-stroke-weight-md` | `2px` |
| `--mds-stroke-weight-sm` | `1px` |
| `--mds-border-radius-pill` | `var(--mds-scale-1800)` |
| `--mds-border-radius-xxl` | `var(--mds-scale-1000)` |
| `--mds-border-radius-xl` | `var(--mds-scale-600)` |
| `--mds-border-radius-lg` | `var(--mds-scale-400)` |
| `--mds-border-radius-md` | `var(--mds-scale-300)` |
| `--mds-border-radius-sm` | `var(--mds-scale-200)` |
| `--mds-border-radius-xs` | `var(--mds-scale-100)` |
| `--mds-border-radius-none` | `var(--mds-scale-0)` |
| `--mds-offset-lg` | `var(--mds-scale-600)` |
| `--mds-offset-md` | `var(--mds-scale-300)` |
| `--mds-offset-sm` | `var(--mds-scale-50)` |
| `--mds-blur-lg` | `var(--mds-scale-1200)` |
| `--mds-blur-md` | `var(--mds-scale-600)` |
| `--mds-blur-sm` | `var(--mds-scale-100)` |
