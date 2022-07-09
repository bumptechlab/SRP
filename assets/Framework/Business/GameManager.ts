import UserManager from "./UserManager";

export default class GameManager {

    static ROOM_KIND = cc.Enum({
        ONE: 0,           //一局定胜负
        THREE: 1,             // 三局两胜
        FIVE: 2    // 五局三胜
    });

    public static roomInfo = {
        roomOne: {
            limit: 1000,
        },
        roomThree: {
            limit: 1000,
        },
        roomFive: {
            limit: 1000,
        }
    };
    public static betAmount = 10;//每一局下注金额
    private static curOpponent; //当前对手
    private static curRoomKind; //当前房间

    public static createOpponent() {
        let curLoginUser = UserManager.getLoginUser();
        let opponent = UserManager.createRandomUser(true);
        do {
            opponent = UserManager.createRandomUser(true);
        } while (curLoginUser.id == opponent.id)//不能跟跟当前登陆用户ID一致

        this.setCurOpponent(opponent);
        return opponent;
    }

    public static setCurOpponent(user) {
        this.curOpponent = user;
    }

    public static getCurOpponent() {
        return this.curOpponent;
    }

    public static setCurRoomKind(roomKind) {
        this.curRoomKind = roomKind;
    }

    public static getCurRoomKind() {
        return this.curRoomKind;
    }

    public static updateOpponentCoin(coin: number) {
        if (this.curOpponent) {
            this.curOpponent.coin = coin;
        }
    }

}
