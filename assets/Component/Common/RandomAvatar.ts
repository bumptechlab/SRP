// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import CountDownUtil from "../../Framework/Utils/CountDownUtil";
import SpriteManager from "../../Framework/UI/SpriteManager";
import ResManager from "../../Framework/Resources/ResManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RandomAvatar extends cc.Component {


    @property([cc.SpriteFrame])
    avatarFrames: cc.SpriteFrame[] = [];

    @property(cc.Sprite)
    avatarSprite: cc.Sprite = null;

    private AVATAR_RANDOM_TAG = 2000;
    private animRunning: boolean = false;


    public startRandomAnimation(finishCallback) {
        let self = this;
        self.animRunning = true;
        let lastRandomIndex = -1;
        let changeAvatar = cc.callFunc(function () {
            let curRandomIndex = -1;
            do {
                curRandomIndex = parseInt((Math.random() * self.avatarFrames.length).toString());
            } while (curRandomIndex == lastRandomIndex);
            lastRandomIndex = curRandomIndex;
            SpriteManager.setSpriteFrame(self.avatarSprite, self.avatarFrames[curRandomIndex]);
        });
        let action = self.node.runAction(cc.repeatForever(
            cc.sequence(
                changeAvatar,
                cc.delayTime(0.1)
            )
        ));
        action.setTag(self.AVATAR_RANDOM_TAG);
        let timeout = setTimeout(function () {
            clearTimeout(timeout);
            if (!cc.isValid(self.node)) {
                return;
            }
            self.stopRandomAnimation();
            if (finishCallback) {
                finishCallback();
            }
        }, 2000);
    }

    public stopRandomAnimation() {
        let self = this;
        self.node.stopActionByTag(self.AVATAR_RANDOM_TAG);
        self.animRunning = false;
    }

    public isAnimRunning(): boolean {
        return this.animRunning;
    }

}
