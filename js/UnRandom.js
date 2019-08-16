// JavaScript Document
UnRandom = function(pNum){
	pNum = pNum || false;
	if(!pNum){console.log("請輸入亂數長度"); return false;}
	var _ranNum = pNum;
	var _rndArr = [];
	
	function setRndArr()
	{
		for(var setNum = 0; setNum < _ranNum; setNum++){
			_rndArr.push(setNum);
		}
	}
	
	this.getRandomNum = function(){
		if(_rndArr.length <= 0){
			setRndArr();
		}
		
		var rndNum = parseInt(Math.random() * _rndArr.length);
		var nowNum = _rndArr[rndNum];
		_rndArr.splice(rndNum,1);
		return nowNum;
	}
	
	this.addNum = function(pNum){
		_rndArr.push(pNum);
		_ranNum++;
	}
	
}