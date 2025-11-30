export type ModelState = { t: number; field: number };

export function step(state: ModelState, influence = 0): ModelState {
  // Placeholder: framing influence accumulation
  return { t: state.t + 1, field: state.field * 0.97 + influence };
}
