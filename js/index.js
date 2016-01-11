$(function(){
	$('#resume').click(function(){
		alert('亲，若要联系本人，请发邮件');
	});
	$('.page1 h2,').css('-webkit-box-reflect','none');

	//page2页图的变化
	var timer=null;
	$('.page2 h2,').toggle(function(){
		$(this).parent().css('z-index',3);
		$(this).css('-webkit-box-reflect','none');
		
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
				clearInterval(tiemrH5);
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
				
				clearInterval(timer);
				timer=setInterval(noseam,30);
				clearInterval(tiemrH5);
				tiemrH5=setInterval(H5tab,3000);
				_this.css('-webkit-box-reflect','below 5px -webkit-linear-gradient(rgba(255,0,0,0) 10%,rgba(255,255,255,0.5))');
			}
		});	
	});
	
	//轮播图
	var pmd=$('.marquee ul');
	
	//pmd.get(0).innerHTML+=pmd.get(0).innerHTML;
	//pmd.html(pmd.html()+pmd.html());
	//以上两个都对 第一个是原生js 
	pmd.append(pmd.html());
	
	
	var now=0;
	var bFlag=true;	
	
	if(bFlag){
		timer=setInterval(noseam,30);
	}else{
		clearInterval(timer);
	}

	bFlag=false;

	function noseam(){
		now+=2;
		if(now>=(pmd.width()/2)){now=0};
		pmd.css('left',-now);
	}
	pmd.hover(function(){clearInterval(timer);},function(){timer=setInterval(noseam,30);});
	//page3页图的变化
	/*$('.page3 h2').toggle(function(){
		$(this).parent().css('z-index',2);
		$(this).css('-webkit-box-reflect','none');
		
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
				_this.css('-webkit-box-reflect','below 5px -webkit-linear-gradient(rgba(255,0,0,0) 10%,rgba(255,255,255,0.5))');
			}
		});	
	});*/
	//page4页图的变化
	$('.page4 h2').toggle(function(){
		$(this).parent().css('z-index',2);
		$(this).css('-webkit-box-reflect','none');
		
		$(this).parent().stop().animate({
			width:'100%',
			height:'100%'
		},{
			duration:500,
			complete:function(){
				clearInterval(timer);
				clearInterval(tiemrH5);
				$('.h5').show();
				$('#play').hide();
				$('.h5 .box').hover(function(){
					$(this).css('transform','perspective(800px) rotateY(-180deg)');
				},function(){
					$(this).css('transform','perspective(800px) rotateY(0deg)');
				});
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
				clearInterval(timer);
				timer=setInterval(noseam,30);
				clearInterval(tiemrH5);
				tiemrH5=setInterval(H5tab,3000);
				$('#play').show();
				$('.h5').hide();
				_this.css('-webkit-box-reflect','below 5px -webkit-linear-gradient(rgba(255,0,0,0) 10%,rgba(255,255,255,0.5))');
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

	var pg3=document.getElementById('page3');
    var str='Sorry ! 此分页正在更新中。您可以点击“前端实践”和“HTML5”两个分页，会有意外收获哦 ---建议用chrome浏览器打开 ^_^';

    for(var i=0; i<str.length; i++){
        var oSpan=document.createElement('span');
        oSpan.innerHTML=str.charAt(i);
        pg3.appendChild(oSpan);
    }
    var aSpan=pg3.children;

    var txtTimer=null;
    var txtI=0;
    txtTimer=setInterval(function(){
        aSpan[txtI].className='on';

        txtI++;
        if(txtI==aSpan.length){
            clearInterval(txtTimer);
        }
    },150);

  
	var aBtn=document.querySelectorAll('#play ol li');
	var oUl=document.querySelector('#play ul');
	var aLi=document.querySelectorAll('#play ul li');
	var Now=0;

	for(var i=0; i<aBtn.length; i++){
		aBtn[i].index=i;
		aBtn[i].onclick=function(){
			Now=this.index;
			H5t();
		};
	}
	var tiemrH5=setInterval(H5tab,3000);

	$('#play').hover(function(){
		 clearInterval(tiemrH5);
	},function(){
		clearInterval(tiemrH5);
		tiemrH5=setInterval(H5tab,3000);
	});

	function H5tab(){
		Now++;
		Now%=aBtn.length;
		
		H5t();
	};

	function H5t(){
		for(var i=0; i<aBtn.length; i++){
				aBtn[i].className='';
		}
		aBtn[Now].className='active';
		oUl.style.top=-aBtn[Now].index*aLi[0].offsetHeight+'px';
	};

});
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		