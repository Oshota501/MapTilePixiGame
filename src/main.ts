import { MainApp } from "./mainApp";
import "./ui/keyevent"
import "./ui/closeSidebarEvent"

export let game: MainApp ;

// 15*15 で 1分くらいかかります。
async function init() {
    game = await new MainApp({
        width: 3,
        height: 3,
    });
}

init();
