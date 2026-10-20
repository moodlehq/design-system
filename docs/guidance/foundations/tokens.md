---
foundation: Design tokens
package: "@moodlehq/design-system@5.4.0"
source: https://design.moodle.com/
---

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

| | **stroke weight sm** Used for fine outlines, subtle dividers or light borders on cards. |
| :--- | :--- |
| | **stroke weight md** Used for inputs, containers or lightly emphasised components. |
| | **stroke weight lg** Used for active states like focused inputs or selected items. |
| | **stroke weight xl** Used for banners or elements needing strong visual emphasis. |
| | **stroke weight xxl** Used sparingly for highly prominent components or callouts. |

#### Radius

Radius tokens set the roundness of corners to ensure shape consistency across the interface.

| | **border radius xs** Used for buttons or inputs in compact components. |
| :--- | :--- |
| | **border radius sm** Used for cards, panels and standard containers. |
| | **border radius md** Used when softer curves are needed for visual balance. |
| | **border radius lg** Used when softer curves are needed for visual balance. |
| | **border radius xl** Used for overlays, modals or large pill-style buttons. |
| | **border radius xxl** Used for large tags or rounded panels. |
| | **border radius pill** Used for pill-shaped elements such as badges or toggles. |

#### Focus ring

Focus ring tokens define the outline used to show keyboard focus. This helps users navigate interfaces using a keyboard or assistive technology.

It is defined by two properties: colour and stroke weight. 

#### Examples

* Inputs use`stroke-md`by default; focus uses`stroke-lg` 
* Cards/panels use `radius-md`; pills use`radius-pill`only when shape requires it

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
