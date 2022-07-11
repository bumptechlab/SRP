// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import SpriteManager from "../../Framework/UI/SpriteManager";
import ResManager from "../../Framework/Resources/ResManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ResultController extends cc.Component {

    @property(cc.Sprite)
    avatarSprite: cc.Sprite = null;

    @property(cc.Sprite)
    gestureSprite: cc.Sprite = null;

    @property(cc.Sprite)
    winnerSprite: cc.Sprite = null;

    @property(cc.Sprite)
    highlightSprite: cc.Sprite = null;


    protected onLoad(): void {

    }

    public init(user) {
        if (!user) {
            return;
        }
        let avatarPath = ResManager.common.texture.userAvatarsVS[user.avatar];
        SpriteManager.loadSprite(this.avatarSprite, avatarPath);

        let resultPath = ResManager.room.texture.gesture[user.gesture];
        if (resultPath) {
            SpriteManager.loadSprite(this.gestureSprite, resultPath);
        } else {
            SpriteManager.setSpriteFrame(this.gestureSprite, null);
        }

        if (cc.isValid(this.winnerSprite)) {
            this.winnerSprite.node.active = user.isWinner;
        }
        if (cc.isValid(this.highlightSprite)) {
            this.highlightSprite.node.active = user.isWinner;
        }
    }


}
