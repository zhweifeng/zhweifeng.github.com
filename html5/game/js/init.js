/**
 *  Author:strive
 *  Date: 2016/1/7
 */
window.onload=function(){
    var oC=document.getElementById('c1');

    var gd=oC.getContext('2d');

    var out=30; //出界范围
    var fishDirection=[-out,oC.width+out];
    var rule=0.02;

    loadImage(arrResource,function(){
        //炮
        var c=new Cannon(7);

        //存子弹
        var arrBullet=[];
        //存鱼
        var arrFish=[];
        //存金币
        var arrCoin=[];
        //存渔网
        var arrWeb=[];
        //存死鱼
        var arrDieFish=[];

        setInterval(function(){
            gd.clearRect(0,0,oC.width,oC.height);

            //出鱼规则
            if(Math.random()<rule){
                var f=new Fish(rnd(1,6));

                fishDirection.sort(function(){
                    return Math.random()-0.5;
                });

                if(fishDirection[0]<0){
                    f.rotate=rnd(-45,45);
                }else{
                    f.rotate=rnd(135,225);
                }
                f.x=fishDirection[0];
                f.y=rnd(100,oC.height-100);

                arrFish.push(f);
            }

            //画鱼
            for(var i=0; i<arrFish.length; i++){
                arrFish[i].draw(gd);
            }

            //画炮台
            gd.drawImage(
                JSON.bottom,
                0,0,765,70,
                0,532,765,70
            );

            //画子弹
            for(var i=0; i<arrBullet.length; i++){
                arrBullet[i].draw(gd);
            }
            //画金币
            for(var i=0; i<arrCoin.length; i++){
                arrCoin[i].draw(gd);
            }
            //画渔网
            for(var i=0; i<arrWeb.length; i++){
                arrWeb[i].scale+=0.03;
                arrWeb[i].draw(gd);

                if(arrWeb[i].scale>1.2){
                    arrWeb.splice(i,1);
                    i--;
                }
            }
            //画死鱼
            for(var i=0; i<arrDieFish.length; i++){
                arrDieFish[i].draw(gd);
            }


            //画炮
            c.draw(gd);


            //检测子弹和鱼碰到
            for(var i=0; i<arrFish.length; i++){
                for(var j=0; j<arrBullet.length; j++){
                    if(arrFish[i].isIn(arrBullet[j].x, arrBullet[j].y)){
                        var type=arrFish[i].type;
                        var x=arrFish[i].x;
                        var y=arrFish[i].y;
                        var rotate=arrFish[i].rotate;

                        //鱼死
                        arrFish.splice(i,1);
                        i--;

                        //子弹消失
                        arrBullet.splice(j,1);
                        j--;

                        //生成金币
                        var coin=new Coin(type);
                        coin.x=x;
                        coin.y=y;
                        arrCoin.push(coin);

                        //生成渔网
                        var web=new Web();
                        web.x=x;
                        web.y=y;
                        arrWeb.push(web);

                        //死鱼
                        var dieFish=new DieFish(type);
                        dieFish.x=x;
                        dieFish.y=y;
                        dieFish.rotate=rotate;
                        arrDieFish.push(dieFish);

                        //死鱼消失
                        setTimeout(function(){
                            //for(var i=0; i<arrDieFish.length; i++){
                            arrDieFish.splice(0,1);
                            //i--;
                            //}
                        },500)
                    }
                }
            }

            //子弹出界，删除
            for(var i=0; i<arrBullet.length; i++){
                if(arrBullet[i].x<-out || arrBullet[i].x>oC.width+out || arrBullet[i].y<-out || arrBullet[i].y>oC.height+out){
                    arrBullet.splice(i,1);
                    i--;
                }
            }
            //判断鱼出界、删除
            for(var i=0; i<arrFish.length; i++){
                if(arrFish[i].x<-out || arrFish[i].x>oC.width+out || arrFish[i].y<-out || arrFish[i].y>oC.height+out){
                    arrFish.splice(i,1);
                    i--;
                }
            }
        },16);

        //点击调整炮角度
		oC.onmousemove=function(ev){
			var a=c.x-(ev.clientX-oC.offsetLeft);
			var b=c.y-(ev.clientY-oC.offsetTop);

			var d=a2d(Math.atan2(b,a))-90;

			c.rotate=d;
			
			
			oC.onclick=function(ev){
				//开炮
	
				
				c.emitChange();
				//出子弹
				var bullet=new Bullet(c.type);
				bullet.x= c.x;
				bullet.y= c.y;
				bullet.rotate= c.rotate;
	
				arrBullet.push(bullet);
			};
		};
        

    });
};