# Contributing to FocusFlow-Contextual-Productivity-Browser-Extension

Welcome! We're thrilled you're considering contributing to **FocusFlow**, an intelligent browser extension designed to dynamically manage tasks based on web context, optimizing focus and boosting productivity across Chrome, Firefox, and Edge. Your contributions are invaluable in making this project even better.

Please take a moment to review this document to understand our development process and guidelines.

## 🌟 Code of Conduct

To ensure a welcoming and inclusive environment for everyone, please read and adhere to our [Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct.html).

## 🚀 Getting Started

To get your development environment set up, follow these steps:

### Prerequisites

*   **Node.js**: Version 18.x or higher.
*   **pnpm**: Our preferred package manager. Install with `npm install -g pnpm`.
*   **Git**: For version control.

### Setup

1.  **Fork the Repository**: Start by forking `FocusFlow-Contextual-Productivity-Browser-Extension` to your GitHub account.
2.  **Clone Your Fork**:
    bash
    git clone https://github.com/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension.git
    cd FocusFlow-Contextual-Productivity-Browser-Extension
    
3.  **Install Dependencies**:
    bash
    pnpm install
    

### Development Scripts

Here are the essential scripts for development:

| Command                | Description                                                |
| :--------------------- | :--------------------------------------------------------- |
| `pnpm dev`             | Starts the development server with HMR for all browsers.   |
| `pnpm build`           | Builds the production-ready extension for all browsers.    |
| `pnpm lint`            | Runs Biome linter and formatter.                           |
| `pnpm lint:fix`        | Runs Biome linter and automatically fixes issues.          |
| `pnpm test`            | Runs Vitest unit tests.                                    |
| `pnpm test:e2e`        | Runs Playwright end-to-end tests.                          |
| `pnpm check-types`     | Runs TypeScript type checking.                             |
| `pnpm format`          | Formats code with Biome.                                   |

## 🛠️ Development Guidelines

### Architecture

This project follows the **Feature-Sliced Design (FSD)** methodology. Familiarize yourself with FSD principles to maintain a consistent and scalable codebase. Key layers include `app`, `pages`, `widgets`, `features`, `entities`, `shared`.

### Code Style & Formatting

*   We use **TypeScript** for robust typing and **React** with **TailwindCSS v4** for the UI.
*   **Biome** is used for linting and formatting. Ensure your code passes lint checks (`pnpm lint`) and is formatted (`pnpm format`) before committing.
*   Adhere to **SOLID principles**, **DRY (Don't Repeat Yourself)**, and **YAGNI (You Ain't Gonna Need It)**.

### Testing

*   **Unit Tests**: Write unit tests using **Vitest** for individual functions, components, and modules. Place them alongside the code they test (e.g., `my-module.test.ts`).
*   **End-to-End Tests**: For critical user flows and extension interactions, use **Playwright**.
*   Ensure a high test coverage for all new features and bug fixes.

### Commit Messages

We follow the [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/). This helps us generate release notes and maintain a clear history.

**Examples:**
*   `feat: add dark mode toggle`
*   `fix(background): resolve message passing issue`
*   `docs: update contributing guidelines`
*   `refactor(options): simplify state management`

## 🤝 Contribution Workflow

1.  **Create a New Branch**:
    *   For features: `git checkout -b feature/your-feature-name`
    *   For bug fixes: `git checkout -b fix/issue-description`
2.  **Implement Your Changes**: Write your code, tests, and documentation.
3.  **Run Tests & Linting**:
    bash
    pnpm lint
    pnpm test
    pnpm test:e2e # If applicable
    
4.  **Commit Your Changes**: Ensure your commit messages follow the Conventional Commits specification.
    bash
    git add .
    git commit -m "feat: descriptive commit message"
    
5.  **Push to Your Fork**:
    bash
    git push origin feature/your-feature-name
    
6.  **Create a Pull Request**:
    *   Navigate to the original `FocusFlow-Contextual-Productivity-Browser-Extension` repository on GitHub.
    *   You should see a prompt to create a Pull Request from your branch.
    *   Fill out the [Pull Request Template](.github/PULL_REQUEST_TEMPLATE.md) completely, providing a clear description of your changes, motivation, and any relevant screenshots or GIFs.
    *   Link to any related issues (e.g., `Closes #123`).

## 🐞 Reporting Issues

If you find a bug or have a feature request, please open an issue:

*   **Bug Reports**: Use our [Bug Report Template](.github/ISSUE_TEMPLATE/bug_report.md) to provide detailed information.
*   **Feature Requests**: Open a new issue and clearly describe the desired feature and its benefits.

## 🔒 Security Vulnerabilities

If you discover any security vulnerabilities, please report them responsibly by following our [Security Policy](.github/SECURITY.md).

## 🙏 Thank You

Your interest in and contributions to `FocusFlow-Contextual-Productivity-Browser-Extension` are highly appreciated!
