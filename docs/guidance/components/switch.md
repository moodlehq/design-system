---
component: Switch
slug: switch
package: "@moodlehq/design-system@5.5.0"
status: Ready
source: https://design.moodle.com/98292f05f/v/latest/p/585368-switch
import: @moodlehq/design-system/components/switch
types: dist/components/switch/index.d.ts
---

<!-- Generated from ZeroHeight by npm run build-guidance. Do not edit. -->

# Switch

A binary input control that lets users turn a single setting on or off.

## Look-alikes

Checkbox · Radio group · Button

## Accessibility

- Keyboard:
  - `Tab`: Moves focus to the switch
  - `Shift + Tab`: Moves focus to the previous interactive element
  - `Space`: Toggles the switch between on and off
- Role:
  - Uses `<input type="checkbox" role="switch">`: exposes the switch role to assistive technology. Screen readers announce this as a switch, not a checkbox.
- Required attributes:
  - Provide an accessible name via a visible `<label>` linked by `for` and `id`. If no visible label is present, provide an accessible name via `aria-label` or `aria-labelledby`. `aria-checked="true"` when on; `aria-checked="false"` when off. This is updated automatically on toggle.
- Announced:
  - Screen readers announce the switch state through `role="switch"` and `aria-checked`.
  - State changes on toggle are announced automatically via the `aria-checked` update, no additional live region is required for the component itself.
  - If a switch triggers a broader change to the page (for example, enabling a section of content), consider a live region announcement for that content area.
- Focus: Not documented

## Props

Generated from the component TypeScript types, not from ZeroHeight. Inherited HTML attributes are not listed.

### SwitchProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` |  | Visible label text. When hideLabel is true this also serves as the aria-label fallback if no explicit aria-label prop is provided. |
| `hideLabel` | `boolean` | `false` | When true, hides the visible label text while preserving an accessible name on the input. |
| `variant` | `SwitchVariant` | `'enable'` | Semantic variant that controls the thumb icon set. |
| `labelSide` | `SwitchLabelSide` | `'end'` | Places the label after (end) or before (start) the switch indicator. |

Allowed values:

- `variant`: `enable`, `visibility`, `lock`
- `labelSide`: `end`, `start`

## Built from

Generated from the component source and CSS, not from ZeroHeight.

- MDS components: none

- Semantic tokens: `--mds-bg-interactive-primary-default`, `--mds-bg-interactive-primary-default-light`, `--mds-bg-interactive-primary-disabled`, `--mds-bg-interactive-primary-hover`, `--mds-border-radius-pill`, `--mds-focus-default`, `--mds-font-family-base`, `--mds-font-size-paragraph-small`, `--mds-font-weight-medium`, `--mds-letter-spacing-default`, `--mds-line-height-paragraph-xs`, `--mds-spacing-none`, `--mds-spacing-offset`, `--mds-spacing-xs`, `--mds-stroke-weight-md`, `--mds-text-muted`, `--mds-text-subtle`

## Usage

### Overview

The Switch is a binary input that represents an on/off state for a specific setting. Unlike a Checkbox, which records a selection for submission, a Switch applies its state to a single, clearly defined context, either immediately or as part of a settings form.

Switch is always binary. There's no indeterminate or multi-select behaviour.

#### When to use

* When a setting can be turned on or off: enabled or disabled, visible or hidden, locked or unlocked.
* When the binary state is self-explanatory from the label.
* When used inline in a settings panel, form, or settings list where the surrounding layout provides context.
* When the label alone is sufficient; no additional explanation is needed.
* When the surrounding context (e.g. a column header, section heading, or row label) makes the purpose of the switch unambiguously clear, and a visible inline label would be redundant. Always include a visually hidden label in the DOM.

#### ❌ When not to use

* Don't use a Switch when supporting text is needed to explain the option, or when the selection is submitted as part of a form. Use a [Checkbox](https://design.moodle.com/98292f05f/p/12e8f6) instead.
* Don't use a Switch when users must choose one option from a mutually exclusive set. Use a [Radio group](https://design.moodle.com/98292f05f/p/366522) instead.
* Don't use a Switch when the action has irreversible or destructive consequences. Use a button with a confirmation step.

### Variants

Set with the `variant` prop. If you leave it out, you get `enable`.

Label side is set with `labelSide`: `end` (default) or `start`.

Three variants cover Moodle's distinct use cases: Enablement for general on/off settings, Visibility for show/hide settings, and Lock for permission and restriction settings. 

An icon inside the thumb reinforces the state beyond colour.

The variant determines which icon pair is shown inside the thumb, communicating the on/off state beyond colour.

| **Variant** | **When to use** |
| :--- | :--- |
| | **Enable (default)** Use for general on/off settings: enabling or disabling features, access, or functionality. This is the default variant. |
| | **Visibility** Use for display settings: showing or hiding content, panels, UI elements, or items in a list. |
| | **Lock** Use for permission or restriction settings: locking or unlocking editing rights, access control, or availability. |

### Guidelines

#### Content guidelines

##### Usage guidelines

* Always provide a label that describes the setting being toggled, not the action.
* Keep labels short. If more than a few words are needed to describe the option, a Checkbox with supporting text is more appropriate.
* Don't change the label based on the current state. Keep it consistent regardless of whether the Switch is on or off.
* Switch doesn't support supporting text. Use a Checkbox if the setting needs an explanation.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD use a Checkbox when the option needs supporting text to explain its effect. |
| Don't | | | SHOULD NOT use a Switch when the label has to carry that much context. Switch labels should be short. |

##### Content structure and constraints

* Labels use sentence case.
* Don't start a label with a verb. The switch itself implies action.
* Write labels that describe what the on state means. Write "Edit mode", not "Toggle edit mode" or "Enable edit mode".
* Keep options in a settings group grammatically parallel.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD write short labels that name the setting, not the action of toggling it. |
| Don't | | | SHOULD NOT describe the action or use verbs like "enable", "toggle" or "click to". |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | MUST use the same label in both the on and off states. |
| Don't | | | MUST NOT change the label based on the current state. |

#### Placement

* **Always use a visible label when:**
    * The switch is standalone, not part of a structured layout.
    * There's no adjacent heading, column header, or row label to provide context.
    * Multiple switches are grouped and individual labels are needed to differentiate them.
* Label position defaults to end: to the right of the indicator in LTR layouts, to the left in RTL.
* Use the label side: start option when the layout requires the label to appear before the indicator, for example, in a settings list where the switch aligns to the trailing edge.
* Switches operate in isolation or within a settings group. Don't stack switches as a selection group. Use Checkboxes for multi-select scenarios.
* The switch container hugs its content; width is driven by the label, not a fixed container.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD use Checkboxes when people need to select 1 or more options from a set. |
| Don't | | | MUST NOT use switches as a selection group. Each switch controls its own independent setting. |

##### Switch in isolation

A Switch can be used without a visible label when the surrounding context makes its purpose clear. The label must always be present in the DOM as a visually hidden element (it's never truly removed, only hidden visually)

**Use a visually hidden label when:**

* The switch lives in a data table column, and the column header describes what it controls.
* The switch appears in a settings grid where the row label is adjacent and unambiguous.
* The switch is inline within a UI element where the surrounding content provides sufficient context.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD use a Switch for binary on/off states in structured layouts. |
| Don't | | | SHOULD NOT use a Checkbox for a binary on/off state. A Switch better shows a reversible, persistent state. |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD use a Switch with a visually hidden label in data tables and settings grids when a column header or row label gives enough context. The thumb position and icon make the current state clear. |
| Caution | | | MUST NOT rely on icons alone to show state. |

#### Accessibility guidelines

* Always provide a label. The icon inside the thumb reinforces state, but the label provides context: what is being toggled.
* Don't rely on colour alone to communicate state. The icon in the thumb (check/cross, eye/crossed eye, lock/unlock) provides a non-colour indicator in every state.
* If a switch triggers an immediate change that affects a larger area of the page, ensure the change is visually apparent and consider whether a live region announcement is needed.

## Code

### Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-switch--default)

Props and types (TypeScript API): [Switch.d.ts](https://unpkg.com/@moodlehq/design-system@5.5.0/dist/components/switch/Switch.d.ts)

Full list of props and their types for Switch.

### Accessibility implementation

#### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus to the switch |
| `Shift + Tab` | Moves focus to the previous interactive element |
| `Space` | Toggles the switch between on and off |

#### ARIA

* **Role:**
    * Uses `<input type="checkbox" role="switch">`: exposes the switch role to assistive technology. Screen readers announce this as a switch, not a checkbox.
* **Required attributes:**
    * Provide an accessible name via a visible `<label>` linked by `for` and `id`.
    * If no visible label is present, provide an accessible name via `aria-label` or `aria-labelledby`.
    * `aria-checked="true"` when on; `aria-checked="false"` when off. This is updated automatically on toggle.
* **Optional attributes:**
    * `disabled`: uses native input semantics. Screen readers announce the switch as unavailable.
    * When a switch is disabled, include information nearby explaining why it's unavailable.

#### Dynamic announcements

* Screen readers announce the switch state through `role="switch"` and `aria-checked`.
* State changes on toggle are announced automatically via the `aria-checked` update, no additional live region is required for the component itself.
* If a switch triggers a broader change to the page (for example, enabling a section of content), consider a live region announcement for that content area.

## Specs

### Anatomy

1. **Hit area**. The invisible interactive touch target that wraps the entire switch. Ensures the minimum tap target size is met at all breakpoints.
2. **Switch indicator**. The visible control. A pill-shaped track containing a thumb and icon. Shows the current state through position, colour, and icon.
3. **Label**. Describes the setting being toggled. Required in all contexts. Positioned to the right of the indicator by default; can be placed to the left using the label side: start option.

4. **Track**. The pill-shaped background of the indicator. Changes colour between the off and on states.
5. **Thumb.** The circular element inside the track. Slides from start (off) to end (on) when toggled.
6. **Icon.** Displayed inside the thumb in every state. Communicates the current state beyond colour. The icon pair is determined by the variant.

### States

| **States** | **Description** |
| :--- | --- |
| | **Off ** Default state. The setting is inactive. The thumb sits at the start position and displays the off-state icon. |
| | **On ** The setting is active. The thumb moves to the end position, the track fills with the primary colour, and the on-state icon is displayed. |
| | **Hover (off) ** The switch is hovered while in the off state. The track darkens slightly to indicate interactivity. |
| | **Hover (on) ** The switch is hovered while in the on state. The track reflects the primary hover colour. |
| | **Focus ** The switch has keyboard focus. A visible focus ring appears around the entire indicator. Track and thumb remain at their current state colours. The ring is 2px, offset from the indicator. |
| | **Disabled (off) ** The switch can't be interacted with and is currently off. All elements render with muted colours. Provide a reason nearby when possible. |
| | **Disabled (on) ** The switch can't be interacted with and is currently on. All elements render with muted colours. |

### Behaviour

* Clicking or tapping anywhere on the indicator or label toggles the switch.
* State changes are immediate within the component. Whether the change affects the system immediately or on form submission depends on the implementation context.

### Responsive behaviour

* The switch indicator is fixed in size at all breakpoints.
* The label remains visible at all breakpoints. Don't hide the label based on viewport size.
* If a visually hidden label is genuinely required (for example, inside a data table column), always ensure an accessible name is still present in the DOM for assistive technology.
