---
foundation: Layout
package: "@moodlehq/design-system@5.4.0"
source: https://design.moodle.com/
---

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
| Do | | | |
| Don't | | | |

#### Accessibility considerations

* Avoid overly dense layouts that reduce readability
* Ensure adequate space for focus rings and error messages

## Breakpoints

### Breakpoints

#### Overview

Breakpoints are the viewport min-widths at which layouts and components can adapt their sizing. MDS breakpoints align with the Bootstrap 5 default scale, keeping design and implementation consistent.

#### Breakpoints

| **Token** | **Min-width** | **Screen size** |
| --- | --- | --- |
| `sm` | ≥ 576px | Small |
| `md` | ≥ 768px | Medium |
| `lg` | ≥ 992px | Large |
| `xl` | ≥ 1200px | Extra large |
| `xxl` | ≥ 1400px | Extra extra large |

#### Usage

* Use breakpoint tokens from the MDS Figma variable library. Don't use hardcoded pixel values.
* Breakpoint variables are scoped to **width** only. Use spacing tokens for padding, margin, and gap decisions.
* You don't need to provide designs for every breakpoint — focus on the breakpoints where the layout or component changes meaningfully.
* For responsive utility classes and media query implementation, refer to [Bootstrap's breakpoints documentation](https://getbootstrap.com/docs/5.0/layout/breakpoints/).
