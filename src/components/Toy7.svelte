<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { init as initViz, destroy as destroyViz } from '../visualizations/viz-toy7';
  import { defaultParams, initState, update } from '../models/model-toy7';
  import type { Params, State } from '../models/model-toy7';

  export const id = 'toy7';

  let container: HTMLDivElement | null = null;
  let params: Params = { ...defaultParams } as Params;
  let state: State = initState(0, 0);
  let history: Array<{ t: number; x: number }> = [];

  let viz: { render: (h: Array<{ t: number; x: number }>) => void; resize: (w: number, h: number) => void } | null = null;

  // user-controlled external input u (scalar)
  let u = 0;

  let running = true;
  const stepInterval = 100; // ms

  function step() {
    state = update(state, params as Params, u);
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
    <h3>Context Saturation</h3>
    <section class="toy-description">
      <p>
        This toy models the scalar recurrence <code>x[t+1] = (1 − S) * u[t] + S * x[t]</code>.
        Adjust <strong>S</strong> (saturation) and the external input <strong>u</strong> to observe
        how increased saturation reduces sensitivity to new inputs. The visualization shows
        the scalar state over discrete time steps.
      </p>
    </section>

    <div class="controls">
      <label>
        S
        <input type="range" min="0" max="1" step="0.01" bind:value={params.S} />
        <span class="val">{params.S.toFixed(2)}</span>
      </label>

      <label>
        u
        <input type="range" min="-1" max="1" step="0.01" bind:value={u} />
        <span class="val">{u.toFixed(2)}</span>
      </label>

      <button on:click={toggleRunning}>{running ? 'Pause' : 'Run'}</button>
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
