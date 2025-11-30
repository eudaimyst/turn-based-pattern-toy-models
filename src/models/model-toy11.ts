// Toy 11 model: Framing Field (Vector Influence)
// Pure mathematical update logic only.
import type { Vec2, Params, State } from "../lib/types";

export type Toy11Params = {
  vector_strength: number; // scalar s
  vector_rotation: number; // degrees
};

export type Toy11State = {
  x: Vec2; // current 2D position
  history: Vec2[]; // short trail (optional storage)
};

export const defaultParams: Toy11Params = {
  vector_strength: 1.0,
  vector_rotation: 0,
};

export function initState(x?: Vec2): Toy11State {
  return {
    x: x ?? { x: 0, y: 0 },
    history: [],
  };
}

// Example base vector field V0(x, y): a simple rotational plus radial component.
function baseField(p: Vec2): Vec2 {
  // simple pattern: circular flow around origin with a mild radial push
  const { x, y } = p;
  const r2 = x * x + y * y + 1e-6;
  // tangential component (perpendicular to radius)
  const tangential = { x: -y / Math.sqrt(r2), y: x / Math.sqrt(r2) };
  // radial decay magnitude
  const radialMag = 1 / (1 + r2);
  const radial = { x: x * radialMag, y: y * radialMag };
  return { x: tangential.x * 0.6 + radial.x * 0.4, y: tangential.y * 0.6 + radial.y * 0.4 };
}

function rotate(v: Vec2, degrees: number): Vec2 {
  const theta = (degrees * Math.PI) / 180;
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  return { x: v.x * c - v.y * s, y: v.x * s + v.y * c };
}

export function V(p: Vec2, params: Toy11Params): Vec2 {
  const base = baseField(p);
  const rotated = rotate(base, params.vector_rotation);
  return { x: rotated.x * params.vector_strength, y: rotated.y * params.vector_strength };
}

// Pure update: returns a new state object (no side effects)
export function update(state: Toy11State, params: Toy11Params): Toy11State {
  const v = V(state.x, params);
  const nextX = { x: state.x.x + v.x, y: state.x.y + v.y };
  const history = state.history.slice(-50).concat([nextX]);
  return { x: nextX, history };
}
export type ModelState = { t: number; field: number };

export function step(state: ModelState, influence = 0): ModelState {
  // Placeholder: framing influence accumulation
  return { t: state.t + 1, field: state.field * 0.97 + influence };
}
