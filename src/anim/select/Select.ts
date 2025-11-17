import { game } from "../../main";
import { AnimObject } from "../AnimObject";

export class Select extends AnimObject{
    public isSelect : boolean = false ;

    /**
     * deltatimeを与えてください。
     * @param time number
     */
    public moveTickUpdata (time:number){
        super.moveTickUpdata(time);
        if(this.isSelect){
            this.position.set(
                game.vieportMousePosition.x ,
                game.vieportMousePosition.y
            )
        }
    }
    constructor(){
        super();
        this.on("click",()=>{
            this.isSelect = !this.isSelect ;
        })
    }

}