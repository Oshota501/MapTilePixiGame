import { Container } from "pixi.js";
import { Vector2 } from "../type";
import { game } from "../main";
import { ChunkArea } from "../data/chunk";

export class DynamicObject extends Container {
    public speed : Vector2 = new Vector2(0,0) ;
    public move = {
        x : (dx:number):boolean=>{
            const x = this.position.x + dx ;
            if(x>=0 || x<game.worldSize.height * ChunkArea.height){
                this.position.x = x ;
                return true;
            }
            return false ;
        } ,
        y : (dy:number):boolean=>{
            const y = this.position.y + dy ;
            if(y>=0 || y<game.worldSize.height * ChunkArea.height){
                this.position.y = y ;
                return true;
            }
            return false ;
        }
    }
    public movePosition(dx:number,dy:number) : boolean {
        const x = this.position.x + dx ;
        const y = this.position.y + dy ;
        if(
            (x>=0 || x<game.worldSize.width * ChunkArea.width) &&
            (y>=0 || y<game.worldSize.width * ChunkArea.height)        
        ){
            this.position.set(x,y) ;
            return true ;
        }
        return false ;
    }
    /**
     * 移動する。ワールド範囲の判定にgameをimportしていますが依存関係はそれくらいです。
     * 直接値を触りたいならsetVector2を参照
     * @param dx 
     * @param dy 
     */
    public movePositionVector2(v2:Vector2) : boolean {
        return this.movePosition(v2.x ,v2.y) ;
    }
    /**
     * position.セットできます
     * @param vector2 : Vector2 position
     */
    public setPositionVector2(v2:Vector2) : boolean {
        if(
            (v2.x>=0 || v2.x<game.worldSize.width * ChunkArea.width) &&
            (v2.y>=0 || v2.y<game.worldSize.width * ChunkArea.height)        
        ){
            this.position.set(v2.x,v2.y) ;
            return true ;
        }
        return false ;
    }
    constructor(vector2?:Vector2){
        super();
        if(vector2){
            this.position.set (vector2.x,vector2.y) ;
        }else{
            this.position.set (0,0) ;
        }
    }
}
