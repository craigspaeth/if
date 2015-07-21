(function() {
  window.home = function() {

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
    if($(window).width() > 768) {
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
  };
})();
$(function (){
  if (location.pathname.match('questionnaire')) {
    questionnaire();
  } else {
    home();
  }  
});
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
    offset: $('.main-nav').outerHeight() + 20
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
    offset: $('.main-nav').outerHeight() + 13
  });
  var setLastMargin = function() {
    $('.panel5 header').css({
      'padding-bottom': ($('.panel5-laptop').height() -
        $('.panel5-header:last-child').height() + 8)
    });
  }
  $(window).on('resize', _.debounce(setLastMargin, 200));setLastMargin
  setLastMargin();

  // Slide screenshot in laptop
  $('.panel5-header:nth-child(1)').waypoint({
    handler: function() {
      $('.panel5-laptop-screen img:first-child').animate({
        'margin-top': 0
      }, 500, 'easeInOutCubic');
    }
  });
  $('.panel5-header:nth-child(2)').waypoint({
    handler: function() {
      $('.panel5-laptop-screen img:first-child').animate({
        'margin-top': -$('.panel5-laptop-screen img:first-child').height()
      }, 500, 'easeInOutCubic');
    },
    offset: '50%'
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
	$('.panel5-laptop').removeClass('bottom').css({ right: right })
    .addClass('stuck');
};(function() {
  var slide = 0;

  window.questionnaire = function() {
    
    // Clicking back and forth slides between questions
    $('.nextback-next button').click(next);
    $('.nextback-back button').click(back);
    $('input:first').focus();

    // Upon filling in inputs of active question toggle disabled next button
    $(':input').on('change keyup', toggleNextButton);

    next();next();
  }

  var next = function() {
    slide++;
    toggleNextButton();
    animateSlide();
    animateProgressbar();
    toggleBackButton();
  }

  var back = function() {
    slide--;
    animateSlide();
    animateProgressbar();
    toggleBackButton();
  }

  var inputsFilled = function () {
    return $('.question' + (slide + 1) + ' :input').map(function() {
      if ($(this).is('[type=radio]')) {
        return $('[name=' + $(this).attr('name') + ']:checked').length > 0;
      } else {
        return $(this).val() != '';
      }
    }).toArray().indexOf(false) == -1;
  }

  var toggleNextButton = function() {
    $('.nextback-next button').attr('disabled', !inputsFilled());
  }

  var animateProgressbar = function() {
    var width;
    if (slide == 0) width = '2%';
    if (slide == 1) width = '25%';
    if (slide == 2) width = '50%';
    if (slide == 3) width = '62.5%';
    if (slide == 4) width = '75%';
    if (slide == 5) width = '100%';
    $('.progressbar-bar-fill').animate({ width: width }, 'easeInOut');
  }

  var animateSlide = function() {
    margin = -slide * $('.questionnaire-container').width();
    $('.questionnaire-questions').animate({
      'margin-left': margin
    }, 'easeInOut', function() {
      $('.question' + (slide + 1) + ' :input').first().focus();
    });    
  }

  var toggleBackButton = function() {
    if (slide == 0) $('.nextback-back button').hide();
    if (slide > 0) $('.nextback-back button').show();  
  }
})();
