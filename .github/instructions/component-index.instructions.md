---
applyTo: 'components/**,index.ts,index.tsx'
---

# Design System Component Index

Quick reference for AI agents and developers.

## Components

| Component       | Purpose                                                                                   | Key props                                        |
| --------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------ |
| ActivityIcon    | Activity/resource/file icon with semantic category styling                                | icon, category, size, container                  |
| Avatar          | Circular user/entity identity display — photo or initials                                 | type, size, initials, imageSrc, imageAlt         |
| Badge           | Short status, metadata, or count labels                                                   | type, contrast, style, icon, label               |
| Button          | Primary and secondary actions                                                             | variant, size, disabled, startIcon, endIcon      |
| Checkbox        | Independent multi-select controls                                                         | checked, label, disabled, invalid, indeterminate |
| Choicebox       | Single-select options as larger, card-style choices (icon + label + supporting text)      | checked, label, disabled, invalid                |
| CloseButton     | Icon-only dismiss action for temporary UI surfaces                                        | size, disabled, ariaLabel                        |
| Dropdown        | Composable trigger + menu container for action, select, expandable, and multiselect items | label, variant, appearance, size, open, children |
| FavouriteButton | Icon button to mark/unmark items as favourites                                            | checked, size, disabled, ariaLabel               |
| Link            | Anchor element with variant and optional icon support                                     | label, variant, disabled, startIcon, endIcon     |
| NavPill         | Compact pill-style navigation link for section switching                                  | label, active, disabled, href, ariaLabel         |
| Pagination      | Page navigation control                                                                   | totalPages, currentPage, onPageChange, ariaLabel |
| ProgressBar     | Visual progress indicator with status and label variants                                  | value, min, max, status, labelVariant, title     |
| Radio           | Single-select options in a compact list (native radio input, label only)                  | checked, label, disabled, invalid                |
| Switch          | Binary toggle control for on/off settings                                                 | checked, label, disabled, onChange               |
| Tooltip         | Contextual label anchored to a trigger element                                            | label, placement, variant, children              |

## Dropdown Subcomponents

Use these as building blocks inside `Dropdown` and `DropdownMenu`.

| Subcomponent            | Purpose                                                                     | Key props                                |
| ----------------------- | --------------------------------------------------------------------------- | ---------------------------------------- |
| DropdownTrigger         | Trigger button that opens/closes the menu panel.                            | label, variant, appearance, size, open   |
| DropdownMenu            | Menu container that hosts dropdown items.                                   | children                                 |
| DropdownItemAction      | Standard clickable action item (button or link behavior).                   | label, href, variant, startIcon, endIcon |
| DropdownItemSelect      | Single-select item with selected state (`menuitemradio` semantics).         | label, selected                          |
| DropdownItemMultiselect | Multi-select item with checked state (`menuitemcheckbox` semantics).        | label, checked                           |
| DropdownItemExpandable  | Item that opens a nested submenu.                                           | label, children                          |
| DropdownItemHeader      | Non-interactive section heading within the menu.                            | label                                    |
| DropdownItemDivider     | Visual separator between groups of items.                                   | -                                        |
| DropdownItemCustom      | Wrapper for custom menu content when built-in item variants are not enough. | children                                 |
| DropdownItemGroup       | Semantic grouping container for related menu items.                         | label, children                          |

## Component Links

- [ActivityIcon implementation](../../components/activity-icon/ActivityIcon.tsx)
- [ActivityIcon stories](../../components/activity-icon/ActivityIcon.stories.tsx)
- [Avatar implementation](../../components/avatar/Avatar.tsx)
- [Avatar stories](../../components/avatar/Avatar.stories.tsx)
- [Badge implementation](../../components/badge/Badge.tsx)
- [Badge stories](../../components/badge/Badge.stories.tsx)
- [Button implementation](../../components/button/Button.tsx)
- [Button stories](../../components/button/Button.stories.tsx)
- [Checkbox implementation](../../components/checkbox/Checkbox.tsx)
- [Checkbox stories](../../components/checkbox/Checkbox.stories.tsx)
- [Choicebox implementation](../../components/choicebox/Choicebox.tsx)
- [Choicebox stories](../../components/choicebox/Choicebox.stories.tsx)
- [CloseButton implementation](../../components/close-button/CloseButton.tsx)
- [CloseButton stories](../../components/close-button/CloseButton.stories.tsx)
- [Dropdown implementation](../../components/dropdown/Dropdown.tsx)
- [Dropdown stories](../../components/dropdown/Dropdown.stories.tsx)
- [DropdownTrigger implementation](../../components/dropdown/DropdownTrigger.tsx)
- [DropdownTrigger stories](../../components/dropdown/DropdownTrigger.stories.tsx)
- [DropdownMenu implementation](../../components/dropdown/Dropdown.tsx)
- [DropdownItemAction implementation](../../components/dropdown/DropdownItemAction.tsx)
- [DropdownItemAction stories](../../components/dropdown/DropdownItemAction.stories.tsx)
- [DropdownItemSelect implementation](../../components/dropdown/DropdownItemSelect.tsx)
- [DropdownItemSelect stories](../../components/dropdown/DropdownItemSelect.stories.tsx)
- [DropdownItemMultiselect implementation](../../components/dropdown/DropdownItemMultiselect.tsx)
- [DropdownItemMultiselect stories](../../components/dropdown/DropdownItemMultiselect.stories.tsx)
- [DropdownItemExpandable implementation](../../components/dropdown/DropdownItemExpandable.tsx)
- [DropdownItemExpandable stories](../../components/dropdown/DropdownItemExpandable.stories.tsx)
- [DropdownItemHeader implementation](../../components/dropdown/DropdownItemHeader.tsx)
- [DropdownItemHeader stories](../../components/dropdown/DropdownItemHeader.stories.tsx)
- [DropdownItemDivider implementation](../../components/dropdown/DropdownItemDivider.tsx)
- [DropdownItemDivider stories](../../components/dropdown/DropdownItemDivider.stories.tsx)
- [DropdownItemCustom implementation](../../components/dropdown/DropdownItemCustom.tsx)
- [DropdownItemCustom stories](../../components/dropdown/DropdownItemCustom.stories.tsx)
- [DropdownItemGroup implementation](../../components/dropdown/DropdownItemGroup.tsx)
- [DropdownItemGroup stories](../../components/dropdown/DropdownItemGroup.stories.tsx)
- [FavouriteButton implementation](../../components/favourite-button/FavouriteButton.tsx)
- [FavouriteButton stories](../../components/favourite-button/FavouriteButton.stories.tsx)
- [Link implementation](../../components/link/Link.tsx)
- [Link stories](../../components/link/Link.stories.tsx)
- [NavPill implementation](../../components/nav-pill/NavPill.tsx)
- [NavPill stories](../../components/nav-pill/NavPill.stories.tsx)
- [Pagination implementation](../../components/pagination/Pagination.tsx)
- [Pagination stories](../../components/pagination/Pagination.stories.tsx)
- [ProgressBar implementation](../../components/progress-bar/ProgressBar.tsx)
- [ProgressBar stories](../../components/progress-bar/ProgressBar.stories.tsx)
- [Radio implementation](../../components/radio/Radio.tsx)
- [Radio stories](../../components/radio/Radio.stories.tsx)
- [Switch implementation](../../components/switch/Switch.tsx)
- [Switch stories](../../components/switch/Switch.stories.tsx)
- [Tooltip implementation](../../components/tooltip/Tooltip.tsx)
- [Tooltip stories](../../components/tooltip/Tooltip.stories.tsx)

## Working Rules

- Prefer existing component patterns before introducing new abstractions.
- Use published MDS tokens through CSS variables only; avoid hardcoded design values.
- Treat generated token outputs as read-only and update only source token flows.
- Keep Storybook variants and tests aligned with component API changes.
- `Radio`, `Checkbox`, and `NavPill` do not ship a group/layout wrapper — when multiple instances are rendered together, layout is supplied by the consumer (for example, a flex container + gap). See each component's stories for the reference pattern; do not invent a new wrapper component.
- `Radio` and `Choicebox` both render single-select options but are not interchangeable: use `Radio` for a plain list of text options, `Choicebox` for larger card-style options with an icon and/or supporting text.
- This package does not bundle font files. `--mds-font-family-base` resolves to `Noto Sans` with no fallback chain — the consuming application must load Noto Sans itself (see the README "Fonts" section) or text will fall back to the browser default with no build-time warning.

## Documentation Routing

- Primary design guidance source: ZeroHeight documentation and MCP lookups.
- Local fallback for quick orientation: this index and scoped instruction files.
- Large fallback context file: [Design system fallback instructions](design-system.instructions.md).

Load the large fallback file only when the agent cannot access ZeroHeight guidance and asks for it explicitly.
