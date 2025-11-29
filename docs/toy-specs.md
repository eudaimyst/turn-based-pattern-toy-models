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

<!-- Toy 2 (Threshold Response) removed from the project. -->
------------------------------------------------------------
