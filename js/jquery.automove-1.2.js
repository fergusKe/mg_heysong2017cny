// JavaScript Document
/*
參數:
    ani         #single (單一) auto(子元素依序播放)
    timer       #播放時間
    delay       #延遲時間
    disDelay    #子元素延遲(僅限用於ani為auto)
    alpha       #透明度
    top         #上下移動
    bottom      #同top
    left        #左右移動
    right       #同left
    scale       #等比例縮放
    scaleX      #左右縮放
    scaleY      #上下縮放
    rotation    #2d旋轉
    rotationX   #上下旋轉
    rotationY   #左右旋轉
    rotationZ   #等同2d旋轉
    ease        #移動曲線

*/

(function(){
    function AutoMoveJQ(element, obj){
        var defaultSetting = {
            paused          :false,
            playComplete    :false,//播放結束
            reverseComplete :false //回撥結束
        };

        var isIE8 = (navigator.userAgent.search("MSIE 7") > -1 || navigator.userAgent.search("MSIE 8") > -1 || navigator.userAgent.search("MSIE 6") > -1);
        var _moveArr = [],
            _settings = $.extend(defaultSetting, obj),
            _tl = new TimelineLite({paused:_settings.paused});

        function init(){
            checkElement(element);
            if(_moveArr.length == 0){
                element.find('[automove]').each(function(){
                    checkElement($(this));
                });
            }
            // console.log('_moveArr = ', _moveArr);
            _tl.add(_moveArr);
            _tl.eventCallback("onReverseComplete", reversComplete);
            _tl.eventCallback("onComplete", playComplete);
        };

        function checkElement(pEle){
            var aniObj = strTsObj(pEle.attr('automove'));
            if(aniObj.ani == "single"){
                singleAni(pEle, aniObj);
            }else if(aniObj.ani == "auto"){
                autoAni(pEle, aniObj);
            }
        };

        function playComplete(){
            if(isFun(_settings.playComplete)){
                _settings.playComplete();
            }
        }

        function reversComplete(){
            if(isFun(_settings.reverseComplete)){
                _settings.reverseComplete();
            }
        }

        init();

        function singleAni(element, pObj){
          console.log('element = ', element);
          console.log('pObj = ', pObj);
            var timerNum = 1;
            var strObj = {alpha:0};
            var endObj = {alpha:1, ease:Linear.easeNone};
            endObj.onStart = eleShow;
            endObj.onStartParams  = [element];
            // endObj.onReverseComplete = eleHide;
            // endObj.onReverseCompleteParams  = [element];
            if(pObj.timer){
                timerNum = parseFloat(pObj.timer);
            }

            if(pObj.delay){
                endObj.delay = parseFloat(pObj.delay);
            }

            if(!isIE8){
                /*if(pObj.top){
                    endObj.top = getPosition('top');
                    strObj.top = endObj.top + parseInt(pObj.top, 10);
                }

                if(pObj.bottom){
                    endObj.bottom = getPosition('bottom');
                    strObj.bottom = endObj.bottom + parseInt(pObj.bottom, 10);
                }

                if(pObj.left){
                    endObj.left = getPosition('left');
                    strObj.left = endObj.left + parseInt(pObj.left, 10);

                }

                if(pObj.right){
                    endObj.right = getPosition('right');
                    strObj.right = endObj.right + parseInt(pObj.right, 10);

                }*/

                checkAttributeByPosition('top');
                checkAttributeByPosition('bottom');
                checkAttributeByPosition('left');
                checkAttributeByPosition('right');
                checkAttributeByPosition('marginTop');
                checkAttributeByPosition('marginBottom');
                checkAttributeByPosition('marginLeft');
                checkAttributeByPosition('marginRight');
                checkAttributeByPosition('paddingTop');
                checkAttributeByPosition('paddingBottom');
                checkAttributeByPosition('paddingLeft');
                checkAttributeByPosition('paddingRight');


                checkAttribute('alpha', 'endAlpha', 1);
                checkAttribute('width', 'endWidth', 0);
                checkAttribute('height', 'endHeight', 0);
                checkAttribute('scale', 'endScale', 1);
                checkAttribute('scaleX', 'endScaleX', 1);
                checkAttribute('scaleY', 'endScaleY', 1);
                checkAttribute('rotation', 'endRotation', 0);
                checkAttribute('rotationX', 'endRotationX', 0);
                checkAttribute('rotationY', 'endRotationY', 0);
                checkAttribute('rotationZ', 'endRotationZ', 0);

            }

            //檢查屬性
            function checkAttribute(pStr, pEndStr, pStrNum){
                if(pObj[pStr]){
                    var endNum = pStrNum;
                    if(pObj[pEndStr]) endNum =parseFloat(pObj[pEndStr]);
                    endObj[pStr] = endNum;
                    strObj[pStr] = parseFloat(pObj[pStr]);
                }
            };

            function checkAttributeByPosition(pStr){
                if(pObj[pStr]){
                    endObj[pStr]= getPosition(pStr);
                    strObj[pStr] = endObj[pStr] + parseInt(pObj[pStr], 10);
                }
            };

            //取得位置
            function getPosition(pStr){
                var positionNum = element.css(pStr);
                positionNum = parseInt(positionNum, 10);
                if(isNaN(positionNum)){
                    positionNum = 0;
                }
                return positionNum;
            };

            if(pObj.ease){
                endObj.ease = pObj.ease;
            }
            eleHide(element);
            console.log('endObj = ', endObj);
            console.log('strObj = ', strObj);
            _moveArr.push(TweenMax.fromTo(element, timerNum, strObj, endObj));

        };

        function autoAni(element, pObj){
            var timerNum = 1;
            var delayNum = 0;
            var disDelayNum = 0.2;
            if(pObj.timer != undefined){
                timerNum = parseFloat(pObj.timer);
            }

            if(pObj.delay != undefined){
                delayNum = parseFloat(pObj.delay);
                pObj.delay = undefined;
            }

            if(pObj.disDelay != undefined){
                disDelayNum = parseFloat(pObj.disDelay);
                pObj.disDelay = undefined;
            }

            element.children().each(function(i){
                var autoObj = {};
                $.extend(autoObj, pObj, strTsObj($(this).attr('automove')));
                if(autoObj.delay == undefined){
                    autoObj.delay = delayNum + disDelayNum * i;
                }
                singleAni($(this), autoObj);
            });
        };

        function strTsObj(pStr){
            var tmpObj = {};
            if(pStr == undefined){
                return tmpObj
            }
            var tmpArr = pStr.replace(/\s/g, '');
            tmpArr = tmpArr.split(';');
            $(tmpArr).each(function(){
                var attributeArr = this.split(':');
                if(attributeArr[0] != ""){
                    tmpObj[attributeArr[0]] = attributeArr[1];
                }

            });
            return tmpObj;
        };

        function isFun(pObj){
            return (pObj && typeof pObj === "function")
        }

        function setTimeScale(pNum){
            pNum = parseFloat(pNum);
            if(isNaN(pNum)) pNum = 1;
            _tl.timeScale(pNum);
        }

        function eleHide(pEle){
            pEle.css('visibility','hidden');
        }

        function eleShow(pEle){
            pEle.css('visibility','');
        }

        //public
        this.reverse = function(pNum){
            setTimeScale(pNum);
            _tl.reverse();
        };

        this.play = function(pNum){
            setTimeScale(pNum);
            _tl.play();
        };

        this.pause = function(){
            _tl.pause();
        };

        this.restart = function(){
            _tl.restart();
        };

    };


    $.fn.automove = function(options){

        return this.each(function(){
            $( this ).data('automove', new AutoMoveJQ( $( this ), options) );
        });
    };

    //回撥
    $.fn.automove_reverse = function(pNum){
        return this.each(function(){
            $( this ).data( 'automove' ).reverse(pNum);
        });
        //return $( this ).data( 'automove' ).reverse();
    };

    //撥放
    $.fn.automove_play = function(pNum){
        return this.each(function(){
            $( this ).data( 'automove' ).play(pNum);
        });
        //return $( this ).data( 'automove' ).play();
    };

    //暫停
    $.fn.automove_pause = function(){
        return this.each(function(){
            $( this ).data( 'automove' ).pause();
        });
    };

    //重新播放
    $.fn.automove_restart = function(){
        return this.each(function(){
            $( this ).data( 'automove' ).restart();
        });
    };

})(jQuery)
