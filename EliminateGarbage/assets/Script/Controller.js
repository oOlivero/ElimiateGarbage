cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        self.moveToPos = cc.v2(0, 0);
        self.isMoving = false;
        self.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            self.isMoving = true;
            self.moveToPos = self.node.parent.convertToNodeSpaceAR(touchLoc);
        }, self.node);
        self.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            self.moveToPos = self.node.parent.convertToNodeSpaceAR(touchLoc);
        }, self.node);
        self.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            self.isMoving = false; // when touch ended, stop moving
        }, self.node);
    },

    // called every frame
    update: function (dt) {
        if (!this.isMoving) return;

        var oldPos = this.node.position;
        // get move direction
        var newPos = this.moveToPos;
        if(newPos.y > oldPos.y)//锁定y
            newPos.y = oldPos.y;
        // set new position
        this.node.setPosition(newPos);
    }
});