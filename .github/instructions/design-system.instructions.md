---
applyTo: '**'
---

<!-- Auto-generated from ZeroHeight. Do not edit manually. -->
<!-- Source: https://design.moodle.com/ -->
<!-- Regenerate: npm run build-docs -->

# Moodle Design System — Agent Reference

<shortcut_tiles>
<shortcut_tile url="https://matrix.to/#/%23moodle.design:moodle.com">
![Moodle Design System chat](zeroheight://image/8079997/28e3e9e69c676f8a650fa08a1b4e3afa0571328ea448120ca14ed02fa29c4752)

**Moodle Design System chat**

Ideas, updates and support.
</shortcut_tile>

<shortcut_tile url="https://moodle.org/course/view.php?id=17258">
![Product Advisory Group Moodle Course](zeroheight://image/8079997/9f73b22bdf9ee774475c5632b4dcbace577cbd64163c4ecc82339324147c20b3)

**Product Advisory Group Moodle Course**

Resources and artefacts alongside forums.
</shortcut_tile>

<shortcut_tile url="https://docs.google.com/forms/d/e/1FAIpQLScPnuSUes33FxyivVgHpG36wGojH2Ow_gfe6rdtDWL5_be0zQ/viewform">
![Feedback](zeroheight://image/8079997/5ddc60e88b2ad38eac871bd0511ef8c025563b7d4758e0e92ab32a9e10dbcca8)

**Feedback**

Suggestions, improvement ideas, issues, or requests.
</shortcut_tile>
</shortcut_tiles>

---

### AI prototyping with the Moodle Design System

AI prototyping tools can turn a plain-language description into interactive UI in minutes. When those tools are grounded in the Moodle Design System, the output is more consistent and accessible. 

The difference between a generic AI prototype and one built with MDS context is significant. Without context, AI tools default to their own assumptions: wrong colours, hardcoded values, generic component patterns that don't match Moodle's Bootstrap-based architecture. When you give an AI tool the right context — MDS tokens, component conventions, and usage rules the output reflects decisions that have already been made, rather than inventing new ones.

The more context you give an AI tool, the better the output. MDS provides that context: tokens, component conventions, and usage rules.

---

### How to use the MDS in AI prototyping tools

AI prototyping tools are evolving rapidly, and the best ways to integrate MDS into each one are still being explored. We'll be adding detailed guidance for specific tools, including Lovable, Bolt, v0, and Cursor as we test and validate what works.

#### Using the Moodle Design System in Claude Design 

1. Navigate to Design Systems 
2. Choose ‘Create new Design System’

![](zeroheight://image/8478304/56641cd96ea603a19cc306a29b019065a555dcba30540713c75c5715828904f5)

3. Give the system a name ‘Moodle Design System’
4. Link the Moodle Design system [GitHub repo link](https://github.com/moodlehq/design-system) and connect your GitHub

![](zeroheight://image/8478304/fab3069a3d42e06155ffda15f6283762e3c15e6a0cf269a3626ec3557bce1849)

6. Click continue to generation and let Claude do it’s thing
7. Once you’re done, you’ll need to verify what it’s built and you will get something like this 

[https://drive.google.com/file/d/1OH6w5aMKJbcIJqG9fkKipMnJfC8ad2qw/preview](https://drive.google.com/file/d/1OH6w5aMKJbcIJqG9fkKipMnJfC8ad2qw/preview)

---

---

# Using tokens
### What are design tokens?

Design tokens are reusable design values that help keep things consistent across Moodle. They represent things like colours, spacing, fonts and more. Instead of hardcoding values in every component, we use tokens to define them once and then share them across the design and code.

Let's say a brand has a **Primary Pink** colour. Designers and developers should refer to this colour by the same name and identity, regardless of platform (design, web, mobile etc). If the colour changes in design, it should also change on all development platforms automatically (and vice versa).

**Design tokens** enable this behavior by creating an **abstract identity** and centralising the source of truth for this colour. Because they help to establish a source of truth, they are often found in design systems. They can be used for colours, text styles, spacings, animation values etc.

![](zeroheight://image/8079522/2f8e88306c983d6a8c4cfb36c52f9f22b68f5f27ef52024cdfc1d8ca8602429c)

---

### Apply colour tokens

Colour tokens show up as square swatches in the library. Use these to apply Moodle’s interface colours instead of typing in hex codes.

![](zeroheight://image/8079522/0aad1f4dfe1fdb49ecefe60912ef4ffa53d042e5d88752d3891398890f7faf52)

#### To apply a colour token to a shape or layer:

1. Select the layer
2. In the design panel under Fill or Strokes, 
    * click the ‘Apply styles and variables’ icon or
    * click the swatch and go the Libraries tab
3. Choose a colour token like bg/interactive/primary or border/interactive/hover


![](zeroheight://image/8079522/839666f979822b251a5528b238bf76f17fc72e711c19ac03dc401ce8ad536bf8)

---

### Applying spacing tokens

Using spacing tokens for things like frame padding, and gaps in auto layout. Tokens help your layout stay tuned to Moodle’s spacing scale.

#### To apply a spacing token:

1. Select a frame or component
2. In the design panel under Auto layout, go to a field like padding or gap
3. Click ‘Apply variable’ icon
4. Choose a spacing token like spacing/md or spacing/lg


![](zeroheight://image/8079522/88c7bfafd2062efedc867be9492f1921b4228965becf8f9389cb917205fa80c2)

---

### Applying border tokens

Border tokens are used to control both the roundness of corners and thickness of strokes. 

#### To apply a radius token:

1. Select the shape or component
2. In the design panel under Appearance, click the 'Apply variable' icon
3. Choose a radius token like border radius/md or border radius/pill


![](zeroheight://image/8079522/c1625ff09d4b953fd43a82a8aa9a4b640b61824b09bb675012a1e12b97970738)

#### To apply a stroke weight:

1. Select a shape that has a stroke applied
2. In the design panel under Stroke, go to the weight field 
3. Click the 'Apply variable' icon
4. Choose a weight token like stroke weight/sm or stroke weight/xxl


![](zeroheight://image/8079522/1263097020f416b6b18c8e4f33252492177da2a72694b24876bd03fd35294df3)

---

### Apply typography styles

Moodle fonts, weights, sizes, line height, and letter spacing are handled using text styles.

#### To apply a text style:

1. Select your text layer
2. In the design panel under Typography, click the ‘Apply styles’ icon
3. Choose a Moodle text style like Headings/Heading 1 or Paragraph/Small


![](zeroheight://image/8079522/01a5bd6a473d625bea1acd5213819e8daa453ca21d56e15f394352a4c43ad673)

---

### Apply Shadows using effect styles

Shadows are available as effect styles. These styles apply consistent elevations using standard colours and blur values.

#### To apply a shadow style:

1. Select the layer
2. In the design panel under Effects, click the ‘Apply styles’ icon
3. Choose a Moodle shadow style like Shadow/Medium

![](zeroheight://image/8079522/7e767a6aca45a792279237b8f798d5e5e6659596a72396a2fad69f92ebd82cbb)

---

### How to video

[https://drive.google.com/file/d/1T8GVNB4pLfTNR79YG2ufRmNzeH4RW87R/preview?rm=minimal&rm=minimal](https://drive.google.com/file/d/1T8GVNB4pLfTNR79YG2ufRmNzeH4RW87R/preview?rm=minimal&rm=minimal)

<callout background="3" fullWidth="true">

###  ✅ Best practices

* Always use Moodle’s published styles
* Stick to what’s available in the libray. Reach out if something is missing
* Keep layouts tidy by using Auto layout and applying tokens to spacing
* Use styles for all typography and shadows

</callout>

<callout background="4" fullWidth="true">

### ❌ What not to do

* Don’t type in your own hex colours
* Don't enter custom spacing units
* Don’t detach or override tokens or styles

</callout>
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

![](zeroheight://image/8079522/2e42ba839a591e5e0c10fccc2576f143992fc7ad56b906c5c06604c8ad996cbd)
*Library available on our Figma Community page.*
---

# Libraries
<shortcut_tiles>
<shortcut_tile url="https://www.figma.com/community/file/1641694287171092671/moodle-design-system-components">
![Moodle Design System](zeroheight://image/8079522/4dce580bcff078da731b3c16d410b463dda31bc89cc9ca49edfb069faad905b6)

**Moodle Design System**

Access the Moodle Design System resources published on Figma Community.
</shortcut_tile>

<shortcut_tile url="https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/Moodle-Design-System?m=auto&amp;node-id=6011-198&amp;t=ffwygiMvvnLdpYmW-1">
![HQ Design System](zeroheight://image/8079522/cc20beb2814c96182f0efc1f227e0c768eb8e3f0647c04868ba836bf79c10c10)

**HQ Design System**

Access the Moodle Design System (Moodle HQ Staff only ⛔︎).
</shortcut_tile>
</shortcut_tiles>
---

# Help and support
<tabs>
<tab>

<tab-title>**FAQ**</tab-title>

### Frequently Asked Questions (Tokens)

#### What’s the difference between a design token and a style in Figma?

A style in Figma is saved visual rules like a colour or text size. A design token is the value behind that style. Tokens can be used in both design and code. A single token might control a style in Figma and also how a button looks in Moodle interface.

---

#### Can I use the design system library directly with Figma Make?

Yes, you can! Figma Make lets you copy design system components and styles into your own files while keeping the library connection. This works with our design system tokens and component library. 

---

#### Are tokens only for use in Figma?

No. Tokens are used across both design and code. That means the same tokens you apply in Figma are used by developers in Moodle’s front end code. This helps your designs match what users see.

---

#### Can developers use the same tokens I use in Figma?

Yes. One of the best things about tokens is that that they’re shared between design and development. Tokens like spacing.md or colors.interactive.primary.hover are used the same way in Figma and in Moodle’s front end code.

---

#### How are design tokens named?

We use a naming system that shows the purpose of the token in a clear and predictable way, for example:

* colors.interactive.primary.hover
* spacing.md
* border.radius.lg

The naming helps you understand what the token is for before using it.

---

#### How are tokens used inside design system components?

Design system components are built using tokens for things like spacing, typography and colour. This means you don’t have to manually apply tokens everywhere, the components already follow the system rules.

---

#### What happens if I override a token in my design?

If you override a token by entering a custom value, your design might not be consistent with Moodle’s system or code. It also won’t switch properly between themes. Stick to tokens as much as possible. If you need something that feels missing, you can request a new token through the [feedback form](https://docs.google.com/forms/d/e/1FAIpQLScPnuSUes33FxyivVgHpG36wGojH2Ow_gfe6rdtDWL5_be0zQ/viewform).

---

#### How do tokens help us switch between themes?

Tokens keep our design flexible. For example, instead of setting a colour value like #FFFFFF, we use a token like colors.bg.surface.default. This way, the token can point to a different colour in each theme (like light or dark mode) without changing the design or code.

---

#### Can I use design tokens to support accessibility?

Yes. Design tokens help support accessibility by keeping colour contrast, font sizes and spacing consistent. We test tokens to make sure they meet Moodle’s accessibility standards, like readable text over background and clear focus states.

---

#### Can I create my own tokens if I need something different?

Not directly, if you think we need a new token, talk to the design system team. You can also request a new one through the [feedback form](https://docs.google.com/forms/d/e/1FAIpQLScPnuSUes33FxyivVgHpG36wGojH2Ow_gfe6rdtDWL5_be0zQ/viewform).

---

#### What should I do if a token doesn’t seem to exist for what I need?

First, check the documentation or reach out to the design system team for help. Sometimes a similar token already exists. If not, we can decide whether to add a new one. You can request a new one through the [feedback form](https://docs.google.com/forms/d/e/1FAIpQLScPnuSUes33FxyivVgHpG36wGojH2Ow_gfe6rdtDWL5_be0zQ/viewform).

---

#### What if none of the existing tokens work for my use case?

Check if a similar token already exists. If nothing fits, reach out to the design system team. We can help figure out if a new token is needed or suggest a way to use the ones we already have. You can also request a new one through the [feedback form](https://docs.google.com/forms/d/e/1FAIpQLScPnuSUes33FxyivVgHpG36wGojH2Ow_gfe6rdtDWL5_be0zQ/viewform).

---

#### Who do I talk to if I have questions about tokens?

You can reach out to the design system team. We’re here to support you and make sure the design system works for your needs. 

---

#### Can token values change over time?

Yes. We might update tokens to improve consistency, support themes, or fix accessibility issues. The token name usually stays the same, but the value might change. That’s the benefit, you don’t need to update your design when a value changes.

---

#### How will I know when tokens have been added or changed?

We post updates in our Zeroheight documentation and in team channels like Matrix. You can also check the "[What's new"](https://moodle.zeroheight.com/styleguide/s/131542/p/02e9f1-introduction/b/09cc7e) page in Zeroheight to see what’s new.

</tab>
<tab>

<tab-title>**Support**</tab-title>

### Support Channels

#### Product Advisory Group Moodle Course

Resources and artefacts generated by the MDS team alongside forums.

These include a variety of documents, templates, and tools that have been created to support the team's objectives. Additionally, the forums provide a platform for discussion, collaboration, and knowledge sharing among team members and stakeholders.

---

#### Matrix group chat

This chat group is open to the community and it facilitates the sharing of ideas, updates and support. 

---

#### Feedback

We’d love your feedback. If you have suggestions, improvement ideas, issues, or requests for new components or tokens, please submit them through this form. Your input helps us improve the design system and keep it useful, consistent and aligned with real needs.

</tab>
</tabs>

---
---

---

# Using tokens
## Token Consumption

Figma design tokens enter the Moodle Design System package through Zeroheight, formatted against the Design Tokens Community Group (DTCG) standard. These tokens are then processed by bundled package scripts, which convert them into implementation-agnostic resources. This means they are transformed into formats such as CSS and SCSS variables, making them flexible and usable across different parts of the consumers' platform without being tied to a specific implementation whilst making them not the source of truth for tokens but the DTCG formatted JSON files in the package.

<callout background="4" fullWidth="true">

**❌ Avoid — Importing internal build paths**

`import '@moodlehq/design-system/dist/tokens.css'; // Not supported.`

Paths under dist/ are internal implementation details and may change without notice.

</callout>

### CSS Tokens (Recommended)

CSS tokens provide easily consumable variables that can be used in implementation agnostic environments.

#### Import

Import the CSS token bundle once at the application entry point which will expose all tokens as CSS custom properties (--mds-*) at runtime.

<callout background="3" fullWidth="true">

✅ **Best practice — Import once at the application entry point**

`import '@moodlehq/design-system/tokens/css';`

</callout>

<callout background="4" fullWidth="true">

**❌ Avoid — Import per component**

```css
// Avoid repeated imports in multiple files. 

import '@moodlehq/design-system/tokens/css';
```

</callout>

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

<callout background="3" fullWidth="true">

**✅ Best practice — Use a namespace**

`@use '@moodlehq/design-system/tokens/scss' as tokens;`

</callout>

<callout background="4" fullWidth="true">

❌ **Avoid — Import without namespace**

`@use '@moodlehq/design-system/tokens/scss' as *;`

</callout>

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

<callout background="4" fullWidth="true">

**❌ Avoid — Use primitive palette tokens**

`background-color: var(--mds-color-blue-500);`

</callout>

### Semantic Tokens

On the other hand, semantic tokens are designed to express intent clearly, e.g. `--mds-text-default, --mds-spacing-md.` They are created to remain stable and consistent even when there are changes or updates to the underlying primitive values that they reference.

<callout background="3" fullWidth="true">

**✅ Best practice — Use semantic tokens**

```css
.button {
  background-color: var(--mds-bg-interactive-primary-default);
}
```

</callout>

### Component Tokens

Whilst currently not included as part of the Moodle Design System, they are planned to be incorporated in the future when the design team begins the process of designing and developing the various components that make up the system.

### Token Integrity

Tokens are specifically intended to be used and interacted with by consuming platforms exactly as they are, without any alterations or modifications to their original values thus, acting as the single source of truth. This ensures consistency and reliability across different implementations.

<callout background="3" fullWidth="true">

**✅ Best practice — Consistently use semantic tokens according to their intended role and state**

```css
.card {   
  background: var(--mds-bg-interactive-primary-default);   
  border-color: var(--mds-border-interactive-primary-active);   
  padding: var(--mds-spacing-md); 
}
```

</callout>

<callout background="1" fullWidth="true">

**⚠️ Caution – Token value theming**

If you must override token values defined by the Moodle Design System, exercise caution. These token values correspond to those in designs provided for HQ developers or the published [community Figma file](https://www.figma.com/@moodle) for Moodle community members.

If you observe unexpected token values at runtime, token values may be overridden via SCSS injections through the Moodle interface.

</callout>

<callout background="4" fullWidth="true">

**❌ Avoid — Redefine tokens globally**

`:root { --mds-text-default: blue; }`

</callout>

<callout background="4" fullWidth="true">

**❌ Avoid — Hardcoded design values**

`color: #0f6cbf; margin: 12px;`

</callout>

<callout background="4" fullWidth="true">

**❌ Avoid— Re-wrapping tokens**

`:root { --text-primary: var(--mds-text-default); }`

</callout>

<callout background="4" fullWidth="true">

**❌ Avoid — Using tokens as business logic flags**

`if (color === 'var(--mds-text-danger)') {   // Logic. }`

</callout>
---

# Help and support
<tabs>
<tab>

<tab-title>**FAQ**</tab-title>

### Frequently Asked Questions (Tokens)

#### Can I use tokens without using components?

Yes.

Tokens are designed to be consumed independently of any component library.

You may build your own components using tokens as primitives.

---

#### Are tokens tree-shakable?

CSS tokens are loaded as a single bundle and are **not tree-shakable,** this is intentional to ensure:

Consistent theming:

> All tokens are available, ensuring a uniform look and feel.

Predictable overrides:

> Ensures that any overrides behave as expected.

Stable runtime behaviour:

> Avoids unexpected styling issues during application execution.

---

#### How do I theme or customise styles?

Use:

* token selection (choosing appropriate semantic tokens)
* CSS overrides that reference tokens
* component-level styling

Do not copy or redefine primitive values.

---

#### Will tokens change over time?

Yes, but changes follow **semantic versioning**.

Breaking changes may include:

* renamed tokens
* removed tokens
* changes in semantic meaning

Always review release notes before upgrading.

---

#### Are tokens safe for accessibility?

Yes.

Colour and contrast decisions are reviewed centrally. Using semantic tokens ensures accessibility requirements are met by default.

Custom overrides may invalidate these guarantees.

---

#### Does the Design System support different themes / display modes?

This does not refer to the Moodle definition of theme but to the common understanding of browser themes such as light, dark, or high contrast modes.

The Design System does not support these yet. We may reconsider once we release components, receive stakeholder interest, and have the capacity to add features.

---

#### Will the incoming tokens clash with my custom SCSS variables?

We prefix our tokens and variables with mds- to avoid clashing with existing variables, but we cannot guarantee they will not conflict with your custom work.

</tab>
<tab>

<tab-title>**Support**</tab-title>

### Support Channels

#### Product Advisory Group Moodle Course

Resources and artefacts generated by the MDS team alongside forums.

These include a variety of documents, templates, and tools that have been created to support the team's objectives. Additionally, the forums provide a platform for discussion, collaboration, and knowledge sharing among team members and stakeholders.

---

#### Matrix group chat

This chat group is open to the community and it facilitates the sharing of ideas, updates and support.

---

#### Feedback

We’d love your feedback. If you have suggestions, improvement ideas, issues, or requests for new components or tokens, please submit them through this form. Your input helps us improve the design system and keep it useful, consistent and aligned with real needs.

---

#### GitHub reporting

Design feedback should **not** be submitted via this channel.

Moodle HQ members should **not** generate new issues with the MDS Jira project.

This code repository contains the standard procedures and security issue reporting protocols, as well as the management of Pull Requests, all within the context of the MDS code package.

It is essential to follow these guidelines to ensure the integrity and security of the codebase while facilitating efficient collaboration among developers.

</tab>
</tabs>

---
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

<shortcut_tiles>
<shortcut_tile url="https://design.moodle.com/98292f05f/p/0808cf" page-id="8079522">
![For Designers](zeroheight://image/7242088/3ad394f8fda6f08fa44e61197672516b63dddb64778e9d0febf7edcc67b5527c)

**For Designers**

Quickstart for designers to get started with MDS
</shortcut_tile>

<shortcut_tile url="https://design.moodle.com/98292f05f/p/98e3cb-for-developers" page-id="8079523">
![For Developers](zeroheight://image/7242088/30ef004580e7f0eda4347fa1bdab4a59f2b32d9cabbffce0c6a3825de719eab8)

**For Developers**

Quickstart for developers to get started with MDS
</shortcut_tile>

<shortcut_tile url="https://design.moodle.com/98292f05f/p/917b11-ai-prototyping" page-id="8478304">
![AI Prototyping](zeroheight://image/7242088/93c4952177609a451e0a6af69cf5ae68f3ecb28945372cea6b24105594efd63d)

**AI Prototyping**

How to leverage the Moodle Design System in AI prototyping
</shortcut_tile>
</shortcut_tiles>

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

<shortcut_tiles>
<shortcut_tile url="https://design.moodle.com/98292f05f/p/641e8e" page-id="7682902">
![Foundation](zeroheight://image/7242088/d3eb5cbbb78a0d596d596e8954b224848466bd1524f101d484f553f9454fafba)

**Foundation**

Explore styles and tokens: colours, typography, layout, and more.
</shortcut_tile>

<shortcut_tile url="https://design.moodle.com/98292f05f/p/02ac7a" page-id="8079997">
![Contribute](zeroheight://image/7242088/2ea4c9c94152dd1428158f49a971d37553135a7993e3ae7d2213994365a52cf4)

**Contribute**

How to request changes, report issues, and collaborate with the DS team.
</shortcut_tile>
</shortcut_tiles>
---

---

# Usage
## Overview

![](zeroheight://image/8050559/3baf76bc9da0cfb2f168d257fa13f37b4e044d7395e357f02092226f76b23faa)

The activity icon component helps keep icon size, colour, and optional background tiles consistent across Moodle.

---

## When to use

* When you need to show an activity or resource type in a list, card, or activity chooser.
* When users need to scan a page and recognise activity and file types quickly.
* When you need a consistent icon size and optional tile across many different activity icons.
* When you need semantic colour categories such as Assessment or Communication.

<callout background="4" fullWidth="true">

### ❌ When not to use

* Do not use it as the only way to communicate meaning. Use text labels as well.
* Do not use the tile colour to show status such as complete, overdue, or locked. Use a status pattern instead.
* Do not use a specific file type icon when the file type is unknown. Use the generic File icon.

</callout>

---

## Variants

### Category

Category controls the semantic colour tokens applied to the icon glyph and optional background tile.

| **Variant** | **When to use** |
| :--- | :--- |
| ![](zeroheight://image/8050559/98bd5662d3de33acc3288a54d359870311975ca76913a2540d8e7aea0763bf08)  | **Assessment** Assessment activities such as graded work and evaluation.  Icon: `colors.activity icon.assessment.icon` Container: `colors.activity icon.assessment.bg` when a tile is present  |
| ![](zeroheight://image/8050559/3022830ffd707b356a55e1f6d5fac3b40382fca091fbf1b2fe58d12b8a41653d) | **Collaboration** Activities where learners work together.  Icon: `colors.activity icon.collaboration.icon` Container: `colors.activity icon.collaboration.bg` when a tile is present  |
| ![](zeroheight://image/8050559/84746012148d1c8c7c31d13525f2c1b55122e8b3d601cff3515804d3c12b6a5b) | **Communication** Discussion and messaging based activities.  Icon: `colors.activity icon.communication.icon` Container: `colors.activity icon.communication.bg` when a tile is present  |
| ![](zeroheight://image/8050559/b78fd62cb8bba1d30952368f352fad0563ec42a52b9facf6430113571a3da5d8) | **Interactive** Highly interactive activities.  Icon: `colors.activity icon.interactive.icon` Container: `colors.activity icon.interactive.bg` when a tile is present  |
| ![](zeroheight://image/8050559/d305cafe6f5e4bedfb9656f3d0c9742a6a1056cb36fc3b3840e739698f9d8d5c) | **Resource** Resources and files.  Icon: `colors.activity icon.resource.icon` Container: `colors.activity icon.resource.bg` when a tile is present  |
| ![](zeroheight://image/8050559/7a6a43a3ec4c2a23c749064becc7b89c212d2802d17f1b4c6732a11193bded87) | **Other** Neutral or uncategorised types.  Icon: `colors.activity icon.other.icon` Container: `colors.activity icon.other.bg` when a tile is present  |

### Size

Size controls the icon glyph size. The glyph size stays the same for Auto, Default, and Large.

| **Variant** | **When to use** |
| :--- | :--- |
| ![](zeroheight://image/8050559/fa76c4d5778feca81e5cd104be19badac298b03d5da30dea77a7776566c7c281) | ****SM**** Dense UI such as tables or compact lists.  |
| ![](zeroheight://image/8050559/6bfa83573a751db9b1bc71edc0dc840d768b3ff212ca7ec19179488ee99928d8) | **MD** Default for most lists and rows.  |
| ![](zeroheight://image/8050559/daf7e1224f507e8bd7939dd9c9474f9fca3485d46c2831139b33ebe7117977c1) | **LG** Cards and layouts where the icon needs more emphasis.  |
| ![](zeroheight://image/8050559/fae71b20bf655fc070033f1e846c5ac116d3aae9be47a88125a810a8a7543ed8) | **XL** Activity chooser and prominent tiles where the icon is a key element.  |

### Container

Container controls whether there is a tile background, and how large that tile is.

| **Variant** | **When to use** |
| :--- | :--- |
| ![](zeroheight://image/8050559/cd9be945134460b9ca959449c06cce5c68ddea4cba2d20cf5471c4c121235529) | **None** Icon only. Use when the icon is supporting content and you want a low noise layout.  Padding: `spacing.none` Border radius: `borders.border radius. none`  |
| ![](zeroheight://image/8050559/3ca0dfb99818d69008b613d2da39d7e605dd662b9473e320d968cea16f3dd338) | **Default** Tile background. Use when you need a consistent tile without strong emphasis.  Padding: `spacing.xs` Border radius: `borders.border radius. xl` SM uses `borders.border radius.lg`  |
| ![](zeroheight://image/8050559/1e885bb0fe1c2d120500bcbc1c9331ec31aed47f15912dcbdf1d13edd454a4e5) | **Large** Larger tile background. Use when the icon is a key visual element such as in the activity chooser tile.  Padding: `spacing.sm` Border radius: `borders.border radius. xl` |

### Icon

Icon selects the symbol that represents the activity, resource, or file type.

| **Variant** | **When to use** |
| :--- | :--- |
| ![](zeroheight://image/8050559/a5f86bb725607943e6a72ccbecc1bbdeda22fe1894f1003a80c5b1957f0e9058)   | **Activity module icon** Use for Moodle activities such as Assignment, Forum, Quiz. |
| ![](zeroheight://image/8050559/1ce93bfdd9ec494a4a954630070da83d654332f24a434459e8a8308707976007)   | **File type icon** Use for files when the file type is known such as PDF, PPT, DOC, XLS. |
| ![](zeroheight://image/8050559/7130797035467ccfec162e255f4faa23cc40a9a20473de918bd9da7c66cf9e04) | **Generic File icon** Use when the file type is unknown. |

---

## Guidelines

### Content design

#### Content structure and constraints

* Always pair the icon with a visible text label for the item name.
* Do not rely on icon shape or colour alone to explain meaning.
* Use the correct icon for the activity or file type. Do not swap icons to create new meaning.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8050559/f785d06de69a68c418babafc5911799756034a3f0eba38b86a66f644da5da1d9) |   | Icon with meaningful label |
| Don't | ![](zeroheight://image/8050559/2d6936446f583d443a76f7cb6cf840a2ee7d95da5528aa50d41a86a682368bdb) |   | Icon relying on shape and colour alone |

#### Content behaviour

* If the item type changes, update **Icon** and **Category** together.
* When using `Container: None`, the category colour is not visible on screen. Still set Category to match the activity type, because it controls the colour token applied to the icon glyph.
* If file type is unknown, use the generic File icon.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8050559/bfd8330403f8846a36c8b477656af5f90bf027d3908d54f5f465ce1bc2d13cf8) |   | Container matches icon category colour |
| Don't | ![](zeroheight://image/8050559/f49f4f3dc0a59000fef1a7a0cf029c08c52f6ba732d8e0729e472dd004c8587d) |   | Wrong container for the activity type |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![Icon and Category match even without a container](zeroheight://image/8050559/086e97ed5e552a968883ba40b0c86e06d1e3c7446775928219ca9e9acb4b310d) | Icon and Category match even without a container | When Container is None, Icon is Assignment and Category is Assessment |
| Don't | ![Category left as the wrong type when no container is visible](zeroheight://image/8050559/99951876a2ee4a512471dd4639f724af8fd8f6eb8984bff44fd2299fce97265a) | Category left as the wrong type when no container is visible | When Container is None, Icon is Assignment but Category is left as Collaboration |

---

### Layout and spacing

* In lists, align the icon and label to the same baseline or vertical centre based on the list item design.
* Keep spacing between the icon and the label consistent within the parent component, for example list item or card.
* Do not mix Default and Large tiles in the same repeated list or grid unless there is a clear hierarchy.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8050559/52ed8189307d4c07179b8fe5fd36813c8ac2ca5189e4e025bde9f253b671911a) |   | Consistent container size on the list |
| Don't | ![](zeroheight://image/8050559/63bea1ecf3a0172279c9c124a6549cd0ccca8989acde6ccbace249b446311b48) |   | Inconsistent container size on the list |

---

### Breakpoints and responsive behaviour

* The component itself does not change at breakpoints.
* Choose the Size variant based on space and density.
* On smaller screens, prefer SM or MD in lists.
* In the activity chooser layout, use LG or XL when space allows.

---

### Interaction behaviour *(if applicable)*

* If the icon appears inside a clickable element, the parent element owns hover, pressed, and focus styling.
* Touch target requirements must be met by the parent interactive element, not by the icon tile alone.
* Cursor behaviour comes from the parent interactive element.

---

### Accessibility guidelines

#### Colour and contrast

* Use the semantic tokens for icon and background. Do not apply raw palette colours directly.
* Make sure icon only versions have enough contrast against the surface behind them.
* If colour communicates category, provide another cue such as a label or grouping, because colour alone is not enough.

#### Focus

* Focus indicators should appear on the parent interactive element.
* Do not place focus on the icon alone unless it is the control.

#### Labelling

The icon is not a label by itself. Make sure the parent component provides an accessible name, usually the activity or resource name. If the icon is decorative, hide it from assistive technologies in code.
---

# Design
## Anatomy

![](zeroheight://image/8050559/68a9043f22888b78ca803ceb9c56b72a5786c33884b83d20190a3f3c5bff1904)

1. **Icon glyph:** The activity, resource, or file type symbol.
2. **Container tile (optional):** A coloured background tile used in Default and Large containers. 
3. **Category colour:** The semantic colour system applied to the icon glyph and optional background.

---

## States

Activity icon is usually static. When it appears inside a clickable component such as a list item, link, button, or card, it follows the states of that parent component. Do not create separate hover or focus states for the icon alone unless the icon is the interactive control.

---

## Structure

### Size rules

Size controls only the icon glyph size. The glyph size does not change between Container variants. Only the tile size and padding change.

### Container sizing

1. **None** is icon only with no background tile
2. **Default** is icon in a smaller coloured tile
3. **Large** is icon in a larger coloured tile

![](zeroheight://image/8050559/3a9dc3a771787f381f4fcf3fe0710f5e9d5adc1dc0372bcf6b3116c8d6303be2)
---

# Code
## Storybook

[Storybook](https://moodlehq.github.io/design-system/?path=/story/components-activityicon--variant-default)

---

## Accessibility implementation

### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| Tab | No action (component is not focusable by default) |
| Enter | No action (non-interactive element) |
| Space	 | No action (non-interactive element) |

### ARIA

* Role:
    * Default usage (alt is empty): decorative image, effectively ignored by assistive tech
    * Informative usage (alt provided): img (implicit role from the img element)
* Required attributes:
    * For informative usage: meaningful alt text
    * For decorative usage: alt should be an empty string
* Optional attributes:
    * aria-hidden can be used on the wrapper when the icon is strictly decorative in a larger labeled control
    * aria-label on the wrapper only if you intentionally need to label the wrapper itself (generally not needed when alt is set correctly)

### Dynamic announcements

None. If the icon changes communicate status updates, the parent context should handle announcements via an aria-live region, not the icon itself

---

## GitHub

<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/tree/main/components/activity-icon">
**ActivityIcon component**
</shortcut_tile>
</shortcut_tiles>
---

---

# Code
## Storybook

---

## Accessibility implementation

### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `[Key]` | [Action] |
| `[Key]` | [Action] |
| `[Key]` | [Action] |

### ARIA

* Role: 
* Required attributes: 
* Optional attributes: 

### Dynamic announcements *(if applicable)*

`[aria-live, state changes]`

---

## GitHub
---

# Design
## Anatomy

![](zeroheight://image/8449677/3131977d3aa64de585ad97e1cd1eb3d4e6cc45318291d4f8f0afdfa312d5860d)

1. **Progress**: The full length background. It represents the total work to be done.
2. **Progress bar**: The coloured bar inside the progress. It grows from left to right to show how far along the task is.
3. **Label** (optional): The text that explains the progress. This could be a status e.g. in progress, completed, or error, and a count like 5 of 10 or 100%.

---

## States

These are visual states, not interaction states. The progress bar is for display only. It does not have hover, pressed, disabled, or focus states.

### Status

| **States** | **Styles and tokens** |
| :--- | --- |
| ![](zeroheight://image/8449677/7c455681d7f6254634989f30dc8ee3799395e2c18680fcd0731f9a17be2d8e63)  | **Empty** Use when progress is 0. Only the progress is visible.  Progress: `bg.feedback.secondary.default` Border: `border-radius.pill` Label: `text.subtle`   |
| ![](zeroheight://image/8449677/75a936c2904c321858cdbe05c9703b1b57bd67d7d08cd34a2aefd659720c1b74)  | **In progress** Use when progress is more than 0 and less than the total. The progress bar is only partly filled.  Progress: `bg.feedback.primary.subtle` Progress bar: `bg.feedback.primary.default`  Border:`border-radius.pill` Label: `text.subtle`  |
| ![](zeroheight://image/8449677/7093b14c3193b219f4ecd8b54f9bf4203be63fe5c505d9d2c79e884dbc4a7217)  | **Loading** Use when progress is updating. It shows an animated striped progress bar and it only applies when the status is in progress.  Progress: `bg.feedback.primary.subtle` Progress bar: `bg.feedback.primary.default` Loading: `bg.surface.default`  Border: `border-radius.pill` Label: `text.subtle`  |
| ![](zeroheight://image/8449677/0da3891382969cac1ffa2dcd200adacce9f1492230f51831a759b80e528e38cc) | **Completed** Use when the task is finished. The progress bar is 100 percent full and uses success styling.  Progress: `bg.feedback.success.subtle` Progress bar: `bg.feedback.success.default`  Border: `border-radius.pill` Label: `text.subtle`  |
| ![](zeroheight://image/8449677/a1d08b14e2ffd35079f9417ecdd0b4c596e636fc3e4d55b201251b6bf65c6e89)  | **Error** Use when progress cannot continue because of a problem. The progress bar uses danger styling to show that something went wrong.   Progress: `bg.feedback.danger.subtle` Progress bar: `bg.feedback.danger.default`  Border: `border-radius.pill` Label: `text.subtle` |
---

# Usage
## Overview

![](zeroheight://image/8449677/67ebc87dbff676f216cc7cc70b9bc51a99a64556483936965c3778d06752c110)

The progress bar shows how progress changes over time. It can track a user task, a system process, or anything else that is moving towards completion. It helps users understand what is done and what is left. 

The filled part shows the completed work. The empty part shows the remaining work.

---

## When to use

* Use when users need confidence that a long task is moving forward.
* Use when progress can be measured and has a known total.
* Use to indicate progress towards completion.

<callout background="4" fullWidth="true">

### ❌ When not to use

* Do not use when the total is unknown or progress cannot be measured.
* Do not use when you cannot estimate progress, even roughly.
* Do not use for a simple done or not done status.

</callout>

---

## Variants

### Label

The label property controls which text is shown and where it appears. It can be combined with any status value. Title is the label text that describes what the progress is for.

| **Variant** | **When to use** |
| :--- | :--- |
| ![](zeroheight://image/8449677/c25ba68c602af26df010d9be492fd78c288841a28d987dcb66cd65c4f41eb209) | **Title and count** Use when you need the title and count as separate items for quick scanning.  |
| ![](zeroheight://image/8449677/8200ffb64965644b24c87ef60bdcbf7d9f1da8ad1dc3da78a7b3a3a57961f478) | **Title** Use when you need one flexible label line that can show a title, a count, or both.   |
| ![](zeroheight://image/8449677/ee02c5c322f50806fb680cafc68252a1abdf4890d2f037203b8c7ac989056acc) | **Inline** Use when vertical space is tight and you only need a compact count.  |
| ![](zeroheight://image/8449677/1cca30141578a1786ee764d8882be66699905e2c2bcf2969d02df132adf714ce) | **None** Use only when nearby content already explains what is being measured. |

---

## Guidelines

### Content design

#### **Content structure and constraints**

* Keep label text short. One or two words is enough, like in progress, completed, or error.
* Use the count when the total is meaningful.
* If you do not use a label, make sure the surrounding UI explains what the progress bar means.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8449677/5e4a1fa8b84f74150fe170894b449ba7d5d2f56f9747a079e44e7cd7b2484195) |   | Short label stays on one line and is easy to scan. |
| Don't | ![](zeroheight://image/8449677/bf4e6e4019a73e34b0713bb680b1d7a2cec3723d33e52eec395b011afdde2fea) |   | Long label wraps and makes it harder to scan. |

#### **Content behaviour**

* The count and progress bar are two views of the same progress value. They must always match and be updated together.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8449677/d19887142f52f0a9f3cdcaf707a492154e63bbda177a7a1a95adc66b38c13963) |   | Progress bar matches the count. |
| Don't | ![](zeroheight://image/8449677/ab833240630df1365d055a521f28f02e99a38ed662ded40482054a78322afc8c) |   | Progress bar does not match the count. |

#### Copywriting

* Use sentence case.
* Keep label short and simple, one or two words.
* Keep count short and simple, like 5 of 10 or 50%.
* Do not write a full sentence inside the component.

---

### Layout and spacing

* Use an inline label only when the count fits. Otherwise, use a label above the progress bar.
* Avoid using progress bars in very narrow spaces.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8449677/110eb5276a4ced38fdb6ca471abecfbc51e40d73c03b283d05118faa4c10d498) |   | Use the title and count above the progress bar when horizontal space is tight, so the bar stays long enough to show progress clearly. |
| Don't | ![](zeroheight://image/8449677/90ae0ac8844e8fb77605575e3ff5b6640e56b5b8750ee4bd7a8b6ae933ce7564) |   | Use the count inline when horizontal space is tight, because it can make the bar too short to show progress clearly. |

---

### Breakpoints and responsive behaviour

* The progress bar scales with its container width.
* At small widths, switch from inline to a label above the progress when the count no longer fits.

---

### Interaction behaviour

* The progress bar is not interactive.
* Do not make it clickable.
* Do not allow keyboard focus on the bar itself.

---

### Accessibility guidelines

#### **Colour and contrast**

* Do not rely on colour alone to show status. Use a label or a count.
* Do not rely on colour alone to show completion. Use a label or a count.
* Do not rely on colour alone to show an error. Use a label or nearby content to explain what went wrong.
* Make sure the progress bar and labels meet contrast requirements on the surface they sit on.
* Show status in text, for example In progress or Error, not only colour.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8449677/29e621e2364a3821a639a84130c81774907618fad4e3fb0d2b93f5b7e2df0751) |   | Show a count like 10 of 10 or 100% so completion is clear, not just the progress bar colour. |
| Don't | ![](zeroheight://image/8449677/165a752ccb8381b2263e19992f56f12cd5e8dd6b8e0380a89a3c166e63ed7c6b) |   | Show a progress bar with no label. If colour is the only cue, users may not understand what it means. |

#### **Focus**

* No focus styling is needed because the component is not focusable.

#### **Labelling**

* When there is no label, provide an accessible name that explains what is being tracked.
---

---

# Usage
## Overview

![](zeroheight://image/8046350/006d88f1969e1ab081056aa1621bc513cd4f2ac807730267b1dbf615f7f73fba)

Use badges to highlight short, scannable information like status, metadata, or counts. Keep them short and easy to read.

---

## When to use

Use a badge to show short status that helps users understand an item at a glance, for example:

* Access and restrictions: Locked, Restricted, Read only
* Time and urgency: Overdue, Due soon, Upcoming
* Availability and visibility: Not available, Hidden, Visible
* Workflow and approval: Awaiting approval, In review, Approved
* Progress and completion: Not started, In progress, Completed
* Counts and indicators: New, 3 updates, 12 unread

<callout background="4" fullWidth="true">

### **❌ When not to use**

* Do not use a badge to display important messages. Use Alert.
* Do not use a badge for actions. Use Button or Chip.
* Do not use a badge for long text. If the label wraps, it is usually the wrong component.

</callout>

---

## Variants

Badges combine four independent choices: 

* **Type** for meaning
* **Contrast** for visual weight
* **Style** for shape
* **Icon** optional

### Type

| **Variant** | **When to use** |
| :--- | --- |
| ![](zeroheight://image/8046350/0c203175e8acdbd01580bd7d5154bcc8375d659d1f8eef9789dd5a88cf237311)  | ****Primary**** Use for the default or most prominent label in a set.  |
| ![](zeroheight://image/8046350/cc408b9bb9f1c78b9cde401e64bc308c679e91c6a1b983353ea6c8024d2dc258)  | ****Secondary**** Use for a supporting, neutral, or less prominent label.  |
| ![](zeroheight://image/8046350/9f159821c4a025e7535d33464daa7f9962a681016d840ea7aaa58f896d0e23a8)  | ****Success**** Use for a positive outcome, completion, or confirmed good state.  |
| ![](zeroheight://image/8046350/01adc04167dba479ebf96abcaea9bb491e71f66ec0e07bed0647cd9fdbc19f0c)  | **Danger** Use for risk, failure, destructive state, or negative status.  |
| ![](zeroheight://image/8046350/c34399e4f20f0dbe6457fce12c4c782ef80e2bfbc64a496c3a6676ec62efb92f)  | **Warning** Use for caution, potential issue, or something that needs attention.  |
| ![](zeroheight://image/8046350/af22c1d49215d0bbcaf263ab9d08113911938cad5bd20d2cc7181a01fbee8b2c) | **Info** Use for helpful context, extra detail, or a non urgent note. |

### Contrast

| **Variant** | **When to use** |
| :--- | --- |
| ![](zeroheight://image/8046350/ffc171c948157bf9bb7bea5c09898070a19954bf9ba7f19656c5ec0193dea155)  | ****Default**** Use when the badges must stand out.  Label: `colors.text.inverse` Exceptions due to low contrast:. Container: `colors.bg.feedback.{type}.default`  |
| ![](zeroheight://image/8046350/1366dfa04c9ea034a0aee8acddc7a463c16fe9113fd5015fa002d090138ce10e) | ****Subtle**** Use for quieter labels, and for dense layouts like lists and tables.  Label: `colors.text.feedback.{type}` Container: `colors.bg.feedback.{type}.subtle` Border: `colors.border.feedback.{type}` |

### Style

| **Variant** | **When to use** |
| :--- | --- |
| ![](zeroheight://image/8046350/22dcc3c7de09942a373323abf82644f14899956c8a624d7ad0dbd08c9ad7bf95)  | ****Default**** Use for a neutral badge shape.   Border radius: `borders.border radius.sm`  |
| ![](zeroheight://image/8046350/a14263bd0ecaa84b5330b2a086582eb644b304562e3da4b04e4a1b81e53b6ead) | ****Pill**** Use for a softer, more prominent badge shape.  Border radius: `borders.border radius.pill` |

### Icon

| **Variant** | **When to use** |
| :--- | --- |
| ![](zeroheight://image/8046350/2e8a9e69de824c12d963e2282eea04fe4bdfda401bb252f225b272eac0b3a5b8)  | ****None**** Default. Use when the label alone is clear.  |
| ![](zeroheight://image/8046350/ac7b4e3ba64a9b85ee705e3d5c2f333c2b7746c651dee053b3be0303a01c6ed2)  | ****Prefix**** Use when the icon adds meaning and supports the label.   |
| ![](zeroheight://image/8046350/681bda1c3cd3832d716d0c2f237d0ae0e059beacb107b8ae9b1b6b25f822a9e5) | ****Suffix**** Use only when there is a clear pattern in the product and it adds meaning |

#### Icon rules

* Use only one icon per badge.
* Icon colour must match the label colour.
* Do not use an icon as the only carrier of meaning.

### Size

Badges should match the text size they sit next to.

![](zeroheight://image/8046350/4347dd4d91a87c45f02578410b3c0148da004a523ff0079e61cf5d063a3a997f)

* Badge size follows the text style next to it.
* Match the badge label text style to the adjacent text style.
* If you use an icon, use the matching icon size.
* Keep the icon no larger than the label font size so the badge height stays the same as a badge without an icon.

---

## Guidelines

### Content design

#### Content structure and constraints

* Always use a label.
* Keep labels short. Aim for 1 to 2 words.
* The label must not wrap.
* Use the correct type for the meaning.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8046350/4546ab3f544d59cdbd8c75812c6d78af4a1cc8842ad3bd803af3f34ea7f33a69) |   | Short labels that are easy to scan. |
| Don't | ![](zeroheight://image/8046350/c0fdfe90ac02910b7135b4cde486d4973ce5d7ae77d12f23b1dd0f0078c0fe20) |   | Long labels that explain the whole situation. |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8046350/df060432c536c652b7618e0b7f083bf134dbe4314bbf92aaa06a645c33f6cf0b) |   | Type that matches the intended meaning. |
| Don't | ![](zeroheight://image/8046350/0cb8dbdeb12dbdd6f9bb00ca9d336cf44d1e2140c8a9a18837e892377d9619fb) |   | Wrong type for the intended meaning. |

#### Copywriting

* Use sentence case.
* Use explicit words like New, Overdue, Complete, Locked, Hidden.
* Do not use punctuation.

---

### Layout and spacing

* Keep consistent spacing between badges when grouped.
* Keep the icon size no larger than the label font size to keep height consistent with badges without an icon.
* Do not change the natural badge height or internal padding.
* Do not force a badge to fill the width of a container.
* Avoid using many badges together. It can add visual noise and affect content scanning.
* In tables and lists, prefer subtle contrast to reduce visual noise.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8046350/5914a055a1d59543ac462426e48cbbfb818f041333cb294f67a25b226124285e) |   | Match the icon size to the label text so both badges stay the same height. |
| Don't | ![](zeroheight://image/8046350/023f416ecef1e068df60ba5f4e5c0d2b7004f39716d6896d4d618560d8503fe0) |   | Use a larger icon. It makes the icon badge taller than the badge without an icon. |

---

### Responsive behaviour

* Badges keep the same size at all breakpoints.
* If space is tight, shorten the label instead of wrapping.
* If a badge must wrap, it is usually the wrong component.

---

### Accessibility guidelines

#### Colour and contrast

* Ensure text contrast is readable in both Default and Subtle.
* For subtle badges, ensure the border helps separate the badge from the background.
* Never rely on colour alone. The label must carry the meaning.

#### Labelling

* The visible label is the accessible name.
* Always include a label even when an icon is used.
---

# Code
## Storybook

[Storybook](https://moodlehq.github.io/design-system/?path=/story/components-badge--primary)

---

## Accessibility implementation

### ARIA

* Role: Presentation

---

## GitHub

<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/tree/main/components/badge">
**GitHub: Badge**
</shortcut_tile>
</shortcut_tiles>
---

# Design
## Anatomy

![](zeroheight://image/8046350/aa7a8b110dea4fe291d6aa0ba860c3fd6354405ac998d52eca1fa0ef645fd4cb)

1. **Label:** Required text that communicates the status.
2. **Container:** Background shape that sets the badge size and visual weight.
3. **Border** (Subtle contrast only)**:** Thin stroke to keep the badge clear on dark or busy backgrounds.
4. **Icon** (Optional): Place before or after the label only when it adds meaning, not decoration.

---

## States

Badges are not interactive, so they have no hover or pressed states.

Instead of using a badge for a link or a button, use the Link or Button component. 

Do not add custom interactions to badges.
---

---

# Code
## Storybook

---

## Accessibility implementation

### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus to the next interactive page item |
| `Shift + Tab` | Moves focus to the previous interactive page item |
| `Enter` | Activates the focused page item |
| `Space` | Activates the focused page item (anchor fallback) |

### ARIA

| **Attribute** | **Element** | **Value** | **Notes** |
| --- | --- | --- | --- |
| `aria-label` | `<nav>` | `"Pagination"` | Identifies the nav landmark |
| `aria-current` | `<a>` (active item) | `"page"` | Applied to the current page item only |
| `aria-disabled` | `<li>` (disabled item) | `"true"` | Applied to disabled prev/next <li> |
| `aria-hidden` | `<svg>` (icon) | `"true"` | Hides decorative icons from screen readers |
| `tabindex` | `<a>` (disabled item) | `"-1"` | Removes disabled items from tab order |

### Dynamic announcements *(if applicable)*

`[aria-live, state changes]`

---

## GitHub
---

# Design
## Anatomy

![](zeroheight://image/8505350/8f6b30dc214faf5cc7750d828c23590ca000b78076c1f1cdbc13edfe7aa3bf7f)

1. **Previous button** — a directional control that moves the user to the preceding page. Always present. Shown in the disabled state when the user is on the first page.
2. **Page link item** — a numbered item the user can click to navigate directly to that page.
3. **Current page item** — the numbered item that represents the page the user is currently on. Always exactly one current page item in the bar.
4. **Ellipsis item** — a non-interactive item that indicates truncated pages. Appears when the total number of pages exceeds the visible range.
5. **Next button** — a directional control that moves the user to the following page. Always present. Shown in the disabled state when the user is on the last page.

![](zeroheight://image/8505350/688d87aefe143d2bd5ebcccd784558b5e492f6458bd7ee8871dd9d33bd8b189a)

6. **Grouped previous / next buttons** — a style variant of the previous and next buttons used in minimal paging contexts where no page numbers are shown. 

---

## States

### Page link item

| **State** | **Styles and tokens** |
| --- | --- |
|  ![](zeroheight://image/8505350/50a5ca1f96d6cd0a9ae8e38ecdb0a7afadfebf661fdfa38f30888e94ef38d854)  |  **Default**   The item is available and can be navigated to. This is the base state for all page items that aren't the current page.   Label: .  |
|  ![](zeroheight://image/8505350/5bc6892252d885324168da58a4412052dd29977d48da41f0bc3733901c578158)  |  **Hover**   The cursor is over the item.   Page item: . Label: .  |
|  ![](zeroheight://image/8505350/faeb7bdf6551d6a91d6cd1d5194c9fbfb1cffd484e8c8d68ba3bcc9cccd83a81)  |  **Focus**   The item has received keyboard focus. A visible focus ring appears around the item.   Page item: . Label: .  |
|  ![](zeroheight://image/8505350/1c10a2e495c1f7909c818213256ff6fe08384098a1ca13d167c4e90230121c41)  |  **Pressed**   The item is being actively clicked or tapped.   Page item: . Label: .  |
|  ![](zeroheight://image/8505350/5ee0c190f7c3f789cd0d25521cfbe22696d828af7b783e405946f9479b2b6301)  |  **Disabled**   The item can't be interacted with and is removed from the tab order. Only applied to ellipsis or truncation items. Page link items don't use the disabled state — if a page isn't available, remove it from the bar entirely.  Label: .  |

### Current page item

| **State** | **Styles and tokens** |
| --- | --- |
|  ![](zeroheight://image/8505350/4c3a3b977254bf6bf45adcdf4a2dc5d2bd033f62382b3ed546285d8393882728)  |  **Default**   Identifies the page the user is currently viewing. There's always exactly one current page item in the bar.   Page item:. Label: .  |
|  ![](zeroheight://image/8505350/23b0b878a98dba4a3abca16cf5cce68f681892fd970ae4eb632c51b50ac7c0c4)  |  **Hover**   The cursor is over the current page item. The item remains visually distinct as the current page.   Page item: . Label: .  |
|  ![](zeroheight://image/8505350/3583e46188a79ffa97ca4299a04ba2745b2f57d5b26402ed3500ccd006a7df61)  |  **Focus**   The current page item has received keyboard focus. The focus ring appears on top of the active background.   Page item: . Label: .  |
|  ![](zeroheight://image/8505350/422b15de39b4950e1d0985b66d68fd861f89d389dab97839583fde372c64915a)  |  **Pressed**   The current page item is being actively clicked or tapped.  Page item: . Label: . |

### Previous and next buttons

| **States** | **Styles and tokens** |
| --- | --- |
|  ![](zeroheight://image/8505350/20559500bc48e88a2aa5bafbe45b93aab8b1e67923df97e028ebb63659282146)  |  **Default**   The control is available. Clicking or tapping moves the user one page in the corresponding direction.   Icon: .  |
|  ![](zeroheight://image/8505350/56701dba595fde5b05046c2b3093896d4c609f6ab42e463b7974c9160d0ed562)  |  **Hover**   The cursor is over the control.   Page item: . Icon .  |
|  ![](zeroheight://image/8505350/cae5cfa8675cef300cda54d2345894ed15a90732d7cc5b5582eaf14db3e45fec)  |  **Focus**   The control has received keyboard focus. A visible focus ring appears around the item.   Page item: . Icon:.  |
|  ![](zeroheight://image/8505350/a8dec0cc696601bca1670db706df99c9045a0fc294e731ded3643807751d46d6)  |  **Pressed**   The control is being actively clicked or tapped.   Page item: . Icon: .  |
|  ![](zeroheight://image/8505350/39e1f2fd23578f613cbb1cc11634714b865d44f80d83bffb6a11450ba9084837)   |  **Disabled**   Applied to the previous button on the first page, and to the next button on the last page. The control is visible but can't be interacted with and is removed from the tab order. Don't hide the control — keeping it visible communicates the boundary of the pagination range.   Icon: . |

### Grouped previous and next buttons

| **States** | **Styles and tokens** |
| --- | --- |
|  ![](zeroheight://image/8505350/f5c5e595ae3053dd532aa540bfb2170a11f6df19b9296cd3b0889de940cc5ef1)  |  **Default**   Both controls are available. Clicking or tapping either moves the user one page in the corresponding direction.  Page item: .  |
|  ![](zeroheight://image/8505350/95f7272542b7f76f8e058687c866c85505701892d9ab189e4aa04b84818dfcab)  |  **Hover**   Only the hovered control changes state — the other remains in its current state.   Page item: . Icon: .  |
|  ![](zeroheight://image/8505350/dca80a12dee61dbcbef22a00c15897c5c6e24db9602ee674775e8f371c234d4e)  |  **Focus**   The focus ring appears on the focused control individually.  Page item: . Icon: .  |
|  ![](zeroheight://image/8505350/db48ec89920ca3661e09552d8f2961be11de6ca3ffc8d725f6fa814cc36ddbdc)  |  **Pressed**   Only the pressed control changes state.   Page item: . Icon: .  |
|  ![](zeroheight://image/8505350/c9b38ceefdc1b51588e3c779585dac07563dc48f6ee6e83e946766ccf7b35d3c)  |  **Disabled**   Applied to the previous button on the first page, and to the next button on the last page. The disabled control renders with muted styles; the other control remains in its default state.   Page item: . Icon: . |
---

# Usage
## Overview

![](zeroheight://image/8505350/b3616c625a06bcadf414ab62f55548b3e101eac3155b4b53d7b5ec1a4fb6f556)

Pagination enables users to navigate between content pages, dividing large between pages of content, breaking large sets of content into discrete pages, showing where users are within this set and giving them controls to move to a specific page, or step forward and backward through the sequence. 

Pagination always shows previous and next controls, and optionally shows numbered page items and ellipsis truncation when the total page count exceeds the visible range.

---

## When to use

* Use when content is split across a finite, known number of pages.
* Use when users may want to jump to a specific page — not just move sequentially.
* Use when the total page count is 2 or more.

<callout background="4" fullWidth="true">

### ❌ When not to use

* Don't use for infinite scroll or load-more patterns — pagination implies a known, finite set.
* Don't use when there's only 1 page of content.
* Don't use as a step-by-step navigation indicator — use a stepper or progress indicator instead.

</callout>

---

## Variants

### Style

| **Variant** | **When to use** |
| :--- | :--- |
|  ![](zeroheight://image/8505350/8837ebe130985041521bef965677b98df49f6d205ad8ca601fbbeb9b7e1ac5df)  |  **Default**  Full pagination bar — previous, page numbers, ellipsis, next. Use this when the total number of pages is known and the user needs to navigate to specific pages. |
|  ![](zeroheight://image/8505350/45046fa4367dd4219ceb9f149a9a3f98735288879d76a4cd70eba47860c21d95)  |  **Grouped**  Previous and Next buttons as a single unit, without page numbers. Use in compact layouts where there isn't room for the full navigation bar—for example, a pagination bar within a table or feed. |

---

## Guidelines

### Ellipsis truncation

* The pagination bar shows a maximum of 9 items between the previous and next controls, including page link items, the current page item, and ellipsis items.


![](zeroheight://image/8505350/967410b789934b2d490ea73f507d82dc10926b9446fe8a8400de4628a699c0f3)

* When the total number of pages is 8 or fewer, all pages are shown without truncation.

![](zeroheight://image/8505350/f0735f9a1ee236f7a19b7b30b1a933debe89bf3e55f4df009f9e2101bf0aae15)

* When the total number of pages is 9 or more, ellipsis truncation applies:
    * **Near the start** — show the first 7 pages, one ellipsis, and the last page.
    * **In the middle** — show the first page, one ellipsis, 2 pages before the current page, the current page, 2 pages after, one ellipsis, and the last page.
    * **Near the end** — show the first page, one ellipsis, and the last 7 pages.
* Don't show ellipsis when all pages fit within 8 items.

### Previous and next controls

* Previous and next must always be present, regardless of total page count or current page position. Disable them — don't hide them — when there are no more pages in that direction.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8505350/f6b77e21e570d542a61b8253772caa1d27f5841df4ca14c7e07e791023cc2c48) |   | Keep the previous button visible but disabled on the first page. |
| Don't | ![](zeroheight://image/8505350/79b4d5e951fd61ba6b47c262d5c14a0c4584bafcebe038f6478ca8918a98fdcb) |   | Don't hide the previous or next button at the ends of the range. |

### Current page

* Mark exactly 1 page item as active at a time. The active item always reflects the page the user is currently viewing — not a selection or a hover state.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8505350/a0d2599741281a403c25195f7fc4721f5deb62c2cf57ef1c444f6ff32d2bff79) |   | Mark exactly one page item as the current page at a time. |
| Don't | ![](zeroheight://image/8505350/5bf67896f1ba92f4dcaaa6eb4b91b47a1ae027394839ff3d5281c91e96aa3a7b) |   | Don't show more than one current page item simultaneously. |

---

### Content design

#### Content structure and constraints

* Previous and next labels are always visually hidden — only the icon is visible. Screen-reader text must say "Previous page" and "Next page" respectively.
* Page number labels are integers only. Don't add ordinal suffixes (no "1st", "2nd").
* Ellipsis renders as the horizontal ellipsis character (…), not 3 separate full stops.

#### Content behaviour

* When total pages change dynamically (e.g. after filtering), update the pagination accordingly. Don't keep the old page count visible.
* If the current page becomes out of range (e.g. after filtering reduces total pages), navigate to the last available page automatically.

#### Copywriting

* Screen-reader label for the nav container: "Pagination" — keep it short and unambiguous.
* Screen-reader text for page number items: "Page [n]" (e.g. "Page 1", "Page 4").
* Don't include "Go to" — it's verbose and redundant.

---

### Layout and spacing

* Pagination items are separated by 4px
* Pagination doesn't set its own width. It wraps to the content width of its items.

![](zeroheight://image/8505350/f0c373294c09ba5b424941e48e19120f91d5aa2ae01556438ac7988da316188a)

---

### Breakpoints and responsive behaviour

* Pagination truncates and hides items based on viewport width and ellipsis logic applied to total page count. 

![](zeroheight://image/8505350/a167a237aaa83259c1bb0783ac63366018b88484b89e0ab28398d998415a40e4)

* In narrow containers, the number of page link items between the ellipsis and the current page is reduced on both sides to fit the available width, ensuring the Previous and Next controls, first and/or last page items, ellipsis items, and current page item remain visible.
    * At viewports of 576px and above, the full 9-item bar is shown.
    * Below 576px, page link items around the current page are reduced to prevent line wrapping.
* On mobile (< 576px), consider showing the grouped (prev/next only) style if space is too limited for numbered items.

---

### Interaction behaviour

* Minimum tap target for page items: 36x36px.

---

### Accessibility guidelines

#### Colour and contrast

* All state colour combinations meet WCAG AA (4.5:1 minimum for text). 
* Don't use colour alone to indicate the active page — the aria-current="page" attribute communicates current position to screen readers independently of visual styling.

#### Focus

* All interactive page items (numbers, previous, next) must be reachable via Tab and show a visible focus ring. The focus ring uses a 2px border in focus.default with a 1px offset from the item edge.
* Disabled items must not receive keyboard focus — set tabindex="-1" on the anchor element.
* Ellipsis items are non-interactive and must not appear in the tab order.

#### Labelling

* The <nav> element must have aria-label="Pagination" so screen readers can identify it as a distinct landmark.
* The active page item must have aria-current="page" on its anchor element.
* Previous and next icons are decorative — set aria-hidden="true" on the SVG. Provide visually-hidden text on the anchor for screen readers.
---

---

# Code
## Storybook

[Storybook](https://moodlehq.github.io/design-system/?path=/story/components-button--default-primary)

---

## Accessibility implementation

### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus to the button |
| `Shift + Tab` | Moves focus to the previous interactive element |
| `Space` | Presses the button |

### ARIA

* Role: button

---

## GitHub

<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/tree/main/components/button">
**GitHub: Button**
</shortcut_tile>
</shortcut_tiles>
---

# Design
## Anatomy

![](zeroheight://image/8332388/e5e82f405dd23ef1f2a6b0dcd8ffc9a0babdc84794166630181e72fb58390a15)

1. **Label** — the text that communicates the action the button will perform. Always required.
2. **Container** — the bounding shape that defines the button's clickable area and visual weight.
3. **Border** *(Outline variant only)* — the stroke that defines the button boundary. Not present in Fill buttons.
4. **Icon** (Optional): Place before (startIcon) or after (endIcon) the label only when it adds meaning, not decoration.

---

## States

### Primary fill

|  ![](zeroheight://image/8332388/44566d0a6a4ed21979d2f17a90ba743e46137dfa13fa683e3c2c2511a9a4f31e) | **Default** The button's resting state. Confirm the label clearly communicates the action before any interaction begins.  Label: `text.inverse` Container: `bg.interactive.primary.default`  |
| :--- | :--- |
| ![](zeroheight://image/8332388/20f0aa345dc51cbd69479c9b23c219d14cb38b49bbc2744b415ac1a726346330) | **Hover** Triggered when the cursor moves over the button. Don't suppress or override this state — users rely on it to identify interactive elements.  Label: `text.inverse` Container: `bg.interactive.primary.hover` |
| ![](zeroheight://image/8332388/b429532fd5745cd5174ae9fb89d57636a726fcf1988131f9077d9e109fcb2a34) | **Active / Pressed** Triggered while the button is being pressed. Transitions away immediately on release — don't hold this state.  Label: `text.inverse` Container: `bg.interactive.primary.active` |
| ![](zeroheight://image/8332388/79ab314221e816c57be834627c92164a6bae2644bf319a14b095155e5c3e7fa2) | **Disabled** Applied when the action is unavailable. Don't use as a substitute for validation — keep the button active and show errors on the relevant fields instead.  Label: `text.inverse` Container: `bg.interactive.primary.disabled` |
| ![](zeroheight://image/8332388/9eb7989f9644bedbbb7ece872a2353ca4565c62f4d7f45d6a83d32acf5817990) | **Focus** Triggered via keyboard navigation (Tab key). Must remain visible on all backgrounds used in your layout.  Label: `text.inverse` Container: `bg.interactive.primary.default` Outline: `focus.default` |

### Primary outline

| ![](zeroheight://image/8332388/02f1e9154e252e843c1e76fe6cb3b7465a3cd293e729e3610629452163bfc0e4) | **Default** Label: `text.link.primary.default` Border: `border.interactive.primary.default`  |
| :--- | :--- |
| ![](zeroheight://image/8332388/cc3895a907dc143fbe3e68ee809137ac66f7d2cccad415ea9c71cf385356d1d4) | **Hover:** Label: `text.inverse` Container: `bg.interactive.primary.hover` |
| ![](zeroheight://image/8332388/db1cde2517c87966ef86067e750c55eace34f386ddf40c73cbdfa1b07e5aeab3) | **Active:** Label: `text.inverse` Container: `bg.interactive.primary.active` |
| ![](zeroheight://image/8332388/00904c5db82e95da640ff209c80c084e524ba6e0f0df00b3ab7761bbc4f2afa9) | **Disabled:** Label: `text.link.primary.disabled` Border: `border.interactive.primary.disabled` |
| ![](zeroheight://image/8332388/c77a5a73bf16315a55cfefff8e01ae48e6093ffb2714a9fa2e49b4582917a1ed) | **Focus:** Label: `text.link.primary.default` Border: `border.interactive.primary.default` Outline: `focus.default` |

### Secondary fill

|  ![](zeroheight://image/8332388/b791504e1d4606345a498ce2dd27e8f9b98fa3d9b1c9a81f04aaa40d3ea58084) | **Default** The button's resting state. Confirm the label clearly communicates the action before any interaction begins.  Label: `text.subtle` Container: `bg.interactive.secondary.default`  |
| :--- | :--- |
| ![](zeroheight://image/8332388/c894136eb04a85f39210fc771c29bb9768c56c988efa2c79dd53e3acd95a5bcb) | **Hover** Triggered when the cursor moves over the button. Don't suppress or override this state — users rely on it to identify interactive elements.  Label: `text.subtle` Container: `bg.interactive.secondary.hover` |
| ![](zeroheight://image/8332388/ecac42919483859474b00aa6ddcc9fb560d23768df651f2336f0dd8181eccf5c) | **Active / Pressed** Triggered while the button is being pressed. Transitions away immediately on release — don't hold this state.  Label: `text.subtle` Container: `bg.interactive.secondary.active` |
| ![](zeroheight://image/8332388/ffdd6fee883dfd13b463e299c74aaa27682fc7bfb7ccea919e2b71721bd4ea7c) | **Disabled** Applied when the action is unavailable. Don't use as a substitute for validation — keep the button active and show errors on the relevant fields instead.  Label: `text.muted` Container: `bg.interactive.secondary.disabled` |
| ![](zeroheight://image/8332388/a89f5f1898826845d2fc1a36c505d842fc2dd63953c02935cd255870698faa88) | **Focus** Triggered via keyboard navigation (Tab key). Must remain visible on all backgrounds used in your layout.  Label: `text.subtle` Container: `bg.interactive.secondary.default` Outline: `focus.default` |

### Secondary outline

| ![](zeroheight://image/8332388/a8ee86faa43b0767c57b85a2c9583cadc303e0d823d2061dc1d6a6b12839706e)  | **Default** Label: `text.subtle` Border: `border.interactive.secondary.default`  |
| :--- | :--- |
| ![](zeroheight://image/8332388/b8d82b4c02673ea5c686da5ea301e83f7299093096f69b2a649fecc3320cb445) | **Hover:** Label: `text.inverse` Container: `border.interactive.secondary.hover` |
| ![](zeroheight://image/8332388/3d6aa3573257e868680787fc6fbe841ad51eab26ef149b467b5916209ab4c59d) | **Active:** Label: `text.inverse` Container: `border.interactive.secondary.active` |
| ![](zeroheight://image/8332388/701f2bd8656cce955386895061eb95aa679ae7fe3cb22732c16aa58e58e532bc) | **Disabled:** Label: `text.muted` Border: `border.interactive.secondary.disabled` |
| ![](zeroheight://image/8332388/9f28a7a1c1799d1f4beb6112d3485f359f76a6f55782916a86c4d0363ef4c4ae) | **Focus:** Label: `text.subtle` Border: `border.interactive.secondary.default`  Outline: `focus.default` |

### Danger fill

|  ![](zeroheight://image/8332388/b4c167b4f326bb95a7c8521ff6925602ca9b7db2c5b84070018638b4a6076d7e) | **Default** The button's resting state. Confirm the label clearly communicates the action before any interaction begins.  Label: `text.inverse` Container: `bg.interactive.danger.default`  |
| :--- | :--- |
| ![](zeroheight://image/8332388/7a5d58f00eb837324cd641d35f4b132001cb1abdbc5ac847ac45c69982a46059) | **Hover** Triggered when the cursor moves over the button. Don't suppress or override this state — users rely on it to identify interactive elements.  Label: `text.inverse` Container: `bg.interactive.danger.hover` |
| ![](zeroheight://image/8332388/d0145bae9f971c9a0bebd3357331e35e4483294bb13ea1d5186acd16e7994517) | **Active / Pressed** Triggered while the button is being pressed. Transitions away immediately on release — don't hold this state.  Label: `text.inverse` Container: `bg.interactive.danger.active` |
| ![](zeroheight://image/8332388/349b1656bdf95bedac1fde3d84e24c8c9831553e58b3e9d674d8461fefca1118) | **Disabled** Applied when the action is unavailable. Don't use as a substitute for validation — keep the button active and show errors on the relevant fields instead.  Label: `text.inverse` Container: `bg.interactive.danger.disabled` |
| ![](zeroheight://image/8332388/f52b8397a3941b2a3437d2dad714fd2cd5fbb233497f8efd8c40d18307561610) | **Focus** Triggered via keyboard navigation (Tab key). Must remain visible on all backgrounds used in your layout.  Label: `text.inverse` Container: `bg.interactive.danger.default` Outline: `focus.danger` |

### Danger outline

|  ![](zeroheight://image/8332388/403f3d280091633759ce718d716a14de5ceb15842296f1f3fe0e5ba077813ada) | **Default** Label: `text.danger` Container: `border.interactive.danger.default`  |
| :--- | :--- |
| ![](zeroheight://image/8332388/f934d5de5f259f78349e2d2a89b8c694c75fc3f68bf89835cf5ab6ce76613751) | **Hover** Label: `text.inverse` Container: `bg.interactive.danger.hover` |
| ![](zeroheight://image/8332388/763f4741f7c0275ff51272fc57c5510f02f6437565af4c1d5486d1e06d23e658) | **Active / Pressed** Label: `text.inverse` Container: `bg.interactive.danger.active` |
| ![](zeroheight://image/8332388/9bf371e1c1a50568d63b6c3faf0e4143cf3e7771f15786c983880c4f480bdb13) | **Disabled** Label: `text.danger disabled` Container: `border.interactive.danger.disabled` |
| ![](zeroheight://image/8332388/b747c0f41f67768caeb2070fa42676e96782bf15436319db26e38ee2b1bbb358) | **Focus** Label: `text.danger` Container: `border.interactive.danger.default` Outline: `focus.danger` |

### Ghost

|  ![](zeroheight://image/8332388/8c6bdd8f797c436dc8dc0d29d461b1eafe9b55c8c4c3534ff3ac281d8d5d10c5) | **Default** The button's resting state. Confirm the label clearly communicates the action before any interaction begins.  Label: `text.subtle` Container: `none` |
| :--- | :--- |
| ![](zeroheight://image/8332388/c894136eb04a85f39210fc771c29bb9768c56c988efa2c79dd53e3acd95a5bcb) | **Hover** Triggered when the cursor moves over the button. Don't suppress or override this state — users rely on it to identify interactive elements.  Label: `text.subtle` Container: `bg.interactive.secondary.hover` |
| ![](zeroheight://image/8332388/ecac42919483859474b00aa6ddcc9fb560d23768df651f2336f0dd8181eccf5c) | **Active / Pressed** Triggered while the button is being pressed. Transitions away immediately on release — don't hold this state.  Label: `text.subtle` Container: `bg.interactive.secondary.active` |
| ![](zeroheight://image/8332388/d9cbecde2e9466fde447195a34de541e08c9d6af25907bbee32a8c08bb773231) | **Disabled** Applied when the action is unavailable. Don't use as a substitute for validation — keep the button active and show errors on the relevant fields instead.  Label: `text.muted` Container: `none` |
| ![](zeroheight://image/8332388/eeffeaaa94fe0e4f61359d420cbd1316d87b7e6e29b4f586ea33554e98a85a6e) | **Focus** Triggered via keyboard navigation (Tab key). Must remain visible on all backgrounds used in your layout.  Label: `text.subtle` Outline: `focus.default` Container: `none` |
---

# Usage
## Overview

![](zeroheight://image/8332388/798c8260d59d4136dc16f82995fce8904662d0638ca8ae9ac9a11ee171b098b0)

Buttons let users trigger actions or navigate to a next step. They communicate what will happen when tapped or clicked, and their visual weight signals the importance of the action relative to others on the screen.

---

## When to use

* Use when the user needs to trigger an action that changes state or submits data — for example, saving a form, confirming a selection, or starting a process.
* Use when the action needs a clear, tappable target with a descriptive label.
* Use when you need to signal hierarchy between actions — pair a Primary with a Secondary to communicate which action is recommended.
* Use a Danger button when the action is destructive and the consequence is significant or hard to undo.

<callout background="4" fullWidth="true">

### **❌ When not to use**

*     * Don't use a button for navigation to another page — use a Link instead.
    * Don't use a Danger button for actions that are reversible — use a Secondary button and rely on confirmation copy instead.

</callout>

---

## Variants

### Type

The button has 3 variant groups — role, style, and size — that can be combined independently.

| **Variant** |   | **When to use** |
| :--- | --- | --- |
| ![](zeroheight://image/8332388/065fcb9d5e878de71be257a540263e2fd02b5cfeb300631fdbe3a0d7a640d2d1)  |   | ****Primary**** The single most important action in a view. Use only 1 primary button per screen or section. |
| ![](zeroheight://image/8332388/3b28a2d6a3293c448ccdbb5ddccb0cdc50fc849894d868b6f6553c04f271fc78) |   | ****Secondary**** Supporting actions that are relevant but not the main call to action. Can appear alongside a primary button. |
| ![](zeroheight://image/8332388/3017e7454d6f15b716ea6bd5ec9d81fa9c61f90a4122d9eb805424cbfeb227fc) |   | ****Danger**** Destructive or irreversible actions, such as deleting content or revoking access.  |
| ![](zeroheight://image/8332388/b575c89c04d21cf87135ba0c9ffc181cb8d8c90169dc9d8d7dcc58ee0c25cced) |   | ****Ghost**** Low-emphasis actions that need to be present but shouldn't compete visually. Use for tertiary actions, toolbar controls, or actions within already-styled containers like cards or banners. |

### Style

Style variants apply to Primary, Secondary, and Danger buttons only. Ghost has a fixed style and cannot be combined with Fill or Outline.

| **Variant** |   | **When to use** |
| --- | --- | --- |
| ![](zeroheight://image/8332388/deb4af0e090e04b5a40bc129c372e0df80d8574ca7d11707067c7613778412fc) |   | ****Fill**** Default style for most contexts. Use when the button needs clear visual prominence. |
| ![](zeroheight://image/8332388/8dcb1fb842dd40659c251a362c34005df2c8d836ac66707305dac299be269b9a) |   | ****Outline**** Use when the button needs to feel lighter — for example, in toolbars, card footers, or alongside a fill button of the same role. |

### Size

| **Variant** | **When to use** |
| :--- | --- |
| ![](zeroheight://image/8332388/f3ad0281acac9d626b6dbb7c2a392b43db6507f3bd958349a702f64c4ac60639)  | ****Large**** Use in hero areas, empty states, or standalone CTAs where extra visual weight is needed. |
| ![](zeroheight://image/8332388/e8d83c78123ead8c4312ea1450d94dd332113ebeffaea7c3a06cee838a5024c9) | ****Medium (default)**** The standard size for most interface contexts. |
| ![](zeroheight://image/8332388/7299b950da70a47edaffe0b6f673a61088a2eae3d339e32ad11e7d689746e269) | ****Small**** Use in dense layouts such as tables, inline actions, or compact toolbars. |
| ![](zeroheight://image/8332388/73a65a4a1aff2534500272aff720f509a40ef20ec4f0f7aea4984bd5870a97be) | ****Large Icon-only**** Square container with rounded corners, matching the Default button height. Use in toolbars and action bars where icon buttons sit alongside labelled buttons.  |
| ![](zeroheight://image/8332388/65e3f3705dad948e010ff7f0c46fb5017b4284be2c99ace1e0bb0b981cb51b1b) | ****Medium Icon-only**** Circular container. Use for standalone icon actions where a label isn't needed but the button needs standard tap target sizing.  |
| ![](zeroheight://image/8332388/e4648110a3d3f424df45da5c7eb3bb214cbc55ab33350846c373da4233945a33) | ****Small Icon-only**** Circular container. Use for low-prominence actions in tight spaces, such as overflow menus on cards or inline controls.   |

---

## Guidelines

### Content design

#### **Content structure and constraints**

* Labels support text only. No hard truncation — avoid labels that wrap to a second line.
* Recommended label length: 1–4 words.
* Buttons support a prefix icon, suffix icon, or icon-only configuration. Don't combine prefix and suffix icons in the same button.
* When using an icon-only button, the visible label is hidden but a text label must still be provided for screen readers.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8332388/fb8a33aad17df708a26a0639fe3d7bb5d9b539ee755bba6b6dc770cc4410006c) |   | Keep labels to 1–4 words. |
| Don't | ![](zeroheight://image/8332388/42e638149f2ef40d25a81bb1e255ff2e05f56644b2993baa58f41877829dc32c) |   | Don't use labels that wrap to a second line. |

#### **Content behaviour**

* The button width is determined by the label length, not a fixed container width (Hug behaviour).
* In full-width contexts such as mobile bottom bars, the button fills the container width.

#### **Copywriting** *(if applicable)*

* Use sentence case. Don't capitalise every word.
* Start with an action verb: "Save changes", "Delete account", "Continue".
* Be specific. "Submit" is weaker than "Save changes". "OK" is never acceptable.
* Don't use punctuation at the end of a label.
* For Danger buttons, name the destructive action explicitly: "Delete course", not just "Confirm".

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8332388/6318ad0bdff3c4d502960a263881659d2759c0ee1f0cd6a3c015d64ebe97a3a4) |   | Use a specific label that describes the outcome. |
| Don't | ![](zeroheight://image/8332388/a21f9885b843b2795689dbe5ed4002fbfc31bb767071173bf6b4d98ef1d4b53d) |   | Avoid generic labels that don't tell the user what will happen. |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8332388/3606537c1c002f0d3ab320c3e2a8b56398650d0bc08fde399ff285dbe237df9d) |   | Name the destructive action explicitly. |
| Don't | ![](zeroheight://image/8332388/94611d29eafc3bbce179dadf2dd654b8688bd209c728879b09e749c704a2e7e3) |   | Don't use generic confirmation labels on Danger buttons. |

---

### Layout and spacing

* Place the primary action on the right when buttons appear in a group.
* In modal footers and form footers, align buttons to the right.
* In full-width mobile contexts, stack buttons vertically with the primary on top.
* Don't place more than 1 primary button in the same view.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8332388/782744a0cf1cf6e89a4ab567b27db65a8147286acb0957c118e5c4ed40de66e4) |   | Place the primary action on the right in a button group. |
| Don't | ![](zeroheight://image/8332388/0df6c28455b30b69395c5115abab6a4ba02ccc0a1f99474d2a83060c419696d1) |   | Don't lead with the primary action on the left. |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8332388/6ce9d0dafb060ec39c9712b1883653a7278fdce4f4052600c1d6404832dac540) |   | Use one primary button per view. |
| Don't | ![](zeroheight://image/8332388/ef7117637fc5c3abd25ce0a94993b3eab209cde255c3af831ea927774821fa01) |   | Don't use two primary buttons in the same context. |

### Responsive behaviour

* At small breakpoints, buttons can expand to full width in single-column layouts.
* Size variant doesn't change automatically at breakpoints — choose the size intentionally for the context

![](zeroheight://image/8332388/b917f133244c1c5718038ed40529fdda6a9c0af2c2ea4c002029d151713d506b)

---

### Interaction behaviour

* Cursor: pointer on hover, not-allowed when disabled.
* Use disabled state only when the action is genuinely unavailable.

---

### Accessibility guidelines

#### **Colour and contrast**

* All Fill variants meet 4.5:1 text contrast ratio against their background colour.
* For Outline variants, ensure the border meets 3:1 against the surrounding background.
* Disabled state contrast is intentionally reduced. Don't rely on disabled alone to communicate unavailability to screen reader users — supplement with `aria-disabled` or accessible copy.

#### **Focus**

* The focus ring must be visible on all background colours used in your layout. Avoid placing buttons on dark backgrounds where the focus ring becomes invisible.

#### **Labelling**

* Always provide a text label. For icon-only buttons, this can be visually hidden and provided via `aria-label`.
* If the label is dynamic (e.g. "Loading..."), ensure the change is announced to screen readers.

---
---

---

# Code
## Storybook

[Storybook](https://moodlehq.github.io/design-system/?path=/story/components-checkbox--default)

---

## Accessibility implementation

### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus to the checkbox |
| `Shift + Tab` | Moves focus to the previous interactive element |
| `Space` | Toggles the checkbox between checked and unchecked |

### ARIA

* Role: checkbox

---

## GitHub

<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/tree/main/components/checkbox">
**GitHub: Checkbox**
</shortcut_tile>
</shortcut_tiles>
---

# Design
## Anatomy

![](zeroheight://image/8052226/4d2eccdba7d2a43249ca62efb968cb1a3c772f62efe59fa01acd4e0b2601b0bf)

1. **Hit area** — the interactive touch target that wraps the checkbox indicator. Invisible in the UI, but required to meet minimum target size requirements.
2. **Checkbox indicator** — the visible control that shows the selection state through its border, fill, and icon.
3. **Label** — describes what the user is selecting or agreeing to. Required in all contexts except data tables.

![](zeroheight://image/8052226/181af550b981c505aad67bbf6434ca61223a2ccc86cbe19d409a57da31c0e38d)

4. **Required marker** *(optional)* — a red asterisk (*) adjacent to the label. Indicates the field must be completed before form submission.
5. **Supporting text** *(optional)* — appears below the label. Used in the Invalid state to explain the validation error and what the user needs to do.

---

## States

| **States** | **Styles and tokens** |
| :--- | --- |
|  ![](zeroheight://image/8052226/85345d748c30d4451025fe011ae94dc5e82aa4cd6b0b2c18dcb498b9537fd259)  |  **Unchecked**   Default state. No option has been selected. The checkbox indicator appears as an empty box. This is the initial state when no value has been set.  Checkbox indicator:. Label text:. |
|  ![](zeroheight://image/8052226/e7525663994a7d336f1d9e00f5241ee63a7adb7390c244a0e6aacbd518854e36)  |  **Checked **  The user has selected this option. The indicator fills with the primary colour and displays a checkmark icon. Unlike radio buttons, checking one checkbox doesn't affect others in the same group.   Checkbox indicator:. Label text:.  |
|  ![](zeroheight://image/8052226/5948d156b15b1410c0f01910ba0e3ee8feea61ff0d23a4721ec2cbacf1510563)  |  **Indeterminate **  Applied to a parent checkbox when some — but not all — of its child options are selected. The indicator shows a dash icon. This state is set programmatically; never set it manually.  Checkbox indicator:. Label text:.  |
|  ![](zeroheight://image/8052226/b469b6349af7fb3223b2959a9b24eb76697c681da33996aec5b55d692c6a2f78)  |  ****Supporting text** *(optional)* **  A secondary line that appears below the label text in any state. Use it to give users additional context about the option — for example, what happens when the checkbox is selected, or what's required. In the Invalid state, this becomes feedback text and communicates the validation error.  Feedback text:. Feedback text (Invalid state only):.  |
|  ![](zeroheight://image/8052226/932ccdcf9aae571cad02488a48f0f3635dfba478c78b904cbac6332b7e2e7ad4)  |  **Invalid**   Applied when form validation fails — for example, when a required checkbox is submitted without being checked. The indicator border and label text turn red to signal the error. Always pair this state with visible feedback text that tells the user what to do — don't rely on colour alone.  Checkbox indicator:. Label text:. Feedback text:.  |
|  ![](zeroheight://image/8052226/ebd39ac8303746224457c704f181c36b30948bd22c51410b11650b02dbd307e6)  |  **Disabled **  The option can't be interacted with. Both the indicator and label render with muted colours. Don't use the disabled state instead of conditional logic — if an option is unavailable in a given context, hide it or explain why.  Checkbox indicator:. Label text:.  |
|  ![](zeroheight://image/8052226/75fc7c9d3394bae38824f56ffe2b38f6fc12d8238a7ee7ef2c2cec16713dca43)     |  **Disabled + Checked**  A pre-selected option the user can't change. Use sparingly — only when the system locks the value and the user needs to see it.  Checkbox indicator:. Label text:.  |
|  ![](zeroheight://image/8052226/922ee29872d89311eab9553e3a7e71d2b223dd507a9a6b859253a4018dc7a277)  |  **Focus **  Shown when the checkbox receives keyboard focus. A visible focus ring appears around the checkbox indicator. In the Invalid state, the focus ring uses the danger token to maintain visual consistency with the error treatment.  Focus ring: . |

---
---

# Usage
## Overview

![](zeroheight://image/8052226/8721543e2b6d8a68e31b42c64644bd8f205bf7067697fe241c784febb14ef679)

Checkboxes are form controls that let users select one or more options from a set. Each checkbox operates independently — selecting one doesn't affect the others. Use checkboxes when users need to make explicit choices that are submitted as part of a form, not applied immediately.

---

## When to use

* When users can select one or more options from a set independently.
* When a user must explicitly opt in or out of something as part of a form submission.
* When a single standalone acknowledgement is needed — for example, "I agree to the terms and conditions."
* When a parent–child selection relationship is needed — use the Indeterminate state for parent items with partially selected children.
* When a row-selection control is needed inside a data table.

<callout background="4" fullWidth="true">

### ❌ When not to use

* Use a **Toggle** instead when the action is binary (on/off) and takes effect immediately without a form submission step.
* Use a **Radio button** instead when only one option can be selected at a time.
* Don't use a checkbox without a visible label outside of a data table — the purpose must be evident from the surrounding context.
* Don't use a disabled checkbox to hide unavailable options — remove them from the UI or explain why they're unavailable.

</callout>

---

## Guidelines

### Content design

#### Usage guidelines

* Always pair a checkbox with a visible label that clearly describes what the user is selecting or agreeing to.
* Don't use a standalone checkbox without a label outside of a data table.
* Labels should be specific enough that the user understands the consequence of checking or unchecking without needing additional context.
* When a checkbox is required, always include a note in the form's legend explaining that fields marked with `*` are required — don't rely on the asterisk alone.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8052226/33463fd29489bfa4afcb1defb480fe1d0827f4c69827fc82fa7144877a408b66) |   |   |

#### Content structure and constraints

* Checkbox labels should be concise  and easy to read. Avoid long labels.
* Labels describe the option itself, not the action of selecting it. Write "Weekly digest" not "Select to receive a weekly digest".
* Feedback text must tell the user what to do, not what went wrong. Write "Select at least one option to continue" not "Error: required field."
* Capitalise only the first word of each label (sentence case).

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8052226/6dfbb95f32702084dfc2069fdfd2f7ab0124df25811d59888db4c1ecb530c460) |   | Feedback text must be descriptive and prescriptive.  |
| Don't | ![](zeroheight://image/8052226/a514152135ef661b06af632a6df040231a7149c387736f3247117644af32e6c4) |   | Avoid default system messages. |

#### Content behaviour

* Labels don't truncate — they wrap to a new line if the container is narrow.
* The label is always positioned to the right of the checkbox indicator.
* Feedback text wraps naturally below the label and aligns with the label text, not with the indicator.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8052226/22371bc6a74863c73a2663e72630edcbd904d8ebe97983120d9a343324861805) |   | Let label text wrap naturally in narrow containers. |
| Don't | ![](zeroheight://image/8052226/bdef67eb56c18a8d606ee87a3a1247b25208121cd2915201ef37a8bd84cbaa72) |   | Don't truncate label text or move the indicator from its default position. |

#### Copywriting

* Write labels so they complete the phrase "By checking this, I am selecting or agreeing to…"
* Don't start a label with "Select" or "Choose" — the checkbox itself implies selection.
* Keep options in a group grammatically parallel: if one label is a noun phrase, make all labels noun phrases.

---

### Layout and spacing

* Stack checkboxes vertically in a group. This is the recommended layout.
* Don't mix checkboxes and radio buttons in the same option group.
* Align checkboxes with other form controls within a form layout.
* In a data table, place the row-selection checkbox in the leftmost column.
* Feedback text aligns with the label text, not with the checkbox indicator.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8052226/eee905249effd4f83315ba920eaa65e14005d84c2fec62f22f3ffca0754cd57f) |   | Stack checkbox options vertically by default. |
| Caution | ![](zeroheight://image/8052226/b8e633def9543312bcab8bc85090ab11cb8b028db547842ed30660089de46b92) |   | Use horizontal layout sparingly — it can break on narrow screens. |

---

### Breakpoints and responsive behaviour

* The checkbox indicator remains the same size at all breakpoints.
* The hit area is maintained at all breakpoints.
* Label text wraps at narrow viewports — the indicator stays top-aligned with the first line of the label.

---

### Interaction behaviour 

* Clicking or tapping the label or the hit area toggles the checkbox.
* Checkboxes in a group operate independently — selecting one doesn't affect the others.
* When a selection is required and the user submits without checking, transition to the Invalid state and show feedback text that explains what's needed. Clear the Invalid state when the user checks the option.
* The Indeterminate state can't be set by the user — it's driven by child selection state.

---

### Accessibility guidelines

#### Colour and contrast

* The checkbox indicator border must meet a minimum contrast ratio of 3:1 against its background.
* Label text must meet a minimum contrast ratio of 4.5:1 against the background (WCAG AA).
* The selected state uses a checkmark icon alongside colour fill — don't rely on colour alone to communicate selection.
* The Invalid state uses red to signal an error. Always pair the visual treatment with visible feedback text — don't rely on colour alone. Screen readers must be able to announce the error; see Code → Accessibility implementation for the required ARIA attributes.
* Screen readers must be able to announce the error — see Code → Accessibility implementation for the required ARIA attributes (`aria-invalid`, `aria-describedby`).

#### Focus

* The focus ring appears on the checkbox indicator when focused via keyboard.
* The focus ring must be visible on both light and dark backgrounds.
* Focus ring treatment is inherited from the MDS global focus style.
* In the Invalid state, the focus ring reflects the danger treatment to remain consistent with the error context.

#### Labelling

* Every checkbox must have an associated label. Use a `<label>` element linked via `for` and `id`, or an `aria-label` when no visible label is present (data table context only).
* Feedback text must be associated with the input via `aria-describedby`.
* The required marker (`*`) must be supplemented with `aria-required="true"` — don't rely on the visual asterisk alone.

---
---

---

# Code
## Storybook

[Storybook](https://moodlehq.github.io/design-system/?path=/story/components-radio--default)

---

## Accessibility implementation

### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Space` | Selects the focused radio button |
| `Arrow Up / Left` | Moves focus to the previous radio button in the group and selects it |
| `Arrow Down / Right` | Moves focus to the next radio button in the group and selects it |
| `Tab` | Moves focus to the next focusable element outside the group |

### ARIA

* Role: 
* Required attributes: 
* Optional attributes: 

### Dynamic announcements *(if applicable)*

`[aria-live, state changes]`

---

## GitHub

<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/tree/main/components/radio">
**Radio component**
</shortcut_tile>
</shortcut_tiles>
---

# Design
## Anatomy

![](zeroheight://image/8052231/c3d245bc4b2bbb7080a1db6e7357e94472a35a8300bc6446a2aa890dff16831f)

1. **Container** — the wrapper that groups the radio input and its label.
2. **Radio indicator** — the circular control that shows the selection state. It displays as empty (unselected) or filled with a dot (selected).
3. **Label** — the text that describes the option. It’s always required for standalone use. It can be visually hidden when the surrounding context — for example, a table column header or a selectable card — provides enough identification. When the label is hidden, an `aria-label` must be provided in code.

![](zeroheight://image/8052231/03e05b4cb046fc8464fe2767817ae194e8c5776d1171d454738a79e9bba7651c)

4. **Feedback text** ***(optional)*** — a short message that appears below the radio group to communicate a validation error. Only shown in the invalid state. Always pair it with the visual error treatment on the indicator and label — don't rely on colour alone.


---

## States

| **States** | **Styles and tokens** |
| :--- | --- |
|  ![](zeroheight://image/8052231/42bfccf1243775834e83ededb888f9a5cad9a2bd3f362a57b035233bfafaab08) |  ****Unselected****  Default state. No option is selected, and the radio indicator appears as an empty circle. This is the initial state when no default value is set.   Radio indicator:  Ring: .  Label:  Text color: .`text.default`. Text style: .`ui-text.ui-default`.  |
|  ![](zeroheight://image/8052231/40609a70f7a520bfba1dfa2c4fcd4e6d50cef889e35b3ce1cad44b8b24335cbd)  |  **Selected**  An option is selected. The radio indicator shows a filled circle with a dot, and selecting this option deselects any other radio in the same group.   Radio indicator:  Ring . Dot .  Label:  Same as Unselected.  |
|  ![](zeroheight://image/8052231/b4db8f1a186a7494dbfcfa8d3a42d7d1fd808a724094288feb2af81ec2e68fd3)  |  ****Disabled****  The option can’t be interacted with. Both the indicator and label appear with muted colors. Don’t use the disabled state instead of conditional logic; if an option is unavailable in a given context, hide it or explain why.  Radio indicator:  Ring .  Label:  Text color: .`text.muted`. Text style: .`ui-text.ui-default`.  |
|  ![](zeroheight://image/8052231/beb8cd888e44fc21b2a445459c6266f4e7436f057204002ff1387558dfa001a4)  |  ****Disabled + Selected****  A pre-selected option the user can't change. Use sparingly — only when the system locks the value and the user needs to see it.   Radio indicator:  Ring . Dot .  Label: • Same as Disabled  |
|  ![](zeroheight://image/8052231/4ce54a42dcc0def2c3943d8b3a631a6c9aab76c58e9726ac950cb3e21f4c14f6)  |  ****Invalid****  Applied when the radio group is required and the user tries to proceed without making a selection. The indicator border and label turn red to signal the error. Always pair this with a visible error message that explains what's required — don't rely on colour alone. Apply this state at the group level, not to individual options.   Radio indicator:  Border color: .`border.interactive.danger.default`. Background fill: .`bg.surface.default`.  Label:  Text color: .`text.danger`.  Feedback text:  Text color: .`text.danger`.  |
|  ![](zeroheight://image/8052231/c01e91eccdb4c3f8da64ab7b7e51dfefc32decb2838b96be65d97215781324da)  |  ****Focus****  Shown when the radio receives keyboard focus. A visible focus ring appears around the radio indicator. In the invalid state, the focus ring uses the danger token to maintain visual consistency with the error treatment.   Focus ring:  Border color: . Border width: .`stroke weight.md` . Offset: .`2px (0.125em)`. |

---
---

# Usage
## Overview

![](zeroheight://image/8052231/c3aa1120b509c9b24586b4cee28f74de016eab78fa07fa8e26e1efef27db69c4)

Radio buttons are form controls that let users select one value from a predefined set of options. When a user selects an option in a group, it automatically deselects any previously selected option. Use radio buttons when users need to see all available options at once and make a single, final choice.

---

## When to use

* When users must select exactly one option from a predefined list.
* When the number of options is small enough to display all at once (typically 2–5 options).
* When users benefit from seeing all options before making a decision — unlike a select dropdown, radio buttons expose all choices immediately.
* When the choice is mutually exclusive and permanent for the current session.

<callout background="4" fullWidth="true">

### ❌ When not to use

* **Use a Checkbox instead** when users can select more than one option, or when the choice is binary and independently togglable (for example, "I agree to the terms").
*  **Use a Select instead** when the number of options is large (typically 6 or more) and displaying them all at once would clutter the interface.
*  **Use a Toggle/Switch instead** when the action takes effect immediately without a form submission (for example, turning a setting on or off).
* Don't use a single radio button in isolation — radio buttons only make sense as a group of 2 or more.

</callout>

---

## Guidelines

### Content design

#### Usage guidelines

* Always present radio buttons in a group of 2 or more. A single radio button alone is meaningless.

* Pre-select the most common or recommended option where appropriate, but don't pre-select when all options are equally valid — let users make an active choice.
* Order options logically: alphabetically, by frequency of use, or from most to least recommended. Don't randomise order.
* Don't mix radio buttons and checkboxes in the same group.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8052231/b44c5054974a744e9de61487639089abbd310b7cc016fe65eb0c4a74d15439d9) |   | Always use radio buttons in a group of 2 or more. |
| Don't | ![](zeroheight://image/8052231/029c47c506166c8de1d8b0222a9dc524bfc31007cf7ca22e452ecf4eb642a9dd) |   | Do not use a single radio button — use a checkbox or a toggle for binary options instead. |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8052231/a7f9e7d8645872dc056e828f961a1d50e2bc213325d8b8a5ebcef1903be4984b) |   | Use radio buttons for small, fixed sets of options. |
| Don't | ![](zeroheight://image/8052231/228e0b366ae3fa5436f04424df44d4c4a556da2557d15d0b811bb19955b6ce70) |   | Don't use radio buttons for long lists — use a Select instead. |

#### **Content structure and constraints**

* Radio button labels must be concise — ideally a single word or short phrase. Avoid full sentences unless the choice genuinely requires it.
* Labels describe the option itself, not the action of selecting it. Write "Weekly" not "Select weekly".
* If the options need additional explanation, use helper text beneath the group — not within individual labels.
* Capitalise only the first word of each label (sentence case).
* As a guide, aim for no more than 4–5 words per label.

#### **Content behaviour**

* Labels don't truncate — they wrap to a new line if the container is narrow. Define an appropriate maximum label length for your context.
* The label is always positioned to the right of the radio indicator.

#### **Copywriting**

* Keep options grammatically parallel. If one option is a noun, make all options nouns. If one is a phrase, make all options phrases.
* Avoid negative wording in option labels when possible — "No notifications" is easier to scan than "Don't notify me".

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8052231/ebc10aef78c7f119c6eac2ad740094f66e834d211c1248cb05c6eb664a38abe9) |   | Write concise, parallel labels. |
| Don't | ![](zeroheight://image/8052231/124ea433b9a58bd1c3971212ccd66525640817f536ae445d79ee55d4bf887265) |   | Don't mix grammatical structures in the labels. |

---

### Layout and spacing

* Radio buttons in a group are stacked vertically by default. This is the recommended layout.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8052231/1391a51cc1b86d49e858dfd3285ec06dfeb260b4d09c5a3ff9f478af97e0b166) |   | Stack radio button options vertically by default. |
| Caution | ![](zeroheight://image/8052231/9125fa0cd547264cc08131182fa59fb915ff6b2cefc3b5780fa10dbfc6d678cd) |   | Inline layout is available but use it sparingly — it can break on narrow screens. |

---

### Breakpoints and responsive behaviour

* Radio button labels wrap to multiple lines on narrow screens. The layout remains vertical.
* Avoid inline (horizontal) layouts on small screens — they break easily and reduce legibility.       

---

### Interaction behaviour

* Clicking or tapping the radio indicator or its label selects that option.
* Selecting a radio button in a group automatically deselects the previously selected option.
* Radio buttons can't be deselected by clicking them again — to clear a selection, the user must select a different option. If clearing is needed, consider using a separate "None" or "Clear" option.
* Radio groups support an invalid state for form validation. When a selection is required and the user submits without choosing an option, set the group to invalid and show an inline error that explains what's needed — for example, 'Please select an option before continuing.' Clear the invalid state when the user selects an option.

---

### Accessibility guidelines

#### Colour and contrast

* The radio indicator border must have a minimum contrast ratio of 3:1 against its background.
* Label text must meet a minimum contrast ratio of 4.5:1 against the background (WCAG AA).
*  The selected state (filled dot) must be visually distinguishable without relying on colour alone — the shape change (empty → filled circle) provides the secondary indicator.
* The focus ring must be visible on both light and dark backgrounds.
* The invalid state uses red to signal an error. Don't rely on colour alone — always pair the invalid indicator with a visible text message. Screen readers must be able to announce the error; see Code → Accessibility implementation for the required ARIA attributes (aria-invalid, aria-describedby).

#### Focus

* Radio buttons receive focus individually via keyboard.
* A visible focus ring is shown around the radio indicator when focused.
* Focus ring treatment is inherited from the MDS global focus style.
* When a radio group receives focus, the focus ring appears on the currently selected option (or the first option if none is selected).
* In the invalid state, the focus ring reflects the danger treatment to remain consistent with the error context.

#### Labelling

*  Every radio button must have an associated label. Use a `<label>` element linked via `for` and `id` attributes, or an aria-label attribute when a visible label isn't possible. Wrap the group in a `<fieldset>` with a `<legend>` that describes the group, or use `role="radiogroup"` with `aria-labelledby`.
---

---

# Design
## Anatomy

![](zeroheight://image/8052227/0a532caa6c47bd9d6604d676f71d46b8b17d18372405eff91e967f9f95f54ce4)

1. **Icon:** The X icon that communicates the close action.
2. **Container:** The clickable area around the icon. This makes the target easy to hit.
3. **Border** *(Focus state only)*: A visible border used to show keyboard focus.

---

## States

| ![](zeroheight://image/8052227/1418ddd3382bf6d631d03bf7b7964c4c0ca72e2d73facd2b718c6b97b7ba0b6b)  | **Default** The resting state.  Icon: `colors.text.default`  |
| :--- | :--- |
| ![](zeroheight://image/8052227/521a8a8048e1d62bbf759ac5e9f436cf1ed2befa8150d76ad0960793ef8e150a)  | **Hover** Shown when the cursor moves over the button. Do not remove this state.  Icon: `colors.text.default`  |
| ![](zeroheight://image/8052227/ffb26224f5210dd182737b1d2b2a3f29f710b12a965078da9e18a2fc08db394c)  | **Focus** Shown when the button receives keyboard focus. Must stay visible on all backgrounds.  Icon: `colors.text.default` Border colour: `colors.focus.default` Border weight: `borders.stroke weight.md` Radius: `borders.border radius.md`  |
| ![](zeroheight://image/8052227/b82d26a62aab5c53494c95275309a124b01830f7e6a706d27bdf31d5363bb5e6)  | **Disabled** Shown when the close action is not available.  Icon: `colors.text.default`  |
---

# Code
## Storybook

[Storybook](https://moodlehq.github.io/design-system/?path=/story/components-closebutton--default)

---

## Accessibility implementation

### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus to the close button |
| `Enter` | Activates the close button (triggers click/close action) |
| `Space` | Activates the close button (triggers click/close action) |

### ARIA

* Role
    * button (implicit native role from button element)
* Required attributes
    * aria-label (required in this component, since the control is icon-only and has no visible text label)
* Optional attributes
    * disabled (native HTML attribute when non-interactive)
    * aria-controls (if the button closes a specific region/dialog by id)
    * aria-describedby (if additional helper/context text should be announced)


### Dynamic announcements

No built-in live announcement from the button itself.

If closing the target changes the page state (for example, alert dismissed or dialog closed), that state message should be announced by the parent container, typically via an aria-live polite region.

---

## GitHub

<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/tree/main/components/close-button">
**CloseButton component**
</shortcut_tile>
</shortcut_tiles>
---

# Usage
## Overview

![](zeroheight://image/8052227/7e8203cb7bcc479ddfd288485409a413be7488f35373cc6e064ef8f1d6ecce49)

The close button lets users dismiss a surface, like a modal or alert.

---

## When to use

* Use when a user needs to dismiss a temporary UI surface, for example a modal or an alert.
* Use when closing is a supporting action and not the main call to action.
* Use when the UI already has clear primary actions, and the close button is only an exit.

<callout background="4" fullWidth="true">

### **❌ When not to use**

* Do not use the close button as a Cancel action when the user must choose between options. Use explicit buttons like Cancel and Save.
* Do not use it for destructive actions like delete. Use a Delete action with clear text.
* Do not use it when closing will lose work, unless you also show a confirmation.

</callout>

---

## Variants

### Size

The component supports three sizes: SM, MD, LG

| **Variant** | **When to use** |
| :--- | --- |
| ![](zeroheight://image/8052227/052dd96be7e1e08f555a93a6112300d157a1d0c04b24362e77f4a38e41061296)  | ****SM**** Use in dense UI where space is limited, for example small toolbars.  Padding: `spacing.xxs` Radius: `borders.border radius.md`  |
| ![](zeroheight://image/8052227/d3de0de7af4a61f7f17a87bb2d802f3dc33f07ea5efa6db52b908283abd5f88d)  | ****MD**** Use as the default size for most contexts, for example standard modals.  Padding: `spacing.xxs` Radius: `borders.border radius.md`  |
| ![](zeroheight://image/8052227/6ee78c2a4ac4a31fafdd7009b47d6c2528e7d670d2bba4dfd95b54a93d314173)  | ****LG**** Use when the close button needs a larger hit target, for example large modals and alert dialogs.  Padding: `spacing.xxs` Radius: `borders.border radius.md` |

---

## Guidelines

### Content design

* The close button has no visible label.
* Always provide an accessible name, for example Close.
* If there are multiple close buttons on screen, use a more specific accessible name, for example Close course settings.

---

### Layout and spacing

* Place the close button where users expect it, usually the top right of the surface header.
* Keep enough space around it so it is easy to click and tap.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8052227/3be3af48c1383ea3133726e86b0a72ff170f7d00c68b7c4be3a86ffb7edd08a7) |   | The close button placed at the right of the alert dialogue |
| Don't | ![](zeroheight://image/8052227/dd970a76f40b99a1bca3a8cdac2209f5693179f8cbf99929eb1945e5daf3f915) |   | The close button placed at the left of the alert dialogue |

---

### Responsive behaviour

* Keep the close button visible in the header area so it stays reachable when content scrolls.

---

### Interaction behaviour

#### Mouse and touch

* Click or tap closes the surface

#### Keyboard

* Tab moves focus to the close button
* Enter or Space activates it
* Escape should also close the surface when used in a modal or other dismissible overlay

#### Cursor

* Pointer on hover
* Not allowed when disabled

---

### Accessibility guidelines

#### Colour and contrast

* The icon colour `colors.text.default` must meet contrast on the background where the close button sits.
* The focus border colour `colors.focus.default` must be visible on all backgrounds used in your UI.
* Disabled opacity is lower at 25%. Do not rely on this alone to communicate state to screen reader users.

#### Focus

Do not remove the focus state. The focus border uses:

* `colors.focus.default` for colour
* `borders.stroke weight.lg` for weight
* `borders.border radius.md` for radius

#### Labelling

Because the control is icon only, it must have an accessible label.

* Use `aria-label="Close"` for most cases.
* For dialogs, prefer `aria-label="Close dialog"` when it helps clarity.
---

---

<shortcut_tiles>
<shortcut_tile url="https://design.moodle.com/98292f05f/p/32c91c" page-id="7242086">
![Colours](zeroheight://image/7682902/db06da313807b713b45c2c5c09e24e920e5dd3b6e276e63146dc8fee6decee82)

**Colours**
</shortcut_tile>

<shortcut_tile url="https://design.moodle.com/98292f05f/p/5641c1" page-id="7726675">
![Typography](zeroheight://image/7682902/50bae93059cc26616adcd7965e414a68a13afb50587773229103ad67fd7529da)

**Typography**
</shortcut_tile>

<shortcut_tile url="https://design.moodle.com/98292f05f/p/861cc3" page-id="7676729">
![Borders](zeroheight://image/7682902/f9fd0cfa67cad91b8ecc397ccab1fd3ed0679389d704ccf026b4d0e44de79ccb)

**Borders**
</shortcut_tile>

<shortcut_tile url="https://design.moodle.com/98292f05f/p/889e50" page-id="7242090">
![Layout](zeroheight://image/7682902/f09f557b87ba5c61c57459810c864ff0c15258cfa2a22eba3603d9252fc98053)

**Layout**
</shortcut_tile>

<shortcut_tile url="https://design.moodle.com/98292f05f/p/385957-icons" page-id="7242089">
![Icons](zeroheight://image/7682902/e35b66c3af9f648e5f54774d474525172c4b5f292431d67a9de4e45687919f9a)

**Icons**
</shortcut_tile>

<shortcut_tile url="https://design.moodle.com/98292f05f/p/773859-elevation" page-id="8149447">
![Elevation](zeroheight://image/7682902/ecb41b446103a0a9a90870532e0a8cde239566614e548eb89ecffc9bd85fed54)

**Elevation**
</shortcut_tile>
</shortcut_tiles>

---

# Overview
## Overview

Colour supports meaning, hierarchy, and state across the interface. Apply colour through **semantic tokens** so UI usage stays consistent, accessible, and themeable.

### Core principles

* Use semantic tokens in components (don’t use raw hex/primitive values).
* Choose tokens by **intent** first (surface vs interactive vs feedback), then by **property** (bg/text/border), then by **state** (hover/active/disabled).
* Keep state behaviour consistent across components (hover ≠ active ≠ disabled).
* Don’t use colour alone to communicate meaning—pair with text, icon, or structure where needed.

![](zeroheight://image/7242086/8bcdafd08ec4969c197ead998c5ac984950be376af6ff7fa0cd563dcc26b1fa1)

---

## Usage

### Backgrounds

**Neutral surfaces**Use these for layout layers (page, cards, panels):

| ![](zeroheight://image/7242086/7d26cd7a04c3a07c6ccd10a84685fc480abe22bf45c3b238e0d5bc1b080a0387) | `default` main surfaces |
| :---: | :--- |
| ![](zeroheight://image/7242086/51e5d5d55ab6cd6ce3915887360ee1b2837da8d8f11f934abc23b4d570fad298) | `subtle` subtle containers |
| ![](zeroheight://image/7242086/7f007d9dc15cf5081752a5038a73f08a5de26e8a71f2cc556e717ece4fcc92a7) | `strong` stronger separation / emphasis |

**Interactive backgrounds** Use these for buttons and other interactive UI. They always come with states:

| `primary` | `secondary` | `danger` |   |
| --- | --- | --- | --- |

| ![](zeroheight://image/7242086/85a7d92bac80264afe2f56ee2577eab048d781e6c7c3ec445d18f4d67a333bf5) | `default` | ![](zeroheight://image/7242086/d06c5179ae5f1c2b3673e674b5b2f2dfc3051714424f037702926c64c5d0ad7e) | `default` | ![](zeroheight://image/7242086/712aa15062b51da289d0438d21771eee0f3eb72cc8409666ef23aa2181d46fe5) | `default` |   |   |
| :---: | :--- | :---: | :--- | :---: | :--- | :---: | :--- |
| ![](zeroheight://image/7242086/9c9f6bf938519426237f1724fe2c3170a19f65bbe574ce048c1c2c942c677b25) | `hover` | ![](zeroheight://image/7242086/102a34176d4bbf5d6f89cab5877fde4a20cfd91f0e65cf63c9412a7acc1b1d4d) | `hover` | ![](zeroheight://image/7242086/78057a12f9a5a58186267d5434b9baec79d72663116e6b629eee14609272371c) | `hover` |   |   |
| ![](zeroheight://image/7242086/e6c8d7a0729a9d7d080572eeedd05365043f0c0734d532b2e2ec590078f4ddbc) | `active` | ![](zeroheight://image/7242086/b8764c0f6e5dd237608f711b9d9b49d83d894573d8cba5377640a0d0582e1541) | `active` | ![](zeroheight://image/7242086/32820cee1dc0c0cfe9c8717fbfa285d23e05e0dec8caa89e9332d3b6f0b5a3c1) | `active` |   |   |
| ![](zeroheight://image/7242086/b60cd35d6e2af2b3fa5aa8a17dd14a96ef195bc5fb76d77efa1e61a60baeafa9) | `disabled` | ![](zeroheight://image/7242086/bb186137f5bdf70f16714d78c792f3829d0931c5a07928cef7d0c4e645570793) | `disabled` | ![](zeroheight://image/7242086/abd3faef0b4ce4bd1e5bec10a48680b5baf0de24e8ffdb4143638da9744329c9) | `disabled` |   |   |
| ![](zeroheight://image/7242086/1fae928467288251f07f1dfb22bc81c1cd74f230a94b5262174a9c336d937f1e) | `default-light` |   |   | ![](zeroheight://image/7242086/87b176238c866605acfe98b11e409574e036b810964154e27dc591422b47ef97) | `default-light` |   |   |

**Feedback backgrounds** Use these for alerts/banners/toasts. 

| `primary` | `secondary` |   |   |
| --- | --- | --- | --- |

| ![](zeroheight://image/7242086/3b8cf811559399dd81fe71f1d356c67a2c3fd0443c98485c8209b5dd1918f2a0) | `default` | ![](zeroheight://image/7242086/d06c5179ae5f1c2b3673e674b5b2f2dfc3051714424f037702926c64c5d0ad7e) | `default` |   |   |   |   |
| :---: | :--- | :---: | :--- | :---: | :--- | :---: | :--- |
| ![](zeroheight://image/7242086/da9786241502952bbe700f996457bbc2369f86066bbed6c9f3fad2bf33c45c6e) | `subtle` | ![](zeroheight://image/7242086/51e5d5d55ab6cd6ce3915887360ee1b2837da8d8f11f934abc23b4d570fad298) | `subtle` |   |   |   |   |
| ![](zeroheight://image/7242086/c8b7564fe2dae8e9ef16c13f5b47bd790b41517a9e7a3e6eae74c7606667db82) | `Light` |   |   |   |   |   |   |

| `success` | `warning` | `danger` | `info` |
| --- | --- | --- | --- |

| ![](zeroheight://image/7242086/b41b67092a827a5606d6184e82341cd1af5e7c64fc9c5eb5347a452712abbc5d) | `default` | ![](zeroheight://image/7242086/33ce64edfda901313a35648ecad6d140b65ea9564205322dfcce2234f55a9479) | `default` | ![](zeroheight://image/7242086/b1d197bf4c3950a167d137afef1efb0fee7f5e55e57b51c7a1a1856bb532daed) | `default` | ![](zeroheight://image/7242086/3599434c5c279a358f15c5b14de4aebd378b194ca6625fc8e9e1d35ec5b69471) | `default` |
| :---: | :--- | :---: | :--- | :---: | :--- | :---: | :--- |
| ![](zeroheight://image/7242086/fabb67a6a2ce3c4f88254d0c5e33729573a01393a5e1857de08e7fa1b8d39137) | `subtle` | ![](zeroheight://image/7242086/628b8edee3d032872fed9ac8f48e78c3b95dd3b54984aa7eeb71bd53832248ee) | `subtle` | ![](zeroheight://image/7242086/113da40c4412236eaa9ed339933ad40ee93c7f35a3c2f5be98fbf370201c9a8e) | `subtle` | ![](zeroheight://image/7242086/ab65fcb3c5f153a4a8e4b6781e8716fe65569e96594d9c75f47b63abafdffefa) | `subtle` |
| ![](zeroheight://image/7242086/3315f7d8b5705089801e136d3767f3eaaf2e7d028ccfdf2b53a1d276a9a6f6e7) | `light` | ![](zeroheight://image/7242086/553f4c243de51776272f5ea05ddea822618a11035bff230cb86b8345aabed5cc) | `light` | ![](zeroheight://image/7242086/37e10f958ffbce9ac018ff3190472b7b84645d6c8b95342828a3967ad41e7a79) | `light` | ![](zeroheight://image/7242086/cd8446bf42b85e5741ac2c908491f8ef1b7dcd1ef9f241dbc8a5acec96031607) | `light` |

---

### Text 

Text tokens support hierarchy and readability across surfaces:

| ![](zeroheight://image/7242086/8def692280e6becd1789214df85d01d2e88d6327012f91eba2e9a00eece35a9d) | `default` | ![](zeroheight://image/7242086/2345d47060057df4a6dc04d2118917cfbdd24ec382d8d9daccaf2de504525897) | `subtle` | ![](zeroheight://image/7242086/b1d197bf4c3950a167d137afef1efb0fee7f5e55e57b51c7a1a1856bb532daed) | `danger` | ![](zeroheight://image/7242086/9b44fb9df0935045b595cc2a749466b3e64ffaa404fe7ce81620936f30373c09) | `danger disabled` |
| :---: | :--- | :---: | :--- | :---: | :--- | :---: | :--- |
| ![](zeroheight://image/7242086/010e0b8a902da8cdda2e38f8390cbc57bbc568dea55e5bda98428172055239ac) | `muted` | ![](zeroheight://image/7242086/732fdfe149f0d8cd186acabfd4b4cd6f030b8b3408c75860b94607eaeec522d6) | `emphasis` | ![](zeroheight://image/7242086/7d26cd7a04c3a07c6ccd10a84685fc480abe22bf45c3b238e0d5bc1b080a0387) | `inverse` |   |   |

For feedback components, use the matching feedback text token for best readability:

| ![](zeroheight://image/7242086/07d623dcded87cb934fb6c13381235c486966b2bfe30e6f11c310df7f005f7e4) | `primary` | ![](zeroheight://image/7242086/9c6682fd1b44d9a2d6f570e3111ce907a385efbb5eb159556b7af5c7b1b7408f) | `success` | ![](zeroheight://image/7242086/4c5e5927b02a12b5d47d025a2168e3958f1817f55f361615d37337498a569841) | `danger` |
| :---: | :--- | :---: | :--- | :---: | :--- |
| ![](zeroheight://image/7242086/5570dd93259a5ec008de1674807037f2d089a268660c82c4c262db9094a74cd6) | `secondary` | ![](zeroheight://image/7242086/17263a10a15af5a29d378bff162db06a0b95ed04cd398506899bc79d025f153d) | `warning` | ![](zeroheight://image/7242086/6c4cf358f0ed94af8f6602f619965a7eb34663353a893ff0635252fc48dce27c) | `info` |

Link styling:

| ![](zeroheight://image/7242086/7a1df6de27a90cb9249156b9f7e639c88f388ddbd54bb07bc13fb6a3a7f8d3c8) | `default` | ![](zeroheight://image/7242086/36029bab5e0f500e137f13f926e1ff3dd0b08b2b20726cb538e413eaeafda493) | `hover` | ![](zeroheight://image/7242086/3bb0e4717085dee9e1a57f72d63af68d3d76815dd76d64a85a432c84820ecc20) | `disabled` |
| :---: | :--- | :---: | :--- | :---: | :--- |

---

### Borders 

Borders separate regions and define components:

| ![](zeroheight://image/7242086/88739305ed67991576181c71a2c1052c83e706e311b7b9bfe4a42d5e10f2cf73) | `default` standard outlines/dividers |
| :---: | :--- |
| ![](zeroheight://image/7242086/cb3f0d5cdf37f0064ff136e159627affa376cf5d714cb57cf84e6ed9f6f8da4a) | `subtle` lighter separation |

Feedback borders pair with feedback backgrounds:

| ![](zeroheight://image/7242086/ba62a452d3c4628a839f153adf0fa15e3524f1fe3c8a31039c3d89eafeb9e878) | `primary` | ![](zeroheight://image/7242086/9e2543d6e83ca68b952bec886f45d163ec60580894534e9897afab239c5e3088) | `success` | ![](zeroheight://image/7242086/f267b835b9e93175c774e30fa5d97175bbc83e4b1653c4b0bee83610bb5505b1) | `danger` |
| :---: | :--- | :---: | :--- | :---: | :--- |
| ![](zeroheight://image/7242086/45e744cff912ffc56c73332e85e06121d118b12b66f0b20342486bd6565b5a26) | `secondary` | ![](zeroheight://image/7242086/2d2d3ee657173fbae2d75de114119d073cc903ceb25f04948e3f70b5b686d76c) | `warning` | ![](zeroheight://image/7242086/c649e846d66cd942d9183cfe5303c65358a6a97f7c7ee04b534efcf04413efbb) | `info` |

Interactive borders pair with interactive states:

| `primary` | `secondary` | `danger` |   |
| --- | --- | --- | --- |

| ![](zeroheight://image/7242086/c690f70787bb93de62ec5df85f3c7b924896fbe17adff266eaf470ec907fcc21) | `default` | ![](zeroheight://image/7242086/10db939928febe253437396cec9520d72545817f2deb9e72a3981dbd539baf89) | `default` | ![](zeroheight://image/7242086/70549f68d4eb8bc7fabcfbe75fffaffabb3884157106804465fc226d8af12841) | `default` |   |   |
| :---: | :--- | :---: | :--- | :---: | :--- | :---: | :--- |
| ![](zeroheight://image/7242086/d14ef54e8a98787e8b84b777532f4caabe5d36766285cd9ea39a84382db634f1) | `hover` | ![](zeroheight://image/7242086/6e7d87189224c396f457fe71c9d35d1a28c891b68f4a1bf5767ed1098085aee6) | `hover` | ![](zeroheight://image/7242086/0bf3f715ac49ae6776ae4a6362f9e2ee9dc942259a53c762933d0cfc716f4419) | `hover` |   |   |
| ![](zeroheight://image/7242086/82e4e5a53f26bdfc77c0b14c308fa7bb570238e643879bec5823fcd398e4425d) | `active` | ![](zeroheight://image/7242086/5536924250ff8465a18c82e221d702345dddeb0e93e5259ecc1c0b165ec0d188) | `active` | ![](zeroheight://image/7242086/434818c7678f39a4415b53303e38defe8818320625d4e8387f743851e7e74864) | `active` |   |   |
| ![](zeroheight://image/7242086/3f52391a6736f16df327aceb0461b108bd62795e7f21245064b92aa035c1f2a0) | `disabled` | ![](zeroheight://image/7242086/bedb1b290e3aa6b4df0ec69a9afb0fafe94636a06e18b2664d9c0c5e705565c6) | `disabled` | ![](zeroheight://image/7242086/23d23e445b0e513814c29a7435ce2b0e157372c49ba2713365618d294265eaa5) | `disabled` |   |   |

Focus is shared and consistent:

| ![](zeroheight://image/7242086/e1692aa447990beb280accf77842d3cb5b189da8f720b467df2ff2614783e6f9) | `default` Use it for all interactive elements to keep keyboard navigation predictable. |
| :---: | :--- |
| ![](zeroheight://image/7242086/4b9fb11c149fac1078195093d7b6144dea6c24068f5a3dd7b6667709b5ccb5ac) | `danger` Use it for interactive elements in a danger or error state to keep focus visible and contextually consistent. |

---

### Token pairing

The easiest way to stay consistent is to use **token sets**:

**Feedback set (status UI)**

![](zeroheight://image/7242086/a3f8e4c80a5dce46949459fbc281f403a20edfefd599cc5cf4f4834640818bd7)

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
<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/blob/main/tokens/css/colors.css">
![CSS](zeroheight://image/7242086/d45d53ea644eef08e137e338a2e3235e0a71c67cc474e84fb685aaa1f631053b)

**CSS**
</shortcut_tile>

<shortcut_tile url="https://github.com/moodlehq/design-system/blob/main/tokens/scss/_colors.scss">
![SCSS](zeroheight://image/7242086/a0ee320163ed8646b4e64f6cbf298a80ead9eae0c019facdb1e2a362231dc28d)

**SCSS**
</shortcut_tile>
</shortcut_tiles>
---

# Tokens
## Primitive colour tokens

These are the base colours. Each one is named by its colour and shade.

| Token | Value |
| --- | --- |
| color.blue.50 | #E7F0F9 |
| color.blue.100 | #CFE2F2 |
| color.blue.200 | #9FC4E5 |
| color.blue.300 | #6FA7D9 |
| color.blue.400 | #3F89CC |
| color.blue.500 | #0F6CBF |
| color.blue.600 | #0C5699 |
| color.blue.700 | #094173 |
| color.blue.800 | #062B4C |
| color.blue.900 | #031626 |
| color.cyan.50 | #E5F2F4 |
| color.cyan.100 | #CCE6EA |
| color.cyan.200 | #99CDD5 |
| color.cyan.300 | #66B3C0 |
| color.cyan.400 | #339AAB |
| color.cyan.500 | #008196 |
| color.cyan.600 | #006778 |
| color.cyan.700 | #004D5A |
| color.cyan.800 | #00343C |
| color.cyan.900 | #001A1E |
| color.gray.100 | #F8F9FA |
| color.gray.200 | #E9ECEF |
| color.gray.300 | #DEE2E6 |
| color.gray.400 | #CED4DA |
| color.gray.500 | #8F959E |
| color.gray.600 | #6A737B |
| color.gray.700 | #495057 |
| color.gray.800 | #343A40 |
| color.gray.900 | #1D2125 |
| color.gray.black | #000000 |
| color.gray.white | #FFFFFF |
| color.green.50 | #EBF2EA |
| color.green.100 | #D7E4D6 |
| color.green.200 | #AECAAD |
| color.green.300 | #86AF84 |
| color.green.400 | #5D955B |
| color.green.500 | #357A32 |
| color.green.600 | #2A6228 |
| color.green.700 | #20491E |
| color.green.800 | #153114 |
| color.green.900 | #0B180A |
| color.indigo.100 | #E0CFFC |
| color.indigo.200 | #C29FFA |
| color.indigo.300 | #A370F7 |
| color.indigo.400 | #8540F5 |
| color.indigo.500 | #6610F2 |
| color.indigo.600 | #520DC2 |
| color.indigo.700 | #3D0A91 |
| color.indigo.800 | #290661 |
| color.indigo.900 | #140330 |
| color.orange.100 | #FFE3D1 |
| color.orange.200 | #FFC8A3 |
| color.orange.300 | #FFAC74 |
| color.orange.400 | #FF9146 |
| color.orange.500 | #FF7518 |
| color.orange.600 | #CC5E13 |
| color.orange.700 | #99460E |
| color.orange.800 | #662F0A |
| color.orange.900 | #331705 |
| color.pink.100 | #F8D1E3 |
| color.pink.200 | #F1A3C7 |
| color.pink.300 | #E976AC |
| color.pink.400 | #E24890 |
| color.pink.500 | #DB1A74 |
| color.pink.600 | #AF155D |
| color.pink.700 | #831046 |
| color.pink.800 | #580A2E |
| color.pink.900 | #2C0517 |
| color.purple.100 | #DFD8E5 |
| color.purple.200 | #C0B1CB |
| color.purple.300 | #A08BB0 |
| color.purple.400 | #816496 |
| color.purple.500 | #613D7C |
| color.purple.600 | #4E3163 |
| color.purple.700 | #3A254A |
| color.purple.800 | #271832 |
| color.purple.900 | #130C19 |
| color.red.50 | #FAEAE9 |
| color.red.100 | #F4D6D2 |
| color.red.200 | #EAADA6 |
| color.red.300 | #DF8379 |
| color.red.400 | #D55A4D |
| color.red.500 | #CA3120 |
| color.red.600 | #A2271A |
| color.red.700 | #791D13 |
| color.red.800 | #51140D |
| color.red.900 | #280A06 |
| color.teal.100 | #D2F4EA |
| color.teal.200 | #A6E9D5 |
| color.teal.300 | #79DFC1 |
| color.teal.400 | #4DD4AC |
| color.teal.500 | #20C997 |
| color.teal.600 | #1AA179 |
| color.teal.700 | #13795B |
| color.teal.800 | #0D503C |
| color.teal.900 | #06281E |
| color.yellow.50 | #FDF7ED |
| color.yellow.100 | #FCEFDC |
| color.yellow.200 | #F9DEB8 |
| color.yellow.300 | #F6CE95 |
| color.yellow.400 | #F3BD71 |
| color.yellow.500 | #F0AD4E |
| color.yellow.600 | #C08A3E |
| color.yellow.700 | #90682F |
| color.yellow.800 | #60451F |
| color.yellow.900 | #302310 |

## Semantic colour tokens

These tokens give colours a meaning and a role within the interface.

| Token | Value |
| --- | --- |
| activity icon.assessment.bg | {color.pink.100} |
| activity icon.assessment.icon | {color.pink.500} |
| activity icon.collaboration.bg | {color.indigo.100} |
| activity icon.collaboration.icon | {color.indigo.500} |
| activity icon.communication.bg | {color.orange.100} |
| activity icon.communication.icon | {color.orange.600} |
| activity icon.file.bg | {color.cyan.100} |
| activity icon.file.icon | {color.cyan.500} |
| activity icon.interactive.bg | {color.red.100} |
| activity icon.interactive.icon | {color.red.700} |
| activity icon.other.bg | {color.gray.300} |
| activity icon.other.icon | {color.gray.900} |
| activity icon.resource.bg | {color.cyan.100} |
| activity icon.resource.icon | {color.cyan.500} |
| bg.feedback.danger.default | {bg.interactive.danger.default} |
| bg.feedback.danger.light | {color.red.50} |
| bg.feedback.danger.subtle | {color.red.100} |
| bg.feedback.info.default | {color.cyan.600} |
| bg.feedback.info.light | {color.cyan.50} |
| bg.feedback.info.subtle | {color.cyan.100} |
| bg.feedback.primary.default | {color.blue.500} |
| bg.feedback.primary.light | {color.blue.50} |
| bg.feedback.primary.subtle | {color.blue.100} |
| bg.feedback.secondary.default | {color.gray.400} |
| bg.feedback.secondary.subtle | {color.gray.100} |
| bg.feedback.success.default | {color.green.500} |
| bg.feedback.success.light | {color.green.50} |
| bg.feedback.success.subtle | {color.green.100} |
| bg.feedback.warning.default | {color.yellow.500} |
| bg.feedback.warning.light | {color.yellow.50} |
| bg.feedback.warning.subtle | {color.yellow.100} |
| bg.interactive.danger.active | {color.red.700} |
| bg.interactive.danger.default | {color.red.500} |
| bg.interactive.danger.default-light | {color.red.50} |
| bg.interactive.danger.disabled | {color.red.200} |
| bg.interactive.danger.hover | {color.red.600} |
| bg.interactive.primary.active | {color.blue.700} |
| bg.interactive.primary.default | {color.blue.500} |
| bg.interactive.primary.default-light | {color.blue.50} |
| bg.interactive.primary.disabled | {color.blue.200} |
| bg.interactive.primary.hover | {color.blue.600} |
| bg.interactive.secondary.active | {bg.interactive.secondary.default} |
| bg.interactive.secondary.default | {color.gray.400} |
| bg.interactive.secondary.disabled | {color.gray.200} |
| bg.interactive.secondary.hover | {color.gray.300} |
| bg.surface.default | {color.gray.white} |
| bg.surface.strong | {color.gray.200} |
| bg.surface.subtle | {color.gray.100} |
| border.default | {color.gray.300} |
| border.subtle | {color.gray.200} |
| border.translucent | rgba(0, 0, 0, 0) |
| border.feedback.danger | {color.red.200} |
| border.feedback.info | {color.cyan.200} |
| border.feedback.primary | {color.blue.200} |
| border.feedback.secondary | {color.gray.200} |
| border.feedback.success | {color.green.200} |
| border.feedback.warning | {color.yellow.200} |
| border.interactive.danger.active | {color.red.600} |
| border.interactive.danger.default | {bg.interactive.danger.default} |
| border.interactive.danger.disabled | {color.red.300} |
| border.interactive.danger.hover | {bg.interactive.danger.default} |
| border.interactive.primary.active | {color.blue.600} |
| border.interactive.primary.default | {bg.interactive.primary.default} |
| border.interactive.primary.disabled | {color.blue.300} |
| border.interactive.primary.hover | {bg.interactive.primary.default} |
| border.interactive.secondary.active | {color.gray.700} |
| border.interactive.secondary.default | {color.gray.600} |
| border.interactive.secondary.disabled | {color.gray.500} |
| border.interactive.secondary.hover | {color.gray.600} |
| focus.danger | {color.red.200} |
| focus.default | {border.interactive.primary.default} |
| text.danger | {color.red.500} |
| text.danger disabled | {color.red.300} |
| text.default | {color.gray.900} |
| text.emphasis | {color.gray.black} |
| text.inverse | {color.gray.100} |
| text.muted | {color.gray.600} |
| text.subtle | {color.gray.700} |
| text.feedback.danger | {color.red.800} |
| text.feedback.info | {color.cyan.800} |
| text.feedback.primary | {color.blue.800} |
| text.feedback.secondary | {color.gray.800} |
| text.feedback.success | {color.green.800} |
| text.feedback.warning | {color.yellow.800} |
| text.link.primary.default | {bg.interactive.primary.default} |
| text.link.primary.disabled | {color.blue.300} |
| text.link.primary.hover | {bg.interactive.primary.hover} |
---

---

# Spacing
## Spacing system

### Overview

Spacing creates rhythm and clarity in layouts, helping users scan and understand relationships between elements.

![](zeroheight://image/7242090/d919a89b8e80e57f3b5c8de49bd420497eff8dd479a2a173264c8cfd78ca7d13)

### Core principles

* Use spacing tokens for padding, margin, and gaps.
* Keep spacing patterns consistent within component families.
* Use smaller spacing to indicate “belongs together,” larger spacing for “separate sections.”
* Avoid arbitrary spacing values.


![](zeroheight://image/7242090/b7e5eb0f2cc9959c331037884189c7c3ada0af58e33d92f87f435e8cf6cc312b)

---

## Usage

Spacing is based on **4px and 8px increments**, providing a predictable scale across components and layouts.

![](zeroheight://image/7242090/40baec92cc6d1f360f434476dab77cb9c1ff89a814f6437a7b271dc29d1fee66)

### Applying spacing

Use spacing tokens for:

* Padding inside components
* Gaps between elements
* Vertical spacing between sections

| `none` | 0px |   |
| :--- | :--- | :--- |
| `xxs` | 4px | ![](zeroheight://image/7242090/13c2a509c94a79dd16cf8a1ba81dd37bc93b40a6bc1e40a2a91a627d6f6f3517) |
| `xs` | 8px | ![](zeroheight://image/7242090/2801ab076ea5b9df21ef3ab91481eaf5dfef087790afd6564d87536dad8eb5bd) |
| `sm` | 12px | ![](zeroheight://image/7242090/de5341652d80fa3ccab4115673500efa72b00c2aaf242de6b22b0873479a51eb) |
| `md` | 16px | ![](zeroheight://image/7242090/a796f153bbfbcb378bc228ec8c62d49fd33c276cbbc9305eded1b8887cf7097f) |
| `lg` | 20px | ![](zeroheight://image/7242090/d38484f6de960b94fe80f89c47b77c2077f0a2e2717dc06fd0591041cc051a0e) |
| `xl` | 32px | ![](zeroheight://image/7242090/24e2cab7c0c30ec8f895fbaf898c4e60410573379d6ef337de276bba04c840f7) |
| `xxl` | 48px | ![](zeroheight://image/7242090/ed5ac86a4b0c4515f20ac374163b6653b4a0cb03136709638b0d6e91aa55fbb1) |

![](zeroheight://image/7242090/fa8882531ce20d22242fe84e76f1f2fdcb4a286bc8b1e216692d55609c113c3f)

---

### Examples

Spacing serves as **the gap size** between elements (the padding of a component or the margin between components).

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/7242090/d0889673a3467258e62d30081fd535ecc6e1f4fdce41e3978b8821c724aa52f6) |   |   |
| Don't | ![](zeroheight://image/7242090/e857c3ec13f688bbe18e11cedcbc49d27a7550272f51bee9fc012a1e9d8cf847) |   |   |

---

### Accessibility considerations

* Avoid overly dense layouts that reduce readability
* Ensure adequate space for focus rings and error messages
---

# Code
<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/blob/main/tokens/css/spacing.css">
![CSS](zeroheight://image/7242090/d45d53ea644eef08e137e338a2e3235e0a71c67cc474e84fb685aaa1f631053b)

**CSS**
</shortcut_tile>

<shortcut_tile url="https://github.com/moodlehq/design-system/blob/main/tokens/scss/_spacing.scss">
![SCSS](zeroheight://image/7242090/a0ee320163ed8646b4e64f6cbf298a80ead9eae0c019facdb1e2a362231dc28d)

**SCSS**
</shortcut_tile>
</shortcut_tiles>
---

# Breakpoints
## Breakpoints

### Overview

Breakpoints are the viewport min-widths at which layouts and components can adapt their sizing. MDS breakpoints align with the Bootstrap 5 default scale, keeping design and implementation consistent.

---

### Breakpoints

![](zeroheight://image/7242090/345634cb35bfb66083efd231f58c39c194a5726e3079ba460bd84f06f9c02b01)

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

<callout background="1" fullWidth="true">

In some cases, the same symbol may be known by **alternative names** in Font Awesome. When this happens, alternative names are listed under the icon.

</callout>

For more icons go to: 

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1691">

![address-card](zeroheight://image/7242089/3c261e5e3129cd1cc687c8f7700ebede6c866297a21876acc4610474b5e83714)

**address-card**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1598">

![adjust](zeroheight://image/7242089/d50b8578f5fbd1bc73edd33b822ce0571cd38f8270627076b5a8ab3a0272e776)

**adjust**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1681">

![align-center](zeroheight://image/7242089/fb5bdddd93569199bb76ce1f28dc979d4af82dd00a5f6a2f92969633ae3af229)

**align-center**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1676">

![align-justify](zeroheight://image/7242089/322768b2df5d8c08eb6ace16eb11f2f634479680923abc5db4d350812cac66ad)

**align-justify**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1673">

![align-left](zeroheight://image/7242089/31ab94272964cd6a4408ecddde28ae5f284e09a2b7140ef3583e96b5649bae92)

**align-left**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1686">

![align-right](zeroheight://image/7242089/b15dc3485bb64d90b1b7abc988971a43ac94ff1ecce2d03c5294929b88bf6c7e)

**align-right**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1633">

![anchor](zeroheight://image/7242089/70da899912a3159dddd304917c6534d37e7dbc5b25554325ca041467f1d22984)

**anchor**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1586">

![angles-left](zeroheight://image/7242089/769779509f5e5a97685c1f40b6ad0ae2b730e4357e854f68019d2f99fe5b4dfa)

**angles-left**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1669">

![angles-right](zeroheight://image/7242089/fef6dd4e9d2aebe34a8406d2f5963dfdfee079c05cd07bee177fe5ccd803217e)

**angles-right**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1632">

![arrow-down](zeroheight://image/7242089/5b7bb7e5dcad856699fe91293de81d508caf32f81d98439f509dd0d75aa52ffd)

**arrow-down**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1672">

![arrow-down-short-wide](zeroheight://image/7242089/da601dab287bc9db4e5b864ad756b508b4a9509789d596091716bccf9e8e7355)

**arrow-down-short-wide**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1624">

![arrow-down-wide-short](zeroheight://image/7242089/66e60972a0b0210cf9c3180e0c040b31cbace1d46ee6aa8fb9959ed2445843fe)

**arrow-down-wide-short**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1666">

![arrow-left](zeroheight://image/7242089/54017184e4463625b20c157c449d71ec4abb34e53f64a9ba4f133249bbcb1784)

**arrow-left**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1661">

![arrow-right](zeroheight://image/7242089/41c87999ae17039525e68faca3c2d6097a5cd7f4ab47b7a6b0d867b0e79c842a)

**arrow-right**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1656">

![arrow-right-from-bracket](zeroheight://image/7242089/4be5f0caa5e53e5a703d8f5e2a173e11da32186b7eec4ae250955fe7a27d87c2)

**arrow-right-from-bracket**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1653">

![arrow-right-to-bracket](zeroheight://image/7242089/a4695b93a3ad703887f1f7b5995a355ff23edc5fac01a53b017e9860bd8535b5)

**arrow-right-to-bracket**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1650">

![arrow-rotate-left](zeroheight://image/7242089/427dde9eb6cfd7cd71d9c50a2920d964fc5c676076d17f984a1619f009888d93)

**arrow-rotate-left**

<notes>

**undo**

</notes>

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=39:262">

![arrow-rotate-right](zeroheight://image/7242089/0b8b75a5ec133610cee6e951cd444cad9e68afb0017ce9a3b1defc8f1b3089d1)

**arrow-rotate-right**

<notes>

**redo**

</notes>

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1647">

![arrow-turn-up](zeroheight://image/7242089/cd107b8c413c57ce00bd467dc97c0b327b76f5735809001194e0394d757bea48)

**arrow-turn-up**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1645">

![arrow-up](zeroheight://image/7242089/706d208686eaff78683784b1fc30cb31d19b915a8672d0757ef0b490692c7db9)

**arrow-up**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1693">

![arrow-up-from-bracket](zeroheight://image/7242089/13e314d17af00008116a527940297be15c82264664cfd5f769ba31fbcaa8be4b)

**arrow-up-from-bracket**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1643">

![arrow-up-short-wide](zeroheight://image/7242089/3db1f25c26a9f2659a7704ddb2324bf6f95c5911af5d086b2e21672089bcf54d)

**arrow-up-short-wide**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=42:258">

![arrow-up-wide-short](zeroheight://image/7242089/f9212183c65b872e734df299314fabe780a291e6e88fb7bdbf18fbe6da559394)

**arrow-up-wide-short**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1641">

![arrows](zeroheight://image/7242089/495506ce93a635de05a477b9529a4f8bb95f210653911256acb29cbc1f479d35)

**arrows**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1637">

![arrows-left-right](zeroheight://image/7242089/e6a34007aef00941e5a3ae4e2ba8c23a1dfae3175ccdb2c724fad31c6f330b18)

**arrows-left-right**

<notes>

**arrows-h**

</notes>

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1529">

![arrows-left-right-to-line](zeroheight://image/7242089/de26f7ebd0c02d0ed6fc3368ffd490f96e910730b80ef3dac4326b8c9c3ac4cd)

**arrows-left-right-to-line**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1525">

![arrows-rotate](zeroheight://image/7242089/6eeb62def3403fb82219a95c21d2f986c3dd05201a1b03b9eca4bdf3a6d9e98a)

**arrows-rotate**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1521">

![arrows-to-circle](zeroheight://image/7242089/112d946eba5e8536e835ecc9001d1511ee34897cdd4ee4f7b4de988c710843a4)

**arrows-to-circle**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1517">

![arrows-up-down-left-right](zeroheight://image/7242089/49add005d0c96f2a2299d801dcd454a27520903995708137ca008fe9d4385fab)

**arrows-up-down-left-right**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1513">

![audio-description](zeroheight://image/7242089/073a58925eeac3e5b306e8394e40b37ba2922206f24c444070b8e37f488e6d9b)

**audio-description**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1509">

![balance-scale](zeroheight://image/7242089/7639de5f3e6bb875874db9dd040ffe4d8f309664dca1838395fe28de8a968a61)

**balance-scale**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1505">

![ban](zeroheight://image/7242089/463b6abb07a61d703a9d028a1e76c730b5f6170e5c7ed31ae02a45ccd474a19f)

**ban**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1501">

![bars](zeroheight://image/7242089/8cfaf353f5078d147ccb5914a457de3388fc8ef5a8f21b86858fec69ac358c37)

**bars**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1690">

![bell](zeroheight://image/7242089/24ca979fcd5d3dba0c334cf78fb7999c2104ed02bb48fff4f81a02cde76d53af)

**bell**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1688">

![bell-slash](zeroheight://image/7242089/525a43848c06bb5320432071f60186e65312b0d2d9e740692c1da68f67133c78)

**bell-slash**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1680">

![bold](zeroheight://image/7242089/9fa3c1d74f89e59a943f08492329fe79f2f2f8ed55b1857ffa3f5a51b955893c)

**bold**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1683">

![bolt](zeroheight://image/7242089/f2688ede9bb60cdbaba2ed2c37aceb5207cd9430ea6b8813241a94b1ca7cdc28)

**bolt**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1678">

![book](zeroheight://image/7242089/8db58139c24c9146d8d14d45e494a0a3d7057aaee161af25fb944fb9abd5d5a9)

**book**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1675">

![book-bookmark](zeroheight://image/7242089/562f558c4d7a81fefd7d8621edfd9ecbb509014094b636aa233f77f1214b5b17)

**book-bookmark**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1685">

![bookmark](zeroheight://image/7242089/587c10eaf2aa884b4c9a28564e7115b1798e1b0a7916095b4680a8dbe85f1cf2)

**bookmark**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1626">

![bookmark](zeroheight://image/7242089/4b8056796a3d9c949cb975db1bb9afa6d135eb486d505476077d3a2ca02a0629)

**bookmark**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1668">

![border-all](zeroheight://image/7242089/cc93cf6dc7e57cd8d08fdf48497bbe7395ad3ca19472c926c4af649a885e8472)

**border-all**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1483">

![briefcase](zeroheight://image/7242089/2d4ddef903f76dd9880cc6a055510b2707b873162b47620ec122061b1d5265e9)

**briefcase**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1663">

![bullhorn](zeroheight://image/7242089/7efba029b2f87ce06b706c0e020275ddad5172aa78e46ec518b0e96fa7637d2f)

**bullhorn**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1658">

![calculator](zeroheight://image/7242089/67607c3734bd94eba3367c5ce04399ea668d30d7f7f1a737104d17e3bff613ac)

**calculator**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1671">

![calendar](zeroheight://image/7242089/41fdc2650c18731178eb157ddea06d0374c79d29101d41db24a37a4b77fa035e)

**calendar**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=39:261">

![calendar](zeroheight://image/7242089/b30e44906cdc0f1129bdd3bad152b948def902a9ccf406c55448bd97772e40e0)

**calendar**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1665">

![calendar-check](zeroheight://image/7242089/fa0cfa6c010e56a34c115106b07a99886344c6c27051f53ffedcd9dc721903ce)

**calendar-check**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1660">

![calendar-plus](zeroheight://image/7242089/3c4acaf9a820363e038009e8f0f366bd49bd1dea5a896e595dcabef9d972dc2f)

**calendar-plus**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1655">

![caret-down](zeroheight://image/7242089/39d7ffc11c846b7cbb01554282200bfc1e23728359ddf21fcdf328ab41c66f5d)

**caret-down**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1652">

![chart-column](zeroheight://image/7242089/4c8fedd50a7f5d086fceb05a665f5645156e59ab1f4e4bd165c528aec99ec862)

**chart-column**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1466">

![chart-line](zeroheight://image/7242089/230e5b1aeef19ff114bdfebf09f117390c6aceb0f503340247c49d8f204b94db)

**chart-line**

<notes>

**line-chart**

</notes>

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1631">

![check](zeroheight://image/7242089/2e171ed6b47e9a555338359c7c5e2f4b02c5d77b2e649d9aa3538e401fef6a3b)

**check**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1628">

![check-double](zeroheight://image/7242089/719ee17aa5103ba5848ec6fb2ba508769b3c59b6a716ec3b0088c61d5268373b)

**check-double**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1623">

![check-to-slot](zeroheight://image/7242089/8793483bfc0edae105731370ddb07f1bb36515f8d8d5defefeecc4e5451048fa)

**check-to-slot**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1622">

![chevron-down](zeroheight://image/7242089/1ea8d4da2a56614f5b3e85588e0a89ff00f90c06279426bc6c2568efcb1b5b81)

**chevron-down**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1621">

![chevron-left](zeroheight://image/7242089/b1a5b4cc4a273e045deac4f73f6d80eb9a91274a4dd3059d364f38ab28f93489)

**chevron-left**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1620">

![chevron-right](zeroheight://image/7242089/0724e1fbedb49f9d630827ad66ddbb957e52aad240e79745bcedeb822279cc0c)

**chevron-right**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=40:259">

![chevron-up](zeroheight://image/7242089/ecef520432bc60febcf53e4540cf0f4cdeefcd656f3189a1fb5170f8f07712e7)

**chevron-up**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1619">

![circle](zeroheight://image/7242089/70f0d52b2acf4082a12e6a2c1497859d42a7b1484bc4111fb868ca0c88bf87d1)

**circle**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1497">

![circle](zeroheight://image/7242089/8546d1c7b2873336adaccb913fb4286367d66e70f949e42da70fcfd1808b64a5)

**circle**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1618">

![circle-arrow-down](zeroheight://image/7242089/708f122e4b9488e5c79ecc20bb821798c7ca5995a12bd39721a5cc305af17e97)

**circle-arrow-down**

<notes>

**arrow-circle-down**

</notes>

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1616">

![circle-check](zeroheight://image/7242089/b281654c0ad245628afcdb7d66a8d72dc875dea865a204b41ba30a6056d4c6f9)

**circle-check**

<notes>

**check-circle**

</notes>

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1493">

![circle-check](zeroheight://image/7242089/1af639bf0d8d36ea9c8dbaabb4abb61a828aa734883064d4267c8b7f2195fe29)

**circle-check**

<notes>

**check-circle**

</notes>

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1614">

![circle-dot](zeroheight://image/7242089/61dd0666b4f74aa45455ff493d56d7e3da277d26ec05f13a53189ed231c86bd7)

**circle-dot**

<notes>

**dot-circle**

</notes>

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1489">

![circle-dot](zeroheight://image/7242089/4f90030d3452bf9dce1c57807fae12c165e641064562536c529ddb8a5bbf2cc9)

**circle-dot**

<notes>

**dot-circle**

</notes>

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1610">

![circle-exclamation](zeroheight://image/7242089/dc4ec973a1e05e0649182d9be4b932dfee5124e90c54a7bcb2aee3de9f0201b7)

**circle-exclamation**

<notes>

**exclamation-circle**

</notes>

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1608">

![circle-info](zeroheight://image/7242089/2a7f588a2d88b82291221b8ae91c1152e2a28e957acfa4301b22777feb451786)

**circle-info**

<notes>

**info-circle**

</notes>

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1606">

![circle-minus](zeroheight://image/7242089/fe9d4ea72e8f4327e7dc3768ef4e9c1e0437513f6c729849dd288ac51c3013e8)

**circle-minus**

<notes>

**minus-circle**

</notes>

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1604">

![circle-pause](zeroheight://image/7242089/a528ff7cb36c9ca152be30590e84b7090a14f302dc9d51569a090207ca2b3c2f)

**circle-pause**

<notes>

**pause-circle**

</notes>

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1547">

![circle-pause](zeroheight://image/7242089/ec4c1b67785be3c1dac08bc723e614276dd7e8604d0a001d10f105ae87ec83bc)

**circle-pause**

<notes>

**pause-circle**

</notes>

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1602">

![circle-plus](zeroheight://image/7242089/ed7afee9cf5b526f80e9eaf53f4caac8656cd43c6648cb41c9dc52d620774e75)

**circle-plus**

<notes>

**plus-circle**

</notes>

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1600">

![circle-question](zeroheight://image/7242089/d0f167aea31cf214d574474eeb280e86a8f2ab01e1b82952f3c712aa9cd493a1)

**circle-question**

<notes>

**question-circle**

</notes>

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1599">

![circle-xmark](zeroheight://image/7242089/b7d638043572302d9a413936e95016f4fdcae5e627a1a9ce07ca030405a24dee)

**circle-xmark**

<notes>

**times-circle, xmark-circle**

</notes>

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1537">

![circle-xmark](zeroheight://image/7242089/6ac90432558e1566feefcc083b2662d15bbaa2c1663bcaf3ba7b52a7a8f6c99d)

**circle-xmark**

<notes>

**times-circle, xmark-circle**

</notes>

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1597">

![clipboard](zeroheight://image/7242089/19a3ecc4e6bc7c8d51bec85153e3af144c85eed1fe330a9aad2f84e7ccd8ffbb)

**clipboard**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1545">

![clipboard](zeroheight://image/7242089/9b823ecabdbfa9f61b4c700f5b6decc5f906e20d60e9f95f2754828ab669b2dc)

**clipboard**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1596">

![clipboard-check](zeroheight://image/7242089/6cad4dbe96984667f0c8f7b55133dbea41cb37cbee64759b6b51898e9679f15e)

**clipboard-check**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1595">

![clipboard-user](zeroheight://image/7242089/39ce5264bb2048518241990c9a125febe1b36bd754d16f7177e0fce37d2d0698)

**clipboard-user**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1594">

![clock](zeroheight://image/7242089/1d5534b4bd100a03615649c49d21e58c2bab83a2ccc29f48e75a193e70ab5335)

**clock**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1593">

![clock-rotate-left](zeroheight://image/7242089/dbc51b9299819448577c3c825b4ad2d0cce02dd0cd19e566ee1938f33659c296)

**clock-rotate-left**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1592">

![clone](zeroheight://image/7242089/fa1d2862fe154ac0e52e1edaee23dd9c3df5e939a5c30ddeb3f219c4cbb5e1a4)

**clone**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1591">

![code](zeroheight://image/7242089/3018ae7ae7788613325ce9066d1480d5b6525f5dc879122d505bb391387f688b)

**code**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1589">

![comment](zeroheight://image/7242089/d68fc95a07471d869707d37b4bd3c75c58747bbc4c60bf7991b9aa4dd60e7be1)

**comment**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1588">

![comment](zeroheight://image/7242089/5524962c12d12abc2dd7048e113ded8815917ec152097fad6ef73ce3980b0f37)

**comment**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1585">

![credit-card](zeroheight://image/7242089/607a1ea64bf307ea3d269277d8bad027514e11230157361b5012fc3e7a0e9d76)

**credit-card**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1584">

![crosshairs](zeroheight://image/7242089/f879213b43c39d123d59d0f8a616105610b959c834e7fe5f81ce1cc6908000d3)

**crosshairs**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1583">

![database](zeroheight://image/7242089/b9d539e0701e37d9e72a5477b3dc3ac3d4ecd7589df1e77c5eb1c98dbc018102)

**database**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1582">

![delete-left](zeroheight://image/7242089/7dc38e769c995f65e072b5c3dc45ce0b7b395663feea89cb23a9b3bd4bb58df0)

**delete-left**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1581">

![download](zeroheight://image/7242089/0b7429e01fc5ffdf3aed07e873561f3478b6d5330d173d5b4275b87c258f8401)

**download**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1580">

![ear-listen](zeroheight://image/7242089/1149530a76cbe738f7633f2275d27a78918e73603009ab064c8687163e54a907)

**ear-listen**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1630">

![earth-americas](zeroheight://image/7242089/099ea5e6a333dab16254821d554ff2f79b8aa9a150c0503d2e1d44eb39a0e402)

**earth-americas**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1627">

![edit](zeroheight://image/7242089/39aec296ccf7007d37e54da7241acbee3456e3723c4dfb000faa054f1345bc4a)

**edit**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1587">

![ellipsis-vertical](zeroheight://image/7242089/28206ac9003b5d5e3741bd7451931e6af6189fbed40828c9058d3c0c3b972ca8)

**ellipsis-vertical**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1578">

![envelope](zeroheight://image/7242089/ea490012daba563fbb06051a3799be5237374bdd2d8ad78a630764e57bac080a)

**envelope**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1612">

![equals](zeroheight://image/7242089/2dc4ba9732ef350b648be643888293f376bc4a41b4f5dd9a5aaabfc53e1ed0f6)

**equals**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1576">

![eraser](zeroheight://image/7242089/d306a50ede7518c1652f20ecfde449c7ddac228590652644c6affd463197216f)

**eraser**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1574">

![exclamation](zeroheight://image/7242089/c266b331569c017fd7ba74323e3b0665f89efed26c3ba3f308654f1102217e25)

**exclamation**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1570">

![expand](zeroheight://image/7242089/c14cdc74592969bae3c3b3ad16b6ca43e68784ec4d81f562834f7dc7fa4fe655)

**expand**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1568">

![external-link](zeroheight://image/7242089/e52356a7724ae9f94510cce53eaa3d0b9eb93ca4760fde974af28cf3c91b77e6)

**external-link**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1566">

![eye](zeroheight://image/7242089/de86cc9a0a9b683edab4c1b146d1d63a84fc06b2c9d8957b2d24271221de6531)

**eye**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1499">

![eye](zeroheight://image/7242089/9bdd0c2a01509fadfb55c2b3bcc034b46ea348641cced1914d9bfbe0b7e24ef9)

**eye**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1564">

![eye-dropper](zeroheight://image/7242089/9d46878c787090f96a58a7e059d998a40089e36eae0ef77e3c80bc1895d2520a)

**eye-dropper**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1461">

![eye-low-vision](zeroheight://image/7242089/d1b5a2d7b231a676aa9eaa90077dd77535eedcf495423ebc5e1579e3f130f5e6)

**eye-low-vision**

<notes>

low-vision

</notes>

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1562">

![eye-slash](zeroheight://image/7242089/84d834963df8374dbe4f8daebecec89e6436c0e701992975cc2f770c0033c0ea)

**eye-slash**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1560">

![face-frown](zeroheight://image/7242089/449ad794a05fd82ec18e7a32bb61ad9b2c93edcacaaf6a5b7fd23838c2a277db)

**face-frown**

<notes>

**frown**

</notes>

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=44:270">

![face-frown](zeroheight://image/7242089/02cbd6c9f61750c06c5b63a09a63d3456973294ad401ef7ae3aa0d92ddfb1d10)

**face-frown**

<notes>

**frown**

</notes>

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1558">

![face-smile](zeroheight://image/7242089/baa66521589a6a87c2ad1884f61309c0ccff1d1b0dccd66c42bd4c339a2348f7)

**face-smile**

<notes>

**smile**

</notes>

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=44:261">

![face-smile](zeroheight://image/7242089/03248eb9b47fecc9b14d75faac35f9d13acad2e344caa5a0cc9f74741c34daa5)

**face-smile**

<notes>

**smile**

</notes>

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1556">

![file](zeroheight://image/7242089/f15c7422389abfd43c536a74de5a81cf02f59c71115a35c7f94f3c5aa26ac8bc)

**file**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1543">

![file](zeroheight://image/7242089/a69942b51b30f46998e7e1dda9c5448c729c4fc5c76f443882bdff4fc493dce4)

**file**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1555">

![file-circle-minus](zeroheight://image/7242089/35d808e4d4e7d1bee4462c7c7b8051db7dc952487c74a529b222dd7b11095848)

**file-circle-minus**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1554">

![file-circle-plus](zeroheight://image/7242089/1ec18d5f3e25661db3470985f51e54ec3f43c92d2e2f99d9685fc20ea35a5130)

**file-circle-plus**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1553">

![file-image](zeroheight://image/7242089/d161d231b5ef91d2353e16f8d39dd7bd25f4773e09dca02a4663f4658e974b99)

**file-image**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1539">

![file-image](zeroheight://image/7242089/62161b164c79c891afb9746da135b2a5f51f38713e5adb00cbb455d4dff527f4)

**file-image**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1552">

![file-invoice](zeroheight://image/7242089/a9aa77c72c7aa1f5e47db4e75fcd0f908b0210121c91a4296059330f73537dfb)

**file-invoice**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1551">

![file-pdf](zeroheight://image/7242089/4a48cc63b901114113c43b9ebd65c2ecda00b4fc11b126b9cc22b1175f358443)

**file-pdf**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1535">

![file-pdf](zeroheight://image/7242089/cf7ec978fc8924279fdf2439664f10eb46d960e913fa1964a488e493545d08e5)

**file-pdf**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1550">

![file-text](zeroheight://image/7242089/cc9b60f49c28a33e5db00184776d6edb0bdd43efb5926e5807eb5b73e380d8d3)

**file-text**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1533">

![file-text](zeroheight://image/7242089/025fdbb697ab69c1c1022c94d50a679b2b6085c4d3b5b38d0e60c8db6ef03e8a)

**file-text**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1549">

![file-video](zeroheight://image/7242089/1d8fd8f7b44bd8e29ca93670234b72749699c162a37150def731ab43de94f21a)

**file-video**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1579">

![file-video](zeroheight://image/7242089/fac31cc1c148805267849031cc59ac0e1e1c8287ac1151040a80de80880ce9ec)

**file-video**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1548">

![file-zipper](zeroheight://image/7242089/8e0c0c17b57cb782622c8b41cc32fb3b218f28e9ddc4f3cbb0ea3a73cb37ab14)

**file-zipper**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1629">

![file-zipper](zeroheight://image/7242089/48d7c418f92578e2c5cdb0ffac0918c7c0588abbb9ca50e7245533eabbfb575c)

**file-zipper**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1546">

![film](zeroheight://image/7242089/23a1c1726ed524a576274501449badf08a77588a17efbddbdd6f29e12ec40e01)

**film**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1544">

![filter](zeroheight://image/7242089/abd9086351aa7c313f5ad8cec33fa661f236d967deaaa8c0a44f4b131beba2d9)

**filter**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1542">

![flag](zeroheight://image/7242089/f023c775b62691f9f96fc1d5bbe01cf6847e05735d650525444654c7b528d048)

**flag**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1540">

![folder](zeroheight://image/7242089/f589e7a4b32651d3494fd412ad104bdee033e815ad34ddb1dc2e88a5885212c6)

**folder**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1538">

![folder-open](zeroheight://image/7242089/b455da777b7e1c6ac43d6b634ec5998a6dff40293c0256ca896a953926d85bc5)

**folder-open**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1536">

![folder-plus](zeroheight://image/7242089/ffcc49f2f12652c6590c1052c994226cdcebb397c8184eadf436600235e047ef)

**folder-plus**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1534">

![folder-tree](zeroheight://image/7242089/330662fed66d7a2b0408ec45d0b99f83d4135a0e42ebca797ccdbb954225149f)

**folder-tree**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1532">

![font](zeroheight://image/7242089/f6681a9b831932a2d5fffe1d81671812820d07837382658100293f9a2f104b6d)

**font**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1528">

![futbol](zeroheight://image/7242089/0d577ba35b4ff06d46e7ffde9a61f8f20c283e3a1a41aa357baf77a6d9cf9f5f)

**futbol**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1524">

![gauge](zeroheight://image/7242089/32c8beaef6810a0201454877d65c9ee6bda704d362b41fed9cb8db106cd131ac)

**gauge**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1520">

![gear](zeroheight://image/7242089/1138f688a717c5b9fe62e2f50c6f7ed1c768feafb31f242c73c4093394fbec6a)

**gear**

<notes>

**cog**

</notes>

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1516">

![globe](zeroheight://image/7242089/36eefe67a55402fdce99ce063b8383c5decbd3d89affee0d6813351ad91ffc6f)

**globe**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1512">

![graduation-cap](zeroheight://image/7242089/676d143fea34323cc499ff1bf4033f69214bb29d93f290ea7a5a022c89662db8)

**graduation-cap**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1508">

![hammer](zeroheight://image/7242089/e03ed474a3c0f1bf314041d010e40e51fa0101e1dfca368d1ec647add0e5b1e3)

**hammer**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1504">

![hard-drive](zeroheight://image/7242089/b7b7b63f2ae147766b62b293dd59e2addabdf70a50afb8fba5bd8158cdd7085a)

**hard-drive**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1500">

![hashtag](zeroheight://image/7242089/e14243348177785b0c075c8ca905bb85676f0b38374838895c4871ab92492dca)

**hashtag**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1498">

![headphones](zeroheight://image/7242089/a32052d5fc892fa43c368cb846bc62f3d93b36b53b7501bb6da6602019a83063)

**headphones**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1496">

![highlighter](zeroheight://image/7242089/7ffce6d88a9544d2dfd1883172b454fd8e90d8cbfc2d603d95ddcc2f80693cc9)

**highlighter**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1494">

![home](zeroheight://image/7242089/bf2f8525f73a392abf49e86ac7cbb7a5abcd44707b8b34b84dbc5c379e2657ff)

**home**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1492">

![hourglass](zeroheight://image/7242089/8a508de2f5c6cf4b9cdb5e3fabd925fa56853424ab7a16b514d8aa0d1f3121b6)

**hourglass**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1490">

![hourglass-half](zeroheight://image/7242089/319c58d1fbcb5c9873035680b155f800429ec2759e244bbde4d5139f1441ac70)

**hourglass-half**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1488">

![i-cursor](zeroheight://image/7242089/06d9d215a98307af29f3a1e3fa15c818c3b98493b8c362511fb3a36cd3e2f5c1)

**i-cursor**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1487">

![image](zeroheight://image/7242089/569d407dfb9d426de3a288ded87b0b1b7e8a503ac16bc2fec027aa40a3c1f95b)

**image**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1486">

![indent](zeroheight://image/7242089/7bbd9e35563fd7387a2c592df1f53072538c651e6c497625c25ca1b39bd3ab87)

**indent**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1482">

![info](zeroheight://image/7242089/d57374978d98e5493dbef13876e184a5d4fdcb59ff30e48f62f8942f86a108a1)

**info**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1478">

![italic](zeroheight://image/7242089/2eba55c1c99225b46fc89fccfc65e1a72ad3e7024ca7fb04ada064e0288f0b64)

**italic**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1476">

![language](zeroheight://image/7242089/4f5c9f51e26d38108913eb91133e33e222f17a4e8e45fd85a2b0048c18f5d6a5)

**language**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1474">

![laptop-file](zeroheight://image/7242089/b745fcc4faca0ec2379b327657f247daff8389de1d74fcf467858ec2b0f257a0)

**laptop-file**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1472">

![layer-group](zeroheight://image/7242089/702755b1c078fe90ca4493739a7eccf973477dd9107b9359c93d722d40901a50)

**layer-group**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1470">

![leaf](zeroheight://image/7242089/c03fa48cccec93c5b0133121ffe8028110521d9bfbc30296c4f84a7610caae56)

**leaf**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1468">

![life-ring](zeroheight://image/7242089/cd63db1a55c55077beff30538144443c4145b2fa335334b485a04c08d4822a0c)

**life-ring**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1464">

![link](zeroheight://image/7242089/fa2c056d5fb51d3058bb173955fd0005690be54c0f5b5e0d0d0f3f21b13cfa4f)

**link**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1462">

![link-slash](zeroheight://image/7242089/89d9de874a4133f7f234e071131dc5c3ea9a3fa732194ae43a1283d89fdbe326)

**link-slash**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1460">

![list](zeroheight://image/7242089/3ee4124d3a827774764befb338b42fc5da9872b0415a1ee4dbdac8c8e888e785)

**list**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1458">

![list-check](zeroheight://image/7242089/1756dbf462171491c709dafd63a392207e7ef4e7f9f811aec2f6c7a8e82ddb36)

**list-check**

<notes>

**tasks**

</notes>

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1456">

![list-ol](zeroheight://image/7242089/7a16548ae3a301de36e1a32e22c69ab179719f62f7f176dd6fc32b463900fd20)

**list-ol**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1454">

![list-ul](zeroheight://image/7242089/db9ba777432349ef02dac35f5ce20f8496f4219db115cbf9559bfbf8349dbfa3)

**list-ul**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1467">

![location-dot](zeroheight://image/7242089/53eb72fa8e618f4cb515f3bf4b6712071281720dd41159fa4f72f7127e829a28)

**location-dot**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1465">

![lock](zeroheight://image/7242089/6f1cc130fd465efc5df752aeec1b5c8188725888c17fbca3376291f5852fd2fb)

**lock**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1463">

![lock-open](zeroheight://image/7242089/df5ac2404025da2083484ec565fa52fa14e3d7f7d52976d50b6303a33a0d72a5)

**lock-open**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1459">

![magnifying-glass](zeroheight://image/7242089/462307b2a68e96f8dfa4cffece854ddb4ce874aeb896eabe9c2aab4130ee088e)

**magnifying-glass**

<notes>

**search**

</notes>

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=45:258">

![magnifying-glass-minus](zeroheight://image/7242089/dd99ef50f45b4e9879e380f6ab16ae95cfe30bcba092636dcd2d21ffd983fc8b)

**magnifying-glass-minus**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1457">

![magnifying-glass-plus](zeroheight://image/7242089/1cc98eb09e9153c8c1b7787678671981e599988d7ffe0c30bf394d0025fa4d0a)

**magnifying-glass-plus**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1455">

![male](zeroheight://image/7242089/a0ed77e324e526ad4d4a99afabf1f7ef501c201bf6f78e9f8689c7ec3f97fb26)

**male**

<notes>

person

</notes>

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1453">

![maximize](zeroheight://image/7242089/271c9b43c5fa02c056eff553e1df517fc0d68bf1e1964b56649ab2c45b3706ed)

**maximize**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1531">

![message](zeroheight://image/7242089/37a12f198cf2b4ed00691e4576de227150058a284640b0792d3cecbb3f328b98)

**message**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1527">

![microphone](zeroheight://image/7242089/f79471fa8f8805d0ab926bc355cca1c2c0b15711963994638c9304d37e7a163a)

**microphone**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1523">

![microphone-slash](zeroheight://image/7242089/71bb441e8219ce6dd154999095861263442406071de33272d73eac9c2fcad7a9)

**microphone-slash**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1519">

![minus](zeroheight://image/7242089/08b792e74210bfe24285ddfaf98efdbf1028fec2bc13948f066ac57f6abd5c50)

**minus**

<notes>

-, **subtract**

</notes>

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1515">

![network-wired](zeroheight://image/7242089/7b46c989d653fdce65d4034b778171b29074bb3ab06f1e33209a6e0cd76e4ee3)

**network-wired**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1511">

![newspaper](zeroheight://image/7242089/18d4d6361737933e713d2c79be61e6a68385f42779ddae082371061f68f62da7)

**newspaper**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1507">

![outdent](zeroheight://image/7242089/4d161e7833eef970cceb9b36ef59cde197b3980c3b109605670b4dddd7a62818)

**outdent**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1503">

![paper-plane](zeroheight://image/7242089/51b566a5526a651587dacb36efd8d0dc4fc35b182508617629883a7f5b6af7f7)

**paper-plane**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1530">

![paperclip](zeroheight://image/7242089/22d5c495cf1ac62f9292baeaaa2fc6a3dbda8a45dcf62e7d797b2cb931108eed)

**paperclip**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1526">

![paste](zeroheight://image/7242089/3f8290c934f66f09a42d2bb1217bd67cb2e225a94b684b51a095b2ee2de28d02)

**paste**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1522">

![peace](zeroheight://image/7242089/a35347318f3c99eb076d1854b70e1a21745ec1134b4e9cfb4b74778378c96e81)

**peace**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1518">

![pen](zeroheight://image/7242089/fd43c3ef631ddbb61c974951f2f4e5b044c2ebdb444a1eff89a953c1a3d7b472)

**pen**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1514">

![pen-clip](zeroheight://image/7242089/c15567efb712b12e99c05cb7252a104f4722ef8cef8f6c36d0af9342b094e6eb)

**pen-clip**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1510">

![people-arrows](zeroheight://image/7242089/147f194e76716fd7d28b842ab96149aa486b91c592001629043fd14c6228919e)

**people-arrows**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1506">

![photo-film](zeroheight://image/7242089/b77784a020750db05a789182e9fc20761c79cebbbd8721fee155781c05345c05)

**photo-film**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1502">

![pizza-slice](zeroheight://image/7242089/90f58535ee9bc84d20a3962096747b93b33516fb785fec0d098c3cbfab1537ed)

**pizza-slice**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1485">

![plane](zeroheight://image/7242089/2d3338e39fac334d0cd511430c0f64983b45f0bc604d23ccb505078e6e5ae20c)

**plane**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1481">

![play](zeroheight://image/7242089/0175acc14f7080aee8cc84d3a355bba4dc795c9e00b6eec689e67ea6189a64ee)

**play**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1634">

![plus](zeroheight://image/7242089/aed74bd245b87ca17ea017ad56c35e7012da2d1cbda2715aa0dd118b39f1150e)

**plus**

<notes>

+, add

</notes>

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1635">

![question](zeroheight://image/7242089/b3b2c19308b9aa138f26ad8297aada7c9b1c82212f63372efb9fdf99624f2da6)

**question**

<notes>

?

</notes>

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1479">

![print](zeroheight://image/7242089/929acdd81961fdee653db396f43e34439e164b886abc9f6c0018247d7543b496)

**print**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1475">

![quote-left](zeroheight://image/7242089/1255eed6aea39b0f329c5631c32d6039351aa39a26df7936a81f52075b15e1a1)

**quote-left**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1473">

![quote-right](zeroheight://image/7242089/5a99b745f0573e1071a81bf8f83de96274ea8da6693f0a87279a1a9bb49385bf)

**quote-right**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1471">

![rectangle-list](zeroheight://image/7242089/40cf123790eeb9beba5fd114c1a447b3bcfbbf7ef8b79d126860997f502114ce)

**rectangle-list**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1469">

![rectangle-xmark](zeroheight://image/7242089/7c7214b77e9f61b238387f702543cfd9b0c604606d20affbcabc07d8d8129710)

**rectangle-xmark**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1484">

![refresh](zeroheight://image/7242089/939f8837e1102c4206190d4f68029454d109ef78f0e255b193b1bf0085fa244f)

**refresh**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1662">

![right-left](zeroheight://image/7242089/b83491f744d5cacc6b3e80abe8a2aca67ef9ad157a74b863fd81679e5f3c40f2)

**right-left**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1657">

![rss](zeroheight://image/7242089/4094387568f5bd9d53559a8d15507e47481ecff93807c8cfc4c01612275729f7)

**rss**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1670">

![ruler-horizontal](zeroheight://image/7242089/d85fe7322bc0846ece6daf95b57450df95d6f8b9a98d5f300d00df7f89a94cd8)

**ruler-horizontal**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1664">

![save](zeroheight://image/7242089/d93a7e6bd5d72905394a5dea9f4d999d8c82fef232e0ba14bc00cfaac7cf67b8)

**save**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1659">

![scissors](zeroheight://image/7242089/a84ff3ef1ddcc496fd55647696d44d610c48f8812432d5f436573d44a5412dc6)

**scissors**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1651">

![shapes](zeroheight://image/7242089/1064f8a22f290d6aff10fcd93dc0501be96203fb95e0abc8b8d5b833bff197f5)

**shapes**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1648">

![share](zeroheight://image/7242089/f3c6d2bea9d11feb213eb02f752ae99457e1ca020bcf2d9eaaf49a8c7b8b41f4)

**share**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1644">

![spell-check](zeroheight://image/7242089/2d55134c2ac9e3429001a242a6492486d5c927525e6f8ae94d6ab2f3fee8a886)

**spell-check**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1692">

![spinner](zeroheight://image/7242089/1d614099b678481fa02e10b9d4c1a1f35f251f333353c599909ea0f69d22026f)

**spinner**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1642">

![square](zeroheight://image/7242089/16485750417b84e38bd02065aba6bc0399e8cfb63f8575acc4bcad627acb5eaa)

**square**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1495">

![square](zeroheight://image/7242089/c487f6dc8c3c3c921c4e760add520267db70e84a9f7e66a930975112792fa569)

**square**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1640">

![square-arrow-up-right](zeroheight://image/7242089/c15e6ff1de3215210439423d97d17e1880bc7bf0a5738d6a1683872454702f1e)

**square-arrow-up-right**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1638">

![square-check](zeroheight://image/7242089/b3715fd47eb77b34e00f970ec517703a853991c07146be6ddbef5724fb0d9efe)

**square-check**

<notes>

**check-square**

</notes>

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1491">

![square-check](zeroheight://image/7242089/d5b23b708ecb31ac0ec5d0764f90d8f97d77725123b692df039be0c02a82b27b)

**square-check**

<notes>

**check-square**

</notes>

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1636">

![square-plus](zeroheight://image/7242089/589ea01c23186a6ecd5c2327ca1c7d981ccf9be4b6365347a19309b16302f6a1)

**square-plus**

<notes>

**plus-square**

</notes>

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1617">

![square-root-variable](zeroheight://image/7242089/0b171696b7c536aa0a828755911908cc0be19b984ea3701f653ccf4b51102110)

**square-root-variable**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1615">

![star](zeroheight://image/7242089/004316f505729657536fff1b712fab362d333cee12c66dd7a4d74d840d7b51dc)

**star**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1541">

![star](zeroheight://image/7242089/ad9d781ebf70dad37a9611f7cb61bfaa74f705ccc5d705ab4a952b95f9b80725)

**star**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1613">

![stop](zeroheight://image/7242089/e1dd56a130f2b593d0f2fae1d9269fc0e95f8c600e12a2b990a1a8c3af8edfca)

**stop**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1609">

![strikethrough](zeroheight://image/7242089/88251c68c0e0c5ac16861fdced21c2667538dd1322151791462475d534937f4c)

**strikethrough**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1607">

![subscript](zeroheight://image/7242089/b5a4a9a2bdac2fb4a5bdb23ef9b4230be82c3c5417109fdb8a6c22de838121c8)

**subscript**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1605">

![suitcase](zeroheight://image/7242089/244d6abfb88118fc68b90d4bf27853ccb30d73ec25716d6ea6583feee6641488)

**suitcase**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1603">

![superscript](zeroheight://image/7242089/8406c2a1ac2d4b609f377539efa1f3677fe6b175a61c30b6b8c5cb6c8224bead)

**superscript**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1601">

![table](zeroheight://image/7242089/45030e6f8449a40c444bd7b197ba4a6db6014102c5fdd00ebfc9062299ec6832)

**table**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1689">

![table-cells-large](zeroheight://image/7242089/a3ba52456d7e6388a0fddf24fcf4fad3c2c573b4fba2c98c71068dc6be2c44c8)

**table-cells-large**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1687">

![table-list](zeroheight://image/7242089/ebcfe038fb2d581b48ec47439fb29a2ab565a9d1bf15d7e15baf526b4d8cd5b7)

**table-list**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1682">

![tags](zeroheight://image/7242089/bcb7ce81fda7da57ac64085adcc0b09e13876c6bae9fb74c4b95d1a9eeb728f1)

**tags**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1674">

![thumbs-up](zeroheight://image/7242089/d1a51e2f0bdb26ca0b16fd00507cbcca4dd6eff12858a462b4fa811a8b98898c)

**thumbs-up**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1684">

![thumbtack](zeroheight://image/7242089/88714d5026ec8a7d5120389d794ea0b3abd8dd3985d36d283f9eec57ceaa4ed1)

**thumbtack**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1679">

![trash-can](zeroheight://image/7242089/c459a083997491343081ac6e4fd820efe2c20352c16bfb41270db5a48adcf08a)

**trash-can**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1667">

![trash-can-arrow-up](zeroheight://image/7242089/4f4f0f1d180b9c570415e2faeaa9d4b9f73a01ac34c84c558e84351e9767c389)

**trash-can-arrow-up**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1452">

![tree](zeroheight://image/7242089/9f1f47dba86712a534397f6aa8f73029441bcbcc691ed8ab359bfb7f0b339222)

**tree**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1451">

![triangle-exclamation](zeroheight://image/7242089/e831e208d4f3f2b4ec00736b881dd1b37eee4b16f6e432dbc6171246c822cc8a)

**triangle-exclamation**

<notes>

**exclamation-triangle, warning**

</notes>

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1450">

![trophy](zeroheight://image/7242089/ef592eb5e48308e9382c2b3daa71eab65035ce10b1fdd1cdda9d98c7e4a6efab)

**trophy**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1449">

![underline](zeroheight://image/7242089/66b844fa7281e5d3f4361faee02f2fdf101aa35a47da98ff8730101234025e01)

**underline**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1447">

![universal-access](zeroheight://image/7242089/39f0c2e0f9ad1fbeec1ed2eeace3dcc04fa4a063c0d30b03da89318213e001fc)

**universal-access**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1446">

![unlock](zeroheight://image/7242089/19941b96e4c8b42b2c97dad182ef4fa8d3e1c6fb1f22c551e613068827fe5b20)

**unlock**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1445">

![unlock-keyhole](zeroheight://image/7242089/5470465b0fe9c713b3e974c751834482be39439d9425102277814943dbc9a4f7)

**unlock-keyhole**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1444">

![up-right-and-down-left-from-center](zeroheight://image/7242089/281fbf1138aca955b8a3a2049c76493703115a13cdf5d813aaf563d154b917bb)

**up-right-and-down-left-from-center**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1443">

![upload](zeroheight://image/7242089/3c497a57cbbb06bba70320f48ee3a3184984b0bc60a5da634e98c8892f51a5f8)

**upload**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1442">

![usd](zeroheight://image/7242089/54dc7a3f4e12aa4caea0e091aeb20e3f8ecacc7629e58d697218969a622da187)

**usd**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1441">

![user](zeroheight://image/7242089/d17f1c34148b6e27b379589027b060b8ba27f5167545d155101d04b93cdf9f4e)

**user**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1440">

![user-check](zeroheight://image/7242089/138bc94839ad51cb5de36b1ad4c549a4689e00b1565ea0624d64ec85855bebe6)

**user-check**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1439">

![user-group](zeroheight://image/7242089/24a0a8eb98b89335741ee944a411a0f33f09acc2ff05d2523b794a2ed2e38e87)

**user-group**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1438">

![user-lock](zeroheight://image/7242089/ca462fba1076b91cdcfbf2e2aee009a18ecffa04c046267c62fc12e8f94eb439)

**user-lock**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1559">

![user-lock](zeroheight://image/7242089/ac0cbee8ae0e8942fb89f1511844520d99b2c8f4f463ac16093f3675fe405752)

**user-lock**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1437">

![user-plus](zeroheight://image/7242089/537fadad078f5882157f354e683f28666dac20273a5ae0bf367ce66fbea6c8eb)

**user-plus**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1571">

![user-tag](zeroheight://image/7242089/4fe206a31f2e73206bc5e7dfea61a54b736473655b2c5c5aaa73d21b02ee1abc)

**user-tag**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1569">

![user-tie](zeroheight://image/7242089/1d4c9ad8c2f87bd312b6dfe4b9203f922c6191183ae7c43f88bba4fdba919077)

**user-tie**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1567">

![user-xmark](zeroheight://image/7242089/06660204f5fe0bb2c7ee638d03fbfdab4a4db7882a84586f01ed2d437f33bead)

**user-xmark**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1565">

![users](zeroheight://image/7242089/435e14325960f42d6503c4c86e056066df2d9ac572de92c61b6dae41800f7f0a)

**users**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1561">

![users-gear](zeroheight://image/7242089/b891d46dc5c2dd2027ae2dd647bd6c11442bec8ff78d963b2ed20aba9bc35175)

**users-gear**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1563">

![users-line](zeroheight://image/7242089/f88723cb51e31558d31c76b1ab90147eb633064202e6c8dbec8519c3bd47adb6)

**users-line**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1557">

![video](zeroheight://image/7242089/82a4644779b13e219a848bf0ca802c43fa2b325d72b24680fd4f7e87f3f318df)

**video**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1436">

![volume-high](zeroheight://image/7242089/f96fe46c4e65cdb1dd0f2a7b1614e55608efd5fd4b0c785617294c19d054f9e0)

**volume-high**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1435">

![wand-magic-sparkles](zeroheight://image/7242089/d0fa07222dd552e29ad16c191885d81b65887b71e2e7c13a8e1c6857b75fd483)

**wand-magic-sparkles**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1433">

![window-restore](zeroheight://image/7242089/eda69c7f06d7fb949e39e0bc485d11a16171d442cd901803632e819c1f3566cd)

**window-restore**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1432">

![wrench](zeroheight://image/7242089/abce37b8d8969f773a6f08ec0d0ba4223fabed0ff968c1a7dada0a618af97439)

**wrench**

</design>

<design figma-url="https://www.figma.com/design/Diwjkwtp784SX412Y6fT4I/?node-id=22:1431">

![xmark](zeroheight://image/7242089/b589049da5a65e411bed18f2dc6b5359bfcb8c39217a3eee302e6bcae31962cd)

**xmark**

**Details**

<item-details>

**xmark, close**, **multiply**, **remove, times**

</item-details>

</design>
---

# Overview
## Overview

Icons reinforce meaning and actions and provide visual cues in the interface. Consistent sizing and accessible labelling ensure icons support content rather than replace it.

![](zeroheight://image/7242089/49fc8df84a902dd0f0bcd881cd12de89da207cea8e26753d39376b9ec94e817f)

### Core principles

* Use approved icons only (avoid mixing icon sets).
* Prefer icon + text for important actions.
* Apply consistent sizes and containers for alignment.
* Provide labels for icon-only controls.

![](zeroheight://image/7242089/2270e6981bb7c16701a59f81ea3c338412a815b91efa4048c7df754fbc118477)

---

## Usage

### Icon library

Moodle uses **Font Awesome Free 6.7.2** for all icons, except for icons used in activities and resources, which follow a separate system.

Icons can be adjusted using three main options: **style**, **size**, and **padding**.

### Styles

There are two styles available: 

* **Solid** is used most often and provides a strong, filled look
* **Outline** (also known as Regular) is a lighter alternative and works well in subtle UI elements.

![](zeroheight://image/7242089/36499ad0f0256bc36ad14eec2bc68593a0c220abe0e4995a80c72081e5bac439)

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

![](zeroheight://image/7242089/fda01bb86dae4eb75acd26ddc5e9a7296c692daed386b86a444c9693eef21507)

---

### Examples

* Use **Square** containers in lists, tables, and dense layouts
* Use **Auto** inline with text where surrounding layout controls spacing


![](zeroheight://image/7242089/e96cbf57eba59f6ebc22ea5204a0bc6e229c503509ed30cb97541fd6065abcb7)

---

### Accessibility considerations

* Icon-only controls require an aria-label and/or tooltip
* Don’t use icons as the only indicator of status or meaning
---

---

# Code
<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/blob/main/tokens/css/shadows.css">
![CSS](zeroheight://image/8149447/d45d53ea644eef08e137e338a2e3235e0a71c67cc474e84fb685aaa1f631053b)

**CSS**
</shortcut_tile>

<shortcut_tile url="https://github.com/moodlehq/design-system/blob/main/tokens/scss/_shadows.scss">
![SCSS](zeroheight://image/8149447/a0ee320163ed8646b4e64f6cbf298a80ead9eae0c019facdb1e2a362231dc28d)

**SCSS**
</shortcut_tile>
</shortcut_tiles>
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


![](zeroheight://image/8149447/4bcc21714cfdb7ade4c33313847622bf8c9d113baa0feb5116745fa902a6f9e8)

---

## Usage

### Shadow styles

| ![](zeroheight://image/8149447/947f56feb58e1c786079337ec08a07e0994e2dd4524dfbeed1fa581c9e3b72e4) | **Shadow / Small** Used for tooltips or subtle inner containers. |
| :--- | :--- |
| ![](zeroheight://image/8149447/26c4b0daa38b04c44ef8f8c57af4df021846ba43aff5c605eb460dacf2b97d2e) | **Shadow / Medium** Used for cards, dropdowns or modals. |
| ![](zeroheight://image/8149447/a4b8db4ba447787469ac7a718ee8af5619fd983628534da407582942e0ec4cd7) | **Shadow / Large** Used for overlays or drawers that sit above other layers. |

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

![](zeroheight://image/7676729/1d1a60b5c901b8b3c0ed0c61657915d4214704a8df9fa23683154164f9952972)

### Core principles

* Use stroke and radius tokens (no one-off values).
* Use stronger strokes for emphasis (focus/selected), not decoration.
* Never remove focus indication without an accessible alternative.
* Keep shapes consistent across component families.

---

## Usage

### Strokes

Stroke tokens define the thickness of borders and lines. Use them to apply consistent visual weight to elements.

| ![](zeroheight://image/7676729/d0d35825780870bf31be0407a86d305b2ada878aed2f198a2003d348dcd93ee8) | **stroke weight sm** Used for fine outlines, subtle dividers or light borders on cards. |
| :--- | :--- |
| ![](zeroheight://image/7676729/8eaca89427315b1e1cac759c30c3dc49ab67df9fdce98fd1db664b51d7039889) | **stroke weight md** Used for inputs, containers or lightly emphasised components. |
| ![](zeroheight://image/7676729/91f2c3ef9adef2ba0871549ee2fb77fdd5eb636b9a7a35000c3bc6aac41fbce0) | **stroke weight lg** Used for active states like focused inputs or selected items. |
| ![](zeroheight://image/7676729/0d94f3d1e6daf70f9a6a4b5db6e3bbb096dba8d8c089bf469546c0350a074550) | **stroke weight xl** Used for banners or elements needing strong visual emphasis. |
| ![](zeroheight://image/7676729/36e26b1ccedbd2baeaa803adf58690c5c8bc0c1a27089baaebf541cc76197a09) | **stroke weight xxl** Used sparingly for highly prominent components or callouts. |

### Radius

Radius tokens set the roundness of corners to ensure shape consistency across the interface.

![](zeroheight://image/7676729/ebcaaf9a340ac406bfb2e6960be1910bcb8518de163b3aaa25a6b09f5dc9e0aa)

| ![](zeroheight://image/7676729/d7ff692791ca2a9403f752aa3ea496e95be5252b74607c595625734857f27756) | **border radius xs** Used for buttons or inputs in compact components. |
| :--- | :--- |
| ![](zeroheight://image/7676729/ecd92a1928e6f6b0a5203119ce553fb690aaf9aceb2cda2ca252a7f7ff4d0578) | **border radius sm**  Used for cards, panels and standard containers. |
| ![](zeroheight://image/7676729/d685ac887d2d9a139418f4acab10cac687a2869dd9d0561bc647d27f8e554385) | **border radius md** Used when softer curves are needed for visual balance. |
| ![](zeroheight://image/7676729/cfbaaf407d515c404f4d02268dc65bf4b902756f1d10011684e17058389e6e6e) | **border radius lg** Used when softer curves are needed for visual balance. |
| ![](zeroheight://image/7676729/1669c5a9375a7fefc167c9e1f293a9a98d13f73ea937d0d9d7f4cbbb7aede2d6) | **border radius xl** Used for overlays, modals or large pill-style buttons. |
| ![](zeroheight://image/7676729/074f6fa6aa1cd6ede29ad97f33a4c820dc48b03a48015d20c19b5e7338d5a537)  | **border radius xxl** Used for large tags or rounded panels. |
| ![](zeroheight://image/7676729/ec3a15fa0e6e0b53ae770c12c63000c75666ad070aafacc7a69ffeb25f1b071b) | **border radius pill** Used for pill-shaped elements such as badges or toggles. |

### Focus ring

Focus ring tokens define the outline used to show keyboard focus. This helps users navigate interfaces using a keyboard or assistive technology.

It is defined by two properties: colour and stroke weight. 

![](zeroheight://image/7676729/25a33a2f76936433a6c3ecf8b6b073ff5f3aedce02ea41c19d0ff4bddbbc35ab)

---

### Examples

* Inputs use`stroke-md`by default; focus uses`stroke-lg` 
* Cards/panels use `radius-md`; pills use`radius-pill`only when shape requires it

![](zeroheight://image/7676729/696925774a27e2c8564efd5349ffe4c369987cec437779769bda41cd349f2b31)

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
<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/blob/main/tokens/css/borders.css">
![CSS](zeroheight://image/7676729/d45d53ea644eef08e137e338a2e3235e0a71c67cc474e84fb685aaa1f631053b)

**CSS**
</shortcut_tile>

<shortcut_tile url="https://github.com/moodlehq/design-system/blob/main/tokens/scss/_borders.scss">
![SCSS](zeroheight://image/7676729/a0ee320163ed8646b4e64f6cbf298a80ead9eae0c019facdb1e2a362231dc28d)

**SCSS**
</shortcut_tile>
</shortcut_tiles>
---

---

# Tokens
## Displays

Display styles are used for large, high-impact text.

While not frequently used in Moodle’s current UI, these styles are available for cases where strong visual presence is needed, such as landing pages, banners, or hero sections. Use them thoughtfully and in alignment with the product’s content strategy.

<design figma-url="https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/?node-id=1061:7125">

**Display 1**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (300) | The quick brown fox jumped over the lazy dog |
| Size | 80px |   |
| Line height | 96px |   |
| Letter spacing | 0px |   |

</design>

<design figma-url="https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/?node-id=1061:7126">

**Display 2**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (300) | The quick brown fox jumped over the lazy dog |
| Size | 72px |   |
| Line height | 86.4px |   |
| Letter spacing | 0px |   |

</design>

<design figma-url="https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/?node-id=1061:7127">

**Display 3**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (300) | The quick brown fox jumped over the lazy dog |
| Size | 64px |   |
| Line height | 76.8px |   |
| Letter spacing | 0px |   |

</design>

<design figma-url="https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/?node-id=1061:7128">

**Display 4**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (300) | The quick brown fox jumped over the lazy dog |
| Size | 56px |   |
| Line height | 67.2px |   |
| Letter spacing | 0px |   |

</design>

<design figma-url="https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/?node-id=1061:7129">

**Display 5**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (300) | The quick brown fox jumped over the lazy dog |
| Size | 48px |   |
| Line height | 57.6px |   |
| Letter spacing | 0px |   |

</design>

<design figma-url="https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/?node-id=1059:1146">

**Display 6**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (300) | The quick brown fox jumped over the lazy dog |
| Size | 40px |   |
| Line height | 48px |   |
| Letter spacing | 0px |   |

</design>

---

## Headings

Heading styles help to organize content into different levels of importance. They help users scan the page and understand how the content is organised.

These styles are more commonly used across Moodle, and may also play a role in how pages are interpreted by assistive technologies and search engines.

* Use them to define **sections**, **subsections**, and **logical content hierarchy.**
* Each level (Heading 1–6) is designed to scale down progressively in size.
* Avoid skipping heading levels.


<design figma-url="https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/?node-id=1059:1152">

**Heading 1**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (500) | The quick brown fox jumped over the lazy dog |
| Size | 37.5px |   |
| Line height | 45px |   |
| Letter spacing | 0px |   |

</design>

<design figma-url="https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/?node-id=1059:1155">

**Heading 2**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (500) | The quick brown fox jumped over the lazy dog |
| Size | 30px |   |
| Line height | 36px |   |
| Letter spacing | 0px |   |

</design>

<design figma-url="https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/?node-id=1059:1158">

**Heading 3**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (500) | The quick brown fox jumped over the lazy dog |
| Size | 26.3px |   |
| Line height | 31.5px |   |
| Letter spacing | 0px |   |

</design>

<design figma-url="https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/?node-id=1059:1161">

**Heading 4**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (500) | The quick brown fox jumped over the lazy dog |
| Size | 22.5px |   |
| Line height | 27px |   |
| Letter spacing | 0px |   |

</design>

<design figma-url="https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/?node-id=1061:7135">

**Heading 5**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (500) | The quick brown fox jumped over the lazy dog |
| Size | 20px |   |
| Line height | 24px |   |
| Letter spacing | 0px |   |

</design>

<design figma-url="https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/?node-id=1061:7136">

**Heading 6**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (500) | The quick brown fox jumped over the lazy dog |
| Size | 16px |   |
| Line height | 19.2px |   |
| Letter spacing | 0px |   |

</design>

---

## Paragraph styles

Paragraph styles are used for body content, supporting text, and other long-form content.

They are designed for readability and accessibility in UI contexts, with appropriate spacing and line height to ensure comfort during longer reading sessions.

### Base text

This is the default text style for body content. Use it for paragraphs, descriptions, instructions, and any general-purpose text.

It is the most widely used style across the system.

<design figma-url="https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/?node-id=1061:7137">

**Base text**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (400) | The quick brown fox jumped over the lazy dog |
| Size | 16px |   |
| Line height | 24px |   |
| Letter spacing | 0px |   |

</design>

### Small text

Use this style for secondary or supporting text, such as:

* Timestamps
* Metadata
* Labels or captions
* Optional field descriptions

Do not use it for long paragraphs or dense content, as this would make it inaccessible.

<design figma-url="https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/?node-id=1061:7138">

**Small**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (400) | The quick brown fox jumped over the lazy dog |
| Size | 14px |   |
| Line height | 17.4px |   |
| Letter spacing | 0px |   |

</design>

### Lead

This style is intended for short introductory paragraphs or highlighted text blocks, such as intros at the top of pages or sections.

While not commonly used in Moodle, it’s available for cases where slightly larger body text is needed to give visual emphasis.

Use it sparingly and only when it helps improve clarity or user focus.

<design figma-url="https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/?node-id=1059:5214">

**Lead**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (400) | The quick brown fox jumped over the lazy dog |
| Size | 20px |   |
| Line height | 40px |   |
| Letter spacing | 0px |   |

</design>

## UI text

UI text styles are used for interactive elements and short-form copy, such as buttons, labels, links, and input fields. They are designed for clarity and legibility within components, often using more compact spacing and line height to fit neatly within defined boundaries.

### UI default

This is the default text style for most UI components. Use it for buttons, labels, input fields, links, and other interactive elements. 

It is the most widely used text size for components across the system.

<design figma-url="https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/?node-id=3171:1900">

**UI default**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (400) | The quick brown fox jumped over the lazy dog |
| Size | 16px |   |
| Line height | 12px |   |
| Letter spacing | 0px |   |

</design>

### UI small

This is the small text style used for smaller components or for secondary UI content. 

This size is ideal when less prominence is needed or the default UI text is too large for the available space.

<design figma-url="https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/?node-id=3194:1906">

**UI small**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (500) | The quick brown fox jumped over the lazy dog |
| Size | 14px |   |
| Line height | 12px |   |
| Letter spacing | 0px |   |

</design>

### UI large

This is the large text style used for larger UI components. 

This size is ideal when the default UI text is too small for the available space or when the content needs more visual emphasis.

<design figma-url="https://www.figma.com/design/bPRkRtSszcbWw9f9p9rXvA/?node-id=3194:1907">

**UI large**

| Property | Value | Example Text |
| :--- | :--- | :--- |
| Family | Roboto (400) | The quick brown fox jumped over the lazy dog |
| Size | 20px |   |
| Line height | 24px |   |
| Letter spacing | 0px |   |

</design>
---

# Overview
## Overview

Typography provides a consistent, readable hierarchy across products and components. Predefined styles reduce inconsistency and support accessibility by default.

### Core principles

* Use published text styles; avoid local overrides.
* Choose styles by **role**, not by “what looks right.”
* Don’t skip heading levels.
* Use system text colour roles (don’t hardcode).

![](zeroheight://image/7726675/b9f1cb95105b3f0355d6fceceb529fa90ac02744e59514f050a6ef5651e59dc6)

---

## Usage

### Typeface

We use **[Roboto](https://fonts.google.com/specimen/Roboto)** as our primary typeface across the system.

While Moodle LMS will use the user's system font, we have chosen Roboto as the default font to use for Figma designs, as system fonts can't be embedded.

![](zeroheight://image/7726675/fa04e0330b093a36d25276bbc8fe39e66e4916de7633c1b56f4814e776e66cd4)

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

![](zeroheight://image/7726675/0f88f2977d11c709c99bac6747a8591b2e93396abbfa7be8ca69fce3ba77d14f)

---

### Examples

* Use **Base text** for paragraphs, instructions, long-form content.
* Use **Small text** for metadata/helper text, not dense paragraphs.
* Use **UI text** for buttons, labels, inputs, links.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/7726675/f90784b40af22844a0e50263a17cf4979c1936aa5498177de3ad117febff9c6b) |   |   |
| Don't | ![](zeroheight://image/7726675/287c0a19421e6df2e566b5d73bd30b3e54e0801c3f7c1d86b06ee9c7c358cd0b) |   |   |
| Do | ![](zeroheight://image/7726675/32c0efc9dfa494610016684c2a3611f4faaf31d6f2a555204e0fc0cbe2d83361) |   |   |
| Don't | ![](zeroheight://image/7726675/96a37e3ebf5bc971a170a0acb3c018e888e5f435c9c800ded47b2f527069c0e1) |   |   |

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
<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/blob/main/tokens/css/typography.css">
![CSS](zeroheight://image/7726675/d45d53ea644eef08e137e338a2e3235e0a71c67cc474e84fb685aaa1f631053b)

**CSS**
</shortcut_tile>

<shortcut_tile url="https://github.com/moodlehq/design-system/blob/main/tokens/scss/_typography.scss">
![SCSS](zeroheight://image/7726675/a0ee320163ed8646b4e64f6cbf298a80ead9eae0c019facdb1e2a362231dc28d)

**SCSS**
</shortcut_tile>
</shortcut_tiles>
---
