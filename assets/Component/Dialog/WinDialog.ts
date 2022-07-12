// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import LabelManager from "../../Framework/UI/LabelManager";
import BaseDialog from "./BaseDialog";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WinDialog extends BaseDialog {

    @property(cc.Label)
    amountLabel: cc.Label = null;

    private backCallback = null;
    private continueCallback = null;

    public showDialog(amount: number, backCallback, continueCallback) {
        let self = this;
        self.backCallback = backCallback;
        self.continueCallback = continueCallback;
        let amountText = "";
        if (amount >= 0) {
            amountText = "+" + amount;
        } else {
            amountText = "" + amount;
        }
        LabelManager.setLabelString(self.amountLabel, amountText);
        super.showDialog();
    }

    protected onClickBack() {
        this.dismissDialog();
        if (this.backCallback) {
            this.backCallback()
        }
    }

    protected onClickContinue() {
        this.dismissDialog();
        if (this.continueCallback) {
            this.continueCallback()
        }
    }

}