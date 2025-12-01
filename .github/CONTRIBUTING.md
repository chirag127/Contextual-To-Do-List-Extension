# 🚀 Contributing to FocusFlow-Contextual-Productivity-Browser-Extension

Welcome, and thank you for considering contributing to FocusFlow! We aim to maintain a high standard of code quality, efficiency, and user experience. By adhering to these guidelines, you help us ensure a robust and maintainable project.

## 1. Code of Conduct

This project adheres to the Contributor Covenant Code of Conduct. Please read the [CODE_OF_CONDUCT.md](https://github.com/your-username/FocusFlow-Contextual-Productivity-Browser-Extension/blob/main/CODE_OF_CONDUCT.md) file for details on enforcing this policy.

## 2. Prerequisites

Before you contribute, ensure you have the following set up:

*   **Node.js LTS:** Version 20 or higher.
*   **npm or yarn:** Package manager.
*   **Git:** Version control system.
*   **IDE:** VS Code with recommended extensions (e.g., Biome, Prettier).

## 3. Development Environment Setup

Follow these steps to get a local development environment running:

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/FocusFlow-Contextual-Productivity-Browser-Extension.git
    cd FocusFlow-Contextual-Productivity-Browser-Extension
    ```

2.  **Install Dependencies:**
    ```bash
    # Using npm
    npm install
    # Or using yarn
    # yarn install
    ```

3.  **Run in Watch Mode (for rapid development):
    ```bash
    # Using npm
    npm run dev
    # Or using yarn
    # yarn dev
    ```

This command will typically start a development server or builder that recompiles on code changes.

## 4. Contribution Workflow

We follow a standard GitHub pull request workflow:

1.  **Fork the Project:** Create your own fork of the repository.
2.  **Create a Branch:** Create a new branch for your feature or bug fix. Use descriptive names (e.g., `feat/add-contextual-highlighting` or `fix/incorrect-task-completion`).
    ```bash
    git checkout -b your-branch-name
    ```
3.  **Make Your Changes:** Implement your changes, adhering to the project's coding standards.
4.  **Test Your Changes:** Ensure your changes are thoroughly tested. Run all tests to confirm no regressions.
    ```bash
    # Using npm
    npm run test
    # Or using yarn
    # yarn test
    ```
5.  **Lint and Format:** Ensure your code adheres to the project's linting and formatting rules.
    ```bash
    # Using npm
    npm run lint:fix
    # Or using yarn
    # yarn lint:fix
    ```
6.  **Commit Your Changes:** Use Conventional Commits for your commit messages.
    ```bash
    # Example: feat: Add new dashboard widget
    git commit -m "feat: Implement task prioritization logic"
    ```
7.  **Push to Your Fork:** Push your branch to your forked repository.
    ```bash
    git push origin your-branch-name
    ```
8.  **Open a Pull Request:** Create a pull request from your fork to the `main` branch of the original repository.

## 5. Coding Standards & Best Practices

*   **Language:** TypeScript (Strict mode is enforced).
*   **Architecture:** WXT for browser extensions. Feature-Sliced Design (FSD) principles are encouraged for maintainability.
*   **Linting/Formatting:** **Biome** is used for both linting and formatting. All code must pass Biome checks.
*   **Testing:** **Vitest** for unit tests, **Playwright** for E2E tests. Aim for high test coverage.
*   **Error Handling:** Implement robust error handling. Use `try-catch` blocks and ensure the extension/app never crashes.
*   **Performance:** Optimize for speed and resource usage. Follow the principles of Green Software.
*   **UI/UX:** Adhere to the established UI/UX aesthetic and principles. Ensure smooth animations and fast interactions.
*   **Comments:** Write self-documenting code. Use comments only to explain the *why*, not the *what*.
*   **Modularity:** Keep modules focused on a single responsibility (SRP).

## 6. Typescript & WXT Specifics

*   **Strict Typing:** All TypeScript code must be written with strict type checking enabled (`strict: true` in `tsconfig.json`).
*   **WXT Configuration:** Understand and utilize WXT's capabilities for managing different browser manifests, content scripts, background scripts, and UI pages.
*   **State Management:** Prefer reactive primitives (e.g., Signals) for state management where appropriate.

## 7. Testing Guidelines

*   **Unit Tests:** All new business logic or complex functions should have corresponding unit tests in the `tests/unit` directory, mirroring the source structure.
*   **E2E Tests:** For user-facing features and critical workflows, write end-to-end tests in the `tests/e2e` directory using Playwright.
*   **Coverage:** Strive for 100% test coverage for critical components and business logic.
*   **Running Tests:**
    ```bash
    # Unit tests (Vitest)
    npm run test:unit

    # E2E tests (Playwright)
    npm run test:e2e
    ```

## 8. Pull Request (PR) Requirements

Your Pull Request should:

*   Have a clear and concise title.
*   Include a detailed description explaining the changes, the problem it solves, and any relevant context.
*   Link to any related issues (e.g., `Closes #123`).
*   Pass all automated checks (linting, tests, CI workflow).
*   Be reviewed by at least one maintainer.

## 9. Reporting Issues

If you find a bug or have a feature request, please open an issue on GitHub. Provide as much detail as possible:

*   **Bug Reports:** Describe the issue, steps to reproduce, expected behavior, and actual behavior. Include environment details (browser, OS).
*   **Feature Requests:** Explain the proposed feature, its benefits, and any potential implementation ideas.

## 10. Code Style & Formatting

Automatic formatting is enforced by **Biome**. Please run `npm run lint:fix` (or `yarn lint:fix`) before committing to ensure consistency.

## Thank You!

Your contributions are highly valued. We look forward to building FocusFlow together!
