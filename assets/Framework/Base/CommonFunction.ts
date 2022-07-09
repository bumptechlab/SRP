class CommonFunction {

    static getSceneCanvas() {
        if (cc.director) {
            let directorScene = cc.director.getScene();
            if (cc.isValid(directorScene)) {
                let canvas = directorScene.getChildByName('Canvas');
                if (cc.isValid(canvas)) {
                    return canvas;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        }
        return null;
    }

}

export default CommonFunction;