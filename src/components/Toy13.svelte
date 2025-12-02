<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import {
    init as initViz,
    destroy as destroyViz,
  } from "../visualizations/viz-toy13";
  import { sampleBifurcation, defaultParams } from "../models/model-toy13";

  export const id = "toy13";

  // UI parameters bound to sliders
  let r = defaultParams.r;
  let initial_x = defaultParams.initial_x;

  // visualization container
  let container: HTMLElement | null = null;
  let viz: any = null;

  // sampling settings (kept local to component)
  // high-resolution sampling defaults (user-requested ranges)
  // lowered default to avoid large allocations by default
  // High-resolution defaults (confirmed)
  let N_r = 4000; // number of r samples (recommend 2000-4000)
  let burn_in = 500; // burn-in iterations
  let plot_iterations = 1000; // post-burn samples per r
  let jitter = 0.001; // jitter added to initial x per r
  let multisample = 2; // number of independent trajectories per r
  let doSecondPass = true; // recompute extra points for chaotic columns (r>3.4)
  const CHUNK_COLS = 64; // columns per chunk for streaming

  // bifurcation data will be transferred as Float32Array [r,x,r,x,...]
  let bifBuffer: Float32Array | null = null;
  let currentTrajectory: Float32Array | null = null;
  let loading = false;
  let worker: Worker | null = null;

  function createWorker() {
    if (worker) return worker;
    const code = `
    // chunked worker: compute bifurcation samples in chunks and post them progressively
    console.log('[Toy13-worker] loaded (chunked)');
    self.onmessage = function(e) {
      try {
        const data = e.data;
        if (!data || !data.cmd) return;
        if (data.cmd === 'compute') {
          const N_r = data.N_r;
          const burn_in = data.burn_in;
          const post = data.post;
          const jitter = data.jitter || 0;
          const multisample = data.multisample || 1;
          const secondPass = data.secondPass || false;
          const chunkSize = data.chunkSize || 64; // columns per chunk

          console.log('[Toy13-worker] compute start', {N_r, burn_in, post, jitter, multisample, secondPass, chunkSize});

          // process in chunks
          for (let startCol = 0; startCol < N_r; startCol += chunkSize) {
            const endCol = Math.min(N_r, startCol + chunkSize);
            const cols = endCol - startCol;
            const buf = new Float32Array(cols * post * multisample * 2);
            let idx = 0;
            for (let i = startCol; i < endCol; i++) {
              const baseR = (4 * i) / (N_r - 1);
              for (let ms = 0; ms < multisample; ms++) {
                const r = baseR;
                let x = data.initial_x + (Math.random() * jitter - jitter / 2);
                for (let b = 0; b < burn_in; b++) x = r * x * (1 - x);
                for (let p = 0; p < post; p++) {
                  x = r * x * (1 - x);
                  buf[idx++] = r;
                  buf[idx++] = x;
                }
              }
            }
            self.postMessage({ cmd: 'chunk', startCol, endCol, buffer: buf.buffer }, [buf.buffer]);
          }

          if (secondPass) {
            for (let i = 0; i < N_r; i++) {
              const r = (4 * i) / (N_r - 1);
              if (r <= 3.4) continue;
              const buf2 = new Float32Array(post * 2);
              let x2 = data.initial_x + (Math.random() * jitter - jitter / 2);
              for (let b = 0; b < burn_in; b++) x2 = r * x2 * (1 - x2);
              let idx2 = 0;
              for (let p = 0; p < post; p++) {
                x2 = r * x2 * (1 - x2);
                buf2[idx2++] = r;
                buf2[idx2++] = x2;
              }
              self.postMessage({ cmd: 'secondChunk', col: i, buffer: buf2.buffer }, [buf2.buffer]);
            }
          }

          self.postMessage({ cmd: 'done' });
          return;
        } else if (data.cmd === 'current') {
          const r0 = data.r;
          const burn_in = data.burn_in;
          const plot_iterations = data.plot_iterations;
          let x0 = data.initial_x;
          for (let b = 0; b < burn_in; b++) x0 = r0 * x0 * (1 - x0);
          const cur = new Float32Array(plot_iterations);
          for (let p = 0; p < plot_iterations; p++) {
            x0 = r0 * x0 * (1 - x0);
            cur[p] = x0;
          }
          console.log('[Toy13-worker] currentDone posting', {r0, plot_iterations});
          self.postMessage({ cmd: 'currentDone', currentBuffer: cur.buffer }, [cur.buffer]);
          return;
        }
      } catch (err) {
        try { self.postMessage({ cmd: 'error', message: err && err.message ? err.message : String(err) }); } catch (e) {}
      }
    };`;

    const blob = new Blob([code], { type: "application/javascript" });
    const url = URL.createObjectURL(blob);
    worker = new Worker(url);
    console.log("[Toy13] worker created", url);
    return worker;
  }

  function scheduleComputeBifViaWorker(): Promise<void> {
    if (loading)
      return Promise.reject(new Error("Compute already in progress"));
    loading = true;
    return new Promise((resolve, reject) => {
      const w = createWorker();
      // progressive rendering handler
      if (viz && viz.clear) viz.clear();
      let totalChunks = Math.ceil(N_r / CHUNK_COLS);
      let receivedChunks = 0;
      const handler = (ev: MessageEvent) => {
        const d = ev.data;
        if (!d || !d.cmd) return;
        if (d.cmd === "chunk") {
          // wrap transferred buffer and append
          const arr = new Float32Array(d.buffer);
          if (viz && viz.appendPoints) viz.appendPoints(arr);
          receivedChunks++;
          console.log(
            "[Toy13] received chunk",
            d.startCol,
            d.endCol,
            "progress",
            receivedChunks,
            "/",
            totalChunks
          );
        } else if (d.cmd === "secondChunk") {
          const arr2 = new Float32Array(d.buffer);
          if (viz && viz.appendPoints) viz.appendPoints(arr2);
        } else if (d.cmd === "done") {
          loading = false;
          w.removeEventListener("message", handler as any);
          console.log("[Toy13] compute done");
          resolve();
        } else if (d.cmd === "error") {
          loading = false;
          w.removeEventListener("message", handler as any);
          reject(new Error(d.message || "Worker error"));
        }
      };
      w.addEventListener("message", handler as any);
      w.onerror = (err) => {
        console.error("[Toy13] worker error event", err);
        loading = false;
        w.removeEventListener("message", handler as any);
        reject(err);
      };
      console.log("[Toy13] posting compute to worker (chunked)", {
        N_r,
        burn_in,
        post: plot_iterations,
        jitter,
        multisample,
        doSecondPass,
        CHUNK_COLS,
      });
      w.postMessage({
        cmd: "compute",
        N_r,
        burn_in,
        post: plot_iterations,
        initial_x,
        jitter,
        multisample,
        secondPass: doSecondPass,
        chunkSize: CHUNK_COLS,
      });
    });
  }

  // initial compute via worker
  scheduleComputeBifViaWorker()
    .then(() => {
      if (viz && bifBuffer) viz.render(bifBuffer, r, currentTrajectory);
    })
    .catch((err) => {
      console.error("[Toy13] initial compute failed", err);
      loading = false;
    });

  function requestCurrentTrajectoryFromWorker(): Promise<void> {
    return new Promise((resolve, reject) => {
      const w = createWorker();
      // install a one-time message handler so we don't overwrite global handlers
      const handler = (ev: MessageEvent) => {
        const d = ev.data;
        console.log(
          "[Toy13] worker message (current)",
          d && d.cmd,
          d && d.currentBuffer && d.currentBuffer.byteLength
        );
        if (d && d.cmd === "currentDone") {
          currentTrajectory = new Float32Array(d.currentBuffer);
          console.log(
            "[Toy13] currentTrajectory length",
            currentTrajectory.length
          );
        }
        w.removeEventListener("message", handler as any);
        resolve();
      };
      w.addEventListener("message", handler as any);
      w.onerror = (err) => {
        w.removeEventListener("message", handler as any);
        reject(err);
      };
      console.log("[Toy13] posting current request to worker", {
        r,
        burn_in,
        plot_iterations,
        initial_x,
      });
      w.postMessage({ cmd: "current", r, burn_in, plot_iterations, initial_x });
    });
  }

  onMount(() => {
    if (container) viz = initViz(container, 1200, 600);
    // initial overlay render (background will be populated by worker chunks)
    if (viz) {
      // draw initial indicator line
      viz.clearOverlay && viz.clearOverlay();
      viz.drawOverlayLine && viz.drawOverlayLine(r);
    }
    return () => {};
  });

  // when the selected r changes, request the trajectory for that r (cheap)
  // guard with lastR so we don't loop whenever currentTrajectory or bifBuffer updates
  let lastR = r;
  $: if (viz && r !== lastR) {
    lastR = r;
    // update overlay only: clear overlay, draw vertical line, request new trajectory
    try {
      viz.clearOverlay && viz.clearOverlay();
      viz.drawOverlayLine && viz.drawOverlayLine(r);
    } catch (e) {
      console.error("[Toy13] overlay draw failed", e);
    }
    // fetch trajectory from worker and draw it on the overlay when ready
    requestCurrentTrajectoryFromWorker()
      .then(() => {
        try {
          if (viz && viz.drawOverlayTrajectoryAtR && currentTrajectory) {
            viz.drawOverlayTrajectoryAtR(currentTrajectory, r);
          }
        } catch (e) {
          console.error("[Toy13] drawOverlayTrajectory failed", e);
        }
      })
      .catch((err) =>
        console.error("[Toy13] requestCurrentTrajectory failed", err)
      );
  }

  onDestroy(() => {
    if (container) destroyViz(container);
    // terminate worker if still present
    try {
      if (worker) {
        worker.terminate();
        worker = null;
      }
    } catch (e) {
      console.warn("[Toy13] error terminating worker", e);
    }
  });
</script>

<h3>Toy 13: Parameter–Bifurcation Explorer</h3>

<section class="toy-description">
  <p>
    <strong
      >⚠ NOTE: This toy has not been fully implemented per the description, it
      simply shows the full bifurcation map with all points plotted. ⚠</strong
    >
  </p>

  <p>
    This toy visualizes how the long-term outcomes of a simple nonlinear
    recurrence change when you adjust one parameter.<br />
    As the control parameter r increases, the recurrence may settle to a stable value,
    enter periodic cycles, or transition into richly structured high-variability
    regimes.<br />
    These branching structures are numerical outcomes only and do not represent thoughts,
    feelings, cognition, or internal states of any participant.
  </p>

  <p>
    The diagram illustrates a general property of iterative processes: small
    changes in a parameter can lead to large differences in long-term patterns.<br
    />
    This is a mathematical demonstration, not a model of conversation, psychology,
    or AI behaviour.
  </p>
</section>

<div class="visualization" bind:this={container}></div>

<div class="controls">
  <div>
    <label>
      r — control parameter
      <input type="range" min="2.8" max="4" step="0.0001" bind:value={r} />
      <span class="val">{r.toFixed(3)}</span>
    </label>
  </div>

  <div>
    <label>
      initial_x — starting value
      <input type="range" min="0" max="1" step="0.001" bind:value={initial_x} />
      <span class="val">{initial_x.toFixed(3)}</span>
    </label>
  </div>

  <div>
    <button
      on:click={async () => {
        // Run heavy computation off the main interactive path when possible
        // full recompute with high resolution in worker
        await scheduleComputeBifViaWorker();
        if (viz && viz.render && bifBuffer)
          viz.render(bifBuffer, r, currentTrajectory);
      }}
      disabled={loading}
    >
      {#if loading}
        Recomputing...
      {:else}
        Recompute Bifurcation
      {/if}
    </button>
  </div>
</div>

<details open>
  <summary>What this toy does <em>not</em> represent</summary>
  <p>
    Humans often notice that turn-based exchanges can diverge into different
    paths over time.<br />
    This toy does not model that behaviour, but its branching appearance may feel
    intuitively familiar.
  </p>

  <p>This toy does not represent:</p>
  <ul>
    <li>thoughts</li>
    <li>feelings</li>
    <li>intentions</li>
    <li>personality</li>
    <li>preferences</li>
    <li>cognition</li>
    <li>psychological states</li>
    <li>internal human or AI processes</li>
    <li>meaning, sentiment, or interpretation</li>
    <li>conversational "modes" or behavioural profiles</li>
  </ul>

  <p>
    It visualizes mathematical branching properties, not mental or cognitive
    dynamics.
  </p>
</details>

<details>
  <summary>What this toy represents</summary>
  <ul>
    <li>how long-term numerical patterns vary with a single parameter</li>
    <li>transitions between stable, periodic, and chaotic regimes</li>
    <li>branching behaviour in nonlinear recurrence rules</li>
    <li>surface-level mathematical structure only</li>
  </ul>
</details>

<details>
  <summary>For academic readers</summary>
  <p>
    This is a textbook bifurcation diagram of the logistic map, one of the
    canonical examples in chaos theory. For academic use, it can illustrate
    period-doubling cascades, Feigenbaum scaling, chaotic regimes, and
    sensitivity to parameter variation. Its inclusion serves solely as an
    example of how dramatically a simple recurrence can change with one
    parameter. No mapping to conversational or cognitive processes is implied.
  </p>
  <p>
    This is the only toy that displays chaotic behavior, chosen specifically
    because it is mathematically transparent and widely studied.
  </p>
</details>

<details>
  <summary>Sliders</summary>

  <h4>r — control parameter</h4>
  <p>
    Adjusts the governing parameter of the nonlinear recurrence.<br />
    Lower values produce stable convergence; higher values produce period-doubling
    cycles; beyond certain thresholds, the behaviour becomes chaotic.
  </p>

  <h4>initial_x — starting value</h4>
  <p>
    Sets the initial point used when computing the sample orbit for the
    highlighted r value.<br />
    This allows inspection of how long-term behaviour depends on initial conditions.
  </p>

  <p>
    Press <strong>Recompute Bifurcation</strong> to regenerate the full diagram.
  </p>
</details>

<details>
  <summary>Fields this dynamic draws from</summary>
  <ul>
    <li>nonlinear dynamics</li>
    <li>chaos theory</li>
    <li>bifurcation analysis</li>
    <li>iterative recurrence modelling</li>
    <li>classical logistic-map behaviour</li>
  </ul>
  <p>
    These domains inspire the visualization and structure; they are not
    mechanisms of human or AI behaviour.
  </p>
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
