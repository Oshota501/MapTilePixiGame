import { Graphics } from "pixi.js";
import { OnLineAnimation } from "./onLineAnimation";
import { LineNode } from "./Node";

/**
 * ## 属性
 * - node
 * - connectTag
 * - graphic : PIXI.Graphic を継承した何か
 */
export class Line {
    public id : number ;
    public node : LineNode[] ;
    public graphic : Graphics = new Graphics();
    public color : number = 0X000000 ;

    constructor(id:number,...v:LineNode[]){
        this.id = id ;
        if(v.length <= 1){
            this.node = [LineNode.toV2(v[0]),new LineNode(0,0)] ;
        }else{
            this.node =v ;
        }
        this.updataGraphic();
    }

    public updataGraphic () {
        this.graphic.clear();
        this.graphic.moveTo(this.node[0].x , this.node[0].y );
        for(let i = 1 ; i < this.node.length ; i ++){
            this.graphic.lineTo(this.node[i].x , this.node[i].y );
        }
        this.graphic.stroke({ color: this.color, pixelLine: true });
    }

    public setAnim(anim:OnLineAnimation,isFin:boolean):void{
        if(isFin){
            const v2 = this.node[this.node.length-1] ;
            anim.position.set(v2.x,v2.y) ;
            anim.setAnimation(this.node.reverse()) ;
        }else{
            const v2 = this.node[0] ;
            anim.position.set(v2.x,v2.y) ;
            anim.setAnimation(this.node) ;
        }
    }
}