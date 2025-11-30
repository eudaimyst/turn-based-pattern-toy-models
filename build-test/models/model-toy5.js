/**
 * Toy 5 Model: Joint Context Vector Map
 *
 * Implements the linear 2D update rule from docs/toy-specs.md:
 *
 * x[t+1] = s * x[t] + u
 *
 * where x is a 2D vector and u is an external 2D input vector.
 * This module contains ONLY pure mathematical update logic.
 */
export const defaultParams = {
    state_scale: 0.8,
};
export function initState(x = 0, y = 0) {
    return { x, y };
}
/**
 * Pure update: given current state and params, and an external input vector `u`,
 * return the next state according to the linear rule x[t+1] = s * x[t] + u.
 */
export function update(state, params, input = { x: 0, y: 0 }) {
    const nextX = params.state_scale * state.x + input.x;
    const nextY = params.state_scale * state.y + input.y;
    return { x: nextX, y: nextY };
}
//# sourceMappingURL=model-toy5.js.map