import UserManager from "../../Framework/Business/UserManager";
import User from "../../Framework/Business/User";

class GameRoomController {

    public me: User = null;
    public opponent: User = null;
    public roomKind: number = 0;
    public maxRound: number = 0;
    public curRound: number = 0;


    public updateOpponentCoin(coin: number) {
        if (this.opponent) {
            this.opponent.coin = coin;
        }
    }

    public updateMyCoin(coin: number) {
        if (this.me) {
            this.me.coin = coin;
        }
        UserManager.updateUserCoin(coin);
    }


    public

}

export default GameRoomController;