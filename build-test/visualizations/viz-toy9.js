import * as d3 from 'd3';
const viz = {
    svg: null,
    width: 600,
    height: 200,
    xScale: null,
    yScale: null,
    line: null,
    path: null,
    point: null,
};
export function init(container, width = 600, height = 200) {
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
    const margin = { top: 10, right: 12, bottom: 24, left: 36 };
    const innerW = viz.width - margin.left - margin.right;
    const innerH = viz.height - margin.top - margin.bottom;
    viz.xScale = d3.scaleLinear().domain([0, 200]).range([margin.left, margin.left + innerW]);
    viz.yScale = d3.scaleLinear().domain([0, 1]).range([margin.top + innerH, margin.top]);
    const gx = svg.append('g').attr('transform', `translate(0, ${margin.top + innerH})`);
    const gy = svg.append('g').attr('transform', `translate(${margin.left}, 0)`);
    gx.call(d3.axisBottom(viz.xScale).ticks(5));
    gy.call(d3.axisLeft(viz.yScale).ticks(5));
    // (no center line — visualization uses [0,1] y-domain)
    viz.line = d3
        .line()
        .x((d) => (viz.xScale ? viz.xScale(d.t) : 0))
        .y((d) => (viz.yScale ? viz.yScale(d.x) : 0));
    viz.path = svg.append('path').attr('fill', 'none').attr('stroke', '#111827').attr('stroke-width', 1.5);
    viz.point = svg.append('circle').attr('r', 3).attr('fill', '#111827');
    return {
        render: (history) => render(history),
        resize: (w, h) => {
            viz.width = w;
            viz.height = h;
            if (viz.svg)
                viz.svg.attr('width', w).attr('height', h).attr('viewBox', `0 0 ${w} ${h}`);
            const m = { top: 10, right: 12, bottom: 24, left: 36 };
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
    var _a, _b, _c, _d;
    if (!viz.svg || !viz.xScale || !viz.yScale || !viz.path || !viz.line || !viz.point)
        return;
    const lastT = (_b = (_a = history[history.length - 1]) === null || _a === void 0 ? void 0 : _a.t) !== null && _b !== void 0 ? _b : 0;
    viz.xScale.domain([Math.max(0, lastT - 199), Math.max(200, lastT)]);
    viz.path.attr('d', (_c = viz.line(history)) !== null && _c !== void 0 ? _c : '');
    const last = (_d = history[history.length - 1]) !== null && _d !== void 0 ? _d : { t: 0, x: 0 };
    viz.point.attr('cx', viz.xScale(last.t)).attr('cy', viz.yScale(last.x));
}
export function destroy(container) {
    container.innerHTML = '';
    viz.svg = null;
}
//# sourceMappingURL=viz-toy9.js.map