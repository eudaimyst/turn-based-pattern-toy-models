// Stability vs Drift model
// Equation: x[t+1] = a * x[t] + b + N(0, sigma)
// Exports: Params, State, defaultParams, initState, update

export type Params = {
  a: number; // damping coefficient (0..1)
  b: number; // constant drift term
  sigma: number; // noise magnitude (stddev)
};

export type State = {
  x: number;
};

export const defaultParams: Params = {
  a: 0.8,
  b: 0.0,
  sigma: 0.05,
};

export function initState(x0 = 0): State {
  return { x: x0 };
}

// Simple RNG returning a standard normal using Box-Muller.
// Exported for testability; deterministic seeding not provided here.
export function randn(): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

export function update(state: State, params: Params): State {
  const noise = params.sigma * randn();
  const xNext = params.a * state.x + params.b + noise;
  return { x: xNext };
}
