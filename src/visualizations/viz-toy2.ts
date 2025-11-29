import * as d3 from 'd3';

type Sample = { x: number; y: number };

const MARGIN = 8;

export function init(container: HTMLElement, width = 600, height = 220) {
  container.innerHTML = '';

  const svg = d3
    .select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`)
    .style('display', 'block');

  const plot = svg.append('g');

  const xScale = d3.scaleLinear().range([MARGIN, width - MARGIN]);
  const yScale = d3.scaleLinear().range([height - MARGIN, MARGIN]);

  const line = d3
    .line<Sample>()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y));

  const path = plot.append('path').attr('fill', 'none').attr('stroke', '#1f6feb').attr('stroke-width', 2);

  const blendGroup = plot.append('g').attr('class', 'blend');
  const thresholdLine = plot.append('line').attr('stroke', '#ff6b6b').attr('stroke-width', 1).attr('stroke-dasharray', '4 3');

  const xAxisG = svg.append('g').attr('transform', `translate(0, ${height - 4})`);
  const yAxisG = svg.append('g').attr('transform', `translate(${MARGIN}, 0)`);

  function render(samples: Sample[], params: { T: number; delta: number }) {
    if (!samples || samples.length === 0) return;

    const xs = samples.map((s) => s.x);
    const ys = samples.map((s) => s.y);

    const xmin = Math.min(...xs);
    const xmax = Math.max(...xs);
    const ymin = Math.min(...ys);
    const ymax = Math.max(...ys);

    xScale.domain([xmin, xmax]);
    // add small margin
    const ypad = Math.max(1e-6, (ymax - ymin) * 0.1);
    yScale.domain([ymin - ypad, ymax + ypad]);

    path.attr('d', line(samples) as any);

    // axes
    const xAxis = d3.axisBottom(xScale).ticks(6);
    const yAxis = d3.axisLeft(yScale).ticks(5);
    xAxisG.call(xAxis as any);
    yAxisG.call(yAxis as any);

    // threshold marker and blend shading
    const half = Math.max(0, params.delta) / 2;
    const left = params.T - half;
    const right = params.T + half;

    // blend region shading
    blendGroup.selectAll('rect').remove();
    if (half > 0) {
      blendGroup
        .append('rect')
        .attr('x', xScale(left))
        .attr('y', MARGIN)
        .attr('width', Math.max(1, xScale(right) - xScale(left)))
        .attr('height', height - MARGIN * 2)
        .attr('fill', '#ffecec')
        .attr('opacity', 0.35);
    }

    thresholdLine
      .attr('x1', xScale(params.T))
      .attr('x2', xScale(params.T))
      .attr('y1', MARGIN)
      .attr('y2', height - MARGIN);
  }

  function resize(w: number, h: number) {
    svg.attr('width', w).attr('height', h).attr('viewBox', `0 0 ${w} ${h}`);
    xScale.range([MARGIN, w - MARGIN]);
    yScale.range([h - MARGIN, MARGIN]);
    xAxisG.attr('transform', `translate(0, ${h - 4})`);
  }

  return { render, resize, destroy: () => (container.innerHTML = '') };
}
