<script lang="ts">
  /**
   * Toy 1: Stability vs Drift
   * Purpose: Illustrate damping vs drift under additive noise.
   *
   * Mathematical model:
   *   x[t+1] = (1 - a) * x[t] + b + N(0, σ)
   */
  import { onMount, onDestroy } from "svelte";
  import {
    init as initViz,
    destroy as destroyViz,
  } from "../visualizations/viz-toy1";
  import { defaultParams, initState, update } from "../models/model-toy1";
  import type { Params } from "../lib/types";

  let container: HTMLDivElement | null = null;
  let params: Params = { ...defaultParams };
  let history: number[] = [];
  let state = initState(0);

  let viz: {
    render: (h: number[]) => void;
    resize: (w: number, h: number) => void;
  } | null = null;
  let running = true;
  let stepInterval = 100;

  function step() {
    state = update(state, params);
    history.push(state.x);
    if (history.length > 200) history.shift();
    viz?.render(history);
  }

  let intervalId: number | null = null;

  onMount(() => {
    if (!container) return;
    viz = initViz(container, 600, 120);
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

  function toggleRunning() {
    running = !running;
  }

  function reset() {
    state = initState(0);
    history = [state.x];
    viz?.render(history);
  }
</script>

<div class="toy">
  <h3>Toy 1: Stability vs Drift</h3>

  <section class="toy-description">
    <p>
      <em
        >A toy model showing how a simple interaction pattern can settle,
        wander, or do a bit of both.</em
      >
    </p>
    <p>
      This toy explores a single numerical value that updates each turn. It
      doesn't represent thoughts, feelings, intentions, or any internal state.
      It represents <strong
        >an abstract measure of an interaction pattern</strong
      >, the kind that arises when two participants exchange turns.
    </p>
    <p>
      The toy illustrates three structural tendencies often seen in iterative
      processes:
    </p>
    <ul>
      <li>
        <strong>a stabilizing pull</strong> --- patterns often return toward a familiar
        form
      </li>
      <li>
        <strong>a directional push</strong> --- consistent steering shifts the pattern
        over time
      </li>
      <li>
        <strong>small fluctuations</strong> --- used here only for aesthetic clarity
      </li>
    </ul>
    <p>
      These forces combine into a path that can settle, drift, or hover in place
      --- much like many simple feedback systems found in engineering and
      communication studies.
    </p>
  </section>

  <div class="visualization" bind:this={container}></div>

  <div class="controls">
    <label>
      a (stability)
      <input type="range" min="0.1" max="1" step="0.01" bind:value={params.a} />
      <span class="val">{params.a.toFixed(2)}</span>
    </label>

    <label>
      b (drift)
      <input
        type="range"
        min="-0.05"
        max="0.05"
        step="0.001"
        bind:value={params.b}
      />
      <span class="val">{params.b.toFixed(2)}</span>
    </label>

    <label>
      σ (noise)
      <input
        type="range"
        min="0.02"
        max="0.1"
        step="0.001"
        bind:value={params.sigma}
      />
      <span class="val">{params.sigma.toFixed(2)}</span>
    </label>

    <button on:click={toggleRunning}>{running ? "Pause" : "Run"}</button>
    <button on:click={reset}>Reset</button>
  </div>

  <details open>
    <summary>What this toy does <em>not</em> represent</summary>
    <p>Thoughts</p>
    <p>Feelings</p>
    <p>Intentions</p>
    <p>Personality</p>
    <p>Cognitive processes</p>
    <p>Internal mechanisms of an AI or a human</p>
    <p>Meaning, sentiment, or interpretation</p>
    <p>Attempts by participants to "correct" or "guide" anything internally</p>
    <p>The toy shows <strong>structure</strong>, not psychology.</p>
    <p>
      Nothing in the line implies agency, preference, emotion, or hidden forces.
    </p>
  </details>

  <details>
    <summary>What this toy represents</summary>
    <ul>
      <li>
        A numerical trace of how a pattern can return toward its usual form
      </li>
      <li>How consistent steering shifts that pattern</li>
      <li>How small wiggles make the path more readable</li>
      <li>
        An abstract, surface-level view of turn-based interaction dynamics
      </li>
    </ul>
    <p>
      It is a model of <strong>how patterns change</strong>, not a model of why.
    </p>
  </details>

  <details>
    <summary>For academic readers</summary>
    <p>
      This toy can be understood as a visualization of a linear recurrence with
      an additive drift term and small stochastic perturbation. The pattern is
      mathematically equivalent to a first-order autoregressive process with
      constant input (AR(1) with drift), widely used in time-series modeling,
      control theory, and communication research. Scholars may find it useful as
      a pedagogical example when illustrating stability conditions, convergence
      properties, or the effects of persistent steering in iterative processes.
    </p>
    <p>
      No additional conceptual claims or mappings are intended beyond the
      recurrence itself.
    </p>
  </details>

  <details>
    <summary>Sliders</summary>
    <h4>
      <strong>a --- Stability (strength of return toward baseline)</strong>
    </h4>
    <p>
      Controls how strongly the numerical value fades back toward zero each
      turn. Higher values: patterns snap back quickly. Lower values: deviations
      linger. This represents the observable tendency of an interaction to
      revert to its established style or framing unless consistently steered
      elsewhere.
    </p>
    <h4><strong>b --- Drift (consistent directional shift)</strong></h4>
    <p>
      Adds a steady push upward or downward each turn. Positive = upward trend;
      negative = downward trend. This corresponds to <strong
        >consistent steering</strong
      > in an interaction --- such as the user repeatedly pushing into a topic, or
      the model repeatedly elaborating in one direction.
    </p>
    <h4><strong>σ --- Noise (tiny wiggles for visual clarity)</strong></h4>
    <p>
      Adds small random variation so the pattern doesn't look overly straight.
      This does <em>not</em> represent randomness in cognition or behavior --- it
      is included purely as a graphical aid to better see how stability and drift
      interact.
    </p>
  </details>

  <details>
    <summary>Fields this dynamic draws from</summary>
    <ul>
      <li>
        <strong>Control theory</strong><br />
        (feedback, convergence, steady-state behavior)
      </li>
      <li>
        <strong>Dynamical systems</strong><br />
        (recurrence relations, fixed-point behavior, drift terms)
      </li>
      <li>
        <strong>Communication theory</strong><br />
        (iterative exchange shaping the next step)
      </li>
      <li>
        <strong>Human--computer interaction</strong><br />
        (observable tendencies in turn-based interfaces)
      </li>
      <li>
        <strong>Information flow in iterative processes</strong><br />
        (pattern carry-over and incremental steering)
      </li>
    </ul>
    <p>These provide conceptual inspiration, not literal mechanisms.</p>
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
    height: 140px;
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
