import assert from "assert";
import { fileURLToPath, pathToFileURL } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const modPath = path.resolve(__dirname, "../build-test/models/model-toy13.js");
const model = await import(pathToFileURL(modPath).href);

console.log("Running model-toy13 tests...");

// Helper to compute mean of an array
function mean(arr) {
  if (!arr || arr.length === 0) return NaN;
  return arr.reduce((s, v) => s + v, 0) / arr.length;
}

// Test 1: r = 0 => x[t+1] = 0 always
{
  const r = 0;
  const samples = model.sampleBifurcation([r], 0.5, 10, 10);
  assert(samples.length === 1, "expected one sample entry");
  for (const v of samples[0].values) {
    assert(Math.abs(v - 0) < 1e-12, `expected 0 got ${v}`);
  }
  console.log("Test 1 passed: r=0 leads to zero state");
}

// Test 2: r = 2 => logistic map converges to fixed point x* = (r - 1) / r = 0.5
{
  const r = 2;
  const warmup = 200;
  const samples = model.sampleBifurcation([r], 0.3, warmup, 50);
  const vals = samples[0].values;
  const m = mean(vals.slice(-20));
  assert(Math.abs(m - 0.5) < 1e-3, `expected mean near 0.5 got ${m}`);
  console.log("Test 2 passed: r=2 converges near 0.5");
}

// Test 3: r = 3.2 => should converge to a 2-cycle or higher but mean should be in [0,1]
{
  const r = 3.2;
  const warmup = 300;
  const samples = model.sampleBifurcation([r], 0.4, warmup, 100);
  const vals = samples[0].values;
  const m = mean(vals.slice(-50));
  assert(!Number.isNaN(m) && m >= 0 && m <= 1, `mean out of bounds ${m}`);
  console.log("Test 3 passed: r=3.2 produced samples in [0,1]");
}

console.log("All model-toy13 tests passed");
