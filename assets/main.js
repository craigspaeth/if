var SECTION_ADJUST = 20;

$(function() {
  resizeSections();
  centerCopySections();
});

// Center copy on the page
var centerCopySections = function() {
  $('.copy-section, .portfolio-content-container').each(function(i, el) {
    $(el).css({
      'margin-top': -Math.round($(el).height() / 2) - SECTION_ADJUST,
      top: '50%'
    });
  });
}
$(window).on('resize', _.debounce(resizeSections));

// Resizes the sections to fill the viewport
var resizeSections = function () {
  $('.full-screen-section').each(function(i, el) {
    $(el).css({ 'height': $(window).height() });
  });
}
$(window).on('resize', _.debounce(resizeSections));
