import { Container } from "pixi.js";
import { DynamicObject } from "./DynamicObject";
import { game } from "../main";
import { ChunkArea } from "../data/chunk";

export class DynamicContainer extends Container {
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
    }
}