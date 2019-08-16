(function ($) {
  var _userObj = {}, _gameEndTL, _slotMachine, _winTL;

  window.activityEndMsg();
  window.location.href = "index.html";

  $(function () {
    $('.main').automove({ paused:true, playComplete: initComplete });
    activity();
    
  });

  function init() {
    $('.main').automove_play();
    Fun.popupChange($('.popup#login'), true);
    TweenMax.delayedCall(1.5, function () {
      $('.rollbar-box').rollbar({ pathPadding: '0px' });
      setButton();
    });
    setForm();
    _slotMachine = new SlotMachine($('.slot'), {callback:slotMachineComplete});
  }

  function initComplete() {
    $('.sky-light div').each(function(i){
      var obj = {}, ele = $(this);
      obj.left = parseInt(ele.css('left'));
      obj.top = parseInt(ele.css('top'));
      ele.data('data', obj);
      skyLightLoop(ele);
    });
  }

  function skyLightLoop(pEle){
    var data = pEle.data('data'), moveObj = {};
    moveObj.left = data.left;
    moveObj.top = data.top + 10 + parseInt(Math.random() * 5);
    if(data.bol){
      delete data.bol;
      moveObj.left = moveObj.left + 10 + parseInt(Math.random() * 10);
    }else{
      data.bol = true;
    }
    pEle.data('data', data);
    TweenMax.to(pEle, 2, { left:moveObj.left, ease:Linear.easeNone , onComplete:skyLightLoop, onCompleteParams:[pEle]});
    TweenMax.to(pEle, 1, { top:moveObj.top, ease:Linear.easeNone});
    TweenMax.to(pEle, 1, { top:data.top, delay:1, ease:Linear.easeNone});
  }

  function getRnd(min, max){
    return parseInt(min - max)
  }

  function setButton() {
    $('.popup#login .login-tabs li').on('click', function () {
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

    $('.privacy-btn').on('click', function (e) {
      e.preventDefault();
      Fun.popupChange($('.popup#login'));
      Fun.popupChange($('.popup#privacy'), true);
    });

    $('#privacy .pop-close-btn, #privacy .close-btn').on('click', function (e) {
      e.preventDefault();
      if (this.className == 'close-btn') Fun.popupChange($('.popup#privacy'));

      TweenMax.delayedCall(0.1, function () {
        Fun.popupChange($('.popup#login'), true);
      });
    });

    $('.popup#login .pop-close-btn').on('click', function (e) {
      e.preventDefault();
      window.location.href = 'index.html';
    });

    //control form
    $('#addBtn').on('click', function(e){
      e.preventDefault();
      addFormCheck();
    });

    $('#loginBtn').on('click', function(e){
      e.preventDefault();
      loginFormCheck();
    });
    
    $('#cupsBtn').on('click', function(e){
      e.preventDefault();
      cupsCheck();
    });
    
    $('#moreBtn1, #moreBtn2').on('click', function(e){
      e.preventDefault();
      changeStep('cups');
    });

    $('#game').on('click', function(e){
      e.preventDefault();
      if(_userObj.game_id){
        changeStep("gameStart");
        window.trackingEvent("lottery_gameStart", "click");
      }
    });

  }

  function changeStep(pStr){
    switch(pStr){
      case "cups":
        Fun.eleFadeIn($('#cups'));
        Fun.eleFadeOut($('#cups_end, #game'));
        if(_gameEndTL) _gameEndTL.reverse();
        changeFooter(true);
        $(".cup").each(function(i) {
            $(this).val($(this).attr('prompt'));
        });
      break;
      case "cups_end":
        Fun.eleFadeIn($('#cups_end'));
        Fun.eleFadeOut($('#cups'));
      break;
      case "game":
        Fun.eleFadeIn($('#game'));
        Fun.eleFadeOut($('#cups'));
      break;
      case "game_end":
        if(!_gameEndTL){
          $('.slot-title.step2, .notes.step2, .slot-next-btn.step2').show();
          _gameEndTL = new TimelineLite({paused:true});
          _gameEndTL.add([
            TweenMax.to($('.slot-title.step1, .notes.step1'), 0.25, {/*top:"-50",*/ autoAlpha:0, ease:Circ.easeOut}),
            TweenMax.from($('.slot-title.step2, .notes.step2'), 0.25, {/*top:"+50",*/ autoAlpha:0, delay:0.25, ease:Cubic.easeIn}),
            TweenMax.from($('.slot-next-btn.step2'), 0.25, { autoAlpha:0, delay:0.25})
          ]);

        }
        _gameEndTL.play();
        changeFooter(false);
      break;
      case "gameStart":
        _slotMachine.startAction();
        $('.slot-handle').addClass('active');
        TweenMax.delayedCall(0.1, function(){$('.slot-handle').removeClass('active');});
        gift({game_id:_userObj.game_id});
        delete _userObj.game_id;
      break;
      case "loadData":
        TweenMax.delayedCall(1, function(){
          var gift = 0;
          if(_userObj.img){
            gift = 1;
          }
          _slotMachine.stopAction(gift);
        });
      break;
      case "gift":
        Fun.eleFadeIn($('#game_gift'));
        Fun.eleFadeOut($('#game, #congratulation'));
        changeFooter(false);
      break;
    }
  }

  function changeFooter(pBol){
    pBol = pBol || false;
    if(pBol){
      Fun.eleFadeIn($('.d5, .d6'));
    }else{
      Fun.eleFadeOut($('.d5, .d6'));
    }
  }

  function loginEnd(pObj){
    _userObj.event_id = pObj.event_id;
    Fun.popupChange($('.popup#login'));
  }

  function activityCheck(){
    if(_userObj.activityBol){
      window.alert('活動已結束');
      return true;
    }
    return false;
  }

  function slotMachineComplete(){
    if(!_userObj.img){
      changeStep("game_end");
    }else{
      _winTL = new TimelineLite();
      $('#congratulation').show();
      _winTL.add([
        TweenMax.from($('#congratulation'), 0.5, {autoAlpha:0}),
        TweenMax.from($('#congratulation .popup-main'), 1, {autoAlpha:0, scale:2, delay:0.25, ease:Bounce.easeOut})
      ]);
      TweenMax.delayedCall(3, function(){
        TweenMax.to($('#congratulation'), 0.5, {autoAlpha:0})
        //_winTL.reverse();
        changeStep("gift");
      })
      
    }
  }

  function setForm() {
    Fun.setForm();

    $('.cup, #id_card, #login_id_card').keyup(function () {
      $(this).val($(this).val().toUpperCase());
    });

    if (isIE()) {
      $('.checkbox-area').addClass('ie');
    }
  }

  function addFormCheck() {
    if(activityCheck()) return;
    var sendObj = {};
    if (!$('#form-first-check').prop("checked")) {
      alert("請勾選同意活動辦法與隱私權聲明");
      return false;
    }

    var name_check = /^[\u4e00-\u9fa5][\u4e00-\u9fa5]*$/;
    var inputName = $("input#name");
    if (!Fun.checkValueOfForm(inputName, name_check, "請輸入中文字")) { return false; }

    var id_card_check = /^[A-Z][0-9]{9,9}/;
    var inputIDCard = $("input#id_card");
    if (!Fun.checkValueOfForm(inputIDCard, id_card_check, "身分證字號格式錯誤")) { return false; }

    var phone_check = /^0[0-9]{8,9}$/;
    var inputPhone = $("input#phone");
    if (!Fun.checkValueOfForm(inputPhone, phone_check, "請輸入正確手機(ex:0912345678)\n電話號碼(ex:0224123456)")) { return false; }

    var email_check = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var inputEmail = $("input#email");
    if (!Fun.checkValueOfForm(inputEmail, email_check, "email格式錯誤")) { return false; }

    
    sendObj.name = inputName.val();
    sendObj.phone = inputPhone.val();
    sendObj.email = inputEmail.val();
    sendObj.id_card = inputIDCard.val();
    addUserData(sendObj);
  }

  function loginFormCheck() {
    if(activityCheck()) return;
    var sendObj = {};
    var login_id_card_check = /^[A-Z][0-9]{9,9}/;
    var inputLoginIDCard = $("input#login_id_card");
    if (!Fun.checkValueOfForm(inputLoginIDCard, login_id_card_check, "身分證字號格式錯誤")) { return false; }
    
    sendObj.id_card = inputLoginIDCard.val();
    login(sendObj);
  }

  function cupsCheck() {
    if(activityCheck()) return;
    delete _userObj.game_id;
    var sendObj = {};
    var cups = [], errorBol, copBol;
    for (var checCupNum = 0; checCupNum < 2; checCupNum++) {
      var cupInput = $('.cup').eq(checCupNum);
      var cup_check = /[0-9A-Z]{8,8}/;
      if (cupInput.val() != "" && cupInput.val() != cupInput.attr('prompt')) {
        var value = cupInput.val();
        if (cup_check.test(value)) {
          if (cups.indexOf(value) == -1) {
            cups.push(value);
            copBol = true;
          } else {
            alert("第" + (checCupNum + 1) + "組序號重複，請重新輸入或移除");
            cupInput.focus();
            errorBol = true;
            break;
          }

        } else {
          alert("瓶蓋序號格式錯誤，請輸入0-9A-Z");
          cupInput.focus();
          errorBol = true;
          console.log(checCupNum);
          break;
        }

      } else {
        cups.push("");
      }
    }
    if (errorBol) return false;
    if (!copBol) {
      alert("請至少輸入一組瓶蓋序號！");
      return false;
    }
    sendObj.event_id = _userObj.event_id;
    sendObj.invoices = cups.toString();
    addInvoices(sendObj);
  }

  function isIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
      // 回傳版本 <=10 的版本
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // 回傳版本 >=11 的版本
      var rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
      // 判斷Edge
      return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
  }

  //==============data=====================
  function activity() {
    Fun.loadingChange(true);
    $.post("actions/activity.php", {}, function (data) {
      Fun.loadingChange(false);
      if (!data.result) {
        _userObj.activityBol = true;
      }
      init();
    }, 'json');
    //init();
  }

  function addUserData(pObj) {
    var sendObj = $.extend(getFbObj(), pObj);
    Fun.loadingChange(true);
    $.post("actions/add_user_data.php", sendObj, function (data) {
      Fun.loadingChange(false);
      if (data.result) {
        loginEnd(data);
      } else {
        alert(data.msg);
      }
    }, 'json');
    //loginEnd({event_id:123});
  }

  function login(pObj) {
    var sendObj = $.extend(getFbObj(), pObj);
    Fun.loadingChange(true);
    $.post("actions/login.php", sendObj, function (data) {
      Fun.loadingChange(false);
      if (data.result) {
        loginEnd(data);
      } else {
        alert(data.msg);
      }
    }, 'json');
    //loginEnd({event_id:123});
  }

  function addInvoices(pObj) {
    var sendObj = $.extend(getFbObj(), pObj);
    Fun.loadingChange(true);
    $.post("actions/add_invoices.php", sendObj, function (data) {
      Fun.loadingChange(false);
      if (data.result) {
        if(data.game_id){
          _userObj.game_id = data.game_id;
          changeStep("game");
        }else{
          changeStep("cups_end");
        }
      } else {
        alert(data.msg);
      }
    }, 'json');
    /*_userObj.game_id = "123456789";
    changeStep("game");*/
  }

  function gift(pObj) {
    var sendObj = $.extend(getFbObj(), pObj);
    Fun.loadingChange(true);
    $.post("actions/gift.php", sendObj, function (data) {
      Fun.loadingChange(false);
      if (data.result) {
        if(data.img){
          _userObj.img = data.img;
          $('#game_gift img').attr('src',_userObj.img);
          $('#download a').attr('href', "download.php?file_name=" + _userObj.img);
          
        }
        changeStep('loadData');
      } else {
        console.log(data.msg);
      }
    }, 'json');
    /*_userObj.img = "1234";
    changeStep('loadData');*/
    
  }

  
    function getFbObj(){
        var obj = {};
        obj.device = "pc";
        if(Fun.detectmobile.isMobile){
            obj.device = "m";
        }
        return obj;
    }


})(jQuery)
