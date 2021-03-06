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
