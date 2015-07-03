$(function() {

  // Toggle hamburger menu
  $('.main-nav-hamburger').click(function() {
    $('.main-nav').toggleClass('active');
  });

  // Toggle class of header
  $('.panel1').waypoint({
    handler: function(dir) {
      if($(window).width() > 768) $('.main-nav').toggleClass('active');
    },
    offset: $('.main-nav').outerHeight() * 2
  });

  // Animate Panel1
  window.dataset = [
    { label: 'Abulia', count: 10 }, 
    { label: 'Betelgeuse', count: 20 },
    { label: 'Cantaloupe', count: 30 },
    { label: 'Dijkstra', count: 40 }
  ];

  window.width = 360;
  window.height = 360;
  window.radius = Math.min(width, height) / 2;

  window.color = d3.scale.category20b();

  window.svg = d3.select('.panel1-graph')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + (width / 2) + 
      ',' + (height / 2) + ')');

  window.arc = d3.svg.arc().outerRadius(radius);

  window.pie = d3.layout.pie()
    .value(function(d) { return d.count; })
    .sort(null);

  // CREATE PIE
  // window.path = svg.selectAll('path')
  //   .data(pie(dataset))
  //   .enter()
  //   .append('path')
  //   .attr('d', arc)
  //   .attr('fill', function(d, i) { 
  //     return color(d.data.label);
  //   });

  // TRANSITION
  // path
  //     .data(pie(dataset))
  //     .enter()
  //     .append('path')
  //     .attr('d', arc)
  //     .attr('fill', function(d, i) { 
  //       return color(d.data.label);
  //     }).each(function(d) { this._current = d; });
  // path.transition()
  //     .duration(750)
  //     .attrTween('d', function(d) {
  //       var interpolate = d3.interpolate(this._current, d);
  //       this._current = interpolate(0);
  //       return function(t) {
  //         return arc(interpolate(t));
  //       };
  //     });
});

