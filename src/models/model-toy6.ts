export type ModelState = { t: number; value: number };

export function step(state: ModelState, input = 0): ModelState {
  // Placeholder: slow constraint drift
  return { t: state.t + 1, value: state.value + 0.01 + input * 0.001 };
}
