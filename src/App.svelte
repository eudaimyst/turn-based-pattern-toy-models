<script lang="ts">
  /**
   * App shell
   * Minimal application shell that mounts toy components.
   * Includes the Stability vs Drift toy.
   */
  import Toy1 from "./components/Toy1.svelte";
  import Toy2 from "./components/Toy2.svelte";
  import Toy3 from "./components/Toy3.svelte";
  import Toy4 from "./components/Toy4.svelte";
  import Toy5 from "./components/Toy5.svelte";
  import Toy6 from "./components/Toy6.svelte";
  import Toy7 from "./components/Toy7.svelte";
  import Toy8 from "./components/Toy8.svelte";
  import Gallery from "./components/Gallery.svelte";

  // selectedToy: null shows gallery; otherwise render the chosen toy
  let selectedToy: string | null = null;

  function handleSelect(event: CustomEvent<string>) {
    selectedToy = event.detail as string;
  }

  function backToGallery() {
    selectedToy = null;
  }
</script>

<main>
  <header>
    <h1>haii-dynamics — Toy gallery</h1>
    <p style="margin:0">
      Interactive toy models demonstrating abstract interaction dynamics.
    </p>
  </header>

  <section>
    {#if !selectedToy}
      <Gallery on:selectToy={handleSelect} />
    {:else if selectedToy === "toy1"}
      <div class="toy-header">
        <button on:click={backToGallery} class="back">Back</button>
      </div>
      <Toy1 />
    {:else if selectedToy === "toy2"}
      <div class="toy-header">
        <button on:click={backToGallery} class="back">Back</button>
      </div>
      <Toy2 />
    {:else if selectedToy === "toy3"}
      <div class="toy-header">
        <button on:click={backToGallery} class="back">Back</button>
      </div>
      <Toy3 />
    {:else if selectedToy === "toy4"}
      <div class="toy-header">
        <button on:click={backToGallery} class="back">Back</button>
      </div>
      <Toy4 />
    {:else if selectedToy === "toy5"}
      <div class="toy-header">
        <button on:click={backToGallery} class="back">Back</button>
      </div>
      <Toy5 />
    {:else if selectedToy === "toy6"}
      <div class="toy-header">
        <button on:click={backToGallery} class="back">Back</button>
      </div>
      <Toy6 />
    {:else if selectedToy === "toy7"}
      <div class="toy-header">
        <button on:click={backToGallery} class="back">Back</button>
      </div>
      <Toy7 />
    {:else if selectedToy === "toy8"}
      <div class="toy-header">
        <button on:click={backToGallery} class="back">Back</button>
      </div>
      <Toy8 />
    {:else}
      <div class="toy-header">
        <button on:click={backToGallery} class="back">Back</button>
      </div>
      <div class="not-impl">
        <h3>Not implemented</h3>
        <p>
          This toy is a placeholder in the gallery and has not been implemented
          yet.
        </p>
      </div>
    {/if}
  </section>
</main>

<style>
  main {
    font-family:
      system-ui,
      -apple-system,
      "Segoe UI",
      Roboto,
      "Helvetica Neue",
      Arial;
    padding: 1rem;
  }
  header {
    margin-bottom: 1rem;
  }
  section {
    max-width: 760px;
  }
</style>
