(function ($) {
  $(function () {
    init();
  });

  function init() {
    $('.main').automove();
    $('.rollbar-box').rollbar({ pathPadding: '0px' });
  }

})(jQuery)
