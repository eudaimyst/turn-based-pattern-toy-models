<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import {
    init as initViz,
    destroy as destroyViz,
  } from "../visualizations/viz-toy12";
  import { defaultParams, initState, update } from "../models/model-toy12";
  import type { Params, State } from "../models/model-toy12";

  export const id = "toy12";

  let container: HTMLDivElement | null = null;
  let params: Params = { ...defaultParams } as Params;
  let state: State = initState(0);
  let history: number[] = [state.x];

  let viz: {
    render: (h: number[]) => void;
    resize: (w: number, h: number) => void;
  } | null = null;

  let running = true;
  const stepInterval = 100; // ms

  // impulse trigger is a UI action; impulsePending is consumed on next step
  let impulsePending = false;

  function triggerImpulse() {
    impulsePending = true;
  }

  function step() {
    const triggered = impulsePending;
    // consume the pending flag for this single step
    impulsePending = false;
    state = update(state, params as Params, triggered);
    history.push(state.x);
    if (history.length > 200) history.shift();
    viz?.render(history);
  }

  let intervalId: number | null = null;

  onMount(() => {
    if (!container) return;
    viz = initViz(container, 600, 160);
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

  function reset() {
    state = initState(0);
    history = [state.x];
    viz?.render(history);
  }
</script>

<div class="toy">
  <header>
    <h3>Toy 12 — Impulse Response</h3>
    <section class="toy-description">
      <p>
        This toy illustrates how a scalar state responds to a one-step external
        perturbation (an impulse) and then evolves according to a linear
        recurrence x[t+1] = g · x[t] + h · I[t]. Use the controls to trigger an
        impulse and adjust gains.
      </p>
    </section>

    <div class="controls">
      <label>
        update_gain (g)
        <input
          type="range"
          min="-1"
          max="1"
          step="0.01"
          bind:value={params.update_gain}
        />
        <span class="val">{params.update_gain.toFixed(2)}</span>
      </label>

      <label>
        impulse_gain (h)
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          bind:value={params.impulse_gain}
        />
        <span class="val">{params.impulse_gain.toFixed(2)}</span>
      </label>

      <label>
        impulse_magnitude
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          bind:value={params.impulse_magnitude}
        />
        <span class="val">{params.impulse_magnitude.toFixed(2)}</span>
      </label>

      <button on:click={triggerImpulse}>Impulse</button>
      <button on:click={() => (running = !running)}
        >{running ? "Pause" : "Run"}</button
      >
      <button on:click={reset}>Reset</button>
    </div>
  </header>

  <div bind:this={container} style="width:100%;height:160px"></div>
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
  .val {
    display: inline-block;
    width: 3rem;
    text-align: right;
    margin-left: 0.5rem;
  }
</style>
