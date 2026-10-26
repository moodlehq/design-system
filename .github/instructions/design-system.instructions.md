<!-- Auto-generated from ZeroHeight. Do not edit manually. -->
<!-- Source: https://design.moodle.com/ -->
<!-- Regenerate: npm run build-docs -->
<!-- NOTE: No applyTo frontmatter — this file is intentionally opt-in only.
     Load it manually when ZeroHeight MCP is unavailable and design context is needed.
     See routing rules in copilot-instructions.md. -->

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
* **Components:** React-based components with Figma equivalents for Moodle LMS built in a modular and extensible way. 

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

# Using tokens
### What are design tokens?

Design tokens are reusable design values that help keep things consistent across Moodle. They represent things like colours, spacing, fonts and more. Instead of hardcoding values in every component, we use tokens to define them once and then share them across the design and code.

Let's say a brand has a **Primary Pink** colour. Designers and developers should refer to this colour by the same name and identity, regardless of platform (design, web, mobile etc). If the colour changes in design, it should also change on all development platforms automatically (and vice versa).

**Design tokens** enable this behaviour by creating an **abstract identity** and centralising the source of truth for this colour. Because they help to establish a source of truth, they are often found in design systems. They can be used for colours, text styles, spacings, animation values etc.

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
3. Choose a colour token like bg/interactive/primary/default or border/interactive/primary/hover


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
* Stick to what’s available in the library. Reach out if something is missing
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

Yes. One of the best things about tokens is that they’re shared between design and development. These docs use the code token names, like `--mds-spacing-md` or `--mds-bg-interactive-primary-hover`, which are the CSS variables developers use in Moodle’s front end code.

---

#### How are design tokens named?

We use a naming system that shows the purpose of the token in a clear and predictable way, for example:

* `--mds-bg-interactive-primary-hover`
* `--mds-spacing-md`
* `--mds-border-radius-lg`

The naming helps you understand what the token is for before using it.

---

#### How are tokens used inside design system components?

Design system components are built using tokens for things like spacing, typography and colour. This means you don’t have to manually apply tokens everywhere, the components already follow the system rules.

---

#### What happens if I override a token in my design?

If you override a token by entering a custom value, your design might not be consistent with Moodle’s system or code. It also won’t switch properly between themes. Stick to tokens as much as possible. If you need something that feels missing, you can request a new token through the [feedback form](https://docs.google.com/forms/d/e/1FAIpQLScPnuSUes33FxyivVgHpG36wGojH2Ow_gfe6rdtDWL5_be0zQ/viewform).

---

#### How do tokens help us switch between themes?

Tokens keep our design flexible. For example, instead of setting a colour value like #FFFFFF, we use a token like `--mds-bg-surface-default`. This way, the token can point to a different colour in each theme (like light or dark mode) without changing the design or code.

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

We post updates in our Zeroheight documentation and in team channels like Matrix.

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

### AI prototyping with the Moodle Design System

AI prototyping tools can turn a plain-language description into interactive UI in minutes. When those tools are grounded in the Moodle Design System, the output is more consistent and accessible. 

The difference between a generic AI prototype and one built with MDS context is significant. Without context, AI tools default to their own assumptions: wrong colours, hardcoded values, generic component patterns that don't match Moodle's Bootstrap-based architecture. When you give an AI tool the right context (MDS tokens, component conventions and usage rules), the output reflects decisions that have already been made, rather than inventing new ones.

The more context you give an AI tool, the better the output. MDS provides that context: tokens, component conventions, and usage rules.

---

### How to use the MDS in AI prototyping tools

AI prototyping tools are evolving rapidly, and the best ways to integrate MDS into each one are still being explored. We'll be adding detailed guidance for specific tools as we test and validate what works.

#### Using the Moodle Design System in Claude Design 

1. Navigate to Design Systems 
2. Choose ‘Create new Design System’

![](zeroheight://image/8478304/56641cd96ea603a19cc306a29b019065a555dcba30540713c75c5715828904f5)

3. Give the system a name ‘Moodle Design System’
4. Link the Moodle Design system [GitHub repo link](https://github.com/moodlehq/design-system) and connect your GitHub

![](zeroheight://image/8478304/fab3069a3d42e06155ffda15f6283762e3c15e6a0cf269a3626ec3557bce1849)

5. Click continue to generation and let Claude do it’s thing
6. Once you’re done, you’ll need to verify what it’s built and you will get something like this 

[https://drive.google.com/file/d/1OH6w5aMKJbcIJqG9fkKipMnJfC8ad2qw/preview](https://drive.google.com/file/d/1OH6w5aMKJbcIJqG9fkKipMnJfC8ad2qw/preview)

---

---

# Design
## Anatomy

![](zeroheight://image/8729151/89b669a00d81cac5df08b2f87a8998668575a2395410437c85a5d4b9fd3dbd06)

1. **Breadcrumb item (link):** A text link. It represents a page above the current page and takes the user there when clicked.
2. **Breadcrumb item (current):** Bold, plain text, not a link. It represents the page the user is on now and does not trigger navigation.
3. **Separator:** A forward slash character. It sits between two items and shows the order of the hierarchy.
4. **Overflow menu:** An ellipsis ("...") styled as a link. It only appears on the "More than 4" items variant, right after the first item, and opens a dropdown of the ancestor pages hidden between the first item and the pages closest to the current page.

**Note:** In code, the separator should be CSS-only (for example, a ::before on each item), not a real element in the DOM. It's shown in Figma as a real Separator instance for design purposes only. Because it isn't in the DOM, screen readers won't announce it.

![](zeroheight://image/8729151/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## States

Breadcrumb link items are built from the Link component. Hover, pressed, focus, and disabled behaviour for link items come from the Link component, not from breadcrumb itself. The current item and separators are not interactive, so they don't have these states.

| **States** | **Description** |
| :--- | :--- |
| ![](zeroheight://image/8729151/20bd445640d9100e49d635d1f4fb47586e6027106ade61f44b4b93c03b2e491e) | **Default (link item)** This is the resting state for a breadcrumb item that links to a page above the current one. Shown as a link, followed by a separator. |
| ![](zeroheight://image/8729151/685bdf8dfbc4e2322fef8929235e34e77ecf10a801e1cb69a2553f105f744ac8) | **Default (current item)** This is the last item in the trail. It shows the page the user is on now and is not a link. Shown as plain text. |
---

# Code
## Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-breadcrumb--default)

Props and types (TypeScript API): [Breadcrumb.d.ts](https://unpkg.com/@moodlehq/design-system/dist/components/breadcrumb/Breadcrumb.d.ts)

Full list of props and their types for Breadcrumb.

![](zeroheight://image/8729151/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Accessibility implementation

### Keyboard interaction

This component has no keyboard interaction of its own. It responds to the focus state of its trigger element.

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus to the next link item or the overflow menu trigger. |
| `Shift + Tab` | Moves focus to the previous link item or the overflow menu trigger. |
| `Enter` or `Space` | Activates the focused link, or opens the overflow menu dropdown. |
| `Escape` | Closes the overflow menu dropdown if it's open. |

---

### ARIA

* Role: Navigation
* Required attributes: 
    * `aria-label="Breadcrumb"` on the container
    * `aria-current="page"` on the current (last) item
* Optional attributes:
    * `aria-expanded` on the overflow menu trigger, to show whether the dropdown is open
    * `aria-haspopup="menu"` on the overflow menu trigger

![](zeroheight://image/8729151/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## GitHub

<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/tree/main/components/breadcrumb">
**GitHub: Breadcrumb**
</shortcut_tile>
</shortcut_tiles>
---

# Usage
## Overview

![](zeroheight://image/8729151/e1272ca73ec8180d874483398741d4d23cca031c7eef0371895aa49ad8ef1618)

Breadcrumb lets a user see the path from the top level down to the current page, and jump back to any page in between in a single click, instead of navigating back one level at a time. Use it on any page that sits two or more levels deep.

### When to use

* Use when a page sits inside a hierarchy of 2 or more levels and the user needs to see and jump back to parent pages.
* Use to show the user's current location within a section, course, or content structure.
* Use instead of tabs or pagination when the relationship between pages is hierarchical, not sequential or parallel.

<callout background="4" fullWidth="true">

### ❌ When not to use

* Don't use this for top-level navigation between unrelated sections, use tabs instead.
* Don't use this for moving between pages in a sequence, use pagination instead.
* Don't use this on a page with only one level of hierarchy. There's nothing to show.

</callout>

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8729151/3ea8b1e9ddff7ba1e9e5f7039ed1da8822551f608f51b5ee3919a50b8fdec375) |   | SHOULD use breadcrumb for parent and child pages in a real hierarchy. |
| Don't | ![](zeroheight://image/8729151/31cca64b954a840cf26212fbfa03b07ccd3ef53c3b5bb7a223db8cfa021cf452) |   | MUST NOT use breadcrumb to switch between unrelated top-level sections. |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8729151/038abfdbcb1053bd6590888461eefca2e618b59c7bb95f123fec9beb02634f05) |   | SHOULD use breadcrumb on pages that sit 2 or more levels deep. |
| Don't | ![](zeroheight://image/8729151/544514ae07ff1efa1c2822b594d797d33f4b3a2f33894656f2a1bf0ab3d67b2a) |   | SHOULD NOT use it on a top-level page with no ancestors, like a course page. |

![](zeroheight://image/8729151/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Variants

### Items

There’s no prop for this. It’s the number of entries in the `items` array. The overflow menu shows on its own when there are more than 4.

This property controls how many breadcrumb items show in the trail.

| **Variant** | **When to use** |
| :--- | :--- |
| ![](zeroheight://image/8729151/64cb68cdaa569eba443a0693179f09a45f6f45c6d24fefc7e394da6a1af56080) | **2** Use when the page sits one level below the top. |
| ![](zeroheight://image/8729151/2e439858f718dda52c13892bc2833a10ddf8cde0d514ad64e31cde1f2f01198e) | **3** Use when the page sits two levels below the top. |
| ![](zeroheight://image/8729151/d5b2049c11888358f1d63914d051a114f2d33fbc8310ada582fd6baf0c51496a) | **4** Use when the page sits three levels below the top. |
| ![](zeroheight://image/8729151/a6a8b14a2979a7924956da625139b18ec9132396a4df42982cb5bd93662de273) | **More than 4** Use when the page sits more than four levels below the top. Shows the first item, the overflow menu, and the 2 ancestor pages closest to the current page. The overflow menu always shows for this variant. |

---

### Truncation width

There’s no prop for this in the React component. Link items shrink and truncate on their own to fit the space.

This property controls how narrow every link item's label can get before it truncates with an ellipsis. It doesn't affect the current (last) item, which always stretches to fill the remaining space and only truncates if there's truly no room.

| **Variant** | **When to use** |
| :--- | :--- |
| ![](zeroheight://image/8729151/3d84ee1e1deb826abbb30400c46c07601533f4f8675e3433ac9374a6c8f658c9) | **None** Use for the default trail width. Link items keep their natural width and don't truncate. |
| ![](zeroheight://image/8729151/6ea9785a278e86b7725dea6e405f35a6610809976437f54009903222251a6927) | **xl** Caps link items to 200px. |
| ![](zeroheight://image/8729151/20d0bba79c2a17b1a278d1eec0949b22a27164d2d663e05d7f8fb1af6b021f29) | **lg** Caps link items to 160px. |
| ![](zeroheight://image/8729151/137a372f0235f13dbf6da6d199f95eabd2fa635a79f5532292a8b9730096050d) | **md** Caps link items to 120px. |
| ![](zeroheight://image/8729151/9e1bf521f41b2402eccaf403a22165dbb82e4ff30aebcca041235722259bbaf5) | **sm** Caps link items to 80px. |
| ![](zeroheight://image/8729151/b706b06eb1214ba157799ff45a31ba621b92ce84b42349a7938c5c41c5ea1e4b) | **xs** Caps link items to 40px. |

![](zeroheight://image/8729151/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Guidelines

### Content design

#### Content structure and constraints

* Each item needs a short label, ideally one to three words.
* The current (last) item's label truncates with an ellipsis if it's too long to fit the available width. This is always on, no matter the "Truncation width" setting. Link items keep their natural width and don't truncate unless "Truncation width" is set to xs, sm, md, lg, or xl.
* Keep ancestor labels short so the trail doesn't run out of horizontal space.
* There's no defined maximum for the number of ancestor items shown in the overflow dropdown.

#### Content behaviour

* Breadcrumb is designed to never wrap to a second line, at any width. When the combined width of all the items is more than the available space, increase the "Truncation width" setting so link items shrink and truncate with an ellipsis. Show a tooltip with the full label on hover or on keyboard focus for any truncated item.
* If there are more than 4 levels in the hierarchy, use the "More than 4" items variant. It collapses the hidden ancestor pages into the overflow menu automatically.
* The last item never links anywhere, even if its label matches an earlier item's label.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8729151/30a2c445b9c8fffb79f23c3b07d4b9f842e213b4f5a0743c19646c538452367e) |   | SHOULD turn on truncation when the trail doesn't fit, and show a tooltip on hover or keyboard focus. |
| Don't | ![](zeroheight://image/8729151/c872e4031526d343b7cfcedb597bb70246a336cfd16faeab726b65a41bc868ad) |   | SHOULD NOT let the trail wrap onto a second line. |

#### Copywriting

* Use the actual page title as the label, not a shortened or renamed version, so the trail matches what the user expects.
* Use sentence case for labels, matching the page title.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8729151/e206c48f39e48935675b722f7120759f5bc8743d4574d6a60eb2f62f539a11ac) |   | SHOULD let long ancestor labels truncate with an ellipsis. |
| Don't | ![](zeroheight://image/8729151/56e05cb8ac265d46ae77170a62f6b8c22953acae046b5ca6b6c9142a4d53ae28) |   | SHOULD NOT abbreviate or rename a label by hand to make it fit. |

---

### Layout and spacing

* Place the breadcrumb trail above the page title, left aligned with the main content column.
* Don't stack more than one breadcrumb trail on a single page.

---

### Breakpoints and responsive behaviour

* The trail doesn't wrap to a second line, and link items keep their natural width unless "Truncation width" is set, so a full trail is more likely to run out of room on a narrow viewport than on desktop.

---

### Truncation width strategy

The goal at every breakpoint is to show as much of each label as possible, including the current page. Only cap a label's width when there's genuinely no room to show it in full.

* The current (last) item is not affected by "Truncation width". When there's enough room, it shows its full label just like the ancestor items do, at whatever width that content needs. It only truncates once space genuinely runs out. 
* Breadcrumb never wraps to a second line but watch for the trail exceeding the available width. For ancestor link items, start with "Truncation width" set to None. If the whole trail fits within the available width at that breakpoint, leave it there. This shows every label in full.
* If the trail doesn't fit, step down the scale one size at a time (XL 200px, then LG 160px, then MD 120px, then SM 80px, then XS 40px), and use the largest size that still keeps the trail within the available width. Don't jump straight to the smallest option.
* Check this at every breakpoint you design for, since the number of items and the available width both change how much room each label has. A width that fits on desktop may need to drop a size or two on a narrow viewport.
* These six widths are fixed pixel values in the Figma file, not a formula. The real implementation in code should use a fluid cap that recalculates based on the actual space available at render time.

---

### Interaction behaviour

* Link items and the overflow menu are clickable. The current item is not.
* The overflow menu opens a dropdown listing the hidden ancestor pages. Clicking outside the dropdown closes it.
* Touch target size and the open and close animation follow the base Link and Dropdown component patterns.

---

### Accessibility guidelines

#### Colour and contrast

* The link colour `--mds-text-link-primary-default` must meet WCAG AA contrast against the background it sits on.
* Don't rely on colour alone to separate the current item from link items. The current item's distinct styling, like bold text and no link interaction states, also signals that it isn't a link.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8729151/75eb7b619ac6813f5866ff313c9a419a48d507627586b244dfcc9952df25e930) |   | MUST show the current page as plain text. |
| Don't | ![](zeroheight://image/8729151/bc3a3f0f46aba065f6c6407333894835f739f0adb05aaddd9d6b9534c33c1f49) |   | MUST NOT style the current page as a link. |

#### Focus

* Focus should move through link items and the overflow menu in trail order, left to right. The current item is not focusable because it isn't interactive.

#### Labelling

* Wrap the whole trail in a landmark with an accessible label such as "Breadcrumb", so screen reader users can identify it as navigation.
---

---

# Code
## Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-link--default)

Props and types (TypeScript API): [Link.d.ts](https://unpkg.com/@moodlehq/design-system/dist/components/link/Link.d.ts)

Full list of props and their types for Link.

![](zeroheight://image/8647020/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Accessibility implementation

### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus to the link (only when enabled). |
| `Shift + Tab` | Moves focus to the previous interactive element. |
| `Enter` | Activates the link. |
| `Space` | Does not activate the link (native link behaviour). |

---

### ARIA

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

---

### Dynamic announcements

* Announcements rely on native link semantics:
    * screen readers announce the element as a link
    * when disabled, `aria-disabled="true"` communicates the unavailable state.

![](zeroheight://image/8647020/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## GitHub

<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/tree/main/components/link">
**GitHub: Link**
</shortcut_tile>
</shortcut_tiles>
---

# Design
## Anatomy

![](zeroheight://image/8647020/a0f80309f6651ab2ae808ed727633b4f2f259f1cb2fca971975a747f409f8552)

1. **Label**: the text that communicates where the link will navigate to. Always required.
2. **Underline**: appears on hover to reinforce that the text is interactive. Not present in the default resting state.
3. **Icon** (Optional): place before (startIcon) or after (endIcon) the label only when it adds meaning, not decoration. The most common use of an EndIcon is the External link indicator, signalling the destination opens in a new tab or leaves the site.

![](zeroheight://image/8647020/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## States

### Primary

| ![](zeroheight://image/8647020/4a6280f919e8c279090f067ba23ae776919f41af9d2aadf14f6a3aeb246e3aac) | **Default** The link's resting state. Confirm the label clearly describes the destination before any interaction begins. No underline. |
| :--- | :--- |
| ![](zeroheight://image/8647020/8b7a6bf9dfb5f08a8d44a4272d863b6ce8dee5aaeab2f5ea26c1f3ec5bd9aaea) | **Hover** Triggered when the cursor moves over the link. Don't suppress or override this state. Users rely on it to identify interactive text. The label changes colour and gets an underline. |
| ![](zeroheight://image/8647020/4b025eb47daebf1f2d80a9c4047056aa82a381a0ed89e7a6285e44357f4504ec) | **Active / Pressed** Triggered while the link is being pressed. Transitions away immediately on release. Don't hold this state. |
| ![](zeroheight://image/8647020/defdb9bb279c0fc453b547216e8eb7ff10f6b9148f68cbbdefc12fd12ca1e792) | **Disabled** Applied when the destination is genuinely unavailable. Don't use as a substitute for removing a link entirely. If the action will never be available, consider not rendering the link at all. No underline. |
| ![](zeroheight://image/8647020/a89ff50bfe2f4e0e721ad1baba9e4672158af8f285cfb6b390ae9dcc785594ac) | **Focus** Triggered via keyboard navigation (Tab key). Must remain visible on all backgrounds used in your layout. A 2px focus line shows under the link. |

---

### Secondary

| ![](zeroheight://image/8647020/c8a0ba79c0fedf522a6de7e07aae2d127461d13a46761996fad71075cf03dddc) | **Default** The link's resting state. Confirm the label clearly describes the destination before any interaction begins. No underline. |
| :--- | :--- |
| ![](zeroheight://image/8647020/108960c7689efb1f34cf2c7d2d85c279c12fe9124a3db8e4d1ec7fee7a53ba3e) | **Hover** Triggered when the cursor moves over the link. Don't suppress or override this state. Users rely on it to identify interactive text. The label changes colour and gets an underline. |
| ![](zeroheight://image/8647020/5ed7f5e08bf0c0dbab9025830bc0292a3bedacd50ac24159b02b1a0b7018fd04) | **Active / Pressed** Triggered while the link is being pressed. Transitions away immediately on release. Don't hold this state. |
| ![](zeroheight://image/8647020/e396a6488a57dfe94fe4640f1edfc10a9bd705fea02deddb02ca03cf435fe221) | **Disabled** Applied when the destination is genuinely unavailable. Don't use as a substitute for removing a link entirely. If the action will never be available, consider not rendering the link at all. No underline. |
| ![](zeroheight://image/8647020/cc2c9a7637ebae3b4d938d19331d197a4c75665a92f2d7f1778f01bf54afc0bf) | **Focus** Triggered via keyboard navigation (Tab key). Must remain visible on all backgrounds used in your layout. A 2px focus line shows under the link. |

---

### Inline

| ![](zeroheight://image/8647020/a9a4a20cf7b11e4b54266f70b0b3ecb46cdc5501245037189a914ef0934c3f98) | **Default** The link's resting state inside body copy. Underline is always present. |
| :--- | :--- |
| ![](zeroheight://image/8647020/98b7c50ac96f99f1556ac2588ed08d000934be85e262063a2ce10a1b2123e81b) | **Hover** Triggered when the cursor moves over the link. The label changes colour. |
| ![](zeroheight://image/8647020/5182c432295884f4e9514fe9078ab244ab09accd00db64075b3d44f4418f3c0b) | **Active / Pressed** Triggered while the link is being pressed. |
| ![](zeroheight://image/8647020/013cc78cd43d176b526cd37b1a0af7fd2f1e35ebc9877bc28158ce85a7f30b1b) | **Disabled** Rarely appropriate inline. A disabled link mid-sentence reads as broken text rather than as an unavailable action, and the reduced contrast can fail against body copy. Prefer rendering plain text and, if needed, explaining the unavailability in the sentence itself. No underline. |
| ![](zeroheight://image/8647020/36a2c5ce5cfea3edc777363b4d63382906b5be49c8fca5c96b3a8dc5ac3d85cb) | **Focus** Triggered via keyboard navigation (Tab key). Must remain visible on all backgrounds used in your layout. The underline is replaced by a 2px focus line. |
---

# Usage
## Overview

![](zeroheight://image/8647020/3d085753b541280c18fc59581386370f557402443981ce97296221cda66fbc1b)

Links let users navigate to another page, view, or resource. They communicate where the user will go when tapped or clicked, and they sit naturally within or alongside text content.

### When to use

* Use when the user needs to navigate to another page, view, or external resource.
* Use when the action belongs inline within a sentence or paragraph and should read as part of the text.
* Use when you need a low-emphasis navigation target that doesn't carry the visual weight of a button.
* Use the External link indicator when the destination opens in a new tab or leaves the current site.

<callout background="4" fullWidth="true">

### ❌ When not to use

* Don't use a link to trigger an action that changes state or submits data. Use a Button instead.
* Don't use a link styled to look like a button when the underlying behaviour is navigation only handle visual weight through the Button component, not by restyling a link.

</callout>

![](zeroheight://image/8647020/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Variants

### Variant

Set with the `variant` prop. If you leave it out, or pass a value that isn’t listed here, you get `primary`.

| **Variant** |   | **When to use** |
| :--- | --- | --- |
| ![](zeroheight://image/8647020/c6f01282d14ba2264bcd1c05f1c379c8b8d63fc99efd709c067e1e671c755acf) |   | **Primary (default)** The default link colour for most navigation. Use for standard inline and standalone links. |
| ![](zeroheight://image/8647020/f5d68f4aebc8a655b04bd61ded63818fb1e4f090bb6cf75f9e796f6632dca6e2) |   | **Secondary** Lower-emphasis links that need to be present but shouldn't compete with primary links or surrounding content. |
| ![](zeroheight://image/8647020/3be5fb1eca84192b76d1a3d79a47a9901233a16d82da728135e76bfa4a113fb2) |   | **Inline** Links that sit inside a sentence or paragraph of body copy. Always underlined so they stay distinguishable from the text around them, and they inherit the surrounding type rather than setting their own. |

---

### Icon

The link has 3 icon configurations. Primary and Secondary links can use any of them. Inline links only show an `endIcon`, so a `startIcon` on an inline link won’t appear.

| **Variant** |   | **When to use** |
| --- | --- | --- |
| ![](zeroheight://image/8647020/d47496aac090b891b1ddfd2ffeddd0aab07cdbcbb55294fcdd34476369cec17d) |   | **No icon (default)** Use for inline links and most standard navigation. |
| ![](zeroheight://image/8647020/4edf6e66d2348d9f28029f994c76f763b46f834998f53a7dfc2394573b037725) |   | **StartIcon** Use when a leading icon adds clarity, such as a download or back-navigation icon before the label. |
| ![](zeroheight://image/8647020/ed5765cd92da04978d5995bce516ffcc4b63d3a9a888c880d4c210a41349eb4a) |   | **EndIcon** Use when a trailing icon clarifies the destination. The External link indicator is an EndIcon used when the link opens in a new tab or leaves the site. |

![](zeroheight://image/8647020/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Guidelines

### Content design

#### Content structure and constraints

* Labels support text only. Links may wrap to a second line when they appear inline within a paragraph this is expected for inline use.
* Recommended label length for standalone links: 1–4 words. Inline links can be longer where the link text describes the destination.
* Links support a StartIcon (prefix), an EndIcon (suffix), or no icon. Don't combine StartIcon and EndIcon in the same link.
* When using the External link indicator, it appears as an EndIcon and signals that the destination opens in a new tab.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8647020/ca5825cdeb0f15f73ce1fc41cc60fb2f9aebf81bd8d5e0bffc7dd6171e373eaa) |   | SHOULD use a single StartIcon or EndIcon, not both, to keep the link's direction of meaning clear. |
| Don't | ![](zeroheight://image/8647020/4a6fc08d9c934068a4166f10979adb847ee45117158460056e92975e41919cf1) |   | MUST NOT combine a StartIcon and EndIcon on the same link. It isn't supported and it confuses the action. |

#### Content behaviour

* The link width is determined by the label length (Hug behaviour).
* Inline links flow with the surrounding text and wrap naturally at line breaks.

#### Copywriting

* Use sentence case. Don't capitalise every word.
* Make the label describe the destination, not the mechanism. "View course settings" is stronger than "Click here" or "Read more".
* Be specific. Link text should make sense when read out of context.
* Don't use punctuation at the end of a standalone link label.
* For external links, make the destination clear so users know they're leaving the site.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8647020/99b77f23d142daccd99b39cd29ea65309b86d77f998c6bf39053eea1dad6bf02) |   | SHOULD describe the destination in sentence case, e.g. "View grading criteria" or "Download assignment brief". |
| Don't | ![](zeroheight://image/8647020/541eadf073d05e1ff6c5e5a6d7a762e8e54a57f40ff7fdac1c38e77704e9281b) |   | MUST NOT use vague labels like "Click here" or "Read more". They mean nothing out of context for screen reader users. |

---

### Layout and spacing

* Inline links sit within the text flow and inherit the line height of surrounding content.
* Standalone links can stand on their own line, optionally paired with a StartIcon or EndIcon.
* Avoid placing multiple links so close together that they're hard to distinguish as separate targets.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8647020/5de55a3b4129af66d7d92eecbe59f2b3e1a9d7c79448eb8354ad16491d0a8ec0) |   | SHOULD give standalone links enough spacing so each one reads as a separate target. |
| Don't | ![](zeroheight://image/8647020/c62afa96f51314eee7f3d5ee8253f5e033b61da215e8b9c95149318089d8fe0d) |   | SHOULD NOT place 2 standalone links back-to-back with no spacing. They read as one target. |

---

### Responsive behaviour

* Inline links wrap with their surrounding text at all breakpoints.

---

### Interaction behaviour

* Cursor: pointer on hover, not-allowed when disabled.
* Use disabled state only when the action is genuinely unavailable.

---

### Accessibility guidelines

#### Colour and contrast

* Link text meets 4.5:1 contrast ratio against its background.
* Disabled state contrast is intentionally reduced. Don't rely on disabled alone to communicate unavailability to screen reader users. Supplement with `aria-disabled` or accessible copy.

#### Focus

* The focus ring must be visible on all background colours used in your layout. Avoid placing buttons on dark backgrounds where the focus ring becomes invisible.

#### Labelling

* Always provide descriptive link text. Avoid "Click here" or "Read more" as the sole link text.
* For external links, announce that the link opens in a new tab via accessible copy or an aria-label so screen reader users aren't surprised by the context change.
---

---

# Code
## Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-navpill--default)

Props and types (TypeScript API): [NavPill.d.ts](https://unpkg.com/@moodlehq/design-system/dist/components/nav-pill/NavPill.d.ts)

Full list of props and their types for Nav pill.

![](zeroheight://image/8648336/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Accessibility implementation

### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus into the nav bar as a single tab stop |
| `←` `→` | Navigates between items within the nav bar |
| `Tab` (again) | Moves focus out of the nav bar to the next interactive element |
| `Enter` | Activates the focused nav pill link |

---

### ARIA

* Role:
    * Nav Pill is a native link.
* Required attributes:
    * `href` is required.
    * `label` is required and provides the visible accessible name.
* Optional attributes:
    * `aria-current="page"` is applied automatically when selected is true.
    * `aria-disabled="true"` is applied automatically when disabled is true.
    * When disabled, keyboard focus is removed with tabindex -1 and link interaction is blocked.
    * If selected and disabled are both set, disabled is ignored so the current page item remains an active, identifiable link.

---

### Dynamic announcements

* Screen readers announce state using native link semantics plus `aria-current` for the active item.
* Disabled state is announced through `aria-disabled` when applicable.

![](zeroheight://image/8648336/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## GitHub

<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/tree/main/components/nav-pill">
**GitHub: NavPill**
</shortcut_tile>
</shortcut_tiles>
---

# Design
## Anatomy

![](zeroheight://image/8648336/4dd3822e0a031cf531969baa74887cd85f18418025d97e02306f68ba5bf198e0)

1. **Container**. the bounding shape of the item. Transparent at rest; fills when hovered, pressed, or selected.
2. **Label**. the text that identifies the destination. Always required.
3. **Selected indicator.** *(Selected state only)* A dot that appears to the left of the label when the item is the current page.

![](zeroheight://image/8648336/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## States

| **States** | **Description** |
| :--- | --- |
| ![](zeroheight://image/8648336/39a4644489aa7168a78c24a0a28f29917bc3052340dac0326ace1e41d5763ef7) | **Default** The resting state. No interaction has occurred. Transparent background. |
| ![](zeroheight://image/8648336/1eaed615d6244cd9986d4a185fbd7dfd2a52d889c70afb132ef21a70f0460dd8) | **Hover** Triggered when the cursor moves over the item. Don't suppress this state. Users rely on it to identify interactive elements. |
| ![](zeroheight://image/8648336/e43f1c1f5b552c3b26583f69f9914e1df35abb01acc86db865c0087063875bd3) | **Focus** Triggered via keyboard navigation. Must remain visible on all backgrounds used in the nav bar. A 2px focus ring shows around the item, offset from its edge. |
| ![](zeroheight://image/8648336/735859e94e4ddd022a27317238b866e1e9b9b103da4e99e160667a9033b4e175) | **Pressed** Triggered while the item is being clicked or tapped. Transitions away immediately on release. |
| ![](zeroheight://image/8648336/045cd95a9f83594858ff88169376ec98ae873319d91a6cde3ed69dfc352af66e) | **Disabled** Applied when the destination is unavailable in the current context. Disabled items are removed from the keyboard tab order. Use sparingly. If a destination is permanently unavailable to a user, consider hiding the item entirely. |
| ![](zeroheight://image/8648336/62655191c4838aaa6d161912fdf27b2a7d5a8f234b5b314396c22d99c0f6fbd8) | **Selected** Applied to the item that represents the current page. Set programmatically via `aria-current="page"`. Don't apply this state manually in design. An indicator dot shows. |
| ![](zeroheight://image/8648336/f75a6b10b324b5813a8a444e6be9874100b27b757df7ccbaf1e1bc3896655f93) | **Selected + Focus** Triggered via keyboard navigation when focus lands on the current page item. Required. Don't suppress the focus ring on selected items. Looks the same as Selected, plus a 2px focus ring around the item. |
---

# Usage
## Overview

![](zeroheight://image/8648336/1295f8430b4dde4fe15984e0ec9d08fbe437e4cc36386efc5ae0d1750aaffd16)

Nav pill is the individual link item used within a horizontal navigation bar. It represents a single destination, displaying a label and, when selected, a dot indicator that marks the current page. The component is scoped to the single item; grouping, layout, and overflow behaviour are handled at the implementation layer.

### When to use

* Use within a horizontal nav bar when users need to move between distinct pages or sections, for example, course navigation or site administration sections.
* Use the Selected state to mark the current page. Don't replicate this visually with custom styling; always rely on the component state.
* Use when the navigation destinations each correspond to a distinct URL.

<callout background="4" fullWidth="true">

### ❌ When not to use

* Don't use to trigger in-page behaviour without a URL change. Use a Button instead.
* Don't use for tab switching between content panels on the same page. Use the Tabs component instead.
* Don't use nav pill in isolation. It's designed to be used within a `nav-bar`

</callout>

![](zeroheight://image/8648336/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Variants

Nav pill has no variants. Selected and disabled are states. See States on the Design tab.

![](zeroheight://image/8648336/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Guidelines

### Content design

#### Content structure and constraints

* Labels should be short and descriptive, ideally 1–3 words.
* Use clear, destination-oriented language. The label should name the page or section the user will land on.
* Don't use verbs. Nav pill labels are destinations, not actions.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8648336/c864f90abba28c6596892c05ac97376513c282bb4561dd57e01ec134f1e2d878) |   | SHOULD keep labels to 1 to 3 words. |
| Don't | ![](zeroheight://image/8648336/de7d2627680223e090fe44212644b376e521b91c7e4d85be9bdd677155d7018c) |   | SHOULD NOT use full sentences or verb phrases as labels. |

---

### Layout and spacing

* Nav pills in a group are arranged horizontally, in a single row.
* Each item's width is determined by its label length. Don't apply fixed widths.
* Don't stack nav pills vertically. Use a different navigation pattern for vertical navigation.
* When the group overflows the available width, hidden items move to a "More" overflow menu. This behaviour is handled at the implementation layer, not by the Nav Pill component itself.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8648336/5047fe8440d8c2766ebb5312e6210a120d88bdb8ede4d4bab4a144c2f4311102) |   | SHOULD let each item's width follow its label length. |
| Don't | ![](zeroheight://image/8648336/5f31c41bfb86e5e1bb1b8125f96dd7af8ae0d428a56ae0c191be029385d31c32) |   | SHOULD NOT apply equal or fixed widths to all items. |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8648336/9442d28ea6a538a7f34293fee6508ce1adbfb07720c451af499efb0193c4e8f1) |   | SHOULD arrange nav pills in a single horizontal row. |
| Don't | ![](zeroheight://image/8648336/aa08ac2949d1c4ba2250648dfccb23b4e41cd7b9bc679b3c53242a16da6373fc) |   | SHOULD NOT stack nav pills vertically. Use a different navigation pattern instead. |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8648336/1530c8263abdfe6ae14c187266795d0ccc89741c649a6ea497b3f34b1f8ad8be) |   | SHOULD left-align the nav pill group within its container. |
| Don't | ![](zeroheight://image/8648336/117db021968be204471717c6e1b9273b9181db1abc41cef1ed270e819c9ae58c) |   | SHOULD NOT stretch or spread nav pills to fill the full container width. |

---

### Breakpoints and responsive behaviour

* The component's size and styling remain consistent across all breakpoints.
* On narrow viewports, the number of visible items is controlled by the implementing nav bar pattern. The component itself has no responsive override.

---

### Interaction behaviour 

* Clicking or tapping a nav pill navigates to the linked page. The component doesn't toggle the Selected state. The selected item is set by the application based on the current page URL.
* The Selected state is always determined programmatically. Don't apply it manually in design mockups unless you're accurately representing the current page.
* **Cursor:** pointer on hover; not-allowed when disabled.
* **Keyboard:** the nav bar behaves as a single tab stop. Tab moves focus into and out of the group as a unit. Arrow keys navigate between items within the group. This is intentional. Don't design interactions that assume Tab will step through each item individually.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8648336/19a42875a2f6a7bb8bb5d95ffdb76298a106969a8c7a6f80410a1ea402bffaae) |   | MUST show only 1 item as Selected per nav bar: the current page. |
| Don't | ![](zeroheight://image/8648336/db932b7b16ea38bd347da375afcf122a6929f823ede56394c55c2dc733cefb4c) |   | MUST NOT show more than 1 item in the Selected state at the same time. |

---

### Accessibility guidelines

#### Colour and contrast

* The selected indicator (dot) alone must not be the only signal for the current page. `aria-current="page"` must also be applied on the selected item.
* Disabled state contrast is intentionally reduced. Don't rely on the disabled state to communicate unavailability to screen reader users. Supplement with `aria-disabled`.

#### Focus

* The focus ring must remain visible on all background colours used in the nav bar.
* The Selected + Focus state must be visually distinct from the Selected state. Don't remove the focus ring on selected items.

#### Labelling

* Every nav pill must have a visible text label. Icon-only nav pills are not supported by this component.

![](zeroheight://image/8648336/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Related

#### Alternatives

<shortcut_tiles>
<shortcut_tile url="https://design.moodle.com/98292f05f/p/877c50-button" page-id="8332388">
**Button**

use when the action triggers an in-page behaviour without navigation.
</shortcut_tile>
</shortcut_tiles>

#### Used with

<shortcut_tiles>
<shortcut_tile url="https://design.moodle.com/98292f05f/p/8381b3-dropdown" page-id="8742550">
**Dropdown**

the "More" overflow mechanism uses a Dropdown component to house hidden nav items. These are separate components; the Nav Pill component itself does not include dropdown behaviour.
</shortcut_tile>
</shortcut_tiles>
---

---

# Code
## Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-pagination--default)

Props and types (TypeScript API): [Pagination.d.ts](https://unpkg.com/@moodlehq/design-system/dist/components/pagination/Pagination.d.ts)

Full list of props and their types for Pagination.

![](zeroheight://image/8505350/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Accessibility implementation

### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus to the next interactive page item |
| `Shift + Tab` | Moves focus to the previous interactive page item |
| `Enter` | Activates the focused page item |
| `Space` | Activates the focused page item (anchor fallback) |

---

### ARIA

| **Attribute** | **Element** | **Value** | **Notes** |
| --- | --- | --- | --- |
| `aria-label` | `<nav>` | `"Pagination"` | Identifies the nav landmark |
| `aria-current` | `<a>` (active item) | `"page"` | Applied to the current page item only |
| `aria-disabled` | `<li>` (disabled item) | `"true"` | Applied to disabled prev/next <li> |
| `aria-hidden` | `<svg>` (icon) | `"true"` | Hides decorative icons from screen readers |
| `tabindex` | `<a>` (disabled item) | `"-1"` | Removes disabled items from tab order |

---

### Dynamic announcements

* Screen readers announce navigation and page selection through native button semantics plus `aria-current="page"` on the active page.
* If your product requires explicit verbal feedback like “Page changed to 4,” add an app-level live region message in the consuming context.

![](zeroheight://image/8505350/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## GitHub

<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/tree/main/components/pagination">
**GitHub: Pagination**
</shortcut_tile>
</shortcut_tiles>
---

# Design
## Anatomy

![](zeroheight://image/8505350/29c51a635078c9b6eb5d61c206f1915ee81b3f168747e407a07987fd56f0e8b9)

1. **Previous button**: a directional control that moves the user to the preceding page. Always present. Shown in the disabled state when the user is on the first page.
2. **Page link item**: a numbered item the user can click to navigate directly to that page.
3. **Current page item**: the numbered item that represents the page the user is currently on. Always exactly one current page item in the bar.
4. **Ellipsis item**: a non-interactive item that indicates truncated pages. Appears when the total number of pages exceeds the visible range.
5. **Next button**: a directional control that moves the user to the following page. Always present. Shown in the disabled state when the user is on the last page.

![](zeroheight://image/8505350/688d87aefe143d2bd5ebcccd784558b5e492f6458bd7ee8871dd9d33bd8b189a)

6. **Grouped previous / next buttons**: a style variant of the previous and next buttons used in minimal paging contexts where no page numbers are shown. 

![](zeroheight://image/8505350/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## States

### Page link item

| **State** | **Description** |
| --- | --- |
| ![](zeroheight://image/8505350/50a5ca1f96d6cd0a9ae8e38ecdb0a7afadfebf661fdfa38f30888e94ef38d854) | **Default** The item is available and can be navigated to. This is the base state for all page items that aren't the current page. Transparent item. |
| ![](zeroheight://image/8505350/5bc6892252d885324168da58a4412052dd29977d48da41f0bc3733901c578158) | **Hover** The cursor is over the item. |
| ![](zeroheight://image/8505350/faeb7bdf6551d6a91d6cd1d5194c9fbfb1cffd484e8c8d68ba3bcc9cccd83a81) | **Focus** The item has received keyboard focus. A visible focus ring appears around the item. |
| ![](zeroheight://image/8505350/1c10a2e495c1f7909c818213256ff6fe08384098a1ca13d167c4e90230121c41) | **Pressed** The item is being actively clicked or tapped. |
| ![](zeroheight://image/8505350/5ee0c190f7c3f789cd0d25521cfbe22696d828af7b783e405946f9479b2b6301) | **Disabled** The item can't be interacted with and is removed from the tab order. Only applied to ellipsis or truncation items. Page link items don't use the disabled state. If a page isn't available, remove it from the bar entirely. |

---

### Current page item

| **State** | **Description** |
| --- | --- |
| ![](zeroheight://image/8505350/4c3a3b977254bf6bf45adcdf4a2dc5d2bd033f62382b3ed546285d8393882728) | **Default** Identifies the page the user is currently viewing. There's always exactly one current page item in the bar. |
| ![](zeroheight://image/8505350/23b0b878a98dba4a3abca16cf5cce68f681892fd970ae4eb632c51b50ac7c0c4) | **Hover** The cursor is over the current page item. The item remains visually distinct as the current page. |
| ![](zeroheight://image/8505350/3583e46188a79ffa97ca4299a04ba2745b2f57d5b26402ed3500ccd006a7df61) | **Focus** The current page item has received keyboard focus. The focus ring appears on top of the active background. |
| ![](zeroheight://image/8505350/422b15de39b4950e1d0985b66d68fd861f89d389dab97839583fde372c64915a) | **Pressed** The current page item is being actively clicked or tapped. |

---

### Previous and next buttons

| **States** | **Description** |
| --- | --- |
| ![](zeroheight://image/8505350/20559500bc48e88a2aa5bafbe45b93aab8b1e67923df97e028ebb63659282146) | **Default** The control is available. Clicking or tapping moves the user one page in the corresponding direction. Transparent button. |
| ![](zeroheight://image/8505350/56701dba595fde5b05046c2b3093896d4c609f6ab42e463b7974c9160d0ed562) | **Hover** The cursor is over the control. |
| ![](zeroheight://image/8505350/cae5cfa8675cef300cda54d2345894ed15a90732d7cc5b5582eaf14db3e45fec) | **Focus** The control has received keyboard focus. A visible focus ring appears around the item. |
| ![](zeroheight://image/8505350/a8dec0cc696601bca1670db706df99c9045a0fc294e731ded3643807751d46d6) | **Pressed** The control is being actively clicked or tapped. |
| ![](zeroheight://image/8505350/39e1f2fd23578f613cbb1cc11634714b865d44f80d83bffb6a11450ba9084837) | **Disabled** Applied to the previous button on the first page, and to the next button on the last page. The control is visible but can't be interacted with and is removed from the tab order. Don't hide the control. Keeping it visible communicates the boundary of the pagination range. |

---

### Grouped previous and next buttons

| **States** | **Description** |
| --- | --- |
| ![](zeroheight://image/8505350/f5c5e595ae3053dd532aa540bfb2170a11f6df19b9296cd3b0889de940cc5ef1) | **Default** Both controls are available. Clicking or tapping either moves the user one page in the corresponding direction. Both buttons have a border. |
| ![](zeroheight://image/8505350/95f7272542b7f76f8e058687c866c85505701892d9ab189e4aa04b84818dfcab) | **Hover** Only the hovered control changes state. The other remains in its current state. |
| ![](zeroheight://image/8505350/dca80a12dee61dbcbef22a00c15897c5c6e24db9602ee674775e8f371c234d4e) | **Focus** The focus ring appears on the focused control individually. |
| ![](zeroheight://image/8505350/db48ec89920ca3661e09552d8f2961be11de6ca3ffc8d725f6fa814cc36ddbdc) | **Pressed** Only the pressed control changes state. |
| ![](zeroheight://image/8505350/c9b38ceefdc1b51588e3c779585dac07563dc48f6ee6e83e946766ccf7b35d3c) | **Disabled** Applied to the previous button on the first page, and to the next button on the last page. The disabled control renders with muted styles; the other control remains in its default state. |
---

# Usage
## Overview

![](zeroheight://image/8505350/d1dbdac3b49360c8871992b6cef829e09aab846ab45fc8056b93422da16717ba)

Pagination enables users to navigate between content pages, dividing large between pages of content, breaking large sets of content into discrete pages, showing where users are within this set and giving them controls to move to a specific page, or step forward and backward through the sequence. 

Pagination always shows previous and next controls, and optionally shows numbered page items and ellipsis truncation when the total page count exceeds the visible range.

### When to use

* Use when content is split across a finite, known number of pages.
* Use when users may want to jump to a specific page, not just move sequentially.
* Use when the total page count is 2 or more.

<callout background="4" fullWidth="true">

### ❌ When not to use

* Don't use for infinite scroll or load-more patterns. Pagination implies a known, finite set.
* Don't use when there's only 1 page of content.
* Don't use as a step-by-step navigation indicator. Use a stepper or progress indicator instead.

</callout>

![](zeroheight://image/8505350/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Variants

### Style

Set with the `variant` prop. If you leave it out, you get `full`.

| **Variant** | **When to use** |
| :--- | :--- |
| ![](zeroheight://image/8505350/8837ebe130985041521bef965677b98df49f6d205ad8ca601fbbeb9b7e1ac5df) | **Default (`full`, default)** Full pagination bar: previous, page numbers, ellipsis, next. Use this when the total number of pages is known and the user needs to navigate to specific pages. |
| ![](zeroheight://image/8505350/45046fa4367dd4219ceb9f149a9a3f98735288879d76a4cd70eba47860c21d95) | **Grouped** Previous and Next buttons as a single unit, without page numbers. Use in compact layouts where there isn't room for the full navigation bar, for example, a pagination bar within a table or feed. |

![](zeroheight://image/8505350/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Guidelines

### Ellipsis truncation

* The pagination bar shows a maximum of 9 items between the previous and next controls, including page link items, the current page item, and ellipsis items.


![](zeroheight://image/8505350/967410b789934b2d490ea73f507d82dc10926b9446fe8a8400de4628a699c0f3)

* When the total number of pages is 8 or fewer, all pages are shown without truncation.

![](zeroheight://image/8505350/f0735f9a1ee236f7a19b7b30b1a933debe89bf3e55f4df009f9e2101bf0aae15)

* When the total number of pages is 9 or more, ellipsis truncation applies:
    * **Near the start**: show the first 7 pages, one ellipsis, and the last page.
    * **In the middle**: show the first page, one ellipsis, 2 pages before the current page, the current page, 2 pages after, one ellipsis, and the last page.
    * **Near the end**: show the first page, one ellipsis, and the last 7 pages.
* Don't show ellipsis when all pages fit within 8 items.

---

### Previous and next controls

* Previous and next must always be present, regardless of total page count or current page position. Disable them (don't hide them) when there are no more pages in that direction.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8505350/f6b77e21e570d542a61b8253772caa1d27f5841df4ca14c7e07e791023cc2c48) |   | SHOULD keep the previous button visible but disabled on the first page. |
| Don't | ![](zeroheight://image/8505350/79b4d5e951fd61ba6b47c262d5c14a0c4584bafcebe038f6478ca8918a98fdcb) |   | SHOULD NOT hide the previous or next button at the ends of the range. |

---

### Current page

* Mark exactly 1 page item as active at a time. The active item always reflects the page the user is currently viewing, not a selection or a hover state.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8505350/a0d2599741281a403c25195f7fc4721f5deb62c2cf57ef1c444f6ff32d2bff79) |   | MUST mark exactly 1 page item as the current page at a time. |
| Don't | ![](zeroheight://image/8505350/5bf67896f1ba92f4dcaaa6eb4b91b47a1ae027394839ff3d5281c91e96aa3a7b) |   | MUST NOT show more than 1 current page item at the same time. |

---

### Content design

#### Content structure and constraints

* Previous and next labels are always visually hidden. Only the icon is visible. Screen-reader text must say "Previous page" and "Next page" respectively.
* Page number labels are integers only. Don't add ordinal suffixes (no "1st", "2nd").
* Ellipsis renders as the horizontal ellipsis character (…), not 3 separate full stops.

#### Content behaviour

* When total pages change dynamically (e.g. after filtering), update the pagination accordingly. Don't keep the old page count visible.
* If the current page becomes out of range (e.g. after filtering reduces total pages), navigate to the last available page automatically.

#### Copywriting

* Screen-reader label for the nav container: "Pagination". Keep it short and unambiguous.
* Screen-reader text for page number items: "Page [n]" (e.g. "Page 1", "Page 4").
* Don't include "Go to". It's verbose and redundant.

---

### Layout and spacing

* Pagination items are separated by 4px
* Pagination doesn't set its own width. It wraps to the content width of its items.

![](zeroheight://image/8505350/f0c373294c09ba5b424941e48e19120f91d5aa2ae01556438ac7988da316188a)

---

### Breakpoints and responsive behaviour

* Pagination truncates and hides items based on viewport width and ellipsis logic applied to total page count. 

![](zeroheight://image/8505350/a167a237aaa83259c1bb0783ac63366018b88484b89e0ab28398d998415a40e4)

* On narrower viewports, the number of page link items between the ellipsis and the current page is reduced on both sides to fit the available width, ensuring the Previous and Next controls, first and/or last page items, ellipsis items, and current page item remain visible.
    * At 992px and up, the full 9-item bar is shown.
    * From 768px, the bar shows 7 items.
    * From 576px, the bar shows 5 items.
    * Below 576px, the bar switches to the grouped (prev/next only) style automatically, with no page numbers.

---

### Interaction behaviour

* Minimum tap target for page items: 36x36px.

---

### Accessibility guidelines

#### Colour and contrast

* All state colour combinations meet WCAG AA (4.5:1 minimum for text). 
* Don't use colour alone to indicate the active page. The aria-current="page" attribute communicates current position to screen readers independently of visual styling.

#### Focus

* All interactive page items (numbers, previous, next) must be reachable via Tab and show a visible focus ring. The focus ring uses a 2px border in `--mds-focus-default` with a 1px offset from the item edge.
* Disabled items must not receive keyboard focus. Set tabindex="-1" on the anchor element.
* Ellipsis items are non-interactive and must not appear in the tab order.

#### Labelling

* The <nav> element must have aria-label="Pagination" so screen readers can identify it as a distinct landmark.
* The active page item must have aria-current="page" on its anchor element.
* Previous and next icons are decorative. Set aria-hidden="true" on the SVG. Provide visually-hidden text on the anchor for screen readers.
---

---

# Usage
## Overview

![](zeroheight://image/8050559/3baf76bc9da0cfb2f168d257fa13f37b4e044d7395e357f02092226f76b23faa)

The activity icon component helps keep icon size, colour, and optional background tiles consistent across Moodle.

### When to use

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

![](zeroheight://image/8050559/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Variants

### Category

There’s no prop for this. The category comes from the `icon` you pick, for example `quiz` is always `assessment`.

Category controls the semantic colour tokens applied to the icon glyph and optional background tile.

| **Variant** | **When to use** |
| :--- | :--- |
| ![](zeroheight://image/8050559/98bd5662d3de33acc3288a54d359870311975ca76913a2540d8e7aea0763bf08) | **Assessment** Assessment activities such as graded work and evaluation. Container: `--mds-activity-icon-assessment-bg` when a tile is present |
| ![](zeroheight://image/8050559/3022830ffd707b356a55e1f6d5fac3b40382fca091fbf1b2fe58d12b8a41653d) | **Collaboration** Activities where learners work together. Container: `--mds-activity-icon-collaboration-bg` when a tile is present |
| ![](zeroheight://image/8050559/84746012148d1c8c7c31d13525f2c1b55122e8b3d601cff3515804d3c12b6a5b) | **Communication** Discussion and messaging based activities. Container: `--mds-activity-icon-communication-bg` when a tile is present |
| ![](zeroheight://image/8050559/b78fd62cb8bba1d30952368f352fad0563ec42a52b9facf6430113571a3da5d8) | **Interactive** Highly interactive activities. Container: `--mds-activity-icon-interactive-bg` when a tile is present |
| ![](zeroheight://image/8050559/d305cafe6f5e4bedfb9656f3d0c9742a6a1056cb36fc3b3840e739698f9d8d5c) | **Resource** Resources and files. Container: `--mds-activity-icon-resource-bg` when a tile is present |
| ![](zeroheight://image/8050559/7a6a43a3ec4c2a23c749064becc7b89c212d2802d17f1b4c6732a11193bded87) | **Other** Neutral or uncategorised types. Container: `--mds-activity-icon-other-bg` when a tile is present |

---

### Size

Set with the `size` prop. If you leave it out, you get `md`.

Size controls the icon glyph size. The glyph size stays the same for Auto, Default, and Large.

| **Variant** | **When to use** |
| :--- | :--- |
| ![](zeroheight://image/8050559/fa76c4d5778feca81e5cd104be19badac298b03d5da30dea77a7776566c7c281) | **SM** Dense UI such as tables or compact lists. |
| ![](zeroheight://image/8050559/6bfa83573a751db9b1bc71edc0dc840d768b3ff212ca7ec19179488ee99928d8) | **MD (default)** Default for most lists and rows. |
| ![](zeroheight://image/8050559/daf7e1224f507e8bd7939dd9c9474f9fca3485d46c2831139b33ebe7117977c1) | **LG** Cards and layouts where the icon needs more emphasis. |
| ![](zeroheight://image/8050559/fae71b20bf655fc070033f1e846c5ac116d3aae9be47a88125a810a8a7543ed8) | **XL** Activity chooser and prominent tiles where the icon is a key element. |

---

### Container

Set with the `container` prop. If you leave it out, you get `default`.

Container controls whether there is a tile background, and how large that tile is.

| **Variant** | **When to use** |
| :--- | :--- |
| ![](zeroheight://image/8050559/cd9be945134460b9ca959449c06cce5c68ddea4cba2d20cf5471c4c121235529) | **None** Icon only. Use when the icon is supporting content and you want a low noise layout. |
| ![](zeroheight://image/8050559/3ca0dfb99818d69008b613d2da39d7e605dd662b9473e320d968cea16f3dd338) | **Default** Tile background. Use when you need a consistent tile without strong emphasis. Border radius: `--mds-border-radius-xl` SM uses `--mds-border-radius-lg` |
| ![](zeroheight://image/8050559/1e885bb0fe1c2d120500bcbc1c9331ec31aed47f15912dcbdf1d13edd454a4e5) | **Large** Larger tile background. Use when the icon is a key visual element such as in the activity chooser tile. |

---

### Icon

Set with the `icon` prop, using the icon name, for example `assignment`, `forum` or `file-pdf`. It’s required.

Icon selects the symbol that represents the activity, resource, or file type.

| **Variant** | **When to use** |
| :--- | :--- |
| ![](zeroheight://image/8050559/a5f86bb725607943e6a72ccbecc1bbdeda22fe1894f1003a80c5b1957f0e9058) | **Activity module icon (for example `quiz`)** Use for Moodle activities such as Assignment, Forum, Quiz. |
| ![](zeroheight://image/8050559/1ce93bfdd9ec494a4a954630070da83d654332f24a434459e8a8308707976007) | **File type icon (for example `file-pdf`)** Use for files when the file type is known such as PDF, PPT, DOC, XLS. |
| ![](zeroheight://image/8050559/7130797035467ccfec162e255f4faa23cc40a9a20473de918bd9da7c66cf9e04) | **Generic File icon (`file-unknown`)** Use when the file type is unknown. |

![](zeroheight://image/8050559/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Guidelines

### Content design

#### Content structure and constraints

* Always pair the icon with a visible text label for the item name.
* Do not rely on icon shape or colour alone to explain meaning.
* Use the correct icon for the activity or file type. Do not swap icons to create new meaning.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8050559/f785d06de69a68c418babafc5911799756034a3f0eba38b86a66f644da5da1d9) |   | MUST pair the icon with a meaningful text label. |
| Don't | ![](zeroheight://image/8050559/2d6936446f583d443a76f7cb6cf840a2ee7d95da5528aa50d41a86a682368bdb) |   | MUST NOT rely on the icon's shape and colour alone to show the activity type. |

#### Content behaviour

* If the item type changes, update **Icon** and **Category** together.
* When using `Container: None`, the category colour is not visible on screen. Still set Category to match the activity type, because it controls the colour token applied to the icon glyph.
* If file type is unknown, use the generic File icon.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8050559/bfd8330403f8846a36c8b477656af5f90bf027d3908d54f5f465ce1bc2d13cf8) |   | MUST use the container colour that matches the icon's category. |
| Don't | ![](zeroheight://image/8050559/f49f4f3dc0a59000fef1a7a0cf029c08c52f6ba732d8e0729e472dd004c8587d) |   | MUST NOT use a container colour from a different activity category. |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![Icon and Category match even without a container](zeroheight://image/8050559/086e97ed5e552a968883ba40b0c86e06d1e3c7446775928219ca9e9acb4b310d) | Icon and Category match even without a container | MUST still set Category to match the icon when Container is None, e.g. Icon is Assignment and Category is Assessment. |
| Don't | ![Category left as the wrong type when no container is visible](zeroheight://image/8050559/99951876a2ee4a512471dd4639f724af8fd8f6eb8984bff44fd2299fce97265a) | Category left as the wrong type when no container is visible | MUST NOT leave Category on the wrong type when Container is None, e.g. Icon is Assignment but Category is Collaboration. |

---

### Layout and spacing

* In lists, align the icon and label to the same baseline or vertical centre based on the list item design.
* Keep spacing between the icon and the label consistent within the parent component, for example list item or card.
* Do not mix Default and Large tiles in the same repeated list or grid unless there is a clear hierarchy.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8050559/52ed8189307d4c07179b8fe5fd36813c8ac2ca5189e4e025bde9f253b671911a) |   | SHOULD use the same container size for every icon in a list. |
| Don't | ![](zeroheight://image/8050559/63bea1ecf3a0172279c9c124a6549cd0ccca8989acde6ccbace249b446311b48) |   | SHOULD NOT mix container sizes in the same list. |

---

### Breakpoints and responsive behaviour

* The component itself does not change at breakpoints.
* Choose the Size variant based on space and density.
* On smaller screens, prefer SM or MD in lists.
* In the activity chooser layout, use LG or XL when space allows.

---

### Interaction behaviour

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

![](zeroheight://image/8050559/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## States

Activity icon is usually static. When it appears inside a clickable component such as a list item, link, button, or card, it follows the states of that parent component. Do not create separate hover or focus states for the icon alone unless the icon is the interactive control.

![](zeroheight://image/8050559/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Structure

### Size rules

Size controls only the icon glyph size. The glyph size does not change between Container variants. Only the tile size and padding change.

---

### Container sizing

1. **None** is icon only with no background tile
2. **Default** is icon in a smaller coloured tile
3. **Large** is icon in a larger coloured tile

![](zeroheight://image/8050559/3a9dc3a771787f381f4fcf3fe0710f5e9d5adc1dc0372bcf6b3116c8d6303be2)
---

# Code
## Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-activityicon--default)

Props and types (TypeScript API): [ActivityIcon.d.ts](https://unpkg.com/@moodlehq/design-system/dist/components/activity-icon/ActivityIcon.d.ts)

Full list of props and their types for Activity icon.

![](zeroheight://image/8050559/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Accessibility implementation

### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | No action (component is not focusable by default) |
| `Enter` | No action (non-interactive element) |
| `Space` | No action (non-interactive element) |

---

### ARIA

* Role:
    * Default usage (`alt` is empty): decorative image, effectively ignored by assistive tech
    * Informative usage (`alt` provided): `img` (implicit role from the `img` element)
* Required attributes:
    * For informative usage: meaningful `alt` text
    * For decorative usage: `alt` should be an empty string
* Optional attributes:
    * `aria-hidden` can be used on the wrapper when the icon is strictly decorative in a larger labeled control
    * `aria-label` on the wrapper only if you intentionally need to label the wrapper itself (generally not needed when `alt` is set correctly)

---

### Dynamic announcements

None. If the icon changes communicate status updates, the parent context should handle announcements via an `aria-live` region, not the icon itself

![](zeroheight://image/8050559/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## GitHub

<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/tree/main/components/activity-icon">
**GitHub: ActivityIcon**
</shortcut_tile>
</shortcut_tiles>
---

---

# Code
## Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-avatar--default)

Props and types (TypeScript API): [Avatar.d.ts](https://unpkg.com/@moodlehq/design-system/dist/components/avatar/Avatar.d.ts)

Full list of props and their types for Avatar.

![](zeroheight://image/8646653/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Accessibility implementation

### Keyboard interaction

This component has no keyboard interaction and should not receive focus.

---

### ARIA

The Avatar component manages its accessible role and name automatically based on which visual state is active (photo, initials, or silhouette). Consumers only need to supply the *`alt`* prop.

#### Role

| **State** | **Accessible role** | **How it is applied** |
| --- | --- | --- |
| Photo visible (`imageSrc` loads successfully) | `img` | The inner `<img>` element carries the role natively |
| Initials or silhouette visible | `img` | Set on the root `<span>` automatically when an `alt` value is present |
| Decorative (no `alt` prop) | None | No role is applied; the avatar is hidden from assistive technology |

#### Attributes

* **`alt`** **prop**: the primary accessibility hook; maps to the user's full name (e.g. `"Jessica Doe"`).
    * When a photo is visible: forwarded as the `alt` attribute on the inner `<img>` element.
    * When initials or the silhouette are visible: applied as `aria-label` on the root `<span>`, which also receives `role="img"` automatically so the label is valid.
    * Omit (or leave empty) when the avatar is purely decorative. The component will render `<img alt="">` and omit `role`/`aria-label`, hiding it from assistive technology.

#### What the component handles internally: do not override

| **Element** | **Behaviour** |
| --- | --- |
| Initials `<span>` | Always `aria-hidden`. When a photo is visible the `<img alt>` carries the name; when initials are visible the parent `<span aria-label>` carries it. Either way the raw character string is never announced. |
| Fallback silhouette `<img>` | Rendered as `<img alt="" aria-hidden>`: always purely decorative. |
| `role="img"` on the root `<span>` | Added automatically when needed. Do not set it manually. |
| `aria-hidden="true"` on the root | Not used internally. To make an avatar decorative, omit the `alt` prop rather than adding `aria-hidden` externally. |

#### Usage guidance

* **Always** pass `alt` with the user's full name when the avatar represents a person and is not redundant with adjacent text.
* Omit `alt` when the user's name already appears as a visible label beside the avatar. Setting it would cause screen readers to announce the name twice.
* `xs` and `sm` sizes are image-only. Always provide `imageSrc` at these sizes; initials are not supported and the silhouette renders automatically if the image is absent.

![](zeroheight://image/8646653/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## GitHub

<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/tree/main/components/avatar">
**GitHub: Avatar**
</shortcut_tile>
</shortcut_tiles>
---

# Design
## Anatomy

![](zeroheight://image/8646653/dafce80e8d3fe1481ad84e7ef3940300ef8e16eeca92974cee57ecaf21bff66b)

1. **Container**: A circular shape that holds either an image or text content. It gives the avatar a consistent shape.
2. **Image**: The profile picture displayed when available. It fills the container while maintaining the circular shape.
3. **Initials**: Up to two letters shown when no image is available.
4. **Empty state graphic**: The fallback icon shown when neither an image nor initials are available.

![](zeroheight://image/8646653/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## States

This component is display-only. It does not have hover, pressed, disabled, or focus states. When it appears inside a clickable component such as a list item, link, button, or card, it follows the states of that parent component.
---

# Usage
## Overview

![](zeroheight://image/8646653/dab8bc1bc118c8d9d76255eaf4c2ce88b7601233213b50b637f2119b9dde5d2b)

The avatar component displays a visual representation of a user. It supports profile images, initials, and an automatic empty state graphic as a fallback. Use it to identify users throughout an interface.

### When to use

* Use when you need to represent a user in a compact, recognisable way across the interface.
* Use for profile pictures in headers, forum posts, and participant lists.
* Use in data tables, lists, and dense layouts where space is limited.
* Use in navigation menus and user account indicators.

<callout background="4" fullWidth="true">

### ❌ When not to use

* Do not use for large profile displays where full user information is needed. Use a layout that includes the full user profile information instead.

</callout>

![](zeroheight://image/8646653/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Variants

### Type

There’s no type prop. What shows depends on what you pass: `imageSrc` for an image or `initials` for initials. The empty state shows on its own when there’s neither, or when the image fails to load.

The type determines what the avatar shows: an image, initials, or an empty state graphic. All types maintain the same size and shape.

| **Variant** | **When to use** |
| :--- | --- |
| ![](zeroheight://image/8646653/a5d255543881527fbdcbc3f09e774b12998ff9166d362dc5da0791f5c508afa0) | **Image (`imageSrc`)** Use when a profile picture is available. The image fills the circular container while maintaining proper aspect ratio. |
| ![](zeroheight://image/8646653/2f0598ebcae039cc1359fd89b8991c1e45f95cb4514a757b8de8449897f48b1f) | **Initials** Use when no image is available. Display the user's first and last name initials as a fallback. |
| ![](zeroheight://image/8646653/2233bf42a2cfd163a84ea38c65b2efda78c25f19f4631a05b01b89e20790bde4) | **Empty state (automatic)** Use when no image or initials are available. Not meant to be chosen deliberately, it's the built-in fallback. |

---

### Size

Set with the `size` prop. If you leave it out, you get `md`.

The size sets the avatar's dimensions and scales the content to match.

| **Variant** | **When to use** |
| :--- | --- |
| ![](zeroheight://image/8646653/928fb502443c85dceb7c345df22ff76313bef03b88eea36014e4da5693a47dfa) | **XS (16px, `xs`)** Use in dense tables, lists, and compact layouts where space is minimal. In Moodle: compact lists, inline references.   *Image or empty state only. Initials are not available at this size.* |
| ![](zeroheight://image/8646653/d6627bdd38b6bb3e653f07771f6b43a018a629a942fdc011c107bf316f0571d9) | **SM (24px, `sm`)** Use in inline mentions, comments, and activity feeds. In Moodle: user menu (viewed-as user).  *Image or empty state only. Initials are not available at this size.* |
| ![](zeroheight://image/8646653/b4f43694cf06b2f2d3645669516bd40fc5499e54a0aff8e1b529be12740bf272) | **MD (32px, `md`, default)** Use as the standard size for most user interfaces and default avatar displays. In Moodle: forums, user menu (logged-in user). |
| ![](zeroheight://image/8646653/8b32a7d02e5317bcfea4f9a06fc270857cf5c2add0c170a5b667eba9d3522def) | **LG (48px, `lg`)** Use in featured user sections, profile sidebars, and prominent sections. In Moodle: grader feedback modal. |
| ![](zeroheight://image/8646653/63a951599f3e1d4d01d845f366dd570756ccdd44b4a65f698b9d8e803d6d16c0) | **XL (64px, `xl`)** Use for profile headers and card-based displays. In Moodle: profile headers, grader user picker. |
| ![](zeroheight://image/8646653/905b6c5b299289e0b2443ddd28506d31cd92ab87ff30c95e7ef49ca53a2e4676) | **XXL (96px, `xxl`)** Use for large profile pages and highlighted user representations. In Moodle: profile pages, user heading. |

![](zeroheight://image/8646653/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Guidelines

### Content design

#### Content structure and constraints

* The Image type accepts a single image file (JPG, PNG, or GIF).
* Initials should be a maximum of two characters. Use the first letter of the user's first and last name.
* Do not use more than two characters. The component is not designed to hold longer strings.
* If initials are empty or missing, show the empty state graphic instead.
* Providing an image or initials is preferred. If neither is available, use the empty state, this is a supported fallback, not an error state.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8646653/71651b6dbc19107100b66b352463e9d9c95aa88ec34a4c5d630a3750a1c8ef49) |   | SHOULD use the first letter of the person's first name and last name. |
| Don't | ![](zeroheight://image/8646653/78eef8f506421aa1a2943c15d5597ded0c852d0dae5c3283c99ac71b77f8b99e) |   | MUST NOT use more than 2 characters. |

#### Content behaviour

* The image type fills the container and is cropped to a circle.
* The initials type centres text vertically and horizontally within the container.
* When an image fails to load, display initials using the first letter of the user's first and last name. If no name data is available either, display the empty state graphic instead.

---

### Layout and spacing

* Use avatars individually or in small groups within a single row or column.
* Align avatars to content like user names using centre alignment.

---

### Breakpoints and responsive behaviour

* The avatar size and type remain consistent across all breakpoints. 
* In very narrow layouts, choose a smaller size variant (XS or SM) rather than relying on responsive scaling.

---

### Interaction behaviour

* The avatar itself is not interactive and should not receive focus or respond to clicks.
* If the avatar must link to a page, wrap it in a separate link or button component.
* Do not add hover states, loading indicators, or status badges directly to the avatar. Use a separate component for these features.

---

### Accessibility guidelines

#### Colour and contrast

* The `--mds-bg-surface-strong` background used for the initials variant meets a minimum 4.5:1 contrast ratio against `--mds-text-default` for readability.

#### Focus

* The avatar itself should not receive keyboard focus.
* If wrapped in a clickable element (link or button), focus should land on the wrapper, not the avatar.

#### Labelling

* The avatar should always have an accessible label containing the user's full name using `title`, `alt`, `aria-label`, etc.
* Include the user's full name in the associated label attribute, not just initials (e.g. `alt="Sarah Williams"`, not `alt="SW"`).
* When the avatar is visually close to the user's full name, the accessible label should refer to the full name instead of redeclaring it (e.g. using `aria-labelledby`) to prevent screen readers from reading the name twice.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8646653/145a4b719af343b448c48eb387bd8e464493ebd35a69bfa8b0344aedb02a9fff) |   | MUST use the person's full name as the accessible label. |
| Don't | ![](zeroheight://image/8646653/27c2b005253361017154c5f57efdbc9c9e3eb3e903cf39f727979e42b9f9dc9a) |   | MUST NOT use initials as the accessible label. |
---

---

# Code
## Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-alert--default)

Props and types (TypeScript API): [Alert.d.ts](https://unpkg.com/@moodlehq/design-system/dist/components/alert/Alert.d.ts)

Full list of props and their types for Alert.

![](zeroheight://image/8823906/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Accessibility implementation

### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus to the next interactive element inside the Alert (link, action button, or dismiss button), following DOM order |
| `Enter` / `Space` | Activates the focused button (dismiss or action) |

---

### ARIA

* Role: `alert` on Danger and Warning variants; `status` on Success and Info variants.
* Required attributes: `aria-label` on the dismiss button (e.g. "Close").
* Optional attributes: `aria-describedby` if the alert is linked to a specific form or section.

---

### Dynamic announcements

* On dismiss, focus moves programmatically to the next focusable element in the DOM. No transition or animation is implemented in this version.

![](zeroheight://image/8823906/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## GitHub

<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/tree/main/components/alert">
**GitHub: Alert**
</shortcut_tile>
</shortcut_tiles>
---

# Design
## Anatomy

![](zeroheight://image/8823906/9767ea5eba8644d98a72a1e802c49ba07c9f00f7300b03e9bb0fb083934fa9e1)

1. **Icon**: communicates severity at a glance. Always visible, colour-matched to the Type variant. Static vector, not a swappable sub-component.
2. **Title** (optional): short label above the message, shown only when the message needs one.
3. **Message content**: the required text of the alert.
4. **Custom content** (optional): additional content beyond title and body, for cases the standard pattern doesn't cover (e.g. a link). An exception mechanism, not a general-purpose container. Icon and body remain mandatory regardless of what's added here.
5. **Action button** (optional): a single, generic call to action related to the message.
6. **Dismiss button** (optional): removes the alert. Present only when the alert is dismissible.
---

# Usage
## Overview

![](zeroheight://image/8823906/c8bcfe3bb9fa29982f9925243e4703f9563e09f29aef6dc75856cae62a8ba86c)

Alerts communicate the outcome of an action, a status or condition, or important contextual information the user needs to know. They sit in the page flow, near the content they relate to, and stay visible until the user dismisses them or navigates away.

Every alert should clearly state what happened and what the user needs to know.

### When to use

Use alert when:

* Confirming the outcome of an action that the user might want to reference or act on (e.g. "Backup complete. You can access the backup on the restore page."). 
* Surfacing something that needs attention (e.g. an expired session, a registration status).
* A warning or error needs to persist on the page until people act on or dismiss it.
* The message is tied to the current page or section.

<callout background="4" fullWidth="true">

### ❌ When not to use

* Don't use for brief confirmations that don't need to stay on the page. Use toast instead.
* Don't use for form field-level validation errors. Use inline field validation instead.
* Don't use for high-priority blocking messages that require user confirmation before continuing. Use a Modal/Dialog instead.

</callout>

![](zeroheight://image/8823906/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Variants

### Type

Set with the `type` prop. If you leave it out, you get `info`.

The type of alert tells people what kind of message this is: whether something went wrong, succeeded, or needs attention. Alert supports four types: Info, Success, Warning, and Danger. A smaller set of types makes alerts easier for people to recognise and interpret at a glance.

| **Variant** | **When to use** |
| :--- | :--- |
| ![](zeroheight://image/8823906/27b3e5146cf717e9202c99a31b2c58e809d09fa0b988573d3c83caeaf42945e6) | **Info (default)** Background information that's useful but doesn't require action. |
| ![](zeroheight://image/8823906/f3dd5251c852a7a5aac0f149d7ea11357047ec642e7c1843057816e6922dfd21) | **Success** Confirms that an action completed as expected. |
| ![](zeroheight://image/8823906/dc484a91dd8636a6edac89428c0cc15a7e6ea06f264d4d20b1b83b66f33230ff) | **Warning** Something needs attention but isn't yet an error. |
| ![](zeroheight://image/8823906/b17a056d4590beb7096e802b5afcb9a583cdac01e7843fbdb0307bff0637094f) | **Danger** Something has gone wrong or needs immediate attention. |

---

### Dismissible

On by default. Set `isDismissible={false}` to leave out the Close button.

Alert includes a Close button, controlled via `isDismissible`, that lets people remove the alert from the page.

* Alerts are dismissible by default. Most alerts should include the Close button.
* Omit the Close button only when the alert communicates a critical issue that must remain visible until the underlying problem is resolved (e.g. a failed submission or an expired session that blocks progress).
* Refer to the [Close button](https://design.moodle.com/98292f05f/v/latest/p/778206) documentation for its states and interactions.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8823906/f393a788d09388f0212b9c5ddc474cf76e67a87ed60eea007bc28e9370082fcc) |   | SHOULD leave out the Close button only when the message is critical and has to stay visible until the problem is fixed. |
| Don't | ![](zeroheight://image/8823906/51526e45318a168ca490164fa442ddebc1eb57dcaa36e07e947c46c382a4d03c) |   | SHOULD NOT add a Close button to a critical message just because it's the default. |
| Don't | ![](zeroheight://image/8823906/2d24fda1bfdb5321190f5e8505fe03d64edb456107259c9d48f190f62ef50431) |   | SHOULD NOT remove the Close button when the message isn't critical. |

---

### Actionable

Off by default. Set `isActionable` and give it an `actionLabel`. Handle the click with `onAction`.

Alert can optionally include a single action button, controlled via `isActionable`. Use it for quick, contextual actions that people can complete without leaving the page (e.g. "Refresh", "Undo", "Retry").

* Use only one action per alert. If people need to choose between two or more actions, use a Modal instead.
* If the action is irreversible or has a significant impact on people's data, don't trigger it directly from the alert. Have it open a confirmation Modal as an intermediate step.
* The action button is always Secondary / Outline. Its visual weight should never compete with the primary action of the page. Refer to the [Button](https://design.moodle.com/98292f05f/v/latest/p/877c50) documentation for its states and interactions


![](zeroheight://image/8823906/7477c35b33e309d6ec131f62af5f9af584ed5b79608bb0617ad8f10c61ef4aeb)
*Actionable alert with a Secondary/Outline button*

![](zeroheight://image/8823906/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Guidelines

### Content design

Alerts communicate a single message about an outcome, a status, or something people need to act on. Every part of the alert (title, message text, and any actions) should support that message and nothing else. 

Message and title are plain text. They don't support links, rich formatting, or lists. If a message needs any of that, it belongs in the custom content slot instead (see Custom content below), not in the body.

#### Message 

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
| Do | ![](zeroheight://image/8823906/9d72ccc261d07b98421f6e06c2b8f7b76f5738cfd7060a66c23d5ee9097f156e) |   | SHOULD use short-form passive and keep the message brief. |
| Don't | ![](zeroheight://image/8823906/b16a2fe1a449ad6bec1b50a8d68969966267b44cf006b89aacd06695dc8e305b) |   | SHOULD NOT use long passive sentences or filler words like "successfully". |
| Do | ![](zeroheight://image/8823906/8c3ad6e9662da834e07598b3d10826d8264daba87c6878dbd3c880d805d75e50) |   | MUST be specific and give people a way to fix the problem. |
| Don't | ![](zeroheight://image/8823906/e34d952f6c7018e11e906fd7224a562fdadca625cd41f3bb92014e0e6d02798a) |   | MUST NOT show system errors without telling people how to fix them. |

#### Title

The title is optional, but recommended when the message needs context. Skip the title when the message is short and self-explanatory.

* Include a title when people can't grasp the message from the first few words alone.
* Don't add a title to obvious messages like "Changes saved".
* Use sentence case. No punctuation unless it's a question.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8823906/c04ff7fa8db7457fbca7e3d63aa9ab7914e1ce773445a6c2db8c09587ae29506) |   | SHOULD use a title for the headline when the body adds the detail. |

#### Call to action

An alert's call to action is either an action button or a link, never both by default. Include only one, and only when a meaningful next step exists.

* Use the **action button** (`isActionable`) for actions completed in place (e.g. "Retry", "Undo"). This is a built-in prop.
* Use a **link** when the right response is to send people to another page (e.g. a login page, a help article). A link isn't its own prop. It's added through the custom content slot (see Custom content below), placed on its own line below the body.
* If a message genuinely needs both an in-place action and a link to another page, that's fine, but treat it as the exception.


| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8823906/b8f694ce4d8c1add2c171a534641f3db73ae7745014b7481280bcf6df4b27307) |   | SHOULD use the action button for quick, low-impact actions people can finish without leaving the current context. |
| Don't | ![](zeroheight://image/8823906/3673104a2b11305adcef3d92e097b9132b0705b29356429476f43e0e4139e215) |   | MUST NOT give people competing actions inside an alert. Use a Modal if you need that. |
| Do | ![](zeroheight://image/8823906/d36528ffdbebace1e0bf867f6ee62525728d1085a3963b9f35bd9052e7ca405c) |   | SHOULD use a link for actions that take people to another page. |

#### Custom content

The custom content slot (`children`) renders below the message text, and is the only place in Alert that accepts anything beyond plain text.

![](zeroheight://image/8823906/380fd76b7db3be243153431ad3a19b3aa033442d01ae7c04d733c6147f44069a)

Although the message and title are plain text, this slot is technically unrestricted. It can hold other components,  like badges, a progress bar, or other elements (not just links). The custom slot exists to cover the genuine exceptions that plain text can't, without opening that same door on every part of the component.

* Use it for a link, when the message needs to point somewhere for more detail or a related action (see Call to action above).
* Up to two links can sit here, separated by a middle dot (·), when they're genuinely related next steps rather than competing options, e.g. one primary destination and one secondary one. More than two starts to compete with the message itself.
* It can also hold a badge, a progress bar, or a similar element, when the message needs to convey something plain text can't: a precise reference or a live status. Treat these the same way: as exceptions, not defaults.

![](zeroheight://image/8823906/ea2380199e5aa95210e78dd06acca25e257227bfd7762d5869ea7bccb9fe6c9e)

* Treat this slot as an exception path, not a general-purpose container. If you're reaching for it often, that's a sign the standard anatomy needs revisiting, not that this slot should become the default way to add content. 
* Icon and message text remain mandatory regardless of what's added here.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Caution | ![](zeroheight://image/8823906/ac4fd0e87a6f75c953567074c355abed408c29411f1a8e9104121a3a5d5311c8) |   | SHOULD NOT combine a link in the custom slot with the action button (isActionable) in the same alert unless you really need both. Together they give people 2 next steps to weigh instead of 1 clear one. |
| Do | ![](zeroheight://image/8823906/6cf0e3a9cdf906fdd14eaacf679a6dfa6d0e8e4d2d2b9997696e8f251cc21027) |   | SHOULD pick the one that matches what you want people to do first. |

---

### Layout and spacing

* Alert spans the full width of its container. It doesn't float or size to content.
* When multiple alerts appear on the same page, stack them with standard spacing between; don't nest one inside another.

---

### Breakpoints and responsive behaviour

* Message text wraps at all breakpoints. The container never scrolls horizontally or truncates text.
* Icon, title, and dismiss button stay fixed size across breakpoints. Only the text column reflows.

---

### Interaction behaviour

* Dismiss button removes the alert from the page on click, or on Enter/Space when focused.
* On dismiss, focus moves to the next focusable element on the page.
* The action button behaves like a standard secondary button. See the Button component for its interaction states.
* The action button never acts as a dismiss control. An action can result in the Alert closing as a side effect (e.g. completing an "Undo"), but the dismiss (Close) button is always the dedicated, explicit way to close it.

#### Focus and tab order

* If an Alert contains no interactive elements (message text only, no link, action button, or dismiss button), it isn't part of the tab order at all. It's announced once via the live region when it appears; keyboard users tab straight past it as they would past any static text.
* If an Alert contains one or more interactive elements, they follow natural DOM/tab order in this sequence: custom content (e.g. a link) → action button → dismiss button.
* The dismiss button is always last in the tab sequence, even though it's positioned visually top-right. This matches reading order and avoids surfacing the dismiss control before the user has encountered the message it belongs to.

---

### Accessibility guidelines

#### Colour and contrast

* Text and icon colour meet WCAG AAA against their background for every variant.
* Colour is never the only signal of severity; the icon is a mandatory, always-visible part of the component for exactly this reason.

#### Focus

* Dismiss button and action button each show a visible keyboard focus ring, inherited from their respective components (Close button, Button).
* See Interaction behaviour above for how focus moves through and away from the Alert.

#### Labelling

* Danger and Warning variants use `role="alert"` (assertive). Appropriate for errors and blocking cautions that need immediate announcement.
* Success and Info variants use `role="status"` (polite). Appropriate for confirmations and neutral information that shouldn't interrupt the user.
* Dismiss button requires an accessible name, set via the `dismissAriaLabel` prop. It has no visible text. Required whenever `isDismissible` is true (WCAG 2.1 SC 4.1.2).

![](zeroheight://image/8823906/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Related

#### Used with

<shortcut_tiles>
<shortcut_tile url="https://design.moodle.com/98292f05f/p/778206-close-button" page-id="8052227">
**Close button**

provides the dismiss interaction when isDismissible is true.
</shortcut_tile>

<shortcut_tile url="https://design.moodle.com/98292f05f/p/877c50-button" page-id="8332388">
**Button**

provides the action interaction when isActionable is true.
</shortcut_tile>

<shortcut_tile url="https://design.moodle.com/98292f05f/p/68cbc8-link" page-id="8647020">
**Link**

used for navigation via the custom content slot.
</shortcut_tile>
</shortcut_tiles>
---

---

# Usage
## Overview

![](zeroheight://image/8046350/d3572134e7570cd0720084289a7b82532ff3882f77b44dc5b3ebc86275d63f48)

Use badges to highlight short, scannable information like status, metadata, or counts. Keep them short and easy to read.

### When to use

Use a badge to show short status that helps users understand an item at a glance, for example:

* Access and restrictions: Locked, Restricted, Read only
* Time and urgency: Overdue, Due soon, Upcoming
* Availability and visibility: Not available, Hidden, Visible
* Workflow and approval: Awaiting approval, In review, Approved
* Progress and completion: Not started, In progress, Completed
* Counts and indicators: New, 3 updates, 12 unread

<callout background="4" fullWidth="true">

### ❌ When not to use

* Do not use a badge to display important messages. Use Alert.
* Do not use a badge for actions. Use Button.
* Do not use a badge for long text. If the label wraps, it is usually the wrong component.

</callout>

![](zeroheight://image/8046350/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Variants

Badges combine four independent choices: 

* **Type** for meaning
* **Contrast** for visual weight
* **Style** for shape
* **Icon** optional

### Type

Set with the `variant` prop. If you leave it out, you get `primary`.

| **Variant** | **When to use** |
| :--- | --- |
| ![](zeroheight://image/8046350/a80469d8dbecded63db7943368406c962ca3672c6aadc747f17d3941a9f5e4e7) | **Primary (default)** Use for the default or most prominent label in a set. |
| ![](zeroheight://image/8046350/eb593164bdc62be579b081bc3d86342e7c5864daac4b06e91c127cdc205ed567) | **Secondary** Use for a supporting, neutral, or less prominent label. |
| ![](zeroheight://image/8046350/e3c63b42a8a8d451131ba09637e67c7980722ed0fe8c80cea8a795e25b2be83c) | **Success** Use for a positive outcome, completion, or confirmed good state. |
| ![](zeroheight://image/8046350/3e46822d629567864c283d472648863e32bfdf6db39f694ff28f34419004ba02) | **Danger** Use for risk, failure, destructive state, or negative status. |
| ![](zeroheight://image/8046350/03d7ecaf36c921822f226044e8a112d6c9252be95817d1c7f5224390bb8f19a8) | **Warning** Use for caution, potential issue, or something that needs attention. |
| ![](zeroheight://image/8046350/a770131237f96251aa2695c54ceb14ea27a405181453a7703bc3d6c0a5b5be4a) | **Info** Use for helpful context, extra detail, or a non urgent note. |

---

### Contrast

Set with the `subtle` prop. It’s off by default.

| **Variant** | **When to use** |
| :--- | --- |
| ![](zeroheight://image/8046350/dcb8b9522c46bc4ddacdb3361b0e23c95da94cbb54af36633eb3a4e122a33bcd) | **Default** Use when the badges must stand out. |
| ![](zeroheight://image/8046350/e49df5d97c7645171641c031e30aaaa9948532fdd17223bf4b9b4e4a6b1d4c87) | **Subtle** Use for quieter labels, and for dense layouts like lists and tables. |

---

### Style

Set with the `pill` prop. It’s off by default.

| **Variant** | **When to use** |
| :--- | --- |
| ![](zeroheight://image/8046350/04521af33ae2ea29353de7a7ec8d6ce3b00aedcbbaa3c29a2b3cb7efd6bfa311) | **Default** Use for a neutral badge shape.  |
| ![](zeroheight://image/8046350/9a1e3dc404abed775b199f9e8df1a00f5d67df6a697972a683845b79656f62fd) | **Pill** Use for a softer, more prominent badge shape. |

---

### Icon

Set with `startIcon` or `endIcon`. Pass an `<i>` or `<svg>` element.

| **Variant** | **When to use** |
| :--- | --- |
| ![](zeroheight://image/8046350/a66bdd9714f18c90adfe36422ddcc3b4e92511c04335c2823f9ee05e4acca5b6) | **None (default)** Use when the label alone is clear. |
| ![](zeroheight://image/8046350/5f1121a1f901c488c31d2146c95ffec26c8ef9a659e0cfb6498f801be7fc0175) | **`startIcon`** Use when the icon adds meaning and supports the label.  |
| ![](zeroheight://image/8046350/b8c5dcd083d2eb70a491d1bdfc16cf9a22a96235ace689bf53ff6ff1574abc6f) | **`endIcon`** Use only when there is a clear pattern in the product and it adds meaning |

#### Icon rules

* Use only one icon per badge.
* Icon colour must match the label colour.
* Do not use an icon as the only carrier of meaning.

---

### Size

There’s no `size` prop in the React component.

Badges should match the text size they sit next to.

![](zeroheight://image/8046350/9c7f35569c6e0c50573f51bc129ebce2bf7978088aa60c69bfa7439f2330cffb)

* Badge size follows the text style next to it.
* Match the badge label text style to the adjacent text style.
* If you use an icon, use the matching icon size.
* Keep the icon no larger than the label font size so the badge height stays the same as a badge without an icon.

![](zeroheight://image/8046350/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Guidelines

### Content design

#### Content structure and constraints

* Always use a label.
* Keep labels short. Aim for 1 to 2 words.
* The label must not wrap.
* Use the correct type for the meaning.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8046350/4546ab3f544d59cdbd8c75812c6d78af4a1cc8842ad3bd803af3f34ea7f33a69) |   | SHOULD use short labels that are easy to scan. |
| Don't | ![](zeroheight://image/8046350/c0fdfe90ac02910b7135b4cde486d4973ce5d7ae77d12f23b1dd0f0078c0fe20) |   | SHOULD NOT use long labels that explain the whole situation. |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8046350/df060432c536c652b7618e0b7f083bf134dbe4314bbf92aaa06a645c33f6cf0b) |   | MUST use the type that matches the intended meaning. |
| Don't | ![](zeroheight://image/8046350/0cb8dbdeb12dbdd6f9bb00ca9d336cf44d1e2140c8a9a18837e892377d9619fb) |   | MUST NOT use a type that doesn't match the intended meaning. |

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
| Do | ![](zeroheight://image/8046350/5914a055a1d59543ac462426e48cbbfb818f041333cb294f67a25b226124285e) |   | SHOULD match the icon size to the label text so badges with and without an icon stay the same height. |
| Don't | ![](zeroheight://image/8046350/023f416ecef1e068df60ba5f4e5c0d2b7004f39716d6896d4d618560d8503fe0) |   | SHOULD NOT use a larger icon. It makes the badge taller than one without an icon. |

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
## Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Primary](https://moodlehq.github.io/design-system/iframe.html?id=components-badge--primary)

Props and types (TypeScript API): [Badge.d.ts](https://unpkg.com/@moodlehq/design-system/dist/components/badge/Badge.d.ts)

Full list of props and their types for Badge.

![](zeroheight://image/8046350/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Accessibility implementation

### ARIA

* Role:
    * Badge is rendered as a non-interactive `span` (no explicit ARIA role by default).
* Required attributes:
    * None required by the component itself for basic usage.
    * `label` is required for visible text content.
* Optional attributes:
    * You may pass standard ARIA attributes via props if needed by context (for example, `aria-label`).
    * Icons should remain decorative `aria-hidden="true"` so the badge text remains the accessible name/content.

---

### Dynamic announcements

* As a presentational status label, it does not announce changes automatically.
* If badge content updates need to be announced (for example, status changes), add an app-level live region in the consuming UI (for example, `aria-live="polite"`).

![](zeroheight://image/8046350/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## GitHub

<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/tree/main/components/badge">
**GitHub: Badge**
</shortcut_tile>
</shortcut_tiles>
---

# Design
## Anatomy

![](zeroheight://image/8046350/f6b7ca545e4e2f8c9cb6bb477284a2bf0b8c91c67ae01be73fc12a1c7c858a10)

1. **Label:** Required text that communicates the status.
2. **Container:** Background shape that sets the badge size and visual weight.
3. **Border** (Subtle contrast only)**:** Thin stroke to keep the badge clear on dark or busy backgrounds.
4. **Icon** (Optional): Place before or after the label only when it adds meaning, not decoration.

![](zeroheight://image/8046350/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## States

Badges are not interactive, so they have no hover or pressed states.

Instead of using a badge for a link or a button, use the Link or Button component. 

Do not add custom interactions to badges.
---

---

# Code
## Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-progressbar--default)

Props and types (TypeScript API): [ProgressBar.d.ts](https://unpkg.com/@moodlehq/design-system/dist/components/progress-bar/ProgressBar.d.ts)

Full list of props and their types for Progress bar.

![](zeroheight://image/8449677/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Accessibility implementation

### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus to the next focusable element. The ProgressBar itself is not keyboard-focusable by default. |
| `Shift + Tab` | Moves focus to the previous focusable element. The ProgressBar itself is not keyboard-focusable by default. |
| `Arrow keys (Left/Right/Up/Down)` | No action on ProgressBar. It is read-only and does not support keyboard value changes. |

---

### ARIA

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


---

### Dynamic announcements

* Assistive technologies announce progress based on updates to `aria-valuenow` on the progressbar.
* If you need guaranteed spoken announcements on every update (for example, long-running async tasks with milestones), add a separate app-level live region message in the consuming experience.

![](zeroheight://image/8449677/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## GitHub

<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/tree/main/components/progress-bar">
**GitHub: ProgressBar**
</shortcut_tile>
</shortcut_tiles>
---

# Design
## Anatomy

![](zeroheight://image/8449677/e2716e4ad637fa6ea454f5418278d4b68e9a70b00d9d125606823792fbd22efd)

1. **Progress**: The full length background. It represents the total work to be done.
2. **Progress bar**: The coloured bar inside the progress. It grows from left to right to show how far along the task is.
3. **Label** (optional): The text that explains the progress. This could be a status e.g. in progress, completed, or error, and a count like 5 of 10 or 100%.

![](zeroheight://image/8449677/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## States

These are visual states, not interaction states. The progress bar is for display only. It does not have hover, pressed, disabled, or focus states.

### Status

Set with the `status` prop: `in-progress`, `loading`, `error` or `warning`. If you leave it out, you get `in-progress`. Empty and Completed are applied automatically at 0% and 100%.

| **States** | **Description** |
| :--- | --- |
| ![](zeroheight://image/8449677/7c455681d7f6254634989f30dc8ee3799395e2c18680fcd0731f9a17be2d8e63) | **Empty** Use when progress is 0. Only the progress is visible. |
| ![](zeroheight://image/8449677/75a936c2904c321858cdbe05c9703b1b57bd67d7d08cd34a2aefd659720c1b74) | **In progress** Use when progress is more than 0 and less than the total. The progress bar is only partly filled. |
| ![](zeroheight://image/8449677/7093b14c3193b219f4ecd8b54f9bf4203be63fe5c505d9d2c79e884dbc4a7217) | **Loading** Use when progress is updating. It shows a striped progress bar. Set `animated` to make the stripes move. Same colours as In progress, with light stripes moving across the fill. |
| ![](zeroheight://image/8449677/0da3891382969cac1ffa2dcd200adacce9f1492230f51831a759b80e528e38cc) | **Completed** Use when the task is finished. The progress bar is 100 percent full and uses success styling. |
| ![](zeroheight://image/8449677/a1d08b14e2ffd35079f9417ecdd0b4c596e636fc3e4d55b201251b6bf65c6e89) | **Error** Use when progress cannot continue because of a problem. The progress bar uses danger styling to show that something went wrong. |
| ![](zeroheight://image/8449677/24db1648cdec8657847f750708b08b6184582866e5db964caee1249ca5709340) | **Warning** Use when progress can continue but something needs attention. The progress bar uses warning styling. |
---

# Usage
## Overview

![](zeroheight://image/8449677/ef50f28ebdd039acb1371ea80871d401e3988e6ddb7636b9d2843089612e7902)

The progress bar shows how progress changes over time. It can track a user task, a system process, or anything else that is moving towards completion. It helps users understand what is done and what is left. 

The filled part shows the completed work. The empty part shows the remaining work.

### When to use

* Use when users need confidence that a long task is moving forward.
* Use when progress can be measured and has a known total.
* Use to indicate progress towards completion.

<callout background="4" fullWidth="true">

### ❌ When not to use

* Do not use when the total is unknown or progress cannot be measured.
* Do not use when you cannot estimate progress, even roughly.
* Do not use for a simple done or not done status.

</callout>

![](zeroheight://image/8449677/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Variants

### Label

Set with the `labelVariant` prop. If you leave it out, you get `title-and-count`.

The label property controls which text is shown and where it appears. It can be combined with any status value. Title is the label text that describes what the progress is for.

| **Variant** | **When to use** |
| :--- | :--- |
| ![](zeroheight://image/8449677/3e901917f3d78080171dda246d9e832b0f3152f8618afc49926a479fc0ddbdd4) | **Title and count (`title-and-count`, default)** Use when you need the title and count as separate items for quick scanning. |
| ![](zeroheight://image/8449677/fcbd614a3fdf2d780a991c0cbc3495bffc15d4f85a88b791aebd3eef4af1f6a5) | **Title** Use when you need one flexible label line that can show a title, a count, or both. |
| ![](zeroheight://image/8449677/499881ea8332ca90ff99a10c8efe81d85ff192456f4fac335e8f4ce2bee67ab9) | **Inline** Use when vertical space is tight and you only need a compact count. |
| ![](zeroheight://image/8449677/c695432945d148aee507e30071c58587be22efb7e6a1ccbfd0048f6613582e89) | **None** Use only when nearby content already explains what is being measured. |

![](zeroheight://image/8449677/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Guidelines

### Content design

#### Content structure and constraints

* Keep label text short. One or two words is enough, like in progress, completed, or error.
* Use the count when the total is meaningful.
* If you do not use a label, make sure the surrounding UI explains what the progress bar means.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8449677/5e4a1fa8b84f74150fe170894b449ba7d5d2f56f9747a079e44e7cd7b2484195) |   | SHOULD use a short label that stays on one line and is easy to scan. |
| Don't | ![](zeroheight://image/8449677/bf4e6e4019a73e34b0713bb680b1d7a2cec3723d33e52eec395b011afdde2fea) |   | SHOULD NOT use a long label that wraps and is harder to scan. |

#### Content behaviour

* The count and progress bar are two views of the same progress value. They must always match and be updated together.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8449677/d19887142f52f0a9f3cdcaf707a492154e63bbda177a7a1a95adc66b38c13963) |   | MUST make the progress bar match the count. |
| Don't | ![](zeroheight://image/8449677/ab833240630df1365d055a521f28f02e99a38ed662ded40482054a78322afc8c) |   | MUST NOT show a progress bar that doesn't match the count. |

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
| Do | ![](zeroheight://image/8449677/110eb5276a4ced38fdb6ca471abecfbc51e40d73c03b283d05118faa4c10d498) |   | SHOULD put the title, or the title and count, above the progress bar when horizontal space is tight, so the bar stays long enough to show progress clearly. |
| Don't | ![](zeroheight://image/8449677/90ae0ac8844e8fb77605575e3ff5b6640e56b5b8750ee4bd7a8b6ae933ce7564) |   | SHOULD NOT put the count inline when horizontal space is tight. It can make the bar too short to show progress clearly. |

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

#### Colour and contrast

* Do not rely on colour alone to show status. Use a label or a count.
* Do not rely on colour alone to show completion. Use a label or a count.
* Do not rely on colour alone to show an error. Use a label or nearby content to explain what went wrong.
* Make sure the progress bar and labels meet contrast requirements on the surface they sit on.
* Show status in text, for example In progress or Error, not only colour.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8449677/29e621e2364a3821a639a84130c81774907618fad4e3fb0d2b93f5b7e2df0751) |   | MUST show a count like 10 of 10 or 100% so completion is clear, not just the bar colour. |
| Don't | ![](zeroheight://image/8449677/165a752ccb8381b2263e19992f56f12cd5e8dd6b8e0380a89a3c166e63ed7c6b) |   | MUST NOT show a progress bar with no label. If colour is the only cue, people may not understand what it means. |

#### Focus

* No focus styling is needed because the component is not focusable.

#### Labelling

* When there is no label, provide an accessible name that explains what is being tracked.
---

---

# Usage
## Overview

![](zeroheight://image/8677359/162cf3d59141e37a5a800d4f53e6911127d31206589c36964a240dd2de05aec2)

Tooltip appears on hover or focus and disappears when the user moves away. The arrow visually anchors the tooltip to its trigger.

Use tooltips to add context without cluttering the interface. For example, to label an icon button or clarify truncated text.

### When to use

* Use when labelling icon-only buttons where the icon alone may not be clear enough.
* Use when clarifying truncated text that cannot be expanded inline.
* Use when providing brief helper text for form fields or UI controls.
* Use when the information is supplementary and not required for the user to complete a task.

<callout background="4" fullWidth="true">

### ❌ When not to use

* Do not use for critical information the user must act on. Use inline text, a popover, or a dialog instead.
* Do not use for long explanations or multi-line content. The tooltip is not a popover.
* Do not nest interactive elements such as links or buttons inside a tooltip.
* Do not use on touch-only interfaces. Tooltips rely on hover and focus, which are not reliably available on mobile.

</callout>

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8677359/d4d3a2941ba7d63f7e4c054fe6fb9d7578a20ff4cc7a1bd9cf73d2db39d6749d) |   | SHOULD use a tooltip only for a supporting hint that helps but isn't needed to finish the task. |
| Don't | ![](zeroheight://image/8677359/1422c72e2c19dc6eb1cb2021de329091c05de1b57b60bd68d9cf4e6163c689a2) |   | MUST NOT put information people need to read to carry on in a tooltip. |

![](zeroheight://image/8677359/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Variants

### Variant

Set with the `variant` prop. If you leave it out, you get `dark`.

| **Variant** | **When to use** |
| --- | --- |
| ![](zeroheight://image/8677359/d3f36e07754517bf972fc70d78f347a36aeacde8750c98444fb1b9d6d105b108) | **Dark (default)** Use Dark as the default for tooltips on light backgrounds. |
| ![](zeroheight://image/8677359/38f4e1ea14a3dc3865e56705cd53ee66280ff0b8280f6bf9a2fdf10983c966aa) | **Light** Use Light for tooltips on dark backgrounds or dark surfaces. |

---

### Placement

Set with the `placement` prop. It controls which side of the trigger the tooltip appears on, and the arrow adjusts automatically. If you leave it out, you get `top`.

| **Variant** | **When to use** |
| :--- | :--- |
| ![](zeroheight://image/8677359/93636c5ee4773d15133c3b2f14d766e06daf5b09bfb9a9627cfde24111152e44) | **Top (default)** Tooltip appears above the trigger. Use when there is enough space above and the tooltip does not overlap other content. |
| ![](zeroheight://image/8677359/dfc86f0c8455d6685b54b869529bea8005da7d8814a2f455839039a45d2e48b1) | **Bottom** Tooltip appears below the trigger. Use when the trigger is near the top of the viewport. |
| ![](zeroheight://image/8677359/d63d453576a31f31801783750df12dcd9d7b9dc7b2ab8b959e2cb59467a20a1f) | **Left** Tooltip appears to the left of the trigger. Use when the trigger is on the right side of the layout. |
| ![](zeroheight://image/8677359/cd0717f2e87b41278582875901f5f3a50f72250e4003e0ebfff2090f487b8609) | **Right** Tooltip appears to the right of the trigger. Use when the trigger is on the left side of the layout. |

![](zeroheight://image/8677359/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Guidelines

### Content design

#### Content structure and constraints

* Tooltip text should be a short phrase or single sentence. Aim for under 80 characters.
* Do not include punctuation at the end of a label-style tooltip (e.g. "Edit profile" not "Edit profile.").
* Use a full sentence with a full stop if the tooltip explains a behaviour or consequence (e.g. "This action can't be undone." not "Action can't be undone").
* Do not include HTML, links, or interactive elements in tooltip text.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8677359/7e5beb0e0e752b1fdceb1395024ed3294f4cc51007695dc625df19b7691b3e66) |   | SHOULD use short labels that are easy to scan. |
| Don't | ![](zeroheight://image/8677359/6452d2da4f5f0ab53ee6f8d029ce33d16d44b1f9c2cf216fa68b66804fcee7f4) |   | SHOULD NOT use full sentences that belong inline, not in a tooltip. |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8677359/ff753395ce5ae7c1321fd03429c5076e9fefd568bca480e29bb742ca5e3030ad) |   | MUST keep tooltip content to plain text only. |
| Don't | ![](zeroheight://image/8677359/b5d2422005bdbd55baf3607625b3b8745247b2c1f521575625068fe4a3d77a0e) |   | MUST NOT put a link or other interactive element in a tooltip. |

#### Content behaviour

* If the trigger element already has a visible label, the tooltip should add context, not repeat the label.
* Tooltip width fits the text, up to a maximum of 200px. Text wraps if it goes past that width.

#### Copywriting

* Use sentence case for all tooltip text.
* Keep the tone plain and direct. Say what the control does, not why it exists.

---

### Layout and spacing

* Position the tooltip so the arrow points clearly at the trigger element.
* Leave `--mds-spacing-xs` (8px) of space between the tooltip and the trigger element. The arrow tip sits at the 8px mark.
* Leave at least `--mds-spacing-xs` (8px) space between the tooltip and the viewport edge to avoid clipping.
* Do not stack multiple tooltips simultaneously.

---

### Breakpoints and responsive behaviour

* Do not rely on tooltips for essential information on small or touch screens.

---

### Interaction behaviour

* Tooltips appear on `mouseenter` and `:focus-visible` of the trigger element.
* Tooltips disappear on `mouseleave` and `blur`.
* Do not add animations longer than 150ms on entry or exit.

---

### Accessibility guidelines

#### Colour and contrast

* Ensure background and text meets WCAG AA contrast requirements at the default font size.
* Do not rely on colour alone to communicate the tooltip's presence. The arrow and placement are the primary visual cues.

#### Focus

* The tooltip is triggered by the trigger element's focus, not the tooltip itself. The tooltip should never receive focus directly.
* Ensure the trigger element has a visible focus indicator.

#### Labelling

* If the tooltip labels an icon button, the trigger must have either an `aria-label` or `aria-describedby` pointing to the tooltip content.
* Use `aria-describedby` when the tooltip supplements a visible label. Use `aria-label` when the tooltip is the only label.
* The trigger element must be keyboard focusable.
* Do not put essential information only in a tooltip. It is not available to all users in all contexts.
---

# Code
## Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-tooltip--default)

Props and types (TypeScript API): [Tooltip.d.ts](https://unpkg.com/@moodlehq/design-system/dist/components/tooltip/Tooltip.d.ts)

Full list of props and their types for Tooltip.

![](zeroheight://image/8677359/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Accessibility implementation

### Keyboard interaction

This component has no keyboard interaction of its own. It responds to the focus state of its trigger element.

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus to the trigger element, which shows the tooltip. |
| `Shift + Tab` | Moves focus away from the trigger element, which hides the tooltip. |
| `Escape` | Should dismiss the tooltip if it is visible. Implement on the trigger element. |

---

### ARIA

* Role: The tooltip container should have `role="tooltip"`.
* Required attributes: `id` on the tooltip element, referenced by the trigger's `aria-describedby`
* Optional attributes: `aria-label` on the trigger element, as an alternative to `aria-describedby` when no visible label exists

---

### Dynamic announcements

The tooltip content is exposed to assistive technology via `aria-describedby` on the trigger element. Screen readers announce the tooltip text when the trigger receives focus. Do not use `aria-live` on the tooltip container. The `aria-describedby` association is sufficient and avoids duplicate announcements.

![](zeroheight://image/8677359/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## GitHub

<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/tree/main/components/tooltip">
**GitHub: Tooltip**
</shortcut_tile>
</shortcut_tiles>
---

# Design
## Anatomy

![](zeroheight://image/8677359/d1b151eb95988d19a77f9615333a30ca2fbc83e79958aadfebe38c55edaad26e)

1. **Container:** The rounded bubble that holds the tooltip text. It anchors visually to the trigger element via the arrow.
2. **Text:** The label displayed inside the container. It carries the tooltip message.
3. **Arrow:** The small directional pointer that connects the tooltip to its trigger. Its orientation changes based on the tooltip placement.

![](zeroheight://image/8677359/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## States

Tooltips are display only. They do not have hover, pressed, disabled, or focus states of their own. Its visibility is controlled entirely by the trigger element's hover and focus states.

| **States** | **Description** |
| :--- | :--- |
| ![](zeroheight://image/8677359/6b417a103b0ac2ac30fd853fc652d0046d4a8ad0d634a1a0b6c430c059531e63) ![](zeroheight://image/8677359/36fdce75cc31463b080ccda2f1aabf42aa8bc3abc974be8b4be40c25481c2dc5) | **Visible** Shown when the trigger element receives hover or focus. Colour and spacing tokens depend on Mode, see Variants > Mode for the token table. |
---

---

# Code
## Storybook

![](zeroheight://image/9089983/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Accessibility implementation

### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus into the group, onto the selected radio, or onto the first radio when none is selected. When the info icon is on, it takes focus first. When focus is already inside the group, moves it to the next focusable element after the group. |
| `Shift` + `Tab` | Moves focus out of the group to the previous focusable element. |
| `Space` | Selects the focused radio if it isn't already selected. |
| `Arrow Down` / `Arrow Right` | Moves focus to the next radio and selects it. From the last radio, moves to the first. |
| `Arrow Up` / `Arrow Left` | Moves focus to the previous radio and selects it. From the first radio, moves to the last. |

---

### ARIA

* Role:
    * Group the native radio inputs (`input` with `type="radio"`) in a `fieldset` with a `legend`, or in an element with `role="radiogroup"`.
* Required attributes:
    * Name the group with the `legend`, or with `aria-labelledby` pointing to the group label when using `role="radiogroup"`.
    * Give every radio in the group the same `name`.
* Optional attributes:
    * `aria-describedby` on the group, pointing to the supporting text or the error message.
    * `required` on the radios, or `aria-required="true"` on a `radiogroup`, when the group is required.
    * `aria-invalid="true"` on each radio while the group is invalid.
    * `disabled` on each radio when the group is disabled.

---

### Dynamic announcements

When the error appears without focus moving into the group, announce it so screen reader users don't miss it. Either move focus to the first invalid group, or render the message in a live region (`aria-live="polite"`).

![](zeroheight://image/9089983/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## GitHub
---

# Design
## Anatomy

![](zeroheight://image/9089983/8afbfc85e7375e834f2b57d65909ac968d4d53a5a4571be33218774552d1f24a)

1. **Group label**: names the choice.
2. **Required indicator** *(optional)*: a trailing asterisk in `text.danger`. Shown only when a selection is mandatory.
3. **Info icon** *(optional)*: a small circular icon-button beside the label that explains the choice. 
4. **Options**:  Choice items, made up of radio buttons, stacked or arranged in a row within a container for 2 to 5 options.
5. **Supporting text** *(optional)*: guidance at rest, or the error message when the group is invalid.

![](zeroheight://image/9089983/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## States

| ![](zeroheight://image/9089983/af2733a2a511db548a10e169487c4db4df410463ca58606a0b2c46cc2e79363e) | **Default**Resting state. No option is selected unless the form provides a default value. |
| :--- | :--- |
| ![](zeroheight://image/9089983/9f26e0536f7bd8d646d9d0aa797f2d4cf31240b6e3286e8b39507963e1f7c1e5) | **Disabled**The group can't be focused or changed. Every radio is disabled and the supporting text mutes. The label and required indicator keep their colours so the field stays identifiable. Use it when the question doesn't apply in the current context, and don't use it as a substitute for hiding the group.  |
| ![](zeroheight://image/9089983/97bce4e71aca52711ba6ef27699b629b5dac3ee9425242e2ecf98614d33e2afe) | **Invalid**Applied when a required group is submitted without a selection. The supporting text turns red and carries the error message, and every radio shows its invalid treatment. The label doesn't change. Always write the message, so the error doesn't rely on colour. |
---

# Usage
## Overview

![](zeroheight://image/9089983/7b00dca59d66b2ae3beb72149daaebd9e5b3d001f4ad1702f7868519db1518c6)

Radio group wraps a set of Radio buttons in a labelled form field. The group supplies the question, the required marker, an optional info icon, and a supporting or error message, so each radio only has to describe its own option. Choosing one option clears the others, which keeps the answer single and lets people compare every option before they decide.

### When to use

* Use this whenever people choose exactly one option from 2 to 5 and need to see them all. Each option is a [Radio button](https://design.moodle.com/98292f05f/v/latest/p/279392-radio-button), which covers the individual option and its states.
* Use when people must choose exactly one option and the answer is submitted with a form.
* Use when the set is small and fixed, so every option can stay in view at once.
* Use when comparing the options side by side helps people decide, which a collapsed list hides.
* Use when a short text label is enough to understand each option.

<callout background="4" fullWidth="true">

### ❌ When not to use

* Don't use when people can select more than one option, use [Checkbox](https://design.moodle.com/98292f05f/v/latest/p/12e8f6) instead.
* Don't use for a single on or off setting that takes effect immediately, use [Switch](https://design.moodle.com/98292f05f/p/585368) instead.
* Don't use for 6 or more options, use [Select](https://design.moodle.com/98292f05f/v/latest/p/013ac0-select) instead.
* Don't use when each option needs a description or an icon, use [Choicebox](https://design.moodle.com/98292f05f/v/latest/p/78314c-choicebox) instead.

</callout>

![](zeroheight://image/9089983/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Variants

### Content options

Toggles that show or hide parts of the field. They combine freely.

| **Variant** | **When to use** |
| :--- | :--- |
| ![](zeroheight://image/9089983/a238f68da4c3289d82c40e514ca4bc730298c8c43ad58b06662e93d89a137f47) | **Show label** Shows the group label above the options. Keep it on so the question is always visible. Hide it only when a nearby heading already names the choice, and give the group an accessible name in code. |
| ![](zeroheight://image/9089983/cf3337263f86bb0c265cd7379cdc5b161d2612d1d5a359839da55383d438c5b8) | **Info** Adds an info icon beside the label. Use it only when the label and supporting text can't explain the choice on their own. |
| ![](zeroheight://image/9089983/a449ebf53bef35aaf5de471e85f0475e9aa748f1764a4984ccde7831d84aea8f) | **Required** Adds a red asterisk beside the label. Use it when people must choose an option before the form can be submitted, and turn on required validation with it. |
| ![](zeroheight://image/9089983/71c3f9864955c67e6ded0556215d188eb52865c178b3ee1047ebecc9a5257d74) | **Support text** Adds a line below the options for guidance. The same line carries the error message when the group is invalid. Turn it on when the label alone doesn't say what to choose or why. |

<callout background="2" fullWidth="true">

For more on writing labels, using the info icon, and writing supporting text, see [Input](https://design.moodle.com/98292f05f/v/latest/p/56eea2-input).

</callout>

---

### Orientation

Controls how the options sit relative to each other.

| **Orientation** | **When to use** |
| --- | --- |
| ![](zeroheight://image/9089983/4001d57a62efa29f90ff670318fc8c0307eba216761e354b5a10f25a9ad64675) | **Vertical** Stacks the options in one column. This is the default. Use it for most groups, and for any option with a long label. |
| ![](zeroheight://image/9089983/1c374323fce0a0fd1ff41544d6bbc7fc0af0e2458389487c82d2ba0e57f917c3) | **Horizontal** Places the options in a single row. Use it only when every label is short and all options fit on one line at the narrowest width the group appears |

![](zeroheight://image/9089983/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Guidelines

### Usage guidelines

* Ask one question per group. Give separate questions their own groups, each with its own label.
* Pre-select the most common or recommended option when one clearly exists. Leave every option unselected when all options are equally valid, so people make an active choice.
* Order options logically: by how often people choose them, from most to least recommended, or alphabetically. Don't randomise the order.
* Use one control type per group. Don't mix radio buttons and checkboxes.
* Add a "None" option when people need to be able to clear their choice.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/9089983/99a5e4bf6cfb7a6b96815e4a265f227337c1d434aad657c2e14db6499f7bbac0) |   | Pre-select the recommended option when one clearly exists. |
| Don't | ![](zeroheight://image/9089983/2760bb4e42d611b3aa5a33ace43ce78f19a031acb80997da480571fe32e1b8d0) |   | Don't pre-select an option when every option is equally valid. |

---

### Content design

#### Content structure and constraints

* Name the group with a short noun phrase in the label. Aim for 5 words or fewer.
* The group holds Radio buttons only. Don't place other controls or custom content between the options.
* Keep supporting text to one short sentence that says what to choose or why it matters. Don't repeat the label.

<callout background="2" fullWidth="true">

For how to write the option labels themselves, see [Radio button](https://design.moodle.com/98292f05f/v/latest/p/279392-radio-button).

</callout>

#### Content behaviour

* A vertical group grows taller with each option. A horizontal group stays on one line, so its options must fit the available width.
* When the group becomes invalid, the error message takes the place of the supporting text.

#### Copywriting

* Write the group label in sentence case. Name the choice rather than giving an instruction.
* Write error messages that say what to do next, as a full sentence.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/9089983/7db7d15526bc751d100d335ae1c74248793c49453386a6d919e0eb9fe86d750b) |   | Name the choice with a short noun phrase. |
| Don't | ![](zeroheight://image/9089983/c4de60447e2aa6be888604d65983f2894724fc68448eea211402ebb8cc91756f) |   | Don't turn the label into an instruction. |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/9089983/c87deaa0b73e7239b955e8475968a01c9317e8d2f01229303c334aa704aee5e0) |   | Say what to do next. |
| Don't | ![](zeroheight://image/9089983/32525a58b30983a97fa63b8a30c1aada73502a6c44579ec4a64bb500f084f21e) |   | Don't describe the failure without saying how to fix it. |

---

### Layout and spacing

* Vertical groups space the options with spacing.xs. Horizontal groups use [spacing.md](http://spacing.md). Keep the built-in spacing, and don't add margins between the label, the options, and the supporting text.
* Put 2 to 5 radio buttons in a group. One radio isn't a choice, and a longer list is a job for Select. In Figma, the Options slot accepts Radio button instances only and is set to this range.
* Use Vertical by default. Use Horizontal sparingly.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/9089983/caeebbb27317353e2c9422942d92ccc7fdde3d854c2d79277d7446423098fb22) |   | Use a group for a small, fixed set of 2 to 5 options. |
| Don't | ![](zeroheight://image/9089983/faa876f2a195f48ea5738daaf5647b5a13c8371c408f4b36426f27d1d0d2e017) |   | Don't use a group for a long list. Use Select instead. |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Caution | ![](zeroheight://image/9089983/12612d5069e083f2308d26b36b899b5e6c4380a8a752f0a88f81686750c9d23c) |   | Give user at least 2 options to choose between. |
| Don't | ![](zeroheight://image/9089983/c8544990083707ac457ffc7aef95f9fa550e526c3b3dcd49009f1adf081ba1b2) |   | Don't use a single radio button. Use a Checkbox or a Switch for a binary choice. |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/9089983/2467ed9d8c8fb567de7a42ea458188eae68ed5cca51acefce38be6778d3e8fd6) |   | Stack the options vertically by default. |
| Caution | ![](zeroheight://image/9089983/2725145a1ecfcfb1f5293bebf1d184d4942fe007db06f226a9e37f72a1a8686a) |   | Use Horizontal sparingly, and only when every option fits on one line. |

---

### Breakpoints and responsive behaviour

* Vertical groups keep their layout at every breakpoint.
* Horizontal groups don't wrap. Switch to Vertical when the options no longer fit on one line, which usually means small screens.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/9089983/bd295645ff0fd3ecdd2abbb4c6f986134e229c35c1c741f10891b0adfb2830ca) |   | Switch a Horizontal group to Vertical when the options no longer fit. |
| Don't | ![](zeroheight://image/9089983/70315eeba01cb8ffe6c001192367c55a0f3cc0d671a1e34c4db765300272e580) |   | On a narrow screen, avoid horizontal overflow, clipping or wrapping. |

---

### Interaction behaviour

* Selecting an option clears any other selection, and removes the invalid state and the error message straight away.
* Show the invalid state when someone submits a required group without a selection, not before they've had the chance to choose.
* A disabled group can't be focused or changed. Use it only when the question doesn't apply in the current context, and hide the group when the reason isn't obvious.

---

### Accessibility guidelines

#### Colour and contrast

* The group label and the supporting text must meet a 4.5:1 contrast ratio against the background (Web Content Accessibility Guidelines (WCAG) level AA).
* Pair red indicators with an error message. Never rely on colour alone to indicate an invalid state; always include the error message in the supporting text.

#### Focus

* Focus enters the group on the selected option, or on the first option when none is selected. The group itself doesn't take focus.
* When the info icon is on, it comes before the options in the tab order.

#### Labelling

* Every group needs a name that assistive technology can announce. The group label provides it. When Show label is off, supply the name in code.
* Mark a required group as required in code too, so assistive technology announces it and not only the asterisk.
* Give the info icon-button a descriptive accessible name that includes the label, such as "More information about notification frequency".

![](zeroheight://image/9089983/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Related

#### Used with

<shortcut_tiles>
<shortcut_tile url="https://design.moodle.com/98292f05f/p/279392-radio-button" page-id="8052231">
**Radio button**

each option in the group is a Radio button. Its page covers the indicator, label content, and the selected, focus, and disabled states.
</shortcut_tile>
</shortcut_tiles>
---

---

# Code
## Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-radio--default)

Props and types (TypeScript API): [Radio.d.ts](https://unpkg.com/@moodlehq/design-system/dist/components/radio/Radio.d.ts)

Full list of props and their types for Radio button.

![](zeroheight://image/8052231/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Accessibility implementation

### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Space` | Selects the focused radio button |

---

### ARIA

* Role:
    * Uses a native `input` with `type="radio"` (implicit `radio` role).
* Required attributes:
    * Provide an accessible name:
        * visible `label` when `hideLabel={false}`, or
        * `aria-label` / `label` fallback when `hideLabel={true}`.
    * For proper group behaviour, radios should share the same name within a set.
* Optional attributes:
    * `aria-invalid` is applied automatically when `invalid=true`.
    * `aria-describedby` is applied automatically when `invalidFeedback` is rendered (`invalid=true` and visible label mode).
    * Native `required`, `disabled`, `checked`, and `value` are supported and forwarded to the input.

---

### Dynamic announcements

* Announcements rely on native radio semantics:
    * selected/unselected state,
    * position within the same `name` group,
    * invalid state via `aria-invalid`.
* If explicit spoken updates are required (for example, “Option changed to Phone”), add an app-level live region in the consuming flow.

![](zeroheight://image/8052231/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## GitHub

<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/tree/main/components/radio">
**Radio component**
</shortcut_tile>
</shortcut_tiles>
---

# Design
## Anatomy

![](zeroheight://image/8052231/52fd4b810710b2b23f9a5e13c3684ca79c4cbec9b778b91a9320ce180df4ff80)

1. **Hit area**: the wrapper that groups the radio input and its label.
2. **Radio indicator**: the circular control that shows the selection state. It displays as empty (unselected) or filled with a dot (selected).
3. **Label**: the text that describes the option. It’s always required for standalone use. It can be visually hidden when the surrounding context (for example, a table column header or a selectable card) provides enough identification. When the label is hidden, an `aria-label` must be provided in code.

![](zeroheight://image/8052231/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## States

| **States** | **Description** |
| :--- | --- |
| ![](zeroheight://image/8052231/0f26756bf6e0714cb3bda0d3b3355bbac5e2ecf0c536f966aa1ee3008dbd7369) | **Unselected** Default state. No option is selected, and the radio indicator appears as an empty circle. This is the initial state when no default value is set. |
| ![](zeroheight://image/8052231/1a8c6248c13bbd8a833d4b95b3bb9d8c4f53756801f05a63e5021e1b14a60e2c) | **Selected** An option is selected. The radio indicator shows a filled circle with a dot, and selecting this option deselects any other radio in the same group. |
| ![](zeroheight://image/8052231/8149fcb56a54112b71440de9ee6083d56d8826e33d9991eb1ddef45bf05c79d3) | **Disabled** The option can’t be interacted with. Both the indicator and label appear with muted colours. Don’t use the disabled state instead of conditional logic; if an option is unavailable in a given context, hide it or explain why. |
| ![](zeroheight://image/8052231/fc83d05d66c2ca65bf589bc231aa091e6a06b4afac04a1ea2d03c3e4a79a8c54) | **Disabled + Selected** A pre-selected option the user can't change. Use sparingly, only when the system locks the value and the user needs to see it. |
| ![](zeroheight://image/8052231/7938c837851715fe9edf83e95b5b07240da9bcef639e5f839582c7567b8e1b30) | **Invalid** Applied when the radio group is required and the user tries to proceed without making a selection. The indicator border and label turn red to signal the error. Inside a Radio group, set the state on the group so every option shows it. Don't set it on a single option. |
| ![](zeroheight://image/8052231/74ad236d06daa74d32ccaf10c6a814823d23d75a602eaf5bb596887c254b319f) | **Focus** Shown when the radio receives keyboard focus. A visible focus ring appears around the radio indicator. In the invalid state, the focus ring uses the danger token to maintain visual consistency with the error treatment. A 2px ring shows around the circle, offset from its edge. |
---

# Usage
## Overview

![](zeroheight://image/8052231/d9d882025eff3594864ffef32de67bcd0a37edf5d7e32f7f7ef51f426bc713a4)

Radio buttons are form controls that let users select one value from a predefined set of options. When a user selects an option in a group, it automatically deselects any previously selected option. Use radio buttons when users need to see all available options at once and make a single, final choice.

Radio buttons always sit inside a [Radio group](https://design.moodle.com/98292f05f/p/366522), which adds the group label, validation message, and layout.

### When to use

* Radio buttons are the options inside a [Radio group](https://design.moodle.com/98292f05f/p/366522). To let people choose one option from 2 to 5, use Radio group instead, and don't use radio buttons on their own.
* When users must select exactly one option from a predefined list.
* When users benefit from seeing all options before making a decision. Unlike a [Select](https://design.moodle.com/98292f05f/p/013ac0), radio buttons expose all choices immediately.
* When the choice is mutually exclusive.

<callout background="4" fullWidth="true">

### ❌ When not to use

* **Use a Checkbox instead** when users can select more than one option, or when the choice is binary and independently togglable (for example, "I agree to the terms").
* Don't use a single radio button in isolation. Place radio buttons in a radio group. Radio buttons only make sense when used in groups of two or more.

</callout>

![](zeroheight://image/8052231/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Variants

Radio button has no variants. Selected, invalid and disabled are states. See States on the Design tab.

![](zeroheight://image/8052231/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Guidelines

#### Content structure and constraints

* Radio button labels must be concise, ideally a single word or short phrase. Avoid full sentences unless the choice genuinely requires it.
* Labels describe the option itself, not the action of selecting it. Write "Weekly" not "Select weekly".
* Capitalise only the first word of each label (sentence case).
* As a guide, aim for no more than 4–5 words per label.

#### Content behaviour

* Labels don't truncate: they wrap to a new line if the container is narrow. Define an appropriate maximum label length for your context.
* The label is always positioned to the right of the radio indicator.

#### Copywriting

* Keep options grammatically parallel. If one option is a noun, make all options nouns. If one is a phrase, make all options phrases.
* Avoid negative wording in option labels when possible. "No notifications" is easier to scan than "Don't notify me".

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8052231/5e211125c7fb4ba1e138e0eb1ae9e821cb74b9c85949c6f21d265d198dd0600f) |   | SHOULD write short labels that follow the same structure. |
| Don't | ![](zeroheight://image/8052231/fb3e52e9f0c67e135ac8645e785e0c80dc56eba15dc75bc5ffb3d130e7ee260a) |   | SHOULD NOT mix grammatical structures in the labels. |

### Interaction behaviour

* Clicking or tapping the radio indicator or its label selects that option.
* Selecting a radio button in a group automatically deselects the previously selected option.
* Radio buttons can't be deselected by clicking them again. To clear a selection, the user must select a different option. 

---

### Accessibility guidelines

#### Colour and contrast

* The radio indicator border must have a minimum contrast ratio of 3:1 against its background.
* Label text must meet a minimum contrast ratio of 4.5:1 against the background (WCAG AA).
*  The selected state (filled dot) must be visually distinguishable without relying on colour alone. The shape change (empty → filled circle) provides the secondary indicator.
* The focus ring must be visible on both light and dark backgrounds.
* The invalid state uses red to signal an error. Don't rely on colour alone. Always pair the invalid indicator with a visible text message. Screen readers must be able to announce the error; see Code → Accessibility implementation for the required ARIA attributes (aria-invalid, aria-describedby).

#### Focus

* Radio buttons receive focus individually via keyboard.
* A visible focus ring is shown around the radio indicator when focused.
* Focus ring treatment is inherited from the MDS global focus style.
* In the invalid state, the focus ring reflects the danger treatment to remain consistent with the error context.

#### Labelling

*  Every radio button must have an associated label. Use a `<label>` element linked via `for` and `id` attributes, or an aria-label attribute when a visible label isn't possible.

![](zeroheight://image/8052231/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Related

#### Used with

<shortcut_tiles>
<shortcut_tile url="https://design.moodle.com/98292f05f/p/366522-radio-group" page-id="9089983">
**Radio group**

wraps radio buttons with a group label, a validation message, and the layout.
</shortcut_tile>
</shortcut_tiles>
---

---

# Code
## Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-input-input--default)

Props and types (TypeScript API): [Input.d.ts](https://unpkg.com/@moodlehq/design-system/dist/components/input/Input.d.ts), with shared field props in [BaseInput.d.ts](https://unpkg.com/@moodlehq/design-system/dist/components/input/BaseInput.d.ts)

Full list of props and their types for Input.

![](zeroheight://image/8942841/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Accessibility implementation

### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus to the field, then to the toggle button if present. |
| `Shift + Tab` | Moves focus to the previous interactive element. |
| `Enter` | Submits the surrounding form, unlike Text area, where Enter inserts a line break. |
| `Arrow keys` | Move the caret within the value. |
| `Home` / `End` | Move the caret to the start or end of the field's content. |
| `Ctrl / Cmd + A` | Selects all text in the field. |
| `Space` / `Enter` on toggle button | Switches the password value between hidden and visible, without moving focus. |

---

### ARIA

* Role: native `<input type="text">` / `<input type="password">`, exposed as a textbox.
* Required: accessible name via `<label for>` or `aria-labelledby`; `aria-label` when `hideLabel` is on.
* Pair `invalid` with `aria-invalid="true"` and connect the supporting text via `aria-describedby`, so the failure reason is announced, not just shown in colour.
* The leading icon on the Text variant is decorative (`aria-hidden`) unless it's conveying information the label doesn't already carry.
* Toggle button: its own `aria-label`, updating with state ("Show password" / "Hide password"), not a generic "Toggle".
* Read-only: `readonly` / `aria-readonly="true"` supported at the attribute level; no distinct visual treatment.

---

### Dynamic announcements

There's no live region. The validation message is linked to the field with `aria-describedby` and the field gets `aria-invalid`, so screen readers read the error when the field gets focus.

![](zeroheight://image/8942841/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## GitHub

<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/tree/main/components/input">
**GitHub: Input**
</shortcut_tile>
</shortcut_tiles>
---

# Design
## Anatomy

![](zeroheight://image/8942841/0a7669495f263ac81ac4a8af455c640fd851ac1c1154cca9745c47c4c4a218c3)

1. **Label text**: the field's name. Text style: `UI text/UI small`.
2. **Info icon** *(optional)*: a circular icon-button next to the label (`fa-circle-info`), built from the Button component's icon-only pattern.
3. **Required indicator**: a trailing asterisk next to the label text. Shown only when the field is mandatory.
4. **Field container**: the bordered box holding the input row. Border and background respond to state. See States, below.
5. **Leading icon** (optional): a swappable, decorative icon at the start of the field.
6. **Placeholder text** a hint before user types. Text style: `Paragraph/Base text`.
7. **Value**: what the user types. Text style: Paragraph/Base text.
8. **Trailing icon** *(invalid only)*: appears only when the value fails validation (`invalid` is true). Uses `fa-circle-exclamation` in the danger colour.
9. **Supporting text**: help text at rest, or the validation message when invalid. Text style: `Paragraph/Small`.

![](zeroheight://image/8942841/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## States

| **States** | **Description** |
| --- | --- |
| ![](zeroheight://image/8942841/f965c1385747c6f517a21318a42834ea3bec376fdaa7127b2bcbcd4b39f7a495) | **Default** The field's resting state, before any interaction. Shows placeholder text until the person starts typing. Transparent field with a 1px border. |
| ![](zeroheight://image/8942841/92718fda3cb30e5a48b261285a8f41057cc10deb5034121519d1f31529f36539) | **Hover** The pointer is over the field, before it gains focus. The background changes. |
| ![](zeroheight://image/8942841/96edc1c457d4899af8555e001223b95bfaf36c5ba0aa1a5d0ef09426c6a3c059) | **Active** The moment of mouse-down on the field, just before focus lands. The background and border change. |
| ![](zeroheight://image/8942841/74a1a0348f7acfc742afd6120c17597d4cb9ed0f0c580c45db1741e06c3e6ec2) | **Focus** The field has keyboard or pointer focus and is ready for input. With keyboard focus, the border and a 2px ring use the focus colour. |
| ![](zeroheight://image/8942841/baa389f04f424949e42a1039e0a8dfd23fde31005ba920d8480d14e29849ffdb) | **Invalid** The value has failed validation. This is a modifier, not a standalone state. It layers onto Default, Hover, Active or Focus, swapping the border and supporting text to the danger palette and adding a trailing circle-exclamation icon. Disabled and Read-only don't carry an invalid state. |
| ![](zeroheight://image/8942841/990e0b264cf4aa94055c46ebde5b45ac392d733cf0d991a04dd7d3ad0e1a4a08) | **Disabled** The field can't be focused, clicked, edited or copied. Use for a field that's conditionally unavailable in the current context, not for data the person simply isn't allowed to edit (that's Read-only). |
| ![](zeroheight://image/8942841/6ca96b87b3465caadce9dbc8b47c497f0c4ff43fccc35e89710707fd60845452) | **Read-only** The field always shows a value and is focusable and copyable, but not editable. The value is muted. |
---

# Usage
## Overview

![](zeroheight://image/8942841/d05b551196687350d9fc7649f4dfdc5ef16a51f78d9b75f450a4ec33383952e3)

Input is a single-line field for short, freeform or structured data entry: names, emails, passwords, phone numbers, IDs, and search terms.

It's built as one component with visible variants for Text, Password and Search, and covers the common HTML text-family input types through implementation guidance. 

It supports a label, placeholder, filled content, supporting text, validation messaging, and the text-based input types described below.

### When to use

* Use **Text** for single-line, short values where the expected length is predictable: names, emails, usernames, short labels. **Text** is the default input variant.
* Use [Password](https://design.moodle.com/98292f05f/p/004fcf-password) when the value should be masked by default with an optional reveal.
* Use [Search](https://design.moodle.com/98292f05f/p/38ca1d-search) when the person is filtering content, either instantly or through an in-place results list.

<callout background="4" fullWidth="true">

### ❌ When not to use

* Don't use for multi-line, longer-form text: comments, descriptions, messages. Use the **Text area** component instead.
* A field that submits a form on its own. `type="submit"` renders as a button, not a text field. Use the Button component for that control; don't build it as an Input variant.
* Don't use if you need a live character/word counter. That's a Text area feature, not currently supported here.

</callout>

![](zeroheight://image/8942841/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Variants

### Content options

| **Toggles** | **When to use** |
| :--- | :--- |
| ![](zeroheight://image/8942841/d7440318f9db35b1089db6bfe991c034fcc6e75cd52b69a7a67b56f557a75253) | **Show label (on by default, set `hideLabel` to hide it)** Shows the label above the field. Say what the field expects. |
| ![](zeroheight://image/8942841/87c323db9a0d9b26ac853b78644892ad60d93ac49891bf0c625c4c33afca6a18) | **Info (`infoTooltipLabel`)** Adds an info icon next to the label. Use only when the field's purpose isn't clear from the label, placeholder, and supporting text, or to explain how the value affects something elsewhere. See the [When to use the info icon](https://design.moodle.com/98292f05f/p/56eea2-input/t/ca4d7f7bb3) guidance. |
| ![](zeroheight://image/8942841/4cb595a25125dd52f073959182c24f5537993cadf42ef26c09eac010819d805c) | **Required** Adds a red asterisk next to the label. Validation will fail if people leave this input empty. |
| ![](zeroheight://image/8942841/5c4500a948f746c9bccf52dd750038c7534406632dccf9cee19534ceefdcf670) | **Leading icon (`startIcon`)** Adds a decorative icon inside the field, such as a lock for a password or a person icon for a username. Never use an icon as the only way to identify what the field is for. |
| ![](zeroheight://image/8942841/fd2eef89092287f757010ab02be03e27693c3df1e22d0651e5d9c177ba5dc57c) | **Supporting text (`supportingText`)** Adds guidance or validation text under the field. Turn it on when the label alone doesn't explain what's needed. |

---

### States

| **State** | **What it means** |
| --- | --- |
| ![](zeroheight://image/8942841/bf607ac6ecd185baf9f5b5dd1caf3aee70131cb77ff24ebe89902ac0f6b09370) | **Empty (no value)** No value entered. Shows the placeholder if the input has one. |
| ![](zeroheight://image/8942841/5196fe646f7373dba5689d9fe29568fa21851fef3854bcb95a2c8a7ca0fd6340) | **Filled (has a value)** Shows the value that the person has entered. Supporting text and validation react to this state. |
| ![](zeroheight://image/8942841/b83d3e2c010c30045607338a209f0350124f54bf15341571d721a0eb83f07835) | **Disabled** The input field is empty, and the person can't enter anything in it. Usually because something else needs to happen first, for example, a previous field needs to be filled. |
| ![](zeroheight://image/8942841/9d4e14398a048a5d189698399a183b32d3b83cca0151db43e5a91053a673fb59) | **Read-only (`readOnly`)** Shows existing content that the person can't change. |

#### Disabled vs. read-only

These two are easy to confuse, because neither of them can be edited. Disabled inputs are empty, and can't be filled at that moment. Read-only means there's existing content the person can review but not change. 

|   | **Disabled** | **Read-only** |
| --- | --- | --- |
| **Typical use** | Not available until the person fills in something else first. For example, a 'City' field that's disabled until a 'Country' is selected. | The field contains a value that the person can't change (for example, no edit permission) |
| **Can receive focus** | No | Yes |
| **Can be copied** | No | Yes |

---

### Type

Input has three types: Text, [Password](https://design.moodle.com/98292f05f/p/004fcf), and [Search](https://design.moodle.com/98292f05f/p/38ca1d).

In code, each type is its own component: `Input`, `PasswordInput` and `SearchInput`. On `Input`, set the HTML type with the `type` prop. If you leave it out, you get `text`.

#### Text

Text is a single-line input for text-based values, such as names, email addresses, phone numbers, or URLs. 

It covers five HTML input types that share identical visual treatment. They differ only at the code level. 

Pick the right HTML type to give users the correct mobile keyboard, browser validation, and autofill options. This is an accessibility requirement, not a visual choice.

| **HTML types** | **When to use** |
| :--- | :--- |
| ![](zeroheight://image/8942841/9b850562638d547856f7b244a8ee808998bda57bf1cc00fb2a681fc513f025aa) | **Text** (default) Freeform values with no fixed format: names, titles, IDs made of mixed characters. The default when no other type applies. |
| ![](zeroheight://image/8942841/b700d2c17d195e2a7d32aadab395531b1ebbf8d856e7b437e3666f5c220bb7fc) | **Email** An input to enter a single email address. Brings up the @ symbol on mobile keyboards and triggers the browser's native email format validation. |
| ![](zeroheight://image/8942841/8bc739505ca9c66668dda8e16c5e6ae7beee781e07f7907148abb4279e5d9cea) | **Number** For values used in a calculation or that increment, like a quantity. The number type removes leading zeros and rejects characters like +, so don't use it for values that only look like numbers, such as phone numbers or post codes. |
| ![](zeroheight://image/8942841/50713ce8c392c431c7a0dc753182f147627d4f279c7d3dca098e6f76b307783b) | **Tel** For phone numbers. Opens the numeric phone keypad on mobile without enforcing a format. Phone formats vary too widely across regions for native validation to help. |
| ![](zeroheight://image/8942841/a2efcabc08e04b3c4c96f5ac7b38586391c26cb8cc684d487ebe26f6e9330703) | **URL** For a single web address. Brings up a keyboard with `/` and `.com` shortcuts and triggers the browser's native URL format validation. |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8942841/8f347af6581e08099cbbee959ce196a4e277b95d6667b2b7e51e34b740a22cba) |   | MUST use the tel type for any phone number, including international ones. |
| Don't | ![](zeroheight://image/8942841/eb66ea868883703a403d55aa67ddfc9343f5e007f650ba6e5e6183ba26b7b5b6) |   | MUST NOT use the number type for phone numbers. It strips leading zeros and blocks +. |

#### Password

See [Password](https://design.moodle.com/98292f05f/p/004fcf).

#### Search

See [Search](https://design.moodle.com/98292f05f/p/38ca1d).

![](zeroheight://image/8942841/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Guidelines

### Usage guidelines

* Use HTML type `text` when the value doesn't match any other type. It's the correct choice, not a fallback.
* The HTML type doesn't add an icon. The leading icon is optional and you choose it.

---

### Content design

The input should tell people exactly what to enter in the field, and how to fix any errors.

#### Label

* Say what the field expects using a name, not an instruction. For example, "Email address", "Username".
* Use sentence case: don't capitalise every word.
* Skip articles ("a", "the") unless they're needed for clarity. 

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8942841/0ed61d1f5d010a8442ecb1598e3772ed23f84910ce498a5addbff5164dd4ca6b) |   | SHOULD name what goes in the field, in sentence case. |
| Don't | ![](zeroheight://image/8942841/75900568fcb62fa2671d60a2bc2d8fb3b445cfec0269e9f2995bce6896e371d7) |   | SHOULD NOT phrase the label as an instruction. It reads like a command, not a name for the field. |

#### Placeholder

* Optional. Use it only to show a format hint, for example, a phone number pattern.
* Don't repeat the label. If the placeholder says the same thing as the label, it's adding nothing. Either show an example or leave it empty.
* Never use it as a substitute for the label, or for anything the person needs to complete the field. Placeholder text disappears the moment someone starts typing, and assistive technology and password managers can't rely on it.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8942841/f3bab0f3931151719bc82bcd4e199296b71f12439d4a56ea18554d80607e7d3d) |   | MUST use the placeholder only for a format hint, never instead of a label. |
| Don't | ![](zeroheight://image/8942841/44089600ebedab1cb3945a6fe04831e06ec9042c73638ed70d1eb8e1c907027f) |   | MUST NOT repeat the label in the placeholder or put required instructions there. It disappears as soon as someone starts typing. |

#### Supporting text (help and validation)

* A single line of text that gives a formatting hint the label doesn't cover, or the specific error in the invalid state.
* On error, say what went wrong and what to do next. Don't just flag that something's invalid.
* Write error messages that explain what is wrong and how to fix it. For example, "Email must include an `@` symbol", rather than "Invalid input".

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8942841/a6909696c4f342aa5e78ad6321598d0b094773f6fdba66a989fb45900cb1d3cf) |   | MUST say what went wrong and exactly how to fix it when there's an error. |
| Don't | ![](zeroheight://image/8942841/d0dbc5adff3f92dd469708c96def09b8437d0cd21b19fbf5a885a82d0145fbbb) |   | MUST NOT just flag that something's invalid without saying what or how to fix it. |

#### When to use the info icon

![](zeroheight://image/8942841/3228224366ad679d76cd9976f9e475227082eeff46eaa9c8d7377ca8ec80cd94)

Most fields shouldn't need one. A clear label, a useful placeholder, and supporting text where needed should be enough. Use the info icon only when those aren't enough, never as a fix for a label or supporting text that could just be clearer.

**Use it when:**

* The value affects something elsewhere in a way the label doesn't make clear, for example, where it will appear, or what it controls.
* The field's purpose isn't clear from the label, placeholder, and supporting text, and a short explanation is the only way to prevent confusion.

**Don't use it for:**

* Anything the person needs in order to complete the field correctly or avoid an error. That belongs in supporting text, visible by default, not behind a click.
* Repeating what the label or placeholder already says
* If a whole section or form needs info icons everywhere to make sense, that's a structure problem to fix at form level, not field by field.

---

### Layout and spacing

* Label, field, and support row stack vertically with `--mds-spacing-xxs` gap between them, same as Text area.
* The field is full-width of its container (`w-full`) by default. There is no intrinsic min/max-width; sizing constraints belong to the container/layout, not the component.
* The height is fixed and does not grow with the content; it is single-line. The Search variant is the one exception: it grows vertically once the badges wrap. See the [Search](https://design.moodle.com/98292f05f/p/38ca1d-search/t/eadf101af0) page.

---

### Breakpoints and responsive behaviour

* The field stays full-width of its container across breakpoints.
* Content exceeding the field's width scrolls horizontally within the input (native browser behaviour). Keep values and validation messages concise rather than relying on this to reveal overflow.

---

### Interaction behaviour

* Hover changes only the container fill; the border stays the same, keeping the affordance subtle.
* Active swaps the border to the primary accent on press, ahead of focus landing.
* Focus swaps the border to the focus token and doubles its weight, with padding compensating so the field doesn't visibly resize.
* Disabled blocks all interaction.

---

### Accessibility guidelines

#### Colour and contrast

* Field text and placeholder meet 4.5:1 contrast against the field surface, including the invalid state.
* The invalid state never relies on colour alone: border, icon, and message reinforce it together.

#### Focus

* The focus ring is always visible on keyboard focus. Never suppress or override it.
* Focus lands on the text input itself, not on the decorative leading icon.

#### Labelling

* Always associate the Label with the input (`<label for>` or `aria-labelledby`).
* If `hideLabel` is on, still provide `aria-label`.
* Give the info icon-button its own descriptive `aria-label`.

#### States

* Pair the required asterisk with `required`/`aria-required="true"`.
* Use the native `disabled` attribute for disabled, and `readonly`/`aria-readonly="true"` for read-only.
* Read-only fields use the native `readonly` attribute (not `disabled`), so they stay in the tab order and remain announced correctly by screen readers.
---

---

# Code
## Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-input-passwordinput--default)

Props and types (TypeScript API): [PasswordInput.d.ts](https://unpkg.com/@moodlehq/design-system/dist/components/input/PasswordInput.d.ts), with shared field props in [BaseInput.d.ts](https://unpkg.com/@moodlehq/design-system/dist/components/input/BaseInput.d.ts)

Full list of props and their types for Password.

![](zeroheight://image/8951300/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Implementation notes

* Don't block pasting into the field. Password managers and generated passwords depend on paste. Disabling it is a known usability anti-pattern with no real security benefit. This is enforced at the implementation level; there's no design toggle for it.

![](zeroheight://image/8951300/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Accessibility implementation

### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus to the field, then to the toggle button. |
| `Shift + Tab` | Moves focus to the previous interactive element. |
| `Space` / `Enter` on toggle button | Switches the value between hidden and visible, without moving focus away from the field. |

---

### ARIA

Toggle button: own `aria-label`, updating with state: "Show password" when masked, "Hide password" when revealed, matching the Content design guidance above.

* Read-only: `readonly` / `aria-readonly="true"` supported at the attribute level, same as Input; no distinct visual treatment.

---

### Dynamic announcements

There's no live region. The validation message is linked to the field with `aria-describedby` and the field gets `aria-invalid`. The show and hide button is named by `toggleLabel`.

![](zeroheight://image/8951300/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## GitHub

<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/tree/main/components/input">
**GitHub: Input**
</shortcut_tile>
</shortcut_tiles>
---

# Design
## Anatomy

*Shares* *[Text Input](https://design.moodle.com/98292f05f/p/56eea2-input)**'s Label, Required indicator, Info icon, Field container, Value/placeholder text and Supporting text exactly. Password-specific parts:*

![](zeroheight://image/8951300/7723fea4f453c7a20a37857a4abb504f1c5747f5405bd20c8375b47a05b3f8f4)

1. **Leading icon**: fixed to a lock glyph. Not swappable, unlike Text's leading icon. Constant regardless of interaction state or content, including Disabled.
2. **Toggle button**: trailing, uses the Button component (ghost / icon-only / medium variant). Shows the "eye" icon when masked, "eye-slash" when revealed. Interactive from the moment it's present, including when the field is empty. Styles and states follow Button's guidelines.
3. **Value / masked text**: a masked value renders bold in the field's default value colour; a revealed value renders regular, matching Text's filled state.

![](zeroheight://image/8951300/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## States

The password variant adheres to the shared state model of the[ Text input ](https://design.moodle.com/98292f05f/p/56eea2-input/t/e2b28fae53)field exactly, including the default, hover, active, focus, invalid, disabled and read-only states, as well as the same tokens and styles. The only exception is that the read-only password displays its value as plain text and is never masked.
---

# Usage
## Overview

![](zeroheight://image/8951300/88537a9d1399326fdae5f7d43b0391e6e27fd9b48cbc920dfc6bf2070037fd5a)

Password is Input's masked-entry variant: a single-line field that hides its value by default, with a toggle to reveal it. Everything about the shared field (label, placeholder, supporting text, states, layout) behaves exactly as documented on [Text input](https://design.moodle.com/98292f05f/p/56eea2-input); this page covers what's specific to Password.

### When to use

Use when the value that people enter needs to be masked by default with an optional reveal: account passwords, passphrase-style secrets.

<callout background="4" fullWidth="true">

### ❌ When not to use

Don't use for values that only need light obscuring for privacy but not security (e.g. a partially-masked account number). That's a different pattern, not this variant.

</callout>

![](zeroheight://image/8951300/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Variants

### States

Password has no variants in code. Use the `PasswordInput` component. Masked and visible aren’t props: the toggle button switches between them. Label the toggle with `passwordToggleShowLabel` and `passwordToggleHideLabel`.

| **Variant** | **When to use** |
| :--- | :--- |
| ![](zeroheight://image/8951300/292f684cd351d78a1a7342fc172311eeb99af70e41ef240f1e3c51ec91febba1) | **Empty** No value entered. Shows the placeholder if there's one. |
| ![](zeroheight://image/8951300/ab0fa140d98875a9ec2ef76f3964ab3a39dd4f3aafd916b3b17874b0c947fe68) | **Filled: masked** The default state once someone types. The values show as dots, hiding the actual characters typed. |
| ![](zeroheight://image/8951300/15f4a099dd032668b51dea3321b7c19aee6032eea38bf2c6afdaa3d4e2ec6bb7) | **Filled: visible** After the person presses the toggle. The value shows as plain text so people can check it before submitting. |

---

### Toggle button behaviour

The password input has a toggle at the end of the field. It switches between showing the password and hiding it as dots. Focus stays in the field.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8951300/e95a434ba357bf23d7153a565cf1e0fcd3d2de730444c0768f38d1787837d793) |   | MUST update the button's accessible name with its state, so screen reader users always know what pressing it will do. |
| Don't | ![](zeroheight://image/8951300/65fcf7f1364befcf2dc5249a63876a3cb81ca4e6b32a1f1d4903eadf6d47f6f2) |   | MUST NOT use a static label that doesn't say what will happen or what state the field is in. |

![](zeroheight://image/8951300/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Guidelines

### Content design

**Supporting text**

* Put the password format requirements in the supporting text, not in the placeholder. Requirements like "must include a number and a symbol" need to stay visible while the person types.
* Show the requirements before the person types, not only after they get it wrong.
* Write requirements as what the password needs, not what's forbidden: "Must be at least 12 characters" rather than "Can't be shorter than 12 characters".

**Error messages**

* Say what's wrong and what to do about it.
* On login, don't say whether the username or the password is wrong. It tells a potential attacker which half they got right. Use one message for both, e.g. "Incorrect username or password."

**Placeholder**

* Password fields usually don't need one. The label and supporting text should be enough.

---

### Interaction behaviour

![](zeroheight://image/8951300/faf27693797c7d96f5c383fcccadb0430c4421ed33ad22c615c5166908430e11)

* Password follows [text input's](/56eea2-input) shared interaction behaviour exactly. Hover, active and focus states behave identically on the field itself. One addition specific to Password: the toggle button is its own focusable control, separate from the field.

---

### Accessibility guidelines

* The toggle button needs a real, focusable `<button>` with an accessible name that updates with state, not an icon alone.
* Click or Enter/Space on the toggle switches the input's `type` between `password` and `text` without moving focus away from the field or submitting the form.
* The toggle's accessible name updates based on the state: "Show password" when masked, "Hide password" when revealed.
* The toggle button is a real control and gets its own focus stop, separate from the field itself.
---

---

# Code
## Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-input-searchinput--default)

Props and types (TypeScript API): [SearchInput.d.ts](https://unpkg.com/@moodlehq/design-system/dist/components/input/SearchInput.d.ts), with shared field props in [BaseInput.d.ts](https://unpkg.com/@moodlehq/design-system/dist/components/input/BaseInput.d.ts)

Full list of props and their types for Search.

![](zeroheight://image/8951303/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Accessibility implementation

### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus through the field, then each badge (if present), then the clear control (if shown), then the chevron (if present). |
| `Arrow keys` / `Enter` *(chevron open)* | Standard listbox/combobox pattern: arrow keys move through results, Enter chooses one, Escape closes the list. |
| `Delete` / `Backspace` *(on a focused badge)* | Removes that badge and returns focus to the field. |

---

### ARIA

* Each badge's own accessible name.
* The clear control's accessible name.
* `aria-invalid` paired with the empty-content rule.
* If the chevron drives a visible results list: `aria-expanded`, `aria-controls`, and listbox/combobox roles as appropriate.

---

### Dynamic announcements

There's no live region. The clear button is named by `clearLabel`. If results update as people type, announce the result count from your page.

![](zeroheight://image/8951303/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## GitHub

<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/tree/main/components/input">
**GitHub: Input**
</shortcut_tile>
</shortcut_tiles>
---

# Design
## Anatomy

*Shares* *[Text Input](https://design.moodle.com/98292f05f/p/56eea2-input)**'s Label, Required indicator, Info icon, Field container, Value/placeholder text and Supporting text exactly. Search-specific parts:*

![](zeroheight://image/8951303/75bf5b32ec9f13aae2baab6429ab59b5b198a0f52c93cd4adc891b68e8696f37)

1. **Leading icon**: fixed to a magnifier glyph when shown.
2. **Placeholder text**
3. **Value**
4. **Clear control**: a dedicated close-button instance, not a generic button. Shown only when Content is Filled.

![](zeroheight://image/8951303/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## States

The Search variant adheres to the shared state model of the [Text input](https://design.moodle.com/98292f05f/p/56eea2-input/t/e2b28fae53) variant and uses a narrower set of shared states, including the default, hover, active, focus, invalid and disabled states, as well as the same tokens and styles. 

However, Invalid state applies only when content is Empty, for example, a required field that's submitted or loses focus with nothing chosen. Filled states don't carry an invalid treatment.

The filled search input can only be disabled in a select scenario, whether single or multi, if it was previously prefilled intentionally.
---

# Usage
## Overview

![](zeroheight://image/8951303/9168e745c73d94d15a913f3209669b321ef95633bb3f50aa8646e0a8e93f3747)

Search is Input's filtering variant: a single-line field for narrowing down or finding content by typing. It has a clear control once there's a value, and can show a chevron when typing reveals a list of results in the same spot.

### When to use

* Use for filtering content directly against what's typed, with results updating in place.
* Use with the chevron when choosing or typing can reveal a list of results in the same spot, rather than just narrowing what's already visible.

<callout background="4" fullWidth="true">

### ❌ When not to use

* Don't use for a search that submits to a separate results screen. That's a different pattern, handled elsewhere.

</callout>

![](zeroheight://image/8951303/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Variants

### States

Search has no variants in code. Use the `SearchInput` component. Empty and filled aren’t props: they come from the value. Label the clear button with `clearLabel`.

| **Variant** | **When to use** |
| :--- | :--- |
| ![](zeroheight://image/8951303/ab13f33810d87ed80bda742e68cb545a1b43661e34dc3a4a956caaf9ef30c629) | **Empty** Resting state: placeholder text shown (if set), no filters applied. |
| ![](zeroheight://image/8951303/2abe8cd8e37eb66bb1c564b0446408538f6e2f80e0d45edfe5bce87c56798da1) | **Filled** Shows Shows the person’s query, with a "clear" control to remove it. |

![](zeroheight://image/8951303/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Guidelines

### Usage guidelines

* Decide instant-filter vs. in-place-results at the point of use, based on whether there's already a visible list to narrow. Don't mix both behaviours on one instance.

---

### Content design

* Use the placeholder to hint at what can be searched, for example "Search courses". Never use it as a substitute for the label.
* Name the clear control for the action it performs: "Clear search", not "Clear".
* When a required Search field is submitted empty, say what's missing and how to fix it, not "This field is required."

---

### Interaction behaviour

* Tab order: Field → clear control (filled only) 

---

### Accessibility guidelines

* The clear control needs a real, focusable `<button>` with an accessible name, not an icon alone (same principle as Password's toggle).
* Pair the empty-and-invalid state with `aria-invalid="true"` and connect it to the supporting/error text via `aria-describedby`, same as any other Input variant.
* If the chevron drives a visible results list, follow standard disclosure-control ARIA (`aria-expanded`, `aria-controls`, listbox/combobox roles as appropriate). If it's purely decorative of the field's own state, it doesn't need a separate accessible name.
---

---

# Code
## Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default Primary](https://moodlehq.github.io/design-system/iframe.html?id=components-button--default-primary)

Props and types (TypeScript API): [Button.d.ts](https://unpkg.com/@moodlehq/design-system/dist/components/button/Button.d.ts)

Full list of props and their types for Button.

![](zeroheight://image/8332388/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Accessibility implementation

### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus to the button |
| `Shift + Tab` | Moves focus to the previous interactive element |
| `Space` | Presses the button |

---

### ARIA

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

---

### Dynamic announcements

* Screen readers announce button activation and state through native button semantics.
* If your flow needs explicit status messaging after click (for example, “Saved” or “Error”), add an app-level live region in the consuming experience.

![](zeroheight://image/8332388/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## GitHub

<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/tree/main/components/button">
**GitHub: Button**
</shortcut_tile>
</shortcut_tiles>
---

# Design
## Anatomy

![](zeroheight://image/8332388/4de6e0fd18ddb86d3938b7e8b5292c75caf0efd530481fdae7dca0006d279b49)

1. **Label**: the text that communicates the action the button will perform. Always required.
2. **Container**: the bounding shape that defines the button's clickable area and visual weight.
3. **Border** *(Outline variant only)*: the stroke that defines the button boundary. Not present in Fill buttons.
4. **Icon** (Optional): Place before (startIcon) or after (endIcon) the label only when it adds meaning, not decoration.

![](zeroheight://image/8332388/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## States

### Primary fill

| ![](zeroheight://image/8332388/594182cfc9a232826b37524f39691800f5a60cce69ae3bc9a77a2d4e7b6cc4e2) | **Default** The button's resting state. Confirm the label clearly communicates the action before any interaction begins. |
| :--- | :--- |
| ![](zeroheight://image/8332388/0858cb86a4d6c1174e61af0154fffbd845fb7524c459064f38162578e066c9f6) | **Hover** Triggered when the cursor moves over the button. Don't suppress or override this state. Users rely on it to identify interactive elements. |
| ![](zeroheight://image/8332388/2d4cde1d952d7267f5e6b3063862dab44cae1aad95e201160b644a5ee3b05c78) | **Active / Pressed** Triggered while the button is being pressed. Transitions away immediately on release. Don't hold this state. |
| ![](zeroheight://image/8332388/75f8b0486dfc97bceb7dbb10edddfbaa4b8874e62b726908651bddbf9e48478d) | **Disabled** Applied when the action is unavailable. Don't use as a substitute for validation. Keep the button active and show errors on the relevant fields instead. |
| ![](zeroheight://image/8332388/e960d6bd2c78969c77013771af7f064702361bb5bb3a1f0c4f7a0d16966e1fd9) | **Focus** Triggered via keyboard navigation (Tab key). Must remain visible on all backgrounds used in your layout. A 2px focus ring shows around the button, offset from its edge. |

---

### Primary outline

| ![](zeroheight://image/8332388/5d1cdf659ac3482b928670650bde135a19d777715d2696c80f7cd702361e9825) | **Default** The button’s resting state. Transparent background with a 1px border. |
| :--- | :--- |
| ![](zeroheight://image/8332388/d0d1abb35efb97b3a6b9a6e118f39358f12e175f4a12ad4546af58884a0c463a) | **Hover** Shown when the cursor is over the button. The button fills. |
| ![](zeroheight://image/8332388/d8d71456d032903af98eb58b74a2f2b0eb6477941fd2f0e15569c5c76a73bff5) | **Active** Shown while the button is being pressed. The button fills. |
| ![](zeroheight://image/8332388/2ffb27082af68d19384b7c85a39521008a2303996c61fc2655bf18a10918e9a3) | **Disabled** Shown when the action is unavailable. Transparent background with a muted border and label. |
| ![](zeroheight://image/8332388/9207e5195126eee2c1c7c470e3064e2e06bab71b9b11c006e67867734a63bce8) | **Focus** Shown when the button gets keyboard focus (Tab key). A 2px focus ring shows around the button, offset from its edge. |

---

### Secondary fill

| ![](zeroheight://image/8332388/9ce90f762dd62863255c0a99c76cf3b48b355e72bfac9df004e0ba9eec227d39) | **Default** The button's resting state. Confirm the label clearly communicates the action before any interaction begins. |
| :--- | :--- |
| ![](zeroheight://image/8332388/57c2528cc8a650e9b64987e9b9644160ca8c0a9d0a00a37685cdf3dc359a4a5c) | **Hover** Triggered when the cursor moves over the button. Don't suppress or override this state. Users rely on it to identify interactive elements. |
| ![](zeroheight://image/8332388/0440851066e79530b0b088a04fcc856c4eb013098260b06bde93cc19489da422) | **Active / Pressed** Triggered while the button is being pressed. Transitions away immediately on release. Don't hold this state. |
| ![](zeroheight://image/8332388/bee4e8b920359479d998706d1a452153a614e7bde81b0ce1b9870c015324a37a) | **Disabled** Applied when the action is unavailable. Don't use as a substitute for validation. Keep the button active and show errors on the relevant fields instead. |
| ![](zeroheight://image/8332388/afbbefe0b9321aac8a7eaf121cfe749e7392528596aa019d677142507decbbbd) | **Focus** Triggered via keyboard navigation (Tab key). Must remain visible on all backgrounds used in your layout. A 2px focus ring shows around the button, offset from its edge. |

---

### Secondary outline

| ![](zeroheight://image/8332388/393a398d013cdaeaa593d06470a72640a12eb497b27c26671985a4fadcf9ef2c) | **Default** The button’s resting state. Transparent background with a 1px border. |
| :--- | :--- |
| ![](zeroheight://image/8332388/1f742044500b01d457722fca72f8f5c49c84c741867755053fafe59b6052b0fe) | **Hover** Shown when the cursor is over the button. The button fills. |
| ![](zeroheight://image/8332388/04e92728368514ff4d45274d7f9067dbbc79f7e4e4431bbbe879377d8cebbfb8) | **Active** Shown while the button is being pressed. The button fills. |
| ![](zeroheight://image/8332388/94542deb7d9fc0f1f7ef8ef50dd0aa70e5b933523459aa1e136a3285755acc68) | **Disabled** Shown when the action is unavailable. Transparent background with a muted border and label. |
| ![](zeroheight://image/8332388/2b70290b808b54098057e8df5ca2b9af7b885738eccc19f7f4e12c282a39b03c) | **Focus** Shown when the button gets keyboard focus (Tab key). A 2px focus ring shows around the button, offset from its edge. |

---

### Danger fill

| ![](zeroheight://image/8332388/5e25a8dc36badf14e4e3ce7a87de86e3407e7fa9d746e859a8c493da725beec7) | **Default** The button's resting state. Confirm the label clearly communicates the action before any interaction begins. |
| :--- | :--- |
| ![](zeroheight://image/8332388/bb201d914ea0d09cb93ab29da75b3a7b486563c19db95f3fbd53802aa8656e68) | **Hover** Triggered when the cursor moves over the button. Don't suppress or override this state. Users rely on it to identify interactive elements. |
| ![](zeroheight://image/8332388/ae8527ec4ee987ec1275660425d0ae92c1232ecf1bc2a381b5675c1edbb34e24) | **Active / Pressed** Triggered while the button is being pressed. Transitions away immediately on release. Don't hold this state. |
| ![](zeroheight://image/8332388/49bd1706ac1a11a8879fda36ab7b588f395b72053ff979251b0b9a69ab8cbbfe) | **Disabled** Applied when the action is unavailable. Don't use as a substitute for validation. Keep the button active and show errors on the relevant fields instead. |
| ![](zeroheight://image/8332388/c046233c9dc5037c2dd2d40788f565186e0560cae932cad0ea90ca155a258bf9) | **Focus** Triggered via keyboard navigation (Tab key). Must remain visible on all backgrounds used in your layout. A 2px danger focus ring shows around the button, offset from its edge. |

---

### Danger outline

| ![](zeroheight://image/8332388/ccc26f72d366136f5c636be7b3f08f8c859e965b5482ef80cfedc69de9c99850) | **Default** The button’s resting state. Transparent background with a 1px border. |
| :--- | :--- |
| ![](zeroheight://image/8332388/b056ca7baf473ecdcbf1529cecaac7292227eebf98cc46f3afd7536dca40e5be) | **Hover** Shown when the cursor is over the button. The button fills. |
| ![](zeroheight://image/8332388/c75da73411feeaf312e09031c245ff71ae668f1e76040c98e8c12ce098f70ef7) | **Active / Pressed** Shown while the button is being pressed. The button fills. |
| ![](zeroheight://image/8332388/66558131fbc827f5f75a767e61bf5f0b0ced8413e7a7e376c0f3371eab8ddd62) | **Disabled** Shown when the action is unavailable. Transparent background with a muted border and label. |
| ![](zeroheight://image/8332388/2c06cf2c09fcdb808ee6a737ba7c29ccfb04f78af4bd36242d8f9e7ce70f1b90) | **Focus** Shown when the button gets keyboard focus (Tab key). A 2px danger focus ring shows around the button, offset from its edge. |

---

### Ghost

| ![](zeroheight://image/8332388/2a5a397a68fa2a2e3d07daf3f9bd5882b41bea445b5fff91e4ecd502c7819e0d) | **Default** The button's resting state. Confirm the label clearly communicates the action before any interaction begins. Transparent background with no border. |
| :--- | :--- |
| ![](zeroheight://image/8332388/290bc99f23f81ffe97013ae7f47ddc8bae993e8efc54305e1170782173bde0c9) | **Hover** Triggered when the cursor moves over the button. Don't suppress or override this state. Users rely on it to identify interactive elements. |
| ![](zeroheight://image/8332388/8cd378c30e5131b84221abec2155c9c4bcc436b9b11c540d120627e59c29bd87) | **Active / Pressed** Triggered while the button is being pressed. Transitions away immediately on release. Don't hold this state. |
| ![](zeroheight://image/8332388/847c10ee46df24454201b71bb2f96d9c60723125ad9e71aea735d9f57913ace6) | **Disabled** Applied when the action is unavailable. Don't use as a substitute for validation. Keep the button active and show errors on the relevant fields instead. Transparent background. |
| ![](zeroheight://image/8332388/868f15e295e960c7a967109f287a7b7c2030451fa8c5c7df333a45db9a591979) | **Focus** Triggered via keyboard navigation (Tab key). Must remain visible on all backgrounds used in your layout. A 2px focus ring shows around the button, offset from its edge. |
---

# Usage
## Overview

![](zeroheight://image/8332388/743a4b6e5d61eef32f25748eb50c325663fa0f7bc2ff68c13ecd997066cc96da)

Buttons let users trigger actions or navigate to a next step. They communicate what will happen when tapped or clicked, and their visual weight signals the importance of the action relative to others on the screen.

### When to use

* Use when the user needs to trigger an action that changes state or submits data, for example, saving a form, confirming a selection, or starting a process.
* Use when the action needs a clear, tappable target with a descriptive label.
* Use when you need to signal hierarchy between actions. Pair a Primary with a Secondary to communicate which action is recommended.
* Use a Danger button when the action is destructive and the consequence is significant or hard to undo.

<callout background="4" fullWidth="true">

### ❌ When not to use

* Don't use a button for navigation to another page. Use a Link instead.
* Don't use a Danger button for actions that are reversible. Use a Secondary button and rely on confirmation copy instead.

</callout>

![](zeroheight://image/8332388/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Variants

### Variant

Button has 2 props that change how it looks: `variant` and `size`. The `variant` value sets both the colour (Primary, Secondary, Danger or Ghost) and the style (Fill or Outline), e.g. `outline-primary`. If you leave it out, you get `primary`.

| **Variant** | **When to use** |
| :--- | --- |
| ![](zeroheight://image/8332388/a47a200691848164027c80f3a4b1d1073d4a97b0824e9eb2914d51f6c580677a) | **Primary ** The single most important action in a view. Use only 1 primary button per screen or section. |
| ![](zeroheight://image/8332388/213765a22a46e86360189520140d7c75a5e73979b7e60f1bd3a50cc57be6b9d6) | **Secondary ** Supporting actions that are relevant but not the main call to action. Can appear alongside a primary button. |
| ![](zeroheight://image/8332388/d99821f6a93ab777097b6f072251d769d41f44a5ea55da7cf8da8d597285ac0d) | **Danger ** Destructive or irreversible actions, such as deleting content or revoking access. |
| ![](zeroheight://image/8332388/d8404574878c6595ff7721778ed06f83b0dfbfb11a102b5fe97a955f4da11967) | **Ghost ** Low-emphasis actions that need to be present but shouldn't compete visually. Use for tertiary actions, toolbar controls, or actions within already-styled containers like cards or banners. |

---

### Fill or outline

Fill and Outline aren’t a separate prop. They’re part of the `variant` value: Fill is the plain value and Outline adds `outline-` to the front. Primary, Secondary and Danger come in both. Ghost has its own fixed style and has no outline version.

| **Variant** | **When to use** |
| :--- | --- |
| ![](zeroheight://image/8332388/062b36f70035936178ae6900c04681365d0999b742bdc466c492a7c745ef7c2a) | **Fill (`primary`, `secondary`, `danger`)** Default style for most contexts. Use when the button needs clear visual prominence. |
| ![](zeroheight://image/8332388/e5b72bd7e20e060503f29c0d2886389b10dd8283e3a1946e47c2338e0ac06932) | **Outline (`outline-primary`, `outline-secondary`, `outline-danger`)** Use when the button needs to feel lighter, for example, in toolbars, card footers, or alongside a fill button of the same role. |

---

### Size

Set with the `size` prop. If you leave it out, you get `md`.

| **Variant** | **When to use** |
| :--- | --- |
| ![](zeroheight://image/8332388/1740477ed75fa19561a5b3bd7de2acd450952312010f147f6b19003f6863bb36) | **Large (`lg`)** Use in hero areas, empty states, or standalone CTAs where extra visual weight is needed. |
| ![](zeroheight://image/8332388/9d38120a186384d55bebe178d5bbda4aed1a1744debbd544a289f6a599e9df61) | **Medium (`md`, default)** The standard size for most interface contexts. |
| ![](zeroheight://image/8332388/d514828c62dc978234dcba7d65a9d284e7b8b813cfb1a127ff4110ee384b6670) | **Small (`sm`)** Use in dense layouts such as tables, inline actions, or compact toolbars. |

---

### Icon-only

Icon-only isn’t a size. A button is icon-only when it has a `startIcon` or `endIcon` and no `label`. It works with every `variant` and `size`, and it must have an `aria-label` or `aria-labelledby` so screen readers can name it.

| **Variant** | **When to use** |
| :--- | --- |
| ![](zeroheight://image/8332388/14e605b1a9646e40a99b7e0d3df02732da3d488a6a68121a8dc402d64f67879b) | **Large icon-only (`size="lg"`)** Square container with rounded corners, matching the Default button height. Use in toolbars and action bars where icon buttons sit alongside labelled buttons. |
| ![](zeroheight://image/8332388/863984074a1654bd49f1f51c796be7352fe94d70c5a39784e503d4f297040f60) | **Medium icon-only (`size="md"`)** Circular container. Use for standalone icon actions where a label isn't needed but the button needs standard tap target sizing. |
| ![](zeroheight://image/8332388/137180e21a99bee2733c4a906dce14f168cc44bfcda3ab9dd8da1b938ba5412a) | **Small icon-only (`size="sm"`)** Circular container. Use for low-prominence actions in tight spaces, such as overflow menus on cards or inline controls. |

![](zeroheight://image/8332388/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Guidelines

### Content design

#### Content structure and constraints

* Labels support text only. No hard truncation. Avoid labels that wrap to a second line.
* Recommended label length: 1–4 words.
* Buttons support a prefix icon, suffix icon, or icon-only configuration. Don't combine prefix and suffix icons in the same button.
* When using an icon-only button, the visible label is hidden but a text label must still be provided for screen readers.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8332388/f0b203c62b98f441fd9c9b5b9c9f24e88fe33e5d681e095591106399b39f27e9) |   | SHOULD keep labels to 1 to 4 words. |
| Don't | ![](zeroheight://image/8332388/131975fd34460e52c52ab5c5c354623de0b4b1930a6571b27ce85af56c13a769) |   | SHOULD NOT use labels that wrap to a second line. |

#### Content behaviour

* The button width is determined by the label length, not a fixed container width (Hug behaviour).
* In full-width contexts such as mobile bottom bars, the button fills the container width.

#### Copywriting

* Use sentence case. Don't capitalise every word.
* Start with an action verb: "Save changes", "Delete account", "Continue".
* Be specific. "Submit" is weaker than "Save changes". "OK" is never acceptable.
* Don't use punctuation at the end of a label.
* For Danger buttons, name the destructive action explicitly: "Delete course", not just "Confirm".

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8332388/41d839683b720ae20f7ed8fe21f747968c7fd7b774cd3dfbc5b358668032e930) |   | SHOULD use a specific label that describes the outcome. |
| Don't | ![](zeroheight://image/8332388/6df04b769ead83460982230cacc9cdebe2a5b75fcdd629d039ee05bbc98881f8) |   | SHOULD NOT use generic labels that don't tell people what will happen. |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8332388/f98418575da301497c3ba56390c4330e5ee4abfb702e7c8227e7797da920fade) |   | MUST name the destructive action explicitly. |
| Don't | ![](zeroheight://image/8332388/3038315bc3c6c070e47b89fd50fb74714b041a9d4e877daa263dc32c0fa5e8c2) |   | MUST NOT use generic confirmation labels on Danger buttons. |

---

### Layout and spacing

* Place the primary action on the right when buttons appear in a group.
* In modal footers and form footers, align buttons to the right.
* In full-width mobile contexts, stack buttons vertically with the primary on top.
* Don't place more than 1 primary button in the same view.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8332388/90031b0ae321c8f976bb9e66151efa0c88ce90add1960c26941f3020d489bfb6) |   | SHOULD place the primary action on the right in a button group. |
| Don't | ![](zeroheight://image/8332388/55958fb924ab913f39cfbe630c9421c6356cebcb1f6c636c4dce91908e116159) |   | SHOULD NOT lead with the primary action on the left. |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8332388/1793bf134253c0f960e910bce47778f9f74d1bc36997ec19d3a390c85fb38680) |   | MUST use only 1 primary button per view. |
| Don't | ![](zeroheight://image/8332388/8059d85fb5938c12407ad04a4edb9bf13b8295b2a1561fb35a0c6b5cd9780e59) |   | MUST NOT use 2 primary buttons in the same context. |

---

### Responsive behaviour

* At small breakpoints, buttons can expand to full width in single-column layouts.
* Size variant doesn't change automatically at breakpoints. Choose the size intentionally for the context

![](zeroheight://image/8332388/30796a0219e66fc81381419389d1adc3a137dec77be6a8a484d70b815165bae7)

---

### Interaction behaviour

* Cursor: pointer on hover, not-allowed when disabled.
* Use disabled state only when the action is genuinely unavailable.

---

### Accessibility guidelines

#### Colour and contrast

* All Fill variants meet 4.5:1 text contrast ratio against their background colour.
* For Outline variants, ensure the border meets 3:1 against the surrounding background.
* Disabled state contrast is intentionally reduced. Don't rely on disabled alone to communicate unavailability to screen reader users. Supplement with `aria-disabled` or accessible copy.

#### Focus

* The focus ring must be visible on all background colours used in your layout. Avoid placing buttons on dark backgrounds where the focus ring becomes invisible.

#### Labelling

* Always provide a text label. For icon-only buttons, this can be visually hidden and provided via `aria-label`.
* If the label is dynamic (e.g. "Loading..."), ensure the change is announced to screen readers.
---

---

# Code
## Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-checkbox--default)

Props and types (TypeScript API): [Checkbox.d.ts](https://unpkg.com/@moodlehq/design-system/dist/components/checkbox/Checkbox.d.ts)

Full list of props and their types for Checkbox.

![](zeroheight://image/8052226/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Accessibility implementation

### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus to the checkbox |
| `Shift + Tab` | Moves focus to the previous interactive element |
| `Space` | Toggles the checkbox between checked and unchecked |

---

### ARIA

* Role:
    * Uses a native checkbox input `type="checkbox"`, exposed with the implicit `checkbox` role.
* Required attributes:
    * Provide an accessible name.
    * Use a visible `label` by default.
    * If the visible `label` is hidden, provide an accessible name via `aria-label` or by supplying `label` text for fallback.
* Optional attributes:
    * `aria-invalid` is applied when invalid is true.
    * `aria-describedby` is applied when supporting or error text is rendered, so assistive tech reads contextual text.
    * `aria-checked` is set to mixed when indeterminate is true.
    * `required` and `disabled` use native checkbox semantics and can be provided as needed.

---

### Dynamic announcements

* Screen readers announce checked, unchecked, and mixed states through native checkbox behaviour.

![](zeroheight://image/8052226/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## GitHub

<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/tree/main/components/checkbox">
**GitHub: Checkbox**
</shortcut_tile>
</shortcut_tiles>
---

# Design
## Anatomy

![](zeroheight://image/8052226/63cdac4ebceb92eb802691a37f6315b5c8f362e23f316e0292a6d544dd90a31b)

1. **Hit area**: the interactive touch target that wraps the checkbox. Invisible in the UI, but required to meet minimum target size requirements.
2. **Checkbox indicator**: the visible control that shows the selection state through its border, fill, and icon.
3. **Label**: describes what the user is selecting or agreeing to. Required in all contexts except data tables.

![](zeroheight://image/8052226/f5ce522c88d32a9a24c532c9968e71720c3ad288ae5f5b4115ad0af8ed7062cd)

4. **Required marker** *(optional)*: a red asterisk (*) adjacent to the label. Indicates the field must be completed before form submission.
5. **Supporting text** *(optional)*: appears below the label. Used in the Invalid state to explain the validation error and what the user needs to do.

![](zeroheight://image/8052226/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## States

| **States** | **Description** |
| :--- | --- |
| ![](zeroheight://image/8052226/408618ca12f56baccfddaa130b6fc3022c1f8b42ffc15169360bc34b25bb06c1) | **Unchecked** Default state. No option has been selected. The checkbox indicator appears as an empty box. This is the initial state when no value has been set. |
| ![](zeroheight://image/8052226/fea761afb62be9aa29b7f44c256da57ab6d02ca1a3e19a56c198cea441cf9cdf) | **Checked ** The user has selected this option. The indicator fills with the primary colour and displays a checkmark icon. Unlike radio buttons, checking one checkbox doesn't affect others in the same group. The box loses its border. |
| ![](zeroheight://image/8052226/85e6eddf69d8d3449621654abd6d51b867c06d7b33bedf27fbdef1473c164326) | **Indeterminate ** Applied to a parent checkbox when some (but not all) of its child options are selected. The indicator shows a dash icon. This state is set programmatically; never set it manually. The box fills the same as Checked. |
| ![](zeroheight://image/8052226/8246e55cdd57850cb91df5fbe6c98e4c69558559469552956d3b2418384f25ab) | **Supporting text *(optional)*** A secondary line that appears below the label text in any state. Use it to give users additional context about the option, for example, what happens when the checkbox is selected, or what's required. In the Invalid state, this becomes feedback text and communicates the validation error. |
| ![](zeroheight://image/8052226/8a8c9ee5d680a2751eeeeaf96f722f79ca0c57d4dbf22e9a0939d4630d83a738) | **Invalid** Applied when form validation fails, for example, when a required checkbox is submitted without being checked. The indicator border and label text turn red to signal the error. Always pair this state with visible feedback text that tells the user what to do. Don't rely on colour alone. A checked box fills with the danger colour. |
| ![](zeroheight://image/8052226/42dba410e8e288cce6f791f580b55168a9fccccd27a38ca2dc96553c9673045e) | **Disabled ** The option can't be interacted with. Both the indicator and label render with muted colours. Don't use the disabled state instead of conditional logic. If an option is unavailable in a given context, hide it or explain why. |
| ![](zeroheight://image/8052226/d1d0c64ea145377f0380fb0ae61dba0bb58fd0bbc6ddae2e1e58eb7dad37a98f) | **Disabled + Checked** A pre-selected option the user can't change. Use sparingly, only when the system locks the value and the user needs to see it. |
| ![](zeroheight://image/8052226/8e57b157fe5cfb89560a796876514f05df123e82f554b4575be423daeac63727) | **Focus ** Shown when the checkbox receives keyboard focus. A visible focus ring appears around the checkbox indicator. In the Invalid state, the focus ring uses the danger token to maintain visual consistency with the error treatment. A 2px ring shows around the box, offset from its edge. |
---

# Usage
## Overview

![](zeroheight://image/8052226/ff9f2194125024f25302b7d88b68cfbfad27284ca458fc5be0f500cc26f3cbd2)

Checkboxes are form controls that let users select one or more options from a set. Each checkbox operates independently. Selecting one doesn't affect the others. Use checkboxes when users need to make explicit choices that are submitted as part of a form, not applied immediately.

### When to use

* When users can select one or more options from a set independently.
* When a user must explicitly opt in or out of something as part of a form submission.
* When a single standalone acknowledgement is needed, for example, "I agree to the terms and conditions."
* When a parent–child selection relationship is needed. Use the Indeterminate state for parent items with partially selected children.
* When a row-selection control is needed inside a data table.

<callout background="4" fullWidth="true">

### ❌ When not to use

* Use a **[Switch](https://design.moodle.com/98292f05f/p/585368)** instead when the action is binary (on/off) and takes effect immediately without a form submission step.
* Use a **[Radio group](https://design.moodle.com/98292f05f/p/366522)** instead when only one option can be selected at a time, or a [Choicebox](https://design.moodle.com/98292f05f/p/78314c) when each of those options also needs a description or an icon.
* Don't use a checkbox without a visible label outside of a data table. The purpose must be evident from the surrounding context.
* Don't use a disabled checkbox to hide unavailable options. Remove them from the UI or explain why they're unavailable.

</callout>

![](zeroheight://image/8052226/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Guidelines

### Content design

#### Usage guidelines

* Always pair a checkbox with a visible label that clearly describes what the user is selecting or agreeing to.
* Don't use a standalone checkbox without a label outside of a data table.
* Labels should be specific enough that the user understands the consequence of checking or unchecking without needing additional context.
* When a checkbox is required, always include a note in the form's legend explaining that fields marked with `*` are required. Don't rely on the asterisk alone.

#### Content structure and constraints

* Checkbox labels should be concise  and easy to read. Avoid long labels.
* Labels describe the option itself, not the action of selecting it. Write "Weekly digest" not "Select to receive a weekly digest".
* Feedback text must tell the user what to do, not what went wrong. Write "Select at least one option to continue" not "Error: required field."
* Capitalise only the first word of each label (sentence case).

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8052226/a06406febee47163dd27038507e610ff6a22d45de66fc08849adca8472400328) |   | MUST write feedback text that says what's wrong and what to do. |
| Don't | ![](zeroheight://image/8052226/24075a9b2ec6b136ad830989b2a37c44b808f20d0b5af18fc38bd4bd9e667f7a) |   | SHOULD NOT use default system messages. |

#### Content behaviour

* Labels don't truncate: they wrap to a new line if the container is narrow.
* The label is always positioned to the right of the checkbox indicator.
* Feedback text wraps naturally below the label and aligns with the label text, not with the indicator.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8052226/56342a3d131b61d0a99df6347878f9ba83048cc7320c24bfd2b4137e4e0ce6e5) |   | SHOULD let label text wrap naturally in narrow containers. |
| Don't | ![](zeroheight://image/8052226/7632626494b6bf0e8c7c84ec90c90bf5cf8bb560e68ba236c31b69a15e299f6c) |   | MUST NOT truncate label text or move the indicator from its default position. |

#### Copywriting

* Write labels so they complete the phrase "By checking this, I am selecting or agreeing to…"
* Don't start a label with "Select" or "Choose". The checkbox itself implies selection.
* Keep options in a group grammatically parallel: if one label is a noun phrase, make all labels noun phrases.

---

### Layout and spacing

* Stack checkboxes vertically in a group. This is the recommended layout.
* Don't mix checkboxes and radio buttons in the same option group.
* Align checkboxes with other form controls within a form layout.
* In a data table, place the row-selection checkbox in the leftmost column.
* Feedback text aligns with the label text, not with the checkbox indicator.
* Use `--mds-spacing-xs` (8px) between options in a vertical stack.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8052226/c521d760d251ad5fe531b70ffeb52a15a950e57244516c62349b4ec6afd15689) |   | SHOULD stack checkbox options vertically by default. |
| Caution | ![](zeroheight://image/8052226/9058d7d5969f19edd7688df0d793660edd06ba798c327cff7da5f7218de48edc) |   | SHOULD use a horizontal layout sparingly, as it can break on narrow screens. Space options with --mds-spacing-md (16px) between each. |

---

### Breakpoints and responsive behaviour

* The checkbox indicator remains the same size at all breakpoints.
* The hit area is maintained at all breakpoints.
* Label text wraps at narrow viewports. The indicator stays top-aligned with the first line of the label.

---

### Interaction behaviour 

* Clicking or tapping the label or the hit area toggles the checkbox.
* Checkboxes in a group operate independently. Selecting one doesn't affect the others.
* When a selection is required and the user submits without checking, transition to the Invalid state and show feedback text that explains what's needed. Clear the Invalid state when the user checks the option.
* The Indeterminate state can't be set by the user. It's driven by child selection state.

---

### Accessibility guidelines

#### Colour and contrast

* The checkbox indicator border must meet a minimum contrast ratio of 3:1 against its background.
* Label text must meet a minimum contrast ratio of 4.5:1 against the background (WCAG AA).
* The selected state uses a checkmark icon alongside colour fill. Don't rely on colour alone to communicate selection.
* The Invalid state uses red to signal an error. Always pair the visual treatment with visible feedback text. Don't rely on colour alone. Screen readers must be able to announce the error; see Code → Accessibility implementation for the required ARIA attributes.
* Screen readers must be able to announce the error. See Code → Accessibility implementation for the required ARIA attributes (`aria-invalid`, `aria-describedby`).

#### Focus

* The focus ring appears on the checkbox indicator when focused via keyboard.
* The focus ring must be visible on both light and dark backgrounds.
* Focus ring treatment is inherited from the MDS global focus style.
* In the Invalid state, the focus ring reflects the danger treatment to remain consistent with the error context.

#### Labelling

* Every checkbox must have an associated label. Use a `<label>` element linked via `for` and `id`, or an `aria-label` when no visible label is present (data table context only).
* Feedback text must be associated with the input via `aria-describedby`.
* The required marker (`*`) must be supplemented with `aria-required="true"`. Don't rely on the visual asterisk alone.
---

---

# Code
## Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-choicebox--default)

Props and types (TypeScript API): [Choicebox.d.ts](https://unpkg.com/@moodlehq/design-system/dist/components/choicebox/Choicebox.d.ts)

Full list of props and their types for Choicebox.

![](zeroheight://image/8608900/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Accessibility implementation

### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus into the Choicebox group. Focus goes to the selected option; if none is selected, focus goes to the first option. |
| `Tab` | Moves focus out of the group to the next focusable element on the page. |
| `Arrow Down` / `Arrow Right` | Moves focus to the next option in the group and selects it. |
| `Arrow Up` / `Arrow Left` | Moves focus to the previous option in the group and selects it. |
| `Space` | Selects the focused option if it is not already selected. |

---

### ARIA

* Role:
    * Each Choicebox is a native `radio` control.
    * When Choiceboxes are presented as a set, place them inside a container with the `radiogroup` role.
* Required attributes:
    * Each Choicebox must have a clear, visible label.
    * A Choicebox group must have an accessible name using `aria-label` or `aria-labelledby.`
* Optional attributes:
    * `aria-describedby` can be used to associate supporting text or helper text with an individual Choicebox.
    * Additional form-state attributes (such as `aria-invalid`) may be provided when relevant.

---

### Dynamic announcements

* Screen readers announce selection changes through native radio behaviour, including checked state and group context, when radios are grouped correctly.

![](zeroheight://image/8608900/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## GitHub

<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/tree/main/components/choicebox">
**GitHub: ChoiceBox**
</shortcut_tile>
</shortcut_tiles>
---

# Design
## Anatomy

![](zeroheight://image/8608900/5ef30a28212c32653e9e6a00d040949987031ee9ce7eee7ec54c246eceab2ca2)

1. **Card container.** The full-surface interactive area. Clicking or tapping anywhere within this boundary selects the option.
2. **Label.** The primary text identifying the option. Always required.
3. **Supporting text (optional).** A secondary text line below the label that adds descriptive context.
4. **Icon (optional).** An icon placed between the indicator and the label group. Use only when an icon meaningfully reinforces the option's identity.
5. **Choice indicator.** A circular icon that reflects the current selection state. Displays an empty circle when unselected and a circle-check icon when selected.

![](zeroheight://image/8608900/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## States

### Unselected

| **States** | **Description** |
| --- | --- |
| ![](zeroheight://image/8608900/8ab7c50c2dded32ede8930cfb02276ce1897e5ed9ae97735c55726440e7480c4) | **Default** The card's resting state. Available for selection. Use this as the starting point for all Choicebox instances before any user interaction. |
| ![](zeroheight://image/8608900/122e3dc0c51dd198d2a09681279a17762d0bb32902d223af2b2855d7210f0979) | **Hover** Applied on mouse-over. Confirms the card is interactive before the user commits to a selection. |
| ![](zeroheight://image/8608900/c669875018fff5e8c73423f5ab0687b1973a2d47b1eb8bc952e7acc34feaa75f) | **Pressed** Applied on click or tap before the pointer is released. Provides tactile feedback that the interaction has been registered. |
| ![](zeroheight://image/8608900/7a476731883a6e3819399f034f88b47db6d462200a33cda4df6ca2093d1538c3) | **Disabled** The card is unavailable for interaction. Use when the option is not applicable in the current context, not as a substitute for validation. Always supplement with accessible copy or `aria-disabled`. Don't rely on visual presentation alone. |
| ![](zeroheight://image/8608900/4dd65bbabdb3a6c60dbf20bf318a4c6c2ff0fef1f0555a6c9d58549ee2cfb154) | **Focus** Applied when the card receives keyboard focus via Tab navigation. The focus ring appears on the choice indicator. |

---

### Selected

| **States** | **Description** |
| --- | --- |
| ![](zeroheight://image/8608900/23fc5a6bf0bc68ce8956707173fb9c00e5386e2ad6685281be59f0be757633cd) | **Default** The card has been selected. The indicator switches to a circle-check icon and the card background and border update to reflect the active state. |
| ![](zeroheight://image/8608900/93dc45d40cb2e908df00ff431bfa577e2cbb65f5812b2d2bc9a8e7649aff256b) | **Hover** Applied on mouse-over of a selected card. Confirms the card is interactive. |
| ![](zeroheight://image/8608900/34f9397278e127e485f1a9f23f7b0f17e8b0b80cd03ebf2f5d172ac95441c4bf) | **Pressed** Applied on click or tap of a selected card before the pointer is released. |
| ![](zeroheight://image/8608900/24a81917766500d592f0454cd8a03fdcf6dfb74f7fade49696a8af818a2587b0) | **Disabled (selected)** The option is pre-selected but interaction is locked. |
| ![](zeroheight://image/8608900/ded6525cb6db321761c17d1e76ad9c170644eca279ff2da0ba0685225447c33e) | **Focus** Applied when a selected card receives keyboard focus. The focus ring appears on the choice indicator. |
---

# Usage
## Overview

![](zeroheight://image/8608900/63d086cdda2cee87f87817ff4f092164f3299bc0bc860e62d9194e8d80d6ff7a)

Choicebox is a rich selection control for forms and option-picker interfaces. It combines a label, an optional supporting description, and an optional icon into a full-surface interactive card, giving users more context per option than a standard radio button. Use it when options benefit from additional description or visual cues to aid decision-making.

### When to use

* Use when each option needs supporting context, a description, an icon, or both, to help users make an informed choice.
* Use for feature selection, plan comparison, or preference settings where visual weight improves clarity.
* Use in settings or configuration flows where users are choosing between meaningfully different options, such as course format or group mode.

<callout background="4" fullWidth="true">

### ❌ When not to use

* Don't use when options are self-explanatory. Use [Radio group](https://design.moodle.com/98292f05f/p/366522) instead.
* Don't use for multi-select scenarios. Use [Checkbox](https://design.moodle.com/98292f05f/p/12e8f6) instead.
* Don't use for binary on/off settings. Use Switch instead.
* Don't use when space is constrained and a compact list is more appropriate. Use [Select](https://design.moodle.com/98292f05f/p/013ac0) instead.

</callout>

![](zeroheight://image/8608900/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Variants

### Content

Set with the `supportingText` and `icon` props. Both are optional and work together. `label` is always required.

The Choicebox supports two optional content slots, supporting text and icon, that can be used independently or together.

| **Variant** | **When to use** |
| :--- | :--- |
| ![](zeroheight://image/8608900/34fd1cf3b97d3f47d425ff77065ade0611bdf32e654ad89999f67dbcce088943) | **Label only** (`label`) Use when the option is clear from the label alone and no additional context is needed. |
| ![](zeroheight://image/8608900/e6a13acd870fcec793e70d3f0775474b8062fd55a56e7c970648223b5f284676) | **With supporting text** (`supportingText`)  Use when a short description helps users understand what they're selecting. |
| ![](zeroheight://image/8608900/c6b33e648a7b6862fc7fe7c43a0263389dd7161054087306ae19d7ca79a6e385) | **With icon** (`icon`) Use when an icon reinforces the option's meaning or category. Only use icons that add meaning, not decoration. |

![](zeroheight://image/8608900/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Guidelines

### Content design

#### Content structure and constraints

* The label is always required. Keep it to 1–5 words, enough to identify the option at a glance.
* Supporting text is optional. Use it to explain the option, not to repeat the label. Aim for 1–2 lines.
* The icon is optional. Use only when it adds meaning; don't use for visual decoration alone.
* If supporting text is long, keep the label short. Don't combine a long label with long supporting text.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8608900/6d7563e001aad25cd0b8a2d73ff74df476a075d9ff338765b377dc06e65a6c8a) |   | SHOULD keep labels short and direct. 1 to 5 words is enough to identify the option. |
| Don't | ![](zeroheight://image/8608900/08c56a837caad655e2dc6ab063da99b363cc025bc4cae7eccf721aa7a2db0585) |   | SHOULD NOT use labels that wrap to multiple lines. They're hard to scan. |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8608900/9ef2e6c888c041459d5af34b1804ff74ca2a5af680bd3008bce96c776918be36) |   | SHOULD use supporting text to explain what the option does and add context the label can't. |
| Don't | ![](zeroheight://image/8608900/9866d4617e0e82d75ddc29c04000f718cb60afd7c091092ee4c068fdefc3bd1a) |   | SHOULD NOT repeat the label in the supporting text. It adds noise without adding value. |

#### Content behaviour

* Label text wraps to a second line if needed. Avoid labels that exceed 2 lines.
* Supporting text wraps below the label. Avoid copy that wraps beyond 3 lines.
* The card height expands to fit the content; text is never truncated or clipped.

#### Copywriting 

* Write labels in sentence case. Don't use title case.
* Start supporting text with the most important information. Don't bury the key point at the end.
* Don't open supporting text by repeating the option name, the label already provides that context.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8608900/43e515d29079895f0b8f8565ef8c85dfd2d0eb3c832c526b62cd05963d2f3f5d) |   | SHOULD lead with the most important information and keep supporting text to 1 or 2 lines. |
| Don't | ![](zeroheight://image/8608900/fff6c379a2bcb488cf8af07a3d37d09f7075ec2259637814368d164110800fd2) |   | SHOULD NOT bury the key point or pad out the supporting text. |

---

### Layout and spacing

* The card's width adapts to its container. In wide containers, apply a maximum width at the container level to maintain readability.
* Vertical stacking is the recommended layout for groups. Horizontal stacking is possible but use it with caution, ensuring available space and context support optimal readability.
* Don't mix Choicebox with Radio button or Checkbox within the same selection group.
* Group layout, stacking order, and mutually exclusive selection logic are handled at the pattern or container level, not within the component itself.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8608900/69383d60b1c967e6e054df217cadd52f8aec77886a02355b1512dd7d81be374d) |   | MUST use only 1 component type per selection group. |
| Don't | ![](zeroheight://image/8608900/7c5e9a18e25505a23d971ac0365b9cd7c2216730f11db0ab7d5cb168f2b9f27b) |   | MUST NOT mix Choicebox with Radio button or Checkbox in the same selection group. |

---

### Breakpoints and responsive behaviour

* In narrow viewports, the container or layout pattern is responsible for managing card stacking; the card itself does not change size or shape.
* Text within the card wraps naturally within the available card width.

---

### Interaction behaviour

* Clicking or tapping anywhere on the card selects the option.
* Only one Choicebox in a group can be selected at a time (mutually exclusive selection).
* Cursor: pointer on hover, not-allowed when disabled.

---

### Accessibility guidelines

#### Colour and contrast

* Label text must meet 4.5:1 contrast against the card background in all interactive states.
* The card border in the unselected state must meet 3:1 contrast against the page background.
* The selected indicator and card border in the selected state must meet 3:1 contrast against the card background.
* Disabled contrast is intentionally reduced. Don't rely on disabled state alone to communicate unavailability. Supplement with `aria-disabled` or accessible copy.

**Focus**

* The focus ring appears on the choice indicator.

**Labelling**

* Each Choicebox must have a visible label. Never use icon-only without a text label.
* Supporting text is associated with the card via `aria-describedby` so screen readers announce it after the label.
* When Choicebox items appear in a selection group, wrap the group in a `role="radiogroup"` with an accessible name via `aria-label` or `aria-labelledby`.

![](zeroheight://image/8608900/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Related

#### Alternatives

<shortcut_tiles>
<shortcut_tile url="https://design.moodle.com/98292f05f/p/279392-radio-button" page-id="8052231">
**Radio button**

Use when options are simple and a label alone is sufficient. Radio button has a smaller tap target and no support for supporting text or icons.
</shortcut_tile>

<shortcut_tile url="https://design.moodle.com/98292f05f/p/12e8f6-checkbox" page-id="8052226">
**Checkbox**

Use when users can select more than one option simultaneously.
</shortcut_tile>

<shortcut_tile url="https://design.moodle.com/98292f05f/p/585368-switch" page-id="8737402">
**Switch**

Use for binary on/off settings that take effect immediately without a form submission step.
</shortcut_tile>
</shortcut_tiles>
---

---

# Design
## Anatomy

![](zeroheight://image/8052227/0a532caa6c47bd9d6604d676f71d46b8b17d18372405eff91e967f9f95f54ce4)

1. **Icon:** The X icon that communicates the close action.
2. **Container:** The clickable area around the icon. This makes the target easy to hit.
3. **Border** *(Focus state only)*: A visible border used to show keyboard focus.

![](zeroheight://image/8052227/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## States

| ![](zeroheight://image/8052227/1418ddd3382bf6d631d03bf7b7964c4c0ca72e2d73facd2b718c6b97b7ba0b6b) | **Default** The resting state. The icon sits on a transparent background. |
| :--- | :--- |
| ![](zeroheight://image/8052227/521a8a8048e1d62bbf759ac5e9f436cf1ed2befa8150d76ad0960793ef8e150a) | **Hover** Shown when the cursor moves over the button. Do not remove this state. The icon changes to its emphasis colour. |
| ![](zeroheight://image/8052227/ffb26224f5210dd182737b1d2b2a3f29f710b12a965078da9e18a2fc08db394c) | **Focus** Shown when the button receives keyboard focus. Must stay visible on all backgrounds. The icon changes to its emphasis colour and a 2px focus ring shows around the button. |
| ![](zeroheight://image/8052227/b82d26a62aab5c53494c95275309a124b01830f7e6a706d27bdf31d5363bb5e6) | **Disabled** Shown when the close action is not available. The icon is muted. |
---

# Code
## Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-closebutton--default)

Props and types (TypeScript API): [CloseButton.d.ts](https://unpkg.com/@moodlehq/design-system/dist/components/close-button/CloseButton.d.ts)

Full list of props and their types for Close button.

![](zeroheight://image/8052227/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Accessibility implementation

### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus to the close button |
| `Enter` | Activates the close button (triggers click/close action) |
| `Space` | Activates the close button (triggers click/close action) |

---

### ARIA

*     * Role:
        * Uses a native `button` element (implicit `button` role).
    * Required attributes:
        * `aria-label` is required and provides the accessible name (for example, 'Close', 'Dismiss dialog', 'Remove item').
        * Use a translated, context-specific label from the consuming application.
    * Optional attributes:
        * `disabled` for native disabled state.
        * Standard optional button ARIA/state attributes can be passed when needed by context (for example, `aria-controls`, `aria-expanded`).


---

### Dynamic announcements

No built-in live announcement from the button itself.

If closing the target changes the page state (for example, alert dismissed or dialog closed), that state message should be announced by the parent container, typically via an aria-live polite region.

![](zeroheight://image/8052227/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## GitHub

<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/tree/main/components/close-button">
**GitHub: CloseButton**
</shortcut_tile>
</shortcut_tiles>
---

# Usage
## Overview

![](zeroheight://image/8052227/7e8203cb7bcc479ddfd288485409a413be7488f35373cc6e064ef8f1d6ecce49)

The close button lets users dismiss a surface, like a modal, drawer, or alert, or clear an entered value.

### When to use

* Use when a user needs to dismiss a temporary UI surface, for example a modal or an alert.
* Use when a user needs to clear an entered value, for example clearing the text in a search input.
* Use when closing or clearing is a supporting action and not the main call to action.
* Use when the UI already has clear primary actions, and the close button is only an exit or reset.

<callout background="4" fullWidth="true">

### ❌ When not to use

* Do not use the close button as a Cancel action when the user must choose between options. Use explicit buttons like Cancel and Save.
* Do not use it for destructive actions like delete. Use a Delete action with clear text.
* Do not use it when closing will lose work, unless you also show a confirmation.

</callout>

![](zeroheight://image/8052227/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Variants

### Size

Set with the `size` prop. If you leave it out, you get `md`.

The component supports three sizes: SM, MD, LG

| **Variant** | **When to use** |
| :--- | --- |
| ![](zeroheight://image/8052227/052dd96be7e1e08f555a93a6112300d157a1d0c04b24362e77f4a38e41061296) | **SM** Use in dense UI where space is limited, for example small toolbars. |
| ![](zeroheight://image/8052227/d3de0de7af4a61f7f17a87bb2d802f3dc33f07ea5efa6db52b908283abd5f88d) | **MD (default)** Use as the default size for most contexts, for example standard modals. |
| ![](zeroheight://image/8052227/6ee78c2a4ac4a31fafdd7009b47d6c2528e7d670d2bba4dfd95b54a93d314173) | **LG** Use when the close button needs a larger hit target, for example large modals and alert dialogs.  |

![](zeroheight://image/8052227/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Guidelines

### Content design

* The close button has no visible label.
* Always provide an accessible name that matches the action it performs.
* For dismiss actions, use a name like Close, or a more specific name when there are multiple close buttons on screen, for example Close course settings.
* For clear actions, use a name that describes what is being cleared, for example Clear search.

---

### Layout and spacing

* Place the close button where users expect it, usually the top right of the surface header.
* Keep enough space around it so it is easy to click and tap.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8052227/3be3af48c1383ea3133726e86b0a72ff170f7d00c68b7c4be3a86ffb7edd08a7) |   | SHOULD place the close button on the right of the alert dialogue. |
| Don't | ![](zeroheight://image/8052227/dd970a76f40b99a1bca3a8cdac2209f5693179f8cbf99929eb1945e5daf3f915) |   | SHOULD NOT place the close button on the left of the alert dialogue. |

---

### Responsive behaviour

* Keep the close button visible in the header area so it stays reachable when content scrolls.

---

### Interaction behaviour

#### Mouse and touch

* Click or tap closes the surface, or clears the value when the button is used as a clear action

#### Keyboard

* Tab moves focus to the close button
* Enter or Space activates it
* Escape should also close the surface when used in a modal or other dismissible overlay
* Escape is not required to trigger the clear action when the button is used inside an input, to avoid conflicting with other Escape behaviour on the page (for example closing a dropdown)

#### Cursor

* Pointer on hover
* Not allowed when disabled

---

### Accessibility guidelines

#### Colour and contrast

* The icon colour `--mds-text-subtle` must meet contrast on the background where the close button sits.
* The focus border colour `--mds-focus-default` must be visible on all backgrounds used in your UI.

#### Focus

Do not remove the focus state. The focus border uses:

* `--mds-focus-default` for colour
* `--mds-stroke-weight-md` (2px) for weight
* `--mds-border-radius-xs` for radius

#### Labelling

Because the control is icon only, it must have an accessible label.

* Use `aria-label="Close"` for most cases.
* For dialogs, prefer `aria-label="Close dialog"` when it helps clarity.
---

---

# Design
## Anatomy

![](zeroheight://image/9016909/5e442b3261e719dabf4d95f3f987fcd0473ff35d9c891c4b10d0f14119b9a2e3)

1. **Label**: names the field. Inherited from [Search input](/38ca1d-search), with the optional required asterisk and info icon.
2. **Field**: where the user types. Built from Input (Type=Search), with a leading search icon, placeholder or typed text, and the chosen values as removable tags.
3. **Chevron** *(optional)*: opens and closes the menu. Hidden once values are chosen, where a clear button takes its place.
4. **Support text** *(optional)*: help text under the field, replaced by the error message when invalid.
5. **Menu**: the floating panel that contains all items. It has a border and rounded corners.
6. **Item**: a single row in the menu. Contains a name/category label (required), and optionally an avatar, a username or short name, an email, and an institution.

![](zeroheight://image/9016909/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## States

### Combobox.item

The item is the wrapper for every row in the menu. Every item shares the same state model: default, hover, disabled, and focus. Items sit on the menu surface and have rounded corners.

| **States** | **Description** |
| :--- | --- |
| ![](zeroheight://image/9016909/ccae3855d539ed6ceee867018a8c93b508637e63f28cf98b91d1eb81e2a20310) | **Default** The item's resting state.  |
| ![](zeroheight://image/9016909/94ee5d5f44d46e9c81a67b7c32c42b8979f39b07d3fab261ee18254c51556152) | **Hover** Triggered when the cursor moves over the item, or it's highlighted with the arrow keys.  |
| ![](zeroheight://image/9016909/d11b5cd51ada08ffda29a7217f1965531c5c9d8d52ab0957e42217c95bdeb5cd) | **Disabled** Applied when the option is unavailable. Keep the item visible rather than removing it, to preserve the list structure.  |
| ![](zeroheight://image/9016909/13beb07712428b3a3a8e4397b411b683bc20d0a0c1f9effc3d273c3f35f96d1a) | **Focus** Triggered via keyboard navigation.  |
---

# Usage
## Overview

![](zeroheight://image/9016909/f864ba3cc1db6756845e58f196daeae77101e1c35b9c981d88d75ebf77d5215e)

Combobox pairs a search field with a list of options. People type to narrow the list, then pick one value or several. What they pick is stored in the field and submitted with the form, so it can be required and can show a validation error

### When to use

* Use when the list of options is long enough that typing to narrow it is faster than scanning. For example, timezone, country or language.
* Use when options come from the server as the person types. For example, finding a user to enrol.
* Use when people need to pick several values from a long list. For example, adding members to a group or assigning tags.
* Use when options need extra detail to tell them apart. For example, two people called Sarah, or two courses with the same name.

<callout background="4" fullWidth="true">

### ❌ When not to use

* Don't use for a fixed list people can scan without typing. Use [Select](https://design.moodle.com/98292f05f/p/013ac0) instead; if people can't or don't need to type, it isn't a Combobox.
* Don't use for actions or view settings like sort order. Use a [Dropdown](/8381b3-dropdown). If nothing is saved with a form, it isn't a Combobox.
* Don't use to search content when there's no list of options to pick from. Use [Search](/38ca1d-search) on its own.
* Don't build a "user picker" as a separate component. A Combobox with person options is the user picker.
* Don't assemble one yourself by placing a menu under an Input. Use Combobox.

</callout>

![](zeroheight://image/9016909/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Variants

### Tags

Every chosen value shows in the field as a removable [Tag](/25b418-tag). This property reflects whether any values have been chosen yet.

| **Variant** | **When to use** |
| :--- | :--- |
| ![](zeroheight://image/9016909/73267440c80a2e4320fd914b951c647eab049c0fc483a0deb1e8a49d97fff1be) | No values chosen yet. The field shows the placeholder or the text the user is typing, and the chevron. |
| ![](zeroheight://image/9016909/f75074c6ddc0287e42625f2dfb5753b1130a648789c488399f728653e09164f5) | One or more values chosen. Each one shows as a removable tag ahead of the typed text, and a clear button replaces the chevron. |

---

### Item content

Every item in the menu is the same `combobox.item`. Its content comes from a nested [Tag](/25b418-tag) (Removable) with the close button hidden, and has four independent toggles, all optional except the name/category label itself.

| **Props** | **When to use** |
| :--- | :--- |
| ![](zeroheight://image/9016909/434b62cc449b5b48919e071b4efc5fc0f25fedac1175442f5e40ea8856c4c6b8) | **Avatar** Show a person's photo or a site's logo alongside the label. Leave off for plain options like timezone or country. |
| ![](zeroheight://image/9016909/7c05159072914f78cdcb1dde05595b1808287ee5b03b9e5e20e7bde734d5e92c) | **Username / short name** Show a short identifier as a supporting line. Works for a person's username or a course, group or site's short name. |
| ![](zeroheight://image/9016909/37c67b6923c0e553e57588a00d95ebf45a1085029198541e5e3977bf8197f257) | **Email** Show an email address, separated from the username by a divider. *(Person-only.)* |
| ![](zeroheight://image/9016909/e325960664d3804ea8ec1a1cc8a0a2890cb7bbfcbf0ec5da5451303f024450af) | **Institution** Show a second supporting line with the person's institution. *(Person-only.)* |

![](zeroheight://image/9016909/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Guidelines

### Content design

#### Content structure and constraints

* Item labels support a single line of text, which truncates with an ellipsis if it runs out of space.
* Recommended item label length: 1–4 words.
* Turn on supporting fields only when the label alone can't tell two options apart, not to repeat the label.
* Keep the same fields on for every item in a list, so rows stay the same height and easy to scan.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/9016909/a96f8b04b12005b3b33b27efffa78b9a4388440a89f6a5230fbfc71bff98810a) |   | SHOULD use supporting fields when labels could be confused. |
| Don't | ![](zeroheight://image/9016909/559986af97534afb835ef9787f5083f3ece4d61f13634e8406c8cab8613368a4) |   | SHOULD NOT list people by name alone when names can repeat. |

#### Copywriting 

* Use sentence case for labels and option names. Person names keep their own casing.
* Name the value, not an action: "Teacher", not "Assign teacher role".
* Use the placeholder to say what the user can search by. Never use it as a replacement for the label.
* Write a no results message that repeats the search term and suggests a next step: "No matches for 'Jsoe'. Check the spelling or search by email."
* Use "Loading results…" while options load.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/9016909/9b686a32077d631553a4a5ced0d1383bfcb7430cd8bd3375508dde45181ab07a) |   | SHOULD use the placeholder to say what people can search by. |
| Don't | ![](zeroheight://image/9016909/33a096c0a621d13a08fe969131215b69d06632b6255c14fba506adc4ac6c1957) |   | SHOULD NOT repeat the label in the placeholder. |

---

### Layout and spacing

* The field fills the width of its container, and the menu matches the field's width.
* The menu opens `--mds-spacing-xxs` below the field and flips above it when there isn't room below.
* Order results by how well they match what's been typed. With nothing typed, use alphabetical order unless there's a clear reason not to.
* The menu shows up to 10 items before it scrolls. The menu scrolls, not the page.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/9016909/2515abb10497338e9dbb1532c373823f50b2f7fba449e70803cff9007a51e942) |   | SHOULD keep the menu the same width as the field. |
| Don't | ![](zeroheight://image/9016909/04f3074e96aef0df1d2474b6e153f2c8130485ded59873616031215d90dc25fc) |   | SHOULD NOT let the menu shrink to its content or drift away from the field. |

---

### Responsive behaviour

* The field stays full width at every breakpoint.
* On small viewports, the menu repositions to stay fully on screen rather than being clipped.
* Item height and tap targets stay the same across breakpoints. Don't shrink rows on mobile.

---

### Interaction behaviour

* The menu opens when the user types, presses Arrow Down, or selects the chevron. The open state is reflected on the field via `aria-expanded`.
* Choosing an item adds it to the field as a removable tag and clears the typed text. The menu stays open so more values can be picked.
* Clicking outside the menu, pressing Escape, or tabbing away closes the menu.
* Filtering ignores case and accents, and matches anywhere in the label: "jose" finds "José".
* If the user leaves the field with text that doesn't match an option, the text is cleared and the chosen tags stay. Typed text never becomes a value on its own.
* Show the loading message straight away while results load, so a slow connection doesn't look like a broken field.
* Cursor: text cursor in the field, pointer on items and on each tag's close button, not-allowed on disabled items.

---

### Accessibility guidelines

#### Colour and contrast

* Item labels, supporting text and the placeholder meet 4.5:1 contrast against their background.
* The invalid state doesn't rely on colour alone. The border, icon and error message change together.
* Disabled contrast is intentionally reduced; supplement with `aria-disabled` so the state reaches screen reader users.

#### Focus

* Focus stays on the field while the user moves through items with the arrow keys. The highlighted item shows where they are.
* When the menu closes, focus stays on the field. Never drop focus to the document body.
* After removing a tag, focus returns to the field.

#### Labelling

* Every combobox has a label, even when it's visually hidden with Show label off.
* Each tag's close button names what it removes ("Remove Jessica Parker"), not a generic "Close".
* The chevron has its own accessible name, for example "Show options".
---

---

# Code
## Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-dropdown-dropdown--default)

Props and types (TypeScript API): [Dropdown.d.ts](https://unpkg.com/@moodlehq/design-system/dist/components/dropdown/Dropdown.d.ts)

Full list of props and their types for Dropdown.

![](zeroheight://image/8742550/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Accessibility implementation

### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus to the trigger. When the menu is open, moves focus out of the menu and closes it |
| `Enter` / `Space` | On the trigger: opens the menu and moves focus to the first item. On an item: activates it |
| `Arrow Down` | On the trigger: opens the menu and focuses the first item. In the menu: moves focus to the next item, skipping headers and dividers |
| `Arrow Up` | Moves focus to the previous item, skipping headers and dividers |
| `Home` / `End` | Moves focus to the first / last item in the menu |
| `Escape` | Closes the menu and returns focus to the trigger |
| `Arrow Right` | On an expandable item: opens the submenu and focuses its first item |
| `Arrow Left` | In a submenu: closes it and returns focus to the parent item |

---

### ARIA

* Roles:
    * The trigger uses a native `button` element with `aria-haspopup="true"` and `aria-expanded` reflecting the open state.
    * The menu panel uses `role="menu"`; the trigger references it via `aria-controls`.
    * Action and expandable items use `role="menuitem"`. Expandable items also carry `aria-haspopup="true"` and `aria-expanded`.
    * Selectable (single-select) items use `role="menuitemradio"` with `aria-checked` driving the check indicator.
    * Multi-select items use `role="menuitemcheckbox"` with `aria-checked`.
    * Headers are non-focusable group labels (`role="presentation"` on the wrapper, or the group is labelled via `role="group"` + `aria-labelledby`).
    * Dividers use `role="separator"` and are removed from the tab order.
* Required attributes:
    * Icon-only triggers must provide an accessible name via `aria-label` or `aria-labelledby`.
    * Disabled items expose `aria-disabled="true"` and suppress pointer events. They remain in the accessibility tree so the menu structure is preserved.
* Optional attributes:
    * When a selection changes the trigger's label (e.g. a filter dropdown), keep the label text in the button's accessible name so the current value is announced.

---

### Dynamic announcements

* Open/close state is announced through `aria-expanded` on the trigger.
* Selection changes are announced through `aria-checked` on the item.
* If activating an action produces an off-screen result (e.g. "Course duplicated"), announce it via an app-level live region in the consuming experience.GitHub

![](zeroheight://image/8742550/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## GitHub

<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/tree/main/components/dropdown">
**GitHub: Dropdown**
</shortcut_tile>
</shortcut_tiles>
---

# Design
## Anatomy

![](zeroheight://image/8742550/434c12927fd0ac1082526330c60b1aaae9d41c0cc09b215a587f6559cb5e5581)

1. **Trigger**: the interactive control that opens and closes the menu. A chevron communicates the expand/collapse affordance. Always required.
2. **Menu**: the floating panel that contains all items. It has a border and rounded corners.
3. **Header** *(optional)*: a non-interactive label that groups related items.
4. **Divider** *(optional)*: a horizontal rule separating groups of items.
5. **Item**: a single row in the menu. Depending on the item type it contains a leading icon (optional), a label (required), a description (optional), and a trailing indicator (check, checkbox, or chevron).

![](zeroheight://image/8742550/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Sub-components

The Dropdown is composed from dedicated sub-components. The assembled Dropdown is the public API. Sub-components are consumed through it, not published for standalone use.

| ![](zeroheight://image/8742550/ce0c4c7a07f26c9c290912335139607af75fed50f14e4b96798f1f49f1f5f32d) | **Dropdown.trigger** The clickable affordance. Wraps the Button component (`variant="button"`) or the Nav pill component (`variant="nav-pill"`) and adds the chevron. |
| :--- | :--- |
| ![](zeroheight://image/8742550/d42471e4363ef0decc9d9d5579b1b53364190a1cc34c95734475861c6408bb7f) | **Dropdown.menu** The panel container. Stacks items with consistent spacing, surface, and border. |
| ![](zeroheight://image/8742550/1ff445fbce45288536d303b6693ea6d5819a9f1a37e246cef5b884f62ad53a2e) | **Dropdown.item** The generic wrapper for each row. Exposes seven types: header, divider, action, selectable, multi-select, expandable, and custom. |

![](zeroheight://image/8742550/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## States

### Trigger

The trigger is a wrapper: it renders the [Button](/877c50-button) component (`variant="button"`) or the [Nav pill](/981bd1-nav-pill) component (`variant="nav-pill"`) and adds the chevron. Its surface, label, and border tokens are **inherited** from whichever component it wraps.

Appearance maps to a Button token family: **emphasis → Secondary fill**, **default → Secondary outline**, **subtle → Ghost**. The nav.pill variant is fixed to the default appearance and md size.

#### Button.default

| ![](zeroheight://image/8742550/502e02164b251d93917bb145a26f391324bb07159b47e54f54291f7ba633c199) | **Default** Resting, closed state. Transparent background with a border. |
| :--- | :--- |
| ![](zeroheight://image/8742550/58aaa4fc66661e52d64a56c19826c3b278e8774e53bda7d0984ec2f5c49c5f91) | **Hover** Cursor over the trigger. The button fills. |
| ![](zeroheight://image/8742550/42c1fb12a64f60ea089231910c8992f6a70a86e3759d7f75840cec6d2678009c) | **Active** Menu open. The button fills. |
| ![](zeroheight://image/8742550/8f681288af0bab3a4803917af19dd06723414decfb6c09e5a70660aa038309e6) | **Disabled** Trigger unavailable. Transparent background with a muted border and label. |
| ![](zeroheight://image/8742550/9109ecce8185eeb7f5064527e67097ab657d861eef5e9970af1502b52d344e41) | **Focus** Keyboard navigation. A 2px focus ring shows around the button, offset from its edge. |

#### Button.emphasis

| ![](zeroheight://image/8742550/0998a9aecbc69fe0de5e176fab9e1d813fda196944074a27a5938c6c1f0f823a) | **Default** Resting, closed state. |
| :--- | :--- |
| ![](zeroheight://image/8742550/b13e961440d802fc475fe3562ee67b30314c8cc0fb3e76bc6efc286c2e8520ca) | **Hover** Cursor over the trigger. The background changes. |
| ![](zeroheight://image/8742550/032e71679167cd8bed433c1d6213dd23d3bbec26eae74afc55683303e442ea58) | **Active** Menu open. The background changes and an inner border shows. |
| ![](zeroheight://image/8742550/ee8413cec98b2510952aa341da05aa2b0f006f827c688e18d130ffed7e0e6f5d) | **Disabled** Trigger unavailable. The background and label use their disabled colours. |
| ![](zeroheight://image/8742550/83e460ed1d9b61742b0f645c3e4fed0d195a54af18d0974243b5920ad8985d85) | **Focus** Keyboard navigation. A 2px focus ring shows around the button, offset from its edge. |

#### Button.subtle

| ![](zeroheight://image/8742550/91b5e553257ecb852beba4d4b72fb1d3fdf9e837d648bdeeec16e41a86c6a9e9) | **Default** Resting, closed state. Transparent background. |
| :--- | :--- |
| ![](zeroheight://image/8742550/946187531bba46617d03c99b4a90e8005ddc9ca5a2ec72081c6a70b2f09bc8e5) | **Hover** Cursor over the trigger. The background changes. |
| ![](zeroheight://image/8742550/9ae959cdcb11ba2799b3c2fdb50d57ef990ad8e7a70da7851a12621f4d99ee5c) | **Active** Menu open. The background changes and an inner border shows. |
| ![](zeroheight://image/8742550/6a592bf96eff23e7690d5de3cc2a2e09ff997074a23f2bc839b5d92109891c00) | **Disabled** Trigger unavailable. Transparent background with a muted label. |
| ![](zeroheight://image/8742550/ebca9650c39b713e2b4214005b88d3e060ede5c64dc78055901e3a235acfeb5f) | **Focus** Keyboard navigation. A 2px focus ring shows around the button, offset from its edge. |

#### Nav.pill

| ![](zeroheight://image/8742550/763d8c1a9df0c1ae81a9d5c57173295725fbc824cd27adccb1aa1b31df1e8879) | **Default** Resting, closed state. Transparent background. |
| :--- | :--- |
| ![](zeroheight://image/8742550/fcec07f8bc996597795f77317c967de96ade66672bf873fde5e93ce4a29b7611) | **Hover** Cursor over the trigger. The background changes. |
| ![](zeroheight://image/8742550/c70a382893e648169730545185d722b4d327179a607e76537cd3ef078a7c7031) | **Active** Menu open. The background changes. |
| ![](zeroheight://image/8742550/011302ab643d1970d4b06baab21a08e820d34845f3c9fec16d00a41039056fdf) | **Disabled** Trigger unavailable. The label is muted. |
| ![](zeroheight://image/8742550/5e33802f13ffc161f7037c1d11fc4f02133cf2290205c832b9fff2ca9204f98e) | **Selected** When a subpage in the dropdown is selected. |
| ![](zeroheight://image/8742550/030465d61aba2213b5ffa65ae8bcc5a565d50b96ba4e0390ce862cf6ac3d7566) | **Focus** Keyboard navigation. A 2px focus ring shows around the trigger, offset from its edge. |

---

### Dropdown.item

The item is the generic row wrapper for everything inside the menu. It exposes seven types: **action**, **selectable**, **multi-select**, **expandable**, **custom**, **header**, and **divider**. The four interactive types (action, selectable, multi-select, expandable) share a base state model (default, hover, focus, disabled) with type-specific additions noted below. Header and divider are non-interactive; custom is a bespoke slot. Every item sits on the menu surface.

#### Action.default 

| ![](zeroheight://image/8742550/2e9c63078e42a0e8da21bce051706543a9706d9d9fa4b4c29da4ad5ca64f2082) | **Default** The item's resting state. Transparent row. |
| :--- | :--- |
| ![](zeroheight://image/8742550/257e1faad79cae3f03730047ee5a9b6cbdaf027d1b820a79e01821b8cd8e3ff1) | **Hover** Triggered when the cursor moves over the item. The row fills with a light tint. |
| ![](zeroheight://image/8742550/5d5ea54955f0326ca4ce04d2384062d3166e1ca95039b7422c96052098614fbe) | **Disabled** Applied when the action is unavailable. Keep the item visible rather than removing it, to preserve menu structure. The label is muted. |
| ![](zeroheight://image/8742550/96a5971630be29b4b8e4ff730b035a7ca0601bc63b093ce788f3af65daa01571) | **Focus** Triggered via keyboard navigation. A 2px focus ring shows around the item, offset from its edge. |

#### Action.danger

| ![](zeroheight://image/8742550/1feb0bb31cd88da2bc800abbc8ce156b9dd1f482f52eed77e5bf541c70251a58) | **Default** The item's resting state. Transparent row with a danger-coloured label. |
| :--- | :--- |
| ![](zeroheight://image/8742550/124fe4c3de56b753d5e7ea8daba241f97c3b0c5bdf60653bc06ef9069745dc05) | **Hover** Triggered when the cursor moves over the item. The row fills with a light danger tint. |
| ![](zeroheight://image/8742550/64cdf4be4c04b75be727465a8f575c5963c5d5ef9b714b72bfe58ffbe456a58d) | **Disabled** Applied when the action is unavailable. Keep the item visible rather than removing it, to preserve menu structure. The label is muted. |
| ![](zeroheight://image/8742550/48fe7dc89bbdba32456c95a81a5d13d450bb0ca6308837db656e9a0a75fafbb8) | **Focus** Triggered via keyboard navigation. A 2px danger focus ring shows around the item, offset from its edge. |

#### Select item (single-select)

Follows the same state model as the action item (default, hover, focus, disabled) with one additional property:

| ![](zeroheight://image/8742550/0be7d4197ca0cc15970a1c4ab007176b7f5a418c52d797a24f2c14d89a65de34) | **Selected** The trailing check indicator is visible, communicating the current choice at a glance. The row takes a subtle fill. |
| --- | --- |
| ![](zeroheight://image/8742550/2cee5bf6e6902e51cb2d636c9c2fd9a6280efaa145fecda41b96b9c4ada70997) | **Unselected** The check indicator is hidden; the label alignment is preserved. Transparent row. |

#### Multi-select item

Wraps the [Checkbox](/12e8f6-checkbox) component. Refer to that page for checkbox state token detail. Supports default and hover states. Activating the item toggles the checkbox without closing the menu.

| ![](zeroheight://image/8742550/d6d8cdd562c502ad9d72c590f02fef230b80c3bc4e3bd38908dedc5cae15e4dd) | **Default** The item's resting state. Transparent row. The checkbox follows the Checkbox states. |
| --- | :--- |
| ![](zeroheight://image/8742550/29e26d4b9b236fc0c0e88bb30188e76e263ce53d0db028e42d04dbcc7cb965b3) | **Hover** Triggered when the cursor moves over the item. The row fills with a light tint. |

#### Expandable item

Follows the action item state model (default, hover, disabled, focus) with a trailing chevron-right indicating a nested submenu.

| ![](zeroheight://image/8742550/51063f6ef57e02f940c9b333f277db61314810920ddd8876c045063c6a764bdb) | **Default** The item's resting state. Transparent row with a label and chevron. |
| --- | :--- |
| ![](zeroheight://image/8742550/c9f8b59b7e7e6d1ea082b31286478f614f9e8c2cb423fd74a36b78b78bec298a) | **Hover** Triggered when the cursor moves over the item. The row fills with a light tint. |

#### Description (optional, action and select items)

| ![](zeroheight://image/8742550/a549864edc0dca66d356e0059181d735e021b8f6978db8a0191a939811710e51) | An optional second line under the item label. It’s muted, and takes the item’s text colour on hover and when disabled. |
| --- | --- |

#### Header

| ![](zeroheight://image/8742550/f5dae0fdedf848958a363fe1357accb70ac0973a313b4ac4bd4e4f13977ad554) | Non-interactive: no hover, focus, or active states. The label is muted. |
| --- | :--- |

#### Divider

| ![](zeroheight://image/8742550/54c267e51f04515e59f1707c879e3bb42fc3b06ff63e03a3abe534c3ee620d20) | A full-width horizontal rule. Non-interactive. |
| --- | :--- |

#### List

| ![](zeroheight://image/8742550/024c2f01603f05dfb62a084ea4cea6ac255031509b25a7a3d7e28d9ccc445ad5) | **To do** The item's resting state. |
| --- | :--- |
| ![](zeroheight://image/8742550/49189c30a5dfd2f3ab5282d49a2b266d9a28f8b5c223d8f5a23da01d7e82eceb) | **Done** The item's resting state. |
---

# Usage
## Overview

![](zeroheight://image/8742550/4c7d49dd3b286e1d8794bfbfa4c872258570aabd00209198220d37bdd2f7a599)

Dropdowns tuck a set of related actions or options behind a single trigger, reducing visual clutter by hiding choices until they're needed. The trigger stays visible and inline; the menu appears on demand and closes when a choice is made or focus moves away.

### When to use

* Use when a set of related actions needs to be grouped behind one control. For example, the overflow actions on a course card or activity.
* Use when the user selects one value from a list and the current value should be reflected on the trigger. For example, a sort or filter control that changes the view and isn't saved with a form.
* Use when the user toggles multiple options that apply together, use multi-select items so the menu stays open between toggles.
* Use in navigation bars via the nav.pill trigger variant when a nav entry expands into sub-destinations.

<callout background="4" fullWidth="true">

### ❌ When not to use

* Don't use a dropdown for choosing a value inside a form, use a [Select](https://design.moodle.com/98292f05f/p/013ac0) instead, which provides field semantics, validation, and native mobile behaviour, or a [Combobox](https://design.moodle.com/98292f05f/p/37396a) when the list needs typing to filter or people pick several values.
* Don't use a dropdown for two to three always-relevant actions. Surface them as buttons instead. Hiding a small number of frequent actions adds a click for no benefit.
* Don't use a dropdown to hide the primary action of a view. The main call to action should always be visible.
* Don't nest more than one level of expandable submenu, deep nesting is hard to operate with a pointer and harder with a keyboard.

</callout>

![](zeroheight://image/8742550/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Variants

### Trigger type

Set with the `variant` prop. If you leave it out, you get `button`.

| **Variant** | **When to use** |
| :--- | --- |
| ![](zeroheight://image/8742550/9932a282f22078927f3db7f09d7f2de73b14f48c49d54dd53800cc0d9ab9e76f) | **Button (default)** The standard trigger for forms, toolbars, and content areas. Supports all appearances, sizes, and icon configurations. |
| ![](zeroheight://image/8742550/836ae781367df5b12b9d1d9617787d8479c80254f56a96187a56842c741ec51e) | **Nav pill (`nav-pill`)** For dropdowns inside navigation bars or pill-style nav structures. Fixed to the default appearance and md size. |

---

### Trigger appearance

Set with the `appearance` prop. If you leave it out, you get `default`.

Applies to the button trigger only.

| **Variant** | **When to use** |
| :--- | --- |
| ![](zeroheight://image/8742550/20ce2c50c273ce85cd354bd5814b469b3a97e252760db5f23f12afff0de545cb) | **Emphasis** When the dropdown is the primary control in its context and needs clear visual prominence. |
| ![](zeroheight://image/8742550/510cca10188ef6e8cbc49a84eade33f2df7646a6b9f62e300f93f5162d4562db) | **Default** The standard appearance for most contexts. |
| ![](zeroheight://image/8742550/c67e4ff95060fc23dc4489a0995364c79e436e9166105a09e43e262027e6be61) | **Subtle** Low-emphasis contexts where the trigger shouldn't compete visually: toolbars, card corners, table rows. |

---

### Trigger size

Set with the `size` prop. If you leave it out, you get `md`.

| **Variant** | **When to use** |
| :--- | --- |
| ![](zeroheight://image/8742550/cce9f1d49325866b26f346f13fdde2bee21782e58e4efe62580195e33443a78d) | **Medium (`md`, default)** The standard size for most interface contexts. |
| ![](zeroheight://image/8742550/715b566406452efb52e199578f8b267944fb5b325e657ee74be170f4e14e15c5) | **Small (`sm`)** Dense layouts such as tables, inline filters, or compact toolbars. |

---

### Trigger icon

Set with `startIcon`. Add `iconOnly` to hide the label.

| **Variant** | **When to use** |
| :--- | --- |
| ![](zeroheight://image/8742550/cce9f1d49325866b26f346f13fdde2bee21782e58e4efe62580195e33443a78d) | **None (default)** Label and chevron only. The default configuration. |
| ![](zeroheight://image/8742550/f0c9efdc80ed9698f2ab1ed2215ff8937441becf80f59a48fd3cdf8232ed3cf8) | **`startIcon`** A leading icon that reinforces the trigger's purpose. Use only when it adds meaning, not decoration. |
| ![](zeroheight://image/8742550/be1d390e98c48cd629c56a09ad4e123619e0db632138bcfd503bd4b483e593e8) | **Icon only (`iconOnly` with `startIcon`)** Space-constrained contexts such as overflow ("kebab") menus. The chevron is omitted; an `aria-label` is required. |

---

### Item types

Each item type is its own component. Put them inside the `Dropdown`.

| **Variant** | **When to use** |
| :--- | --- |
| ![](zeroheight://image/8742550/eab9879c203694c17c4926fd289b3cf3cc2f5e8e71fa3f75154f98aa993fe557) | **Action (`DropdownItemAction`)** Performs an action when chosen and closes the menu. It can either fire a command (rendered as a `<button>`) or navigate to another page (rendered as an `<a>` link), for example, a 'More' menu linking to related pages. Use the danger variant for destructive actions such as delete or remove. |
| ![](zeroheight://image/8742550/ecae529ddeb839388768c9f4c26b4d14859aa3289b17db62404a09d6d61f097a) | **Selectable (`DropdownItemSelect`)** Single-choice lists. The trailing check communicates the current selection; choosing an item closes the menu. |
| ![](zeroheight://image/8742550/6192f0f2dbc4f557675ec17ed8dc66235b0d1eac1980323bac620d710736e90a) | **Multi-select (`DropdownItemMultiselect`)** Multi-choice lists using an embedded Checkbox. Toggling an item keeps the menu open. |
| ![](zeroheight://image/8742550/2f0ab1eeca923aedd5e1b554c13b8a7f2f7e163ee329413b35ca42760fa2fa0f) | **Expandable (`DropdownItemExpandable`)** Reveals a nested submenu via a trailing chevron. Use sparingly and only one level deep. |
| ![](zeroheight://image/8742550/f5dae0fdedf848958a363fe1357accb70ac0973a313b4ac4bd4e4f13977ad554) | **Header (`DropdownItemHeader`)** A non-interactive label that names a group of items, for example "Recent" or "Actions". |
| ![](zeroheight://image/8742550/54c267e51f04515e59f1707c879e3bb42fc3b06ff63e03a3abe534c3ee620d20) | **Divider (`DropdownItemDivider`)** A horizontal rule separating groups. Pair with headers for structured menus. |
| ![](zeroheight://image/8742550/e6d1009ef358fbec14a079a04f272cee51b7fa050aecc4903c3eea6ab11f1d32)*Example of a custom slot.* | **Custom (`DropdownItemCustom`)** A slot for bespoke item layouts not covered by the other types. Use as a last resort. Prefer the standard types to keep menus consistent. |
| ![](zeroheight://image/8742550/72ef7194064bc02c465034e20e423947ae9fde8751dce5be62879d6a01bcfcdd) | **List** (`DropdownItemList`, with `variant` set to `todo` or `done`. It isn't exported from the package root, so import it from `@moodlehq/design-system/components/dropdown`) A list item component used within dropdown menus to represent a task or option with a completion state indicator. It has two variants representing a binary status: 'done' and 'to do'. |

![](zeroheight://image/8742550/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Guidelines

### Content design

#### Content structure and constraints

* Item labels support a single line of text. Avoid labels that wrap.
* Recommended item label length: 1–4 words.
* Use the description slot only when the label alone is insufficient, for secondary context such as a consequence or a subtitle, not for repeating the label.
* Item icons are optional and per-item. If most items in a group have icons, give all of them icons so labels stay aligned.
* Don't mix selectable and multi-select items in the same group. The interaction models conflict.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8742550/8ca845677acc9f7fa110fa1ae74d8d03a9e5856d6e4ea46a0b7c502e8447ab05) |   | SHOULD keep item labels short and easy to scan. |
| Don't | ![](zeroheight://image/8742550/babbe89b09a92753b5d47eb6b48aeafc3be1d9f7980b00aa45910e052d91a30d) |   | SHOULD NOT use long labels that wrap to a second line. |

#### Copywriting 

* Use sentence case. Don't capitalise every word.
* Action items start with a verb: "Duplicate course", "Download report".
* Selectable items name the value, not the action: "Newest first", not "Sort by newest first" (put the shared context in the header or trigger label).
* Name destructive actions explicitly: "Delete forum", not "Remove".
* Headers are nouns naming the group: "Sort by", "Actions". No punctuation.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8742550/648e574e1428343195161797e31e120845ec9b45adf7bb2beb33789612fc5c26) |   | SHOULD use sentence case, with only the first word capitalised. |
| Don't | ![](zeroheight://image/8742550/73a5fa24d7b74ba0aa3413a71d9ac7f1c37d68aa55feebae1cec07295ece5c96) |   | SHOULD NOT use title case or capitalise every word. |

---

### Layout and spacing

* Order items by frequency of use, with the most common actions first.
* Place destructive (danger) actions last, separated from other items by a divider.
* Keep flat lists short; introduce a header and divider to group content once the menu grows past a handful of items. There's no hard limit, but if a menu gets very long, reconsider the pattern: a Select with search, a filter panel, or a dedicated page will serve users better than scrolling a long menu.
* The menu aligns to the leading edge of the trigger by default and flips alignment or direction when it would overflow the viewport.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8742550/ac2d29da8479a054dd738eea63a5785899e5422209c367a9333d0b63f8fda641) |   | MUST separate the destructive action with a divider and place it last. |
| Don't | ![](zeroheight://image/8742550/7ae19fc06bb07e60e7f1f68d9bf83905bb2fd214f04c6278db55f511b3438aba) |   | MUST NOT mix a danger action into the middle of the list. |

---

### Responsive behaviour

* The menu width is content-driven with a sensible minimum; it doesn't stretch to the trigger width.
* On small viewports, ensure the menu repositions to stay fully on screen rather than being clipped.
* Item height and tap targets remain constant across breakpoints. Don't shrink rows on mobile.

---

### Interaction behaviour

* The trigger toggles the menu open and closed. The open state is reflected on the trigger via `aria-expanded`.
* Activating an action or selectable item closes the menu. Toggling a multi-select item keeps it open.
* Clicking outside the menu, pressing Escape, or tabbing away closes the menu.
* Cursor: pointer on interactive items, not-allowed on disabled items. Headers and dividers show the default cursor.
* Use the disabled state on items only when the action is genuinely unavailable in the current context. Keep the item visible so the menu structure stays stable.

---

### Accessibility guidelines

#### Colour and contrast

* Item labels meet 4.5:1 contrast against the menu surface, including the danger variant.
* Selection must not rely on colour alone. The check indicator (selectable) and checkbox (multi-select) carry the state.
* Disabled contrast is intentionally reduced; supplement with aria-disabled so the state reaches screen reader users.

#### Focus

* Focus is always visible on the trigger and on items while navigating with a keyboard.
* When the menu closes, focus returns to the trigger. Never drop focus to the document body.

#### Labelling

* Icon-only triggers require an aria-label describing the menu's purpose ("Course actions"), not the icon ("Three dots").
* Headers label their group programmatically, not just visually, so screen reader users hear the grouping.
---

---

# Code
## Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-favouritebutton--default)

Props and types (TypeScript API): [FavouriteButton.d.ts](https://unpkg.com/@moodlehq/design-system/dist/components/favourite-button/FavouriteButton.d.ts)

Full list of props and their types for Favourite button.

![](zeroheight://image/8623878/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Accessibility implementation

### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus to the button |
| `Shift + Tab` | Moves focus to the previous interactive element |
| `Space` | Toggles the favourite state |

---

### ARIA

* Role:
    * FavouriteButton is a native toggle `button`.
* Required attributes:
    * `aria-label` is required and should describe the current action.
    * Use clear, state-aware labels, for example:
        * “Add to favourites” when not selected
        * “Remove from favourites” when selected
* Optional attributes:
    * `aria-pressed` is managed by the component from the selected state:
        * false when unselected
        * true when selected
    * Standard optional button attributes may also be provided as needed (for example disabled, `aria-invalid` when relevant to context).

---

### Dynamic announcements

* Screen readers announce state changes through native toggle button behaviour via `aria-pressed` and the accessible name.

![](zeroheight://image/8623878/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## GitHub

<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/tree/main/components/favourite-button">
**GitHub: FavouriteButton**
</shortcut_tile>
</shortcut_tiles>
---

# Design
## Anatomy

![](zeroheight://image/8623878/02c2a32e6fba1bf968d8da12bffdc6cca9d78d86c1b84af57f01f4e154b78e71)

1. **Container**: The outer pill-shaped wrapper. It holds the icon and applies the focus ring when the button receives keyboard focus.
2. **Icon**: The star vector inside the container. It changes between an unfilled (not favourited) and a filled (favourited) appearance to communicate the current toggle state.

![](zeroheight://image/8623878/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## States

Each interaction state applies to both favourited and not favourited.

### Not favourited  (Selected = False)

| **State** | **Description** |
| :--- | --- |
| ![](zeroheight://image/8623878/56c7962d79f40ee386abd12fbaf621311e3f3909531b1fec5a530be49ced9de7) | **Default** The button's resting state when the item has not been saved. Shows the outline icon. |
| ![](zeroheight://image/8623878/d507cc532d86a85ba3083a18131be61c1abc253909d70e9c37b17de1b37998fd) | **Focus** Triggered when the button receives keyboard focus. A 2px focus ring shows around the button. |
| ![](zeroheight://image/8623878/d86d32dfa2e2326e3082a4672460d8ece0f288c33604e0281c84b4151882383c) | **Hover** Triggered when the pointer moves over the button. The background changes. |
| ![](zeroheight://image/8623878/33379257e432c62cc7cccfe97f2f570a1844c73effe618ef824abba8146da6ba) | **Pressed** Triggered while the user holds the pointer down. Confirms the action is being activated. The background changes. |
| ![](zeroheight://image/8623878/1e87410207f9c4748b544666a48b570e9afc10fc59f5ac2f2c9b52bcba150ebd) | **Disabled** Use when the favourite action is not available. The icon is dimmed. |

---

### Favourited  (Selected = True)

| **State** | **Description** |
| :--- | --- |
| ![](zeroheight://image/8623878/1e83062dd02b234a29c067b9449e5cecf458bd7b902131b686cd85f8cd56538b) | **Default** The button's resting state when the item has been saved. Shows the filled icon. |
| ![](zeroheight://image/8623878/e8f9e64d178ec488a411697fc1fa6fae189062702f7ce9ece0d55e5a18063520) | **Focus** Triggered when the favourited button receives keyboard focus. A 2px focus ring shows around the button. |
| ![](zeroheight://image/8623878/7aff31b0de4699f3f3207fcc5ceeddfc35bc106fc69a3ef72f3d50c9f1e373d8) | **Hover** Triggered when the pointer moves over a favourited button. The icon changes colour to signal it can be toggled off. |
| ![](zeroheight://image/8623878/0665610072166c68820f02d66c5bea075c983fe95b4be31f62c823e41fe19e76) | **Pressed** Triggered while the user holds the pointer down on a favourited button. Confirms the removal action is being activated. The background changes. |
| ![](zeroheight://image/8623878/94f65261c9fd282d9f365b0dd14c5c20318eafdb071dd08b6d7719d6495524cc) | **Disabled** Use when a favourited item cannot be changed. The filled icon is dimmed. |
---

# Usage
## Overview

![](zeroheight://image/8623878/cdce5503da9f69317228f137d8f0a9a340575dce1d6dcf7d91d80d5a98d05c87)

The favourite button is a small icon-only toggle button. It lets users mark or unmark an item as a favourite. It uses a star icon that switches between an unfilled and a filled state to reflect the current status.

### When to use

* Use when users need a persistent way to save or bookmark an individual content item such as a course, activity, or resource.
* Use when space is constrained and a full-text button would be too large for the context.
* Use in cards, tiles, or list rows where the save action is secondary to the primary content.
* Use when the toggled state needs to persist and be visible across sessions.

<callout background="4" fullWidth="true">

### ❌ When not to use

* Do not use for primary calls to action. Use a labelled button instead.
* Do not use when the action needs an explicit text label for clarity. Use a button with an icon and label instead.

</callout>

![](zeroheight://image/8623878/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Variants

The favourite button has one toggle property: `Selected`.

| **Variant** | **When to use** |
| :--- | --- |
| ![](zeroheight://image/8623878/bb39755988f83c65cc8d8530eb309e290030aa3266863cc3f49cca019073a822) | **Not favourited** (Selected = False, `selected={false}`, default) Use when the item has not been saved by the user. The icon is unfilled. |
| ![](zeroheight://image/8623878/b28c8d2debd9a8c04b7f000fe6876d8421d0bbaaa9dab795a6c1d84bc8a67dac) | **Favourited** (Selected = True, `selected`) Use when the item has already been saved. The icon is filled to confirm the current state. |

![](zeroheight://image/8623878/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Guidelines

### Content design

#### Labelling

* The button contains no text. The icon is the only visual element.
* The accessible label must be provided in code. Use "Add to favourites" when not favourited and "Remove from favourites" when favourited.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8623878/545654519f9bb5c1f3f03750dbcd838c18b8acd9621759031020473dab41800f) |   | MUST use a tooltip that describes what will happen, e.g. "Add to favourites". |
| Don't | ![](zeroheight://image/8623878/2fff6a0e734324c4207ea96b5e0911976ed7fe3dcbb0deb00b61777d39bc20d2) |   | MUST NOT leave the button without a label. |

#### Copywriting

* Use sentence case for accessible labels.
* Keep labels concise and action-oriented: "Add to favourites" and "Remove from favourites".
* Don't use vague labels like "Toggle" or "Star".

---

### Layout and spacing

* Place the favourite button in a consistent position within its parent container, such as the top-right corner of a card.
* Do not group multiple favourite buttons side by side.
* Ensure the touch target meets the minimum 44×44px requirement on touch devices, even if the visible icon is smaller.

---

### Breakpoints

* The button size stays fixed across breakpoints. No layout changes are needed.

---

### Interaction behaviour

* The button toggles between favourited and not favourited on each click or activation.
* Use a pointer cursor on hover.
* Use a not-allowed cursor when disabled.
* The focus ring must be visible at all viewport sizes.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8623878/ce63eadb109ce6e3ee8678546612d69398cfec05acc32222abfe61a1ee285c91) |   | MUST use the filled icon to show an item is already favourited. |
| Don't | ![](zeroheight://image/8623878/187f1cd067df3054e13dbec1d5ac8bf48c435bd0b9a9af2eed0a2ed39802ada2) |   | MUST NOT leave the icon in the same state whether or not the item is saved. People can't tell if their action worked. |

---

### Accessibility guidelines

#### Colour and contrast

* The icon must meet a minimum 3:1 contrast ratio against its background in all interactive states.
* Do not rely on colour alone to communicate the toggle state. The icon fill change (unfilled vs filled) provides a second visual indicator.

#### Focus

* Focus is placed directly on the button container.
* The focus ring must be visible on all background colours used in the layout. Avoid placing the button on backgrounds where the ring becomes invisible.

#### Labelling

* The button must always have an accessible label.
* The label must update dynamically when the toggle state changes so screen readers announce the new state.
* Example labels: "Add to favourites" (not favourited), "Remove from favourites" (favourited).
---

---

# Design
## Anatomy

![](zeroheight://image/9029119/63de3532e352cc09562883a9ac1f9bbf4e51c9ce53b5289e43e4eecfcc4199cc)

1. **Label text**: the field's name. Text style `UI text/UI small`.
2. **Info icon** *(optional)*: a circular icon-button next to the label (`fa-circle-info`). Check the codebase for an existing Button/Icon/Tooltip component before rebuilding it.
3. **Required indicator**: a trailing asterisk next to the label text. Shown only when the field is mandatory.
4. **Field container**: the bordered box holding the value and the indicator. Border and background respond to state, see States below.
5. **Value**: the selected option's text. Text style `Paragraph/Base text`, muted when disabled. There's no separate placeholder text style, a pre-selected default option's label renders exactly like any other value.
6. **Indicator (chevron)**: a caret icon signalling that the native picker will open. Purely visual, carries no hover state of its own.
7. **Trailing icon** *(invalid only)*: appears only when `isInvalid` is true, sits before the chevron. Uses `fa-circle-exclamation` in the danger colour.
8. **Supporting text**: help text at rest, or the validation message when invalid. Text style `Paragraph/Small`.

![](zeroheight://image/9029119/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## States

| **States** | **Description** |
| --- | --- |
| ![](zeroheight://image/9029119/2dd3b92f84f21fc89f100a9dfdc160a720adb579170aa2bff7c2b4183b8f0062) | **Default** The field's resting state, before any interaction. Shows the pre-selected option.  |
| ![](zeroheight://image/9029119/221284e792978683cd814878991a9cb04177ba31d5b853c3481236f594c4a45b) | **Hover** The pointer is over the field, before it gains focus. Container gains a white background, confirming it's interactive. |
| ![](zeroheight://image/9029119/9733eb36d691dd405e67998d4644f83da3df6dca75c3677f949ff5619498b016) | **Active** The moment of mouse-down on the field, just before focus lands. |
| ![](zeroheight://image/9029119/52b5ffd4cd0a3674ed52f2ce80d95a580870f9945d3d68fd2dfc7c3e3131e0c2) | **Focus** The field has keyboard or pointer focus, ready to open the native picker. |
| ![](zeroheight://image/9029119/b8d6d6ad1545de7dbcc1ad737f0a58b43136ba4c295b5b0e1a4ff9981a5b4660) | **Disabled** Can't be focused, clicked, or opened. Use for a field that's conditionally unavailable in the current context. |
| ![](zeroheight://image/9029119/2d31870518428741e860d9431f24cee311cbf9b7e5d30010a66385309d720493) | **Invalid (Default)** The chosen value has failed validation. |
| ![](zeroheight://image/9029119/fae3e28c1368240fd135b04081fecf229bc529f567baaa33d094de39b4c81ca4) | **Invalid (Hover)** The pointer is over a field that has failed validation. |
| ![](zeroheight://image/9029119/437611394bda2791e4e76b6fbda5f1905c3d96ff87f8296f82e797736d610cb0) | **Invalid (Active)** The moment of mouse-down on a field that has failed validation. |
| ![](zeroheight://image/9029119/118f70a88f995a93703666ec787facfe83ab765e3bbf6c4ef173cdfa24fd7e0f) | **Invalid (Focus)** Focus ring uses a lighter danger tone than the resting border, so the ring itself stays legible against the solid red border. |
---

# Usage
## Overview

![](zeroheight://image/9029119/d48185d21c555a54c514b15e7befba2eab75c5f9d1e6b081465e485f2f8aee50)

Select lets people choose one option from a list, tucking the full set of choices away until the field is opened. It renders as a native HTML `<select>` element, so it always shows a chosen option rather than an empty state. It suits option sets too long to lay out on the page but short enough that scanning beats typing to find the right one.

### When to use

* Use when people pick one option from a fixed list of 6 or more that's still quick to scan without typing.
* Use when the chosen value needs to submit with the form, exactly like a text field would.
* Use when people should only ever pick from the list provided, typing a new value doesn't make sense here.
* Use on touch and mobile contexts where the device's own native picker is preferable to a custom-built menu.

<callout background="4" fullWidth="true">

### ❌ When not to use

* Don't use for 2 to 5 options that people need to see all at once, use [Radio group](https://design.moodle.com/98292f05f/p/366522) instead.
* Don't use for a single binary yes/no or on/off choice, use [Switch](https://design.moodle.com/98292f05f/p/585368) instead.
* Don't use when the option list is long enough that typing to filter would genuinely help, or when people need to pick more than one value, that's a [Combobox](https://design.moodle.com/98292f05f/p/37396a) job.
* Don't use when each option needs a description, an icon, or enough visual weight that a plain text label isn't enough to choose correctly, use [Choicebox](https://design.moodle.com/98292f05f/p/78314c) instead.
* Don't use to trigger an action or navigate somewhere, nothing here gets saved to a form, use [Dropdown](https://design.moodle.com/98292f05f/p/8381b3) instead.

</callout>

![](zeroheight://image/9029119/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Variants

### Content options

| **Toggles** | **When to use** |
| :--- | :--- |
| ![](zeroheight://image/9029119/fd5f63e2c5ee4dd8ad412a49744acbf3c6eb4c270876372a3e19c840c803c265) | **Show label** Shows the label above the field. Say what the field expects. |
| ![](zeroheight://image/9029119/006afa15c7b9bf0c412cec2a24e2b59fa9a143c774e298382285c65fdcc84b14) | **Info** Adds an info icon next to the label. Use only when the field's purpose genuinely isn't clear from the label and supporting text alone. |
| ![](zeroheight://image/9029119/2d2d4f3b0804d4c9de7af419bbd5605918434e0adc6318e1512703cd8eec8219) | **Required** Adds a red asterisk next to the label. Pair with the native `required` attribute so validation actually fails when nothing meaningful is chosen. |
| ![](zeroheight://image/9029119/d9d42f97d4b4f281b10f044e14a88864b8c8f025af01ca19d25d9dd832bd5e4c) | **Support text** Adds guidance or validation text under the field. Turn it on when the label alone doesn't explain what's expected, or to show the invalid message. |

<callout background="2" fullWidth="true">

For deeper guidance on writing labels, using the info icon, and working with supporting text, see [Input](https://design.moodle.com/98292f05f/v/latest/p/56eea2), these toggles work the same way there.

</callout>

![](zeroheight://image/9029119/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Guidelines

* Always show a sensible pre-selected option. Never leave the field looking blank or empty, native `<select>` can't represent "nothing chosen" cleanly, so the design shouldn't pretend otherwise.
* Keep the option list short enough to scan without scrolling fatigue. Once it's long enough that typing to filter would help, that's Combobox's job, not a reason to make Select do more than it's built for.
* Don't reach for Select for a single yes/no toggle, that reads as over-engineering a Switch.

### Content design

#### Content structure and constraints

* Options are plain text labels only. Select can't render an icon, a second line, or any other visual content inside an option, that's a genuine browser limitation on styling native `<option>` elements.
* Keep option labels short enough that the chosen value never needs to wrap or truncate inside the closed field's width.
* There's no empty state to design for. A default option is always pre-selected and always shown.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/9029119/5633939dbdd531cd778ed937c602ec8bee13d354b210a5dffceb1faf877cb985) |   | SHOULD pre-select a clear instructional default, e.g. "Select a country". |
| Don't | ![](zeroheight://image/9029119/cff23daef1d13f35d2fbb491c75d97e1374c2d0e0432945d2051d47b3207af24) |   | SHOULD NOT leave the field showing a dash, a blank space or nothing at all. |

#### Content behaviour

* Adding more options doesn't change the size of the closed field, only the open native list grows or shrinks to fit them.
* Choosing an option updates the value immediately, there's no separate confirm step.
* A long option label truncates with an ellipsis inside the closed field rather than wrapping the field or resizing it.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/9029119/6e090599536d32ab2cd55da3b24646e50df90964d448d3552ea0db18c3c5396d) |   | SHOULD keep option labels short enough to read at a glance in the closed field. |
| Don't | ![](zeroheight://image/9029119/cb60a33021ddef120e69143f07f725bb330ff8a4d4d215112dd1aca7225e3511) |   | SHOULD NOT rely on truncation to hide a label that's usually too long to be useful once cut off. |

#### Copywriting 

* Use sentence case for both the field label and every option label.
* Word the default, unselected-look option as an instruction (e.g. Select a country), not as a repeat of the field label or a vague dash.
* On invalid, say what to do next in the supporting text, for example "Select a country to continue," not just "Invalid selection."

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/9029119/4fcfdf4f5f8ed18f3c619aea6f9d5f7ea4735b421374ab435b48fb2f455b891b) |   | SHOULD word the default option as an instruction, and write errors that say what to do next. |
| Don't | ![](zeroheight://image/9029119/b6982f1a10ff40f6b7931cea332db6a2d82561bcb8e1e0cc9e1981d64f29b4fb) |   | SHOULD NOT repeat the label as the default option, or write an error that doesn't say what to do. |

---

### Layout and spacing

* Label, field, and support row stack vertically with `--mds-spacing-xxs` gap between them.
* The field is full width of its container by default, no intrinsic min or max width of its own, sizing constraints belong to the container or layout, not the component.

---

### Breakpoints and responsive behaviour

* The field stays full width of its container across all breakpoints.
* On touch devices, the browser or OS renders its own native option list (a wheel, a full-screen list, a native dropdown).

---

### Interaction behaviour

* Touch target: the field measures 42px tall.
* Opening the list: a click, a tap, or Space/Enter while focused opens the device's native option list, this is native browser behaviour, Select doesn't render its own overlay.
* Focus stays on the closed field itself the entire time, even while the native list is open, exactly how a plain `<select>` element behaves. Don't try to move focus into the list.
* Cursor: pointer on hover, not-allowed when disabled.

---

### Accessibility guidelines

#### Colour and contrast

* Field text and border meet 4.5:1 / 3:1 contrast against the field surface, including the invalid state.
* Invalid never relies on colour alone, the border, the trailing icon, and the supporting text message all reinforce it together.

#### Focus

* The focus ring is always visible on keyboard focus, never suppress or override it.
* Focus lands on the field itself, exactly where the native `<select>` element sits in the DOM, never on the chevron or a decorative part.

#### Labelling

* Always associate Label with the field (`for`/`id` or `aria-labelledby`).
* If `showLabel` is off, still provide an accessible name via `aria-label`.
* Give the info icon-button its own descriptive `aria-label` when it's shown.

![](zeroheight://image/9029119/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Related

#### Alternatives

<shortcut_tiles>
<shortcut_tile url="https://design.moodle.com/98292f05f/p/8381b3-dropdown" page-id="8742550">
**Dropdown**

use when nothing gets saved to a form and the trigger performs an action or reflects a view setting (like a sort order), not a chosen value. Dropdown's own page already states the reverse of this rule.
</shortcut_tile>

<shortcut_tile url="https://design.moodle.com/98292f05f/p/78314c-choicebox" page-id="8608900">
**Choicebox**

use when each option needs a description, an icon, or enough visual weight that a plain text label isn't enough on its own.
</shortcut_tile>

<shortcut_tile url="https://design.moodle.com/98292f05f/p/585368-switch" page-id="8737402">
**Switch**

use for a single binary yes/no or on/off choice, not a list of options.
</shortcut_tile>
</shortcut_tiles>
---

---

# Code
## Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-switch--default)

Props and types (TypeScript API): [Switch.d.ts](https://unpkg.com/@moodlehq/design-system/dist/components/switch/Switch.d.ts)

Full list of props and their types for Switch.

![](zeroheight://image/8737402/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Accessibility implementation

### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus to the switch |
| `Shift + Tab` | Moves focus to the previous interactive element |
| `Space` | Toggles the switch between on and off |

---

### ARIA

* **Role:**
    * Uses `<input type="checkbox" role="switch">`: exposes the switch role to assistive technology. Screen readers announce this as a switch, not a checkbox.
* **Required attributes:**
    * Provide an accessible name via a visible `<label>` linked by `for` and `id`.
    * If no visible label is present, provide an accessible name via `aria-label` or `aria-labelledby`.
    * `aria-checked="true"` when on; `aria-checked="false"` when off. This is updated automatically on toggle.
* **Optional attributes:**
    * `disabled`: uses native input semantics. Screen readers announce the switch as unavailable.
    * When a switch is disabled, include information nearby explaining why it's unavailable.

---

### Dynamic announcements

* Screen readers announce the switch state through `role="switch"` and `aria-checked`.
* State changes on toggle are announced automatically via the `aria-checked` update, no additional live region is required for the component itself.
* If a switch triggers a broader change to the page (for example, enabling a section of content), consider a live region announcement for that content area.

![](zeroheight://image/8737402/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## GitHub

<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/tree/main/components/switch">
**GitHub: Switch**
</shortcut_tile>
</shortcut_tiles>
---

# Design
## Anatomy

![](zeroheight://image/8737402/a7145beb7993857cb44086f82bad443186d8b028047b176855ad53f6369f15fc)

1. **Hit area**. The invisible interactive touch target that wraps the entire switch. Ensures the minimum tap target size is met at all breakpoints.
2. **Switch indicator**. The visible control. A pill-shaped track containing a thumb and icon. Shows the current state through position, colour, and icon.
3. **Label**. Describes the setting being toggled. Required in all contexts. Positioned to the right of the indicator by default; can be placed to the left using the label side: start option.

![](zeroheight://image/8737402/9805e0cdc297dbaf065f0c749571ffee3d69230055128afcb0922f075e535fcf)

4. **Track**. The pill-shaped background of the indicator. Changes colour between the off and on states.
5. **Thumb.** The circular element inside the track. Slides from start (off) to end (on) when toggled.
6. **Icon.** Displayed inside the thumb in every state. Communicates the current state beyond colour. The icon pair is determined by the variant.

![](zeroheight://image/8737402/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## States

| **States** | **Description** |
| :--- | --- |
| ![](zeroheight://image/8737402/6926366c835a029577e6aea760531bd091dae7bef1126e541d3210ae5f396243) | **Off ** Default state. The setting is inactive. The thumb sits at the start position and displays the off-state icon. |
| ![](zeroheight://image/8737402/763eb02bff0d896f0fc6cb5ad35801c22052a2f5edecb9b23717cb3f3a119975) | **On ** The setting is active. The thumb moves to the end position, the track fills with the primary colour, and the on-state icon is displayed. |
| ![](zeroheight://image/8737402/4efe3a3dc40721c2903b5afe6bb9e04ee680f2d359bd86c5802aeff7a8efbf74) | **Hover (off) ** The switch is hovered while in the off state. The track darkens slightly to indicate interactivity. |
| ![](zeroheight://image/8737402/5a9edf3225178a338f6006aa05868d26c55761231eb79c89ad71d31d53f0d047) | **Hover (on) ** The switch is hovered while in the on state. The track reflects the primary hover colour. |
| ![](zeroheight://image/8737402/ac9d8830c903b4fe9f9907496161ec996cf858dfffc61d55be3daf1b50e2f689) ![](zeroheight://image/8737402/1024df986adc53f53f18c3f32fdf2792e5f7adff89dcfcfd5579667b9971e6f9) | **Focus ** The switch has keyboard focus. A visible focus ring appears around the entire indicator. Track and thumb remain at their current state colours. The ring is 2px, offset from the indicator. |
| ![](zeroheight://image/8737402/228dbd02fe456dc0d1aae3c3237ebaf8d9a1c3792e8ae054f7ba7fc272a4b155) | **Disabled (off) ** The switch can't be interacted with and is currently off. All elements render with muted colours. Provide a reason nearby when possible. |
| ![](zeroheight://image/8737402/02900ed20bc6e44b71e646df9ad0d6e287103b1b98beb3259ab50a4bccb30e8d) | **Disabled (on) ** The switch can't be interacted with and is currently on. All elements render with muted colours. |
---

# Usage
## Overview

![](zeroheight://image/8737402/a5703ed58b0b83066dc48609051c5c0670b1898707fb725b38b68de824930f36)

The Switch is a binary input that represents an on/off state for a specific setting. Unlike a Checkbox, which records a selection for submission, a Switch applies its state to a single, clearly defined context, either immediately or as part of a settings form.

Switch is always binary. There's no indeterminate or multi-select behaviour.

### When to use

* When a setting can be turned on or off: enabled or disabled, visible or hidden, locked or unlocked.
* When the binary state is self-explanatory from the label.
* When used inline in a settings panel, form, or settings list where the surrounding layout provides context.
* When the label alone is sufficient; no additional explanation is needed.
* When the surrounding context (e.g. a column header, section heading, or row label) makes the purpose of the switch unambiguously clear, and a visible inline label would be redundant. Always include a visually hidden label in the DOM.

<callout background="4" fullWidth="true">

### ❌ When not to use

* Don't use a Switch when supporting text is needed to explain the option, or when the selection is submitted as part of a form. Use a [Checkbox](https://design.moodle.com/98292f05f/p/12e8f6) instead.
* Don't use a Switch when users must choose one option from a mutually exclusive set. Use a [Radio group](https://design.moodle.com/98292f05f/p/366522) instead.
* Don't use a Switch when the action has irreversible or destructive consequences. Use a button with a confirmation step.

</callout>

![](zeroheight://image/8737402/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Variants

Set with the `variant` prop. If you leave it out, you get `enable`.

Label side is set with `labelSide`: `end` (default) or `start`.

Three variants cover Moodle's distinct use cases: Enablement for general on/off settings, Visibility for show/hide settings, and Lock for permission and restriction settings. 

An icon inside the thumb reinforces the state beyond colour.

The variant determines which icon pair is shown inside the thumb, communicating the on/off state beyond colour.

| **Variant** | **When to use** |
| :--- | :--- |
| ![](zeroheight://image/8737402/9b171c76306465d2e0e39eb85d85538c655b03b036f228456cefefdef2579d09) | **Enable (default)** Use for general on/off settings: enabling or disabling features, access, or functionality. This is the default variant. |
| ![](zeroheight://image/8737402/9b11f35fc966c17b25e2162756ebadc1baed2dbf94d2edb9f2215896cfde51c9) | **Visibility** Use for display settings: showing or hiding content, panels, UI elements, or items in a list. |
| ![](zeroheight://image/8737402/87daceb2b25aa46722ebcd222c32e2884c0aa7539cd2bacbf571a79a73e7972b) | **Lock** Use for permission or restriction settings: locking or unlocking editing rights, access control, or availability. |

![](zeroheight://image/8737402/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Guidelines

### Content design

#### Usage guidelines

* Always provide a label that describes the setting being toggled, not the action.
* Keep labels short. If more than a few words are needed to describe the option, a Checkbox with supporting text is more appropriate.
* Don't change the label based on the current state. Keep it consistent regardless of whether the Switch is on or off.
* Switch doesn't support supporting text. Use a Checkbox if the setting needs an explanation.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8737402/9903fc13640f4c2a44a57a4ad3bc137e98f649a59dc99058f062c083bd1923d2) |   | SHOULD use a Checkbox when the option needs supporting text to explain its effect. |
| Don't | ![](zeroheight://image/8737402/6ecb1e3e6dd9b2bbe67d05eca4ad7e6c55d3ac71983853926a95f0318e46a015) |   | SHOULD NOT use a Switch when the label has to carry that much context. Switch labels should be short. |

#### Content structure and constraints

* Labels use sentence case.
* Don't start a label with a verb. The switch itself implies action.
* Write labels that describe what the on state means. Write "Edit mode", not "Toggle edit mode" or "Enable edit mode".
* Keep options in a settings group grammatically parallel.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8737402/7f9a48a012084c3e1f2a9958cf43a4276bd3484a1a25028f7315acd9c0362261) |   | SHOULD write short labels that name the setting, not the action of toggling it. |
| Don't | ![](zeroheight://image/8737402/1b96d4b580792179832c8eeec28d04618d4072f40f5a54131b53af803bd7459e) |   | SHOULD NOT describe the action or use verbs like "enable", "toggle" or "click to". |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8737402/eba4caf65b5fc2efb26d14a0f7918f562915eec8b052db3a53c351ba61f7fc83) |   | MUST use the same label in both the on and off states. |
| Don't | ![](zeroheight://image/8737402/4e84334b4d0dc8c7c8782f6a6a599133ac675b7b7f7caecc524c5a343769302d) |   | MUST NOT change the label based on the current state. |

---

### Layout and spacing

* **Always use a visible label when:**
    * The switch is standalone, not part of a structured layout.
    * There's no adjacent heading, column header, or row label to provide context.
    * Multiple switches are grouped and individual labels are needed to differentiate them.
* Label position defaults to end: to the right of the indicator in LTR layouts, to the left in RTL.
* Use the label side: start option when the layout requires the label to appear before the indicator, for example, in a settings list where the switch aligns to the trailing edge.
* Switches operate in isolation or within a settings group. Don't stack switches as a selection group. Use Checkboxes for multi-select scenarios.
* The switch container hugs its content; width is driven by the label, not a fixed container.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8737402/9009f9d3d3b4b5e8d45d572820bfa191ee323d07c0a81bf4679cffd324ffce3d) |   | SHOULD use Checkboxes when people need to select 1 or more options from a set. |
| Don't | ![](zeroheight://image/8737402/2ae92c882f595ed3f34c1336654997f22f0fd6896744db2c14894bde85fafc8a) |   | MUST NOT use switches as a selection group. Each switch controls its own independent setting. |

#### Switch in isolation

A Switch can be used without a visible label when the surrounding context makes its purpose clear. The label must always be present in the DOM as a visually hidden element (it's never truly removed, only hidden visually)

**Use a visually hidden label when:**

* The switch lives in a data table column, and the column header describes what it controls.
* The switch appears in a settings grid where the row label is adjacent and unambiguous.
* The switch is inline within a UI element where the surrounding content provides sufficient context.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8737402/08e267c486e672d528bf3636239ada6a150d8f2c4fe591a991552a0dd2d92830) |   | SHOULD use a Switch for binary on/off states in structured layouts. |
| Don't | ![](zeroheight://image/8737402/cca7de5c801a423458b3557e191800c642cebca71c190502e25278b36a01a954) |   | SHOULD NOT use a Checkbox for a binary on/off state. A Switch better shows a reversible, persistent state. |

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8737402/f7369889b1a7013c47809cb1aca465c7bc83fbacab0eff676593e7e425ce1c32) |   | SHOULD use a Switch with a visually hidden label in data tables and settings grids when a column header or row label gives enough context. The thumb position and icon make the current state clear. |
| Caution | ![](zeroheight://image/8737402/0db7b5eb1ca57eac043c5b604ec66be049879b8cb3a2bcea51cf18fb53ead86d) |   | MUST NOT rely on icons alone to show state. |

---

### Responsive behaviour

* The switch indicator is fixed in size at all breakpoints.
* The label remains visible at all breakpoints. Don't hide the label based on viewport size.
* If a visually hidden label is genuinely required (for example, inside a data table column), always ensure an accessible name is still present in the DOM for assistive technology.

---

### Interaction behaviour

* Clicking or tapping anywhere on the indicator or label toggles the switch.
* State changes are immediate within the component. Whether the change affects the system immediately or on form submission depends on the implementation context.

---

### Accessibility guidelines

* Always provide a label. The icon inside the thumb reinforces state, but the label provides context: what is being toggled.
* Don't rely on colour alone to communicate state. The icon in the thumb (check/cross, eye/crossed eye, lock/unlock) provides a non-colour indicator in every state.
* If a switch triggers an immediate change that affects a larger area of the page, ensure the change is visually apparent and consider whether a live region announcement is needed.
---

---

# Code
## Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Removable](https://moodlehq.github.io/design-system/iframe.html?id=components-tag--removable)

Props and types (TypeScript API): [Tag.d.ts](https://unpkg.com/@moodlehq/design-system/dist/components/tag/Tag.d.ts)

Full list of props and their types for Tag.

![](zeroheight://image/8991684/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Accessibility implementation

### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | **Link**: moves focus to the tag. **Removable**: moves focus to the tag's Close button (the label itself isn't focusable). |
| `Enter` | **Link**: follows the link. **Removable**: activates the Close button, removing the tag. |
| `Space` | **Link**: no action (native anchor behaviour). **Removable**: activates the Close button, removing the tag. |

---

### ARIA

* Roles:
    *         * **Link** renders a native `a` with an `href`. No explicit role is needed.
        * **Removable** renders a non-interactive `span` containing the label content and a nested Close button. The Close button is a native `button`. The `span` has no role.
    * Required attributes:
        * **Link**: `href`.
        * **Removable**: `removeLabel`, which becomes the Close button's `aria-label`. It must name what is being removed and include the tag's label, for example "Remove Ana Silva", not a bare "Remove". Use a translated, context-specific string from the consuming application. `onRemove` is also required.
            * Same requirements as the standalone [Close button](https://zeroheight.com/98292f05f/p/778206) component.
    * Optional attributes:
        * `disabled`. On a Link, the `href` is removed and the tag gets `aria-disabled="true"` and is taken out of the tab order. On a Removable tag, the Close button is disabled.
        * Standard attributes for the element type are passed through to the root (`a` or `span`).
* The Avatar is always rendered with `aria-hidden="true"`, so the accessible name comes from the visible text. Consumers don't need to set this.

---

### Dynamic announcements

* Tag has no built-in live announcement. If removing a tag isn't visually obvious, announce it from the consuming UI with an app-level live region, for example "Marketing tag removed" in an *`aria-live="polite"`* region.
* Focus after removal: removal is owned by the consumer through *`onRemove`*. If the tag unmounts and leaves focus on the page body, Tag moves focus to the next focusable element. If the consumer places focus itself (for example back in the input field), Tag doesn't override it.

![](zeroheight://image/8991684/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## GitHub

<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/tree/main/components/tag">
**GitHub: Tag**
</shortcut_tile>
</shortcut_tiles>
---

# Design
## Anatomy

![](zeroheight://image/8991684/bc332d304e88518e315623849bd26807208dacdfbfaf230ef0c91861f89ee899)

**Tag (Link)**

1. **Container**: pill shape, background and border reflect the feedback type (Default or Danger).
2. **Label**: centred text in the matching feedback colour.


![](zeroheight://image/8991684/4beb303910c02e733aa25760d82718b487a8576edd792cdd1c1974e4ad4c1ac8)

**Tag (Removable)**

1. **Container**: radius and padding adapt to which optional rows are shown: compact and square-ish, with nothing on, up to a larger, more rounded card once 3 rows are shown.
2. **Avatar** *(optional)*: small (16px) when only the name/category is shown; larger (32–48px) once email, username, or institution are also shown.
3. **Name / category**: required, shown first.
4. **Username / short name / Email** *(optional)*: shown together separated by a vertical divider, or individually.
5. **Institution** *(optional)*: shown as a third line.
6. **Close button**: SM size, anchored to the trailing edge. Always required.

![](zeroheight://image/8991684/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## States

### Link - Default

| ![](zeroheight://image/8991684/6727de0283abb76c047bb384436b4bdbeabff3106d059868b06899a3842d2929) | **Default** The tag's resting state. Confirm the label clearly names the category or destination before it's shown. |
| :--- | :--- |
| ![](zeroheight://image/8991684/d7886feed4a03c93f2d70fa0666c8f910295e4b9cb3a791776b99b10ba3e289d) | **Hover** Triggered when the cursor moves over the tag. Don't suppress or override this state. Users rely on it to identify interactive elements. |
| ![](zeroheight://image/8991684/1093e4ec482639821cd3abb5433cc0120a0637e85d26e7008948ce3d5b8e0fae) | **Pressed** Triggered while the tag is being pressed. Transitions away immediately on release. Don't hold this state. |
| ![](zeroheight://image/8991684/f5b66b1fa46f718c22acbb67090258d0e8bcc16f0e1f7a7076bf437b45813a09) | **Focus** Triggered via keyboard navigation (Tab key). Must remain visible on all backgrounds used in your layout. A 2px focus ring shows around the tag, offset from its edge. |

---

### Link - Danger

| ![](zeroheight://image/8991684/f3ccfeaad13de46fd07bc17a253f20f9acfceda7a41f189b676c6ee23be793aa) | **Default** The tag's resting state. Reserve this appearance for tags that genuinely need attention. |
| :--- | :--- |
| ![](zeroheight://image/8991684/2e476ce8c915551c357ab7be87778d9fe5c5fbd27d04aae997643c32ff6c66c9) | **Hover** Triggered when the cursor moves over the tag. Don't suppress or override this state. Users rely on it to identify interactive elements. |
| ![](zeroheight://image/8991684/70e011dc566cab38a74bc99ef28c5c6f1093289fa8e0e149f5a76bd7841ab867) | **Pressed** Triggered while the tag is being pressed. Transitions away immediately on release. Don't hold this state. |
| ![](zeroheight://image/8991684/f07c6c040174a62b2edca2987251469711c7bf85645cf1ea4c72adecaff04ec2) | **Focus** Triggered via keyboard navigation (Tab key). Must remain visible on all backgrounds used in your layout. A 2px danger focus ring shows around the tag, offset from its edge. |

---

### Removable

| ![](zeroheight://image/8991684/d15a6e1ca3432c92dae15570f4efefeffbf6bbcbb7477fcc9a75c7ee6d1babd3) | **Default** The tag’s resting state. It has a 1px border. |
| :--- | :--- |
| ![](zeroheight://image/8991684/22d4962769e30f2557dc0ee8fb322431c8d4da86f64d910c0411536f963988f5) | **Disabled** Shown when the tag can’t be removed. The background and border change, the text is muted and the Close button is disabled. |
---

# Usage
## Overview

![](zeroheight://image/8991684/d39810c973985f8c9f9c1eeafa474ca397d8389a955a79cfa8a7a5a248fd7287)

Tags provide a consistent visual pattern for displaying labels, categories, or removable selections in a small, pill-shaped container. A Tag is either a Link (a clickable, navigable label) or Removable (a dismissible chip with an embedded Close button). Removable is a single, deliberately agnostic component: with its optional fields off it's a plain label chip, and with them on it can represent a specific person or a specific tenant/organisation.

### When to use

* Use the **Link** type when a tag should navigate to related or filtered content, for example, a category tag on a course card that links to everything in that category.
* Use the **Removable** type for any dismissible chip. It's built to cover three use cases with the same component:
    * **Generic**: a plain label with no identity attached, for example an applied filter or a keyword in a chip-style input. Leave Avatar, Email, Username / short name, and Institution off.
    * **User**: the tag represents a specific person, for example an "assigned to" chip, a shared-with recipient, or a selected user in a multi-select. Turn on the identity fields that apply (Avatar, Email, Username, Institution).
    * **Tenant**: the tag represents a specific tenant, site, or organisation, for example in a multi-tenant admin screen. Use Avatar (as a logo/site image) and Username / short name (as the site's short name). Email and Institution are person-only fields and don't apply here.


<callout background="4" fullWidth="true">

### ❌ When not to use

* Don't use Tag to show static status information with no action attached. Use [Badge](/28c702-badge) instead.
* Don't use the Link type for something the user needs to remove. Use a Removable variant instead.
* Don't use a Removable variant for a value the user shouldn't be able to remove. The Close button signals that the item is dismissible, so removing it would be misleading. Use Badge or plain text instead.
* Don't use Tag as a substitute for [Nav pill](/981bd1-nav-pill). Nav pill is for navigation state (selected/unselected), not for labelling or removable selections.

</callout>

![](zeroheight://image/8991684/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Variants

### Type

Set with the `type` prop. It’s required.

Tag combines a **Type** choice with, for Removable, a **Variant** choice for what the tag represents.

| **Variant** | **When to use** |
| :--- | --- |
| ![](zeroheight://image/8991684/b039fbb3791cde259d73193b39ed142d123b670512d749f128650f2746c32e72) | **Link** A clickable, pill-shaped tag that navigates to related content. Not removable. |
| ![](zeroheight://image/8991684/f2ee2d372c8da606c5b202a184e9343a06fb2f088581028f2a5937a82cd0241d) | **Removable** A dismissible chip with an embedded Close button. Optionally shows identity details (avatar, email, username, institution). |

---

### Link

Set with the `variant` prop. If you leave it out, you get `default`.

| **Variant** | **When to use** |
| :--- | --- |
| ![](zeroheight://image/8991684/b039fbb3791cde259d73193b39ed142d123b670512d749f128650f2746c32e72) | **Default** The standard appearance for category and topic tags. |
| ![](zeroheight://image/8991684/641b24f77af2a06213fd9e33fb58401a5e248024ce2aae8033a11b5bba425345) | **Danger** Use when the tag represents something that needs attention or carries risk. Consistent with the danger meaning used elsewhere in MDS (Badge, Alert). |

---

### Removable

Each one is its own prop. Removable tags also need `onRemove` and `removeLabel`.

Removable has four independent toggles, all optional except the name/category label itself.

| **Props** | **When to use** |
| :--- | --- |
| ![](zeroheight://image/8991684/75b3982979c2499bdfff4166d9dea3bd8fac3b7283daa0b33386c6a90ef0afa5) | **Avatar** Show a small identity image alongside the label. Defaults on. Works for a person's photo or a tenant/site logo. *(Generic: used for both People and Tenant.)* |
| ![](zeroheight://image/8991684/90f13ee01f02509e63f7b8b85fb870f15bb6b0f2a516ea30b5df0f249255ef1d) | **Username / short name (`username`)** Show a short identifier as a supporting line. Works for a person's username or a tenant's short name. *(Generic: used for both People and Tenant.)* |
| ![](zeroheight://image/8991684/c2e759d91e79b181d60a8ef5154f0f218e4da6a7e25544d81ceabd17294420c4) | **Email** Show an email address as a supporting line. *(Person-only: leave off for Tenant tags.)* |
| ![](zeroheight://image/8991684/a6d47ba15f1b2f7ccca630f9a6210f717165e0a35a47ab539555e4ada198c94d) | **Institution** Show a third line, the person's institution. *(Person-only: leave off for Tenant tags.)* |

![](zeroheight://image/8991684/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Guidelines

### Content design

#### Content structure and constraints

* Link and plain Removable tags support a single line of label text, which truncates with an ellipsis if it exceeds the available width.
* When any identity field (Email, Username / short name, Institution) is on, the name/category label is required and always shown first.
* Email and username truncate with an ellipsis rather than wrap.
* Keep labels short: Tag is a compact, scannable element, not a place for long descriptions.

#### Content density

* All four fields (Avatar, Email, Username / short name, Institution) can be turned on independently. The layout adapts automatically as more are shown, moving to a taller radius and a larger avatar once Institution is on.
* More fields make the tag taller, which affects how much space it takes up when several tags sit together.

#### Copywriting 

* Use sentence case for category and keyword labels.
* Person names follow their own natural casing. Don't force sentence case on a proper noun.
* Don't add punctuation to labels.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8991684/b12eb7a2191399aae81ef3a3e76140d79d7286ac10288948e4345c4370c9c972) |   | SHOULD use a specific label that describes the outcome. |
| Don't | ![](zeroheight://image/8991684/010727c3ca0b33fff77471a7772adf0e0bb6c2fa4df2a584e80562b413f9466a) |   | SHOULD NOT use generic labels that don't tell people what will happen. |

---

### Layout and spacing

* Use `--mds-spacing-xxs` (4px) between tags in a group, horizontally and vertically.
* Tags wrap onto multiple lines when a group doesn't fit the available width.
* If a group runs past about five wrapped lines, reach for a different pattern. A multi-select dropdown or a filter panel will serve the user better than a very long wall of tags.
* Keep one interaction model per group. A Link tag and a Removable tag look similar but behave differently: the whole pill navigates on one, and only the Close button does anything on the other.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8991684/1cb1f14f9d6d923c19305b6ca216a56c2cd1d577c4bbbb055152144973a787f0) |   | MUST keep 1 interaction model per group, so every tag in the set behaves the same way. |
| Don't | ![](zeroheight://image/8991684/7feeade3efd63992e324e771b0133af5f9dc07811081fbad61644cddc94153da) |   | MUST NOT mix Link and Removable tags in one group. They look alike, but one navigates and the other only removes. |

---

### Interaction behaviour

* Link: the whole pill is clickable and navigates to the linked content.
* Removable: the label itself is static; only the Close button is interactive. Activating it removes the tag.
* Cursor: pointer on the Link tag and on the Close button; default cursor on the static label area of Removable tags.

---

### Accessibility guidelines

#### Colour and contrast

* Label text meets 4.5:1 contrast against the tag background, for both the Default and Danger appearances of the Link type.
* Disabled Removable tags use intentionally reduced contrast; the disabled state is also carried by the Close button's own disabled styling, not colour alone.

#### Focus

* The Link tag shows a visible focus ring in the matching feedback colour (default or danger).
* The Close button on a Removable tag keeps its own standard focus state. See [Close button](/778206-close-button).

#### Labelling

* On a Removable tag, the Close button needs its own accessible name describing what it removes (for example, "Remove Marketing", "Remove Jordan Lee"), not a generic "Close". See the Close button page's labelling guidance.
---

---

# Code
## Implementation

Use the panel below to test every prop, state, and variant of this component interactively. Changes you make here are reflected in the code snippet, so you can copy exactly what you need. For the full list of props and detailed documentation, click **View in Storybook**.

[Default](https://moodlehq.github.io/design-system/iframe.html?id=components-textarea--default)

Props and types (TypeScript API): [Textarea.d.ts](https://unpkg.com/@moodlehq/design-system/dist/components/textarea/Textarea.d.ts)

Full list of props and their types for Text area.

![](zeroheight://image/8874779/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Accessibility implementation

### Keyboard interaction

| **Key** | **Action** |
| --- | --- |
| `Tab` | Moves focus to the text area (only when enabled). Does not insert a tab character. It moves focus to the next element. |
| `Shift + Tab` | Moves focus to the previous interactive element. |
| `Enter` | Inserts a line break. Does not submit the surrounding form. |
| `Arrow keys` | Move the caret within the text, including between wrapped lines. |
| `Home` / `End` | Move the caret to the start or end of the current line. |
| `Ctrl / Cmd + A` | Selects all text in the field. |

---

### ARIA

* Role:
    * Text area uses a native `<textarea>` element and is exposed as a textbox role with `aria-multiline="true"`.
    * When `readonly` is true it keeps textbox semantics while editing is blocked, so the content stays reachable and selectable.
* Required attributes:
    * Provide an accessible name. The Label is associated via `<label for>` or `aria-labelledby`.
    * When `Show Label` is false, supply `aria-label`. A visually hidden field still needs an accessible name.
* Optional attributes:
    * `aria-describedby` links the field to the supporting text and, where present, the counter, so both are announced with the field.
    * `aria-invalid="true"` is applied in the invalid state, alongside the danger border and inline `circle-exclamation` icon.
    * `aria-required="true"` (or the native `required` attribute) accompanies the visual asterisk when the field is mandatory.
    * `maxlength` is set when a hard character limit is enforced, so the limit is announced rather than only shown by the counter.
    * `aria-disabled` is applied automatically when disabled is true.
    * The info icon-button takes its own `aria-label` describing what it reveals, not the icon itself.

---

### Dynamic announcements

* The validation message is linked through `aria-describedby` and paired with `aria-invalid`, so the specific error is announced rather than a bare "invalid" state.
* The counter updates in a polite live region. Throttle announcements. Announcing on every keystroke is unusable. Announce on approach to the limit and on exceeding it, not continuously.
* The counter's unit (characters or words) is included in its accessible text, since "42 / 500" alone doesn't say what is being counted.
* Resizing via the drag handle is pointer-only and carries no announcement. It's a convenience, never the sole route to reading long content, so the field must remain scrollable by keyboard.

![](zeroheight://image/8874779/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## GitHub

<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/tree/main/components/textarea">
**GitHub: Textarea**
</shortcut_tile>
</shortcut_tiles>
---

# Design
## Anatomy

![](zeroheight://image/8874779/86dfc9d9e89c77c1e89c55508d068911110d4ab4c1ed77e3e0a1f8aba1bd2165)

1. **Label** *(optional)*: describes the field, in medium weight. Hide it with `hideLabel`.
2. **Info button** *(optional)*: a small, icon-only ghost [Button](/877c50-button) next to the label that shows extra guidance in a tooltip. Uses the FA Icon `circle-info`, with no padding.
3. **Required indicator** *(optional)*: a trailing asterisk next to the label when the field is mandatory.
4. **Text-field**: the input surface, with a 1px border. Always required.
5. **Value / placeholder text**: 16px, regular weight.
6. **Resizer** *(optional)*: an 8×8px drag handle in the bottom-right corner that maps to native textarea CSS resize. Shown only when `resizable` is true, and never shown in the disabled state regardless of that setting.
7. **Support row** *(optional)*: a row beneath the field holding supporting text and/or the counter. Supporting text sits left and grows to fill the row; the counter sits right in a fixed-width column and isn’t affected by validation state. If both are off, the row doesn't render at all. The field's gap collapses back to just Label + Text-field.
8. **Validation icon** *(invalid state only)*: FA Icon `circle-exclamation`, rendered inline inside the Text-field alongside the value/placeholder text.

### States

The component spans **7 interaction states**.

| ![](zeroheight://image/8874779/1e0604eed3f469524aa2ee729ef83f008ba41c22a7ea65aed06843151f70e5f8) | **Default** The field's resting state, ready to receive input. Transparent field with a 1px border. |
| :--- | :--- |
| ![](zeroheight://image/8874779/85806d183e7e7e04c01b0123a6dbb45fb7d035cf11b63ceebd39deade8b0fe06) | **Hover** Triggered when the cursor moves over the field. Only the container fill changes. The border deliberately stays the same, keeping the affordance subtle. |
| ![](zeroheight://image/8874779/53e8d243cb0ce945d9bd299832e8769118bd210321d1b8f4a9f88a4d667c7a00) | **Active** The field is selected and in use. The caret sits inside it and the person is typing. The primary accent border marks it as the field currently being edited, distinguishing it from every other field on the page. |
| ![](zeroheight://image/8874779/5853d7300cd4e17e90aa983688391dff84a024b823e466aae73ac227edc5576f) | **Focus** Triggered via keyboard navigation or once a click lands. The border switches to the focus token and doubles in weight. Internal padding compensates by 1px per side so the field's outer size doesn't shift. Never suppress or override this state. A 2px focus ring also shows. |
| ![](zeroheight://image/8874779/cbb60ee8ebbc906212ebe84f9dcb1d29320b50b48467c84d2f2d81b120353375) | **Invalid** Applied when the content fails validation. The danger border, the inline icon, and the message work together so the state never rests on colour alone. |
| ![](zeroheight://image/8874779/58f27128ab1edc5adfa05479de881364cb0b87970d76f08a9ddeb9e54dff121a) | **Disabled** Applied when the field is unavailable for input. The resizer never renders, regardless of the resizable setting. Use for empty fields. If content should still be readable, use read-only instead. |
| ![](zeroheight://image/8874779/ff3475e6437c0b5091098e12f0088a3dbef8a738337dcc748a504ab59e65d475) | **Read-only** Applied when existing content should be readable and selectable but not editable. The muted value text is the only visual cue, so pair it with `aria-readonly`. The resizer still renders if resizable is on. |

<callout background="1" fullWidth="true">

**Disabled vs. read-only:** Disabled is defined only for the empty presentation and read-only only for the populated one. That's intentional. Disabled communicates "not available for input", read-only communicates "here's existing content you can't edit". If a field already holds content someone should be able to review or copy, use read-only.

</callout>
---

# Usage
## Overview

![](zeroheight://image/8874779/5fd2d4ac044ab6a9bf953c2b85bd1bebfb12b29b4390e3e3aa29bf13ce105fe3)

Text area is a multi-line text input for longer-form free text (comments, descriptions, messages) as opposed to single-line values. It supports a label, placeholder and filled content, a live counter, supporting/helper text, validation messaging, and manual resizing.

### When to use

* Use for multi-line, longer-form text entry where length is unpredictable: comments, descriptions, feedback, messages.
* Use when you need built-in support for helper text, a required/info-flagged label, or inline validation messaging.
* Use `showCounter` when there's an actual character limit to communicate, so the count has something to compare against.
* Use `resizable` when the likely content length varies a lot and people benefit from expanding the box themselves.

<callout background="4" fullWidth="true">

### ❌ When not to use

* Don't use for single-line values: names, emails, search, short labels. Use the **Input** component instead.
* Don't turn `Counter` on if there's no limit behind it; a count with nothing to compare against is noise.
* Don't rely on placeholder text as a substitute for a visible Label. Placeholder disappears the moment someone starts typing.
* Don't use `Disabled` for a field that holds content someone should still be able to read. Use `Read-only` instead.

</callout>

![](zeroheight://image/8874779/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Variants

### Content toggles

| **Props** | **When to use** |
| :--- | --- |
| ![](zeroheight://image/8874779/2df8ed0fdfdf553a748f6375a0746ed6f1910d2abdbf6a026223a3ea4f34e6a5) | **Counter (`showCounter`, needs `maxLength`)** Shows a live count against a limit (e.g. "42 / 500") in the support row. Turn on only when there's a real character limit. The counter counts characters. |
| ![](zeroheight://image/8874779/03831dc9a6e4d7675e2d0cd5fc7d9ccc8c762292afec62b1a729bcf99536d12d) | **Support text (`supportingText`)** Adds helper or validation copy under the field. Turn off to reduce visual noise when the label alone is sufficient. |
| ![](zeroheight://image/8874779/9bf3aa2b71e267d67cd50c718d8a2fde7f502e1a0a33e2034ced2e122d3c29c8) | **Placeholder** It reflects whether the field is empty (placeholder text shown) or populated (value shown). |

---

### Label 

| **Prop** | **When to use** |
| :--- | --- |
| ![](zeroheight://image/8874779/6024e70573420e4c6f4c10829f14806b1bd7a931e7383a1551b3d6fd6e107f9a) | **Show label (on by default, set `hideLabel` to hide it)** Show the label row. If you turn it off, still give the field an accessible name (see Accessibility). |
| ![](zeroheight://image/8874779/c1bed54085f5d4dbd37b75861bbc44ff1931b5c92435bf20d466c5876fd20fce) | **Info (`infoTooltipLabel`)** Adds the info icon-button next to the label for supplementary guidance, e.g. a tooltip explaining expectations. |
| ![](zeroheight://image/8874779/1f417c44ccb9c2790dc0a0f68d15c1d77bfa0f0e20ce74a9de74f400716410ea) | **Required** Adds the danger-coloured asterisk next to the label. Pair with an actual `required`/`aria-required` attribute. See Accessibility. |

---

### Behaviour

Set with the `resizable` prop. It’s on by default.

| **Variant** | **When to use** |
| :--- | --- |
| ![](zeroheight://image/8874779/c839317eff776436d091cb0916371842e17493c6433ba7c4e795b3143f5db416) | **Resizable (default)** Shows the drag handle in the bottom-right corner and enables native CSS resize, letting people drag the field taller. Use when content length varies a lot and people benefit from expanding the box themselves. Never shown in the disabled state, regardless of this setting. |
| ![](zeroheight://image/8874779/71c26010f198a819fb0fb8aa88a71fad70d203561116df585f6744bf2cb1da93) | **Fixed (`resizable={false}`)** Locks the field to its set height, with no drag handle. Content scrolls once it exceeds that height. Use when a consistent field height matters more than flexibility, e.g. dense forms, table cells, or layouts where a variable height would shift surrounding content. |

![](zeroheight://image/8874779/3dac0741a89f9bc2108e1ea5425e68a9c397ae4d9f8ac61fec5f2def693ef2d2)

## Guidelines

### Content design

* Keep the label short: a few words naming what belongs in the field ("Course description", "Feedback").
* Supporting text is one short line: a formatting hint, a length expectation, or (in the invalid state) the specific validation error.
* Don't duplicate the label in the placeholder; use placeholder to show an example of expected input, not to repeat what the label already says.
* Counter format is used / limit (e.g. "42 / 500"). Keep the unit (characters vs. words) consistent everywhere the counter appears.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8874779/3dd90b9a7bf0f0fe9a8da8119e69fb23fa934f0ec0e43a77058d72d6718f926c) |   | SHOULD use the placeholder to show an example of the expected input. |
| Don't | ![](zeroheight://image/8874779/925cade1247afba442957ecb4ab83102c51d41c557a859b2d24cdbf1a7b8cd2f) |   | SHOULD NOT repeat the label in the placeholder. It adds nothing and disappears once typing starts. |

#### Copywriting

* Use sentence case for labels and supporting text. Don't capitalise every word.
* Write invalid messages that say what's wrong and how to fix it. "Description must be under 500 characters", not "Invalid input."
* Keep placeholder text illustrative and brief; it should read as an example, not an instruction.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/8874779/8293d3feae6f9ea345cd3eca6449218204ac04139af48020fe7c948cb222add8) |   | SHOULD use sentence case for labels and supporting text. |
| Don't | ![](zeroheight://image/8874779/3f2c55ac79ba132ed97f4d0d99704c435dc6d4f6d0b368695d6a1955fe8ac31e) |   | SHOULD NOT capitalise every word. |
| Do | ![](zeroheight://image/8874779/2f75af46f81b329c727c6535e57ab0dcf7a80499d1232f9e20f29829e4876ef2) |   | MUST say what's wrong and how to fix it. Naming the limit tells people exactly what to change. |
| Don't | ![](zeroheight://image/8874779/7b4f758132bf0b0369925bfb6dc221ce6777f0a074bda7935a54e702d6512eda) |   | MUST NOT rely on generic errors. "Invalid input" doesn't say what went wrong or how to fix it. |

---

### Layout and spacing

* The field, label, and support row stack vertically with `--mds-spacing-xxs` gap between them.
The field defaults to roughly a 3-line content area before scrolling or resizing is needed.
* When the counter appears without supporting text, it right-aligns on its own row rather than floating inside the field.
* The field is full-width of its container (`w-full`) by default; it doesn't have an intrinsic fixed width.


---

### Responsive behaviour

* The field stays full-width of its container across breakpoints.
* On touch devices, give the resizer a larger hit target than its 8×8px visual size. It's easy to miss otherwise.
* Avoid placing a text area in a very short container where it would have to scroll immediately; the ~3-line default height needs room to breathe.

---

### Interaction behaviour

* Hover only changes the fill (transparent → white); it doesn't touch the border, so hover reads as a subtle "this is interactive" cue rather than a state change.
* Active swaps the border to the primary accent on press, ahead of focus landing.
* Focus swaps the border to the focus token and doubles its weight to 2px, with padding compensating so the field doesn't visibly resize when the ring appears.
* Disabled blocks all pointer and keyboard interaction and never renders the resizer, even if resizable is true.
* Read-only allows focus and text selection but blocks editing, and keeps the resizer (if enabled) since people may still want to expand the box to read long content.
* Invalid can combine with any of hover/active/focus/disabled/read-only in principle, but is typically shown alongside default, hover, active, or focus as the result of a validation check.

---

### Accessibility guidelines

#### Colour and contrast

* Field text and placeholder text meet 4.5:1 contrast against the field surface, including the danger-coloured invalid state.
* The invalid state never relies on colour alone. The danger border, the `circle-exclamation` icon, and the supporting-text message all reinforce it together.

#### Focus

* The 2px focus ring is always visible on keyboard focus. Never suppress or override it.
* Focus should land on the text area itself, not on decorative elements like the resizer or info button.

#### Labelling

* Always programmatically associate the Label with the textarea (`<label for>` or `aria-labelledby`).
* If `hideLabel` is on, still provide an accessible name via `aria-label`. A visually hidden field needs an accessible one.
* Give the info icon-button a descriptive `aria-label` (e.g. "More about description formatting"), not a generic "Info".

#### States

* Pair the required asterisk with an actual `required` attribute or `aria-required="true"` so it's announced, not just shown visually.
* Use the native `disabled` attribute for the disabled state, and `aria-readonly="true"` (or `readonly`) for read-only, so assistive technology reports the correct interaction model.
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
* Don’t use colour alone to communicate meaning. Pair with text, icon, or structure where needed.

![](zeroheight://image/7242086/8bcdafd08ec4969c197ead998c5ac984950be376af6ff7fa0cd563dcc26b1fa1)

---

## Usage

### Backgrounds

**Neutral surfaces**Use these for layout layers (page, cards, panels):

* `--mds-bg-surface-default`: main surfaces, like the page and cards.
* `--mds-bg-surface-subtle`: subtle containers.
* `--mds-bg-surface-strong`: stronger separation or emphasis.

Cards use `--mds-bg-surface-default`. Use `--mds-bg-surface-subtle` for containers that sit inside a surface, not for cards.

| ![](zeroheight://image/7242086/7d26cd7a04c3a07c6ccd10a84685fc480abe22bf45c3b238e0d5bc1b080a0387) | `default` main surfaces |
| :---: | :--- |
| ![](zeroheight://image/7242086/51e5d5d55ab6cd6ce3915887360ee1b2837da8d8f11f934abc23b4d570fad298) | `subtle` subtle containers |
| ![](zeroheight://image/7242086/7f007d9dc15cf5081752a5038a73f08a5de26e8a71f2cc556e717ece4fcc92a7) | `strong` stronger separation / emphasis |

**Interactive backgrounds** Use these for buttons and other interactive UI. They always come with states:

Pick the intent (`primary`, `secondary` or `danger`), then the state (`default`, `hover`, `active` or `disabled`). For example, a primary button on hover uses `--mds-bg-interactive-primary-hover`. Primary and danger also have `default-light`. Secondary doesn’t.

| `primary` | `secondary` | `danger` |   |
| --- | --- | --- | --- |

| ![](zeroheight://image/7242086/85a7d92bac80264afe2f56ee2577eab048d781e6c7c3ec445d18f4d67a333bf5) | `default` | ![](zeroheight://image/7242086/37268997d71374ca1ba8581b4acbca2c37598d30c9fd0df8ac9626fa666bb5e1) | `default` | ![](zeroheight://image/7242086/712aa15062b51da289d0438d21771eee0f3eb72cc8409666ef23aa2181d46fe5) | `default` |   |   |
| :---: | :--- | :---: | :--- | :---: | :--- | :---: | :--- |
| ![](zeroheight://image/7242086/9c9f6bf938519426237f1724fe2c3170a19f65bbe574ce048c1c2c942c677b25) | `hover` | ![](zeroheight://image/7242086/44c935d4e038b90209dc64e5d926f69e1163a2bc295498c437429192f49368e8) | `hover` | ![](zeroheight://image/7242086/78057a12f9a5a58186267d5434b9baec79d72663116e6b629eee14609272371c) | `hover` |   |   |
| ![](zeroheight://image/7242086/e6c8d7a0729a9d7d080572eeedd05365043f0c0734d532b2e2ec590078f4ddbc) | `active` | ![](zeroheight://image/7242086/059882507fe6d7a64328b6b65d7990cfe9cd239a729708893437a2527b1ef321) | `active` | ![](zeroheight://image/7242086/32820cee1dc0c0cfe9c8717fbfa285d23e05e0dec8caa89e9332d3b6f0b5a3c1) | `active` |   |   |
| ![](zeroheight://image/7242086/b60cd35d6e2af2b3fa5aa8a17dd14a96ef195bc5fb76d77efa1e61a60baeafa9) | `disabled` | ![](zeroheight://image/7242086/e2c235736b6eb5704fb8940191572dd44c922b04d5b590f610cf4c156728fb75) | `disabled` | ![](zeroheight://image/7242086/abd3faef0b4ce4bd1e5bec10a48680b5baf0de24e8ffdb4143638da9744329c9) | `disabled` |   |   |
| ![](zeroheight://image/7242086/1fae928467288251f07f1dfb22bc81c1cd74f230a94b5262174a9c336d937f1e) | `default-light` |   |   | ![](zeroheight://image/7242086/87b176238c866605acfe98b11e409574e036b810964154e27dc591422b47ef97) | `default-light` |   |   |

**Feedback backgrounds** Use these for alerts/banners/toasts. 

Pick the type (`primary`, `secondary`, `success`, `warning`, `danger` or `info`), then the strength (`default`, `subtle` or `light`). For example, `--mds-bg-feedback-success-subtle`. Secondary has `dark` instead of `light`.

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

`--mds-text-default`, `--mds-text-subtle`, `--mds-text-muted`, `--mds-text-emphasis`, `--mds-text-inverse`, `--mds-text-danger` and `--mds-text-danger-disabled`.

| ![](zeroheight://image/7242086/8def692280e6becd1789214df85d01d2e88d6327012f91eba2e9a00eece35a9d) | `default` | ![](zeroheight://image/7242086/2345d47060057df4a6dc04d2118917cfbdd24ec382d8d9daccaf2de504525897) | `subtle` | ![](zeroheight://image/7242086/b1d197bf4c3950a167d137afef1efb0fee7f5e55e57b51c7a1a1856bb532daed) | `danger` | ![](zeroheight://image/7242086/9b44fb9df0935045b595cc2a749466b3e64ffaa404fe7ce81620936f30373c09) | `danger-disabled` |
| :---: | :--- | :---: | :--- | :---: | :--- | :---: | :--- |
| ![](zeroheight://image/7242086/010e0b8a902da8cdda2e38f8390cbc57bbc568dea55e5bda98428172055239ac) | `muted` | ![](zeroheight://image/7242086/732fdfe149f0d8cd186acabfd4b4cd6f030b8b3408c75860b94607eaeec522d6) | `emphasis` | ![](zeroheight://image/7242086/7d26cd7a04c3a07c6ccd10a84685fc480abe22bf45c3b238e0d5bc1b080a0387) | `inverse` |   |   |

For feedback components, use the matching feedback text token for best readability:

Use `--mds-text-feedback-{type}` with the same type as the background, for example `--mds-text-feedback-success` on a success background.

| ![](zeroheight://image/7242086/07d623dcded87cb934fb6c13381235c486966b2bfe30e6f11c310df7f005f7e4) | `primary` | ![](zeroheight://image/7242086/9c6682fd1b44d9a2d6f570e3111ce907a385efbb5eb159556b7af5c7b1b7408f) | `success` | ![](zeroheight://image/7242086/4c5e5927b02a12b5d47d025a2168e3958f1817f55f361615d37337498a569841) | `danger` |
| :---: | :--- | :---: | :--- | :---: | :--- |
| ![](zeroheight://image/7242086/5570dd93259a5ec008de1674807037f2d089a268660c82c4c262db9094a74cd6) | `secondary` | ![](zeroheight://image/7242086/17263a10a15af5a29d378bff162db06a0b95ed04cd398506899bc79d025f153d) | `warning` | ![](zeroheight://image/7242086/6c4cf358f0ed94af8f6602f619965a7eb34663353a893ff0635252fc48dce27c) | `info` |

Link styling:

`--mds-text-link-primary-default`, `--mds-text-link-primary-hover` and `--mds-text-link-primary-disabled`.

| ![](zeroheight://image/7242086/7a1df6de27a90cb9249156b9f7e639c88f388ddbd54bb07bc13fb6a3a7f8d3c8) | `default` | ![](zeroheight://image/7242086/36029bab5e0f500e137f13f926e1ff3dd0b08b2b20726cb538e413eaeafda493) | `hover` | ![](zeroheight://image/7242086/3bb0e4717085dee9e1a57f72d63af68d3d76815dd76d64a85a432c84820ecc20) | `disabled` |
| :---: | :--- | :---: | :--- | :---: | :--- |

---

### Borders 

Borders separate regions and define components:

* `--mds-border-default`: standard outlines and dividers.
* `--mds-border-subtle`: lighter separation.

| ![](zeroheight://image/7242086/88739305ed67991576181c71a2c1052c83e706e311b7b9bfe4a42d5e10f2cf73) | `default` standard outlines/dividers |
| :---: | :--- |
| ![](zeroheight://image/7242086/cb3f0d5cdf37f0064ff136e159627affa376cf5d714cb57cf84e6ed9f6f8da4a) | `subtle` lighter separation |

Feedback borders pair with feedback backgrounds:

Use `--mds-border-feedback-{type}` with the same type as the background, for example `--mds-border-feedback-success`.

| ![](zeroheight://image/7242086/ba62a452d3c4628a839f153adf0fa15e3524f1fe3c8a31039c3d89eafeb9e878) | `primary` | ![](zeroheight://image/7242086/9e2543d6e83ca68b952bec886f45d163ec60580894534e9897afab239c5e3088) | `success` | ![](zeroheight://image/7242086/f267b835b9e93175c774e30fa5d97175bbc83e4b1653c4b0bee83610bb5505b1) | `danger` |
| :---: | :--- | :---: | :--- | :---: | :--- |
| ![](zeroheight://image/7242086/45e744cff912ffc56c73332e85e06121d118b12b66f0b20342486bd6565b5a26) | `secondary` | ![](zeroheight://image/7242086/2d2d3ee657173fbae2d75de114119d073cc903ceb25f04948e3f70b5b686d76c) | `warning` | ![](zeroheight://image/7242086/c649e846d66cd942d9183cfe5303c65358a6a97f7c7ee04b534efcf04413efbb) | `info` |

Interactive borders pair with interactive states:

Same pattern as interactive backgrounds: pick the intent (`primary`, `secondary` or `danger`), then the state (`default`, `hover`, `active` or `disabled`). For example, `--mds-border-interactive-danger-hover`.

| `primary` | `secondary` | `danger` |   |
| --- | --- | --- | --- |

| ![](zeroheight://image/7242086/c690f70787bb93de62ec5df85f3c7b924896fbe17adff266eaf470ec907fcc21) | `default` | ![](zeroheight://image/7242086/1351fa6ca2efe5e0ade23968118998a3118cb8f46de79bd764fbf2e8b3a31765) | `default` | ![](zeroheight://image/7242086/70549f68d4eb8bc7fabcfbe75fffaffabb3884157106804465fc226d8af12841) | `default` |   |   |
| :---: | :--- | :---: | :--- | :---: | :--- | :---: | :--- |
| ![](zeroheight://image/7242086/d14ef54e8a98787e8b84b777532f4caabe5d36766285cd9ea39a84382db634f1) | `hover` | ![](zeroheight://image/7242086/6e7d87189224c396f457fe71c9d35d1a28c891b68f4a1bf5767ed1098085aee6) | `hover` | ![](zeroheight://image/7242086/0bf3f715ac49ae6776ae4a6362f9e2ee9dc942259a53c762933d0cfc716f4419) | `hover` |   |   |
| ![](zeroheight://image/7242086/82e4e5a53f26bdfc77c0b14c308fa7bb570238e643879bec5823fcd398e4425d) | `active` | ![](zeroheight://image/7242086/5536924250ff8465a18c82e221d702345dddeb0e93e5259ecc1c0b165ec0d188) | `active` | ![](zeroheight://image/7242086/434818c7678f39a4415b53303e38defe8818320625d4e8387f743851e7e74864) | `active` |   |   |
| ![](zeroheight://image/7242086/3f52391a6736f16df327aceb0461b108bd62795e7f21245064b92aa035c1f2a0) | `disabled` | ![](zeroheight://image/7242086/bedb1b290e3aa6b4df0ec69a9afb0fafe94636a06e18b2664d9c0c5e705565c6) | `disabled` | ![](zeroheight://image/7242086/23d23e445b0e513814c29a7435ce2b0e157372c49ba2713365618d294265eaa5) | `disabled` |   |   |

Focus is shared and consistent:

* `--mds-focus-default`: all interactive elements.
* `--mds-focus-danger`: interactive elements in a danger or error state.

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
<shortcut_tile url="https://github.com/moodlehq/design-system/blob/main/tokens/css/light.css">
![CSS](zeroheight://image/7242086/d45d53ea644eef08e137e338a2e3235e0a71c67cc474e84fb685aaa1f631053b)

**CSS**
</shortcut_tile>

<shortcut_tile url="https://github.com/moodlehq/design-system/blob/main/tokens/scss/_light.scss">
![SCSS](zeroheight://image/7242086/a0ee320163ed8646b4e64f6cbf298a80ead9eae0c019facdb1e2a362231dc28d)

**SCSS**
</shortcut_tile>
</shortcut_tiles>
---

# Tokens
## Primitive colour tokens

These are the base colours. Each one is named by its colour and shade.

Don’t use these in components. They’re the raw palette the semantic tokens point to. Names follow `--mds-color-{colour}-{shade}`, for example `--mds-color-blue-500`.

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
| bg.feedback.secondary.dark | #343A40 |
| bg.feedback.secondary.default | #DEE2E6 |
| bg.feedback.secondary.subtle | #F8F9FA |
| bg.feedback.success.default | #357A32 |
| bg.feedback.success.light | #EBF2EA |
| bg.feedback.success.subtle | #D7E4D6 |
| bg.feedback.warning.default | #F0AD4E |
| bg.feedback.warning.light | #FDF7ED |
| bg.feedback.warning.subtle | #FCEFDC |
| bg.interactive.danger.active | #791D13 |
| bg.interactive.danger.default | #CA3120 |
| bg.interactive.danger.default-light | #FAEAE9 |
| bg.interactive.danger.disabled | #EAADA6 |
| bg.interactive.danger.hover | #A2271A |
| bg.interactive.primary.active | #094173 |
| bg.interactive.primary.default | #0F6CBF |
| bg.interactive.primary.default-light | #E7F0F9 |
| bg.interactive.primary.disabled | #9FC4E5 |
| bg.interactive.primary.hover | #0C5699 |
| bg.interactive.secondary.active | #DEE2E6 |
| bg.interactive.secondary.default | #DEE2E6 |
| bg.interactive.secondary.disabled | #E9ECEF |
| bg.interactive.secondary.hover | #CED4DA |
| bg.surface.default | #FFFFFF |
| bg.surface.strong | #E9ECEF |
| bg.surface.subtle | #F8F9FA |
| border.default | #DEE2E6 |
| border.subtle | #E9ECEF |
| border.translucent | rgba(0, 0, 0, 0) |
| border.feedback.danger | #EAADA6 |
| border.feedback.info | #99CDD5 |
| border.feedback.primary | #9FC4E5 |
| border.feedback.secondary | #E9ECEF |
| border.feedback.success | #AECAAD |
| border.feedback.warning | #F9DEB8 |
| border.interactive.danger.active | #A2271A |
| border.interactive.danger.default | #CA3120 |
| border.interactive.danger.disabled | #DF8379 |
| border.interactive.danger.hover | #CA3120 |
| border.interactive.primary.active | #0C5699 |
| border.interactive.primary.default | #0F6CBF |
| border.interactive.primary.disabled | #6FA7D9 |
| border.interactive.primary.hover | #0F6CBF |
| border.interactive.secondary.active | #495057 |
| border.interactive.secondary.default | #CED4DA |
| border.interactive.secondary.disabled | #DEE2E6 |
| border.interactive.secondary.hover | #6A737B |
| focus.danger | #EAADA6 |
| focus.default | #0F6CBF |
| text.danger | #CA3120 |
| text.danger disabled | #DF8379 |
| text.default | #1D2125 |
| text.emphasis | #000000 |
| text.inverse | #F8F9FA |
| text.muted | #6A737B |
| text.subtle | #495057 |
| text.feedback.danger | #51140D |
| text.feedback.info | #00343C |
| text.feedback.primary | #062B4C |
| text.feedback.secondary | #343A40 |
| text.feedback.success | #153114 |
| text.feedback.warning | #60451F |
| text.link.primary.default | #0F6CBF |
| text.link.primary.disabled | #6FA7D9 |
| text.link.primary.hover | #0C5699 |
| bg.feedback.primary.default | #0F6CBF |
| bg.feedback.primary.light | #E7F0F9 |
| bg.feedback.primary.subtle | #CFE2F2 |
| bg.feedback.info.default | #006778 |
| bg.feedback.info.light | #E5F2F4 |
| bg.feedback.info.subtle | #CCE6EA |
| bg.feedback.danger.default | #CA3120 |
| bg.feedback.danger.light | #FAEAE9 |
| bg.feedback.danger.subtle | #F4D6D2 |
---

---

# Tokens
## Displays

Display styles are used for large, high-impact text.

While not frequently used in Moodle’s current UI, these styles are available for cases where strong visual presence is needed, such as landing pages, banners, or hero sections. Use them thoughtfully and in alignment with the product’s content strategy.

---

## Headings

Heading styles help to organise content into different levels of importance. They help users scan the page and understand how the content is organised.

These styles are more commonly used across Moodle, and may also play a role in how pages are interpreted by assistive technologies and search engines.

* Use them to define **sections**, **subsections**, and **logical content hierarchy.**
* Each level (Heading 1–6) is designed to scale down progressively in size.
* Avoid skipping heading levels.


---

## Paragraph styles

Paragraph styles are used for body content, supporting text, and other long-form content.

They are designed for readability and accessibility in UI contexts, with appropriate spacing and line height to ensure comfort during longer reading sessions.

### Base text

This is the default text style for body content. Use it for paragraphs, descriptions, instructions, and any general-purpose text.

It is the most widely used style across the system.

### Small 

Use this style for secondary or supporting text, such as:

* Timestamps
* Metadata
* Labels or captions
* Optional field descriptions

Do not use it for long paragraphs or dense content, as small text is harder to read over long passages.

### Lead

This style is intended for short introductory paragraphs or highlighted text blocks, such as intros at the top of pages or sections.

While not commonly used in Moodle, it’s available for cases where slightly larger body text is needed to give visual emphasis.

Use it sparingly and only when it helps improve clarity or user focus.

## UI text

UI text styles are used for interactive elements and short-form copy, such as buttons, labels, links, and input fields. They are designed for clarity and legibility within components, often using more compact spacing and line height to fit neatly within defined boundaries.

### UI default

This is the default text style for most UI components. Use it for buttons, labels, input fields, links, and other interactive elements. 

It is the most widely used text size for components across the system.

### UI small

This is the small text style used for smaller components or for secondary UI content. 

This size is ideal when less prominence is needed or the default UI text is too large for the available space.

### UI large

This is the large text style used for larger UI components. 

This size is ideal when the default UI text is too small for the available space or when the content needs more visual emphasis.

---

## Typography tokens

| Token | Value | Description |
| --- | --- | --- |
| font family.base | Noto Sans | Default typeface for all UI text. Ensures global consistency. |
| font family.base-JP | Noto Sans JP | Default typeface for all UI text. Ensures global consistency. |
| font family.code | Menlo | Typeface for code, preformatted text, or monospace contexts. |
| font size.displays.1 | 80 | Display style, largest. |
| font size.displays.2 | 72 | Display style, extra-large. |
| font size.displays.3 | 64 | Display style, large. |
| font size.displays.4 | 56 | Display style, medium-large. |
| font size.displays.5 | 48 | Display style, medium. |
| font size.displays.6 | 40 | Display style, smaller display. |
| font size.headings.1 | 40 | Font size for H1 headings. |
| font size.headings.2 | 32 | Font size for H2 headings. |
| font size.headings.3 | 28 | Font size for H3 headings. |
| font size.headings.4 | 24 | Font size for H4 headings. |
| font size.headings.5 | 20 | Font size for H5 headings. |
| font size.headings.6 | 16 | Font size for H6 headings. |
| font size.paragraph.default | 16 | Base size for body text. |
| font size.paragraph.lead | 20 | Slightly larger body text, for lead paragraphs. |
| font size.paragraph.small | 14 | Reduced size for secondary text. |
| font weight.bold | 700 |   |
| font weight.light | 300 |   |
| font weight.medium | 500 |   |
| font weight.regular | 400 |   |
| font weight.semibold | 600 |   |
| letter spacing.default | 0 | Standard tracking for all texts. |
| line height.displays.1 | 96 |   |
| line height.displays.2 | 86.4 |   |
| line height.displays.3 | 76.8 |   |
| line height.displays.4 | 67.2 |   |
| line height.displays.5 | 57.6 |   |
| line height.displays.6 | 48 |   |
| line height.headings.1 | 48 | Tight line height for headings. |
| line height.headings.2 | 38.4 | Tight line height for headings. |
| line height.headings.3 | 33.6 | Tight line height for headings. |
| line height.headings.4 | 28.8 | Tight line height for headings. |
| line height.headings.5 | 24 | Tight line height for headings. |
| line height.headings.6 | 19.2 | Tight line height for headings. |
| line height.paragraph.xs | 12 |   |
| line height.paragraph.default | 24 | Comfortable line height for paragraphs. |
| line height.paragraph.lead | 40 | Extended line height for large body text. |
| line height.paragraph.small | 17.4 | Compact line height for small text. |
| margin bottom.display | 0 | Default margin below a Displays. |
| margin bottom.heading | 8 | Default margin below a Headings. |
| margin bottom.paragraph | 16 | Default margin below a paragraph. |
---

# Overview
## Overview

Typography provides a consistent, readable hierarchy across products and components. Predefined styles reduce inconsistency and support accessibility by default.

### Core principles

* Use published text styles; avoid local overrides.
* Choose styles by **role**, not by “what looks right.”
* Don’t skip heading levels.
* Use system [text colour roles](https://design.moodle.com/98292f05f/p/32c91c-colours/t/3881f922ff) (don’t hardcode).

---

## Usage

### Typeface

We use **[Noto Sans](https://fonts.google.com/noto/specimen/Noto+Sans)** as our primary typeface across the system.

We also use 2 more font families:

* **Noto Sans JP** for Japanese text (`--mds-font-family-base-jp`)
* **Menlo** for code and other monospace text (`--mds-font-family-code`)

![](zeroheight://image/7726675/cf9211904d6d8730a82f7f90a96c3f9706c8ef4ae51666ae8e0a335adf00a8d9)

### Weights

The tokens include 9 weights, from 100 Thin to 900 Black. We support 5 of them, and they’re the only ones used in our text styles:

* 300 Light
* 400 Regular (base)
* 500 Medium
* 600 Semibold
* 700 Bold

100 Thin, 200 Extra light, 800 Extra bold and 900 Black are available as primitive tokens, but they aren’t supported. Stick to the 5 above.

### Style groups

* **Display**: high-impact moments (rare)
* **Headings (H1–H6)**: structure and hierarchy
* **Paragraph**: reading and supporting text
* **UI text**: labels and interactive elements

![](zeroheight://image/7726675/0f88f2977d11c709c99bac6747a8591b2e93396abbfa7be8ca69fce3ba77d14f)

---

### Examples

* Use **Base text** for paragraphs, instructions, long-form content.
* Use **Small text** for metadata/helper text, not dense paragraphs.
* Use **UI text** for buttons, labels, inputs, links.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do | ![](zeroheight://image/7726675/f90784b40af22844a0e50263a17cf4979c1936aa5498177de3ad117febff9c6b) |   | SHOULD use the published Heading styles in order, stepping down one level at a time, so the hierarchy is clear to people and assistive technology. |
| Don't | ![](zeroheight://image/7726675/287c0a19421e6df2e566b5d73bd30b3e54e0801c3f7c1d86b06ee9c7c358cd0b) |   | MUST NOT skip heading levels, 
MUST NOT create local text styles or override published ones.. |
| Do | ![](zeroheight://image/7726675/32c0efc9dfa494610016684c2a3611f4faaf31d6f2a555204e0fc0cbe2d83361) |   | SHOULD choose each text style by its role. |
| Don't | ![](zeroheight://image/7726675/96a37e3ebf5bc971a170a0acb3c018e888e5f435c9c800ded47b2f527069c0e1) |   | MUST NOT select styles randomly or based on how they look.  |

---

### Accessibility considerations

Our typography and text colour styles are designed to meet [WCAG 2.2 Level AA](https://www.w3.org/TR/WCAG22/) as a baseline.

This includes:

* Sufficient contrast between text and background for all text styles
* **Primary body text** uses a minimum size of **16px (1rem)** to support comfortable reading.
* **Small text (14px)** is permitted for **secondary or supporting content**, such as metadata, helper text, labels, or timestamps.
* Font weights and line heights that support legibility across devices
* Clear visual hierarchy through consistent use of text styles

All published styles in Figma have been reviewed with accessibility in mind. When used as intended, they require no further adjustments.

**What to keep in mind?**

* Avoid using non-standard backgrounds with text unless contrast is checked
* Never define custom text styles or colours without consulting the Design System team
* Use tools like **[Stark](https://www.figma.com/community/plugin/732603254453395948/stark-contrast-accessibility-checker)** or **[Figma’s contrast checker](https://www.figma.com/color-contrast-checker/)** to validate accessibility if needed
---

# Code
<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/blob/main/tokens/css/light.css">
![CSS](zeroheight://image/7726675/d45d53ea644eef08e137e338a2e3235e0a71c67cc474e84fb685aaa1f631053b)

**CSS**
</shortcut_tile>

<shortcut_tile url="https://github.com/moodlehq/design-system/blob/main/tokens/scss/_light.scss">
![SCSS](zeroheight://image/7726675/a0ee320163ed8646b4e64f6cbf298a80ead9eae0c019facdb1e2a362231dc28d)

**SCSS**
</shortcut_tile>
</shortcut_tiles>
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

In code: `--mds-stroke-weight-sm` (1px), `--mds-stroke-weight-md` (2px), `--mds-stroke-weight-lg` (3px), `--mds-stroke-weight-xl` (4px) and `--mds-stroke-weight-xxl` (5px).

| ![](zeroheight://image/7676729/d0d35825780870bf31be0407a86d305b2ada878aed2f198a2003d348dcd93ee8) | `--mds-stroke-weight-sm` Used for fine outlines, subtle dividers or light borders on cards. |
| :--- | :--- |
| ![](zeroheight://image/7676729/8eaca89427315b1e1cac759c30c3dc49ab67df9fdce98fd1db664b51d7039889) | `--mds-stroke-weight-md` Used for inputs, containers or lightly emphasised components. |
| ![](zeroheight://image/7676729/91f2c3ef9adef2ba0871549ee2fb77fdd5eb636b9a7a35000c3bc6aac41fbce0) | `--mds-stroke-weight-lg` Not currently used by any component. |
| ![](zeroheight://image/7676729/0d94f3d1e6daf70f9a6a4b5db6e3bbb096dba8d8c089bf469546c0350a074550) | `--mds-stroke-weight-xl` Used for banners or elements needing strong visual emphasis. |
| ![](zeroheight://image/7676729/36e26b1ccedbd2baeaa803adf58690c5c8bc0c1a27089baaebf541cc76197a09) | `--mds-stroke-weight-xxl` Used sparingly for highly prominent components or callouts. |

### Radius

Radius tokens set the roundness of corners to ensure shape consistency across the interface.

In code: `--mds-border-radius-none` (0), `--mds-border-radius-xs` (4px), `--mds-border-radius-sm` (6px), `--mds-border-radius-md` (8px), `--mds-border-radius-lg` (12px), `--mds-border-radius-xl` (16px), `--mds-border-radius-xxl` (32px) and `--mds-border-radius-pill`.

![](zeroheight://image/7676729/ebcaaf9a340ac406bfb2e6960be1910bcb8518de163b3aaa25a6b09f5dc9e0aa)

| ![](zeroheight://image/7676729/d7ff692791ca2a9403f752aa3ea496e95be5252b74607c595625734857f27756) | `--mds-border-radius-xs` Used for buttons or inputs in compact components. |
| :--- | :--- |
| ![](zeroheight://image/7676729/ecd92a1928e6f6b0a5203119ce553fb690aaf9aceb2cda2ca252a7f7ff4d0578) | `--mds-border-radius-sm` Used for cards, panels and standard containers. |
| ![](zeroheight://image/7676729/d685ac887d2d9a139418f4acab10cac687a2869dd9d0561bc647d27f8e554385) | `--mds-border-radius-md` Used when softer curves are needed for visual balance. |
| ![](zeroheight://image/7676729/cfbaaf407d515c404f4d02268dc65bf4b902756f1d10011684e17058389e6e6e) | `--mds-border-radius-lg` Used when softer curves are needed for visual balance. |
| ![](zeroheight://image/7676729/1669c5a9375a7fefc167c9e1f293a9a98d13f73ea937d0d9d7f4cbbb7aede2d6) | `--mds-border-radius-xl` Used for overlays, modals or large pill-style buttons. |
| ![](zeroheight://image/7676729/074f6fa6aa1cd6ede29ad97f33a4c820dc48b03a48015d20c19b5e7338d5a537)  | `--mds-border-radius-xxl` Used for large tags or rounded panels. |
| ![](zeroheight://image/7676729/ec3a15fa0e6e0b53ae770c12c63000c75666ad070aafacc7a69ffeb25f1b071b) | `--mds-border-radius-pill` Used for pill-shaped elements such as badges or toggles. |

### Focus ring

Focus ring tokens define the outline used to show keyboard focus. This helps users navigate interfaces using a keyboard or assistive technology.

It is defined by two properties: colour and stroke weight. The stroke weight is `--mds-stroke-weight-md` (2px).

![](zeroheight://image/7676729/25a33a2f76936433a6c3ecf8b6b073ff5f3aedce02ea41c19d0ff4bddbbc35ab)

---

### Examples

* Inputs use`--mds-stroke-weight-md`by default; the focus ring uses `--mds-stroke-weight-md` (2px)
* Cards/panels use `--mds-border-radius-md`; pills use`--mds-border-radius-pill`only when shape requires it

![](zeroheight://image/7676729/696925774a27e2c8564efd5349ffe4c369987cec437779769bda41cd349f2b31)

---

### Accessibility considerations

* Focus must be clearly visible for keyboard users
* Focus should remain visible across supported surfaces
---

# Tokens
### Stroke weight

Define the thickness of borders and lines. They help create visual hierarchy and separate elements clearly.

Pick the lightest stroke that does the job, and save the heavier ones for emphasis like focus or selected states. Names follow `--mds-stroke-weight-{size}`, from `sm` (1px) to `xxl` (5px). See Usage on the Overview tab for which one goes where.

| Token | Value |
| --- | --- |
| stroke weight.sm | 1 |
| stroke weight.md | 2 |
| stroke weight.lg | 3 |
| stroke weight.xl | 4 |
| stroke weight.xxl | 5 |

---

### Radius tokens

Set the roundness of component corners. They help maintain consistent shapes and a balanced visual style.

Keep corners consistent within a component family. Names follow `--mds-border-radius-{size}`, from `none` (0) to `xxl` (32px), plus `pill` for fully rounded shapes. See Usage on the Overview tab for which one goes where.

| Token | Value |
| --- | --- |
| border radius.none | 0 |
| border radius.xs | 4 |
| border radius.sm | 6 |
| border radius.md | 8 |
| border radius.lg | 12 |
| border radius.xl | 16 |
| border radius.xxl | 32 |
| border radius.pill | 800 |

For the full list of tokens and their values, see [tokens/css/light.css](https://github.com/moodlehq/design-system/blob/main/tokens/css/light.css) on GitHub.
---

# Code
<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/blob/main/tokens/css/light.css">
![CSS](zeroheight://image/7676729/d45d53ea644eef08e137e338a2e3235e0a71c67cc474e84fb685aaa1f631053b)

**CSS**
</shortcut_tile>

<shortcut_tile url="https://github.com/moodlehq/design-system/blob/main/tokens/scss/_light.scss">
![SCSS](zeroheight://image/7676729/a0ee320163ed8646b4e64f6cbf298a80ead9eae0c019facdb1e2a362231dc28d)

**SCSS**
</shortcut_tile>
</shortcut_tiles>
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
| Do | ![](zeroheight://image/7242090/d0889673a3467258e62d30081fd535ecc6e1f4fdce41e3978b8821c724aa52f6) |   | MUST use spacing tokens for every gap. For example, --mds-spacing-xxl above the page title, --mds-spacing-lg between the title and the section heading, --mds-spacing-md above the filters and --mds-spacing-sm between the filters and the cards. |
| Don't | ![](zeroheight://image/7242090/e857c3ec13f688bbe18e11cedcbc49d27a7550272f51bee9fc012a1e9d8cf847) |   | SHOULD NOT use one-off pixel values like 52px or 20px for gaps. They don’t follow the scale, so the spacing ends up uneven. |

---

### Accessibility considerations

* Avoid overly dense layouts that reduce readability
* Ensure adequate space for focus rings and error messages
---

# Code
<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/blob/main/tokens/css/light.css">
![CSS](zeroheight://image/7242090/d45d53ea644eef08e137e338a2e3235e0a71c67cc474e84fb685aaa1f631053b)

**CSS**
</shortcut_tile>

<shortcut_tile url="https://github.com/moodlehq/design-system/blob/main/tokens/scss/_light.scss">
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
* You don't need to provide designs for every breakpoint. Focus on the breakpoints where the layout or component changes meaningfully.
* For responsive utility classes and media query implementation, refer to [Bootstrap's breakpoints documentation](https://getbootstrap.com/docs/5.0/layout/breakpoints/).
---

# Tokens
### Spacing tokens

Use smaller steps for things that belong together and bigger steps between sections. Names follow `--mds-spacing-{size}`, from `none` (0) to `xxl` (48px). See Usage on the Spacing tab for the full scale.

| Token | Value |
| --- | --- |
| spacing.none | 0 |
| spacing.offset | 1 |
| spacing.xxs | 4 |
| spacing.xs | 8 |
| spacing.sm | 12 |
| spacing.md | 16 |
| spacing.lg | 20 |
| spacing.xl | 32 |
| spacing.xxl | 48 |

For the full list of tokens and their values, see [tokens/css/light.css](https://github.com/moodlehq/design-system/blob/main/tokens/css/light.css) on GitHub.

### Breakpoints

| Token | Value |
| --- | --- |
| breakpoints.sm | 576 |
| breakpoints.md | 768 |
| breakpoints.lg | 992 |
| breakpoints.xl | 1200 |
| breakpoints.xxl | 1400 |
---

---

# Tokens
### Icon size tokens

| Token | Value |
| --- | --- |
| icons.xxs | 8 |
| icons.xs | 12 |
| icons.sm | 16 |
| icons.md | 20 |
| icons.lg | 24 |
| icons.xl | 32 |
---

# Icon library
## Icon library

This library provides an overview of the icons currently used in Moodle.

<callout background="1" fullWidth="true">

In some cases, the same symbol may be known by **alternative names** in Font Awesome. When this happens, alternative names are listed under the icon.

</callout>

For more icons go to: 
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

Sizes include six predefined options: **XXS**, **SM**, **MD** (default), **LG**, **XL**, and **XXL**. Choose a size based on the layout. Smaller sizes work well inline with text. Larger ones suit featured or attention-grabbing areas.

| `xxs` | 8 px |
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

# Code
<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/blob/main/tokens/css/light.css">
![CSS](zeroheight://image/7242089/d45d53ea644eef08e137e338a2e3235e0a71c67cc474e84fb685aaa1f631053b)

**CSS**
</shortcut_tile>

<shortcut_tile url="https://github.com/moodlehq/design-system/blob/main/tokens/scss/_light.scss">
![SCSS](zeroheight://image/7242089/a0ee320163ed8646b4e64f6cbf298a80ead9eae0c019facdb1e2a362231dc28d)

**SCSS**
</shortcut_tile>
</shortcut_tiles>
---

---

# Code
<shortcut_tiles>
<shortcut_tile url="https://github.com/moodlehq/design-system/blob/main/tokens/css/light.css">
![CSS](zeroheight://image/8149447/d45d53ea644eef08e137e338a2e3235e0a71c67cc474e84fb685aaa1f631053b)

**CSS**
</shortcut_tile>

<shortcut_tile url="https://github.com/moodlehq/design-system/blob/main/tokens/scss/_light.scss">
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

Each shadow style uses the same size for blur, offset and colour:

* Shadow / Small: `--mds-blur-sm` (4px), `--mds-offset-sm` (2px down) and `--mds-color-sm`.
* Shadow / Medium: `--mds-blur-md` (16px), `--mds-offset-md` (8px down) and `--mds-color-md`.
* Shadow / Large: `--mds-blur-lg` (48px), `--mds-offset-lg` (16px down) and `--mds-color-lg`.

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

How soft the shadow is: `--mds-blur-sm`, `--mds-blur-md` or `--mds-blur-lg`.

| Token | Value |
| --- | --- |
| blur.sm | 4 |
| blur.md | 16 |
| blur.lg | 48 |

### Offset

How far the shadow drops: `--mds-offset-sm`, `--mds-offset-md` or `--mds-offset-lg`.

| Token | Value |
| --- | --- |
| offset.sm | 2 |
| offset.md | 8 |
| offset.lg | 16 |

### Colour

How dark the shadow is: `--mds-color-sm`, `--mds-color-md` or `--mds-color-lg`.

| Token | Value |
| --- | --- |
| color.sm | rgba(0, 0, 0, 0.08) |
| color.md | rgba(0, 0, 0, 0.15) |
| color.lg | rgba(0, 0, 0, 0.17) |

Don’t build shadows from these one at a time. Use the shadow styles on the Overview tab, which keep the 3 in step.

For the full list of tokens and their values, see [tokens/css/light.css](https://github.com/moodlehq/design-system/blob/main/tokens/css/light.css) on GitHub.
---
