class ResManager {


    public static common = {
        prefab: {
            toast: "common/prefab/Toast"
        },
        texture: {
            userAvatars: [
                "common/texture/home_img_head1",
                "common/texture/home_img_head4",
            ],
            userAvatarsVS: [
                "common/texture/home_img_head2",
                "common/texture/home_img_head3",
            ],
            numbers:[
                "common/texture/number/0",
                "common/texture/number/1",
                "common/texture/number/2",
                "common/texture/number/3",
                "common/texture/number/4",
                "common/texture/number/5",
                "common/texture/number/6",
                "common/texture/number/7",
                "common/texture/number/8",
                "common/texture/number/9",
            ]
        }
    }

    public static room = {
        texture: {
            roomTitle: [
                "gameRoom/texture/title_room_one",
                "gameRoom/texture/title_room_three",
                "gameRoom/texture/title_room_five"
            ],
            gesture: [
                "gameRoom/texture/scissor",
                "gameRoom/texture/rock",
                "gameRoom/texture/paper"
            ],
            life: "gameRoom/texture/life",
        },
        animation: {
            vs: "gameRoom/animation/VS"
        },
        prefab:{
            winDialog: "gameRoom/prefab/WinDialog",
            lostDialog: "gameRoom/prefab/LostDialog"
        }
    }

}

export default ResManager;