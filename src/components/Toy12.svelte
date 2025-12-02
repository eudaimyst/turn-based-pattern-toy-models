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

<h3>Toy 12: Impulse Response</h3>

<section class="toy-description">
  <p>
    This toy illustrates how a scalar value changes when it receives a single
    external impulse and then continues according to a simple linear update
    rule.<br />
    The value may bump, wobble, or settle smoothly depending on the gains you set.<br
    />
    The curve has no semantic or psychological meaning.<br />
    It represents only the shape of a numerical pattern after a brief external perturbation.
  </p>

  <p>
    In turn-based exchanges, a single contribution can momentarily shift the
    outward pattern of the interaction, but this belongs to the pattern itself —
    not to the internal states of the participants.<br />
    This toy visualizes that idea strictly in geometric form: a one-step nudge followed
    by a settling shape determined by the update gains.
  </p>
</section>

<div class="visualization" bind:this={container}></div>

<div class="controls">
  <label>
    update_gain (g) — influence of the previous value
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
    impulse_gain (h) — strength of the perturbation
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
    impulse_magnitude — size of the tap
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

<details open>
  <summary>What this toy does <em>not</em> represent</summary>
  <p>This toy does not represent:</p>
  <ul>
    <li>thoughts</li>
    <li>feelings</li>
    <li>intentions</li>
    <li>reactions</li>
    <li>preferences</li>
    <li>personality</li>
    <li>cognition</li>
    <li>internal human or AI processes</li>
    <li>meaning, sentiment, or interpretation</li>
    <li>psychological states or modes</li>
  </ul>
  <p>
    It shows only the geometric shape produced when a sequence receives a brief
    external tap.
  </p>
</details>

<details>
  <summary>What this toy represents</summary>
  <ul>
    <li>a numerical state receiving a one-step impulse</li>
    <li>how update gains shape the settling behaviour</li>
    <li>oscillations, overshoot, and damping</li>
    <li>surface-level structure in iterative processes</li>
  </ul>
</details>

<details>
  <summary>For academic readers</summary>
  <p>
    Academically, this is the impulse response of a second-order linear
    recurrence with configurable gains. It supports discussion of damping
    ratios, oscillatory vs. non-oscillatory regimes, and stability conditions.
    It provides an accessible example of how small parameter changes alter
    transient behavior without invoking internal-state interpretations.
  </p>
  <p>No further additions needed.</p>
</details>

<details>
  <summary>Sliders</summary>

  <h4>update_gain (g) — influence of the previous value</h4>
  <p>
    Controls how much of the prior value carries into the next step.<br />
    Higher values may create oscillation or slow settling; lower values produce quick
    fades.
  </p>

  <h4>impulse_gain (h) — strength of the perturbation</h4>
  <p>Determines how strongly a triggered impulse affects the next update.</p>

  <h4>impulse_magnitude — size of the tap</h4>
  <p>
    Sets the amplitude of the one-step impulse applied when you press <em
      >Impulse</em
    >.
  </p>
</details>

<details>
  <summary>Fields this dynamic draws from</summary>
  <ul>
    <li>signal processing (impulse response, ringing, damping)</li>
    <li>control theory (transient behaviour and stability)</li>
    <li>discrete-time dynamical systems</li>
    <li>linear recurrence modelling</li>
    <li>iterative update rules</li>
  </ul>
  <p>These provide conceptual inspiration, not literal mechanisms.</p>
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
    height: 160px;
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
