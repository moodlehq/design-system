---
component: Favourite button
slug: favourite-button
package: "@moodlehq/design-system@5.5.0"
status: Ready
source: https://design.moodle.com/98292f05f/v/latest/p/932a22-favourite-button
import: @moodlehq/design-system/components/favourite-button
types: dist/components/favourite-button/index.d.ts
---

<!-- Generated from ZeroHeight by npm run build-guidance. Do not edit. -->

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
  - Screen readers announce state changes through native toggle button behaviour via `aria-pressed` and the accessible name.
- Focus: Not documented

## Props

Generated from the component TypeScript types, not from ZeroHeight. Inherited HTML attributes are not listed.

### FavouriteButtonProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `selected` | `boolean` | `false` | Whether the item is currently selected as a favourite. Controls the filled/outlined icon state and `aria-pressed`. |
| `aria-label` (required) | `string` |  | Accessible name announced by screen readers. Must be a translated string provided by the caller. Typically "Add to favourites" or "Remove from favourites". |

## Built from

Generated from the component source and CSS, not from ZeroHeight.

- MDS components: none

- Semantic tokens: `--mds-bg-surface-default`, `--mds-bg-surface-strong`, `--mds-bg-surface-subtle`, `--mds-border-radius-pill`, `--mds-focus-default`, `--mds-icons-xs`, `--mds-spacing-xs`, `--mds-stroke-weight-md`, `--mds-text-link-primary-default`, `--mds-text-link-primary-disabled`, `--mds-text-link-primary-hover`, `--mds-text-muted`, `--mds-text-subtle`

## Usage

### Overview

The favourite button is a small icon-only toggle button. It lets users mark or unmark an item as a favourite. It uses a star icon that switches between an unfilled and a filled state to reflect the current status.

#### When to use

* Use when users need a persistent way to save or bookmark an individual content item such as a course, activity, or resource.
* Use when space is constrained and a full-text button would be too large for the context.
* Use in cards, tiles, or list rows where the save action is secondary to the primary content.
* Use when the toggled state needs to persist and be visible across sessions.

#### ❌ When not to use

* Do not use for primary calls to action. Use a labelled button instead.
* Do not use when the action needs an explicit text label for clarity. Use a button with an icon and label instead.

### Variants

The favourite button has one toggle property: `Selected`.

| **Variant** | **When to use** |
| :--- | --- |
| | **Not favourited** (Selected = False, `selected={false}`, default) Use when the item has not been saved by the user. The icon is unfilled. |
| | **Favourited** (Selected = True, `selected`) Use when the item has already been saved. The icon is filled to confirm the current state. |

### Guidelines

#### Content guidelines

##### Labelling

* The button contains no text. The icon is the only visual element.
* The accessible label must be provided in code. Use "Add to favourites" when not favourited and "Remove from favourites" when favourited.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | MUST use a tooltip that describes what will happen, e.g. "Add to favourites". |
| Don't | | | MUST NOT leave the button without a label. |

##### Copywriting

* Use sentence case for accessible labels.
* Keep labels concise and action-oriented: "Add to favourites" and "Remove from favourites".
* Don't use vague labels like "Toggle" or "Star".

#### Placement

* Place the favourite button in a consistent position within its parent container, such as the top-right corner of a card.
* Do not group multiple favourite buttons side by side.
* Ensure the touch target meets the minimum 44×44px requirement on touch devices, even if the visible icon is smaller.

#### Accessibility guidelines

##### Colour and contrast

* The icon must meet a minimum 3:1 contrast ratio against its background in all interactive states.
* Do not rely on colour alone to communicate the toggle state. The icon fill change (unfilled vs filled) provides a second visual indicator.

##### Focus

* Focus is placed directly on the button container.
* The focus ring must be visible on all background colours used in the layout. Avoid placing the button on backgrounds where the ring becomes invisible.

##### Labelling

* The button must always have an accessible label.
* The label must update dynamically when the toggle state changes so screen readers announce the new state.
* Example labels: "Add to favourites" (not favourited), "Remove from favourites" (favourited).

## Code

### Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-favouritebutton--default)

Props and types (TypeScript API): [FavouriteButton.d.ts](https://unpkg.com/@moodlehq/design-system@5.5.0/dist/components/favourite-button/FavouriteButton.d.ts)

Full list of props and their types for Favourite button.

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

* Screen readers announce state changes through native toggle button behaviour via `aria-pressed` and the accessible name.

## Specs

### Anatomy

1. **Container**: The outer pill-shaped wrapper. It holds the icon and applies the focus ring when the button receives keyboard focus.
2. **Icon**: The star vector inside the container. It changes between an unfilled (not favourited) and a filled (favourited) appearance to communicate the current toggle state.

### States

Each interaction state applies to both favourited and not favourited.

#### Not favourited  (Selected = False)

| **State** | **Description** |
| :--- | --- |
| | **Default** The button's resting state when the item has not been saved. Shows the outline icon. |
| | **Focus** Triggered when the button receives keyboard focus. A 2px focus ring shows around the button. |
| | **Hover** Triggered when the pointer moves over the button. The background changes. |
| | **Pressed** Triggered while the user holds the pointer down. Confirms the action is being activated. The background changes. |
| | **Disabled** Use when the favourite action is not available. The icon is dimmed. |

#### Favourited  (Selected = True)

| **State** | **Description** |
| :--- | --- |
| | **Default** The button's resting state when the item has been saved. Shows the filled icon. |
| | **Focus** Triggered when the favourited button receives keyboard focus. A 2px focus ring shows around the button. |
| | **Hover** Triggered when the pointer moves over a favourited button. The icon changes colour to signal it can be toggled off. |
| | **Pressed** Triggered while the user holds the pointer down on a favourited button. Confirms the removal action is being activated. The background changes. |
| | **Disabled** Use when a favourited item cannot be changed. The filled icon is dimmed. |

### Behaviour

* The button toggles between favourited and not favourited on each click or activation.
* Use a pointer cursor on hover.
* Use a not-allowed cursor when disabled.
* The focus ring must be visible at all viewport sizes.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | MUST use the filled icon to show an item is already favourited. |
| Don't | | | MUST NOT leave the icon in the same state whether or not the item is saved. People can't tell if their action worked. |

### Responsive behaviour

* The button size stays fixed across breakpoints. No layout changes are needed.
