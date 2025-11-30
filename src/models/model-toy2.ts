import type { Params as BaseParams, State as BaseState } from '../lib/types';

// Toy 2 specific types
export type Params = {
  k: number; // coupling strength (0..1)
  u: number; // external scalar input (-1..1)
};

export type State = {
  x: number;
};

export const defaultParams: Params = {
  k: 0.5,
  u: 0.0,
};

export function initState(x0 = 0): State {
  return { x: x0 };
}

// Update rule: x[t+1] = (1 - k) * x[t] + k * u
export function update(state: State, params: Params): State {
  const xNext = (1 - params.k) * state.x + params.k * params.u;
  return { x: xNext };
}
export type ModelState = { t: number; value: number };

export function step(state: ModelState, input = 0): ModelState {
  // Placeholder: simple decay
  return { t: state.t + 1, value: state.value * 0.95 + input };
}
