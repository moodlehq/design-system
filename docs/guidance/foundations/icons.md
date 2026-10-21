---
foundation: Icons
package: "@moodlehq/design-system@5.5.0"
source: https://design.moodle.com/
---

<!-- Generated from ZeroHeight by npm run build-guidance. Do not edit. -->

# Icons

How to choose, from design.moodle.com. Token values below the guidance come from code.

## Icon library

### Icon library

This library provides an overview of the icons currently used in Moodle.

In some cases, the same symbol may be known by **alternative names** in Font Awesome. When this happens, alternative names are listed under the icon.

For more icons go to:

## Overview

### Overview

Icons reinforce meaning and actions and provide visual cues in the interface. Consistent sizing and accessible labelling ensure icons support content rather than replace it.

#### Core principles

* Use approved icons only (avoid mixing icon sets).
* Prefer icon + text for important actions.
* Apply consistent sizes and containers for alignment.
* Provide labels for icon-only controls.

### Usage

#### Icon library

Moodle uses **Font Awesome Free 6.7.2** for all icons, except for icons used in activities and resources, which follow a separate system.

Icons can be adjusted using three main options: **style**, **size**, and **padding**.

#### Styles

There are two styles available: 

* **Solid** is used most often and provides a strong, filled look
* **Outline** (also known as Regular) is a lighter alternative and works well in subtle UI elements.

#### Sizes

Sizes include six predefined options: **XXS**, **SM**, **MD** (default), **LG**, **XL**, and **XXL**. Choose a size based on the layout. Smaller sizes work well inline with text. Larger ones suit featured or attention-grabbing areas.

| `xxs` | 8 px |
| --- | --- |
| `sm` | 12 px |
| `md` | 16 px |
| `lg` | 20 px |
| `xl` | 24 px |
| `xxl` | 32 px |

#### Containers

There are two container variants for icons:

* **Square** (default): Maintains equal height and width. Keeps icons visually aligned in lists, buttons or layouts with fixed spacing. The container is slightly larger than the icon size.
* **Auto**: Adjusts to fit the icon's actual width. Best for use inline with text or when spacing is handled outside the icon.

#### Examples

* Use **Square** containers in lists, tables, and dense layouts
* Use **Auto** inline with text where surrounding layout controls spacing

#### Accessibility considerations

* Icon-only controls require an aria-label and/or tooltip
* Don’t use icons as the only indicator of status or meaning
