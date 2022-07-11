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
import GameManager from "../../Framework/Business/GameManager";
import LifeController from "./LifeController";
import UserManager from "../../Framework/Business/UserManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameRoom extends cc.Component {

    @property(cc.Sprite)
    titleSprite: cc.Sprite = null;

    @property(LifeController)
    meLifeController: LifeController = null;

    @property(LifeController)
    opponentLifeController: LifeController = null;

    protected onLoad(): void {
        this.initRoom();
    }

    private initRoom() {
        let curRoomKind = GameManager.getCurRoomKind();
        SpriteManager.loadSprite(this.titleSprite, ResManager.room.texture.roomTitle[curRoomKind]);
        if (cc.isValid(this.meLifeController)) {
            this.meLifeController.init(UserManager.getLoginUser());
        }
        if (cc.isValid(this.opponentLifeController)) {
            this.opponentLifeController.init(GameManager.getCurOpponent());
        }
    }


    protected onClickBack() {
        cc.director.loadScene("Hall");
    }

}
