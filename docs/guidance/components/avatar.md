---
component: Avatar
slug: avatar
package: "@moodlehq/design-system@5.5.0"
status: Ready
source: https://design.moodle.com/98292f05f/v/latest/p/65838c-avatar
import: @moodlehq/design-system/components/avatar
types: dist/components/avatar/index.d.ts
---

<!-- Generated from ZeroHeight by npm run build-guidance. Do not edit. -->

# Avatar

The avatar component displays a visual representation of a user.

## Accessibility

- Keyboard: Not documented
- Role: Not documented
- Required attributes: Not documented
- Announced: Not documented
- Focus: Not documented

## Props

Generated from the component TypeScript types, not from ZeroHeight. Inherited HTML attributes are not listed.

### AvatarProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `AvatarSize` |  | Visual size of the avatar. xs=16px, sm=24px, md=32px, lg=48px, xl=64px, xxl=96px. Defaults to 'md'. |
| `imageSrc` | `string` |  | URL for the avatar photo. When provided, the image is displayed on top of the initials layer. If the image fails to load, the component automatically falls back to displaying the initials. |
| `alt` | `string` |  | Accessible name for the avatar. When an image is visible it is forwarded to the inner `<img alt>` attribute; when the component falls back to initials or the SVG silhouette it is applied as `aria-label` on the root element so the accessible name is preserved regardless of display state. Use the user's full name (e.g. `"Jane Doe"`). Omit or leave empty when the avatar is purely decorative. |
| `initials` | `string` |  | 1–2 character string used as the fallback when no `imageSrc` is provided or when the image fails to load. The consuming app is responsible for truncation and locale (e.g. derive from the user's display name). When omitted or empty the SVG silhouette placeholder is shown instead. |

Allowed values:

- `size`: `xs`, `sm`, `md`, `lg`, `xl`, `xxl`

## Built from

Generated from the component source and CSS, not from ZeroHeight.

- MDS components: none

- Semantic tokens: `--mds-avatars-lg`, `--mds-avatars-md`, `--mds-avatars-sm`, `--mds-avatars-xl`, `--mds-avatars-xs`, `--mds-avatars-xxl`, `--mds-bg-surface-strong`, `--mds-border-radius-pill`, `--mds-font-family-base`, `--mds-font-size-paragraph-default`, `--mds-font-size-paragraph-lead`, `--mds-font-size-paragraph-small`, `--mds-font-weight-medium`, `--mds-font-weight-regular`, `--mds-letter-spacing-default`, `--mds-text-default`

## Usage

### Overview

The avatar component displays a visual representation of a user. It supports profile images, initials, and an automatic empty state graphic as a fallback. Use it to identify users throughout an interface.

#### When to use

* Use when you need to represent a user in a compact, recognisable way across the interface.
* Use for profile pictures in headers, forum posts, and participant lists.
* Use in data tables, lists, and dense layouts where space is limited.
* Use in navigation menus and user account indicators.

#### ❌ When not to use

* Do not use for large profile displays where full user information is needed. Use a layout that includes the full user profile information instead.

### Variants

#### Type

There’s no type prop. What shows depends on what you pass: `imageSrc` for an image or `initials` for initials. The empty state shows on its own when there’s neither, or when the image fails to load.

The type determines what the avatar shows: an image, initials, or an empty state graphic. All types maintain the same size and shape.

| **Variant** | **When to use** |
| :--- | --- |
| | **Image (`imageSrc`)** Use when a profile picture is available. The image fills the circular container while maintaining proper aspect ratio. |
| | **Initials** Use when no image is available. Display the user's first and last name initials as a fallback. |
| | **Empty state (automatic)** Use when no image or initials are available. Not meant to be chosen deliberately, it's the built-in fallback. |

#### Size

Set with the `size` prop. If you leave it out, you get `md`.

The size sets the avatar's dimensions and scales the content to match.

| **Variant** | **When to use** |
| :--- | --- |
| | **XS (16px, `xs`)** Use in dense tables, lists, and compact layouts where space is minimal. In Moodle: compact lists, inline references. *Image or empty state only. Initials are not available at this size.* |
| | **SM (24px, `sm`)** Use in inline mentions, comments, and activity feeds. In Moodle: user menu (viewed-as user). *Image or empty state only. Initials are not available at this size.* |
| | **MD (32px, `md`, default)** Use as the standard size for most user interfaces and default avatar displays. In Moodle: forums, user menu (logged-in user). |
| | **LG (48px, `lg`)** Use in featured user sections, profile sidebars, and prominent sections. In Moodle: grader feedback modal. |
| | **XL (64px, `xl`)** Use for profile headers and card-based displays. In Moodle: profile headers, grader user picker. |
| | **XXL (96px, `xxl`)** Use for large profile pages and highlighted user representations. In Moodle: profile pages, user heading. |

### Guidelines

#### Content guidelines

##### Content structure and constraints

* The Image type accepts a single image file (JPG, PNG, or GIF).
* Initials should be a maximum of two characters. Use the first letter of the user's first and last name.
* Do not use more than two characters. The component is not designed to hold longer strings.
* If initials are empty or missing, show the empty state graphic instead.
* Providing an image or initials is preferred. If neither is available, use the empty state, this is a supported fallback, not an error state.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD use the first letter of the person's first name and last name. |
| Don't | | | MUST NOT use more than 2 characters. |

#### Placement

* Use avatars individually or in small groups within a single row or column.
* Align avatars to content like user names using centre alignment.

#### Accessibility guidelines

##### Colour and contrast

* The `--mds-bg-surface-strong` background used for the initials variant meets a minimum 4.5:1 contrast ratio against `--mds-text-default` for readability.

##### Focus

* The avatar itself should not receive keyboard focus.
* If wrapped in a clickable element (link or button), focus should land on the wrapper, not the avatar.

##### Labelling

* The avatar should always have an accessible label containing the user's full name using `title`, `alt`, `aria-label`, etc.
* Include the user's full name in the associated label attribute, not just initials (e.g. `alt="Sarah Williams"`, not `alt="SW"`).
* When the avatar is visually close to the user's full name, the accessible label should refer to the full name instead of redeclaring it (e.g. using `aria-labelledby`) to prevent screen readers from reading the name twice.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | MUST use the person's full name as the accessible label. |
| Don't | | | MUST NOT use initials as the accessible label. |

## Code

### Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-avatar--default)

Props and types (TypeScript API): [Avatar.d.ts](https://unpkg.com/@moodlehq/design-system@5.5.0/dist/components/avatar/Avatar.d.ts)

Full list of props and their types for Avatar.

### Accessibility implementation

#### Keyboard interaction

This component has no keyboard interaction and should not receive focus.

#### ARIA

The Avatar component manages its accessible role and name automatically based on which visual state is active (photo, initials, or silhouette). Consumers only need to supply the *`alt`* prop.

##### Role

| **State** | **Accessible role** | **How it is applied** |
| --- | --- | --- |
| Photo visible (`imageSrc` loads successfully) | `img` | The inner `<img>` element carries the role natively |
| Initials or silhouette visible | `img` | Set on the root `<span>` automatically when an `alt` value is present |
| Decorative (no `alt` prop) | None | No role is applied; the avatar is hidden from assistive technology |

##### Attributes

* **`alt`** **prop**: the primary accessibility hook; maps to the user's full name (e.g. `"Jessica Doe"`).
    * When a photo is visible: forwarded as the `alt` attribute on the inner `<img>` element.
    * When initials or the silhouette are visible: applied as `aria-label` on the root `<span>`, which also receives `role="img"` automatically so the label is valid.
    * Omit (or leave empty) when the avatar is purely decorative. The component will render `<img alt="">` and omit `role`/`aria-label`, hiding it from assistive technology.

##### What the component handles internally: do not override

| **Element** | **Behaviour** |
| --- | --- |
| Initials `<span>` | Always `aria-hidden`. When a photo is visible the `<img alt>` carries the name; when initials are visible the parent `<span aria-label>` carries it. Either way the raw character string is never announced. |
| Fallback silhouette `<img>` | Rendered as `<img alt="" aria-hidden>`: always purely decorative. |
| `role="img"` on the root `<span>` | Added automatically when needed. Do not set it manually. |
| `aria-hidden="true"` on the root | Not used internally. To make an avatar decorative, omit the `alt` prop rather than adding `aria-hidden` externally. |

##### Usage guidance

* **Always** pass `alt` with the user's full name when the avatar represents a person and is not redundant with adjacent text.
* Omit `alt` when the user's name already appears as a visible label beside the avatar. Setting it would cause screen readers to announce the name twice.
* `xs` and `sm` sizes are image-only. Always provide `imageSrc` at these sizes; initials are not supported and the silhouette renders automatically if the image is absent.

## Specs

### Anatomy

1. **Container**: A circular shape that holds either an image or text content. It gives the avatar a consistent shape.
2. **Image**: The profile picture displayed when available. It fills the container while maintaining the circular shape.
3. **Initials**: Up to two letters shown when no image is available.
4. **Empty state graphic**: The fallback icon shown when neither an image nor initials are available.

### States

This component is display-only. It does not have hover, pressed, disabled, or focus states. When it appears inside a clickable component such as a list item, link, button, or card, it follows the states of that parent component.

### Layout and sizing

* The image type fills the container and is cropped to a circle.
* The initials type centres text vertically and horizontally within the container.
* When an image fails to load, display initials using the first letter of the user's first and last name. If no name data is available either, display the empty state graphic instead.

### Behaviour

* The avatar itself is not interactive and should not receive focus or respond to clicks.
* If the avatar must link to a page, wrap it in a separate link or button component.
* Do not add hover states, loading indicators, or status badges directly to the avatar. Use a separate component for these features.

### Responsive behaviour

* The avatar size and type remain consistent across all breakpoints. 
* In very narrow layouts, choose a smaller size variant (XS or SM) rather than relying on responsive scaling.
