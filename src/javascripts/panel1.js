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
  window.step = function (step) {
    return function() {
      var $svg = $('.panel1-graph svg');

      // Initial empty graph on left
      if (step == 0) {
        data = [1000000,1,1,1,1,1,1,1,1,1];
        color = function() { return '#B0B3AB' };
        left = Math.round(panelWidth / 2 - $svg.width() / 2);
        $('.panel1-dfa-logo, .panel1-graph').removeClass('active');
        $svg.animate({ 'margin-left': left }, 700, 'easeInOutCubic');
        animateSlices();

      // Slide out slices
      } else if (step == 1) {
        data = _.times(9, function() {
          return _.random(100, 100);
        });
        color = function(d, i) {
          if (i == 0) return '#B0B3AB';
          return ['#B0B3AB','#A0A597','#B5BAAB','#AFB6A4','#C5CBBC',
            '#BABEB3','#A8AE99','#B6B8B3','#A9AE9D','C9CAB6'][i];
        }
        animateSlices();

      // Slide over and show DFA
      } else if (step == 2) {
        left = Math.round(panelWidth + (panelWidth / 2) -
          $svg.width() / 2) + GUTTER_SIZE;
        $svg.animate({
          'margin-left': left
        }, 700, 'easeInOutCubic', function() {
          $('.panel1-dfa-logo, .panel1-graph').addClass('active');
        });

      // Hide DFA and slide over
      } else if (step == 3) {
        $('.panel1-dfa-logo, .panel1-graph').removeClass('active');
        left = Math.round((panelWidth * 2) + (panelWidth / 2) -
          $svg.width() / 2) + GUTTER_SIZE * 2;
        $svg.animate({ 'margin-left': left }, 700, 'easeInOutCubic');

      // Shuffle slices
      } else if(step ==4) {
        var i = _.random(0, 2);
        data[i] = data[i] * _.random(2, 3);
        var i = _.random(3, 6);
        data[i] = data[i] * _.random(2, 3);
        var i = _.random(7, 10);
        data[i] = data[i] * _.random(2, 3);
        animateSlices();
      }
    }
  }

  // Executes graph slices based on `data`
  var animateSlices = function() {
    // Set up D3 graph
    var path = svg.selectAll('path').data(pie(data));
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

  // Glues together each step
  var timeouts;
  window.animatePanel1 = function() {
    resetPanel1();
    timeouts.push(setTimeout(step(1), 500));
    timeouts.push(setTimeout(step(2), 2000));
    timeouts.push(setTimeout(step(3), 5000));
    timeouts.push(setTimeout(step(4), 6500));
    timeouts.push(setTimeout(step(0), 19000));
    timeouts.push(setTimeout(animatePanel1, 20000));
  }
  window.resetPanel1 = function() {
    _.each(timeouts, clearTimeout);
    timeouts = [];
    step(0)();
  }
})();
