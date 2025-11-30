<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import {
    init as initViz,
    destroy as destroyViz,
  } from "../visualizations/viz-toy8";
  import { defaultParams, initState, update } from "../models/model-toy8";
  import type { Params, State } from "../models/model-toy8";

  export const id = "toy8";

  let container: HTMLDivElement | null = null;
  let params: Params = { ...defaultParams } as Params;
  let state: State = initState(0, 0);
  let history: Array<{ t: number; x: number }> = [];

  let viz: {
    render: (h: Array<{ t: number; x: number }>) => void;
    resize: (w: number, h: number) => void;
  } | null = null;

  let running = true;
  const stepInterval = 100;

  function step() {
    state = update(state, params);
    history.push({ t: state.t, x: state.x });
    if (history.length > 200) history.shift();
    viz?.render(history);
  }

  let intervalId: number | null = null;

  onMount(() => {
    if (!container) return;
    viz = initViz(container, 600, 200);
    history = [{ t: state.t, x: state.x }];
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
    state = initState(0, 0);
    history = [{ t: state.t, x: state.x }];
    viz?.render(history);
  }
</script>

<div class="toy">
  <header>
    <h3>Noise Sensitivity</h3>
    <section class="toy-description">
      <p>
        This toy models the scalar recurrence <code
          >x[t+1] = x[t] + d + n * r[t]</code
        >
        where <strong>d</strong> is a constant baseline drift and
        <strong>n</strong> is the noise amplitude multiplying a uniform sample r[t]
        ∈ [−1, 1]. Adjust the sliders to observe how noise amplitude affects trajectory
        variability.
      </p>
    </section>

    <div class="controls">
      <label>
        noise_level (n)
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          bind:value={params.noise_level}
        />
        <span class="val">{params.noise_level.toFixed(2)}</span>
      </label>

      <label>
        baseline_drift (d)
        <input
          type="range"
          min="-1"
          max="1"
          step="0.01"
          bind:value={params.baseline_drift}
        />
        <span class="val">{params.baseline_drift.toFixed(2)}</span>
      </label>

      <button on:click={toggleRunning}>{running ? "Pause" : "Run"}</button>
      <button on:click={reset}>Reset</button>
    </div>
  </header>

  <div bind:this={container} style="width:100%;height:220px"></div>
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
