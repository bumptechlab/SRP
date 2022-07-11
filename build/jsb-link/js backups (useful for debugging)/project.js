window.__require = function e(t, o, n) {
function a(c, i) {
if (!o[c]) {
if (!t[c]) {
var s = c.split("/");
s = s[s.length - 1];
if (!t[s]) {
var l = "function" == typeof __require && __require;
if (!i && l) return l(s, !0);
if (r) return r(s, !0);
throw new Error("Cannot find module '" + c + "'");
}
}
var u = o[c] = {
exports: {}
};
t[c][0].call(u.exports, function(e) {
return a(t[c][1][e] || e);
}, u, u.exports, e, t, o, n);
}
return o[c].exports;
}
for (var r = "function" == typeof __require && __require, c = 0; c < n.length; c++) a(n[c]);
return a;
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
var n = e("./CommonFunction"), a = e("../Resources/ResManager"), r = e("../UI/PrefabManager"), c = e("./Global"), i = function() {
function e() {}
e.createToast = function(e, t) {
void 0 === t && (t = c.default.Config.layerZOrder.Toast);
var o = n.default.getSceneCanvas();
if (cc.isValid(o)) {
var i = o.getChildByName("Toast");
i && o.removeChild(i);
}
var s = a.default.common.prefab.toast;
r.default.getPrefabIns(s, function(n) {
if (cc.isValid(o) && n) {
o.addChild(n, t);
n.getComponent("Toast") && n.getComponent("Toast").init(e);
n.x = 0;
n.y = 0;
}
});
};
return e;
}();
o.default = i;
cc._RF.pop();
}, {
"../Resources/ResManager": "ResManager",
"../UI/PrefabManager": "PrefabManager",
"./CommonFunction": "CommonFunction",
"./Global": "Global"
} ],
GameManager: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "4f2a86rJIhCIoZ9hUBSfFat", "GameManager");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("./UserManager"), a = function() {
function e() {}
e.createOpponent = function() {
var e = n.default.getLoginUser(), t = n.default.createRandomUser(!0);
do {
t = n.default.createRandomUser(!0);
} while (e.id == t.id);
this.setCurOpponent(t);
return t;
};
e.setCurOpponent = function(e) {
this.curOpponent = e;
};
e.getCurOpponent = function() {
return this.curOpponent;
};
e.setCurRoomKind = function(e) {
this.curRoomKind = e;
};
e.getCurRoomKind = function() {
return this.curRoomKind;
};
e.updateOpponentCoin = function(e) {
this.curOpponent && (this.curOpponent.coin = e);
};
e.ROOM_KIND = cc.Enum({
ONE: 0,
THREE: 1,
FIVE: 2
});
e.roomInfo = {
roomOne: {
limit: 1e3
},
roomThree: {
limit: 1e3
},
roomFive: {
limit: 1e3
}
};
e.betAmount = 10;
return e;
}();
o.default = a;
cc._RF.pop();
}, {
"./UserManager": "UserManager"
} ],
GameRoom: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "2bba1H6FkFBErZNu3KKrYYJ", "GameRoom");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../../Framework/UI/SpriteManager"), a = e("../../Framework/Resources/ResManager"), r = e("../../Framework/Business/GameManager"), c = cc._decorator, i = c.ccclass, s = c.property, l = function(e) {
__extends(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.titleSprite = null;
return t;
}
t.prototype.onLoad = function() {
this.initRoom();
};
t.prototype.initRoom = function() {
var e = r.default.getCurRoomKind();
n.default.loadSprite(this.titleSprite, a.default.room.texture.roomTitle[e]);
};
t.prototype.onClickBack = function() {
cc.director.loadScene("Hall");
};
__decorate([ s(cc.Sprite) ], t.prototype, "titleSprite", void 0);
return t = __decorate([ i ], t);
}(cc.Component);
o.default = l;
cc._RF.pop();
}, {
"../../Framework/Business/GameManager": "GameManager",
"../../Framework/Resources/ResManager": "ResManager",
"../../Framework/UI/SpriteManager": "SpriteManager"
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
Toast: 8e3
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
var n = e("../../Framework/Business/UserManager"), a = e("../../Framework/UI/LabelManager"), r = e("../../Framework/Business/GameManager"), c = e("../../Framework/Base/CommonPrefabMgr"), i = e("../../Framework/UI/SpriteManager"), s = e("../../Framework/Resources/ResManager"), l = e("../../Framework/Resources/Language"), u = cc.js.formatStr, f = e("../../Framework/Utils/NativeUtil"), d = cc._decorator, p = d.ccclass, m = d.property, g = function(e) {
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
i.default.loadSprite(this.avatarSprite, t);
a.default.setLabelString(this.nameLabel, e.name);
a.default.setLabelString(this.idLabel, e.id);
a.default.setLabelString(this.coinLabel, e.coin);
};
t.prototype.onClickCheckin = function() {};
t.prototype.onClickGuide = function() {};
t.prototype.onClickSetting = function() {};
t.prototype.onClickRoomOne = function() {
n.default.getLoginUser().coin < r.default.roomInfo.roomOne.limit ? c.default.createToast(l.default.common.notEnoughMoney) : this.setCurShowState(this.STATE_MATCH, r.default.ROOM_KIND.ONE);
};
t.prototype.onClickRoomThree = function() {
n.default.getLoginUser().coin < r.default.roomInfo.roomThree.limit ? c.default.createToast(l.default.common.notEnoughMoney) : this.setCurShowState(this.STATE_MATCH, r.default.ROOM_KIND.THREE);
};
t.prototype.onClickRoomFive = function() {
n.default.getLoginUser().coin < r.default.roomInfo.roomFive.limit ? c.default.createToast(l.default.common.notEnoughMoney) : this.setCurShowState(this.STATE_MATCH, r.default.ROOM_KIND.FIVE);
};
t.prototype.onClickBeginMatch = function() {
r.default.createOpponent();
r.default.setCurRoomKind(this.currentRoomKind);
cc.director.loadScene("GameRoom");
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
i.default.loadSprite(this.roomTitleSprite, s.default.room.texture.roomTitle[t]);
i.default.loadSprite(this.meMatchAvatarSprite, s.default.common.texture.userAvatars[o.avatar]);
a.default.setLabelString(this.betTipsLabel, u(l.default.common.betAmountTips, r.default.betAmount));
this.currentRoomKind = t;
}
};
t.prototype.onKeyUp = function(e) {
e.keyCode == cc.macro.KEY.back && f.default.quitGame();
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
return t = __decorate([ p ], t);
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
var n = e("../../Framework/Utils/NativeUtil"), a = e("../../Framework/Business/UserManager"), r = cc._decorator, c = r.ccclass, i = (r.property, 
function(e) {
__extends(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
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
o.default = i;
cc._RF.pop();
}, {
"../../Framework/Business/UserManager": "UserManager",
"../../Framework/Utils/NativeUtil": "NativeUtil"
} ],
Loading: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "b7e4780HsVNypzwv6PTvZdF", "Loading");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../../Framework/Utils/NativeUtil"), a = e("../../Framework/Business/UserManager"), r = e("../../Framework/Base/CommonEventName"), c = cc._decorator, i = c.ccclass, s = (c.property, 
function(e) {
__extends(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {};
t.prototype.onEnable = function() {
cc.director.on(r.default.EVENT_APPLE_LOGIN_RESULT, this.onAppLoginResult, this);
cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
};
t.prototype.onDisable = function() {
cc.director.off(r.default.EVENT_APPLE_LOGIN_RESULT, this.onAppLoginResult, this);
cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
};
t.prototype.onKeyUp = function(e) {
e.keyCode == cc.macro.KEY.back && n.default.quitGame();
};
t.prototype.onGuestLogin = function() {
a.default.guestLogin() && cc.director.loadScene("Hall");
};
t.prototype.onAppleLogin = function() {
n.default.appleLogin();
};
t.prototype.onAppLoginResult = function(e, t) {};
return t = __decorate([ i ], t);
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
var n = e("./LocalStorageMgr"), a = e("../Base/CommonEventName"), r = function() {
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
o.default = r;
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
var a = t.sprite[n].nodePath, r = t.sprite[n].resPath, c = t.sprite[n].spriteName, i = null;
i = "" == a || "/" == a ? e : cc.find(a, e);
if (cc.isValid(i) && r) {
var s = this.getAssetByPath(r, "sprite", c, o);
if (s) {
console.log("NodeManager ==》子节点[%s]，从内存中加载图片：%s", a, r);
UIDepend.SpriteManager.setSpriteFrame(i, s);
} else {
console.log("NodeManager ==》子节点[%s]，内存中找不到图片，动态加载：%s", a, r);
c ? UIDepend.SpriteManager.loadSpriteAtlasForNode(i, r, c) : UIDepend.SpriteManager.loadSpriteForNode(i, r);
}
}
}
}
if (t.font) {
console.log("NodeManager ======= 字体加载开始，父节点[%s] =======", e.name);
for (n = 0; n < t.font.length; n++) {
a = t.font[n].nodePath, r = t.font[n].resPath;
var l = t.font[n].spacingX, u = null;
u = "" == a || "/" == a ? e : cc.find(a, e);
if (cc.isValid(u) && r) {
var f = this.getAssetByPath(r, "font");
if (f) {
console.log("NodeManager ==》子节点[%s]，从内存中加载字体：%s", a, r);
UIDepend.LabelManager.setFont(u, f, l);
} else {
console.log("NodeManager ==》子节点[%s]，内存中找不到字体，动态加载：%s", a, r);
UIDepend.LabelManager.loadFont(u, r, l);
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
var r = "";
if (-1 != e.indexOf("/")) {
var c = e.split("/");
r = c[c.length - 1];
} else r = e;
return a.find(function(e) {
return "sprite" == t ? e instanceof cc.SpriteFrame && e.name == r : "font" == t && (e instanceof cc.Font && e.name == r);
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
prefab: {
toast: "common/prefab/Toast"
},
texture: {
userAvatars: [ "common/texture/home_img_head1", "common/texture/home_img_head4" ],
userAvatarsVS: [ "common/texture/home_img_head2", "common/texture/home_img_head3" ]
}
};
e.room = {
texture: {
roomTitle: [ "gameRoom/texture/title_room_one", "gameRoom/texture/title_room_three", "gameRoom/texture/title_room_five" ]
}
};
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
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
var r = this.getSpine(e);
cc.isValid(r) && t && cc.loader.loadRes(t, sp.SkeletonData, function(e, t) {
if (e) cc.error(e.message || e); else if (cc.isValid(r)) {
var c = 0, i = "", s = !0;
if (o) {
c = o.trackIndex || 0;
i = o.name || "";
null != o.loop && void 0 != o.loop && (s = o.loop);
}
r.skeletonData = t;
r.setAnimation(c, i, s);
"function" == typeof a && r.setEventListener(function(e, t) {
a(e, t);
});
"function" == typeof n && r.setCompleteListener(function() {
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
var r = this.getSpine(e);
cc.isValid(r) && t && cc.loader.loadRes(t, sp.SkeletonData, function(e, t) {
if (e) cc.error(e.message || e); else if (cc.isValid(r)) {
var c = 0, i = "", s = !0, l = "";
if (o) {
c = o.trackIndex || 0;
i = o.name || "";
null != o.loop && void 0 != o.loop && (s = o.loop);
l = o.skin || "";
}
r.skeletonData = t;
"" != l && r.setSkin(l);
"function" == typeof a && r.setCompleteListener(function() {
a();
});
r.findAnimation(i) ? r.setAnimation(c, i, s) : cc.log("[SpineManager] 找不到动画名称: " + i);
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
var r = e.getComponent(cc.Sprite);
this.loadSpriteAtlas(r, t, o, n, a);
}
};
e.loadSpriteAtlas = function(e, t, o, n, a) {
var r = this;
if (cc.isValid(e) && t && o) {
var c = r.atlasCache[t];
if (c) {
var i = c.getSpriteFrame(o);
if (i) {
e.spriteFrame = i;
"function" == typeof n && n();
} else "function" == typeof a && a();
} else cc.loader.loadRes(t, cc.SpriteAtlas, function(c, i) {
if (!c && i) {
r.restrictAtlasCache();
r.atlasCache[t] = i;
var s = i.getSpriteFrame(o);
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
e.getSpriteFromCommonAtlas = function(e, t) {
if (!e || !t) return null;
var o = /^\/|\/$/g;
e = e.replace(o, "");
var n = CommonDepend.CommonAtlasMgr.atlasRes(), a = n && n.commongame ? n.commongame.replace(o, "") : "", r = n && n.cardtype ? n.cardtype.replace(o, "") : "", c = n && n.gameHead ? n.gameHead.replace(o, "") : "", i = null;
e == a ? i = CommonDepend.CommonAtlasMgr.atlas : e == r ? i = CommonDepend.CommonAtlasMgr.cattleAtlas : e == c && (i = CommonDepend.CommonAtlasMgr.userHeadAtlas);
var s = null;
i && (s = i.getSpriteFrame(t));
return s;
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
var r = new cc.SpriteFrame(t);
if (r) {
a.spriteFrame = r;
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
var n = cc._decorator, a = n.ccclass, r = n.property, c = function(e) {
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
__decorate([ r(cc.Label) ], t.prototype, "message", void 0);
return t = __decorate([ a ], t);
}(cc.Component);
o.default = c;
cc._RF.pop();
}, {} ],
UserManager: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "e9d0a6ZPV9E35L2SR5nWjRo", "UserManager");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../Resources/ResManager"), a = e("../Utils/LocalStorageMgr"), r = function() {
function e() {}
e.createRandomUser = function(e) {
var t = 1e4 + parseInt((1e4 * Math.random()).toString()), o = Math.random() * this.userNames.length, a = this.userNames[parseInt(o.toString())], r = parseInt((Math.random() * n.default.common.texture.userAvatars.length).toString()), c = this.INIT_COIN;
e && (c = Math.random() * this.INIT_COIN * 10);
return {
id: t,
name: a,
coin: c,
avatar: r
};
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
e.setLoginUser = function(e) {
this.currentUser = e;
};
e.updateUserCoin = function(e) {
this.currentUser && (this.currentUser.coin = e);
a.default.saveLoginUser(this.currentUser);
};
e.userNames = [ "Sam", "Barney", "Lili", "Kate", "Katherine", "James", "Bob", "Carl" ];
e.INIT_COIN = 1e3;
e.currentUser = null;
return e;
}();
o.default = r;
cc._RF.pop();
}, {
"../Resources/ResManager": "ResManager",
"../Utils/LocalStorageMgr": "LocalStorageMgr"
} ]
}, {}, [ "Toast", "GameRoom", "Hall", "Launcher", "Loading", "CommonEventName", "CommonFunction", "CommonPrefabMgr", "Global", "GameManager", "UserManager", "Language", "ResManager", "LabelManager", "NodeManager", "PrefabManager", "SpineManager", "SpriteManager", "LocalStorageMgr", "NativeUtil" ]);