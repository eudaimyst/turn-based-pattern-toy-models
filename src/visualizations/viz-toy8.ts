import * as d3 from 'd3';

type Point = { t: number; x: number };

const viz: {
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined> | null;
  width: number;
  height: number;
  xScale: d3.ScaleLinear<number, number> | null;
  yScale: d3.ScaleLinear<number, number> | null;
  line: d3.Line<Point> | null;
  path: d3.Selection<SVGPathElement, unknown, null, undefined> | null;
  point: d3.Selection<SVGCircleElement, unknown, null, undefined> | null;
} = {
  svg: null,
  width: 600,
  height: 200,
  xScale: null,
  yScale: null,
  line: null,
  path: null,
  point: null,
};

export function init(container: HTMLElement, width = 600, height = 200) {
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

  const margin = { top: 10, right: 12, bottom: 24, left: 36 };
  const innerW = viz.width - margin.left - margin.right;
  const innerH = viz.height - margin.top - margin.bottom;

  viz.xScale = d3.scaleLinear().domain([0, 200]).range([margin.left, margin.left + innerW]);
  viz.yScale = d3.scaleLinear().domain([-1, 1]).range([margin.top + innerH, margin.top]);

  const gx = svg.append('g').attr('transform', `translate(0, ${margin.top + innerH})`);
  const gy = svg.append('g').attr('transform', `translate(${margin.left}, 0)`);

  gx.call(d3.axisBottom(viz.xScale).ticks(5) as any);
  gy.call(d3.axisLeft(viz.yScale).ticks(5) as any);

  // neutral center line
  svg
    .append('line')
    .attr('x1', viz.xScale(0))
    .attr('x2', viz.xScale(200))
    .attr('y1', viz.yScale(0))
    .attr('y2', viz.yScale(0))
    .attr('stroke', '#e6eef6')
    .attr('stroke-width', 1);

  viz.line = d3
    .line<Point>()
    .x((d) => (viz.xScale ? viz.xScale(d.t) : 0))
    .y((d) => (viz.yScale ? viz.yScale(d.x) : 0));

  viz.path = svg.append('path').attr('fill', 'none').attr('stroke', '#374151').attr('stroke-width', 1.5);
  viz.point = svg.append('circle').attr('r', 3).attr('fill', '#111827');

  return {
    render: (history: Point[]) => render(history),
    resize: (w: number, h: number) => {
      viz.width = w;
      viz.height = h;
      if (viz.svg) viz.svg.attr('width', w).attr('height', h).attr('viewBox', `0 0 ${w} ${h}`);
      const m = { top: 10, right: 12, bottom: 24, left: 36 };
      const iw = viz.width - m.left - m.right;
      const ih = viz.height - m.top - m.bottom;
      if (viz.xScale) viz.xScale.range([m.left, m.left + iw]);
      if (viz.yScale) viz.yScale.range([m.top + ih, m.top]);
    },
  };
}

function render(history: Point[]) {
  if (!viz.svg || !viz.xScale || !viz.yScale || !viz.path || !viz.line || !viz.point) return;

  const lastT = history[history.length - 1]?.t ?? 0;
  viz.xScale.domain([Math.max(0, lastT - 199), Math.max(200, lastT)]);

  viz.path.attr('d', viz.line(history as any) ?? '');

  const last = history[history.length - 1] ?? { t: 0, x: 0 };
  viz.point.attr('cx', viz.xScale(last.t)).attr('cy', viz.yScale(last.x));
}

export function destroy(container: HTMLElement) {
  container.innerHTML = '';
  viz.svg = null;
}

