import { game } from "../../main";
import { AnimObject } from "../AnimObject";

export class Select extends AnimObject{
    private isSelect : boolean = false ;

    public setIsSelect(f:boolean):void{
        this.isSelect = f ;
    }
    public getIsSelect():boolean {
        return this.isSelect ;
    }
    /**
     * deltatimeを与えてください。
     * @param time number
     */
    override moveTickUpdata (time:number):void{
        super.moveTickUpdata(time);
        if(this.getIsSelect()){
            this.position.set(
                game.vieportMousePosition.x ,
                game.vieportMousePosition.y
            )
        }
        //console.log("tick")
    }

    public selectingOnClick():void{
        if(this.getIsSelect()){
            this.setIsSelect(false) ;
        }
    }
    constructor(){
        super();
    }

}