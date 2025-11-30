export type ModelState = { t: number; value: number };

export function step(state: ModelState, input = 0): ModelState {
  // Placeholder: path-dependent update
  return { t: state.t + 1, value: state.value + (input > 0 ? 0.1 : -0.05) };
}
