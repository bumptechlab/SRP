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
        } while (curLoginUser.id == opponent.id || curLoginUser.avatar == opponent.avatar || curLoginUser.name == opponent.name)//对手的ID，头像，名字不能跟当前用户一样

        this.setCurOpponent(opponent);
        return opponent;
    }

    /**
     * 初始化一个房间
     * @param roomKind
     */
    public static createRoom(roomKind: number) {
        let opponent = this.createOpponent();
        let initLife = 0;
        if (roomKind == GameManager.ROOM_KIND.ONE) {
            initLife = 1;
        } else if (roomKind == GameManager.ROOM_KIND.THREE) {
            initLife = 3;
        } else if (roomKind == GameManager.ROOM_KIND.FIVE) {
            initLife = 5;
        }
        opponent["life"] = initLife;

        let loginUser = UserManager.getLoginUser();
        loginUser["life"] = initLife;
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
