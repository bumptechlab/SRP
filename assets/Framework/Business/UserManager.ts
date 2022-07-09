import ResManager from "../Resources/ResManager";
import LocalStorageMgr from "../Utils/LocalStorageMgr";

class UserManager {


    private static userNames = ["Sam", "Barney", "Lili", "Kate", "Katherine", "James", "Bob", "Carl"];
    private static INIT_COIN = 1000;
    private static currentUser = null;

    public static createRandomUser(randomCoin?) {
        let user = {};
        let id = 10000 + parseInt((Math.random() * 10000).toString());//10000 - 19999
        let randomNameIndex = Math.random() * this.userNames.length;
        let name = this.userNames[parseInt(randomNameIndex.toString())];
        let avatarIndex = parseInt((Math.random() * ResManager.common.texture.userAvatars.length).toString());
        let coin = this.INIT_COIN;
        if (randomCoin) {
            coin = Math.random() * this.INIT_COIN * 10;
        }
        user = {
            id: id,
            name: name,
            coin: coin,
            avatar: avatarIndex
        }
        return user;
    }

    public static initLoginUser() {
        this.currentUser = LocalStorageMgr.getLoginUser();
        return this.currentUser;
    }

    public static guestLogin() {
        this.currentUser = LocalStorageMgr.getLoginUser();
        if (!this.currentUser) {
            this.currentUser = this.createRandomUser();
            LocalStorageMgr.saveLoginUser(this.currentUser);
        }
        return this.currentUser;
    }

    public static getLoginUser() {
        return this.currentUser;
    }

    public static setLoginUser(loginUser) {
        this.currentUser = loginUser;
    }

    public static updateUserCoin(coin: number) {
        if (this.currentUser) {
            this.currentUser['coin'] = coin;
        }
        LocalStorageMgr.saveLoginUser(this.currentUser);
    }

}

export default UserManager