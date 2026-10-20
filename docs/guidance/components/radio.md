---
component: Radio button
slug: radio
package: "@moodlehq/design-system@5.4.0"
status: Ready
source: https://design.moodle.com/98292f05f/v/latest/p/279392-radio-button
import: @moodlehq/design-system/components/radio
types: dist/components/radio/index.d.ts
---

# Radio button

Radio buttons let users select exactly one option from a group of mutually exclusive choices.

## Look-alikes

Checkbox · Select · Switch · Choicebox

Use instead: Checkbox; Select; Toggle/Switch.

## Accessibility

- Keyboard:
  - `Space`: Selects the focused radio button
  - `Arrow Up / Left`: Moves focus to the previous radio button in the group and selects it
  - `Arrow Down / Right`: Moves focus to the next radio button in the group and selects it
  - `Tab`: Moves focus to the next focusable element outside the group
- Role:
  - Uses a native `input` with `type="radio"` (implicit `radio` role).
- Required attributes:
  - Provide an accessible name visible `label` when `hideLabel={false}`, or `aria-label` / `label` fallback when `hideLabel={true}`. For proper group behavior, radios should share the same [name](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html) within a set.
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

### When to use

* When users must select exactly one option from a predefined list.
* When the number of options is small enough to display all at once (typically 2–5 options).
* When users benefit from seeing all options before making a decision — unlike a select dropdown, radio buttons expose all choices immediately.
* When the choice is mutually exclusive and permanent for the current session.

#### ❌ When not to use

* **Use a Checkbox instead** when users can select more than one option, or when the choice is binary and independently togglable (for example, "I agree to the terms").
*  **Use a Select instead** when the number of options is large (typically 6 or more) and displaying them all at once would clutter the interface.
*  **Use a Toggle/Switch instead** when the action takes effect immediately without a form submission (for example, turning a setting on or off).
* Don't use a single radio button in isolation — radio buttons only make sense as a group of 2 or more.

### Guidelines

#### Content design

##### Usage guidelines

* Always present radio buttons in a group of 2 or more. A single radio button alone is meaningless.

* Pre-select the most common or recommended option where appropriate, but don't pre-select when all options are equally valid — let users make an active choice.
* Order options logically: alphabetically, by frequency of use, or from most to least recommended. Don't randomise order.
* Don't mix radio buttons and checkboxes in the same group.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Always use radio buttons in a group of 2 or more. |
| Don't | | | Do not use a single radio button — use a checkbox or a toggle for binary options instead. |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Use radio buttons for small, fixed sets of options. |
| Don't | | | Don't use radio buttons for long lists — use a Select instead. |

##### **Content structure and constraints**

* Radio button labels must be concise — ideally a single word or short phrase. Avoid full sentences unless the choice genuinely requires it.
* Labels describe the option itself, not the action of selecting it. Write "Weekly" not "Select weekly".
* If the options need additional explanation, use helper text beneath the group — not within individual labels.
* Capitalise only the first word of each label (sentence case).
* As a guide, aim for no more than 4–5 words per label.

##### **Content behaviour**

* Labels don't truncate — they wrap to a new line if the container is narrow. Define an appropriate maximum label length for your context.
* The label is always positioned to the right of the radio indicator.

##### **Copywriting**

* Keep options grammatically parallel. If one option is a noun, make all options nouns. If one is a phrase, make all options phrases.
* Avoid negative wording in option labels when possible — "No notifications" is easier to scan than "Don't notify me".

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Write concise, parallel labels. |
| Don't | | | Don't mix grammatical structures in the labels. |

#### Layout and spacing

* Radio buttons in a group are stacked vertically by default. This is the recommended layout.
* Use `spacing.xs` (8px) between options in a vertical stack.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Stack radio button options vertically by default. |
| Caution |  |   | Inline layout is available but use it sparingly; it can break on narrow screens. Space options with spacing.md (16px) 
between each. |

#### Breakpoints and responsive behaviour

* Radio button labels wrap to multiple lines on narrow screens. The layout remains vertical.
* Avoid inline (horizontal) layouts on small screens — they break easily and reduce legibility.       

#### Interaction behaviour

* Clicking or tapping the radio indicator or its label selects that option.
* Selecting a radio button in a group automatically deselects the previously selected option.
* Radio buttons can't be deselected by clicking them again — to clear a selection, the user must select a different option. If clearing is needed, consider using a separate "None" or "Clear" option.
* Radio groups support an invalid state for form validation. When a selection is required and the user submits without choosing an option, set the group to invalid and show an inline error that explains what's needed — for example, 'Please select an option before continuing.' Clear the invalid state when the user selects an option.

#### Accessibility guidelines

##### Colour and contrast

* The radio indicator border must have a minimum contrast ratio of 3:1 against its background.
* Label text must meet a minimum contrast ratio of 4.5:1 against the background (WCAG AA).
*  The selected state (filled dot) must be visually distinguishable without relying on colour alone — the shape change (empty → filled circle) provides the secondary indicator.
* The focus ring must be visible on both light and dark backgrounds.
* The invalid state uses red to signal an error. Don't rely on colour alone — always pair the invalid indicator with a visible text message. Screen readers must be able to announce the error; see Code → Accessibility implementation for the required ARIA attributes (aria-invalid, aria-describedby).

##### Focus

* Radio buttons receive focus individually via keyboard.
* A visible focus ring is shown around the radio indicator when focused.
* Focus ring treatment is inherited from the MDS global focus style.
* When a radio group receives focus, the focus ring appears on the currently selected option (or the first option if none is selected).
* In the invalid state, the focus ring reflects the danger treatment to remain consistent with the error context.

##### Labelling

*  Every radio button must have an associated label. Use a `<label>` element linked via `for` and `id` attributes, or an aria-label attribute when a visible label isn't possible. Wrap the group in a `<fieldset>` with a `<legend>` that describes the group, or use `role="radiogroup"` with `aria-labelledby`.

## Design

### Anatomy

1. **Hit area** — the wrapper that groups the radio input and its label.
2. **Radio indicator** — the circular control that shows the selection state. It displays as empty (unselected) or filled with a dot (selected).
3. **Label** — the text that describes the option. It’s always required for standalone use. It can be visually hidden when the surrounding context — for example, a table column header or a selectable card — provides enough identification. When the label is hidden, an `aria-label` must be provided in code.

4. **Feedback text** ***(optional)*** — a short message that appears below the radio group to communicate a validation error. Only shown in the invalid state. Always pair it with the visual error treatment on the indicator and label — don't rely on colour alone.

### States

| **States** | **Styles and tokens** |
| :--- | --- |
| | ****Unselected**** Default state. No option is selected, and the radio indicator appears as an empty circle. This is the initial state when no default value is set. Radio indicator: Ring: . Label: Text color: .`text.default`. |
| | **Selected** An option is selected. The radio indicator shows a filled circle with a dot, and selecting this option deselects any other radio in the same group. Radio indicator: Ring . Dot . Label: Same as Unselected. |
| | ****Disabled**** The option can’t be interacted with. Both the indicator and label appear with muted colors. Don’t use the disabled state instead of conditional logic; if an option is unavailable in a given context, hide it or explain why. Radio indicator: Ring . Label: Text color: .`text.muted`. |
| | ****Disabled + Selected**** A pre-selected option the user can't change. Use sparingly — only when the system locks the value and the user needs to see it. Radio indicator: Ring . Dot . Label: • Same as Disabled |
| | ****Invalid**** Applied when the radio group is required and the user tries to proceed without making a selection. The indicator border and label turn red to signal the error. Always pair this with a visible error message that explains what's required — don't rely on colour alone. Apply this state at the group level, not to individual options. Radio indicator: Border color: .`border.interactive.danger.default`. Background fill: .`bg.surface.default`. Label: Text color: .`text.danger`. Feedback text: Text color: .`text.danger`. |
| | ****Focus**** Shown when the radio receives keyboard focus. A visible focus ring appears around the radio indicator. In the invalid state, the focus ring uses the danger token to maintain visual consistency with the error treatment. Focus ring: Border color: . Border width: .`stroke weight.md` . Offset: .`2px (0.125em)`. |

## Code

### Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-radio--default)

### Accessibility implementation

#### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Space` | Selects the focused radio button |
| `Arrow Up / Left` | Moves focus to the previous radio button in the group and selects it |
| `Arrow Down / Right` | Moves focus to the next radio button in the group and selects it |
| `Tab` | Moves focus to the next focusable element outside the group |

#### ARIA

* Role:
    * Uses a native `input` with `type="radio"` (implicit `radio` role).
* Required attributes:
    * Provide an accessible name:
        * visible `label` when `hideLabel={false}`, or
        * `aria-label` / `label` fallback when `hideLabel={true}`.
    * For proper group behavior, radios should share the same name within a set.
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
