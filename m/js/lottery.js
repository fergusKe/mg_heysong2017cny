(function($) {
  $(function() {
    // Fun.popupChange($('.popup#login'), true);
    // Fun.popupChange($('.popup#congratulation'), true);

    setButton();
  });

  function setButton() {
    $('#login.popup .login-tabs li').on('click', function() {
      var j_this = $(this);
      if (j_this.hasClass('active')) return;

      j_this.siblings().removeClass('active');
      j_this.addClass('active');

      if (j_this.hasClass('again')) {
        $('.login-content').addClass('again');
      } else {
        $('.login-content').removeClass('again');
      }

    });
  }

})(jQuery)
