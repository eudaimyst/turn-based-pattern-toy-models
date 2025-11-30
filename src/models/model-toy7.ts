export type ModelState = { t: number; value: number };

export function step(state: ModelState, input = 0): ModelState {
  // Placeholder: saturation with clip
  const v = state.value + input;
  return { t: state.t + 1, value: Math.max(-1, Math.min(1, v)) };
}
