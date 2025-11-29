<script lang="ts">
  /**
   * App shell
   * Minimal application shell that mounts toy components.
   * Includes the Stability vs Drift toy.
   */
  import ToyStabilityVsDrift from './components/ToyStabilityVsDrift.svelte';
</script>

<main>
  <header>
    <h1>haii-dynamics — Toy gallery</h1>
    <p style="margin:0">Interactive toy models demonstrating abstract interaction dynamics.</p>
  </header>

  <section>
    <ToyStabilityVsDrift />
  </section>
</main>

<style>
  main { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; padding: 1rem; }
  header { margin-bottom: 1rem }
  section { max-width: 760px }
</style>
