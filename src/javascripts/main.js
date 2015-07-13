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

  // Start & stop "unlocked access" animation
  $('.panel1').waypoint({
    handler: function(dir) { if (dir == 'down') animatePanel1() },
    offset: '50%'
  });
  $('.panel1').waypoint({
    handler: function(dir) { if (dir == 'up') animatePanel1() },
    offset: -$('.panel1').height() / 2
  });
  $('.panel2, .hero-unit').waypoint({ handler: resetPanel1 });

  // Slide in Sustainable icons
  $('.panel3').waypoint({
    handler: function(dir) { $('.panel3-items').addClass('active') },
    offset: '50%'
  });

  // Animate portfolio graphic
  $('.panel4').waypoint({
    handler: function(dir) {
      setTimeout(function() {
        $('.panel4-graph').addClass('active');
      }, 500);
    },
    offset: '20%'
  });

  // Focus on input & toggle button for build a portfolio
  $('.panel6').waypoint({
    handler: function() { $('.panel6-age').focus(); },
    offset: '50%'
  });
  $('.panel6 :input').on('click change', function() {
    if ($('.panel6-age').val() && $('.panel6-radios [name=for]').val()) {
      $('.panel6 .flat-button').removeAttr('disabled');
    } else {
      $('.panel6 .flat-button').attr('disabled', 'disabled');
    }
  });
});

