export type Params = {
  r: number; // bifurcation control parameter (0..4)
  initial_x: number; // initial state in [0,1]
};

export type State = {
  t: number;
  x: number; // current scalar state in [0,1]
};

export const defaultParams: Params = {
  r: 2.5,
  initial_x: 0.5,
};

export function initState(initial_x = 0.5): State {
  return { t: 0, x: initial_x };
}

/**
 * Pure logistic map step:
 * x[t+1] = r * x[t] * (1 - x[t])
 * The function is pure and has no side effects.
 */
export function step(state: State, r: number): State {
  const nextX = r * state.x * (1 - state.x);
  return { t: state.t + 1, x: nextX };
}

/**
 * Iterate the logistic map for n steps starting from given state and r.
 * Returns the final state after n steps.
 */
export function iterate(state: State, r: number, n: number): State {
  let s = { ...state };
  for (let i = 0; i < n; i++) {
    s = step(s, r);
  }
  return s;
}

/**
 * Sample long-term values for a list of r values.
 * For each r in rValues, the map is iterated `warmup` steps to remove transients,
 * then `samples` further iterations are recorded. The function returns an array
 * of objects { r, values } where values is a numeric array of sampled x values.
 *
 * This is a pure computational helper used by the visualization; it performs no IO.
 */
export function sampleBifurcation(rValues: number[], initial_x: number, warmup: number, samples: number): { r: number; values: number[] }[] {
  const out: { r: number; values: number[] }[] = [];
  for (const r of rValues) {
    let s: State = initState(initial_x);
    // warmup iterations
    for (let i = 0; i < warmup; i++) s = step(s, r);
    const vals: number[] = [];
    for (let j = 0; j < samples; j++) {
      s = step(s, r);
      vals.push(s.x);
    }
    out.push({ r, values: vals });
  }
  return out;
}
