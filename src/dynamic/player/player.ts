import { Vector2 } from "../../type";
import { DynamicObject } from "../DynamicObject";

export default class Player extends DynamicObject {
    public onKeyDown = (event:KeyboardEvent):void => {
        switch(event.key){
            case "w" :
                this.move.y(-1) ;
                break;
            case "s" :
                this.move.y(1) ;
                break;
            case "a" :
                this.move.x(-1) ;
                break;
            case "d" :
                this.move.x(1) ;
                break;
        }
    }
    public onKeyUp = (event:KeyboardEvent):void => {
        switch(event.key){
        }
    }
    public v2position : Vector2 ;
    /**
     * - 必ずVector2の新しく作ったインスタンスを渡してください。
     * ---
     * 使用例
     * ```ts
     * const v2 = new Vector2 (0,0) ;
     * const p = new Player(v2.copy) ;
     * ```
     * @param v2 Vector2
     */
    constructor(v2:Vector2){
        super(v2);
        window.addEventListener("keydown",this.onKeyDown)
        window.addEventListener("keyup",this.onKeyUp)
        this.v2position = v2 ;
    }
}