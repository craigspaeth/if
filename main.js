HAMBURGER_BREAKPOINT = 900,
MOBILE_BREAKPOINT = 768;
LAPTOP_MARGIN = 150

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
  if ($(window).width() > MOBILE_BREAKPOINT) {
    var vid = $('.hero-unit-video video')[0];
    var videoInterval = setInterval(function() {
      if (vid.readyState === 4) {
        $('.hero-unit').addClass('is-loaded');
        clearInterval(videoInterval);

        // Fade out/in video just before end
        $(vid).on("timeupdate", function() {
          if($(window).width() <= MOBILE_BREAKPOINT) return;
          if (vid.duration - vid.currentTime <= 1) {
            $('.hero-unit').removeClass('is-loaded');
            setTimeout(function() {
              $('.hero-unit').addClass('is-loaded');
            }, 700);
          }
        });
      }
    }, 500);
  }
  $(window).on('resize', _.debounce(function() {
    if($(window).width() <= MOBILE_BREAKPOINT) {
      $('.hero-unit').addClass('is-loaded');
    }
  }, 500));

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
(function() {
  var GUTTER_SIZE = 36;
  var TRANSITION_TIME = 500;

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
        left = Math.round($('.panel1-item').width() / 2 - $svg.width() / 2);
        $('.panel1-dfa-logo, .panel1-graph').removeClass('active');
        $svg.animate({ 'margin-left': left }, 700, 'easeInOutCubic');
        animateSlices();

      // Slide out slices
      } else if (step == 1) {
        data = _.times(9, function() {
          return 100;
        });
        color = function(d, i) {
          if (i == 0) return '#B0B3AB';
          return ['#B0B3AB','#A0A597','#B5BAAB','#AFB6A4','#C5CBBC',
            '#BABEB3','#A8AE99','#B6B8B3','#A9AE9D','C9CAB6'][i];
        }
        animateSlices();

      // Slide over and show DFA
      } else if (step == 2) {
        left = Math.round($('.panel1-item').width() + ($('.panel1-item').width() / 2) -
          $svg.width() / 2) + GUTTER_SIZE;
        $svg.animate({
          'margin-left': left
        }, 700, 'easeInOutCubic', function() {
          $('.panel1-dfa-logo, .panel1-graph').addClass('active');
        });

      // Hide DFA and slide over
      } else if (step == 3) {
        $('.panel1-dfa-logo, .panel1-graph').removeClass('active');
        left = Math.round(($('.panel1-item').width() * 2) + ($('.panel1-item').width() / 2) -
          $svg.width() / 2) + GUTTER_SIZE * 2;
        $svg.animate({ 'margin-left': left }, 700, 'easeInOutCubic');

      // Shuffle slices
      } else if(step ==4) {
        _.times(3, function(i) {
          setTimeout(function() {
            data = _.times(9, function() {
              return _.random(20, 100);
            });
            animateSlices();
          }, i * TRANSITION_TIME - 100);
        });
        setTimeout(function() {
          data = _.times(9, function() {
            return 100;
          });
          animateSlices();
        }, TRANSITION_TIME * 4);
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
$(function() {

  // Toggle sticky laptop at the top
  $('.panel5-header:first-child').waypoint({
    handler: function(dir) {
      if (dir == 'up') {
        $('.panel5-laptop').removeClass('stuck').removeAttr('style');
      } else {
        stickLaptop();
      }
    },
    offset: $('.main-nav').outerHeight() + LAPTOP_MARGIN
  });

  // Toggle sticky laptop at the bottom
  $('.panel5-header:last-child').waypoint({
    handler: function(dir) {
      if (dir == 'up') {
        stickLaptop();
      } else {
        $('.panel5-laptop').removeClass('stuck').addClass('bottom')
          .removeAttr('style');
      }
    },
    offset: $('.main-nav').outerHeight() + 13 + 130
  });
  var setLastMargin = function() {
    $('.panel5 header').css({
      'padding-bottom': ($('.panel5-laptop').height() -
        $('.panel5-header:last-child').height() + 8)
    });
  }
  $(window).on('resize', _.debounce(function() {
    if ($(window).width() < HAMBURGER_BREAKPOINT) {
      $('.panel5 header').css({ 'padding-bottom': 0 });
    } else {
      setLastMargin();
    }
  }, 200));
  imagesLoaded($('.panel5-laptop img')[0], setLastMargin);

  // Slide screenshot in laptop
  $('.panel5-header:nth-child(1)').waypoint({
    handler: function() {
      $('.panel5-laptop-screen img:first-child').animate({
        'margin-top': 0
      }, 500, 'easeInOutCubic');
    }
  });
  $('.panel5-header:nth-child(2)').waypoint({
    handler: function(dir) {
      if (dir == 'up')
        $('.panel5-laptop-screen img:first-child').animate({
          'margin-top': -$('.panel5-laptop-screen img:first-child').height()
        }, 500, 'easeInOutCubic');
    },
    offset: LAPTOP_MARGIN
  });
  $('.panel5-header:nth-child(2)').waypoint({
    handler: function(dir) {
      if (dir == 'down')
        $('.panel5-laptop-screen img:first-child').animate({
          'margin-top': -$('.panel5-laptop-screen img:first-child').height()
        }, 500, 'easeInOutCubic');
    },
    offset: '80%'
  });
  $('.panel5-header:nth-child(3)').waypoint({
    handler: function() {
      $('.panel5-laptop-screen img:first-child').animate({
        'margin-top': -($('.panel5-laptop-screen img:first-child').height() +
          $('.panel5-laptop-screen img:nth-child(2)').height())
      }, 500, 'easeInOutCubic');
    },
    offset: '50%'
  });
});

var stickLaptop = function() {
	if ($('.panel5-laptop').hasClass('fixed')) return;
	var right = $(window).width() -
	  ($('.panel5-laptop').offset().left + $('.panel5-laptop').outerWidth());
	$('.panel5-laptop').removeClass('bottom').css({
    right: right,
    width: $('.panel5-laptop').width()
  }).addClass('stuck');
};
