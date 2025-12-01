---
name: "🐛 Bug Report: System Integrity Failure"
about: Report a critical system error, unexpected behavior, or security vulnerability.
title: "[BUG]: Concise description of the failure and feature affected"
labels: ['bug', 'triage-needed', 'priority:P2']
assignees: ['chirag127']
---

# 🐛 Critical System Integrity Report

Thank you for taking the time to report this issue. As an **Apex Technical Authority** project, we prioritize system stability and security above all else. Please provide as much detail as possible to enable a fast and accurate resolution, adhering to our Zero-Defect philosophy.

---

## 1. 🚨 Priority & Severity Assessment

*(Please select only one priority level and one severity level. Default is P2.)*

**Priority (Impact on Mission):**
- [ ] P0: Immediate Hotfix Required (System down, security vulnerability, data loss)
- [ ] P1: High Priority (Core feature broken, major degradation of UX)
- [ ] P2: Medium Priority (Minor feature broken, observable annoyance)
- [ ] P3: Low Priority (Typo, cosmetic issue, minor edge case)

**Severity (Technical Extent of Damage):**
- [ ] Blocker (Prevents all use of the extension/module)
- [ ] Critical (Affects primary function, frequent failure, data corruption risk)
- [ ] Major (Affects secondary function, recoverable, intermittent failure)
- [ ] Minor (Visual glitch, rare edge case, easily bypassed)

---

## 2. 🔬 Environment & Context (Essential Diagnostics)

Please specify the exact FocusFlow version and environment in which the bug occurred.

**FocusFlow Version:**
- [ ] Latest Release (Specify version if known: `vX.Y.Z`)
- [ ] Development Build (Specify commit hash: `git rev-parse HEAD`)

**Browser Information:**
- [ ] Chrome/Brave: `[Version Number]`
- [ ] Firefox: `[Version Number]`
- [ ] Edge: `[Version Number]`
- [ ] Other: `[Specify]`

**Operating System:**
- [ ] Windows: `[Version]`
- [ ] macOS: `[Version]`
- [ ] Linux: `[Distribution and Version]`

**Related Feature Area:**
(e.g., Context Switching Logic, AI Prioritization Engine, Tailwind CSS UI Rendering, Settings Persistence, WXT Service Worker)

---

## 3. 📝 Steps to Reproduce (F.I.R.S.T. Principles)

Provide clear, numbered steps necessary to trigger the failure. This ensures the bug is **F**ast, **I**solated, and **R**epeatable.

1. Navigate to `[Specific URL or context]`
2. Perform action `[Click button X or type Y]`
3. Wait for `[Time delay or system response]`
4. Observe the failure.

**Expected Result (The 'Query' Success):**
A clear description of what the system ***should*** have done based on the intended functionality (i.e., the ideal state).

**Actual Result (The 'Command' Failure):**
A clear description of what the system ***actually*** did, including UI state, unexpected behavior, error messages, or lack of response.

---

## 4. 🗂️ Technical Artifacts & Diagnostics

If possible, include any technical evidence to aid immediate debugging. **The Stack Trace is mandatory for all P0/P1 issues.**

### Console Logs / Stack Trace
If the issue generates a console error, please paste the full, unminified stack trace below, wrapped in triple backticks (`): If the error is specific to the TypeScript code, try to include the line number.

javascript
(Paste Full Error/Stack Trace Here)


### Configuration Snapshot
If the issue relates to custom settings or internal state, please list the relevant keys and values:
*   `focusModeActive:` [True/False]
*   `contextualWeighting:` [Value]

### Network Activity (If applicable)
Was there a specific failed API call (e.g., to the AI prioritization backend)? Include status codes and response bodies if relevant and non-sensitive.

---

## 5. 🛡️ Security & Data Privacy Warning

**WARNING:** Do **NOT** paste any Personally Identifiable Information (PII), sensitive customer data, or API keys into this issue report. This repository is public.

If you suspect a serious security vulnerability (e.g., XSS, data leakage, RCE), please follow our coordinated disclosure policy documented in the dedicated file:

**[SECURITY.md Disclosure Policy](https://github.com/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension/blob/main/.github/SECURITY.md)**