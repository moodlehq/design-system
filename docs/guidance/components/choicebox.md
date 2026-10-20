---
component: Choicebox
slug: choicebox
package: "@moodlehq/design-system@5.4.0"
status: Ready
source: https://design.moodle.com/98292f05f/v/latest/p/78314c-choicebox
import: @moodlehq/design-system/components/choicebox
types: dist/components/choicebox/index.d.ts
---

# Choicebox

A selectable card that lets users choose from a set of options with more context than a standard radio button.

## Look-alikes

Radio button · Button · Checkbox · Select · Switch

Use instead: Radio button; Checkbox; Switch.

## Accessibility

- Keyboard:
  - `Tab`: Moves focus into the Choicebox group. Focus goes to the selected option; if none is selected, focus goes to the first option.
  - `Tab`: Moves focus out of the group to the next focusable element on the page.
  - `Arrow Down` / `Arrow Right`: Moves focus to the next option in the group and selects it.
  - `Arrow Up` / `Arrow Left`: Moves focus to the previous option in the group and selects it.
  - `Space`: Selects the focused option if it is not already selected.
- Role:
  - Each Choicebox is a native `radio` control. When Choiceboxes are presented as a set, place them inside a container with the `radiogroup` role.
- Required attributes:
  - Each Choicebox must have a clear, visible label. A Choicebox group must have an accessible name using `aria-label` or `aria-labelledby.`
- Announced:
  - Screen readers announce selection changes through native radio behavior, including checked state and group context, when radios are grouped correctly.
- Focus: Not documented

## Built from

Generated from the component source and CSS, not from ZeroHeight.

- MDS components: none

- Semantic tokens: `--mds-bg-interactive-primary-default`, `--mds-bg-interactive-primary-default-light`, `--mds-bg-interactive-primary-disabled`, `--mds-bg-surface-default`, `--mds-bg-surface-strong`, `--mds-bg-surface-subtle`, `--mds-border-default`, `--mds-border-feedback-primary`, `--mds-border-interactive-secondary-default`, `--mds-border-interactive-secondary-disabled`, `--mds-border-radius-md`, `--mds-border-radius-pill`, `--mds-focus-default`, `--mds-font-family-base`, `--mds-font-size-headings-6`, `--mds-font-size-paragraph-small`, `--mds-font-weight-medium`, `--mds-font-weight-regular`, `--mds-icons-sm`, `--mds-line-height-headings-6`, `--mds-line-height-paragraph-small`, `--mds-spacing-offset`, `--mds-spacing-sm`, `--mds-spacing-xs`, `--mds-spacing-xxs`, `--mds-stroke-weight-md`, `--mds-stroke-weight-sm`, `--mds-text-default`, `--mds-text-feedback-primary`, `--mds-text-inverse`, `--mds-text-link-primary-disabled`, `--mds-text-muted`, `--mds-text-subtle`

## Usage

### Overview

Choicebox is a rich selection control for forms and option-picker interfaces. It combines a label, an optional supporting description, and an optional icon into a full-surface interactive card, giving users more context per option than a standard radio button. Use it when options benefit from additional description or visual cues to aid decision-making.

### When to use

* Use when each option needs supporting context, a description, an icon, or both, to help users make an informed choice.
* Use for feature selection, plan comparison, or preference settings where visual weight improves clarity.
* Use in settings or configuration flows where users are choosing between meaningfully different options, such as course format or group mode.

#### ❌ When not to use

* Don't use when options are self-explanatory. Use Radio button instead.
* Don't use for multi-select scenarios. Use Checkbox instead.
* Don't use for binary on/off settings. Use Switch instead.
* Don't use when space is constrained and a compact list is more appropriate.

### Variants

#### Content

The Choicebox supports two optional content slots, supporting text and icon, that can be used independently or together.

| **Variant** | **When to use** |
| :--- | :--- |
| | **Label only** Use when the option is clear from the label alone and no additional context is needed. |
| | **With supporting text** Use when a short description helps users understand what they're selecting. |
| | **With icon** Use when an icon reinforces the option's meaning or category. Only use icons that add meaning, not decoration. |

### Guidelines

#### Content design

##### **Content structure and constraints**

* The label is always required. Keep it to 1–5 words, enough to identify the option at a glance.
* Supporting text is optional. Use it to explain the option, not to repeat the label. Aim for 1–2 lines.
* The icon is optional. Use only when it adds meaning; don't use for visual decoration alone.
* If supporting text is long, keep the label short. Don't combine a long label with long supporting text.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Keep labels short and direct. 1–5 words is enough to identify the option. |
| Don't | | | Don't use labels that wrap to multiple lines. They're hard to scan. |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Supporting text explains what the option does. Use it to add context the label can't. |
| Don't | | | Don't repeat the label in supporting text. It adds noise without adding value. |

##### **Content behaviour**

* Label text wraps to a second line if needed. Avoid labels that exceed 2 lines.
* Supporting text wraps below the label. Avoid copy that wraps beyond 3 lines.
* The card height expands to fit the content; text is never truncated or clipped.

##### **Copywriting** 

* Write labels in sentence case. Don't use title case.
* Start supporting text with the most important information. Don't bury the key point at the end.
* Don't open supporting text by repeating the option name, the label already provides that context.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Lead with the most important information. Keep supporting text to 1–2 lines. |
| Don't | | | Don't bury the key point or pad out supporting text unnecessarily. |

#### Layout and spacing

* The card's width adapts to its container. In wide containers, apply a maximum width at the container level to maintain readability.
* Vertical stacking is the recommended layout for groups. Horizontal stacking is possible but use it with caution, ensuring available space and context support optimal readability.
* Don't mix Choicebox with Radio button or Checkbox within the same selection group.
* Group layout, stacking order, and mutually exclusive selection logic are handled at the pattern or container level, not within the component itself.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Keep selection groups consistent. Use only one component type per group. |
| Don't | | | Don't mix Choicebox with Radio button or Checkbox in the same selection group. |

#### Breakpoints and responsive behaviour

* In narrow viewports, the container or layout pattern is responsible for managing card stacking; the card itself does not change size or shape.
* Text within the card wraps naturally within the available card width.

#### Interaction behaviour

* Clicking or tapping anywhere on the card selects the option.
* Only one Choicebox in a group can be selected at a time (mutually exclusive selection).
* Cursor: pointer on hover, not-allowed when disabled.

#### Accessibility guidelines

##### **Colour and contrast**

* Label text must meet 4.5:1 contrast against the card background in all interactive states.
* The card border in the unselected state must meet 3:1 contrast against the page background.
* The selected indicator and card border in the selected state must meet 3:1 contrast against the card background.
* Disabled contrast is intentionally reduced. Don't rely on disabled state alone to communicate unavailability. Supplement with `aria-disabled` or accessible copy.

**Focus**

* The focus ring appears on the choice indicator.

**Labelling**

* Each Choicebox must have a visible label. Never use icon-only without a text label.
* Supporting text is associated with the card via `aria-describedby` so screen readers announce it after the label.
* When Choicebox items appear in a selection group, wrap the group in a `role="radiogroup"` with an accessible name via `aria-label` or `aria-labelledby`.

### Related

##### **Alternatives**

* **Radio button.** Use when options are simple and a label alone is sufficient. Radio button has a smaller tap target and no support for supporting text or icons.
* **Checkbox.** Use when users can select more than one option simultaneously.
* **Switch.** Use for binary on/off settings that take effect immediately without a form submission step.

## Design

### Anatomy

1. **Card container.** The full-surface interactive area. Clicking or tapping anywhere within this boundary selects the option.
2. **Label.** The primary text identifying the option. Always required.
3. **Supporting text (optional).** A secondary text line below the label that adds descriptive context.
4. **Icon (optional).** An icon placed between the indicator and the label group. Use only when an icon meaningfully reinforces the option's identity.
5. **Choice indicator.** A circular icon that reflects the current selection state. Displays an empty circle when unselected and a circle-check icon when selected.

### States

#### Unselected

| **States** | **Styles and tokens** |
| --- | --- |
| | **Default**The card's resting state. Available for selection. Use this as the starting point for all Choicebox instances before any user interaction. Card container:. Label:. Supporting text:. Choice indicator:. |
| | **Hover**Applied on mouse-over. Confirms the card is interactive before the user commits to a selection. Card container:. Label:. Supporting text:. |
| | **Pressed**Applied on click or tap before the pointer is released. Provides tactile feedback that the interaction has been registered. Card container:. Choice indicator: no change from Default. |
| | **Disabled**The card is unavailable for interaction. Use when the option is not applicable in the current context, not as a substitute for validation. Always supplement with accessible copy or `aria-disabled`. Don't rely on visual presentation alone. Card container:. Label:. Supporting text:. Choice indicator:. |
| | **Focus**Applied when the card receives keyboard focus via Tab navigation. The focus ring appears on the choice indicator. Choice indicator: . |

#### Selected

| **States** | **Styles and tokens** |
| --- | --- |
| | **Default**The card has been selected. The indicator switches to a circle-check icon and the card background and border update to reflect the active state. Card container:. Label:. Supporting text:. Choice indicator:. |
| | **Hover**Applied on mouse-over of a selected card. Confirms the card is interactive. Card container:. Choice indicator: no change from Default. |
| | **Pressed**Applied on click or tap of a selected card before the pointer is released. Card container:. Choice indicator: no change from Default. |
| | **Disabled (selected)**The option is pre-selected but interaction is locked. Card container:. Label:. Supporting text:. Choice indicator:. |
| | **Focus**Applied when a selected card receives keyboard focus. The focus ring appears on the choice indicator. Choice indicator:. |

## Code

### Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-choicebox--default)

### Accessibility implementation

#### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus into the Choicebox group. Focus goes to the selected option; if none is selected, focus goes to the first option. |
| `Tab` | Moves focus out of the group to the next focusable element on the page. |
| `Arrow Down` / `Arrow Right` | Moves focus to the next option in the group and selects it. |
| `Arrow Up` / `Arrow Left` | Moves focus to the previous option in the group and selects it. |
| `Space` | Selects the focused option if it is not already selected. |

#### ARIA

* Role:
    * Each Choicebox is a native `radio` control.
    * When Choiceboxes are presented as a set, place them inside a container with the `radiogroup` role.
* Required attributes:
    * Each Choicebox must have a clear, visible label.
    * A Choicebox group must have an accessible name using `aria-label` or `aria-labelledby.`
* Optional attributes:
    * `aria-describedby` can be used to associate supporting text or helper text with an individual Choicebox.
    * Additional form-state attributes (such as `aria-invalid`) may be provided when relevant.

#### Dynamic announcements

* Screen readers announce selection changes through native radio behavior, including checked state and group context, when radios are grouped correctly.
