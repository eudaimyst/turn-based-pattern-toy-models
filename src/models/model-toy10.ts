export type ModelState = { t: number; x: number; y: number };

export function step(state: ModelState): ModelState {
  // Placeholder: simple potential well
  return { t: state.t + 1, x: state.x * 0.95, y: state.y * 0.95 };
}
