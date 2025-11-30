export const defaultParams = {
    k: 0.5,
    u: 0.0,
};
export function initState(x0 = 0) {
    return { x: x0 };
}
// Update rule: x[t+1] = (1 - k) * x[t] + k * u
export function update(state, params) {
    const xNext = (1 - params.k) * state.x + params.k * params.u;
    return { x: xNext };
}
export function step(state, input = 0) {
    // Placeholder: simple decay
    return { t: state.t + 1, value: state.value * 0.95 + input };
}
//# sourceMappingURL=model-toy2.js.map