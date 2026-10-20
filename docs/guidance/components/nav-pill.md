---
component: Nav pill
slug: nav-pill
package: "@moodlehq/design-system@5.4.0"
status: Ready
source: https://design.moodle.com/98292f05f/v/latest/p/981bd1-nav-pill
import: @moodlehq/design-system/components/nav-pill
types: dist/components/nav-pill/index.d.ts
---

# Nav pill

A navigation link that lets users move between pages or sections within a nav bar.

## Look-alikes

Button

Use instead: Button; Tabs.

## Accessibility

- Keyboard:
  - `Tab`: Moves focus into the nav bar as a single tab stop
  - `←` `→`: Navigates between items within the nav bar
  - `Tab` (again): Moves focus out of the nav bar to the next interactive element
  - `Enter`: Activates the focused nav pill link
- Role:
  - Nav Pill is a native link.
- Required attributes:
  - `href` is required. `label` is required and provides the visible accessible name.
- Announced:
  - Screen readers announce state using native link semantics plus `aria-current` for the active item.
  - Disabled state is announced through `aria-disabled` when applicable.
- Focus: Not documented

## Built from

Generated from the component source and CSS, not from ZeroHeight.

- MDS components: none

- Semantic tokens: `--mds-bg-interactive-primary-default`, `--mds-border-radius-md`, `--mds-border-radius-pill`, `--mds-focus-default`, `--mds-font-family-base`, `--mds-font-size-paragraph-small`, `--mds-font-weight-medium`, `--mds-line-height-paragraph-xs`, `--mds-spacing-offset`, `--mds-spacing-sm`, `--mds-spacing-xs`, `--mds-spacing-xxs`, `--mds-stroke-weight-md`, `--mds-text-default`, `--mds-text-muted`, `--mds-text-subtle`

## Usage

### Overview

Nav pill is the individual link item used within a horizontal navigation bar. It represents a single destination, displaying a label and, when selected, a dot indicator that marks the current page. The component is scoped to the single item; grouping, layout, and overflow behaviour are handled at the implementation layer.

### When to use

* Use within a horizontal nav bar when users need to move between distinct pages or sections, for example, course navigation or site administration sections.
* Use the Selected state to mark the current page. Don't replicate this visually with custom styling; always rely on the component state.
* Use when the navigation destinations each correspond to a distinct URL.

#### ❌ When not to use

* Don't use to trigger in-page behaviour without a URL change — use a Button instead.
* Don't use for tab switching between content panels on the same page — use the Tabs component instead.
* Don't use nav pill in isolation. It's designed to be used within a `nav-bar`

### Guidelines

#### Content design

##### **Content structure and constraints**

* Labels should be short and descriptive, ideally 1–3 words.
* Use clear, destination-oriented language. The label should name the page or section the user will land on.
* Don't use verbs. Nav pill labels are destinations, not actions.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Keep labels to 1–3 words. |
| Don't | | | Don't use full sentences or verb phrases as labels. |

#### Layout and spacing

* Nav pills in a group are arranged horizontally, in a single row.
* Each item's width is determined by its label length — don't apply fixed widths.
* Don't stack nav pills vertically — use a different navigation pattern for vertical navigation.
* When the group overflows the available width, hidden items move to a "More" overflow menu. This behaviour is handled at the implementation layer, not by the Nav Pill component itself.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Let each item's width follow its label length. |
| Don't | | | Don't apply equal or fixed widths to all items. |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Arrange nav pills in a single horizontal row. |
| Don't | | | Don't stack nav pills vertically; use a different navigation pattern instead. |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Left-align the nav pill group within its container. |
| Don't | | | Don't stretch or distribute nav pills to fill the full container width. |

#### Breakpoints and responsive behaviour

* The component's size and styling remain consistent across all breakpoints.
* On narrow viewports, the number of visible items is controlled by the implementing nav bar pattern — the component itself has no responsive override.

#### Interaction behaviour 

* Clicking or tapping a nav pill navigates to the linked page. The component doesn't toggle the Selected state — the selected item is set by the application based on the current page URL.
* The Selected state is always determined programmatically. Don't apply it manually in design mockups unless you're accurately representing the current page.
* **Cursor:** pointer on hover; not-allowed when disabled.
* **Keyboard:** the nav bar behaves as a single tab stop. Tab moves focus into and out of the group as a unit. Arrow keys navigate between items within the group. This is intentional — don't design interactions that assume Tab will step through each item individually.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Represent only one item as Selected per nav bar — the current page. |
| Don't | | | Don't show multiple items in the Selected state simultaneously. |

#### Accessibility guidelines

##### **Colour and contrast**

* The selected indicator (dot) alone must not be the only signal for the current page — `aria-current="page"` must also be applied on the selected item.
* Disabled state contrast is intentionally reduced. Don't rely on the disabled state to communicate unavailability to screen reader users — supplement with `aria-disabled`.

##### **Focus**

* The focus ring must remain visible on all background colours used in the nav bar.
* The Selected + Focus state must be visually distinct from the Selected state — don't remove the focus ring on selected items.

##### **Labelling**

* Every nav pill must have a visible text label. Icon-only nav pills are not supported by this component.

### Related

##### **Alternatives**

* Button — use when the action triggers an in-page behaviour without navigation.

##### **Used with**

* Dropdown — the "More" overflow mechanism uses a Dropdown component to house hidden nav items. These are separate components; the Nav Pill component itself does not include dropdown behaviour.

## Design

### Anatomy

1. **Container**. the bounding shape of the item. Transparent at rest; fills when hovered, pressed, or selected.
2. **Label**. the text that identifies the destination. Always required.
3. **Selected indicator.** *(Selected state only)* A dot that appears to the left of the label when the item is the current page.

### States

| **States** | **Styles and tokens** |
| :--- | --- |
| | **Default**The resting state. No interaction has occurred. Label: . Container: . |
| | **Hover**Triggered when the cursor moves over the item. Don't suppress this state — users rely on it to identify interactive elements. Label: . Container: . |
| | **Focus**Triggered via keyboard navigation. Must remain visible on all backgrounds used in the nav bar. Label: . Container: . |
| | **Pressed**Triggered while the item is being clicked or tapped. Transitions away immediately on release. Label: . Container: . |
| | **Disabled**Applied when the destination is unavailable in the current context. Disabled items are removed from the keyboard tab order. Use sparingly — if a destination is permanently unavailable to a user, consider hiding the item entirely. Label: . Container: . |
| | **Selected**Applied to the item that represents the current page. Set programmatically via `aria-current="page"` — don't apply this state manually in design. Label: . Container: . |
| | **Selected + Focus**Triggered via keyboard navigation when focus lands on the current page item. Required — don't suppress the focus ring on selected items. Label: . Container: . |

## Code

### Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-navpill--default)

### Accessibility implementation

#### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus into the nav bar as a single tab stop |
| `←` `→` | Navigates between items within the nav bar |
| `Tab` (again) | Moves focus out of the nav bar to the next interactive element |
| `Enter` | Activates the focused nav pill link |

#### ARIA

* Role:
    * Nav Pill is a native link.
* Required attributes:
    * `href` is required.
    * `label` is required and provides the visible accessible name.
* Optional attributes:
    * `aria-current="page"` is applied automatically when selected is true.
    * `aria-disabled="true"` is applied automatically when disabled is true.
    * When disabled, keyboard focus is removed with tabindex -1 and link interaction is blocked.
    * If selected and disabled are both set, disabled is ignored so the current page item remains an active, identifiable link.

#### Dynamic announcements

* Screen readers announce state using native link semantics plus `aria-current` for the active item.
* Disabled state is announced through `aria-disabled` when applicable.
