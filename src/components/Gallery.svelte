<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher<{ selectToy: string }>();

  // Manually-defined toy list (no auto-discovery).
  // Each entry: id, name, placeholder color
  export const toys = [
    // Keep the first entry exactly as-is (wiring depends on this id/name)
    { id: "toy1", name: "Stability vs Drift", color: "#cbd5e0" },

    // 2. Coupling Strength
    { id: "toy2", name: "Coupling Strength", color: "#ede9fe" },

    // 3. Oscillation (Damped)
    { id: "toy3", name: "Oscillation (Damped)", color: "#fefce8" },

    // 4. Hysteresis / Path Dependence
    { id: "toy4", name: "Hysteresis / Path Dependence", color: "#f0f9ff" },

    // 5. Joint Context Vector Map
    { id: "toy5", name: "Joint Context Vector Map", color: "#fff7ed" },

    // 6. Constraint Drift
    { id: "toy6", name: "Constraint Drift", color: "#fff4f3" },

    // 7. Context Saturation
    { id: "toy7", name: "Context Saturation", color: "#fef3c7" },

    // 8. Noise Sensitivity
    { id: "toy8", name: "Noise Sensitivity", color: "#fff1f2" },

    // 9. Mutual Information Pulse Response
    { id: "toy9", name: "Mutual Information Pulse Response", color: "#eef2ff" },

    // 10. Attractor Landscape
    { id: "toy10", name: "Attractor Landscape", color: "#ecfeff" },

    // 11. Framing Field
    { id: "toy11", name: "Framing Field", color: "#f8fafc" },

    // 12. Impulse Response
    { id: "toy12", name: "Impulse Response", color: "#fffbeb" },

    // 13. Bifurcation Explorer
    { id: "toy13", name: "Bifurcation Explorer", color: "#f7fee7" },
  ];

  function select(id: string) {
    dispatch("selectToy", id);
  }
</script>

<section class="gallery">
  {#each toys as toy}
    <div class="card" role="article">
      <div
        class="placeholder"
        style="background:{toy.color}"
        aria-hidden="true"
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 60"
          preserveAspectRatio="xMidYMid meet"
        >
          <rect
            x="8"
            y="8"
            width="84"
            height="44"
            rx="4"
            fill="rgba(255,255,255,0.6)"
            stroke="none"
          />
        </svg>
      </div>
      <div class="meta">
        <div class="name">{toy.name}</div>
        <button
          on:click={() => select(toy.id)}
          aria-label={`Open ${toy.name}`}
          class="open">Open</button
        >
      </div>
    </div>
  {/each}
</section>

<style>
  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
  }
  .card {
    border: 1px solid #e6e9ef;
    padding: 0.5rem;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .placeholder {
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
  }
  .meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .name {
    font-size: 0.95rem;
  }
  .open {
    background: #2563eb;
    color: white;
    border: none;
    padding: 0.35rem 0.6rem;
    border-radius: 4px;
    cursor: pointer;
  }
  .open:focus {
    outline: 2px solid #bfdbfe;
  }
</style>
