<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import {
    init as initViz,
    destroy as destroyViz,
  } from "../visualizations/viz-toy8";
  import { defaultParams, initState, update } from "../models/model-toy8";
  import type { Params, State } from "../models/model-toy8";

  export const id = "toy8";

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

  function step() {
    state = update(state, params);
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

<h3>Toy 8: Noise Sensitivity</h3>

<section class="toy-description">
  <p>
    This toy updates a scalar value each turn by adding a random numerical
    perturbation.<br />
    These values do not represent thoughts, feelings, intentions, or internal states.
  </p>

  <p>
    The pattern illustrates how simple iterative processes behave when small
    variations appear at each step.<br />
    As noise increases, the trajectory becomes more erratic; as noise decreases,
    the path becomes smoother.
  </p>

  <p>
    The toy demonstrates variability driven solely by randomness, without
    implying any deeper meaning.
  </p>
</section>

<div class="visualization" bind:this={container}></div>

<div class="controls">
  <label>
    noise_level — randomness amplitude
    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      bind:value={params.noise_level}
    />
    <span class="val">{params.noise_level.toFixed(2)}</span>
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
    <li>emotional instability or fluctuation</li>
    <li>sentiment or interpretation</li>
    <li>preferences, motives, or goals</li>
    <li>psychological states or modes</li>
  </ul>
</details>

<details>
  <summary>What this toy represents</summary>
  <ul>
    <li>a scalar updated with random perturbations</li>
    <li>how noise amplitude affects variability in an iterative trace</li>
    <li>surface-level unpredictability in turn-based processes</li>
    <li>a visual illustration of accumulated randomness</li>
  </ul>
</details>

<details>
  <summary>For academic readers</summary>
  <p>
    This toy implements a discrete random walk with tunable noise amplitude (a
    simple additive white noise model). Academically, it corresponds to
    stochastic recurrence relations and Brownian-motion-like traces in bounded
    form. It can be used pedagogically to illustrate how noise accumulates in
    iterative processes and how variance grows with step count when no
    stabilizing term is present.
  </p>
  <p>No additional meaning should be inferred.</p>
</details>

<details>
  <summary>Sliders</summary>

  <h4>noise_level — randomness amplitude</h4>
  <p>
    Controls the strength of the random perturbation applied each step.<br />
    Higher noise_level: sharper, more chaotic movement.<br />
    Lower noise_level: smoother, more stable movement.
  </p>
</details>

<details>
  <summary>Fields this dynamic draws from</summary>
  <ul>
    <li>stochastic processes (additive noise, random walks)</li>
    <li>signal processing (perturbation, jitter)</li>
    <li>control theory (response under perturbation)</li>
    <li>time-series modeling (random fluctuations across steps)</li>
    <li>iterative update processes (noise accumulation)</li>
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
