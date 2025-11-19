import { Select } from "./Select";
import { City } from "../../data/map/city";
import { Vector2 } from "../../type";

export class SelectCity extends Select{
    public city : City ;

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