import * as d3 from 'd3';
const viz = {
    svg: null,
    width: 400,
    height: 400,
    xScale: null,
    yScale: null,
    path: null,
    trailPath: null,
    point: null,
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
    // axes
    const gx = svg.append('g').attr('transform', `translate(0, ${margin.top + innerH})`);
    const gy = svg.append('g').attr('transform', `translate(${margin.left}, 0)`);
    gx.call(d3.axisBottom(viz.xScale).ticks(5));
    gy.call(d3.axisLeft(viz.yScale).ticks(5));
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
        render: (history) => render(history),
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
function render(history) {
    var _a, _b, _c;
    if (!viz.svg || !viz.xScale || !viz.yScale || !viz.path || !viz.point || !viz.trailPath)
        return;
    const line = d3
        .line()
        .x((d) => (viz.xScale ? viz.xScale(d.x) : 0))
        .y((d) => (viz.yScale ? viz.yScale(d.y) : 0));
    viz.path.attr('d', (_a = line(history)) !== null && _a !== void 0 ? _a : '');
    // trailing short path (last 20 points)
    const trail = history.slice(-20);
    viz.trailPath.attr('d', (_b = line(trail)) !== null && _b !== void 0 ? _b : '');
    const last = (_c = history[history.length - 1]) !== null && _c !== void 0 ? _c : { x: 0, y: 0 };
    viz.point.attr('cx', viz.xScale(last.x)).attr('cy', viz.yScale(last.y));
}
export function destroy(container) {
    container.innerHTML = '';
    viz.svg = null;
}
//# sourceMappingURL=viz-toy5.js.map