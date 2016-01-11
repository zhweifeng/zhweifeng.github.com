/**
 *  Author:strive
 *  Date: 2016/1/7
 */
function Web(){
    this.x=0;
    this.y=0;
    this.scale=0.5;
}
Web.prototype.draw=function(gd){
    gd.save();

    gd.translate(this.x,this.y);
    gd.scale(this.scale,this.scale);
    gd.drawImage(
        JSON.web,
        15,414,107,107,
        -107/2,-107/2,107,107
    );

    gd.restore();
};
