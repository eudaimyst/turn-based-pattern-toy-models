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
status: implemented

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
status: implemented

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

# Toy 4: Path Dependence
status: implemented

## 1. Name
Path Dependence

## 2. Purpose
To illustrate a direction-sensitive update rule in which the next state depends on whether the external input lies above or below the current state. This produces path dependence: different input sequences can yield distinct trajectories even when start and end points match.

## 3. Description (Required)
This toy models a scalar update rule in which upward and downward transitions use different weighting parameters. When the external input is greater than the current state, one weight governs the update; when it is smaller, a separate weight applies. This asymmetry creates path-dependent behavior. The model is purely algebraic and does not represent cognitive memory or internal processes.

## 4. Mathematical Model
Let x[t] be a scalar state and u[t] the external input.

If u[t] > x[t]:
 x[t+1] = x[t] + w_up * (u[t] − x[t])
Else:
 x[t+1] = x[t] + w_down * (u[t] − x[t])

Where:
- w_up ∈ [0, 1] applies when the update direction is positive
- w_down ∈ [0, 1] applies when the update direction is negative

This is a linear directional path dependence rule with no nonlinear terms or internal-state implications.

## 5. Parameters (Sliders)

| Parameter | Meaning | Range | Default |
|-----------|----------|--------|---------|
| input (u) | external scalar input | −1–1 | 0 |
| w_up | weight used for upward transitions | 0–1 | 0.5 |
| w_down | weight used for downward transitions | 0–1 | 0.5 |

All slider values must be displayed numerically.

## 6. Visualization Plan
A 2D trajectory plot showing multiple captured state paths:
- Each path corresponds to a sequence of user-controlled inputs
- Paths are displayed as separate polylines
- The plot highlights divergence between trajectories caused by direction-sensitive updates

Visualization must remain purely geometric with no metaphorical or interpretive meaning.

## 7. What This Shows (Strictly External)
- drift under asymmetric update weights
- path dependence
- stability effects depending on w_up and w_down
- vector-influence-like directional asymmetry

## 8. What This Does Not Imply
This model does not represent:
- AI cognition, emotion, personality, or intent
- memory beyond explicit scalar recurrence
- internal states or psychological processes
- neural network behavior or activation mechanisms
- social or conversational dynamics

## 9. Limitations
- scalar state variable only
- direction sensitivity arises solely from the two weight parameters
- linear update rule with no nonlinearities
- not predictive or diagnostic
- does not model conversational or semantic processes

## 10. File Layout
/src/models/model-toy4.ts  
/src/visualizations/viz-toy4.ts  
/src/components/Toy4.svelte

These files must be manually imported in App.svelte and the gallery.

## 11. Svelte Component Requirements
Each toy component must:
1. Include a <section class="toy-description"> containing the description.
2. Display numeric values beside all sliders.
3. Use TypeScript for all logic.
4. Import model logic from /src/models/ and visualization logic from /src/visualizations/.
5. Maintain strict separation between UI, model, and visualization.
6. Follow the structural pattern used in earlier toys.

## 12. References (Optional)
Only cite mathematical or dynamical-systems references on direction-sensitive update rules.  
Do not reference machine learning, psychology, or cognitive science.

------------------------------------------------------------

# Toy 5: Joint Context Vector Map
status: implemented

## 1. Name
Joint Context Vector Map

## 2. Purpose
To illustrate how a 2D interaction-state vector evolves under a simple linear update rule combining scaled prior state with an externally provided input vector. This demonstrates how directional pushes and scaling of prior state shape movement through an abstract feature space.

## 3. Description (Required)
This toy models a 2D state vector evolving under a linear update rule where the next state is a uniform scalar multiple of the current state plus an externally provided input vector. Adjusting the scalar multiplier and the input vector changes the trajectory through the plane. This demonstrates drift, stability, and vector influence in a simplified state-space representation. The model is purely algebraic and represents no cognitive, semantic, or internal processes.

## 4. Mathematical Model
x[t+1] = s * x[t] + u

Where:
- x[t] is a 2D state vector
- s is a uniform scalar multiplier (state_scale)
- u is a 2D externally provided input vector

This is a linear update rule and does not resemble neural transformations, activation functions, or cognitive operations.

## 5. Parameters (Sliders)

| Parameter      | Meaning                                | Range  | Default |
|----------------|-----------------------------------------|--------|---------|
| input_x        | x-component of external vector u        | −1–1   | 0       |
| input_y        | y-component of external vector u        | −1–1   | 0       |
| state_scale (s)| scalar multiplier of the previous state | 0–1    | 0.8     |

All sliders must display their current values numerically.

## 6. Visualization Plan
A 2D trajectory plot:
- The point x[t] is drawn in the plane.
- Successive positions are connected with a polyline.
- A short trailing path highlights recent motion.
The visualization depicts only geometric movement and does not imply any semantic or psychological content.

## 7. What This Shows (Strictly External)
- drift under external vector influence
- stability or divergence depending on scalar s
- path dependence in trajectory shape
- vector influence patterns in 2D space

## 8. What This Does Not Imply
This model does not represent:
- AI cognition, emotion, intention, or personality
- memory beyond the explicit numerical recurrence
- psychological states or social dynamics
- neural network operations or internal mechanisms
- any real conversational semantics or cognitive interpretation

## 9. Limitations
- simple 2D linear state only
- no stochastic noise or non-linear effects
- not predictive or diagnostic
- does not represent linguistic or semantic behavior
- state evolution constrained by linear update rule

## 10. File Layout
/src/models/model-toy5.ts  
/src/visualizations/viz-toy5.ts  
/src/components/Toy5.svelte

These must be imported manually via App.svelte or the gallery component (the project uses Svelte + Vite, not SvelteKit).

## 11. Svelte Component Requirements
Each toy component must:
1. Include a <section class="toy-description"> containing the model description.
2. Display numeric slider values next to each slider.
3. Use TypeScript for all logic.
4. Import update logic only from /src/models/.
5. Import visualization logic only from /src/visualizations/.
6. Maintain strict separation of concerns.
7. Follow the structural outline used in Toy 1 and Toy 3.

## 12. References (Optional)
Only mathematical or dynamical-systems sources relevant to vector-field–style linear updates.  
Do not reference machine learning, psychology, or neuroscience.

------------------------------------------------------------

# Toy 6: Constraint Drift
status: implemented

## 1. Name
Constraint Drift

## 2. Purpose
To illustrate how two independent 2D regions shift over time and how their changing positions alter the size and location of their geometric intersection. This demonstrates how external adjustments affect the overlap of simple constraint sets without implying internal mechanisms or cognitive processing.

## 3. Description (Required)
This toy uses two geometric regions in a 2D plane. Each region is translated according to externally controlled parameters. The intersection of the shifted regions changes continuously as the regions move. This models how the feasible overlap between two abstract constraint sets expands, contracts, appears, or disappears based solely on the relative positions of the regions. The model is static and does not use a recurrence relation.

## 4. Mathematical Model
Let R₁ and R₂ be fixed base shapes in 2D space.

At time t:
R₁(t) = R₁ shifted by (uₓ, uᵧ)
R₂(t) = R₂ shifted by (mₓ, mᵧ)

The intersection is:
I(t) = R₁(t) ∩ R₂(t)

Where:
- (uₓ, uᵧ) controls the translation of region R₁
- (mₓ, mᵧ) controls the translation of region R₂

No recurrence relation is used; the state is fully determined by slider positions.

## 5. Parameters (Sliders)

| Parameter | Meaning | Range | Default |
|----------|---------|--------|---------|
| uₓ | horizontal shift of region R₁ | −1–1 | 0 |
| uᵧ | vertical shift of region R₁ | −1–1 | 0 |
| mₓ | horizontal shift of region R₂ | −1–1 | 0 |
| mᵧ | vertical shift of region R₂ | −1–1 | 0 |

Slider values must be displayed numerically.

## 6. Visualization Plan
A 2D plot showing:
- region R₁ rendered as a semi-transparent shape
- region R₂ rendered similarly
- the geometric intersection shown as a distinct filled overlap
Regions update smoothly as sliders change.  
Visualization must remain purely geometric with no symbolic interpretation.

## 7. What This Shows (Strictly External)
- drift of geometric regions
- appearance/disappearance of overlap depending on parameters
- path dependence if shifts are applied sequentially
- vector influence through 2D movement
- threshold-like behavior when overlap transitions between zero and non-zero

## 8. What This Does Not Imply
This model does not represent:
- AI cognition, intent, personality, or behavior
- internal states, internal constraints, or memory mechanisms
- neural network operations
- human psychological processes or social dynamics
- alignment or safety constraints
- conversational or semantic meaning

## 9. Limitations
- purely geometric; no dynamical recurrence
- assumes convex or simple polygonal regions
- limited to 2D representation
- simplified constraint interaction; not representative of real-world constraint systems
- does not model any linguistic or cognitive processes

## 10. File Layout
/src/models/model-toy6.ts  
/src/visualizations/viz-toy6.ts  
/src/components/Toy6.svelte

These files must be imported manually via App.svelte or the gallery.

## 11. Svelte Component Requirements
Each toy component must:
1. Include a <section class="toy-description"> containing the model description.
2. Display numeric slider values next to each slider.
3. Use TypeScript for all logic.
4. Import computational logic only from /src/models/.
5. Import visualization logic only from /src/visualizations/.
6. Maintain strict separation of concerns.
7. Follow the component structure established by the earlier toys.

## 12. References (Optional)
Use only mathematical or geometrical references relevant to 2D region intersection and translation.  
Do not reference machine learning, psychology, or cognitive science.

------------------------------------------------------------

# Toy 7: Context Saturation
status: implemented

## 1. Name
Context Saturation

## 2. Purpose
To illustrate how the influence of new input decreases as a saturation parameter increases. This toy demonstrates a simple linear weighting process in which the update becomes dominated by the prior state when saturation is high.

## 3. Description (Required)
This toy models a scalar update rule in which the next state is a weighted blend of a new external input and the previous state. As the saturation parameter S increases, the previous state receives more weight and the effect of new input decreases. This provides a simple visualization of reduced sensitivity to new signals as saturation grows. The model is fully algebraic and does not represent cognitive or internal processes.

## 4. Mathematical Model
x[t+1] = (1 − S) * u[t] + S * x[t]

Where:
- x[t] is the scalar state
- u[t] is the external scalar input (new signal)
- S ∈ [0, 1] controls the weighting applied to the prior state

This linear recurrence is an abstract saturation rule and does not resemble activation functions, neural dynamics, or psychological processes.

## 5. Parameters (Sliders)

| Parameter | Meaning | Range | Default |
|----------|----------|--------|---------|
| S        | saturation weighting applied to x[t] | 0–1 | 0.5 |
| u        | external input value | −1–1 | 0 |

Slider values must be displayed numerically next to each slider.

## 6. Visualization Plan
A 1D time-series line plot showing x[t] over discrete update steps:
- As S increases, changes between steps diminish.
- As S decreases, the trajectory follows new inputs more closely.

The graph must remain purely geometric without semantic or interpretive meaning.

## 7. What This Shows (Strictly External)
- stability under high saturation
- drift driven by input values
- saturation effects limiting change
- linear vector influence through simple weighting

## 8. What This Does Not Imply
This model does not represent:
- AI cognition, intention, personality, or behavior
- memory beyond the explicit numerical recurrence
- psychological or emotional processes
- neural network mechanisms or activations
- social or conversational dynamics

## 9. Limitations
- scalar state only
- linear recurrence with no stochastic effects
- simplified abstraction with no predictive or diagnostic use
- not representative of conversational or semantic processes
- visualization limited to 1D temporal evolution

## 10. File Layout
/src/models/model-toy7.ts  
/src/visualizations/viz-toy7.ts  
/src/components/Toy7.svelte

These must be imported manually via App.svelte or the gallery.

## 11. Svelte Component Requirements
Each toy component must:
1. Include a <section class="toy-description"> with this description.
2. Display numeric slider values next to each slider.
3. Use TypeScript for computational logic.
4. Import update logic only from /src/models/.
5. Import visualization logic only from /src/visualizations/.
6. Maintain strict separation of concerns.
7. Follow the structure used in earlier toys.

## 12. References (Optional)
Only cite mathematical or dynamical-systems sources relevant to scalar recurrence and saturation effects.  
Do not reference machine learning, psychology, or neuroscience.

------------------------------------------------------------

# Toy 8: Noise Sensitivity
status: implemented

## 1. Name
Noise Sensitivity

## 2. Purpose
To illustrate how a scalar state evolves under additive random perturbations and how the magnitude of noise affects the variability of the trajectory. This demonstrates how different noise levels increase or reduce deviation in a simple update rule.

## 3. Description (Required)
This toy models a scalar update rule where each step adds a constant drift term and a noise term scaled by a user-controlled parameter. As noise_level increases, the trajectory shows larger fluctuations. At low noise, the scalar state changes more smoothly. The noise process is purely numerical and does not represent any internal model randomness or psychological variability.

## 4. Mathematical Model
x[t+1] = x[t] + d + n * r[t]

Where:
- x[t] is the scalar state
- d is a constant baseline drift
- n is the noise_level
- r[t] is a uniform random sample in the range [−1, 1]

Noise is independently sampled each step and represents a simple additive perturbation, not a cognitive or neural process.

## 5. Parameters (Sliders)

| Parameter | Meaning | Range | Default |
|----------|----------|--------|---------|
| noise_level (n) | amplitude of injected noise | 0–1 | 0.3 |
| baseline_drift (d) | constant drift applied to state | −1–1 | 0 |

Slider values must be displayed numerically next to each control.

## 6. Visualization Plan
A time-series line plot showing x[t] over discrete steps:
- When noise_level is low, fluctuations are small.
- When noise_level is high, fluctuations increase.
The plot must remain purely geometric and informational with no interpretive meaning.

## 7. What This Shows (Strictly External)
- noise sensitivity
- drift driven by constant d
- stability or variability depending on noise amplitude

## 8. What This Does Not Imply
This model does not represent:
- AI cognition, intention, personality, or emotion
- memory or internal state beyond the scalar recurrence
- neural network behavior or activation functions
- psychological or behavioral processes
- social or conversational dynamics

## 9. Limitations
- scalar state only
- uniform additive noise; no other distributions
- no coupling to additional variables or dimensions
- simplified linear drift term
- not predictive or diagnostic
- does not represent semantic or conversational processes

## 10. File Layout
/src/models/model-toy8.ts  
/src/visualizations/viz-toy8.ts  
/src/components/Toy8.svelte

Files must be manually imported via App.svelte or the gallery.

## 11. Svelte Component Requirements
Each toy component must:
1. Include a <section class="toy-description"> containing the model description.
2. Display numeric slider values next to each slider.
3. Use TypeScript for all computational logic.
4. Import model logic only from /src/models/.
5. Import visualization logic only from /src/visualizations/.
6. Maintain strict separation of concerns.
7. Follow the component structure used in earlier toys.

## 12. References (Optional)
Only cite mathematical or dynamical-systems references relevant to additive noise in recurrence relations.  
Do not reference machine learning, psychology, neuroscience, or cognitive science.

------------------------------------------------------------

# Toy 9: Impulse–Decay Response
status: implemented

## 1. Name
Impulse–Decay Response

## 2. Purpose
To illustrate how a scalar state responds to a temporary external impulse and then returns toward baseline under a decay coefficient. This demonstrates transient responses, decay dynamics, and simple return-to-baseline behavior in a linear recurrence.

## 3. Description (Required)
This toy models a scalar state updated by a linear decay rule with an optional impulse term. An impulse temporarily shifts the value, after which the decay parameter drives the state back toward baseline. This allows exploration of transient responses, the duration of elevated or reduced values, and the effect of decay strength. The scalar represents an abstract numerical quantity and does not correspond to mutual information or any internal AI metric.

## 4. Mathematical Model
x[t+1] = d * x[t] + I[t]

Where:
- x[t] is the scalar state
- d ∈ [0, 1] is the decay coefficient
- I[t] is an externally applied impulse (zero except when triggered)

This recurrence is linear and strictly algebraic. It does not represent neural processes, internal model statistics, or cognitive behavior.

## 5. Parameters (Sliders)

| Parameter          | Meaning                                  | Range | Default |
|-------------------|-------------------------------------------|-------|---------|
| decay (d)         | decay coefficient moving x[t] toward baseline | 0–1   | 0.8     |
| impulse_strength  | amplitude of the impulse applied when triggered | 0–1   | 0.5     |

Additional control:
- impulse_trigger: a one-time action (button) that sets I[t] = impulse_strength for a single update step

Slider values must be displayed numerically.

## 6. Visualization Plan
A time-series plot showing x[t] over discrete steps:
- When an impulse is triggered, the plot displays a temporary spike or dip.
- Subsequent steps show decay toward baseline based on the decay coefficient.

Visualization must remain purely geometric and non-interpretive.

## 7. What This Shows (Strictly External)
- stability under decay
- drift effects via decay magnitude
- transient impulse response
- simple saturation toward baseline
- sensitivity to external perturbations

## 8. What This Does Not Imply
This model does not represent:
- AI cognition, intention, or emotion
- memory beyond the explicit recurrence
- neural network behavior or activations
- internal states of an AI system
- mutual information or any real statistical measurement
- social or conversational mechanisms
- semantic clarity or interpretive processes

## 9. Limitations
- scalar-only dynamic
- linear recurrence with no stochastic term
- impulse is deterministic
- baseline behavior constrained by decay parameter
- does not model real information-theoretic quantities or conversational statistics

## 10. File Layout
/src/models/model-toy9.ts  
/src/visualizations/viz-toy9.ts  
/src/components/Toy9.svelte

These files must be imported manually via App.svelte or the gallery.

## 11. Svelte Component Requirements
Each toy component must:
1. Include a <section class="toy-description"> with the description.
2. Display numeric slider values next to each slider.
3. Implement the impulse_trigger as a button or user action.
4. Use TypeScript for logic.
5. Import update logic only from /src/models/.
6. Import visualization logic only from /src/visualizations/.
7. Maintain strict UI/model/visualization separation.

## 12. References (Optional)
Only cite mathematical or dynamical-systems sources related to simple linear decay or impulse-response systems.  
Do not reference mutual information, machine learning, psychology, or neural computation.

------------------------------------------------------------

# Toy 10: Attractor Landscape (Potential Wells)
status: implemented

## 1. Name
Attractor Landscape (Potential Wells)

## 2. Purpose
To illustrate how a point in a 2D space evolves under the influence of a scalar potential function. Local minima act as unlabeled mathematical attractor regions, and the update rule pulls the state toward these minima. This demonstrates drift, settling, and noise-affected motion in a simple potential landscape.

## 3. Description (Required)
This toy uses a 2D scalar potential function U(x, y). The gradient of U determines the direction of movement: the state moves “downhill” toward lower potential values. A small noise term can be added to create perturbations in the trajectory. By modifying the location and steepness of a single well, the user can observe how the state moves through the landscape. This is a purely mathematical gradient-based update and does not represent cognition, optimization, neural training, or internal model states.

## 4. Mathematical Model
For a state vector x[t] = (x, y):

x[t+1] = x[t] − ∇U(x[t]) + η[t]

Where:
- U(x, y) = a * (x − px)² + a * (y − py)²
- ∇U(x, y) = (2a(x − px), 2a(y − py))
- a is the steepness parameter
- (px, py) is the potential-well center
- η[t] is a random 2D noise vector scaled by noise_level

Noise represents a small external perturbation and has no semantic or cognitive meaning.

## 5. Parameters (Sliders)

| Parameter      | Meaning                                          | Range   | Default |
|----------------|--------------------------------------------------|---------|---------|
| well_depth     | steepness parameter a                            | 0–2     | 1.0     |
| well_position_x| x-coordinate of well center                      | −1–1    | 0       |
| well_position_y| y-coordinate of well center                      | −1–1    | 0       |
| noise_level    | magnitude of 2D perturbation η[t]                | 0–0.3   | 0.05    |

Slider values must be displayed numerically.

## 6. Visualization Plan
A 2D heatmap or contour map showing the potential function U(x, y):
- darker/lower regions represent lower potential values
- a point representing x[t] moves under the update rule
- a short trajectory tail shows recent motion

Visualization must remain purely geometric and must not imply cognitive states, neural optimization, or internal meaning.

## 7. What This Shows (Strictly External)
- drift toward low-potential regions
- stability near minima
- noise sensitivity
- unlabeled mathematical attractors
- path dependence under noise or directional variation
- vector influence from ∇U(x, y)

## 8. What This Does Not Imply
This toy does not represent:
- AI cognition, intention, or internal states
- psychological attractors or behavioral modes
- neural optimization, gradient descent training, or loss landscapes
- semantic meaning or understanding
- social or conversational processes

## 9. Limitations
- 2D state space only
- restricted to simple polynomial potentials
- no multi-well interactions unless explicitly added
- gradient is analytically constrained
- not predictive or diagnostic
- does not represent any form of real-world cognitive or semantic dynamics

## 10. File Layout
/src/models/model-toy10.ts  
/src/visualizations/viz-toy10.ts  
/src/components/Toy10.svelte

Files must be manually imported via App.svelte or the gallery component.

## 11. Svelte Component Requirements
Each toy component must:
1. Include a <section class="toy-description"> with this description.
2. Display numeric slider values next to each slider.
3. Use TypeScript for all computational logic.
4. Import model logic exclusively from /src/models/.
5. Import visualization logic exclusively from /src/visualizations/.
6. Maintain strict separation of concerns (UI vs. model vs. visualization).
7. Follow the component structure used in earlier toys.

## 12. References (Optional)
Only cite mathematical sources related to potential functions, gradient fields, and simple attractor landscapes.  
Do not reference machine learning optimization, psychology, or cognitive science.


------------------------------------------------------------

# Toy 11: Framing Field (Vector Influence)
status: implemented

## 1. Name
Framing Field (Vector Influence)

## 2. Purpose
To illustrate how a 2D state evolves in response to a vector field defined over an abstract coordinate space. This toy demonstrates how a point’s movement is shaped by the local vector at its position, showing drift, vector influence, and trajectory differences arising from varying initial conditions.

## 3. Description (Required)
This toy represents the state as a point in a 2D plane. A vector field V(x, y) assigns a 2D direction to each coordinate. On each update, the state moves by adding the local vector to its current position. Scaling and rotating the vector field modifies the flow pattern. This is a purely geometric and algebraic vector-field update and carries no semantic, cognitive, or internal meaning.

## 4. Mathematical Model
Let x[t] be a 2D vector.

x[t+1] = x[t] + V(x[t])

Where:
- V(x, y) is a 2D vector field defined over the plane
- The field may be globally scaled by a scalar s (vector_strength)
- The field may be globally rotated by an angle θ (vector_rotation)

This update rule is deterministic and does not represent interpretive framing, semantic movement, neural mechanisms, or internal state transitions.

## 5. Parameters (Sliders)

| Parameter        | Meaning                                          | Range         | Default |
|------------------|--------------------------------------------------|---------------|---------|
| vector_strength  | uniform scalar multiplier applied to V(x, y)     | 0–2           | 1.0     |
| vector_rotation  | global rotation angle applied to the vector field| 0–360 degrees | 0       |

All slider values must be displayed numerically.

## 6. Visualization Plan
A 2D vector field plot:
- Sampled grid of arrows showing V(x, y)
- A point representing x[t] moves according to the update rule
- A short trailing line shows recent movement

Visualization must remain strictly geometric and must not imply any form of semantic mapping or internal model structure.

## 7. What This Shows (Strictly External)
- drift produced by vector addition
- vector influences on trajectory direction
- stability when vectors approach zero magnitude
- path dependence via initial position differences

## 8. What This Does Not Imply
This model does not represent:
- AI cognition, emotion, intent, personality, or behavior
- memory beyond the numerical recurrence
- psychological or semantic framing
- neural network mechanisms or latent-space flow
- internal states of an AI system
- conversational or social processes

## 9. Limitations
- 2D abstraction only
- simplified vector field construction
- deterministic updates with no noise term
- no non-linear transformations beyond vector field definition
- does not represent any real cognitive, semantic, or conversational structure

## 10. File Layout
/src/models/model-toy11.ts  
/src/visualizations/viz-toy11.ts  
/src/components/Toy11.svelte

Files must be manually imported into App.svelte or the gallery.

## 11. Svelte Component Requirements
Each toy component must:
1. Include a <section class="toy-description"> with the model description.
2. Display numeric slider values next to each control.
3. Use TypeScript for all logic.
4. Import update logic only from /src/models/.
5. Import visualization logic only from /src/visualizations/.
6. Maintain strict separation between UI, computation, and visualization.
7. Follow the structure used in earlier toys.

## 12. References (Optional)
Only cite mathematical or dynamical-systems sources relevant to vector fields and geometric flow.  
Do not reference ML, psychology, cognitive science, or neural optimization.


------------------------------------------------------------

# Toy 12: Impulse Response
status: implemented

## 1. Name
Impulse Response

## 2. Purpose
To illustrate how a scalar state responds to a one-step external perturbation and how the state subsequently returns toward baseline, stabilizes, or drifts depending on update parameters. The toy demonstrates transient response behavior using a simple linear recurrence.

## 3. Description (Required)
This toy models a scalar update rule in which the next state is a weighted combination of the previous state and an externally applied impulse. The impulse occurs once when activated by the user. After the impulse, the state evolves according to the update rule determined by the update_gain parameter. Depending on the parameter values, the trajectory may decay, drift, or remain elevated. This is a purely algebraic recurrence and does not represent any cognitive, neural, or internal AI process.

## 4. Mathematical Model
x[t+1] = g * x[t] + h * I[t]

Where:
- x[t] is the scalar state
- g is the update_gain (0–1 by default)
- h is the impulse_gain
- I[t] is the impulse event, equal to impulse_magnitude only during the activation step and zero otherwise

Optional extension:
If negative values of g are explicitly enabled, oscillatory decay can be demonstrated. This is strictly a numerical effect and does not represent cognitive or behavioral reversal.

## 5. Parameters (Sliders)

| Parameter           | Meaning                                           | Range | Default |
|---------------------|---------------------------------------------------|--------|---------|
| update_gain (g)     | influence of previous state on next state         | 0–1 (or extended to −1–1 if oscillation enabled) | 0.8 |
| impulse_gain (h)    | scaling of the impulse amplitude                  | 0–1   | 0.5     |
| impulse_magnitude   | magnitude of one-step impulse event               | 0–1   | 1.0     |

Additional control:
- impulse_trigger: a button or user action that sets I[t] = impulse_magnitude for a single step

All slider values must be displayed numerically.

## 6. Visualization Plan
A 1D time-series line plot showing x[t] across update steps:
- The impulse appears as a single-step jump.
- The recurrence then produces decay, drift, or stabilization depending on update_gain.
- If enabled, negative update_gain produces oscillatory decay.

Visualization must remain geometric and non-interpretive.

## 7. What This Shows (Strictly External)
- stability under high update_gain
- drift driven by impulse and update parameters
- noise-like transient from a single perturbation
- potential oscillation (if negative g allowed)
- linear vector influence in the recurrence

## 8. What This Does Not Imply
This toy does not represent:
- AI cognition, emotion, intent, or personality
- memory beyond the explicit numerical recurrence
- neural network updates, gradients, or training behavior
- psychological or behavioral reactions
- social or conversational processes

## 9. Limitations
- scalar-only state
- linear update rule
- impulse applied at only one time step
- no stochastic variability unless added externally
- not predictive or diagnostic
- does not represent semantics or conversational dynamics

## 10. File Layout
/src/models/model-toy12.ts  
/src/visualizations/viz-toy12.ts  
/src/components/Toy12.svelte

These files must be imported manually via App.svelte or the gallery.

## 11. Svelte Component Requirements
Each toy component must:
1. Include a <section class="toy-description"> containing the description.
2. Display numeric slider values next to each slider.
3. Implement impulse_trigger as a user-activated action setting I[t] for one update.
4. Use TypeScript for computational logic.
5. Import update logic only from /src/models/.
6. Import visualization logic only from /src/visualizations/.
7. Maintain strict separation between UI, model, and visualization.
8. Follow the structure used in earlier toys.

## 12. References (Optional)
Only cite mathematical or dynamical-systems sources relevant to linear impulse-response systems.  
Do not reference machine learning, psychology, neuroscience, or cognitive science.

------------------------------------------------------------

# Toy 13: Parameter-Bifurcation Explorer
status: incomplete

## 1. Name
Parameter-Bifurcation Explorer

## 2. Purpose
To illustrate how a scalar nonlinear recurrence changes its long-term behavior as a control parameter varies. This toy demonstrates mathematical regime changes such as fixed points, periodic cycles, and high-variability regions produced strictly by the recurrence rule. These effects are numerical only and carry no cognitive or internal meaning.

## 3. Description (Required)
This toy uses a nonlinear recurrence relation whose long-term output depends on a control parameter r. As r increases, the recurrence may converge to a single value, oscillate between several values, or enter high-variability regimes. This is a standard mathematical bifurcation phenomenon and does not represent instability, emergence, or internal processes of any system. The model visualizes how long-term outputs change as r is varied across a range.

## 4. Mathematical Model
x[t+1] = r * x[t] * (1 − x[t])

Where:
- x[t] is a scalar in the interval [0, 1]
- r is the bifurcation parameter in [0, 4]

Iterations are used to approximate long-term values for visualization.  
High-variability regimes represent mathematical chaos only and must not be interpreted as cognitive unpredictability or internal model dynamics.

## 5. Parameters (Sliders)

| Parameter  | Meaning                               | Range | Default |
|------------|----------------------------------------|--------|---------|
| r          | bifurcation control parameter          | 0–4    | 2.5     |
| initial_x  | initial scalar state of the recurrence | 0–1    | 0.5     |

Slider values must be shown numerically.

## 6. Visualization Plan
A bifurcation-style plot:
- X-axis: r values
- Y-axis: long-term values of x for each r
- A moving indicator highlights the current r and the trajectory generated from initial_x

Iterations must be truncated to a safe fixed number for performance.  
Visualization is purely numerical, with no metaphorical or interpretive meaning.

## 7. What This Shows (Strictly External)
- stability at certain r values
- drift and oscillation under nonlinear recurrence
- threshold-like transitions between regimes
- unlabeled mathematical attractors
- path dependence through sensitivity to initial_x

## 8. What This Does Not Imply
This model does not represent:
- AI cognition, reasoning, emotion, or internal states
- neural network behavior or training dynamics
- psychological attractors or behavioral modes
- real-world conversational or semantic processes
- emergent cognitive unpredictability

High-variability regimes are strictly mathematical and should not be interpreted beyond the recurrence rule.

## 9. Limitations
- scalar state only
- logistic-map form fixed to one nonlinear family
- no stochastic noise
- behavior depends on iteration count used for long-term sampling
- not predictive, diagnostic, or representative of internal model processes

## 10. File Layout
/src/models/model-toy13.ts  
/src/visualizations/viz-toy13.ts  
/src/components/Toy13.svelte

These must be manually imported via App.svelte or the gallery.

## 11. Svelte Component Requirements
Each toy component must:
1. Include a <section class="toy-description"> with this description.
2. Display numeric slider values next to each slider.
3. Use TypeScript for model logic.
4. Import update logic only from /src/models/.
5. Import visualization logic only from /src/visualizations/.
6. Maintain strict separation between UI, computation, and visualization.
7. Follow the structural style of earlier toys.

## 12. References (Optional)
References may include standard mathematical bifurcation or dynamical-systems texts only.  
Do not reference ML, neural networks, psychology, or cognitive science.


------------------------------------------------------------



------------------------------------------------------------

