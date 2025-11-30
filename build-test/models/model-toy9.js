/**
 * Toy 9 Model: Impulse–Decay Response
 * Implements the scalar recurrence from docs/toy-specs.md:
 *
 *   x[t+1] = d * x[t] + I[t]
 *
 * where d in [0,1] is the decay coefficient and I[t] is an externally applied impulse (zero except when triggered).
 * This module contains ONLY pure mathematical update logic.
 */
export const defaultParams = {
    decay: 0.8,
    impulse_strength: 0.5,
};
export function initState(x = 0, t = 0) {
    return { t, x };
}
/**
 * Pure update function implementing the recurrence.
 * - state: current State
 * - params: Params (decay used here)
 * - impulse: number applied at this step (I[t])
 * Returns a new State object (no side effects).
 */
export function update(state, params, impulse = 0) {
    const d = Math.max(0, Math.min(1, params.decay));
    const I = impulse;
    const nextX = d * state.x + I;
    // keep values bounded to [-1, 1] for visualization stability
    const bounded = Math.max(-1, Math.min(1, nextX));
    return { t: state.t + 1, x: bounded };
}
export function step(state, input = 0) {
    // convenience wrapper for simple stepping in visualizations/tests
    const next = state.value * 0.9 + input;
    return { t: state.t + 1, value: next };
}
//# sourceMappingURL=model-toy9.js.map