---
component: Alert
slug: alert
package: "@moodlehq/design-system@5.4.0"
status: Ready
source: https://design.moodle.com/98292f05f/v/latest/p/3918ca-alert
import: @moodlehq/design-system/components/alert
types: dist/components/alert/index.d.ts
---

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

## Built from

Generated from the component source and CSS, not from ZeroHeight.

- MDS components: button, close-button

- Semantic tokens: `--mds-bg-feedback-danger-default`, `--mds-bg-feedback-danger-light`, `--mds-bg-feedback-primary-default`, `--mds-bg-feedback-primary-light`, `--mds-bg-feedback-success-default`, `--mds-bg-feedback-success-light`, `--mds-bg-feedback-warning-default`, `--mds-bg-feedback-warning-light`, `--mds-border-feedback-danger`, `--mds-border-feedback-primary`, `--mds-border-feedback-success`, `--mds-border-feedback-warning`, `--mds-border-radius-md`, `--mds-font-family-base`, `--mds-font-size-headings-6`, `--mds-font-size-paragraph-default`, `--mds-font-weight-medium`, `--mds-font-weight-regular`, `--mds-line-height-headings-6`, `--mds-line-height-paragraph-default`, `--mds-spacing-md`, `--mds-spacing-xs`, `--mds-stroke-weight-sm`, `--mds-text-feedback-danger`, `--mds-text-feedback-primary`, `--mds-text-feedback-success`, `--mds-text-feedback-warning`, `--mds-text-link-primary-default`

## Usage

### Overview

Alerts communicate the outcome of an action, a status or condition, or important contextual information the user needs to know. They sit in the page flow, near the content they relate to, and stay visible until the user dismisses them or navigates away.

Every alert should clearly state what happened and what the user needs to know.

### When to use

Use alert when:

* Confirming the outcome of an action that the user might want to reference or act on (e.g. "Backup complete. You can access the backup on the restore page."). 
* Surfacing something that needs attention (e.g. an expired session, a registration status).
* A warning or error needs to persist on the page until people act on or dismiss it.
* The message is tied to the current page or section.

#### ❌ When not to use

* Don't use for brief confirmations that don't need to stay on the page — use toast instead.
* Don't use for form field-level validation errors — use inline field validation instead.
* Don't use for high-priority blocking messages that require user confirmation before continuing — use a Modal/Dialog instead.

### Variants

#### Type

The type of alert tells people what kind of message this is: whether something went wrong, succeeded, or needs attention. Alert supports four types: Info, Success, Warning, and Danger. A smaller set of types makes alerts easier for people to recognise and interpret at a glance.

| **Variant** | **When to use** |
| :--- | :--- |
| | ****Info**** Background information that's useful but doesn't require action. |
| | **Success** Confirms that an action completed as expected. |
| | **Warning** Something needs attention but isn't yet an error. |
| | **Danger** Something has gone wrong or needs immediate attention. |

#### Dismissible

Alert includes a Close button, controlled via `isDismissible`, that lets people remove the alert from the page.

* Alerts are dismissible by default. Most alerts should include the Close button.
* Omit the Close button only when the alert communicates a critical issue that must remain visible until the underlying problem is resolved (e.g. a failed submission or an expired session that blocks progress).
* Refer to the [Close button](https://design.moodle.com/98292f05f/v/latest/p/778206) documentation for its states and interactions.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Omit the Close button only when the message is critical and must remain visible until the underlying condition is resolved. |
| Don't | | | Add a Close button to a critical message just because it's the default. |
| Don't | | | Remove the Close button when the message is not critical. |

#### Actionable

Alert can optionally include a single action button, controlled via `isActionable`. Use it for quick, contextual actions that people can complete without leaving the page (e.g. "Refresh", "Undo", "Retry").

* Use only one action per alert. If people need to choose between two or more actions, use a Modal instead.
* If the action is irreversible or has a significant impact on people's data, don't trigger it directly from the alert. Have it open a confirmation Modal as an intermediate step.
* The action button is always Secondary / Outline — its visual weight should never compete with the primary action of the page. Refer to the [Button](https://design.moodle.com/98292f05f/v/latest/p/877c50) documentation for its states and interactions

*Actionable alert with a Secondary/Outline button*

### Guidelines

#### Content design

Alerts communicate a single message about an outcome, a status, or something people need to act on. Every part of the alert — title, body, and any actions — should support that message and nothing else.

##### Body

The body is the only required content. Keep it to one or two sentences. If more detail is needed, link to another page.

* Lead with the outcome or what people need to do, not the cause. Be specific about what happened.
* Use short-form passive voice: "Changes saved" not "Your changes have been saved."
* Keep all content focused on a single message. Don't add content that broadens the scope of the alert.
* Don't repeat the alert type in words: the icon and colour already communicate severity.
* Use a full stop at the end of body text.
* For success alerts, don't use "successfully". 
* For errors and warnings, tell people what they can do next, not just what went wrong. 
* The body supports inline formatting and lists.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Use short-form passive and keep the message brief. |
| Don't | | | Use long passive voice and add fillers such as "successfully". |
| Do | | | Be specific and give people a way to solve the problem. |
| Don't | | | Show system errors without remediation guidance. |

##### Title

The title is optional, but recommended when the body needs context. Skip the title when the message is short and self-explanatory.

* Include a title when people can't grasp the message from the first few words alone.
* Don't add a title to obvious messages like "Changes saved".
* Use sentence case. No punctuation unless it's a question.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Use a title to give the headline when the body adds the detail. |

##### Call to action

Alert CTAs can be either action buttons, or CTA links. Include only one CTA per alert, and only when a meaningful next step exists.

* Use the action button for actions completed in place (e.g. "Retry", "Undo").
* Use a CTA link when the right response is to send people to another page (e.g. a login page, a help article).
* The CTA link sits on its own line below the body.
* If a message genuinely needs both an in-place action and a link to another page, that's fine, but treat it as the exception.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | Use the action button for quick, contextual, low-impact actions people can complete without leaving the current context. |
| Don't | | | Don't give people competing actions inside an alert. If you need that, use a Modal instead. |
| Do | | | Use a CTA link for actions that take people to another page. |

##### Inline links

Inline links sit within the body text to give people optional, secondary references. They aren't the alert's main call to action.

* Use up to two inline links. Three or more clutters the message.
* Only add an inline link when people need the additional context to deal with the alert, don't add one just because a term could link somewhere.
* If an inline link starts to feel like the main point of the message, it's actually a CTA link and you should treat it as one.

#### Layout and spacing

* Alert spans the full width of its container — it doesn't float or size to content.
* When multiple alerts appear on the same page, stack them with standard spacing between; don't nest one inside another.

#### Breakpoints and responsive behaviour

* Message text wraps at all breakpoints — the container never scrolls horizontally or truncates text.
* Icon, title, and dismiss button stay fixed size across breakpoints. Only the text column reflows.

#### Interaction behaviour

* Dismiss button removes the alert from the page on click, or on Enter/Space when focused.
* On dismiss, focus moves to the next focusable element on the page.
* The action button behaves like a standard secondary button — see the Button component for its interaction states.
* The action button never acts as a dismiss control. An action can result in the Alert closing as a side effect (e.g. completing an "Undo"), but the dismiss (Close) button is always the dedicated, explicit way to close it.

##### **Focus and tab order**

* If an Alert contains no interactive elements (message text only, no link, action button, or dismiss button), it isn't part of the tab order at all. It's announced once via the live region when it appears; keyboard users tab straight past it as they would past any static text.
* If an Alert contains one or more interactive elements, they follow natural DOM/tab order in this sequence: inline link (if present) → action button → dismiss button.
* The dismiss button is always last in the tab sequence, even though it's positioned visually top-right. This matches reading order and avoids surfacing the dismiss control before the user has encountered the message it belongs to.

#### Accessibility guidelines

##### Colour and contrast

* Text and icon colour meet WCAG AAA against their background for every variant.
* Colour is never the only signal of severity; the icon is a mandatory, always-visible part of the component for exactly this reason.

##### Focus

* Dismiss button and action button each show a visible keyboard focus ring, inherited from their respective components (Close button, Button).
* See Interaction behaviour above for how focus moves through and away from the Alert.

##### Labelling

* Danger and Warning variants use `role="alert"` (assertive) — appropriate for errors and blocking cautions that need immediate announcement.
* Success and Info variants use `role="status"` (polite) — appropriate for confirmations and neutral information that shouldn't interrupt the user.
* Dismiss button requires an accessible label (e.g. `aria-label="Close"`) — it has no visible text.

### Related

##### Used with

* **Close button** — provides the dismiss interaction when `isDismissible` is true.
* **Button** — provides the action interaction when `isActionable` is true.
* **Link** — used for inline or standalone navigation within the message.

## Design

### Anatomy

1. **Icon** — communicates severity at a glance. Always visible, colour-matched to the Type variant. Static vector, not a swappable sub-component.
2. **Title** (optional) — short label above the message, shown only when the message needs one.
3. **Message content** — the required text of the alert.
4. **Action button** (optional) — a single, generic call to action related to the message.
5. **Dismiss button** (optional) — removes the alert. Present only when the alert is dismissible.

### Variants

Alert itself has no interactive states — hover, focus, and press states belong to the Close button and Action button sub-components, documented on their own pages. This section lists the token bindings per Type instead.

| **Variant** | **Styles and Tokens** |
| :--- | :--- |
| | ****Info**** Background: .`bg.feedback.primary.light`. Border: .`border.feedback.primary`. Text: .`text.feedback.primary`. Icon: .`bg.feedback.primary.default`. |
| | **Success** Background: .`bg.feedback.success.light`. Border: .`border.feedback.success`. Text: .`text.feedback.success`. Icon: .`bg.feedback.success.default`. |
| | **Warning** Background: .`bg.feedback.warning.light`. Border: .`border.feedback.warning`. Text: .`text.feedback.warning`. Icon: .`bg.feedback.warning.default`. |
| | **Danger** Background: .`bg.feedback.danger.light`. Border: .`border.feedback.danger`. Text: .`text.feedback.danger`. Icon: .`bg.feedback.danger.default`. |

## Code

### Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-alert--default)

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
