import { game } from "../../main";
import { AnimObject } from "../AnimObject";

export class Select extends AnimObject{
    public isSelect : boolean = false ;

    /**
     * deltatimeを与えてください。
     * @param time number
     */
    override moveTickUpdata (time:number):void{
        super.moveTickUpdata(time);
        if(this.isSelect){
            this.position.set(
                game.vieportMousePosition.x ,
                game.vieportMousePosition.y
            )
        }
        //console.log("tick")
    }
    constructor(){
        super();
    }

}