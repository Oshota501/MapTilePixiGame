import { Select } from "./Select";
import { City } from "../../data/map/city";
import { Vector2 } from "../../type";
import { game } from "../../main";

export class SelectCity extends Select{
    public city : City ;

    override setIsSelect(f: boolean): void {
        super.setIsSelect(f);
        this.visible = f ;
    }

    override selectingOnClick(): void {
        if(!this.getIsSelect()) return ;
        game.gamedata.postCity(
            new Vector2(this.x,this.y),
            "new City wahhah"
        )
        super.selectingOnClick();
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