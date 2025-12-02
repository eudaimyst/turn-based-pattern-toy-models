<script lang="ts">
  /**
   * Toy 4 — Path Dependence
   * Implements x[t+1] = (1 - w) * x[t] + w * u[t]
   */
  import { onMount, onDestroy } from "svelte";
  import {
    init as initViz,
    destroy as destroyViz,
  } from "../visualizations/viz-toy4";
  import { defaultParams, initState, update } from "../models/model-toy4";
  import type { Params, State } from "../models/model-toy4";

  export const id = "toy4";

  let container: HTMLDivElement | null = null;
  let params: Params = { ...defaultParams } as Params;
  let state: State = initState(0);
  let history: Array<{ t: number; x: number; u: number }> = [];
  let saved: Array<Array<{ t: number; x: number; u: number }>> = [];

  let viz: {
    render: (trajectories: Array<Array<{ x: number; u: number }>>) => void;
    resize: (w: number, h: number) => void;
  } | null = null;

  let running = true;
  const stepInterval = 100;
  const maxLen = 200;
  let t = 0;

  function step() {
    state = update(state, params as Params);
    t += 1;
    history.push({ t, x: state.x, u: params.u });
    if (history.length > maxLen) history.shift();
    const mapForViz = (h: Array<{ t: number; x: number; u: number }>) =>
      h.map((p) => ({ x: p.x, u: p.u }));
    viz?.render([mapForViz(history), ...saved.map(mapForViz)]);
  }

  let intervalId: number | null = null;

  onMount(() => {
    if (!container) return;
    viz = initViz(container, 420, 420);
    history = [{ t: 0, x: state.x, u: params.u }];
    viz.render([history.map((p) => ({ x: p.x, u: p.u }))]);
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
    history = [{ t: 0, x: state.x, u: params.u }];
    saved = [];
    t = 0;
    viz?.render([history.map((p) => ({ x: p.x, u: p.u }))]);
  }

  function capture() {
    saved = [...saved, history.slice()];
    const mapForViz = (h: Array<{ t: number; x: number; u: number }>) =>
      h.map((p) => ({ x: p.x, u: p.u }));
    viz?.render([mapForViz(history), ...saved.map(mapForViz)]);
  }

  function clearSaved() {
    saved = [];
    viz?.render([history.map((p) => ({ x: p.x, u: p.u }))]);
  }
</script>

<div class="toy">
  <h3>Toy 4: Path Dependence</h3>

  <section class="toy-description">
    <p>
      <em
        >A pattern where the order of upward and downward nudges changes the
        resulting path.</em
      >
    </p>
    <p>
      This toy shows how a single numerical state updates differently depending
      on whether the external input is above or below the current value. These
      values do not represent thoughts, feelings, intentions, or internal
      states.
    </p>
    <p>
      The pattern captures a structural effect found in many turn-based
      processes: When upward shifts and downward shifts use different strengths,
      the resulting trajectory depends on the order of those shifts.
    </p>
    <p>
      The toy illustrates three tendencies: directional asymmetry, sensitivity
      to the sequence of nudges, and diverging trajectories produced purely by
      update rules.
    </p>
  </section>

  <div class="visualization" bind:this={container}></div>

  <div class="controls">
    <label>
      u (external input)
      <input type="range" min="-1" max="1" step="0.01" bind:value={params.u} />
      <span class="val">{params.u.toFixed(2)}</span>
    </label>

    <label>
      w_up
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        bind:value={params.w_up}
      />
      <span class="val">{params.w_up.toFixed(2)}</span>
    </label>

    <label>
      w_down
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        bind:value={params.w_down}
      />
      <span class="val">{params.w_down.toFixed(2)}</span>
    </label>

    <button on:click={toggleRunning}>{running ? "Pause" : "Run"}</button>
    <button on:click={reset}>Reset</button>
    <button on:click={capture}>Capture trajectory</button>
    <button on:click={clearSaved}>Clear captures</button>
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
      <li>
        a numerical signal updated differently in upward vs. downward directions
      </li>
      <li>structural forces that create order-sensitive trajectories</li>
      <li>surface-level pattern tendencies in iterative processes</li>
    </ul>
  </details>

  <details>
    <summary>For academic readers</summary>
    <p>
      Academically, this is a piecewise-linear recurrence demonstrating path
      dependence via asymmetric gains. It aligns with formal work on hysteresis,
      asymmetric step responses, and direction-dependent update rules. It can
      also serve as an accessible introduction to non-commutativity in iterative
      processes: the order of updates affects the trajectory even when the
      magnitudes of updates are the same.
    </p>
    <p>No additional meaning is implied.</p>
  </details>

  <details>
    <summary>Sliders</summary>
    <h4>u — external input</h4>
    <p>
      Sets the reference value applied at each step. Whether the input is above
      or below the current state determines which directional update rule is
      used.
    </p>
    <h4>w_up — upward sensitivity</h4>
    <p>
      Controls how strongly the state moves toward the input when the input is
      greater than the current value. Higher values create stronger upward
      adjustments, while lower values produce gentler climbs. This resembles
      surface-level cases where increases have different influence than
      decreases.
    </p>
    <h4>w_down — downward sensitivity</h4>
    <p>
      Controls how strongly the state moves toward the input when the input is
      less than the current value. Higher values create stronger downward
      adjustments, while lower values make decreases more gradual. This models
      situations where downward shifts behave differently from upward ones.
    </p>
  </details>

  <details>
    <summary>Fields this dynamic draws from</summary>
    <ul>
      <li>control theory (asymmetric gains, directional weighting)</li>
      <li>dynamical systems (piecewise recurrence, path-sensitive updates)</li>
      <li>
        interaction design (positive and negative adjustments behaving
        differently)
      </li>
      <li>
        human–computer interaction (observable asymmetry in turn-by-turn
        responses)
      </li>
      <li>
        information processing models (order effects in iterative updates)
      </li>
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
    margin: 1.5rem 0 1rem 0;
  }
  label {
    font-size: 0.85rem;
  }
  .visualization {
    width: 100%;
    height: 420px;
    margin: 1rem 0 2rem 0;
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
