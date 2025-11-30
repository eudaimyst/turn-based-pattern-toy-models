import * as d3 from 'd3';
const viz = {
    svg: null,
    width: 600,
    height: 120,
    xScale: null,
    yScale: null,
    line: null,
    path: null,
};
export function init(container, width = 600, height = 120) {
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
    viz.xScale = d3.scaleLinear().domain([0, 100]).range([8, viz.width - 8]);
    viz.yScale = d3.scaleLinear().domain([-1, 1]).range([viz.height - 8, 8]);
    viz.line = d3
        .line()
        .x((_, i) => (viz.xScale ? viz.xScale(i) : i))
        .y((d) => (viz.yScale ? viz.yScale(d) : 0));
    viz.path = svg.append('path').attr('fill', 'none').attr('stroke', '#2b6cb0').attr('stroke-width', 2);
    svg
        .append('line')
        .attr('x1', 0)
        .attr('x2', viz.width)
        .attr('y1', viz.height / 2)
        .attr('y2', viz.height / 2)
        .attr('stroke', '#e2e8f0')
        .attr('stroke-width', 1);
    return {
        render: (history) => render(history),
        resize: (w, h) => {
            viz.width = w;
            viz.height = h;
            if (viz.svg)
                viz.svg.attr('width', w).attr('height', h).attr('viewBox', `0 0 ${w} ${h}`);
            if (viz.xScale)
                viz.xScale.range([8, viz.width - 8]);
            if (viz.yScale)
                viz.yScale.range([viz.height - 8, 8]);
        },
    };
}
function render(history) {
    var _a;
    if (!viz.svg || !viz.line || !viz.path || !viz.xScale || !viz.yScale)
        return;
    viz.xScale.domain([0, Math.max(1, history.length - 1)]);
    const d = viz.line(history);
    (_a = viz.path) === null || _a === void 0 ? void 0 : _a.attr('d', d !== null && d !== void 0 ? d : '');
}
export function destroy(container) {
    container.innerHTML = '';
    viz.svg = null;
}
//# sourceMappingURL=viz-toy1.js.map