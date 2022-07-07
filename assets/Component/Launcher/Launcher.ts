// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import NativeUtil from "../../Framework/NativeUtil";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Launcher extends cc.Component {


    protected onLoad() {
        let self = this;
        NativeUtil.init();
        //设置背景色
        cc.director.setClearColor(cc.color().fromHEX("#FFFFFF"));
        self.gotoLoadingDelay();
    }

    private gotoLoadingDelay() {
        setTimeout(function () {
            cc.director.loadScene('Loading');
        }, 3000);
    }

    protected start() {
    }

    // update (dt) {}
}
