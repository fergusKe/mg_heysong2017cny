(function($) {
	var scrollbarWidth = 0;
	$(function() {
		// getScrollbarWidth();

		setButton();
	});



	function setButton() {
		$('.menu-btn').on('click', function() {
			Fun.popupChange($('.popup#menu'), true);
			var tl = new TimelineLite();
			tl.staggerFromTo($('.menu-list span'), .6, {
				left: -150,
				opacity: 0
			}, {
				left: 0,
				opacity: 1,
				delay: .1,
				ease: Circ.easeOut
			}, .1);
			// TweenMax.from(this.refs.num,.3,{
      //   scaleX:2, scaleY:2,
      //   startAt: {scaleX:1, scaleY:1}
      // });
		});
		$('.pop-close-btn').on('click', function() {
			Fun.popupChange($('.popup'));
		});
	}

  //##################################################################
  //---popup 切換---
	// function popupChange(pEle, pBol) {
	// 	pBol = pBol || false;
	// 	if (pBol) {
	// 		Fun.eleFadeIn(pEle);
	// 	} else {
	// 		Fun.eleFadeOut(pEle);
	// 	}
	// 	popupShowHideSet(pBol);
	// }
	//
  // //---popup 切換 show&hide setting---
  // function popupShowHideSet(pBol) {
  //   pBol = pBol || false;
  //   if (pBol) {
  //     $('.popup').css('overflow-y', 'auto');
  //     $('body').css({
	// 			'overflow': 'hidden',
	// 			'padding-right': scrollbarWidth,
	// 			'box-sizing': 'border-box'
	// 		});
  //   } else {
  //     $('.popup').css('overflow-y', 'hidden');
  //     $('body').css({
	// 			'overflow': '',
	// 			'padding-right': 0
	// 		});
	//
  //     if (Fun.detectmobile.isMobile) {
  //       $('body').css('overflow-x', 'hidden');
  //     }
  //   }
  // }
	//
	// //---取得scrollbar寬度---
	// function getScrollbarWidth() {
  //   var outer = document.createElement("div");
  //   outer.style.visibility = "hidden";
  //   outer.style.width = "100px";
  //   document.body.appendChild(outer);
	//
  //   var widthNoScroll = outer.offsetWidth;
  //   // force scrollbars
  //   outer.style.overflow = "scroll";
	//
  //   // add innerdiv
  //   var inner = document.createElement("div");
  //   inner.style.width = "100%";
  //   outer.appendChild(inner);
	//
  //   var widthWithScroll = inner.offsetWidth;
	//
  //   // remove divs
  //   outer.parentNode.removeChild(outer);
	//
  //   scrollbarWidth = widthNoScroll - widthWithScroll;
	// }

})(jQuery)
