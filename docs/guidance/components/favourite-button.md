---
component: Favourite button
slug: favourite-button
package: "@moodlehq/design-system@5.4.0"
status: Ready
source: https://design.moodle.com/98292f05f/v/latest/p/932a22-favourite-button
import: @moodlehq/design-system/components/favourite-button
types: dist/components/favourite-button/index.d.ts
---

# Favourite button

An icon-only toggle button that lets users mark or unmark an item as a favourite.

## Look-alikes

Button

Use instead: labelled button; button with an icon and label.

## Accessibility

- Keyboard:
  - `Tab`: Moves focus to the button
  - `Shift + Tab`: Moves focus to the previous interactive element
  - `Space`: Toggles the favourite state
- Role:
  - FavouriteButton is a native toggle `button`.
- Required attributes:
  - `aria-label` is required and should describe the current action. Use clear, state-aware labels, for example “Add to favourites” when not selected “Remove from favourites” when selected
- Announced:
  - Screen readers announce state changes through native toggle button behavior via `aria-pressed` and the accessible name.
- Focus: Not documented

## Built from

Generated from the component source and CSS, not from ZeroHeight.

- MDS components: none

- Semantic tokens: `--mds-bg-surface-default`, `--mds-bg-surface-strong`, `--mds-bg-surface-subtle`, `--mds-border-radius-pill`, `--mds-focus-default`, `--mds-icons-xs`, `--mds-spacing-xs`, `--mds-stroke-weight-md`, `--mds-text-link-primary-default`, `--mds-text-link-primary-disabled`, `--mds-text-link-primary-hover`, `--mds-text-muted`, `--mds-text-subtle`

## Usage

### Overview

The favourite button is a small icon-only toggle button. It lets users mark or unmark an item as a favourite. It uses a star icon that switches between an unfilled and a filled state to reflect the current status.

### When to use

* Use when users need a persistent way to save or bookmark an individual content item such as a course, activity, or resource.
* Use when space is constrained and a full-text button would be too large for the context.
* Use in cards, tiles, or list rows where the save action is secondary to the primary content.
* Use when the toggled state needs to persist and be visible across sessions.

#### **❌ When not to use**

* Do not use for primary calls to action. Use a labelled button instead.
* Do not use when the action needs an explicit text label for clarity. Use a button with an icon and label instead.

### Variants

The favourite button has one toggle property: `Selected`.

| **Variant** | **When to use** |
| :--- | --- |
| | **Not favourited** (Selected = False) Use when the item has not been saved by the user. The icon is unfilled. |
| | **Favourited** (Selected = True) Use when the item has already been saved. The icon is filled to confirm the current state. |

### Guidelines

#### Content design

##### **Labelling**

* The button contains no text. The icon is the only visual element.
* The accessible label must be provided in code. Use "Add to favourites" when not favourited and "Remove from favourites" when favourited.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Use a tooltip that describes what will happen: "Add to favourites". |
| Don't | | | Leave the button without a label. |

##### **Copywriting**

* Use sentence case for accessible labels.
* Keep labels concise and action-oriented: "Add to favourites" and "Remove from favourites".
* Don't use vague labels like "Toggle" or "Star".

#### Layout and spacing

* Place the favourite button in a consistent position within its parent container, such as the top-right corner of a card.
* Do not group multiple favourite buttons side by side.
* Ensure the touch target meets the minimum 44×44px requirement on touch devices, even if the visible icon is smaller.

#### Breakpoints

* The button size stays fixed across breakpoints. No layout changes are needed.

#### Interaction behaviour

* The button toggles between favourited and not favourited on each click or activation.
* Use a pointer cursor on hover.
* Use a not-allowed cursor when disabled.
* The focus ring must be visible at all viewport sizes.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Use the filled icon to clearly show an item is already favourited. |
| Don't | | | Leave the icon in the same visual state regardless of whether the item is saved. Users cannot tell if their action worked. |

#### Accessibility guidelines

##### **Colour and contrast**

* The icon must meet a minimum 3:1 contrast ratio against its background in all interactive states.
* Do not rely on colour alone to communicate the toggle state. The icon fill change (unfilled vs filled) provides a second visual indicator.

##### **Focus**

* Focus is placed directly on the button container.
* The focus ring must be visible on all background colours used in the layout. Avoid placing the button on backgrounds where the ring becomes invisible.

##### **Labelling**

* The button must always have an accessible label.
* The label must update dynamically when the toggle state changes so screen readers announce the new state.
* Example labels: "Add to favourites" (not favourited), "Remove from favourites" (favourited).

## Design

### Anatomy

1. **Container**: The outer pill-shaped wrapper. It holds the icon and applies the focus ring when the button receives keyboard focus.
2. **Icon**: The star vector inside the container. It changes between an unfilled (not favourited) and a filled (favourited) appearance to communicate the current toggle state.

### States

Each interaction state applies to both favourited and not favourited.

#### Not favourited  (Selected = False)

| **State** | **Styles and tokens** |
| :--- | --- |
| | **Default** The button's resting state when the item has not been saved. Icon: `colors.text.default` Container: `color.bg.surface.default` |
| | **Focus** Triggered when the button receives keyboard focus. Icon: `colors.text.default` Container: `colors.bg.surface.default`Focus ring: `colors.focus.default` Border width: `borders.stroke weight.md` Border offset: `spacing.spacing.offset` |
| | **Hover** Triggered when the pointer moves over the button. The icon and container change colour to signal the button is interactive. Icon: `colors.text.subtle` Container: `colors.bg.surface.subtle` |
| | **Pressed** Triggered while the user holds the pointer down. Confirms the action is being activated. Icon: `colors.text.default` Container: `colors.bg.surface.strong` |
| | **Disabled** Use when the favourite action is not available. The icon is dimmed. Icon: `colors.text.muted` Container: `colors.bg.surface.default` |

#### Favourited  (Selected = True)

| **State** | **Styles and tokens** |
| :--- | --- |
| | ****Default**** The button's resting state when the item has been saved. Icon: `colors.text.link.primary.default` Container: `colors.bg.surface.default` |
| | **Focus** Triggered when the favourited button receives keyboard focus. Icon: `colors.text.link.primary.default` Container: `colors.bg.surface.default`Focus ring: `colors.focus.default` Border width: `borders.stroke weight.md` Border offset: `spacing.spacing.offset` |
| | ****Hover**** Triggered when the pointer moves over a favourited button. The icon changes colour to signal it can be toggled off. Icon: `colors.text.link.primary.hover` Container: `colors.bg.surface.default` |
| | ****Pressed**** Triggered while the user holds the pointer down on a favourited button. Confirms the removal action is being activated. Icon: `colors.text.link.primary.default` Container: `colors.bg.surface.default` |
| | **Disabled** Use when a favourited item cannot be changed. The filled icon is dimmed. Icon: `colors.text.link.primary.disabled` Container: `colors.bg.surface.default` |

## Code

### Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-favouritebutton--default)

### Accessibility implementation

#### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus to the button |
| `Shift + Tab` | Moves focus to the previous interactive element |
| `Space` | Toggles the favourite state |

#### ARIA

* Role:
    * FavouriteButton is a native toggle `button`.
* Required attributes:
    * `aria-label` is required and should describe the current action.
    * Use clear, state-aware labels, for example:
        * “Add to favourites” when not selected
        * “Remove from favourites” when selected
* Optional attributes:
    * `aria-pressed` is managed by the component from the selected state:
        * false when unselected
        * true when selected
    * Standard optional button attributes may also be provided as needed (for example disabled, `aria-invalid` when relevant to context).

#### Dynamic announcements

* Screen readers announce state changes through native toggle button behavior via `aria-pressed` and the accessible name.
