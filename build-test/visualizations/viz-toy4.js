import * as d3 from 'd3';
const viz = {
    svg: null,
    width: 600,
    height: 240,
    xScale: null,
    yScale: null,
    linesGroup: null,
};
export function init(container, width = 600, height = 240) {
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
    const margin = { top: 12, right: 12, bottom: 24, left: 36 };
    const innerW = viz.width - margin.left - margin.right;
    const innerH = viz.height - margin.top - margin.bottom;
    // both axes cover the abstract coordinate range [-1, 1]
    viz.xScale = d3.scaleLinear().domain([-1, 1]).range([margin.left, margin.left + innerW]);
    viz.yScale = d3.scaleLinear().domain([-1, 1]).range([margin.top + innerH, margin.top]);
    // axes
    const gx = svg.append('g').attr('transform', `translate(0, ${margin.top + innerH})`);
    const gy = svg.append('g').attr('transform', `translate(${margin.left}, 0)`);
    gx.call(d3.axisBottom(viz.xScale).ticks(5));
    gy.call(d3.axisLeft(viz.yScale).ticks(5));
    // neutral center line
    svg
        .append('line')
        .attr('x1', viz.xScale(-1))
        .attr('x2', viz.xScale(1))
        .attr('y1', viz.yScale(0))
        .attr('y2', viz.yScale(0))
        .attr('stroke', '#eef2ff')
        .attr('stroke-width', 1);
    viz.linesGroup = svg.append('g').attr('class', 'lines');
    return {
        render: (trajectories) => render(trajectories),
        resize: (w, h) => {
            viz.width = w;
            viz.height = h;
            if (viz.svg)
                viz.svg.attr('width', w).attr('height', h).attr('viewBox', `0 0 ${w} ${h}`);
            const m = { top: 12, right: 12, bottom: 24, left: 36 };
            const iw = viz.width - m.left - m.right;
            const ih = viz.height - m.top - m.bottom;
            if (viz.xScale)
                viz.xScale.range([m.left, m.left + iw]);
            if (viz.yScale)
                viz.yScale.range([m.top + ih, m.top]);
        },
    };
}
function render(trajectories) {
    if (!viz.svg || !viz.xScale || !viz.yScale || !viz.linesGroup)
        return;
    // For spec: trajectories are arrays of { x, u } points.
    const line = d3
        .line()
        .x((d) => (viz.xScale ? viz.xScale(d.x) : 0))
        .y((d) => (viz.yScale ? viz.yScale(d.u) : 0));
    const colors = ['#1f2937', '#374151', '#4b5563', '#6b7280'];
    const paths = viz.linesGroup.selectAll('path').data(trajectories);
    paths.join((enter) => enter.append('path').attr('fill', 'none').attr('stroke', (d, i) => colors[i % colors.length]).attr('stroke-width', 1.5).attr('d', (d) => { var _a; return (_a = line(d)) !== null && _a !== void 0 ? _a : ''; }), (update) => update.attr('d', (d) => { var _a; return (_a = line(d)) !== null && _a !== void 0 ? _a : ''; }), (exit) => exit.remove());
    // endpoints
    const ends = viz.linesGroup.selectAll('circle.end').data(trajectories);
    ends.join((enter) => enter
        .append('circle')
        .attr('class', 'end')
        .attr('r', 3)
        .attr('fill', (d, i) => colors[i % colors.length])
        .attr('cx', (d) => { var _a, _b; return (d.length ? (_b = (_a = viz.xScale) === null || _a === void 0 ? void 0 : _a.call(viz, d[d.length - 1].x)) !== null && _b !== void 0 ? _b : 0 : 0); })
        .attr('cy', (d) => { var _a, _b; return (d.length ? (_b = (_a = viz.yScale) === null || _a === void 0 ? void 0 : _a.call(viz, d[d.length - 1].u)) !== null && _b !== void 0 ? _b : 0 : 0); }), (update) => update.attr('cx', (d) => { var _a, _b; return (d.length ? (_b = (_a = viz.xScale) === null || _a === void 0 ? void 0 : _a.call(viz, d[d.length - 1].x)) !== null && _b !== void 0 ? _b : 0 : 0); }).attr('cy', (d) => { var _a, _b; return (d.length ? (_b = (_a = viz.yScale) === null || _a === void 0 ? void 0 : _a.call(viz, d[d.length - 1].u)) !== null && _b !== void 0 ? _b : 0 : 0); }), (exit) => exit.remove());
}
export function destroy(container) {
    container.innerHTML = '';
    viz.svg = null;
}
//# sourceMappingURL=viz-toy4.js.map