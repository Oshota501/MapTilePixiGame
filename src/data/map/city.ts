import { Assets, Sprite, Texture } from "pixi.js";
import { Vector2 } from "../../type";
import { MaterialResource } from "./resource";
import { queue } from "../../ui/queue";
import { biomes } from "../biomes";

export class Town extends Sprite{
    public v2position : Vector2 ;
    public poplation : number = 0 ;
    public max_poplation : number ;
    public townName : string ;

    constructor(position:Vector2,poplation:number, max_poplation:number,townName:string,img_name="village.png"){
        super();
        this.on('click',(event)=>{
            console.log(`${this.townName}\n人口 : ${this.poplation}/${this.max_poplation}`)
            event.stopPropagation();

        })
        this.v2position = position ;
        this.max_poplation = max_poplation ;
        this.poplation = poplation ;
        this.position.x = position.x ;
        this.position.y = position.y ;
        this.townName = townName ;

        this.loadImg (img_name) ;

        // game.maptag20.postTestPin(position,townName)
    }
    public upDataMaxPopulation (arr81_biome:Uint8Array) {
        this.max_poplation = 0 ;
        for(let i = 0 ; i < arr81_biome.length ; i ++){
            const b = biomes.getById( arr81_biome[i])
            if(typeof b == "undefined")
                continue ;
            this.max_poplation += b.max_population ;
        }
    }
    private async loadImg(imgname:string){
        const tex = await Assets.load(`src/graphic/img/mapobj/${imgname}`) as Texture;
        
        this.scale = 0.5 ;
        this.interactive = true;
        this.cursor = 'pointer';
        this.anchor.set(0.5);
        

        tex.source.scaleMode ='nearest'
        this.texture = tex ;
        this.visible = true;
    }
}
export class City extends Town{
    public subCity : Town[] = [] ;
    public resource : MaterialResource ;
    public cityName : string ;

    constructor(arr81_biome:Uint8Array,position:Vector2,population:number, max_population:number,cityName:string){
        const imgname = (function():string{
            if(population >= 360)return "city.png"
            return "village.png" ;
        })();
        super(position,population,max_population,cityName,imgname);
        
        this.resource = new MaterialResource(arr81_biome,population);

        this.cityName = cityName ;

        this.on('click',(event)=>{
            console.log("食材：",this.resource.foods)
            console.log("素材：",this.resource.material)
            event.stopPropagation();
            queue.town.setQueue(this)

        })
    }
    /**
     * - 都市圏人口の合計
     * - 都市の人口は this.poplation を参照
     * @returns poplation
     */
    public getPopulation():number{
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
    public getMaxPopulation():number{
        let count = 0 ;
        for(let i = 0 ; i < this.subCity.length ; i ++){
            count += this.subCity[i].max_poplation ;
        }
        count += this.max_poplation ;
        return this.max_poplation ;
    }
}