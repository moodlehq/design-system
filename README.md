# [Moodle Design System](https://github.com/moodlehq/design-system)

![NPM Version](https://img.shields.io/npm/v/%40moodlehq%2Fdesign-system)
[![License](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

[![Test suite](https://github.com/moodlehq/design-system/actions/workflows/testing.yml/badge.svg)](https://github.com/moodlehq/design-system/actions/workflows/testing.yml)
[![OpenSSF Best Practices](https://www.bestpractices.dev/projects/11543/badge)](https://www.bestpractices.dev/projects/11543)
[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/moodlehq/design-system/badge)](https://scorecard.dev/viewer/?uri=github.com/moodlehq/design-system)

Welcome! Whether you're a designer or a developer, this guide will help you get started and connect you to the essential resources you need.

The Moodle Design System (MDS) is a comprehensive collection of design and development resources aimed at creating a consistent and efficient user experience across all Moodle products starting with the Core LMS.
It includes design assets, guidelines, UI components, and code standards to help teams build cohesive and accessible interfaces.

The MDS is a collaborative effort between designers and developers at Moodle HQ and the wider Moodle community and is continuously evolving to meet the needs of users and to incorporate feedback we receive.

## Table of Contents

- [Design Resources](#design-resources)
  - [Design Tools](#design-tools)
  - [Design Assets & Guidelines](#design-assets--guidelines)
- [Development Resources](#development-resources)
  - [Development Tools](#development-tools)
  - [Coding Standards](#coding-standards)
- [Installation & Usage](#installation--usage)
  - [Prerequisites](#prerequisites)
  - [Quick Start](#quick-start)
  - [Convert Tokens From ZeroHeight to CSS Variables](#convert-tokens-from-zeroheight-to-css-variables)
  - [Testing the Design System](#testing-the-design-system)
  - [Build the Design System](#build-the-design-system)
- [CHANGELOG](#changelog)
- [Contributing & Support](#contributing--support)
- [FAQ](#faq)
- [License](#license)

## Design Resources

### Design Tools

To create and manage our design assets, we use the following tools:

- **[Figma](https://www.figma.com/)**: A collaborative design and prototyping tool. It's the heart of the design process, allowing designers to work together seamlessly.
- **[ZeroHeight](https://zeroheight.com/)**: A platform for creating and maintaining design systems. It helps document design guidelines and components for easy access by the team.

### Design Assets & Guidelines

All design assets and guidelines are centralized in the following resource:

- [Moodle ZeroHeight](https://moodle.zeroheight.com/): The central repository for all design assets, including components, styles, and guidelines.

## Development Resources

### Development Tools

Key tools for contributing to the design system:

- **Code Editor**: Any modern editor supporting JavaScript/TypeScript. [VSCode](https://code.visualstudio.com/) is recommended with pre-configured settings in `.vscode/` directory. [EditorConfig](https://editorconfig.org/) ensures consistent styles across all editors.
- **[Storybook](https://storybook.js.org/)**: Interactive component development and documentation environment.
- **[Chromatic](https://www.chromatic.com/)**: Visual regression testing and UI review platform.
- **[Style Dictionary](https://styledictionary.com/)**: Design token management and transformation.
- **[GitHub Actions](https://github.com/features/actions)**: CI/CD pipeline for automated testing and deployment.

### Coding Standards

This repository follows these standards:

- **Code Quality**: [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) for consistent code style.
- **Security**: [OpenSSF Best Practices](https://www.bestpractices.dev/) and [OpenSSF Scorecard](https://scorecard.dev/) compliance.
- **Commits**: [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/#summary) specification.
- **Git Hooks**: [Husky](https://typicode.github.io/husky/) with [lint-staged](https://github.com/lint-staged/lint-staged), pre-commit, and pre-push hooks.
- **Testing**: [Vitest](https://vitest.dev/) for unit tests, [Storybook](https://storybook.js.org/) for component development and interaction testing.
- **Accessibility**: [WCAG 2.2 AA](https://www.w3.org/WAI/WCAG22/quickref/) compliance via [axe accessibility addon](https://www.npmjs.com/package/@storybook/addon-a11y).

## Installation & Usage

### Prerequisites

- Node.js v22.13.0 or higher
- npm
- Git

### Quick Start

To view the components in action, you can run Storybook locally. This will allow you to see the components in a live environment.

```bash
npm install
npm run storybook
```

Storybook will provide detailed documentation and interactive examples of all components in the design system. However, a quick example is shown below:

```js
import '@moodlehq/design-system/css';

import { Button } from '@moodlehq/design-system';

export default function App() {
  return <Button label="Button" variant="primary" />;
}
```

### Fonts

The recommended typeface for Moodle Design System is **[Roboto](https://fonts.google.com/specimen/Roboto)**. The package does not bundle font files. Provide Roboto in your application:

**Option 1: Google Fonts CDN**

```html
<link
  href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
  rel="stylesheet"
/>
```

**Option 2: Self-hosted**
Place font files in your project and add `@font-face` declarations:

```css
@font-face {
  font-family: 'Roboto';
  src: url('./fonts/Roboto-VariableFont_wdth,wght.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
}

@font-face {
  font-family: 'Roboto';
  src: url('./fonts/Roboto-Italic-VariableFont_wdth,wght.woff2') format('woff2');
  font-weight: 100 900;
  font-style: italic;
}
```

### Consuming Tokens Only

The design system supports standalone token integration without components. Tokens are available in both CSS and SCSS formats:

```js
// CSS tokens
import '@moodlehq/design-system/tokens/css';

// SCSS tokens
import '@moodlehq/design-system/tokens/scss';
```

> **Note:** SCSS tokens use flat values rather than variable references. This is an intentional design decision due to limitations in Style Dictionary's built-in `scssVariables` formatter, which does not support `@use` imports for cross-file variable references. While a custom formatter could address this, it would also need to handle proper variable hoisting and sorting, requiring significant ongoing maintenance.

### Convert Tokens From ZeroHeight to CSS Variables

We make use of [Style Dictionary](https://styledictionary.com/) to convert design tokens exported from ZeroHeight into CSS variables that can be used throughout the design system and its consumers.

```bash
npm install
npm run build-tokens
```

### Testing the Design System

Various test scripts are available to ensure the quality and reliability of the design system components.

You can run these tests using the following commands:

```bash
# Install dependencies.
npm install
npx playwright install
# Run unit tests.
npm run test-unit
# Run unit tests with coverage report.
npm run test-unit-coverage
# Run Storybook interaction & accessibility tests.
npm run test-storybook
```

### Build the Design System

To build the design system, run the following commands in your terminal:

```bash
npm install
npm run build
```

The built files will be located in the `dist/` directory.

A [CHANGELOG](CHANGELOG.md) is automatically generated for each release using [Release Please](https://github.com/googleapis/release-please)

GitHub Actions are set up to automatically build the design system on each push to the main branch that has been tagged with a version number.

## CHANGELOG

See [CHANGELOG](CHANGELOG.md) for release history and updates.

## Contributing & Support

For any contributions, issues, or support, please reach out to the Moodle HQ Design System team through the following channels:

- Submit a [GitHub Issue](https://github.com/moodlehq/design-system/issues)
- Join our [Matrix channel](https://matrix.to/#/!BmKCxoEFOvaJrscitV:moodle.com?via=moodle.com&via=matrix.org&via=lern.link)
- Join the [Moodle Design System PAG course](https://moodle.org/course/view.php?id=17258)

Pull requests are our suggested method for contributing to the design system. Please ensure that your contributions adhere to our contribution guidelines. See [CONTRIBUTING](CONTRIBUTING) for more information.

## FAQ

**Q:** Does this work with Moodle LMS 5.x?<br>
**A:** We are aiming for integration with Moodle LMS 5.2.

**Q:** How do I report a bug or request a feature?<br>
**A:** Please use [GitHub Issues](https://github.com/moodlehq/design-system/issues) to report bugs or request features.

**Q:** Will my Moodle instance automatically use the latest Design System release?<br>
**A:** This will depend on the upcoming integration we are looking into. You will likely need to update your Moodle instance once we integrate into LMS.

## License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for details.
