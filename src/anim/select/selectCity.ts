import { Select } from "./Select";
import { City } from "../../data/map/city";
import { game } from "../../main";
import { Vector2 } from "../../type";

export class SelectCity extends Select{
    public city : City ;

    constructor(){
        super();
        this.city = new City(
            new Uint8Array(81) ,
            new Vector2(20,20) ,
            0 ,
            0 ,
            "none"
        ) ;
        this.addChild(this.city) ;
    }

    override onclickFunc(): void {
        super.onclickFunc() ;
        this.visible = this.isSelect ;
    }
}