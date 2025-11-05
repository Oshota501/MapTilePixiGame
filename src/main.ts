import { MainApp } from "./mainApp";

export let game: MainApp ;

async function init() {
    game = await new MainApp({
        width: 7,
        height: 7,
    });
}

init();
