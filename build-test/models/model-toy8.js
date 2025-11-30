/**
 * Toy 8 Model: Noise Sensitivity
 * Implements the scalar recurrence from docs/toy-specs.md:
 *
 *   x[t+1] = x[t] + d + n * r[t]
 *
 * where r[t] ~ Uniform(-1, 1)
 * This module contains ONLY pure mathematical update logic.
 */
export const defaultParams = {
    noise_level: 0.3,
    baseline_drift: 0,
};
export function initState(x = 0, t = 0) {
    return { t, x };
}
function uniformRandomMinusOneToOne() {
    return Math.random() * 2 - 1;
}
/**
 * Pure update function implementing the recurrence.
 * - state: current State
 * - params: Params
 * Returns a new State object (no side effects).
 */
export function update(state, params) {
    const n = Math.max(0, Math.min(1, params.noise_level));
    const d = Math.max(-1, Math.min(1, params.baseline_drift));
    const r = uniformRandomMinusOneToOne();
    const nextX = state.x + d + n * r;
    const bounded = Math.max(-1, Math.min(1, nextX));
    return { t: state.t + 1, x: bounded };
}
export function step(state, input = 0, noise = 0) {
    // Placeholder: additive noise
    return { t: state.t + 1, value: state.value * 0.98 + input + noise };
}
//# sourceMappingURL=model-toy8.js.map