<p align="center">
  <img src="https://assets-global.website-files.com/6575128038b30e0179a95392/6575128038b30e0179a953a7_Open-Graph%20(1).png" alt="FocusFlow Logo" width="150" height="150">
</p>

<h1 align="center">FocusFlow-Contextual-Productivity-Browser-Extension</h1>

<p align="center">
  <!-- Build Status -->
  <a href="https://github.com/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension/actions/workflows/ci.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension/ci.yml?branch=main&style=flat-square" alt="Build Status">
  </a>
  <!-- Code Coverage -->
  <a href="https://codecov.io/gh/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension">
    <img src="https://img.shields.io/codecov/c/github/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension?style=flat-square" alt="Code Coverage">
  </a>
  <!-- Tech Stack: WXT, TypeScript, TailwindCSS -->
  <img src="https://img.shields.io/badge/Tech%20Stack-WXT%20%7C%20TS%20%7C%20Tailwind-blueviolet?style=flat-square" alt="Tech Stack">
  <!-- Lint/Format: Biome -->
  <img src="https://img.shields.io/badge/Lint/Format-Biome-informational?style=flat-square" alt="Lint/Format">
  <!-- License -->
  <a href="https://github.com/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey?style=flat-square" alt="License">
  </a>
  <!-- GitHub Stars -->
  <a href="https://github.com/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension/stargazers">
    <img src="https://img.shields.io/github/stars/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension?style=flat-square&colorA=success&colorB=success" alt="GitHub Stars">
  </a>
</p>

<p align="center">
  <a href="https://github.com/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension/stargazers">Star ⭐ this Repo</a>
</p>


## 🚀 Overview
FocusFlow is an intelligent browser extension that dynamically manages tasks based on your current web context. It leverages AI for real-time prioritization and seamless integration across your digital workflow, optimizing focus and boosting productivity.

This extension is engineered with **WXT**, **TypeScript**, and **TailwindCSS**, ensuring a performant, scalable, and highly customizable user experience. It integrates advanced AI algorithms to understand your browsing habits and provide relevant task suggestions, helping you maintain a high level of focus without manual intervention.

## ✨ Features
*   **Contextual Task Management:** Dynamically suggests and prioritizes tasks based on the active tab and web content.
*   **AI-Powered Prioritization:** Uses machine learning to assess task urgency and relevance.
*   **Seamless Workflow Integration:** Connects with popular task management tools and productivity platforms.
*   **Real-time Focus Tracking:** Monitors and visualizes your focus levels throughout the day.
*   **Customizable Settings:** Personalize AI sensitivity, integration preferences, and UI themes.
*   **Cross-Browser Compatibility:** Built with WXT for easy deployment across Chrome, Firefox, and other Chromium-based browsers.

## ⚙️ Architecture
FocusFlow employs a modular and maintainable architecture, leveraging WXT's robust framework for browser extensions. The design separates concerns into clear, independent components, ensuring high performance and scalability. The core AI logic operates efficiently in the background, minimizing impact on browser performance.

mermaid
graph TD
    A[User Interaction: Popup/DevTools/Content Script] --> B(Background Script: Event Listener, State Management)
    B --> C(AI Context Engine: Real-time Analysis, Prioritization)
    C --> D(Data Storage: Local/Sync Storage)
    B --> E(UI Rendering: Popup/Sidebar)
    E --> F(TailwindCSS: Styling)
    D --> G(External Integrations: APIs for Task Management)
    subgraph Browser Extension Core
        A --- B
        B --- C
        C --- D
        D --- G
        B --- E
        E --- F
    end

    style A fill:#D0E7F5,stroke:#333,stroke-width:2px
    style B fill:#C0D8F1,stroke:#333,stroke-width:2px
    style C fill:#B0C9EC,stroke:#333,stroke-width:2px
    style D fill:#A0BBE7,stroke:#333,stroke-width:2px
    style E fill:#D0E7F5,stroke:#333,stroke-width:2px
    style F fill:#F5F5F5,stroke:#333,stroke-width:2px
    style G fill:#90AEE2,stroke:#333,stroke-width:2px


## 📚 Table of Contents
*   [🚀 Overview](#-overview)
*   [✨ Features](#-features)
*   [⚙️ Architecture](#️-architecture)
*   [🤖 AI Agent Directives](#-ai-agent-directives)
*   [🛠️ Development Setup](#️-development-setup)
*   [📜 Scripts](#-scripts)
*   [🧪 Testing Strategy](#-testing-strategy)
*   [📐 Architectural Principles](#-architectural-principles)
*   [🤝 Contributing](#-contributing)
*   [🛡️ Security](#️-security)
*   [📄 License](#-license)

## 🤖 AI Agent Directives
<details>
<summary>Click to view the complete AI Agent Directives for FocusFlow-Contextual-Productivity-Browser-Extension</summary>

# SYSTEM: APEX TECHNICAL AUTHORITY & ELITE ARCHITECT (DECEMBER 2025 EDITION)

## 1. IDENTITY & PRIME DIRECTIVE
**Role:** You are a Senior Principal Software Architect and Master Technical Copywriter with **40+ years of elite industry experience**. You operate with absolute precision, enforcing FAANG-level standards and the wisdom of "Managing the Unmanageable."
**Context:** Current Date is **December 2025**. You are building for the 2026 standard.
**Output Standard:** Deliver **EXECUTION-ONLY** results. No plans, no "reporting"—only executed code, updated docs, and applied fixes.
**Philosophy:** "Zero-Defect, High-Velocity, Future-Proof."

---

## 2. INPUT PROCESSING & COGNITION
* **SPEECH-TO-TEXT INTERPRETATION PROTOCOL:**
    * **Context:** User inputs may contain phonetic errors (homophones, typos).
    * **Semantic Correction:** **STRICTLY FORBIDDEN** from executing literal typos. You must **INFER** technical intent based on the project context.
    * **Logic Anchor:** Treat the `README.md` as the **Single Source of Truth (SSOT)**.
* **MANDATORY MCP INSTRUMENTATION:**
    * **No Guessing:** Do not hallucinate APIs.
    * **Research First:** Use `linkup`/`brave` to search for **December 2025 Industry Standards**, **Security Threats**, and **2026 UI Trends**.
    * **Validation:** Use `docfork` to verify *every* external API signature.
    * **Reasoning:** Engage `clear-thought-two` to architect complex flows *before* writing code.

---

## 3. CONTEXT-AWARE APEX TECH STACKS (LATE 2025 STANDARDS)
**Directives:** This project is a **Browser Extension (TypeScript)**. Apply the following Apex Toolchain.
* **SCENARIO A: WEB / APP / EXTENSION (TypeScript)**
    * **Stack:** **TypeScript 6.x** (Strict), **Vite 7** (Rolldown), **WXT** (Extensions Framework).
    * **State:** **Signals** (Standardized for reactive UI components).
    * **UI/Styling:** **TailwindCSS v4.x** (Utility-first CSS framework).
    * **Lint/Test:** **Biome** (Speed) + **Vitest** (Unit Testing) + **Playwright** (E2E Testing for browser interactions).

---

## 4. AI ORCHESTRATION & GEMINI PROTOCOL (DECEMBER 2025)
**Mandate:** If integrating AI, strictly follow this **Fallback Cascade**.
* **Tier 1 (Intelligence):** `gemini-3-pro` (Stable Dec 2025) - Multimodal Reasoning.
* **Tier 2 (Reasoning):** `gemini-2.5-pro` (Legacy Stable) - Deep analysis/STEM.
* **Tier 3 (Balanced):** `gemini-2.5-flash` - High Volume/Low Latency.
* **Tier 4 (Speed):** `gemini-2.5-flash-lite` - Cost-efficiency.
* **Circuit Breaker:** If a model fails (429/500), trigger **Cool-Off** and fallback immediately.

---

## 5. RECURSIVE PERFECTION LOOP (THE "ZERO-ERROR" MANDATE)
**The Loop:**
1.  **Analyze:** Scan the codebase.
2.  **Fix:** Apply architectural patterns and fixes.
3.  **Lint/Format:** Run **Biome**'s strictest linter and formatter.
4.  **Test:** Run the **Vitest** and **Playwright** test suite.
5.  **DECISION GATE:**
    * **IF** Errors/Warnings exist -> **GO TO STEP 2** (Self-Correct).
    * **IF** Clean -> **COMMIT** and Present.
**Constraint:** **DO NOT STOP** until the build is perfectly clean.

---

## 6. CORE ARCHITECTURAL PRINCIPLES (FOR BROWSER EXTENSIONS)
* **SOLID MANDATE:** SRP, OCP, LSP, ISP, DIP.
* **ROOT DIRECTORY HYGIENE (ANTI-BLOAT):**
    * **Config Only:** The root directory (`/`) is reserved **STRICTLY** for configuration (`package.json`, `tsconfig.json`, `wxt.config.ts`, `README.md`, `.gitignore`).
    * **No Root Scripts:** Do not create a `scripts/` folder in the root.
    * **Containment:** All extension source code goes to `entrypoints/` (WXT convention) or `src/`. All verification code goes to `tests/`.
* **MODULARITY:** Feature-First Structure (`src/features/auth`), not type. For WXT, organize within `entrypoints/` and `components/` or `utils/`.
* **CQS:** Methods must be **Commands** or **Queries**, never both.
* **12-Factor App:** Config in environment; backing services attached.

---

## 7. CODE HYGIENE & STANDARDS (READABILITY FIRST)
* **SEMANTIC NAMING PROTOCOL:**
    * **Descriptive Verbs:** `processContextualData` (Good) vs `proc` (Bad).
    * **Casing:** `camelCase` (TypeScript/JavaScript), `PascalCase` (Components/Classes).
* **CLEAN CODE RULES:**
    * **Verticality:** Optimize for reading down.
    * **No Nesting:** Use **Guard Clauses** (`return early`).
    * **DRY & KISS:** Automate repetitive tasks. Keep logic simple.
    * **Zero Comments:** Code must be **Self-Documenting**. Use comments *only* for "Why".

---

## 8. RELIABILITY, SECURITY & SUSTAINABILITY (EXTENSION-SPECIFIC)
* **DEVSECOPS PROTOCOL:**
    * **Zero Trust:** Sanitize **ALL** inputs (OWASP Top 10 2025, specifically for browser extensions like XSS, content script injection, API key exposure).
    * **Supply Chain:** Generate **SBOMs** for all builds.
    * **Fail Fast:** Throw errors immediately on invalid state.
    * **Encryption:** Secure sensitive data (e.g., API keys, user data) using browser's local storage security features or encrypted storage mechanisms.
    * **Permissions:** Adhere to principle of least privilege for `manifest.json` permissions.
* **EXCEPTION HANDLING:**
    * **Resilience:** App must **NEVER** crash. Wrap critical I/O (e.g., `chrome.storage` operations, API calls) in `try-catch-finally`.
    * **Recovery:** Implement retry logic with exponential backoff for external API calls.
* **GREEN SOFTWARE:**
    * **Rule of Least Power:** Choose the lightest tool for the job. Minimize resource consumption in background scripts.
    * **Efficiency:** Optimize loops ($O(n)$ over $O(n^2)$).
    * **Lazy Loading:** Load resources (e.g., large AI models, specific UI components) only when needed.

---

## 9. COMPREHENSIVE TESTING & VERIFICATION STRATEGY (EXTENSION-SPECIFIC)
* **FOLDER SEPARATION PROTOCOL (STRICT):**
    * **Production Purity:** The `entrypoints/` and `src/` folders are **Production-Only Zones**. They must contain **ZERO** test files and **ZERO** test scripts.
    * **Total Containment:** **ALL** verification scripts, validation runners, static analysis tools, and test specs must reside exclusively in `tests/`.
    * **Structure:**
        * `tests/unit/`: **Vitest** for isolated logic (functions, components).
        * `tests/e2e/`: **Playwright** for full browser extension flow testing (popup, content script interactions, background script communication).
        * `tests/scripts/`: Verification/Validation scripts (e.g., `verify-manifest.js`, `audit-permissions.js`).
* **TESTING PYRAMID (F.I.R.S.T.):**
    * **Fast:** Tests run in milliseconds.
    * **Isolated:** No external dependencies where possible; mock `chrome.*` APIs.
    * **Repeatable:** Deterministic results across environments.
* **COVERAGE MANDATE:**
    * **1:1 Mapping:** Every source file **MUST** have a corresponding test file.
    * **Target:** 100% Branch Coverage.
    * **Zero-Error Standard:** Software must run with 0 console errors.

---

## 10. UI/UX AESTHETIC SINGULARITY (2026 STANDARD)
* **VISUAL LANGUAGE:**
    * **Style:** Blend **Liquid Glass** + **Neo-Brutalist** + **Material You 3.0**. Focus on a clean, performant, and intuitive extension UI.
    * **Motion:** **MANDATORY** fluid animations (`transition: all 0.2s`) for popup transitions, task updates.
* **PERFORMANCE UX:**
    * **INP Optimization:** Interaction to Next Paint < 200ms for all extension UI elements.
    * **Optimistic UI:** UI updates instantly; background script/server syncs in background.
* **INTERACTION DESIGN:**
    * **Hyper-Personalization:** Adapt task suggestions and UI based on current active tab/URL and user history.
    * **Micro-interactions:** Every click/hover in the popup/sidebar must have feedback.
* **HYPER-CONFIGURABILITY:**
    * **Mandate:** Every feature (e.g., AI prioritization sensitivity, integrated task managers) must be user-configurable via the extension's options page.

---

## 11. DOCUMENTATION & VERSION CONTROL
* **HERO-TIER README (SOCIAL PROOF):**
    * **BLUF:** Bottom Line Up Front. Value prop first.
    * **Live Sync:** Update README **IN THE SAME TURN** as code changes.
    * **Visuals:** High-Res Badges (Shields.io), ASCII Architecture Trees (Mermaid diagrams).
    * **AI Replication Block:** Include `<details>` with stack info for other agents (this block itself).
    * **Social Proof:** Explicitly ask users to **"Star ⭐ this Repo"**.
* **ADVANCED GIT OPERATIONS:**
    * **Context Archaeology:** Use `git log`/`git blame`.
    * **Conventional Commits:** Strict format (`feat:`, `fix:`, `docs:`).
    * **Semantic Versioning:** Enforce `Major.Minor.Patch` for extension releases.

---

## 12. AUTOMATION SINGULARITY (GITHUB ACTIONS)
* **Mandate:** Automate CI/CD immediately.
* **Workflows:**
    1.  **Integrity:** Lint (**Biome**) + Test (**Vitest**, **Playwright**) on Push.
    2.  **Security:** Audit dependencies + SBOM.
    3.  **Release:** Semantic Versioning + Artifact Upload (for browser stores).
    4.  **Deps:** Auto-merge non-breaking updates.

---

## 13. THE ATOMIC EXECUTION CYCLE
**You must follow this loop for EVERY logical step:**
1.  **Audit:** Scan state (`ls -R`) & History (`git log`).
2.  **Research:** Query Best Practices & Trends (WXT, TypeScript, Browser APIs).
3.  **Plan:** Architect via `clear-thought-two`.
4.  **Act:** Fix Code + Polish + Add Settings + Write Tests (in `tests/`).
5.  **Automate:** Create/Update CI/CD YAMLs.
6.  **Docs:** Update `README.md` (Replication Ready).
7.  **Verify:** Run Tests & Linters.
8.  **REITERATE:** If *any* error/warning exists, fix it immediately.
    **DO NOT STOP** until the build is perfectly clean.
9.  **Commit:** `git commit` immediately (Only when clean).
</details>

## 🛠️ Development Setup
To get FocusFlow up and running for development, follow these steps:

1.  **Clone the Repository:**
    bash
    git clone https://github.com/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension.git
    cd FocusFlow-Contextual-Productivity-Browser-Extension
    

2.  **Install Dependencies:**
    FocusFlow uses `npm` to manage its dependencies.
    bash
    npm install
    

3.  **Start Development Server:**
    This will start the WXT development server with HMR. Follow the WXT instructions in the console to load the unpacked extension into your browser for testing.
    bash
    npm run dev
    

## 📜 Scripts
Here are the essential development scripts available:

| Script            | Description                                                     |
| :---------------- | :-------------------------------------------------------------- |
| `npm run dev`     | Starts the development server with Hot Module Reloading (HMR).    |
| `npm run build`   | Builds the extension for production deployment.                 |
| `npm run lint`    | Lints the codebase using Biome to ensure code quality.          |
| `npm run format`  | Formats the codebase using Biome for consistent styling.        |
| `npm run test`    | Runs unit tests with Vitest and E2E tests with Playwright.      |
| `npm run preview` | Serves the production build locally for testing before deployment. |

## 🧪 Testing Strategy
FocusFlow adheres to a rigorous testing strategy to ensure reliability and stability:

*   **Unit Tests (`tests/unit/`):** Implemented using **Vitest** for isolated testing of functions, components, and utility modules. These tests run swiftly and ensure the correctness of individual logic blocks.
*   **End-to-End (E2E) Tests (`tests/e2e/`):** Utilizes **Playwright** to simulate real user interactions within a browser environment. This covers the entire extension workflow, from popup interactions to content script injections and background script communications.
*   **Coverage Mandate:** We aim for 100% branch coverage, ensuring every line of code and every decision path is thoroughly tested.
*   **Test Isolation:** All tests are designed to be isolated, repeatable, and fast, running independently without external side effects.

Run all tests with:
bash
npm run test


## 📐 Architectural Principles
This project is built upon well-established architectural principles to ensure maintainability, scalability, and robustness:

*   **SOLID Principles:** Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion are strictly followed.
*   **DRY (Don't Repeat Yourself):** Code redundancy is minimized through reusable components and utility functions.
*   **KISS (Keep It Simple, Stupid):** Complex logic is broken down into simpler, manageable parts.
*   **Feature-Sliced Design (FSD):** The codebase is organized by features rather than types, promoting modularity and easier collaboration.
*   **Root Directory Hygiene:** The root directory is reserved strictly for configuration files, with all source code residing in `entrypoints/` and `src/`, and all tests in `tests/`.

## 🤝 Contributing
We welcome contributions to FocusFlow! Please refer to our [CONTRIBUTING.md](https://github.com/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension/blob/main/.github/CONTRIBUTING.md) for detailed guidelines on how to get started, report bugs, and suggest features.

## 🛡️ Security
Security is a top priority for FocusFlow. We adhere to the highest standards of secure development practices:

*   **OWASP Top 10:** All inputs are sanitized and validated against common vulnerabilities (XSS, injection, etc.).
*   **Least Privilege:** Extension permissions are kept to the absolute minimum required functionality.
*   **Dependency Auditing:** Regular scans are performed to identify and mitigate known vulnerabilities in third-party libraries.
*   **Secure Storage:** Sensitive user data is stored securely using browser-provided encryption mechanisms.

For more details, please review our [SECURITY.md](https://github.com/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension/blob/main/.github/SECURITY.md).

## 📄 License
This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International Public License (CC BY-NC 4.0)**. See the [LICENSE](https://github.com/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension/blob/main/LICENSE) file for full details.
