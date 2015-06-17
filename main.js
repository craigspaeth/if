$(function() {

  // Toggle hamburger menu
  $('.main-nav-hamburger').click(function() {
    $('.main-nav').toggleClass('active');
  });

  // Toggle class of header
  $('.panel1').waypoint({
    handler: function(dir) {
      $('.main-nav').toggleClass('active');
    },
    offset: $('.main-nav').outerHeight()
  });
});

