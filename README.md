# Human–AI Interaction Dynamics Explorer

A collection of interactive toy models for visualizing abstract interaction patterns that arise during text-based human–AI exchanges.  
These models use simple mathematical constructs (recurrence relations, damping, noise, thresholds, potential fields) to illustrate stability, drift, saturation, and related dynamics.

The toy models:
- do not represent AI cognition
- do not represent human psychology
- do not simulate neural networks, activations, or internal model states
- do not describe emotion, identity, or intention
- do not model real-world social or political systems

They illustrate only **interaction-level behavior** at the level of input/output relations.

Documentation is located in:

- `docs/overview.md`
- `docs/development-guidelines.md`
- `docs/toy-template.md`

Source code for visualizations is located in `/src` (Svelte + D3).

Copilot Instructions

For all automated code assistance, see:

▶ COPILOT.md
 — full development constraints, guardrails, and module requirements for this repository.

This repository is intended for conceptual exploration and educational visualization.  
It is not a scientific modeling tool.

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