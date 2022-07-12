window.__require = function e(t, o, n) {
function i(r, c) {
if (!o[r]) {
if (!t[r]) {
var s = r.split("/");
s = s[s.length - 1];
if (!t[s]) {
var l = "function" == typeof __require && __require;
if (!c && l) return l(s, !0);
if (a) return a(s, !0);
throw new Error("Cannot find module '" + r + "'");
}
}
var u = o[r] = {
exports: {}
};
t[r][0].call(u.exports, function(e) {
return i(t[r][1][e] || e);
}, u, u.exports, e, t, o, n);
}
return o[r].exports;
}
for (var a = "function" == typeof __require && __require, r = 0; r < n.length; r++) i(n[r]);
return i;
}({
CommonEventName: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "f49d9gNXhlCtpNPmY1KGy8x", "CommonEventName");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.EVENT_APPLE_LOGIN_RESULT = "EVENT_APPLE_LOGIN_RESULT";
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
CommonFunction: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "04b32vpnTZD4qFboCOgX/Mv", "CommonFunction");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.getSceneCanvas = function() {
if (cc.director) {
var e = cc.director.getScene();
if (cc.isValid(e)) {
var t = e.getChildByName("Canvas");
return cc.isValid(t) ? t : null;
}
return null;
}
return null;
};
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
CommonPrefabMgr: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "6f0dcP9/AFL8J9/1X2O2YAz", "CommonPrefabMgr");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("./CommonFunction"), i = e("../Resources/ResManager"), a = e("../UI/PrefabManager"), r = e("./Global"), c = e("../../Component/Dialog/WinDialog"), s = function() {
function e() {}
e.createToast = function(e, t) {
void 0 === t && (t = r.default.Config.layerZOrder.Toast);
var o = n.default.getSceneCanvas();
if (cc.isValid(o)) {
var c = o.getChildByName("Toast");
c && o.removeChild(c);
}
var s = i.default.common.prefab.toast;
a.default.getPrefabIns(s, function(n) {
if (cc.isValid(o) && n) {
o.addChild(n, t);
n.getComponent("Toast") && n.getComponent("Toast").init(e);
n.x = 0;
n.y = 0;
}
});
};
e.showWinDialog = function(e, t, o) {
var s = n.default.getSceneCanvas();
a.default.getPrefab(i.default.room.prefab.winDialog, function(n) {
if (n) {
var i = cc.instantiate(n);
if (i) {
cc.isValid(s) && s.addChild(i, r.default.Config.layerZOrder.Dialog);
i.getComponent(c.default) && i.getComponent(c.default).showDialog(e, t, o);
}
}
});
};
e.showLostDialog = function(e, t, o) {
var s = n.default.getSceneCanvas();
a.default.getPrefab(i.default.room.prefab.lostDialog, function(n) {
if (n) {
var i = cc.instantiate(n);
if (i) {
cc.isValid(s) && s.addChild(i, r.default.Config.layerZOrder.Dialog);
i.getComponent(c.default) && i.getComponent(c.default).showDialog(e, t, o);
}
}
});
};
return e;
}();
o.default = s;
cc._RF.pop();
}, {
"../../Component/Dialog/WinDialog": "WinDialog",
"../Resources/ResManager": "ResManager",
"../UI/PrefabManager": "PrefabManager",
"./CommonFunction": "CommonFunction",
"./Global": "Global"
} ],
CountDownUtil: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "e178dRT0R1Gp7hz5F9RgpUY", "CountDownUtil");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e(e, t, o) {
this.COUNT_DOWN_ACTION_TAG = 9111024911;
this._componentNode = null;
this._leftTs = 0;
this._callback = null;
this._componentNode = e;
this._callback = o;
this.COUNT_DOWN_ACTION_TAG = t;
this.stopCountDown();
}
e.prototype.startCountDown = function(e) {
if (this._leftTs > 0) {
this._leftTs = e;
this.callback(e);
} else if (e <= 0) ; else {
this.stopCountDown();
if (cc.isValid(this._componentNode)) {
this.callback(e);
this._componentNode.runAction(this.countDownAction(e));
}
}
};
e.prototype.getLeftTs = function() {
return this._leftTs;
};
e.prototype.countDownAction = function(e) {
var t = this;
t._leftTs = e;
var o = cc.repeatForever(cc.sequence(cc.delayTime(1), cc.callFunc(function() {
if (t._leftTs <= 0) t.callback(0); else {
t._leftTs--;
cc.isValid(t._componentNode) && (t._leftTs > 0 ? t.callback(t._leftTs) : t.callback(0));
}
})));
o.setTag(t.COUNT_DOWN_ACTION_TAG);
return o;
};
e.prototype.stopCountDown = function() {
cc.isValid(this._componentNode) && this._componentNode.stopActionByTag(this.COUNT_DOWN_ACTION_TAG);
};
e.prototype.callback = function(e) {
if (this._callback) {
e <= 0 && this.stopCountDown();
this._callback(e);
}
};
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
CountDown: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "0a1d77xStpHepXdigZVVvNO", "CountDown");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../../Framework/Utils/CountDownUtil"), i = e("../../Framework/UI/SpriteManager"), a = e("../../Framework/Resources/ResManager"), r = cc._decorator, c = r.ccclass, s = (r.property, 
function(e) {
__extends(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.COUNT_DOWN_TAG = 12030;
t.countDownUtil = null;
t.numberSprites = [];
return t;
}
t.prototype.onLoad = function() {
this.countDownUtil = new n.default(this.node, this.COUNT_DOWN_TAG, this.countDownCallback.bind(this));
var e = this.node.getComponent(cc.Layout);
if (!e) {
(e = this.node.addComponent(cc.Layout)).type = cc.Layout.Type.HORIZONTAL;
e.resizeMode = cc.Layout.ResizeMode.CONTAINER;
e.spacingX = 15;
}
};
t.prototype.countDownCallback = function(e) {
var t = e.toString();
this.numberSprites.length != t.length && this.createNumberSprites(t.length);
for (var o = 0; o < t.length; o++) {
var n = parseInt(t.substr(o, 1)), r = a.default.common.texture.numbers[n];
i.default.loadSpriteForNode(this.numberSprites[o], r);
}
e <= 0 && (this.node.active = !1);
};
t.prototype.createNumberSprites = function(e) {
this.node.removeAllChildren();
this.numberSprites = [];
for (var t = 0; t < e; t++) {
var o = i.default.createSpriteNode("number" + t);
this.node.addChild(o);
this.numberSprites[t] = o;
}
};
t.prototype.startCountDown = function(e) {
this.countDownUtil.startCountDown(e);
};
t.prototype.stopCountDown = function() {
this.countDownUtil.stopCountDown();
this.node.active = !1;
};
return t = __decorate([ c ], t);
}(cc.Component));
o.default = s;
cc._RF.pop();
}, {
"../../Framework/Resources/ResManager": "ResManager",
"../../Framework/UI/SpriteManager": "SpriteManager",
"../../Framework/Utils/CountDownUtil": "CountDownUtil"
} ],
GameManager: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "4f2a86rJIhCIoZ9hUBSfFat", "GameManager");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("./UserManager"), i = e("../../Component/GameRoom/GameRoomController"), a = e("../Base/CommonPrefabMgr"), r = e("../Resources/Language"), c = function() {
function e() {}
e.createOpponent = function() {
var e = n.default.getLoginUser(), t = n.default.createRandomUser(!0);
do {
t = n.default.createRandomUser(!0);
} while (e.id == t.id || e.avatar == t.avatar || e.name == t.name);
return t;
};
e.enterRoom = function(e) {
var t = this.createRoom(e);
if (null != t) {
cc.director.loadScene("GameRoom");
return t;
}
a.default.createToast(r.default.common.notEnoughMoney);
};
e.createRoom = function(e) {
var t = n.default.getLoginUser();
if (t.coin < this.betAmount) return null;
var o = this.createOpponent(), a = new i.default();
a.initRoom(e, t, o);
var r = t.coin - this.betAmount;
a.updateMyCoin(r);
this.setCurRoom(a);
return a;
};
e.setCurRoom = function(e) {
this.curRoom = e;
};
e.getCurRoom = function() {
return this.curRoom;
};
e.ROOM_KIND = cc.Enum({
ONE: 0,
THREE: 1,
FIVE: 2
});
e.GESTURE = cc.Enum({
NONE: 100,
SCISSORS: 0,
ROCK: 1,
PAPER: 2
});
e.roomInfo = {
roomOne: {
limit: 10
},
roomThree: {
limit: 50
},
roomFive: {
limit: 100
}
};
e.betAmount = 10;
return e;
}();
o.default = c;
cc._RF.pop();
}, {
"../../Component/GameRoom/GameRoomController": "GameRoomController",
"../Base/CommonPrefabMgr": "CommonPrefabMgr",
"../Resources/Language": "Language",
"./UserManager": "UserManager"
} ],
GameRoomController: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "3524diF/KxGiohDojgTNTGM", "GameRoomController");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../../Framework/Business/UserManager"), i = e("../../Framework/Business/GameManager"), a = function() {
function e() {
this.me = null;
this.opponent = null;
this.roomKind = 0;
this.winRound = 0;
this.curRound = 0;
this.isGameOver = !1;
}
e.prototype.initRoom = function(e, t, o) {
this.roomKind = e;
this.me = t;
this.opponent = o;
this.resetRoom();
};
e.prototype.resetRoom = function() {
var e = 0, t = 0;
if (this.roomKind == i.default.ROOM_KIND.ONE) {
e = 1;
t = 1;
} else if (this.roomKind == i.default.ROOM_KIND.THREE) {
e = 3;
t = 2;
} else if (this.roomKind == i.default.ROOM_KIND.FIVE) {
e = 5;
t = 3;
}
var o = this.me;
o.life = e;
o.isWinner = !1;
o.gesture = i.default.GESTURE.NONE;
o.winCount = 0;
var n = this.opponent;
n.life = e;
n.isWinner = !1;
n.gesture = i.default.GESTURE.NONE;
n.winCount = 0;
this.winRound = t;
this.curRound = 0;
this.isGameOver = !1;
};
e.prototype.updateOpponentCoin = function(e) {
this.opponent && (this.opponent.coin = e);
};
e.prototype.updateMyCoin = function(e) {
this.me && (this.me.coin = e);
n.default.updateUserCoin(e);
};
e.prototype.beginMatch = function(e, t) {
if (this.me && this.opponent) if (this.isGameOver) {
console.log("Game Over");
t && t(this.me, this.opponent, this.isGameOver);
} else {
this.curRound++;
this.me.gesture = e;
this.opponent.gesture = parseInt((3 * Math.random()).toString());
this.matchGame(this.me, this.opponent);
if (this.me.isWinner) {
this.me.winCount++;
this.opponent.life--;
} else if (this.opponent.isWinner) {
this.opponent.winCount++;
this.me.life--;
}
if (this.me.winCount >= this.winRound) {
this.me.isWinner = !0;
this.opponent.isWinner = !1;
this.isGameOver = !0;
} else if (this.opponent.winCount >= this.winRound) {
this.me.isWinner = !1;
this.opponent.isWinner = !0;
this.isGameOver = !0;
}
t && t(this.me, this.opponent, this.isGameOver);
} else console.log("Not enough of gamers, can not play the game");
};
e.prototype.matchGame = function(e, t) {
if (e.gesture == t.gesture) {
e.isWinner = !1;
t.isWinner = !1;
} else if (e.gesture == i.default.GESTURE.PAPER && t.gesture == i.default.GESTURE.ROCK) {
e.isWinner = !0;
t.isWinner = !1;
} else if (e.gesture == i.default.GESTURE.PAPER && t.gesture == i.default.GESTURE.SCISSORS) {
e.isWinner = !1;
t.isWinner = !0;
} else if (e.gesture == i.default.GESTURE.ROCK && t.gesture == i.default.GESTURE.PAPER) {
e.isWinner = !1;
t.isWinner = !0;
} else if (e.gesture == i.default.GESTURE.ROCK && t.gesture == i.default.GESTURE.SCISSORS) {
e.isWinner = !0;
t.isWinner = !1;
} else if (e.gesture == i.default.GESTURE.SCISSORS && t.gesture == i.default.GESTURE.ROCK) {
e.isWinner = !1;
t.isWinner = !0;
} else if (e.gesture == i.default.GESTURE.SCISSORS && t.gesture == i.default.GESTURE.PAPER) {
e.isWinner = !0;
t.isWinner = !1;
}
};
return e;
}();
o.default = a;
cc._RF.pop();
}, {
"../../Framework/Business/GameManager": "GameManager",
"../../Framework/Business/UserManager": "UserManager"
} ],
GameRoom: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "2bba1H6FkFBErZNu3KKrYYJ", "GameRoom");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../../Framework/UI/SpriteManager"), i = e("../../Framework/Resources/ResManager"), a = e("../../Framework/Business/GameManager"), r = e("./LifeController"), c = e("./ResultController"), s = e("../../Framework/UI/SpineManager"), l = e("./GestureSelector"), u = e("../../Framework/Base/CommonPrefabMgr"), d = e("../Common/CountDown"), p = e("../../Framework/Resources/Language"), f = cc._decorator, m = f.ccclass, g = f.property, h = function(e) {
__extends(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.titleSprite = null;
t.meLifeController = null;
t.opponentLifeController = null;
t.meResultController = null;
t.opponentResultController = null;
t.vsSkeleton = null;
t.gestureSelector = null;
t.countDown = null;
return t;
}
t.prototype.onLoad = function() {
this.curRoom = a.default.getCurRoom();
this.initRoom();
this.playVsAnimation();
};
t.prototype.startNewGame = function() {
var e = a.default.createRoom(this.curRoom.roomKind);
if (null != e) {
this.curRoom = e;
this.initRoom();
this.playVsAnimation();
} else {
u.default.createToast(p.default.common.notEnoughMoney);
this.onBackBtnClick();
}
};
t.prototype.initRoom = function() {
n.default.loadSprite(this.titleSprite, i.default.room.texture.roomTitle[this.curRoom.roomKind]);
var e = this.curRoom.me, t = this.curRoom.opponent;
this.updateLife(e, t);
this.updateResult(e, t);
this.setControlVisible(!1);
cc.isValid(this.gestureSelector) && this.gestureSelector.init(this.onSelectGesture);
};
t.prototype.setControlVisible = function(e) {
cc.isValid(this.meLifeController) && (this.meLifeController.node.active = e);
cc.isValid(this.opponentLifeController) && (this.opponentLifeController.node.active = e);
cc.isValid(this.meResultController) && (this.meResultController.node.active = e);
cc.isValid(this.opponentResultController) && (this.opponentResultController.node.active = e);
cc.isValid(this.gestureSelector) && (this.gestureSelector.node.active = e);
cc.isValid(this.countDown) && (this.countDown.node.active = e);
};
t.prototype.playVsAnimation = function() {
var e = this;
s.default.loadSpine(this.vsSkeleton, i.default.room.animation.vs, {
name: "animation",
loop: !1
}, function() {
e.setControlVisible(!0);
});
};
t.prototype.updateLife = function(e, t) {
cc.isValid(this.meLifeController) && this.meLifeController.init(e);
cc.isValid(this.opponentLifeController) && this.opponentLifeController.init(t);
};
t.prototype.updateResult = function(e, t) {
cc.isValid(this.meResultController) && this.meResultController.init(e);
cc.isValid(this.opponentResultController) && this.opponentResultController.init(t);
};
t.prototype.beginMatch = function(e) {
var t = this;
t.curRoom.beginMatch(e, function(e, o, n) {
if (n) {
if (e.isWinner) {
var i = 2 * a.default.betAmount;
t.curRoom.updateMyCoin(e.coin + i);
u.default.showWinDialog(i, t.onBackBtnClick.bind(t), t.onContinueBtnClick.bind(t));
} else if (o.isWinner) {
var r = -a.default.betAmount, c = 2 * a.default.betAmount;
t.curRoom.updateOpponentCoin(o.coin + c);
u.default.showLostDialog(r, t.onBackBtnClick.bind(t), t.onContinueBtnClick.bind(t));
}
} else cc.isValid(t.countDown) && t.countDown.startCountDown(10);
t.updateLife(e, o);
t.updateResult(e, o);
});
};
t.prototype.onBackBtnClick = function() {
this.curRoom.resetRoom();
cc.director.loadScene("Hall");
};
t.prototype.onContinueBtnClick = function() {
this.startNewGame();
};
t.prototype.onSelectGesture = function(e) {};
t.prototype.onClickConfirm = function() {
var e = this.gestureSelector.getSelectedGesture();
e != a.default.GESTURE.NONE ? this.beginMatch(e) : u.default.createToast("Please choose your gesture");
};
__decorate([ g(cc.Sprite) ], t.prototype, "titleSprite", void 0);
__decorate([ g(r.default) ], t.prototype, "meLifeController", void 0);
__decorate([ g(r.default) ], t.prototype, "opponentLifeController", void 0);
__decorate([ g(c.default) ], t.prototype, "meResultController", void 0);
__decorate([ g(c.default) ], t.prototype, "opponentResultController", void 0);
__decorate([ g(sp.Skeleton) ], t.prototype, "vsSkeleton", void 0);
__decorate([ g(l.default) ], t.prototype, "gestureSelector", void 0);
__decorate([ g(d.default) ], t.prototype, "countDown", void 0);
return t = __decorate([ m ], t);
}(cc.Component);
o.default = h;
cc._RF.pop();
}, {
"../../Framework/Base/CommonPrefabMgr": "CommonPrefabMgr",
"../../Framework/Business/GameManager": "GameManager",
"../../Framework/Resources/Language": "Language",
"../../Framework/Resources/ResManager": "ResManager",
"../../Framework/UI/SpineManager": "SpineManager",
"../../Framework/UI/SpriteManager": "SpriteManager",
"../Common/CountDown": "CountDown",
"./GestureSelector": "GestureSelector",
"./LifeController": "LifeController",
"./ResultController": "ResultController"
} ],
GestureSelector: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "33eb6O1zOtInZ/Km6ef/pdq", "GestureSelector");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../../Framework/Business/GameManager"), i = cc._decorator, a = i.ccclass, r = i.property, c = function(e) {
__extends(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.scissorNode = null;
t.rockNode = null;
t.paperNode = null;
return t;
}
t.prototype.onLoad = function() {
this.selectedGesture = n.default.GESTURE.NONE;
this.selectGesture(this.selectedGesture);
};
t.prototype.init = function(e) {
this.selectCallback = e;
};
t.prototype.onSelectGesture = function(e, t) {
console.log("Select gesture: data=" + t);
var o = parseInt(t);
this.selectGesture(o);
this.selectCallback && this.selectCallback(o);
};
t.prototype.selectGesture = function(e) {
if (e == n.default.GESTURE.SCISSORS) {
this.setChosenIconVisible(this.scissorNode, !0);
this.setChosenIconVisible(this.rockNode, !1);
this.setChosenIconVisible(this.paperNode, !1);
} else if (e == n.default.GESTURE.ROCK) {
this.setChosenIconVisible(this.scissorNode, !1);
this.setChosenIconVisible(this.rockNode, !0);
this.setChosenIconVisible(this.paperNode, !1);
} else if (e == n.default.GESTURE.PAPER) {
this.setChosenIconVisible(this.scissorNode, !1);
this.setChosenIconVisible(this.rockNode, !1);
this.setChosenIconVisible(this.paperNode, !0);
} else {
this.setChosenIconVisible(this.scissorNode, !1);
this.setChosenIconVisible(this.rockNode, !1);
this.setChosenIconVisible(this.paperNode, !1);
}
this.selectedGesture = e;
};
t.prototype.setChosenIconVisible = function(e, t) {
if (cc.isValid(e)) {
var o = e.getChildByName("chosen");
cc.isValid(o) && (o.active = t);
}
};
t.prototype.getSelectedGesture = function() {
return this.selectedGesture;
};
__decorate([ r(cc.Node) ], t.prototype, "scissorNode", void 0);
__decorate([ r(cc.Node) ], t.prototype, "rockNode", void 0);
__decorate([ r(cc.Node) ], t.prototype, "paperNode", void 0);
return t = __decorate([ a ], t);
}(cc.Component);
o.default = c;
cc._RF.pop();
}, {
"../../Framework/Business/GameManager": "GameManager"
} ],
Global: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "e44d2crUEpDUpXz70FN2T2J", "Global");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.Config = {
layerZOrder: {
Toast: 8e3,
Dialog: 7e3
}
};
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
Hall: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "c5e60FAkL5JKZtwdy83I9mx", "Hall");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../../Framework/Business/UserManager"), i = e("../../Framework/UI/LabelManager"), a = e("../../Framework/Business/GameManager"), r = e("../../Framework/Base/CommonPrefabMgr"), c = e("../../Framework/UI/SpriteManager"), s = e("../../Framework/Resources/ResManager"), l = e("../../Framework/Resources/Language"), u = e("../../Framework/Utils/NativeUtil"), d = cc.js.formatStr, p = cc._decorator, f = p.ccclass, m = p.property, g = function(e) {
__extends(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.STATE_HALL = 0;
t.STATE_MATCH = 1;
t.hallLayout = null;
t.avatarSprite = null;
t.nameLabel = null;
t.idLabel = null;
t.coinLabel = null;
t.homeLogo = null;
t.matchLayout = null;
t.roomTitleSprite = null;
t.meMatchAvatarSprite = null;
t.betTipsLabel = null;
return t;
}
t.prototype.onLoad = function() {
this.initUserInfo();
};
t.prototype.onEnable = function() {
cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
};
t.prototype.onDisable = function() {
cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
};
t.prototype.initUserInfo = function() {
var e = n.default.getLoginUser(), t = s.default.common.texture.userAvatars[e.avatar];
c.default.loadSprite(this.avatarSprite, t);
i.default.setLabelString(this.nameLabel, e.name);
i.default.setLabelString(this.idLabel, e.id);
i.default.setLabelString(this.coinLabel, e.coin);
};
t.prototype.onClickCheckin = function() {};
t.prototype.onClickGuide = function() {};
t.prototype.onClickSetting = function() {};
t.prototype.onClickRoomOne = function() {
n.default.getLoginUser().coin < a.default.roomInfo.roomOne.limit ? r.default.createToast(l.default.common.notEnoughMoney) : this.setCurShowState(this.STATE_MATCH, a.default.ROOM_KIND.ONE);
};
t.prototype.onClickRoomThree = function() {
n.default.getLoginUser().coin < a.default.roomInfo.roomThree.limit ? r.default.createToast(l.default.common.notEnoughMoney) : this.setCurShowState(this.STATE_MATCH, a.default.ROOM_KIND.THREE);
};
t.prototype.onClickRoomFive = function() {
n.default.getLoginUser().coin < a.default.roomInfo.roomFive.limit ? r.default.createToast(l.default.common.notEnoughMoney) : this.setCurShowState(this.STATE_MATCH, a.default.ROOM_KIND.FIVE);
};
t.prototype.onClickBeginMatch = function() {
a.default.enterRoom(this.currentRoomKind);
};
t.prototype.setCurShowState = function(e, t) {
if (e == this.STATE_HALL) {
this.hallLayout.active = !0;
this.homeLogo.active = !0;
this.matchLayout.active = !1;
} else {
this.hallLayout.active = !1;
this.homeLogo.active = !1;
this.matchLayout.active = !0;
var o = n.default.getLoginUser();
c.default.loadSprite(this.roomTitleSprite, s.default.room.texture.roomTitle[t]);
c.default.loadSprite(this.meMatchAvatarSprite, s.default.common.texture.userAvatars[o.avatar]);
i.default.setLabelString(this.betTipsLabel, d(l.default.common.betAmountTips, a.default.betAmount));
this.currentRoomKind = t;
}
};
t.prototype.onKeyUp = function(e) {
e.keyCode == cc.macro.KEY.back && u.default.quitGame();
};
__decorate([ m(cc.Node) ], t.prototype, "hallLayout", void 0);
__decorate([ m(cc.Sprite) ], t.prototype, "avatarSprite", void 0);
__decorate([ m(cc.Label) ], t.prototype, "nameLabel", void 0);
__decorate([ m(cc.Label) ], t.prototype, "idLabel", void 0);
__decorate([ m(cc.Label) ], t.prototype, "coinLabel", void 0);
__decorate([ m(cc.Node) ], t.prototype, "homeLogo", void 0);
__decorate([ m(cc.Node) ], t.prototype, "matchLayout", void 0);
__decorate([ m(cc.Sprite) ], t.prototype, "roomTitleSprite", void 0);
__decorate([ m(cc.Sprite) ], t.prototype, "meMatchAvatarSprite", void 0);
__decorate([ m(cc.Label) ], t.prototype, "betTipsLabel", void 0);
return t = __decorate([ f ], t);
}(cc.Component);
o.default = g;
cc._RF.pop();
}, {
"../../Framework/Base/CommonPrefabMgr": "CommonPrefabMgr",
"../../Framework/Business/GameManager": "GameManager",
"../../Framework/Business/UserManager": "UserManager",
"../../Framework/Resources/Language": "Language",
"../../Framework/Resources/ResManager": "ResManager",
"../../Framework/UI/LabelManager": "LabelManager",
"../../Framework/UI/SpriteManager": "SpriteManager",
"../../Framework/Utils/NativeUtil": "NativeUtil"
} ],
LabelManager: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "2b649QP/KtCb7NeLMPcD+Ja", "LabelManager");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.initLabelManager = function() {
this.initFont();
};
e.createLabelNode = function(e) {
var t = new cc.Node("label_" + e || "");
t.addComponent(cc.Label);
t.setName(e || "");
return t;
};
e.setLabelOutline = function(e, t, o) {
void 0 === o && (o = 1);
var n = this.getLabelOutline(e);
if (cc.isValid(n)) {
n.color = cc.color().fromHEX(t);
n.width = o;
}
};
e.getLabelOutline = function(e) {
if (cc.isValid(e)) {
var t = e, o = (t = e instanceof cc.Label ? e.node : e).getComponent(cc.LabelOutline);
o || (o = t.addComponent(cc.LabelOutline));
return o;
}
return e;
};
e.setLabelColor = function(e, t) {
if (cc.isValid(e)) {
e instanceof cc.Node || e instanceof cc.Label && (e = e.node);
cc.isValid(e) && (e.color = cc.color().fromHEX(t));
}
};
e.setLabelFontSize = function(e, t) {
if (cc.isValid(e)) {
e instanceof cc.Label || e instanceof cc.Node && (e = e.getComponent(cc.Label));
cc.isValid(e) && (e.fontSize = t);
}
};
e.setLabelString = function(e, t) {
if (cc.isValid(e)) {
e instanceof cc.Label || e instanceof cc.Node && (e = e.getComponent(cc.Label));
cc.isValid(e) && (e.string = t);
}
};
e.setRichText = function(e, t) {
if (cc.isValid(e)) {
e instanceof cc.RichText || e instanceof cc.Node && (e = e.getComponent(cc.RichText));
cc.isValid(e) && (e.string = t);
}
};
e.getLabelString = function(e) {
if (cc.isValid(e)) {
if (e instanceof cc.Label) return e.string;
if (e instanceof cc.Node) return e.getComponent(cc.Label).string;
}
return "";
};
e.initFont = function() {
this.getSourceSansProRegularFont();
this.getSourceSansProBoldFont();
this.getSourceSansProSemiBoldFont();
};
e.getSourceSansProRegularFont = function() {
var e = this;
e.getFont(CommonDepend.CommonRes.font.ssp_regular, function(t) {
e.sourceSansProRegularFont = t;
});
};
e.getSourceSansProBoldFont = function() {
var e = this;
e.getFont(CommonDepend.CommonRes.font.ssp_regular, function(t) {
e.sourceSansProBoldFont = t;
});
};
e.getSourceSansProSemiBoldFont = function() {
var e = this;
e.getFont(CommonDepend.CommonRes.font.ssp_regular, function(t) {
e.sourceSansProSemiBoldFont = t;
});
};
e.setFont = function(e, t, o) {
if (cc.isValid(e)) {
e instanceof cc.Label || e instanceof cc.Node && (e = e.getComponent(cc.Label));
if (cc.isValid(e)) {
e.font = t;
(o || 0 == o) && (e.spacingX = o);
}
}
};
e.getFont = function(e, t) {
cc.loader.loadRes(e, cc.Font, function(e, o) {
e ? cc.error(e.message || e) : o && "function" == typeof t && t(o);
});
};
e.loadFont = function(e, t, o, n) {
cc.loader.loadRes(t, cc.Font, function(t, i) {
if (t) cc.error(t.message || t); else if (cc.isValid(e)) {
e instanceof cc.Label || e instanceof cc.Node && (e = e.getComponent(cc.Label));
if (cc.isValid(e)) {
e.font = i;
(o || 0 == o) && (e.spacingX = o);
"function" == typeof n && n();
}
}
});
};
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
Language: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "6adbeVqVkRIcoe3L+sV8xX1", "Language");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.common = {
notEnoughMoney: "Not enough gold to enter the room.",
betAmountTips: "A match will cost %s gold"
};
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
Launcher: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "cc4f8FH8aJCdrQBQuLC05CZ", "Launcher");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../../Framework/Utils/NativeUtil"), i = e("../../Framework/Business/UserManager"), a = cc._decorator, r = a.ccclass, c = (a.property, 
function(e) {
__extends(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
n.default.init();
cc.Camera.main.backgroundColor = cc.color().fromHEX("#FFFFFF");
i.default.initLoginUser() ? this.gotoHallDelay() : this.gotoLoadingDelay();
};
t.prototype.gotoLoadingDelay = function() {
setTimeout(function() {
cc.director.loadScene("Loading");
}, 3e3);
};
t.prototype.gotoHallDelay = function() {
setTimeout(function() {
cc.director.loadScene("Hall");
}, 3e3);
};
t.prototype.start = function() {};
return t = __decorate([ r ], t);
}(cc.Component));
o.default = c;
cc._RF.pop();
}, {
"../../Framework/Business/UserManager": "UserManager",
"../../Framework/Utils/NativeUtil": "NativeUtil"
} ],
LifeController: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "35c08m9ktRI3qnxKf4ysetX", "LifeController");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../../Framework/UI/SpriteManager"), i = e("../../Framework/Resources/ResManager"), a = e("../../Framework/UI/LabelManager"), r = cc._decorator, c = r.ccclass, s = r.property, l = function(e) {
__extends(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.avatarSprite = null;
t.nameLabel = null;
t.lifeCount = null;
return t;
}
t.prototype.init = function(e) {
if (e) {
var t = i.default.common.texture.userAvatars[e.avatar];
n.default.loadSprite(this.avatarSprite, t);
a.default.setLabelString(this.nameLabel, e.name);
this.updateLifeCount(e.life);
}
};
t.prototype.updateLifeCount = function(e) {
if (cc.isValid(this.lifeCount)) {
this.lifeCount.removeAllChildren();
for (var t = 0; t < e; t++) {
var o = n.default.createSpriteNode("life");
o.y = 5;
this.lifeCount.addChild(o);
n.default.loadSpriteForNode(o, i.default.room.texture.life);
}
}
};
__decorate([ s(cc.Sprite) ], t.prototype, "avatarSprite", void 0);
__decorate([ s(cc.Label) ], t.prototype, "nameLabel", void 0);
__decorate([ s(cc.Node) ], t.prototype, "lifeCount", void 0);
return t = __decorate([ c ], t);
}(cc.Component);
o.default = l;
cc._RF.pop();
}, {
"../../Framework/Resources/ResManager": "ResManager",
"../../Framework/UI/LabelManager": "LabelManager",
"../../Framework/UI/SpriteManager": "SpriteManager"
} ],
Loading: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "b7e4780HsVNypzwv6PTvZdF", "Loading");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../../Framework/Utils/NativeUtil"), i = e("../../Framework/Business/UserManager"), a = e("../../Framework/Base/CommonEventName"), r = cc._decorator, c = r.ccclass, s = (r.property, 
function(e) {
__extends(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {};
t.prototype.onEnable = function() {
cc.director.on(a.default.EVENT_APPLE_LOGIN_RESULT, this.onAppLoginResult, this);
cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
};
t.prototype.onDisable = function() {
cc.director.off(a.default.EVENT_APPLE_LOGIN_RESULT, this.onAppLoginResult, this);
cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
};
t.prototype.onKeyUp = function(e) {
e.keyCode == cc.macro.KEY.back && n.default.quitGame();
};
t.prototype.onGuestLogin = function() {
i.default.guestLogin() && cc.director.loadScene("Hall");
};
t.prototype.onAppleLogin = function() {
n.default.appleLogin();
};
t.prototype.onAppLoginResult = function(e, t) {};
return t = __decorate([ c ], t);
}(cc.Component));
o.default = s;
cc._RF.pop();
}, {
"../../Framework/Base/CommonEventName": "CommonEventName",
"../../Framework/Business/UserManager": "UserManager",
"../../Framework/Utils/NativeUtil": "NativeUtil"
} ],
LocalStorageMgr: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "76cc7xRj6NBBbXuOYbH8IYy", "LocalStorageMgr");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.readData = function(e) {
return cc.sys.localStorage.getItem("_local" + e);
};
e.saveData = function(e, t) {
cc.sys.localStorage.setItem("_local" + e, t);
};
e.clearData = function(e) {
cc.sys.localStorage.removeItem("_local" + e);
};
e.readBoolean = function(e) {
var t;
return 1 == (t = cc.sys.localStorage.getItem("_local" + e)) || "true" == t;
};
e.saveBoolean = function(e, t) {
1 == t || 0 == t || "true" == t || "false" == t ? console.log("LocalStorageMgr->saveBoolean key: " + e + " value: " + t) : console.log("警告: --\x3e LocalStorageMgr->saveBoolean,参数错误，请给定Boolean型参数-> key: " + e + " value: " + t);
cc.sys.localStorage.setItem("_local" + e, t);
};
e.getNativeClassName = function() {
return this.readData("_native_class_name");
};
e.getLoginUser = function() {
var e = this.readData("_login_user"), t = null;
e && (t = JSON.parse(e));
return t;
};
e.saveLoginUser = function(e) {
var t = "";
e && (t = JSON.stringify(e));
this.saveData("_login_user", t);
};
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
NativeUtil: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "9cb6byZwNZPHKjrtMtR8XGx", "NativeUtil");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("./LocalStorageMgr"), i = e("../Base/CommonEventName"), a = function() {
function e() {}
e.init = function() {
this.nativeClassName = n.default.getNativeClassName();
console.log("设置JavaUtil/OCUtil别名：" + this.nativeClassName);
};
e.nativeAndroidClassName = function() {
var e = "com/util/EngineBridge";
this.nativeClassName && (e = this.nativeClassName);
return e;
};
e.nativeiOSClasssName = function() {
var e = "EngineBridge";
this.nativeClassName && (e = this.nativeClassName);
return e;
};
e.quitGame = function() {
if (cc.sys.isNative) {
if (cc.sys.os == cc.sys.OS_ANDROID) {
var t = e.nativeAndroidClassName(), o = "quitGame";
jsb.reflection.callStaticMethod(t, o, "()V");
} else if (cc.sys.os == cc.sys.OS_IOS) {
t = e.nativeiOSClasssName(), o = "quitGame";
jsb.reflection.callStaticMethod(t, o);
}
} else console.log("quitGame");
};
e.appleLogin = function() {
if (cc.sys.isNative) {
if (cc.sys.os == cc.sys.OS_ANDROID) {
var t = e.nativeAndroidClassName(), o = "appleLogin";
jsb.reflection.callStaticMethod(t, o, "()V");
} else if (cc.sys.os == cc.sys.OS_IOS) {
t = e.nativeiOSClasssName(), o = "appleLogin";
jsb.reflection.callStaticMethod(t, o);
}
} else console.log("appleLogin");
};
return e;
}();
o.default = a;
cc.onAppleLoginResult = function(e, t) {
console.log("onAppleLoginResult: state=%s, data=%s", e, t);
var o = {};
t && (o = JSON.parse(t));
cc.director.emit(i.default.EVENT_APPLE_LOGIN_RESULT, e, o);
};
cc._RF.pop();
}, {
"../Base/CommonEventName": "CommonEventName",
"./LocalStorageMgr": "LocalStorageMgr"
} ],
NodeManager: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "b9f43P/XVNP+aWuPtFnPU02", "NodeManager");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.setVisiable = function(e, t) {
void 0 === t && (t = !1);
cc.isValid(e) && (e instanceof cc.Node ? e.active = t : e.node.active = t);
};
e.setOpacity = function(e, t) {
cc.isValid(e) && (e instanceof cc.Node ? e.opacity = t : e.node.opacity = t);
};
e.createNode = function(e) {
var t = new cc.Node("node_" + e || "");
t.setName(e.toString() || "");
return t;
};
e.findChildByName = function(e, t) {
return cc.find(t, e);
};
e.loadNodeRes = function(e, t, o) {
if (cc.isValid(e) && t) {
if (t.sprite) {
console.log("NodeManager ======= 图片加载开始，父节点[%s] =======", e.name);
for (var n = 0; n < t.sprite.length; n++) {
var i = t.sprite[n].nodePath, a = t.sprite[n].resPath, r = t.sprite[n].spriteName, c = null;
c = "" == i || "/" == i ? e : cc.find(i, e);
if (cc.isValid(c) && a) {
var s = this.getAssetByPath(a, "sprite", r, o);
if (s) {
console.log("NodeManager ==》子节点[%s]，从内存中加载图片：%s", i, a);
UIDepend.SpriteManager.setSpriteFrame(c, s);
} else {
console.log("NodeManager ==》子节点[%s]，内存中找不到图片，动态加载：%s", i, a);
r ? UIDepend.SpriteManager.loadSpriteAtlasForNode(c, a, r) : UIDepend.SpriteManager.loadSpriteForNode(c, a);
}
}
}
}
if (t.font) {
console.log("NodeManager ======= 字体加载开始，父节点[%s] =======", e.name);
for (n = 0; n < t.font.length; n++) {
i = t.font[n].nodePath, a = t.font[n].resPath;
var l = t.font[n].spacingX, u = null;
u = "" == i || "/" == i ? e : cc.find(i, e);
if (cc.isValid(u) && a) {
var d = this.getAssetByPath(a, "font");
if (d) {
console.log("NodeManager ==》子节点[%s]，从内存中加载字体：%s", i, a);
UIDepend.LabelManager.setFont(u, d, l);
} else {
console.log("NodeManager ==》子节点[%s]，内存中找不到字体，动态加载：%s", i, a);
UIDepend.LabelManager.loadFont(u, a, l);
}
}
}
}
}
};
e.getAssetByPath = function(e, t, o, n) {
if (!e) return null;
if (o && "sprite" == t) {
return UIDepend.SpriteManager.getSpriteFromCommonAtlas(e, o);
}
var i = CommonDepend.ResourceManager.getResByGameId(n);
if (!i) return null;
var a = "";
if (-1 != e.indexOf("/")) {
var r = e.split("/");
a = r[r.length - 1];
} else a = e;
return i.find(function(e) {
return "sprite" == t ? e instanceof cc.SpriteFrame && e.name == a : "font" == t && (e instanceof cc.Font && e.name == a);
});
};
e.setLabelColor = function(e, t) {
cc.isValid(e) && (e.color = new cc.Color().fromHEX(t));
};
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
PrefabManager: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "716f7xKRjFHlK4xgnnRJNQr", "PrefabManager");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.loadPrefabToNode = function(e, t) {
if (cc.isValid(e) && cc.isValid(t)) {
var o = cc.instantiate(e);
cc.isValid(o) && t.addChild(o);
}
};
e.loadPrefab = function(e, t, o) {
o || (o = CommonDepend.CommonFunction.getSceneCanvas());
cc.loader.loadRes(e, function(e, n) {
if (e) cc.error(e.message || e); else if (n && cc.isValid(o)) {
var i = cc.instantiate(n);
if (i) {
o.addChild(i, Cocos20.Global.layerZOrder.Dialog);
"function" == typeof t && t(i);
}
}
});
};
e.getPrefab = function(e, t, o) {
cc.loader.loadRes(e, function(e, n) {
if (e) {
cc.error(e.message || e);
o && o();
} else n ? "function" == typeof t && t(n) : o && o();
});
};
e.getPrefabIns = function(e, t, o) {
cc.loader.loadRes(e, function(e, n) {
if (e) {
cc.error(e.message || e);
o && o();
} else if (n) {
var i = cc.instantiate(n);
i ? "function" == typeof t && t(i) : o && o();
} else o && o();
});
};
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
ResManager: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "69e38nI6MpPb67UX3teUryd", "ResManager");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.common = {
prefab: {
toast: "common/prefab/Toast"
},
texture: {
userAvatars: [ "common/texture/home_img_head1", "common/texture/home_img_head4" ],
userAvatarsVS: [ "common/texture/home_img_head2", "common/texture/home_img_head3" ],
numbers: [ "common/texture/number/0", "common/texture/number/1", "common/texture/number/2", "common/texture/number/3", "common/texture/number/4", "common/texture/number/5", "common/texture/number/6", "common/texture/number/7", "common/texture/number/8", "common/texture/number/9" ]
}
};
e.room = {
texture: {
roomTitle: [ "gameRoom/texture/title_room_one", "gameRoom/texture/title_room_three", "gameRoom/texture/title_room_five" ],
gesture: [ "gameRoom/texture/scissor", "gameRoom/texture/rock", "gameRoom/texture/paper" ],
life: "gameRoom/texture/life"
},
animation: {
vs: "gameRoom/animation/VS"
},
prefab: {
winDialog: "gameRoom/prefab/WinDialog",
lostDialog: "gameRoom/prefab/LostDialog"
}
};
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
ResultController: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "a5e83Ey02dK6bImINFwrRQ+", "ResultController");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../../Framework/UI/SpriteManager"), i = e("../../Framework/Resources/ResManager"), a = cc._decorator, r = a.ccclass, c = a.property, s = function(e) {
__extends(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.avatarSprite = null;
t.gestureSprite = null;
t.winnerSprite = null;
t.highlightSprite = null;
return t;
}
t.prototype.onLoad = function() {};
t.prototype.init = function(e) {
if (e) {
var t = i.default.common.texture.userAvatarsVS[e.avatar];
n.default.loadSprite(this.avatarSprite, t);
var o = i.default.room.texture.gesture[e.gesture];
o ? n.default.loadSprite(this.gestureSprite, o) : n.default.setSpriteFrame(this.gestureSprite, null);
cc.isValid(this.winnerSprite) && (this.winnerSprite.node.active = e.isWinner);
cc.isValid(this.highlightSprite) && (this.highlightSprite.node.active = e.isWinner);
}
};
__decorate([ c(cc.Sprite) ], t.prototype, "avatarSprite", void 0);
__decorate([ c(cc.Sprite) ], t.prototype, "gestureSprite", void 0);
__decorate([ c(cc.Sprite) ], t.prototype, "winnerSprite", void 0);
__decorate([ c(cc.Sprite) ], t.prototype, "highlightSprite", void 0);
return t = __decorate([ r ], t);
}(cc.Component);
o.default = s;
cc._RF.pop();
}, {
"../../Framework/Resources/ResManager": "ResManager",
"../../Framework/UI/SpriteManager": "SpriteManager"
} ],
SpineManager: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "b110cDWcpxFKLFa8MaWyPOT", "SpineManager");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.getSpine = function(e) {
var t = null;
cc.isValid(e) && (e instanceof sp.Skeleton ? t = e : e instanceof cc.Node && ((t = e.getComponent(sp.Skeleton)) || (t = e.addComponent(sp.Skeleton))));
return t;
};
e.loadSpine = function(e, t, o, n, i) {
var a = this.getSpine(e);
cc.isValid(a) && t && cc.loader.loadRes(t, sp.SkeletonData, function(e, t) {
if (e) cc.error(e.message || e); else if (cc.isValid(a)) {
var r = 0, c = "", s = !0;
if (o) {
r = o.trackIndex || 0;
c = o.name || "";
null != o.loop && void 0 != o.loop && (s = o.loop);
}
a.skeletonData = t;
a.setAnimation(r, c, s);
"function" == typeof i && a.setEventListener(function(e, t) {
i(e, t);
});
"function" == typeof n && a.setCompleteListener(function() {
n();
});
}
});
};
e.loadSkeleton = function(e, t, o, n) {
void 0 === n && (n = null);
var i = this.getSpine(e);
cc.isValid(i) && cc.loader.loadRes(t, sp.SkeletonData, function(e, t) {
if (e) {
cc.log(e.message || e);
n && n();
} else if (cc.isValid(i)) {
i.skeletonData = t;
o && o();
}
});
};
e.loadSpineWithSkin = function(e, t, o, n, i) {
var a = this.getSpine(e);
cc.isValid(a) && t && cc.loader.loadRes(t, sp.SkeletonData, function(e, t) {
if (e) cc.error(e.message || e); else if (cc.isValid(a)) {
var r = 0, c = "", s = !0, l = "";
if (o) {
r = o.trackIndex || 0;
c = o.name || "";
null != o.loop && void 0 != o.loop && (s = o.loop);
l = o.skin || "";
}
a.skeletonData = t;
"" != l && a.setSkin(l);
"function" == typeof i && a.setCompleteListener(function() {
i();
});
a.findAnimation(c) ? a.setAnimation(r, c, s) : cc.log("[SpineManager] 找不到动画名称: " + c);
"function" == typeof n && n();
}
});
};
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
SpriteManager: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "3c11cDw8I5A2pSdxo0VSftu", "SpriteManager");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.init = function() {
this.atlasCache = {};
};
e.createSpriteNode = function(e) {
var t = new cc.Node("sprite_" + e || "");
t.addComponent(cc.Sprite);
t.setName(e || "");
return t;
};
e.setSpriteFrame = function(e, t) {
var o = null;
if (cc.isValid(e)) {
e instanceof cc.Sprite ? o = e : e instanceof cc.Node && ((o = e.getComponent(cc.Sprite)) || (o = e.addComponent(cc.Sprite)));
cc.isValid(o) && (o.spriteFrame = t);
}
};
e.loadSpriteForNode = function(e, t, o) {
if (cc.isValid(e)) {
var n = e.getComponent(cc.Sprite);
this.loadSprite(n, t, o);
}
};
e.loadSprite = function(e, t, o, n) {
cc.isValid(e) && t && cc.loader.loadRes(t, cc.SpriteFrame, function(t, i) {
if (t) {
cc.error(t.message || t);
"function" == typeof n && n();
} else if (cc.isValid(e)) {
e.spriteFrame = i;
"function" == typeof o && o();
}
});
};
e.loadSpriteAtlasForNode = function(e, t, o, n, i) {
if (cc.isValid(e)) {
var a = e.getComponent(cc.Sprite);
this.loadSpriteAtlas(a, t, o, n, i);
}
};
e.loadSpriteAtlas = function(e, t, o, n, i) {
var a = this;
if (cc.isValid(e) && t && o) {
var r = a.atlasCache[t];
if (r) {
var c = r.getSpriteFrame(o);
if (c) {
e.spriteFrame = c;
"function" == typeof n && n();
} else "function" == typeof i && i();
} else cc.loader.loadRes(t, cc.SpriteAtlas, function(r, c) {
if (!r && c) {
a.restrictAtlasCache();
a.atlasCache[t] = c;
var s = c.getSpriteFrame(o);
if (s) {
e.spriteFrame = s;
"function" == typeof n && n();
} else "function" == typeof i && i();
} else "function" == typeof i && i();
});
}
};
e.restrictAtlasCache = function() {
var e = this, t = Object.keys(e.atlasCache);
t && t.length > 5 && t.forEach(function(t) {
if (!(Object.keys(e.atlasCache).length <= 5)) {
e.atlasCache[t] && delete e.atlasCache[t];
console.log("SpriteManager ==》 删除缓存图集：" + t + "，剩余：" + Object.keys(e.atlasCache).length);
}
});
};
e.getSprite = function(e, t) {
cc.loader.loadRes(e, cc.SpriteFrame, function(e, o) {
e ? cc.error(e.message || e) : o && "function" == typeof t && t(o);
});
};
e.loadRemoteUrl = function(e, t, o, n) {
var i = null;
cc.isValid(e) && (e instanceof cc.Sprite ? i = e : e instanceof cc.Node && ((i = e.getComponent(cc.Sprite)) || (i = e.addComponent(cc.Sprite))));
null != i ? cc.loader.load(t, function(e, t) {
if (e) {
cc.error(e.message || e);
"function" == typeof n && n();
} else if (t && t.url && cc.isValid(i) && cc.isValid(i.node)) {
var a = new cc.SpriteFrame(t);
if (a) {
i.spriteFrame = a;
"function" == typeof o && o();
} else "function" == typeof n && n();
} else "function" == typeof n && n();
}) : "function" == typeof n && n();
};
e.atlasCache = {};
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
Toast: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "b4cf67cDZpLZpwLFmucq9Tw", "Toast");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = cc._decorator, i = n.ccclass, a = n.property, r = function(e) {
__extends(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.message = null;
return t;
}
t.prototype.init = function(e) {
cc.isValid(this.node) && (this.node.active = !0);
cc.isValid(this.message) && (this.message.string = e);
if (this.hideToast) {
console.log("show toast: " + e);
this.unschedule(this.hideToast);
this.schedule(this.hideToast, 0, 1, 2);
}
var t = cc.winSize;
if (t) {
this.node.x = t.width / 2;
this.node.y = t.height / 2;
}
};
t.prototype.hideToast = function() {
console.log("hide toast......");
this.node.active = !1;
};
__decorate([ a(cc.Label) ], t.prototype, "message", void 0);
return t = __decorate([ i ], t);
}(cc.Component);
o.default = r;
cc._RF.pop();
}, {} ],
UserManager: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "e9d0a6ZPV9E35L2SR5nWjRo", "UserManager");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../Resources/ResManager"), i = e("../Utils/LocalStorageMgr"), a = e("./User"), r = e("./GameManager"), c = function() {
function e() {}
e.createRandomUser = function(e) {
var t = new a.default(), o = 1e4 + parseInt((1e4 * Math.random()).toString()), i = Math.random() * this.userNames.length, c = this.userNames[parseInt(i.toString())], s = parseInt((Math.random() * n.default.common.texture.userAvatars.length).toString()), l = this.INIT_COIN;
e && (l = Math.random() * this.INIT_COIN * 10);
t.id = o;
t.name = c;
t.coin = l;
t.avatar = s;
t.life = 0;
t.isWinner = !1;
t.gesture = r.default.GESTURE.NONE;
t.winCount = 0;
return t;
};
e.initLoginUser = function() {
this.currentUser = i.default.getLoginUser();
return this.currentUser;
};
e.guestLogin = function() {
this.currentUser = i.default.getLoginUser();
if (!this.currentUser) {
this.currentUser = this.createRandomUser();
i.default.saveLoginUser(this.currentUser);
}
return this.currentUser;
};
e.getLoginUser = function() {
return this.currentUser;
};
e.updateUserCoin = function(e) {
if (this.currentUser) {
this.currentUser.coin = e;
i.default.saveLoginUser(this.currentUser);
}
};
e.userNames = [ "Sam", "Barney", "Lili", "Kate", "Katherine", "James", "Bob", "Carl" ];
e.INIT_COIN = 1e3;
e.currentUser = null;
return e;
}();
o.default = c;
cc._RF.pop();
}, {
"../Resources/ResManager": "ResManager",
"../Utils/LocalStorageMgr": "LocalStorageMgr",
"./GameManager": "GameManager",
"./User": "User"
} ],
User: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "1185bjrNkNHvp4mXmXed2OY", "User");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
return function() {};
}();
o.default = n;
cc._RF.pop();
}, {} ],
WinDialog: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "c5fceiiDHtAt6awKHf3AGkM", "WinDialog");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../../Framework/UI/LabelManager"), i = cc._decorator, a = i.ccclass, r = i.property, c = function(e) {
__extends(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.mask = null;
t.body = null;
t.amountLabel = null;
t.backCallback = null;
t.continueCallback = null;
return t;
}
t.prototype.showDialog = function(e, t, o) {
var i = this;
i.backCallback = t;
i.continueCallback = o;
var a = "";
a = e >= 0 ? "+" + e : "" + e;
n.default.setLabelString(i.amountLabel, a);
var r = cc.callFunc(function() {}), c = cc.callFunc(function() {
if (cc.isValid(i.body)) {
i.body.active = !0;
i.body.runAction(cc.sequence(cc.delayTime(.04), cc.fadeIn(.2), cc.delayTime(.1), r));
}
});
if (cc.isValid(i.node)) {
i.node.setPosition(0, 0);
i.node.opacity = 0;
i.node.scale = 0;
i.mask.width = cc.winSize.width;
i.mask.height = cc.winSize.height;
i.node.active = !0;
i.node.runAction(cc.sequence(cc.spawn(cc.fadeIn(.15), cc.scaleTo(.15, 1.1)), cc.scaleTo(.15, 1), c)).easing(cc.easeSineOut());
}
};
t.prototype.onClickBack = function() {
this.dismissDialog();
this.backCallback && this.backCallback();
};
t.prototype.onClickContinue = function() {
this.dismissDialog();
this.continueCallback && this.continueCallback();
};
t.prototype.dismissDialog = function() {
var e = this;
cc.isValid(e.node) && e.node.runAction(cc.sequence(cc.scaleTo(.08, 1.1), cc.scaleTo(.1, 0), cc.callFunc(function() {
if (cc.isValid(e.node)) {
e.node.active = !1;
e.body.active = !1;
}
e.node.removeFromParent();
}, e.node))).easing(cc.easeIn(3));
};
__decorate([ r(cc.Node) ], t.prototype, "mask", void 0);
__decorate([ r(cc.Node) ], t.prototype, "body", void 0);
__decorate([ r(cc.Label) ], t.prototype, "amountLabel", void 0);
return t = __decorate([ a ], t);
}(cc.Component);
o.default = c;
cc._RF.pop();
}, {
"../../Framework/UI/LabelManager": "LabelManager"
} ]
}, {}, [ "CountDown", "Toast", "WinDialog", "GameRoom", "GameRoomController", "GestureSelector", "LifeController", "ResultController", "Hall", "Launcher", "Loading", "CommonEventName", "CommonFunction", "CommonPrefabMgr", "Global", "GameManager", "User", "UserManager", "Language", "ResManager", "LabelManager", "NodeManager", "PrefabManager", "SpineManager", "SpriteManager", "CountDownUtil", "LocalStorageMgr", "NativeUtil" ]);