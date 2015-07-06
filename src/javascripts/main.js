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

  // Panel 1 graph
  setGraph();
});

