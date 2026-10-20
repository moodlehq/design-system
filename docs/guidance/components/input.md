---
component: Input
slug: input
package: "@moodlehq/design-system@5.4.0"
status: Ready
source: https://design.moodle.com/98292f05f/v/latest/p/56eea2-input
import: @moodlehq/design-system/components/input
types: dist/components/input/index.d.ts
---

# Input

Use Input to capture a single, short value in a form — a name, an email address, a phone number, or similar freeform or structured data.

## Look-alikes

Text area · Password

Use instead: **Text area**.

## Accessibility

- Keyboard:
  - `Tab`: Moves focus to the field, then to the toggle button if present.
  - `Shift + Tab`: Moves focus to the previous interactive element.
  - `Enter`: Submits the surrounding form — unlike Text area, where Enter inserts a line break.
  - `Arrow keys`: Move the caret within the value.
  - `Home` / `End`: Move the caret to the start or end of the field's content.
  - `Ctrl / Cmd + A`: Selects all text in the field.
  - `Space` / `Enter` on toggle button: Switches the password value between hidden and visible, without moving focus.
- Role:
  - native `<input type="text">` / `<input type="password">`, exposed as a textbox.
- Required attributes: Not documented
- Announced: Not documented
- Focus: Not documented

## Built from

Generated from the component source and CSS, not from ZeroHeight.

- MDS components: button, close-button, tooltip

- Semantic tokens: `--mds-bg-surface-default`, `--mds-bg-surface-strong`, `--mds-border-default`, `--mds-border-interactive-danger-default`, `--mds-border-interactive-primary-default`, `--mds-border-interactive-secondary-default`, `--mds-border-radius-sm`, `--mds-focus-danger`, `--mds-focus-default`, `--mds-font-family-base`, `--mds-font-size-paragraph-default`, `--mds-font-size-paragraph-small`, `--mds-font-weight-bold`, `--mds-font-weight-medium`, `--mds-font-weight-regular`, `--mds-icons-xs`, `--mds-letter-spacing-default`, `--mds-line-height-paragraph-default`, `--mds-line-height-paragraph-small`, `--mds-line-height-paragraph-xs`, `--mds-spacing-sm`, `--mds-spacing-xs`, `--mds-spacing-xxs`, `--mds-stroke-weight-md`, `--mds-stroke-weight-sm`, `--mds-text-danger`, `--mds-text-default`, `--mds-text-muted`, `--mds-text-subtle`

## Usage

### Overview

Input is a single-line field for short, freeform or structured data entry — names, emails, passwords, phone numbers, IDs, and search terms.

It's built as one component with visible variants for Text, Password and Search, and covers the common HTML text-family input types through implementation guidance. 

It supports a label, placeholder, filled content, supporting text, validation messaging, and the text-based input types described below.

### When to use

* Use **Text** for single-line, short values where the expected length is predictable: names, emails, usernames, short labels. **Text** is the default input variant.
* Use [Password](https://design.moodle.com/98292f05f/p/004fcf-password) when the value should be masked by default with an optional reveal.
* Use [Search](https://design.moodle.com/98292f05f/p/38ca1d-search) when the person is filtering content, either instantly or through an in-place results list.

#### ❌ When not to use

* Don't use for multi-line, longer-form text — comments, descriptions, messages. Use the **Text area** component instead.
* A field that submits a form on its own — `type="submit"` renders as a button, not a text field. Use the Button component for that control; don't build it as an Input variant.
* Don't use if you need a live character/word counter — that's a Text area feature, not currently supported here.

### Variants

#### Content options

| ****Toggles**** | **When to use** |
| :--- | :--- |
| | **Show label** Shows the label above the field. Say what the field expects. |
| | **Info** Adds an info icon next to the label. Use only when the field's purpose isn't clear from the label, placeholder, and supporting text, or to explain how the value affects something elsewhere — see the [When to use the info icon](https://design.moodle.com/98292f05f/p/56eea2-input/t/ca4d7f7bb3) guidance. |
| | **Required** Adds a red asterisk next to the label. Validation will fail if people leave this input empty. |
| | **Leading icon** Adds a decorative icon inside the field, such as a lock for a password or a person icon for a username. Never use an icon as the only way to identify what the field is for. |
| | **Supporting text** Adds guidance or validation text under the field. Turn it on when the label alone doesn't explain what's needed. |

#### States

| **State** | **What it means** |
| --- | --- |
| | **Empty** No value entered. Shows the placeholder if the input has one. |
| | **Filled** Shows the value that the person has entered. Supporting text and validation react to this state. |
| | **Disabled** The input field is empty, and the person can't enter anything in it. Usually because something else needs to happen first — for example, a previous field needs to be filled. |
| | **Read-only** Shows existing content that the person can't change. |

##### Disabled vs. read-only

These two are easy to confuse, because neither of them can be edited. Disabled inputs are empty, and can't be filled at that moment. Read-only means there's existing content the person can review but not change. 

| | **Disabled** | **Read-only** |
| --- | --- | --- |
| **Typical use** | Not available until the person fills in something else first. For example, a 'City' field that's disabled until a 'Country' is selected. | The field contains a value that the person can't change (for example, no edit permission) |
| **Can receive focus** | No | Yes |
| **Can be copied** | No | Yes |

#### Types

Input has three types: Text, [Password](https://design.moodle.com/98292f05f/p/004fcf), and [Search](https://design.moodle.com/98292f05f/p/38ca1d).

##### Text

Text is a single-line input for text-based values, such as names, email addresses, phone numbers, or URLs. 

It covers five HTML input types that share identical visual treatment. They differ only at the code level. 

Pick the right HTML type to give users the correct mobile keyboard, browser validation, and autofill options — this is an accessibility requirement, not a visual choice.

| ****HTML types**** | **When to use** |
| :--- | :--- |
| | **Text** (default type) Freeform values with no fixed format: names, titles, IDs made of mixed characters. The default when no other type applies. |
| | **Email** An input to enter a single email address. Brings up the @ symbol on mobile keyboards and triggers the browser's native email format validation. |
| | **Number** For values used in a calculation or that increment, like a quantity. The number type removes leading zeros and rejects characters like +, so don't use it for values that only look like numbers, such as phone numbers or post codes. |
| | **Tel** For phone numbers. Opens the numeric phone keypad on mobile without enforcing a format — phone formats vary too widely across regions for native validation to help. |
| | **URL** For a single web address. Brings up a keyboard with `/` and `.com` shortcuts and triggers the browser's native URL format validation. |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Use the tel type for any phone number, including international ones. |
| Don't | | | Don't use number type for phone numbers — it strips leading zeros and blocks +. |

##### Password

See [Password](https://design.moodle.com/98292f05f/p/004fcf).

##### Search

See [Search](https://design.moodle.com/98292f05f/p/38ca1d).

### Guidelines

#### Usage guidelines

* Use HTML type `text` when the value doesn't match any other type. It's the correct choice, not a fallback.
* The HTML type doesn't add an icon. The leading icon is optional and you choose it.

#### Content guidelines

The input should tell people exactly what to enter in the field, and how to fix any errors.

##### **Label**

* Say what the field expects using a name, not an instruction. For example, "Email address", "Username".
* Use sentence case — don't capitalise every word.
* Skip articles ("a", "the") unless they're needed for clarity. 

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Name what goes in the field, in sentence case. |
| Don't | | | Don't phrase the label as an instruction — it reads like a command, not a name for the field. |

##### **Placeholder**

* Optional. Use it only to show a format hint — for example, a phone number pattern.
* Don't repeat the label. If the placeholder says the same thing as the label, it's adding nothing — either show an example or leave it empty.
* Never use it as a substitute for the label, or for anything the person needs to complete the field. Placeholder text disappears the moment someone starts typing, and assistive technology and password managers can't rely on it.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Use placeholder only to show a format hint — never as a substitute for a label. |
| Don't | | | Don't repeat the label in the placeholder or rely on it for required instructions — it disappears the moment someone starts typing. |

##### Supporting text (help and validation)

* A single line of text that gives a formatting hint the label doesn't cover, or the specific error in the invalid state.
* On error, say what went wrong and what to do next — don't just flag that something's invalid.
* Write error messages that explain what is wrong and how to fix it. For example, "Email must include an `@` symbol", rather than "Invalid input".

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | On error, say what went wrong and exactly how to fix it. |
| Don't | | | Don't just flag that something's invalid without explaining what or how to fix it. |

##### When to use the info icon

Most fields shouldn't need one. A clear label, a useful placeholder, and supporting text where needed should be enough. Use the info icon only when those aren't enough — never as a fix for a label or supporting text that could just be clearer.

**Use it when:**

* The value affects something elsewhere in a way the label doesn't make clear — for example, where it will appear, or what it controls.
* The field's purpose isn't clear from the label, placeholder, and supporting text, and a short explanation is the only way to prevent confusion.

**Don't use it for:**

* Anything the person needs in order to complete the field correctly or avoid an error. That belongs in supporting text, visible by default, not behind a click.
* Repeating what the label or placeholder already says
* If a whole section or form needs info icons everywhere to make sense, that's a structure problem to fix at form level, not field by field.

#### Layout and spacing

* Label, field, and support row stack vertically with `spacing.xxs` gap between them, same as Text area.
* The field is full-width of its container (`w-full`) by default. There is no intrinsic min/max-width; sizing constraints belong to the container/layout, not the component.
* The height is fixed and does not grow with the content; it is single-line. The Search variant is the one exception: it grows vertically once the badges wrap. See the [Search](https://design.moodle.com/98292f05f/p/38ca1d-search/t/eadf101af0) page.

#### Breakpoints and responsive behaviour

* The field stays full-width of its container across breakpoints.
* Content exceeding the field's width scrolls horizontally within the input (native browser behaviour) — keep values and validation messages concise rather than relying on this to reveal overflow.

#### Interaction behaviour

* Hover changes only the container fill; the border stays the same, keeping the affordance subtle.
* Active swaps the border to the primary accent on press, ahead of focus landing.
* Focus swaps the border to the focus token and doubles its weight, with padding compensating so the field doesn't visibly resize.
* Disabled blocks all interaction.

#### Accessibility guidelines

##### Colour and contrast

* Field text and placeholder meet 4.5:1 contrast against the field surface, including the invalid state.
* The invalid state never relies on colour alone — border, icon, and message reinforce it together.

##### Focus

* The focus ring is always visible on keyboard focus. Never suppress or override it.
* Focus lands on the text input itself — not on the decorative leading icon.

##### Labelling

* Always associate the Label with the input (`<label for>` or `aria-labelledby`).
* If `showLabel` is off, still provide `aria-label`.
* Give the info icon-button its own descriptive `aria-label`.

##### States

* Pair the required asterisk with `required`/`aria-required="true"`.
* Use the native `disabled` attribute for disabled, and `readonly`/`aria-readonly="true"` for read-only.
* Read-only fields use the native `readonly` attribute (not `disabled`), so they stay in the tab order and remain announced correctly by screen readers.

## Design

### Anatomy

1. **Label text** — the field's name. Text style: `UI text/UI small`. Colour `text.subtle`.
2. **Info icon** *(optional)* — a circular icon-button next to the label (`fa-circle-info`), built from the Button component's icon-only pattern.
3. **Required indicator** — a trailing asterisk next to the label text, in `text.danger`. Shown only when the field is mandatory.
4. **Field container** — the bordered box holding the input row.  Radius `[border-radius.sm](http://border-radius.sm)`, padding `[spacing.sm](http://spacing.sm)` horizontal / `spacing.xs`. Border and background respond to state — see States, below.
5. **Leading icon** — *(optional)* — a swappable, decorative icon at the start of the field. Colour `text.default`, icon size `icons.xs`. 
6. **Placeholder text** a hint before user types. Text style: `Paragraph/Base text`. Placeholder renders in `text.muted`
7. **Value** — what the user types. Text style: Paragraph/Base text.  Entered value renders in `text.default`. 
8. **Trailing icon** *(invalid only)* — appears only when the value fails validation (`isInvalid` is true).`fa-circle-exclamation`, colour `text.danger`, icon size `icons.xs`. 
9. **Supporting text** — help text at rest, or the validation message when invalid. Text style: `Paragraph/Small`.

### Interactive states

| **States** | **Styles and tokens** |
| --- | --- |
| | **Default**The field's resting state, before any interaction. Shows placeholder text until the person starts typing. Input:. Supporting text:. |
| | **Hover**The pointer is over the field, before it gains focus. Input:. Supporting text:. |
| | **Active**The moment of mouse-down on the field, just before focus lands. Input:. Supporting text:. |
| | **Focus**The field has keyboard or pointer focus and is ready for input. Input:. Supporting text:. |
| | **Invalid** The value has failed validation. This is a modifier, not a standalone state — it layers onto Default, Hover, Active or Focus, swapping the border and supporting text to the danger palette and adding a trailing circle-exclamation icon. Disabled and Read-only don't carry an invalid state. Input:. Supporting text:. |
| | **Disabled** The field can't be focused, clicked, edited or copied. Use for a field that's conditionally unavailable in the current context — not for data the person simply isn't allowed to edit (that's Read-only). Border colour: .`border.interactive.secondary.default`. Background colour: .`bg.surface.strong`. Value text colour: .`text.muted`. (overrides the .`text.default`. from Anatomy). Supporting text:. |
| | **Read-only**The field always shows a value and is focusable and copyable, but not editable. Input:. Supporting text:. |

## Code

### Storybook

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-input-input--default)

### Accessibility implementation

#### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus to the field, then to the toggle button if present. |
| `Shift + Tab` | Moves focus to the previous interactive element. |
| `Enter` | Submits the surrounding form — unlike Text area, where Enter inserts a line break. |
| `Arrow keys` | Move the caret within the value. |
| `Home` / `End` | Move the caret to the start or end of the field's content. |
| `Ctrl / Cmd + A` | Selects all text in the field. |
| `Space` / `Enter` on toggle button | Switches the password value between hidden and visible, without moving focus. |

#### ARIA

* Role: native `<input type="text">` / `<input type="password">`, exposed as a textbox.
* Required: accessible name via `<label for>` or `aria-labelledby`; `aria-label` when `showLabel` is off.
* Pair `isInvalid` with `aria-invalid="true"` and connect the supporting text via `aria-describedby`, so the failure reason is announced, not just shown in colour.
* The leading icon on the Text variant is decorative (`aria-hidden`) unless it's conveying information the label doesn't already carry.
* Toggle button: its own `aria-label`, updating with state ("Show password" / "Hide password") — not a generic "Toggle".
* Read-only: `readonly` / `aria-readonly="true"` supported at the attribute level; no distinct visual treatment.

#### Dynamic announcements

`[aria-live, state changes]`
