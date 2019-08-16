(function($) {
	var _winnerLink,
		_winnerCookieName = 'winner';
    $(function() {
    	//_winnerLink = $.cookie(_winnerCookieName);
        setButton();
        setAniLoop();
        setFooterAni();
    });

    function setButton() {
        var _menu_TL;
        var j_menuList = $('.menu-list span');
        var menuListCount = j_menuList.length;
        var menuFadeOutCount = Math.ceil(menuListCount / 2);
        var menuNum = 0;
        $('.menu-btn').on('click', function() {
            menuNum = 0
            Fun.popupChange($('.popup#menu'), true);

            if (!_menu_TL) {
                _menu_TL = new TimelineLite({
                    // onReverseComplete: function() {
                    // 	Fun.popupChange($('.popup'));
                    // }
                });
                _menu_TL.add(
                    TweenMax.staggerFromTo($('.menu-list span'), .6, {
                        left: -150,
                        opacity: 0
                    }, {
                        left: 0,
                        opacity: 1,
                        delay: .1,
                        ease: Circ.easeOut,
                        onReverseComplete: function() {
                            menuNum += 1;
                            if (menuNum == menuFadeOutCount) {
                                Fun.popupChange($('.popup'));
                            }
                        }
                    }, .1)
                )
            }

            _menu_TL.timeScale(1).restart();
        });

        // menu以外的popup關閉按鈕
        $('.popup').not('#menu').find('.pop-close-btn').on('click', function() {
            Fun.popupChange($('.popup'));
        });

        // menu的popup關閉按鈕
        $('.popup#menu').find('.pop-close-btn').on('click', function() {
            _menu_TL.timeScale(2).reverse();
        });

        $('.menu-list a').on('click', function(e) {
            var className = $(this).parent().attr('class').split(" ")[0];
            switch (className) {
                case "lottery":
                    e.preventDefault();
                    window.activityEndMsg();
                    break;
                case "award":
                    e.preventDefault();
                    //window.alert("得獎名單將於2017/2/27公布，敬請期待");
                    //getWinner();
                    window.location.href = "winners_2oi7.html";
                    break;
                case "fb-share":
                    e.preventDefault();
                    var url = 'https://event.ad.megais.com/heysong2017cny/fb.html';
                    url += "?rnd=" + parseInt(Math.random() * 10000);
                    window.open('https://www.facebook.com/sharer/sharer.php?u='.concat(encodeURIComponent(url)));
                    break;
            }
            className = "menu_" + className;
            console.log(className);
            //if(Fun.detectmobile.isMobile) className = "m_" + className;
            window.trackingEvent(className, "click");
        });

    }

    function setFooterAni() {
        TweenMax.from($('.d3'), 1, { autoAlpha: 0 });
        TweenMax.from($('.d2'), 1, { autoAlpha: 0, delay: 0.2 });
        TweenMax.from($('.d1'), 1, { autoAlpha: 0, left: "-=100", delay: 0.4, ease: Back.easeOut });
        TweenMax.from($('.d4-1'), 1, { autoAlpha: 0, left: "+=20", top: "+=50", delay: 0.4, ease: Back.easeOut });
        TweenMax.from($('.d4-2'), 1, { autoAlpha: 0, left: "-=20", top: "+=50", delay: 0.5, ease: Back.easeOut });
        TweenMax.from($('.d6'), 1, { autoAlpha: 0, top: "+=50", delay: 0.6, scale: 0.2, ease: Back.easeOut });
        TweenMax.from($('.d5'), 1, { autoAlpha: 0, top: "+=50", scale: 0.2, delay: 0.7, ease: Back.easeOut, onComplete: setFooterLoop });
        setFireworkLoop();
    }

    function setFooterLoop() {
        var d1_tlm = new TimelineMax({ repeat: -1, repeatDelay: 2 });
        d1_tlm.add([
            TweenMax.to('.d1', 0.2, { marginTop: -50 }),
            TweenMax.to('.d1', 1, { marginTop: 0, delay: 0.2, ease: Bounce.easeOut }),
        ]);
        TweenMax.to('.d5', 1, { marginTop: -10, rotation: 10, ease: Linear.easeNone, repeat: -1, yoyo: true });
    }

    function setFireworkLoop() {
        var delayArr = [0, 0.2, 0.4, 0.6];
        $('.light-box li').each(function(i) {
            var firework_tlm, ele, delayNum;
            delayNum = parseInt(delayArr.length * Math.random());
            delayNum = delayArr.splice(delayNum, 1)[0];
            firework_tlm = new TimelineMax({ repeat: -1, repeatDelay: 1.5, delay: delayNum })
            ele = $(this);
            firework_tlm.add([
                TweenMax.fromTo(ele, 0.8, { marginTop: 50 }, { marginTop: 0, ease: Cubic.easeOut }),
                TweenMax.fromTo(ele, 1.2, { scale: 0 }, { scale: 1, ease: Cubic.easeOut }),
                TweenMax.fromTo(ele, 0.6, { alpha: 0 }, { alpha: 1, ease: Linear.easeNone }),
                TweenMax.to(ele, 1, { alpha: 0, delay: 0.8, ease: Linear.easeNone }),
                TweenMax.to(ele, 0.8, { marginTop: 10, delay: 0.8, ease: Cubic.easeIn })
            ]);
        });
    }

    function setAniLoop() {
        var moveNum = 50,
            disNum = 5,
            rndNum = 5;
        $('.cloud-box li').each(function(i) {
            var ele = $(this),
                moveObj = {};
            moveObj.ease = Power0.easeNone;
            moveObj.repeat = -1;
            moveObj.yoyo = true;
            moveObj.left = moveNum + disNum * parseInt(Math.random() * rndNum);
            if ((ele.index() % 2) == 0) moveObj.left *= -1;
            moveObj.left = parseInt(ele.css('left')) + moveObj.left;
            TweenMax.to(ele, 4, moveObj)
        });
    }

    function getLinkObj(pUrl, pTarget) {
        pTarget = pTarget || "";
        var obj = {};
        obj.href = pUrl;
        obj.target = pTarget;
        return obj;
    }

    window.activityEndMsg = function() {
        alert("活動已結束");
    }

    //======== data ========
    function getWinner() {
    	console.log(_winnerLink);
    	if(_winnerLink){
    		window.location.href = _winnerLink;
    		return false;
    	}
        Fun.loadingChange(true);
        $.post("actions/get_time.php", {}, function(data) {
            Fun.loadingChange(false);
            if (data.result) {
            	_winnerLink = data.filename;
                $.cookie(_winnerCookieName, _winnerLink, { expires: 7 });
                window.location.href = _winnerLink;
            } else {
                window.alert("得獎名單將於2017/2/27公布，敬請期待");
            }
        }, 'json');

    }


})(jQuery)
