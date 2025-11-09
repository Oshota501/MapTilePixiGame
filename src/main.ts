import { MainApp } from "./mainApp";

export let game: MainApp ;

// 15*15 で 1分くらいかかります。
async function init() {
    game = await new MainApp({
        width: 3,
        height: 3,
    });
}

init();
