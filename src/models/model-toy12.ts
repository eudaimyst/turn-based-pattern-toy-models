// Toy 12: Impulse Response - model
// Pure mathematical update logic only. No DOM or side effects.

export type Params = {
  update_gain: number; // g
  impulse_gain: number; // h
  impulse_magnitude: number; // magnitude when triggered
};

export type State = {
  x: number; // scalar state at current time t
};

export const defaultParams: Params = {
  update_gain: 0.8,
  impulse_gain: 0.5,
  impulse_magnitude: 1.0,
};

export function initState(initialX = 0): State {
  return { x: initialX };
}

// update: pure function computing next state
// impulseTriggered: boolean indicating whether I[t] == impulse_magnitude for this step
export function update(state: State, params: Params, impulseTriggered: boolean): State {
  const g = params.update_gain;
  const h = params.impulse_gain;
  const I = impulseTriggered ? params.impulse_magnitude : 0;
  const nextX = g * state.x + h * I;
  return { x: nextX };
}

// small helper to apply a sequence of steps given an array of impulse booleans
export function simulate(initialState: State, params: Params, impulses: boolean[], steps?: number): State[] {
  const history: State[] = [];
  let s = { ...initialState };
  const n = steps ?? impulses.length;
  for (let t = 0; t < n; t++) {
    const triggered = impulses[t] ?? false;
    s = update(s, params, triggered);
    history.push({ ...s });
  }
  return history;
}
export type ModelState = { t: number; value: number };

export function step(state: ModelState, impulse = 0): ModelState {
  // Placeholder: impulse response
  return { t: state.t + 1, value: state.value * 0.8 + impulse };
}
