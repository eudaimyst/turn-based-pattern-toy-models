/**
 * Toy 8 Model: Noise Sensitivity
 * Implements the scalar recurrence from docs/toy-specs.md:
 *
 *   x[t+1] = x[t] + d + n * r[t]
 *
 * where r[t] ~ Uniform(-1, 1)
 * This module contains ONLY pure mathematical update logic.
 */

export type Params = {
  noise_level: number; // n in [0,1]
  baseline_drift: number; // d in [-1,1]
};

export type State = {
  t: number;
  x: number; // scalar state
};

export const defaultParams: Params = {
  noise_level: 0.3,
  baseline_drift: 0,
};

export function initState(x = 0, t = 0): State {
  return { t, x };
}

function uniformRandomMinusOneToOne(): number {
  return Math.random() * 2 - 1;
}

/**
 * Pure update function implementing the recurrence.
 * - state: current State
 * - params: Params
 * Returns a new State object (no side effects).
 */
export function update(state: State, params: Params): State {
  const n = Math.max(0, Math.min(1, params.noise_level));
  const d = Math.max(-1, Math.min(1, params.baseline_drift));
  const r = uniformRandomMinusOneToOne();
  const nextX = state.x + d + n * r;
  const bounded = Math.max(-1, Math.min(1, nextX));
  return { t: state.t + 1, x: bounded };
}
export type ModelState = { t: number; value: number };

export function step(state: ModelState, input = 0, noise = 0): ModelState {
  // Placeholder: additive noise
  return { t: state.t + 1, value: state.value * 0.98 + input + noise };
}
