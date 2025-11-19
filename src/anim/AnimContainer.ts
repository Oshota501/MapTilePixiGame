import { Container } from "pixi.js";
import { AnimObject } from "./AnimObject";
import { SelectCity } from "./select/selectCity";
import { Select } from "./select/Select";

export class AnimContainer extends Container {
    public tickAnim : AnimObject[] = [] ;
    public tickSelect : Select[] = [] ;

    public tickUpdata (time:number):void {
        for(let i = 0 ; i < this.tickAnim.length ; i ++){
            this.tickAnim[i].moveTickUpdata(time) ;
        }
        for(let i = 0 ; i < this.tickSelect.length ; i ++){
            this.tickSelect[i].moveTickUpdata(time) ;
        }
    }
    public addAnim (anim:AnimObject){
        this.addChild(anim)
        this.tickAnim .push(anim) ;
    }
    public addSelect (sel:Select){
        this.addChild(sel)
        this.tickSelect .push(sel) ;
    }

    public onclickFunc : ()=>void = ()=>{
        for(let i = 0 ; i < this.tickSelect.length ; i ++){
            const elm = this.tickSelect[i] ;
            if(elm.isSelect){
                elm.isSelect = false ;
            }
        }
    }

    public selectcity = new SelectCity() ;
    constructor(){
        super();
        this.addSelect(this.selectcity) ;
    }
}