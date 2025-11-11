import { MainApp } from "./mainApp";
import "./ui/keyevent"
import "./ui/closeSidebarEvent"
import "./ui/nextTurnButton"

export let game: MainApp ;

// 15*15 で 1分くらいかかります。
async function init() {
    game = await new MainApp({
        width: 4,
        height: 4,
    });
}

init();
