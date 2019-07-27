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

cc.Class({
    extends: cc.Component,

    properties: {
        mPrefab : {
            default : null,
            type : cc.Prefab
        },
        mGarbagePool : {
            default : null,
            type : cc.Node
        },
        mCamera : {
            default : null,
            type : cc.Node
        },
        mDepth : {
            default : 0,
            type : cc.Float,
            visible : false
        },
		mRate : {
            default : 0.05,
            type : cc.Float,
            tooltip : "垃圾的频率,默认正常频率为0.1，最小值为0.001，最大值为1",
            min: 0.001,
            max: 1
        },    
        mSceneData : {
            default : null,
            type : cc.JsonAsset
        },
        mHard : {
        	default : 0,
            type : cc.Float,
            visible : false
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var manager = cc.director.getCollisionManager();//获取碰撞检测系统
        manager.enabled = true;//默认碰撞检测系统是禁用的，需要手动开启碰撞检测系统
        //manager.enabledDebugDraw = true;//开启后可在debug中显示碰撞区域
    },

    reset () {
        GameData.instance.time = new Date().getTime;
        GameData.instance.score = 0;
        this.mGarbagePool.removeAllChildren(true);//清除垃圾池中的所有垃圾
        cc.director.getCollisionManager().enabled = true;//开启碰撞系统
        this.mHard = 0;
    },

    start () {

    },

    update (dt) {
        var date = new Date();
        var index = date.getTime();
        let data = this.mSceneData.json[index%20];
        //if (data != undefined && index-GameData.instance.time>3000)
        if (data != undefined && (this.mRate >= Math.random()||index-GameData.instance.time>3000))//按指定概率生成垃圾
        {
            var garbage = cc.instantiate(this.mPrefab);

            cc.loader.loadRes(data.res,cc.SpriteFrame,function(err,spriteFrame){
                if (!err)
                    garbage.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });//更换图片外观
            garbage.getComponent("Garbage").mSpeed = data.speed +this.mHard;
            garbage.getComponent("Garbage").mType = index%4;//赋值垃圾种类0123可有干湿
            garbage.x = Math.random() * 500 - 250;//随机X轴坐标
            garbage.y = this.mCamera.y + 480 + 100;//在屏幕可视范围下方提前生成
            this.mGarbagePool.addChild(garbage);
            GameData.instance.time = index;
            this.mHard += 0.05;
            //index = Math.round(Math.random()*20-1);
        }
    },
});
