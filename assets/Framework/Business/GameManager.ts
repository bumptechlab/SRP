import UserManager from "./UserManager";
import GameRoomController from "../../Component/GameRoom/GameRoomController";
import User from "./User";

export default class GameManager {

    //房间类型
    static ROOM_KIND = cc.Enum({
        ONE: 0,           //一局定胜负
        THREE: 1,         // 三局两胜
        FIVE: 2           // 五局三胜
    });

    //出拳
    static GESTURE = cc.Enum({
        NONE: 100,              //没有出拳（编译系统不让用负数）
        SCISSORS: 0,           //剪刀
        ROCK: 1,               //石头
        PAPER: 2               //步
    });

    public static roomInfo = {
        roomOne: {
            limit: 10,
        },
        roomThree: {
            limit: 50,
        },
        roomFive: {
            limit: 100,
        }
    };
    public static betAmount = 10;//每一局下注金额
    private static curRoom: GameRoomController; //当前房间

    public static createOpponent(): User {
        let curLoginUser = UserManager.getLoginUser();
        let opponent = UserManager.createRandomUser(true);
        do {
            opponent = UserManager.createRandomUser(true);
        } while (curLoginUser.id == opponent.id || curLoginUser.avatar == opponent.avatar || curLoginUser.name == opponent.name)//对手的ID，头像，名字不能跟当前用户一样

        return opponent;
    }

    /**
     * 初始化一个房间
     * @param roomKind
     */
    public static enterRoom(roomKind: number) {
        let me = UserManager.getLoginUser();
        let opponent = this.createOpponent();

        let room = new GameRoomController();
        room.initRoom(roomKind, me, opponent);
        this.setCurRoom(room);

        //进入房间扣金币
        let myCoin = me.coin - this.betAmount;
        room.updateMyCoin(myCoin);

        cc.director.loadScene("GameRoom");
        return room;
    }

    public static setCurRoom(room: GameRoomController) {
        this.curRoom = room;
    }

    public static getCurRoom() {
        return this.curRoom;
    }

}
