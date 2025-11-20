import { Vector2 } from "../../type";
import { AnimContainer } from "../AnimContainer";
import { AnimObject } from "../AnimObject";

export class OnLineAnimation extends AnimObject{
    constructor(ac:AnimContainer){
        super();
        ac.addAnim(this);
    }

    public index = 1 ;

    override moveTickUpdata(time: number): void {
        super.moveTickUpdata(time);
    }

    public setAnimation(v2 : Vector2[]){
        for (let i = 0 ; i < v2.length-1 ; i ++){
            //this.dotPerSecound = v2[i+1].diff(v2[i]).normarization() ;
            console.log(v2[i+1].diff(v2[i]).normarization())
        }
        
    }
}