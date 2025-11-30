export type ModelState = { t: number; param: number };

export function step(state: ModelState, param = 0): ModelState {
  // Placeholder: parameter sweep stub
  return { t: state.t + 1, param: state.param + param };
}
