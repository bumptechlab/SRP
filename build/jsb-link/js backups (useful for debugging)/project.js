window.__require = function e(t, o, n) {
function a(r, c) {
if (!o[r]) {
if (!t[r]) {
var s = r.split("/");
s = s[s.length - 1];
if (!t[s]) {
var l = "function" == typeof __require && __require;
if (!c && l) return l(s, !0);
if (i) return i(s, !0);
throw new Error("Cannot find module '" + r + "'");
}
}
var u = o[r] = {
exports: {}
};
t[r][0].call(u.exports, function(e) {
return a(t[r][1][e] || e);
}, u, u.exports, e, t, o, n);
}
return o[r].exports;
}
for (var i = "function" == typeof __require && __require, r = 0; r < n.length; r++) a(n[r]);
return a;
}({
BaseDialog: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "14bdehL0z9MPKq50KveFAqL", "BaseDialog");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../../Framework/Base/CommonFunction"), a = e("../../Framework/Base/CommonAudioMgr"), i = e("../../Framework/Resources/ResManager"), r = cc._decorator, c = r.ccclass, s = r.property, l = function(e) {
__extends(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.mask = null;
t.body = null;
return t;
}
t.prototype.showDialog = function(e) {
var t = this, o = cc.callFunc(function() {
e && e();
}), n = cc.callFunc(function() {
if (cc.isValid(t.body)) {
t.body.active = !0;
t.body.runAction(cc.sequence(cc.delayTime(.04), cc.fadeIn(.2), cc.delayTime(.1), o));
}
});
if (cc.isValid(t.node)) {
t.node.setPosition(0, 0);
t.node.opacity = 0;
t.node.scale = 0;
t.mask.width = cc.winSize.width;
t.mask.height = cc.winSize.height;
t.node.active = !0;
t.node.runAction(cc.sequence(cc.spawn(cc.fadeIn(.15), cc.scaleTo(.15, 1.1)), cc.scaleTo(.15, 1), n)).easing(cc.easeSineOut());
}
};
t.prototype.dismissDialog = function(e) {
var t = this, o = cc.callFunc(function() {
e && e();
});
cc.isValid(t.node) && t.node.runAction(cc.sequence(cc.scaleTo(.08, 1.1), cc.scaleTo(.1, 0), cc.callFunc(function() {
if (cc.isValid(t.node)) {
t.node.active = !1;
t.body.active = !1;
}
t.node.removeFromParent();
}, t.node), o)).easing(cc.easeIn(3));
};
t.prototype.onClickCloseBtn = function(e) {
n.default.clickManager(e.target);
a.default.playEffect(i.default.common.audio.btnClick);
this.dismissDialog();
};
__decorate([ s(cc.Node) ], t.prototype, "mask", void 0);
__decorate([ s(cc.Node) ], t.prototype, "body", void 0);
return t = __decorate([ c ], t);
}(cc.Component);
o.default = l;
cc._RF.pop();
}, {
"../../Framework/Base/CommonAudioMgr": "CommonAudioMgr",
"../../Framework/Base/CommonFunction": "CommonFunction",
"../../Framework/Resources/ResManager": "ResManager"
} ],
CommonAudioMgr: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "41d11WF1eVPeon98lXB57lo", "CommonAudioMgr");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../Utils/LocalStorageMgr"), a = function() {
function e() {}
e.init = function() {
this.EffectListArr = [];
this.AudioMusicArray = [];
this.AudioEffectArray = [];
this.AudioMusicFile = null;
this.MaxAudioMusicLength = 1;
this.MaxAudioEffectLength = 3;
this.AUDIO_MUSIC_VOLUME = 1;
this.AUDIO_EFFECT_VOLUME = .5;
this.MusicID = -1;
this.changeEffectSwitch();
};
e.changeEffectSwitch = function() {
var e = n.default.readEffectSwitch();
this.IS_OPEN_EFFECT = !e || "true" == e;
};
e.playEffect = function(e, t, o, n, a) {
void 0 === t && (t = !1);
void 0 === o && (o = this.AUDIO_EFFECT_VOLUME);
void 0 === n && (n = null);
void 0 === a && (a = null);
var i = this;
if (i.IS_OPEN_EFFECT && e) {
void 0 == t && (t = !1);
void 0 == o && (o = i.AUDIO_EFFECT_VOLUME);
cc.loader.loadRes(e, function(r, c) {
if (r) {
console.log("playEffect: " + e + " err=>" + r);
a && a();
} else {
var s = cc.audioEngine.play(c, t, o);
i.AudioEffectArray.push(s);
cc.audioEngine.setFinishCallback(s, function() {
a && a();
});
n && n(s);
}
});
if (i.AudioEffectArray.length >= i.MaxAudioEffectLength) {
var r = i.AudioEffectArray.shift();
i.safeStopEffect(r);
}
} else a && a();
};
e.playMultiEffect = function(e, t, o, n, a, i) {
var r = this;
if (r.IS_OPEN_EFFECT && e) {
void 0 == t && (t = !1);
void 0 == o && (o = r.AUDIO_EFFECT_VOLUME);
i && i(r.EffectListArr, 22);
if (r.EffectListArr.length >= 22) {
a && a(-1);
return;
}
cc.loader.loadRes(e, function(i, c) {
if (i) {
console.log("playMultiEffect: " + e + " err=>" + i);
a && a(-1);
} else {
var s = cc.audioEngine.play(c, t, o);
-1 != s && r.EffectListArr.push(s);
cc.audioEngine.setFinishCallback(s, function() {
var e = r.EffectListArr.indexOf(s);
e > -1 && r.EffectListArr.splice(e, 1);
a && a(s);
});
n && n(s);
}
});
} else a && a(-1);
};
e.playMusic = function(e, t, o) {
var a = this, i = "true", r = n.default.readMusicSwitch();
null != r && (i = r);
if ("false" != i) if (a.AudioMusicFile != e) {
void 0 == t && (t = !0);
void 0 == o && (o = a.AUDIO_MUSIC_VOLUME);
"true" == i && cc.loader.loadRes(e, function(n, i) {
if (n) console.log("play Music: " + e + " err=>" + n); else {
a.stopAll();
var r = cc.audioEngine.playMusic(i, t);
cc.audioEngine.setMusicVolume(o);
a.MusicID = r;
a.AudioMusicFile = e;
}
});
} else console.log("音乐正在播放，不能重复播放：%s", e); else a.stopMusic();
};
e.playMusicWithNoLoop = function(t, o, a, i) {
void 0 === a && (a = !1);
void 0 === i && (i = e.AUDIO_MUSIC_VOLUME);
var r = this, c = "true", s = n.default.readMusicSwitch();
null != s && (c = s);
if ("false" != c) if (r.AudioMusicFile != t) {
void 0 == a && (a = !1);
void 0 == i && (i = r.AUDIO_MUSIC_VOLUME);
"true" == c && cc.loader.loadRes(t, function(e, n) {
if (e) {
console.log("play Music: " + t + " err=>" + e);
o && o();
} else {
r.stopAll();
var c = cc.audioEngine.playMusic(n, a);
cc.audioEngine.setMusicVolume(i);
cc.audioEngine.setFinishCallback(c, function() {
o && o();
});
r.AudioMusicFile = t;
}
});
} else console.log("音乐正在播放，不能重复播放：%s", t); else this.stopMusic();
};
e.stopMusic = function() {
this.AudioMusicFile = null;
if (cc.audioEngine.getState(this.MusicID) != cc.audioEngine.AudioState.STOPPED && cc.audioEngine.getState(this.MusicID) != cc.audioEngine.AudioState.ERROR) {
cc.audioEngine.stopMusic();
this.MusicID = -1;
}
};
e.stopEffect = function(e) {
if (e) {
this.safeStopEffect(e);
var t = this.EffectListArr.indexOf(e);
t > -1 && this.EffectListArr.splice(t, 1);
}
};
e.safeStopEffect = function(e) {
cc.audioEngine.getState(e) != cc.audioEngine.AudioState.STOPPED && cc.audioEngine.getState(e) != cc.audioEngine.AudioState.ERROR && cc.audioEngine.stop(e);
};
e.pauseAll = function() {
cc.audioEngine.pauseAll();
};
e.resumeAll = function() {
cc.audioEngine.resumeAll();
};
e.stopAll = function() {
this.AudioMusicFile = null;
this.EffectListArr = [];
cc.audioEngine.stopAll();
};
e.IS_OPEN_EFFECT = !0;
return e;
}();
o.default = a;
cc._RF.pop();
}, {
"../Utils/LocalStorageMgr": "LocalStorageMgr"
} ],
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
e.clickManager = function(e, t) {
void 0 === t && (t = 1500);
if (cc.isValid(e)) {
var o = e.getComponent(cc.Button);
cc.isValid(o) && (o.interactable = !1);
var n = setTimeout(function() {
cc.isValid(o) && (o.interactable = !0);
clearInterval(n);
}, t);
}
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
var n = e("./CommonFunction"), a = e("../Resources/ResManager"), i = e("../UI/PrefabManager"), r = e("./Global"), c = e("../../Component/Dialog/WinDialog"), s = e("../../Component/Dialog/UserDialog"), l = e("../../Component/Dialog/SettingDialog"), u = e("../../Component/Dialog/RuleDialog"), f = function() {
function e() {}
e.createToast = function(e, t) {
void 0 === t && (t = r.default.Config.layerZOrder.Toast);
var o = n.default.getSceneCanvas();
if (cc.isValid(o)) {
var c = o.getChildByName("Toast");
c && o.removeChild(c);
}
var s = a.default.common.prefab.toast;
i.default.getPrefabIns(s, function(n) {
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
i.default.getPrefab(a.default.room.prefab.winDialog, function(n) {
if (n) {
var a = cc.instantiate(n);
if (a) {
cc.isValid(s) && s.addChild(a, r.default.Config.layerZOrder.Dialog);
a.getComponent(c.default) && a.getComponent(c.default).showDialog(e, t, o);
}
}
});
};
e.showLostDialog = function(e, t, o) {
var s = n.default.getSceneCanvas();
i.default.getPrefab(a.default.room.prefab.lostDialog, function(n) {
if (n) {
var a = cc.instantiate(n);
if (a) {
cc.isValid(s) && s.addChild(a, r.default.Config.layerZOrder.Dialog);
a.getComponent(c.default) && a.getComponent(c.default).showDialog(e, t, o);
}
}
});
};
e.showDrawDialog = function(e, t, o) {
var s = n.default.getSceneCanvas();
i.default.getPrefab(a.default.room.prefab.drawDialog, function(n) {
if (n) {
var a = cc.instantiate(n);
if (a) {
cc.isValid(s) && s.addChild(a, r.default.Config.layerZOrder.Dialog);
a.getComponent(c.default) && a.getComponent(c.default).showDialog(e, t, o);
}
}
});
};
e.showUserDialog = function(e) {
var t = n.default.getSceneCanvas();
i.default.getPrefab(a.default.common.prefab.userDialog, function(o) {
if (o) {
var n = cc.instantiate(o);
if (n) {
cc.isValid(t) && t.addChild(n, r.default.Config.layerZOrder.Dialog);
n.getComponent(s.default) && n.getComponent(s.default).showDialog(e);
}
}
});
};
e.showSettingDialog = function() {
var e = n.default.getSceneCanvas();
i.default.getPrefab(a.default.common.prefab.settingDialog, function(t) {
if (t) {
var o = cc.instantiate(t);
if (o) {
cc.isValid(e) && e.addChild(o, r.default.Config.layerZOrder.Dialog);
o.getComponent(l.default) && o.getComponent(l.default).showDialog();
}
}
});
};
e.showRuleDialog = function() {
var e = n.default.getSceneCanvas();
i.default.getPrefab(a.default.common.prefab.ruleDialog, function(t) {
if (t) {
var o = cc.instantiate(t);
if (o) {
cc.isValid(e) && e.addChild(o, r.default.Config.layerZOrder.Dialog);
o.getComponent(u.default) && o.getComponent(u.default).showDialog();
}
}
});
};
return e;
}();
o.default = f;
cc._RF.pop();
}, {
"../../Component/Dialog/RuleDialog": "RuleDialog",
"../../Component/Dialog/SettingDialog": "SettingDialog",
"../../Component/Dialog/UserDialog": "UserDialog",
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
this._leftTs = 0;
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
var n = e("../../Framework/Utils/CountDownUtil"), a = e("../../Framework/UI/SpriteManager"), i = e("../../Framework/Resources/ResManager"), r = cc._decorator, c = r.ccclass, s = (r.property, 
function(e) {
__extends(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.COUNT_DOWN_TAG = 12030;
t.countDownUtil = null;
t.numberSprites = [];
t.countdownCallback = null;
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
t.prototype.init = function(e) {
this.countdownCallback = e;
};
t.prototype.countDownCallback = function(e) {
var t = e.toString();
this.numberSprites.length != t.length && this.createNumberSprites(t.length);
for (var o = 0; o < t.length; o++) {
var n = parseInt(t.substr(o, 1)), r = i.default.common.texture.numbers[n];
a.default.loadSpriteForNode(this.numberSprites[o], r);
}
e <= 0 && (this.node.active = !1);
this.countdownCallback && this.countdownCallback(e);
};
t.prototype.createNumberSprites = function(e) {
this.node.removeAllChildren();
this.numberSprites = [];
for (var t = 0; t < e; t++) {
var o = a.default.createSpriteNode("number" + t);
this.node.addChild(o);
this.numberSprites[t] = o;
}
};
t.prototype.startCountDown = function(e) {
this.node.active = !0;
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
var n = e("./UserManager"), a = e("../../Component/GameRoom/GameRoomController"), i = e("../Base/CommonPrefabMgr"), r = e("../Resources/Language"), c = function() {
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
i.default.createToast(r.default.common.notEnoughMoney);
};
e.createRoom = function(e) {
var t = n.default.getLoginUser();
if (t.coin < this.betAmount) return null;
var o = this.createOpponent(), i = new a.default();
i.initRoom(e, t, o);
var r = t.coin - this.betAmount;
i.updateMyCoin(r);
this.setCurRoom(i);
return i;
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
var n = e("../../Framework/Business/UserManager"), a = e("../../Framework/Business/GameManager"), i = function() {
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
if (this.roomKind == a.default.ROOM_KIND.ONE) {
e = 1;
t = 1;
} else if (this.roomKind == a.default.ROOM_KIND.THREE) {
e = 3;
t = 2;
} else if (this.roomKind == a.default.ROOM_KIND.FIVE) {
e = 5;
t = 3;
}
var o = this.me;
o.life = e;
o.isWinner = !1;
o.gesture = a.default.GESTURE.NONE;
o.winCount = 0;
var n = this.opponent;
n.life = e;
n.isWinner = !1;
n.gesture = a.default.GESTURE.NONE;
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
} else if (e.gesture == a.default.GESTURE.PAPER && t.gesture == a.default.GESTURE.ROCK) {
e.isWinner = !0;
t.isWinner = !1;
} else if (e.gesture == a.default.GESTURE.PAPER && t.gesture == a.default.GESTURE.SCISSORS) {
e.isWinner = !1;
t.isWinner = !0;
} else if (e.gesture == a.default.GESTURE.ROCK && t.gesture == a.default.GESTURE.PAPER) {
e.isWinner = !1;
t.isWinner = !0;
} else if (e.gesture == a.default.GESTURE.ROCK && t.gesture == a.default.GESTURE.SCISSORS) {
e.isWinner = !0;
t.isWinner = !1;
} else if (e.gesture == a.default.GESTURE.SCISSORS && t.gesture == a.default.GESTURE.ROCK) {
e.isWinner = !1;
t.isWinner = !0;
} else if (e.gesture == a.default.GESTURE.SCISSORS && t.gesture == a.default.GESTURE.PAPER) {
e.isWinner = !0;
t.isWinner = !1;
}
};
return e;
}();
o.default = i;
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
var n = e("../../Framework/UI/SpriteManager"), a = e("../../Framework/Resources/ResManager"), i = e("../../Framework/Business/GameManager"), r = e("./LifeController"), c = e("./ResultController"), s = e("../../Framework/UI/SpineManager"), l = e("./GestureSelector"), u = e("../../Framework/Base/CommonPrefabMgr"), f = e("../Common/CountDown"), d = e("../../Framework/Resources/Language"), m = e("../../Framework/Base/CommonAudioMgr"), p = e("../../Framework/Base/CommonFunction"), g = cc._decorator, h = g.ccclass, C = g.property, _ = function(e) {
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
t.COUNT_DOWN_TIME = 10;
return t;
}
t.prototype.onLoad = function() {
m.default.playMusic(a.default.common.audio.bgm, !0, 1);
this.curRoom = i.default.getCurRoom();
this.initRoom();
this.playVsAnimation();
};
t.prototype.startNewGame = function() {
var e = i.default.createRoom(this.curRoom.roomKind);
if (null != e) {
this.curRoom = e;
this.initRoom();
this.playVsAnimation();
} else {
u.default.createToast(d.default.common.notEnoughMoney);
this.onBackBtnClick();
}
};
t.prototype.initRoom = function() {
n.default.loadSprite(this.titleSprite, a.default.room.texture.roomTitle[this.curRoom.roomKind]);
var e = this.curRoom.me, t = this.curRoom.opponent;
this.updateLife(e, t);
this.updateResult(e, t, !1);
this.setControlVisible(!1);
if (cc.isValid(this.gestureSelector)) {
this.gestureSelector.init(this.onSelectGesture.bind(this));
this.gestureSelector.selectGesture(i.default.GESTURE.NONE);
}
cc.isValid(this.countDown) && this.countDown.init(this.countdownCallback.bind(this));
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
s.default.loadSpine(this.vsSkeleton, a.default.room.animation.vs, {
name: "animation",
loop: !1
}, function() {
e.setControlVisible(!0);
cc.isValid(e.countDown) && e.countDown.startCountDown(e.COUNT_DOWN_TIME);
});
};
t.prototype.updateLife = function(e, t) {
cc.isValid(this.meLifeController) && this.meLifeController.init(e);
cc.isValid(this.opponentLifeController) && this.opponentLifeController.init(t);
};
t.prototype.updateResult = function(e, t, o) {
cc.isValid(this.meResultController) && this.meResultController.init(e, o);
cc.isValid(this.opponentResultController) && this.opponentResultController.init(t, o);
};
t.prototype.beginMatch = function(e) {
var t = this;
cc.isValid(t.countDown) && t.countDown.stopCountDown();
t.curRoom.beginMatch(e, function(e, o, n) {
if (n) {
if (e.isWinner) {
var a = 2 * i.default.betAmount;
t.curRoom.updateMyCoin(e.coin + a);
u.default.showWinDialog(a, t.onBackBtnClick.bind(t), t.onContinueBtnClick.bind(t));
} else if (o.isWinner) {
var r = -i.default.betAmount, c = 2 * i.default.betAmount;
t.curRoom.updateOpponentCoin(o.coin + c);
u.default.showLostDialog(r, t.onBackBtnClick.bind(t), t.onContinueBtnClick.bind(t));
}
cc.isValid(t.countDown) && t.countDown.stopCountDown();
} else cc.isValid(t.countDown) && t.countDown.startCountDown(t.COUNT_DOWN_TIME);
var s = !1, l = "";
if (e.isWinner || o.isWinner) e.isWinner ? l = e.name : o.isWinner && (l = o.name); else {
s = !0;
l = "Nobody";
}
console.log("Round-%s, winner is %s, isGameOver=%s", t.curRoom.curRound, l, t.curRoom.isGameOver);
t.updateLife(e, o);
t.updateResult(e, o, s);
cc.isValid(t.gestureSelector) && t.gestureSelector.selectGesture(i.default.GESTURE.NONE);
});
};
t.prototype.countdownCallback = function(e) {
console.log("Round-%s countdown: %s, isGameOver=%s", this.curRoom.curRound, e, this.curRoom.isGameOver);
if (!this.curRoom.isGameOver && e <= 0) {
var t = this.gestureSelector.getSelectedGesture();
t == i.default.GESTURE.NONE && (t = parseInt((3 * Math.random()).toString()));
this.beginMatch(t);
}
};
t.prototype.onBackBtnClick = function() {
this.curRoom.resetRoom();
cc.director.loadScene("Hall");
};
t.prototype.onContinueBtnClick = function() {
this.startNewGame();
};
t.prototype.onSelectGesture = function(e) {};
t.prototype.onClickConfirm = function(e) {
p.default.clickManager(e.target);
m.default.playEffect(a.default.common.audio.btnClick);
var t = this.gestureSelector.getSelectedGesture();
t != i.default.GESTURE.NONE ? this.beginMatch(t) : u.default.createToast(d.default.common.notSelectGesture);
};
t.prototype.onDestroy = function() {
cc.isValid(this.countDown) && this.countDown.stopCountDown();
};
__decorate([ C(cc.Sprite) ], t.prototype, "titleSprite", void 0);
__decorate([ C(r.default) ], t.prototype, "meLifeController", void 0);
__decorate([ C(r.default) ], t.prototype, "opponentLifeController", void 0);
__decorate([ C(c.default) ], t.prototype, "meResultController", void 0);
__decorate([ C(c.default) ], t.prototype, "opponentResultController", void 0);
__decorate([ C(sp.Skeleton) ], t.prototype, "vsSkeleton", void 0);
__decorate([ C(l.default) ], t.prototype, "gestureSelector", void 0);
__decorate([ C(f.default) ], t.prototype, "countDown", void 0);
return t = __decorate([ h ], t);
}(cc.Component);
o.default = _;
cc._RF.pop();
}, {
"../../Framework/Base/CommonAudioMgr": "CommonAudioMgr",
"../../Framework/Base/CommonFunction": "CommonFunction",
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
var n = e("../../Framework/Business/GameManager"), a = e("../../Framework/Base/CommonFunction"), i = e("../../Framework/Base/CommonAudioMgr"), r = e("../../Framework/Resources/ResManager"), c = cc._decorator, s = c.ccclass, l = c.property, u = function(e) {
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
a.default.clickManager(e.target);
i.default.playEffect(r.default.common.audio.btnClick);
console.log("Select gesture: data=" + t);
var o = parseInt(t);
this.selectGesture(o);
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
this.selectCallback && this.selectCallback(e);
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
__decorate([ l(cc.Node) ], t.prototype, "scissorNode", void 0);
__decorate([ l(cc.Node) ], t.prototype, "rockNode", void 0);
__decorate([ l(cc.Node) ], t.prototype, "paperNode", void 0);
return t = __decorate([ s ], t);
}(cc.Component);
o.default = u;
cc._RF.pop();
}, {
"../../Framework/Base/CommonAudioMgr": "CommonAudioMgr",
"../../Framework/Base/CommonFunction": "CommonFunction",
"../../Framework/Business/GameManager": "GameManager",
"../../Framework/Resources/ResManager": "ResManager"
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
var n = e("../../Framework/Business/UserManager"), a = e("../../Framework/UI/LabelManager"), i = e("../../Framework/Business/GameManager"), r = e("../../Framework/Base/CommonPrefabMgr"), c = e("../../Framework/UI/SpriteManager"), s = e("../../Framework/Resources/ResManager"), l = e("../../Framework/Resources/Language"), u = e("../../Framework/Utils/NativeUtil"), f = cc.js.formatStr, d = e("../../Framework/Base/CommonAudioMgr"), m = e("../../Framework/Base/CommonFunction"), p = cc._decorator, g = p.ccclass, h = p.property, C = function(e) {
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
console.log("=== Hall onLoad ===");
d.default.playMusic(s.default.common.audio.bgm, !0, 1);
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
a.default.setLabelString(this.nameLabel, e.name);
a.default.setLabelString(this.idLabel, e.id);
a.default.setLabelString(this.coinLabel, e.coin);
};
t.prototype.onClickCheckin = function(e) {
m.default.clickManager(e.target);
d.default.playEffect(s.default.common.audio.btnClick);
};
t.prototype.onClickGuide = function(e) {
m.default.clickManager(e.target);
d.default.playEffect(s.default.common.audio.btnClick);
r.default.showRuleDialog();
};
t.prototype.onClickSetting = function(e) {
m.default.clickManager(e.target);
d.default.playEffect(s.default.common.audio.btnClick);
r.default.showSettingDialog();
};
t.prototype.onClickRoomOne = function(e) {
m.default.clickManager(e.target);
d.default.playEffect(s.default.common.audio.btnClick);
n.default.getLoginUser().coin < i.default.roomInfo.roomOne.limit ? r.default.createToast(l.default.common.notEnoughMoney) : this.setCurShowState(this.STATE_MATCH, i.default.ROOM_KIND.ONE);
};
t.prototype.onClickRoomThree = function(e) {
m.default.clickManager(e.target);
d.default.playEffect(s.default.common.audio.btnClick);
n.default.getLoginUser().coin < i.default.roomInfo.roomThree.limit ? r.default.createToast(l.default.common.notEnoughMoney) : this.setCurShowState(this.STATE_MATCH, i.default.ROOM_KIND.THREE);
};
t.prototype.onClickRoomFive = function(e) {
m.default.clickManager(e.target);
d.default.playEffect(s.default.common.audio.btnClick);
n.default.getLoginUser().coin < i.default.roomInfo.roomFive.limit ? r.default.createToast(l.default.common.notEnoughMoney) : this.setCurShowState(this.STATE_MATCH, i.default.ROOM_KIND.FIVE);
};
t.prototype.onClickBeginMatch = function(e) {
m.default.clickManager(e.target);
d.default.playEffect(s.default.common.audio.btnClick);
i.default.enterRoom(this.currentRoomKind);
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
a.default.setLabelString(this.betTipsLabel, f(l.default.common.betAmountTips, i.default.betAmount));
this.currentRoomKind = t;
}
};
t.prototype.onKeyUp = function(e) {
e.keyCode == cc.macro.KEY.back && u.default.quitGame();
};
t.prototype.onDestroy = function() {};
__decorate([ h(cc.Node) ], t.prototype, "hallLayout", void 0);
__decorate([ h(cc.Sprite) ], t.prototype, "avatarSprite", void 0);
__decorate([ h(cc.Label) ], t.prototype, "nameLabel", void 0);
__decorate([ h(cc.Label) ], t.prototype, "idLabel", void 0);
__decorate([ h(cc.Label) ], t.prototype, "coinLabel", void 0);
__decorate([ h(cc.Node) ], t.prototype, "homeLogo", void 0);
__decorate([ h(cc.Node) ], t.prototype, "matchLayout", void 0);
__decorate([ h(cc.Sprite) ], t.prototype, "roomTitleSprite", void 0);
__decorate([ h(cc.Sprite) ], t.prototype, "meMatchAvatarSprite", void 0);
__decorate([ h(cc.Label) ], t.prototype, "betTipsLabel", void 0);
return t = __decorate([ g ], t);
}(cc.Component);
o.default = C;
cc._RF.pop();
}, {
"../../Framework/Base/CommonAudioMgr": "CommonAudioMgr",
"../../Framework/Base/CommonFunction": "CommonFunction",
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
cc.loader.loadRes(t, cc.Font, function(t, a) {
if (t) cc.error(t.message || t); else if (cc.isValid(e)) {
e instanceof cc.Label || e instanceof cc.Node && (e = e.getComponent(cc.Label));
if (cc.isValid(e)) {
e.font = a;
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
betAmountTips: "A match will cost %s gold",
notSelectGesture: "Please choose your gesture"
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
var n = e("../../Framework/Utils/NativeUtil"), a = e("../../Framework/Business/UserManager"), i = e("../../Framework/Base/CommonAudioMgr"), r = cc._decorator, c = r.ccclass, s = (r.property, 
function(e) {
__extends(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
i.default.init();
n.default.init();
cc.Camera.main.backgroundColor = cc.color().fromHEX("#FFFFFF");
a.default.initLoginUser() ? this.gotoHallDelay() : this.gotoLoadingDelay();
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
return t = __decorate([ c ], t);
}(cc.Component));
o.default = s;
cc._RF.pop();
}, {
"../../Framework/Base/CommonAudioMgr": "CommonAudioMgr",
"../../Framework/Business/UserManager": "UserManager",
"../../Framework/Utils/NativeUtil": "NativeUtil"
} ],
LifeController: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "35c08m9ktRI3qnxKf4ysetX", "LifeController");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../../Framework/UI/SpriteManager"), a = e("../../Framework/Resources/ResManager"), i = e("../../Framework/UI/LabelManager"), r = e("../../Framework/Base/CommonPrefabMgr"), c = e("../../Framework/Base/CommonFunction"), s = e("../../Framework/Base/CommonAudioMgr"), l = cc._decorator, u = l.ccclass, f = l.property, d = function(e) {
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
var t = a.default.common.texture.userAvatars[e.avatar];
n.default.loadSprite(this.avatarSprite, t);
i.default.setLabelString(this.nameLabel, e.name);
this.updateLifeCount(e.life);
this.user = e;
}
};
t.prototype.updateLifeCount = function(e) {
if (cc.isValid(this.lifeCount)) {
this.lifeCount.removeAllChildren();
for (var t = 0; t < e; t++) {
var o = n.default.createSpriteNode("life");
o.y = 5;
this.lifeCount.addChild(o);
n.default.loadSpriteForNode(o, a.default.room.texture.life);
}
}
};
t.prototype.onClickAvatar = function(e) {
c.default.clickManager(e.target);
s.default.playEffect(a.default.common.audio.btnClick);
r.default.showUserDialog(this.user);
};
__decorate([ f(cc.Sprite) ], t.prototype, "avatarSprite", void 0);
__decorate([ f(cc.Label) ], t.prototype, "nameLabel", void 0);
__decorate([ f(cc.Node) ], t.prototype, "lifeCount", void 0);
return t = __decorate([ u ], t);
}(cc.Component);
o.default = d;
cc._RF.pop();
}, {
"../../Framework/Base/CommonAudioMgr": "CommonAudioMgr",
"../../Framework/Base/CommonFunction": "CommonFunction",
"../../Framework/Base/CommonPrefabMgr": "CommonPrefabMgr",
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
var n = e("../../Framework/Utils/NativeUtil"), a = e("../../Framework/Business/UserManager"), i = e("../../Framework/Base/CommonEventName"), r = e("../../Framework/Base/CommonFunction"), c = e("../../Framework/Base/CommonAudioMgr"), s = e("../../Framework/Resources/ResManager"), l = cc._decorator, u = l.ccclass, f = (l.property, 
function(e) {
__extends(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {};
t.prototype.onEnable = function() {
cc.director.on(i.default.EVENT_APPLE_LOGIN_RESULT, this.onAppLoginResult, this);
cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
};
t.prototype.onDisable = function() {
cc.director.off(i.default.EVENT_APPLE_LOGIN_RESULT, this.onAppLoginResult, this);
cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
};
t.prototype.onKeyUp = function(e) {
e.keyCode == cc.macro.KEY.back && n.default.quitGame();
};
t.prototype.onGuestLogin = function(e) {
r.default.clickManager(e.target);
c.default.playEffect(s.default.common.audio.btnClick);
a.default.guestLogin() && cc.director.loadScene("Hall");
};
t.prototype.onAppleLogin = function(e) {
r.default.clickManager(e.target);
c.default.playEffect(s.default.common.audio.btnClick);
n.default.appleLogin();
};
t.prototype.onAppLoginResult = function(e, t) {};
return t = __decorate([ u ], t);
}(cc.Component));
o.default = f;
cc._RF.pop();
}, {
"../../Framework/Base/CommonAudioMgr": "CommonAudioMgr",
"../../Framework/Base/CommonEventName": "CommonEventName",
"../../Framework/Base/CommonFunction": "CommonFunction",
"../../Framework/Business/UserManager": "UserManager",
"../../Framework/Resources/ResManager": "ResManager",
"../../Framework/Utils/NativeUtil": "NativeUtil"
} ],
LocalStorageMgr: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "76cc7xRj6NBBbXuOYbH8IYy", "LocalStorageMgr");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../Base/CommonAudioMgr"), a = function() {
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
var t = cc.sys.localStorage.getItem("_local" + e);
return 1 == t || "true" == t;
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
e.saveMusicSwitch = function(e) {
this.saveData("_sound", e);
};
e.readMusicSwitch = function() {
return this.readData("_sound");
};
e.saveEffectSwitch = function(e) {
this.saveData("_effect", e);
n.default.changeEffectSwitch();
};
e.readEffectSwitch = function() {
return this.readData("_effect");
};
return e;
}();
o.default = a;
cc._RF.pop();
}, {
"../Base/CommonAudioMgr": "CommonAudioMgr"
} ],
NativeUtil: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "9cb6byZwNZPHKjrtMtR8XGx", "NativeUtil");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("./LocalStorageMgr"), a = e("../Base/CommonEventName"), i = function() {
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
o.default = i;
cc.onAppleLoginResult = function(e, t) {
console.log("onAppleLoginResult: state=%s, data=%s", e, t);
var o = {};
t && (o = JSON.parse(t));
cc.director.emit(a.default.EVENT_APPLE_LOGIN_RESULT, e, o);
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
var a = t.sprite[n].nodePath, i = t.sprite[n].resPath, r = t.sprite[n].spriteName, c = null;
c = "" == a || "/" == a ? e : cc.find(a, e);
if (cc.isValid(c) && i) {
var s = this.getAssetByPath(i, "sprite", r, o);
if (s) {
console.log("NodeManager ==》子节点[%s]，从内存中加载图片：%s", a, i);
UIDepend.SpriteManager.setSpriteFrame(c, s);
} else {
console.log("NodeManager ==》子节点[%s]，内存中找不到图片，动态加载：%s", a, i);
r ? UIDepend.SpriteManager.loadSpriteAtlasForNode(c, i, r) : UIDepend.SpriteManager.loadSpriteForNode(c, i);
}
}
}
}
if (t.font) {
console.log("NodeManager ======= 字体加载开始，父节点[%s] =======", e.name);
for (n = 0; n < t.font.length; n++) {
a = t.font[n].nodePath, i = t.font[n].resPath;
var l = t.font[n].spacingX, u = null;
u = "" == a || "/" == a ? e : cc.find(a, e);
if (cc.isValid(u) && i) {
var f = this.getAssetByPath(i, "font");
if (f) {
console.log("NodeManager ==》子节点[%s]，从内存中加载字体：%s", a, i);
UIDepend.LabelManager.setFont(u, f, l);
} else {
console.log("NodeManager ==》子节点[%s]，内存中找不到字体，动态加载：%s", a, i);
UIDepend.LabelManager.loadFont(u, i, l);
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
var a = CommonDepend.ResourceManager.getResByGameId(n);
if (!a) return null;
var i = "";
if (-1 != e.indexOf("/")) {
var r = e.split("/");
i = r[r.length - 1];
} else i = e;
return a.find(function(e) {
return "sprite" == t ? e instanceof cc.SpriteFrame && e.name == i : "font" == t && (e instanceof cc.Font && e.name == i);
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
var a = cc.instantiate(n);
if (a) {
o.addChild(a, Cocos20.Global.layerZOrder.Dialog);
"function" == typeof t && t(a);
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
var a = cc.instantiate(n);
a ? "function" == typeof t && t(a) : o && o();
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
audio: {
bgm: "common/audio/bgm",
btnClick: "common/audio/btn_click"
},
prefab: {
toast: "common/prefab/Toast",
userDialog: "common/prefab/UserDialog",
settingDialog: "common/prefab/SettingDialog",
ruleDialog: "common/prefab/RuleDialog"
},
texture: {
userAvatars: [ "common/texture/home_img_head1", "common/texture/home_img_head4" ],
userAvatarsVS: [ "common/texture/home_img_head2", "common/texture/home_img_head3" ],
numbers: [ "common/texture/number/0", "common/texture/number/1", "common/texture/number/2", "common/texture/number/3", "common/texture/number/4", "common/texture/number/5", "common/texture/number/6", "common/texture/number/7", "common/texture/number/8", "common/texture/number/9" ],
off: "common/texture/icon_off",
on: "common/texture/icon_on"
}
};
e.room = {
texture: {
roomTitle: [ "gameRoom/texture/title_room_one", "gameRoom/texture/title_room_three", "gameRoom/texture/title_room_five" ],
gesture: [ "gameRoom/texture/scissor", "gameRoom/texture/rock", "gameRoom/texture/paper" ],
life: "gameRoom/texture/life",
winner: "gameRoom/texture/winner",
draw: "gameRoom/texture/draw"
},
animation: {
vs: "gameRoom/animation/VS"
},
prefab: {
winDialog: "gameRoom/prefab/WinDialog",
lostDialog: "gameRoom/prefab/LostDialog",
drawDialog: "gameRoom/prefab/DrawDialog"
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
var n = e("../../Framework/UI/SpriteManager"), a = e("../../Framework/Resources/ResManager"), i = e("../../Framework/Base/CommonPrefabMgr"), r = e("../../Framework/Base/CommonFunction"), c = e("../../Framework/Base/CommonAudioMgr"), s = cc._decorator, l = s.ccclass, u = s.property, f = function(e) {
__extends(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.avatarSprite = null;
t.gestureSprite = null;
t.winnerSprite = null;
t.highlightSprite = null;
t.user = null;
return t;
}
t.prototype.init = function(e, t) {
if (e) {
var o = a.default.common.texture.userAvatarsVS[e.avatar];
n.default.loadSprite(this.avatarSprite, o);
var i = a.default.room.texture.gesture[e.gesture];
i ? n.default.loadSprite(this.gestureSprite, i) : n.default.setSpriteFrame(this.gestureSprite, null);
t ? n.default.loadSprite(this.winnerSprite, a.default.room.texture.draw) : e.isWinner ? n.default.loadSprite(this.winnerSprite, a.default.room.texture.winner) : n.default.setSpriteFrame(this.winnerSprite, null);
cc.isValid(this.highlightSprite) && (this.highlightSprite.node.active = e.isWinner);
this.user = e;
}
};
t.prototype.onClickAvatar = function(e) {
r.default.clickManager(e.target);
c.default.playEffect(a.default.common.audio.btnClick);
i.default.showUserDialog(this.user);
};
__decorate([ u(cc.Sprite) ], t.prototype, "avatarSprite", void 0);
__decorate([ u(cc.Sprite) ], t.prototype, "gestureSprite", void 0);
__decorate([ u(cc.Sprite) ], t.prototype, "winnerSprite", void 0);
__decorate([ u(cc.Sprite) ], t.prototype, "highlightSprite", void 0);
return t = __decorate([ l ], t);
}(cc.Component);
o.default = f;
cc._RF.pop();
}, {
"../../Framework/Base/CommonAudioMgr": "CommonAudioMgr",
"../../Framework/Base/CommonFunction": "CommonFunction",
"../../Framework/Base/CommonPrefabMgr": "CommonPrefabMgr",
"../../Framework/Resources/ResManager": "ResManager",
"../../Framework/UI/SpriteManager": "SpriteManager"
} ],
RuleDialog: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "b0f26WCoIxJr4UmgVThXiaf", "RuleDialog");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("./BaseDialog"), a = cc._decorator, i = a.ccclass, r = (a.property, function(e) {
__extends(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
return t = __decorate([ i ], t);
}(n.default));
o.default = r;
cc._RF.pop();
}, {
"./BaseDialog": "BaseDialog"
} ],
SettingDialog: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "0a94fsQ6XxAuKytp5t84673", "SettingDialog");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("./BaseDialog"), a = e("../../Framework/Utils/LocalStorageMgr"), i = e("../../Framework/UI/SpriteManager"), r = e("../../Framework/Resources/ResManager"), c = e("../../Framework/Base/CommonFunction"), s = e("../../Framework/Base/CommonAudioMgr"), l = cc._decorator, u = l.ccclass, f = l.property, d = function(e) {
__extends(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.musicSwitch = null;
t.effectSwitch = null;
return t;
}
t.prototype.onLoad = function() {
this.initSwitch();
};
t.prototype.initSwitch = function() {
"false" == a.default.readMusicSwitch() ? i.default.loadSprite(this.musicSwitch, r.default.common.texture.off) : i.default.loadSprite(this.musicSwitch, r.default.common.texture.on);
"false" == a.default.readEffectSwitch() ? i.default.loadSprite(this.effectSwitch, r.default.common.texture.off) : i.default.loadSprite(this.effectSwitch, r.default.common.texture.on);
};
t.prototype.onClickMusicSwitch = function(e) {
c.default.clickManager(e.target);
s.default.playEffect(r.default.common.audio.btnClick);
var t = a.default.readMusicSwitch();
t = "false" == t ? "true" : "false";
a.default.saveMusicSwitch(t);
this.initSwitch();
"false" == t ? s.default.stopAll() : s.default.playMusic(r.default.common.audio.bgm, !0, 1);
};
t.prototype.onClickEffectSwitch = function(e) {
c.default.clickManager(e.target);
s.default.playEffect(r.default.common.audio.btnClick);
var t = a.default.readEffectSwitch();
t = "false" == t ? "true" : "false";
a.default.saveEffectSwitch(t);
this.initSwitch();
};
__decorate([ f(cc.Sprite) ], t.prototype, "musicSwitch", void 0);
__decorate([ f(cc.Sprite) ], t.prototype, "effectSwitch", void 0);
return t = __decorate([ u ], t);
}(n.default);
o.default = d;
cc._RF.pop();
}, {
"../../Framework/Base/CommonAudioMgr": "CommonAudioMgr",
"../../Framework/Base/CommonFunction": "CommonFunction",
"../../Framework/Resources/ResManager": "ResManager",
"../../Framework/UI/SpriteManager": "SpriteManager",
"../../Framework/Utils/LocalStorageMgr": "LocalStorageMgr",
"./BaseDialog": "BaseDialog"
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
e.loadSpine = function(e, t, o, n, a) {
var i = this.getSpine(e);
cc.isValid(i) && t && cc.loader.loadRes(t, sp.SkeletonData, function(e, t) {
if (e) cc.error(e.message || e); else if (cc.isValid(i)) {
var r = 0, c = "", s = !0;
if (o) {
r = o.trackIndex || 0;
c = o.name || "";
null != o.loop && void 0 != o.loop && (s = o.loop);
}
i.skeletonData = t;
i.setAnimation(r, c, s);
"function" == typeof a && i.setEventListener(function(e, t) {
a(e, t);
});
"function" == typeof n && i.setCompleteListener(function() {
n();
});
}
});
};
e.loadSkeleton = function(e, t, o, n) {
void 0 === n && (n = null);
var a = this.getSpine(e);
cc.isValid(a) && cc.loader.loadRes(t, sp.SkeletonData, function(e, t) {
if (e) {
cc.log(e.message || e);
n && n();
} else if (cc.isValid(a)) {
a.skeletonData = t;
o && o();
}
});
};
e.loadSpineWithSkin = function(e, t, o, n, a) {
var i = this.getSpine(e);
cc.isValid(i) && t && cc.loader.loadRes(t, sp.SkeletonData, function(e, t) {
if (e) cc.error(e.message || e); else if (cc.isValid(i)) {
var r = 0, c = "", s = !0, l = "";
if (o) {
r = o.trackIndex || 0;
c = o.name || "";
null != o.loop && void 0 != o.loop && (s = o.loop);
l = o.skin || "";
}
i.skeletonData = t;
"" != l && i.setSkin(l);
"function" == typeof a && i.setCompleteListener(function() {
a();
});
i.findAnimation(c) ? i.setAnimation(r, c, s) : cc.log("[SpineManager] 找不到动画名称: " + c);
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
cc.isValid(e) && t && cc.loader.loadRes(t, cc.SpriteFrame, function(t, a) {
if (t) {
cc.error(t.message || t);
"function" == typeof n && n();
} else if (cc.isValid(e)) {
e.spriteFrame = a;
"function" == typeof o && o();
}
});
};
e.loadSpriteAtlasForNode = function(e, t, o, n, a) {
if (cc.isValid(e)) {
var i = e.getComponent(cc.Sprite);
this.loadSpriteAtlas(i, t, o, n, a);
}
};
e.loadSpriteAtlas = function(e, t, o, n, a) {
var i = this;
if (cc.isValid(e) && t && o) {
var r = i.atlasCache[t];
if (r) {
var c = r.getSpriteFrame(o);
if (c) {
e.spriteFrame = c;
"function" == typeof n && n();
} else "function" == typeof a && a();
} else cc.loader.loadRes(t, cc.SpriteAtlas, function(r, c) {
if (!r && c) {
i.restrictAtlasCache();
i.atlasCache[t] = c;
var s = c.getSpriteFrame(o);
if (s) {
e.spriteFrame = s;
"function" == typeof n && n();
} else "function" == typeof a && a();
} else "function" == typeof a && a();
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
var a = null;
cc.isValid(e) && (e instanceof cc.Sprite ? a = e : e instanceof cc.Node && ((a = e.getComponent(cc.Sprite)) || (a = e.addComponent(cc.Sprite))));
null != a ? cc.loader.load(t, function(e, t) {
if (e) {
cc.error(e.message || e);
"function" == typeof n && n();
} else if (t && t.url && cc.isValid(a) && cc.isValid(a.node)) {
var i = new cc.SpriteFrame(t);
if (i) {
a.spriteFrame = i;
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
var n = cc._decorator, a = n.ccclass, i = n.property, r = function(e) {
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
__decorate([ i(cc.Label) ], t.prototype, "message", void 0);
return t = __decorate([ a ], t);
}(cc.Component);
o.default = r;
cc._RF.pop();
}, {} ],
UserDialog: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "d3946ZKqatDLKKo01CVP/fz", "UserDialog");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../../Framework/UI/LabelManager"), a = e("./BaseDialog"), i = e("../../Framework/Resources/ResManager"), r = e("../../Framework/UI/SpriteManager"), c = cc._decorator, s = c.ccclass, l = c.property, u = function(e) {
__extends(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.avatarSprite = null;
t.nameLabel = null;
t.idLabel = null;
t.coinLabel = null;
return t;
}
t.prototype.showDialog = function(t, o) {
e.prototype.showDialog.call(this, o);
this.initUserInfo(t);
};
t.prototype.initUserInfo = function(e) {
var t = i.default.common.texture.userAvatars[e.avatar];
t ? r.default.loadSprite(this.avatarSprite, t) : r.default.setSpriteFrame(this.avatarSprite, null);
n.default.setLabelString(this.nameLabel, e.name);
n.default.setLabelString(this.idLabel, e.id);
n.default.setLabelString(this.coinLabel, e.coin);
};
__decorate([ l(cc.Sprite) ], t.prototype, "avatarSprite", void 0);
__decorate([ l(cc.Label) ], t.prototype, "nameLabel", void 0);
__decorate([ l(cc.Label) ], t.prototype, "idLabel", void 0);
__decorate([ l(cc.Label) ], t.prototype, "coinLabel", void 0);
return t = __decorate([ s ], t);
}(a.default);
o.default = u;
cc._RF.pop();
}, {
"../../Framework/Resources/ResManager": "ResManager",
"../../Framework/UI/LabelManager": "LabelManager",
"../../Framework/UI/SpriteManager": "SpriteManager",
"./BaseDialog": "BaseDialog"
} ],
UserManager: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "e9d0a6ZPV9E35L2SR5nWjRo", "UserManager");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../Resources/ResManager"), a = e("../Utils/LocalStorageMgr"), i = e("./User"), r = e("./GameManager"), c = function() {
function e() {}
e.createRandomUser = function(e) {
var t = new i.default(), o = 1e4 + parseInt((1e4 * Math.random()).toString()), a = Math.random() * this.userNames.length, c = this.userNames[parseInt(a.toString())], s = parseInt((Math.random() * n.default.common.texture.userAvatars.length).toString()), l = this.INIT_COIN;
e && (l = parseInt((Math.random() * this.INIT_COIN * 10).toString()));
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
this.currentUser = a.default.getLoginUser();
return this.currentUser;
};
e.guestLogin = function() {
this.currentUser = a.default.getLoginUser();
if (!this.currentUser) {
this.currentUser = this.createRandomUser();
a.default.saveLoginUser(this.currentUser);
}
return this.currentUser;
};
e.getLoginUser = function() {
return this.currentUser;
};
e.updateUserCoin = function(e) {
if (this.currentUser) {
this.currentUser.coin = e;
a.default.saveLoginUser(this.currentUser);
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
var n = e("../../Framework/UI/LabelManager"), a = e("./BaseDialog"), i = e("../../Framework/Base/CommonFunction"), r = e("../../Framework/Base/CommonAudioMgr"), c = e("../../Framework/Resources/ResManager"), s = cc._decorator, l = s.ccclass, u = s.property, f = function(e) {
__extends(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.amountLabel = null;
t.backCallback = null;
t.continueCallback = null;
return t;
}
t.prototype.showDialog = function(t, o, a) {
this.backCallback = o;
this.continueCallback = a;
var i = "";
i = t >= 0 ? "+" + t : "" + t;
n.default.setLabelString(this.amountLabel, i);
e.prototype.showDialog.call(this);
};
t.prototype.onClickBack = function(e) {
i.default.clickManager(e.target);
r.default.playEffect(c.default.common.audio.btnClick);
this.dismissDialog();
this.backCallback && this.backCallback();
};
t.prototype.onClickContinue = function(e) {
i.default.clickManager(e.target);
r.default.playEffect(c.default.common.audio.btnClick);
this.dismissDialog();
this.continueCallback && this.continueCallback();
};
__decorate([ u(cc.Label) ], t.prototype, "amountLabel", void 0);
return t = __decorate([ l ], t);
}(a.default);
o.default = f;
cc._RF.pop();
}, {
"../../Framework/Base/CommonAudioMgr": "CommonAudioMgr",
"../../Framework/Base/CommonFunction": "CommonFunction",
"../../Framework/Resources/ResManager": "ResManager",
"../../Framework/UI/LabelManager": "LabelManager",
"./BaseDialog": "BaseDialog"
} ]
}, {}, [ "CountDown", "Toast", "BaseDialog", "RuleDialog", "SettingDialog", "UserDialog", "WinDialog", "GameRoom", "GameRoomController", "GestureSelector", "LifeController", "ResultController", "Hall", "Launcher", "Loading", "CommonAudioMgr", "CommonEventName", "CommonFunction", "CommonPrefabMgr", "Global", "GameManager", "User", "UserManager", "Language", "ResManager", "LabelManager", "NodeManager", "PrefabManager", "SpineManager", "SpriteManager", "CountDownUtil", "LocalStorageMgr", "NativeUtil" ]);