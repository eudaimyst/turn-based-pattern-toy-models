<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { initState, update as modelUpdate, defaultParams, V as modelV, type Toy11Params, type Toy11State } from '../models/model-toy11';
  import * as viz from '../visualizations/viz-toy11';
  import type { Vec2 } from '../lib/types';

  let container: HTMLDivElement | null = null;

  // Parameters bound to sliders
  let params: Toy11Params = { ...defaultParams };

  // State (initialized from user-controlled initial position)
  let initial_x = 0.25;
  let initial_y = 0;
  let state: Toy11State = initState({ x: initial_x, y: initial_y });

  let vizHandle: any = null;
  let running = true;

  const stepInterval = 80; // ms

  onMount(() => {
    if (container) vizHandle = viz.init(container, 600, 400);
    // render field with current params
    if (vizHandle) viz.renderField(vizHandle, (p: Vec2) => modelV(p, params));

    const tick = () => {
      if (!running) return;
      state = modelUpdate(state, params);
      if (vizHandle) viz.update(vizHandle, state, (p: Vec2) => modelV(p, params));
      setTimeout(tick, stepInterval);
    };
    tick();
  });

  // Re-render the sampled vector field whenever parameters change
  $: if (vizHandle) {
    viz.renderField(vizHandle, (p: Vec2) => modelV(p, params));
  }

  onDestroy(() => {
    running = false;
    if (vizHandle) viz.destroy(vizHandle);
  });
</script>

<style>
.controls { display: flex; gap: 1rem; align-items: center; margin-bottom: 0.5rem; }
.controls label { display: flex; flex-direction: column; font-size: 0.9rem; }
.visualization { border: 1px solid #ddd; }
.toy-description { margin-top: 1rem; font-size: 0.95rem; color: #222 }
</style>

<h2>Framing Field (Vector Influence)</h2>
<section class="toy-description">
  To illustrate how a 2D state evolves in response to a vector field defined over an abstract coordinate space. A point moves by adding the local vector at its position. Scaling and rotating the vector field modifies the flow pattern. This is a geometric vector-field update and carries no semantic or cognitive meaning.
</section>

  <div class="controls">
  <label>
    vector_strength ({params.vector_strength.toFixed(2)})
    <input type="range" min="0" max="2" step="0.01" bind:value={params.vector_strength} />
  </label>
  <label>
    vector_rotation ({params.vector_rotation.toFixed(0)}°)
    <input type="range" min="0" max="360" step="1" bind:value={params.vector_rotation} />
  </label>
  <label>
    initial_x ({initial_x.toFixed(2)})
    <input type="range" min="-1" max="1" step="0.01" bind:value={initial_x} />
  </label>
  <label>
    initial_y ({initial_y.toFixed(2)})
    <input type="range" min="-1" max="1" step="0.01" bind:value={initial_y} />
  </label>
  <button on:click={() => { state = initState({ x: initial_x, y: initial_y }); }}>Reset</button>
</div>

<div bind:this={container} class="visualization"></div>
