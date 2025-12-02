<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import {
    init as initViz,
    destroy as destroyViz,
  } from "../visualizations/viz-toy10";
  import { initState, step, defaultParams } from "../models/model-toy10";
  import type { Params, State } from "../models/model-toy10";

  export const id = "toy10";

  // Parameters bound to sliders
  let params: Params = { ...defaultParams };

  // local mutable state
  let state: State = initState(0, 0);
  let history: { x: number; y: number }[] = [{ x: state.x, y: state.y }];

  let container: HTMLElement | null = null;
  let viz: any = null;
  let intervalId: number | null = null;

  // potential function used by viz
  function potential(x: number, y: number) {
    const a = params.well_depth;
    const px = params.well_position_x;
    const py = params.well_position_y;
    return a * (x - px) * (x - px) + a * (y - py) * (y - py);
  }

  function stepOnce() {
    state = step(state, params);
    history.push({ x: state.x, y: state.y });
    if (history.length > 400) history.shift();
    if (viz && viz.render) viz.render(history, potential);
  }

  onMount(() => {
    if (container) viz = initViz(container, 480, 400);
    // render initial
    if (viz && viz.render) viz.render(history, potential);

    // default step interval
    intervalId = window.setInterval(stepOnce, 100);

    return () => {};
  });

  onDestroy(() => {
    if (intervalId) clearInterval(intervalId);
    if (container) destroyViz(container);
  });
</script>

<h3>Toy 10: Potential Surface</h3>

<section class="toy-description">
  <p>
    This toy displays a numerical state moving according to the slope of a
    surface defined by the sliders.<br />
    The point's movement does not represent thoughts, feelings, preferences, internal
    modes, or any cognitive process.<br />
    It reflects a simple structural tendency: when the surface is tilted, the point
    drifts toward the lowest region.
  </p>

  <p>
    In some exchanges, certain external features in the contributions of each
    participant may drift toward familiar ranges across turns.<br />
    This is an observation about surface-level patterns only.
  </p>

  <p>
    The toy provides a geometric illustration of how such drift can look: a
    point sliding across a shaped surface toward a designated minimum.<br />
    The toy demonstrates <em>only the shape</em> of this tendency, not any cause
    or internal mechanism.
  </p>
</section>

<div class="visualization" bind:this={container}></div>

<div class="controls">
  <div>
    <label>
      well_depth — steepness of the low region
      <input
        type="range"
        min="0"
        max="2"
        step="0.01"
        bind:value={params.well_depth}
      />
      <span class="val">{params.well_depth.toFixed(2)}</span>
    </label>
  </div>

  <div>
    <label>
      well_position_x — location of the low region
      <input
        type="range"
        min="-1"
        max="1"
        step="0.01"
        bind:value={params.well_position_x}
      />
      <span class="val">{params.well_position_x.toFixed(2)}</span>
    </label>
  </div>

  <div>
    <label>
      well_position_y — location of the low region
      <input
        type="range"
        min="-1"
        max="1"
        step="0.01"
        bind:value={params.well_position_y}
      />
      <span class="val">{params.well_position_y.toFixed(2)}</span>
    </label>
  </div>

  <div>
    <label>
      noise_level — small visual jitter
      <input
        type="range"
        min="0"
        max="0.3"
        step="0.001"
        bind:value={params.noise_level}
      />
      <span class="val">{params.noise_level.toFixed(3)}</span>
    </label>
  </div>
</div>

<details open>
  <summary>What this toy does <em>not</em> represent</summary>
  <p>
    This toy shows how external patterns in an exchange can drift toward
    familiar ranges over turns.<br />
    It has no inherent meaning.<br />
    It is simply a visual way to demonstrate how a geometric surface can shape the
    path of a numerical pattern.
  </p>

  <p>
    If you've seen attractors used in psychology or neural models, this toy is
    not that.<br />
    It uses the same math-term but for a completely different purpose:<br />
    to illustrate motion on a surface, not mental or internal processes.
  </p>

  <p>
    The attractor lives in the graph, not in the participants.<br />
    It does not represent anything beyond the geometry you see.
  </p>

  <p>This toy does not represent:</p>
  <ul>
    <li>moods</li>
    <li>modes</li>
    <li>preferences</li>
    <li>desires</li>
    <li>intentions</li>
    <li>cognitive states</li>
    <li>personality traits</li>
    <li>latent features</li>
    <li>internal human or AI mechanisms</li>
    <li>emotional or psychological settling</li>
    <li>interpretation, motivation, or meaning</li>
  </ul>

  <p>
    The point moves purely according to the defined surface, not because of any
    internal state of a participant.
  </p>

  <h4>SIDEBAR</h4>
  <p>
    ✔️ A low spot in a mathematical surface that the point slides toward<br />
    ✖️ Not a mood, preference, "mode," or internal state of anyone involved
  </p>

  <p>
    This toy shows how external patterns in an exchange can drift toward
    familiar ranges over turns.<br />
    It has no inherent meaning, and it is not a clue about what the participants
    "are," "feel," or "intend."<br />
    It is simply a visual way to demonstrate how a geometric surface can shape the
    path of a numerical pattern.
  </p>

  <p>
    If you've seen attractors used in psychology or neural models, this toy is
    not that.<br />
    It uses the same math-term but for a completely different purpose:<br />
    to illustrate motion on a surface, not mental or internal processes.
  </p>

  <p>
    The attractor lives in the graph, not in the participants.<br />
    It does not represent anything beyond the geometry you see.
  </p>
</details>

<details>
  <summary>What this toy represents</summary>
  <p>✔️ A low spot in a mathematical surface that the point slides toward</p>
  <ul>
    <li>a point responding to the slope of a mathematical surface</li>
    <li>how a defined low region influences drift in the external pattern</li>
    <li>the effect of depth and position on trajectory</li>
    <li>a geometric depiction of surface-level structural tendencies</li>
  </ul>
</details>

<details>
  <summary>For academic readers</summary>
  <p>
    Academically, this reflects gradient descent motion on a parametric
    potential surface (a scalar field). It provides a visual tool for
    demonstrating how local minima shape trajectories and how changes in depth
    or position affect convergence. Although inspired by mathematical attractor
    landscapes, the toy intentionally avoids any psychological or cognitive
    mapping.
  </p>
  <p>
    Researchers may find it useful for illustrating geometric reasoning about
    gradient fields without semantic overinterpretation.
  </p>
</details>

<details>
  <summary>Sliders</summary>

  <h4>well_depth — steepness of the low region</h4>
  <p>
    Controls how strongly the point is pulled toward the minimum.<br />
    Deeper well: steeper slope and faster drift.<br />
    Shallow well: gentler slope and slower drift.
  </p>

  <h4>well_position_x / well_position_y — location of the low region</h4>
  <p>
    Moves the position of the minimum within the 2D plane.<br />
    The point drifts toward whichever coordinates are set as the lowest point.
  </p>

  <h4>noise_level — small visual jitter</h4>
  <p>
    Adds minor fluctuations to make the trajectory easier to follow.<br />
    This noise is purely aesthetic and does not represent randomness in human or
    AI behaviour.
  </p>
</details>

<details>
  <summary>Fields this dynamic draws from</summary>
  <ul>
    <li>physics (potential surfaces, slope-based motion)</li>
    <li>optimization (gradient descent)</li>
    <li>dynamical systems (local minima and convergence)</li>
    <li>geometry (contours and level sets)</li>
    <li>stochastic processes (noise perturbations)</li>
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
    margin: 12px 0;
  }

  .controls > div {
    margin: 6px 0;
  }

  .controls label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    margin-bottom: 4px;
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
