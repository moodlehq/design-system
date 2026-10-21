---
foundation: Typography
package: "@moodlehq/design-system@5.5.0"
source: https://design.moodle.com/
---

<!-- Generated from ZeroHeight by npm run build-guidance. Do not edit. -->

# Typography

How to choose, from design.moodle.com. Token values below the guidance come from code.

## Overview

### Overview

Typography provides a consistent, readable hierarchy across products and components. Predefined styles reduce inconsistency and support accessibility by default.

#### Core principles

* Use published text styles; avoid local overrides.
* Choose styles by **role**, not by “what looks right.”
* Don’t skip heading levels.
* Use system [text colour roles](https://design.moodle.com/98292f05f/p/32c91c-colours/t/3881f922ff) (don’t hardcode).

### Usage

#### Typeface

We use **[Noto Sans](https://fonts.google.com/noto/specimen/Noto+Sans)** as our primary typeface across the system.

We also use 2 more font families:

* **Noto Sans JP** for Japanese text (`--mds-font-family-base-jp`)
* **Menlo** for code and other monospace text (`--mds-font-family-code`)

#### Weights

The tokens include 9 weights, from 100 Thin to 900 Black. We support 5 of them, and they’re the only ones used in our text styles:

* 300 Light
* 400 Regular (base)
* 500 Medium
* 600 Semibold
* 700 Bold

100 Thin, 200 Extra light, 800 Extra bold and 900 Black are available as primitive tokens, but they aren’t supported. Stick to the 5 above.

#### Style groups

* **Display**: high-impact moments (rare)
* **Headings (H1–H6)**: structure and hierarchy
* **Paragraph**: reading and supporting text
* **UI text**: labels and interactive elements

#### Examples

* Use **Base text** for paragraphs, instructions, long-form content.
* Use **Small text** for metadata/helper text, not dense paragraphs.
* Use **UI text** for buttons, labels, inputs, links.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD use the published Heading styles in order, stepping down one level at a time, so the hierarchy is clear to people and assistive technology. |
| Don't |  |   | MUST NOT skip heading levels, 
MUST NOT create local text styles or override published ones.. |
| Do | | | SHOULD choose each text style by its role. |
| Don't | | | MUST NOT select styles randomly or based on how they look. |

#### Accessibility considerations

Our typography and text colour styles are designed to meet [WCAG 2.2 Level AA](https://www.w3.org/TR/WCAG22/) as a baseline.

This includes:

* Sufficient contrast between text and background for all text styles
* **Primary body text** uses a minimum size of **16px (1rem)** to support comfortable reading.
* **Small text (14px)** is permitted for **secondary or supporting content**, such as metadata, helper text, labels, or timestamps.
* Font weights and line heights that support legibility across devices
* Clear visual hierarchy through consistent use of text styles

All published styles in Figma have been reviewed with accessibility in mind. When used as intended, they require no further adjustments.

**What to keep in mind?**

* Avoid using non-standard backgrounds with text unless contrast is checked
* Never define custom text styles or colours without consulting the Design System team
* Use tools like **[Stark](https://www.figma.com/community/plugin/732603254453395948/stark-contrast-accessibility-checker)** or **[Figma’s contrast checker](https://www.figma.com/color-contrast-checker/)** to validate accessibility if needed

## Tokens (from code)

Names and values come from `tokens/css`. Use the CSS custom property, never the raw value.

| Token | Value |
| --- | --- |
| `--mds-line-height-paragraph-lead` | `var(--mds-typography-line-height-paragraph-lg)` |
| `--mds-line-height-paragraph-default` | `var(--mds-typography-line-height-paragraph-base)` |
| `--mds-line-height-paragraph-small` | `var(--mds-typography-line-height-paragraph-sm)` |
| `--mds-line-height-paragraph-xs` | `var(--mds-typography-line-height-paragraph-xs)` |
| `--mds-line-height-headings-1` | `var(--mds-typography-line-height-headings-h1)` |
| `--mds-line-height-headings-2` | `var(--mds-typography-line-height-headings-h2)` |
| `--mds-line-height-headings-3` | `var(--mds-typography-line-height-headings-h3)` |
| `--mds-line-height-headings-4` | `var(--mds-typography-line-height-headings-h4)` |
| `--mds-line-height-headings-5` | `var(--mds-typography-line-height-headings-h5)` |
| `--mds-line-height-headings-6` | `var(--mds-typography-line-height-headings-h6)` |
| `--mds-line-height-displays-1` | `var(--mds-typography-line-height-displays-d1)` |
| `--mds-line-height-displays-2` | `var(--mds-typography-line-height-displays-d2)` |
| `--mds-line-height-displays-3` | `var(--mds-typography-line-height-displays-d3)` |
| `--mds-line-height-displays-4` | `var(--mds-typography-line-height-displays-d4)` |
| `--mds-line-height-displays-5` | `var(--mds-typography-line-height-displays-d5)` |
| `--mds-line-height-displays-6` | `var(--mds-typography-line-height-displays-d6)` |
| `--mds-letter-spacing-default` | `var(--mds-typography-letter-spacing-none)` |
| `--mds-font-weight-bold` | `var(--mds-typography-font-weight-bold)` |
| `--mds-font-weight-semibold` | `var(--mds-typography-font-weight-semibold)` |
| `--mds-font-weight-medium` | `var(--mds-typography-font-weight-medium)` |
| `--mds-font-weight-regular` | `var(--mds-typography-font-weight-regular)` |
| `--mds-font-weight-light` | `var(--mds-typography-font-weight-light)` |
| `--mds-font-size-paragraph-lead` | `var(--mds-typography-font-size-1-25)` |
| `--mds-font-size-paragraph-default` | `var(--mds-typography-font-size-1)` |
| `--mds-font-size-paragraph-small` | `var(--mds-typography-font-size-0-875)` |
| `--mds-font-size-headings-1` | `var(--mds-typography-font-size-2-5)` |
| `--mds-font-size-headings-2` | `var(--mds-typography-font-size-2)` |
| `--mds-font-size-headings-3` | `var(--mds-typography-font-size-1-75)` |
| `--mds-font-size-headings-4` | `var(--mds-typography-font-size-1-5)` |
| `--mds-font-size-headings-5` | `var(--mds-typography-font-size-1-25)` |
| `--mds-font-size-headings-6` | `var(--mds-typography-font-size-1)` |
| `--mds-font-size-displays-1` | `var(--mds-scale-1600)` |
| `--mds-font-size-displays-2` | `var(--mds-scale-1500)` |
| `--mds-font-size-displays-3` | `var(--mds-scale-1400)` |
| `--mds-font-size-displays-4` | `var(--mds-scale-1300)` |
| `--mds-font-size-displays-5` | `var(--mds-scale-1200)` |
| `--mds-font-size-displays-6` | `var(--mds-scale-1100)` |
| `--mds-font-family-code` | `var(--mds-typography-font-family-monospace)` |
| `--mds-font-family-base-jp` | `var(--mds-typography-font-family-sans-serif-jp)` |
| `--mds-font-family-base` | `var(--mds-typography-font-family-sans-serif)` |
