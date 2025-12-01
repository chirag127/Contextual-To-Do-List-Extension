# 🛡️ FocusFlow Security Policy: Zero Trust Mandate

FocusFlow operates under a rigorous Zero Trust security model, prioritizing the security and integrity of our users' contextual data and digital workflow. As a browser extension, security is paramount.

---

## 1. Reporting a Vulnerability (Responsible Disclosure)

We encourage security researchers and users to report vulnerabilities responsibly and privately. **Please DO NOT open a public GitHub Issue** for security-sensitive concerns.

### Private Disclosure Process:

1.  **Email:** Send a detailed report directly to the maintainers at `chirag127.dev@protonmail.com`.
2.  **Subject Line:** Must start with `[SECURITY]` followed by the repository name.
3.  **Details Required:** The report must include:
    *   **Vector:** A clear description of the vulnerability (e.g., XSS, Logic Flaw, Insufficient Authorization).
    *   **Reproduction Steps:** Detailed, step-by-step instructions that allow us to reproduce the issue locally.
    *   **Impact:** An explanation of the potential harm or data breach risk.
    *   **Proof of Concept (PoC):** A minimal payload or demonstration script (highly encouraged).

We commit to acknowledging receipt of the report within 48 hours and providing a target timeline for remediation.

## 2. Security Posture and Standards

FocusFlow is architected following the Apex DevSecOps Protocol, enforcing high standards for integrity and resilience.

### A. Extension Security (Client-Side Criticality)

*   **Principle of Least Privilege (PoLP):** We strictly adhere to minimal manifest permissions required for core functionality.
*   **Input Sanitization:** All user-controlled inputs and web context data handled by content scripts are rigorously sanitized using trusted libraries (e.g., DOMPurify) to prevent Cross-Site Scripting (XSS) and injection attacks.
*   **CORS & CSP:** Content Security Policies (CSP) are deployed in the manifest to restrict sources, and appropriate CORS headers are enforced on any auxiliary communication.

### B. DevSecOps and Supply Chain Integrity

*   **Dependency Auditing:** Our CI workflow includes mandatory checks using GitHub’s dependency scanning and `npm audit` on every commit to proactively mitigate known CVEs.
*   **SBOM Generation:** Builds generate a Software Bill of Materials (SBOM) to ensure component transparency and track dependency lineage.
*   **Code Quality:** We utilize TypeScript with maximal strict settings (`strict: true`) to catch common coding errors and type safety vulnerabilities at compile time.

## 3. Scope of Coverage

This policy applies to all code and artifacts associated with:

*   The source code available in the official repository:
    `https://github.com/chirag127/FocusFlow-Contextual-Productivity-Browser-Extension`
*   The compiled extension packages distributed via official stores.
*   The CI/CD pipelines defined in `.github/workflows/`.

## 4. Vulnerability Remediation

1.  **Verification:** The report is validated by the core team.
2.  **Fix Development:** Remediation is developed in a dedicated private branch.
3.  **Verification (Regression):** The fix is verified using our comprehensive automated test suite (Vitest/Playwright) to ensure no regressions.
4.  **Release:** A patched version is immediately released to the relevant extension stores.
5.  **Advisory:** A public Security Advisory (GitHub or CVE, if warranted) is issued after the patch is deployed, providing credit to the reporter (unless anonymity is requested).