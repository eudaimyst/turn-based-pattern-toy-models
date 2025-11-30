# COPILOT.md
# How to Use Copilot for General Repository Tasks

This file describes how developers should use GitHub Copilot for repository-wide work.  
This includes refactoring, bug fixes, documentation improvements, and general feature updates unrelated to toy generation.

For toy creation, see COPILOT.md and COPILOT_SYSTEM.md instead.

---

## 1. How to Initialize Copilot for Repository-Wide Tasks

Each time you want Copilot to assist with general development:

1. Open a new Copilot Chat window
2. Run this initialization command:
Reset your context. Load and obey COPILOT_SYSTEM.md.
3. Then describe the task you want performed.

This ensures Copilot follows the repository’s safety and structural constraints.

---

## 2. What Copilot Can Help With
Copilot may be used for:
- Svelte component improvements
- Vite configuration support
- TypeScript type-safety fixes
- refactoring /src/lib utilities
- improving clarity of documentation
- D3 visualization refinements
- file-level commenting and explanation
- adding developer ergonomics (scripts, utilities)
- diagnosing code issues

---

## 3. What Copilot Should Avoid
Copilot should NOT:
- make changes to the toy framework unless instructed
- modify toy specifications
- weaken or reinterpret safety guardrails
- introduce conceptual explanations involving cognition or model internals
- replace verified mathematical descriptions with alternative formulations

For anything involving toy creation, use the “toy-generation” Copilot files instead.

---

## 4. Recommended Workflow
When performing general updates:

1. Open new chat
2. Load COPILOT_SYSTEM_GLOBAL.md
3. Describe the update in plain language
4. Review the generated changes
5. Apply manually through Git or allow Copilot to apply edits (VSCode)

Repeat the initialization for each major change or edit group.

---

## 5. Reference Documents
Copilot should remain consistent with:

- README.md  
- docs/overview.md  
- docs/development-guidelines.md  
- docs/ethics.md  
- docs/fundamentals.md  

Developers should consult these when asking Copilot for help.

---

## 6. Summary
Use:
- **COPILOT.md** + **COPILOT_SYSTEM.md** → toy generation
- **COPILOT_GLOBAL.md** + **COPILOT_SYSTEM_GLOBAL.md** → general repo tasks

This separation prevents context drift, ensures safety compliance, and keeps Copilot behavior predictable and maintainable.

End of COPILOT_GLOBAL.md