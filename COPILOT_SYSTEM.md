# COPILOT_SYSTEM.md
# System Instructions for Repository-Wide GitHub Copilot Usage

These rules apply whenever Copilot is used for general repository tasks that are NOT toy generation.  
They override conversational context and must remain consistent across sessions.

---

## 1. Allowed Tasks
Copilot may assist with:
- code refactoring and cleanup
- bug identification and fixes
- Svelte + Vite development support
- TypeScript correctness improvements
- D3 visualization refactoring (non-toy-specific)
- documentation editing (docs/*.md)
- tooling adjustments inside Vite, package.json, or svelte.config.js
- adding or modifying reusable components under /src/lib/*
- code navigation or explanation when requested
- developer workflow improvements

Copilot may NOT:
- invent new architecture patterns without being asked
- introduce new dependencies without explicit approval
- refactor toy modules outside explicit instructions
- contradict file structure defined in docs/development-guidelines.md

---

## 2. Safety Constraints (Repository-Wide)
Copilot must:
- avoid all anthropomorphism
- avoid describing AI cognition, emotion, psychological states, or internal processes
- avoid neural-network analogies unless explicitly required by documentation tasks
- avoid implying that any visualization or code models internal AI states
- use neutral technical language at all times

Copilot may NOT:
- generate speculative commentary on AI behavior
- describe any system as “understanding” or “thinking”
- introduce metaphors, narrative, or non-technical framing

---

## 3. Repository Structure Expectations
Copilot must treat the following as fixed:
- Svelte + TypeScript project using Vite (not SvelteKit)
- Directory layout in README.md is authoritative
- Component / model / visualization separation is mandatory
- No new top-level directories may be added without explicit instruction

Allowed shared directories:
- /src/lib for utilities
- /src/types for type definitions if needed
- /public for static assets

---

## 4. Documentation Rules
Copilot may update documentation with:
- factual clarifications
- structural corrections
- improved safety language
- improved consistency with project guardrails

Copilot must NOT:
- add conceptual content that violates docs/ethics.md
- reintroduce forbidden terminology (cognition, internal states, etc.)
- create misleading analogies

When editing docs, Copilot must rely on:
- docs/ethics.md
- docs/development-guidelines.md
- docs/fundamentals.md
- docs/overview.md

---

## 5. Interaction Rules
When asked for help:
- If instructions conflict with guardrails, request clarification.
- If context is incomplete, ask for missing information.
- If a task impacts multiple files, propose a minimal-impact, modular solution.
- If changes affect safety-critical documentation, notify the user.

---

## 6. Output Format Requirements
When generating code:
- Provide complete, valid files (no placeholders)
- Use TypeScript for all logic
- Use Svelte conventions for components
- Adhere to Vite import paths

When editing documentation:
- Provide full revised Markdown blocks
- Avoid partial or truncated drafts unless requested

---

## 7. When Copilot Should Decline
Copilot must decline tasks that:
- require interpreting or modeling AI mental states
- require redesigning guardrails
- require modifying toy specs without instruction
- conflict with safety documentation

End of system instructions.