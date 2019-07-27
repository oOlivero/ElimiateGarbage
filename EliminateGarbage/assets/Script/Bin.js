var Camera = require("Camera");
var GameData = require("GameData");
cc.Class({
    extends: cc.Component,

    properties: {
        mCamera : {
            default : null,
            type : cc.Camera
        },
        mAudio : {
            default : null,
            type : cc.AudioSource
        },
        mAudioFaild : {
            default : null,
            type : cc.AudioSource
        },
        mType : {
            default : 0,
            visible : true
        },
    },

    start () {

    },

    onCollisionEnter: function (other , self) {
        if (GameData.instance.scoreControl == 1) {
            if(this.mType == other.node.getComponent("Garbage").mType){
                this.mAudio.play();
                GameData.instance.score = GameData.instance.score + 1;
            }
            else {
                this.mAudioFaild.play();
                var camera = this.mCamera.getComponent("Camera");
                camera.EndGame();
            }
        }
        other.node.destroy();
    },

});
