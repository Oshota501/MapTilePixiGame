import { Vector2 } from "../../type";

export class City {
    public position : Vector2 ;
    public poplation : number = 0 ;
    public max_poplation : number ;
    constructor(p:Vector2,poplation:number,max_poplation:number){
        this.position = p ;
        this.max_poplation = max_poplation ;
        this.poplation = poplation ;
    }
}