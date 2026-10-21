---
component: Breadcrumb
slug: breadcrumb
package: "@moodlehq/design-system@5.4.0"
status: Ready
source: https://design.moodle.com/98292f05f/v/latest/p/89e46c-breadcrumb
import: @moodlehq/design-system/components/breadcrumb
types: dist/components/breadcrumb/index.d.ts
---

<!-- Generated from ZeroHeight by npm run build-guidance. Do not edit. -->

# Breadcrumb

A horizontal trail of links showing where the current page sits in the hierarchy.

## Look-alikes

Pagination · Link

Use instead: tabs; pagination.

## Accessibility

- Keyboard:
  - `Tab`: Moves focus to the next link item or the overflow menu trigger.
  - `Shift + Tab`: Moves focus to the previous link item or the overflow menu trigger.
  - `Enter` or `Space`: Activates the focused link, or opens the overflow menu dropdown.
  - `Escape`: Closes the overflow menu dropdown if it's open.
- Role:
  - Navigation
- Required attributes:
  - `aria-label="Breadcrumb"` on the container `aria-current="page"` on the current (last) item
- Announced: Not documented
- Focus: Not documented

## Built from

Generated from the component source and CSS, not from ZeroHeight.

- MDS components: dropdown, link, tooltip

- Semantic tokens: `--mds-focus-default`, `--mds-font-family-base`, `--mds-font-size-paragraph-default`, `--mds-font-weight-regular`, `--mds-letter-spacing-default`, `--mds-line-height-paragraph-default`, `--mds-line-height-paragraph-xs`, `--mds-spacing-xs`, `--mds-stroke-weight-md`, `--mds-text-link-primary-default`, `--mds-text-link-primary-hover`, `--mds-text-muted`, `--mds-text-subtle`

## Usage

### Overview

Breadcrumb lets a user see the path from the top level down to the current page, and jump back to any page in between in a single click, instead of navigating back one level at a time. Use it on any page that sits two or more levels deep.

### When to use

* Use when a page sits inside a hierarchy of 2 or more levels and the user needs to see and jump back to parent pages.
* Use to show the user's current location within a section, course, or content structure.
* Use instead of tabs or pagination when the relationship between pages is hierarchical, not sequential or parallel.

#### **❌ When not to use**

* Don't use this for top-level navigation between unrelated sections, use tabs instead.
* Don't use this for moving between pages in a sequence, use pagination instead.
* Don't use this on a page with only one level of hierarchy. There's nothing to show.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD use breadcrumb for parent and child pages in a real hierarchy. |
| Don't | | | MUST NOT use breadcrumb to switch between unrelated top-level sections. |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD use breadcrumb on pages that sit 2 or more levels deep. |
| Don't | | | SHOULD NOT use it on a top-level page with no ancestors, like a course page. |

### Variants

#### Items

There’s no prop for this. It’s the number of entries in the `items` array. The overflow menu shows on its own when there are more than 4.

This property controls how many breadcrumb items show in the trail.

| **Variant** | **When to use** |
| :--- | :--- |
| | **2** Use when the page sits one level below the top. |
| | **3** Use when the page sits two levels below the top. |
| | **4** Use when the page sits three levels below the top. |
| | **More than 4** Use when the page sits more than four levels below the top. Shows the first item, the overflow menu, and the 2 ancestor pages closest to the current page. The overflow menu always shows for this variant. |

#### Truncation width

There’s no prop for this in the React component. Link items shrink and truncate on their own to fit the space.

This property controls how narrow every link item's label can get before it truncates with an ellipsis. It doesn't affect the current (last) item, which always stretches to fill the remaining space and only truncates if there's truly no room.

| **Variant** | **When to use** |
| :--- | :--- |
| | **None** Use for the default trail width. Link items keep their natural width and don't truncate. |
| | **xl** Caps link items to 200px. |
| | **lg** Caps link items to 160px. |
| | **md** Caps link items to 120px. |
| | **sm** Caps link items to 80px. |
| | **xs** Caps link items to 40px. |

### Guidelines

#### Content design

##### Content structure and constraints

* Each item needs a short label, ideally one to three words.
* The current (last) item's label truncates with an ellipsis if it's too long to fit the available width. This is always on, no matter the "Truncation width" setting. Link items keep their natural width and don't truncate unless "Truncation width" is set to xs, sm, md, lg, or xl.
* Keep ancestor labels short so the trail doesn't run out of horizontal space.
* There's no defined maximum for the number of ancestor items shown in the overflow dropdown.

##### Content behaviour

* Breadcrumb is designed to never wrap to a second line, at any width. When the combined width of all the items is more than the available space, increase the "Truncation width" setting so link items shrink and truncate with an ellipsis. Show a tooltip with the full label on hover or on keyboard focus for any truncated item.
* If there are more than 4 levels in the hierarchy, use the "More than 4" items variant. It collapses the hidden ancestor pages into the overflow menu automatically.
* The last item never links anywhere, even if its label matches an earlier item's label.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD turn on truncation when the trail doesn't fit, and show a tooltip on hover or keyboard focus. |
| Don't | | | SHOULD NOT let the trail wrap onto a second line. |

##### Copywriting

* Use the actual page title as the label, not a shortened or renamed version, so the trail matches what the user expects.
* Use sentence case for labels, matching the page title.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD let long ancestor labels truncate with an ellipsis. |
| Don't | | | SHOULD NOT abbreviate or rename a label by hand to make it fit. |

#### Layout and spacing

* Place the breadcrumb trail above the page title, left aligned with the main content column.
* Don't stack more than one breadcrumb trail on a single page.

#### Breakpoints and responsive behaviour

* The trail doesn't wrap to a second line, and link items keep their natural width unless "Truncation width" is set, so a full trail is more likely to run out of room on a narrow viewport than on desktop.

#### Truncation width strategy

The goal at every breakpoint is to show as much of each label as possible, including the current page. Only cap a label's width when there's genuinely no room to show it in full.

* The current (last) item is not affected by "Truncation width". When there's enough room, it shows its full label just like the ancestor items do, at whatever width that content needs. It only truncates once space genuinely runs out. 
* Breadcrumb never wraps to a second line but watch for the trail exceeding the available width. For ancestor link items, start with "Truncation width" set to None. If the whole trail fits within the available width at that breakpoint, leave it there. This shows every label in full.
* If the trail doesn't fit, step down the scale one size at a time (XL 200px, then LG 160px, then MD 120px, then SM 80px, then XS 40px), and use the largest size that still keeps the trail within the available width. Don't jump straight to the smallest option.
* Check this at every breakpoint you design for, since the number of items and the available width both change how much room each label has. A width that fits on desktop may need to drop a size or two on a narrow viewport.
* These six widths are fixed pixel values in the Figma file, not a formula. The real implementation in code should use a fluid cap that recalculates based on the actual space available at render time.

#### Interaction behaviour

* Link items and the overflow menu are clickable. The current item is not.
* The overflow menu opens a dropdown listing the hidden ancestor pages. Clicking outside the dropdown closes it.
* Touch target size and the open and close animation follow the base Link and Dropdown component patterns.

#### Accessibility guidelines

##### Colour and contrast

* The link colour `--mds-text-link-primary-default` must meet WCAG AA contrast against the background it sits on.
* Don't rely on colour alone to separate the current item from link items. The current item's distinct styling, like bold text and no link interaction states, also signals that it isn't a link.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | MUST show the current page as plain text. |
| Don't | | | MUST NOT style the current page as a link. |

##### Focus

* Focus should move through link items and the overflow menu in trail order, left to right. The current item is not focusable because it isn't interactive.

##### Labelling

* Wrap the whole trail in a landmark with an accessible label such as "Breadcrumb", so screen reader users can identify it as navigation.

## Design

### Anatomy

1. **Breadcrumb item (link):** A text link. It represents a page above the current page and takes the user there when clicked.
2. **Breadcrumb item (current):** Bold, plain text, not a link. It represents the page the user is on now and does not trigger navigation.
3. **Separator:** A forward slash character. It sits between two items and shows the order of the hierarchy.
4. **Overflow menu:** An ellipsis ("...") styled as a link. It only appears on the "More than 4" items variant, right after the first item, and opens a dropdown of the ancestor pages hidden between the first item and the pages closest to the current page.

**Note:** In code, the separator should be CSS-only (for example, a ::before on each item), not a real element in the DOM. It's shown in Figma as a real Separator instance for design purposes only. Because it isn't in the DOM, screen readers won't announce it.

### States

Breadcrumb link items are built from the Link component. Hover, pressed, focus, and disabled behaviour for link items come from the Link component, not from breadcrumb itself. The current item and separators are not interactive, so they don't have these states.

| **States** | **Description** |
| :--- | :--- |
| | **Default (link item)** This is the resting state for a breadcrumb item that links to a page above the current one. Shown as a link in `--mds-text-link-primary-default`, followed by a separator in `--mds-text-muted`. |
| | **Default (current item)** This is the last item in the trail. It shows the page the user is on now and is not a link. Shown as plain text in `--mds-text-subtle`. |

## Code

### Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-breadcrumb--default)

Props and types (TypeScript API): [Breadcrumb.d.ts](https://unpkg.com/@moodlehq/design-system@5.4.0/dist/components/breadcrumb/Breadcrumb.d.ts)

Full list of props and their types for Breadcrumb.

### Accessibility implementation

#### Keyboard interaction

This component has no keyboard interaction of its own. It responds to the focus state of its trigger element.

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus to the next link item or the overflow menu trigger. |
| `Shift + Tab` | Moves focus to the previous link item or the overflow menu trigger. |
| `Enter` or `Space` | Activates the focused link, or opens the overflow menu dropdown. |
| `Escape` | Closes the overflow menu dropdown if it's open. |

#### ARIA

* Role: Navigation
* Required attributes: 
    * `aria-label="Breadcrumb"` on the container
    * `aria-current="page"` on the current (last) item
* Optional attributes:
    * `aria-expanded` on the overflow menu trigger, to show whether the dropdown is open
    * `aria-haspopup="menu"` on the overflow menu trigger
