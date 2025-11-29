<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{ selectToy: string }>();

  // Manually-defined toy list (no auto-discovery).
  // Each entry: id, name, placeholder color
  export const toys = [
    { id: 'stability-vs-drift', name: 'Stability vs Drift', color: '#cbd5e0' },
    { id: 'threshold-response', name: 'Threshold Response', color: '#e6fffa' },
    { id: 'context-saturation', name: 'Context Saturation', color: '#fef3c7' },
    { id: 'coupling-strength', name: 'Coupling Strength', color: '#ede9fe' },
    { id: 'noise-sensitivity', name: 'Noise Sensitivity', color: '#fff1f2' },
    { id: 'attractor-landscape', name: 'Attractor Landscape', color: '#ecfeff' },
    { id: 'hysteresis', name: 'Hysteresis / Path Dependence', color: '#f0f9ff' },
    { id: 'oscillation', name: 'Oscillation (damped)', color: '#fefce8' },
    { id: 'framing-field', name: 'Framing Field (vector influences)', color: '#f8fafc' },
    { id: 'joint-context-vector', name: 'Joint Context Vector Map', color: '#fff7ed' },
  ];

  function select(id: string) {
    dispatch('selectToy', id);
  }
</script>

<section class="gallery">
  {#each toys as toy}
    <div class="card" role="article">
      <div class="placeholder" style="background:{toy.color}" aria-hidden="true">
        <svg width="100%" height="100%" viewBox="0 0 100 60" preserveAspectRatio="xMidYMid meet">
          <rect x="8" y="8" width="84" height="44" rx="4" fill="rgba(255,255,255,0.6)" stroke="none"/>
        </svg>
      </div>
      <div class="meta">
        <div class="name">{toy.name}</div>
        <button on:click={() => select(toy.id)} aria-label={`Open ${toy.name}`} class="open">Open</button>
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
  .card { border: 1px solid #e6e9ef; padding: 0.5rem; border-radius: 6px; display:flex; flex-direction:column; gap:0.5rem }
  .placeholder { height: 90px; display:flex; align-items:center; justify-content:center; border-radius:4px }
  .meta { display:flex; justify-content:space-between; align-items:center }
  .name { font-size:0.95rem }
  .open { background:#2563eb; color:white; border:none; padding:0.35rem 0.6rem; border-radius:4px; cursor:pointer }
  .open:focus { outline:2px solid #bfdbfe }
</style>
