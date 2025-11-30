/**
 * Toy 7 Model: Context Saturation
 * Implements the scalar recurrence defined in docs/toy-specs.md:
 *
 *   x[t+1] = (1 - S) * u[t] + S * x[t]
 *
 * This module contains ONLY pure mathematical update logic. No DOM or
 * visualization code. All state is explicit.
 */
export const defaultParams = {
    S: 0.5,
};
export function initState(x = 0, t = 0) {
    return { t, x };
}
/**
 * Pure update function implementing the recurrence.
 * - state: current State
 * - params: Params containing S
 * - input: external scalar input u[t]
 * Returns a new State object (no side effects).
 */
export function update(state, params, input = 0) {
    const S = Math.max(0, Math.min(1, params.S));
    const nextX = (1 - S) * input + S * state.x;
    // keep values bounded to spec range [-1,1]
    const bounded = Math.max(-1, Math.min(1, nextX));
    return { t: state.t + 1, x: bounded };
}
//# sourceMappingURL=model-toy7.js.map