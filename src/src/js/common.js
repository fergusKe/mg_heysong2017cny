(function($) {
	$(function() {
		setButton();
		setAniLoop();
	});

	function setButton() {
		var _menu_TL;
		var j_menuList = $('.menu-list span');
		var menuListCount = j_menuList.length;
		var menuFadeOutCount = Math.ceil( menuListCount / 2 );
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

    	$('.menu-list a').on('click', function(e){
    		var className = $(this).parent().attr('class').split(" ")[0];
            switch(className){
                case "award":
                    e.preventDefault();
                    window.alert("得獎名單將於2017/2/27公布，敬請期待");
                break;
                case "fb-share":
                    e.preventDefault();
                    var url = 'https://event.ad.megais.com/heysong2017cny/fb.html';
                    url += "?rnd="+ parseInt(Math.random() * 10000);
                    window.open('https://www.facebook.com/sharer/sharer.php?u='.concat(encodeURIComponent(url)));
                break;
            }
            className = "menu_" + className;
			console.log(className);
            //if(Fun.detectmobile.isMobile) className = "m_" + className;
			window.trackingEvent(className, "click");
    	});

	}

	function setAniLoop(){
		var moveNum = 50, disNum = 5, rndNum = 5;
		$('.cloud-box li').each(function(i){
			var ele = $(this), moveObj = {};
			moveObj.ease = Power0.easeNone;
			moveObj.repeat = -1;
			moveObj.yoyo = true;
			moveObj.left = moveNum + disNum * parseInt(Math.random() * rndNum);
			if((ele.index() % 2) == 0) moveObj.left *= -1;
			moveObj.left = parseInt(ele.css('left')) + moveObj.left;
			TweenMax.to(ele, 4, moveObj)
		});
	}

    function getLinkObj(pUrl, pTarget){
        pTarget = pTarget || "";
        var obj = {};
        obj.href = pUrl;
        obj.target = pTarget;
        return obj;
    }

})(jQuery)
