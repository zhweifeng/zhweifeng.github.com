$(function(){
	//page2页图的变化
	$('.page2 h2,').toggle(function(){
		$(this).parent().css('z-index',2);
		var _this=$(this);
		
		$(this).parent().stop().animate({
			width:'100%',
			height:'100%'
		},{
			duration:500,
			complete:function(){
				$('.marquee').hide();
				$('.thumb').show();
				clearInterval(timer);
			}
		});
	},function(){
		var _this=$(this);		
		$(this).parent().stop().animate({
			width:'50%',
			height:'50%'
		},{
			duration:500,
			complete:function(){
				_this.parent().css('z-index',0);
				$('.marquee').show();
				$('.thumb').hide();
				timer=setInterval(noseam,30);
			}
		});	
	});
	
	//跑马灯
	var pmd=$('.marquee ul');
	
	//pmd.get(0).innerHTML+=pmd.get(0).innerHTML;
	//pmd.html(pmd.html()+pmd.html());
	//以上两个都对 第一个是原生js 
	pmd.append(pmd.html());
	
	var timer=null;
	var now=0;
	var bFlag=true;	
	
	if(bFlag){timer=setInterval(noseam,30);}

	bFlag=false;

	function noseam(){
		now+=2;
		if(now>=(pmd.width()/2)){now=0};
		pmd.css('left',-now);
	}
	
	pmd.mouseover(function(){
		clearInterval(timer);
	});
	pmd.mouseout(function(){
		timer=setInterval(noseam,30);
	});
	//page3，page4页图的变化
	$('.page3 h2,.page4 h2').toggle(function(){
		$(this).parent().css('z-index',2);
		
		$(this).parent().stop().animate({
			width:'100%',
			height:'100%'
		},{
			duration:500,
			complete:function(){
				clearInterval(timer);
			}
		});
	},function(){
		var _this=$(this);		
		$(this).parent().stop().animate({
			width:'50%',
			height:'50%'
		},{
			duration:500,
			complete:function(){
				_this.parent().css('z-index',0);
				timer=setInterval(noseam,30);
			}
		});	
	});
	
	/*  拉勾网  thumb(拇指)  效果 */

	$('#thumb li').mouseenter(function(ev){
		var index=$(this).index();
		var n=getN($('#thumb li'),ev,index);
		var oSpan=$('#thumb li a');
		
		switch (n)
		{
			case 0: // right
				
				oSpan.eq(index).css({left:200,top:0})
				break;
				
			case 1: // bottom
				
				oSpan.eq(index).css({left:0,top:200})
				break;
			
			case 2: // left
				
				oSpan.eq(index).css({left:-200,top:0})
				break;
				
			case 3: // top
				
				oSpan.eq(index).css({left:0,top:-200})
				
				break;
		}
		
		oSpan.eq(index).stop().animate({top:0, left:0});
	});

	$('#thumb li').mouseleave(function(ev){
		var index=$(this).index();
		var n=getN($('#thumb li'),ev,index);
		var oSpan=$('#thumb li a');
		
		switch (n)
		{
			case 0: // right
				
				oSpan.eq(index).stop().animate({top:0, left:200});
				break;
				
			case 1: // bottom
				
				oSpan.eq(index).stop().animate({top:200, left:0});
				break;
			
			case 2: // left
				
				oSpan.eq(index).stop().animate({top:0, left:-200});
				break;
				
			case 3: // top
				
				oSpan.eq(index).stop().animate({top:-200, left:0});
				break;
		}
	});

	function getN(obj,ev,index)
	{	
		//alert(index)
		var x=obj.eq(index).offset().left+obj.eq(index).width()/2-ev.clientX;
		var y=obj.eq(index).offset().top+obj.eq(index).height()/2-ev.clientY;
		
		var n=Math.round((d2a(Math.atan2(y, x))+180)/90)%4;
		return n;
	}
	//弧度转角度
	function d2a(d)
	{
		return d*180/Math.PI;
	}
});
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		