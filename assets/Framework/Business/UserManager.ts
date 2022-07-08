import ResManager from "../Resources/ResManager";
import LocalStorageMgr from "../Utils/LocalStorageMgr";

class UserManager {


    private static userNames = ["Sam", "Barney", "Lili", "Kate", "Katherine", "James", "Bob", "Carl"];
    private static INIT_COIN = 1000;
    private static currentUser = null;

    public static createRandomUser() {
        let user = {};
        let id = parseInt((Math.random() * 100000000).toString());
        let randomNameIndex = Math.random() * this.userNames.length;
        let name = this.userNames[parseInt(randomNameIndex.toString())];
        let avatarIndex = parseInt((Math.random() * ResManager.userAvatars.length).toString());
        user = {
            id: id,
            name: name,
            coin: this.INIT_COIN,
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