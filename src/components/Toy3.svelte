<script lang="ts">
  /**
   * Toy 3 — Oscillation (Damped)
   * Implements the discrete-time linear damped oscillator from docs/toy-specs.md
   */

  import { onMount, onDestroy } from "svelte";
  import {
    init as initViz,
    destroy as destroyViz,
  } from "../visualizations/viz-toy3";
  import { defaultParams, initState, update } from "../models/model-toy3";
  import type { Params, State } from "../models/model-toy3";

  export const id = "toy3";

  let container: HTMLDivElement | null = null;
  let params: Params = { ...defaultParams } as Params;
  let state: State = initState(0, 0);
  let history: Array<{ x: number; v: number }> = [];

  let viz: {
    render: (h: Array<{ x: number; v: number }>) => void;
    resize: (w: number, h: number) => void;
  } | null = null;

  let running = true;
  const stepInterval = 100; // ms per step (10 steps/sec)

  function step() {
    state = update(state, params as Params);
    history.push({ x: state.x, v: state.v });
    if (history.length > 200) history.shift();
    viz?.render(history);
  }

  let intervalId: number | null = null;

  onMount(() => {
    if (!container) return;
    viz = initViz(container, 420, 420);
    history = [{ x: state.x, v: state.v }];
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
    history = [{ x: state.x, v: state.v }];
    viz?.render(history);
  }
</script>

<div class="toy">
  <header>
    <h3>Toy 3 — Oscillation (Damped)</h3>
    <section class="toy-description">
      <p>
        This toy illustrates a discrete-time linear damped oscillator using the
        update rules <code>x[t+1] = x[t] + v[t]</code> and
        <code>v[t+1] = damping · v[t] + stiffness · (u − x[t])</code>. Adjust
        <strong>damping</strong>, <strong>stiffness</strong>, and the external
        reference <strong>u</strong> to observe phase trajectories in the (x, v)
        plane.
      </p>
    </section>

    <div class="controls">
      <label>
        damping
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          bind:value={params.damping}
        />
        <span class="val">{params.damping.toFixed(2)}</span>
      </label>

      <label>
        stiffness
        <input
          type="range"
          min="0"
          max="2"
          step="0.01"
          bind:value={params.stiffness}
        />
        <span class="val">{params.stiffness.toFixed(2)}</span>
      </label>

      <label>
        u (target)
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
