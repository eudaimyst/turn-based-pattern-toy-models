<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import {
    init as initViz,
    destroy as destroyViz,
  } from "../visualizations/viz-toy9";
  import { defaultParams, initState, update } from "../models/model-toy9";
  import type { Params, State } from "../models/model-toy9";

  export const id = "toy9";

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

  // impulse flag applied for a single step when triggered
  let pendingImpulse = 0;

  function step() {
    const impulse = pendingImpulse;
    // reset pending impulse after consuming
    pendingImpulse = 0;
    state = update(state, params, impulse);
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

  function triggerImpulse() {
    pendingImpulse = params.impulse_strength;
  }

  function toggleRunning() {
    running = !running;
  }

  function reset() {
    state = initState(0, 0);
    history = [{ t: state.t, x: state.x }];
    viz?.render(history);
  }
</script>

<h3>Toy 9: Impulse–Decay Response</h3>

<section class="toy-description">
  <p>
    This toy updates a scalar value that normally remains steady, except when a
    one-step impulse is manually applied.<br />
    These values do not represent thoughts, feelings, intentions, or internal states.
  </p>

  <p>
    The pattern illustrates a structural tendency found in many turn-based
    processes:<br />
    A brief external event added to the numerical pattern, followed by a gradual
    return toward equilibrium based solely on the toy's decay rule.
  </p>

  <p>
    In these toys, an "impulse" is used strictly in the mathematical sense:<br
    />
    a <strong>one-step change applied to the numerical pattern</strong>, not an
    emotional or psychological event.<br />
    A turn in a turn-based exchange can be described this way because each turn adds
    exactly one external input to the <em>pattern itself</em>, not to the
    participants.
  </p>

  <p>
    The rate of decay shown here belongs only to the <strong>pattern</strong
    >.<br />
    It does <strong>not</strong> describe how a human experiences events,
    reactions, time, attention, or settling.<br />
    Human experience has its own internal dynamics that are outside the scope of
    these toys.<br />
    The decay slider only controls
    <strong>how quickly the numerical pattern fades back to baseline</strong>,
    nothing more.
  </p>
</section>

<div class="visualization" bind:this={container}></div>

<div class="controls">
  <label>
    decay — return rate
    <input type="range" min="0" max="1" step="0.01" bind:value={params.decay} />
    <span class="val">{params.decay.toFixed(2)}</span>
  </label>

  <label>
    impulse_strength — one-step input
    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      bind:value={params.impulse_strength}
    />
    <span class="val">{params.impulse_strength.toFixed(2)}</span>
  </label>

  <button on:click={triggerImpulse}>Trigger Impulse</button>
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
    <li>emotional reactions or recovery</li>
    <li>sentiment, interpretation, or preference</li>
    <li>psychological states or modes</li>
    <li>how a person experiences time, change, or response</li>
  </ul>
  <p>
    It shows structure, not psychology.<br />
    Nothing in the spike implies motive or experience—only the numerical rules you
    set.
  </p>
</details>

<details>
  <summary>What this toy represents</summary>
  <ul>
    <li>a scalar temporarily perturbed by a one-step impulse</li>
    <li>the characteristic spike-and-fade response</li>
    <li>surface-level settling behavior in iterative processes</li>
    <li>
      the effect of decay rate on how quickly a <em>pattern</em> returns to baseline
    </li>
  </ul>
</details>

<details>
  <summary>For academic readers</summary>
  <p>
    This toy models a classic impulse response of a stable first-order system.
    Academically, it is directly analogous to LTI system characterization where
    a Dirac delta (δ) input reveals the system's transient behavior. It is
    useful for demonstrating decay kernels, exponential relaxation, and the
    distinction between system-level perturbation and internal reaction.
  </p>
  <p>No further academic notes beyond the LTI interpretation.</p>
</details>

<details>
  <summary>Sliders</summary>

  <h4>decay — return rate</h4>
  <p>
    Controls how strongly the previous pattern-value contributes to the next
    step.<br />
    Higher decay: slow settling with long-lasting effects.<br />
    Lower decay: fast settling with short-lived effects.<br />
    The decay acts <strong>only</strong> on the numerical pattern displayed on the
    screen.
  </p>

  <h4>impulse_strength — one-step input</h4>
  <p>
    Determines the amplitude of the spike added on the moment the impulse is
    triggered.<br />
    The impulse affects only one update; subsequent steps follow the decay rule.
  </p>
</details>

<details>
  <summary>Fields this dynamic draws from</summary>
  <ul>
    <li>signal processing (impulse response, exponential decay)</li>
    <li>control theory (return-to-equilibrium behavior)</li>
    <li>dynamical systems (perturbation and settling)</li>
    <li>engineering and physics (ringing and damping)</li>
    <li>iterative process modeling (event followed by relaxation)</li>
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
