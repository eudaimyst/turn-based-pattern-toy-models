<script lang="ts">
  /**
   * Toy: Stability vs Drift
   * Purpose: Illustrate damping vs drift under additive noise.
   *
   * Mathematical model:
   *   x[t+1] = (1 - a) * x[t] + b + N(0, σ)
   *
   * Parameters:
   * | Parameter | Meaning | Range | Default |
   * |---|---:|---:|---:|
   * | a | stability coefficient | 0.1–1 | 0.8 |
   * | b | constant drift term | -0.05–0.05 | 0.0 |
   * | σ | noise stddev | 0.02–0.1 | 0.05 |
   *
   * What this shows: stability, drift, noise-driven variability in a scalar recurrence.
   * What this does not imply: cognition, memory, intentions, neural-network internals.
   * Limitations: single scalar state, simplified dynamics, not predictive.
   */

  import { onMount, onDestroy } from "svelte";
  import {
    init as initViz,
    destroy as destroyViz,
  } from "../visualizations/viz-stability-vs-drift";
  import {
    defaultParams,
    initState,
    update,
  } from "../models/model-stability-vs-drift";
  import type { Params } from "../lib/types";

  let container: HTMLDivElement | null = null;

  // params bound to sliders
  let params: Params = { ...defaultParams };

  let history: number[] = [];
  let state = initState(0);

  let viz: {
    render: (h: number[]) => void;
    resize: (w: number, h: number) => void;
  } | null = null;

  let running = true;
  let stepInterval = 100; // ms between steps (10 steps/sec)

  function step() {
    state = update(state, params);
    history.push(state.x);
    if (history.length > 200) history.shift();
    viz?.render(history);
  }

  let intervalId: number | null = null;

  onMount(() => {
    if (!container) return;
    viz = initViz(container, 600, 120);
    // initialize history
    history = [state.x];
    viz.render(history);
    intervalId = window.setInterval(() => {
      if (running) step();
    }, stepInterval);
  });

  onDestroy(() => {
    if (intervalId) clearInterval(intervalId);
    if (container) destroyViz(container);
  });

  function toggleRunning() {
    running = !running;
  }

  function reset() {
    state = initState(0);
    history = [state.x];
    viz?.render(history);
  }
</script>

<div class="toy">
  <header>
    <h3>Stability vs Drift</h3>
    <section class="toy-description">
      <p>
        This toy uses the update rule <code
          >x[t+1] = (1 - a) · x[t] + b + N(0, σ)</code
        > to illustrate how stability, drift, and noise influence the evolution of
        a scalar signal over time.
      </p>

      <p>
        <strong>Stability (a):</strong>
        The parameter <code>a</code> determines how strongly the recurrence pulls
        the signal toward baseline from one step to the next. Higher values cause
        deviations to decrease rapidly, while lower values allow deviations to persist
        or grow.
      </p>

      <p>
        <strong>Drift (b):</strong>
        The parameter <code>b</code> is a constant additive term that introduces
        a uniform directional bias. Positive values increase the signal over time,
        and negative values decrease it. This represents only a linear bias in the
        recurrence without psychological or interpretive meaning.
      </p>

      <p>
        <strong>Noise (σ):</strong>
        The parameter <code>σ</code> sets the magnitude of Gaussian noise added per
        update step. Larger values create higher variability in the trajectory, while
        smaller values keep the path smoother. Noise is used strictly as a mathematical
        perturbation term.
      </p>

      <p>
        This toy illustrates how stability, drift, and variability emerge in a
        simple linear recurrence. It does not represent AI cognition, internal
        mechanisms, psychological states, or behavior.
      </p>
    </section>
    <div class="controls">
      <label>
        a (stability)
        <input
          type="range"
          min=".1"
          max="1"
          step="0.01"
          bind:value={params.a}
        />
        <span class="val">{params.a.toFixed(2)}</span>
      </label>

      <label>
        b (drift)
        <input
          type="range"
          min="-0.05"
          max="0.05"
          step="0.001"
          bind:value={params.b}
        />
        <span class="val">{params.b.toFixed(2)}</span>
      </label>

      <label>
        σ (noise)
        <input
          type="range"
          min="0.02"
          max="0.1"
          step="0.001"
          bind:value={params.sigma}
        />
        <span class="val">{params.sigma.toFixed(2)}</span>
      </label>
      <button on:click={toggleRunning}>{running ? "Pause" : "Run"}</button>
      <button on:click={reset}>Reset</button>
    </div>
  </header>

  <div bind:this={container} style="width:100%;height:140px"></div>
</div>

<style>
  .controls {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    flex-wrap: wrap;
  }
  label {
    font-size: 0.85rem;
  }
</style>
