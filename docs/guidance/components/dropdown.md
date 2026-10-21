---
component: Dropdown
slug: dropdown
package: "@moodlehq/design-system@5.5.0"
status: Ready
source: https://design.moodle.com/98292f05f/v/latest/p/8381b3-dropdown
import: @moodlehq/design-system/components/dropdown
types: dist/components/dropdown/index.d.ts
---

<!-- Generated from ZeroHeight by npm run build-guidance. Do not edit. -->

# Dropdown

A button that opens a menu of actions, selections, or navigation options.

## Look-alikes

Combobox · Select · Button

## Accessibility

- Keyboard:
  - `Tab`: Moves focus to the trigger. When the menu is open, moves focus out of the menu and closes it
  - `Enter` / `Space`: On the trigger: opens the menu and moves focus to the first item. On an item: activates it
  - `Arrow Down`: On the trigger: opens the menu and focuses the first item. In the menu: moves focus to the next item, skipping headers and dividers
  - `Arrow Up`: Moves focus to the previous item, skipping headers and dividers
  - `Home` / `End`: Moves focus to the first / last item in the menu
  - `Escape`: Closes the menu and returns focus to the trigger
  - `Arrow Right`: On an expandable item: opens the submenu and focuses its first item
  - `Arrow Left`: In a submenu: closes it and returns focus to the parent item
- Role: Not documented
- Required attributes:
  - Icon-only triggers must provide an accessible name via `aria-label` or `aria-labelledby`. Disabled items expose `aria-disabled="true"` and suppress pointer events. They remain in the accessibility tree so the menu structure is preserved.
- Announced:
  - Open/close state is announced through `aria-expanded` on the trigger.
  - Selection changes are announced through `aria-checked` on the item.
  - If activating an action produces an off-screen result (e.g. "Course duplicated"), announce it via an app-level live region in the consuming experience.GitHub
- Focus: Not documented

## Built from

Generated from the component source and CSS, not from ZeroHeight.

- MDS components: button, checkbox

- Semantic tokens: `--mds-bg-interactive-danger-default-light`, `--mds-bg-interactive-primary-default-light`, `--mds-bg-interactive-secondary-active`, `--mds-bg-surface-default`, `--mds-bg-surface-subtle`, `--mds-border-default`, `--mds-border-interactive-secondary-active`, `--mds-border-radius-md`, `--mds-border-radius-pill`, `--mds-border-radius-xs`, `--mds-focus-danger`, `--mds-focus-default`, `--mds-font-family-base`, `--mds-font-size-paragraph-default`, `--mds-font-size-paragraph-small`, `--mds-font-weight-medium`, `--mds-font-weight-regular`, `--mds-icons-md`, `--mds-icons-xs`, `--mds-icons-xxs`, `--mds-line-height-paragraph-default`, `--mds-line-height-paragraph-small`, `--mds-line-height-paragraph-xs`, `--mds-spacing-offset`, `--mds-spacing-sm`, `--mds-spacing-xs`, `--mds-spacing-xxs`, `--mds-stroke-weight-md`, `--mds-stroke-weight-sm`, `--mds-text-danger`, `--mds-text-danger-disabled`, `--mds-text-inverse`, `--mds-text-link-primary-default`, `--mds-text-muted`, `--mds-text-subtle`

## Usage

### Overview

Dropdowns tuck a set of related actions or options behind a single trigger, reducing visual clutter by hiding choices until they're needed. The trigger stays visible and inline; the menu appears on demand and closes when a choice is made or focus moves away.

#### When to use

* Use when a set of related actions needs to be grouped behind one control. For example, the overflow actions on a course card or activity.
* Use when the user selects one value from a list and the current value should be reflected on the trigger. For example, a sort or filter control that changes the view and isn't saved with a form.
* Use when the user toggles multiple options that apply together, use multi-select items so the menu stays open between toggles.
* Use in navigation bars via the nav.pill trigger variant when a nav entry expands into sub-destinations.

#### ❌ When not to use

* Don't use a dropdown for choosing a value inside a form, use a [Select](https://design.moodle.com/98292f05f/p/013ac0) instead, which provides field semantics, validation, and native mobile behaviour, or a [Combobox](https://design.moodle.com/98292f05f/p/37396a) when the list needs typing to filter or people pick several values.
* Don't use a dropdown for two to three always-relevant actions. Surface them as buttons instead. Hiding a small number of frequent actions adds a click for no benefit.
* Don't use a dropdown to hide the primary action of a view. The main call to action should always be visible.
* Don't nest more than one level of expandable submenu, deep nesting is hard to operate with a pointer and harder with a keyboard.

### Variants

#### Trigger type

Set with the `variant` prop. If you leave it out, you get `button`.

| **Variant** | **When to use** |
| :--- | --- |
| | **Button (default)** The standard trigger for forms, toolbars, and content areas. Supports all appearances, sizes, and icon configurations. |
| | **Nav pill (`nav-pill`)** For dropdowns inside navigation bars or pill-style nav structures. Fixed to the default appearance and md size. |

#### Trigger appearance

Set with the `appearance` prop. If you leave it out, you get `default`.

Applies to the button trigger only.

| **Variant** | **When to use** |
| :--- | --- |
| | **Emphasis** When the dropdown is the primary control in its context and needs clear visual prominence. |
| | **Default** The standard appearance for most contexts. |
| | **Subtle** Low-emphasis contexts where the trigger shouldn't compete visually: toolbars, card corners, table rows. |

#### Trigger size

Set with the `size` prop. If you leave it out, you get `md`.

| **Variant** | **When to use** |
| :--- | --- |
| | **Medium (`md`, default)** The standard size for most interface contexts. |
| | **Small (`sm`)** Dense layouts such as tables, inline filters, or compact toolbars. |

#### Trigger icon

Set with `startIcon`. Add `iconOnly` to hide the label.

| **Variant** | **When to use** |
| :--- | --- |
| | **None (default)** Label and chevron only. The default configuration. |
| | **`startIcon`** A leading icon that reinforces the trigger's purpose. Use only when it adds meaning, not decoration. |
| | **Icon only (`iconOnly` with `startIcon`)** Space-constrained contexts such as overflow ("kebab") menus. The chevron is omitted; an `aria-label` is required. |

#### Item types

Each item type is its own component. Put them inside the `Dropdown`.

| **Variant** | **When to use** |
| :--- | --- |
| | **Action (`DropdownItemAction`)** Performs an action when chosen and closes the menu. It can either fire a command (rendered as a `<button>`) or navigate to another page (rendered as an `<a>` link), for example, a 'More' menu linking to related pages. Use the danger variant for destructive actions such as delete or remove. |
| | **Selectable (`DropdownItemSelect`)** Single-choice lists. The trailing check communicates the current selection; choosing an item closes the menu. |
| | **Multi-select (`DropdownItemMultiselect`)** Multi-choice lists using an embedded Checkbox. Toggling an item keeps the menu open. |
| | **Expandable (`DropdownItemExpandable`)** Reveals a nested submenu via a trailing chevron. Use sparingly and only one level deep. |
| | **Header (`DropdownItemHeader`)** A non-interactive label that names a group of items, for example "Recent" or "Actions". |
| | **Divider (`DropdownItemDivider`)** A horizontal rule separating groups. Pair with headers for structured menus. |
| *Example of a custom slot.* | **Custom (`DropdownItemCustom`)** A slot for bespoke item layouts not covered by the other types. Use as a last resort. Prefer the standard types to keep menus consistent. |
| | **List** (`DropdownItemList`, with `variant` set to `todo` or `done`. It isn't exported from the package root, so import it from `@moodlehq/design-system/components/dropdown`) A list item component used within dropdown menus to represent a task or option with a completion state indicator. It has two variants representing a binary status: 'done' and 'to do'. |

### Guidelines

#### Content guidelines

##### Content structure and constraints

* Item labels support a single line of text. Avoid labels that wrap.
* Recommended item label length: 1–4 words.
* Use the description slot only when the label alone is insufficient, for secondary context such as a consequence or a subtitle, not for repeating the label.
* Item icons are optional and per-item. If most items in a group have icons, give all of them icons so labels stay aligned.
* Don't mix selectable and multi-select items in the same group. The interaction models conflict.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD keep item labels short and easy to scan. |
| Don't | | | SHOULD NOT use long labels that wrap to a second line. |

##### Copywriting 

* Use sentence case. Don't capitalise every word.
* Action items start with a verb: "Duplicate course", "Download report".
* Selectable items name the value, not the action: "Newest first", not "Sort by newest first" (put the shared context in the header or trigger label).
* Name destructive actions explicitly: "Delete forum", not "Remove".
* Headers are nouns naming the group: "Sort by", "Actions". No punctuation.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD use sentence case, with only the first word capitalised. |
| Don't | | | SHOULD NOT use title case or capitalise every word. |

#### Placement

* Order items by frequency of use, with the most common actions first.
* Place destructive (danger) actions last, separated from other items by a divider.
* Keep flat lists short; introduce a header and divider to group content once the menu grows past a handful of items. There's no hard limit, but if a menu gets very long, reconsider the pattern: a Select with search, a filter panel, or a dedicated page will serve users better than scrolling a long menu.
* The menu aligns to the leading edge of the trigger by default and flips alignment or direction when it would overflow the viewport.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | MUST separate the destructive action with a divider and place it last. |
| Don't | | | MUST NOT mix a danger action into the middle of the list. |

#### Accessibility guidelines

##### Colour and contrast

* Item labels meet 4.5:1 contrast against the menu surface, including the danger variant.
* Selection must not rely on colour alone. The check indicator (selectable) and checkbox (multi-select) carry the state.
* Disabled contrast is intentionally reduced; supplement with aria-disabled so the state reaches screen reader users.

##### Focus

* Focus is always visible on the trigger and on items while navigating with a keyboard.
* When the menu closes, focus returns to the trigger. Never drop focus to the document body.

##### Labelling

* Icon-only triggers require an aria-label describing the menu's purpose ("Course actions"), not the icon ("Three dots").
* Headers label their group programmatically, not just visually, so screen reader users hear the grouping.

## Code

### Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-dropdown-dropdown--default)

Props and types (TypeScript API): [Dropdown.d.ts](https://unpkg.com/@moodlehq/design-system@5.5.0/dist/components/dropdown/Dropdown.d.ts)

Full list of props and their types for Dropdown.

### Accessibility implementation

#### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus to the trigger. When the menu is open, moves focus out of the menu and closes it |
| `Enter` / `Space` | On the trigger: opens the menu and moves focus to the first item. On an item: activates it |
| `Arrow Down` | On the trigger: opens the menu and focuses the first item. In the menu: moves focus to the next item, skipping headers and dividers |
| `Arrow Up` | Moves focus to the previous item, skipping headers and dividers |
| `Home` / `End` | Moves focus to the first / last item in the menu |
| `Escape` | Closes the menu and returns focus to the trigger |
| `Arrow Right` | On an expandable item: opens the submenu and focuses its first item |
| `Arrow Left` | In a submenu: closes it and returns focus to the parent item |

#### ARIA

* Roles:
    * The trigger uses a native `button` element with `aria-haspopup="true"` and `aria-expanded` reflecting the open state.
    * The menu panel uses `role="menu"`; the trigger references it via `aria-controls`.
    * Action and expandable items use `role="menuitem"`. Expandable items also carry `aria-haspopup="true"` and `aria-expanded`.
    * Selectable (single-select) items use `role="menuitemradio"` with `aria-checked` driving the check indicator.
    * Multi-select items use `role="menuitemcheckbox"` with `aria-checked`.
    * Headers are non-focusable group labels (`role="presentation"` on the wrapper, or the group is labelled via `role="group"` + `aria-labelledby`).
    * Dividers use `role="separator"` and are removed from the tab order.
* Required attributes:
    * Icon-only triggers must provide an accessible name via `aria-label` or `aria-labelledby`.
    * Disabled items expose `aria-disabled="true"` and suppress pointer events. They remain in the accessibility tree so the menu structure is preserved.
* Optional attributes:
    * When a selection changes the trigger's label (e.g. a filter dropdown), keep the label text in the button's accessible name so the current value is announced.

#### Dynamic announcements

* Open/close state is announced through `aria-expanded` on the trigger.
* Selection changes are announced through `aria-checked` on the item.
* If activating an action produces an off-screen result (e.g. "Course duplicated"), announce it via an app-level live region in the consuming experience.GitHub

## Specs

### Anatomy

1. **Trigger**: the interactive control that opens and closes the menu. A chevron communicates the expand/collapse affordance. Always required.
2. **Menu**: the floating panel that contains all items. It has a border and rounded corners.
3. **Header** *(optional)*: a non-interactive label that groups related items.
4. **Divider** *(optional)*: a horizontal rule separating groups of items.
5. **Item**: a single row in the menu. Depending on the item type it contains a leading icon (optional), a label (required), a description (optional), and a trailing indicator (check, checkbox, or chevron).

### Sub-components

The Dropdown is composed from dedicated sub-components. The assembled Dropdown is the public API. Sub-components are consumed through it, not published for standalone use.

| | **Dropdown.trigger** The clickable affordance. Wraps the Button component (`variant="button"`) or the Nav pill component (`variant="nav-pill"`) and adds the chevron. |
| :--- | :--- |
| | **Dropdown.menu** The panel container. Stacks items with consistent spacing, surface, and border. |
| | **Dropdown.item** The generic wrapper for each row. Exposes seven types: header, divider, action, selectable, multi-select, expandable, and custom. |

### States

#### Trigger

The trigger is a wrapper: it renders the [Button](/877c50-button) component (`variant="button"`) or the [Nav pill](/981bd1-nav-pill) component (`variant="nav-pill"`) and adds the chevron. Its surface, label, and border tokens are **inherited** from whichever component it wraps.

Appearance maps to a Button token family: **emphasis → Secondary fill**, **default → Secondary outline**, **subtle → Ghost**. The nav.pill variant is fixed to the default appearance and md size.

##### Button.default

| | **Default** Resting, closed state. Transparent background with a border. |
| :--- | :--- |
| | **Hover** Cursor over the trigger. The button fills. |
| | **Active** Menu open. The button fills. |
| | **Disabled** Trigger unavailable. Transparent background with a muted border and label. |
| | **Focus** Keyboard navigation. A 2px focus ring shows around the button, offset from its edge. |

##### Button.emphasis

| | **Default** Resting, closed state. |
| :--- | :--- |
| | **Hover** Cursor over the trigger. The background changes. |
| | **Active** Menu open. The background changes and an inner border shows. |
| | **Disabled** Trigger unavailable. The background and label use their disabled colours. |
| | **Focus** Keyboard navigation. A 2px focus ring shows around the button, offset from its edge. |

##### Button.subtle

| | **Default** Resting, closed state. Transparent background. |
| :--- | :--- |
| | **Hover** Cursor over the trigger. The background changes. |
| | **Active** Menu open. The background changes and an inner border shows. |
| | **Disabled** Trigger unavailable. Transparent background with a muted label. |
| | **Focus** Keyboard navigation. A 2px focus ring shows around the button, offset from its edge. |

##### Nav.pill

| | **Default** Resting, closed state. Transparent background. |
| :--- | :--- |
| | **Hover** Cursor over the trigger. The background changes. |
| | **Active** Menu open. The background changes. |
| | **Disabled** Trigger unavailable. The label is muted. |
| | **Selected** When a subpage in the dropdown is selected. |
| | **Focus** Keyboard navigation. A 2px focus ring shows around the trigger, offset from its edge. |

#### Dropdown.item

The item is the generic row wrapper for everything inside the menu. It exposes seven types: **action**, **selectable**, **multi-select**, **expandable**, **custom**, **header**, and **divider**. The four interactive types (action, selectable, multi-select, expandable) share a base state model (default, hover, focus, disabled) with type-specific additions noted below. Header and divider are non-interactive; custom is a bespoke slot. Every item sits on the menu surface.

##### Action.default 

| | **Default** The item's resting state. Transparent row. |
| :--- | :--- |
| | **Hover** Triggered when the cursor moves over the item. The row fills with a light tint. |
| | **Disabled** Applied when the action is unavailable. Keep the item visible rather than removing it, to preserve menu structure. The label is muted. |
| | **Focus** Triggered via keyboard navigation. A 2px focus ring shows around the item, offset from its edge. |

##### Action.danger

| | **Default** The item's resting state. Transparent row with a danger-coloured label. |
| :--- | :--- |
| | **Hover** Triggered when the cursor moves over the item. The row fills with a light danger tint. |
| | **Disabled** Applied when the action is unavailable. Keep the item visible rather than removing it, to preserve menu structure. The label is muted. |
| | **Focus** Triggered via keyboard navigation. A 2px danger focus ring shows around the item, offset from its edge. |

##### Select item (single-select)

Follows the same state model as the action item (default, hover, focus, disabled) with one additional property:

| | **Selected** The trailing check indicator is visible, communicating the current choice at a glance. The row takes a subtle fill. |
| --- | --- |
| | **Unselected** The check indicator is hidden; the label alignment is preserved. Transparent row. |

##### Multi-select item

Wraps the [Checkbox](/12e8f6-checkbox) component. Refer to that page for checkbox state token detail. Supports default and hover states. Activating the item toggles the checkbox without closing the menu.

| | **Default** The item's resting state. Transparent row. The checkbox follows the Checkbox states. |
| --- | :--- |
| | **Hover** Triggered when the cursor moves over the item. The row fills with a light tint. |

##### Expandable item

Follows the action item state model (default, hover, disabled, focus) with a trailing chevron-right indicating a nested submenu.

| | **Default** The item's resting state. Transparent row with a label and chevron. |
| --- | :--- |
| | **Hover** Triggered when the cursor moves over the item. The row fills with a light tint. |

##### Description (optional, action and select items)

| | An optional second line under the item label. It’s muted, and takes the item’s text colour on hover and when disabled. |
| --- | --- |

##### Header

| | Non-interactive: no hover, focus, or active states. The label is muted. |
| --- | :--- |

##### Divider

| | A full-width horizontal rule. Non-interactive. |
| --- | :--- |

##### List

| | **To do** The item's resting state. |
| --- | :--- |
| | **Done** The item's resting state. |

### Behaviour

* The trigger toggles the menu open and closed. The open state is reflected on the trigger via `aria-expanded`.
* Activating an action or selectable item closes the menu. Toggling a multi-select item keeps it open.
* Clicking outside the menu, pressing Escape, or tabbing away closes the menu.
* Cursor: pointer on interactive items, not-allowed on disabled items. Headers and dividers show the default cursor.
* Use the disabled state on items only when the action is genuinely unavailable in the current context. Keep the item visible so the menu structure stays stable.

### Responsive behaviour

* The menu width is content-driven with a sensible minimum; it doesn't stretch to the trigger width.
* On small viewports, ensure the menu repositions to stay fully on screen rather than being clipped.
* Item height and tap targets remain constant across breakpoints. Don't shrink rows on mobile.
