var SECTION_ADJUST = 20;

$(function() {
  resizeSections();
  centerCopySections();
});

// Center copy on the page
var centerCopySections = function() {
  $('.copy-section, .centered-content').each(function(i, el) {
    if($(el).height() > $(window).height()) {
      $(el).css({
        'margin-top': 100,
        'margin-bottom': 100,
        top: 0,
        position: 'relative'
      });
    } else {
      $(el).css({
        'margin-top': -Math.round($(el).height() / 2) - SECTION_ADJUST,
        top: '50%',
        position: 'absolute'
      });      
    }
  });
}
$(window).on('resize', _.debounce(resizeSections));

// Resizes the sections to fill the viewport
var resizeSections = function () {
  $('.full-screen-section').each(function(i, el) {
    if($(el).height() > $(window).height()) {
      $(el).css({ height: 'auto' });
    } else {
      $(el).css({ height: $(window).height() });      
    } 
  });
}
$(window).on('resize', _.debounce(resizeSections));
