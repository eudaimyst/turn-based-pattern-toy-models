<script lang="ts">
  /**
   * Toy 2: Coupling Strength
   * Model: x[t+1] = (1 - k) * x[t] + k * u
   * Purpose: illustrate coupling between prior state and external scalar input.
   */

  import { onMount, onDestroy } from "svelte";
  import {
    init as initViz,
    destroy as destroyViz,
  } from "../visualizations/viz-toy2";
  import { defaultParams, initState, update } from "../models/model-toy2";
  import type { Params } from "../models/model-toy2";

  let container: HTMLDivElement | null = null;
  let params: Params = { ...defaultParams };
  let state = initState(0);
  let history: Array<{ x: number; u: number }> = [];

  let viz: {
    render: (h: Array<{ x: number; u: number }>) => void;
    resize: (w: number, h: number) => void;
  } | null = null;

  let running = true;
  let stepInterval = 200;

  function step() {
    state = update(state, params);
    history.push({ x: state.x, u: params.u });
    if (history.length > 200) history.shift();
    viz?.render(history);
  }

  let intervalId: number | null = null;

  onMount(() => {
    if (!container) return;
    viz = initViz(container, 400, 400);
    history = [{ x: state.x, u: params.u }];
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
    history = [{ x: state.x, u: params.u }];
    viz?.render(history);
  }
</script>

<div class="toy">
  <header>
    <h3>Toy 2 — Coupling Strength</h3>
    <section class="toy-description">
      <p>
        This toy illustrates how the next state is a weighted combination of the
        current state and an external scalar input using the update rule
        <code>x[t+1] = (1 − k) · x[t] + k · u</code>. Adjust the coupling
        strength <strong>k</strong> and the external input <strong>u</strong> to
        observe how the state moves through the (x, u) plane.
      </p>
    </section>

    <div class="controls">
      <label>
        k (coupling)
        <input type="range" min="0" max="1" step="0.01" bind:value={params.k} />
        <span class="val">{params.k.toFixed(2)}</span>
      </label>

      <label>
        u (external input)
        <input
          type="range"
          min="-1"
          max="1"
          step="0.01"
          bind:value={params.u}
        />
        <span class="val">{params.u.toFixed(2)}</span>
      </label>

      <button on:click={toggleRunning}>{running ? "Pause" : "Run"}</button>
      <button on:click={reset}>Reset</button>
    </div>
  </header>

  <div bind:this={container} style="width:100%;height:420px"></div>
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
