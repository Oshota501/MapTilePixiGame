export class Vector2 {
    public x : number ;
    public y : number ;
    constructor(x:number,y:number){
        this.x = x ;
        this.y = y ;
    }
    public add (vector2:Vector2){
        return new Vector2(vector2.x + this.x , vector2.y + this.y ) ;
    }
}
export type size = {
  width : number ,
  height : number ,
}