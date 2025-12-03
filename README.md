# [Moodle Design System](https://github.com/moodlehq/design-system)

[![License](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Tests](https://github.com/moodlehq/design-system/actions/workflows/testing.yml/badge.svg)](https://github.com/moodlehq/design-system/actions/workflows/testing.yml)

[//]: # (![GitHub package.json version]&#40;https://img.shields.io/github/package-json/v/moodlehq/design-system&#41;)

Welcome! Whether you\'re a designer or a developer, this guide will help you get started and connect you to the essential resources you need.

The Moodle Design System (MDS) is a comprehensive collection of design and development resources aimed at creating a consistent and efficient user experience across all Moodle products starting with the Core LMS.
It includes design assets, guidelines, UI components, and code standards to help teams build cohesive and accessible interfaces.

The MDS is a collaborative effort between designers and developers at Moodle HQ and the wider Moodle community and is continuously evolving to meet the needs of users and to incorporate feedback we receive.

## Table of Contents

- [Design Resources](#design-resources)
  - [Design Tools](#design-tools)
  - [Design Assets & Guidelines](#design-assets--guidelines)
- [Development Resources](#development-resources)
  - [Prerequisites](#prerequisites)
  - [Coding Standards](#coding-standards)
  - [Development Tools](#development-tools)
- [Installation & Usage](#installation--usage)
  - [Quick Start](#quick-start)
  - [Convert Tokens From ZeroHeight To CSS Variables](#convert-tokens-from-zeroheight-to-css-variables)
  - [Testing The Design System](#testing-the-design-system)
  - [Build The Design System](#build-the-design-system)
- [CHANGELOG](#changelog)
- [Contributing & Support](#contributing--support)
- [FAQ](#faq)
- [License](#license)

## Design Resources

### Design Tools

To create and manage our design assets, we use the following tools:

- **[Figma](https://www.figma.com/)**: A collaborative design and prototyping tool. It\'s the heart of the design process, allowing designers to work together seamlessly.
- **[ZeroHeight](https://zeroheight.com/)**: A platform for creating and maintaining design systems. It helps document design guidelines and components for easy access by the team.

### Design Assets & Guidelines

All design assets and guidelines are centralized in the following resource:

- [Moodle ZeroHeight](https://moodle.zeroheight.com/): The central repository for all design assets, including components, styles, and guidelines.

## Development Resources

### Prerequisites

- Node.js v22.13.0 or higher
- npm
- Git

### Coding Standards

Maintaining a consistent code style is essential for collaborative development. Below are the coding standards we follow and tooling used in this repository:

- ESLint and Prettier configurations are included in the repository to help maintain code quality and consistency.
- Commit messages should follow the [Conventional Commits@1.0.0](https://www.conventionalcommits.org/en/v1.0.0/#summary) specification.
- Husky is used to manage Git hooks, ensuring that code quality checks are run before commits and pushes.
  - Lint-staged is used to run linters on staged files, ensuring that only the relevant files are checked before committing.
  - Pre-commit and pre-push hooks are set up to run tests and linters automatically.
- Testing is done using Vitest and Storybook\'s built-in testing capabilities.
- Storybook is configured to run components against accessibility standards using the [axe](https://www.npmjs.com/package/@storybook/addon-a11y) addon with WCAG 2.1 AA standards.

### Development Tools

Your development environment is critical. Here are some tools and resources to help you set up your workspace:

- **Code Editor**:
  We recommend using VSCode or any other modern code editor that supports JavaScript/TypeScript development.
  - `.editorconfig` is included to ensure consistent coding styles across different editors and IDEs.
  - Editor configurations for VSCode are provided in the `.vscode/` directory.
- **[Node.js](https://nodejs.org/)**:
  Ensure you have version `22.13.0` or higher installed.
- **[NPM](https://www.npmjs.com/)**:
  Used to manage project dependencies.
- **[Storybook](https://storybook.js.org/)**:
  A tool for developing and showcasing UI components in isolation.
- **[Chromatic](https://www.chromatic.com/)**:
  Used for visual testing and review of UI components.
- **[Style Dictionary](https://styledictionary.com/)**:
  Used to manage and convert design tokens.
- **Git**:
  Make sure you have Git installed and are familiar with its basics.
- **Continuous Integration (CI)**:
  Configured with GitHub Actions to automate testing and deployment.

## Installation & Usage

### Quick Start

To view the components in action, you can run Storybook locally. This will allow you to see the components in a live environment.

```bash
npm install
npm run storybook
```

Storybook will provide detailed documentation and interactive examples of all components in the design system however, a quick example is shown below:

```js
import { Button } from '@moodlehq/design-system';

export default function App() {
  return <Button
    label="Button"
    variant="primary"
  />;
}
```

### Convert tokens from ZeroHeight to CSS variables

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
# Run unit tests.
npm run test-unit
# Run unit tests with coverage report.
npm run test-unit-coverage
# Run Storybook interaction & accessibility tests .
npm run test-storybook
```

### Build the Design System

To build the design system, run the following commands in your terminal:

```bash
npm install
npm run build
```

The built files will be located in the `dist/` directory.

A [CHANGELOG](CHANGELOG) is automatically generated for each release using [Release Please](https://github.com/googleapis/release-please)

GitHub Actions are set up to automatically build the design system on each push to the main branch that has been tagged with a version number.

## CHANGELOG

See [CHANGELOG](CHANGELOG) for release history and updates.

## Contributing & Support

For any contributions, issues, or support, please reach out to the Moodle HQ Design System team through the following channels:
- Submit a ticket on the [MDS project on Moodle Tracker](https://tracker.moodle.org/browse/MDS)
- Join our [Matrix channel](https://matrix.to/#/!BmKCxoEFOvaJrscitV:moodle.com?via=moodle.com&via=matrix.org&via=lern.link)
- Join the [Moodle Design System PAG course](https://moodle.org/course/view.php?id=17258)

Pull requests are our suggested method for contributing to the design system. Please ensure that your contributions adhere to our contribution guidelines, see [CONTRIBUTING](CONTRIBUTING).

## FAQ

**Q:** Does this work with Moodle LMS 5.x?<br>
**A:** Not yet but soon!.

**Q:** How do I report a bug or request a feature?<br>
**A:** Please use the [MDS project on Moodle Tracker](https://tracker.moodle.org/browse/MDS) to report bugs or request features.

**Q:** Will my Moodle instance automatically use the latest Design System release?<br>
**A:** No, Moodle core and plugins need to explicitly integrate the design system to use it.

## License
This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for details.
