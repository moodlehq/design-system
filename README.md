# Moodle Design System

[![npm version - PoC](https://badge.fury.io/js/ngx-moodleds.svg)](https://badge.fury.io/js/ngx-moodleds)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Chromatic - PoC](https://github.com/Chocolate-lightning/mds-ws/actions/workflows/chromatic.yml/badge.svg)](https://github.com/Chocolate-lightning/mds-ws/actions/workflows/chromatic.yml)

# Getting Started

Welcome! Whether you're a designer or a developer, this guide will help you get started and connect you to the essential resources you need.

## Table of Contents

- [Design Resources](#design-resources)
- [Design Tools](#design-tools)
- [UI/UX Design Guidelines](#uiux-design-guidelines)
- [Design Assets](#design-assets)
- [Development Resources](#development-resources)
- [Coding Standards](#coding-standards)
- [Version Control](#version-control)
- [Development Tools](#development-tools)
- [Repository Commands](#repository-commands)
- [Build the Design System](#build-the-design-system)
- [Convert tokens from ZeroHeight to SCSS variables](#convert-tokens-from-zeroheight-to-scss-variables)
- [Publishing the Library](#publishing-the-library)
- [Running unit tests](#running-unit-tests)
- [Viewing the components within Storybook locally](#viewing-the-components-within-storybook-locally)

## Design Resources

### Design Tools

- **[Figma](https://www.figma.com/)**:  A collaborative design and prototyping tool. It's the heart of the design process, allowing designers to work together seamlessly.
- **[ZeroHeight](https://zeroheight.com/)**: A platform for creating and maintaining design systems. It helps document design guidelines and components for easy access by the team.

### UI/UX Design Guidelines

@TODO

- [UI/UX Guidelines Document (ZeroHeight?)](https://your-design-guidelines-link.com)

### Design Assets

@TODO

## Development Resources

### Coding Standards

Maintaining a consistent code style is essential for collaborative development. Our coding standards document will guide you on best practices.

- [Coding Standards Document](https://your-coding-standards-link.com)

### Version Control

We use Git for version control. Make sure you have Git installed and are familiar with its basics.

### Development Tools

Your development environment is critical. Here are some tools and resources to help you set up your workspace:

- **Code Editor**: We recommend using @TODO

- **Package Manager**: [npm](https://www.npmjs.com/) is the package manager we use for JavaScript projects. Install it to manage project dependencies.

- **[Style Dictionary](https://styledictionary.com/)**: Conversion tool to manage and convert design tokens into usable code formats.
-
- **[Chromatic](https://www.chromatic.com/)**: Is used for visual testing and review of our UI components. It integrates with Storybook to provide a seamless experience.

### Repository Commands

#### Build the Design System
@TODO

#### Convert tokens from ZeroHeight to SCSS variables

We make use of [Style Dictionary](https://styledictionary.com/) to convert design tokens exported from ZeroHeight into SCSS variables that can be used throughout the design system and its' consumers.

```bash
npm install
npm run build-tokens
```

#### Publishing the Library

@TODO

### Running unit tests

@TODO

### Viewing the components within Storybook locally

To view the components in action, you can run the development server. This will allow you to see the components in a live environment.

```bash
npm install
npm run storybook
```
