import { Container } from "pixi.js";
import { Vector2 } from "../../type";
import { City } from "./city";

export class CitiesDB extends Container {
    public major : Container = new Container() ;
    public satellite : Container = new Container() ;
    public city : City[] = [] ;
    constructor(){
        super();
        this.addChild(this.major) ;
        this.addChild(this.satellite) ;
    }
    public postCity(p:Vector2,poplation:number,max_poplation:number,name:string){
        const newCity = new City(p,poplation,max_poplation,name) ;
        this.major.addChild (newCity) ;
        this.city.push(newCity) ;
        
    }
}
