window.__require = function e(t, o, a) {
function c(r, i) {
if (!o[r]) {
if (!t[r]) {
var l = r.split("/");
l = l[l.length - 1];
if (!t[l]) {
var s = "function" == typeof __require && __require;
if (!i && s) return s(l, !0);
if (n) return n(l, !0);
throw new Error("Cannot find module '" + r + "'");
}
}
var u = o[r] = {
exports: {}
};
t[r][0].call(u.exports, function(e) {
return c(t[r][1][e] || e);
}, u, u.exports, e, t, o, a);
}
return o[r].exports;
}
for (var n = "function" == typeof __require && __require, r = 0; r < a.length; r++) c(a[r]);
return c;
}({
Launcher: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "cc4f8FH8aJCdrQBQuLC05CZ", "Launcher");
Object.defineProperty(o, "__esModule", {
value: !0
});
var a = e("../../Framework/NativeUtil"), c = cc._decorator, n = c.ccclass, r = (c.property, 
function(e) {
__extends(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
a.default.init();
cc.director.setClearColor(cc.color().fromHEX("#FFFFFF"));
this.gotoLoadingDelay();
};
t.prototype.gotoLoadingDelay = function() {
setTimeout(function() {
cc.director.loadScene("Loading");
}, 3e3);
};
t.prototype.start = function() {};
return t = __decorate([ n ], t);
}(cc.Component));
o.default = r;
cc._RF.pop();
}, {
"../../Framework/NativeUtil": "NativeUtil"
} ],
Loading: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "b7e4780HsVNypzwv6PTvZdF", "Loading");
Object.defineProperty(o, "__esModule", {
value: !0
});
var a = e("../../Framework/NativeUtil"), c = cc._decorator, n = c.ccclass, r = c.property, i = function(e) {
__extends(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.label = null;
t.text = "hello";
return t;
}
t.prototype.onLoad = function() {};
t.prototype.onEnable = function() {
cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
};
t.prototype.onDisable = function() {
cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
};
t.prototype.onKeyUp = function(e) {
console.log("onKeyUp: keyCode=" + e.keyCode);
e.keyCode == cc.macro.KEY.back && a.default.quitGame();
};
__decorate([ r(cc.Label) ], t.prototype, "label", void 0);
__decorate([ r ], t.prototype, "text", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
o.default = i;
cc._RF.pop();
}, {
"../../Framework/NativeUtil": "NativeUtil"
} ],
LocalStorageMgr: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "76cc7xRj6NBBbXuOYbH8IYy", "LocalStorageMgr");
Object.defineProperty(o, "__esModule", {
value: !0
});
var a = function() {
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
return e;
}();
o.default = a;
cc._RF.pop();
}, {} ],
NativeUtil: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "9cb6byZwNZPHKjrtMtR8XGx", "NativeUtil");
Object.defineProperty(o, "__esModule", {
value: !0
});
var a = e("./LocalStorageMgr"), c = function() {
function e() {}
e.init = function() {
this.nativeClassName = a.default.getNativeClassName();
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
console.log("invoke quit game: className: %s, methodName: %s", t, o);
jsb.reflection.callStaticMethod(t, o, "()V");
} else if (cc.sys.os == cc.sys.OS_IOS) {
t = e.nativeiOSClasssName(), o = "quitGame";
jsb.reflection.callStaticMethod(t, o);
}
} else console.log("quitGame");
};
return e;
}();
o.default = c;
cc._RF.pop();
}, {
"./LocalStorageMgr": "LocalStorageMgr"
} ]
}, {}, [ "Launcher", "Loading", "LocalStorageMgr", "NativeUtil" ]);