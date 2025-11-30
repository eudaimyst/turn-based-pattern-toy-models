import * as d3 from "d3";
import type { Vec2 } from "../lib/types";

type VizHandle = {
  container: HTMLElement;
  width: number;
  height: number;
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  arrowGroup: d3.Selection<SVGGElement, unknown, null, undefined>;
  trailPath: d3.Selection<SVGPathElement, unknown, null, undefined>;
  point: d3.Selection<SVGCircleElement, unknown, null, undefined>;
};

export function init(container: HTMLElement, width = 600, height = 400, Vfunc?: (p: Vec2) => Vec2) {
  const svg = d3
    .select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `-1 -1 2 2`)
    .style('background', '#ffffff');

  const arrowGroup = svg.append('g').attr('class', 'arrows');
  const trailPath = svg.append('path').attr('class', 'trail').attr('fill', 'none').attr('stroke', '#333').attr('stroke-width', 0.008);
  const point = svg.append('circle').attr('r', 0.02).attr('fill', '#000');

  const handle: VizHandle = { container, width, height, svg, arrowGroup, trailPath, point };
  return handle;
}

export function renderField(handle: VizHandle, V: (p: Vec2) => Vec2) {
  // sample grid
  const n = 12;
  const xs: number[] = [];
  for (let i = 0; i < n; i++) xs.push(-1 + (2 * i) / (n - 1));
  const points: Vec2[] = [];
  xs.forEach((xx) => xs.forEach((yy) => points.push({ x: xx, y: yy })));

  const arrows = handle.arrowGroup.selectAll<SVGLineElement, Vec2>('line').data(points, (d: any) => `${d.x},${d.y}`);

  arrows.join(
    (enter) =>
      enter
        .append('line')
        .attr('x1', (d) => d.x)
        .attr('y1', (d) => d.y)
        .attr('x2', (d) => d.x)
        .attr('y2', (d) => d.y)
        .attr('stroke', '#666')
        .attr('stroke-width', 0.005),
    (update) => update,
    (exit) => exit.remove()
  );

  // update positions
  handle.arrowGroup.selectAll('line').each(function (d) {
    const dd = d as Vec2;
    const v = V(dd);
    const len = Math.sqrt(v.x * v.x + v.y * v.y) + 1e-6;
    const ux = (v.x / len) * 0.08;
    const uy = (v.y / len) * 0.08;
    d3.select(this).attr('x2', dd.x + ux).attr('y2', dd.y + uy);
  });
}

export function update(handle: VizHandle, state: { x: Vec2; history: Vec2[] }, Vfunc: (p: Vec2) => Vec2) {
  // update trail
  const line = d3.line<Vec2>().x((d) => d.x).y((d) => d.y);
  handle.trailPath.attr('d', line(state.history as Vec2[]));
  handle.point.attr('cx', state.x.x).attr('cy', state.x.y);
}

export function destroy(handle: VizHandle) {
  if (handle?.svg) handle.svg.remove();
}
export function render(container: HTMLElement, state: any) {
  container.innerHTML = `<div style="padding:8px">Framing Field visualization placeholder</div>`;
}
