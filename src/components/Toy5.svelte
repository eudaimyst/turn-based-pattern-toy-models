<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import {
    init as initViz,
    destroy as destroyViz,
  } from "../visualizations/viz-toy5";
  import { defaultParams, initState, update } from "../models/model-toy5";
  import type { Params, State } from "../models/model-toy5";

  export const id = "toy5";

  let container: HTMLDivElement | null = null;
  let params: Params = { ...defaultParams } as Params;
  let state: State = initState(0, 0);
  let history: Array<{ x: number; y: number }> = [];

  let viz: {
    render: (h: Array<{ x: number; y: number }>) => void;
    resize: (w: number, h: number) => void;
  } | null = null;

  let input_x = 0;
  let input_y = 0;

  let running = true;
  const stepInterval = 100;

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
  <h3>Toy 5: Joint Context Vector Map</h3>

  <section class="toy-description">
    <p>
      <em
        >A pattern showing how repeated directional nudges create a drifting
        path across a shared 2D space.</em
      >
    </p>
    <p>
      This toy shows how a 2D numerical state updates each turn by combining a
      scalar persistence factor with a constant 2D input vector. These values do
      not represent thoughts, feelings, intentions, or internal states. The
      pattern captures a surface-level effect found in many turn-based
      processes: each step carries forward part of the previous joint-context
      while also receiving a new directional push. Together, these operations
      produce a visible drifting path in the plane.
    </p>
  </section>

  <div class="visualization" bind:this={container}></div>

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
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        bind:value={params.state_scale}
      />
      <span class="val">{params.state_scale.toFixed(2)}</span>
    </label>

    <button on:click={toggleRunning}>{running ? "Pause" : "Run"}</button>
    <button on:click={reset}>Reset</button>
  </div>

  <details open>
    <summary>What this toy does <em>not</em> represent</summary>
    <p>This toy does not represent:</p>
    <ul>
      <li>thoughts</li>
      <li>feelings</li>
      <li>intentions</li>
      <li>personality</li>
      <li>cognition</li>
      <li>internal human or AI processes</li>
      <li>sentiment or interpretation</li>
      <li>agentic steering or preferences</li>
      <li>model "modes" or psychological states</li>
    </ul>
  </details>

  <details>
    <summary>What this toy represents</summary>
    <ul>
      <li>a 2D numerical signal shifted by repeated directional nudges</li>
      <li>how previous joint-context persists or fades each step</li>
      <li>surface-level drift patterns in iterative, turn-based processes</li>
      <li>the cumulative effect of simple linear operations</li>
    </ul>
  </details>

  <details>
    <summary>For academic readers</summary>
    <p>
      For academic use, this can be seen as a 2D vector recurrence with
      persistence (a contraction mapping combined with a constant vector input).
      It provides a simple visual example of vector drift, low-pass filtering in
      two dimensions, and cumulative directional bias. It may assist in
      illustrating how small, repeated vector influences aggregate spatially.
    </p>
    <p>No additional interpretive layer is intended.</p>
  </details>

  <details>
    <summary>Sliders</summary>
    <h4>input_x — horizontal nudge</h4>
    <p>
      Sets how strongly the state is shifted left or right each turn. This
      shapes the horizontal component of the directional influence.
    </p>
    <h4>input_y — vertical nudge</h4>
    <p>
      Sets how strongly the state is shifted upward or downward. Together with
      input_x, it defines the 2D input vector applied each step.
    </p>
    <h4>state_scale — joint-context persistence</h4>
    <p>
      Controls how much of the previous joint-context remains after each update.<br
      />
      Higher values: smoother drift influenced by past steps.<br />
      Lower values: past joint-context fades quickly, producing sharper, more reactive
      movements.
    </p>
  </details>

  <details>
    <summary>Intuitive example</summary>
    <p>Imagine a turn-based exchange where each turn gives the shared space a small shove in some direction — a bit more formal, a bit more playful, a bit more detailed, a bit less detailed.</p>
    <p>At the same time, the previous joint-context does not fully disappear; a trace of where it just was still carries forward.</p>
    <p>The line you see is the numerical version of those combined nudges, without implying motives or psychological states.</p>
  </details>

  <details>
    <summary>Fields this dynamic draws from</summary>
    <ul>
      <li>control theory (linear updates, persistence factors)</li>
      <li>dynamical systems (vector recurrence relations)</li>
      <li>vector geometry (incremental movement in a plane)</li>
      <li>interaction design (stepwise directional influence)</li>
      <li>iterative process modeling (accumulated adjustments over turns)</li>
    </ul>
    <p>These are conceptual inspirations, not literal mechanisms.</p>
  </details>
</div>

<style>
  .controls {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    flex-wrap: wrap;
    margin: 1rem 0;
  }
  label {
    font-size: 0.85rem;
  }
  .visualization {
    width: 100%;
    height: 420px;
    margin: 1rem 0;
  }
  details {
    margin: 0.5rem 0;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  summary {
    cursor: pointer;
    font-weight: bold;
    user-select: none;
  }
  details[open] summary {
    margin-bottom: 0.5rem;
  }
</style>
