import { Container } from "pixi.js";
import { Vector2 } from "../type";
import { GameDatas } from "../data/gamedata";
import { biomes } from "../data/biomes";

export class Cities extends Container {
    public major : Container = new Container() ;
    public satellite : Container = new Container() ;
    private cityData : City[] = [] ;
    public getCities (){
        return this.cityData ;
    }
    constructor(){
        super();
    }
}
export class City {
    public position : Vector2 ;
    public poplation : number = 0 ;
    public max_poplation : number ;
    constructor(p:Vector2,g:GameDatas){
        this.position = p ;
        const [arr,isSuccess] = g.getAreaBiome(p,3) ;
        if(isSuccess){
            let count = 0 ;
            for(let i = 0 ; i < arr.length ; i ++){
                const num = biomes.getById(arr[i]) ;
                if(typeof num != 'undefined')
                    count += num.max_population ;
            }
            this.max_poplation = count ;
        }else{
            this.max_poplation = 600 ;
        }
    }
}