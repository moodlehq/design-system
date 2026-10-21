---
component: Alert
slug: alert
package: "@moodlehq/design-system@5.5.0"
status: Ready
source: https://design.moodle.com/98292f05f/v/latest/p/3918ca-alert
import: @moodlehq/design-system/components/alert
types: dist/components/alert/index.d.ts
---

<!-- Generated from ZeroHeight by npm run build-guidance. Do not edit. -->

# Alert

A contextual message that draws attention to important information without interrupting the task at hand.

## Accessibility

- Keyboard:
  - `Tab`: Moves focus to the next interactive element inside the Alert (link, action button, or dismiss button), following DOM order
  - `Enter` / `Space`: Activates the focused button (dismiss or action)
- Role:
  - `alert` on Danger and Warning variants; `status` on Success and Info variants.
- Required attributes:
  - `aria-label` on the dismiss button (e.g. "Close").
- Announced:
  - On dismiss, focus moves programmatically to the next focusable element in the DOM. No transition or animation is implemented in this version.
- Focus: Not documented

## Props

Generated from the component TypeScript types, not from ZeroHeight. Inherited HTML attributes are not listed.

### AlertProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `AlertType` |  | Semantic alert type that controls icon, colours, and live-region role. |
| `title` | `string` |  | Optional heading above the message body. |
| `message` (required) | `string` |  | Required alert message content. |
| `isDismissible` | `boolean` | `true` | Shows a dismiss control that removes the alert from the page. Defaults to true. |
| `dismissAriaLabel` | `string` | `'Dismiss alert'` | Accessible label for the dismiss control. Defaults to 'Dismiss alert'. |
| `onDismiss` | `() => void` |  | Callback fired after the alert is dismissed. |
| `isActionable` | `boolean` | `false` | Shows a single inline action button below the message. |
| `actionLabel` | `string` |  | Visible action button label. Required when actionable. |
| `onAction` | `ButtonProps['onClick']` |  | Click handler for the action button. |
| `actionButtonProps` | `Omit< ButtonProps, 'label' \| 'variant' \| 'onClick' \| 'type' \| 'startIcon' \| 'endIcon' >` |  | Additional props forwarded to the action Button component. |
| `children` | `ReactNode` |  | Optional custom content rendered in the custom slot. |

Allowed values:

- `type`: `info`, `success`, `warning`, `danger`

## Built from

Generated from the component source and CSS, not from ZeroHeight.

- MDS components: button, close-button

- Semantic tokens: `--mds-bg-feedback-danger-default`, `--mds-bg-feedback-danger-light`, `--mds-bg-feedback-primary-default`, `--mds-bg-feedback-primary-light`, `--mds-bg-feedback-success-default`, `--mds-bg-feedback-success-light`, `--mds-bg-feedback-warning-default`, `--mds-bg-feedback-warning-light`, `--mds-border-feedback-danger`, `--mds-border-feedback-primary`, `--mds-border-feedback-success`, `--mds-border-feedback-warning`, `--mds-border-radius-md`, `--mds-font-family-base`, `--mds-font-size-headings-6`, `--mds-font-size-paragraph-default`, `--mds-font-weight-medium`, `--mds-font-weight-regular`, `--mds-line-height-headings-6`, `--mds-line-height-paragraph-default`, `--mds-spacing-md`, `--mds-spacing-xs`, `--mds-stroke-weight-sm`, `--mds-text-feedback-danger`, `--mds-text-feedback-primary`, `--mds-text-feedback-success`, `--mds-text-feedback-warning`, `--mds-text-link-primary-default`

## Usage

### Overview

Alerts communicate the outcome of an action, a status or condition, or important contextual information the user needs to know. They sit in the page flow, near the content they relate to, and stay visible until the user dismisses them or navigates away.

Every alert should clearly state what happened and what the user needs to know.

#### When to use

Use alert when:

* Confirming the outcome of an action that the user might want to reference or act on (e.g. "Backup complete. You can access the backup on the restore page."). 
* Surfacing something that needs attention (e.g. an expired session, a registration status).
* A warning or error needs to persist on the page until people act on or dismiss it.
* The message is tied to the current page or section.

#### ❌ When not to use

* Don't use for brief confirmations that don't need to stay on the page. Use toast instead.
* Don't use for form field-level validation errors. Use inline field validation instead.
* Don't use for high-priority blocking messages that require user confirmation before continuing. Use a Modal/Dialog instead.

### Variants

#### Type

Set with the `type` prop. If you leave it out, you get `info`.

The type of alert tells people what kind of message this is: whether something went wrong, succeeded, or needs attention. Alert supports four types: Info, Success, Warning, and Danger. A smaller set of types makes alerts easier for people to recognise and interpret at a glance.

| **Variant** | **When to use** |
| :--- | :--- |
| | **Info (default)** Background information that's useful but doesn't require action. |
| | **Success** Confirms that an action completed as expected. |
| | **Warning** Something needs attention but isn't yet an error. |
| | **Danger** Something has gone wrong or needs immediate attention. |

#### Dismissible

On by default. Set `isDismissible={false}` to leave out the Close button.

Alert includes a Close button, controlled via `isDismissible`, that lets people remove the alert from the page.

* Alerts are dismissible by default. Most alerts should include the Close button.
* Omit the Close button only when the alert communicates a critical issue that must remain visible until the underlying problem is resolved (e.g. a failed submission or an expired session that blocks progress).
* Refer to the [Close button](https://design.moodle.com/98292f05f/v/latest/p/778206) documentation for its states and interactions.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD leave out the Close button only when the message is critical and has to stay visible until the problem is fixed. |
| Don't | | | SHOULD NOT add a Close button to a critical message just because it's the default. |
| Don't | | | SHOULD NOT remove the Close button when the message isn't critical. |

#### Actionable

Off by default. Set `isActionable` and give it an `actionLabel`. Handle the click with `onAction`.

Alert can optionally include a single action button, controlled via `isActionable`. Use it for quick, contextual actions that people can complete without leaving the page (e.g. "Refresh", "Undo", "Retry").

* Use only one action per alert. If people need to choose between two or more actions, use a Modal instead.
* If the action is irreversible or has a significant impact on people's data, don't trigger it directly from the alert. Have it open a confirmation Modal as an intermediate step.
* The action button is always Secondary / Outline. Its visual weight should never compete with the primary action of the page. Refer to the [Button](https://design.moodle.com/98292f05f/v/latest/p/877c50) documentation for its states and interactions

*Actionable alert with a Secondary/Outline button*

### Guidelines

#### Content guidelines

Alerts communicate a single message about an outcome, a status, or something people need to act on. Every part of the alert (title, message text, and any actions) should support that message and nothing else. 

Message and title are plain text. They don't support links, rich formatting, or lists. If a message needs any of that, it belongs in the custom content slot instead (see Custom content below), not in the body.

##### Message 

The message is the only required content. Keep it to one or two sentences. If more detail is needed, use the custom content slot to add a link, rather than expanding the body itself.

* Lead with the outcome or what people need to do, not the cause. Be specific about what happened.
* Use short-form passive voice: "Changes saved" not "Your changes have been saved."
* Keep all content focused on a single message. Don't add content that broadens the scope of the alert.
* Don't repeat the alert type in words: the icon and colour already communicate severity.
* Use a full stop at the end of body text.
* For success alerts, don't use "successfully". 
* For errors and warnings, tell people what they can do next, not just what went wrong. 

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD use short-form passive and keep the message brief. |
| Don't | | | SHOULD NOT use long passive sentences or filler words like "successfully". |
| Do | | | MUST be specific and give people a way to fix the problem. |
| Don't | | | MUST NOT show system errors without telling people how to fix them. |

##### Title

The title is optional, but recommended when the message needs context. Skip the title when the message is short and self-explanatory.

* Include a title when people can't grasp the message from the first few words alone.
* Don't add a title to obvious messages like "Changes saved".
* Use sentence case. No punctuation unless it's a question.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD use a title for the headline when the body adds the detail. |

##### Call to action

An alert's call to action is either an action button or a link, never both by default. Include only one, and only when a meaningful next step exists.

* Use the **action button** (`isActionable`) for actions completed in place (e.g. "Retry", "Undo"). This is a built-in prop.
* Use a **link** when the right response is to send people to another page (e.g. a login page, a help article). A link isn't its own prop. It's added through the custom content slot (see Custom content below), placed on its own line below the body.
* If a message genuinely needs both an in-place action and a link to another page, that's fine, but treat it as the exception.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD use the action button for quick, low-impact actions people can finish without leaving the current context. |
| Don't | | | MUST NOT give people competing actions inside an alert. Use a Modal if you need that. |
| Do | | | SHOULD use a link for actions that take people to another page. |

##### Custom content

The custom content slot (`children`) renders below the message text, and is the only place in Alert that accepts anything beyond plain text.

Although the message and title are plain text, this slot is technically unrestricted. It can hold other components,  like badges, a progress bar, or other elements (not just links). The custom slot exists to cover the genuine exceptions that plain text can't, without opening that same door on every part of the component.

* Use it for a link, when the message needs to point somewhere for more detail or a related action (see Call to action above).
* Up to two links can sit here, separated by a middle dot (·), when they're genuinely related next steps rather than competing options, e.g. one primary destination and one secondary one. More than two starts to compete with the message itself.
* It can also hold a badge, a progress bar, or a similar element, when the message needs to convey something plain text can't: a precise reference or a live status. Treat these the same way: as exceptions, not defaults.

* Treat this slot as an exception path, not a general-purpose container. If you're reaching for it often, that's a sign the standard anatomy needs revisiting, not that this slot should become the default way to add content. 
* Icon and message text remain mandatory regardless of what's added here.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Caution | | | SHOULD NOT combine a link in the custom slot with the action button (isActionable) in the same alert unless you really need both. Together they give people 2 next steps to weigh instead of 1 clear one. |
| Do | | | SHOULD pick the one that matches what you want people to do first. |

#### Placement

* Alert spans the full width of its container. It doesn't float or size to content.
* When multiple alerts appear on the same page, stack them with standard spacing between; don't nest one inside another.

#### Accessibility guidelines

##### Colour and contrast

* Text and icon colour meet WCAG AAA against their background for every variant.
* Colour is never the only signal of severity; the icon is a mandatory, always-visible part of the component for exactly this reason.

##### Focus

* Dismiss button and action button each show a visible keyboard focus ring, inherited from their respective components (Close button, Button).
* See Interaction behaviour above for how focus moves through and away from the Alert.

##### Labelling

* Danger and Warning variants use `role="alert"` (assertive). Appropriate for errors and blocking cautions that need immediate announcement.
* Success and Info variants use `role="status"` (polite). Appropriate for confirmations and neutral information that shouldn't interrupt the user.
* Dismiss button requires an accessible name, set via the `dismissAriaLabel` prop. It has no visible text. Required whenever `isDismissible` is true (WCAG 2.1 SC 4.1.2).

### Related

##### Used with

**Close button**

provides the dismiss interaction when isDismissible is true.

**Button**

provides the action interaction when isActionable is true.

**Link**

used for navigation via the custom content slot.

## Code

### Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-alert--default)

Props and types (TypeScript API): [Alert.d.ts](https://unpkg.com/@moodlehq/design-system@5.5.0/dist/components/alert/Alert.d.ts)

Full list of props and their types for Alert.

### Accessibility implementation

#### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus to the next interactive element inside the Alert (link, action button, or dismiss button), following DOM order |
| `Enter` / `Space` | Activates the focused button (dismiss or action) |

#### ARIA

* Role: `alert` on Danger and Warning variants; `status` on Success and Info variants.
* Required attributes: `aria-label` on the dismiss button (e.g. "Close").
* Optional attributes: `aria-describedby` if the alert is linked to a specific form or section.

#### Dynamic announcements

* On dismiss, focus moves programmatically to the next focusable element in the DOM. No transition or animation is implemented in this version.

## Specs

### Anatomy

1. **Icon**: communicates severity at a glance. Always visible, colour-matched to the Type variant. Static vector, not a swappable sub-component.
2. **Title** (optional): short label above the message, shown only when the message needs one.
3. **Message content**: the required text of the alert.
4. **Custom content** (optional): additional content beyond title and body, for cases the standard pattern doesn't cover (e.g. a link). An exception mechanism, not a general-purpose container. Icon and body remain mandatory regardless of what's added here.
5. **Action button** (optional): a single, generic call to action related to the message.
6. **Dismiss button** (optional): removes the alert. Present only when the alert is dismissible.

### Behaviour

* Dismiss button removes the alert from the page on click, or on Enter/Space when focused.
* On dismiss, focus moves to the next focusable element on the page.
* The action button behaves like a standard secondary button. See the Button component for its interaction states.
* The action button never acts as a dismiss control. An action can result in the Alert closing as a side effect (e.g. completing an "Undo"), but the dismiss (Close) button is always the dedicated, explicit way to close it.

#### Focus and tab order

* If an Alert contains no interactive elements (message text only, no link, action button, or dismiss button), it isn't part of the tab order at all. It's announced once via the live region when it appears; keyboard users tab straight past it as they would past any static text.
* If an Alert contains one or more interactive elements, they follow natural DOM/tab order in this sequence: custom content (e.g. a link) → action button → dismiss button.
* The dismiss button is always last in the tab sequence, even though it's positioned visually top-right. This matches reading order and avoids surfacing the dismiss control before the user has encountered the message it belongs to.

### Responsive behaviour

* Message text wraps at all breakpoints. The container never scrolls horizontally or truncates text.
* Icon, title, and dismiss button stay fixed size across breakpoints. Only the text column reflows.
