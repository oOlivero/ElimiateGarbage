// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        mSpeed : {
            default : 1,
            type : cc.Float,
            tooltip : "垃圾的速度,默认正常速度为1，最小值为0.1，最大值为10",
            min : 0.1
        },
        mType : {
            default : 0,
            visible : false
        }
    },

    onCollisionEnter: function (other , self) {
        //self.node.color = cc.Color.RED;
        //self.destory();
    },

    start () {
        let x = this.node.x;
        let duration = 5 - (this.node.x + 320) / 640 * 5;
        let action = cc.speed(cc.repeatForever(cc.moveBy(1,cc.p(0,-100))), this.mSpeed);
        this.node.runAction(action);//重复运动
    },

    // update (dt) {},
});
