<script lang="ts">
  /**
   * Toy 4 — Path Dependence
   * Implements x[t+1] = (1 - w) * x[t] + w * u[t]
   */
  import { onMount, onDestroy } from "svelte";
  import {
    init as initViz,
    destroy as destroyViz,
  } from "../visualizations/viz-toy4";
  import { defaultParams, initState, update } from "../models/model-toy4";
  import type { Params, State } from "../models/model-toy4";

  export const id = "toy4";

  let container: HTMLDivElement | null = null;
  let params: Params = { ...defaultParams } as Params;
  let state: State = initState(0);
  let history: Array<{ t: number; x: number; u: number }> = [];
  let saved: Array<Array<{ t: number; x: number; u: number }>> = [];

  let viz: {
    render: (trajectories: Array<Array<{ x: number; u: number }>>) => void;
    resize: (w: number, h: number) => void;
  } | null = null;

  let running = true;
  const stepInterval = 100; // ms
  const maxLen = 200;
  let t = 0;

  function step() {
    state = update(state, params as Params);
    t += 1;
    // record the state and the input value used at this step
    history.push({ t, x: state.x, u: params.u });
    if (history.length > maxLen) history.shift();
    // map histories to arrays of {x,u} for the viz
    const mapForViz = (h: Array<{ t: number; x: number; u: number }>) =>
      h.map((p) => ({ x: p.x, u: p.u }));
    viz?.render([mapForViz(history), ...saved.map(mapForViz)]);
  }

  let intervalId: number | null = null;

  onMount(() => {
    if (!container) return;
    viz = initViz(container, 420, 420);
    history = [{ t: 0, x: state.x, u: params.u }];
    viz.render([history.map((p) => ({ x: p.x, u: p.u }))]);
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
    history = [{ t: 0, x: state.x, u: params.u }];
    saved = [];
    t = 0;
    viz?.render([history.map((p) => ({ x: p.x, u: p.u }))]);
  }

  function capture() {
    // save a copy of the current history (includes u) for comparison
    saved = [...saved, history.slice()];
    const mapForViz = (h: Array<{ t: number; x: number; u: number }>) =>
      h.map((p) => ({ x: p.x, u: p.u }));
    viz?.render([mapForViz(history), ...saved.map(mapForViz)]);
  }

  function clearSaved() {
    saved = [];
    viz?.render([history.map((p) => ({ x: p.x, u: p.u }))]);
  }
</script>

<div class="toy">
  <header>
    <h3>Toy 4 — Path Dependence</h3>
    <section class="toy-description">
      <p>
        This toy implements a direction-sensitive scalar update rule. Let
        <code>x[t]</code> be the scalar state and <code>u[t]</code> the external
        input. The update is:
      </p>
      <pre>
If u[t] &gt; x[t]:
    x[t+1] = x[t] + w_up * (u[t] - x[t])
Else:
    x[t+1] = x[t] + w_down * (u[t] - x[t])
      </pre>
      <p>
        Adjust <code>u</code>, <code>w_up</code>, and <code>w_down</code> using the
        sliders. Capture multiple input sequences to compare resulting trajectories
        and observe path dependence arising from the directional weights.
      </p>
    </section>

    <div class="controls">
      <label>
        input (u)
        <input
          type="range"
          min="-1"
          max="1"
          step="0.01"
          bind:value={params.u}
        />
        <span class="val">{params.u.toFixed(2)}</span>
      </label>

      <label>
        w_up
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          bind:value={params.w_up}
        />
        <span class="val">{params.w_up.toFixed(2)}</span>
      </label>

      <label>
        w_down
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          bind:value={params.w_down}
        />
        <span class="val">{params.w_down.toFixed(2)}</span>
      </label>

      <button on:click={toggleRunning}>{running ? "Pause" : "Run"}</button>
      <button on:click={reset}>Reset</button>
      <button on:click={capture}>Capture trajectory</button>
      <button on:click={clearSaved}>Clear captures</button>
    </div>
  </header>

  <div bind:this={container} style="width:100%;height:260px"></div>
</div>
<!-- end of component -->

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
