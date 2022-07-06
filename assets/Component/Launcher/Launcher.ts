// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import Color = cc.Color;

const {ccclass, property} = cc._decorator;

@ccclass
export default class Launcher extends cc.Component {


    onLoad() {
        //设置背景色
        cc.director.setClearColor(cc.color().fromHEX("#FFFFFF"));

        setTimeout(function () {
            cc.director.loadScene('Loading');
        },5000)
    }

    start() {
    }

    // update (dt) {}
}
