---
component: Button
slug: button
package: "@moodlehq/design-system@5.4.0"
status: Ready
source: https://design.moodle.com/98292f05f/v/latest/p/877c50-button
import: @moodlehq/design-system/components/button
types: dist/components/button/index.d.ts
---

# Button

A clickable element that triggers an action or submits a form.

## Look-alikes

Link

Use instead: Link; Secondary button and rely on confirmation copy.

## Accessibility

- Keyboard:
  - `Tab`: Moves focus to the button
  - `Shift + Tab`: Moves focus to the previous interactive element
  - `Space`: Presses the button
- Role:
  - Button uses a native `button` element (implicit button role).
- Required attributes:
  - Provide an accessible name using one of visible `label` text, or `aria-label`, or `aria-labelledby`. For icon-only usage, `aria-label` (or `aria-labelledby`) is required.
- Announced:
  - Screen readers announce button activation and state through native button semantics.
  - If your flow needs explicit status messaging after click (for example, “Saved” or “Error”), add an app-level live region in the consuming experience.
- Focus: Not documented

## Built from

Generated from the component source and CSS, not from ZeroHeight.

- MDS components: none

- Semantic tokens: `--mds-bg-interactive-danger-active`, `--mds-bg-interactive-danger-default`, `--mds-bg-interactive-danger-disabled`, `--mds-bg-interactive-danger-hover`, `--mds-bg-interactive-primary-active`, `--mds-bg-interactive-primary-default`, `--mds-bg-interactive-primary-disabled`, `--mds-bg-interactive-primary-hover`, `--mds-bg-interactive-secondary-active`, `--mds-bg-interactive-secondary-default`, `--mds-bg-interactive-secondary-disabled`, `--mds-bg-interactive-secondary-hover`, `--mds-border-interactive-danger-default`, `--mds-border-interactive-danger-disabled`, `--mds-border-interactive-primary-default`, `--mds-border-interactive-primary-disabled`, `--mds-border-interactive-secondary-active`, `--mds-border-interactive-secondary-default`, `--mds-border-interactive-secondary-disabled`, `--mds-border-interactive-secondary-hover`, `--mds-border-radius-md`, `--mds-border-radius-sm`, `--mds-border-radius-xl`, `--mds-focus-danger`, `--mds-focus-default`, `--mds-font-family-base`, `--mds-font-size-paragraph-default`, `--mds-font-size-paragraph-small`, `--mds-font-weight-medium`, `--mds-font-weight-regular`, `--mds-icons-xs`, `--mds-icons-xxs`, `--mds-letter-spacing-default`, `--mds-line-height-paragraph-xs`, `--mds-spacing-md`, `--mds-spacing-offset`, `--mds-spacing-sm`, `--mds-spacing-xs`, `--mds-spacing-xxs`, `--mds-stroke-weight-md`, `--mds-stroke-weight-sm`, `--mds-text-danger`, `--mds-text-danger-disabled`, `--mds-text-inverse`, `--mds-text-link-primary-default`, `--mds-text-link-primary-disabled`, `--mds-text-muted`, `--mds-text-subtle`

## Usage

### Overview

Buttons let users trigger actions or navigate to a next step. They communicate what will happen when tapped or clicked, and their visual weight signals the importance of the action relative to others on the screen.

### When to use

* Use when the user needs to trigger an action that changes state or submits data — for example, saving a form, confirming a selection, or starting a process.
* Use when the action needs a clear, tappable target with a descriptive label.
* Use when you need to signal hierarchy between actions — pair a Primary with a Secondary to communicate which action is recommended.
* Use a Danger button when the action is destructive and the consequence is significant or hard to undo.

#### **❌ When not to use**

* Don't use a button for navigation to another page — use a Link instead.
* Don't use a Danger button for actions that are reversible — use a Secondary button and rely on confirmation copy instead.

### Variants

#### Type

The button has 3 variant groups — role, style, and size — that can be combined independently.

| **Variant** | **When to use** |
| :--- | --- |
| | ****Primary**** The single most important action in a view. Use only 1 primary button per screen or section. |
| | ****Secondary**** Supporting actions that are relevant but not the main call to action. Can appear alongside a primary button. |
| | ****Danger**** Destructive or irreversible actions, such as deleting content or revoking access. |
| | ****Ghost**** Low-emphasis actions that need to be present but shouldn't compete visually. Use for tertiary actions, toolbar controls, or actions within already-styled containers like cards or banners. |

#### Style

Style variants apply to Primary, Secondary, and Danger buttons only. Ghost has a fixed style and cannot be combined with Fill or Outline.

| **Variant** | **When to use** |
| :--- | --- |
| | ****Fill**** Default style for most contexts. Use when the button needs clear visual prominence. |
| | ****Outline**** Use when the button needs to feel lighter — for example, in toolbars, card footers, or alongside a fill button of the same role. |

#### Size

| **Variant** | **When to use** |
| :--- | --- |
| | ****Large**** Use in hero areas, empty states, or standalone CTAs where extra visual weight is needed. |
| | ****Medium (default)**** The standard size for most interface contexts. |
| | ****Small**** Use in dense layouts such as tables, inline actions, or compact toolbars. |
| | ****Large Icon-only**** Square container with rounded corners, matching the Default button height. Use in toolbars and action bars where icon buttons sit alongside labelled buttons. |
| | ****Medium Icon-only**** Circular container. Use for standalone icon actions where a label isn't needed but the button needs standard tap target sizing. |
| | ****Small Icon-only**** Circular container. Use for low-prominence actions in tight spaces, such as overflow menus on cards or inline controls. |

### Guidelines

#### Content design

##### **Content structure and constraints**

* Labels support text only. No hard truncation — avoid labels that wrap to a second line.
* Recommended label length: 1–4 words.
* Buttons support a prefix icon, suffix icon, or icon-only configuration. Don't combine prefix and suffix icons in the same button.
* When using an icon-only button, the visible label is hidden but a text label must still be provided for screen readers.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Keep labels to 1–4 words. |
| Don't | | | Don't use labels that wrap to a second line. |

##### **Content behaviour**

* The button width is determined by the label length, not a fixed container width (Hug behaviour).
* In full-width contexts such as mobile bottom bars, the button fills the container width.

##### **Copywriting** *(if applicable)*

* Use sentence case. Don't capitalise every word.
* Start with an action verb: "Save changes", "Delete account", "Continue".
* Be specific. "Submit" is weaker than "Save changes". "OK" is never acceptable.
* Don't use punctuation at the end of a label.
* For Danger buttons, name the destructive action explicitly: "Delete course", not just "Confirm".

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Use a specific label that describes the outcome. |
| Don't | | | Avoid generic labels that don't tell the user what will happen. |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Name the destructive action explicitly. |
| Don't | | | Don't use generic confirmation labels on Danger buttons. |

#### Layout and spacing

* Place the primary action on the right when buttons appear in a group.
* In modal footers and form footers, align buttons to the right.
* In full-width mobile contexts, stack buttons vertically with the primary on top.
* Don't place more than 1 primary button in the same view.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Place the primary action on the right in a button group. |
| Don't | | | Don't lead with the primary action on the left. |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Use one primary button per view. |
| Don't | | | Don't use two primary buttons in the same context. |

#### Responsive behaviour

* At small breakpoints, buttons can expand to full width in single-column layouts.
* Size variant doesn't change automatically at breakpoints — choose the size intentionally for the context

#### Interaction behaviour

* Cursor: pointer on hover, not-allowed when disabled.
* Use disabled state only when the action is genuinely unavailable.

#### Accessibility guidelines

##### **Colour and contrast**

* All Fill variants meet 4.5:1 text contrast ratio against their background colour.
* For Outline variants, ensure the border meets 3:1 against the surrounding background.
* Disabled state contrast is intentionally reduced. Don't rely on disabled alone to communicate unavailability to screen reader users — supplement with `aria-disabled` or accessible copy.

##### **Focus**

* The focus ring must be visible on all background colours used in your layout. Avoid placing buttons on dark backgrounds where the focus ring becomes invisible.

##### **Labelling**

* Always provide a text label. For icon-only buttons, this can be visually hidden and provided via `aria-label`.
* If the label is dynamic (e.g. "Loading..."), ensure the change is announced to screen readers.

## Design

### Anatomy

1. **Label** — the text that communicates the action the button will perform. Always required.
2. **Container** — the bounding shape that defines the button's clickable area and visual weight.
3. **Border** *(Outline variant only)* — the stroke that defines the button boundary. Not present in Fill buttons.
4. **Icon** (Optional): Place before (startIcon) or after (endIcon) the label only when it adds meaning, not decoration.

### States

#### Primary fill

| | **Default** The button's resting state. Confirm the label clearly communicates the action before any interaction begins. Label: `text.inverse` Container: `bg.interactive.primary.default` |
| :--- | :--- |
| | **Hover** Triggered when the cursor moves over the button. Don't suppress or override this state — users rely on it to identify interactive elements. Label: `text.inverse` Container: `bg.interactive.primary.hover` |
| | **Active / Pressed** Triggered while the button is being pressed. Transitions away immediately on release — don't hold this state. Label: `text.inverse` Container: `bg.interactive.primary.active` |
| | **Disabled** Applied when the action is unavailable. Don't use as a substitute for validation — keep the button active and show errors on the relevant fields instead. Label: `text.inverse` Container: `bg.interactive.primary.disabled` |
| | **Focus** Triggered via keyboard navigation (Tab key). Must remain visible on all backgrounds used in your layout. Label: `text.inverse` Container: `bg.interactive.primary.default` Outline: `focus.default` |

#### Primary outline

| | **Default** Label: `text.link.primary.default` Border: `border.interactive.primary.default` |
| :--- | :--- |
| | **Hover:** Label: `text.inverse` Container: `bg.interactive.primary.hover` |
| | **Active:** Label: `text.inverse` Container: `bg.interactive.primary.active` |
| | **Disabled:** Label: `text.link.primary.disabled` Border: `border.interactive.primary.disabled` |
| | **Focus:** Label: `text.link.primary.default` Border: `border.interactive.primary.default` Outline: `focus.default` |

#### Secondary fill

| | **Default** The button's resting state. Confirm the label clearly communicates the action before any interaction begins. Label: `text.subtle` Container: `bg.interactive.secondary.default` |
| :--- | :--- |
| | **Hover** Triggered when the cursor moves over the button. Don't suppress or override this state — users rely on it to identify interactive elements. Label: `text.subtle` Container: `bg.interactive.secondary.hover` |
| | **Active / Pressed** Triggered while the button is being pressed. Transitions away immediately on release — don't hold this state. Label: `text.subtle` Container: `bg.interactive.secondary.active` |
| | **Disabled** Applied when the action is unavailable. Don't use as a substitute for validation — keep the button active and show errors on the relevant fields instead. Label: `text.muted` Container: `bg.interactive.secondary.disabled` |
| | **Focus** Triggered via keyboard navigation (Tab key). Must remain visible on all backgrounds used in your layout. Label: `text.subtle` Container: `bg.interactive.secondary.default` Outline: `focus.default` |

#### Secondary outline

| | **Default** Label: `text.subtle` Border: `border.interactive.secondary.default` |
| :--- | :--- |
| | **Hover:** Label: `text.inverse` Container: `border.interactive.secondary.hover` |
| | **Active:** Label: `text.inverse` Container: `border.interactive.secondary.active` |
| | **Disabled:** Label: `text.muted` Border: `border.interactive.secondary.disabled` |
| | **Focus:** Label: `text.subtle` Border: `border.interactive.secondary.default` Outline: `focus.default` |

#### Danger fill

| | **Default** The button's resting state. Confirm the label clearly communicates the action before any interaction begins. Label: `text.inverse` Container: `bg.interactive.danger.default` |
| :--- | :--- |
| | **Hover** Triggered when the cursor moves over the button. Don't suppress or override this state — users rely on it to identify interactive elements. Label: `text.inverse` Container: `bg.interactive.danger.hover` |
| | **Active / Pressed** Triggered while the button is being pressed. Transitions away immediately on release — don't hold this state. Label: `text.inverse` Container: `bg.interactive.danger.active` |
| | **Disabled** Applied when the action is unavailable. Don't use as a substitute for validation — keep the button active and show errors on the relevant fields instead. Label: `text.inverse` Container: `bg.interactive.danger.disabled` |
| | **Focus** Triggered via keyboard navigation (Tab key). Must remain visible on all backgrounds used in your layout. Label: `text.inverse` Container: `bg.interactive.danger.default` Outline: `focus.danger` |

#### Danger outline

| | **Default** Label: `text.danger` Container: `border.interactive.danger.default` |
| :--- | :--- |
| | **Hover** Label: `text.inverse` Container: `bg.interactive.danger.hover` |
| | **Active / Pressed** Label: `text.inverse` Container: `bg.interactive.danger.active` |
| | **Disabled** Label: `text.danger disabled` Container: `border.interactive.danger.disabled` |
| | **Focus** Label: `text.danger` Container: `border.interactive.danger.default` Outline: `focus.danger` |

#### Ghost

| | **Default** The button's resting state. Confirm the label clearly communicates the action before any interaction begins. Label: `text.subtle` Container: `none` |
| :--- | :--- |
| | **Hover** Triggered when the cursor moves over the button. Don't suppress or override this state — users rely on it to identify interactive elements. Label: `text.subtle` Container: `bg.interactive.secondary.hover` |
| | **Active / Pressed** Triggered while the button is being pressed. Transitions away immediately on release — don't hold this state. Label: `text.subtle` Container: `bg.interactive.secondary.active` |
| | **Disabled** Applied when the action is unavailable. Don't use as a substitute for validation — keep the button active and show errors on the relevant fields instead. Label: `text.muted` Container: `none` |
| | **Focus** Triggered via keyboard navigation (Tab key). Must remain visible on all backgrounds used in your layout. Label: `text.subtle` Outline: `focus.default` Container: `none` |

## Code

### Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default Primary](https://moodlehq.github.io/design-system/iframe.html?id=components-button--default-primary)

### Accessibility implementation

#### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus to the button |
| `Shift + Tab` | Moves focus to the previous interactive element |
| `Space` | Presses the button |

#### ARIA

* Role:
    * Button uses a native `button` element (implicit button role).
* Required attributes:
    * Provide an accessible name using one of:
        * visible `label` text, or
        * `aria-label`, or
        * `aria-labelledby`.
    * For icon-only usage, `aria-label` (or `aria-labelledby`) is required.
* Optional attributes:
    * `disabled` can be used to expose disabled button state natively.
    * Any standard button ARIA/state attributes may be passed when relevant to context (for example `aria-expanded`, `aria-controls`, `aria-pressed` when used as a toggle in a consuming pattern).

#### Dynamic announcements

* Screen readers announce button activation and state through native button semantics.
* If your flow needs explicit status messaging after click (for example, “Saved” or “Error”), add an app-level live region in the consuming experience.
