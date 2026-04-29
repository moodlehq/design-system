---
applyTo: '**'
---

<!-- Auto-generated from ZeroHeight. Do not edit manually. -->
<!-- Source: https://design.moodle.com/ -->
<!-- Regenerate: npm run build-docs -->

# Moodle Design System — Agent Reference

# Using tokens
### What are design tokens?

Design tokens are reusable design values that help keep things consistent across Moodle. They represent things like colours, spacing, fonts and more. Instead of hardcoding values in every component, we use tokens to define them once and then share them across the design and code.

Let's say a brand has a **Primary Pink** colour. Designers and developers should refer to this colour by the same name and identity, regardless of platform (design, web, mobile etc). If the colour changes in design, it should also change on all development platforms automatically (and vice versa).

**Design tokens** enable this behavior by creating an **abstract identity** and centralising the source of truth for this colour. Because they help to establish a source of truth, they are often found in design systems. They can be used for colours, text styles, spacings, animation values etc.



---

### Apply colour tokens

Colour tokens show up as square swatches in the library. Use these to apply Moodle’s interface colours instead of typing in hex codes.



#### To apply a colour token to a shape or layer:

1. Select the layer
2. In the design panel under Fill or Strokes, 
    * click the ‘Apply styles and variables’ icon or
    * click the swatch and go the Libraries tab
3. Choose a colour token like bg/interactive/primary or border/interactive/hover




---

### Applying spacing tokens

Using spacing tokens for things like frame padding, and gaps in auto layout. Tokens help your layout stay tuned to Moodle’s spacing scale.

#### To apply a spacing token:

1. Select a frame or component
2. In the design panel under Auto layout, go to a field like padding or gap
3. Click ‘Apply variable’ icon
4. Choose a spacing token like spacing/md or spacing/lg




---

### Applying border tokens

Border tokens are used to control both the roundness of corners and thickness of strokes. 

#### To apply a radius token:

1. Select the shape or component
2. In the design panel under Appearance, click the 'Apply variable' icon
3. Choose a radius token like border radius/md or border radius/pill




#### To apply a stroke weight:

1. Select a shape that has a stroke applied
2. In the design panel under Stroke, go to the weight field 
3. Click the 'Apply variable' icon
4. Choose a weight token like stroke weight/sm or stroke weight/xxl




---

### Apply typography styles

Moodle fonts, weights, sizes, line height, and letter spacing are handled using text styles.

#### To apply a text style:

1. Select your text layer
2. In the design panel under Typography, click the ‘Apply styles’ icon
3. Choose a Moodle text style like Headings/Heading 1 or Paragraph/Small




---

### Apply Shadows using effect styles

Shadows are available as effect styles. These styles apply consistent elevations using standard colours and blur values.

#### To apply a shadow style:

1. Select the layer
2. In the design panel under Effects, click the ‘Apply styles’ icon
3. Choose a Moodle shadow style like Shadow/Medium



---

### How to video

[https://drive.google.com/file/d/1T8GVNB4pLfTNR79YG2ufRmNzeH4RW87R/preview?rm=minimal&rm=minimal](https://drive.google.com/file/d/1T8GVNB4pLfTNR79YG2ufRmNzeH4RW87R/preview?rm=minimal&rm=minimal)

>###  ✅ Best practices
>
> * Always use Moodle’s published styles
> * Stick to what’s available in the libray. Reach out if something is missing
> * Keep layouts tidy by using Auto layout and applying tokens to spacing
> * Use styles for all typography and shadows

>### ❌ What not to do
>
> * Don’t type in your own hex colours
> * Don't enter custom spacing units
> * Don’t detach or override tokens or styles
---

# Quickstart
### Quickstart

You can enable the Moodle Design system in your Figma file by going to your`Libraries` settings. You'll need to turn on **Moodle Styles**.

* Styles includes colours, typography, spacing, borders and shadows.


### Set up the Moodle Design System library *(Community)*

1. Go to the [Moodle Figma Community page](https://www.figma.com/@moodle)
2. Find the **‘Moodle Styles’** file
3. Click **‘Duplicate’** to add it to your own Drafts
4. Move the duplicated file into a Figma **Team project** (required to publish a library)
5. Open the file and go to the menu **Assets panel → Library icon → Publish**
6. In the pop-up, click **‘Publish’** to enable it as a library
7. Now, in any other Figma file, open the **Assets panel → Library icon**
8. Toggle on your published **‘Moodle design styles’** library

Now you’re ready to design using Moodle’s design system foundations!


*Library available on our Figma Community page.*
---

# Libraries

---

# Help and support

---

---

# Using tokens
## Token Consumption

Figma design tokens enter the Moodle Design System package through Zeroheight, formatted against the Design Tokens Community Group (DTCG) standard. These tokens are then processed by bundled package scripts, which convert them into implementation-agnostic resources. This means they are transformed into formats such as CSS and SCSS variables, making them flexible and usable across different parts of the consumers' platform without being tied to a specific implementation whilst making them not the source of truth for tokens but the DTCG formatted JSON files in the package.

>**❌ Avoid — Importing internal build paths**
>
>`import '@moodlehq/design-system/dist/tokens.css'; // Not supported.`
>
>Paths under dist/ are internal implementation details and may change without notice.

### CSS Tokens (Recommended)

CSS tokens provide easily consumable variables that can be used in implementation agnostic environments.

#### Import

Import the CSS token bundle once at the application entry point which will expose all tokens as CSS custom properties (--mds-*) at runtime.

>✅ **Best practice — Import once at the application entry point**
>
>`import '@moodlehq/design-system/tokens/css';`

>**❌ Avoid — Import per component**
>
>```css
>// Avoid repeated imports in multiple files. 
>
>import '@moodlehq/design-system/tokens/css';
>```

#### Usage

CSS variables work across all styling approaches, including plain CSS, SCSS, CSS-in-JS, and inline styles.

```css
.button {
  background-color: var(--mds-bg-interactive-primary-default);   
  border-radius: var(--mds-border-radius-lg);   
  padding: var(--mds-spacing-xs); 
}
```

#### Benefits

Runtime theming:

> Allows for dynamic changes to themes during application runtime.

Framework-agnostic usage:

> Can be used with any JavaScript framework or none at all.

Minimal build coupling:

> Reduces dependencies and complexity in the build process.

---

### SCSS Tokens (Advanced)

SCSS tokens provide **compile-time access** to token values and should only be used when Sass-specific behaviour is required.

#### Import

Import the SCSS token bundle once at the application entry point which will expose all tokens as SCSS custom properties ($mds-*) at runtime.

>**✅ Best practice — Use a namespace**
>
>`@use '@moodlehq/design-system/tokens/scss' as tokens;`

>❌ **Avoid — Import without namespace**
>
>`@use '@moodlehq/design-system/tokens/scss' as *;`

#### Usage

```css
.button {
  margin: tokens.$mds-spacing-sm;   
  color: tokens.$mds-text-default;
}
```

#### Benefits

Sass math or conditionals:

> For complex calculations or conditional styling logic within Sass.

Legacy Sass-only pipelines:

> When integrating with older projects that rely exclusively on Sass for styling.

Build-time layout calculations:

> For layout computations that need to happen during the build process.

---

## Best practices

Tokens in the Moodle Design System fall into three categories: primitive, semantic, and component tokens. Each serves a specific purpose, and we recommend selecting the appropriate tokens for your platform accordingly. In cases where a suitable token either does not currently exist to meet a particular need or is incorrect, it is important to reach out to the Moodle Design System team. Together, we can develop a solution that fits the intended use case.

### Primitive Tokens

The fundamental base values that are utilised by the Moodle Design System e.g. --mds-color-gray-500, --mds-scale-500. They serve as the core internal definitions which are leveraged extensively by both Semantic tokens and eventually Component tokens within the system.

>**❌ Avoid — Use primitive palette tokens**
>
>`background-color: var(--mds-color-blue-500);`

### Semantic Tokens

On the other hand, semantic tokens are designed to express intent clearly, e.g. `--mds-text-default, --mds-spacing-md.` They are created to remain stable and consistent even when there are changes or updates to the underlying primitive values that they reference.

>**✅ Best practice — Use semantic tokens**
>
>```css
>.button {
>  background-color: var(--mds-bg-interactive-primary-default);
>}
>```

### Component Tokens

Whilst currently not included as part of the Moodle Design System, they are planned to be incorporated in the future when the design team begins the process of designing and developing the various components that make up the system.

### Token Integrity

Tokens are specifically intended to be used and interacted with by consuming platforms exactly as they are, without any alterations or modifications to their original values thus, acting as the single source of truth. This ensures consistency and reliability across different implementations.

>**✅ Best practice — Consistently use semantic tokens according to their intended role and state**
>
>```css
>.card {   
>  background: var(--mds-bg-interactive-primary-default);   
>  border-color: var(--mds-border-interactive-primary-active);   
>  padding: var(--mds-spacing-md); 
>}
>```

>**⚠️ Caution – Token value theming**
>
>If you must override token values defined by the Moodle Design System, exercise caution. These token values correspond to those in designs provided for HQ developers or the published [community Figma file](https://www.figma.com/@moodle) for Moodle community members.
>
>If you observe unexpected token values at runtime, token values may be overridden via SCSS injections through the Moodle interface.

>**❌ Avoid — Redefine tokens globally**
>
>`:root { --mds-text-default: blue; }`

>**❌ Avoid — Hardcoded design values**
>
>`color: #0f6cbf; margin: 12px;`

>**❌ Avoid— Re-wrapping tokens**
>
>`:root { --text-primary: var(--mds-text-default); }`

>**❌ Avoid — Using tokens as business logic flags**
>
>`if (color === 'var(--mds-text-danger)') {   // Logic. }`
---

# Help and support

---

# Sources
## Information Sources

A comprehensive overview of the various sources of information that are essential for the development and successful execution of the MDS project. It outlines where developers and stakeholders can find the necessary resources, documentation, and data to support the development side of the project lifecycle.

---

### Tooling

Links to different aspects used in the implementation of the Moodle Design System.

Design documentation is carefully managed and maintained by the Moodle Design System team to ensure consistency and clarity.

---

#### NPM Package

Packaged releases of the Moodle Design System, which can be easily installed and integrated into projects via NPM.

[https://www.npmjs.com/package/@moodlehq/design-system](https://www.npmjs.com/package/@moodlehq/design-system)

---

#### Code repository

The source of truth for the implementation, containing the original, authoritative source code for the design system including tokens, scripting & documentation.

[https://github.com/moodlehq/design-system](https://github.com/moodlehq/design-system)

---

#### Chromatic

Designer driven UI reviews hooked into GitHub pull requests, visual A/B testing alongside accessibility testing to ensure the design system meets quality standards.

[https://www.chromatic.com/builds?appId=6901bebddeae4c83b504fdad](https://www.chromatic.com/builds?appId=6901bebddeae4c83b504fdad)

---

#### Storybook

This resource provides detailed component information, showcasing the components in an interactive environment for developers and designers.

> **Note:** This resource does not contain token information and is planned to contain component implementation documentation.

[https://moodlehq.github.io/design-system/](https://moodlehq.github.io/design-system/)

---

#### Decision log

Decisions on the general workflow and policies, both outstanding and resolved decisions.

[https://moodle.atlassian.net/wiki/spaces/MDS/pages/3255468043/Decision+log](https://moodle.atlassian.net/wiki/spaces/MDS/pages/3255468043/Decision+log)

---

### Documentation

Various resources that provide insights on how to use the Moodle Design System during development, alongside interesting reports and architecture artefacts relating to the project.

Summarised coding standards and linters used to ensure quality, with links to detailed development tooling info.

#### Project Setup and Installation Guide

Step-by-step guide to install the Moodle Design System (MDS), use design tokens in CSS/SCSS, run tests, convert tokens, and build for NPM publishing.

[https://github.com/moodlehq/design-system/blob/main/README.md](https://github.com/moodlehq/design-system/blob/main/README.md)

---

#### Version History and Release Changes

The current project version details are updated automatically. This update occurs based on the commits that are included in each release. As new commits are made and incorporated into the project, the version information reflects these changes accordingly.

[https://github.com/moodlehq/design-system/blob/main/CHANGELOG.md](https://github.com/moodlehq/design-system/blob/main/CHANGELOG.md)

---

#### Project License and Usage Terms

This file explains the conditions and terms for user access and use of the project materials. It also outlines user restrictions and obligations to clarify rights and responsibilities.

[https://github.com/moodlehq/design-system/blob/main/LICENSE](https://github.com/moodlehq/design-system/blob/main/LICENSE)

---

#### Contribution Guidelines

Contribution guidelines detail steps for installing tools, reporting issues, coding, and reviewing changes.

They help contributors follow the process smoothly for efficient collaboration.

[https://github.com/moodlehq/design-system/blob/main/.github/CONTRIBUTING.md](https://github.com/moodlehq/design-system/blob/main/.github/CONTRIBUTING.md)

---

#### Community Code of Conduct

Defines rules for communication within the GitHub repository. For example, comments in pull requests must be respectful and free of harassment to maintain a positive, inclusive community.

These guidelines are essential to ensure that all contributors feel welcome and valued.

[https://github.com/moodlehq/design-system/blob/main/.github/CODE_OF_CONDUCT.md](https://github.com/moodlehq/design-system/blob/main/.github/CODE_OF_CONDUCT.md)

---

#### Security Policy and Vulnerability Reporting

This document details the procedures for reporting security issues, ensuring stakeholders know the correct steps. It provides timelines for resolving issues to set response expectations. The process for disclosing vulnerabilities to the public or affected parties is explained. It also includes policies to promote transparency and maintain safety throughout.

[https://github.com/moodlehq/design-system/blob/main/.github/SECURITY.md](https://github.com/moodlehq/design-system/blob/main/.github/SECURITY.md)

---

#### Pull Request Template

When contributors open a new pull request on GitHub, they see a set template. This ensures all needed info is included, keeping contributions consistent and helping maintainers review changes faster.

[https://github.com/moodlehq/design-system/blob/main/.github/PULL_REQUEST_TEMPLATE.md](https://github.com/moodlehq/design-system/blob/main/.github/PULL_REQUEST_TEMPLATE.md)

---

#### OpenSSF Security Scorecard

The Open Source Software Foundation (OSSF) security tool is designed to run automatically across the entire GitHub repository. It continuously assesses and monitors the security posture of the project to ensure that any vulnerabilities or risks are identified and addressed promptly.

[https://scorecard.dev/viewer/?uri=github.com/moodlehq/design-system](https://scorecard.dev/viewer/?uri=github.com/moodlehq/design-system)

---

#### OpenSSF Best Practices Certification

OSSF community's self-signed certification for best practices. It shows commitment to recognised open source standards. Following these ensures compliance with industry norms, fostering trust and security in projects.

[https://www.bestpractices.dev/en/projects/11543/passing](https://www.bestpractices.dev/en/projects/11543/passing)

---

#### Design System Development Blueprint

This blueprint offers a detailed guide illustrating each stage of transforming design assets into deployable code.

[https://miro.com/app/board/uXjVGeg-IPY=/?share_link_id=331516306015](https://miro.com/app/board/uXjVGeg-IPY=/?share_link_id=331516306015)
---

# Quickstart
## Quickstart

### 1. Install the package

Install the Moodle Design System from npm

[https://www.npmjs.com/package/@moodlehq/design-system](https://www.npmjs.com/package/@moodlehq/design-system)

### 2. Usage documentation

For usage examples, configuration details, and implementation guidance, refer to the GitHub repository:

[https://github.com/moodlehq/design-system](https://github.com/moodlehq/design-system)

---
---

---

# What's new

---

# Quickstart
### Quickstart

---

### What is the Moodle Design System?

The system offers different tools and resources for both designers and developers:

* **Design Tokens:** Cross-platform code and Figma variables that represent the foundational elements of UI such as text, colour, spacing, radius and more. Using Tokens means a shared language between designers and devs, and curated choices that help you be consistent with less guesswork. 
* **Components (Coming soon):** React-based components with Figma equivalents for Moodle LMS built in a modular and extensible way. 

---

### Why should I use the design system?

#### Designers

* **Easily understand what good looks like:** just pick what you need and spend more time on the interesting problems.
* **Moodle-relevant guidance and choices:** no need to interpret Bootstrap's documentation or spend time figuring out how to make things look 'the Moodle way'. 
* **Easier handover with tokens and components:** using the Figma Library and the corresponding components gives you a huge head-start, allowing you and your developers to have a shared language and avoid reinventing the wheel on new features.
* **Less design debt:** sick of maintaining your own personal component library? Let the design system cover the basics and most reusable elements for you so you can spend time maintaining only the things unique to your team or product.


#### Developers

* **Easier handovers with designers:** with tokens, you don't need to inspect and measure designs to get the specs you need - just use the matching tokens in your styles.
* **Customisability and extensibility:** need something we don't offer? Build it out of customisable design system parts and extend the functionality for your use case, or create something new using the same approach the design system team uses to ensure clean, accessible code.

---
---

---

# Spacing
## Spacing system

### Overview

Spacing creates rhythm and clarity in layouts, helping users scan and understand relationships between elements.



### Core principles

* Use spacing tokens for padding, margin, and gaps.
* Keep spacing patterns consistent within component families.
* Use smaller spacing to indicate “belongs together,” larger spacing for “separate sections.”
* Avoid arbitrary spacing values.




---

## Usage

Spacing is based on **4px and 8px increments**, providing a predictable scale across components and layouts.



### Applying spacing

Use spacing tokens for:

* Padding inside components
* Gaps between elements
* Vertical spacing between sections

| `none` | 0px |   |
| :--- | :--- | :--- |
| `xxs` | 4px |  |
| `xs` | 8px |  |
| `sm` | 12px |  |
| `md` | 16px |  |
| `lg` | 20px |  |
| `xl` | 32px |  |
| `xxl` | 48px |  |



---

### Examples

Spacing serves as **the gap size** between elements (the padding of a component or the margin between components).

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |  |   |   |
| Don't |  |   |   |

---

### Accessibility considerations

* Avoid overly dense layouts that reduce readability
* Ensure adequate space for focus rings and error messages
---

# Code

---

# Breakpoints
## Breakpoints

### Overview

Breakpoints are the viewport min-widths at which layouts and components can adapt their sizing. MDS breakpoints align with the Bootstrap 5 default scale, keeping design and implementation consistent.

---

### Breakpoints



| **Token** | **Min-width** | **Screen size** |
| --- | --- | --- |
| `sm` | ≥ 576px | Small |
| `md` | ≥ 768px | Medium |
| `lg` | ≥ 992px | Large |
| `xl` | ≥ 1200px | Extra large |
| `xxl` | ≥ 1400px | Extra extra large |

---

### Usage

* Use breakpoint tokens from the MDS Figma variable library. Don't use hardcoded pixel values.
* Breakpoint variables are scoped to **width** only. Use spacing tokens for padding, margin, and gap decisions.
* You don't need to provide designs for every breakpoint — focus on the breakpoints where the layout or component changes meaningfully.
* For responsive utility classes and media query implementation, refer to [Bootstrap's breakpoints documentation](https://getbootstrap.com/docs/5.0/layout/breakpoints/).
---

# Tokens
### Spacing tokens

| Token | Value | Description |
| --- | --- | --- |
| spacing.none | {scale.0} |   |
| spacing.xxs | {scale.100} |   |
| spacing.xs | {scale.300} |   |
| spacing.sm | {scale.400} |   |
| spacing.md | {scale.600} |   |
| spacing.lg | {scale.700} |   |
| spacing.xl | {scale.1000} |   |
| spacing.xxl | {scale.1200} |   |

```json
{
  "spacing": {
    "none": {
      "$type": "number",
      "$value": "{scale.0}"
    },
    "xxs": {
      "$type": "number",
      "$value": "{scale.100}"
    },
    "xs": {
      "$type": "number",
      "$value": "{scale.300}"
    },
    "sm": {
      "$type": "number",
      "$value": "{scale.400}"
    },
    "md": {
      "$type": "number",
      "$value": "{scale.600}"
    },
    "lg": {
      "$type": "number",
      "$value": "{scale.700}"
    },
    "xl": {
      "$type": "number",
      "$value": "{scale.1000}"
    },
    "xxl": {
      "$type": "number",
      "$value": "{scale.1200}"
    }
  }
}
```

### Breakpoints
---

# Grid
## Baseline

* Do you have a baseline grid? Why?
* Is it ever OK to place something off the grid?
* Does the baseline grid differ between content and typography?

## **Columns**

* Do you use a column system or a horizontal grid?
* Are there any best practices around column widths?
* How do gutters work?
---

---

# Tokens
### Icon size tokens

| Token | Value | Description |
| --- | --- | --- |

```json
{}
```
---

# Icon library
## Icon library

This library provides an overview of the icons currently used in Moodle.

>In some cases, the same symbol may be known by **alternative names** in Font Awesome. When this happens, alternative names are listed under the icon.

For more icons go to: 

_[image: address-card]_

**address-card**

---

_[image: adjust]_

**adjust**

---

_[image: align-center]_

**align-center**

---

_[image: align-justify]_

**align-justify**

---

_[image: align-left]_

**align-left**

---

_[image: align-right]_

**align-right**

---

_[image: anchor]_

**anchor**

---

_[image: angles-left]_

**angles-left**

---

_[image: angles-right]_

**angles-right**

---

_[image: arrow-down]_

**arrow-down**

---

_[image: arrow-down-short-wide]_

**arrow-down-short-wide**

---

_[image: arrow-down-wide-short]_

**arrow-down-wide-short**

---

_[image: arrow-left]_

**arrow-left**

---

_[image: arrow-right]_

**arrow-right**

---

_[image: arrow-right-from-bracket]_

**arrow-right-from-bracket**

---

_[image: arrow-right-to-bracket]_

**arrow-right-to-bracket**

---

_[image: arrow-rotate-left]_

**arrow-rotate-left**

---

_[image: arrow-rotate-right]_

**arrow-rotate-right**

---

_[image: arrow-turn-up]_

**arrow-turn-up**

---

_[image: arrow-up]_

**arrow-up**

---

_[image: arrow-up-from-bracket]_

**arrow-up-from-bracket**

---

_[image: arrow-up-short-wide]_

**arrow-up-short-wide**

---

_[image: arrow-up-wide-short]_

**arrow-up-wide-short**

---

_[image: arrows]_

**arrows**

---

_[image: arrows-left-right]_

**arrows-left-right**

---

_[image: arrows-left-right-to-line]_

**arrows-left-right-to-line**

---

_[image: arrows-rotate]_

**arrows-rotate**

---

_[image: arrows-to-circle]_

**arrows-to-circle**

---

_[image: arrows-up-down-left-right]_

**arrows-up-down-left-right**

---

_[image: audio-description]_

**audio-description**

---

_[image: balance-scale]_

**balance-scale**

---

_[image: ban]_

**ban**

---

_[image: bars]_

**bars**

---

_[image: bell]_

**bell**

---

_[image: bell-slash]_

**bell-slash**

---

_[image: bold]_

**bold**

---

_[image: bolt]_

**bolt**

---

_[image: book]_

**book**

---

_[image: book-bookmark]_

**book-bookmark**

---

_[image: bookmark]_

**bookmark**

---

_[image: bookmark]_

**bookmark**

---

_[image: border-all]_

**border-all**

---

_[image: briefcase]_

**briefcase**

---

_[image: bullhorn]_

**bullhorn**

---

_[image: calculator]_

**calculator**

---

_[image: calendar]_

**calendar**

---

_[image: calendar]_

**calendar**

---

_[image: calendar-check]_

**calendar-check**

---

_[image: calendar-plus]_

**calendar-plus**

---

_[image: caret-down]_

**caret-down**

---

_[image: chart-column]_

**chart-column**

---

_[image: chart-line]_

**chart-line**

---

_[image: check]_

**check**

---

_[image: check-double]_

**check-double**

---

_[image: check-to-slot]_

**check-to-slot**

---

_[image: chevron-down]_

**chevron-down**

---

_[image: chevron-left]_

**chevron-left**

---

_[image: chevron-right]_

**chevron-right**

---

_[image: chevron-up]_

**chevron-up**

---

_[image: circle]_

**circle**

---

_[image: circle]_

**circle**

---

_[image: circle-arrow-down]_

**circle-arrow-down**

---

_[image: circle-check]_

**circle-check**

---

_[image: circle-check]_

**circle-check**

---

_[image: circle-dot]_

**circle-dot**

---

_[image: circle-dot]_

**circle-dot**

---

_[image: circle-exclamation]_

**circle-exclamation**

---

_[image: circle-info]_

**circle-info**

---

_[image: circle-minus]_

**circle-minus**

---

_[image: circle-pause]_

**circle-pause**

---

_[image: circle-pause]_

**circle-pause**

---

_[image: circle-plus]_

**circle-plus**

---

_[image: circle-question]_

**circle-question**

---

_[image: circle-xmark]_

**circle-xmark**

---

_[image: circle-xmark]_

**circle-xmark**

---

_[image: clipboard]_

**clipboard**

---

_[image: clipboard]_

**clipboard**

---

_[image: clipboard-check]_

**clipboard-check**

---

_[image: clipboard-user]_

**clipboard-user**

---

_[image: clock]_

**clock**

---

_[image: clock-rotate-left]_

**clock-rotate-left**

---

_[image: clone]_

**clone**

---

_[image: code]_

**code**

---

_[image: comment]_

**comment**

---

_[image: comment]_

**comment**

---

_[image: credit-card]_

**credit-card**

---

_[image: crosshairs]_

**crosshairs**

---

_[image: database]_

**database**

---

_[image: delete-left]_

**delete-left**

---

_[image: download]_

**download**

---

_[image: ear-listen]_

**ear-listen**

---

_[image: earth-americas]_

**earth-americas**

---

_[image: edit]_

**edit**

---

_[image: ellipsis-vertical]_

**ellipsis-vertical**

---

_[image: envelope]_

**envelope**

---

_[image: equals]_

**equals**

---

_[image: eraser]_

**eraser**

---

_[image: exclamation]_

**exclamation**

---

_[image: expand]_

**expand**

---

_[image: external-link]_

**external-link**

---

_[image: eye]_

**eye**

---

_[image: eye]_

**eye**

---

_[image: eye-dropper]_

**eye-dropper**

---

_[image: eye-low-vision]_

**eye-low-vision**

---

_[image: eye-slash]_

**eye-slash**

---

_[image: face-frown]_

**face-frown**

---

_[image: face-frown]_

**face-frown**

---

_[image: face-smile]_

**face-smile**

---

_[image: face-smile]_

**face-smile**

---

_[image: file]_

**file**

---

_[image: file]_

**file**

---

_[image: file-circle-minus]_

**file-circle-minus**

---

_[image: file-circle-plus]_

**file-circle-plus**

---

_[image: file-image]_

**file-image**

---

_[image: file-image]_

**file-image**

---

_[image: file-invoice]_

**file-invoice**

---

_[image: file-pdf]_

**file-pdf**

---

_[image: file-pdf]_

**file-pdf**

---

_[image: file-text]_

**file-text**

---

_[image: file-text]_

**file-text**

---

_[image: file-video]_

**file-video**

---

_[image: file-video]_

**file-video**

---

_[image: file-zipper]_

**file-zipper**

---

_[image: file-zipper]_

**file-zipper**

---

_[image: film]_

**film**

---

_[image: filter]_

**filter**

---

_[image: flag]_

**flag**

---

_[image: folder]_

**folder**

---

_[image: folder-open]_

**folder-open**

---

_[image: folder-plus]_

**folder-plus**

---

_[image: folder-tree]_

**folder-tree**

---

_[image: font]_

**font**

---

_[image: futbol]_

**futbol**

---

_[image: gauge]_

**gauge**

---

_[image: gear]_

**gear**

---

_[image: globe]_

**globe**

---

_[image: graduation-cap]_

**graduation-cap**

---

_[image: hammer]_

**hammer**

---

_[image: hard-drive]_

**hard-drive**

---

_[image: hashtag]_

**hashtag**

---

_[image: headphones]_

**headphones**

---

_[image: highlighter]_

**highlighter**

---

_[image: home]_

**home**

---

_[image: hourglass]_

**hourglass**

---

_[image: hourglass-half]_

**hourglass-half**

---

_[image: i-cursor]_

**i-cursor**

---

_[image: image]_

**image**

---

_[image: indent]_

**indent**

---

_[image: info]_

**info**

---

_[image: italic]_

**italic**

---

_[image: language]_

**language**

---

_[image: laptop-file]_

**laptop-file**

---

_[image: layer-group]_

**layer-group**

---

_[image: leaf]_

**leaf**

---

_[image: life-ring]_

**life-ring**

---

_[image: link]_

**link**

---

_[image: link-slash]_

**link-slash**

---

_[image: list]_

**list**

---

_[image: list-check]_

**list-check**

---

_[image: list-ol]_

**list-ol**

---

_[image: list-ul]_

**list-ul**

---

_[image: location-dot]_

**location-dot**

---

_[image: lock]_

**lock**

---

_[image: lock-open]_

**lock-open**

---

_[image: magnifying-glass]_

**magnifying-glass**

---

_[image: magnifying-glass-minus]_

**magnifying-glass-minus**

---

_[image: magnifying-glass-plus]_

**magnifying-glass-plus**

---

_[image: male]_

**male**

---

_[image: maximize]_

**maximize**

---

_[image: message]_

**message**

---

_[image: microphone]_

**microphone**

---

_[image: microphone-slash]_

**microphone-slash**

---

_[image: minus]_

**minus**

---

_[image: network-wired]_

**network-wired**

---

_[image: newspaper]_

**newspaper**

---

_[image: outdent]_

**outdent**

---

_[image: paper-plane]_

**paper-plane**

---

_[image: paperclip]_

**paperclip**

---

_[image: paste]_

**paste**

---

_[image: peace]_

**peace**

---

_[image: pen]_

**pen**

---

_[image: pen-clip]_

**pen-clip**

---

_[image: people-arrows]_

**people-arrows**

---

_[image: photo-film]_

**photo-film**

---

_[image: pizza-slice]_

**pizza-slice**

---

_[image: plane]_

**plane**

---

_[image: play]_

**play**

---

_[image: plus]_

**plus**

---

_[image: question]_

**question**

---

_[image: print]_

**print**

---

_[image: quote-left]_

**quote-left**

---

_[image: quote-right]_

**quote-right**

---

_[image: rectangle-list]_

**rectangle-list**

---

_[image: rectangle-xmark]_

**rectangle-xmark**

---

_[image: refresh]_

**refresh**

---

_[image: right-left]_

**right-left**

---

_[image: rss]_

**rss**

---

_[image: ruler-horizontal]_

**ruler-horizontal**

---

_[image: save]_

**save**

---

_[image: scissors]_

**scissors**

---

_[image: shapes]_

**shapes**

---

_[image: share]_

**share**

---

_[image: spell-check]_

**spell-check**

---

_[image: spinner]_

**spinner**

---

_[image: square]_

**square**

---

_[image: square]_

**square**

---

_[image: square-arrow-up-right]_

**square-arrow-up-right**

---

_[image: square-check]_

**square-check**

---

_[image: square-check]_

**square-check**

---

_[image: square-plus]_

**square-plus**

---

_[image: square-root-variable]_

**square-root-variable**

---

_[image: star]_

**star**

---

_[image: star]_

**star**

---

_[image: stop]_

**stop**

---

_[image: strikethrough]_

**strikethrough**

---

_[image: subscript]_

**subscript**

---

_[image: suitcase]_

**suitcase**

---

_[image: superscript]_

**superscript**

---

_[image: table]_

**table**

---

_[image: table-cells-large]_

**table-cells-large**

---

_[image: table-list]_

**table-list**

---

_[image: tags]_

**tags**

---

_[image: thumbs-up]_

**thumbs-up**

---

_[image: thumbtack]_

**thumbtack**

---

_[image: trash-can]_

**trash-can**

---

_[image: trash-can-arrow-up]_

**trash-can-arrow-up**

---

_[image: tree]_

**tree**

---

_[image: triangle-exclamation]_

**triangle-exclamation**

---

_[image: trophy]_

**trophy**

---

_[image: underline]_

**underline**

---

_[image: universal-access]_

**universal-access**

---

_[image: unlock]_

**unlock**

---

_[image: unlock-keyhole]_

**unlock-keyhole**

---

_[image: up-right-and-down-left-from-center]_

**up-right-and-down-left-from-center**

---

_[image: upload]_

**upload**

---

_[image: usd]_

**usd**

---

_[image: user]_

**user**

---

_[image: user-check]_

**user-check**

---

_[image: user-group]_

**user-group**

---

_[image: user-lock]_

**user-lock**

---

_[image: user-lock]_

**user-lock**

---

_[image: user-plus]_

**user-plus**

---

_[image: user-tag]_

**user-tag**

---

_[image: user-tie]_

**user-tie**

---

_[image: user-xmark]_

**user-xmark**

---

_[image: users]_

**users**

---

_[image: users-gear]_

**users-gear**

---

_[image: users-line]_

**users-line**

---

_[image: video]_

**video**

---

_[image: volume-high]_

**volume-high**

---

_[image: wand-magic-sparkles]_

**wand-magic-sparkles**

---

_[image: window-restore]_

**window-restore**

---

_[image: wrench]_

**wrench**

---

_[image: xmark]_

**xmark**

---
---

# Overview
## Overview

Icons reinforce meaning and actions and provide visual cues in the interface. Consistent sizing and accessible labelling ensure icons support content rather than replace it.



### Core principles

* Use approved icons only (avoid mixing icon sets).
* Prefer icon + text for important actions.
* Apply consistent sizes and containers for alignment.
* Provide labels for icon-only controls.



---

## Usage

### Icon library

Moodle uses **Font Awesome Free 6.7.2** for all icons, except for icons used in activities and resources, which follow a separate system.

Icons can be adjusted using three main options: **style**, **size**, and **padding**.

### Styles

There are two styles available: 

* **Solid** is used most often and provides a strong, filled look
* **Outline** (also known as Regular) is a lighter alternative and works well in subtle UI elements.



### Sizes

Sizes include six predefined options: **XS**, **SM**, **MD** (default), **LG**, **XL**, and **XXL**. Choose a size based on the layout. Smaller sizes work well inline with text. Larger ones suit featured or attention-grabbing areas.

| `xs` | 8 px |
| --- | --- |
| `sm` | 12 px |
| `md` | 16 px |
| `lg` | 20 px |
| `xl` | 24 px |
| `xxl` | 32 px |

### Containers

There are two container variants for icons:

* **Square** (default): Maintains equal height and width. Keeps icons visually aligned in lists, buttons or layouts with fixed spacing. The container is slightly larger than the icon size.
* **Auto**: Adjusts to fit the icon's actual width. Best for use inline with text or when spacing is handled outside the icon.



---

### Examples

* Use **Square** containers in lists, tables, and dense layouts
* Use **Auto** inline with text where surrounding layout controls spacing




---

### Accessibility considerations

* Icon-only controls require an aria-label and/or tooltip
* Don’t use icons as the only indicator of status or meaning
---

---

# Code

---

# Overview
## Overview

Elevation communicates surface depth and stacking order through shadow, helping users understand layering and focus.

They are defined by three shadow properties: colour, offset and blur.

### Core principles

* Use elevation to express layering, not decoration.
* Use the lowest elevation that achieves clarity.
* Keep elevation levels limited and reusable.
* Avoid stacking multiple shadows unnecessarily




---

## Usage

### Shadow styles

|  | **Shadow / Small** Used for tooltips or subtle inner containers. |
| :--- | :--- |
|  | **Shadow / Medium** Used for cards, dropdowns or modals. |
|  | **Shadow / Large** Used for overlays or drawers that sit above other layers. |

---

### Accessibility

* Ensure elevated surfaces remain distinguishable in low-contrast contexts
* Use borders/spacing when shadow alone isn’t enough to separate surfaces

---

# Tokens
### Blur

| Token | Value | Description |
| --- | --- | --- |
| blur.sm | {scale.100} |   |
| blur.md | {scale.600} |   |
| blur.lg | {scale.1200} |   |

```json
{
  "blur": {
    "sm": {
      "$type": "number",
      "$value": "{scale.100}"
    },
    "md": {
      "$type": "number",
      "$value": "{scale.600}"
    },
    "lg": {
      "$type": "number",
      "$value": "{scale.1200}"
    }
  }
}
```

### Offset

| Token | Value | Description |
| --- | --- | --- |
| offset.sm | {scale.50} |   |
| offset.md | {scale.300} |   |
| offset.lg | {scale.600} |   |

```json
{
  "offset": {
    "sm": {
      "$type": "number",
      "$value": "{scale.50}"
    },
    "md": {
      "$type": "number",
      "$value": "{scale.300}"
    },
    "lg": {
      "$type": "number",
      "$value": "{scale.600}"
    }
  }
}
```

### Colour

| Token | Value | Description |
| --- | --- | --- |
| color.sm | rgba(0, 0, 0, 0.08) |   |
| color.md | rgba(0, 0, 0, 0.15) |   |
| color.lg | rgba(0, 0, 0, 0.17) |   |

```json
{
  "color": {
    "sm": {
      "$type": "color",
      "$value": "rgba(0, 0, 0, 0.08)"
    },
    "md": {
      "$type": "color",
      "$value": "rgba(0, 0, 0, 0.15)"
    },
    "lg": {
      "$type": "color",
      "$value": "rgba(0, 0, 0, 0.17)"
    }
  }
}
```
---

---

# Overview
## **Overview**

Borders define structure, separation, and shape. Focus rings ensure keyboard focus is visible and consistent across interactive elements.



### Core principles

* Use stroke and radius tokens (no one-off values).
* Use stronger strokes for emphasis (focus/selected), not decoration.
* Never remove focus indication without an accessible alternative.
* Keep shapes consistent across component families.

---

## Usage

### Strokes

Stroke tokens define the thickness of borders and lines. Use them to apply consistent visual weight to elements.

|  | **stroke weight sm** Used for fine outlines, subtle dividers or light borders on cards. |
| :--- | :--- |
|  | **stroke weight md** Used for inputs, containers or lightly emphasised components. |
|  | **stroke weight lg** Used for active states like focused inputs or selected items. |
|  | **stroke weight xl** Used for banners or elements needing strong visual emphasis. |
|  | **stroke weight xxl** Used sparingly for highly prominent components or callouts. |

### Radius

Radius tokens set the roundness of corners to ensure shape consistency across the interface.



|  | **border radius xs** Used for buttons or inputs in compact components. |
| :--- | :--- |
|  | **border radius sm**  Used for cards, panels and standard containers. |
|  | **border radius md** Used when softer curves are needed for visual balance. |
|  | **border radius lg** Used when softer curves are needed for visual balance. |
|  | **border radius xl** Used for overlays, modals or large pill-style buttons. |
|   | **border radius xxl** Used for large tags or rounded panels. |
|  | **border radius pill** Used for pill-shaped elements such as badges or toggles. |

### Focus ring

Focus ring tokens define the outline used to show keyboard focus. This helps users navigate interfaces using a keyboard or assistive technology.

It is defined by two properties: colour and stroke weight. 



---

### Examples

* Inputs use`stroke-md`by default; focus uses`stroke-lg` 
* Cards/panels use `radius-md`; pills use`radius-pill`only when shape requires it



---

### Accessibility considerations

* Focus must be clearly visible for keyboard users
* Focus should remain visible across supported surfaces
---

# Tokens
### Stroke weight

Define the thickness of borders and lines. They help create visual hierarchy and separate elements clearly.

| Token | Value | Description |
| --- | --- | --- |
| stroke weight.sm | 1 |   |
| stroke weight.md | 2 |   |
| stroke weight.lg | 3 |   |
| stroke weight.xl | 4 |   |
| stroke weight.xxl | 5 |   |

```json
{
  "stroke weight": {
    "sm": {
      "$type": "number",
      "$value": 1
    },
    "md": {
      "$type": "number",
      "$value": 2
    },
    "lg": {
      "$type": "number",
      "$value": 3
    },
    "xl": {
      "$type": "number",
      "$value": 4
    },
    "xxl": {
      "$type": "number",
      "$value": 5
    }
  }
}
```

---

### Radius tokens

Set the roundness of component corners. They help maintain consistent shapes and a balanced visual style.

| Token | Value | Description |
| --- | --- | --- |
| border radius.none | {scale.0} |   |
| border radius.xs | {scale.100} |   |
| border radius.sm | {scale.200} |   |
| border radius.md | {scale.300} |   |
| border radius.lg | {scale.400} |   |
| border radius.xl | {scale.600} |   |
| border radius.xxl | {scale.1000} |   |
| border radius.pill | {scale.1800} |   |

```json
{
  "border radius": {
    "none": {
      "$type": "number",
      "$value": "{scale.0}"
    },
    "xs": {
      "$type": "number",
      "$value": "{scale.100}"
    },
    "sm": {
      "$type": "number",
      "$value": "{scale.200}"
    },
    "md": {
      "$type": "number",
      "$value": "{scale.300}"
    },
    "lg": {
      "$type": "number",
      "$value": "{scale.400}"
    },
    "xl": {
      "$type": "number",
      "$value": "{scale.600}"
    },
    "xxl": {
      "$type": "number",
      "$value": "{scale.1000}"
    },
    "pill": {
      "$type": "number",
      "$value": "{scale.1800}"
    }
  }
}
```
---

# Code

---

---

# Overview
## Overview

Colour supports meaning, hierarchy, and state across the interface. Apply colour through **semantic tokens** so UI usage stays consistent, accessible, and themeable.

### Core principles

* Use semantic tokens in components (don’t use raw hex/primitive values).
* Choose tokens by **intent** first (surface vs interactive vs feedback), then by **property** (bg/text/border), then by **state** (hover/active/disabled).
* Keep state behaviour consistent across components (hover ≠ active ≠ disabled).
* Don’t use colour alone to communicate meaning—pair with text, icon, or structure where needed.



---

## Usage

### Backgrounds

**Neutral surfaces**Use these for layout layers (page, cards, panels):

|  | `default` main surfaces |
| :---: | :--- |
|  | `subtle` subtle containers |
|  | `strong` stronger separation / emphasis |

**Interactive backgrounds** Use these for buttons and other interactive UI. They always come with states:

| `primary` | `secondary` | `danger` |   |
| --- | --- | --- | --- |

|  | `default` |  | `default` |  | `default` |   |   |
| :---: | :--- | :---: | :--- | :---: | :--- | :---: | :--- |
|  | `hover` |  | `hover` |  | `hover` |   |   |
|  | `active` |  | `active` |  | `active` |   |   |
|  | `disabled` |  | `disabled` |  | `disabled` |   |   |

**Feedback backgrounds** Use these for alerts/banners/toasts. 

| `primary` | `secondary` |   |   |
| --- | --- | --- | --- |

|  | `default` |  | `default` |   |   |   |   |
| :---: | :--- | :---: | :--- | :---: | :--- | :---: | :--- |
|  | `subtle` |  | `subtle` |   |   |   |   |

| `success` | `warning` | `danger` | `info` |
| --- | --- | --- | --- |

|  | `default` |  | `default` |  | `default` |  | `default` |
| :---: | :--- | :---: | :--- | :---: | :--- | :---: | :--- |
|  | `subtle` |  | `subtle` |  | `subtle` |  | `subtle` |

---

### Text 

Text tokens support hierarchy and readability across surfaces:

|  | `default` |  | `subtle` |  | `danger` |  | `danger disabled` |
| :---: | :--- | :---: | :--- | :---: | :--- | :---: | :--- |
|  | `muted` |  | `emphasis` |  | `inverse` |   |   |

For feedback components, use the matching feedback text token for best readability:

|  | `primary` |  | `success` |  | `danger` |
| :---: | :--- | :---: | :--- | :---: | :--- |
|  | `secondary` |  | `warning` |  | `info` |

Link styling:

|  | `default` |  | `hover` |  | `disabled` |
| :---: | :--- | :---: | :--- | :---: | :--- |

---

### Borders 

Borders separate regions and define components:

|  | `default` standard outlines/dividers |
| :---: | :--- |
|  | `subtle` lighter separation |

Feedback borders pair with feedback backgrounds:

|  | `primary` |  | `success` |  | `danger` |
| :---: | :--- | :---: | :--- | :---: | :--- |
|  | `secondary` |  | `warning` |  | `info` |

Interactive borders pair with interactive states:

| `primary` | `secondary` | `danger` |   |
| --- | --- | --- | --- |

|  | `default` |  | `default` |  | `default` |   |   |
| :---: | :--- | :---: | :--- | :---: | :--- | :---: | :--- |
|  | `hover` |  | `hover` |  | `hover` |   |   |
|  | `active` |  | `active` |  | `active` |   |   |
|  | `disabled` |  | `disabled` |  | `disabled` |   |   |

Focus is shared and consistent:

|  | `default` Use it for all interactive elements to keep keyboard navigation predictable. |
| :---: | :--- |
|  | `danger` Use it for interactive elements in a danger or error state to keep focus visible and contextually consistent. |

---

### Token pairing

The easiest way to stay consistent is to use **token sets**:

**Feedback set (status UI)**



---

### Accessibility considerations

Colour contrast helps everyone, especially people with low vision.

Follow [WCAG ](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html)**[Level AA](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html)**[ accessibility standards](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) as a baseline:

* Text contrast: **≥ 4.5:1**
* Large text & essential icons: **≥ 3:1**
* Focus must remain clearly visible (not subtle or colour-only)
* Don’t convey meaning with colour alone (add label, icon, message, pattern)
---

# Code

---

# Tokens
## Primitive colour tokens

These are the base colours. Each one is named by its colour and shade.

| Token | Value | Description |
| --- | --- | --- |
| color.blue.100 | #CFE2F2 |   |
| color.blue.200 | #9FC4E5 |   |
| color.blue.300 | #6FA7D9 |   |
| color.blue.400 | #3F89CC |   |
| color.blue.500 | #0F6CBF |   |
| color.blue.600 | #0C5699 |   |
| color.blue.700 | #094173 |   |
| color.blue.800 | #062B4C |   |
| color.blue.900 | #031626 |   |
| color.indigo.100 | #E0CFFC |   |
| color.indigo.200 | #C29FFA |   |
| color.indigo.300 | #A370F7 |   |
| color.indigo.400 | #8540F5 |   |
| color.indigo.500 | #6610F2 |   |
| color.indigo.600 | #520DC2 |   |
| color.indigo.700 | #3D0A91 |   |
| color.indigo.800 | #290661 |   |
| color.indigo.900 | #140330 |   |
| color.purple.100 | #DFD8E5 |   |
| color.purple.200 | #C0B1CB |   |
| color.purple.300 | #A08BB0 |   |
| color.purple.400 | #816496 |   |
| color.purple.500 | #613D7C |   |
| color.purple.600 | #4E3163 |   |
| color.purple.700 | #3A254A |   |
| color.purple.800 | #271832 |   |
| color.purple.900 | #130C19 |   |
| color.pink.100 | #F8D1E3 |   |
| color.pink.200 | #F1A3C7 |   |
| color.pink.300 | #E976AC |   |
| color.pink.400 | #E24890 |   |
| color.pink.500 | #DB1A74 |   |
| color.pink.600 | #AF155D |   |
| color.pink.700 | #831046 |   |
| color.pink.800 | #580A2E |   |
| color.pink.900 | #2C0517 |   |
| color.red.100 | #F4D6D2 |   |
| color.red.200 | #EAADA6 |   |
| color.red.300 | #DF8379 |   |
| color.red.400 | #D55A4D |   |
| color.red.500 | #CA3120 |   |
| color.red.600 | #A2271A |   |
| color.red.700 | #791D13 |   |
| color.red.800 | #51140D |   |
| color.red.900 | #280A06 |   |
| color.orange.100 | #FFE3D1 |   |
| color.orange.200 | #FFC8A3 |   |
| color.orange.300 | #FFAC74 |   |
| color.orange.400 | #FF9146 |   |
| color.orange.500 | #FF7518 |   |
| color.orange.600 | #CC5E13 |   |
| color.orange.700 | #99460E |   |
| color.orange.800 | #662F0A |   |
| color.orange.900 | #331705 |   |
| color.yellow.100 | #FCEFDC |   |
| color.yellow.200 | #F9DEB8 |   |
| color.yellow.300 | #F6CE95 |   |
| color.yellow.400 | #F3BD71 |   |
| color.yellow.500 | #F0AD4E |   |
| color.yellow.600 | #C08A3E |   |
| color.yellow.700 | #90682F |   |
| color.yellow.800 | #60451F |   |
| color.yellow.900 | #302310 |   |
| color.green.100 | #D7E4D6 |   |
| color.green.200 | #AECAAD |   |
| color.green.300 | #86AF84 |   |
| color.green.400 | #5D955B |   |
| color.green.500 | #357A32 |   |
| color.green.600 | #2A6228 |   |
| color.green.700 | #20491E |   |
| color.green.800 | #153114 |   |
| color.green.900 | #0B180A |   |
| color.teal.100 | #D2F4EA |   |
| color.teal.200 | #A6E9D5 |   |
| color.teal.300 | #79DFC1 |   |
| color.teal.400 | #4DD4AC |   |
| color.teal.500 | #20C997 |   |
| color.teal.600 | #1AA179 |   |
| color.teal.700 | #13795B |   |
| color.teal.800 | #0D503C |   |
| color.teal.900 | #06281E |   |
| color.cyan.100 | #CCE6EA |   |
| color.cyan.200 | #99CDD5 |   |
| color.cyan.300 | #66B3C0 |   |
| color.cyan.400 | #339AAB |   |
| color.cyan.500 | #008196 |   |
| color.cyan.600 | #006778 |   |
| color.cyan.700 | #004D5A |   |
| color.cyan.800 | #00343C |   |
| color.cyan.900 | #001A1E |   |
| color.gray.100 | #F8F9FA |   |
| color.gray.200 | #E9ECEF |   |
| color.gray.300 | #DEE2E6 |   |
| color.gray.400 | #CED4DA |   |
| color.gray.500 | #8F959E |   |
| color.gray.600 | #6A737B |   |
| color.gray.700 | #495057 |   |
| color.gray.800 | #343A40 |   |
| color.gray.900 | #1D2125 |   |
| color.gray.black | #000000 |   |
| color.gray.white | #FFFFFF |   |

```json
{
  "color": {
    "blue": {
      "100": {
        "$type": "color",
        "$value": "#CFE2F2"
      },
      "200": {
        "$type": "color",
        "$value": "#9FC4E5"
      },
      "300": {
        "$type": "color",
        "$value": "#6FA7D9"
      },
      "400": {
        "$type": "color",
        "$value": "#3F89CC"
      },
      "500": {
        "$type": "color",
        "$value": "#0F6CBF"
      },
      "600": {
        "$type": "color",
        "$value": "#0C5699"
      },
      "700": {
        "$type": "color",
        "$value": "#094173"
      },
      "800": {
        "$type": "color",
        "$value": "#062B4C"
      },
      "900": {
        "$type": "color",
        "$value": "#031626"
      }
    },
    "indigo": {
      "100": {
        "$type": "color",
        "$value": "#E0CFFC"
      },
      "200": {
        "$type": "color",
        "$value": "#C29FFA"
      },
      "300": {
        "$type": "color",
        "$value": "#A370F7"
      },
      "400": {
        "$type": "color",
        "$value": "#8540F5"
      },
      "500": {
        "$type": "color",
        "$value": "#6610F2"
      },
      "600": {
        "$type": "color",
        "$value": "#520DC2"
      },
      "700": {
        "$type": "color",
        "$value": "#3D0A91"
      },
      "800": {
        "$type": "color",
        "$value": "#290661"
      },
      "900": {
        "$type": "color",
        "$value": "#140330"
      }
    },
    "purple": {
      "100": {
        "$type": "color",
        "$value": "#DFD8E5"
      },
      "200": {
        "$type": "color",
        "$value": "#C0B1CB"
      },
      "300": {
        "$type": "color",
        "$value": "#A08BB0"
      },
      "400": {
        "$type": "color",
        "$value": "#816496"
      },
      "500": {
        "$type": "color",
        "$value": "#613D7C"
      },
      "600": {
        "$type": "color",
        "$value": "#4E3163"
      },
      "700": {
        "$type": "color",
        "$value": "#3A254A"
      },
      "800": {
        "$type": "color",
        "$value": "#271832"
      },
      "900": {
        "$type": "color",
        "$value": "#130C19"
      }
    },
    "pink": {
      "100": {
        "$type": "color",
        "$value": "#F8D1E3"
      },
      "200": {
        "$type": "color",
        "$value": "#F1A3C7"
      },
      "300": {
        "$type": "color",
        "$value": "#E976AC"
      },
      "400": {
        "$type": "color",
        "$value": "#E24890"
      },
      "500": {
        "$type": "color",
        "$value": "#DB1A74"
      },
      "600": {
        "$type": "color",
        "$value": "#AF155D"
      },
      "700": {
        "$type": "color",
        "$value": "#831046"
      },
      "800": {
        "$type": "color",
        "$value": "#580A2E"
      },
      "900": {
        "$type": "color",
        "$value": "#2C0517"
      }
    },
    "red": {
      "100": {
        "$type": "color",
        "$value": "#F4D6D2"
      },
      "200": {
        "$type": "color",
        "$value": "#EAADA6"
      },
      "300": {
        "$type": "color",
        "$value": "#DF8379"
      },
      "400": {
        "$type": "color",
        "$value": "#D55A4D"
      },
      "500": {
        "$type": "color",
        "$value": "#CA3120"
      },
      "600": {
        "$type": "color",
        "$value": "#A2271A"
      },
      "700": {
        "$type": "color",
        "$value": "#791D13"
      },
      "800": {
        "$type": "color",
        "$value": "#51140D"
      },
      "900": {
        "$type": "color",
        "$value": "#280A06"
      }
    },
    "orange": {
      "100": {
        "$type": "color",
        "$value": "#FFE3D1"
      },
      "200": {
        "$type": "color",
        "$value": "#FFC8A3"
      },
      "300": {
        "$type": "color",
        "$value": "#FFAC74"
      },
      "400": {
        "$type": "color",
        "$value": "#FF9146"
      },
      "500": {
        "$type": "color",
        "$value": "#FF7518"
      },
      "600": {
        "$type": "color",
        "$value": "#CC5E13"
      },
      "700": {
        "$type": "color",
        "$value": "#99460E"
      },
      "800": {
        "$type": "color",
        "$value": "#662F0A"
      },
      "900": {
        "$type": "color",
        "$value": "#331705"
      }
    },
    "yellow": {
      "100": {
        "$type": "color",
        "$value": "#FCEFDC"
      },
      "200": {
        "$type": "color",
        "$value": "#F9DEB8"
      },
      "300": {
        "$type": "color",
        "$value": "#F6CE95"
      },
      "400": {
        "$type": "color",
        "$value": "#F3BD71"
      },
      "500": {
        "$type": "color",
        "$value": "#F0AD4E"
      },
      "600": {
        "$type": "color",
        "$value": "#C08A3E"
      },
      "700": {
        "$type": "color",
        "$value": "#90682F"
      },
      "800": {
        "$type": "color",
        "$value": "#60451F"
      },
      "900": {
        "$type": "color",
        "$value": "#302310"
      }
    },
    "green": {
      "100": {
        "$type": "color",
        "$value": "#D7E4D6"
      },
      "200": {
        "$type": "color",
        "$value": "#AECAAD"
      },
      "300": {
        "$type": "color",
        "$value": "#86AF84"
      },
      "400": {
        "$type": "color",
        "$value": "#5D955B"
      },
      "500": {
        "$type": "color",
        "$value": "#357A32"
      },
      "600": {
        "$type": "color",
        "$value": "#2A6228"
      },
      "700": {
        "$type": "color",
        "$value": "#20491E"
      },
      "800": {
        "$type": "color",
        "$value": "#153114"
      },
      "900": {
        "$type": "color",
        "$value": "#0B180A"
      }
    },
    "teal": {
      "100": {
        "$type": "color",
        "$value": "#D2F4EA"
      },
      "200": {
        "$type": "color",
        "$value": "#A6E9D5"
      },
      "300": {
        "$type": "color",
        "$value": "#79DFC1"
      },
      "400": {
        "$type": "color",
        "$value": "#4DD4AC"
      },
      "500": {
        "$type": "color",
        "$value": "#20C997"
      },
      "600": {
        "$type": "color",
        "$value": "#1AA179"
      },
      "700": {
        "$type": "color",
        "$value": "#13795B"
      },
      "800": {
        "$type": "color",
        "$value": "#0D503C"
      },
      "900": {
        "$type": "color",
        "$value": "#06281E"
      }
    },
    "cyan": {
      "100": {
        "$type": "color",
        "$value": "#CCE6EA"
      },
      "200": {
        "$type": "color",
        "$value": "#99CDD5"
      },
      "300": {
        "$type": "color",
        "$value": "#66B3C0"
      },
      "400": {
        "$type": "color",
        "$value": "#339AAB"
      },
      "500": {
        "$type": "color",
        "$value": "#008196"
      },
      "600": {
        "$type": "color",
        "$value": "#006778"
      },
      "700": {
        "$type": "color",
        "$value": "#004D5A"
      },
      "800": {
        "$type": "color",
        "$value": "#00343C"
      },
      "900": {
        "$type": "color",
        "$value": "#001A1E"
      }
    },
    "gray": {
      "100": {
        "$type": "color",
        "$value": "#F8F9FA"
      },
      "200": {
        "$type": "color",
        "$value": "#E9ECEF"
      },
      "300": {
        "$type": "color",
        "$value": "#DEE2E6"
      },
      "400": {
        "$type": "color",
        "$value": "#CED4DA"
      },
      "500": {
        "$type": "color",
        "$value": "#8F959E"
      },
      "600": {
        "$type": "color",
        "$value": "#6A737B"
      },
      "700": {
        "$type": "color",
        "$value": "#495057"
      },
      "800": {
        "$type": "color",
        "$value": "#343A40"
      },
      "900": {
        "$type": "color",
        "$value": "#1D2125"
      },
      "black": {
        "$type": "color",
        "$value": "#000000"
      },
      "white": {
        "$type": "color",
        "$value": "#FFFFFF"
      }
    }
  }
}
```

## Semantic colour tokens

These tokens give colours a meaning and a role within the interface.

| Token | Value | Description |
| --- | --- | --- |
| bg.feedback.danger.default | {bg.interactive.danger.default} |   |
| bg.feedback.danger.subtle | {color.red.100} |   |
| bg.feedback.info.default | {color.cyan.500} |   |
| bg.feedback.info.subtle | {color.cyan.100} |   |
| bg.feedback.primary.default | {color.blue.500} |   |
| bg.feedback.primary.subtle | {color.blue.100} |   |
| bg.feedback.secondary.subtle | {color.gray.100} |   |
| bg.feedback.success.default | {color.green.500} |   |
| bg.feedback.success.subtle | {color.green.100} |   |
| bg.feedback.warning.default | {color.yellow.500} |   |
| bg.feedback.warning.subtle | {color.yellow.100} |   |
| bg.interactive.danger.active | {color.red.700} |   |
| bg.interactive.danger.default | {color.red.500} |   |
| bg.interactive.danger.disabled | {color.red.200} |   |
| bg.interactive.danger.hover | {color.red.600} |   |
| bg.interactive.primary.active | {color.blue.700} |   |
| bg.interactive.primary.default | {color.blue.500} |   |
| bg.interactive.primary.disabled | {color.blue.200} |   |
| bg.interactive.primary.hover | {color.blue.600} |   |
| bg.interactive.secondary.active | {bg.interactive.secondary.default} |   |
| bg.interactive.secondary.default | {color.gray.400} |   |
| bg.interactive.secondary.disabled | {color.gray.200} |   |
| bg.interactive.secondary.hover | {color.gray.300} |   |
| bg.surface.default | {color.gray.white} |   |
| bg.surface.strong | {color.gray.200} |   |
| bg.surface.subtle | {color.gray.100} |   |
| border.feedback.danger | {color.red.200} |   |
| border.feedback.info | {color.cyan.200} |   |
| border.feedback.primary | {color.blue.200} |   |
| border.feedback.secondary | {color.gray.200} |   |
| border.feedback.success | {color.green.200} |   |
| border.feedback.warning | {color.yellow.200} |   |
| border.interactive.danger.active | {color.red.600} |   |
| border.interactive.danger.default | {bg.interactive.danger.default} |   |
| border.interactive.danger.disabled | {color.red.300} |   |
| border.interactive.danger.hover | {bg.interactive.danger.default} |   |
| border.interactive.primary.active | {color.blue.600} |   |
| border.interactive.primary.default | {bg.interactive.primary.default} |   |
| border.interactive.primary.disabled | {color.blue.300} |   |
| border.interactive.primary.hover | {bg.interactive.primary.default} |   |
| border.interactive.secondary.active | {color.gray.700} |   |
| border.interactive.secondary.default | {color.gray.600} |   |
| border.interactive.secondary.disabled | {color.gray.500} |   |
| border.interactive.secondary.hover | {color.gray.600} |   |
| border.default | {color.gray.300} |   |
| border.subtle | {color.gray.200} |   |
| border.translucent | rgba(0, 0, 0, 0) |   |
| focus.default | {border.interactive.primary.default} |   |
| focus.danger | {color.red.200} |   |
| text.feedback.danger | {color.red.800} |   |
| text.feedback.info | {color.cyan.800} |   |
| text.feedback.primary | {color.blue.800} |   |
| text.feedback.secondary | {color.gray.800} |   |
| text.feedback.success | {color.green.800} |   |
| text.feedback.warning | {color.yellow.800} |   |
| text.link.primary.default | {bg.interactive.primary.default} |   |
| text.link.primary.disabled | {color.blue.300} |   |
| text.link.primary.hover | {bg.interactive.primary.hover} |   |
| text.danger | {color.red.500} |   |
| text.danger disabled | {color.red.300} |   |
| text.default | {color.gray.900} |   |
| text.emphasis | {color.gray.black} |   |
| text.inverse | {color.gray.100} |   |
| text.muted | {color.gray.600} |   |
| text.subtle | {color.gray.700} |   |

```json
{
  "bg": {
    "feedback": {
      "danger": {
        "default": {
          "$type": "color",
          "$value": "{bg.interactive.danger.default}"
        },
        "subtle": {
          "$type": "color",
          "$value": "{color.red.100}"
        }
      },
      "info": {
        "default": {
          "$type": "color",
          "$value": "{color.cyan.500}"
        },
        "subtle": {
          "$type": "color",
          "$value": "{color.cyan.100}"
        }
      },
      "primary": {
        "default": {
          "$type": "color",
          "$value": "{color.blue.500}"
        },
        "subtle": {
          "$type": "color",
          "$value": "{color.blue.100}"
        }
      },
      "secondary": {
        "subtle": {
          "$type": "color",
          "$value": "{color.gray.100}"
        }
      },
      "success": {
        "default": {
          "$type": "color",
          "$value": "{color.green.500}"
        },
        "subtle": {
          "$type": "color",
          "$value": "{color.green.100}"
        }
      },
      "warning": {
        "default": {
          "$type": "color",
          "$value": "{color.yellow.500}"
        },
        "subtle": {
          "$type": "color",
          "$value": "{color.yellow.100}"
        }
      }
    },
    "interactive": {
      "danger": {
        "active": {
          "$type": "color",
          "$value": "{color.red.700}"
        },
        "default": {
          "$type": "color",
          "$value": "{color.red.500}"
        },
        "disabled": {
          "$type": "color",
          "$value": "{color.red.200}"
        },
        "hover": {
          "$type": "color",
          "$value": "{color.red.600}"
        }
      },
      "primary": {
        "active": {
          "$type": "color",
          "$value": "{color.blue.700}"
        },
        "default": {
          "$type": "color",
          "$value": "{color.blue.500}"
        },
        "disabled": {
          "$type": "color",
          "$value": "{color.blue.200}"
        },
        "hover": {
          "$type": "color",
          "$value": "{color.blue.600}"
        }
      },
      "secondary": {
        "active": {
          "$type": "color",
          "$value": "{bg.interactive.secondary.default}"
        },
        "default": {
          "$type": "color",
          "$value": "{color.gray.400}"
        },
        "disabled": {
          "$type": "color",
          "$value": "{color.gray.200}"
        },
        "hover": {
          "$type": "color",
          "$value": "{color.gray.300}"
        }
      }
    },
    "surface": {
      "default": {
        "$type": "color",
        "$value": "{color.gray.white}"
      },
      "strong": {
        "$type": "color",
        "$value": "{color.gray.200}"
      },
      "subtle": {
        "$type": "color",
        "$value": "{color.gray.100}"
      }
    }
  },
  "border": {
    "feedback": {
      "danger": {
        "$type": "color",
        "$value": "{color.red.200}"
      },
      "info": {
        "$type": "color",
        "$value": "{color.cyan.200}"
      },
      "primary": {
        "$type": "color",
        "$value": "{color.blue.200}"
      },
      "secondary": {
        "$type": "color",
        "$value": "{color.gray.200}"
      },
      "success": {
        "$type": "color",
        "$value": "{color.green.200}"
      },
      "warning": {
        "$type": "color",
        "$value": "{color.yellow.200}"
      }
    },
    "interactive": {
      "danger": {
        "active": {
          "$type": "color",
          "$value": "{color.red.600}"
        },
        "default": {
          "$type": "color",
          "$value": "{bg.interactive.danger.default}"
        },
        "disabled": {
          "$type": "color",
          "$value": "{color.red.300}"
        },
        "hover": {
          "$type": "color",
          "$value": "{bg.interactive.danger.default}"
        }
      },
      "primary": {
        "active": {
          "$type": "color",
          "$value": "{color.blue.600}"
        },
        "default": {
          "$type": "color",
          "$value": "{bg.interactive.primary.default}"
        },
        "disabled": {
          "$type": "color",
          "$value": "{color.blue.300}"
        },
        "hover": {
          "$type": "color",
          "$value": "{bg.interactive.primary.default}"
        }
      },
      "secondary": {
        "active": {
          "$type": "color",
          "$value": "{color.gray.700}"
        },
        "default": {
          "$type": "color",
          "$value": "{color.gray.600}"
        },
        "disabled": {
          "$type": "color",
          "$value": "{color.gray.500}"
        },
        "hover": {
          "$type": "color",
          "$value": "{color.gray.600}"
        }
      }
    },
    "default": {
      "$type": "color",
      "$value": "{color.gray.300}"
    },
    "subtle": {
      "$type": "color",
      "$value": "{color.gray.200}"
    },
    "translucent": {
      "$type": "color",
      "$value": "rgba(0, 0, 0, 0)"
    }
  },
  "focus": {
    "default": {
      "$type": "color",
      "$value": "{border.interactive.primary.default}"
    },
    "danger": {
      "$type": "color",
      "$value": "{color.red.200}"
    }
  },
  "text": {
    "feedback": {
      "danger": {
        "$type": "color",
        "$value": "{color.red.800}"
      },
      "info": {
        "$type": "color",
        "$value": "{color.cyan.800}"
      },
      "primary": {
        "$type": "color",
        "$value": "{color.blue.800}"
      },
      "secondary": {
        "$type": "color",
        "$value": "{color.gray.800}"
      },
      "success": {
        "$type": "color",
        "$value": "{color.green.800}"
      },
      "warning": {
        "$type": "color",
        "$value": "{color.yellow.800}"
      }
    },
    "link": {
      "primary": {
        "default": {
          "$type": "color",
          "$value": "{bg.interactive.primary.default}"
        },
        "disabled": {
          "$type": "color",
          "$value": "{color.blue.300}"
        },
        "hover": {
          "$type": "color",
          "$value": "{bg.interactive.primary.hover}"
        }
      }
    },
    "danger": {
      "$type": "color",
      "$value": "{color.red.500}"
    },
    "danger disabled": {
      "$type": "color",
      "$value": "{color.red.300}"
    },
    "default": {
      "$type": "color",
      "$value": "{color.gray.900}"
    },
    "emphasis": {
      "$type": "color",
      "$value": "{color.gray.black}"
    },
    "inverse": {
      "$type": "color",
      "$value": "{color.gray.100}"
    },
    "muted": {
      "$type": "color",
      "$value": "{color.gray.600}"
    },
    "subtle": {
      "$type": "color",
      "$value": "{color.gray.700}"
    }
  }
}
```
---

---

# Tokens
## Displays

Display styles are used for large, high-impact text.

While not frequently used in Moodle’s current UI, these styles are available for cases where strong visual presence is needed, such as landing pages, banners, or hero sections. Use them thoughtfully and in alignment with the product’s content strategy.

**Display 1**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (300) | The quick brown fox jumped over the lazy dog |
| Size | 80px |   |
| Line height | 96px |   |
| Letter spacing | 0px |   |

---

**Display 2**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (300) | The quick brown fox jumped over the lazy dog |
| Size | 72px |   |
| Line height | 86.4px |   |
| Letter spacing | 0px |   |

---

**Display 3**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (300) | The quick brown fox jumped over the lazy dog |
| Size | 64px |   |
| Line height | 76.8px |   |
| Letter spacing | 0px |   |

---

**Display 4**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (300) | The quick brown fox jumped over the lazy dog |
| Size | 56px |   |
| Line height | 67.2px |   |
| Letter spacing | 0px |   |

---

**Display 5**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (300) | The quick brown fox jumped over the lazy dog |
| Size | 48px |   |
| Line height | 57.6px |   |
| Letter spacing | 0px |   |

---

**Display 6**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (300) | The quick brown fox jumped over the lazy dog |
| Size | 40px |   |
| Line height | 48px |   |
| Letter spacing | 0px |   |

---

---

## Headings

Heading styles help to organize content into different levels of importance. They help users scan the page and understand how the content is organised.

These styles are more commonly used across Moodle, and may also play a role in how pages are interpreted by assistive technologies and search engines.

* Use them to define **sections**, **subsections**, and **logical content hierarchy.**
* Each level (Heading 1–6) is designed to scale down progressively in size.
* Avoid skipping heading levels.


**Heading 1**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (500) | The quick brown fox jumped over the lazy dog |
| Size | 37.5px |   |
| Line height | 45px |   |
| Letter spacing | 0px |   |

---

**Heading 2**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (500) | The quick brown fox jumped over the lazy dog |
| Size | 30px |   |
| Line height | 36px |   |
| Letter spacing | 0px |   |

---

**Heading 3**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (500) | The quick brown fox jumped over the lazy dog |
| Size | 26.3px |   |
| Line height | 31.5px |   |
| Letter spacing | 0px |   |

---

**Heading 4**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (500) | The quick brown fox jumped over the lazy dog |
| Size | 22.5px |   |
| Line height | 27px |   |
| Letter spacing | 0px |   |

---

**Heading 5**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (500) | The quick brown fox jumped over the lazy dog |
| Size | 20px |   |
| Line height | 24px |   |
| Letter spacing | 0px |   |

---

**Heading 6**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (500) | The quick brown fox jumped over the lazy dog |
| Size | 16px |   |
| Line height | 19.2px |   |
| Letter spacing | 0px |   |

---

---

## Paragraph styles

Paragraph styles are used for body content, supporting text, and other long-form content.

They are designed for readability and accessibility in UI contexts, with appropriate spacing and line height to ensure comfort during longer reading sessions.

### Base text

This is the default text style for body content. Use it for paragraphs, descriptions, instructions, and any general-purpose text.

It is the most widely used style across the system.

**Base text**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (400) | The quick brown fox jumped over the lazy dog |
| Size | 16px |   |
| Line height | 24px |   |
| Letter spacing | 0px |   |

---

### Small text

Use this style for secondary or supporting text, such as:

* Timestamps
* Metadata
* Labels or captions
* Optional field descriptions

Do not use it for long paragraphs or dense content, as this would make it inaccessible.

**Small**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (400) | The quick brown fox jumped over the lazy dog |
| Size | 14px |   |
| Line height | 17.4px |   |
| Letter spacing | 0px |   |

---

### Lead

This style is intended for short introductory paragraphs or highlighted text blocks, such as intros at the top of pages or sections.

While not commonly used in Moodle, it’s available for cases where slightly larger body text is needed to give visual emphasis.

Use it sparingly and only when it helps improve clarity or user focus.

**Lead**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (400) | The quick brown fox jumped over the lazy dog |
| Size | 20px |   |
| Line height | 40px |   |
| Letter spacing | 0px |   |

---

## UI text

UI text styles are used for interactive elements and short-form copy, such as buttons, labels, links, and input fields. They are designed for clarity and legibility within components, often using more compact spacing and line height to fit neatly within defined boundaries.

### UI default

This is the default text style for most UI components. Use it for buttons, labels, input fields, links, and other interactive elements. 

It is the most widely used text size for components across the system.

**UI default**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (400) | The quick brown fox jumped over the lazy dog |
| Size | 16px |   |
| Line height | 17.4px |   |
| Letter spacing | 0px |   |

---

### UI small

This is the small text style used for smaller components or for secondary UI content. 

This size is ideal when less prominence is needed or the default UI text is too large for the available space.

**UI small**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (400) | The quick brown fox jumped over the lazy dog |
| Size | 14px |   |
| Line height | 17.4px |   |
| Letter spacing | 0px |   |

---

### UI large

This is the large text style used for larger UI components. 

This size is ideal when the default UI text is too small for the available space or when the content needs more visual emphasis.

**UI large**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (400) | The quick brown fox jumped over the lazy dog |
| Size | 20px |   |
| Line height | 24px |   |
| Letter spacing | 0px |   |

---
---

# Overview
## Overview

Typography provides a consistent, readable hierarchy across products and components. Predefined styles reduce inconsistency and support accessibility by default.

### Core principles

* Use published text styles; avoid local overrides.
* Choose styles by **role**, not by “what looks right.”
* Don’t skip heading levels.
* Use system text colour roles (don’t hardcode).



---

## Usage

### Typeface

We use **[Roboto](https://fonts.google.com/specimen/Roboto)** as our primary typeface across the system.

While Moodle LMS will use the user's system font, we have chosen Roboto as the default font to use for Figma designs, as system fonts can't be embedded.



### Weights 

* 300 Light
* 400 Regular (base)
* 500 Medium
* 600 Semibold
* 700 Bold

### Style groups

* **Display** — high-impact moments (rare)
* **Headings (H1–H6)** — structure and hierarchy
* **Paragraph** — reading and supporting text
* **UI text** — labels and interactive elements



---

### Examples

* Use **Base text** for paragraphs, instructions, long-form content.
* Use **Small text** for metadata/helper text, not dense paragraphs.
* Use **UI text** for buttons, labels, inputs, links.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |  |   |   |
| Don't |  |   |   |
| Do |  |   |   |
| Don't |  |   |   |

---

### Accessibility considerations

Our typography and text color styles are designed to meet [WCAG ](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html)**[Level AA](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html)**[ accessibility standards](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) as a baseline.

This includes:

* Sufficient contrast between text and background for all text styles
* **Primary body text** uses a minimum size of **16px (1rem)** to support comfortable reading.
* **Small text (14px)** is permitted for **secondary or supporting content**, such as metadata, helper text, labels, or timestamps.
* Font weights and line heights that support legibility across devices
* Clear visual hierarchy through consistent use of text styles

All published styles in Figma have been reviewed with accessibility in mind. When used as intended, they require no further adjustments.

**What to keep in mind?**

* Avoid using non-standard backgrounds with text unless contrast is checked
* Never define custom text styles or colors without consulting the Design System team
* Use tools like **[Stark](https://www.figma.com/community/plugin/732603254453395948/stark-contrast-accessibility-checker)** or **[Figma’s contrast checker](https://www.figma.com/color-contrast-checker/)** to validate accessibility if needed
---

# Code

---
