# FocusFlow-Contextual-Productivity-Browser-Extension

![FocusFlow Banner](https://raw.githubusercontent.com/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension/main/assets/banner.png)

<!-- Badges start -->
[![CI Build Status](https://img.shields.io/github/actions/workflow/status/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension/ci.yml?branch=main&style=flat-square)](https://github.com/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension/actions/workflows/ci.yml)
[![Code Coverage](https://img.shields.io/badge/Coverage-Pending-orange?style=flat-square)](https://codecov.io/gh/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension)
[![Tech Stack](https://img.shields.io/badge/Stack-WXT%20%7C%20TypeScript%20%7C%20TailwindCSS%20%7C%20Vite-blueviolet?style=flat-square)](https://github.com/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension#tech-stack)
[![Lint & Format](https://img.shields.io/badge/Lint/Format-Biome-informational?style=flat-square)](https://biomejs.dev/)
[![License](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey?style=flat-square)](https://github.com/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension/blob/main/LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension?style=flat-square&colorA=orange&colorB=yellow)](https://github.com/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension/stargazers)
<!-- Badges end -->

**Star ⭐ this Repo** to support our mission of enhancing digital productivity through intelligent, context-aware technology!

---

## BLUF: Bottom Line Up Front

FocusFlow is an intelligent browser extension that dynamically manages tasks based on your current web context. It leverages AI for real-time prioritization and seamless integration across your digital workflow, optimizing focus and boosting productivity. This extension transforms your browser into a smart productivity hub, ensuring you tackle the right tasks at the right time.

---

## 🏗️ Architecture

FocusFlow employs a robust Feature-Sliced Design (FSD) architecture tailored for browser extensions, powered by WXT. This structure ensures modularity, scalability, and maintainability, separating concerns into distinct layers and features.


.
├── .github/                       # GitHub Actions workflows, issue templates, PR templates
├── .vscode/                       # VS Code specific settings
├── assets/                        # Static assets like images, icons, banners
├── public/                        # Public assets copied directly (e.g., manifest.json, favicons)
├── src/                           # All source code for the extension
│   ├── app/                       # Core application logic, entry points
│   │   ├── api/                   # API interfaces and service integrations
│   │   ├── router/                # Routing logic for popup/options pages
│   │   └── store/                 # Global state management (using Signals)
│   ├── features/                  # Independent, reusable features (FSD layers)
│   │   ├── context-engine/        # AI-powered context analysis and task prioritization
│   │   ├── task-management/       # CRUD operations for tasks
│   │   └── ui-components/         # Reusable UI components
│   ├── pages/                     # UI for popup, options, and devtools pages
│   │   ├── popup/                 # Main extension popup interface
│   │   ├── options/               # Extension settings and configuration
│   │   └── devtools/              # Developer tools integration (if any)
│   ├── background/                # Background service worker (event listeners, long-running tasks)
│   ├── content-scripts/           # Scripts injected into web pages
│   ├── utils/                     # Utility functions and helpers
│   └── styles/                    # Global styles and TailwindCSS configuration
├── tests/                         # Comprehensive test suite (Unit, E2E)
│   ├── unit/                      # Vitest unit tests for individual modules/functions
│   ├── e2e/                       # Playwright end-to-end tests for user flows
│   └── setup.ts                   # Test setup configurations
├── .browserslistrc                # Browser compatibility configuration
├── .gitignore                     # Files/directories to ignore in Git
├── .prettierignore                # Files to ignore for Prettier formatting
├── .editorconfig                  # Editor configuration for consistency
├── biome.json                     # Biome linter/formatter configuration
├── LICENSE                        # Project license (CC BY-NC 4.0)
├── package.json                   # Project metadata, scripts, dependencies
├── README.md                      # Project documentation (this file)
├── tsconfig.json                  # TypeScript compiler configuration
├── vite.config.ts                 # Vite bundler configuration
└── wxt.config.ts                  # WXT framework configuration


---

## 📖 Table of Contents

*   [BLUF: Bottom Line Up Front](#bluf-bottom-line-up-front)
*   [🏗️ Architecture](#%EF%B8%8F-architecture)
*   [📖 Table of Contents](#-table-of-contents)
*   [🤖 AI Agent Directives](#-ai-agent-directives)
*   [🚀 Getting Started](#-getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
    *   [Development Commands](#development-commands)
*   [⚙️ Configuration](#%EF%B8%8F-configuration)
*   [🛠️ Development Standards](#%EF%B8%8F-development-standards)
    *   [Principles](#principles)
    *   [Folder Structure](#folder-structure)
    *   [Testing Strategy](#testing-strategy)
*   [🤝 Contributing](#-contributing)
*   [🛡️ Security](#%EF%B8%8F-security)
*   [📜 License](#-license)

---

## 🤖 AI Agent Directives

<details>
<summary>⚡️ AI Agent Directives (Click to Expand)</summary>

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
**Directives:** Detect the project type (`package.json`, `Cargo.toml`, `pyproject.toml`) and apply the corresponding **Apex Toolchain**.
* **SCENARIO A: WEB / APP / EXTENSION (TypeScript)** - *Applicable to FocusFlow*
    * **Stack:** **TypeScript 6.x** (Strict), **Vite 7** (Rolldown), **Tauri v2.x** (Native, if desktop), **WXT** (Browser Extensions).
    * **State:** **Signals** (Standardized).
    * **UI Framework:** **React 19 / Preact X** for UI components, integrated via WXT.
    * **Styling:** **TailwindCSS v4.x** with JIT engine.
    * **Lint/Test:** **Biome** (Speed, Linter/Formatter) + **Vitest** (Unit/Component) + **Playwright** (E2E for browser interactions).
* **SCENARIO B: SYSTEMS / PERFORMANCE (Rust/Go)** - *Not applicable to FocusFlow*
    * **Stack:** **Rust 1.8x** (Cargo) or **Go 1.2x**.
    * **Lint:** **Clippy** / **GolangCI-Lint**.
* **SCENARIO C: DATA / SCRIPTS / AI (Python)** - *Not applicable to FocusFlow*
    * **Stack:** **uv** (Manager), **Ruff** (Linter), **Pytest** (Test).

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
3.  **Lint/Format:** Run the stack's strictest linter (Biome/Ruff).
4.  **Test:** Run the test suite.
5.  **DECISION GATE:**
    * **IF** Errors/Warnings exist -> **GO TO STEP 2** (Self-Correct).
    * **IF** Clean -> **COMMIT** and Present.
**Constraint:** **DO NOT STOP** until the build is perfectly clean.

---

## 6. CORE ARCHITECTURAL PRINCIPLES
* **SOLID MANDATE:** SRP, OCP, LSP, ISP, DIP.
* **ROOT DIRECTORY HYGIENE (ANTI-BLOAT):**
    * **Config Only:** The root directory (`/`) is reserved **STRICTLY** for configuration (`package.json`, `README.md`, `.gitignore`, `biome.json`, `tsconfig.json`).
    * **No Root Scripts:** Do not create a `scripts/` folder in the root.
    * **Containment:** All source code goes to `src/`. All verification code goes to `tests/`.
* **MODULARITY:** Feature-First Structure (`src/features/auth`), not type. This project uses Feature-Sliced Design (FSD).
* **CQS:** Methods must be **Commands** or **Queries**, never both.
* **12-Factor App:** Config in environment; backing services attached.

---

## 7. CODE HYGIENE & STANDARDS (READABILITY FIRST)
* **SEMANTIC NAMING PROTOCOL:**
    * **Descriptive Verbs:** `calculateWeeklyPay` (Good) vs `calc` (Bad).
    * **Casing:** `camelCase` (JS/TS), `PascalCase` (Components/Classes).
* **CLEAN CODE RULES:**
    * **Verticality:** Optimize for reading down.
    * **No Nesting:** Use **Guard Clauses** (`return early`).
    * **DRY & KISS:** Automate repetitive tasks. Keep logic simple.
    * **Zero Comments:** Code must be **Self-Documenting**. Use comments *only* for "Why".

---

## 8. RELIABILITY, SECURITY & SUSTAINABILITY
* **DEVSECOPS PROTOCOL:**
    * **Zero Trust:** Sanitize **ALL** inputs (OWASP Top 10 2025).
    * **Supply Chain:** Generate **SBOMs** for all builds.
    * **Fail Fast:** Throw errors immediately on invalid state.
    * **Encryption:** Secure sensitive data at rest and in transit (e.g., `chrome.storage.local` with encryption).
* **EXCEPTION HANDLING:**
    * **Resilience:** App must **NEVER** crash. Wrap critical I/O in `try-catch-finally`.
    * **Recovery:** Implement retry logic with exponential backoff for external API calls.
* **GREEN SOFTWARE:**
    * **Rule of Least Power:** Choose the lightest tool for the job.
    * **Efficiency:** Optimize loops ($O(n)$ over $O(n^2)$).
    * **Lazy Loading:** Load resources only when needed (e.g., dynamic imports).

---

## 9. COMPREHENSIVE TESTING & VERIFICATION STRATEGY
* **FOLDER SEPARATION PROTOCOL (STRICT):**
    * **Production Purity:** The `src/` or `extension/` folder is a **Production-Only Zone**. It must contain **ZERO** test files and **ZERO** test scripts.
    * **Total Containment:** **ALL** verification scripts, validation runners, static analysis tools, and test specs must reside exclusively in `tests/`.
    * **Structure:**
        * `tests/unit/`: **Vitest** unit tests for individual modules/functions.
        * `tests/e2e/`: **Playwright** end-to-end tests for browser interaction flows.
        * `tests/scripts/`: Verification/Validation scripts (e.g., `verify-imports.js`, `audit-coverage.js`).
* **TESTING PYRAMID (F.I.R.S.T.):**
    * **Fast:** Tests run in milliseconds.
    * **Isolated:** No external dependencies (mocked).
    * **Repeatable:** Deterministic results.
* **COVERAGE MANDATE:**
    * **1:1 Mapping:** Every source file **MUST** have a corresponding test file.
    * **Target:** 100% Branch Coverage.
    * **Zero-Error Standard:** Software must run with 0 console errors.

---

## 10. UI/UX AESTHETIC SINGULARITY (2026 STANDARD)
* **VISUAL LANGUAGE:**
    * **Style:** Blend **Liquid Glass** + **Neo-Brutalist** + **Material You 3.0**.
    * **Motion:** **MANDATORY** fluid animations (`transition: all 0.2s`).
* **PERFORMANCE UX:**
    * **INP Optimization:** Interaction to Next Paint < 200ms.
    * **Optimistic UI:** UI updates instantly; server syncs in background.
* **INTERACTION DESIGN:**
    * **Hyper-Personalization:** Adapt layouts based on user behavior (e.g., context-aware UI elements).
    * **Micro-interactions:** Every click/hover must have feedback.
* **HYPER-CONFIGURABILITY:**
    * **Mandate:** Every feature/color must be user-configurable via Settings (accessible in `src/pages/options`).

---

## 11. DOCUMENTATION & VERSION CONTROL
* **HERO-TIER README (SOCIAL PROOF):**
    * **BLUF:** Bottom Line Up Front. Value prop first.
    * **Live Sync:** Update README **IN THE SAME TURN** as code changes.
    * **Visuals:** High-Res Badges (Shields.io), ASCII Architecture Trees.
    * **AI Replication Block:** Include `<details>` with stack info for other agents.
    * **Social Proof:** Explicitly ask users to **"Star ⭐ this Repo"**.
* **ADVANCED GIT OPERATIONS:**
    * **Context Archaeology:** Use `git log`/`git blame`.
    * **Conventional Commits:** Strict format (`feat:`, `fix:`, `docs:`).
    * **Semantic Versioning:** Enforce `Major.Minor.Patch`.

---

## 12. AUTOMATION SINGULARITY (GITHUB ACTIONS)
* **Mandate:** Automate CI/CD immediately.
* **Workflows:**
    1.  **Integrity:** Lint + Test on Push.
    2.  **Security:** Audit dependencies + SBOM.
    3.  **Release:** Semantic Versioning + Artifact Upload.
    4.  **Deps:** Auto-merge non-breaking updates.

---

## 13. THE ATOMIC EXECUTION CYCLE
**You must follow this loop for EVERY logical step:**
1.  **Audit:** Scan state (`ls -R`) & History (`git log`).
2.  **Research:** Query Best Practices & Trends.
3.  **Plan:** Architect via `clear-thought-two`.
4.  **Act:** Fix Code + Polish + Add Settings + Write Tests (in `tests/`).
5.  **Automate:** Create/Update CI/CD YAMLs.
6.  **Docs:** Update `README.md` (Replication Ready).
7.  **Verify:** Run Tests & Linters.
8.  **REITERATE:** If *any* error/warning exists, fix it immediately.
    **DO NOT STOP** until the build is perfectly clean.
9.  **Commit:** `git commit` immediately (Only when clean).
</details>

---

## 🚀 Getting Started

Follow these steps to set up FocusFlow for development.

### Prerequisites

Ensure you have the following installed:

*   [Node.js](https://nodejs.org/en/) (v18.x or later)
*   [pnpm](https://pnpm.io/) (Recommended package manager)
*   A modern web browser (Chrome, Firefox, Edge)

### Installation

1.  **Clone the repository:**
    bash
    git clone https://github.com/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension.git
    cd FocusFlow-Contextual-Productivity-Browser-Extension
    

2.  **Install dependencies:**
    bash
    pnpm install
    

3.  **Build the extension for development:**
    bash
    pnpm run build
    

4.  **Load the extension in your browser:**
    *   **Chrome/Brave/Edge:**
        1.  Open `chrome://extensions` (or `edge://extensions`).
        2.  Enable "Developer mode" in the top-right corner.
        3.  Click "Load unpacked" and select the `dist` directory inside your cloned repository.
    *   **Firefox:**
        1.  Open `about:debugging#/runtime/this-firefox`.
        2.  Click "Load Temporary Add-on..." and select any file inside the `dist` directory (e.g., `manifest.json`).

### Development Commands

| Command           | Description                                                        |
| :---------------- | :----------------------------------------------------------------- |
| `pnpm dev`        | Starts the development server with hot-reloading.                  |
| `pnpm build`      | Builds the extension for production into the `dist` directory.     |
| `pnpm lint`       | Runs Biome linter and formatter checks.                            |
| `pnpm lint:fix`   | Automatically fixes linting and formatting issues with Biome.      |
| `pnpm test`       | Runs Vitest unit tests.                                            |
| `pnpm test:e2e`   | Runs Playwright end-to-end tests.                                  |
| `pnpm test:watch` | Runs Vitest in watch mode.                                         |
| `pnpm preview`    | Serves the production build locally for testing.                   |

---

## ⚙️ Configuration

All core configurations are managed via `wxt.config.ts`, `vite.config.ts`, and `biome.json`.
Sensitive API keys or environment-specific variables should be managed using `.env` files and accessed via `process.env`.
Refer to the `src/pages/options` for user-configurable settings within the extension itself.

---

## 🛠️ Development Standards

### Principles

*   **SOLID:** Adherence to Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion Principles.
*   **DRY (Don't Repeat Yourself):** Promote reusable components and functions to avoid code duplication.
*   **YAGNI (You Aren't Gonna Need It):** Avoid implementing functionality that is not immediately required.
*   **Feature-Sliced Design (FSD):** Structure the codebase by domain features rather than by type, enhancing modularity and scalability.

### Folder Structure

The project follows a strict root directory hygiene:
*   The root is exclusively for configuration files and project metadata.
*   All source code resides within the `src/` directory.
*   All tests, validation scripts, and verification tools are isolated in the `tests/` directory.

### Testing Strategy

FocusFlow employs a robust testing pyramid:
*   **Unit Tests (`tests/unit/`):** Utilizes `Vitest` for fast, isolated tests of individual functions and components, ensuring 100% branch coverage.
*   **End-to-End Tests (`tests/e2e/`):** Leverages `Playwright` to simulate real user interactions within the browser, verifying complete user flows and cross-browser compatibility.
*   **Code Coverage:** Mandates 100% branch coverage for all new and modified code.
*   **Zero-Error Standard:** The application must run with no console errors during development or production.

---

## 🤝 Contributing

We welcome contributions! Please refer to our [CONTRIBUTING.md](https://github.com/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension/blob/main/.github/CONTRIBUTING.md) for guidelines on how to submit issues, features, and pull requests.

---

## 🛡️ Security

FocusFlow adheres to strict security protocols, including input sanitization, secure storage practices for sensitive user data, and regular dependency audits. For more details, please review our [SECURITY.md](https://github.com/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension/blob/main/.github/SECURITY.md).

---

## 📜 License

This project is licensed under the [Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/) License. See the [LICENSE](https://github.com/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension/blob/main/LICENSE) file for details.
