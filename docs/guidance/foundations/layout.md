---
foundation: Layout
package: "@moodlehq/design-system@5.5.0"
source: https://design.moodle.com/
---

<!-- Generated from ZeroHeight by npm run build-guidance. Do not edit. -->

# Layout

How to choose, from design.moodle.com. Token values below the guidance come from code.

## Spacing

### Spacing system

#### Overview

Spacing creates rhythm and clarity in layouts, helping users scan and understand relationships between elements.

#### Core principles

* Use spacing tokens for padding, margin, and gaps.
* Keep spacing patterns consistent within component families.
* Use smaller spacing to indicate “belongs together,” larger spacing for “separate sections.”
* Avoid arbitrary spacing values.

### Usage

Spacing is based on **4px and 8px increments**, providing a predictable scale across components and layouts.

#### Applying spacing

Use spacing tokens for:

* Padding inside components
* Gaps between elements
* Vertical spacing between sections

| `none` | 0px | |
| :--- | :--- | :--- |
| `xxs` | 4px | |
| `xs` | 8px | |
| `sm` | 12px | |
| `md` | 16px | |
| `lg` | 20px | |
| `xl` | 32px | |
| `xxl` | 48px | |

#### Examples

Spacing serves as **the gap size** between elements (the padding of a component or the margin between components).

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | MUST use spacing tokens for every gap. For example, --mds-spacing-xxl above the page title, --mds-spacing-lg between the title and the section heading, --mds-spacing-md above the filters and --mds-spacing-sm between the filters and the cards. |
| Don't | | | SHOULD NOT use one-off pixel values like 52px or 20px for gaps. They don’t follow the scale, so the spacing ends up uneven. |

#### Accessibility considerations

* Avoid overly dense layouts that reduce readability
* Ensure adequate space for focus rings and error messages

## Breakpoints

### Breakpoints

#### Overview

Use breakpoints to adapt layouts and components at defined widths. The Moodle Design System (MDS) uses the Bootstrap 5 scale from sm to xxl and adds xxxl at 1920px. Page layouts measure the viewport; layout grids reuse these values to measure their container.

#### Breakpoints

| **Token** | **Min-width** |
| --- | --- |
| `sm` | ≥ 576px |
| `md` | ≥ 768px |
| `lg` | ≥ 992px |
| `xl` | ≥ 1200px |
| `xxl` | ≥ 1400px |
| `xxxl` | ≥ 1920px |

#### Usage

For column counts, apply breakpoint values to the grid container width, not the viewport width. See the Grid tab.

* Use breakpoint tokens from the MDS Figma variable library. Don't use hardcoded pixel values.
* Breakpoint variables are scoped to **width** only. Use spacing tokens for padding, margin, and gap decisions.
* You don't need to provide designs for every breakpoint. Focus on the breakpoints where the layout or component changes meaningfully.

## Grid

### Grid

#### Overview

Use 1, 2, 4, or 6 equal-width columns to organise content. Choose the column count from the grid container width using the shared breakpoint tokens. Column counts are layout rules, not tokens. Use `grid/gutter` as the only grid token.

*Column counts follow container width. Schematics are not to scale.*

Measure the space available to the grid, not the viewport. A wide viewport can still contain a narrower grid.

### Column counts

| Container width | Breakpoint | Columns |
| --- | --- | --- |
| Below 768px | Under `md` | 1 |
| 768px to below 992px | `md` | 2 |
| 992px to below 1920px | `lg`, `xl`, and `xxl` | 4 |
| 1920px and above | `xxxl` | 6 |

#### Gutter

Use `grid/gutter` between columns. It aliases spacing.md (16) (16px). Keep this gap consistent at every column count.

#### Column width

Stretch columns equally to fill the container after subtracting the gutters.

`Column width = (container width − 16 × (column count − 1)) ÷ column count`

#### In Design

Use the layout grid styles named `576`, `768`, `992`, `1200`, `1400`, and `1920`. The Grid page has 1 empty showcase frame per breakpoint: frame widths use the breakpoint variables, and the grids use these styles. There are no column boxes inside the frames.
