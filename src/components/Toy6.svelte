<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import {
    init as initViz,
    destroy as destroyViz,
  } from "../visualizations/viz-toy6";
  import { compute, defaultParams } from "../models/model-toy6";
  import type { Params } from "../models/model-toy6";

  export const id = "toy6";

  let container: HTMLDivElement | null = null;
  let viz: any = null;

  let params: Params = { ...defaultParams };

  // slider bindings
  let u_x = params.u_x;
  let u_y = params.u_y;
  let m_x = params.m_x;
  let m_y = params.m_y;

  function render() {
    if (!viz) return;
    params.u_x = u_x;
    params.u_y = u_y;
    params.m_x = m_x;
    params.m_y = m_y;
    const { R1, R2, I } = compute(params);
    viz.render(R1, R2, I);
  }

  onMount(() => {
    if (!container) return;
    viz = initViz(container, 420, 420);
    render();
    window.addEventListener("resize", () => {
      if (container) viz.resize(container.clientWidth, 420);
    });
  });

  onDestroy(() => {
    if (container) destroyViz(container);
  });
</script>

<div class="toy">
  <h3>Toy 6: Constraint Drift</h3>

  <section class="toy-description">
    <p>
      <em
        >A pattern showing how two shifting allowable regions overlap, shrink,
        or disappear as they move.</em
      >
    </p>
    <p>
      This toy displays two rectangular regions that translate across the plane
      according to slider inputs. These rectangles do not represent thoughts,
      feelings, intentions, or internal states. The pattern illustrates how
      independent constraints create a shared feasible zone: as each region
      moves, the geometric intersection between them appears, drifts, expands,
      or vanishes. The toy captures how overlapping limits behave in turn-based
      processes without implying any psychological or internal meaning.
    </p>
  </section>

  <div class="visualization" bind:this={container}></div>

  <div class="controls">
    <label>
      u_x
      <input
        type="range"
        min="-1"
        max="1"
        step="0.01"
        bind:value={u_x}
        on:input={render}
      />
      <span class="val">{u_x.toFixed(2)}</span>
    </label>

    <label>
      u_y
      <input
        type="range"
        min="-1"
        max="1"
        step="0.01"
        bind:value={u_y}
        on:input={render}
      />
      <span class="val">{u_y.toFixed(2)}</span>
    </label>

    <label>
      m_x
      <input
        type="range"
        min="-1"
        max="1"
        step="0.01"
        bind:value={m_x}
        on:input={render}
      />
      <span class="val">{m_x.toFixed(2)}</span>
    </label>

    <label>
      m_y
      <input
        type="range"
        min="-1"
        max="1"
        step="0.01"
        bind:value={m_y}
        on:input={render}
      />
      <span class="val">{m_y.toFixed(2)}</span>
    </label>

    <button on:click={render}>Update</button>
    <button
      on:click={() => {
        u_x = 0;
        u_y = 0;
        m_x = 0;
        m_y = 0;
        render();
      }}>Reset</button
    >
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
      <li>preferences, motives, or negotiation</li>
      <li>psychological states or modes</li>
    </ul>
  </details>

  <details>
    <summary>What this toy represents</summary>
    <ul>
      <li>two drifting rectangular constraint regions</li>
      <li>the geometric intersection between independent limits</li>
      <li>how a shared feasible zone moves or disappears</li>
      <li>
        surface-level patterns of overlapping constraints in turn-based
        processes
      </li>
    </ul>
  </details>

  <details>
    <summary>For academic readers</summary>
    <p>
      This toy corresponds to a geometric intersection-of-constraints
      visualization. Academically, it aligns with classical constraint
      satisfaction problems, feasibility region drift, and parametric motion of
      convex sets. It provides a clear illustration of how overlapping feasible
      regions evolve under translation, without invoking internal or
      psychological constructs.
    </p>
    <p>No further academic notes beyond that mapping.</p>
  </details>

  <details>
    <summary>Sliders</summary>
    <h4>u_x — horizontal shift of the first region</h4>
    <p>
      Moves the first rectangle left or right. Represents one set of constraints
      shifting its allowable range along the horizontal axis.
    </p>
    <h4>u_y — vertical shift of the first region</h4>
    <p>
      Moves the first rectangle up or down. Shapes the vertical placement of the
      first constraint region.
    </p>
    <h4>m_x — horizontal shift of the second region</h4>
    <p>Moves the second rectangle horizontally, independent of the first.</p>
    <h4>m_y — vertical shift of the second region</h4>
    <p>
      Moves the second rectangle vertically, determining how its allowable zone
      aligns with the first.
    </p>
  </details>

  <details>
    <summary>Intuitive example</summary>
    <p>Imagine two people placing "acceptable zones" on a shared map — not emotionally, just spatially:</p>
    <p>One marks a blue rectangle: "Here is where things can take place."</p>
    <p>The other marks a red rectangle: "Here is where things can take place."</p>
    <p>Where the two zones overlap, something can occur.</p>
    <p>Move either rectangle even a little, and the shared zone shifts — sometimes widening, sometimes vanishing entirely.</p>
    <p>This toy shows that overlap as a clear geometric shape.</p>
  </details>

  <details>
    <summary>Fields this dynamic draws from</summary>
    <ul>
      <li>
        geometry and computational graphics (region translation, box–box
        intersection)
      </li>
      <li>constraint satisfaction (finding shared feasible zones)</li>
      <li>optimization and control (drifting parameter limits)</li>
      <li>interaction design (overlapping active regions)</li>
      <li>iterative process modeling (changing constraints across steps)</li>
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
    margin: 1rem 0;
  }
  label {
    font-size: 0.85rem;
  }
  .val {
    margin-left: 0.25rem;
    font-variant-numeric: tabular-nums;
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
