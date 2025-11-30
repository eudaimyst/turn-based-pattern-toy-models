import * as d3 from 'd3';

type Point = { x: number; y: number };

const viz: {
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined> | null;
  width: number;
  height: number;
  xScale: d3.ScaleLinear<number, number> | null;
  yScale: d3.ScaleLinear<number, number> | null;
  point: d3.Selection<SVGCircleElement, unknown, null, undefined> | null;
  trailPath: d3.Selection<SVGPathElement, unknown, null, undefined> | null;
  contourGroup: d3.Selection<SVGGElement, unknown, null, undefined> | null;
} = {
  svg: null,
  width: 400,
  height: 400,
  xScale: null,
  yScale: null,
  point: null,
  trailPath: null,
  contourGroup: null,
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

  // background grid
  svg
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', viz.width)
    .attr('height', viz.height)
    .attr('fill', '#ffffff');

  viz.contourGroup = svg.append('g');

  viz.trailPath = svg.append('path').attr('fill', 'none').attr('stroke', '#9ca3af').attr('stroke-width', 1).attr('opacity', 0.8);
  viz.point = svg.append('circle').attr('r', 4).attr('fill', '#111827');

  return {
    render: (history: Point[], potentialFn: (x: number, y: number) => number) => render(history, potentialFn),
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

function render(history: Point[], potentialFn: (x: number, y: number) => number) {
  if (!viz.svg || !viz.xScale || !viz.yScale || !viz.point || !viz.trailPath || !viz.contourGroup) return;

  // draw contours by sampling potential on a grid
  const size = 60;
  const xs = d3.range(size).map((i) => -1 + (2 * i) / (size - 1));
  // sample y coordinates so that index 0 corresponds to data y = 1 (top)
  // this matches the yScale used for rendering points where larger data y maps upward
  const ys = d3.range(size).map((j) => 1 - (2 * j) / (size - 1));
  const values: number[] = [];
  for (let j = 0; j < ys.length; j++) {
    for (let i = 0; i < xs.length; i++) {
      values.push(potentialFn(xs[i], ys[j]));
    }
  }

  const contours = d3.contours().size([size, size]).thresholds(d3.range(10).map((k) => d3.min(values)! + (k / 9) * (d3.max(values)! - d3.min(values)!)))(values as any);

  const path = d3.geoPath();

  const scaleX = viz.xScale;
  const scaleY = viz.yScale;

  viz.contourGroup.selectAll('path').remove();

  viz.contourGroup
    .selectAll('path')
    .data(contours)
    .enter()
    .append('path')
    .attr('d', (d: any) => path(d as any) ?? '')
    .attr('transform', `translate(0,0) scale(${(scaleX(1) - scaleX(-1)) / size}, ${(scaleY(-1) - scaleY(1)) / size})`)
    .attr('fill', (d, i) => (i % 2 === 0 ? '#f8fafc' : '#eef2ff'))
    .attr('stroke', '#e6eef6')
    .attr('stroke-width', 0.5)
    .attr('opacity', 0.9);

  // trailing path
  const line = d3
    .line<Point>()
    .x((d) => (viz.xScale ? viz.xScale(d.x) : 0))
    .y((d) => (viz.yScale ? viz.yScale(d.y) : 0));

  viz.trailPath.attr('d', line(history.slice(-40) as any) ?? '');

  const last = history[history.length - 1] ?? { x: 0, y: 0 };
  viz.point.attr('cx', viz.xScale(last.x)).attr('cy', viz.yScale(last.y));
}

export function destroy(container: HTMLElement) {
  container.innerHTML = '';
  viz.svg = null;
}
