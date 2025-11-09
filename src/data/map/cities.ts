import { Container } from "pixi.js";
import { Vector2 } from "../../type";
import { City } from "./city";

export class CitiesDB extends Container {
    public major : Container = new Container() ;
    public satellite : Container = new Container() ;

    public city : City[] = [] ;
    /**
     * 名前から都市を検索
     * @param cityname 
     * @returns [city , isSuccess]
     */
    public getCity(cityname:string):[City,true]|[null,false]{
        for(let i = 0 ; i < this.city.length ; i ++){
            const elm = this.city[i] ;
            if(elm.cityName == cityname){
                return [elm,true] ;
            }
        }
        return [null,false] ;
    }
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
