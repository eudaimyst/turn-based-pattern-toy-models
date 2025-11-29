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
- a: stability coefficient. Range: [0, 1]. Default: 0.80. Controls how strongly the recurrence reduces deviations from baseline.
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

# Toy 2: Threshold Response
status: draft

## 1. Core Idea
This toy illustrates how a piecewise linear mapping can produce abrupt changes in output when an input crosses a defined threshold. The model shows how partitioning the input domain into linear segments can generate discontinuities or sharp transitions without implying internal modes, states, or cognition. Its purpose is to demonstrate how continuous input variation can yield discontinuous or sharply changing output strictly through algebraic mapping.

## 2. Formula
Hard threshold:
y[x] = k1 * x + b1    for x < T
y[x] = k2 * x + b2    for x ≥ T

Optional linear blend zone of width Δ:
If |x - T| < Δ:
    α = (x - (T - Δ)) / (2Δ)
    y = (1 - α)*(k1*x + b1) + α*(k2*x + b2)
Else:
    apply hard threshold version

The mapping is strictly algebraic. The blend region is linear and must not resemble or approximate sigmoid-like or neural activation curves.

## 3. User-Controlled Parameters
- T (threshold): boundary dividing the two linear segments. Range: e.g., [-1, 1] or [0, 1].
- k1 (slope for Segment 1): slope for x < T. Range: [-3, 3].
- k2 (slope for Segment 2): slope for x ≥ T. Range: [-3, 3].
- b1 (offset for Segment 1): vertical intercept for x < T. Range: [-1, 1].
- b2 (offset for Segment 2): vertical intercept for x ≥ T. Range: [-1, 1].
- Δ (blend zone width): linear transition width. Range: [0, 0.2]. Δ = 0 yields a sharp transition.

## 4. Visualization
Piecewise mapping plot:
- X-axis: input x
- Y-axis: output y
- Two linear segments meeting at threshold T
- Optional highlighted linear blend region when Δ > 0
- No symbolic or interpretive graphics

## 5. What This Shows
- Piecewise linear mapping across a threshold
- Sudden changes in output due to domain partitioning
- Sharp transitions or discontinuities
- Sensitivity to input values near the threshold
- Coexistence of two linear mapping segments with explicit switching

## 6. What This Does Not Show
- AI cognition, internal states, memory, emotion, or intent
- Mode switching in AI systems
- Neural activation functions or transformer mechanisms
- Human psychological states or interpretive shifts
- Alignment, bias, or social dynamics
- Any mechanism of real conversational processes

## 7. Limitations
- Single scalar input only
- Static algebraic mapping with no temporal evolution
- Simplified abstraction with no predictive or diagnostic use
- Visualization clarity depends on parameter ranges
- Not representative of linguistic, conversational, or cognitive processes

## 8. Notes (Optional)
- Pure algebraic function with no simulation state.
- Linear blend zone maintained for clarity and to avoid resemblance to neural activations.
- Parameter ranges should remain within defined bounds.
- File structure should mirror Toy 1 (separate model, visualization, and Svelte component).
------------------------------------------------------------
