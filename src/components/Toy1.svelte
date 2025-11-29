<script lang="ts">
  /**
   * Toy 1: Stability vs Drift
   * Purpose: Illustrate damping vs drift under additive noise.
   *
   * Mathematical model:
   *   x[t+1] = (1 - a) * x[t] + b + N(0, σ)
   */

  import { onMount, onDestroy } from 'svelte';
  import { init as initViz, destroy as destroyViz } from '../visualizations/viz-toy1';
  import { defaultParams, initState, update } from '../models/model-toy1';
  import type { Params } from '../lib/types';

  let container: HTMLDivElement | null = null;
  let params: Params = { ...defaultParams };
  let history: number[] = [];
  let state = initState(0);

  let viz: { render: (h: number[]) => void; resize: (w: number, h: number) => void } | null = null;
  let running = true;
  let stepInterval = 100;

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
    <h3>Toy 1 — Stability vs Drift</h3>
    <section class="toy-description">
      <p>
        This toy uses the update rule <code>x[t+1] = (1 - a) · x[t] + b + N(0, σ)</code>
        to illustrate how stability, drift, and noise influence the evolution of a scalar
        signal over time.
      </p>
    </section>
    <div class="controls">
      <label>
        a (stability)
        <input type="range" min="0.1" max="1" step="0.01" bind:value={params.a} />
        <span class="val">{params.a.toFixed(2)}</span>
      </label>

      <label>
        b (drift)
        <input type="range" min="-0.05" max="0.05" step="0.001" bind:value={params.b} />
        <span class="val">{params.b.toFixed(2)}</span>
      </label>

      <label>
        σ (noise)
        <input type="range" min="0.02" max="0.1" step="0.001" bind:value={params.sigma} />
        <span class="val">{params.sigma.toFixed(2)}</span>
      </label>

      <button on:click={toggleRunning}>{running ? 'Pause' : 'Run'}</button>
      <button on:click={reset}>Reset</button>
    </div>
  </header>

  <div bind:this={container} style="width:100%;height:140px"></div>
</div>

<style>
  .controls { display:flex; gap:0.5rem; align-items:center; flex-wrap:wrap }
  label { font-size:0.85rem }
</style>
