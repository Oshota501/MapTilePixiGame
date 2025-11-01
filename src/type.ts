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
    public static distance_nonSqrt (v1:Vector2,v2:Vector2):number{
        return ((v1.x - v2.x )**2)+((v1.y - v2.y )**2);
    }
    public static distance (v1:Vector2,v2:Vector2):number{
        return Math.sqrt(((v1.x - v2.x )**2)+((v1.y - v2.y )**2));
    }
}
export type size = {
  width : number ,
  height : number ,
}