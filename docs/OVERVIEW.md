# **Human–AI Interaction Dynamics Explorer**  
*A collection of mathematical toy models for visualizing surface-level patterns in text-based human–AI exchanges.*

---

## **Overview**

This repository presents a set of **interactive toy models** that visualize structural patterns which can appear in turn-based interactions — including stability, drift, saturation, noise sensitivity, vector influences, and nonlinear responses.

Each model is a **purely mathematical construct**, implemented as a small, self-contained recurrence or geometric rule.  
They are intended as **conceptual lenses** for exploring how simple update rules(algorithms) shape external patterns over time.

These models:

- **do not** represent AI cognition, thought, intention, preference, or internal state  
- **do not** represent human psychology, emotion, perception, or behavior  
- **do not** simulate neural networks, activations, embeddings, or transformer mechanisms  
- **do not** model social, political, or interpersonal systems  
- **do not** infer meaning, semantics, or mental processes  

Instead, they illustrate **patterns that can emerge at the level of interaction itself** — i.e., *the external shape of the input/output sequence*, independent of what either participant is doing internally.

The project’s scope is strictly limited to **mathematical visualization and conceptual clarification**.

---

## **Intended Audience**

This project is designed for:

- **Human–AI interaction researchers**  
- **Interaction design scholars**  
- **HCI educators**  
- **Dynamics / control theory / nonlinear systems instructors**  
- **Anyone studying structural patterns in iterative processes**  

It is *not* a modeling toolkit, diagnostic tool, or analytical instrument.  
It is a **didactic artifact**: a set of demonstrations that can help frame discussions about how patterns in turn-based interaction might be visualized **without importing psychological or mechanistic claims**.

---

## **What These Toys Are**

Each toy is:

- a simple recurrence relation, geometric rule, or discrete update  
- visualized in real time using D3  
- controlled by sliders so users can observe how structure changes under parametric variation  
- strictly bounded to external, observable mathematical patterns  

The models are intentionally low-dimensional and interpretable while remaining as abstract and free from misinterpretation as possible.  
They function similarly to classical didactic examples in:

- control theory  
- dynamical systems  
- information flow in iterative processes  
- vector-field visualization  
- stochastic perturbation models  
- nonlinear map behavior  

No toy makes assumptions or statements about cognitive, computational, psychological, or semantic content.

---

## **Documentation Structure**

All project documentation is located in the **`/docs`** directory.  
Key files include:

- **`OVERVIEW.md`** — High-level conceptual framing and scope.  
- **`ETHICS.md`** — Safety boundaries, non-claims, usage constraints.  
- **`TOYMODELS.md`** — Mathematical models used as a foundation for the toys.  
- **`NON-LINEARITY.md`** — Notes on where and why nonlinearities are used.  
- **`DEVELOPMENT-GUIDELINES.md`** — Architecture, constraints, and guardrails for extending the toys.  
- **`toy-template.md`** — Standardized specification for defining additional toys.  
- **`toy-specs.md` / `toy-descriptions.md`** — Complete listings of all toys and their description blocks.

Additional files (e.g., `FAQ.md`, `AUDIENCE.md`, `METHOD.md`) provide contextual framing and safety clarifications.

---

## Repository Structure
```
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
│   │   ├── Toy3.svelte
│   │   └── ... additional toy components
│   │
│   ├── models/              <-- pure mathematical model logic
│   │   ├── model-toy1.ts
│   │   └── ...
│   │
│   ├── visualizations/      <-- D3 visualization modules
│   │   ├── viz-toy1.ts
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
```
The system is intentionally modular: **each toy’s logic and visualization are fully isolated**, making it easy for researchers to inspect or modify specific demonstrations.

---

## **Development Tools**

The repository includes:

- **Svelte + Vite** for UI and app structure  
- **D3.js** for rendering  
- **TypeScript** for models  
- **COPILOT.md** outlining strict guardrails, constraints, and acceptable auto-generated contributions  

No part of the repository uses neural models or external inference.

---

## Build & Run Instructions

This repository uses **Node**, **Vite**, **Svelte**, and **D3**.  
No global installs are required; everything is managed through `npm`.

### 1. Prerequisites

You will need:
- Node (version 18+ recommended)
- npm (comes with Node)

To check:
```
node --version
npm --version
```

### 2. Install Dependencies

From the root of the repository:
```
npm install
```
This installs all Svelte, Vite, and visualization modules used by the project.

### 3. Run the Development Server

Start a local hot-reloading environment:
```
npm run dev
```
Vite will print a local address such as:
http://localhost:5173
Open that in a browser to explore the interactive toy models.

### 4. Build for Production (optional)

To generate the static build:
```
npm run build
```
This outputs the optimized production files to:
/dist

### 5. Preview the Production Build (optional)

```
npm run preview
```
This serves the built `/dist` directory on a local server so you can verify the final output.

### 6. File Structure (short version)

- `/src` --- Svelte components, mathematical models, D3 visualizations
- `/docs` --- project overview, ethical guidelines, toy specifications
- `/public` --- static assets
- `/dist` --- generated only after running `npm run build`

### 7. Notes

- No proprietary services, APIs, or authentication are required.
- The project runs entirely on local computation.
- All toy models are implemented as **pure mathematical modules** under `/src/models`.
- Visualizations are generated with D3 inside Svelte components.

---

## **Academic Context**

These toys may be useful for:

- illustrating surface-level interaction structure  
- clarifying misconceptions about patterns in human–AI exchange  
- teaching concepts in dynamical systems using intuitive examples  
- prompting discussion about how low-dimensional models differ from cognitive or computational mechanisms  
- demonstrating the distinction between **observable patterns** and **internal states**  

They are **not** intended as empirically predictive or diagnostically meaningful.

---

## **Scope and Non-Scope**

**In scope:**

- conceptual visualization  
- mathematical didactics  
- safe framing of interaction dynamics  
- interpretive scaffolding  

**Out of scope:**

- modeling human thought  
- modeling AI internal mechanisms  
- behavioral prediction  
- psychological interpretation  
- cognitive architectures  
- mental states, emotions, preferences, modes, etc.

---

## **License & Use**

This repository is offered for **research, education, and conceptual exploration**.  
All interpretations must remain strictly within the mathematical scope of the models.

If you reference or share this repository, please retain the ethical and clarity framing to avoid misinterpretation.

---

## **Contact / Collaboration**

If you are an academic researcher interested in examining or discussing the project, you are welcome to explore the docs or reach out with questions.  
The project is intentionally open-ended, modular, and transparent so that inspection is straightforward and assumptions remain explicit.
