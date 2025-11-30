/**
 * Toy 3 Model: Oscillation (Damped)
 *
 * Implements the discrete-time linear damped-oscillator update rule from
 * docs/toy-specs.md:
 *
 * x[t+1] = x[t] + v[t]
 * v[t+1] = damping * v[t] + stiffness * (u - x[t])
 *
 * This module contains ONLY pure mathematical update logic. No DOM or
 * visualization code.
 */
export const defaultParams = {
    damping: 0.5,
    stiffness: 1.0,
    u: 0,
};
export function initState(x = 0, v = 0) {
    return { x, v };
}
/**
 * Compute one discrete update step of the damped oscillator.
 * Pure function: returns a new State based on the provided state and params.
 */
export function update(state, params) {
    const nextX = state.x + state.v;
    const nextV = params.damping * state.v + params.stiffness * (params.u - state.x);
    return { x: nextX, v: nextV };
}
//# sourceMappingURL=model-toy3.js.map