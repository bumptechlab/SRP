package com.rock.paper.scissors.util;

import com.rock.paper.scissors.event.QuitGameEvent;

import org.greenrobot.eventbus.EventBus;

public class EngineBridge {


    public static void quitGame() {
        EventBus.getDefault().post(new QuitGameEvent());
    }
}
