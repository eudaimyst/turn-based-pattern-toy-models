<script lang="ts">
  /**
   * Toy 3 — Oscillation (Damped)
   * Implements the discrete-time linear damped oscillator from docs/toy-specs.md
   */
  import { onMount, onDestroy } from "svelte";
  import {
    init as initViz,
    destroy as destroyViz,
  } from "../visualizations/viz-toy3";
  import { defaultParams, initState, update } from "../models/model-toy3";
  import type { Params, State } from "../models/model-toy3";

  export const id = "toy3";

  let container: HTMLDivElement | null = null;
  let params: Params = { ...defaultParams } as Params;
  let state: State = initState(0, 0);
  let history: Array<{ x: number; v: number }> = [];

  let viz: {
    render: (h: Array<{ x: number; v: number }>) => void;
    resize: (w: number, h: number) => void;
  } | null = null;

  let running = true;
  const stepInterval = 100;

  function step() {
    state = update(state, params as Params);
    history.push({ x: state.x, v: state.v });
    if (history.length > 200) history.shift();
    viz?.render(history);
  }

  let intervalId: number | null = null;

  onMount(() => {
    if (!container) return;
    viz = initViz(container, 420, 420);
    history = [{ x: state.x, v: state.v }];
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
    history = [{ x: state.x, v: state.v }];
    viz?.render(history);
  }
</script>

<div class="toy">
  <h3>Toy 3: Oscillation (Damped)</h3>

  <section class="toy-description">
    <p><em>A pattern that overshoots, corrects, and gradually settles.</em></p>
    <p>
      This toy model explores two numerical values that update each turn: one
      capturing the current position, the other capturing how quickly it is
      changing. Neither represents thoughts, feelings, intentions, or internal
      states. Together, they form an abstract pattern often seen when
      adjustments go too far before finding balance.
    </p>
    <p>The toy illustrates three interlocking tendencies:</p>
    <ul>
      <li>momentum — the change carries forward from one turn to the next</li>
      <li>restoring pull — the pattern is nudged toward a target value</li>
      <li>damping — each correction loses a little strength over time</li>
    </ul>
    <p>
      These forces combine into a spiral path that circles around a target
      before gradually settling — a structural behavior found in many corrective
      feedback processes across engineering, physics, and turn-based
      interactions.
    </p>
    <p>
      Depending on parameter values, the pattern may not settle, and instead
      grow. These reflect different structural outcomes of the recurrence — not
      emotional escalation or psychological tension.
    </p>
  </section>

  <div class="visualization" bind:this={container}></div>

  <div class="controls">
    <label>
      damping
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        bind:value={params.damping}
      />
      <span class="val">{params.damping.toFixed(2)}</span>
    </label>

    <label>
      stiffness
      <input
        type="range"
        min="0"
        max="2"
        step="0.01"
        bind:value={params.stiffness}
      />
      <span class="val">{params.stiffness.toFixed(2)}</span>
    </label>

    <label>
      u (target)
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
      <li>a numerical/spatial signal recurring across steps</li>
      <li>structural forces acting on that signal</li>
      <li>surface-level pattern tendencies in iterative processes</li>
    </ul>
  </details>

  <details>
    <summary>For academic readers</summary>
    <p>
      This toy is equivalent to a damped harmonic oscillator in discrete time.
      It can be framed within discussions of transient response, overshoot, and
      convergence in linear time-invariant (LTI) systems. For researchers, it
      highlights how oscillatory patterns can arise purely from the structure of
      an update rule without implying any oscillation in cognitive or emotional
      states.
    </p>
    <p>
      It may also be of interest as a demonstration of phase portraits in 2D
      linear recurrences.
    </p>
  </details>

  <details>
    <summary>Sliders</summary>
    <h4>damping — strength of slowdown</h4>
    <p>
      Controls how quickly corrective motion loses strength. Higher damping
      values produce gentle settling, while lower values create larger
      oscillatory loops before settling. This resembles situations where
      repeated adjustments gradually become smaller over turns.
    </p>
    <h4>stiffness — strength of the pull toward the target</h4>
    <p>
      Determines how sharply the position is nudged toward the target. Smaller
      stiffness values produce mild corrections, while larger values can lead to
      overshoot and oscillation. This reflects structural patterns where strong
      corrective influences can cause back-and-forth swings.
    </p>
    <h4>u — target value</h4>
    <p>
      A fixed reference point the position is drawn toward. Adjusting this moves
      the goal the pattern attempts to settle near. This is purely a numerical
      value and not an intention or preference.
    </p>
  </details>

  <details>
    <summary>Intuitive example</summary>
    <p>Imagine trying to adjust the level of detail in a shared task: you provide too much, then too little, then slightly too much again, with each adjustment shrinking until both sides reach a comfortable middle.</p>
    <p>This toy shows that kind of shrinking back-and-forth motion using numbers, without implying motives or psychological states.</p>
  </details>

  <details>
    <summary>Fields this dynamic draws from</summary>
    <ul>
      <li>control theory (overshoot, settling behavior, restoring forces)</li>
      <li>dynamical systems (oscillation, damping, phase portraits)</li>
      <li>classical mechanics (restoring motion that fades over time)</li>
      <li>
        communication theory and HCI (turn-based adjustments that correct and
        recorrect)
      </li>
    </ul>
    <p>
      These are conceptual inspirations, not literal mechanisms of thought or
      computation.
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
