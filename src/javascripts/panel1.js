
// Config
var width = 160;
var height = 160;
var radius = Math.min(width, height) / 2;

// Helper functions
var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c",
      "#ff8c00"]);
var arc = d3.svg.arc().outerRadius(radius);
var pie = d3.layout.pie()
  .value(function(d) { return d })
  .sort(null);

// Draw the initial graph
var svg = d3.select('.panel1-graph')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

var setGraph = function () {
  data = pie(_.times(_.random(1,6), function() {
    return 100 + Math.round(Math.random() * 100);    
  }));
  var path = svg.selectAll('path').data(data)
  path
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function(d, i) {
      return color(d.data);
    })
    .each(function(d) { this._current = d; });
  path
    .transition()
    .duration(750)
    .attrTween('d', function(d) {
      var interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function(t) {
        return arc(interpolate(t));
      };
    });
  path.exit().remove();
}
