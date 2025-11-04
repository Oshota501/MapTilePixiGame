import { Container, Sprite, Assets, Texture } from "pixi.js";
import { Vector2 } from "../type";

export class MapTag20 extends Container {
    public isload = false ;
    public pin_texture!: Texture;

    constructor(){
        super();
        //this.interactive = true ;
        this.loadImg();
    }
    private async loadImg (){
        const tex = await Assets.load("src/graphic/img/pin.png") as Texture;
        tex.source.scaleMode ='nearest'
        this.pin_texture = tex;
        this.isload = true ;
    }
    public postTestPin (position: Vector2,log : string) {
        if(this.isload){
            const tex = this.pin_texture ;
            const sprite = new Sprite(tex);
            sprite.scale = 0.5 ;
            sprite.interactive = true;
            sprite.cursor = 'pointer';
            sprite.on('click',function(event){
                console.log(log)
                event.stopPropagation();
            })
            this.addChild(sprite);
            sprite.x = position.x;
            sprite.y = position.y;
            sprite.visible = true;
        }else{
            setTimeout(()=>this.postTestPin(position,log),500)
        }
    }
}