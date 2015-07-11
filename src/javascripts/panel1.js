(function() {
  var GUTTER_SIZE = 36;
  var TRANSITION_TIME = 500;
  var panelWidth = $('.panel1-item').width();

  // Config
  var width = 160;
  var height = 160;
  var radius = Math.min(width, height) / 2;

  // Helper functions
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

  // Function that animates the graph along each step
  var data, color, left;
  window.animateGraph = function (step) {
    var $svg = $('.panel1-graph svg');
    if (step == 0) {
      data = pie([1000000,1,1,1,1,1,1,1,1,1]);
      color = function() { return '#B0B3AB' };
      left = Math.round(panelWidth / 2 - $svg.width() / 2);
      $svg.animate({ 'margin-left': left }, 700, 'easeInOutCubic');
    } else if (step == 1) {
      data = pie(_.times(9, function() {
        return 100 + Math.round(Math.random() * 100);
      }));
      color = function(d, i) {
        if (i == 0) return '#B0B3AB';
        return ['#B0B3AB','#A0A597','#B5BAAB','#AFB6A4','#C5CBBC',
          '#BABEB3','#A8AE99','#B6B8B3','#A9AE9D','C9CAB6'][i];
      }
    } else if (step == 2) {
      left = Math.round(panelWidth + (panelWidth / 2) -
        $svg.width() / 2) + GUTTER_SIZE;
      $svg.animate({ 'margin-left': left }, 700, 'easeInOutCubic', function() {

      });
    }

    // Set up D3 graph
    var path = svg.selectAll('path').data(data);
    path
      .enter()
      .append('path')
      .attr('d', arc)
      .each(function(d) { this._current = d; });
    path
      .attr('fill', function(d, i) {
        return color(d, i);
      })
      .transition()
      .duration(TRANSITION_TIME)
      .attrTween('d', function(d) {
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          return arc(interpolate(t));
        };
      });
    path.exit().remove();
  }
})();
