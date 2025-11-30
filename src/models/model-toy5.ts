export type ModelState = { t: number; x: number; y: number };

export function step(state: ModelState, input = { x: 0, y: 0 }): ModelState {
  // Placeholder: joint vector map step
  return { t: state.t + 1, x: state.x * 0.98 + input.x, y: state.y * 0.98 + input.y };
}
