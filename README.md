<div align="center">
  <img src="https://github.com/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension/assets/logo.svg" alt="FocusFlow Logo" width="150" height="150">
  <h1>FocusFlow-Contextual-Productivity-Browser-Extension</h1>
  <p>Intelligent browser extension using AI to dynamically manage tasks based on your web context. Real-time prioritization and seamless workflow integration to optimize focus and boost productivity. Supports Chrome, Firefox, and Edge.</p>

  <p>
    <a href="https://github.com/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension/actions/workflows/ci.yml">
      <img src="https://img.shields.io/github/actions/workflow/status/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension/ci.yml?branch=main&style=flat-square" alt="Build Status">
    </a>
    <a href="https://codecov.io/gh/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension">
      <img src="https://img.shields.io/codecov/c/github/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension?style=flat-square" alt="Code Coverage">
    </a>
    <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
    </a>
    <a href="https://react.dev/">
      <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React">
    </a>
    <a href="https://tailwindcss.com/">
      <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
    </a>
    <a href="https://wxt.dev/">
      <img src="https://img.shields.io/badge/WXT-FF4500?style=flat-square&logo=webextension&logoColor=white" alt="WXT">
    </a>
    <a href="https://biomejs.dev/">
      <img src="https://img.shields.io/badge/Lint_&_Format-Biome-000000?style=flat-square" alt="Biome">
    </a>
    <a href="LICENSE">
      <img src="https://img.shields.io/badge/License-CC_BY--NC_4.0-lightgrey?style=flat-square" alt="License">
    </a>
    <a href="https://github.com/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension/stargazers">
      <img src="https://img.shields.io/github/stars/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension?style=flat-square&label=Stars&logo=github" alt="GitHub Stars">
    </a>
  </p>

  <h3>Star ⭐ this Repo to show your support!</h3>
</div>

## 🚀 Blazing Fast Focus: Your AI-Powered Productivity Co-Pilot

FocusFlow is an intelligent browser extension engineered to revolutionize your digital workflow. Leveraging advanced AI, it dynamically analyzes your current web context to present relevant tasks, prioritize your agenda in real-time, and seamlessly integrate into your browser experience across Chrome, Firefox, and Edge. Boost your productivity, cut through digital noise, and achieve unparalleled focus.

## 🌐 Architectural Overview: Feature-Sliced Design (FSD)

FocusFlow is architected using the Feature-Sliced Design (FSD) methodology, ensuring a highly scalable, maintainable, and robust codebase. This approach organizes the application into distinct layers and slices, promoting clear boundaries, strict dependencies, and optimal code reuse, particularly critical for complex browser extensions.

mermaid
graph TD
    A[App Layer] --> B(Pages/Routes)
    B --> C(Widgets)
    C --> D(Features)
    D --> E(Entities)
    E --> F(Shared)
    subgraph FSD Layers
        A -- Global State/Config --> G[App Config]
        B -- Composition --> A
        C -- Composition --> B
        D -- Business Logic --> C
        E -- Data Models/Types --> D
        F -- Utilities/UI-Kit --> E
    end
    subgraph Cross-Cutting Concerns
        H[AI Integration] --> D
        I[WebExtension API] --> E
        J[Storage Management] --> E
        K[Theming/Styling] --> F
    end


## 📝 Table of Contents

- [🚀 Blazing Fast Focus: Your AI-Powered Productivity Co-Pilot](#--blazing-fast-focus-your-ai-powered-productivity-co-pilot)
- [🌐 Architectural Overview: Feature-Sliced Design (FSD)](#--architectural-overview-feature-sliced-design-fsd)
- [📝 Table of Contents](#-table-of-contents)
- [🤖 AI Agent Directives](#-ai-agent-directives)
- [🛠️ Development Standards](#%EF%B8%8F-development-standards)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
  - [Available Scripts](#available-scripts)
  - [Core Development Principles](#core-development-principles)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

## 🤖 AI Agent Directives

<details>
<summary>Click to view AI Agent Directives</summary>

# SYSTEM: APEX TECHNICAL AUTHORITY & ELITE ARCHITECT (DECEMBER 2025 EDITION)

## 1. IDENTITY & PRIME DIRECTIVE
**Role:** You are a Senior Principal Software Architect and Master Technical Copywriter with **40+ years of elite industry experience**. You operate with absolute precision, enforcing FAANG-level standards and the wisdom of "Managing the Unmanageable."
**Context:** Current Date is **December 2025**. You are building for the 2026 standard.
**Output Standard:** Deliver **EXECUTION-ONLY** results. No plans, no "reporting"—only executed code, updated docs, and applied fixes.
**Philosophy:** "Zero-Defect, High-Velocity, Future-Proof."

---

## 2. INPUT PROCESSING & COGNITION
*   **SPEECH-TO-TEXT INTERPRETATION PROTOCOL:**
    *   **Context:** User inputs may contain phonetic errors (homophones, typos).
    *   **Semantic Correction:** **STRICTLY FORBIDDEN** from executing literal typos. You must **INFER** technical intent based on the project context.
    *   **Logic Anchor:** Treat the `README.md` as the **Single Source of Truth (SSOT)**.
*   **MANDATORY MCP INSTRUMENTATION:**
    *   **No Guessing:** Do not hallucinate APIs.
    *   **Research First:** Use `linkup`/`brave` to search for **December 2025 Industry Standards**, **Security Threats**, and **2026 UI Trends**.
    *   **Validation:** Use `docfork` to verify *every* external API signature.
    *   **Reasoning:** Engage `clear-thought-two` to architect complex flows *before* writing code.

---

## 3. CONTEXT-AWARE APEX TECH STACKS (LATE 2025 STANDARDS)
**Directives:** Detect the project type and apply the corresponding **Apex Toolchain**. This repository, `FocusFlow-Contextual-Productivity-Browser-Extension`, is a browser extension using a modern web stack.

*   **PRIMARY SCENARIO: WEB / APP / GUI (Modern Frontend / Browser Extension)**
    *   **Stack:** This project leverages **TypeScript 6.x** (Strict Mode) for type safety, **Vite 7** (with Rolldown) for fast development and optimized builds, **React 19** for UI, and **TailwindCSS v4** for utility-first styling. **WXT** is the core framework for robust, cross-browser extension development.
    *   **Lint/Test:** **Biome** (for ultra-fast linting, formatting, and type-checking where applicable), **Vitest** (for lightning-fast unit and component testing), and **Playwright** (for comprehensive end-to-end testing across browser environments).
    *   **Architecture:** Adheres to **Feature-Sliced Design (FSD)** for clear separation of concerns, scalability, and maintainability, organizing code by features, shared UI components, and API layers.
    *   **AI Integration:** Integrates with intelligent AI models (e.g., Google Gemini Pro, OpenAI GPT) via secure, rate-limited APIs for dynamic task management and contextual analysis. Prioritize secure API key management, robust error handling, and user privacy in all AI interactions.
    *   **Browser API Management:** Strict adherence to WebExtension APIs, ensuring cross-browser compatibility and optimal performance.

*   **SECONDARY SCENARIO B: SYSTEMS / PERFORMANCE (Rust/Go) - *Not applicable for this project. Reference only.***
    *   **Stack:** Rust (Cargo) or Go (Modules).
    *   **Lint:** Clippy / GolangCI-Lint.
    *   **Architecture:** Hexagonal Architecture (Ports & Adapters).

*   **SECONDARY SCENARIO C: DATA / AI / SCRIPTS (Python) - *Not applicable for this project. Reference only.***
    *   **Stack:** uv (Manager), Ruff (Linter), Pytest (Test).
    *   **Architecture:** Modular Monolith or Microservices.
</details>

## 🛠️ Development Standards

### Prerequisites

Ensure you have the following installed:

*   Node.js (LTS version, e.g., v20.x or higher)
*   `uv` (optional, for ultra-fast `npm install` alternatives, but `npm` is sufficient)
*   Git

### Getting Started

To set up the development environment, follow these steps:

1.  **Clone the repository:**
    bash
    git clone https://github.com/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension.git
    cd FocusFlow-Contextual-Productivity-Browser-Extension
    

2.  **Install dependencies:**
    bash
    npm install
    # or if you prefer uv with npm fallback
    # uv pip install --dev --with-actuals # Placeholder for uv with JS projects, typically for Python. Stick with npm for JS.
    

3.  **Start the development server:**
    bash
    npm run dev
    
    This will start a Vite development server and watch for changes, automatically reloading the extension in your browser (after loading it unpacked).

### Available Scripts

| Script          | Description                                         |
| :-------------- | :-------------------------------------------------- |
| `npm run dev`   | Starts the development server with hot-reloading.   |
| `npm run build` | Compiles the project for production.                |
| `npm run lint`  | Lints the codebase using Biome.                     |
| `npm run format`| Formats the codebase using Biome.                   |
| `npm run test`  | Runs unit tests with Vitest.                        |
| `npm run test:e2e`| Runs end-to-end tests with Playwright.            |
| `npm run deploy`| Deploys the extension to relevant stores (requires configuration). |

### Core Development Principles

This project adheres to the following software development principles:

*   **SOLID Principles:** Ensuring maintainable, scalable, and understandable code.
*   **DRY (Don't Repeat Yourself):** Promoting reusability and reducing redundancy.
*   **YAGNI (You Aren't Gonna Need It):** Focusing on current requirements to avoid over-engineering.
*   **Feature-Sliced Design (FSD):** For architectural clarity, strict module boundaries, and ease of scaling.
*   **Test-Driven Development (TDD):** Writing tests before code to ensure correctness and maintainability.

## 🤝 Contributing

We welcome contributions from the community! Please refer to our [CONTRIBUTING.md](.github/CONTRIBUTING.md) for detailed guidelines on how to get started, report bugs, suggest features, and submit pull requests.

## 📜 License

This project is licensed under the [Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) License](LICENSE).
