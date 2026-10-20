---
component: Text area
slug: textarea
package: "@moodlehq/design-system@5.4.0"
status: Ready
source: https://design.moodle.com/98292f05f/v/latest/p/343bd2-text-area
import: @moodlehq/design-system/components/textarea
types: dist/components/textarea/index.d.ts
---

# Text area

A multi-line text input for longer-form free text, with support for labels, helper text, live counting, and validation.

## Look-alikes

Input · Search

Use instead: **Input**; `Read-only`.

## Accessibility

- Keyboard:
  - `Tab`: Moves focus to the text area (only when enabled). Does not insert a tab character — it moves focus to the next element.
  - `Shift + Tab`: Moves focus to the previous interactive element.
  - `Enter`: Inserts a line break. Does not submit the surrounding form.
  - `Arrow keys`: Move the caret within the text, including between wrapped lines.
  - `Home` / `End`: Move the caret to the start or end of the current line.
  - `Ctrl / Cmd + A`: Selects all text in the field.
- Role:
  - Text area uses a native `<textarea>` element and is exposed as a textbox role with `aria-multiline="true"`. When `readonly` is true it keeps textbox semantics while editing is blocked, so the content stays reachable and selectable.
- Required attributes:
  - Provide an accessible name. The Label is associated via `<label for>` or `aria-labelledby`. When `Show Label` is false, supply `aria-label` — a visually hidden field still needs an accessible name.
- Announced:
  - The validation message is linked through `aria-describedby` and paired with `aria-invalid`, so the specific error is announced rather than a bare "invalid" state.
  - The counter updates in a polite live region. Throttle announcements — announcing on every keystroke is unusable. Announce on approach to the limit and on exceeding it, not continuously.
  - The counter's unit (characters or words) is included in its accessible text, since "42 / 500" alone doesn't say what is being counted.
  - Resizing via the drag handle is pointer-only and carries no announcement. It's a convenience, never the sole route to reading long content, so the field must remain scrollable by keyboard.
- Focus: Not documented

## Built from

Generated from the component source and CSS, not from ZeroHeight.

- MDS components: none

- Semantic tokens: `--mds-bg-surface-default`, `--mds-bg-surface-strong`, `--mds-border-interactive-danger-default`, `--mds-border-interactive-primary-default`, `--mds-border-interactive-secondary-default`, `--mds-border-radius-sm`, `--mds-focus-danger`, `--mds-focus-default`, `--mds-font-family-base`, `--mds-font-size-paragraph-default`, `--mds-font-size-paragraph-small`, `--mds-font-weight-medium`, `--mds-font-weight-regular`, `--mds-icons-xs`, `--mds-letter-spacing-default`, `--mds-line-height-paragraph-default`, `--mds-line-height-paragraph-small`, `--mds-line-height-paragraph-xs`, `--mds-spacing-sm`, `--mds-spacing-xs`, `--mds-spacing-xxs`, `--mds-stroke-weight-md`, `--mds-stroke-weight-sm`, `--mds-text-danger`, `--mds-text-default`, `--mds-text-muted`, `--mds-text-subtle`

## Usage

### Overview

Text area is a multi-line text input for longer-form free text — comments, descriptions, messages — as opposed to single-line values. It supports a label, placeholder and filled content, a live counter, supporting/helper text, validation messaging, and manual resizing.

### When to use

* Use for multi-line, longer-form text entry where length is unpredictable — comments, descriptions, feedback, messages.
* Use when you need built-in support for helper text, a required/info-flagged label, or inline validation messaging.
* Use `Counter=yes` when there's an actual character or word limit to communicate, so the count has something to compare against.
* Use `Resizable=yes` when the likely content length varies a lot and people benefit from expanding the box themselves.

#### **❌ When not to use**

* Don't use for single-line values — names, emails, search, short labels. Use the **Input** component instead.
* Don't turn `Counter` on if there's no limit behind it; a count with nothing to compare against is noise.
* Don't rely on placeholder text as a substitute for a visible Label — placeholder disappears the moment someone starts typing.
* Don't use `Disabled` for a field that holds content someone should still be able to read — use `Read-only` instead.

### Variants

#### Content toggles

| **Props** | **When to use** |
| :--- | --- |
| | ****Counter**** Shows a live count against a limit (e.g. "42 / 500") in the support row. Turn on only when there's a real character or word limit; the source description notes the counter can track either characters or words depending on implementation — pick one and keep it consistent across the product. |
| | ****Support text**** Adds helper or validation copy under the field. Turn off to reduce visual noise when the label alone is sufficient. |
| | ****Placeholder**** It reflects whether the field is empty (`Placeholder=yes`, placeholder text shown) or populated (`Placeholder=no`, value shown). |

#### Label 

| **Prop** | **When to use** |
| :--- | --- |
| | ****showLabel**** Show the label row. If you turn it off, still give the field an accessible name (see Accessibility). |
| | ****Info**** Adds the info icon-button next to the label for supplementary guidance, e.g. a tooltip explaining expectations. |
| | **Required** Adds the danger-coloured asterisk next to the label. Pair with an actual `required`/`aria-required` attribute — see Accessibility. |

#### Behaviour

| **Variant** | **When to use** |
| :--- | --- |
| | ****Resizable**** Shows the drag handle in the bottom-right corner and enables native CSS resize, letting people drag the field taller. Use when content length varies a lot and people benefit from expanding the box themselves. Never shown in the disabled state, regardless of this setting. |
| | **Fixed** Locks the field to its set height, with no drag handle — content scrolls once it exceeds that height. Use when a consistent field height matters more than flexibility, e.g. dense forms, table cells, or layouts where a variable height would shift surrounding content. |

### Guidelines

#### Content design

* Keep the label short — a few words naming what belongs in the field ("Course description", "Feedback").
* Supporting text is one short line: a formatting hint, a length expectation, or — in the invalid state — the specific validation error.
* Don't duplicate the label in the placeholder; use placeholder to show an example of expected input, not to repeat what the label already says.
* Counter format is used / limit (e.g. "42 / 500"). Keep the unit (characters vs. words) consistent everywhere the counter appears.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Use the placeholder to show an example of the expected input. |
| Don't | | | Don’t repeat the label in the placeholder. It adds nothing and disappears once typing starts. |

##### **Copywriting** *(if applicable)*

* Use sentence case for labels and supporting text. Don't capitalise every word.
* Write invalid messages that say what's wrong and how to fix it — "Description must be under 500 characters", not "Invalid input."
* Keep placeholder text illustrative and brief; it should read as an example, not an instruction.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Use sentence case for labels and supporting text. |
| Don't | | | Don’t capitalise every word. |
| Do | | | Say what is wrong and how to fix it. Naming the limit tells people exactly what to change. |
| Don't | | | Don’t rely on generic errors. “Invalid input” gives no indication of what went wrong or how to resolve it. |

#### Layout and spacing

* The field, label, and support row stack vertically with `spacing.xxs` gap between them.
The field defaults to roughly a 3-line content area before scrolling or resizing is needed.
* When the counter appears without supporting text, it right-aligns on its own row rather than floating inside the field.
* The field is full-width of its container (`w-full`) by default; it doesn't have an intrinsic fixed width.

#### Responsive behaviour

* The field stays full-width of its container across breakpoints.
* On touch devices, give the resizer a larger hit target than its 8×8px visual size — it's easy to miss otherwise.
* Avoid placing a text area in a very short container where it would have to scroll immediately; the ~3-line default height needs room to breathe.

#### Interaction behaviour

* Hover only changes the fill (transparent → white); it doesn't touch the border, so hover reads as a subtle "this is interactive" cue rather than a state change.
* Active swaps the border to the primary accent on press, ahead of focus landing.
* Focus swaps the border to the focus token and doubles its weight to 2px, with padding compensating so the field doesn't visibly resize when the ring appears.
* Disabled blocks all pointer and keyboard interaction and never renders the resizer, even if resizable is true.
* Read-only allows focus and text selection but blocks editing, and keeps the resizer (if enabled) since people may still want to expand the box to read long content.
* Invalid can combine with any of hover/active/focus/disabled/read-only in principle, but is typically shown alongside default, hover, active, or focus as the result of a validation check.

#### Accessibility guidelines

##### **Colour and contrast**

* Field text and placeholder text meet 4.5:1 contrast against the field surface, including the danger-coloured invalid state.
* The invalid state never relies on colour alone — the danger border, the `circle-exclamation` icon, and the supporting-text message all reinforce it together.

##### **Focus**

* The 2px focus ring is always visible on keyboard focus. Never suppress or override it.
* Focus should land on the text area itself, not on decorative elements like the resizer or info button.

##### **Labelling**

* Always programmatically associate the Label with the textarea (`<label for>` or `aria-labelledby`).
* If `showLabel` is off, still provide an accessible name via `aria-label` — a visually hidden field needs an accessible one.
* Give the info icon-button a descriptive `aria-label` (e.g. "More about description formatting"), not a generic "Info".

##### **States**

* Pair the required asterisk with an actual `required` attribute or `aria-required="true"` so it's announced, not just shown visually.
* Use the native `disabled` attribute for the disabled state, and `aria-readonly="true"` (or `readonly`) for read-only, so assistive technology reports the correct interaction model.

## Design

### Anatomy

1. **Label** *(optional)* — describes the field. `text.subtle`, `$font-size-sm`, medium weight. Toggled with `showLabel`.
2. **Info button** *(optional)* — a circular icon button next to the label that surfaces extra guidance (e.g. a tooltip). FA Icon `circle-info`, `text.subtle`, `icons.xs`, sits in a `border-radius.xl` hit area padded `spacing.xxs`.
3. **Required indicator** *(optional)* — a trailing asterisk in `text.danger` next to the label when the field is mandatory.
4. **Text-field** — the input surface. Border: `[stroke-weight.sm](http://stroke-weight.sm)` (1px) in `border.interactive.secondary.default`, radius `[border-radius.sm](http://border-radius.sm)`, padding `[spacing.sm](http://spacing.sm)` horizontal / `spacing.xs` vertical. Always required.
5. **Value / placeholder text** — `$font-size-body` (16px), regular weight, `line-height.paragraph.default`. Placeholder renders in `text.muted`; entered content renders in `text.default`.
6. **Resizer** *(optional)* — an 8×8px drag handle in the bottom-right corner that maps to native textarea CSS resize. Shown only when `resizable` is true, and never shown in the disabled state regardless of that setting.
7. **Support row** *(optional)* — a row beneath the field holding supporting text and/or the counter. Supporting text sits left and grows to fill the row (`text.muted`, or `text.danger` when invalid); the counter sits right in a fixed-width column (`text.subtle`, unaffected by validation state). If both are off, the row doesn't render at all — the field's gap collapses back to just Label + Text-field.
8. **Validation icon** *(invalid state only)* — FA Icon `circle-exclamation` in `text.danger`, rendered inline inside the Text-field alongside the value/placeholder text.

#### States

The component spans **7 interaction states**. Tokens listed below cover the field container, its border, and the text inside it. Where a state doesn't change a token, it inherits the default.

| | **Default** The field's resting state, ready to receive input. Container: `none` Border: `border.interactive.secondary.default` at `stroke-weight.sm` Label: `text.subtle` Placeholder: `text.muted` Value: `text.default` Supporting text: `text.muted` Counter: `text.subtle` |
| :--- | :--- |
| | **Hover** Triggered when the cursor moves over the field. Only the container fill changes — the border deliberately stays the same, keeping the affordance subtle. Container: `bg.surface.default` Border: `border.interactive.secondary.default` Label: `text.subtle` Placeholder: `text.muted` Supporting text: `text.muted` |
| | **Active** The field is selected and in use — the caret sits inside it and the person is typing. The primary accent border marks it as the field currently being edited, distinguishing it from every other field on the page. Container: `bg.surface.default` Border: `border.interactive.primary.default` Label: `text.subtle` Placeholder: `text.muted` Supporting text: `text.muted` |
| | **Focus** Triggered via keyboard navigation or once a click lands. The border switches to the focus token and doubles in weight. Internal padding compensates by 1px per side so the field's outer size doesn't shift. Never suppress or override this state. Container: `bg.surface.default` Border: `focus.default` at `stroke-weight.md` Label: `text.subtle` Placeholder: `text.muted` Supporting text: `text.muted` |
| | **Invalid** Applied when the content fails validation. The danger border, the inline icon, and the message work together so the state never rests on colour alone. Container: `none` Border: `border.interactive.danger.default` Icon: `text.danger` Label: `text.subtle` Placeholder: `text.muted` Supporting text: `text.danger` Counter: `text.subtle` (unchanged by validation) |
| | **Disabled** Applied when the field is unavailable for input. The resizer never renders, regardless of the resizable setting. Use for empty fields — if content should still be readable, use read-only instead. Container: `bg.surface.strong` Border: `border.interactive.secondary.default` Label: `text.subtle` Placeholder: `text.muted` Supporting text: `text.muted` |
| | **Read-only** Applied when existing content should be readable and selectable but not editable. The value text dropping to `text.muted` is the only visual cue, so pair it with `aria-readonly`. The resizer still renders if resizable is on. Container: `none` Border: `border.interactive.secondary.default` Label: `text.subtle` Value: `text.muted` Supporting text: `text.muted` |

**Disabled vs. read-only:** Disabled is defined only for the empty presentation and read-only only for the populated one. That's intentional — disabled communicates "not available for input", read-only communicates "here's existing content you can't edit". If a field already holds content someone should be able to review or copy, use read-only.

## Code

### Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-textarea--default)

### Accessibility implementation

#### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus to the text area (only when enabled). Does not insert a tab character — it moves focus to the next element. |
| `Shift + Tab` | Moves focus to the previous interactive element. |
| `Enter` | Inserts a line break. Does not submit the surrounding form. |
| `Arrow keys` | Move the caret within the text, including between wrapped lines. |
| `Home` / `End` | Move the caret to the start or end of the current line. |
| `Ctrl / Cmd + A` | Selects all text in the field. |

#### ARIA

* Role:
    * Text area uses a native `<textarea>` element and is exposed as a textbox role with `aria-multiline="true"`.
    * When `readonly` is true it keeps textbox semantics while editing is blocked, so the content stays reachable and selectable.
* Required attributes:
    * Provide an accessible name. The Label is associated via `<label for>` or `aria-labelledby`.
    * When `Show Label` is false, supply `aria-label` — a visually hidden field still needs an accessible name.
* Optional attributes:
    * `aria-describedby` links the field to the supporting text and, where present, the counter, so both are announced with the field.
    * `aria-invalid="true"` is applied in the invalid state, alongside the danger border and inline `circle-exclamation` icon.
    * `aria-required="true"` (or the native `required` attribute) accompanies the visual asterisk when the field is mandatory.
    * `maxlength` is set when a hard character limit is enforced, so the limit is announced rather than only shown by the counter.
    * `aria-disabled` is applied automatically when disabled is true.
    * The info icon-button takes its own `aria-label` describing what it reveals, not the icon itself.

#### Dynamic announcements

* The validation message is linked through `aria-describedby` and paired with `aria-invalid`, so the specific error is announced rather than a bare "invalid" state.
* The counter updates in a polite live region. Throttle announcements — announcing on every keystroke is unusable. Announce on approach to the limit and on exceeding it, not continuously.
* The counter's unit (characters or words) is included in its accessible text, since "42 / 500" alone doesn't say what is being counted.
* Resizing via the drag handle is pointer-only and carries no announcement. It's a convenience, never the sole route to reading long content, so the field must remain scrollable by keyboard.
