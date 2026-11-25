---
component: Select
slug: select
package: "@moodlehq/design-system@5.6.0"
status: In progress
source: https://design.moodle.com/98292f05f/v/latest/p/013ac0-select
import: @moodlehq/design-system/components/select
types: dist/components/select/index.d.ts
---

<!-- Generated from ZeroHeight by npm run build-guidance. Do not edit. -->

# Select

A form field for choosing one option from a short, fixed list, using the browser's own native picker.

## Look-alikes

Radio group · Switch · Combobox · Choicebox · Dropdown


## Props

Generated from the component TypeScript types, not from ZeroHeight. Inherited HTML attributes are not listed.

### SelectProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` (required) | `(SelectOption \| SelectOptionGroup)[]` |  | Options, each a `SelectOption` (`<option>`) or a `SelectOptionGroup` (`<optgroup>`), rendered inside the native `<select>`. Select is single-choice only — multi-select belongs to Combobox. |
| `label` | `string` |  | Visible label text. When hideLabel is true this also serves as the aria-label fallback if no explicit aria-label prop is provided. |
| `hideLabel` | `boolean` | `false` | When true, the visible label is hidden. The select is still labelled accessibly via aria-label (prop) → label (prop) in that order. |
| `invalid` | `boolean` | `false` | Marks the field as invalid: danger border, trailing icon, aria-invalid. Has no effect when disabled — Figma doesn't define disabled + invalid. |
| `invalidFeedback` | `string` |  | Pre-translated error message shown below the field while invalid. Replaces supportingText while shown. |
| `supportingText` | `string` |  | Pre-translated helper text shown below the field. |
| `infoTooltipLabel` | `string` |  | Pre-translated label for the info button beside the visible label. |

## Built from

Generated from the component source and CSS, not from ZeroHeight.

- MDS components: none

- Semantic tokens: `--mds-bg-surface-default`, `--mds-bg-surface-strong`, `--mds-border-default`, `--mds-border-interactive-danger-default`, `--mds-border-interactive-danger-hover`, `--mds-border-interactive-primary-default`, `--mds-border-interactive-secondary-default`, `--mds-border-radius-sm`, `--mds-focus-danger`, `--mds-focus-default`, `--mds-font-family-base`, `--mds-font-size-paragraph-default`, `--mds-font-size-paragraph-small`, `--mds-font-weight-medium`, `--mds-font-weight-regular`, `--mds-icons-lg`, `--mds-icons-xs`, `--mds-letter-spacing-default`, `--mds-line-height-paragraph-default`, `--mds-line-height-paragraph-small`, `--mds-line-height-paragraph-xs`, `--mds-spacing-sm`, `--mds-spacing-xs`, `--mds-spacing-xxs`, `--mds-stroke-weight-md`, `--mds-stroke-weight-sm`, `--mds-text-danger`, `--mds-text-default`, `--mds-text-muted`, `--mds-text-subtle`

## Usage

### Overview

Select lets people choose one option from a list, tucking the full set of choices away until the field is opened. It renders as a native HTML `<select>` element, so it always shows a chosen option rather than an empty state. It suits option sets too long to lay out on the page but short enough that scanning beats typing to find the right one.

#### When to use

* Use when people pick one option from a fixed list of 6 or more that's still quick to scan without typing.
* Use when the chosen value needs to submit with the form, exactly like a text field would.
* Use when people should only ever pick from the list provided, typing a new value doesn't make sense here.
* Use on touch and mobile contexts where the device's own native picker is preferable to a custom-built menu.

#### ❌ When not to use

* Don't use for 2 to 5 options that people need to see all at once, use [Radio group](https://design.moodle.com/98292f05f/p/366522) instead.
* Don't use for a single binary yes/no or on/off choice, use [Switch](https://design.moodle.com/98292f05f/p/585368) instead.
* Don't use when the option list is long enough that typing to filter would genuinely help, or when people need to pick more than one value, that's a [Combobox](https://design.moodle.com/98292f05f/p/37396a) job.
* Don't use when each option needs a description, an icon, or enough visual weight that a plain text label isn't enough to choose correctly, use [Choicebox](https://design.moodle.com/98292f05f/p/78314c) instead.
* Don't use to trigger an action or navigate somewhere, nothing here gets saved to a form, use [Dropdown](https://design.moodle.com/98292f05f/p/8381b3) instead.

### Variants

#### Content options

| **Toggles** | **When to use** |
| :--- | :--- |
| | **Show label** Shows the label above the field. Say what the field expects. |
| | **Info** Adds an info icon next to the label. Use only when the field's purpose genuinely isn't clear from the label and supporting text alone. |
| | **Required** Adds a red asterisk next to the label. Pair with the native `required` attribute so validation actually fails when nothing meaningful is chosen. |
| | **Support text** Adds guidance or validation text under the field. Turn it on when the label alone doesn't explain what's expected, or to show the invalid message. |

For deeper guidance on writing labels, using the info icon, and working with supporting text, see [Input](https://design.moodle.com/98292f05f/v/latest/p/56eea2), these toggles work the same way there.

### Guidelines

* Always show a sensible pre-selected option. Never leave the field looking blank or empty, native `<select>` can't represent "nothing chosen" cleanly, so the design shouldn't pretend otherwise.
* Keep the option list short enough to scan without scrolling fatigue. Once it's long enough that typing to filter would help, that's Combobox's job, not a reason to make Select do more than it's built for.
* Don't reach for Select for a single yes/no toggle, that reads as over-engineering a Switch.

#### Content guidelines

##### Content structure and constraints

* Options are plain text labels only. Select can't render an icon, a second line, or any other visual content inside an option, that's a genuine browser limitation on styling native `<option>` elements.
* Keep option labels short enough that the chosen value never needs to wrap or truncate inside the closed field's width.
* There's no empty state to design for. A default option is always pre-selected and always shown.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD pre-select a clear instructional default, e.g. "Select a country". |
| Don't | | | SHOULD NOT leave the field showing a dash, a blank space or nothing at all. |

##### Copywriting 

* Use sentence case for both the field label and every option label.
* Word the default, unselected-look option as an instruction (e.g. Select a country), not as a repeat of the field label or a vague dash.
* On invalid, say what to do next in the supporting text, for example "Select a country to continue," not just "Invalid selection."

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD word the default option as an instruction, and write errors that say what to do next. |
| Don't | | | SHOULD NOT repeat the label as the default option, or write an error that doesn't say what to do. |

#### Placement

* Label, field, and support row stack vertically with `--mds-spacing-xxs` gap between them.
* The field is full width of its container by default, no intrinsic min or max width of its own, sizing constraints belong to the container or layout, not the component.

#### Accessibility guidelines

##### Colour and contrast

* Field text and border meet 4.5:1 / 3:1 contrast against the field surface, including the invalid state.
* Invalid never relies on colour alone, the border, the trailing icon, and the supporting text message all reinforce it together.

##### Focus

* The focus ring is always visible on keyboard focus, never suppress or override it.
* Focus lands on the field itself, exactly where the native `<select>` element sits in the DOM, never on the chevron or a decorative part.

##### Labelling

* Always associate Label with the field (`for`/`id` or `aria-labelledby`).
* If `showLabel` is off, still provide an accessible name via `aria-label`.
* Give the info icon-button its own descriptive `aria-label` when it's shown.

### Related

##### Alternatives

**Dropdown**

use when nothing gets saved to a form and the trigger performs an action or reflects a view setting (like a sort order), not a chosen value. Dropdown's own page already states the reverse of this rule.

**Choicebox**

use when each option needs a description, an icon, or enough visual weight that a plain text label isn't enough on its own.

**Switch**

use for a single binary yes/no or on/off choice, not a list of options.

## Specs

### Anatomy

1. **Label text**: the field's name. Text style `UI text/UI small`.
2. **Info icon** *(optional)*: a circular icon-button next to the label (`fa-circle-info`). Check the codebase for an existing Button/Icon/Tooltip component before rebuilding it.
3. **Required indicator**: a trailing asterisk next to the label text. Shown only when the field is mandatory.
4. **Field container**: the bordered box holding the value and the indicator. Border and background respond to state, see States below.
5. **Value**: the selected option's text. Text style `Paragraph/Base text`, muted when disabled. There's no separate placeholder text style, a pre-selected default option's label renders exactly like any other value.
6. **Indicator (chevron)**: a caret icon signalling that the native picker will open. Purely visual, carries no hover state of its own.
7. **Trailing icon** *(invalid only)*: appears only when `isInvalid` is true, sits before the chevron. Uses `fa-circle-exclamation` in the danger colour.
8. **Supporting text**: help text at rest, or the validation message when invalid. Text style `Paragraph/Small`.

### States

| **States** | **Description** |
| --- | --- |
| | **Default** The field's resting state, before any interaction. Shows the pre-selected option. |
| | **Hover** The pointer is over the field, before it gains focus. Container gains a white background, confirming it's interactive. |
| | **Active** The moment of mouse-down on the field, just before focus lands. |
| | **Focus** The field has keyboard or pointer focus, ready to open the native picker. |
| | **Disabled** Can't be focused, clicked, or opened. Use for a field that's conditionally unavailable in the current context. |
| | **Invalid (Default)** The chosen value has failed validation. |
| | **Invalid (Hover)** The pointer is over a field that has failed validation. |
| | **Invalid (Active)** The moment of mouse-down on a field that has failed validation. |
| | **Invalid (Focus)** Focus ring uses a lighter danger tone than the resting border, so the ring itself stays legible against the solid red border. |

### Layout and sizing

* Adding more options doesn't change the size of the closed field, only the open native list grows or shrinks to fit them.
* Choosing an option updates the value immediately, there's no separate confirm step.
* A long option label truncates with an ellipsis inside the closed field rather than wrapping the field or resizing it.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD keep option labels short enough to read at a glance in the closed field. |
| Don't | | | SHOULD NOT rely on truncation to hide a label that's usually too long to be useful once cut off. |

### Behaviour

* Touch target: the field measures 42px tall.
* Opening the list: a click, a tap, or Space/Enter while focused opens the device's native option list, this is native browser behaviour, Select doesn't render its own overlay.
* Focus stays on the closed field itself the entire time, even while the native list is open, exactly how a plain `<select>` element behaves. Don't try to move focus into the list.
* Cursor: pointer on hover, not-allowed when disabled.

### Responsive behaviour

* The field stays full width of its container across all breakpoints.
* On touch devices, the browser or OS renders its own native option list (a wheel, a full-screen list, a native dropdown).
