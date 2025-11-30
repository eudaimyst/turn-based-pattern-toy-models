export type ModelState = { t: number; value: number };

export function step(state: ModelState, impulse = 0): ModelState {
  // Placeholder: impulse response
  return { t: state.t + 1, value: state.value * 0.8 + impulse };
}
