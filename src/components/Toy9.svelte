<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import {
    init as initViz,
    destroy as destroyViz,
  } from "../visualizations/viz-toy9";
  import { defaultParams, initState, update } from "../models/model-toy9";
  import type { Params, State } from "../models/model-toy9";

  export const id = "toy9";

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

  // impulse flag applied for a single step when triggered
  let pendingImpulse = 0;

  function step() {
    const impulse = pendingImpulse;
    // reset pending impulse after consuming
    pendingImpulse = 0;
    state = update(state, params, impulse);
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

  function triggerImpulse() {
    pendingImpulse = params.impulse_strength;
  }

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
    <h3>Impulse–Decay Response</h3>
    <section class="toy-description">
      <p>
        This toy models the scalar recurrence <code>x[t+1] = d * x[t] + I[t]</code> where
        <strong>d</strong> is the decay coefficient and <strong>I[t]</strong> is an externally applied impulse
        (zero except when the impulse is triggered). Use the sliders to adjust parameters and press
        <em>Trigger Impulse</em> to apply a one-step impulse of the chosen amplitude.
      </p>
    </section>

    <div class="controls">
      <label>
        decay (d)
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          bind:value={params.decay}
        />
        <span class="val">{params.decay.toFixed(2)}</span>
      </label>

      <label>
        impulse_strength
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          bind:value={params.impulse_strength}
        />
        <span class="val">{params.impulse_strength.toFixed(2)}</span>
      </label>

      <button on:click={triggerImpulse}>Trigger Impulse</button>
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

