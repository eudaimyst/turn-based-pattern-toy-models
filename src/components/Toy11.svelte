<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import {
    initState,
    update as modelUpdate,
    defaultParams,
    V as modelV,
    type Toy11Params,
    type Toy11State,
  } from "../models/model-toy11";
  import * as viz from "../visualizations/viz-toy11";
  import type { Vec2 } from "../lib/types";

  let container: HTMLDivElement | null = null;

  // Parameters bound to sliders
  let params: Toy11Params = { ...defaultParams };

  // State (initialized from user-controlled initial position)
  let initial_x = 0.25;
  let initial_y = 0;
  let state: Toy11State = initState({ x: initial_x, y: initial_y });

  let vizHandle: any = null;
  let running = true;

  const stepInterval = 80; // ms

  onMount(() => {
    if (container) vizHandle = viz.init(container, 600, 400);
    // render field with current params
    if (vizHandle) viz.renderField(vizHandle, (p: Vec2) => modelV(p, params));

    const tick = () => {
      if (!running) return;
      state = modelUpdate(state, params);
      if (vizHandle)
        viz.update(vizHandle, state, (p: Vec2) => modelV(p, params));
      setTimeout(tick, stepInterval);
    };
    tick();
  });

  // Re-render the sampled vector field whenever parameters change
  $: if (vizHandle) {
    viz.renderField(vizHandle, (p: Vec2) => modelV(p, params));
  }

  onDestroy(() => {
    running = false;
    if (vizHandle) viz.destroy(vizHandle);
  });
</script>

<h3>Toy 11: Framing Field (Vector Influence)</h3>

<section class="toy-description">
  <p>
    This toy depicts a 2D state moving according to a vector field defined over
    an abstract coordinate plane.<br />
    At each step, the point adds the local arrow's direction to its position.<br
    />
    This produces a smooth flow pattern shaped entirely by the vector field.<br
    />
    The movement carries no semantic, cognitive, or psychological meaning.
  </p>

  <p>
    In turn-based exchanges, certain external features in the contributions of
    each participant may pick up a mild "lean" from the way recent turns were
    phrased.<br />
    Not because anyone intends it or prefers it, but simply because the flow of the
    exchange provides a small structural nudge.<br />
    This toy shows that idea in geometric form: a field of arrows offering a gentle
    directional influence.
  </p>
</section>

<div class="visualization" bind:this={container}></div>

<div class="controls">
  <label>
    vector_strength — magnitude of the directional influence
    <input
      type="range"
      min="0"
      max="2"
      step="0.01"
      bind:value={params.vector_strength}
    />
    <span class="val">{params.vector_strength.toFixed(2)}</span>
  </label>
  <label>
    vector_rotation — orientation of the flow
    <input
      type="range"
      min="0"
      max="360"
      step="1"
      bind:value={params.vector_rotation}
    />
    <span class="val">{params.vector_rotation.toFixed(0)}°</span>
  </label>
  <label>
    initial_x — starting coordinates
    <input type="range" min="-1" max="1" step="0.01" bind:value={initial_x} />
    <span class="val">{initial_x.toFixed(2)}</span>
  </label>
  <label>
    initial_y — starting coordinates
    <input type="range" min="-1" max="1" step="0.01" bind:value={initial_y} />
    <span class="val">{initial_y.toFixed(2)}</span>
  </label>
  <button
    on:click={() => {
      state = initState({ x: initial_x, y: initial_y });
    }}>Reset</button
  >
</div>

<details open>
  <summary>What this toy does <em>not</em> represent</summary>
  <p>This toy does not represent:</p>
  <ul>
    <li>thoughts</li>
    <li>intentions</li>
    <li>feelings</li>
    <li>preferences</li>
    <li>cognitive states</li>
    <li>psychological forces</li>
    <li>internal human or AI mechanisms</li>
    <li>meaning, sentiment, or interpretation</li>
    <li>motivation or goal-directed behavior</li>
  </ul>
  <p>
    The point moves according to the arrows on the screen, not internal states
    of participants.
  </p>
</details>

<details>
  <summary>What this toy represents</summary>
  <ul>
    <li>a point moving under the influence of a mathematical vector field</li>
    <li>how small external directional tendencies can shape a trajectory</li>
    <li>surface-level flow in a pattern across steps</li>
    <li>
      a geometric illustration of structural nudges in turn-based exchanges
    </li>
  </ul>
</details>

<details>
  <summary>For academic readers</summary>
  <p>
    This toy can be understood as a discrete-time integration of a vector field,
    similar to Euler integration in dynamical systems or flow visualization in
    computational geometry. It illustrates how orientation and magnitude of a
    field shape the trajectory through state space. It is relevant to academic
    discussions of flow lines, direction fields, and low-dimensional guidance
    structures.
  </p>
  <p>No further implications are intended.</p>
</details>

<details>
  <summary>Sliders</summary>

  <h4>vector_strength — magnitude of the directional influence</h4>
  <p>
    Controls how strongly the vector field steers the point.<br />
    Higher values produce more pronounced curvature; lower values create subtle drift.
  </p>

  <h4>vector_rotation — orientation of the flow</h4>
  <p>
    Rotates the entire vector field.<br />
    Changing this angle alters the directional pattern of movement.
  </p>

  <h4>initial_x / initial_y — starting coordinates</h4>
  <p>
    Specify where the point begins its path.<br />
    Different starting points reveal how the flow behaves across the plane.
  </p>
</details>

<details>
  <summary>Fields this dynamic draws from</summary>
  <ul>
    <li>vector field visualization</li>
    <li>dynamical systems (flow patterns)</li>
    <li>iterative update rules</li>
    <li>geometry (direction fields)</li>
    <li>signal shaping and trajectory guidance</li>
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
    border: 1px solid #ddd;
    margin: 12px 0;
  }

  .controls {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin: 12px 0;
    flex-wrap: wrap;
  }

  .controls label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
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
