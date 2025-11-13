import { Container } from "pixi.js";
import { DynamicObject } from "./DynamicObject";
import { game } from "../main";
import { ChunkArea } from "../data/chunk";
import Player from "./player/player";
import { Vector2 } from "../type";

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
    constructor(){
        super();
        this.addChild(this.player) ;
    }
}