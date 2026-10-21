---
component: Tag
slug: tag
package: "@moodlehq/design-system@5.5.0"
status: Ready
source: https://design.moodle.com/98292f05f/v/latest/p/25b418-tag
import: @moodlehq/design-system/components/tag
types: dist/components/tag/index.d.ts
---

<!-- Generated from ZeroHeight by npm run build-guidance. Do not edit. -->

# Tag

A compact, pill-shaped element used to label, categorise, or tag content either as a clickable link to related content, or as a removable chip the user can dismiss.

## Look-alikes

Badge · Link · Button · Close button · Nav pill

Use instead: [Badge](/28c702-badge); Removable variant; Badge or plain text.

## Accessibility

- Keyboard:
  - `Tab`: Link: moves focus to the tag. Removable: moves focus to the tag's Close button (the label itself isn't focusable).
  - `Enter`: Link: follows the link. Removable: activates the Close button, removing the tag.
  - `Space`: Link: no action (native anchor behaviour). Removable: activates the Close button, removing the tag.
- Role: Not documented
- Required attributes: Not documented
- Announced:
  - Tag has no built-in live announcement. If removing a tag isn't visually obvious, announce it from the consuming UI with an app-level live region, for example "Marketing tag removed" in an *`aria-live="polite"`* region.
  - Focus after removal: removal is owned by the consumer through *`onRemove`*. If the tag unmounts and leaves focus on the page body, Tag moves focus to the next focusable element. If the consumer places focus itself (for example back in the input field), Tag doesn't override it.
- Focus: Not documented

## Built from

Generated from the component source and CSS, not from ZeroHeight.

- MDS components: close-button

- Semantic tokens: `--mds-bg-feedback-danger-light`, `--mds-bg-feedback-danger-subtle`, `--mds-bg-feedback-primary-light`, `--mds-bg-feedback-primary-subtle`, `--mds-bg-surface-default`, `--mds-bg-surface-subtle`, `--mds-border-feedback-danger`, `--mds-border-feedback-primary`, `--mds-border-feedback-secondary`, `--mds-border-radius-lg`, `--mds-border-radius-md`, `--mds-border-radius-pill`, `--mds-border-radius-sm`, `--mds-border-subtle`, `--mds-focus-danger`, `--mds-focus-default`, `--mds-font-family-base`, `--mds-font-size-paragraph-small`, `--mds-font-weight-medium`, `--mds-letter-spacing-default`, `--mds-line-height-paragraph-small`, `--mds-spacing-offset`, `--mds-spacing-sm`, `--mds-spacing-xs`, `--mds-spacing-xxs`, `--mds-stroke-weight-md`, `--mds-stroke-weight-sm`, `--mds-text-emphasis`, `--mds-text-feedback-danger`, `--mds-text-feedback-secondary`, `--mds-text-muted`, `--mds-text-subtle`

## Usage

### Overview

Tags provide a consistent visual pattern for displaying labels, categories, or removable selections in a small, pill-shaped container. A Tag is either a Link (a clickable, navigable label) or Removable (a dismissible chip with an embedded Close button). Removable is a single, deliberately agnostic component: with its optional fields off it's a plain label chip, and with them on it can represent a specific person or a specific tenant/organisation.

#### When to use

* Use the **Link** type when a tag should navigate to related or filtered content, for example, a category tag on a course card that links to everything in that category.
* Use the **Removable** type for any dismissible chip. It's built to cover three use cases with the same component:
    * **Generic**: a plain label with no identity attached, for example an applied filter or a keyword in a chip-style input. Leave Avatar, Email, Username / short name, and Institution off.
    * **User**: the tag represents a specific person, for example an "assigned to" chip, a shared-with recipient, or a selected user in a multi-select. Turn on the identity fields that apply (Avatar, Email, Username, Institution).
    * **Tenant**: the tag represents a specific tenant, site, or organisation, for example in a multi-tenant admin screen. Use Avatar (as a logo/site image) and Username / short name (as the site's short name). Email and Institution are person-only fields and don't apply here.

#### ❌ When not to use

* Don't use Tag to show static status information with no action attached. Use [Badge](/28c702-badge) instead.
* Don't use the Link type for something the user needs to remove. Use a Removable variant instead.
* Don't use a Removable variant for a value the user shouldn't be able to remove. The Close button signals that the item is dismissible, so removing it would be misleading. Use Badge or plain text instead.
* Don't use Tag as a substitute for [Nav pill](/981bd1-nav-pill). Nav pill is for navigation state (selected/unselected), not for labelling or removable selections.

### Variants

#### Type

Set with the `type` prop. It’s required.

Tag combines a **Type** choice with, for Removable, a **Variant** choice for what the tag represents.

| **Variant** | **When to use** |
| :--- | --- |
| | **Link** A clickable, pill-shaped tag that navigates to related content. Not removable. |
| | **Removable** A dismissible chip with an embedded Close button. Optionally shows identity details (avatar, email, username, institution). |

#### Link

Set with the `variant` prop. If you leave it out, you get `default`.

| **Variant** | **When to use** |
| :--- | --- |
| | **Default** The standard appearance for category and topic tags. |
| | **Danger** Use when the tag represents something that needs attention or carries risk. Consistent with the danger meaning used elsewhere in MDS (Badge, Alert). |

#### Removable

Each one is its own prop. Removable tags also need `onRemove` and `removeLabel`.

Removable has four independent toggles, all optional except the name/category label itself.

| **Props** | **When to use** |
| :--- | --- |
| | **Avatar** Show a small identity image alongside the label. Defaults on. Works for a person's photo or a tenant/site logo. *(Generic: used for both People and Tenant.)* |
| | **Username / short name (`username`)** Show a short identifier as a supporting line. Works for a person's username or a tenant's short name. *(Generic: used for both People and Tenant.)* |
| | **Email** Show an email address as a supporting line. *(Person-only: leave off for Tenant tags.)* |
| | **Institution** Show a third line, the person's institution. *(Person-only: leave off for Tenant tags.)* |

### Guidelines

#### Content guidelines

##### Content structure and constraints

* Link and plain Removable tags support a single line of label text, which truncates with an ellipsis if it exceeds the available width.
* When any identity field (Email, Username / short name, Institution) is on, the name/category label is required and always shown first.
* Email and username truncate with an ellipsis rather than wrap.
* Keep labels short: Tag is a compact, scannable element, not a place for long descriptions.

##### Copywriting 

* Use sentence case for category and keyword labels.
* Person names follow their own natural casing. Don't force sentence case on a proper noun.
* Don't add punctuation to labels.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD use a specific label that describes the outcome. |
| Don't | | | SHOULD NOT use generic labels that don't tell people what will happen. |

#### Placement

* Use `--mds-spacing-xxs` (4px) between tags in a group, horizontally and vertically.
* Tags wrap onto multiple lines when a group doesn't fit the available width.
* If a group runs past about five wrapped lines, reach for a different pattern. A multi-select dropdown or a filter panel will serve the user better than a very long wall of tags.
* Keep one interaction model per group. A Link tag and a Removable tag look similar but behave differently: the whole pill navigates on one, and only the Close button does anything on the other.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | MUST keep 1 interaction model per group, so every tag in the set behaves the same way. |
| Don't | | | MUST NOT mix Link and Removable tags in one group. They look alike, but one navigates and the other only removes. |

#### Accessibility guidelines

##### Colour and contrast

* Label text meets 4.5:1 contrast against the tag background, for both the Default and Danger appearances of the Link type.
* Disabled Removable tags use intentionally reduced contrast; the disabled state is also carried by the Close button's own disabled styling, not colour alone.

##### Focus

* The Link tag shows a visible focus ring in the matching feedback colour (default or danger).
* The Close button on a Removable tag keeps its own standard focus state. See [Close button](/778206-close-button).

##### Labelling

* On a Removable tag, the Close button needs its own accessible name describing what it removes (for example, "Remove Marketing", "Remove Jordan Lee"), not a generic "Close". See the Close button page's labelling guidance.

## Code

### Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Removable](https://moodlehq.github.io/design-system/iframe.html?id=components-tag--removable)

Props and types (TypeScript API): [Tag.d.ts](https://unpkg.com/@moodlehq/design-system@5.5.0/dist/components/tag/Tag.d.ts)

Full list of props and their types for Tag.

### Accessibility implementation

#### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | **Link**: moves focus to the tag. **Removable**: moves focus to the tag's Close button (the label itself isn't focusable). |
| `Enter` | **Link**: follows the link. **Removable**: activates the Close button, removing the tag. |
| `Space` | **Link**: no action (native anchor behaviour). **Removable**: activates the Close button, removing the tag. |

#### ARIA

* Roles:
    *         * **Link** renders a native `a` with an `href`. No explicit role is needed.
        * **Removable** renders a non-interactive `span` containing the label content and a nested Close button. The Close button is a native `button`. The `span` has no role.
    * Required attributes:
        * **Link**: `href`.
        * **Removable**: `removeLabel`, which becomes the Close button's `aria-label`. It must name what is being removed and include the tag's label, for example "Remove Ana Silva", not a bare "Remove". Use a translated, context-specific string from the consuming application. `onRemove` is also required.
            * Same requirements as the standalone [Close button](https://zeroheight.com/98292f05f/p/778206) component.
    * Optional attributes:
        * `disabled`. On a Link, the `href` is removed and the tag gets `aria-disabled="true"` and is taken out of the tab order. On a Removable tag, the Close button is disabled.
        * Standard attributes for the element type are passed through to the root (`a` or `span`).
* The Avatar is always rendered with `aria-hidden="true"`, so the accessible name comes from the visible text. Consumers don't need to set this.

#### Dynamic announcements

* Tag has no built-in live announcement. If removing a tag isn't visually obvious, announce it from the consuming UI with an app-level live region, for example "Marketing tag removed" in an *`aria-live="polite"`* region.
* Focus after removal: removal is owned by the consumer through *`onRemove`*. If the tag unmounts and leaves focus on the page body, Tag moves focus to the next focusable element. If the consumer places focus itself (for example back in the input field), Tag doesn't override it.

## Specs

### Anatomy

**Tag (Link)**

1. **Container**: pill shape, background and border reflect the feedback type (Default or Danger).
2. **Label**: centred text in the matching feedback colour.

**Tag (Removable)**

1. **Container**: radius and padding adapt to which optional rows are shown: compact and square-ish, with nothing on, up to a larger, more rounded card once 3 rows are shown.
2. **Avatar** *(optional)*: small (16px) when only the name/category is shown; larger (32–48px) once email, username, or institution are also shown.
3. **Name / category**: required, shown first.
4. **Username / short name / Email** *(optional)*: shown together separated by a vertical divider, or individually.
5. **Institution** *(optional)*: shown as a third line.
6. **Close button**: SM size, anchored to the trailing edge. Always required.

### States

#### Link - Default

| | **Default** The tag's resting state. Confirm the label clearly names the category or destination before it's shown. |
| :--- | :--- |
| | **Hover** Triggered when the cursor moves over the tag. Don't suppress or override this state. Users rely on it to identify interactive elements. |
| | **Pressed** Triggered while the tag is being pressed. Transitions away immediately on release. Don't hold this state. |
| | **Focus** Triggered via keyboard navigation (Tab key). Must remain visible on all backgrounds used in your layout. A 2px focus ring shows around the tag, offset from its edge. |

#### Link - Danger

| | **Default** The tag's resting state. Reserve this appearance for tags that genuinely need attention. |
| :--- | :--- |
| | **Hover** Triggered when the cursor moves over the tag. Don't suppress or override this state. Users rely on it to identify interactive elements. |
| | **Pressed** Triggered while the tag is being pressed. Transitions away immediately on release. Don't hold this state. |
| | **Focus** Triggered via keyboard navigation (Tab key). Must remain visible on all backgrounds used in your layout. A 2px danger focus ring shows around the tag, offset from its edge. |

#### Removable

| | **Default** The tag’s resting state. It has a 1px border. |
| :--- | :--- |
| | **Disabled** Shown when the tag can’t be removed. The background and border change, the text is muted and the Close button is disabled. |

### Layout and sizing

* All four fields (Avatar, Email, Username / short name, Institution) can be turned on independently. The layout adapts automatically as more are shown, moving to a taller radius and a larger avatar once Institution is on.
* More fields make the tag taller, which affects how much space it takes up when several tags sit together.

### Behaviour

* Link: the whole pill is clickable and navigates to the linked content.
* Removable: the label itself is static; only the Close button is interactive. Activating it removes the tag.
* Cursor: pointer on the Link tag and on the Close button; default cursor on the static label area of Removable tags.
