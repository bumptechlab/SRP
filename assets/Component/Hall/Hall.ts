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
import GameManager from "../../Framework/Business/GameManager";
import CommonPrefabMgr from "../../Framework/Base/CommonPrefabMgr";
import SpriteManager from "../../Framework/UI/SpriteManager";
import ResManager from "../../Framework/Resources/ResManager";
import Language from "../../Framework/Resources/Language";
import NativeUtil from "../../Framework/Utils/NativeUtil";
import formatStr = cc.js.formatStr;
import CommonAudioMgr from "../../Framework/Base/CommonAudioMgr";
import CommonFunction from "../../Framework/Base/CommonFunction";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Hall extends cc.Component {

    private STATE_HALL = 0;
    private STATE_MATCH = 1;

    @property(cc.Node)
    hallLayout: cc.Node = null;

    @property(cc.Sprite)
    avatarSprite: cc.Sprite = null;

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    idLabel: cc.Label = null;

    @property(cc.Label)
    coinLabel: cc.Label = null;

    @property(cc.Node)
    homeLogo: cc.Node = null;

    @property(cc.Node)
    matchLayout: cc.Node = null;

    @property(cc.Sprite)
    roomTitleSprite: cc.Sprite = null;

    @property(cc.Sprite)
    meMatchAvatarSprite: cc.Sprite = null;

    @property(cc.Label)
    betTipsLabel: cc.Label = null;

    protected onLoad() {
        let self = this;
        console.log("=== Hall onLoad ===");
        CommonAudioMgr.playMusic(ResManager.common.audio.bgm, true, 1);
        self.initUserInfo();
    }

    protected onEnable(): void {
        let self = this;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, self.onKeyUp, this);
    }

    protected onDisable(): void {
        let self = this;
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, self.onKeyUp, self);
    }

    private initUserInfo(): void {
        let self = this;
        let user = UserManager.getLoginUser();
        let avatarPath = ResManager.common.texture.userAvatars[user.avatar];
        SpriteManager.loadSprite(self.avatarSprite, avatarPath);
        LabelManager.setLabelString(self.nameLabel, user.name);
        LabelManager.setLabelString(self.idLabel, user.id);
        LabelManager.setLabelString(self.coinLabel, user.coin);
    }

    protected onClickCheckin(event): void {
        CommonFunction.clickManager(event.target);
        CommonAudioMgr.playEffect(ResManager.common.audio.btnClick);
    }

    protected onClickGuide(event): void {
        CommonFunction.clickManager(event.target);
        CommonAudioMgr.playEffect(ResManager.common.audio.btnClick);
    }

    protected onClickSetting(event): void {
        CommonFunction.clickManager(event.target);
        CommonAudioMgr.playEffect(ResManager.common.audio.btnClick);
    }

    protected onClickRoomOne(event): void {
        CommonFunction.clickManager(event.target);
        CommonAudioMgr.playEffect(ResManager.common.audio.btnClick);

        let user = UserManager.getLoginUser();
        if (user.coin < GameManager.roomInfo.roomOne.limit) {
            CommonPrefabMgr.createToast(Language.common.notEnoughMoney);
            return;
        }
        this.setCurShowState(this.STATE_MATCH, GameManager.ROOM_KIND.ONE);
    }

    protected onClickRoomThree(event): void {
        CommonFunction.clickManager(event.target);
        CommonAudioMgr.playEffect(ResManager.common.audio.btnClick);

        let user = UserManager.getLoginUser();
        if (user.coin < GameManager.roomInfo.roomThree.limit) {
            CommonPrefabMgr.createToast(Language.common.notEnoughMoney);
            return;
        }
        this.setCurShowState(this.STATE_MATCH, GameManager.ROOM_KIND.THREE);
    }

    protected onClickRoomFive(event): void {
        CommonFunction.clickManager(event.target);
        CommonAudioMgr.playEffect(ResManager.common.audio.btnClick);

        let user = UserManager.getLoginUser();
        if (user.coin < GameManager.roomInfo.roomFive.limit) {
            CommonPrefabMgr.createToast(Language.common.notEnoughMoney);
            return;
        }
        this.setCurShowState(this.STATE_MATCH, GameManager.ROOM_KIND.FIVE);
    }

    private currentRoomKind;

    protected onClickBeginMatch(event): void {
        CommonFunction.clickManager(event.target);
        CommonAudioMgr.playEffect(ResManager.common.audio.btnClick);

        GameManager.enterRoom(this.currentRoomKind);
    }

    public setCurShowState(state: number, roomKind?: number) {
        if (state == this.STATE_HALL) {
            this.hallLayout.active = true;
            this.homeLogo.active = true;
            this.matchLayout.active = false;
        } else {
            this.hallLayout.active = false;
            this.homeLogo.active = false;
            this.matchLayout.active = true;

            let loginUser = UserManager.getLoginUser();
            SpriteManager.loadSprite(this.roomTitleSprite, ResManager.room.texture.roomTitle[roomKind]);
            SpriteManager.loadSprite(this.meMatchAvatarSprite, ResManager.common.texture.userAvatars[loginUser.avatar]);
            LabelManager.setLabelString(this.betTipsLabel, formatStr(Language.common.betAmountTips, GameManager.betAmount));
            this.currentRoomKind = roomKind;
        }
    }

    public onKeyUp(event): void {
        if (event.keyCode == cc.macro.KEY.back) {
            NativeUtil.quitGame();
        }
    }

    protected onDestroy(): void {

    }
}
