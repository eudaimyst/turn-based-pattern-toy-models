import * as d3 from 'd3';

type Viz = {
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined> | null;
  width: number;
  height: number;
  xScale: d3.ScaleLinear<number, number> | null;
  yScale: d3.ScaleLinear<number, number> | null;
  line: d3.Line<number> | null;
  path: d3.Selection<SVGPathElement, unknown, null, undefined> | null;
};

const viz: Viz = {
  svg: null,
  width: 600,
  height: 120,
  xScale: null,
  yScale: null,
  line: null,
  path: null,
};

export function init(container: HTMLElement, width = 600, height = 120) {
  viz.width = width;
  viz.height = height;

  // clear container
  container.innerHTML = '';

  const svg = d3
    .select(container)
    .append('svg')
    .attr('width', viz.width)
    .attr('height', viz.height)
    .attr('viewBox', `0 0 ${viz.width} ${viz.height}`)
    .style('display', 'block');

  viz.svg = svg as d3.Selection<SVGSVGElement, unknown, null, undefined>;

  viz.xScale = d3.scaleLinear().domain([0, 100]).range([8, viz.width - 8]);
  viz.yScale = d3.scaleLinear().domain([-1, 1]).range([viz.height - 8, 8]);

  viz.line = d3
    .line<number>()
    .x((_: number, i: number) => (viz.xScale ? viz.xScale(i) : i))
    .y((d: number) => (viz.yScale ? viz.yScale(d) : 0));

  viz.path = svg.append('path').attr('fill', 'none').attr('stroke', '#2b6cb0').attr('stroke-width', 2);

  // axis lines (minimal)
  svg
    .append('line')
    .attr('x1', 0)
    .attr('x2', viz.width)
    .attr('y1', viz.height / 2)
    .attr('y2', viz.height / 2)
    .attr('stroke', '#e2e8f0')
    .attr('stroke-width', 1);

  return {
    render: (history: number[]) => render(history),
    resize: (w: number, h: number) => {
      viz.width = w;
      viz.height = h;
      if (viz.svg) viz.svg.attr('width', w).attr('height', h).attr('viewBox', `0 0 ${w} ${h}`);
      if (viz.xScale) viz.xScale.range([8, viz.width - 8]);
      if (viz.yScale) viz.yScale.range([viz.height - 8, 8]);
    },
  };
}

function render(history: number[]) {
  if (!viz.svg || !viz.line || !viz.path || !viz.xScale || !viz.yScale) return;

  viz.xScale.domain([0, Math.max(1, history.length - 1)]);
  // Keep y-axis domain fixed for this toy to avoid auto-zooming on transient wiggles.
  // The initial domain is set in init() (default: [-1, 1]).

  const d = viz.line(history as any);
  viz.path?.attr('d', d ?? '');
}

export function destroy(container: HTMLElement) {
  container.innerHTML = '';
  viz.svg = null;
}
