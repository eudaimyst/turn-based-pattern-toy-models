# Project Overview

## Purpose
This project provides a suite of interactive toy models that visualize simplified interaction dynamics in human–AI text exchanges.  
The goal is to illustrate observable patterns such as stability, drift, thresholds (non-NN), saturation, coupling, noise sensitivity, and related phenomena.

These are mathematical abstractions, not psychological or cognitive models.

## Scope

### In-Scope
- Mathematical recurrence relations
- Simple non-linear constructs not associated with neural networks
- Noise-driven variability
- Threshold behaviors implemented without sigmoids or NN activations
- Potential-field attractors
- Damped oscillators
- Vector-field framing influences
- Joint context effects treated as abstract state variables

### Out-of-Scope
- Neural network internals (activation functions, attention, embeddings)
- Psychological inference
- Emotion, identity, intentionality, agency
- Memory or internal state modeling
- AI interpretability or mechanistic claims
- Alignment, bias, safety modeling
- Sociopolitical system simulations

## Global Guardrails
All models must follow:

1. No implication of AI cognition or internal state.
2. No anthropomorphism.
3. No psychological framing.
4. No neural network math or functions (ReLU, sigmoid, tanh, softmax, GELU).
5. No mechanisms associated with cognitive science or affective modeling.
6. Clear limitations sections for each toy model.
7. Visualization choices must not suggest mind-like processes.
8. All variables represent abstract scalars only.

## Canonical Definitions

**Interaction Dynamics**  
Observable input → output patterns from sequential text exchanges.

**Joint Context**  
Shared text history considered as an abstract variable.

**Coupled Behavior**  
Two state variables influencing each other via simple update rules.

**State Influence**  
Effect of one step’s input on the next state.

**Interpretive Framing**  
User-side interpretive effect acknowledged but not modeled.

**Toy Model**  
A simplified mathematical construct illustrating an interaction pattern.

## Toy Models Included

1. Stability vs Drift  
2. Threshold Response (non-NN)  
3. Context Saturation  
4. Coupling Strength  
5. Noise Sensitivity  
6. Attractor Landscape (abstract potential wells)  
7. Hysteresis / Path Dependence  
8. Oscillation (damped)  
9. Framing Field (vector influences)  
10. Joint Context Vector Map  

Each toy model includes:
- equation
- slider definitions
- visualization plan
- behavior description
- non-implication list
- limitations

## Allowed Non-Linearity
- Linear damping  
- Polynomial expressions  
- Piecewise thresholds (non-sigmoid)  
- Basic recurrence relations  
- Random noise  
- Potential-field wells  
- Damped oscillators  

## Forbidden Non-Linearity
- Sigmoid or NN-adjacent functions  
- ReLU, GELU, tanh, softmax  
- Chaos systems suggesting internal complexity  
- Bifurcation cascades  
- Hopfield-like attractors  
- Emotion-like curves  
- Cognitive-process analogs

The mathematical behavior must be interpretable purely as an external abstraction.

## Audience
- Developers exploring interaction visualization
- Individuals studying simple dynamical systems in conversational settings
- Educators teaching feedback and stability concepts

Not intended for:
- psychological assessment  
- AI alignment research  
- neural network mechanistic study  
- social modeling  

## Repository Structure
/
├── docs/
│   ├── overview.md
│   ├── development-guidelines.md
│   ├── toy-template.md
│   ├── toy-specs.txt        <-- human-authored specifications for each toy
│   └── additional documentation files
│
├── src/
│   ├── main.ts              <-- Vite entry point
│   ├── App.svelte           <-- root component, loads Gallery or selected Toy
│   │
│   ├── components/
│   │   ├── Gallery.svelte   <-- manually created home page listing all toys
│   │   ├── Toy1.svelte
│   │   ├── Toy2.svelte
│   │   ├── Toy3.svelte
│   │   └── ... additional toy components
│   │
│   ├── models/              <-- pure mathematical model logic
│   │   ├── model-toy1.ts
│   │   ├── model-toy2.ts
│   │   └── ...
│   │
│   ├── visualizations/      <-- D3 visualization modules
│   │   ├── viz-toy1.ts
│   │   ├── viz-toy2.ts
│   │   └── ...
│   │
│   └── lib/                 <-- shared utilities, types, helpers
│
├── public/                  <-- static assets
│
├── index.html               <-- root HTML for Vite
├── package.json
├── vite.config.js
└── svelte.config.js

The project uses Svelte with Vite as the build system. It does not use SvelteKit.
Routing and navigation must be implemented manually using standard Svelte component composition.
