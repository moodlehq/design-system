# Contributing to the Moodle Design System

Thank you for your interest in contributing to the Moodle Design System! This project is driven by Moodle HQ, but we welcome suggestions and contributions from everyone.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Code Style, Linting & Commit Messages](#code-style-linting--commit-messages)
- [Submitting Changes](#submitting-changes)
- [Component checklist enforcement](#component-checklist-enforcement)
- [Documentation Contributions](#documentation-contributions)
- [Review Process](#review-process)
- [Release Process](#release-process)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Getting Help](#getting-help)

## Getting Started

Please read our [Contributors Guide](https://moodledev.io/general/documentation/contributing) for an overview of the contribution process and best practices.

## Prerequisites

- **Node.js** v22.13.0 or higher
- **npm**
- **Git**

## Development Setup

To set up a local development environment:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/moodlehq/design-system.git
   cd design-system
   ```

2. **Install dependencies:**

   ```sh
   npm install
   npx playwright install
   ```

3. **Run Storybook (development server):**

   ```sh
   npm run storybook
   ```

## How to Contribute

- **Report bugs or request features:** Please post them to [GitHub Issues](https://github.com/moodlehq/design-system/issues).
- **Report security vulnerabilities:** Please **do not** use GitHub Issues. Instead, report them privately via [GitHub Security Advisories](https://github.com/moodlehq/design-system/security/advisories).
- **Work on an issue:** Comment on the issue to let others know you are working on it.
- **Submit a pull request:**
  - Fork the repository and create a new branch for your changes (e.g., `feat/your-feature` or `fix/your-bug`).
  - Follow the code style and commit message guidelines.
  - Ensure all tests pass before submitting.

## Code Style, Linting & Commit Messages

- Follow the existing code style. Run `npm run lint` to check for linting errors.
- Commit messages should follow the [Conventional Commits v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/#summary) specification.
- Husky and lint-staged are used to run linters and tests on staged files before commits and pushes.
- Add or update tests as appropriate.
- See the [Coding Standards](README.md#coding-standards) section in the README for more details.

## Submitting Changes

1. Ensure your branch is up to date with `main`.
2. Run all tests and ensure they pass:
   - `npm run test-storybook` (Storybook visual tests)
   - `npm run test-unit` (unit tests)
   - `npm run test-unit-coverage` (unit test coverage)
3. Open a pull request with a clear description of your changes.
   - For new or significantly changed components, use the [component PR template](https://github.com/moodlehq/design-system/compare/main...your-branch?template=component.md) by appending `?template=component.md` to the PR URL.
   - For all other changes (bugfixes, refactors, docs), the default template is used automatically.
4. Participate in the code review process and make any requested changes.

## Component checklist enforcement

When building or significantly changing a component, checklist items are enforced at four levels:

| Level                      | What it means                                                  | Examples                                                                                                                                                    |
| -------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **CI-enforced**            | Automated — PR cannot merge if it fails                        | Unit tests + coverage, Storybook interaction + Axe a11y, Chromatic (design sign-off), CodeQL, commitlint, ESLint, Prettier, build                           |
| **Author self-check**      | PR template checkbox — author attests before requesting review | File structure, i18n (logical CSS properties, no hardcoded strings), CSS token usage (`var(--mds-*)`), breaking change assessment, instruction file updates |
| **Reviewer-verified**      | Reviewer actively checks during code review                    | Props interface quality (JSDoc, `allowedValues`, `...props` spread), test coverage completeness, RTL story present where needed                             |
| **Role-specific sign-off** | Requires a specific person to approve                          | Cross-system parity check across code, Storybook, Figma, and Zeroheight                                                                                     |

The full end-to-end component checklist is maintained internally by the Moodle HQ Design System team.

## Documentation Contributions

Improvements to documentation are welcome! Please update relevant markdown files or Storybook docs as needed.

## Review Process

- Pull requests are reviewed by the Moodle HQ Design System team.
- Reviews may take a few days depending on team availability.
- Please respond to feedback and make requested changes promptly.

## Release Process

- Releases are automated using [Release Please](https://github.com/googleapis/release-please).
- See the [CHANGELOG](CHANGELOG.md) for release history and updates.

## Getting Help

For any contributions, issues, or support, please reach out to the Moodle HQ Design System team through the following channels:

- Submit an issue on [GitHub Issues](https://github.com/moodlehq/design-system/issues)
- Join our [Matrix channel](https://matrix.to/#/!BmKCxoEFOvaJrscitV:moodle.com?via=moodle.com&via=matrix.org&via=lern.link)
- Join the [Moodle Design System PAG course](https://moodle.org/course/view.php?id=17258)

Thank you for helping improve the Moodle Design System!
