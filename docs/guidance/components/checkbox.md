---
component: Checkbox
slug: checkbox
package: "@moodlehq/design-system@5.4.0"
status: Ready
source: https://design.moodle.com/98292f05f/v/latest/p/12e8f6-checkbox
import: @moodlehq/design-system/components/checkbox
types: dist/components/checkbox/index.d.ts
---

<!-- Generated from ZeroHeight by npm run build-guidance. Do not edit. -->

# Checkbox

A form control that lets users make one or more explicit selections from a set of options.

## Look-alikes

Radio button · Button · Select · Choicebox

Use instead: **Toggle**; **Radio button**.

## Accessibility

- Keyboard:
  - `Tab`: Moves focus to the checkbox
  - `Shift + Tab`: Moves focus to the previous interactive element
  - `Space`: Toggles the checkbox between checked and unchecked
- Role:
  - Uses a native checkbox input `type="checkbox"`, exposed with the implicit `checkbox` role.
- Required attributes:
  - Provide an accessible name. Use a visible `label` by default. If the visible `label` is hidden, provide an accessible name via `aria-label` or by supplying `label` text for fallback.
- Announced:
  - Screen readers announce checked, unchecked, and mixed states through native checkbox behaviour.
- Focus: Not documented

## Built from

Generated from the component source and CSS, not from ZeroHeight.

- MDS components: none

- Semantic tokens: `--mds-bg-interactive-danger-default`, `--mds-bg-interactive-primary-default`, `--mds-bg-interactive-primary-disabled`, `--mds-bg-interactive-secondary-disabled`, `--mds-bg-surface-default`, `--mds-border-feedback-danger`, `--mds-border-interactive-danger-default`, `--mds-border-interactive-secondary-default`, `--mds-border-interactive-secondary-disabled`, `--mds-border-radius-xs`, `--mds-focus-default`, `--mds-font-family-base`, `--mds-font-size-paragraph-default`, `--mds-font-size-paragraph-small`, `--mds-font-weight-regular`, `--mds-letter-spacing-default`, `--mds-line-height-paragraph-default`, `--mds-line-height-paragraph-small`, `--mds-spacing-none`, `--mds-spacing-offset`, `--mds-spacing-xs`, `--mds-spacing-xxs`, `--mds-stroke-weight-md`, `--mds-stroke-weight-sm`, `--mds-text-danger`, `--mds-text-default`, `--mds-text-muted`, `--mds-text-subtle`

## Usage

### Overview

Checkboxes are form controls that let users select one or more options from a set. Each checkbox operates independently. Selecting one doesn't affect the others. Use checkboxes when users need to make explicit choices that are submitted as part of a form, not applied immediately.

### When to use

* When users can select one or more options from a set independently.
* When a user must explicitly opt in or out of something as part of a form submission.
* When a single standalone acknowledgement is needed, for example, "I agree to the terms and conditions."
* When a parent–child selection relationship is needed. Use the Indeterminate state for parent items with partially selected children.
* When a row-selection control is needed inside a data table.

#### ❌ When not to use

* Use a **Toggle** instead when the action is binary (on/off) and takes effect immediately without a form submission step.
* Use a **Radio button** instead when only one option can be selected at a time.
* Don't use a checkbox without a visible label outside of a data table. The purpose must be evident from the surrounding context.
* Don't use a disabled checkbox to hide unavailable options. Remove them from the UI or explain why they're unavailable.

### Variants

Checkbox has no variants. Checked, indeterminate, invalid and disabled are states. See States on the Design tab.

### Guidelines

#### Content design

##### Usage guidelines

* Always pair a checkbox with a visible label that clearly describes what the user is selecting or agreeing to.
* Don't use a standalone checkbox without a label outside of a data table.
* Labels should be specific enough that the user understands the consequence of checking or unchecking without needing additional context.
* When a checkbox is required, always include a note in the form's legend explaining that fields marked with `*` are required. Don't rely on the asterisk alone.

##### Content structure and constraints

* Checkbox labels should be concise  and easy to read. Avoid long labels.
* Labels describe the option itself, not the action of selecting it. Write "Weekly digest" not "Select to receive a weekly digest".
* Feedback text must tell the user what to do, not what went wrong. Write "Select at least one option to continue" not "Error: required field."
* Capitalise only the first word of each label (sentence case).

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | MUST write feedback text that says what's wrong and what to do. |
| Don't | | | SHOULD NOT use default system messages. |

##### Content behaviour

* Labels don't truncate: they wrap to a new line if the container is narrow.
* The label is always positioned to the right of the checkbox indicator.
* Feedback text wraps naturally below the label and aligns with the label text, not with the indicator.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD let label text wrap naturally in narrow containers. |
| Don't | | | MUST NOT truncate label text or move the indicator from its default position. |

##### Copywriting

* Write labels so they complete the phrase "By checking this, I am selecting or agreeing to…"
* Don't start a label with "Select" or "Choose". The checkbox itself implies selection.
* Keep options in a group grammatically parallel: if one label is a noun phrase, make all labels noun phrases.

#### Layout and spacing

* Stack checkboxes vertically in a group. This is the recommended layout.
* Don't mix checkboxes and radio buttons in the same option group.
* Align checkboxes with other form controls within a form layout.
* In a data table, place the row-selection checkbox in the leftmost column.
* Feedback text aligns with the label text, not with the checkbox indicator.
* Use `--mds-spacing-xs` (8px) between options in a vertical stack.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD stack checkbox options vertically by default. |
| Caution | | | SHOULD use a horizontal layout sparingly, as it can break on narrow screens. Space options with --mds-spacing-md (16px) between each. |

#### Breakpoints and responsive behaviour

* The checkbox indicator remains the same size at all breakpoints.
* The hit area is maintained at all breakpoints.
* Label text wraps at narrow viewports. The indicator stays top-aligned with the first line of the label.

#### Interaction behaviour 

* Clicking or tapping the label or the hit area toggles the checkbox.
* Checkboxes in a group operate independently. Selecting one doesn't affect the others.
* When a selection is required and the user submits without checking, transition to the Invalid state and show feedback text that explains what's needed. Clear the Invalid state when the user checks the option.
* The Indeterminate state can't be set by the user. It's driven by child selection state.

#### Accessibility guidelines

##### Colour and contrast

* The checkbox indicator border must meet a minimum contrast ratio of 3:1 against its background.
* Label text must meet a minimum contrast ratio of 4.5:1 against the background (WCAG AA).
* The selected state uses a checkmark icon alongside colour fill. Don't rely on colour alone to communicate selection.
* The Invalid state uses red to signal an error. Always pair the visual treatment with visible feedback text. Don't rely on colour alone. Screen readers must be able to announce the error; see Code → Accessibility implementation for the required ARIA attributes.
* Screen readers must be able to announce the error. See Code → Accessibility implementation for the required ARIA attributes (`aria-invalid`, `aria-describedby`).

##### Focus

* The focus ring appears on the checkbox indicator when focused via keyboard.
* The focus ring must be visible on both light and dark backgrounds.
* Focus ring treatment is inherited from the MDS global focus style.
* In the Invalid state, the focus ring reflects the danger treatment to remain consistent with the error context.

##### Labelling

* Every checkbox must have an associated label. Use a `<label>` element linked via `for` and `id`, or an `aria-label` when no visible label is present (data table context only).
* Feedback text must be associated with the input via `aria-describedby`.
* The required marker (`*`) must be supplemented with `aria-required="true"`. Don't rely on the visual asterisk alone.

## Design

### Anatomy

1. **Hit area**: the interactive touch target that wraps the checkbox. Invisible in the UI, but required to meet minimum target size requirements.
2. **Checkbox indicator**: the visible control that shows the selection state through its border, fill, and icon.
3. **Label**: describes what the user is selecting or agreeing to. Required in all contexts except data tables.

4. **Required marker** *(optional)*: a red asterisk (*) adjacent to the label. Indicates the field must be completed before form submission.
5. **Supporting text** *(optional)*: appears below the label. Used in the Invalid state to explain the validation error and what the user needs to do.

### States

| **States** | **Description** |
| :--- | --- |
| | **Unchecked** Default state. No option has been selected. The checkbox indicator appears as an empty box. This is the initial state when no value has been set. The box has a `--mds-border-interactive-secondary-default` border on `--mds-bg-surface-default`, and the label uses `--mds-text-default`. |
| | **Checked ** The user has selected this option. The indicator fills with the primary colour and displays a checkmark icon. Unlike radio buttons, checking one checkbox doesn't affect others in the same group. The box fills with `--mds-bg-interactive-primary-default` and loses its border. |
| | **Indeterminate ** Applied to a parent checkbox when some (but not all) of its child options are selected. The indicator shows a dash icon. This state is set programmatically; never set it manually. The box fills with `--mds-bg-interactive-primary-default`, the same as Checked. |
| | **Supporting text *(optional)*** A secondary line that appears below the label text in any state. Use it to give users additional context about the option, for example, what happens when the checkbox is selected, or what's required. In the Invalid state, this becomes feedback text and communicates the validation error. The text uses `--mds-text-subtle`, or `--mds-text-danger` when invalid. |
| | **Invalid** Applied when form validation fails, for example, when a required checkbox is submitted without being checked. The indicator border and label text turn red to signal the error. Always pair this state with visible feedback text that tells the user what to do. Don't rely on colour alone. The border changes to `--mds-border-interactive-danger-default` (a checked box fills with `--mds-bg-interactive-danger-default`) and the label uses `--mds-text-danger`. |
| | **Disabled ** The option can't be interacted with. Both the indicator and label render with muted colours. Don't use the disabled state instead of conditional logic. If an option is unavailable in a given context, hide it or explain why. The border changes to `--mds-border-interactive-secondary-disabled` and the label uses `--mds-text-muted`. |
| | **Disabled + Checked** A pre-selected option the user can't change. Use sparingly, only when the system locks the value and the user needs to see it. The box fills with `--mds-bg-interactive-primary-disabled` and the label uses `--mds-text-muted`. |
| | **Focus ** Shown when the checkbox receives keyboard focus. A visible focus ring appears around the checkbox indicator. In the Invalid state, the focus ring uses the danger token to maintain visual consistency with the error treatment. A 2px ring (`--mds-stroke-weight-md`, `--mds-focus-default`) shows around the box, offset by `--mds-spacing-offset`, or uses `--mds-border-feedback-danger` when invalid. |

## Code

### Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-checkbox--default)

Props and types (TypeScript API): [Checkbox.d.ts](https://unpkg.com/@moodlehq/design-system@5.4.0/dist/components/checkbox/Checkbox.d.ts)

Full list of props and their types for Checkbox.

### Accessibility implementation

#### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus to the checkbox |
| `Shift + Tab` | Moves focus to the previous interactive element |
| `Space` | Toggles the checkbox between checked and unchecked |

#### ARIA

* Role:
    * Uses a native checkbox input `type="checkbox"`, exposed with the implicit `checkbox` role.
* Required attributes:
    * Provide an accessible name.
    * Use a visible `label` by default.
    * If the visible `label` is hidden, provide an accessible name via `aria-label` or by supplying `label` text for fallback.
* Optional attributes:
    * `aria-invalid` is applied when invalid is true.
    * `aria-describedby` is applied when supporting or error text is rendered, so assistive tech reads contextual text.
    * `aria-checked` is set to mixed when indeterminate is true.
    * `required` and `disabled` use native checkbox semantics and can be provided as needed.

#### Dynamic announcements

* Screen readers announce checked, unchecked, and mixed states through native checkbox behaviour.
