---
component: Activity icons
slug: activity-icon
package: "@moodlehq/design-system@5.4.0"
status: Ready
source: https://design.moodle.com/98292f05f/v/latest/p/220cec-activity-icons
import: @moodlehq/design-system/components/activity-icon
types: dist/components/activity-icon/index.d.ts
---

<!-- Generated from ZeroHeight by npm run build-guidance. Do not edit. -->

# Activity icons

Activity icons show the type of Moodle activity, resource, or file. They support quick recognition and a consistent visual language across the platform.

## Accessibility

- Keyboard:
  - Tab: No action (component is not focusable by default)
  - Enter: No action (non-interactive element)
  - Space: No action (non-interactive element)
- Role:
  - Default usage (alt is empty): decorative image, effectively ignored by assistive tech Informative usage (alt provided): img (implicit role from the img element)
- Required attributes:
  - For informative usage: meaningful alt text For decorative usage: alt should be an empty string
- Announced: Not documented
- Focus: Not documented

## Built from

Generated from the component source and CSS, not from ZeroHeight.

- MDS components: none

- Semantic tokens: `--mds-border-radius-lg`, `--mds-border-radius-none`, `--mds-border-radius-xl`, `--mds-border-radius-xs`, `--mds-icons-lg`, `--mds-icons-sm`, `--mds-icons-xl`, `--mds-icons-xxl`, `--mds-spacing-sm`, `--mds-spacing-xs`

## Usage

### Overview

The activity icon component helps keep icon size, colour, and optional background tiles consistent across Moodle.

### When to use

* When you need to show an activity or resource type in a list, card, or activity chooser.
* When users need to scan a page and recognise activity and file types quickly.
* When you need a consistent icon size and optional tile across many different activity icons.
* When you need semantic colour categories such as Assessment or Communication.

#### ❌ When not to use

* Do not use it as the only way to communicate meaning. Use text labels as well.
* Do not use the tile colour to show status such as complete, overdue, or locked. Use a status pattern instead.
* Do not use a specific file type icon when the file type is unknown. Use the generic File icon.

### Variants

#### Category

There’s no prop for this. The category comes from the `icon` you pick, for example `quiz` is always `assessment`.

Category controls the semantic colour tokens applied to the icon glyph and optional background tile.

| **Variant** | **When to use** |
| :--- | :--- |
| | **Assessment** Assessment activities such as graded work and evaluation. Container: `--mds-activity-icon-assessment-bg` when a tile is present |
| | **Collaboration** Activities where learners work together. Container: `--mds-activity-icon-collaboration-bg` when a tile is present |
| | **Communication** Discussion and messaging based activities. Container: `--mds-activity-icon-communication-bg` when a tile is present |
| | **Interactive** Highly interactive activities. Container: `--mds-activity-icon-interactive-bg` when a tile is present |
| | **Resource** Resources and files. Container: `--mds-activity-icon-resource-bg` when a tile is present |
| | **Other** Neutral or uncategorised types. Container: `--mds-activity-icon-other-bg` when a tile is present |

#### Size

Set with the `size` prop. If you leave it out, you get `md`.

Size controls the icon glyph size. The glyph size stays the same for Auto, Default, and Large.

| **Variant** | **When to use** |
| :--- | :--- |
| | **SM** Dense UI such as tables or compact lists. |
| | **MD** (default) Default for most lists and rows. |
| | **LG** Cards and layouts where the icon needs more emphasis. |
| | **XL** Activity chooser and prominent tiles where the icon is a key element. |

#### Container

Set with the `container` prop. If you leave it out, you get `default`.

Container controls whether there is a tile background, and how large that tile is.

| **Variant** | **When to use** |
| :--- | :--- |
| | **None** Icon only. Use when the icon is supporting content and you want a low noise layout. |
| | **Default** Tile background. Use when you need a consistent tile without strong emphasis. Border radius: `--mds-border-radius-xl` SM uses `--mds-border-radius-lg` |
| | **Large** Larger tile background. Use when the icon is a key visual element such as in the activity chooser tile. |

#### Icon

Set with the `icon` prop, using the icon name, for example `assignment`, `forum` or `file-pdf`. It’s required.

Icon selects the symbol that represents the activity, resource, or file type.

| **Variant** | **When to use** |
| :--- | :--- |
| | **Activity module icon** (for example `quiz`) Use for Moodle activities such as Assignment, Forum, Quiz. |
| | **File type icon** (for example `file-pdf`) Use for files when the file type is known such as PDF, PPT, DOC, XLS. |
| | **Generic File icon** (`file-unknown`) Use when the file type is unknown. |

### Guidelines

#### Content design

##### Content structure and constraints

* Always pair the icon with a visible text label for the item name.
* Do not rely on icon shape or colour alone to explain meaning.
* Use the correct icon for the activity or file type. Do not swap icons to create new meaning.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Must pair the icon with a meaningful text label. |
| Don't | | | Must not rely on the icon's shape and colour alone to show the activity type. |

##### Content behaviour

* If the item type changes, update **Icon** and **Category** together.
* When using `Container: None`, the category colour is not visible on screen. Still set Category to match the activity type, because it controls the colour token applied to the icon glyph.
* If file type is unknown, use the generic File icon.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Must use the container colour that matches the icon's category. |
| Don't | | | Must not use a container colour from a different activity category. |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | Icon and Category match even without a container | Must still set Category to match the icon when Container is None, e.g. Icon is Assignment and Category is Assessment. |
| Don't | | Category left as the wrong type when no container is visible | Must not leave Category on the wrong type when Container is None, e.g. Icon is Assignment but Category is Collaboration. |

#### Layout and spacing

* In lists, align the icon and label to the same baseline or vertical centre based on the list item design.
* Keep spacing between the icon and the label consistent within the parent component, for example list item or card.
* Do not mix Default and Large tiles in the same repeated list or grid unless there is a clear hierarchy.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Should use the same container size for every icon in a list. |
| Don't | | | Should not mix container sizes in the same list. |

#### Breakpoints and responsive behaviour

* The component itself does not change at breakpoints.
* Choose the Size variant based on space and density.
* On smaller screens, prefer SM or MD in lists.
* In the activity chooser layout, use LG or XL when space allows.

#### Interaction behaviour *(if applicable)*

* If the icon appears inside a clickable element, the parent element owns hover, pressed, and focus styling.
* Touch target requirements must be met by the parent interactive element, not by the icon tile alone.
* Cursor behaviour comes from the parent interactive element.

#### Accessibility guidelines

##### Colour and contrast

* Use the semantic tokens for icon and background. Do not apply raw palette colours directly.
* Make sure icon only versions have enough contrast against the surface behind them.
* If colour communicates category, provide another cue such as a label or grouping, because colour alone is not enough.

##### Focus

* Focus indicators should appear on the parent interactive element.
* Do not place focus on the icon alone unless it is the control.

##### Labelling

The icon is not a label by itself. Make sure the parent component provides an accessible name, usually the activity or resource name. If the icon is decorative, hide it from assistive technologies in code.

## Design

### Anatomy

1. **Icon glyph:** The activity, resource, or file type symbol.
2. **Container tile (optional):** A coloured background tile used in Default and Large containers. 
3. **Category colour:** The semantic colour system applied to the icon glyph and optional background.

### States

Activity icon is usually static. When it appears inside a clickable component such as a list item, link, button, or card, it follows the states of that parent component. Do not create separate hover or focus states for the icon alone unless the icon is the interactive control.

### Structure

#### Size rules

Size controls only the icon glyph size. The glyph size does not change between Container variants. Only the tile size and padding change.

#### Container sizing

1. **None** is icon only with no background tile
2. **Default** is icon in a smaller coloured tile
3. **Large** is icon in a larger coloured tile

## Code

### Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-activityicon--default)

### Accessibility implementation

#### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| Tab | No action (component is not focusable by default) |
| Enter | No action (non-interactive element) |
| Space | No action (non-interactive element) |

#### ARIA

* Role:
    * Default usage (alt is empty): decorative image, effectively ignored by assistive tech
    * Informative usage (alt provided): img (implicit role from the img element)
* Required attributes:
    * For informative usage: meaningful alt text
    * For decorative usage: alt should be an empty string
* Optional attributes:
    * aria-hidden can be used on the wrapper when the icon is strictly decorative in a larger labeled control
    * aria-label on the wrapper only if you intentionally need to label the wrapper itself (generally not needed when alt is set correctly)

#### Dynamic announcements

None. If the icon changes communicate status updates, the parent context should handle announcements via an aria-live region, not the icon itself
