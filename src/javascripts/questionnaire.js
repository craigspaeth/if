;var margin = 0;

var questionnaire = function() {
  $('.nextback-next button').click(function() {
    margin -= $('.questionnaire-container').width();
    $('.questionnaire-questions').animate({ 'margin-left': margin }, 'easeInOut');
  });
  $('.nextback-back button').click(function() {
    margin += $('.questionnaire-container').width();
    $('.questionnaire-questions').animate({ 'margin-left': margin }, 'easeInOut');
  });
}