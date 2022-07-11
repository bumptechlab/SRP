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