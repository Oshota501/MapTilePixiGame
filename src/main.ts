import { MainApp } from "./mainApp";

export let game: MainApp ;

async function init() {
    const mod = await import("./mainApp");
    game = new mod.MainApp({
        width: 7,
        height: 7,
    });
}

init();
