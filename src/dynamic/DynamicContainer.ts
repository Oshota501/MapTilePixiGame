import { Container } from "pixi.js";
import { DynamicObject } from "./DynamicObject";
import { game } from "../main";
import { ChunkArea } from "../data/chunk";
import Player from "./unit/player";
import { Vector2 } from "../type";
import Unit from "./unit/Unit";
import { isInMapV2 } from "./isInMap";

export class DynamicContainer extends Container {
    public player : Player = new Player(new Vector2(30,30));

    public addDynamic(dobj:DynamicObject) : boolean {
        const x = dobj.position.x ;
        const y = dobj.position.y ;
        if(
            (x>=0 || x<game.worldSize.width * ChunkArea.width) &&
            (y>=0 || y<game.worldSize.width * ChunkArea.height)        
        )return false ;
        this.addChild(dobj);
        return true ;
    }

    public addUnit(uobj:Unit) :boolean {
        if(!isInMapV2(uobj.v2position)){
            return false ;
        }
        this.addChild(uobj);
        this.setTurnUpdata(uobj.goTurn) ;
        return true ;
    }

    public turnUpdataFunc : (()=>void)[] = [] ;

    public setTurnUpdata (func:()=>void){
        this.turnUpdataFunc.push(func) ;
    }
    public goTurn():void{
        for(let i = 0 ; i < this.turnUpdataFunc.length ; i ++){
            this.turnUpdataFunc[i]() ;
        }
    }
    constructor(){
        super();
        this.addUnit(this.player)
        
    }
}