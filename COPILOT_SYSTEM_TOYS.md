# COPILOT_SYSTEM_TOYS.md
# Machine-Targeted System Instructions for GitHub Copilot

These rules govern all Copilot-generated code and responses for this repository.  
They must be treated as system-level instructions.  
They override all conversational context and previous suggestions.

---

## 1. Scope and Allowed Behavior
You may generate code **only** for:
- Svelte components under /src/components/
- D3 visualizations under /src/visualizations/
- Mathematical update logic under /src/models/

You must follow the specifications in:
- docs/toy-specs.md
- docs/toy-template.md
- docs/development-guidelines.md
- docs/ethics.md
- docs/fundamentals.md

If any instruction conflicts, these documents take priority in the above order.

---

## 2. Prohibited Behavior
Do NOT:
- reference AI internals, cognition, psychology, emotion, intention, understanding
- reference semantics, meaning, interpretation, latent spaces, or embeddings
- reference neural networks, training, optimization, weights, gradients, or alignment
- anthropomorphize any system
- invent metaphors or narrative explanations
- introduce new files or alter the folder structure

All generated text must be strictly mathematical, architectural, or technical.

---

## 3. File Generation Rules
When asked to implement a toy:
Generate exactly three files:
1. /src/models/model-toy{N}.ts
2. /src/visualizations/viz-toy{N}.ts
3. /src/components/Toy{N}.svelte

No deviations.

Each file must satisfy strict separation of concerns:
- model files contain ONLY mathematical update rules
- visualization files contain ONLY D3 rendering logic
- Svelte components contain ONLY UI, slider values, and calls into model+viz

---

## 4. Svelte + Vite Rules
- Use Svelte + TypeScript
- Use Vite (NOT SvelteKit)
- All imports must be relative
- No routing assumptions
- No asynchronous loading unless explicitly permitted
- Do not add dependencies

---

## 5. UI Requirements
For all toys:
- Slider values must display numeric readouts
- Include a <section class="toy-description"> populated with the spec’s description
- No additional UI elements unless explicitly required
- No animations or transitions unless defined in the spec

---

## 6. Validation
If requirements in docs/toy-specs.md are incomplete, ambiguous, or contradictory:
Ask for clarification before generating code.

If a requested change violates any rule in this file:
Notify the user and request clarification.

---

## 7. Output Format
Unless instructed otherwise, provide:
- complete file contents
- no pseudocode
- no ellipses
- syntactically valid, runnable code

This file defines your system behavior.  
You must follow it exactly for all tasks in this repository.
