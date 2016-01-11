/**
 *  Author:strive
 *  Date: 2016/1/7
 */
var JSON={}; //存图片对象

function d2a(n){
    return n*Math.PI/180;
}
function a2d(n){
    return n*180/Math.PI;
}
function rnd(n,m){
    return parseInt(Math.random()*(m-n)+n);
}

function loadImage(arr,fnSucc,fnLoading){
    var count=0;
    for(var i=0; i<arr.length; i++){
        (function(index){
            var oImg=new Image();

            oImg.onload=function(){
                JSON[arr[index]]=this;

                count++;
                if(count==arr.length){
                    fnSucc && fnSucc();
                }

                //loading
                fnLoading && fnLoading(count,arr.length);
            };
            oImg.src='img/'+arr[i]+'.png';
        })(i);
    }
}
