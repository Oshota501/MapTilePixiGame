import { Container } from "pixi.js";
import { Vector2 } from "../../type";
import { City, Town } from "./city";

export class CitiesDB extends Container {
    public major : Container = new Container() ;
    public satellite : Container = new Container() ;

    public city : City[] = [] ;
    /**
     * 名前から都市名を検索
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
    /**
     * 衛星都市作成
     * @param cityname 
     * @param subcity 
     * @returns isSuccess bool
     */
    public addSubCity(cityname:string,subcity:Town):boolean{
        const [c,b] = this.getCity(cityname);
        if(b){
            // if(Vector2.distance(subcity.v2position,c.v2position)>30){
            //     console.log("距離が遠すぎます。")
            //     return false ;
            // }
            c.subCity.push(subcity) ;
            this.satellite.addChild(subcity) ;
            return true ;
        }
        return false ;
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
