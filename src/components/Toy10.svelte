<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import {
    init as initViz,
    destroy as destroyViz,
  } from "../visualizations/viz-toy10";
  import { initState, step, defaultParams } from "../models/model-toy10";
  import type { Params, State } from "../models/model-toy10";

  export const id = "toy10";

  // Parameters bound to sliders
  let params: Params = { ...defaultParams };

  // local mutable state
  let state: State = initState(0, 0);
  let history: { x: number; y: number }[] = [{ x: state.x, y: state.y }];

  let container: HTMLElement | null = null;
  let viz: any = null;
  let intervalId: number | null = null;

  // potential function used by viz
  function potential(x: number, y: number) {
    const a = params.well_depth;
    const px = params.well_position_x;
    const py = params.well_position_y;
    return a * (x - px) * (x - px) + a * (y - py) * (y - py);
  }

  function stepOnce() {
    state = step(state, params);
    history.push({ x: state.x, y: state.y });
    if (history.length > 400) history.shift();
    if (viz && viz.render) viz.render(history, potential);
  }

  onMount(() => {
    if (container) viz = initViz(container, 480, 400);
    // render initial
    if (viz && viz.render) viz.render(history, potential);

    // default step interval
    intervalId = window.setInterval(stepOnce, 100);

    return () => {};
  });

  onDestroy(() => {
    if (intervalId) clearInterval(intervalId);
    if (container) destroyViz(container);
  });
</script>

<section>
  <h2>Attractor Landscape</h2>
  <section class="toy-description">
    <p>
      This toy illustrates how a point in a 2D space evolves under the influence
      of a scalar potential function. Local minima act as unlabeled mathematical
      attractor regions; the update rule pulls the state toward these minima. A
      small noise term creates perturbations in the trajectory.
    </p>
  </section>

  <div class="controls">
    <div>
      <label>
        well_depth: {params.well_depth.toFixed(2)}
        <input
          type="range"
          min="0"
          max="2"
          step="0.01"
          bind:value={params.well_depth}
        />
      </label>
    </div>

    <div>
      <label>
        well_position_x: {params.well_position_x.toFixed(2)}
        <input
          type="range"
          min="-1"
          max="1"
          step="0.01"
          bind:value={params.well_position_x}
        />
      </label>
    </div>

    <div>
      <label>
        well_position_y: {params.well_position_y.toFixed(2)}
        <input
          type="range"
          min="-1"
          max="1"
          step="0.01"
          bind:value={params.well_position_y}
        />
      </label>
    </div>

    <div>
      <label>
        noise_level: {params.noise_level.toFixed(3)}
        <input
          type="range"
          min="0"
          max="0.3"
          step="0.001"
          bind:value={params.noise_level}
        />
      </label>
    </div>
  </div>

  <div
    bind:this={container}
    class="visualization"
    style="margin-top:12px"
  ></div>
</section>

<style>
  .controls > div {
    margin: 6px 0;
  }
  .controls label {
    display: block;
    font-size: 0.9rem;
    margin-bottom: 4px;
  }
  .toy-description {
    background: #f8fafc;
    padding: 8px;
    border-left: 3px solid #e6eef6;
    margin-bottom: 8px;
  }
</style>
