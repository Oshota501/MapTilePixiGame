import { random } from "../../mt/random";
import { biomes, biomesID } from "../biomes";

export type resource_variety = "weat" | "fish" | "rice" | "wood"
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
    public foods = {
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
        }
    }
    public material = {
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

    public resource_all : resource_data[] = [
        this.foods.fish,
        this.foods.rice,
        this.foods.weat,
        this.material.wood
    ] ;
    public goTurn(){
        const setup = function(elm:resource_data){
            if ( elm.stock + elm.in - elm.out > 0 ){
                elm.stock += elm.in - elm.out ;
            }else{
                elm.stock = 0 ;
            }
            if(elm.stock > 0){
                elm.cost -= random.next()*elm.base/20
                if(elm.cost < elm.base/3 ){
                    elm.cost = elm.base/3 ;
                }
            }else{
                elm.cost += random.next()*elm.base/100
            }
            if(elm.base < elm.cost){
                elm.out -= random.next()*elm.out/100
            }else{  
                elm.out += random.next()*elm.out/100
            }
            
        }
        for(let i = 0 ; i < this.resource_all.length ; i ++){
            setup(this.resource_all[i])
        }
              
    }
    constructor(arr81_biomes:Uint8Array,population:number){
        this.updata(arr81_biomes,population)
    }
    public updata(arr81_biomes:Uint8Array,population:number){
        const outSetting = function (elm:resource_data){
            elm.out = Math.round(population*elm.ft) ;
        }
        for(let i = 0 ; i < arr81_biomes.length ; i ++){
            const biome = biomes.getById(arr81_biomes[i])
            if(typeof biome == "undefined"){
                continue ;
            }
            if(biome.id >= 200){
                this.foods.fish.in += 10 ;
            }if(biome.id == 0){
                this.foods.weat.in += 15 ;
            }if(biome.id == 2){
                this.foods.weat.in += 30 ;
            }if(biome.id == 10 || biome.id == 11){
                this.material.wood.in += 10 ;
            }if(biome.id == 12 || biome.id == 13){
                this.material.wood.in += 8 ;
            }if(biome.id >= biomesID.weat[0] && biome.id <= biomesID.weat[biomesID.weat.length-1]){
                if(biome.id == biomesID.weat[0] )this.foods.weat.in += 60  ;
                if(biome.id == biomesID.weat[1] )this.foods.weat.in += 77  ;
                if(biome.id == biomesID.weat[2] )this.foods.weat.in += 94  ;
            }if(biome.id >= biomesID.rice[0] && biome.id <= biomesID.rice[biomesID.rice.length-1]){
                if(biome.id == biomesID.rice[0] )this.foods.rice.in += 60  ;
                if(biome.id == biomesID.rice[1] )this.foods.rice.in += 77  ;
                // if(biome.id == biomesID.rice[2] )this.foods.rice.in += 94  ;
            }

            for(let i = 0 ; i < this.resource_all.length ; i ++){
                outSetting(this.resource_all[i])
            }
        }
        this.goTurn()
        
    }
}