import { MainApp } from "./mainApp";

export let game: MainApp ;

async function init() {
    game = await new MainApp({
        width: 2,
        height: 2,
    });
}

init();
