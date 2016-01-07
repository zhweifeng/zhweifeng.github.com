window.onload=function(){
	//nav  导航效果
	var oUl=document.getElementById('ul1');
    var aLi=oUl.children;
    var oBox=aLi[aLi.length-1];

    var iNow=0;

    for(var i=0; i<aLi.length-1; i++){
        aLi[i].index=i;
        aLi[i].onmouseover=function(){
            //oBox.style.left=this.offsetLeft+'px';
            this.style.cursor='pointer';
            startMove(oBox,this.offsetLeft);
        };
        aLi[i].onmouseout=function(){
            startMove(oBox,iNow*aLi[0].offsetWidth);
        };

        aLi[i].onclick=function(){
            iNow=this.index;
        };
    }


    ;(function(global){
	    var iSpeed=0;
	    var left=0;
	    var timer=null;

	    global.startMove=function(obj,iTarget){
	        clearInterval(timer);
	        timer=setInterval(function(){
	            iSpeed+=(iTarget-left)/5;
	            iSpeed*=0.7;

	            left+=iSpeed;
	            obj.style.left=left+'px';

	            if(Math.round(iSpeed)==0 && Math.round(left)==iTarget){
	                clearInterval(timer);
	            }
	        },30);
	    }
	})(window);

	//漂浮的广告
	var oDiv=document.getElementById('div1');

    var iSpeedX=3;
    var iSpeedY=5;
    setInterval(function(){
        var l=oDiv.offsetLeft+iSpeedX;
        var t=oDiv.offsetTop+iSpeedY;

        if(t>=document.documentElement.clientHeight-oDiv.offsetHeight){
            t=document.documentElement.clientHeight-oDiv.offsetHeight;
            iSpeedY*=-1;
        }
        if(t<=0){
            t=0;
            iSpeedY*=-1;
        }
        if(l>=document.documentElement.clientWidth-oDiv.offsetWidth){
            l=document.documentElement.clientWidth-oDiv.offsetWidth;
            iSpeedX*=-1;

        }
        if(l<=0){
            l=0;
            iSpeedX*=-1;
        }

        oDiv.style.left=l+'px';
        oDiv.style.top=t+'px';


    },30);

    //碰撞的快
    (function(){
    	var oBall=document.getElementById('ball');

	    var iSpeedX=3;
	    var iSpeedY=6;

	    var lastX=0;
	    var lastY=0;

	    var timer=null;

	    duangMove();

	    oBall.onmousedown=function(ev){
	        var oEvent=ev || event;
	        var disX=oEvent.clientX-oBall.offsetLeft;
	        var disY=oEvent.clientY-oBall.offsetTop;

	        clearInterval(timer);

	        document.onmousemove=function(ev){
	            var oEvent=ev || event;
	            oBall.style.left=oEvent.clientX-disX+'px';
	            oBall.style.top=oEvent.clientY-disY+'px';

	            //计算速度
	            iSpeedX=oEvent.clientX-lastX;
	            iSpeedY=oEvent.clientY-lastY;

	            lastX=oEvent.clientX;
	            lastY=oEvent.clientY;
	        };

	        document.onmouseup=function(){
	            document.onmousemove=null;
	            document.onmouseup=null;

	            duangMove();
	        };
	        return false;
	    };

	    function duangMove(){
	        timer=setInterval(function(){
	            iSpeedY+=3;

	            var l=oBall.offsetLeft+iSpeedX;
	            var t=oBall.offsetTop+iSpeedY;

	            if(t>=document.documentElement.clientHeight-oBall.offsetHeight){
	                t=document.documentElement.clientHeight-oBall.offsetHeight;
	                iSpeedY*=-0.8;
	                iSpeedX*=0.8;
	            }
	            if(t<=0){
	                t=0;
	                iSpeedY*=-0.8;
	                iSpeedX*=0.8;
	            }
	            if(l>=document.documentElement.clientWidth-oBall.offsetWidth){
	                l=document.documentElement.clientWidth-oBall.offsetWidth;
	                iSpeedX*=-0.8;
	                iSpeedY*=0.8;
	            }
	            if(l<=0){
	                l=0;
	                iSpeedX*=-0.8;
	                iSpeedY*=0.8;
	            }

	            oBall.style.left=l+'px';
	            oBall.style.top=t+'px';

	            if(Math.abs(iSpeedX)<1)iSpeedX=0;
	            if(Math.abs(iSpeedY)<1)iSpeedY=0;

	            if(iSpeedX==0 && iSpeedY==0 && t==document.documentElement.clientHeight-oBall.offsetHeight){
	                clearInterval(timer);
	            }
	        },30);
	    }
    })();
};