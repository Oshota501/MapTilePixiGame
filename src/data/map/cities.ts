import { Container } from "pixi.js";
import { Vector2 } from "../../type";
import { City } from "./city";

export class CitiesDB extends Container {
    public major : Container = new Container() ;
    public satellite : Container = new Container() ;
    constructor(){
        super();
    }
    public postCity(p:Vector2,poplation:number,max_poplation:number){
        const newCity = new City(p,poplation,max_poplation) ;
        newCity.poplation = poplation ;
        this.addChild(this.major) ;
        this.addChild(this.satellite) ;
    }
}
