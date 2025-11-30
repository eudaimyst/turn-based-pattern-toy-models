export type Params = {
  well_depth: number; // steepness parameter a
  well_position_x: number; // px
  well_position_y: number; // py
  noise_level: number;
};

export type State = {
  t: number;
  x: number;
  y: number;
};

export const defaultParams: Params = {
  well_depth: 1.0,
  well_position_x: 0,
  well_position_y: 0,
  noise_level: 0.05,
};

export function initState(x = 0, y = 0): State {
  return { t: 0, x, y };
}

// Simple Box-Muller gaussian RNG
function gaussianRandom(): number {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

/**
 * Pure update step following the spec:
 * x[t+1] = x[t] - ∇U(x[t]) + η
 * where U(x,y) = a*(x-px)^2 + a*(y-py)^2
 * ∇U = (2a(x-px), 2a(y-py))
 */
export function step(state: State, params: Params): State {
  const { well_depth: a, well_position_x: px, well_position_y: py, noise_level } = params;

  const alpha = 0.05; // step size (crucial for stability!)

  const gradX = 2 * a * (state.x - px);
  const gradY = 2 * a * (state.y - py);

  const noiseX = gaussianRandom() * noise_level;
  const noiseY = gaussianRandom() * noise_level;

  const nextX = state.x - alpha * gradX + noiseX;
  const nextY = state.y - alpha * gradY + noiseY;

  return { t: state.t + 1, x: nextX, y: nextY };
}
