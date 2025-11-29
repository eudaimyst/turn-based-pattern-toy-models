# Toy Model Template

This template defines the required structure and constraints for adding any new toy model to the repository. All content must follow the global project guardrails.

## 1. Name
Short, technical title (e.g., “Stability vs Drift”).

## 2. Purpose
One-sentence description of the interaction-level dynamic illustrated by the model, expressed in neutral mathematical terms.

## 3. Description (Required)
A concise, technical explanation of:
- the mathematical behavior represented by the model
- how the recurrence or potential function operates
- how the parameters influence stability, drift, thresholds, or other allowed behaviors
- what observable interaction patterns the visualization demonstrates
Do not include:
- metaphors
- narrative language
- psychological framing
- references to cognition, emotion, memory, or internal AI processes
This description will be displayed in the Svelte component in a dedicated <section> below the title.

## 4. Mathematical Model
Provide a minimal set of equations using only allowed forms:
- linear recurrence
- polynomial expressions
- piecewise thresholds (non-sigmoid)
- additive noise
- potential functions
- damped oscillation equations
- vector field expressions
Example format:
x[t+1] = a * x[t] + b + N(0, σ)

## 5. Parameters (Sliders)
Each parameter must specify:
| Parameter | Meaning | Range | Default |
|----------|---------|--------|---------|
| a        | damping coefficient | 0–1 | 0.8 |
| σ        | noise magnitude     | 0–1 | 0.1 |
Slider Display Requirement:
All sliders in the Svelte component must:
- render their current value numerically
- update the value in real-time as the slider moves
- use a simple, neutral UI pattern (e.g., “Parameter (value)”)
This enables testing, debugging, and verification of model behavior.

## 6. Visualization Plan
Describe the visualization using only neutral technical terminology:
- time-series chart
- 2D trajectory plot
- potential field contour
- vector field
- phase portrait
Do not include metaphors, narrative, or anthropomorphic framing.

## 7. What This Shows (Strictly External)
List only observable mathematical behaviors, such as:
- damping
- drift under noise
- threshold activation (non-sigmoid)
- stability region
- divergence
- oscillation

## 8. What This Does Not Imply
Mandatory section stating that the model does not represent:
- AI internal mechanisms
- cognition, emotion, intention, identity
- psychological or human traits
- memory or internal states
- neural network activation functions
- sociopolitical systems

## 9. Limitations
Examples:
- scalar state variable only
- simplified mathematical fit
- not predictive or diagnostic
- does not represent real linguistic content
- not tied to any internal AI or human processes

## 10. File Layout
List the files required for the new toy:
src/models/model-{name}.ts
src/visualizations/viz-{name}.ts
src/components/Toy{Name}.svelte

## 11. Svelte Component Requirements
Each toy component must:
1. Include a <section class="toy-description"> containing the model description.
2. Display all slider values next to their sliders.
3. Use TypeScript for all logic.
4. Keep model logic out of the component; import from /src/models/.
5. Keep visualization logic out of the component; import from /src/visualizations/.
6. Maintain strict separation of concerns.
Example structural outline:
<h2>Toy Name</h2>
<section class="toy-description">
  <!-- description text inserted here -->
</section>
<div class="controls">
  <!-- sliders showing current values -->
</div>
<div bind:this={container} class="visualization"></div>

## 12. References (Optional)
Cite only mathematical or dynamical-systems sources. Do not reference machine learning, psychology, or neuroscience.
