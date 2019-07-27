// AudioSourceControl.js
cc.Class({
    extends: cc.Component,

    properties: {
        audioSource: {
            type: cc.AudioSource,
            default: null
        },
        mMusic : {
            default : null,
            type : cc.Sprite
        },
        mType :
        {
            default :0
        },
    },

    play: function () {
        this.audioSource.play();
    },

    pause: function () {
        this.audioSource.pause();
    },

    change(){
        var music = this.mMusic;
        if(this.mType == 0){
            cc.loader.loadRes("UI/Game/MusicClose",cc.SpriteFrame,function(err,spriteFrame){
                    if (!err)
                        music.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });//更换图片外观
            this.mType = 1;
            this.audioSource.pause();
        }
        else{
            cc.loader.loadRes("UI/Game/MusicOpen",cc.SpriteFrame,function(err,spriteFrame){
                    if (!err)
                        music.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });//更换图片外观
            this.mType = 0;
            this.audioSource.play();
        }
    },

});