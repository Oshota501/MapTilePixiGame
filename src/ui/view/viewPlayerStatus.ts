import { game } from "../../main";
import { uiContainer1 } from "../elms";
import { mode } from "../menue";

export default function viewPlayerInfo () : void{
    if(uiContainer1 && mode == "status"){
        uiContainer1.innerHTML = `
            所持金：${game.dynamic?.player.money.get()}<br>
        `
    }
}