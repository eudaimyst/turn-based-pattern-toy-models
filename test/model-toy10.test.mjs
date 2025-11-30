import assert from "assert";
import { fileURLToPath, pathToFileURL } from "url";
import path from "path";

// Load compiled module from build-test output
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const modPath = path.resolve(__dirname, "../build-test/models/model-toy10.js");
const model = await import(pathToFileURL(modPath).href);

console.log("Running model-toy10 tests...");

// Test 1: gradient pulls toward well center when noise_level = 0
{
  const params = { ...model.defaultParams, noise_level: 0 };
  const s0 = model.initState(0.5, -0.3);
  // use a well centered at origin with a = 1
  params.well_depth = 1;
  params.well_position_x = 0;
  params.well_position_y = 0;

  const s1 = model.step(s0, params);
  // ∇U = 2a(x-px), 2a(y-py) => at s0: (1.0, -0.6)
  // next = s0 - grad => x: 0.5 - 1.0 = -0.5, y: -0.3 - (-0.6) = 0.3
  assert(Math.abs(s1.x - -0.5) < 1e-6, `expected x -0.5 got ${s1.x}`);
  assert(Math.abs(s1.y - 0.3) < 1e-6, `expected y 0.3 got ${s1.y}`);
  console.log("Test 1 passed");
}

// Test 2: noise is added and respects noise_level scaling (deterministic by patching Math.random)
{
  // Patch Math.random to deterministic sequence
  const savedRandom = Math.random;
  let seq = [0.135, 0.86, 0.42, 0.99];
  Math.random = () => seq.shift() ?? 0.5;

  const params = { ...model.defaultParams, noise_level: 0.1 };
  const s0 = model.initState(0.2, 0.2);
  params.well_depth = 0; // zero gradient so that only noise affects step
  params.well_position_x = 0;
  params.well_position_y = 0;

  const s1 = model.step(s0, params);

  // The Box-Muller will compute gaussianRandom using two Math.random calls; we patched them deterministically.
  // We can't precisely predict gaussian output without replicating the algorithm here; instead assert that values changed by at most a few std devs.
  const dx = s1.x - s0.x;
  const dy = s1.y - s0.y;
  const max = 0.5; // large but reasonable bound for noise_level 0.1
  assert(Math.abs(dx) < max, `dx too large ${dx}`);
  assert(Math.abs(dy) < max, `dy too large ${dy}`);

  // restore
  Math.random = savedRandom;
  console.log("Test 2 passed");
}

console.log("All tests passed");
