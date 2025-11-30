<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import {
    init as initViz,
    destroy as destroyViz,
  } from "../visualizations/viz-toy6";
  import { compute, defaultParams } from "../models/model-toy6";
  import type { Params } from "../models/model-toy6";

  export const id = "toy6";

  let container: HTMLDivElement | null = null;
  let viz: any = null;

  let params: Params = { ...defaultParams };

  // slider bindings
  let u_x = params.u_x;
  let u_y = params.u_y;
  let m_x = params.m_x;
  let m_y = params.m_y;

  function render() {
    if (!viz) return;
    params.u_x = u_x;
    params.u_y = u_y;
    params.m_x = m_x;
    params.m_y = m_y;
    const { R1, R2, I } = compute(params);
    viz.render(R1, R2, I);
  }

  onMount(() => {
    if (!container) return;
    viz = initViz(container, 420, 420);
    render();
    window.addEventListener("resize", () =>
      viz.resize(container.clientWidth, 420)
    );
  });

  onDestroy(() => {
    if (container) destroyViz(container);
  });
</script>

<div class="toy">
  <header>
    <h3>Constraint Drift</h3>
    <section class="toy-description">
      <p>
        This toy displays two axis-aligned base regions translated by the
        sliders. The intersection of the translated regions is computed
        geometrically and rendered. Parameters control horizontal and vertical
        translation of each region; the intersection appears, shrinks, or
        disappears as the regions move.
      </p>
    </section>

    <div class="controls">
      <label>
        u_x
        <input
          type="range"
          min="-1"
          max="1"
          step="0.01"
          bind:value={u_x}
          on:input={render}
        />
        <span class="val">{u_x.toFixed(2)}</span>
      </label>

      <label>
        u_y
        <input
          type="range"
          min="-1"
          max="1"
          step="0.01"
          bind:value={u_y}
          on:input={render}
        />
        <span class="val">{u_y.toFixed(2)}</span>
      </label>

      <label>
        m_x
        <input
          type="range"
          min="-1"
          max="1"
          step="0.01"
          bind:value={m_x}
          on:input={render}
        />
        <span class="val">{m_x.toFixed(2)}</span>
      </label>

      <label>
        m_y
        <input
          type="range"
          min="-1"
          max="1"
          step="0.01"
          bind:value={m_y}
          on:input={render}
        />
        <span class="val">{m_y.toFixed(2)}</span>
      </label>

      <button on:click={render}>Update</button>
      <button
        on:click={() => {
          u_x = 0;
          u_y = 0;
          m_x = 0;
          m_y = 0;
          render();
        }}>Reset</button
      >
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
  .val {
    margin-left: 0.25rem;
    font-variant-numeric: tabular-nums;
  }
</style>
