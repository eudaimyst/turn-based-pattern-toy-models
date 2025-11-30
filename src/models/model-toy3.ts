export type ModelState = { t: number; value: number };

export function step(state: ModelState, input = 0): ModelState {
  // Placeholder: damped oscillator step (very simple)
  return { t: state.t + 1, value: state.value * 0.9 + input };
}
