import { Assets, FederatedPointerEvent, Sprite, Texture } from "pixi.js";
import { Vector2 } from "../../type";
import { AnimContainer } from "../AnimContainer";
import { AnimObject } from "../AnimObject";

export class OnLineAnimation extends AnimObject{
    public speed : number = 6 ;
    public v2 :Vector2[] = [] ;
    constructor(ac:AnimContainer){
        super(ac.nextId());
        this.zIndex = 1000 ;
        ac.addAnim(this);
        this.loadImg() ;
    }
    public index = 1 ;

    override moveTickUpdata(time: number): void {
        const p1 = new Vector2(
            this.position.x + this.dotPerSecound.x * time/1000 ,
            this.position.y + this.dotPerSecound.y * time/1000 
        )
        const d = Vector2.distance(p1,this.v2[this.index-1]);
        if(d <= this.dotPerSecound.size()*2/time){
            this.setAnimation(this.v2) ;
        }else{
            this.position.set(p1.x ,p1.y) ;
        }
    }

    private async loadImg(){
        const tex = await Assets.load("src/graphic/texture-maptile/obj/dot.png") as Texture;
        
        const sprite = new Sprite () ;
        sprite.scale = 0.5 ;
        sprite.interactive = true;
        sprite.cursor = 'pointer';
        sprite.anchor.set(0.5);
        
        sprite.on("click",(event:FederatedPointerEvent)=>{
            event.stopPropagation();
        });
        tex.source.scaleMode ='nearest'
        sprite.texture = tex ;
        sprite.visible = true;

        this.addChild(sprite) ;
    }

    
    public setAnimation(v2 : Vector2[]): void {
        this.v2 = v2 ;
        if(this.index <= v2.length-1){
            this.position.set(
                v2[this.index-1].x ,
                v2[this.index-1].y
            )
            const speed = v2[this.index].diff(v2[this.index-1]).normarization().cum(this.speed) ;
            this.dotPerSecound = speed ;
            this.index ++ ;
        }else{
            this.destroy();
        }
    }
}