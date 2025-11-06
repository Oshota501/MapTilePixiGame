import { MainApp } from "./mainApp";

export let game: MainApp ;

async function init() {
    game = await new MainApp({
        width: 4,
        height: 4,
    });
}

init();
