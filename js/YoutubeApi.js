// JavaScript Document
function YoutubeApi(options)
{
    var _player;
    // Load the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/player_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    // Replace the 'ytplayer' element with an <iframe> and
    // YouTube player after the API code downloads.
    
    var _youtubeRedayBol = false;
    
    var _options = $.extend( {
        id:"youtube",
        width:640,
        height:480,
        rel:0,
        autoplay:0,
        autohide:2,
        controls:2,
        wmode:"opaque",
        onComplete:false,
        onReady:false
    }, options);
    console.log(_options);
    window.onYouTubePlayerAPIReady = function() {
        console.log(_options.url);
        _player = new YT.Player(_options.id, {
            height: _options.height,
            width: _options.width,
            videoId: _options.url,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            },
            playerVars:{
                autoplay:_options.autoplay,
                autohide:_options.autohide,
                wmode:_options.wmode,
                rel:_options.rel,
                controls:_options.controls
            }
        });
    }
    
    function onPlayerReady(event) {
        _youtubeRedayBol =true;
        if(typeof _options.onReady === "function"){
            _options.onReady(); 
        }
    }
    
    function onPlayerStateChange(event) {
       /* console.log(event.data);
        console.log("PLAYING = "+(event.data == YT.PlayerState.PLAYING));
        console.log("ENDED = "+(event.data == YT.PlayerState.ENDED));*/
        
        if (event.data == YT.PlayerState.PLAYING) {
            /*if(instanceof _options.onReady === "function"){
                _options.onReady(); 
            }*/
            //setTimeout(stopVideo, 6000);
        }
        if (event.data == YT.PlayerState.ENDED) {
            //setTimeout(stopVideo, 6000);
            if(typeof _options.onComplete === "function"){
                _options.onComplete ();
            }
        }
    };
    
    this.playVideo = function()
    {
        _player.playVideo();
    };
    
    this.stopVideo = function()
    {
        _player.stopVideo();
    };

    this.destroy = function()
    {
        _player.stopVideo();
        _player = null;
    };
    
    this.changeOptions = function(pOptions){
        _options = $.extend(_options, pOptions);
        console.log(_options);
        onYouTubePlayerAPIReady();
    };
    
    this.getCurrentTimer = function(){
        return _player.getCurrentTime();
        console.log(_player.getCurrentTime());
    };
    
}
