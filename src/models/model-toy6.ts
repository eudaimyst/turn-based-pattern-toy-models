/**
 * Toy 6 Model: Constraint Drift
 *
 * This module implements pure mathematical functions for two fixed base shapes
 * (axis-aligned rectangles) translated by external slider-controlled vectors.
 * It exposes types, default parameters, and utilities to compute the intersection
 * polygon (as an axis-aligned rectangle or empty) without any side effects.
 *
 * Constraints: no DOM, no randomness, pure functions only.
 */

export type Params = {
  u_x: number; // horizontal shift of region R1
  u_y: number; // vertical shift of region R1
  m_x: number; // horizontal shift of region R2
  m_y: number; // vertical shift of region R2
};

export type Rect = {
  x: number; // center x
  y: number; // center y
  w: number; // width
  h: number; // height
};

export type Intersection = {
  exists: boolean;
  rect?: Rect; // axis-aligned intersection rectangle when exists === true
};

export const defaultParams: Params = {
  u_x: 0,
  u_y: 0,
  m_x: 0,
  m_y: 0,
};

// Base shapes (centered at origin) - chosen as axis-aligned rectangles
// These are immutable and form the reference shapes R1 and R2 before translation.
export const BASE_R1: Rect = { x: 0, y: 0, w: 0.8, h: 0.6 };
export const BASE_R2: Rect = { x: 0, y: 0, w: 0.6, h: 0.8 };

// Pure helper: compute axis-aligned rectangle bounds from center form
function bounds(r: Rect) {
  const left = r.x - r.w / 2;
  const right = r.x + r.w / 2;
  const top = r.y + r.h / 2;
  const bottom = r.y - r.h / 2;
  return { left, right, top, bottom };
}

/**
 * Translate a base rectangle by (tx, ty) producing a new Rect.
 */
export function translate(rect: Rect, tx: number, ty: number): Rect {
  return { x: rect.x + tx, y: rect.y + ty, w: rect.w, h: rect.h };
}

/**
 * Compute intersection of two axis-aligned rectangles. Returns an Intersection
 * describing whether an axis-aligned rectangle exists for the overlap. If no
 * overlap, exists=false.
 */
export function intersectRect(a: Rect, b: Rect): Intersection {
  const A = bounds(a);
  const B = bounds(b);

  const left = Math.max(A.left, B.left);
  const right = Math.min(A.right, B.right);
  const bottom = Math.max(A.bottom, B.bottom);
  const top = Math.min(A.top, B.top);

  if (left < right && bottom < top) {
    const w = right - left;
    const h = top - bottom;
    const cx = left + w / 2;
    const cy = bottom + h / 2;
    return { exists: true, rect: { x: cx, y: cy, w, h } };
  }

  return { exists: false };
}

/**
 * Given Params, produce translated R1, R2 and their intersection.
 * This is the single pure mapping function used by the component/viz.
 */
export function compute(params: Params) {
  const R1 = translate(BASE_R1, params.u_x, params.u_y);
  const R2 = translate(BASE_R2, params.m_x, params.m_y);
  const I = intersectRect(R1, R2);
  return { R1, R2, I };
}
export type ModelState = { t: number; value: number };

export function step(state: ModelState, input = 0): ModelState {
  // Placeholder: slow constraint drift
  return { t: state.t + 1, value: state.value + 0.01 + input * 0.001 };
}
