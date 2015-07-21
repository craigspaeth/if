(function() {
  var slide = 0;

  window.questionnaire = function() {

    // Clicking back and forth slides between questions
    $('.nextback-next button').click(next);
    $('.nextback-back button').click(back);
    $('input:first').focus();

    // Upon filling in inputs of active question toggle disabled next button
    $(':input').on('change keyup', toggleNextButton);
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
