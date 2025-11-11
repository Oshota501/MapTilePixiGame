import { random } from "../../mt/random";
import { biomes } from "../biomes";

export type resource_variety = "weat" | "fish" | "rice" | "wood"
export type resource_index = "name" | "message" | "in" | "out" | "stock" | "base" | "cost" | "ft"
export type resource_data = {
    name : string ;
    message : string ;
    in : number ;
    out : number ;
    cost : number ;
    stock : number ;
    base : number ;
    ft: number ;
}
export class MaterialResource {
    public resource = {
        fish:{
            name : "fish",
            message : "海に面していると生産可能です。",
            in:0,
            out:0,
            cost:1200,
            stock:60,
            base:1200,
            ft:0.3,
        },
        rice:{
            name : "rice",
            message : "水田があると生産可能です。",
            in:0,
            out:0,
            cost:380,
            stock:300,
            base:380,
            ft:0.9,
        },
        weat:{
            name : "weat",
            message : "小麦畑があると生産可能です。",
            in:0,
            out:0,
            cost:380,
            stock:300,
            base:380,
            ft:0.9,
        },
        wood:{
            name : "wood",
            message : "森があると生産可能です。",
            in:0,
            out:0,
            cost:380,
            stock:300,
            base:380,
            ft:0.6,
        },
    }

    public resourceNames : resource_variety [] = [
        "fish","rice","weat","wood"
    ]
    public goTurn(){
        const setup = function(elm:resource_data){
            if ( elm.stock + elm.in - elm.out > 0 ){
                elm.stock += elm.in - elm.out ;
            }else{
                elm.stock = 0 ;
            }
            if(elm.stock > 0){
                elm.out -= random.next()*elm.out/100
                if(elm.cost < elm.base/3 ){
                    elm.cost = elm.base/3 ;
                }
                elm.cost -= random.next()*elm.cost/20 ;
            }else{
                if(elm.cost >= elm.base*10){
                    elm.cost -= random.next()*elm.cost/20
                }else{
                    elm.cost += random.next()*elm.cost/20
                }
            }
            if(elm.base < elm.cost){
                elm.out -= random.next()*elm.out/100
            }else{  
                elm.out += random.next()*elm.out/100
            }
            
        }
        for(let i = 0 ; i < this.resourceNames.length ; i ++){
            setup(this.resource[this.resourceNames[i]])
        }
              
    }
    constructor(arr81_biomes:Uint8Array,population:number){
        this.updata(arr81_biomes,population)
    }
    public clearInData() : void{
        for(let i = 0 ; i < this.resourceNames.length ; i ++ ){
            this.resource[this.resourceNames[i]].in = 0 ;
        }
    }
    public updata(arr81_biomes:Uint8Array,population:number):void{
        // まず既存の in 値をリセットしてから集計
        this.clearInData();

        const outSetting = (elm:resource_data) => {
            elm.out = Math.round(population * elm.ft);
        };

        for (let i = 0; i < arr81_biomes.length; i++) {
            const biome = biomes.getById(arr81_biomes[i]);
            if (typeof biome === "undefined") continue;
            for (let j = 0; j < biome.resource.length; j++) {
                const r = biome.resource[j];
                // r.rName は resource_variety 型なのでキーとして安全
                this.resource[r.rName].in += r.in;
            }
        }

        // 集計が終わったら out を設定
        for (let j = 0; j < this.resourceNames.length; j++) {
            const name = this.resourceNames[j];
            outSetting(this.resource[name]);
        }

        this.goTurn();
    }
}