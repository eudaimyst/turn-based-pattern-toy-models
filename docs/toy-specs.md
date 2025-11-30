# Toy Specifications File
# This file defines high-level specifications for each toy before implementation.
# Each toy block should be completed manually, then converted into the formal template prior to coding.

------------------------------------------------------------
# Toy 1: Stability vs Drift
status: implemented

## 1. Core Idea
This toy illustrates a scalar linear recurrence with additive Gaussian noise to show how a stability coefficient, a small constant drift term, and per-step noise influence the observable trajectory over time.

## 2. Formula
Implemented update rule (matching `src/models/model-stability-vs-drift.ts`):

x[t+1] = (1 - a) * x[t] + b + N(0, σ)

Notes: the form uses a linear recurrence and additive Gaussian noise (allowed forms). The implemented coefficient `a` is applied as a stability modifier using (1 - a) in the code; this specification reflects the current implementation.

## 3. User-Controlled Parameters
- a: stability coefficient. Range: [0.1, 1]. Default: 0.80. Controls how strongly the recurrence reduces deviations from baseline.
- b: constant drift term. Range: [-0.05, 0.05]. Default: 0.00. Adds a small directional bias per step.
- σ (sigma): noise standard deviation. Range: [0.02, 0.10]. Default: 0.05. Controls magnitude of additive Gaussian noise per update.

UI behavior (component): sliders render current numeric values with 2-decimal precision and update in real time. The `σ` label uses the Unicode character `σ` in the UI.

Additional runtime parameters (component-level, not exposed as main sliders):
- stepInterval: ms between update steps; implemented default 100 ms (10 steps/sec).
- history buffer length: implemented history capped at 200 samples for visualization.

## 4. Visualization
Time-series line chart implemented with D3 in `src/visualizations/viz-stability-vs-drift.ts`.
- Initialization: creates an SVG time-series plot, line path, and a neutral center guide line.
- Domain behavior: y-axis domain is fixed (initialized to [-1, 1]) to avoid auto-zooming on transient wiggles; x-axis advances with the history length.
- Rendering: the component passes the numeric history array to the viz `render(history)` function which updates the line path.

## 5. What This Shows
- Damping / stability effects as controlled by parameter `a`.
- Small constant drift introduced by `b` and its cumulative effect.
- Noise-driven variability and its effect on trajectory shape controlled by `σ`.
- Observable stability region and variance under different parameter settings.

## 6. What This Does Not Show
- No representation or implication of AI cognition, internal states, memory, intentions, emotion, or agency.
- No neural-network internals (no activations, no attention, no embeddings, no sigmoid/ReLU/etc.).
- No psychological, social, or behavioral interpretation.

## 7. Limitations
- Single scalar state only; no multi-dimensional or linguistic content modeled.
- Simplified linear recurrence (approximation) and additive noise; not predictive of real-world systems.
- Visualization is illustrative and not a diagnostic or predictive tool.

## 8. Notes (Optional)
- Component: `src/components/ToyStabilityVsDrift.svelte` implements UI, slider bindings (2-decimal display), update loop, and history buffer.
- Model: `src/models/model-stability-vs-drift.ts` implements `Params`, `State`, `defaultParams`, `initState()`, `update()` and a Box–Muller RNG for Gaussian noise.
- Visualization: `src/visualizations/viz-stability-vs-drift.ts` implements D3 initialization, `render(history)`, and a `destroy()` helper.

------------------------------------------------------------

# Toy 2: Coupling Strength
status: ready

## 1. Name
Coupling Strength

## 2. Purpose
To illustrate how the next state in a simple discrete-time signal is formed as a weighted combination of the current state and an external scalar input. This demonstrates how coupling strength affects sensitivity to external influence versus retention of prior state.

## 3. Mathematical Model
x[t+1] = (1 - k) * x[t] + k * u

Where:
- x[t] is the current scalar state.
- u is an externally provided scalar input.
- k ∈ [0, 1] determines the influence of u on the next state.

This equation is a linear blend and represents no cognitive, internal, or neural mechanism.

## 4. Parameters (Sliders)

| Parameter | Meaning | Range | Default |
|----------|---------|--------|---------|
| k        | coupling strength determining weighting between x[t] and u | 0–1 | 0.5 |
| u        | external scalar input (neutral, abstract quantity) | -1–1 | 0 |

All slider values must be displayed numerically next to the controls.

## 5. Visualization Plan
A 2D phase-style plot in which:
- The x-axis represents the current state x[t].
- The y-axis represents the external input u.
Successive (x[t], u) positions are connected to show the resulting trajectory of the update process. This visualization presents only the evolution of an abstract scalar state.

## 6. What This Shows (Strictly External)
- linear coupling strength
- stability under weighted blending
- drift toward or away from u depending on k
- vector influence in a simple linear form

## 7. What This Does Not Imply
- no AI cognition  
- no psychological states  
- no memory representation  
- no intention or agency  
- no neural network mechanisms  
- no emotion or interpretive processes  
- no social or conversational modeling  

## 8. Limitations
- scalar state only  
- strictly linear update rule  
- no noise, randomness, or multi-dimensional behavior  
- simplified abstraction, not representative of real conversations  
- 2D visualization of a 1D dynamic  

## 9. File Layout
/src/models/model-toy2.ts
/src/visualizations/viz-toy2.ts 
/src/components/Toy2.svelte 

## 10. References (Optional)
Only mathematical or dynamical systems references relevant to linear blending or weighted update rules. No references to ML, psychology, or neuroscience.

------------------------------------------------------------

# Toy 3: Oscillation (Damped)
status: ready

## 1. Core Idea
This toy illustrates how a two-variable discrete-time system behaves when one variable represents position-like state and the other represents a velocity-like update component. The mapping shows oscillatory or stabilizing trajectories depending on damping and stiffness. The purpose is to demonstrate how a signal can overshoot, oscillate, or converge toward a reference value based solely on linear dynamical parameters.

## 2. Formula
x[t+1] = x[t] + v[t]
v[t+1] = damping * v[t] + stiffness * (u - x[t])

Where:
- x[t] is the position-like scalar state
- v[t] is the velocity-like scalar state
- u is an externally controlled reference value
- damping ∈ [0, 1]
- stiffness ∈ [0, 2]

This is a linear damped-oscillator update rule and does not represent physical force, psychological dynamics, or neural mechanisms.

## 3. User-Controlled Parameters

| Parameter | Meaning | Range | Default |
|----------|---------|--------|---------|
| damping  | controls reduction of v[t] each step | 0–1 | 0.5 |
| stiffness | corrective influence pushing x[t] toward u | 0–2 | 1.0 |
| u (target) | external reference value | -1–1 | 0 |

Slider values must be displayed numerically next to each control.

## 4. Visualization
A 2D phase portrait in the (x, v) plane:
- x-axis: x[t]
- y-axis: v[t]
Successive points are connected to show trajectories that either oscillate or converge depending on the damping and stiffness parameters. Visualization uses only neutral geometric lines and points.

## 5. What This Shows (Strictly External)
- oscillation under linear update rules
- stability or divergence depending on parameters
- drift toward a reference value
- vector influence in a two-dimensional state space

## 6. What This Does Not Imply
- no AI cognition  
- no memory representation  
- no emotion or intentionality  
- no internal states of an AI system  
- no neural network dynamics  
- no psychological or behavioral interpretation  
- no social or conversational mechanisms  

## 7. Limitations
- two scalar state variables only  
- strictly linear corrections; no non-linear terms  
- no noise or perturbation effects  
- simplified, abstract dynamical structure  
- does not represent linguistic or conversational processes  

## 8. Notes (Optional)
None.

## 9. File Layout
/src/models/model-toy3.ts
/src/visualizations/viz-toy3.ts 
/src/components/Toy3.svelte 

## 10. References (Optional)
List only mathematical sources related to linear damped oscillators or discrete-time stability analysis. No references to ML, psychology, neuroscience, or cognitive science.

------------------------------------------------------------

# Toy 4: Hysteresis / Path Dependence
status: draft

## 1. Name
Hysteresis / Path Dependence

## 2. Purpose
To illustrate a direction-sensitive update rule in which the next state depends on both the current value and the recent directional input, producing path-dependent trajectories. This demonstrates how different sequences of external inputs yield different outputs even when start and end points match.

## 3. Description (Required)
This toy models a simple form of hysteresis in which the next state reflects both its prior value and a direction-like external input. The update rule blends the existing state with a direction input using a weighting parameter. Because the update depends on both magnitude and direction of prior changes, different input sequences produce distinct trajectories, even if they pass through the same points. This is a numerical illustration of path dependence, not a representation of cognitive memory or internal states.

## 4. Mathematical Model
For 1D:
x[t+1] = (1 − w) * x[t] + w * u[t]

Where:
- x[t] is the scalar state
- u[t] is an external direction input in the range [−1, 1]
- w is the path-weight parameter in the range [0, 1]

Optional 2D extension for visualization:
x[t+1] = (1 − w) * x[t] + w * uₓ[t]
y[t+1] = (1 − w) * y[t] + w * uᵧ[t]

The 2D version is only for visualization clarity and does not add conceptual complexity.  
No part of this model represents psychological momentum, internal intent, or persistence beyond the defined linear rule.

## 5. Parameters (Sliders)

| Parameter | Meaning | Range | Default |
|----------|---------|--------|---------|
| u        | external direction input | −1–1 | 0 |
| w        | path-weight parameter controlling influence of prior direction | 0–1 | 0.5 |

All sliders must display their current numeric values next to the controls.

## 6. Visualization Plan
A 2D trajectory plot comparing different sequences of directional inputs:
- Axes: (x, y) if using the 2D state; or (time, x) with multiple trajectories in 1D mode
- Each trajectory is displayed with a distinct neutral color
- Visualization emphasizes differences arising from different input paths

The plot must not imply emotion, mode switching, or internal cognitive states.

## 7. What This Shows (Strictly External)
- path dependence through weighted update rules
- drift based on direction history
- stability effects depending on w
- vector influence patterns (in 2D mode)

## 8. What This Does Not Imply
This model does not represent:
- AI cognition, emotion, intention, or personality
- psychological memory or internal state
- neural network activation or recurrence mechanisms
- social or conversational dynamics
- real human reasoning or behavior
- internal modes, shifting states, or latent structure

## 9. Limitations
- scalar or low-dimensional state only
- simplified linear weighting of historical direction
- no stochastic effects unless added explicitly
- does not reflect linguistic content or real conversational processes
- path dependence arises solely from the linear rule defined

## 10. File Layout
/src/models/model-toy4.ts  
/src/visualizations/viz-toy4.ts  
/src/components/Toy4.svelte

Files must be imported manually via the gallery or App.svelte.  
The project uses Svelte + Vite, not SvelteKit, so no file-based routing is available.

## 11. Svelte Component Requirements
Each toy component must:
1. Include a <section class="toy-description"> containing the model description.
2. Display numeric slider values beside each control.
3. Use TypeScript for all logic.
4. Import update logic solely from /src/models/.
5. Import visualization logic solely from /src/visualizations/.
6. Maintain strict separation of concerns.
7. Use a structural outline consistent with Toy 1 and Toy 3.

## 12. References (Optional)
Only cite mathematical or dynamical-systems sources relevant to hysteresis or path dependence.  
Do not reference machine learning, psychology, or neuroscience.

------------------------------------------------------------

