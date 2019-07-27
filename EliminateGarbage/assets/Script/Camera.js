// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var GameData = require("GameData");
var EndUI = require("EndUI");

cc.Class({
    extends: cc.Component,

    properties: {
        RegainSpeed : 320,
        isEnd : {
            default : false,
            visible : false
        },
        mEndUI : cc.Node,
        mController : cc.Node,
        mBin : cc.Node,
        mBack :cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        //this.StartLine();
    },

    StartGame () {
        GameData.instance.scoreControl = 1;
        //this.node.runAction(cc.moveBy(1,cc.p(0,-500)));
        this.mBin.runAction(cc.moveBy(1,cc.p(0, 500)));
        this.mBack.runAction(cc.moveBy(1,cc.p(0, 500)));
        this.isEnd = false;
    },

    EndGame () {//结束游戏

        let self = this;
        if (this.isEnd)
            return;
        var duration = Math.abs(this.mBin.y) / this.RegainSpeed;
        this.mBin.runAction(cc.spawn(
            cc.moveTo(duration, cc.v2(0,0)).easing(cc.easeSineIn()),
            cc.callFunc(function (){
                //显示结束界面
                var ui = self.mEndUI.getComponent("EndUI");
 				self.mBack.runAction(cc.moveBy(1,cc.p(0, -500)));
                ui.Show();
            })
        ));//上升通过easing来优化效果
        GameData.instance.scoreControl = 0;
        this.isEnd = true;
    },

    EnableTouch () {
        var controller = this.mController.getComponent("Controller");
        controller.EnableTouch();
    },

    DisableTouch () {
        var controller = this.mController.getComponent("Controller");
        controller.DisableTouch();
    }

    // update (dt) {},
});
