<script>
  import Plotly from "plotly.js-dist-min";

  // ---- Variables (your sliders) ----
  let stability = 0.8; // tendency to return to baseline
  let drift = 0.3; // random wander
  let userPerturbation = 0.5; // how much the user nudges state each step

  // Simulation parameters
  let steps = 400;
  let data = [];

  // bind the plot element
  let plotEl;

  // ---- Core simulation ----
  function simulate() {
    let x = 0; // start at baseline
    data = [];

    for (let t = 0; t < steps; t++) {
      let noise = (Math.random() * 2 - 1) * drift;
      let user = (Math.random() * 2 - 1) * userPerturbation;

      // Core equation:
      // x(t+1) = stability*x(t) + noise + user
      x = (1 - stability) * x + noise + user;

      data.push({ t, x });
    }

    drawPlot();
  }

  // ---- Plotly renderer ----
  function drawPlot() {
    // guard: don't try to draw before the element is mounted
    if (!plotEl) return;

    const trace = {
      x: data.map((d) => d.t),
      y: data.map((d) => d.x),
      mode: "lines",
      type: "scatter",
      line: { color: "#00aaff" },
    };

    const layout = {
      title: "Toy 1: Stability vs Drift",
      xaxis: { title: "Time" },
      // fixed y-axis range so plot scale is constant
      yaxis: { title: "State", autorange: false, range: [-10, 10] },
      // fix the x-axis to the simulation steps
      xaxis: {
        title: "Time",
        autorange: false,
        range: [0, Math.max(steps - 1, 1)],
      },
      margin: { t: 40 },
    };

    // use Plotly.react for updates (faster) or Plotly.newPlot for full redraw
    Plotly.react(plotEl, [trace], layout);
    console.log("drawPlot", {
      len: data.length,
      sample: data.slice(0, 3),
      plotEl,
    });
  }

  // Auto-run when sliders move
  $: simulate();
  $: {
    // reference the reactive inputs so this block reruns when they change
    stability;
    drift;
    userPerturbation;
    steps;

    simulate();
    // optional debug log to confirm re-run
    console.log("simulate run", { stability, drift, userPerturbation, steps });
  }
</script>

<h2>🐾 Toy 1 — Stability vs Drift</h2>

<div class="controls">
  <label>
    Stability: {stability.toFixed(2)}
    <input type="range" min="0" max="1" step="0.01" bind:value={stability} />
  </label>

  <label>
    Drift / Noise: {drift.toFixed(2)}
    <input type="range" min="0" max="1" step="0.01" bind:value={drift} />
  </label>

  <label>
    User Perturbation: {userPerturbation.toFixed(2)}
    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      bind:value={userPerturbation}
    />
  </label>
</div>

<div bind:this={plotEl} style="width: 100%; height: 400px;"></div>

<style>
  .controls {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;
    max-width: 300px;
  }
</style>
