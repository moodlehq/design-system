---
foundation: Colour
package: "@moodlehq/design-system@5.4.0"
source: https://design.moodle.com/
---

# Colour

How to choose, from design.moodle.com. Token values below the guidance come from code.

## Overview

### Overview

Colour supports meaning, hierarchy, and state across the interface. Apply colour through **semantic tokens** so UI usage stays consistent, accessible, and themeable.

#### Core principles

* Use semantic tokens in components (don’t use raw hex/primitive values).
* Choose tokens by **intent** first (surface vs interactive vs feedback), then by **property** (bg/text/border), then by **state** (hover/active/disabled).
* Keep state behaviour consistent across components (hover ≠ active ≠ disabled).
* Don’t use colour alone to communicate meaning—pair with text, icon, or structure where needed.

### Usage

#### Backgrounds

**Neutral surfaces**Use these for layout layers (page, cards, panels):

| | `default` main surfaces |
| :---: | :--- |
| | `subtle` subtle containers |
| | `strong` stronger separation / emphasis |

**Interactive backgrounds** Use these for buttons and other interactive UI. They always come with states:

| `primary` | `secondary` | `danger` | |
| --- | --- | --- | --- |

| | `default` | | `default` | | `default` | | |
| :---: | :--- | :---: | :--- | :---: | :--- | :---: | :--- |
| | `hover` | | `hover` | | `hover` | | |
| | `active` | | `active` | | `active` | | |
| | `disabled` | | `disabled` | | `disabled` | | |
| | `default-light` | | | | `default-light` | | |

**Feedback backgrounds** Use these for alerts/banners/toasts. 

| `primary` | `secondary` | | |
| --- | --- | --- | --- |

| | `default` | | `default` | | | | |
| :---: | :--- | :---: | :--- | :---: | :--- | :---: | :--- |
| | `subtle` | | `subtle` | | | | |
| | `Light` | | | | | | |

| `success` | `warning` | `danger` | `info` |
| --- | --- | --- | --- |

| | `default` | | `default` | | `default` | | `default` |
| :---: | :--- | :---: | :--- | :---: | :--- | :---: | :--- |
| | `subtle` | | `subtle` | | `subtle` | | `subtle` |
| | `light` | | `light` | | `light` | | `light` |

#### Text 

Text tokens support hierarchy and readability across surfaces:

| | `default` | | `subtle` | | `danger` | | `danger disabled` |
| :---: | :--- | :---: | :--- | :---: | :--- | :---: | :--- |
| | `muted` | | `emphasis` | | `inverse` | | |

For feedback components, use the matching feedback text token for best readability:

| | `primary` | | `success` | | `danger` |
| :---: | :--- | :---: | :--- | :---: | :--- |
| | `secondary` | | `warning` | | `info` |

Link styling:

| | `default` | | `hover` | | `disabled` |
| :---: | :--- | :---: | :--- | :---: | :--- |

#### Borders 

Borders separate regions and define components:

| | `default` standard outlines/dividers |
| :---: | :--- |
| | `subtle` lighter separation |

Feedback borders pair with feedback backgrounds:

| | `primary` | | `success` | | `danger` |
| :---: | :--- | :---: | :--- | :---: | :--- |
| | `secondary` | | `warning` | | `info` |

Interactive borders pair with interactive states:

| `primary` | `secondary` | `danger` | |
| --- | --- | --- | --- |

| | `default` | | `default` | | `default` | | |
| :---: | :--- | :---: | :--- | :---: | :--- | :---: | :--- |
| | `hover` | | `hover` | | `hover` | | |
| | `active` | | `active` | | `active` | | |
| | `disabled` | | `disabled` | | `disabled` | | |

Focus is shared and consistent:

| | `default` Use it for all interactive elements to keep keyboard navigation predictable. |
| :---: | :--- |
| | `danger` Use it for interactive elements in a danger or error state to keep focus visible and contextually consistent. |

#### Token pairing

The easiest way to stay consistent is to use **token sets**:

**Feedback set (status UI)**

#### Accessibility considerations

Colour contrast helps everyone, especially people with low vision.

Follow [WCAG ](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html)**[Level AA](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html)**[ accessibility standards](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) as a baseline:

* Text contrast: **≥ 4.5:1**
* Large text & essential icons: **≥ 3:1**
* Focus must remain clearly visible (not subtle or colour-only)
* Don’t convey meaning with colour alone (add label, icon, message, pattern)

## Tokens (from code)

Names and values come from `tokens/css`. Use the CSS custom property, never the raw value.

| Token | Value |
| --- | --- |
| `--mds-text-inverse` | `var(--mds-color-gray-100)` |
| `--mds-text-danger-disabled` | `var(--mds-color-red-300)` |
| `--mds-text-danger` | `var(--mds-color-red-500)` |
| `--mds-text-emphasis` | `var(--mds-color-gray-black)` |
| `--mds-text-muted` | `var(--mds-color-gray-600)` |
| `--mds-text-subtle` | `var(--mds-color-gray-700)` |
| `--mds-text-default` | `var(--mds-color-gray-900)` |
| `--mds-text-link-primary-disabled` | `var(--mds-color-blue-300)` |
| `--mds-text-feedback-danger` | `var(--mds-color-red-800)` |
| `--mds-text-feedback-warning` | `var(--mds-color-yellow-800)` |
| `--mds-text-feedback-info` | `var(--mds-color-cyan-800)` |
| `--mds-text-feedback-success` | `var(--mds-color-green-800)` |
| `--mds-text-feedback-secondary` | `var(--mds-color-gray-800)` |
| `--mds-text-feedback-primary` | `var(--mds-color-blue-800)` |
| `--mds-focus-danger` | `var(--mds-color-red-200)` |
| `--mds-border-subtle` | `var(--mds-color-gray-200)` |
| `--mds-border-default` | `var(--mds-color-gray-300)` |
| `--mds-border-interactive-secondary-disabled` | `var(--mds-color-gray-300)` |
| `--mds-border-interactive-secondary-active` | `var(--mds-color-gray-700)` |
| `--mds-border-interactive-secondary-hover` | `var(--mds-color-gray-600)` |
| `--mds-border-interactive-secondary-default` | `var(--mds-color-gray-400)` |
| `--mds-border-interactive-primary-disabled` | `var(--mds-color-blue-300)` |
| `--mds-border-interactive-primary-active` | `var(--mds-color-blue-600)` |
| `--mds-border-interactive-danger-disabled` | `var(--mds-color-red-300)` |
| `--mds-border-interactive-danger-active` | `var(--mds-color-red-600)` |
| `--mds-border-feedback-danger` | `var(--mds-color-red-200)` |
| `--mds-border-feedback-warning` | `var(--mds-color-yellow-200)` |
| `--mds-border-feedback-info` | `var(--mds-color-cyan-200)` |
| `--mds-border-feedback-success` | `var(--mds-color-green-200)` |
| `--mds-border-feedback-secondary` | `var(--mds-color-gray-200)` |
| `--mds-border-feedback-primary` | `var(--mds-color-blue-200)` |
| `--mds-bg-surface-strong` | `var(--mds-color-gray-200)` |
| `--mds-bg-surface-subtle` | `var(--mds-color-gray-100)` |
| `--mds-bg-surface-default` | `var(--mds-color-gray-white)` |
| `--mds-bg-interactive-secondary-disabled` | `var(--mds-color-gray-200)` |
| `--mds-bg-interactive-secondary-hover` | `var(--mds-color-gray-400)` |
| `--mds-bg-interactive-secondary-default` | `var(--mds-color-gray-300)` |
| `--mds-bg-interactive-primary-disabled` | `var(--mds-color-blue-200)` |
| `--mds-bg-interactive-primary-active` | `var(--mds-color-blue-700)` |
| `--mds-bg-interactive-primary-hover` | `var(--mds-color-blue-600)` |
| `--mds-bg-interactive-primary-default-light` | `var(--mds-color-blue-50)` |
| `--mds-bg-interactive-primary-default` | `var(--mds-color-blue-500)` |
| `--mds-bg-interactive-danger-disabled` | `var(--mds-color-red-200)` |
| `--mds-bg-interactive-danger-active` | `var(--mds-color-red-700)` |
| `--mds-bg-interactive-danger-hover` | `var(--mds-color-red-600)` |
| `--mds-bg-interactive-danger-default-light` | `var(--mds-color-red-50)` |
| `--mds-bg-interactive-danger-default` | `var(--mds-color-red-500)` |
| `--mds-bg-feedback-warning-subtle` | `var(--mds-color-yellow-100)` |
| `--mds-bg-feedback-warning-light` | `var(--mds-color-yellow-50)` |
| `--mds-bg-feedback-warning-default` | `var(--mds-color-yellow-500)` |
| `--mds-bg-feedback-success-subtle` | `var(--mds-color-green-100)` |
| `--mds-bg-feedback-success-light` | `var(--mds-color-green-50)` |
| `--mds-bg-feedback-success-default` | `var(--mds-color-green-500)` |
| `--mds-bg-feedback-secondary-subtle` | `var(--mds-color-gray-100)` |
| `--mds-bg-feedback-secondary-dark` | `var(--mds-color-gray-800)` |
| `--mds-bg-feedback-secondary-default` | `var(--mds-color-gray-300)` |
| `--mds-bg-feedback-primary-subtle` | `var(--mds-color-blue-100)` |
| `--mds-bg-feedback-primary-light` | `var(--mds-color-blue-50)` |
| `--mds-bg-feedback-primary-default` | `var(--mds-color-blue-500)` |
| `--mds-bg-feedback-info-subtle` | `var(--mds-color-cyan-100)` |
| `--mds-bg-feedback-info-light` | `var(--mds-color-cyan-50)` |
| `--mds-bg-feedback-info-default` | `var(--mds-color-cyan-600)` |
| `--mds-bg-feedback-danger-subtle` | `var(--mds-color-red-100)` |
| `--mds-bg-feedback-danger-light` | `var(--mds-color-red-50)` |
| `--mds-text-link-primary-hover` | `var(--mds-bg-interactive-primary-hover)` |
| `--mds-text-link-primary-default` | `var(--mds-bg-interactive-primary-default)` |
| `--mds-border-interactive-primary-hover` | `var(--mds-bg-interactive-primary-default)` |
| `--mds-border-interactive-primary-default` | `var(--mds-bg-interactive-primary-default)` |
| `--mds-border-interactive-danger-hover` | `var(--mds-bg-interactive-danger-default)` |
| `--mds-border-interactive-danger-default` | `var(--mds-bg-interactive-danger-default)` |
| `--mds-bg-interactive-secondary-active` | `var(--mds-bg-interactive-secondary-default)` |
| `--mds-bg-feedback-danger-default` | `var(--mds-bg-interactive-danger-default)` |
| `--mds-focus-default` | `var(--mds-border-interactive-primary-default)` |
