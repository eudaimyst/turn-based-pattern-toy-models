import * as d3 from 'd3';
const viz = {
    svg: null,
    width: 400,
    height: 400,
    xScale: null,
    yScale: null,
    point: null,
    trailPath: null,
    contourGroup: null,
};
export function init(container, width = 400, height = 400) {
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
        render: (history, potentialFn) => render(history, potentialFn),
        resize: (w, h) => {
            viz.width = w;
            viz.height = h;
            if (viz.svg)
                viz.svg.attr('width', w).attr('height', h).attr('viewBox', `0 0 ${w} ${h}`);
            const m = { top: 12, right: 12, bottom: 24, left: 24 };
            const iw = viz.width - m.left - m.right;
            const ih = viz.height - m.top - m.bottom;
            if (viz.xScale)
                viz.xScale.range([m.left, m.left + iw]);
            if (viz.yScale)
                viz.yScale.range([m.top + ih, m.top]);
        },
    };
}
function render(history, potentialFn) {
    var _a, _b;
    if (!viz.svg || !viz.xScale || !viz.yScale || !viz.point || !viz.trailPath || !viz.contourGroup)
        return;
    // draw contours by sampling potential on a grid
    const size = 60;
    const xs = d3.range(size).map((i) => -1 + (2 * i) / (size - 1));
    const ys = d3.range(size).map((j) => -1 + (2 * j) / (size - 1));
    const values = [];
    for (let j = 0; j < ys.length; j++) {
        for (let i = 0; i < xs.length; i++) {
            values.push(potentialFn(xs[i], ys[j]));
        }
    }
    const contours = d3.contours().size([size, size]).thresholds(d3.range(10).map((k) => d3.min(values) + (k / 9) * (d3.max(values) - d3.min(values))))(values);
    const path = d3.geoPath();
    const scaleX = viz.xScale;
    const scaleY = viz.yScale;
    viz.contourGroup.selectAll('path').remove();
    viz.contourGroup
        .selectAll('path')
        .data(contours)
        .enter()
        .append('path')
        .attr('d', (d) => { var _a; return (_a = path(d)) !== null && _a !== void 0 ? _a : ''; })
        .attr('transform', `translate(0,0) scale(${(scaleX(1) - scaleX(-1)) / size}, ${(scaleY(-1) - scaleY(1)) / size})`)
        .attr('fill', (d, i) => (i % 2 === 0 ? '#f8fafc' : '#eef2ff'))
        .attr('stroke', '#e6eef6')
        .attr('stroke-width', 0.5)
        .attr('opacity', 0.9);
    // trailing path
    const line = d3
        .line()
        .x((d) => (viz.xScale ? viz.xScale(d.x) : 0))
        .y((d) => (viz.yScale ? viz.yScale(d.y) : 0));
    viz.trailPath.attr('d', (_a = line(history.slice(-40))) !== null && _a !== void 0 ? _a : '');
    const last = (_b = history[history.length - 1]) !== null && _b !== void 0 ? _b : { x: 0, y: 0 };
    viz.point.attr('cx', viz.xScale(last.x)).attr('cy', viz.yScale(last.y));
}
export function destroy(container) {
    container.innerHTML = '';
    viz.svg = null;
}
//# sourceMappingURL=viz-toy10.js.map