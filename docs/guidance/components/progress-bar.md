---
component: Progress bar
slug: progress-bar
package: "@moodlehq/design-system@5.4.0"
status: Ready
source: https://design.moodle.com/98292f05f/v/latest/p/76a5ba-progress-bar
import: @moodlehq/design-system/components/progress-bar
types: dist/components/progress-bar/index.d.ts
---

<!-- Generated from ZeroHeight by npm run build-guidance. Do not edit. -->

# Progress bar

A visual indicator that shows how much of a task is complete, using a progress bar.

## Accessibility

- Keyboard:
  - `Tab`: Moves focus to the next focusable element. The ProgressBar itself is not keyboard-focusable by default.
  - `Shift + Tab`: Moves focus to the previous focusable element. The ProgressBar itself is not keyboard-focusable by default.
  - `Arrow keys (Left/Right/Up/Down)`: No action on ProgressBar. It is read-only and does not support keyboard value changes.
- Role:
  - ProgressBar exposes a native ARIA progress indicator using `role="progressbar"` on the track element.
- Required attributes:
  - `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` are set by the component. Provide an accessible name via one of `title` (recommended), or `aria-label`, or `aria-labelledby`.
- Announced:
  - Assistive technologies announce progress based on updates to `aria-valuenow` on the progressbar.
  - If you need guaranteed spoken announcements on every update (for example, long-running async tasks with milestones), add a separate app-level live region message in the consuming experience.
- Focus: Not documented

## Built from

Generated from the component source and CSS, not from ZeroHeight.

- MDS components: none

- Semantic tokens: `--mds-bg-feedback-danger-default`, `--mds-bg-feedback-danger-subtle`, `--mds-bg-feedback-primary-subtle`, `--mds-bg-feedback-secondary-default`, `--mds-bg-feedback-success-default`, `--mds-bg-feedback-warning-default`, `--mds-bg-feedback-warning-subtle`, `--mds-bg-interactive-primary-default`, `--mds-border-radius-pill`, `--mds-font-family-base`, `--mds-font-size-paragraph-small`, `--mds-font-weight-medium`, `--mds-font-weight-regular`, `--mds-letter-spacing-default`, `--mds-line-height-paragraph-small`, `--mds-spacing-md`, `--mds-spacing-xs`, `--mds-spacing-xxl`, `--mds-text-subtle`

## Usage

### Overview

The progress bar shows how progress changes over time. It can track a user task, a system process, or anything else that is moving towards completion. It helps users understand what is done and what is left. 

The filled part shows the completed work. The empty part shows the remaining work.

### When to use

* Use when users need confidence that a long task is moving forward.
* Use when progress can be measured and has a known total.
* Use to indicate progress towards completion.

#### ❌ When not to use

* Do not use when the total is unknown or progress cannot be measured.
* Do not use when you cannot estimate progress, even roughly.
* Do not use for a simple done or not done status.

### Variants

#### Label

Set with the `labelVariant` prop. If you leave it out, you get `title-and-count`.

The label property controls which text is shown and where it appears. It can be combined with any status value. Title is the label text that describes what the progress is for.

| **Variant** | **When to use** |
| :--- | :--- |
| | **Title and count (`title-and-count`, default)** Use when you need the title and count as separate items for quick scanning. |
| | **Title** Use when you need one flexible label line that can show a title, a count, or both. |
| | **Inline** Use when vertical space is tight and you only need a compact count. |
| | **None** Use only when nearby content already explains what is being measured. |

### Guidelines

#### Content design

##### **Content structure and constraints**

* Keep label text short. One or two words is enough, like in progress, completed, or error.
* Use the count when the total is meaningful.
* If you do not use a label, make sure the surrounding UI explains what the progress bar means.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD use a short label that stays on one line and is easy to scan. |
| Don't | | | SHOULD NOT use a long label that wraps and is harder to scan. |

##### **Content behaviour**

* The count and progress bar are two views of the same progress value. They must always match and be updated together.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | MUST make the progress bar match the count. |
| Don't | | | MUST NOT show a progress bar that doesn't match the count. |

##### Copywriting

* Use sentence case.
* Keep label short and simple, one or two words.
* Keep count short and simple, like 5 of 10 or 50%.
* Do not write a full sentence inside the component.

#### Layout and spacing

* Use an inline label only when the count fits. Otherwise, use a label above the progress bar.
* Avoid using progress bars in very narrow spaces.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | SHOULD put the title, or the title and count, above the progress bar when horizontal space is tight, so the bar stays long enough to show progress clearly. |
| Don't | | | SHOULD NOT put the count inline when horizontal space is tight. It can make the bar too short to show progress clearly. |

#### Breakpoints and responsive behaviour

* The progress bar scales with its container width.
* At small widths, switch from inline to a label above the progress when the count no longer fits.

#### Interaction behaviour

* The progress bar is not interactive.
* Do not make it clickable.
* Do not allow keyboard focus on the bar itself.

#### Accessibility guidelines

##### **Colour and contrast**

* Do not rely on colour alone to show status. Use a label or a count.
* Do not rely on colour alone to show completion. Use a label or a count.
* Do not rely on colour alone to show an error. Use a label or nearby content to explain what went wrong.
* Make sure the progress bar and labels meet contrast requirements on the surface they sit on.
* Show status in text, for example In progress or Error, not only colour.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | | | MUST show a count like 10 of 10 or 100% so completion is clear, not just the bar colour. |
| Don't | | | MUST NOT show a progress bar with no label. If colour is the only cue, people may not understand what it means. |

##### **Focus**

* No focus styling is needed because the component is not focusable.

##### **Labelling**

* When there is no label, provide an accessible name that explains what is being tracked.

## Design

### Anatomy

1. **Progress**: The full length background. It represents the total work to be done.
2. **Progress bar**: The coloured bar inside the progress. It grows from left to right to show how far along the task is.
3. **Label** (optional): The text that explains the progress. This could be a status e.g. in progress, completed, or error, and a count like 5 of 10 or 100%.

### States

These are visual states, not interaction states. The progress bar is for display only. It does not have hover, pressed, disabled, or focus states.

#### Status

Set with the `status` prop: `in-progress`, `loading`, `error` or `warning`. If you leave it out, you get `in-progress`. Empty and Completed are applied automatically at 0% and 100%.

| **States** | **Description** |
| :--- | --- |
| | **Empty** Use when progress is 0. Only the progress is visible. The track and fill both use `--mds-bg-feedback-secondary-default`. |
| | **In progress** Use when progress is more than 0 and less than the total. The progress bar is only partly filled. The track uses `--mds-bg-feedback-primary-subtle` and the fill `--mds-bg-interactive-primary-default`. |
| | **Loading** Use when progress is updating. It shows a striped progress bar. Set `animated` to make the stripes move. Same colours as In progress, with light stripes moving across the fill. |
| | **Completed** Use when the task is finished. The progress bar is 100 percent full and uses success styling. The fill uses `--mds-bg-feedback-success-default` on a `--mds-bg-feedback-secondary-default` track. |
| | **Error** Use when progress cannot continue because of a problem. The progress bar uses danger styling to show that something went wrong. The fill uses `--mds-bg-feedback-danger-default` on a `--mds-bg-feedback-danger-subtle` track. |
| | **Warning** Use when progress can continue but something needs attention. The fill uses `--mds-bg-feedback-warning-default` on a `--mds-bg-feedback-warning-subtle` track. |

## Code

### Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-progressbar--default)

Props and types (TypeScript API): [ProgressBar.d.ts](https://unpkg.com/@moodlehq/design-system@5.4.0/dist/components/progress-bar/ProgressBar.d.ts)

Full list of props and their types for Progress bar.

### Accessibility implementation

#### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus to the next focusable element. The ProgressBar itself is not keyboard-focusable by default. |
| `Shift + Tab` | Moves focus to the previous focusable element. The ProgressBar itself is not keyboard-focusable by default. |
| `Arrow keys (Left/Right/Up/Down)` | No action on ProgressBar. It is read-only and does not support keyboard value changes. |

#### ARIA

* Role:
    * ProgressBar exposes a native ARIA progress indicator using `role="progressbar"` on the track element.
* Required attributes:
    * `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` are set by the component.
    * Provide an accessible name via one of:
        * `title` (recommended), or
        * `aria-label`, or
        * `aria-labelledby`.
* Optional attributes:
    * `aria-label` and `aria-labelledby` can be passed explicitly to control naming behaviour.
    * If a visible title is rendered (`title-and-count` or `title` variants), the component links that title to the progressbar automatically.
    * For `inline` or `none` label variants, the component uses `title` as fallback accessible name when no explicit ARIA label is provided.

#### Dynamic announcements

* Assistive technologies announce progress based on updates to `aria-valuenow` on the progressbar.
* If you need guaranteed spoken announcements on every update (for example, long-running async tasks with milestones), add a separate app-level live region message in the consuming experience.
