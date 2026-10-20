---
component: Dropdown
slug: dropdown
package: "@moodlehq/design-system@5.4.0"
status: Ready
source: https://design.moodle.com/98292f05f/v/latest/p/8381b3-dropdown
import: @moodlehq/design-system/components/dropdown
types: dist/components/dropdown/index.d.ts
---

# Dropdown

A button that opens a menu of actions, selections, or navigation options.

## Look-alikes

Input · Select · Button

Use instead: Select input.

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
  - Icon-only triggers must provide an accessible name via `aria-label` or `aria-labelledby`. Disabled items expose `aria-disabled="true"` and suppress pointer events — they remain in the accessibility tree so the menu structure is preserved.
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

### When to use

* Use when a set of related actions needs to be grouped behind one control. For example, the overflow actions on a course card or activity.
* Use when the user selects one value from a list and the current value should be reflected on the trigger. For example, a sort or filter control.
* Use when the user toggles multiple options that apply together, use multi-select items so the menu stays open between toggles.
* Use in navigation bars via the nav.pill trigger variant when a nav entry expands into sub-destinations.

#### **❌ When not to use**

* Don't use a dropdown for choosing a value inside a form, use a Select input instead, which provides field semantics, validation, and native mobile behaviour.
* Don't use a dropdown for two to three always-relevant actions — surface them as buttons instead. Hiding a small number of frequent actions adds a click for no benefit.
* Don't use a dropdown to hide the primary action of a view. The main call to action should always be visible.
* Don't nest more than one level of expandable submenu, deep nesting is hard to operate with a pointer and harder with a keyboard.

### Variants

#### Trigger type

| **Variant** | **When to use** |
| :--- | --- |
| | ****Button**** The standard trigger for forms, toolbars, and content areas. Supports all appearances, sizes, and icon configurations. |
| | ****Nav pill** ** For dropdowns inside navigation bars or pill-style nav structures. Fixed to the default appearance and md size. |

#### Trigger appearance

Applies to the button trigger only.

| **Variant** | **When to use** |
| :--- | --- |
| | ****Emphasis**** When the dropdown is the primary control in its context and needs clear visual prominence. |
| | ****Default**** The standard appearance for most contexts. |
| | ****Subtle**** Low-emphasis contexts where the trigger shouldn't compete visually — toolbars, card corners, table rows. |

#### Trigger size

| **Variant** | **When to use** |
| :--- | --- |
| | ****Medium (default)**** The standard size for most interface contexts. |
| | ****Small**** Dense layouts such as tables, inline filters, or compact toolbars. |

#### Trigger icon

| **Variant** | **When to use** |
| :--- | --- |
| | ****None**** Label and chevron only. The default configuration. |
| | ****startIcon**** A leading icon that reinforces the trigger's purpose. Use only when it adds meaning, not decoration. |
| | **Icon only** Space-constrained contexts such as overflow ("kebab") menus. The chevron is omitted; an `aria-label` is required. |

#### Item types

| **Variant** | **When to use** |
| :--- | --- |
| | ****Action**** Performs an action when chosen and closes the menu. It can either fire a command (rendered as a `<button>`) or navigate to another page (rendered as an `<a>` link) — for example, a 'More' menu linking to related pages. Use the danger variant for destructive actions such as delete or remove. |
| | ****Selectable**** Single-choice lists. The trailing check communicates the current selection; choosing an item closes the menu. |
| | **Multi-select** Multi-choice lists using an embedded Checkbox. Toggling an item keeps the menu open. |
| | **Expandable** Reveals a nested submenu via a trailing chevron. Use sparingly and only one level deep. |
| | **Header** A non-interactive label that names a group of items — for example "Recent" or "Actions". |
| | **Divider** A horizontal rule separating groups. Pair with headers for structured menus. |
| *Example of a custom slot.* | **Custom** A slot for bespoke item layouts not covered by the other types. Use as a last resort — prefer the standard types to keep menus consistent. |
| | **List** A list item component used within dropdown menus to represent a task or option with a completion state indicator. It has two variants representing a binary status: 'done' and 'to do'. |

### Guidelines

#### Content design

##### **Content structure and constraints**

* Item labels support a single line of text. Avoid labels that wrap.
* Recommended item label length: 1–4 words.
* Use the description slot only when the label alone is insufficient — for secondary context such as a consequence or a subtitle, not for repeating the label.
* Item icons are optional and per-item. If most items in a group have icons, give all of them icons so labels stay aligned.
* Don't mix selectable and multi-select items in the same group — the interaction models conflict.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Keep item labels short and scannable. |
| Don't | | | Don’t use long labels that wrap to a second line. |

##### **Copywriting** 

* Use sentence case. Don't capitalise every word.
* Action items start with a verb: "Duplicate course", "Download report".
* Selectable items name the value, not the action: "Newest first", not "Sort by newest first" (put the shared context in the header or trigger label).
* Name destructive actions explicitly: "Delete forum", not "Remove".
* Headers are nouns naming the group: "Sort by", "Actions". No punctuation.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Use sentence case — capitalise only the first word. |
| Don't | | | Don’t Title-Case labels or capitalise every word. |

#### Layout and spacing

* Order items by frequency of use, with the most common actions first.
* Place destructive (danger) actions last, separated from other items by a divider.
* Keep flat lists short; introduce a header and divider to group content once the menu grows past a handful of items. There's no hard limit, but if a menu gets very long, reconsider the pattern — a Select with search, a filter panel, or a dedicated page will serve users better than scrolling a long menu.
* The menu aligns to the leading edge of the trigger by default and flips alignment or direction when it would overflow the viewport.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Separate the destructive action with a divider and place it last. |
| Don't | | | Don’t mix a danger action into the middle of the list. |

#### Responsive behaviour

* The menu width is content-driven with a sensible minimum; it doesn't stretch to the trigger width.
* On small viewports, ensure the menu repositions to stay fully on screen rather than being clipped.
* Item height and tap targets remain constant across breakpoints — don't shrink rows on mobile.

#### Interaction behaviour

* The trigger toggles the menu open and closed. The open state is reflected on the trigger via `aria-expanded`.
* Activating an action or selectable item closes the menu. Toggling a multi-select item keeps it open.
* Clicking outside the menu, pressing Escape, or tabbing away closes the menu.
* Cursor: pointer on interactive items, not-allowed on disabled items. Headers and dividers show the default cursor.
* Use the disabled state on items only when the action is genuinely unavailable in the current context — keep the item visible so the menu structure stays stable.

#### Accessibility guidelines

##### **Colour and contrast**

* Item labels meet 4.5:1 contrast against the menu surface, including the danger variant.
* Selection must not rely on colour alone — the check indicator (selectable) and checkbox (multi-select) carry the state.
* Disabled contrast is intentionally reduced; supplement with aria-disabled so the state reaches screen reader users.

##### **Focus**

* Focus is always visible on the trigger and on items while navigating with a keyboard.
* When the menu closes, focus returns to the trigger — never drop focus to the document body.

##### **Labelling**

* Icon-only triggers require an aria-label describing the menu's purpose ("Course actions"), not the icon ("Three dots").
* Headers label their group programmatically, not just visually, so screen reader users hear the grouping.

## Design

### Anatomy

1. **Trigger** — the interactive control that opens and closes the menu. A chevron communicates the expand/collapse affordance. Always required.
2. **Menu** — the floating panel that contains all items. Surface: `bg.surface.default`, border: `border.default` at `stroke-weight.sm`, radius: `border-radius.md`, internal padding and item gap: `spacing.xxs`.
3. **Header** *(optional)* — a non-interactive label that groups related items.
4. **Divider** *(optional)* — a horizontal rule separating groups of items.
5. **Item** — a single row in the menu. Depending on the item type it contains a leading icon (optional), a label (required), a description (optional), and a trailing indicator (check, checkbox, or chevron).

### Sub-components

The Dropdown is composed from dedicated sub-components. The assembled Dropdown is the public API — sub-components are consumed through it, not published for standalone use.

| | **Dropdown.trigger** The clickable affordance. Wraps the Button component (Variant=button) or the Nav pill component (Variant=nav.pill) and adds the chevron. |
| :--- | :--- |
| | **Dropdown.menu** The panel container. Stacks items with consistent spacing, surface, and border. |
| | **Dropdown.item** The generic wrapper for each row. Exposes seven types: header, divider, action, selectable, multi-select, expandable, and custom. |

### States

#### Trigger

The trigger is a wrapper: it renders the [Button](/877c50-button) component (Variant=button) or the [Nav pill](/981bd1-nav-pill) component (Variant=nav.pill) and adds the chevron. Its surface, label, and border tokens are **inherited** from whichever component it wraps.

Appearance maps to a Button token family: **emphasis → Secondary fill**, **default → Secondary outline**, **subtle → Ghost**. The nav.pill variant is fixed to the default appearance and md size.

##### Button.default

| | **Default** Resting, closed state. Label: `text.subtle` Border: `border.interactive.secondary.default` |
| :--- | :--- |
| | **Hover** Cursor over the trigger. Label: `text.inverse` Container: `border.interactive.secondary.hover` |
| | **Active** Menu open. Label: `text.inverse` Container: `border.interactive.secondary.active` |
| | **Disabled** Trigger unavailable. Label: `text.muted` Border: `border.interactive.secondary.disabled` |
| | **Focus** Keyboard navigation. Label: `text.subtle` Border: `border.interactive.secondary.default` Outline: `focus.default` |

##### Button.emphasis

| | **Default** Resting, closed state. Label: `text.subtle` Container: `bg.interactive.secondary.default` |
| :--- | :--- |
| | **Hover** Cursor over the trigger. Label: `text.subtle` Container: `bg.interactive.secondary.hover` |
| | **Active** Menu open. Label: `text.subtle` Container: `bg.interactive.secondary.active` |
| | **Disabled** Trigger unavailable. Label: `text.muted` Container: `bg.interactive.secondary.disabled` |
| | **Focus** Keyboard navigation. Label: `text.subtle` Container: `bg.interactive.secondary.default` Outline: `focus.default` |

##### Button.subtle

| | **Default** Resting, closed state. Label: `text.subtle` Container: `none` |
| :--- | :--- |
| | **Hover** Cursor over the trigger. Label: `text.subtle` Container: `bg.interactive.secondary.hover` |
| | **Active** Menu open. Label: `text.subtle` Container: `bg.interactive.secondary.active` |
| | **Disabled** Trigger unavailable. Label: `text.muted` Container: `none` |
| | **Focus** Keyboard navigation. Label: `text.subtle` Container: `none` Outline: `focus.default` |

##### Nav.pill

| | **Default** Resting, closed state. Label: `text.subtle` Container: `none` |
| :--- | :--- |
| | **Hover** Cursor over the trigger. Label: `text.subtle` Container: `bg.nav-pill.hover` |
| | **Active** Menu open. Label: `text.subtle` Container: `bg.nav-pill.pressed` |
| | **Disabled** Trigger unavailable. Label: `text.muted` Container: `none` |
| | **Selected** When a subpage in the dropdown is selected. Text colour: `text.default` Indicator: `bg.interactive.primary.default` Container: `bg.nav-pill.selected` |
| | **Focus** Keyboard navigation. Label: `text.subtle` Container: `none` Outline: `focus.default` |

#### Dropdown.item

The item is the generic row wrapper for everything inside the menu. It exposes seven types: **action**, **selectable**, **multi-select**, **expandable**, **custom**, **header**, and **divider**. The four interactive types (action, selectable, multi-select, expandable) share a base state model — default, hover, focus, disabled — with type-specific additions noted below. Header and divider are non-interactive; custom is a bespoke slot. Every item sits on the menu surface (`bg.surface.default`) with `spacing.xxs` padding and gap.

##### Action.default 

| | **Default** The item's resting state. Label: `text.subtle` Icon: `text.subtle` Container: `none` |
| :--- | :--- |
| | **Hover** Triggered when the cursor moves over the item. Label: `text.subtle` Container: `bg.interactive.primary.default-light` |
| | **Disabled** Applied when the action is unavailable. Keep the item visible rather than removing it, to preserve menu structure. Label: `text.muted` Icon: `text.muted` |
| | **Focus** Triggered via keyboard navigation. Label: `text.subtle` Outline: `focus.default` |

##### Action.danger

| | **Default** The item's resting state. Label: `text.danger` Icon: `text.danger` Container: `none` |
| :--- | :--- |
| | **Hover** Triggered when the cursor moves over the item. Label: `text.danger` Container: `bg.interactive.danger.default-light` |
| | **Disabled** Applied when the action is unavailable. Keep the item visible rather than removing it, to preserve menu structure. Label: `text.danger-disabled` Icon: `text.danger-disabled` |
| | **Focus** Triggered via keyboard navigation. Label: `text.danger` Outline: `focus.danger` |

##### Select item (single-select)

Follows the same state model as the action item (default, hover, focus, disabled) with one additional property:

| | **Selected** The trailing check indicator is visible, communicating the current choice at a glance. The row takes a subtle fill. Label: `text.subtle` Container: `bg.surface.subtle` Check: `color.theme.primary` |
| --- | --- |
| | **Unselected** The check indicator is hidden; the label alignment is preserved. |

##### Multi-select item

Wraps the [Checkbox](/12e8f6-checkbox) component — refer to that page for checkbox state token detail. Supports default and hover states. Activating the item toggles the checkbox without closing the menu.

| | **Default** The item's resting state. Label: `text.subtle` Icon: `text.subtle` Container: `none` |
| --- | :--- |
| | **Hover** Triggered when the cursor moves over the item. Label: `text.subtle` Container: `bg.interactive.primary.default-light` |

##### Expandable item

Follows the action item state model (default, hover, disabled, focus) with a trailing chevron-right indicating a nested submenu.

| | **Default** The item's resting state. Label: `text.subtle` Icon: `text.subtle` Container: `none` |
| --- | :--- |
| | **Hover** Triggered when the cursor moves over the item. Label: `text.subtle` Container: `bg.interactive.primary.default-light` |

##### Description (optional, action and select items)

| | Description text: `text.muted` at `$font-size-sm` with `line-height.paragraph.small`. The primary label uses `$font-size-body` with `line-height.paragraph.small`. |
| --- | --- |

##### Header

| | Non-interactive — no hover, focus, or active states. Label: `text.muted` at `$font-size-sm`, `font-weight.medium` |
| --- | :--- |

##### Divider

| | A full-width horizontal rule using`border.default`. Non-interactive. |
| --- | :--- |

##### List

| | **To do** The item's resting state. Label: `text.subtle` Icon: `text.subtle` |
| --- | :--- |
| | **Done** The item's resting state. Label: `text.subtle` Icon: `bg.interactive.primary.default` |

## Code

### Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-dropdown-dropdown--default)

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
    * Disabled items expose `aria-disabled="true"` and suppress pointer events — they remain in the accessibility tree so the menu structure is preserved.
* Optional attributes:
    * When a selection changes the trigger's label (e.g. a filter dropdown), keep the label text in the button's accessible name so the current value is announced.

#### Dynamic announcements

* Open/close state is announced through `aria-expanded` on the trigger.
* Selection changes are announced through `aria-checked` on the item.
* If activating an action produces an off-screen result (e.g. "Course duplicated"), announce it via an app-level live region in the consuming experience.GitHub
