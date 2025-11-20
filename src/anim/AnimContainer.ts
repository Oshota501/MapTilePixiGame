import { Container } from "pixi.js";
import { AnimObject } from "./AnimObject";
import { SelectCity } from "./select/selectCity";
import { Select } from "./select/Select";

export class AnimContainer extends Container {
    public id = 0 ;
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
    public destroyTicker(id:number){
        // tickAnim から削除（O(n)）
        for (let i = 0; i < this.tickAnim.length; i++) {
            const elm = this.tickAnim[i];
            if (elm.id === id) {
                // 表示ツリーから削除（親が自分か確認）
                if (elm.parent === this) this.removeChild(elm);
                // 配列から取り除く
                this.tickAnim.splice(i, 1);
                break;
            }
        }

        // tickSelect からも同様に削除（同一 id が存在する可能性に対応）
        for (let i = 0; i < this.tickSelect.length; i++) {
            const elm = this.tickSelect[i];
            if (elm.id === id) {
                if (elm.parent === this) this.removeChild(elm);
                this.tickSelect.splice(i, 1);
                break;
            }
        }
    }
    public onclickFunc : ()=>void = ()=>{
        for(let i = 0 ; i < this.tickSelect.length ; i ++){
            const elm = this.tickSelect[i] ;
            elm.selectingOnClick();
            
        }
    }

    public nextId () :number{
        return this.id ++ ;
    }

    public selectcity = new SelectCity() ;
    constructor(){
        super();
        this.addSelect(this.selectcity) ;
    }
}