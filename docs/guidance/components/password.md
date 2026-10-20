---
component: Password
slug: input
package: "@moodlehq/design-system@5.4.0"
status: Ready
source: https://design.moodle.com/98292f05f/v/latest/p/004fcf-password
import: @moodlehq/design-system/components/input
types: dist/components/input/index.d.ts
---

# Password

Use Password when someone needs to enter a sensitive value, like an account password, that should stay hidden by default but can be checked before submitting.

## Accessibility

- Keyboard:
  - `Tab`: Moves focus to the field, then to the toggle button.
  - `Shift + Tab`: Moves focus to the previous interactive element.
  - `Space` / `Enter` on toggle button: Switches the value between hidden and visible, without moving focus away from the field.
- Role: Not documented
- Required attributes: Not documented
- Announced: Not documented
- Focus: Not documented

## Built from

Generated from the component source and CSS, not from ZeroHeight.

- MDS components: button, close-button, tooltip

- Semantic tokens: `--mds-bg-surface-default`, `--mds-bg-surface-strong`, `--mds-border-default`, `--mds-border-interactive-danger-default`, `--mds-border-interactive-primary-default`, `--mds-border-interactive-secondary-default`, `--mds-border-radius-sm`, `--mds-focus-danger`, `--mds-focus-default`, `--mds-font-family-base`, `--mds-font-size-paragraph-default`, `--mds-font-size-paragraph-small`, `--mds-font-weight-bold`, `--mds-font-weight-medium`, `--mds-font-weight-regular`, `--mds-icons-xs`, `--mds-letter-spacing-default`, `--mds-line-height-paragraph-default`, `--mds-line-height-paragraph-small`, `--mds-line-height-paragraph-xs`, `--mds-spacing-sm`, `--mds-spacing-xs`, `--mds-spacing-xxs`, `--mds-stroke-weight-md`, `--mds-stroke-weight-sm`, `--mds-text-danger`, `--mds-text-default`, `--mds-text-muted`, `--mds-text-subtle`

## Usage

### Overview

Password is Input's masked-entry variant: a single-line field that hides its value by default, with a toggle to reveal it. Everything about the shared field — label, placeholder, supporting text, states, layout — behaves exactly as documented on [Text input](https://design.moodle.com/98292f05f/p/56eea2-input); this page covers what's specific to Password.

### When to use

Use when the value that people enter needs to be masked by default with an optional reveal — account passwords, passphrase-style secrets.

#### ❌ When not to use

Don't use for values that only need light obscuring for privacy but not security (e.g. a partially-masked account number) — that's a different pattern, not this variant.

### Variants

#### States

| **Variant** | **When to use** |
| :--- | :--- |
| | **Empty** No value entered. Shows the placeholder if there's one. |
| | **Filled — masked** The default state once someone types. The values show as dots, hiding the actual characters typed. |
| | **Filled — visible** After the person presses the toggle. The value shows as plain text so people can check it before submitting. |

#### Toggle button behaviour

The password input has a toggle at the end of the field. It switches between showing the password and hiding it as dots. Focus stays in the field.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | The accessible name updates with state, so screen reader users always know what pressing the button will do. |
| Don't | | | A static label doesn't say what will happen or what state the field is currently in. |

### Guidelines

#### Usage guidelines

* Check with dev that the `autocomplete` context matches the flow: `current-password` for login, `new-password` for sign up or changing a password. Browsers and password managers rely on this to autofill correctly.

#### Content guidelines

**Supporting text**

* Put the password format requirements in the supporting text, not in the placeholder. Requirements like "must include a number and a symbol" need to stay visible while the person types.
* Show the requirements before the person types, not only after they get it wrong.
* Write requirements as what the password needs, not what's forbidden: "Must be at least 12 characters" rather than "Can't be shorter than 12 characters".

**Error messages**

* Say what's wrong and what to do about it.
* On login, don't say whether the username or the password is wrong — it tells a potential attacker which half they got right. Use one message for both, e.g. "Incorrect username or password."

**Placeholder**

* Password fields usually don't need one. The label and supporting text should be enough.

#### Interaction behaviour

* Password follows [text input's](https://design.moodle.com/98292f05f/p/21d1d8-text/t/1120ac7804) shared interaction behaviour exactly — hover, active and focus states behave identically on the field itself. One addition specific to Password: the toggle button is its own focusable control, separate from the field.

#### Accessibility guidelines

* The toggle button needs a real, focusable `<button>` with an accessible name that updates with state — not an icon alone.
* Click or Enter/Space on the toggle switches the input's `type` between `password` and `text` without moving focus away from the field or submitting the form.
* The toggle's accessible name updates based on the state — "Show password" when masked, "Hide password" when revealed.
* The toggle button is a real control and gets its own focus stop, separate from the field itself.

## Design

### Anatomy

*Shares* *[Text Input](https://design.moodle.com/98292f05f/p/56eea2-input)**'s Label, Required indicator, Info icon, Field container, Value/placeholder text and Supporting text exactly. Password-specific parts:*

1. **Leading icon** — fixed to a lock glyph. Not swappable, unlike Text's leading icon. Constant regardless of interaction state or content, including Disabled.
2. **Toggle button** — trailing, uses the Button component (ghost / icon-only / medium variant). Shows the "eye" icon when masked, "eye-slash" when revealed. Interactive from the moment it's present, including when the field is empty. Styles and states follow Button's guidelines.
3. **Value / masked text** — a masked value renders bold in the field's default value colour; a revealed value renders regular, matching Text's filled state.

### States

The password variant adheres to the shared state model of the[ Text input ](https://design.moodle.com/98292f05f/p/56eea2-input/t/e2b28fae53)field exactly, including the default, hover, active, focus, invalid, disabled and read-only states, as well as the same tokens and styles. The only exception is that the read-only password displays its value as plain text and is never masked.

## Code

### Storybook

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-input-passwordinput--default)

### Implementation notes

* Don't block pasting into the field. Password managers and generated passwords depend on paste — disabling it is a known usability anti-pattern with no real security benefit. This is enforced at the implementation level; there's no design toggle for it.

### Accessibility implementation

#### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus to the field, then to the toggle button. |
| `Shift + Tab` | Moves focus to the previous interactive element. |
| `Space` / `Enter` on toggle button | Switches the value between hidden and visible, without moving focus away from the field. |

#### ARIA

Toggle button: own `aria-label`, updating with state — "Show password" when masked, "Hide password" when revealed, matching the Content design guidance above.

* Read-only: `readonly` / `aria-readonly="true"` supported at the attribute level, same as Input; no distinct visual treatment.

#### Dynamic announcements

`[aria-live, state changes]`
