import LocalStorageMgr from "./LocalStorageMgr";

class NativeUtil {

    static nativeClassName;

    static init() {
        this.nativeClassName = LocalStorageMgr.getNativeClassName();
        console.log("设置JavaUtil/OCUtil别名：" + this.nativeClassName);
    }

    static nativeAndroidClassName() {
        let className = "com/util/EngineBridge";
        if (this.nativeClassName) {
            className = this.nativeClassName;
        }
        return className;
    }

    static nativeiOSClasssName() {
        let className = "EngineBridge";
        if (this.nativeClassName) {
            className = this.nativeClassName;
        }
        return className;
    }


    static quitGame() {
        if (cc.sys.isNative) {
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                let className = NativeUtil.nativeAndroidClassName();
                let methodName = "quitGame";
                let methodSignature = "()V";
                jsb.reflection.callStaticMethod(className, methodName, methodSignature);
            } else if (cc.sys.os == cc.sys.OS_IOS) {
                let className = NativeUtil.nativeiOSClasssName();
                let methodName = "quitGame";
                jsb.reflection.callStaticMethod(className, methodName);
            }
        } else {
            console.log("quitGame");
        }
    }

}

export default NativeUtil;