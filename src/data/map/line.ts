import { Container, Graphics } from "pixi.js";
import { Vector2 } from "../../type";

export class LineContainer extends Container {
    public lines : Set<LinePositions> = new Set<LinePositions>() ;
    public setLine(...positions:Vector2[]){
        this.lines.add(new LinePositions(...positions))
    }
    constructor(){
        super();
    }
}
export class LinePositions extends Graphics {
    public node : Vector2[] ;
    constructor(...positions:Vector2[]){
        super();
        this.node = positions ;
        if(positions.length<=1){
            console.warn("position length is lower than 1\nDidn't draw .");
            return 
        }
        this.moveTo(positions[0].x,positions[0].y) ;
        for(let i = 1 ; i < positions.length ; i ++){
            this.lineTo(positions[i].x,positions[i].y) ;
        }
        this.stroke({
            color:0X000000,
            pixelLine:true,
        })
    }
}