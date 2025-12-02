<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import {
    init as initViz,
    destroy as destroyViz,
  } from "../visualizations/viz-toy7";
  import { defaultParams, initState, update } from "../models/model-toy7";
  import type { Params, State } from "../models/model-toy7";

  export const id = "toy7";

  let container: HTMLDivElement | null = null;
  let params: Params = { ...defaultParams } as Params;
  let state: State = initState(0, 0);
  let history: Array<{ t: number; x: number }> = [];

  let viz: {
    render: (h: Array<{ t: number; x: number }>) => void;
    resize: (w: number, h: number) => void;
  } | null = null;

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

<h3>Toy 7: Context Saturation</h3>

<section class="toy-description">
  <p>
    This toy updates a scalar value each turn by blending the external input
    with the previous state.<br />
    These values do not represent thoughts, feelings, intentions, or internal states.
  </p>

  <p>
    The pattern illustrates a structural tendency found in many turn-based
    processes:<br />
    When past influence is strong, new inputs change the state slowly; when past
    influence is weak, new inputs have a stronger effect.
  </p>

  <p>
    The resulting curve shows how the state adjusts over time based solely on
    weighted recurrence.
  </p>
</section>

<div class="visualization" bind:this={container}></div>

<div class="controls">
  <label>
    S — saturation (past influence)
    <input type="range" min="0" max="1" step="0.01" bind:value={params.S} />
    <span class="val">{params.S.toFixed(2)}</span>
  </label>

  <label>
    u — external input
    <input type="range" min="-1" max="1" step="0.01" bind:value={u} />
    <span class="val">{u.toFixed(2)}</span>
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
    <li>memory, attention, or psychological saturation</li>
    <li>sentiment or interpretation</li>
    <li>preferences, motives, or goals</li>
  </ul>
</details>

<details>
  <summary>What this toy represents</summary>
  <ul>
    <li>a scalar state updated by blending past and present inputs</li>
    <li>the rate at which new input affects the state</li>
    <li>surface-level responsiveness patterns in iterative processes</li>
    <li>a visual illustration of smoothing vs. rapid change</li>
  </ul>
</details>

<details>
  <summary>For academic readers</summary>
  <p>
    This is essentially a first-order low-pass filter with adjustable smoothing
    coefficient. Academics may recognize it as equivalent to exponential
    smoothing, a core operation in signal processing and time-series
    forecasting. It demonstrates variable responsiveness under weighted
    recurrence, illustrating how recency weighting shapes a sequence's stepwise
    adjustments.
  </p>
  <p>No additional conceptual claims are made.</p>
</details>

<details>
  <summary>Sliders</summary>

  <h4>S — saturation (past influence)</h4>
  <p>
    Controls how strongly the previous state contributes to the next value.<br
    />
    Higher S: the state changes slowly and retains more of its past.<br />
    Lower S: the state responds quickly to new input and retains less of its past.
  </p>

  <h4>u — external input</h4>
  <p>
    Sets the target value applied each turn. When saturation is low, the state
    moves rapidly toward u; when saturation is high, the movement is gradual.
  </p>
</details>

<details>
  <summary>Fields this dynamic draws from</summary>
  <ul>
    <li>control theory (weighted recurrences, convergence behavior)</li>
    <li>dynamical systems (blended updates, fixed-point tendencies)</li>
    <li>signal processing (smoothing, low-pass filtering)</li>
    <li>interaction design (variation in responsiveness to input)</li>
    <li>
      iterative process modeling (different rates of information carry-over)
    </li>
  </ul>
  <p>These are conceptual inspirations, not literal mechanisms.</p>
</details>

<style>
  .toy-description {
    background: #f8fafc;
    padding: 12px;
    border-left: 3px solid #cbd5e1;
    margin: 12px 0;
    line-height: 1.6;
  }

  .visualization {
    width: 100%;
    height: 220px;
    margin: 12px 0;
  }

  .controls {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    flex-wrap: wrap;
    margin: 12px 0;
  }

  label {
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .val {
    display: inline-block;
    min-width: 3rem;
    text-align: right;
  }

  details {
    margin: 12px 0;
    padding: 8px;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
  }

  summary {
    cursor: pointer;
    font-weight: 600;
    padding: 4px 0;
    user-select: none;
  }

  summary:hover {
    color: #3b82f6;
  }

  details p,
  details ul {
    margin: 8px 0;
    padding-left: 8px;
  }

  details ul {
    list-style-position: inside;
  }

  details h4 {
    margin: 12px 0 4px 0;
    font-size: 0.95rem;
  }
</style>
