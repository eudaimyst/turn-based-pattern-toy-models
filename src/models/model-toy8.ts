export type ModelState = { t: number; value: number };

export function step(state: ModelState, input = 0, noise = 0): ModelState {
  // Placeholder: additive noise
  return { t: state.t + 1, value: state.value * 0.98 + input + noise };
}
