---
component: Pagination
slug: pagination
package: "@moodlehq/design-system@5.4.0"
status: Ready
source: https://design.moodle.com/98292f05f/v/latest/p/285b13-pagination
import: @moodlehq/design-system/components/pagination
types: dist/components/pagination/index.d.ts
---

# Pagination

Lets users navigate between pages of content by showing their current position and providing controls to move forward, backward, or to a specific page.

## Accessibility

- Keyboard:
  - `Tab`: Moves focus to the next interactive page item
  - `Shift + Tab`: Moves focus to the previous interactive page item
  - `Enter`: Activates the focused page item
  - `Space`: Activates the focused page item (anchor fallback)
- Role: Not documented
- Required attributes: Not documented
- Announced:
  - Screen readers announce navigation and page selection through native button semantics plus `aria-current="page"` on the active page.
  - If your product requires explicit verbal feedback like “Page changed to 4,” add an app-level live region message in the consuming context.
- Focus: Not documented

## Built from

Generated from the component source and CSS, not from ZeroHeight.

- MDS components: none

- Semantic tokens: `--mds-bg-interactive-primary-active`, `--mds-bg-interactive-primary-default`, `--mds-bg-interactive-primary-hover`, `--mds-bg-interactive-secondary-active`, `--mds-bg-interactive-secondary-hover`, `--mds-border-interactive-secondary-default`, `--mds-border-radius-xs`, `--mds-focus-default`, `--mds-icons-sm`, `--mds-line-height-paragraph-xs`, `--mds-spacing-offset`, `--mds-spacing-xs`, `--mds-spacing-xxs`, `--mds-stroke-weight-md`, `--mds-stroke-weight-sm`, `--mds-text-default`, `--mds-text-inverse`, `--mds-text-muted`

## Usage

### Overview

Pagination enables users to navigate between content pages, dividing large between pages of content, breaking large sets of content into discrete pages, showing where users are within this set and giving them controls to move to a specific page, or step forward and backward through the sequence. 

Pagination always shows previous and next controls, and optionally shows numbered page items and ellipsis truncation when the total page count exceeds the visible range.

### When to use

* Use when content is split across a finite, known number of pages.
* Use when users may want to jump to a specific page — not just move sequentially.
* Use when the total page count is 2 or more.

#### ❌ When not to use

* Don't use for infinite scroll or load-more patterns — pagination implies a known, finite set.
* Don't use when there's only 1 page of content.
* Don't use as a step-by-step navigation indicator — use a stepper or progress indicator instead.

### Variants

#### Style

| **Variant** | **When to use** |
| :--- | :--- |
| | **Default** Full pagination bar — previous, page numbers, ellipsis, next. Use this when the total number of pages is known and the user needs to navigate to specific pages. |
| | **Grouped** Previous and Next buttons as a single unit, without page numbers. Use in compact layouts where there isn't room for the full navigation bar—for example, a pagination bar within a table or feed. |

### Guidelines

#### Ellipsis truncation

* The pagination bar shows a maximum of 9 items between the previous and next controls, including page link items, the current page item, and ellipsis items.

* When the total number of pages is 8 or fewer, all pages are shown without truncation.

* When the total number of pages is 9 or more, ellipsis truncation applies:
    * **Near the start** — show the first 7 pages, one ellipsis, and the last page.
    * **In the middle** — show the first page, one ellipsis, 2 pages before the current page, the current page, 2 pages after, one ellipsis, and the last page.
    * **Near the end** — show the first page, one ellipsis, and the last 7 pages.
* Don't show ellipsis when all pages fit within 8 items.

#### Previous and next controls

* Previous and next must always be present, regardless of total page count or current page position. Disable them — don't hide them — when there are no more pages in that direction.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Keep the previous button visible but disabled on the first page. |
| Don't | | | Don't hide the previous or next button at the ends of the range. |

#### Current page

* Mark exactly 1 page item as active at a time. The active item always reflects the page the user is currently viewing — not a selection or a hover state.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Mark exactly one page item as the current page at a time. |
| Don't | | | Don't show more than one current page item simultaneously. |

#### Content design

##### Content structure and constraints

* Previous and next labels are always visually hidden — only the icon is visible. Screen-reader text must say "Previous page" and "Next page" respectively.
* Page number labels are integers only. Don't add ordinal suffixes (no "1st", "2nd").
* Ellipsis renders as the horizontal ellipsis character (…), not 3 separate full stops.

##### Content behaviour

* When total pages change dynamically (e.g. after filtering), update the pagination accordingly. Don't keep the old page count visible.
* If the current page becomes out of range (e.g. after filtering reduces total pages), navigate to the last available page automatically.

##### Copywriting

* Screen-reader label for the nav container: "Pagination" — keep it short and unambiguous.
* Screen-reader text for page number items: "Page [n]" (e.g. "Page 1", "Page 4").
* Don't include "Go to" — it's verbose and redundant.

#### Layout and spacing

* Pagination items are separated by 4px
* Pagination doesn't set its own width. It wraps to the content width of its items.

#### Breakpoints and responsive behaviour

* Pagination truncates and hides items based on viewport width and ellipsis logic applied to total page count. 

* In narrow containers, the number of page link items between the ellipsis and the current page is reduced on both sides to fit the available width, ensuring the Previous and Next controls, first and/or last page items, ellipsis items, and current page item remain visible.
    * At viewports of 576px and above, the full 9-item bar is shown.
    * Below 576px, page link items around the current page are reduced to prevent line wrapping.
* On mobile (< 576px), consider showing the grouped (prev/next only) style if space is too limited for numbered items.

#### Interaction behaviour

* Minimum tap target for page items: 36x36px.

#### Accessibility guidelines

##### Colour and contrast

* All state colour combinations meet WCAG AA (4.5:1 minimum for text). 
* Don't use colour alone to indicate the active page — the aria-current="page" attribute communicates current position to screen readers independently of visual styling.

##### Focus

* All interactive page items (numbers, previous, next) must be reachable via Tab and show a visible focus ring. The focus ring uses a 2px border in focus.default with a 1px offset from the item edge.
* Disabled items must not receive keyboard focus — set tabindex="-1" on the anchor element.
* Ellipsis items are non-interactive and must not appear in the tab order.

##### Labelling

* The <nav> element must have aria-label="Pagination" so screen readers can identify it as a distinct landmark.
* The active page item must have aria-current="page" on its anchor element.
* Previous and next icons are decorative — set aria-hidden="true" on the SVG. Provide visually-hidden text on the anchor for screen readers.

## Design

### Anatomy

1. **Previous button** — a directional control that moves the user to the preceding page. Always present. Shown in the disabled state when the user is on the first page.
2. **Page link item** — a numbered item the user can click to navigate directly to that page.
3. **Current page item** — the numbered item that represents the page the user is currently on. Always exactly one current page item in the bar.
4. **Ellipsis item** — a non-interactive item that indicates truncated pages. Appears when the total number of pages exceeds the visible range.
5. **Next button** — a directional control that moves the user to the following page. Always present. Shown in the disabled state when the user is on the last page.

6. **Grouped previous / next buttons** — a style variant of the previous and next buttons used in minimal paging contexts where no page numbers are shown. 

### States

#### Page link item

| **State** | **Styles and tokens** |
| --- | --- |
| | **Default** The item is available and can be navigated to. This is the base state for all page items that aren't the current page. Label: . |
| | **Hover** The cursor is over the item. Page item: . Label: . |
| | **Focus** The item has received keyboard focus. A visible focus ring appears around the item. Page item: . Label: . |
| | **Pressed** The item is being actively clicked or tapped. Page item: . Label: . |
| | **Disabled** The item can't be interacted with and is removed from the tab order. Only applied to ellipsis or truncation items. Page link items don't use the disabled state — if a page isn't available, remove it from the bar entirely. Label: . |

#### Current page item

| **State** | **Styles and tokens** |
| --- | --- |
| | **Default** Identifies the page the user is currently viewing. There's always exactly one current page item in the bar. Page item:. Label: . |
| | **Hover** The cursor is over the current page item. The item remains visually distinct as the current page. Page item: . Label: . |
| | **Focus** The current page item has received keyboard focus. The focus ring appears on top of the active background. Page item: . Label: . |
| | **Pressed** The current page item is being actively clicked or tapped. Page item: . Label: . |

#### Previous and next buttons

| **States** | **Styles and tokens** |
| --- | --- |
| | **Default** The control is available. Clicking or tapping moves the user one page in the corresponding direction. Icon: . |
| | **Hover** The cursor is over the control. Page item: . Icon . |
| | **Focus** The control has received keyboard focus. A visible focus ring appears around the item. Page item: . Icon:. |
| | **Pressed** The control is being actively clicked or tapped. Page item: . Icon: . |
| | **Disabled** Applied to the previous button on the first page, and to the next button on the last page. The control is visible but can't be interacted with and is removed from the tab order. Don't hide the control — keeping it visible communicates the boundary of the pagination range. Icon: . |

#### Grouped previous and next buttons

| **States** | **Styles and tokens** |
| --- | --- |
| | **Default** Both controls are available. Clicking or tapping either moves the user one page in the corresponding direction. Page item: . |
| | **Hover** Only the hovered control changes state — the other remains in its current state. Page item: . Icon: . |
| | **Focus** The focus ring appears on the focused control individually. Page item: . Icon: . |
| | **Pressed** Only the pressed control changes state. Page item: . Icon: . |
| | **Disabled** Applied to the previous button on the first page, and to the next button on the last page. The disabled control renders with muted styles; the other control remains in its default state. Page item: . Icon: . |

## Code

### Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-pagination--default)

### Accessibility implementation

#### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus to the next interactive page item |
| `Shift + Tab` | Moves focus to the previous interactive page item |
| `Enter` | Activates the focused page item |
| `Space` | Activates the focused page item (anchor fallback) |

#### ARIA

| **Attribute** | **Element** | **Value** | **Notes** |
| --- | --- | --- | --- |
| `aria-label` | `<nav>` | `"Pagination"` | Identifies the nav landmark |
| `aria-current` | `<a>` (active item) | `"page"` | Applied to the current page item only |
| `aria-disabled` | `<li>` (disabled item) | `"true"` | Applied to disabled prev/next <li> |
| `aria-hidden` | `<svg>` (icon) | `"true"` | Hides decorative icons from screen readers |
| `tabindex` | `<a>` (disabled item) | `"-1"` | Removes disabled items from tab order |

#### Dynamic announcements

* Screen readers announce navigation and page selection through native button semantics plus `aria-current="page"` on the active page.
* If your product requires explicit verbal feedback like “Page changed to 4,” add an app-level live region message in the consuming context.
