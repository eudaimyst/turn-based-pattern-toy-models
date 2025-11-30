/**
 * Canvas-based high-density bifurcation renderer.
 * Accepts a Float32Array of [r,x,r,x,...] points and renders them with alpha blending.
 */
type PointsBuffer = Float32Array;

const state = {
  canvas: null as HTMLCanvasElement | null,
  overlay: null as HTMLCanvasElement | null,
  ctx: null as CanvasRenderingContext2D | null,
  overlayCtx: null as CanvasRenderingContext2D | null,
  width: 800,
  height: 500,
  pixelRatio: 1,
  // visible r-range (defaults to focused bifurcation region)
  rMin: 2.8,
  rMax: 4,
};

export function init(container: HTMLElement, width = 1000, height = 500) {
  state.width = width;
  state.height = height;
  container.innerHTML = '';

  const canvas = document.createElement('canvas');
  // create background canvas
  // const canvas already declared below
  const pixelRatio = window.devicePixelRatio || 1;
  state.pixelRatio = pixelRatio;
  canvas.width = Math.floor(state.width * pixelRatio);
  canvas.height = Math.floor(state.height * pixelRatio);
  canvas.style.width = `${state.width}px`;
  canvas.style.height = `${state.height}px`;
  canvas.style.display = 'block';
  canvas.style.position = 'absolute';
  canvas.style.left = '0';
  canvas.style.top = '0';
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context unavailable');
  state.canvas = canvas;
  state.ctx = ctx;
  // disable smoothing for crisp pixel rendering
  ctx.imageSmoothingEnabled = false;

  // White background
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  // Keep initial background dark (black) for visibility of light points
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, state.width, state.height);

  container.appendChild(canvas);
  // create overlay canvas stacked above background
  const overlay = document.createElement('canvas');
  overlay.width = Math.floor(state.width * pixelRatio);
  overlay.height = Math.floor(state.height * pixelRatio);
  overlay.style.width = `${state.width}px`;
  overlay.style.height = `${state.height}px`;
  overlay.style.position = 'absolute';
  overlay.style.left = '0';
  overlay.style.top = '0';
  overlay.style.pointerEvents = 'none';
  const overlayCtx = overlay.getContext('2d');
  if (!overlayCtx) throw new Error('Overlay canvas context unavailable');
  overlayCtx.imageSmoothingEnabled = false;
  state.overlay = overlay;
  state.overlayCtx = overlayCtx;

  // wrap canvases in a relative-positioned container
  const wrap = document.createElement('div');
  wrap.style.position = 'relative';
  wrap.style.width = `${state.width}px`;
  wrap.style.height = `${state.height}px`;
  wrap.appendChild(canvas);
  wrap.appendChild(overlay);
  container.appendChild(wrap);

  // return API
  return {
    render: (points: PointsBuffer, currentR: number, currentTrajectory: Float32Array | null) => render(points, currentR, currentTrajectory),
    appendPoints: (points: PointsBuffer) => appendPoints(points),
    clear: () => clearCanvas(),
    clearOverlay: () => clearOverlay(),
    drawOverlayLine: (r: number) => drawOverlayLine(r),
    drawOverlayTrajectoryAtR: (traj: Float32Array, r: number) => drawOverlayTrajectoryAtR(traj, r),
    setRRange: (min: number, max: number) => setRRange(min, max),
    resize: (w: number, h: number) => resize(w, h),
  };
}

function setRRange(min: number, max: number) {
  if (typeof min !== 'number' || typeof max !== 'number') return;
  if (max <= min) return;
  state.rMin = min;
  state.rMax = max;
}

function clearCanvas() {
  if (!state.ctx) return;
  const ctx = state.ctx;
  ctx.setTransform(state.pixelRatio, 0, 0, state.pixelRatio, 0, 0);
  ctx.clearRect(0, 0, state.width, state.height);
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, state.width, state.height);
  // also clear overlay
  if (state.overlayCtx) {
    const oc = state.overlayCtx;
    oc.setTransform(state.pixelRatio, 0, 0, state.pixelRatio, 0, 0);
    oc.clearRect(0, 0, state.width, state.height);
  }
}

function clearOverlay() {
  if (!state.overlayCtx) return;
  const oc = state.overlayCtx;
  oc.setTransform(state.pixelRatio, 0, 0, state.pixelRatio, 0, 0);
  oc.clearRect(0, 0, state.width, state.height);
}

function appendPoints(points: PointsBuffer) {
  if (!state.ctx) return;
  const ctx = state.ctx;
  const w = state.width;
  const h = state.height;
  // draw each point as a 1x1 rectangle; points array is [r,x,r,x,...]
  ctx.save();
  ctx.globalCompositeOperation = 'source-over';
  // draw semi-opaque white points for density accumulation
  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  for (let i = 0; i < points.length; i += 2) {
    const r = points[i];
    const x = points[i + 1];
    // map r from [rMin,rMax] to [0,w]
    const t = (r - state.rMin) / (state.rMax - state.rMin);
    const tt = Math.max(0, Math.min(1, t));
    const px = Math.floor(tt * w);
    const py = Math.floor((1 - x) * h);
    ctx.fillRect(px, py, 1, 1);
  }
  ctx.restore();
}

function drawOverlayLine(r: number) {
  if (!state.overlayCtx) return;
  const oc = state.overlayCtx;
  const w = state.width;
  const h = state.height;
  oc.setTransform(state.pixelRatio, 0, 0, state.pixelRatio, 0, 0);
  // thin vertical red line with transparency
  oc.strokeStyle = 'rgba(255,0,0,0.5)';
  oc.lineWidth = 1;
  // map r in [rMin,rMax] to [0,w]
  const t = (r - state.rMin) / (state.rMax - state.rMin);
  const xt = Math.max(0, Math.min(1, t));
  const x = xt * w + 0.5;
  oc.beginPath();
  oc.moveTo(x, 0);
  oc.lineTo(x, h);
  oc.stroke();
}

function drawOverlayTrajectory(traj: Float32Array) {
  // Deprecated: use drawOverlayTrajectoryAtR(traj, r)
}

function drawOverlayTrajectoryAtR(traj: Float32Array, r: number) {
  if (!state.overlayCtx) return;
  const oc = state.overlayCtx;
  const w = state.width;
  const h = state.height;
  oc.setTransform(state.pixelRatio, 0, 0, state.pixelRatio, 0, 0);
  oc.fillStyle = 'rgba(255,255,255,0.8)';
  const t = (r - state.rMin) / (state.rMax - state.rMin);
  const xt = Math.max(0, Math.min(1, t));
  const x = Math.floor(xt * w) + 0.5;
  const size = 2;
  for (let i = 0; i < traj.length; i++) {
    const xv = traj[i];
    const py = Math.floor((1 - xv) * h);
    oc.fillRect(x - Math.floor(size/2), py - Math.floor(size/2), size, size);
  }
}


function render(points: PointsBuffer, currentR: number, currentTrajectory: Float32Array | null) {
  if (!state.ctx || !state.canvas) return;
  const ctx = state.ctx;
  clearCanvas();

  // draw semi-opaque white points on dark background so the cloud is visible
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = 'rgba(255,255,255,0.15)';

  const w = state.width;
  const h = state.height;

  // draw each point as a 1x1 rectangle; points array is [r,x,r,x,...]
    for (let i = 0; i < points.length; i += 2) {
      const r = points[i];
      const x = points[i + 1];
      // map r in [0,4] to [0,w]
      const px = Math.floor((r / 4) * w);
      // map x in [0,1] to [h,0]
      const py = Math.floor((1 - x) * h);
      ctx.fillRect(px, py, 1, 1);
    }

  // draw currentR indicator line
  // current-r indicator: contrasting red line
  ctx.globalCompositeOperation = 'source-over';
  ctx.strokeStyle = 'rgba(255,60,60,0.9)';
  ctx.lineWidth = 1;
  const tr = (currentR - state.rMin) / (state.rMax - state.rMin);
  const xr = Math.floor(Math.max(0, Math.min(1, tr)) * w) + 0.5;
  ctx.beginPath();
  ctx.moveTo(xr, 0);
  ctx.lineTo(xr, h);
  ctx.stroke();

  // draw currentTrajectory as larger darker dots if provided
  if (currentTrajectory && currentTrajectory.length > 0) {
    // trajectory markers: bright yellow small squares for contrast
    ctx.fillStyle = 'rgba(255,230,80,1)';
    for (let i = 0; i < currentTrajectory.length; i++) {
      const xv = currentTrajectory[i];
      const py = Math.floor((1 - xv) * h);
      ctx.fillRect(xr - 1, py - 1, 2, 2);
    }
  }
}

function resize(w: number, h: number) {
  state.width = w;
  state.height = h;
  if (!state.canvas || !state.ctx) return;
  const pixelRatio = state.pixelRatio;
  state.canvas.width = Math.floor(w * pixelRatio);
  state.canvas.height = Math.floor(h * pixelRatio);
  state.canvas.style.width = `${w}px`;
  state.canvas.style.height = `${h}px`;
  state.ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
}

export function destroy(container: HTMLElement) {
  container.innerHTML = '';
  state.canvas = null;
  state.ctx = null;
}
