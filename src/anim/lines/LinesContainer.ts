import { Container } from "pixi.js";
import { Line } from "./Line";

export class LinesContainer extends Container {
    public lines : Map<number,Line> = new Map<number,Line>() ;

    private id = 0 ;
    private nextID():number{
        return this.id ++ ;
    }
    /**
     * 使用例
     * 
     * ViewPort内に適用済み
     * 
     * ```ts
     *    game.gamedata.lines.setLine(
     *          0 
     *          new Vector2Connect(0,0),
     *          new Vector2Connect(30,30),
     *          new Vector2Connect(30,60),
     *    )
     * ```
     */    
    public setLine (l:Line){
        this.addChild(l.graphic);
        this.lines.set(this.nextID(),l) ;
    }
    constructor(){
        super();
    }
}