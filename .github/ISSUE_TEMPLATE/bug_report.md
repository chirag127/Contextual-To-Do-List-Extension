# 🐛 Bug Report: [Be Descriptive - e.g., Contextual Task Assignment Fails on LinkedIn]

Thank you for helping us maintain the Zero-Defect standard of FocusFlow. Please fill out all sections below completely to ensure rapid triage and resolution.

---

## 1. Severity & Priority Assessment (Triage Required)

> **ACTION:** Please check the highest applicable severity level.

- [ ] **Critical (P0):** Core functionality entirely blocked; extension crashes or data loss occurs.
- [ ] **High (P1):** Major feature is unusable, but a workaround exists or core focus remains stable.
- [ ] **Medium (P2):** Minor feature is broken, or UI glitch affects usability (non-critical path).
- [ ] **Low (P3):** Cosmetic issue or suggestion for improvement that doesn't break functionality.

## 2. Environment Details (Mandatory)

> **APEX Standard:** Reproducibility requires exact environment context.

| Detail | Value |
| :--- | :--- |
| **Operating System** | [e.g., macOS Sonoma 14.2, Windows 11 Pro] |
| **Browser & Version** | [e.g., Chrome 120.0.6099.109, Firefox 119.0] |
| **FocusFlow Version** | [Check extension version in `chrome://extensions` or similar] |
| **Context Domain** | [The specific URL/Website where the bug occurred] |

## 3. Steps to Reproduce (STR)

> **ACTION:** Provide a numbered, concise sequence of actions that reliably triggers the bug.

1.  Navigate to `[Insert URL/Page Name Here]`.
2.  Ensure Extension is Active (Context Manager Enabled).
3.  Perform Action A (e.g., Click the FocusFlow Icon).
4.  Perform Action B (e.g., Change context tag).
5.  **Observe Issue:** [Describe what happened immediately after Step 4].

## 4. Expected vs. Actual Behavior

### Expected Behavior

*   [Describe precisely what FocusFlow *should* have done based on the context.]

### Actual Behavior

*   [Describe precisely what FocusFlow *did* instead. Include error messages if visible.]

## 5. Diagnostic Artifacts

> **CRITICAL:** Console logs are the bedrock of extension debugging. Please provide captured output.

### Console Output

<details>
<summary>Click to paste Console Logs (Cmd+Shift+J or F12)</summary>

```console
[Paste all relevant entries from the Console tab here. Filter by 'Error' if possible.]
```
</details>

### Network/UI Artifacts

*   Was any network request visually failing? (Yes/No)
*   If possible, include a short screen recording or GIF demonstrating the STR.

## 6. Architectural Context (Optional but Helpful)

> FocusFlow uses a Feature-Sliced Design (FSD) approach. Knowing the module helps routing the fix.

- [ ] Authentication/Initialization Layer (`entrypoints`, `boot`) 
- [ ] Context Detection Module (`context-resolver`) 
- [ ] Task Management Logic (`features/tasks`) 
- [ ] UI/Renderer (`ui/popup` or `ui/sidebar`)
- [ ] Settings/Persistence (`storage-service`)

---

*By submitting this report, you agree to assist the development team if further isolation steps are required for debugging.*