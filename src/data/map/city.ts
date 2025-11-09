import { Assets, Sprite, Texture } from "pixi.js";
import { Vector2 } from "../../type";
import { MaterialResource } from "./resource";

const isload_city = 0 ;
const cityIMG = (async function(){
    return await Assets.load("src/graphic/img/mapobj/city.png") as Texture;
})();
const townIMG = (async function(){
    return await Assets.load("src/graphic/img/mapobj/village.png") as Texture;
})();

export class Town extends Sprite{
    public poplation : number = 0 ;
    public max_poplation : number ;
    public townName : string ;

    constructor(position:Vector2,poplation:number, max_poplation:number,townName:string){
        super();
        this.max_poplation = max_poplation ;
        this.poplation = poplation ;
        this.position.x = position.x ;
        this.position.y = position.y ;
        this.townName = townName ;

        // game.maptag20.postTestPin(position,townName)
        this.loadImg() ;
    }

    private async loadImg (){
        const tex = townIMG ;
        tex.source.scaleMode ='nearest'
        this.texture = tex;
        //this.isload = true ;

        this.scale = 0.5 ;
        this.interactive = true;
        this.cursor = 'pointer';
        this.anchor.set(0.5);
        this.on('click',(event)=>{
            console.log(this.townName)
            event.stopPropagation();
        })
        this.visible = true;
    }
}
export class City extends Town{
    public subCity : Town[] = [] ;
    public resource : MaterialResource = new MaterialResource() ;
    public cityName : string ;

    constructor(position:Vector2,poplation:number, max_poplation:number,cityName:string){
        super(position,poplation,max_poplation,cityName);
        this.cityName = cityName ;
    }
    /**
     * - 都市圏人口の合計
     * - 都市の人口は this.poplation を参照
     * @returns poplation
     */
    public getPoplation():number{
        let count = 0 ;
        for(let i = 0 ; i < this.subCity.length ; i ++){
            count += this.subCity[i].poplation ;
        }
        count += this.poplation ;
        return this.poplation ;
    }
    /**
     * - 都市圏人口の上限値
     * @returns max poplation
     */
    public getMaxPoplation():number{
        let count = 0 ;
        for(let i = 0 ; i < this.subCity.length ; i ++){
            count += this.subCity[i].max_poplation ;
        }
        count += this.max_poplation ;
        return this.max_poplation ;
    }
}