/**
 *  Author:strive
 *  Date: 2016/1/7
 */
//炮
var CANNON_SIZE=[
    null,
    {w: 74, h: 74},
    {w: 74, h: 76},
    {w: 74, h: 76},
    {w: 74, h: 83},
    {w: 74, h: 85},
    {w: 74, h: 90},
    {w: 74, h: 94}
];
function Cannon(type){
    this.x=0 || 431;
    this.y=0 || 570;
    this.type=type;
    this.rotate=0;

    this.cur=0;
}
Cannon.prototype.draw=function(gd){
    var w=CANNON_SIZE[this.type].w;
    var h=CANNON_SIZE[this.type].h;

    gd.save();

    gd.translate(this.x,this.y);

    gd.rotate(d2a(this.rotate));

    gd.drawImage(
        JSON['cannon'+this.type],
        0,this.cur*h,w,h,
        -w/2,-h/2,w,h
    );

    gd.restore();
};
Cannon.prototype.emitChange=function(){
    var _this=this;

    var timer=setInterval(function(){
        _this.cur++;
        if(_this.cur==5){
            _this.cur=0;
            clearInterval(timer);
        }
    },100);
};
