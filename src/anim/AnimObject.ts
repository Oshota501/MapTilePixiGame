import { Container, DestroyOptions } from "pixi.js";
import { Vector2 } from "../type";
import { game } from "../main";

export class AnimObject extends Container {
    /**
     * speed の 二次元ベクター
     * 
     * 速度を取得するには `Vector2.distance(this.dotPerSecound)`
     */
    public dotPerSecound : Vector2 = new Vector2(0,0) ;

    public id : number ;

    public moveTickUpdata (time:number):void{
        this.position.set(
            this.position.x + this.dotPerSecound.x * time/1000 ,
            this.position.y + this.dotPerSecound.y * time/1000
        )
    } ;
    constructor(id:number){
        super();
        this.id = id ;
    }
    override destroy(options?: DestroyOptions): void {
        game.anim.destroyTicker(this.id);
        if(options)
            super.destroy(options);
        else
            super.destroy();
    }
}