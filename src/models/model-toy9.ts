export type ModelState = { t: number; mi: number };

export function step(state: ModelState, pulse = 0): ModelState {
  // Placeholder: pulse response decay
  return { t: state.t + 1, mi: state.mi * 0.9 + pulse };
}
