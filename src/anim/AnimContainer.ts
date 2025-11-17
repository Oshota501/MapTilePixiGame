import { Container } from "pixi.js";
import { AnimObject } from "./AnimObject";
import { SelectCity } from "./select/selectCity";

export class AnimContainer extends Container {
    public tickAnim : AnimObject[] = [] ;
    public tickUpdata (time:number):void {
        for(let i = 0 ; i < this.tickAnim.length ; i ++){
            this.tickAnim[i].moveTickUpdata(time) ;
        }
    }
    public addAnim (anim:AnimObject){
        this.addChild(anim)
        this.tickAnim .push(anim) ;
    }

    public selectcity = new SelectCity() ;
    constructor(){
        super();
        this.addAnim(this.selectcity) 
    }
}