---
component: Tooltip
slug: tooltip
package: "@moodlehq/design-system@5.5.0"
status: Ready
source: https://design.moodle.com/98292f05f/v/latest/p/59b4a5-tooltip
import: @moodlehq/design-system/components/tooltip
types: dist/components/tooltip/index.d.ts
---

<!-- Generated from ZeroHeight by npm run build-guidance. Do not edit. -->

# Tooltip

A tooltip is a small popup that displays brief informational text next to a trigger element.

## Look-alikes

Link · Button

## Accessibility

- Keyboard:
  - `Tab`: Moves focus to the trigger element, which shows the tooltip.
  - `Shift + Tab`: Moves focus away from the trigger element, which hides the tooltip.
  - `Escape`: Should dismiss the tooltip if it is visible. Implement on the trigger element.
- Role:
  - The tooltip container should have `role="tooltip"`.
- Required attributes:
  - `id` on the tooltip element, referenced by the trigger's `aria-describedby`
- Announced: Not documented
- Focus: Not documented

## Built from

Generated from the component source and CSS, not from ZeroHeight.

- MDS components: none

- Semantic tokens: `--mds-bg-feedback-secondary-dark`, `--mds-bg-feedback-secondary-default`, `--mds-border-radius-sm`, `--mds-font-family-base`, `--mds-font-size-paragraph-small`, `--mds-font-weight-regular`, `--mds-letter-spacing-default`, `--mds-line-height-paragraph-small`, `--mds-spacing-xs`, `--mds-spacing-xxs`, `--mds-text-default`, `--mds-text-inverse`

## Usage

### Overview

Tooltip appears on hover or focus and disappears when the user moves away. The arrow visually anchors the tooltip to its trigger.

Use tooltips to add context without cluttering the interface. For example, to label an icon button or clarify truncated text.

#### When to use

* Use when labelling icon-only buttons where the icon alone may not be clear enough.
* Use when clarifying truncated text that cannot be expanded inline.
* Use when providing brief helper text for form fields or UI controls.
* Use when the information is supplementary and not required for the user to complete a task.

#### ❌ When not to use

* Do not use for critical information the user must act on. Use inline text, a popover, or a dialog instead.
* Do not use for long explanations or multi-line content. The tooltip is not a popover.
* Do not nest interactive elements such as links or buttons inside a tooltip.
* Do not use on touch-only interfaces. Tooltips rely on hover and focus, which are not reliably available on mobile.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD use a tooltip only for a supporting hint that helps but isn't needed to finish the task. |
| Don't | | | MUST NOT put information people need to read to carry on in a tooltip. |

### Variants

#### Variant

Set with the `variant` prop. If you leave it out, you get `dark`.

| **Variant** | **When to use** |
| --- | --- |
| | **Dark (default)** Use Dark as the default for tooltips on light backgrounds. |
| | **Light** Use Light for tooltips on dark backgrounds or dark surfaces. |

#### Placement

Set with the `placement` prop. It controls which side of the trigger the tooltip appears on, and the arrow adjusts automatically. If you leave it out, you get `top`.

| **Variant** | **When to use** |
| :--- | :--- |
| | **Top (default)** Tooltip appears above the trigger. Use when there is enough space above and the tooltip does not overlap other content. |
| | **Bottom** Tooltip appears below the trigger. Use when the trigger is near the top of the viewport. |
| | **Left** Tooltip appears to the left of the trigger. Use when the trigger is on the right side of the layout. |
| | **Right** Tooltip appears to the right of the trigger. Use when the trigger is on the left side of the layout. |

### Guidelines

#### Content guidelines

##### Content structure and constraints

* Tooltip text should be a short phrase or single sentence. Aim for under 80 characters.
* Do not include punctuation at the end of a label-style tooltip (e.g. "Edit profile" not "Edit profile.").
* Use a full sentence with a full stop if the tooltip explains a behaviour or consequence (e.g. "This action can't be undone." not "Action can't be undone").
* Do not include HTML, links, or interactive elements in tooltip text.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD use short labels that are easy to scan. |
| Don't | | | SHOULD NOT use full sentences that belong inline, not in a tooltip. |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | MUST keep tooltip content to plain text only. |
| Don't | | | MUST NOT put a link or other interactive element in a tooltip. |

##### Copywriting

* Use sentence case for all tooltip text.
* Keep the tone plain and direct. Say what the control does, not why it exists.

#### Placement

* Position the tooltip so the arrow points clearly at the trigger element.
* Leave `--mds-spacing-xs` (8px) of space between the tooltip and the trigger element. The arrow tip sits at the 8px mark.
* Leave at least `--mds-spacing-xs` (8px) space between the tooltip and the viewport edge to avoid clipping.
* Do not stack multiple tooltips simultaneously.

#### Accessibility guidelines

##### Colour and contrast

* Ensure background and text meets WCAG AA contrast requirements at the default font size.
* Do not rely on colour alone to communicate the tooltip's presence. The arrow and placement are the primary visual cues.

##### Focus

* The tooltip is triggered by the trigger element's focus, not the tooltip itself. The tooltip should never receive focus directly.
* Ensure the trigger element has a visible focus indicator.

##### Labelling

* If the tooltip labels an icon button, the trigger must have either an `aria-label` or `aria-describedby` pointing to the tooltip content.
* Use `aria-describedby` when the tooltip supplements a visible label. Use `aria-label` when the tooltip is the only label.
* The trigger element must be keyboard focusable.
* Do not put essential information only in a tooltip. It is not available to all users in all contexts.

## Code

### Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-tooltip--default)

Props and types (TypeScript API): [Tooltip.d.ts](https://unpkg.com/@moodlehq/design-system@5.5.0/dist/components/tooltip/Tooltip.d.ts)

Full list of props and their types for Tooltip.

### Accessibility implementation

#### Keyboard interaction

This component has no keyboard interaction of its own. It responds to the focus state of its trigger element.

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus to the trigger element, which shows the tooltip. |
| `Shift + Tab` | Moves focus away from the trigger element, which hides the tooltip. |
| `Escape` | Should dismiss the tooltip if it is visible. Implement on the trigger element. |

#### ARIA

* Role: The tooltip container should have `role="tooltip"`.
* Required attributes: `id` on the tooltip element, referenced by the trigger's `aria-describedby`
* Optional attributes: `aria-label` on the trigger element, as an alternative to `aria-describedby` when no visible label exists

#### Dynamic announcements

The tooltip content is exposed to assistive technology via `aria-describedby` on the trigger element. Screen readers announce the tooltip text when the trigger receives focus. Do not use `aria-live` on the tooltip container. The `aria-describedby` association is sufficient and avoids duplicate announcements.

## Specs

### Anatomy

1. **Container:** The rounded bubble that holds the tooltip text. It anchors visually to the trigger element via the arrow.
2. **Text:** The label displayed inside the container. It carries the tooltip message.
3. **Arrow:** The small directional pointer that connects the tooltip to its trigger. Its orientation changes based on the tooltip placement.

### States

Tooltips are display only. They do not have hover, pressed, disabled, or focus states of their own. Its visibility is controlled entirely by the trigger element's hover and focus states.

| **States** | **Description** |
| :--- | :--- |
| | **Visible** Shown when the trigger element receives hover or focus. Colour and spacing tokens depend on Mode, see Variants > Mode for the token table. |

### Layout and sizing

* If the trigger element already has a visible label, the tooltip should add context, not repeat the label.
* Tooltip width fits the text, up to a maximum of 200px. Text wraps if it goes past that width.

### Behaviour

* Tooltips appear on `mouseenter` and `:focus-visible` of the trigger element.
* Tooltips disappear on `mouseleave` and `blur`.
* Do not add animations longer than 150ms on entry or exit.

### Responsive behaviour

* Do not rely on tooltips for essential information on small or touch screens.
