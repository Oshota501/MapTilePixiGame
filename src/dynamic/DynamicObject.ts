import { Container } from "pixi.js";
import { Vector2 } from "../type";
import { game } from "../main";
import { ChunkArea } from "../data/chunk";

export class DynamicObject extends Container {
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
     * 直接値を触りたいなら.position.setを参照
     * @param dx 
     * @param dy 
     */
    public moveVector2(v2:Vector2) : boolean {
        return this.movePosition(v2.x ,v2.y) ;
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
