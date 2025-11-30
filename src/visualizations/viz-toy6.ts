import * as d3 from 'd3';
import type { Rect, Intersection } from '../models/model-toy6';

type Viz = {
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined> | null;
  width: number;
  height: number;
  xScale: d3.ScaleLinear<number, number> | null;
  yScale: d3.ScaleLinear<number, number> | null;
  r1: d3.Selection<SVGRectElement, unknown, null, undefined> | null;
  r2: d3.Selection<SVGRectElement, unknown, null, undefined> | null;
  inter: d3.Selection<SVGRectElement, unknown, null, undefined> | null;
};

const viz: Viz = {
  svg: null,
  width: 400,
  height: 400,
  xScale: null,
  yScale: null,
  r1: null,
  r2: null,
  inter: null,
};

function rectToScreen(r: Rect) {
  if (!viz.xScale || !viz.yScale) return { x: 0, y: 0, w: 0, h: 0 };
  const left = viz.xScale(r.x - r.w / 2);
  const right = viz.xScale(r.x + r.w / 2);
  const top = viz.yScale(r.y + r.h / 2);
  const bottom = viz.yScale(r.y - r.h / 2);
  const x = left;
  const y = top;
  const w = Math.max(0, right - left);
  const h = Math.max(0, bottom - top);
  return { x, y, w, h };
}

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

  viz.svg = svg;

  const margin = { top: 12, right: 12, bottom: 12, left: 12 };
  const innerW = viz.width - margin.left - margin.right;
  const innerH = viz.height - margin.top - margin.bottom;

  viz.xScale = d3.scaleLinear().domain([-1, 1]).range([margin.left, margin.left + innerW]);
  viz.yScale = d3.scaleLinear().domain([-1, 1]).range([margin.top + innerH, margin.top]);

  // neutral axes
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

  // rectangles
  viz.r1 = svg
    .append('rect')
    .attr('fill', '#c7d2fe')
    .attr('stroke', '#3730a3')
    .attr('opacity', 0.9);

  viz.r2 = svg
    .append('rect')
    .attr('fill', '#fca5a5')
    .attr('stroke', '#b91c1c')
    .attr('opacity', 0.9);

  // intersection rectangle uses neutral gray fill
  viz.inter = svg.append('rect').attr('fill', '#9ca3af').attr('opacity', 0.7);

  return {
    render: (R1: Rect, R2: Rect, I: Intersection) => render(R1, R2, I),
    resize: (w: number, h: number) => {
      viz.width = w;
      viz.height = h;
      if (viz.svg) viz.svg.attr('width', w).attr('height', h).attr('viewBox', `0 0 ${w} ${h}`);
      const m = { top: 12, right: 12, bottom: 12, left: 12 };
      const iw = viz.width - m.left - m.right;
      const ih = viz.height - m.top - m.bottom;
      if (viz.xScale) viz.xScale.range([m.left, m.left + iw]);
      if (viz.yScale) viz.yScale.range([m.top + ih, m.top]);
    },
    destroy: (containerEl: HTMLElement) => {
      containerEl.innerHTML = '';
      viz.svg = null;
    },
  };
}

function render(R1: Rect, R2: Rect, I: Intersection) {
  if (!viz.r1 || !viz.r2 || !viz.inter) return;

  const s1 = rectToScreen(R1);
  const s2 = rectToScreen(R2);

  viz.r1
    .transition()
    .duration(120)
    .attr('x', s1.x)
    .attr('y', s1.y)
    .attr('width', s1.w)
    .attr('height', s1.h);

  viz.r2
    .transition()
    .duration(120)
    .attr('x', s2.x)
    .attr('y', s2.y)
    .attr('width', s2.w)
    .attr('height', s2.h);

  if (I.exists && I.rect) {
    const si = rectToScreen(I.rect);
    viz.inter
      .transition()
      .duration(120)
      .attr('x', si.x)
      .attr('y', si.y)
      .attr('width', si.w)
      .attr('height', si.h)
      .attr('display', null);
  } else {
    viz.inter.attr('display', 'none');
  }
}

export function destroy(container: HTMLElement) {
  container.innerHTML = '';
  viz.svg = null;
}

