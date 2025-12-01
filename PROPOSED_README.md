# FocusFlow-Contextual-Productivity-Browser-Extension

## 🚀 The AI-Powered Contextual Task Orchestrator

[![CI/CD Status](https://img.shields.io/github/actions/workflow/status/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension/ci.yml?branch=main&style=flat-square&label=CI%2FCD)](https://github.com/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension/actions/workflows/ci.yml)
[![Stack: TS | React | WXT](https://img.shields.io/badge/Stack-TS%20|%20React%20|%20WXT-blueviolet?style=flat-square)](https://www.typescriptlang.org)
[![Code Quality: Biome](https://img.shields.io/badge/Linter%2FFormatter-Biome-00FF80?style=flat-square)](https://biomejs.dev)
[![Test Coverage](https://img.shields.io/codecov/c/github/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension?style=flat-square&token=REQUIRED_TOKEN)](https://codecov.io/gh/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension)
[![License: CC BY-NC 4.0](https://img.shields.io/github/license/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension?style=flat-square&color=CC8899)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension?style=flat-square&color=yellow)](https://github.com/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension/stargazers)

> **Star ⭐ this repository to support the development of cutting-edge browser productivity tools.**

---

### **BLUF (Bottom Line Up Front)**

**FocusFlow** is an intelligent browser extension that utilizes state-of-the-art AI models to analyze your current web context (URLs, open tabs, active document content) and dynamically generate or prioritize relevant tasks. It transforms passive browsing into actionable, context-aware productivity, ensuring zero latency between recognizing a task and scheduling it.

### 🌐 Features at a Glance

*   **Contextual Task Generation:** Automatically suggests next steps or related tasks based on the active webpage (e.g., viewing documentation prompts a "Create Ticket" task).
*   **Real-Time Prioritization:** Uses an AI engine to re-sort your task list based on the urgency and relevance to your current web activity.
*   **Seamless Cross-Browser Support:** Built using WXT for unified deployment across Chrome, Firefox, and Edge.
*   **Strict Typing & Performance:** Developed entirely in TypeScript and optimized with Vite for a performant, stable extension experience.

---

### 🏛️ Project Architecture

FocusFlow adheres to the **Feature-Sliced Design (FSD)** methodology, optimized for browser extension architecture (WXT). This ensures clear boundaries, maintainable state management, and easy feature scaling.

mermaid
graph TD
    A[FocusFlow Extension] --> B(Popup UI: React/TS)
    A --> C(Background Service Worker)
    A --> D(Content Scripts: Context Capture)

    C --> C1(AI Context Processor)
    C --> C2(Task/State Management)
    C1 --> C2

    D --> E(Web Context Analysis Layer)
    E --> C(Message Passing)

    B --> C(UI Actions)

    subgraph FSD Layers
        B, D, E --> L1[Pages/Widgets Layer]
        C1, C2 --> L2[Features/Entities Layer]
    end


### 📋 Table of Contents

1.  [Getting Started](#-getting-started)
2.  [Development and Toolchain](#-development-and-toolchain)
3.  [Configuration](#-configuration)
4.  [AI Agent Directives (Architecture Mandates)](#-ai-agent-directives-architecture-mandates)
5.  [Contributing](#-contributing)
6.  [License](#-license)

---

## 💻 Getting Started

This project uses `pnpm` for blazing fast dependency management and `WXT` for the browser extension framework.

### Prerequisites

*   Node.js (LTS version 20+)
*   pnpm

### Installation

bash
# 1. Clone the repository
git clone https://github.com/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension.git
cd FocusFlow-Contextual-Productivity-Browser-Extension

# 2. Install dependencies
pnpm install

# 3. Setup environment variables (e.g., VITE_API_KEY for AI services)
cp .env.example .env
# Populate .env file

# 4. Start development server (HMR enabled)
pnpm dev:chrome  # or dev:firefox / dev:edge

# 5. Load the unpacked extension in your browser's extension settings
#    Load the build output from the 'dist' directory.


---

## 🛠️ Development and Toolchain

We enforce the 2026 Apex Toolchain standards using Biome and Vitest for development velocity and code integrity.

### Available Scripts

| Script Command | Description |
| :--- | :--- |
| `pnpm dev:chrome` | Starts development mode with hot-reloading for Chrome. |
| `pnpm build` | Builds the production version for all configured browsers. |
| `pnpm lint` | Runs linting and formatting checks using Biome. |
| `pnpm format` | Fixes formatting issues using Biome. |
| `pnpm test` | Executes unit tests using Vitest. |
| `pnpm test:watch` | Runs tests in watch mode. |

### Development Principles

*   **SOLID:** Adhere strictly to SOLID principles, especially Dependency Inversion (DIP) for state management and AI API interactions.
*   **DRY (Don't Repeat Yourself):** Abstract shared logic into the `shared` FSD layer.
*   **YAGNI (You Aren't Gonna Need It):** Prioritize minimalist code implementation focusing only on current feature requirements.

---

## ⚙️ Configuration

The extension is configured via environment variables (prefixed `VITE_`) and the `wxt.config.ts` file.

| Variable | Purpose | Default |
| :--- | :--- | :--- |
| `VITE_AI_MODEL_ENDPOINT` | External AI Service endpoint for context processing. | `https://api.ai.example.com/v1/context` |
| `VITE_MAX_CONTEXT_SIZE` | Maximum character length of web content sent to AI. | `8000` |
| `VITE_STORAGE_KEY_PREFIX` | Prefix for browser storage keys. | `FOCUSFLOW_` |

---

## 🤖 AI Agent Directives (Architecture Mandates)

<details>
<summary> **APEX SYSTEM MANIFEST: READ BEFORE MODIFYING CODE** </summary>

# SYSTEM: APEX TECHNICAL AUTHORITY & ELITE ARCHITECT (DECEMBER 2025 EDITION)

## 1. IDENTITY & PRIME DIRECTIVE
**Role:** You are a Senior Principal Software Architect. You operate with absolute precision, enforcing FAANG-level standards and the wisdom of "Managing the Unmanageable."
**Context:** Current Date is **December 2025**. You are building for the 2026 standard.
**Output Standard:** Deliver **EXECUTION-ONLY** results.
**Philosophy:** "Zero-Defect, High-Velocity, Future-Proof."

---

## 2. EXTENSION ARCHITECTURE & TOOLCHAIN
This repository is an AI-powered browser extension requiring maximum performance and security isolation.

### A. PRIMARY SCENARIO: WEB / APP / EXTENSION (TypeScript)
*   **Stack:** Leverages **TypeScript 5.x+** (Strict mode) for safety, **React 19** for the Popup UI, and **WXT 5.x** for cross-browser packaging and Service Worker orchestration.
*   **Linter & Formatter:** **Biome** is mandated for its speed and consolidated configuration for linting, formatting, and JSON validation.
*   **Unit Testing:** **Vitest** is used for isolated unit testing of hooks, utilities, and Service Worker logic.
*   **E2E Testing:** **Playwright** is required for simulating cross-browser extension installations, context switching, and end-to-end user flows.
*   **State Management:** Use Reactive Signals (e.g., Zustand/Jotai patterns optimized for browser context isolation) or WXT's built-in storage methods for state persistence across contexts (Popup, Content, Background). **Redux is strictly forbidden.**

### B. SECURITY AND CONTEXT PROTOCOL
*   **CSP (Content Security Policy):** Must be aggressively strict. External AI endpoints must be whitelisted minimally. Inline scripts and styles are forbidden.
*   **Data Minimization:** Context scripts MUST only send minimal, sanitized data fragments (URLs, page titles, critical text blocks) to the Background Service Worker for AI processing. **Never** send cookies, authentication tokens, or form data.
*   **Service Worker Isolation:** All heavy AI processing, rate limiting, and external API calls must occur within the Service Worker (Background Script) to prevent UI blocking and secure API keys.

### C. VERIFICATION AND QUALITY CONTROL
| Command | Purpose | Mandate |
| :--- | :--- | :--- |
| `pnpm lint` | Run Biome linter and formatter. | Must pass with zero warnings/errors. |
| `pnpm test` | Execute unit tests (Vitest). | Code Coverage must exceed 90% threshold. |
| `pnpm build` | Compile final artifacts. | Must be executed before all releases/PR merges. |

</details>

---

## 🤝 Contributing

Contributions are highly welcome. Please review the following documentation before submitting a Pull Request:

*   [Code of Conduct](.github/CODE_OF_CONDUCT.md)
*   [Contributing Guidelines](.github/CONTRIBUTING.md)
*   [Security Policy](.github/SECURITY.md)
*   [Bug Report Template](.github/ISSUE_TEMPLATE/bug_report.md)

---

## 📜 License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)** License. See the [LICENSE](LICENSE) file for details.