---
component: Link
slug: link
package: "@moodlehq/design-system@5.5.0"
status: Ready
source: https://design.moodle.com/98292f05f/v/latest/p/68cbc8-link
import: @moodlehq/design-system/components/link
types: dist/components/link/index.d.ts
---

<!-- Generated from ZeroHeight by npm run build-guidance. Do not edit. -->

# Link

A clickable element that triggers an action or submits a form.

## Look-alikes

Button

Use instead: Button.

## Accessibility

- Keyboard:
  - `Tab`: Moves focus to the link (only when enabled).
  - `Shift + Tab`: Moves focus to the previous interactive element.
  - `Enter`: Activates the link.
  - `Space`: Does not activate the link (native link behaviour).
- Role:
  - Link uses a native anchor element and is exposed as a link role. When `disabled` is true, it still keeps link semantics `role="link"` while interaction is blocked.
- Required attributes:
  - Provide an accessible name. In this component, label is required and is used as the visible/accessibility name. If your use case does not include visible text, provide `aria-label` or `aria-labelledby.`
- Announced:
  - Announcements rely on native link semantics screen readers announce the element as a link when disabled, `aria-disabled="true"` communicates the unavailable state.
- Focus: Not documented

## Built from

Generated from the component source and CSS, not from ZeroHeight.

- MDS components: none

- Semantic tokens: `--mds-focus-default`, `--mds-font-family-base`, `--mds-font-size-paragraph-default`, `--mds-font-weight-regular`, `--mds-icons-xs`, `--mds-letter-spacing-default`, `--mds-line-height-paragraph-xs`, `--mds-spacing-offset`, `--mds-spacing-xs`, `--mds-spacing-xxs`, `--mds-stroke-weight-md`, `--mds-text-default`, `--mds-text-link-primary-default`, `--mds-text-link-primary-disabled`, `--mds-text-link-primary-hover`, `--mds-text-muted`, `--mds-text-subtle`

## Usage

### Overview

Links let users navigate to another page, view, or resource. They communicate where the user will go when tapped or clicked, and they sit naturally within or alongside text content.

#### When to use

* Use when the user needs to navigate to another page, view, or external resource.
* Use when the action belongs inline within a sentence or paragraph and should read as part of the text.
* Use when you need a low-emphasis navigation target that doesn't carry the visual weight of a button.
* Use the External link indicator when the destination opens in a new tab or leaves the current site.

#### ❌ When not to use

* Don't use a link to trigger an action that changes state or submits data. Use a Button instead.
* Don't use a link styled to look like a button when the underlying behaviour is navigation only handle visual weight through the Button component, not by restyling a link.

### Variants

#### Variant

Set with the `variant` prop. If you leave it out, or pass a value that isn’t listed here, you get `primary`.

| **Variant** | | **When to use** |
| :--- | --- | --- |
| | | **Primary (default)** The default link colour for most navigation. Use for standard inline and standalone links. |
| | | **Secondary** Lower-emphasis links that need to be present but shouldn't compete with primary links or surrounding content. |
| | | **Inline** Links that sit inside a sentence or paragraph of body copy. Always underlined so they stay distinguishable from the text around them, and they inherit the surrounding type rather than setting their own. |

#### Icon

The link has 3 icon configurations. Primary and Secondary links can use any of them. Inline links only show an `endIcon`, so a `startIcon` on an inline link won’t appear.

| **Variant** | | **When to use** |
| --- | --- | --- |
| | | **No icon (default)** Use for inline links and most standard navigation. |
| | | **StartIcon** Use when a leading icon adds clarity, such as a download or back-navigation icon before the label. |
| | | **EndIcon** Use when a trailing icon clarifies the destination. The External link indicator is an EndIcon used when the link opens in a new tab or leaves the site. |

### Guidelines

#### Content guidelines

##### Content structure and constraints

* Labels support text only. Links may wrap to a second line when they appear inline within a paragraph this is expected for inline use.
* Recommended label length for standalone links: 1–4 words. Inline links can be longer where the link text describes the destination.
* Links support a StartIcon (prefix), an EndIcon (suffix), or no icon. Don't combine StartIcon and EndIcon in the same link.
* When using the External link indicator, it appears as an EndIcon and signals that the destination opens in a new tab.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD use a single StartIcon or EndIcon, not both, to keep the link's direction of meaning clear. |
| Don't | | | MUST NOT combine a StartIcon and EndIcon on the same link. It isn't supported and it confuses the action. |

##### Copywriting

* Use sentence case. Don't capitalise every word.
* Make the label describe the destination, not the mechanism. "View course settings" is stronger than "Click here" or "Read more".
* Be specific. Link text should make sense when read out of context.
* Don't use punctuation at the end of a standalone link label.
* For external links, make the destination clear so users know they're leaving the site.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD describe the destination in sentence case, e.g. "View grading criteria" or "Download assignment brief". |
| Don't | | | MUST NOT use vague labels like "Click here" or "Read more". They mean nothing out of context for screen reader users. |

#### Placement

* Inline links sit within the text flow and inherit the line height of surrounding content.
* Standalone links can stand on their own line, optionally paired with a StartIcon or EndIcon.
* Avoid placing multiple links so close together that they're hard to distinguish as separate targets.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD give standalone links enough spacing so each one reads as a separate target. |
| Don't | | | SHOULD NOT place 2 standalone links back-to-back with no spacing. They read as one target. |

#### Accessibility guidelines

##### Colour and contrast

* Link text meets 4.5:1 contrast ratio against its background.
* Disabled state contrast is intentionally reduced. Don't rely on disabled alone to communicate unavailability to screen reader users. Supplement with `aria-disabled` or accessible copy.

##### Focus

* The focus ring must be visible on all background colours used in your layout. Avoid placing buttons on dark backgrounds where the focus ring becomes invisible.

##### Labelling

* Always provide descriptive link text. Avoid "Click here" or "Read more" as the sole link text.
* For external links, announce that the link opens in a new tab via accessible copy or an aria-label so screen reader users aren't surprised by the context change.

## Code

### Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-link--default)

Props and types (TypeScript API): [Link.d.ts](https://unpkg.com/@moodlehq/design-system@5.5.0/dist/components/link/Link.d.ts)

Full list of props and their types for Link.

### Accessibility implementation

#### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus to the link (only when enabled). |
| `Shift + Tab` | Moves focus to the previous interactive element. |
| `Enter` | Activates the link. |
| `Space` | Does not activate the link (native link behaviour). |

#### ARIA

* Role:
    * Link uses a native anchor element and is exposed as a link role.
    * When `disabled` is true, it still keeps link semantics `role="link"` while interaction is blocked.
* Required attributes:
    * Provide an accessible name.
    * In this component, label is required and is used as the visible/accessibility name.
    * If your use case does not include visible text, provide `aria-label` or `aria-labelledby.`
* Optional attributes:
    * `aria-disabled` is applied automatically when disabled is true.
    * Additional anchor ARIA attributes can be passed through as needed (for example `aria-current` for current-page links).

#### Dynamic announcements

* Announcements rely on native link semantics:
    * screen readers announce the element as a link
    * when disabled, `aria-disabled="true"` communicates the unavailable state.

## Specs

### Anatomy

1. **Label**: the text that communicates where the link will navigate to. Always required.
2. **Underline**: appears on hover to reinforce that the text is interactive. Not present in the default resting state.
3. **Icon** (Optional): place before (startIcon) or after (endIcon) the label only when it adds meaning, not decoration. The most common use of an EndIcon is the External link indicator, signalling the destination opens in a new tab or leaves the site.

### States

#### Primary

| | **Default** The link's resting state. Confirm the label clearly describes the destination before any interaction begins. No underline. |
| :--- | :--- |
| | **Hover** Triggered when the cursor moves over the link. Don't suppress or override this state. Users rely on it to identify interactive text. The label changes colour and gets an underline. |
| | **Active / Pressed** Triggered while the link is being pressed. Transitions away immediately on release. Don't hold this state. |
| | **Disabled** Applied when the destination is genuinely unavailable. Don't use as a substitute for removing a link entirely. If the action will never be available, consider not rendering the link at all. No underline. |
| | **Focus** Triggered via keyboard navigation (Tab key). Must remain visible on all backgrounds used in your layout. A 2px focus line shows under the link. |

#### Secondary

| | **Default** The link's resting state. Confirm the label clearly describes the destination before any interaction begins. No underline. |
| :--- | :--- |
| | **Hover** Triggered when the cursor moves over the link. Don't suppress or override this state. Users rely on it to identify interactive text. The label changes colour and gets an underline. |
| | **Active / Pressed** Triggered while the link is being pressed. Transitions away immediately on release. Don't hold this state. |
| | **Disabled** Applied when the destination is genuinely unavailable. Don't use as a substitute for removing a link entirely. If the action will never be available, consider not rendering the link at all. No underline. |
| | **Focus** Triggered via keyboard navigation (Tab key). Must remain visible on all backgrounds used in your layout. A 2px focus line shows under the link. |

#### Inline

| | **Default** The link's resting state inside body copy. Underline is always present. |
| :--- | :--- |
| | **Hover** Triggered when the cursor moves over the link. The label changes colour. |
| | **Active / Pressed** Triggered while the link is being pressed. |
| | **Disabled** Rarely appropriate inline. A disabled link mid-sentence reads as broken text rather than as an unavailable action, and the reduced contrast can fail against body copy. Prefer rendering plain text and, if needed, explaining the unavailability in the sentence itself. No underline. |
| | **Focus** Triggered via keyboard navigation (Tab key). Must remain visible on all backgrounds used in your layout. The underline is replaced by a 2px focus line. |

### Layout and sizing

* The link width is determined by the label length.
* Inline links flow with the surrounding text and wrap naturally at line breaks.

### Behaviour

* Cursor: pointer on hover, not-allowed when disabled.
* Use disabled state only when the action is genuinely unavailable.

### Responsive behaviour

* Inline links wrap with their surrounding text at all breakpoints.
