import { AnimContainer } from "../AnimContainer";
import { AnimObject } from "../AnimObject";

export class OnLineAnimation extends AnimObject{
    constructor(ac:AnimContainer){
        super();
        ac.addAnim(this);
    }
}