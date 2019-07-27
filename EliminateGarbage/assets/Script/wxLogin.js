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
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) 
        {
            wx.login({
                success: function(res){
                	console.log("微信登陆成功!");
                    wx.request({
                        url :   "https://www.liuzunxiong.top:23302/token?code=" + res.code,
                        method  :   "POST",
                        success :   function (data) {
                        	console.log("请求发送成功!");
                            if (data.statusCode == 200) {
                            	console.log("request" , data);
                                wx.postMessage({
                                    message :   "SetOpenId",
                                    openid  :   data.data.openid
                                });
                            }
                        }
                    });
                    //显示当前页面的转发按钮
                    wx.showShareMenu();
                    //监听用户点击右上角菜单的“转发”按钮时触发的事件
                    wx.onShareAppMessage(function(res){
                        return {
                            title: "来和我一起分类垃圾！",
                            imageUrl: "https://www.liuzunxiong.top/Share/share.jpg",
                            success(res){
                                console.log("转发成功!!!")
                                //common.diamond += 20;
                            },
                            fail(res){
                                console.log("转发失败!!!")
                            } 
                        }
                    });
                }
            });
        }
    },

    onShareClick () {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) 
        {
            wx.shareAppMessage({
                title: '不服来挑战，我是垃圾分类之王' + GameData.instance.score + "分！",
                imageUrl: "https://www.liuzunxiong.top/Share/share.jpg",
                success: function (res) {
                    console.log('主动拉起分享成功');
                },
                fail: function (res) {
                    console.log('主动拉起分享失败');
                }
            });
        }
    },
    // update (dt) {},
});
