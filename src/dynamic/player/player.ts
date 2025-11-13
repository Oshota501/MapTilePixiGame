import { Assets, Sprite, Texture } from "pixi.js";
import { Vector2 } from "../../type";
import { DynamicObject } from "../DynamicObject";

export default class Player extends DynamicObject {
    public sprite? : Sprite ;
    public onKeyPress = (event:KeyboardEvent):void => {
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
            case "q" :
                console.log(this.v2position) ;
                break;
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
        window.addEventListener("keypress",this.onKeyPress)
        this.v2position = v2 ;

        this.init();
    }
    public async init (){
        const sprite = new Sprite() ;
        const tex = await Assets.load(`src/graphic/img/pin.png`) as Texture;
                
        sprite.scale = 0.5 ;
        sprite.interactive = true;
        sprite.cursor = 'pointer';
        // sprite.anchor.set(0.5);

        tex.source.scaleMode ='nearest'
        sprite.texture = tex ;
        sprite.visible = true;

        this.sprite = sprite ;
        this.addChild(this.sprite)
        this.sprite.on("mousedown",()=>{
            console.log("player")
        })
    }
}