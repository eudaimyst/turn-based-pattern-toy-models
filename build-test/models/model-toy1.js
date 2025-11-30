export const defaultParams = {
    a: 0.8,
    b: 0.0,
    sigma: 0.05,
};
export function initState(x0 = 0) {
    return { x: x0 };
}
export function randn() {
    let u = 0, v = 0;
    while (u === 0)
        u = Math.random();
    while (v === 0)
        v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}
export function update(state, params) {
    const noise = params.sigma * randn();
    const xNext = (1 - params.a) * state.x + params.b + noise;
    return { x: xNext };
}
//# sourceMappingURL=model-toy1.js.map