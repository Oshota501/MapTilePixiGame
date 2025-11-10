import { random } from "../../mt/random";
import { biomes } from "../biomes";

export type resource_data = {
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
            in:0,
            out:0,
            cost:1200,
            stock:60,
            base:1200,
            ft:0.3,
        },
        rice:{
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
                this.foods.rice.in += 15 ;
            }if(biome.id == 2){
                this.foods.rice.in += 30 ;
            }if(biome.id == 10 || biome.id == 11){
                this.material.wood.in += 10 ;
            }if(biome.id == 12 || biome.id == 13){
                this.material.wood.in += 8 ;
            }
            for(let i = 0 ; i < this.resource_all.length ; i ++){
                outSetting(this.resource_all[i])
            }
        }
        this.goTurn()
        
    }
}