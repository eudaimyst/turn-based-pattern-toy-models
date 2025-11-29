import { mapOnce, sampleDomain, defaultParams } from '../src/models/model-toy2';

// Test 1: hard threshold behavior (delta = 0)
(() => {
  const p = { ...defaultParams, delta: 0, k1: 2, b1: 1, k2: -1, b2: 0, T: 0 };
  const left = mapOnce(-0.1, p);
  const at = mapOnce(0, p);
  if (Math.abs(left - (2 * -0.1 + 1)) > 1e-12) throw new Error('left mismatch');
  if (Math.abs(at - 0) > 1e-12) throw new Error('at threshold mismatch');
})();

// Test 2: blend region interpolation
(() => {
  const p = { ...defaultParams, delta: 0.2, k1: 0, b1: 0, k2: 2, b2: 0, T: 0 };
  const leftEdge = -0.1; // T - delta/2
  const rightEdge = 0.1; // T + delta/2
  const yLeft = mapOnce(leftEdge, p);
  const yRight = mapOnce(rightEdge, p);
  if (Math.abs(yLeft - 0) > 1e-12) throw new Error('yLeft mismatch');
  if (Math.abs(yRight - (2 * rightEdge)) > 1e-12) throw new Error('yRight mismatch');
  const yCenter = mapOnce(0, p); // alpha = 0.5 => average of y1(0)=0 and y2(0)=0
  if (Math.abs(yCenter - 0) > 1e-12) throw new Error('yCenter mismatch');
})();

// Test 3: sampling returns expected length
(() => {
  const p = { ...defaultParams };
  const arr = sampleDomain(-1, 1, 100, p);
  if (arr.length !== 100) throw new Error('sample length mismatch');
})();

console.log('model-toy2 tests passed');
