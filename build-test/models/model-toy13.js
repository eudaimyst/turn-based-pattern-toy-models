export function initState(initial_x = 0.5) {
  return { t: 0, x: initial_x };
}

export function step(state, r) {
  const nextX = r * state.x * (1 - state.x);
  return { t: state.t + 1, x: nextX };
}

export function iterate(state, r, n) {
  let s = { ...state };
  for (let i = 0; i < n; i++) s = step(s, r);
  return s;
}

export function sampleBifurcation(rValues, initial_x, warmup, samples) {
  const out = [];
  for (const r of rValues) {
    let s = initState(initial_x);
    for (let i = 0; i < warmup; i++) s = step(s, r);
    const vals = [];
    for (let j = 0; j < samples; j++) {
      s = step(s, r);
      vals.push(s.x);
    }
    out.push({ r: r, values: vals });
  }
  return out;
}
//# sourceMappingURL=model-toy13.js.map
