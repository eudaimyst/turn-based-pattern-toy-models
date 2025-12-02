<script lang="ts">
	  /**
   * Toy 2: Coupling Strength
   * Model: x[t+1] = (1 - k) * x[t] + k * u
   * Purpose: illustrate coupling between prior state and external scalar input.
   */

  import { onMount, onDestroy } from "svelte";
  import {
    init as initViz,
    destroy as destroyViz,
  } from "../visualizations/viz-toy2";
  import { defaultParams, initState, update } from "../models/model-toy2";
  import type { Params } from "../models/model-toy2";

  let container: HTMLDivElement | null = null;
  let params: Params = { ...defaultParams };
  let state = initState(0);
  let history: Array<{ x: number; u: number }> = [];

  let viz: {
    render: (h: Array<{ x: number; u: number }>) => void;
    resize: (w: number, h: number) => void;
  } | null = null;

  let running = true;
  let stepInterval = 200;

  function step() {
    state = update(state, params);
    history.push({ x: state.x, u: params.u });
    if (history.length > 200) history.shift();
    viz?.render(history);
  }

  let intervalId: number | null = null;

  onMount(() => {
    if (!container) return;
    viz = initViz(container, 400, 400);
    history = [{ x: state.x, u: params.u }];
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
    state = initState(0);
    history = [{ x: state.x, u: params.u }];
    viz?.render(history);
  }
</script>

<div class="toy">
  <h3>Toy 2: Coupling Strength</h3>

  <section class="toy-description">
    <p><em>How strongly each new turn incorporates an external input.</em></p>
    <p>
      This toy explores how a single numerical value changes across steps when
      each update is a weighted blend of:
    </p>
    <ul>
      <li>the value from the previous step, and</li>
      <li>a constant external input.</li>
    </ul>
    <p>
      The variable being updated is a numerical state, not a psychological or
      semantic one. This toy illustrates an observable interaction-level
      pattern: how much a repeated influence appears in the next turn. The
      behavior arises purely from the weighting parameters in the recurrence,
      not from internal cognition or interpretation.
    </p>
  </section>

  <div class="visualization" bind:this={container}></div>

  <div class="controls">
    <label>
      k (coupling)
      <input type="range" min="0" max="1" step="0.01" bind:value={params.k} />
      <span class="val">{params.k.toFixed(2)}</span>
    </label>

    <label>
      u (external input)
      <input type="range" min="-1" max="1" step="0.01" bind:value={params.u} />
      <span class="val">{params.u.toFixed(2)}</span>
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
      <li>a numerical signal recurring across steps</li>
      <li>weighted influence acting on that signal</li>
      <li>surface-level pattern tendencies in turn-based processes</li>
    </ul>
  </details>

  <details>
    <summary>For academic readers</summary>
    <p>
      This toy corresponds to a convex combination update rule, structurally
      similar to a weighted moving average or an AR(1) process with an exogenous
      constant. Academically, it can be connected to analyses of influence
      weighting, explicit vs. implicit feedback incorporation, and stepwise
      assimilation models in communication studies. It is particularly clean as
      an illustration of how recurrence coefficients shape long-term tendencies.
    </p>
    <p>No further claims are implied.</p>
  </details>

  <details>
    <summary>Sliders</summary>
    <h4>k — coupling strength</h4>
    <p>
      Controls how strongly the external input contributes to the next step.
      Smaller values keep the next point close to the previous one Larger values
      shift the next point rapidly toward the input. This resembles how firmly a
      repeated influence shows up across turns in an interaction.
    </p>
    <h4>u — external input</h4>
    <p>
      A constant value that is blended into each step. Adjusting this changes
      the direction the numerical state is pulled toward. This is not a
      participant or intention; it is simply a fixed numerical input.
    </p>
  </details>

  <details>
    <summary>Fields this dynamic draws from</summary>
    <ul>
      <li>linear recurrence relations</li>
      <li>control theory (influence weighting, convergence)</li>
      <li>dynamical systems (fixed-point behavior)</li>
      <li>
        communication theory (surface-level incorporation of repeated cues)
      </li>
    </ul>
    <p>
      These fields inspire the structure of the toy but are not literal
      mechanisms of thought or computation.
    </p>
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
