<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { init as initViz, destroy as destroyViz } from '../visualizations/viz-toy5';
  import { defaultParams, initState, update } from '../models/model-toy5';
  import type { Params, State } from '../models/model-toy5';

  export const id = 'toy5';

  let container: HTMLDivElement | null = null;
  let params: Params = { ...defaultParams } as Params;
  let state: State = initState(0, 0);
  let history: Array<{ x: number; y: number }> = [];

  let viz: { render: (h: Array<{ x: number; y: number }>) => void; resize: (w: number, h: number) => void } | null = null;

  // user-controlled input vector components
  let input_x = 0;
  let input_y = 0;

  let running = true;
  const stepInterval = 100; // ms per step

  function step() {
    state = update(state, params as Params, { x: input_x, y: input_y });
    history.push({ x: state.x, y: state.y });
    if (history.length > 200) history.shift();
    viz?.render(history);
  }

  let intervalId: number | null = null;

  onMount(() => {
    if (!container) return;
    viz = initViz(container, 420, 420);
    history = [{ x: state.x, y: state.y }];
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
    history = [{ x: state.x, y: state.y }];
    viz?.render(history);
  }
</script>

<div class="toy">
  <header>
    <h3>Joint Context Vector Map</h3>
    <section class="toy-description">
      <p>
        This toy models a 2D state vector evolving under the linear update
        rule <code>x[t+1] = s * x[t] + u</code>, where <code>s</code> is a
        scalar multiplier and <code>u</code> is an external 2D input vector.
        Adjust <strong>input_x</strong>, <strong>input_y</strong>, and
        <strong>state_scale</strong> to observe trajectories in the plane.
      </p>
    </section>

    <div class="controls">
      <label>
        input_x
        <input type="range" min="-1" max="1" step="0.01" bind:value={input_x} />
        <span class="val">{input_x.toFixed(2)}</span>
      </label>

      <label>
        input_y
        <input type="range" min="-1" max="1" step="0.01" bind:value={input_y} />
        <span class="val">{input_y.toFixed(2)}</span>
      </label>

      <label>
        state_scale
        <input type="range" min="0" max="1" step="0.01" bind:value={params.state_scale} />
        <span class="val">{params.state_scale.toFixed(2)}</span>
      </label>

      <button on:click={toggleRunning}>{running ? 'Pause' : 'Run'}</button>
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
