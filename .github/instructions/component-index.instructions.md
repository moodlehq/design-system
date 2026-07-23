---
applyTo: 'components/**,index.ts,index.tsx'
---

# Design System Component Index

Quick reference for AI agents and developers.

## Components

| Component       | Purpose                                                    | Key props                                        |
| --------------- | ---------------------------------------------------------- | ------------------------------------------------ |
| ActivityIcon    | Activity/resource/file icon with semantic category styling | icon, category, size, container                  |
| Avatar          | Circular user/entity identity display — photo or initials  | type, size, initials, imageSrc, imageAlt         |
| Badge           | Short status, metadata, or count labels                    | type, contrast, style, icon, label               |
| Button          | Primary and secondary actions                              | variant, size, disabled, startIcon, endIcon      |
| Checkbox        | Independent multi-select controls                          | checked, label, disabled, invalid, indeterminate |
| Choicebox       | Single-select options in a group                           | checked, label, disabled, invalid                |
| CloseButton     | Icon-only dismiss action for temporary UI surfaces         | size, disabled, ariaLabel                        |
| Dropdown        | Trigger + menu of action/select/expandable/checkbox items  | label, variant, appearance, size, open, children |
| FavouriteButton | Icon button to mark/unmark items as favourites             | checked, size, disabled, ariaLabel               |
| Link            | Anchor element with variant and optional icon support      | label, variant, disabled, startIcon, endIcon     |
| NavPill         | Compact pill-style navigation link for section switching   | label, active, disabled, href, ariaLabel         |
| Pagination      | Page navigation control                                    | totalPages, currentPage, onPageChange, ariaLabel |
| ProgressBar     | Visual progress indicator with status and label variants   | value, min, max, status, labelVariant, title     |
| Radio           | Single-select options in a group                           | checked, label, disabled, invalid                |

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

## Working Rules

- Prefer existing component patterns before introducing new abstractions.
- Use published MDS tokens through CSS variables only; avoid hardcoded design values.
- Treat generated token outputs as read-only and update only source token flows.
- Keep Storybook variants and tests aligned with component API changes.

## Documentation Routing

- Primary design guidance source: ZeroHeight documentation and MCP lookups.
- Local fallback for quick orientation: this index and scoped instruction files.
- Large fallback context file: [Design system fallback instructions](design-system.instructions.md).

Load the large fallback file only when the agent cannot access ZeroHeight guidance and asks for it explicitly.
