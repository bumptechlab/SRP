import UserManager from "./UserManager";
import GameRoomController from "../../Component/GameRoom/GameRoomController";
import User from "./User";

export default class GameManager {

    //房间类型
    static ROOM_KIND = cc.Enum({
        ONE: 0,           //一局定胜负
        THREE: 1,             // 三局两胜
        FIVE: 2    // 五局三胜
    });

    //出拳结果
    static RESULT = cc.Enum({
        SCISSORS: 0,           //剪刀
        ROCK: 1,             // 石头
        PAPER: 2    // 步
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
    public static createRoom(roomKind: number) {

        let room = new GameRoomController();
        let opponent = this.createOpponent();
        let initLife = 0;
        let maxRound = 0;
        if (roomKind == GameManager.ROOM_KIND.ONE) {
            initLife = 1;
            maxRound = 1;
        } else if (roomKind == GameManager.ROOM_KIND.THREE) {
            initLife = 3;
            maxRound = 3;
        } else if (roomKind == GameManager.ROOM_KIND.FIVE) {
            initLife = 5;
            maxRound = 5;
        }
        opponent.life = initLife;

        let loginUser = UserManager.getLoginUser();
        loginUser.life = initLife;

        room.me = loginUser;
        room.opponent = opponent;
        room.roomKind = roomKind;
        room.maxRound = maxRound;
        room.curRound = 0;

        this.setCurRoom(room);
        return room;
    }

    public static setCurRoom(room: GameRoomController) {
        this.curRoom = room;
    }

    public static getCurRoom() {
        return this.curRoom;
    }

}
