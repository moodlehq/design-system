---
component: Text area
slug: textarea
package: "@moodlehq/design-system@5.5.0"
status: Ready
source: https://design.moodle.com/98292f05f/v/latest/p/343bd2-text-area
import: @moodlehq/design-system/components/textarea
types: dist/components/textarea/index.d.ts
---

<!-- Generated from ZeroHeight by npm run build-guidance. Do not edit. -->

# Text area

A multi-line text input for longer-form free text, with support for labels, helper text, live counting, and validation.

## Look-alikes

Input · Search

Use instead: **Input**; `Read-only`.

## Accessibility

- Keyboard:
  - `Tab`: Moves focus to the text area (only when enabled). Does not insert a tab character. It moves focus to the next element.
  - `Shift + Tab`: Moves focus to the previous interactive element.
  - `Enter`: Inserts a line break. Does not submit the surrounding form.
  - `Arrow keys`: Move the caret within the text, including between wrapped lines.
  - `Home` / `End`: Move the caret to the start or end of the current line.
  - `Ctrl / Cmd + A`: Selects all text in the field.
- Role:
  - Text area uses a native `<textarea>` element and is exposed as a textbox role with `aria-multiline="true"`. When `readonly` is true it keeps textbox semantics while editing is blocked, so the content stays reachable and selectable.
- Required attributes:
  - Provide an accessible name. The Label is associated via `<label for>` or `aria-labelledby`. When `Show Label` is false, supply `aria-label`. A visually hidden field still needs an accessible name.
- Announced:
  - The validation message is linked through `aria-describedby` and paired with `aria-invalid`, so the specific error is announced rather than a bare "invalid" state.
  - The counter updates in a polite live region. Throttle announcements. Announcing on every keystroke is unusable. Announce on approach to the limit and on exceeding it, not continuously.
  - The counter's unit (characters or words) is included in its accessible text, since "42 / 500" alone doesn't say what is being counted.
  - Resizing via the drag handle is pointer-only and carries no announcement. It's a convenience, never the sole route to reading long content, so the field must remain scrollable by keyboard.
- Focus: Not documented

## Props

Generated from the component TypeScript types, not from ZeroHeight. Inherited HTML attributes are not listed.

### TextareaProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` |  | Visible label text. When hideLabel is true this also serves as the aria-label fallback if no explicit aria-label prop is provided. |
| `hideLabel` | `boolean` | `false` | When true, the visible label element is hidden. The textarea is still labelled accessibly via aria-label (prop) → label (prop) in that order of precedence. |
| `invalid` | `boolean` |  | Marks the field as invalid: applies danger border colour and sets aria-invalid. Independent of invalidFeedback — invalid styling can be shown without a message. Has no effect when disabled or readOnly — those states don't carry an invalid state. |
| `invalidFeedback` | `string` |  | Pre-translated error message rendered below the field. Requires invalid={true} to be displayed. |
| `supportingText` | `string` |  | Optional supporting/helper text shown in the footer row when the field is not in the invalid+feedback state. |
| `disabled` | `boolean` |  | Use disabled only when the field is unavailable for input. Provide supportingText to explain why the control is disabled. |
| `readOnly` | `boolean` |  | Use readOnly when existing content must remain readable/copyable but should not be editable. |
| `resizable` | `boolean` | `true` | When true the textarea renders a native resize handle (CSS resize: vertical). Defaults to true. |
| `showCounter` | `boolean` | `false` | When true, shows a live character counter (current / maxLength) in the footer row. Requires maxLength to be set. |
| `infoTooltipLabel` | `string` |  | Pre-translated label for the info tooltip shown beside the field label. When provided, a `circle-info` icon button appears next to the label; hovering or focusing it reveals a tooltip with this text. Only shown when the label is visible (`hideLabel` is false or omitted). |
| `counterAriaLabel` | `TextareaCounterMessageFormatter` |  | Accessible label for the visible counter text (for example, "12 of 100 characters") as a translated string or formatter callback. |
| `counterRemainingAnnouncement` | `TextareaCounterMessageFormatter` |  | Live-region announcement for remaining-character milestones (20, 10, 5, 0) as a translated string or formatter callback. |
| `counterOverLimitAnnouncement` | `TextareaCounterMessageFormatter` |  | Live-region announcement for over-limit state as a translated string or formatter callback. |

## Built from

Generated from the component source and CSS, not from ZeroHeight.

- MDS components: none

- Semantic tokens: `--mds-bg-surface-default`, `--mds-bg-surface-strong`, `--mds-border-interactive-danger-default`, `--mds-border-interactive-primary-default`, `--mds-border-interactive-secondary-default`, `--mds-border-radius-sm`, `--mds-focus-danger`, `--mds-focus-default`, `--mds-font-family-base`, `--mds-font-size-paragraph-default`, `--mds-font-size-paragraph-small`, `--mds-font-weight-medium`, `--mds-font-weight-regular`, `--mds-icons-xs`, `--mds-letter-spacing-default`, `--mds-line-height-paragraph-default`, `--mds-line-height-paragraph-small`, `--mds-line-height-paragraph-xs`, `--mds-spacing-sm`, `--mds-spacing-xs`, `--mds-spacing-xxs`, `--mds-stroke-weight-md`, `--mds-stroke-weight-sm`, `--mds-text-danger`, `--mds-text-default`, `--mds-text-muted`, `--mds-text-subtle`

## Usage

### Overview

Text area is a multi-line text input for longer-form free text (comments, descriptions, messages) as opposed to single-line values. It supports a label, placeholder and filled content, a live counter, supporting/helper text, validation messaging, and manual resizing.

#### When to use

* Use for multi-line, longer-form text entry where length is unpredictable: comments, descriptions, feedback, messages.
* Use when you need built-in support for helper text, a required/info-flagged label, or inline validation messaging.
* Use `showCounter` when there's an actual character limit to communicate, so the count has something to compare against.
* Use `resizable` when the likely content length varies a lot and people benefit from expanding the box themselves.

#### ❌ When not to use

* Don't use for single-line values: names, emails, search, short labels. Use the **Input** component instead.
* Don't turn `Counter` on if there's no limit behind it; a count with nothing to compare against is noise.
* Don't rely on placeholder text as a substitute for a visible Label. Placeholder disappears the moment someone starts typing.
* Don't use `Disabled` for a field that holds content someone should still be able to read. Use `Read-only` instead.

### Variants

#### Content toggles

| **Props** | **When to use** |
| :--- | --- |
| | **Counter (`showCounter`, needs `maxLength`)** Shows a live count against a limit (e.g. "42 / 500") in the support row. Turn on only when there's a real character limit. The counter counts characters. |
| | **Support text (`supportingText`)** Adds helper or validation copy under the field. Turn off to reduce visual noise when the label alone is sufficient. |
| | **Placeholder** It reflects whether the field is empty (placeholder text shown) or populated (value shown). |

#### Label 

| **Prop** | **When to use** |
| :--- | --- |
| | **Show label (on by default, set `hideLabel` to hide it)** Show the label row. If you turn it off, still give the field an accessible name (see Accessibility). |
| | **Info (`infoTooltipLabel`)** Adds the info icon-button next to the label for supplementary guidance, e.g. a tooltip explaining expectations. |
| | **Required** Adds the danger-coloured asterisk next to the label. Pair with an actual `required`/`aria-required` attribute. See Accessibility. |

#### Behaviour

Set with the `resizable` prop. It’s on by default.

| **Variant** | **When to use** |
| :--- | --- |
| | **Resizable (default)** Shows the drag handle in the bottom-right corner and enables native CSS resize, letting people drag the field taller. Use when content length varies a lot and people benefit from expanding the box themselves. Never shown in the disabled state, regardless of this setting. |
| | **Fixed (`resizable={false}`)** Locks the field to its set height, with no drag handle. Content scrolls once it exceeds that height. Use when a consistent field height matters more than flexibility, e.g. dense forms, table cells, or layouts where a variable height would shift surrounding content. |

### Guidelines

#### Content guidelines

* Keep the label short: a few words naming what belongs in the field ("Course description", "Feedback").
* Supporting text is one short line: a formatting hint, a length expectation, or (in the invalid state) the specific validation error.
* Don't duplicate the label in the placeholder; use placeholder to show an example of expected input, not to repeat what the label already says.
* Counter format is used / limit (e.g. "42 / 500"). Keep the unit (characters vs. words) consistent everywhere the counter appears.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD use the placeholder to show an example of the expected input. |
| Don't | | | SHOULD NOT repeat the label in the placeholder. It adds nothing and disappears once typing starts. |

##### Copywriting

* Use sentence case for labels and supporting text. Don't capitalise every word.
* Write invalid messages that say what's wrong and how to fix it. "Description must be under 500 characters", not "Invalid input."
* Keep placeholder text illustrative and brief; it should read as an example, not an instruction.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD use sentence case for labels and supporting text. |
| Don't | | | SHOULD NOT capitalise every word. |
| Do | | | MUST say what's wrong and how to fix it. Naming the limit tells people exactly what to change. |
| Don't | | | MUST NOT rely on generic errors. "Invalid input" doesn't say what went wrong or how to fix it. |

#### Placement

* The field, label, and support row stack vertically with `--mds-spacing-xxs` gap between them.
The field defaults to roughly a 3-line content area before scrolling or resizing is needed.
* When the counter appears without supporting text, it right-aligns on its own row rather than floating inside the field.
* The field is full-width of its container (`w-full`) by default; it doesn't have an intrinsic fixed width.

#### Accessibility guidelines

##### Colour and contrast

* Field text and placeholder text meet 4.5:1 contrast against the field surface, including the danger-coloured invalid state.
* The invalid state never relies on colour alone. The danger border, the `circle-exclamation` icon, and the supporting-text message all reinforce it together.

##### Focus

* The 2px focus ring is always visible on keyboard focus. Never suppress or override it.
* Focus should land on the text area itself, not on decorative elements like the resizer or info button.

##### Labelling

* Always programmatically associate the Label with the textarea (`<label for>` or `aria-labelledby`).
* If `hideLabel` is on, still provide an accessible name via `aria-label`. A visually hidden field needs an accessible one.
* Give the info icon-button a descriptive `aria-label` (e.g. "More about description formatting"), not a generic "Info".

##### States

* Pair the required asterisk with an actual `required` attribute or `aria-required="true"` so it's announced, not just shown visually.
* Use the native `disabled` attribute for the disabled state, and `aria-readonly="true"` (or `readonly`) for read-only, so assistive technology reports the correct interaction model.

## Code

### Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-textarea--default)

Props and types (TypeScript API): [Textarea.d.ts](https://unpkg.com/@moodlehq/design-system@5.5.0/dist/components/textarea/Textarea.d.ts)

Full list of props and their types for Text area.

### Accessibility implementation

#### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus to the text area (only when enabled). Does not insert a tab character. It moves focus to the next element. |
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
    * When `Show Label` is false, supply `aria-label`. A visually hidden field still needs an accessible name.
* Optional attributes:
    * `aria-describedby` links the field to the supporting text and, where present, the counter, so both are announced with the field.
    * `aria-invalid="true"` is applied in the invalid state, alongside the danger border and inline `circle-exclamation` icon.
    * `aria-required="true"` (or the native `required` attribute) accompanies the visual asterisk when the field is mandatory.
    * `maxlength` is set when a hard character limit is enforced, so the limit is announced rather than only shown by the counter.
    * `aria-disabled` is applied automatically when disabled is true.
    * The info icon-button takes its own `aria-label` describing what it reveals, not the icon itself.

#### Dynamic announcements

* The validation message is linked through `aria-describedby` and paired with `aria-invalid`, so the specific error is announced rather than a bare "invalid" state.
* The counter updates in a polite live region. Throttle announcements. Announcing on every keystroke is unusable. Announce on approach to the limit and on exceeding it, not continuously.
* The counter's unit (characters or words) is included in its accessible text, since "42 / 500" alone doesn't say what is being counted.
* Resizing via the drag handle is pointer-only and carries no announcement. It's a convenience, never the sole route to reading long content, so the field must remain scrollable by keyboard.

## Specs

### Anatomy

1. **Label** *(optional)*: describes the field, in medium weight. Hide it with `hideLabel`.
2. **Info button** *(optional)*: a small, icon-only ghost [Button](/877c50-button) next to the label that shows extra guidance in a tooltip. Uses the FA Icon `circle-info`, with no padding.
3. **Required indicator** *(optional)*: a trailing asterisk next to the label when the field is mandatory.
4. **Text-field**: the input surface, with a 1px border. Always required.
5. **Value / placeholder text**: 16px, regular weight.
6. **Resizer** *(optional)*: an 8×8px drag handle in the bottom-right corner that maps to native textarea CSS resize. Shown only when `resizable` is true, and never shown in the disabled state regardless of that setting.
7. **Support row** *(optional)*: a row beneath the field holding supporting text and/or the counter. Supporting text sits left and grows to fill the row; the counter sits right in a fixed-width column and isn’t affected by validation state. If both are off, the row doesn't render at all. The field's gap collapses back to just Label + Text-field.
8. **Validation icon** *(invalid state only)*: FA Icon `circle-exclamation`, rendered inline inside the Text-field alongside the value/placeholder text.

### States

The component spans **7 interaction states**.

| | **Default** The field's resting state, ready to receive input. Transparent field with a 1px border. |
| :--- | :--- |
| | **Hover** Triggered when the cursor moves over the field. Only the container fill changes. The border deliberately stays the same, keeping the affordance subtle. |
| | **Active** The field is selected and in use. The caret sits inside it and the person is typing. The primary accent border marks it as the field currently being edited, distinguishing it from every other field on the page. |
| | **Focus** Triggered via keyboard navigation or once a click lands. The border switches to the focus token and doubles in weight. Internal padding compensates by 1px per side so the field's outer size doesn't shift. Never suppress or override this state. A 2px focus ring also shows. |
| | **Invalid** Applied when the content fails validation. The danger border, the inline icon, and the message work together so the state never rests on colour alone. |
| | **Disabled** Applied when the field is unavailable for input. The resizer never renders, regardless of the resizable setting. Use for empty fields. If content should still be readable, use read-only instead. |
| | **Read-only** Applied when existing content should be readable and selectable but not editable. The muted value text is the only visual cue, so pair it with `aria-readonly`. The resizer still renders if resizable is on. |

**Disabled vs. read-only:** Disabled is defined only for the empty presentation and read-only only for the populated one. That's intentional. Disabled communicates "not available for input", read-only communicates "here's existing content you can't edit". If a field already holds content someone should be able to review or copy, use read-only.

### Behaviour

* Hover only changes the fill (transparent → white); it doesn't touch the border, so hover reads as a subtle "this is interactive" cue rather than a state change.
* Active swaps the border to the primary accent on press, ahead of focus landing.
* Focus swaps the border to the focus token and doubles its weight to 2px, with padding compensating so the field doesn't visibly resize when the ring appears.
* Disabled blocks all pointer and keyboard interaction and never renders the resizer, even if resizable is true.
* Read-only allows focus and text selection but blocks editing, and keeps the resizer (if enabled) since people may still want to expand the box to read long content.
* Invalid can combine with any of hover/active/focus/disabled/read-only in principle, but is typically shown alongside default, hover, active, or focus as the result of a validation check.

### Responsive behaviour

* The field stays full-width of its container across breakpoints.
* On touch devices, give the resizer a larger hit target than its 8×8px visual size. It's easy to miss otherwise.
* Avoid placing a text area in a very short container where it would have to scroll immediately; the ~3-line default height needs room to breathe.
