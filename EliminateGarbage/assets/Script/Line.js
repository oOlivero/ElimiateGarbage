// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var Camera = require("Camera");
var GameData = require("GameData");
cc.Class({
    extends: cc.Component,

    properties: {
        mCamera : {
            default : null,
            type : cc.Camera
        }

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    onCollisionEnter: function (other , self) {
        self.node.color = cc.Color.RED;
        GameData.instance.score = GameData.instance.score + 375;
        var camera = this.mCamera.getComponent("Camera");
        camera.EndGame();
    }

});
