# Contributing to FocusFlow-Contextual-Productivity-Browser-Extension

We are thrilled that you're interested in contributing to `FocusFlow-Contextual-Productivity-Browser-Extension`! Your contributions help us build a more intelligent and efficient productivity tool. This document outlines guidelines for contributing to this project.

Please note that this project is released with a [Code of Conduct](https://github.com/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension/blob/main/.github/CODE_OF_CONDUCT.md). By participating in this project, you agree to abide by its terms.

## Table of Contents

- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Writing Code](#writing-code)
  - [Improving Documentation](#improving-documentation)
- [Contribution Workflow](#contribution-workflow)
  - [1. Fork and Clone the Repository](#1-fork-and-clone-the-repository)
  - [2. Set Up Your Development Environment](#2-set-up-your-development-environment)
  - [3. Create a New Branch](#3-create-a-new-branch)
  - [4. Make Your Changes](#4-make-your-changes)
  - [5. Test Your Changes](#5-test-your-changes)
  - [6. Lint and Format Your Code](#6-lint-and-format-your-code)
  - [7. Commit Your Changes](#7-commit-your-changes)
  - [8. Push Your Branch](#8-push-your-branch)
  - [9. Open a Pull Request](#9-open-a-pull-request)
- [Development Setup](#development-setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running in Development Mode](#running-in-development-mode)
  - [Running Tests](#running-tests)
  - [Building for Production](#building-for-production)
- [Styleguides](#styleguides)
  - [Git Commit Messages](#git-commit-messages)
  - [JavaScript/TypeScript Style](#javascripttypescript-style)
  - [Testing Style](#testing-style)
- [Architectural Principles](#architectural-principles)
- [Security Guidelines](#security-guidelines)
- [License](#license)
- [Thank You](#thank-you)

## How Can I Contribute?

### Reporting Bugs

If you find a bug, please help us by submitting an issue to our [Issue Tracker](https://github.com/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension/issues). Before opening a new issue, please check if a similar bug has already been reported.

To report a bug, use our [Bug Report Template](https://github.com/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension/blob/main/.github/ISSUE_TEMPLATE/bug_report.md). Provide as much detail as possible, including steps to reproduce, expected behavior, and actual behavior.

### Suggesting Enhancements

We welcome ideas for new features or improvements! You can suggest an enhancement by opening a new issue on the [Issue Tracker](https://github.com/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension/issues). Please describe the enhancement clearly and explain its potential benefits.

### Writing Code

Code contributions are the backbone of open-source projects. Whether it's a new feature, a bug fix, or performance optimization, your code is highly valued. Please follow the [Contribution Workflow](#contribution-workflow) below.

### Improving Documentation

High-quality documentation is crucial. If you find errors, omissions, or areas for improvement in our `README.md` or any other documentation files, please feel free to open a pull request.

## Contribution Workflow

### 1. Fork and Clone the Repository

First, fork the `FocusFlow-Contextual-Productivity-Browser-Extension` repository to your GitHub account. Then, clone your fork to your local machine:

bash
git clone https://github.com/<YOUR_USERNAME>/FocusFlow-Contextual-Productivity-Browser-Extension.git
cd FocusFlow-Contextual-Productivity-Browser-Extension


### 2. Set Up Your Development Environment

Ensure you have the necessary prerequisites installed (see [Development Setup](#development-setup)). Then, install project dependencies:

bash
npm install # Or pnpm install / yarn install if preferred


### 3. Create a New Branch

Create a new branch for your changes. Choose a descriptive name that reflects the nature of your work (e.g., `feat/add-new-dashboard`, `fix/issue-42-login-bug`, `docs/update-readme`):

bash
git checkout -b <branch-name>


### 4. Make Your Changes

Implement your bug fix, feature, or documentation update. Remember to adhere to our [Styleguides](#styleguides) and [Architectural Principles](#architectural-principles).

### 5. Test Your Changes

Ensure your changes haven't introduced any regressions and that new features are adequately covered by tests. Run the test suite:

bash
npm test


We aim for 100% test coverage and expect all tests to pass.

### 6. Lint and Format Your Code

Maintain code quality and consistency using our linter and formatter:

bash
npm run lint
npm run format # If a separate format command exists, otherwise lint might handle it


Address any errors or warnings reported by Biome.

### 7. Commit Your Changes

Commit your changes using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). This helps us maintain a clear and readable commit history.

Example:
bash
git commit -m "feat: implement contextual task prioritization"

or
bash
git commit -m "fix: resolve memory leak in background script (#123)"


### 8. Push Your Branch

Push your local branch to your forked repository on GitHub:

bash
git push origin <branch-name>


### 9. Open a Pull Request

Once your changes are pushed, go to the original `FocusFlow-Contextual-Productivity-Browser-Extension` repository on GitHub. You should see a prompt to open a Pull Request from your branch.

Fill out our [Pull Request Template](https://github.com/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension/blob/main/.github/PULL_REQUEST_TEMPLATE.md) completely, describing your changes, the motivation behind them, and any related issues. Our team will review your pull request, provide feedback, and merge it once approved.

## Development Setup

This project uses modern JavaScript/TypeScript tooling for browser extensions.

### Prerequisites

*   **Node.js**: v18.x or later (LTS recommended)
*   **npm**: v9.x or later (or pnpm/yarn)

### Installation

1.  Clone the repository and navigate into it:
    bash
git clone https://github.com/<YOUR_USERNAME>/FocusFlow-Contextual-Productivity-Browser-Extension.git
cd FocusFlow-Contextual-Productivity-Browser-Extension
    
2.  Install dependencies:
    bash
npm install
    

### Running in Development Mode

`FocusFlow` is built with `WXT` and `Vite`. To run the extension in development mode (with hot-reloading for most changes):

bash
npm run dev


This will build the extension into the `dist/` directory. You can then load it into your browser:

*   **Chrome**: Go to `chrome://extensions`, enable "Developer mode", click "Load unpacked", and select the `dist/` folder.
*   **Firefox**: Go to `about:debugging#/runtime/this-firefox`, click "Load Temporary Add-on", and select any file inside the `dist/` folder (e.g., `manifest.json`).

### Running Tests

We use `Vitest` for unit testing and `Playwright` for end-to-end (E2E) testing.

*   To run all tests:
    bash
npm test
    
*   To run unit tests only:
    bash
npm run test:unit
    
*   To run E2E tests only:
    bash
npm run test:e2e
    

### Building for Production

To create an optimized production build of the extension:

bash
npm run build


The production-ready extension will be compiled into the `dist/` directory, ready for submission to browser stores.

## Styleguides

### Git Commit Messages

We enforce [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for clear history.
*   `feat`: A new feature
*   `fix`: A bug fix
*   `docs`: Documentation only changes
*   `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
*   `refactor`: A code change that neither fixes a bug nor adds a feature
*   `perf`: A code change that improves performance
*   `test`: Adding missing tests or correcting existing tests
*   `build`: Changes that affect the build system or external dependencies (example scopes: vite, wxt)
*   `ci`: Changes to our CI configuration files and scripts (example scopes: GitHub Actions)
*   `chore`: Other changes that don't modify src or test files
*   `revert`: Reverts a previous commit

### JavaScript/TypeScript Style

We use `Biome` for strict linting and formatting. Ensure your code adheres to its rules. Run `npm run lint` and `npm run format` (if separate) before committing.

### Testing Style

*   **Unit Tests:** Written with `Vitest`, found in `tests/unit/`. Focus on individual functions/components in isolation.
*   **E2E Tests:** Written with `Playwright`, found in `tests/e2e/`. Simulate user interactions across the browser extension.
*   Follow the F.I.R.S.T principles: Fast, Isolated, Repeatable, Self-validating, Timely.

## Architectural Principles

Our project adheres to the following core architectural principles:

*   **SOLID**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.
*   **DRY**: Don't Repeat Yourself.
*   **YAGNI**: You Ain't Gonna Need It.
*   **Feature-Sliced Design (FSD)**: Code is organized by features (`src/features/`), promoting modularity and maintainability.

## Security Guidelines

We prioritize the security of `FocusFlow`. Please review our [Security Policy](https://github.com/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension/blob/main/.github/SECURITY.md) to understand how to report vulnerabilities and our approach to security. All contributions should keep security best practices in mind (e.g., input sanitization, least privilege).

## License

By contributing to `FocusFlow-Contextual-Productivity-Browser-Extension`, you agree that your contributions will be licensed under its [CC BY-NC 4.0 License](https://github.com/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension/blob/main/LICENSE).

## Thank You

Your time and effort in contributing to `FocusFlow-Contextual-Productivity-Browser-Extension` are greatly appreciated. We look forward to your contributions!
