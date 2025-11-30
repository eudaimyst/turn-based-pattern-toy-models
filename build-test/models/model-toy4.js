/**
 * Toy 4 Model: Path Dependence
 *
 * Implements the linear path-dependent update rule from docs/toy-specs.md:
 * x[t+1] = (1 - w) * x[t] + w * u[t]
 *
 * This module contains ONLY pure mathematical update logic. No DOM or
 * visualization code. All state and parameters are explicit scalars.
 */
export const defaultParams = {
    u: 0,
    w_up: 0.5,
    w_down: 0.5,
};
export function initState(x = 0) {
    return { x };
}
/**
 * Direction-sensitive hysteresis update (scalar):
 * If u > x: x[t+1] = x[t] + w_up * (u - x[t])
 * Else:     x[t+1] = x[t] + w_down * (u - x[t])
 * Pure function with explicit scalars.
 */
export function update(state, params) {
    const delta = params.u - state.x;
    const weight = params.u > state.x ? params.w_up : params.w_down;
    const nextX = state.x + weight * delta;
    return { x: nextX };
}
//# sourceMappingURL=model-toy4.js.map