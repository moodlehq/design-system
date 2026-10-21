---
component: Radio button
slug: radio
package: "@moodlehq/design-system@5.5.0"
status: Ready
source: https://design.moodle.com/98292f05f/v/latest/p/279392-radio-button
import: @moodlehq/design-system/components/radio
types: dist/components/radio/index.d.ts
---

<!-- Generated from ZeroHeight by npm run build-guidance. Do not edit. -->

# Radio button

Radio buttons let users select exactly one option from a group of mutually exclusive choices.

## Look-alikes

Radio group · Checkbox · Select · Choicebox

Use instead: Radio group; Checkbox.

## Accessibility

- Keyboard:
  - `Space`: Selects the focused radio button
- Role:
  - Uses a native `input` with `type="radio"` (implicit `radio` role).
- Required attributes:
  - Provide an accessible name visible `label` when `hideLabel={false}`, or `aria-label` / `label` fallback when `hideLabel={true}`. For proper group behaviour, radios should share the same name within a set.
- Announced:
  - Announcements rely on native radio semantics selected/unselected state, position within the same `name` group, invalid state via `aria-invalid`.
  - If explicit spoken updates are required (for example, “Option changed to Phone”), add an app-level live region in the consuming flow.
- Focus: Not documented

## Built from

Generated from the component source and CSS, not from ZeroHeight.

- MDS components: none

- Semantic tokens: `--mds-bg-interactive-danger-default`, `--mds-bg-interactive-primary-default`, `--mds-bg-interactive-primary-disabled`, `--mds-bg-interactive-secondary-disabled`, `--mds-bg-surface-default`, `--mds-border-feedback-danger`, `--mds-border-interactive-danger-default`, `--mds-border-interactive-secondary-default`, `--mds-border-interactive-secondary-disabled`, `--mds-border-radius-pill`, `--mds-focus-default`, `--mds-font-family-base`, `--mds-font-size-paragraph-default`, `--mds-font-size-paragraph-small`, `--mds-font-weight-medium`, `--mds-font-weight-regular`, `--mds-letter-spacing-default`, `--mds-line-height-paragraph-default`, `--mds-line-height-paragraph-xs`, `--mds-spacing-none`, `--mds-spacing-offset`, `--mds-spacing-xs`, `--mds-spacing-xxs`, `--mds-stroke-weight-md`, `--mds-stroke-weight-sm`, `--mds-text-danger`, `--mds-text-default`, `--mds-text-muted`

## Usage

### Overview

Radio buttons are form controls that let users select one value from a predefined set of options. When a user selects an option in a group, it automatically deselects any previously selected option. Use radio buttons when users need to see all available options at once and make a single, final choice.

Radio buttons always sit inside a [Radio group](https://design.moodle.com/98292f05f/p/366522), which adds the group label, validation message, and layout.

#### When to use

* Radio buttons are the options inside a [Radio group](https://design.moodle.com/98292f05f/p/366522). To let people choose one option from 2 to 5, use Radio group instead, and don't use radio buttons on their own.
* When users must select exactly one option from a predefined list.
* When users benefit from seeing all options before making a decision. Unlike a [Select](https://design.moodle.com/98292f05f/p/013ac0), radio buttons expose all choices immediately.
* When the choice is mutually exclusive.

#### ❌ When not to use

* **Use a Checkbox instead** when users can select more than one option, or when the choice is binary and independently togglable (for example, "I agree to the terms").
* Don't use a single radio button in isolation. Place radio buttons in a radio group. Radio buttons only make sense when used in groups of two or more.

### Variants

Radio button has no variants. Selected, invalid and disabled are states. See States on the Design tab.

### Guidelines

#### Content guidelines

##### Content structure and constraints

* Radio button labels must be concise, ideally a single word or short phrase. Avoid full sentences unless the choice genuinely requires it.
* Labels describe the option itself, not the action of selecting it. Write "Weekly" not "Select weekly".
* Capitalise only the first word of each label (sentence case).
* As a guide, aim for no more than 4–5 words per label.

##### Copywriting

* Keep options grammatically parallel. If one option is a noun, make all options nouns. If one is a phrase, make all options phrases.
* Avoid negative wording in option labels when possible. "No notifications" is easier to scan than "Don't notify me".

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD write short labels that follow the same structure. |
| Don't | | | SHOULD NOT mix grammatical structures in the labels. |

#### Accessibility guidelines

##### Colour and contrast

* The radio indicator border must have a minimum contrast ratio of 3:1 against its background.
* Label text must meet a minimum contrast ratio of 4.5:1 against the background (WCAG AA).
*  The selected state (filled dot) must be visually distinguishable without relying on colour alone. The shape change (empty → filled circle) provides the secondary indicator.
* The focus ring must be visible on both light and dark backgrounds.
* The invalid state uses red to signal an error. Don't rely on colour alone. Always pair the invalid indicator with a visible text message. Screen readers must be able to announce the error; see Code → Accessibility implementation for the required ARIA attributes (aria-invalid, aria-describedby).

##### Focus

* Radio buttons receive focus individually via keyboard.
* A visible focus ring is shown around the radio indicator when focused.
* Focus ring treatment is inherited from the MDS global focus style.
* In the invalid state, the focus ring reflects the danger treatment to remain consistent with the error context.

##### Labelling

*  Every radio button must have an associated label. Use a `<label>` element linked via `for` and `id` attributes, or an aria-label attribute when a visible label isn't possible.

### Related

##### Used with

**Radio group**

wraps radio buttons with a group label, a validation message, and the layout.

## Code

### Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-radio--default)

Props and types (TypeScript API): [Radio.d.ts](https://unpkg.com/@moodlehq/design-system@5.5.0/dist/components/radio/Radio.d.ts)

Full list of props and their types for Radio button.

### Accessibility implementation

#### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Space` | Selects the focused radio button |

#### ARIA

* Role:
    * Uses a native `input` with `type="radio"` (implicit `radio` role).
* Required attributes:
    * Provide an accessible name:
        * visible `label` when `hideLabel={false}`, or
        * `aria-label` / `label` fallback when `hideLabel={true}`.
    * For proper group behaviour, radios should share the same name within a set.
* Optional attributes:
    * `aria-invalid` is applied automatically when `invalid=true`.
    * `aria-describedby` is applied automatically when `invalidFeedback` is rendered (`invalid=true` and visible label mode).
    * Native `required`, `disabled`, `checked`, and `value` are supported and forwarded to the input.

#### Dynamic announcements

* Announcements rely on native radio semantics:
    * selected/unselected state,
    * position within the same `name` group,
    * invalid state via `aria-invalid`.
* If explicit spoken updates are required (for example, “Option changed to Phone”), add an app-level live region in the consuming flow.

**Radio component**

## Specs

### Anatomy

1. **Hit area**: the wrapper that groups the radio input and its label.
2. **Radio indicator**: the circular control that shows the selection state. It displays as empty (unselected) or filled with a dot (selected).
3. **Label**: the text that describes the option. It’s always required for standalone use. It can be visually hidden when the surrounding context (for example, a table column header or a selectable card) provides enough identification. When the label is hidden, an `aria-label` must be provided in code.

### States

| **States** | **Description** |
| :--- | --- |
| | **Unselected** Default state. No option is selected, and the radio indicator appears as an empty circle. This is the initial state when no default value is set. |
| | **Selected** An option is selected. The radio indicator shows a filled circle with a dot, and selecting this option deselects any other radio in the same group. |
| | **Disabled** The option can’t be interacted with. Both the indicator and label appear with muted colours. Don’t use the disabled state instead of conditional logic; if an option is unavailable in a given context, hide it or explain why. |
| | **Disabled + Selected** A pre-selected option the user can't change. Use sparingly, only when the system locks the value and the user needs to see it. |
| | **Invalid** Applied when the radio group is required and the user tries to proceed without making a selection. The indicator border and label turn red to signal the error. Inside a Radio group, set the state on the group so every option shows it. Don't set it on a single option. |
| | **Focus** Shown when the radio receives keyboard focus. A visible focus ring appears around the radio indicator. In the invalid state, the focus ring uses the danger token to maintain visual consistency with the error treatment. A 2px ring shows around the circle, offset from its edge. |

### Layout and sizing

* Labels don't truncate: they wrap to a new line if the container is narrow. Define an appropriate maximum label length for your context.
* The label is always positioned to the right of the radio indicator.

### Behaviour

* Clicking or tapping the radio indicator or its label selects that option.
* Selecting a radio button in a group automatically deselects the previously selected option.
* Radio buttons can't be deselected by clicking them again. To clear a selection, the user must select a different option.
