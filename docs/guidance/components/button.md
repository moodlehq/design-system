---
component: Button
slug: button
package: "@moodlehq/design-system@5.4.0"
status: Ready
source: https://design.moodle.com/98292f05f/v/latest/p/877c50-button
import: @moodlehq/design-system/components/button
types: dist/components/button/index.d.ts
---

<!-- Generated from ZeroHeight by npm run build-guidance. Do not edit. -->

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

* Use when the user needs to trigger an action that changes state or submits data, for example, saving a form, confirming a selection, or starting a process.
* Use when the action needs a clear, tappable target with a descriptive label.
* Use when you need to signal hierarchy between actions. Pair a Primary with a Secondary to communicate which action is recommended.
* Use a Danger button when the action is destructive and the consequence is significant or hard to undo.

#### **❌ When not to use**

* Don't use a button for navigation to another page. Use a Link instead.
* Don't use a Danger button for actions that are reversible. Use a Secondary button and rely on confirmation copy instead.

### Variants

#### Variant

Button has 2 props that change how it looks: `variant` and `size`. The `variant` value sets both the colour (Primary, Secondary, Danger or Ghost) and the style (Fill or Outline), e.g. `outline-primary`. If you leave it out, you get `primary`.

| **Variant** | **When to use** |
| :--- | --- |
| | **Primary ** The single most important action in a view. Use only 1 primary button per screen or section. |
| | **Secondary ** Supporting actions that are relevant but not the main call to action. Can appear alongside a primary button. |
| | **Danger ** Destructive or irreversible actions, such as deleting content or revoking access. |
| | **Ghost ** Low-emphasis actions that need to be present but shouldn't compete visually. Use for tertiary actions, toolbar controls, or actions within already-styled containers like cards or banners. |

#### Fill or outline

Fill and Outline aren’t a separate prop. They’re part of the `variant` value: Fill is the plain value and Outline adds `outline-` to the front. Primary, Secondary and Danger come in both. Ghost has its own fixed style and has no outline version.

| **Variant** | **When to use** |
| :--- | --- |
| | **Fill (`primary`, `secondary`, `danger`)** Default style for most contexts. Use when the button needs clear visual prominence. |
| | **Outline (`outline-primary`, `outline-secondary`, `outline-danger`)** Use when the button needs to feel lighter, for example, in toolbars, card footers, or alongside a fill button of the same role. |

#### Size

Set with the `size` prop. If you leave it out, you get `md`.

| **Variant** | **When to use** |
| :--- | --- |
| | **Large (`lg`)** Use in hero areas, empty states, or standalone CTAs where extra visual weight is needed. |
| | **Medium (`md`, default)** The standard size for most interface contexts. |
| | **Small (`sm`)** Use in dense layouts such as tables, inline actions, or compact toolbars. |

#### Icon-only

Icon-only isn’t a size. A button is icon-only when it has a `startIcon` or `endIcon` and no `label`. It works with every `variant` and `size`, and it must have an `aria-label` or `aria-labelledby` so screen readers can name it.

| **Variant** | **When to use** |
| :--- | --- |
| | **Large icon-only (`size="lg"`)** Square container with rounded corners, matching the Default button height. Use in toolbars and action bars where icon buttons sit alongside labelled buttons. |
| | **Medium icon-only (`size="md"`)** Circular container. Use for standalone icon actions where a label isn't needed but the button needs standard tap target sizing. |
| | **Small icon-only (`size="sm"`)** Circular container. Use for low-prominence actions in tight spaces, such as overflow menus on cards or inline controls. |

### Guidelines

#### Content design

##### **Content structure and constraints**

* Labels support text only. No hard truncation. Avoid labels that wrap to a second line.
* Recommended label length: 1–4 words.
* Buttons support a prefix icon, suffix icon, or icon-only configuration. Don't combine prefix and suffix icons in the same button.
* When using an icon-only button, the visible label is hidden but a text label must still be provided for screen readers.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD keep labels to 1 to 4 words. |
| Don't | | | SHOULD NOT use labels that wrap to a second line. |

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
| Do | | | SHOULD use a specific label that describes the outcome. |
| Don't | | | SHOULD NOT use generic labels that don't tell people what will happen. |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | MUST name the destructive action explicitly. |
| Don't | | | MUST NOT use generic confirmation labels on Danger buttons. |

#### Layout and spacing

* Place the primary action on the right when buttons appear in a group.
* In modal footers and form footers, align buttons to the right.
* In full-width mobile contexts, stack buttons vertically with the primary on top.
* Don't place more than 1 primary button in the same view.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD place the primary action on the right in a button group. |
| Don't | | | SHOULD NOT lead with the primary action on the left. |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | MUST use only 1 primary button per view. |
| Don't | | | MUST NOT use 2 primary buttons in the same context. |

#### Responsive behaviour

* At small breakpoints, buttons can expand to full width in single-column layouts.
* Size variant doesn't change automatically at breakpoints. Choose the size intentionally for the context

#### Interaction behaviour

* Cursor: pointer on hover, not-allowed when disabled.
* Use disabled state only when the action is genuinely unavailable.

#### Accessibility guidelines

##### **Colour and contrast**

* All Fill variants meet 4.5:1 text contrast ratio against their background colour.
* For Outline variants, ensure the border meets 3:1 against the surrounding background.
* Disabled state contrast is intentionally reduced. Don't rely on disabled alone to communicate unavailability to screen reader users. Supplement with `aria-disabled` or accessible copy.

##### **Focus**

* The focus ring must be visible on all background colours used in your layout. Avoid placing buttons on dark backgrounds where the focus ring becomes invisible.

##### **Labelling**

* Always provide a text label. For icon-only buttons, this can be visually hidden and provided via `aria-label`.
* If the label is dynamic (e.g. "Loading..."), ensure the change is announced to screen readers.

## Design

### Anatomy

1. **Label**: the text that communicates the action the button will perform. Always required.
2. **Container**: the bounding shape that defines the button's clickable area and visual weight.
3. **Border** *(Outline variant only)*: the stroke that defines the button boundary. Not present in Fill buttons.
4. **Icon** (Optional): Place before (startIcon) or after (endIcon) the label only when it adds meaning, not decoration.

### States

#### Primary fill

| | **Default** The button's resting state. Confirm the label clearly communicates the action before any interaction begins. Background is `--mds-bg-interactive-primary-default` and the label uses `--mds-text-inverse`. |
| :--- | :--- |
| | **Hover** Triggered when the cursor moves over the button. Don't suppress or override this state. Users rely on it to identify interactive elements. Background changes to `--mds-bg-interactive-primary-hover`. |
| | **Active / Pressed** Triggered while the button is being pressed. Transitions away immediately on release. Don't hold this state. Background changes to `--mds-bg-interactive-primary-active`. |
| | **Disabled** Applied when the action is unavailable. Don't use as a substitute for validation. Keep the button active and show errors on the relevant fields instead. Background changes to `--mds-bg-interactive-primary-disabled` and the label uses `--mds-text-inverse`. |
| | **Focus** Triggered via keyboard navigation (Tab key). Must remain visible on all backgrounds used in your layout. A 2px ring (`--mds-stroke-weight-md`, `--mds-focus-default`) shows around the button, offset by `--mds-spacing-offset`. |

#### Primary outline

| | **Default** The button’s resting state. Transparent background with a 1px border (`--mds-stroke-weight-sm`) in `--mds-border-interactive-primary-default`. The label uses `--mds-text-link-primary-default`. |
| :--- | :--- |
| | **Hover** Shown when the cursor is over the button. The button fills with `--mds-bg-interactive-primary-hover` and the label turns `--mds-text-inverse`. |
| | **Active** Shown while the button is being pressed. The button fills with `--mds-bg-interactive-primary-active` and the label turns `--mds-text-inverse`. |
| | **Disabled** Shown when the action is unavailable. Transparent background with a `--mds-border-interactive-primary-disabled` border. The label uses `--mds-text-link-primary-disabled`. |
| | **Focus** Shown when the button gets keyboard focus (Tab key). A 2px ring (`--mds-stroke-weight-md`, `--mds-focus-default`) shows around the button, offset by `--mds-spacing-offset`. |

#### Secondary fill

| | **Default** The button's resting state. Confirm the label clearly communicates the action before any interaction begins. Background is `--mds-bg-interactive-secondary-default` and the label uses `--mds-text-subtle`. |
| :--- | :--- |
| | **Hover** Triggered when the cursor moves over the button. Don't suppress or override this state. Users rely on it to identify interactive elements. Background changes to `--mds-bg-interactive-secondary-hover`. |
| | **Active / Pressed** Triggered while the button is being pressed. Transitions away immediately on release. Don't hold this state. Background changes to `--mds-bg-interactive-secondary-active`. |
| | **Disabled** Applied when the action is unavailable. Don't use as a substitute for validation. Keep the button active and show errors on the relevant fields instead. Background changes to `--mds-bg-interactive-secondary-disabled` and the label uses `--mds-text-muted`. |
| | **Focus** Triggered via keyboard navigation (Tab key). Must remain visible on all backgrounds used in your layout. A 2px ring (`--mds-stroke-weight-md`, `--mds-focus-default`) shows around the button, offset by `--mds-spacing-offset`. |

#### Secondary outline

| | **Default** The button’s resting state. Transparent background with a 1px border (`--mds-stroke-weight-sm`) in `--mds-border-interactive-secondary-default`. The label uses `--mds-text-subtle`. |
| :--- | :--- |
| | **Hover** Shown when the cursor is over the button. The button fills with `--mds-border-interactive-secondary-hover` and the label turns `--mds-text-inverse`. |
| | **Active** Shown while the button is being pressed. The button fills with `--mds-border-interactive-secondary-active` and the label turns `--mds-text-inverse`. |
| | **Disabled** Shown when the action is unavailable. Transparent background with a `--mds-border-interactive-secondary-disabled` border. The label uses `--mds-text-muted`. |
| | **Focus** Shown when the button gets keyboard focus (Tab key). A 2px ring (`--mds-stroke-weight-md`, `--mds-focus-default`) shows around the button, offset by `--mds-spacing-offset`. |

#### Danger fill

| | **Default** The button's resting state. Confirm the label clearly communicates the action before any interaction begins. Background is `--mds-bg-interactive-danger-default` and the label uses `--mds-text-inverse`. |
| :--- | :--- |
| | **Hover** Triggered when the cursor moves over the button. Don't suppress or override this state. Users rely on it to identify interactive elements. Background changes to `--mds-bg-interactive-danger-hover`. |
| | **Active / Pressed** Triggered while the button is being pressed. Transitions away immediately on release. Don't hold this state. Background changes to `--mds-bg-interactive-danger-active`. |
| | **Disabled** Applied when the action is unavailable. Don't use as a substitute for validation. Keep the button active and show errors on the relevant fields instead. Background changes to `--mds-bg-interactive-danger-disabled` and the label uses `--mds-text-inverse`. |
| | **Focus** Triggered via keyboard navigation (Tab key). Must remain visible on all backgrounds used in your layout. A 2px ring (`--mds-stroke-weight-md`, `--mds-focus-danger`) shows around the button, offset by `--mds-spacing-offset`. |

#### Danger outline

| | **Default** The button’s resting state. Transparent background with a 1px border (`--mds-stroke-weight-sm`) in `--mds-border-interactive-danger-default`. The label uses `--mds-text-danger`. |
| :--- | :--- |
| | **Hover** Shown when the cursor is over the button. The button fills with `--mds-bg-interactive-danger-hover` and the label turns `--mds-text-inverse`. |
| | **Active / Pressed** Shown while the button is being pressed. The button fills with `--mds-bg-interactive-danger-active` and the label turns `--mds-text-inverse`. |
| | **Disabled** Shown when the action is unavailable. Transparent background with a `--mds-border-interactive-danger-disabled` border. The label uses `--mds-text-danger-disabled`. |
| | **Focus** Shown when the button gets keyboard focus (Tab key). A 2px ring (`--mds-stroke-weight-md`, `--mds-focus-danger`) shows around the button, offset by `--mds-spacing-offset`. |

#### Ghost

| | **Default** The button's resting state. Confirm the label clearly communicates the action before any interaction begins. Transparent background with no border. The label uses `--mds-text-subtle`. |
| :--- | :--- |
| | **Hover** Triggered when the cursor moves over the button. Don't suppress or override this state. Users rely on it to identify interactive elements. Background changes to `--mds-bg-interactive-secondary-hover`. |
| | **Active / Pressed** Triggered while the button is being pressed. Transitions away immediately on release. Don't hold this state. Background changes to `--mds-bg-interactive-secondary-active`. |
| | **Disabled** Applied when the action is unavailable. Don't use as a substitute for validation. Keep the button active and show errors on the relevant fields instead. Transparent background. The label uses `--mds-text-muted`. |
| | **Focus** Triggered via keyboard navigation (Tab key). Must remain visible on all backgrounds used in your layout. A 2px ring (`--mds-stroke-weight-md`, `--mds-focus-default`) shows around the button, offset by `--mds-spacing-offset`. |

## Code

### Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default Primary](https://moodlehq.github.io/design-system/iframe.html?id=components-button--default-primary)

Props and types (TypeScript API): [Button.d.ts](https://unpkg.com/@moodlehq/design-system@5.4.0/dist/components/button/Button.d.ts)

Full list of props and their types for Button.

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
