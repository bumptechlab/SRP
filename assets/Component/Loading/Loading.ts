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
export default class Loading extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    onLoad() {
    }

    protected onEnable(): void {
        let self = this;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, self.onKeyUp, this);
    }

    protected onDisable(): void {
        let self = this;
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, self.onKeyUp, self);
    }

    public onKeyUp(event): void {
        if (event.keyCode == cc.macro.KEY.back) {
            NativeUtil.quitGame();
        }
    }
}
