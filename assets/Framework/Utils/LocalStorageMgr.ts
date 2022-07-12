import CommonAudioMgr from "../Base/CommonAudioMgr";

class LocalStorageMgr {


    private static readData(name) {
        let data;
        data = cc.sys.localStorage.getItem("_local" + name);
        return data;
    }

    private static saveData(name, value) {
        cc.sys.localStorage.setItem("_local" + name, value);
    }

    private static clearData(name) {
        cc.sys.localStorage.removeItem("_local" + name);
    }

    private static readBoolean(key) {
        let data = cc.sys.localStorage.getItem("_local" + key);
        return data == 1 || data == 'true';
    }

    private static saveBoolean(key, value) {
        if (value == true || value == false ||
            value == 'true' || value == 'false') {
            console.log("LocalStorageMgr->saveBoolean key: " + key + " value: " + value);
        } else {
            console.log("警告: --> LocalStorageMgr->saveBoolean,参数错误，请给定Boolean型参数-> key: " + key + " value: " + value);
        }
        cc.sys.localStorage.setItem("_local" + key, value);
    }


    /**
     * NativeClassName
     */
    public static getNativeClassName() {
        return this.readData("_native_class_name");
    }

    public static getLoginUser() {
        let userJson = this.readData("_login_user");
        let user = null;
        if (userJson) {
            user = JSON.parse(userJson);
        }
        return user;
    }

    public static saveLoginUser(user) {
        let userJson = "";
        if (user) {
            userJson = JSON.stringify(user);
        }
        this.saveData("_login_user", userJson);
    }

    /**
     * 音效
     */
    public static saveMusicSwitch(music) {
        this.saveData('_sound', music);
    }

    public static readMusicSwitch() {
        return this.readData('_sound');
    }

    public static saveEffectSwitch(effect) {
        this.saveData('_effect', effect);
        CommonAudioMgr.changeEffectSwitch();
    }

    public static readEffectSwitch() {
        return this.readData('_effect');
    }

}

export default LocalStorageMgr;