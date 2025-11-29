<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { defaultParams, mapOnce, sampleDomain, type Params } from '../models/model-toy2';
  import { init as initViz } from '../visualizations/viz-toy2';

  let params: Params = { ...defaultParams };
  let xmin = -1;
  let xmax = 1;
  let samples = 400;

  let container: HTMLDivElement | null = null;
  let viz: any = null;

  function renderPlot() {
    if (!container) return;
    const data = sampleDomain(xmin, xmax, samples, params);
    viz?.render(data, { T: params.T, delta: params.delta });
  }

  function reset() {
    params = { ...defaultParams };
    xmin = -1;
    xmax = 1;
    renderPlot();
  }

  onMount(() => {
    if (!container) return;
    viz = initViz(container, 680, 260);
    renderPlot();
  });

  onDestroy(() => {
    viz?.destroy();
  });
</script>

<section>
  <h2>Threshold Response (Toy 2)</h2>
  <div class="controls">
  <label for="t-T">T (threshold): <strong>{params.T.toFixed(2)}</strong></label>
  <input id="t-T" type="range" min="-1" max="1" step="0.01" bind:value={params.T} on:input={renderPlot} />

  <label for="t-k1">k1 (slope left): <strong>{params.k1.toFixed(2)}</strong></label>
  <input id="t-k1" type="range" min="-3" max="3" step="0.01" bind:value={params.k1} on:input={renderPlot} />

  <label for="t-k2">k2 (slope right): <strong>{params.k2.toFixed(2)}</strong></label>
  <input id="t-k2" type="range" min="-3" max="3" step="0.01" bind:value={params.k2} on:input={renderPlot} />

  <label for="t-b1">b1 (offset left): <strong>{params.b1.toFixed(2)}</strong></label>
  <input id="t-b1" type="range" min="-1" max="1" step="0.01" bind:value={params.b1} on:input={renderPlot} />

  <label for="t-b2">b2 (offset right): <strong>{params.b2.toFixed(2)}</strong></label>
  <input id="t-b2" type="range" min="-1" max="1" step="0.01" bind:value={params.b2} on:input={renderPlot} />

  <label for="t-delta">Δ (blend width): <strong>{params.delta.toFixed(2)}</strong></label>
  <input id="t-delta" type="range" min="0" max="0.2" step="0.01" bind:value={params.delta} on:input={renderPlot} />

    <div class="row">
  <label for="t-xmin">Domain xmin:</label>
  <input id="t-xmin" type="number" step="0.1" bind:value={xmin} on:input={renderPlot} />
  <label for="t-xmax">Domain xmax:</label>
  <input id="t-xmax" type="number" step="0.1" bind:value={xmax} on:input={renderPlot} />
  <label for="t-samples">Samples:</label>
  <input id="t-samples" type="number" min="10" max="2000" step="10" bind:value={samples} on:input={renderPlot} />
    </div>

    <div class="actions">
      <button on:click={reset}>Reset</button>
    </div>
  </div>

  <div bind:this={container} class="viz"></div>
</section>

<style>
  section { max-width: 760px; }
  .controls { display:flex; flex-direction:column; gap:0.5rem; margin-bottom:0.5rem }
  .controls label { font-size:0.9rem }
  .row { display:flex; gap:0.5rem; align-items:center }
  .viz { border:1px solid #e6e9ef; border-radius:6px; padding:6px }
  .actions { margin-top:0.5rem }
  button { background:#2563eb; color:white; border:none; padding:0.35rem 0.6rem; border-radius:4px }
</style>
