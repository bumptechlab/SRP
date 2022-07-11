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

const {ccclass, property} = cc._decorator;

@ccclass
export default class WinDialog extends cc.Component {

    @property(cc.Node)
    mask: cc.Node = null;

    @property(cc.Node)
    body: cc.Node = null;

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
        let bodyCallback = cc.callFunc(function () {

        });

        let popDialogShown = cc.callFunc(function () {
            if (cc.isValid(self.body)) {
                self.body.active = true;
                self.body.runAction(cc.sequence(
                    cc.delayTime(0.04),
                    cc.fadeIn(0.2),
                    cc.delayTime(0.1),
                    bodyCallback
                ));
            }
        });

        if (cc.isValid(self.node)) {
            self.node.setPosition(0, 0);
            self.node.opacity = 0;
            self.node.scale = 0;
            self.mask.width = cc.winSize.width;
            self.mask.height = cc.winSize.height;
            self.node.active = true;
            self.node.runAction(cc.sequence(
                cc.spawn(
                    cc.fadeIn(0.15),
                    cc.scaleTo(0.15, 1.1),
                ),
                cc.scaleTo(0.15, 1.0),
                popDialogShown,
            )).easing(cc.easeSineOut());
        }
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

    public dismissDialog() {
        let self = this;
        if (cc.isValid(self.node)) {
            self.node.runAction(cc.sequence(
                cc.scaleTo(0.08, 1.1),
                cc.scaleTo(0.1, 0),
                cc.callFunc(function () {
                    if (cc.isValid(self.node)) {
                        self.node.active = false;
                        self.body.active = false;
                    }
                    self.node.removeFromParent();
                }, self.node)
            )).easing(cc.easeIn(3.0));
        }
    }
}