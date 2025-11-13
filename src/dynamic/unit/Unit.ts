import { game } from "../../main";
import { Vector2 } from "../../type";
import { DynamicObject } from "../DynamicObject";
import { isInMapV2 } from "../isInMap";

export default class Unit extends DynamicObject {
    public speed : number = 2 ;
    public arrivePosirion : Vector2 ;
    public isMove : boolean = false ;
    public canmove : (biomeid:number) => boolean = (biomeid:number)=>{
        if(biomeid >= 200){
            return false ;
        }else{
            return true ;
        }
    };
    public setMoveToMap (v2:Vector2) : void{
        if(!isInMapV2(v2)) {
            return ;
        }
        this.isMove = true ;
        this.arrivePosirion = v2 ;
    }
    public goTurn = () : void => {
        if(this.isMove){
            const diff = this.arrivePosirion.diff(this.v2position);
            const distance = diff.size();
            if(distance/this.speed < this.speed){
                this.setPositionVector2(this.arrivePosirion);
                this.isMove = false ;
            }
            const mx =  (diff.x / distance ) * this.speed ;
            const my =  (diff.y / distance ) * this.speed ;
            const afV2 = new Vector2(mx,my) ;
            afV2.add(this.v2position)
            afV2.round();
            const [biomeid,f] = game.gamedata.getPositionBiome(afV2)
            if(f){
                if(this.canmove(biomeid)){
                    this.movePosition(mx,my)
                }else{
                    this.isMove = false ;
                }
            }
            
        }
    }
    constructor(v2:Vector2){
        super(v2);
        this.arrivePosirion = v2 ;
    }
}