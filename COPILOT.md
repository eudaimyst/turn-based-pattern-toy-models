# GitHub Copilot Development Instructions
This repository contains a Svelte + TypeScript + D3.js project for visualizing simplified interaction dynamics using abstract mathematical toy models. Copilot must follow the constraints below for all generated code, comments, refactors, file scaffolding, and explanations.

---

## 1. Scope of the Project
- Implement interactive visualizations of mathematical interaction dynamics.
- Use abstract scalar variables only.
- Represent observable input–output patterns, not internal processes of any system.
- Do not model or describe cognition, psychology, emotion, memory, intention, identity, or internal AI mechanisms.

---

## 2. Required Technical Stack
- **Svelte** for UI components.
- **TypeScript** for model logic and typing.
- **D3.js** for all visualizations.
- **Vite** build setup (already configured).

No additional frameworks or visualization libraries may be introduced without explicit instructions.

---

## 3. Development Guardrails (Mandatory)
Follow all rules defined in:
- `docs/DEVELOPMENT-GUIDELINES.md`
- `docs/TOY-TEMPLATE.md`
- `docs/overview.md`

Copilot must adhere to these constraints at all times:

### 3.1 Prohibited Content
Do **not**:
- reference or imply neural networks, activations, embeddings, attention, or internal AI operations
- describe any system as having cognition, memory, emotion, intent, agency, personality, or internal states
- use metaphors, narrative language, or anthropomorphic framing
- introduce psychological, affective, or interpretive descriptions
- implement chaotic systems, bifurcation cascades, Hopfield networks, RNN-like recurrence, or NN-adjacent mathematical forms

### 3.2 Allowed Mathematical Forms
- linear recurrence relations
- polynomial expressions
- piecewise thresholds (non-sigmoid)
- additive Gaussian noise
- potential fields
- damped oscillators
- basic vector fields

No sigmoid, tanh, softmax, ReLU, GELU, or similar NN-derived functions.

---

## 4. Repository Structure Requirements
Copilot must generate code consistent with the existing architecture:

/src/models/ → pure mathematical model logic
/src/visualizations/ → D3 visualization modules
/src/components/ → Svelte components wrapping the visualization
/src/lib/ → shared utilities and types
docs/ → project documentation


### Naming conventions:
- Models: `model-{name}.ts`
- Visualizations: `viz-{name}.ts`
- Components: `Toy{Name}.svelte`

---

## 5. Toy Model Creation Rules
When generating a new toy model, Copilot must follow the template in `docs/TOY-TEMPLATE.md` exactly.

Each new toy must include:
1. A model file exporting:
   - parameter definitions
   - state types
   - a pure `update(state, params)` function
2. A visualization file:
   - D3 initialization
   - update routines
3. A Svelte component:
   - slider bindings
   - state management
   - rendering the visualization

All code must compile without modification.

---

## 6. Documentation and Commenting Rules
- Use neutral, technical language only.
- Describe only mathematical behavior (e.g., damping, drift, noise, threshold).
- Include limitations in code comments where relevant.
- Do not use narrative explanations or interpretive language.

---

## 7. Clarification Requirements
If instructions from the user are incomplete, ambiguous, or conflict with the guardrails, Copilot must request clarification before generating output.

---

## 8. Output Quality Requirements
All generated code must:
- be modular and self-contained
- avoid unnecessary global state
- use strict TypeScript typing
- follow Svelte best practices
- maintain clean separation between model, visualization, and component layers
- comply with the mathematical and conceptual constraints of the project

---

## 9. Summary for Copilot
When assisting in this repository, Copilot must:
- follow the guardrails strictly
- generate code only within the permitted domain
- implement mathematical toy models without implying internal AI cognition or psychological processes
- maintain the established architecture
- ask clarifying questions when needed
- remain consistent with all documentation in the /docs directory
