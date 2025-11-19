import { Graphics } from "pixi.js";
import { Vector2 } from "../../type";
import { OnLineAnimation } from "./onLineAnimation";

/**
 * ## 属性
 * - node
 * - connectTag
 * - graphic : PIXI.Graphic を継承した何か
 */
export class Line {
    public id : number ;
    public node : Vector2[] ;
    public tag : number[][] = [];
    public graphic : Graphics = new Graphics();

    constructor(id:number,...v:Vector2[]){
        this.id = id ;
        if(v.length <= 1){
            this.node = [v[0],new Vector2(0,0)] ;
            this.tag = [[],[]] ;
        }else{
            this.node =v ;
            for(let i = 0 ; i < v.length ; i ++){
                this.tag.push([]) ;
            }
        }
        this.updataGraphic();
    }

    public updataGraphic () {
        this.graphic.clear();
        this.graphic.moveTo(this.node[0].x , this.node[0].y );
        for(let i = 1 ; i < this.node.length ; i ++){
            this.graphic.lineTo(this.node[i].x , this.node[i].y );
        }
        this.graphic.stroke({ color: 0xff0000, pixelLine: true });
    }

    public setAnim(anim:OnLineAnimation,isFin:boolean):void{
        if(isFin){
            const v2 = this.node[this.node.length-1] ;
            anim.position.set(v2.x,v2.y) ;
        }
    }
}