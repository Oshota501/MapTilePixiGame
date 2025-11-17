import { Select } from "./Select";
import { City } from "../../data/map/city";
import { Vector2 } from "../../type";
import { game } from "../../main";
import { FederatedPointerEvent } from "pixi.js";

export class SelectCity extends Select{
    public city : City ;

    override onclickFunc(event:FederatedPointerEvent): void {
        super.onclickFunc(event) ;
        this.visible = this.isSelect ;
        game.gamedata.postCity(game.vieportMousePosition,"none")
        console.log(this.city)
    }

    constructor(){
        super();
        this.city = new City(
            new Uint8Array(81) ,
            new Vector2(0,0) ,
            0 ,
            0 ,
            "none"
        ) ;
        this.addChild(this.city) ;
    }
}