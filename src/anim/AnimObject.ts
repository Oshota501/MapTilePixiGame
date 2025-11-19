import { Container } from "pixi.js";
import { Vector2 } from "../type";

export class AnimObject extends Container {
    /**
     * speed の 二次元ベクター
     * 
     * 速度を取得するには `Vector2.distance(this.dotPerSecound)`
     */
    public dotPerSecound : Vector2 = new Vector2(0,0) ;

    public moveTickUpdata (time:number):void{
        this.position.set(
            this.position.x + this.dotPerSecound.x * time ,
            this.position.y + this.dotPerSecound.y * time
        )
    } ;
    constructor(){
        super();
    }
}