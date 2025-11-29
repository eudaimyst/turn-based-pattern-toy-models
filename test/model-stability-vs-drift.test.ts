import { initState, update } from '../src/models/model-stability-vs-drift';
import type { Params } from '../src/lib/types';

function approxEqual(a: number, b: number, eps = 1e-8) {
  return Math.abs(a - b) < eps;
}

function testDeterministic() {
  const params: Params = { a: 0.5, b: 0.2, sigma: 0.0 };
  let s = initState(1.0);
  s = update(s, params); // x1 = 0.5*1 + 0.2 = 0.7
  if (!approxEqual(s.x, 0.7)) throw new Error(`deterministic test failed: ${s.x} !== 0.7`);
  s = update(s, params); // x2 = 0.5*0.7 + 0.2 = 0.55
  if (!approxEqual(s.x, 0.55)) throw new Error(`deterministic test failed: ${s.x} !== 0.55`);
  console.log('deterministic test passed');
}

try {
  testDeterministic();
} catch (e) {
  console.error('Tests failed:', e);
  process.exit(1);
}
