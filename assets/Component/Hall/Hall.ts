// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html


import UserManager from "../../Framework/Business/UserManager";
import LabelManager from "../../Framework/UI/LabelManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Hall extends cc.Component {

    @property(cc.Sprite)
    avatarSprite: cc.Sprite = null;

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    idLabel: cc.Label = null;

    @property(cc.Label)
    coinLabel: cc.Label = null;

    protected onLoad() {
        let self = this;
        self.initUserInfo();
    }

    private initUserInfo(): void {
        let self = this;
        let user = UserManager.getLoginUser();
        LabelManager.setLabelString(self.nameLabel, user.name);
        LabelManager.setLabelString(self.idLabel, user.id);
        LabelManager.setLabelString(self.coinLabel, user.coin);
    }

    protected onClickCheckin(): void {

    }

    protected onClickGuide(): void {

    }

    protected onClickSetting(): void {

    }

    protected onClickRoomOne(): void {

    }

    protected onClickRoomThree(): void {

    }

    protected onClickRoomFive(): void {

    }

}
