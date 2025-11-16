import { ChunkArea } from "./data/chunk";

export class UnsignedNumber {
    private int : number = 0 ;
    constructor(num?:number){
        if(num){
            this.int = num ;
        }
    }
    /**
     * 自動で絶対値が設定されます。
     * @param num 
     */
    public set(num:number):void{
        this.int = Math.abs(num) ;
    }
    /**
     * 負の値になる時にfalseを返して実行できなかった事を示します。
     * @param num 
     * @returns boolean
     */
    public add(num:number):boolean{
        if(this.int+num >= 0){
            this.int += num ;
            return true ;
        }else{
            return false ;
        }  
    }
    public get():number{
        return this.int ;
    }

}

export class Vector2 {
    public x : number ;
    public y : number ;
    constructor(x:number,y:number){
        this.x = x ;
        this.y = y ;
    }
    public set (x:number , y:number){
        this.x = x ;
        this.y = y ;
    }
    public size () : number {
        return Math.sqrt((this.x**2) + (this.y**2))
    }
    public round () : Vector2 {
        this.x = Math.round(this.x) ;
        this.y = Math.round(this.y) ;
        return this ;
    }
    /**
     * - 戻り値があるがthisそのものに加算されるのであまり使用は推奨されない。
     * @param vector2 Vector2
     * @returns 
     */
    public add (vector2:Vector2):Vector2{
        this.x += vector2.x ;
        this.y += vector2.y ;
        return this ;
    }
    /**
     * - x軸,y軸における距離
     * - 絶対値ではなく負の値を出力する可能性に注意
     * @param vector2 size
     * @returns 
     */
    public diff (vector2:Vector2):Vector2{
        return new Vector2(
            this.x - vector2.x ,
            this.y - vector2.y
        )
    }
    /**
     * - 定数倍にも対応
     * @param vector2 Vector2 | number
     * @returns 
     */
    public cum (vector2:Vector2|number):Vector2{
        if(typeof vector2 == "number"){
            this.x *= vector2 ;
            this.y *= vector2 ;
            return this ;
        }else{
            this.x *= vector2.x ;
            this.y *= vector2.y ;
            return this ;
        }

    }
    /**
     * 独立した新しいインスタンスを返します。
     * @returns Vector2
     */
    public copy():Vector2{
        return new Vector2(this.x,this.y) ;
    }
    /**
     * @param index number
     * @param chunk_size? size 初期値：ChunkArea
     * @returns [ isSuccess : boolean , position : Vector2]
     */
    public static formatToVector2(
        index:number,
        chunk_size:size={
            width:ChunkArea.width,
            height:ChunkArea.height
        },
    ):[true,Vector2]|[false,null]{
        if(index < 0){
            return [false , null ] ;
        }
        const pos = new Vector2(
            index % chunk_size.width ,
            Math.floor(index / chunk_size.width) ,
        );
        return [true ,pos] ;
        
    }
    /**
     * @param v Vector2
     * @param s? size 初期値：ChunkArea
     * @returns index number
     */
    public static formatToIndex(v:Vector2,s:size={
        width:ChunkArea.width,
        height:ChunkArea.height
    }):number{
        return v.x + v.y*s.width

    }
    // public static distance_nonSqrt (v1:Vector2,v2:Vector2):number{
    //     return ((v1.x - v2.x )**2)+((v1.y - v2.y )**2);
    // }
    public static distance (v1:Vector2,v2:Vector2):number{
        return Math.sqrt(((v1.x - v2.x )**2)+((v1.y - v2.y )**2));
    }
}
export type size = {
  width : number ,
  height : number ,
}