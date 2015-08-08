HAMBURGER_BREAKPOINT = 900,
MOBILE_BREAKPOINT = 768;

$(function() {

  // Add user agent to HTML for cross-browser CSS
  $('html').attr('data-ua', navigator.userAgent);

  // Toggle hamburger menu
  $('.main-nav-hamburger').click(function() {
    $('.main-nav').toggleClass('active');
  });
  $(window).on('resize', _.debounce(function() {
    if ($(window).width() >= HAMBURGER_BREAKPOINT &&
        $(window).scrollTop() >= $('.panel1').offset().top)
      $('.main-nav').addClass('active');
    if ($(window).width() >= HAMBURGER_BREAKPOINT &&
        $(window).scrollTop() <= $('.panel1').offset().top)
      $('.main-nav').removeClass('active');
  }, 200));

  // Toggle class of header
  $('.panel1').waypoint({
    handler: function(dir) {
      if($(window).width() > HAMBURGER_BREAKPOINT) $('.main-nav').toggleClass('active');
    },
    offset: $('.main-nav').outerHeight() * 2 + 20
  });

  // Fade in video on load
  var vid = $('.hero-unit-video video')[0];
  var videoInterval = setInterval(function() {
    if (vid.readyState === 4) {
      $('.hero-unit').addClass('is-loaded');
      clearInterval(videoInterval);

      // Fade out/in video just before end
      $(vid).on("timeupdate", function() {
        if (vid.duration - vid.currentTime <= 1) {
          $('.hero-unit').removeClass('is-loaded');
          setTimeout(function() {
            $('.hero-unit').addClass('is-loaded');
          }, 700);
        }
      });
    }
  }, 500);

  // Start & stop "unlocked access" animation
  if($(window).width() > MOBILE_BREAKPOINT) {
    $('.panel1').waypoint({
      handler: function(dir) {
        if (dir != 'down') return;
        animatePanel1();
        $('.hero-unit-video video')[0].pause();
      },
      offset: '50%'
    });
    $('.panel1').waypoint({
      handler: function(dir) { if (dir == 'up') animatePanel1() },
      offset: -$('.panel1').height() / 2
    });
    $('.panel2, .hero-unit').waypoint({ handler: resetPanel1 });
    $('.hero-unit-copy').waypoint({
      handler: function(dir) {
        if (dir != 'up') return;
        resetPanel1();
        $('.hero-unit-video video')[0].play();
      }
    });
    $(window).on('resize', _.debounce(resetPanel1, 200));
  }

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
    if ($('.panel6-age').val() && $('.panel6-radios :checked').length) {
      $('.panel6 .flat-button').removeAttr('disabled');
    } else {
      $('.panel6 .flat-button').attr('disabled', 'disabled');
    }
  });
  $('.panel6 .flat-button').click(function(e) {
    e.preventDefault();
    location.assign('/questionnaire');
  });
});
