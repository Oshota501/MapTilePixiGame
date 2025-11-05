import { Container, Sprite, Assets, Texture ,Text} from "pixi.js";
import { Vector2 } from "../../type";

/**
 * debug用のタグ、本番環境で使用しない予定
 */
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
    // public tick (){
    //     // mainAppのticker.add
    // }
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
    public postText(position:Vector2,message:string){
        const basicText = new Text({
            text: message,
            style: {
                fontFamily: 'Arial',
                fontSize: 16,
                fill: 0x000000,
                align: 'center',
            }
        });
        basicText.scale = 0.16
        basicText.x = position.x ;
        basicText.y = position.y ;
        this.addChild (basicText)
    }
}