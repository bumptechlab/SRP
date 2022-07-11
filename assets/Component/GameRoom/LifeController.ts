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
import LabelManager from "../../Framework/UI/LabelManager";
import NodeManager from "../../Framework/UI/NodeManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LifeController extends cc.Component {


    @property(cc.Sprite)
    avatarSprite: cc.Sprite = null;

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Node)
    lifeCount: cc.Node = null;


    public init(user) {
        if (!user) {
            return;
        }
        let avatarPath = ResManager.common.texture.userAvatars[user.avatar];
        SpriteManager.loadSprite(this.avatarSprite, avatarPath);
        LabelManager.setLabelString(this.nameLabel, user.name);
        this.updateLifeCount(user.life);
    }

    public updateLifeCount(lifeCount) {
        if (cc.isValid(this.lifeCount)) {
            this.lifeCount.removeAllChildren();
            for (let i = 0; i < lifeCount; i++) {
                let lifeNode = SpriteManager.createSpriteNode("life");
                lifeNode.y = 5;
                this.lifeCount.addChild(lifeNode);
                SpriteManager.loadSpriteForNode(lifeNode, ResManager.room.texture.life);
            }
        }
    }

}