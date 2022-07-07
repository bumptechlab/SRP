window.__require = function e(t, o, r) {
function n(i, u) {
if (!o[i]) {
if (!t[i]) {
var a = i.split("/");
a = a[a.length - 1];
if (!t[a]) {
var p = "function" == typeof __require && __require;
if (!u && p) return p(a, !0);
if (c) return c(a, !0);
throw new Error("Cannot find module '" + i + "'");
}
}
var l = o[i] = {
exports: {}
};
t[i][0].call(l.exports, function(e) {
return n(t[i][1][e] || e);
}, l, l.exports, e, t, o, r);
}
return o[i].exports;
}
for (var c = "function" == typeof __require && __require, i = 0; i < r.length; i++) n(r[i]);
return n;
}({
Launcher: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "cc4f8FH8aJCdrQBQuLC05CZ", "Launcher");
Object.defineProperty(o, "__esModule", {
value: !0
});
var r = cc._decorator, n = r.ccclass, c = (r.property, function(e) {
__extends(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
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
o.default = c;
cc._RF.pop();
}, {} ],
Loading: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "b7e4780HsVNypzwv6PTvZdF", "Loading");
Object.defineProperty(o, "__esModule", {
value: !0
});
var r = cc._decorator, n = r.ccclass, c = r.property, i = function(e) {
__extends(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.label = null;
t.text = "hello";
return t;
}
t.prototype.start = function() {};
__decorate([ c(cc.Label) ], t.prototype, "label", void 0);
__decorate([ c ], t.prototype, "text", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
o.default = i;
cc._RF.pop();
}, {} ]
}, {}, [ "Launcher", "Loading" ]);