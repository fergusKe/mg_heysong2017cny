(function($) {
	var _youtube, _cookieObj = {name:"heysong2017cny"}, _isMobile;
	$(function() {
		init();
	});

	function init(){
		$('.main').automove({ paused:true, playComplete:setAniLoop});
		if(Fun.detectmobile.isMobile){
			_isMobile = true;
			$('#video').addClass('m');
		}
		if(!$.cookie(_cookieObj.name)){
			_cookieObj.bol = true;
			$.cookie(_cookieObj.name, "true");
			videoChange(true);
		}else{
			aniPlay();
		}
		setButton();
	}

	function setButton(){
		$('.intro-video a').on('click', function(e){
			e.preventDefault();
			videoChange(true);
			//window.alert("敬請期待");
		});

		$('#video .skip_btn').on('click', function(e){
			e.preventDefault();
			videoChange(false);
		});

		
		$('#video .video_btn').on('click', function(e){
			e.preventDefault();
			_youtube.playVideo();
			videoBtnHide();
		});

		$('.lottery-btn a').on('click', function(e){
			e.preventDefault();
			window.activityEndMsg();
		});


	}

	function aniPlay(){
		$('.main').automove_play();
	}

	function videoBtnHide(){
		Fun.eleFadeOut($('#video .video_btn'));
	}

	function setAniLoop(){
		TweenMax.to('.lottery-item1', 0.5, {left:'-=2', top:'-=5', repeat:-1, yoyo:true});
		TweenMax.to('.lottery-item2', 0.5, {rotation:-5, repeat:-1, yoyo:true});
		TweenMax.to('.lottery-handle',2.5, { repeat:-1, onRepeat:function(){
			$('.lottery-handle').addClass('active');
			TweenMax.delayedCall(0.1, function(){$('.lottery-handle').removeClass('active');});
		}});
	}

	//============== youtube ==============
	function videoChange(pBol){
		pBol = pBol || false;
		var ele = $('#video');
		if(pBol){
			//ele.find('.video_content').html('<div id="youtube" class="youtube"></div>');
			if(!_youtube){
				_youtube = new YoutubeApi(getYoutubeOptions());
			}else{
				_youtube.playVideo();
				//_youtube.changeOptions(getYoutubeOptions());
			}
			Fun.eleFadeIn(ele);
		}else{
			Fun.eleFadeOut(ele);
			_youtube.stopVideo();
			videoBtnHide();
			if(_cookieObj.bol){
				delete _cookieObj.bol;
				aniPlay();
			}
		}
	}

	function getYoutubeOptions(){
		var options = {};
		options.id = "youtube";
		options.url = "Buz8QCLXKw0";
		options.controls = 1;
		if(!_isMobile) options.autoplay = 1;
		options.onComplete = movieComplete;
		return options;
	}

	function movieComplete(){
		videoChange(false);
	}


})(jQuery)
