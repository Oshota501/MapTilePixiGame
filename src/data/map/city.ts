import { Sprite } from "pixi.js";
import { Vector2 } from "../../type";

export class Town extends Sprite{
    public poplation : number = 0 ;
    public max_poplation : number ;
    constructor(position:Vector2,poplation:number, max_poplation:number){
        super();
        this.max_poplation = max_poplation ;
        this.poplation = poplation ;
        this.position.x = position.x ;
        this.position.y = position.y ;
    }
}
export class City extends Town{
    public subCity : Town[] = [] ;
    constructor(position:Vector2,poplation:number, max_poplation:number){
        super(position,poplation,max_poplation);
    }
    /**
     * - 都市圏人口の合計
     * - 都市の人口は this.poplation を参照
     * @returns poplation
     */
    public getPoplation():number{
        let count = 0 ;
        for(let i = 0 ; i < this.subCity.length ; i ++){
            count += this.subCity[i].poplation ;
        }
        count += this.poplation ;
        return this.poplation ;
    }
    /**
     * - 都市圏人口の上限値
     * @returns max poplation
     */
    public getMaxPoplation():number{
        let count = 0 ;
        for(let i = 0 ; i < this.subCity.length ; i ++){
            count += this.subCity[i].max_poplation ;
        }
        count += this.max_poplation ;
        return this.max_poplation ;
    }
}