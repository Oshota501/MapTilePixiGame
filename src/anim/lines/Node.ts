import { Vector2 } from "../../type";

type PathLineNode = {
    l: LineNode;
    distance:number;
}
/**
 * # 真の意味のnode
 */
export class LineNode extends Vector2{
    public static toV2 (v:Vector2): LineNode{
        return new LineNode(v.x ,v.y) ;
    }
    public pathNode : PathLineNode [] = [] ;
    public addPathNode (ln:LineNode):void{
        if(ln.isSame(this)){
            return ;
        }
        this.pathNode.push({
                l:ln,
                distance:Vector2.distance(this,ln)
        });
    }

    constructor(x:number,y:number){
        super(x,y);
    }
}