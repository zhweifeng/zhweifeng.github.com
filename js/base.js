	//用class名字来获取元素，兼容所有，系统的不兼容IE8及以下   开始
		function getByClass(oParent,sClass){
			if(oParent.getElementsByClassName){
				return oParent.getElementsByClassName(sClass);
			}else{
				var arr=[];
				//var reg=/\bsClass\b/;
				var reg=new RegExp('\\b'+sClass+'\\b');
				var aEle=oParent.getElementsByTagName('*');
				for(var i=0; i<aEle.length; i++){
					if(reg.test(aEle[i].className)){
						arr.push(aEle[i]);
					}
				}
				return arr;
			}
		}
		//有这个class
		function hasClass(obj,sClass){
			var reg=new RegExp('\\b'+sClass+'\\b');
			return reg.test(obj.className);
		}
		//添加class
		function addClass(obj,sClass){
			if(obj.className){
				if(!hasClass(obj,sClass)){
					obj.className+=' '+sClass;
				}
			}else{
				obj.className=sClass;
			}
		}
		//删除class
		function removeClass(obj,sClass){
			var reg=new RegExp('\\b'+sClass+'\\b','g');
			if(hasClass(obj,sClass)){
				obj.className=obj.className.replace(reg,'').replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');
			}
		}		
		//切换class名字
		function toggleClass(obj,sClass){
			if(hasClass(obj,sClass)){
				removeClass(obj,sClass);
			}else{
				addClass(obj,sClass);
			}
		}
		//在m-n这个范围内的随机数
		function rnd(n, m)
		{
			return Math.floor(Math.random()*(m-n)+n);
		}
	  
		//判断一个字符串是否在arr这个数组内  开始
		function findInArr(arr, n)
		{
			for (var i=0; i<arr.length; i++)
			{
				if (arr[i] == n)
				{
					return true;
				}
			}
			
			return false;
		}
	
	//判断一个字符串是否在arr这个数组内  结束  
	//给数字前补零，来填充位数   开始

		function toDub(n)
		{
			return n<10 ? '0'+n : ''+n;
		}

	//事件的绑定
	function addEvent(obj, sEv, fn)
	{
		if (obj.addEventListener)
		{
			obj.addEventListener(sEv, fn, false); // 高级浏览器
		}
		else
		{
			obj.attachEvent('on'+sEv, fn);  // 低级浏览器
		}
	}

	//事件的解除
	function removeEvent(obj, sEv, fnName)
	{
		if (obj.removeEventListener)
		{
			obj.removeEventListener(sEv, fnName, false);
		}
		else
		{
			obj.detachEvent('on'+sEv, fnName);
		}
	}

	//拖拽封装函数
	function drag(obj)
	{
		addEvent(obj, 'mousedown', function (ev){
			var oEvent=ev || event;
			var disX=oEvent.clientX-obj.offsetLeft;
			var disY=oEvent.clientY-obj.offsetTop;
			
			addEvent(document, 'mousemove', move);
			addEvent(document, 'mouseup', up);
			
			function move(ev)
			{
				var oEvent=ev || event;
				
				obj.style.left=oEvent.clientX-disX+'px';
				obj.style.top=oEvent.clientY-disY+'px';
			}
			
			function up()
			{
				removeEvent(document, 'mousemove', move);
				removeEvent(document, 'mouseup', up);
				
				obj.releaseCapture && obj.releaseCapture();
			}
			
			obj.setCapture && obj.setCapture();
			
			oEvent.preventDefault && oEvent.preventDefault();
			return false;
		});
	}

	//相当于window.onload   和jquery  里边的$ 符一样
	/*function $(fn){
		if(document.addEventListener){
			document.addEventListener('DOMContentLoaded',fn,false);
		}
		else{
			document.onreadystatechange=function(){
				if(document.readyState == 'complete'){
					fn();
				}
			};
		}
	}*/
	
	
	
	

	//  获取非行间样式，  oDiv   'width'
	function getStyle(obj,sName){
		return (obj.currentStyle ||  getComputedStyle(obj, false))[sName];
	}

	
	//滚轮
	/*addWheel(document, function (down){ // 回调函数
		// down true下 false上
		if (down)
		{
			// 下
			oDiv.style.height=oDiv.offsetHeight+10+'px';
		}
		else
		{
			// 上
			oDiv.style.height=oDiv.offsetHeight-10+'px';
		}
	});*/
	
	
	function addWheel(obj, fn)
	{
		// 加事件
		if (window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1)
		{
			// FF
			obj.addEventListener('DOMMouseScroll', function (ev){
				if (ev.detail > 0)
				{
					// 下
					fn(true);
				}
				else
				{
					fn(false);
				}
				
			}, false);
		}
		else
		{
			obj.onmousewheel=function (){
				if (event.wheelDelta > 0)
				{
					// 上
					fn(false);
				}
				else
				{
					fn(true);
				}
			};
		}
	}
	
	function getStyle(obj, sName)
	{
		return (obj.currentStyle || getComputedStyle(obj, false))[sName];
	}
	
	//move函数
	function move(obj, json, options)
	{
		options=options || {};
		var duration=options.duration || 500;
		var easing=options.easing || Tween.Linear;
		
		var start={};
		var dis={};
		for (var name in json)
		{
			start[name]=parseFloat(getStyle(obj, name));
			
			if(isNaN(start[name])){//css的style 没给样式的时候需要这个判断
				switch(name){
					case 'left':
						start[name]=obj.offsetLeft;
						break;
					case 'top':
						start[name]=obj.offsetTop;
						break;
					case 'width':
						start[name]=obj.offsetWidth;
						break;
					case 'height':
						start[name]=obj.offsetHeight;
						break;
					case 'opacity':
						start[name]=1;
						break;
					//borderWidth fontSize paddingLeft marginLeft
					//.....
				}	
			}
			dis[name]=json[name]-start[name];
		}
		var count=Math.floor(duration/30);
		var n=0;
		
		clearInterval(obj.timer);
		obj.timer=setInterval(function (){
			n++;
			
			// 更改样式
			for (var name in json)
			{
				var cur=easing(duration*n/count, start[name], dis[name], duration);
				
				if (name == 'opacity')
				{
					obj.style[name]=cur;
				}
				else
				{
					obj.style[name]=cur+'px';
				}
			}
			
			if (n == count)
			{
				clearInterval(obj.timer);
				options.complete && options.complete(); 
			}
		}, 30);
	}
	
	//版权 ©, 保留所有权利
	//t  当前时间
	//b  初始值
	//c  总距离
	//d  总时间
	//var cur=fx(t,b,c,d)
	var Tween = {
		Linear: function(t,b,c,d){ return c*t/d + b; },
		Quad: {
			easeIn: function(t,b,c,d){
				return c*(t/=d)*t + b;
			},
			easeOut: function(t,b,c,d){
				return -c *(t/=d)*(t-2) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return c/2*t*t + b;
				return -c/2 * ((--t)*(t-2) - 1) + b;
			}
		},
		Cubic: {
			easeIn: function(t,b,c,d){
				return c*(t/=d)*t*t + b;
			},
			easeOut: function(t,b,c,d){
				return c*((t=t/d-1)*t*t + 1) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return c/2*t*t*t + b;
				return c/2*((t-=2)*t*t + 2) + b;
			}
		},
		Quart: {
			easeIn: function(t,b,c,d){
				return c*(t/=d)*t*t*t + b;
			},
			easeOut: function(t,b,c,d){
				return -c * ((t=t/d-1)*t*t*t - 1) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
				return -c/2 * ((t-=2)*t*t*t - 2) + b;
			}
		},
		Quint: {
			easeIn: function(t,b,c,d){
				return c*(t/=d)*t*t*t*t + b;
			},
			easeOut: function(t,b,c,d){
				return c*((t=t/d-1)*t*t*t*t + 1) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
				return c/2*((t-=2)*t*t*t*t + 2) + b;
			}
		},
		Sine: {
			easeIn: function(t,b,c,d){
				return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
			},
			easeOut: function(t,b,c,d){
				return c * Math.sin(t/d * (Math.PI/2)) + b;
			},
			easeInOut: function(t,b,c,d){
				return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
			}
		},
		Expo: {
			easeIn: function(t,b,c,d){
				return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
			},
			easeOut: function(t,b,c,d){
				return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
			},
			easeInOut: function(t,b,c,d){
				if (t==0) return b;
				if (t==d) return b+c;
				if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
				return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
			}
		},
		Circ: {   // 周围的
			easeIn: function(t,b,c,d){
				return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
			},
			easeOut: function(t,b,c,d){
				return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
				return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
			}
		},
		Elastic: {     //弹性
			easeIn: function(t,b,c,d,a,p){
				if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
				if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
				else var s = p/(2*Math.PI) * Math.asin (c/a);
				return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			},
			easeOut: function(t,b,c,d,a,p){
				if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
				if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
				else var s = p/(2*Math.PI) * Math.asin (c/a);
				return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
			},
			easeInOut: function(t,b,c,d,a,p){
				if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
				if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
				else var s = p/(2*Math.PI) * Math.asin (c/a);
				if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
				return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
			}
		},
		Back: { //回来 
			easeIn: function(t,b,c,d,s){
				if (s == undefined) s = 1.70158;
				return c*(t/=d)*t*((s+1)*t - s) + b;
			},
			easeOut: function(t,b,c,d,s){
				if (s == undefined) s = 1.70158;
				return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
			},
			easeInOut: function(t,b,c,d,s){
				if (s == undefined) s = 1.70158; 
				if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
				return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
			}
		},
		Bounce: {   //反弹
			easeIn: function(t,b,c,d){
				return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
			},
			easeOut: function(t,b,c,d){
				if ((t/=d) < (1/2.75)) {
					return c*(7.5625*t*t) + b;
				} else if (t < (2/2.75)) {
					return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
				} else if (t < (2.5/2.75)) {
					return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
				} else {
					return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
				}
			},
			easeInOut: function(t,b,c,d){
				if (t < d/2) return Tween.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
				else return Tween.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
			}
		}
	}

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
