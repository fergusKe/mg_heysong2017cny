(function($) {
	$(function() {
		init();
	});

	function init(){
		$('.main').automove({ playComplete:setAniLoop});
		setButton();
	}

	function setButton(){
		$('.intro-video a').on('click', function(e){
			e.preventDefault();
			window.alert("敬請期待");
		})
	}

	function setAniLoop(){
		TweenMax.to('.lottery-item1', 0.5, {left:'-=2', top:'-=5', repeat:-1, yoyo:true});
		TweenMax.to('.lottery-item2', 0.5, {rotation:-5, repeat:-1, yoyo:true});
		TweenMax.to('.lottery-handle',2.5, { repeat:-1, onRepeat:function(){
			$('.lottery-handle').addClass('active');
			TweenMax.delayedCall(0.1, function(){$('.lottery-handle').removeClass('active');});
		}});
	}

})(jQuery)
