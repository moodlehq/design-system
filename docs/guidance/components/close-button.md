---
component: Close button
slug: close-button
package: "@moodlehq/design-system@5.5.0"
status: Ready
source: https://design.moodle.com/98292f05f/v/latest/p/778206-close-button
import: @moodlehq/design-system/components/close-button
types: dist/components/close-button/index.d.ts
---

<!-- Generated from ZeroHeight by npm run build-guidance. Do not edit. -->

# Close button

The close button lets users dismiss a surface, like a modal, drawer, or alert, or clear an entered value.

## Look-alikes

Button

## Accessibility

- Keyboard:
  - `Tab`: Moves focus to the close button
  - `Enter`: Activates the close button (triggers click/close action)
  - `Space`: Activates the close button (triggers click/close action)
- Role: Not documented
- Required attributes: Not documented
- Announced: Not documented
- Focus: Not documented

## Built from

Generated from the component source and CSS, not from ZeroHeight.

- MDS components: none

- Semantic tokens: `--mds-border-radius-xs`, `--mds-focus-default`, `--mds-icons-lg`, `--mds-icons-md`, `--mds-icons-sm`, `--mds-icons-xs`, `--mds-icons-xxs`, `--mds-stroke-weight-md`, `--mds-text-emphasis`, `--mds-text-muted`, `--mds-text-subtle`

## Usage

### Overview

The close button lets users dismiss a surface, like a modal, drawer, or alert, or clear an entered value.

#### When to use

* Use when a user needs to dismiss a temporary UI surface, for example a modal or an alert.
* Use when a user needs to clear an entered value, for example clearing the text in a search input.
* Use when closing or clearing is a supporting action and not the main call to action.
* Use when the UI already has clear primary actions, and the close button is only an exit or reset.

#### ❌ When not to use

* Do not use the close button as a Cancel action when the user must choose between options. Use explicit buttons like Cancel and Save.
* Do not use it for destructive actions like delete. Use a Delete action with clear text.
* Do not use it when closing will lose work, unless you also show a confirmation.

### Variants

#### Size

Set with the `size` prop. If you leave it out, you get `md`.

The component supports three sizes: SM, MD, LG

| **Variant** | **When to use** |
| :--- | --- |
| | **SM** Use in dense UI where space is limited, for example small toolbars. |
| | **MD (default)** Use as the default size for most contexts, for example standard modals. |
| | **LG** Use when the close button needs a larger hit target, for example large modals and alert dialogs. |

### Guidelines

#### Content guidelines

* The close button has no visible label.
* Always provide an accessible name that matches the action it performs.
* For dismiss actions, use a name like Close, or a more specific name when there are multiple close buttons on screen, for example Close course settings.
* For clear actions, use a name that describes what is being cleared, for example Clear search.

#### Placement

* Place the close button where users expect it, usually the top right of the surface header.
* Keep enough space around it so it is easy to click and tap.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD place the close button on the right of the alert dialogue. |
| Don't | | | SHOULD NOT place the close button on the left of the alert dialogue. |

#### Accessibility guidelines

##### Colour and contrast

* The icon colour `--mds-text-subtle` must meet contrast on the background where the close button sits.
* The focus border colour `--mds-focus-default` must be visible on all backgrounds used in your UI.

##### Focus

Do not remove the focus state. The focus border uses:

* `--mds-focus-default` for colour
* `--mds-stroke-weight-md` (2px) for weight
* `--mds-border-radius-xs` for radius

##### Labelling

Because the control is icon only, it must have an accessible label.

* Use `aria-label="Close"` for most cases.
* For dialogs, prefer `aria-label="Close dialog"` when it helps clarity.

## Code

### Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-closebutton--default)

Props and types (TypeScript API): [CloseButton.d.ts](https://unpkg.com/@moodlehq/design-system@5.5.0/dist/components/close-button/CloseButton.d.ts)

Full list of props and their types for Close button.

### Accessibility implementation

#### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus to the close button |
| `Enter` | Activates the close button (triggers click/close action) |
| `Space` | Activates the close button (triggers click/close action) |

#### ARIA

*     * Role:
        * Uses a native `button` element (implicit `button` role).
    * Required attributes:
        * `aria-label` is required and provides the accessible name (for example, 'Close', 'Dismiss dialog', 'Remove item').
        * Use a translated, context-specific label from the consuming application.
    * Optional attributes:
        * `disabled` for native disabled state.
        * Standard optional button ARIA/state attributes can be passed when needed by context (for example, `aria-controls`, `aria-expanded`).

#### Dynamic announcements

No built-in live announcement from the button itself.

If closing the target changes the page state (for example, alert dismissed or dialog closed), that state message should be announced by the parent container, typically via an aria-live polite region.

## Specs

### Anatomy

1. **Icon:** The X icon that communicates the close action.
2. **Container:** The clickable area around the icon. This makes the target easy to hit.
3. **Border** *(Focus state only)*: A visible border used to show keyboard focus.

### States

| | **Default** The resting state. The icon sits on a transparent background. |
| :--- | :--- |
| | **Hover** Shown when the cursor moves over the button. Do not remove this state. The icon changes to its emphasis colour. |
| | **Focus** Shown when the button receives keyboard focus. Must stay visible on all backgrounds. The icon changes to its emphasis colour and a 2px focus ring shows around the button. |
| | **Disabled** Shown when the close action is not available. The icon is muted. |

### Behaviour

#### Mouse and touch

* Click or tap closes the surface, or clears the value when the button is used as a clear action

#### Keyboard

* Tab moves focus to the close button
* Enter or Space activates it
* Escape should also close the surface when used in a modal or other dismissible overlay
* Escape is not required to trigger the clear action when the button is used inside an input, to avoid conflicting with other Escape behaviour on the page (for example closing a dropdown)

#### Cursor

* Pointer on hover
* Not allowed when disabled

### Responsive behaviour

* Keep the close button visible in the header area so it stays reachable when content scrolls.
