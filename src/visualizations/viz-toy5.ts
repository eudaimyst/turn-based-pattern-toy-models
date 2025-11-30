import * as d3 from 'd3';

type Point = { x: number; y: number };

const viz: {
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined> | null;
  width: number;
  height: number;
  xScale: d3.ScaleLinear<number, number> | null;
  yScale: d3.ScaleLinear<number, number> | null;
  path: d3.Selection<SVGPathElement, unknown, null, undefined> | null;
  trailPath: d3.Selection<SVGPathElement, unknown, null, undefined> | null;
  point: d3.Selection<SVGCircleElement, unknown, null, undefined> | null;
} = {
  svg: null,
  width: 400,
  height: 400,
  xScale: null,
  yScale: null,
  path: null,
  trailPath: null,
  point: null,
};

export function init(container: HTMLElement, width = 400, height = 400) {
  viz.width = width;
  viz.height = height;
  container.innerHTML = '';

  const svg = d3
    .select(container)
    .append('svg')
    .attr('width', viz.width)
    .attr('height', viz.height)
    .attr('viewBox', `0 0 ${viz.width} ${viz.height}`)
    .style('display', 'block');

  viz.svg = svg as d3.Selection<SVGSVGElement, unknown, null, undefined>;

  const margin = { top: 12, right: 12, bottom: 24, left: 24 };
  const innerW = viz.width - margin.left - margin.right;
  const innerH = viz.height - margin.top - margin.bottom;

  viz.xScale = d3.scaleLinear().domain([-1, 1]).range([margin.left, margin.left + innerW]);
  viz.yScale = d3.scaleLinear().domain([-1, 1]).range([margin.top + innerH, margin.top]);

  // axes
  const gx = svg.append('g').attr('transform', `translate(0, ${margin.top + innerH})`);
  const gy = svg.append('g').attr('transform', `translate(${margin.left}, 0)`);

  gx.call(d3.axisBottom(viz.xScale).ticks(5) as any);
  gy.call(d3.axisLeft(viz.yScale).ticks(5) as any);

  // neutral center lines
  svg
    .append('line')
    .attr('x1', viz.xScale(-1))
    .attr('x2', viz.xScale(1))
    .attr('y1', viz.yScale(0))
    .attr('y2', viz.yScale(0))
    .attr('stroke', '#e6eef6')
    .attr('stroke-width', 1);

  svg
    .append('line')
    .attr('x1', viz.xScale(0))
    .attr('x2', viz.xScale(0))
    .attr('y1', viz.yScale(-1))
    .attr('y2', viz.yScale(1))
    .attr('stroke', '#e6eef6')
    .attr('stroke-width', 1);

  viz.path = svg.append('path').attr('fill', 'none').attr('stroke', '#374151').attr('stroke-width', 1.5).attr('stroke-linejoin', 'round');
  viz.trailPath = svg.append('path').attr('fill', 'none').attr('stroke', '#9ca3af').attr('stroke-width', 1).attr('stroke-linejoin', 'round').attr('opacity', 0.8);
  viz.point = svg.append('circle').attr('r', 4).attr('fill', '#111827');

  return {
    render: (history: Point[]) => render(history),
    resize: (w: number, h: number) => {
      viz.width = w;
      viz.height = h;
      if (viz.svg) viz.svg.attr('width', w).attr('height', h).attr('viewBox', `0 0 ${w} ${h}`);
      const m = { top: 12, right: 12, bottom: 24, left: 24 };
      const iw = viz.width - m.left - m.right;
      const ih = viz.height - m.top - m.bottom;
      if (viz.xScale) viz.xScale.range([m.left, m.left + iw]);
      if (viz.yScale) viz.yScale.range([m.top + ih, m.top]);
    },
  };
}

function render(history: Point[]) {
  if (!viz.svg || !viz.xScale || !viz.yScale || !viz.path || !viz.point || !viz.trailPath) return;

  const line = d3
    .line<Point>()
    .x((d) => (viz.xScale ? viz.xScale(d.x) : 0))
    .y((d) => (viz.yScale ? viz.yScale(d.y) : 0));

  viz.path.attr('d', line(history as any) ?? '');

  // trailing short path (last 20 points)
  const trail = history.slice(-20);
  viz.trailPath.attr('d', line(trail as any) ?? '');

  const last = history[history.length - 1] ?? { x: 0, y: 0 };
  viz.point.attr('cx', viz.xScale(last.x)).attr('cy', viz.yScale(last.y));
}

export function destroy(container: HTMLElement) {
  container.innerHTML = '';
  viz.svg = null;
}

