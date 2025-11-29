import type { Params as ParamsBase } from '../lib/types';

export type Params = {
  T: number;
  k1: number;
  k2: number;
  b1: number;
  b2: number;
  delta: number; // total blend width centered on T
};

export const defaultParams: Params = {
  T: 0.0,
  k1: 1.0,
  k2: -1.0,
  b1: 0.0,
  b2: 0.0,
  delta: 0.05,
};

export function mapOnce(x: number, p: Params): number {
  const delta = Math.max(0, p.delta);
  if (delta === 0) {
    return x < p.T ? p.k1 * x + p.b1 : p.k2 * x + p.b2;
  }

  const half = delta / 2;
  const left = p.T - half;
  const right = p.T + half;

  if (x <= left) return p.k1 * x + p.b1;
  if (x >= right) return p.k2 * x + p.b2;

  // linear blend
  const alpha = (x - left) / (right - left); // 0..1
  const y1 = p.k1 * x + p.b1;
  const y2 = p.k2 * x + p.b2;
  return (1 - alpha) * y1 + alpha * y2;
}

export function sampleDomain(xmin: number, xmax: number, n = 400, p = defaultParams) {
  const out: { x: number; y: number }[] = [];
  if (n <= 1) return out;
  for (let i = 0; i < n; i++) {
    const x = xmin + (i / (n - 1)) * (xmax - xmin);
    out.push({ x, y: mapOnce(x, p) });
  }
  return out;
}
