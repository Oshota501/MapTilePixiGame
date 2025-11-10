import { random } from "../../mt/random";

export type resource_data = {
    name : string ;
    in : number ;
    out : number ;
    cost : number ;
    stock : number ;
    base : number ;
}
export class MaterialResource {
    public foods : resource_data[] = [
        {
            name:"rice",
            in:10,
            out:10,
            cost:380,
            stock:300,
            base:380,
        }
    ] ;
    public material : resource_data[] = [
        {
            name:"wood",
            in:10,
            out:10,
            cost:600,
            stock:30,
            base:600,
        },
    ] ;
    public goTurn(){
        for(let i = 0 ; i < this.foods.length ; i ++){
            const elm = this.foods[i] ;
            if ( elm.stock + elm.in - elm.out > 0 ){
                elm.stock += elm.in - elm.out ;
                elm.cost += Math.log(elm.out - elm.in)*random.next()*elm.base/20
            }else{
                elm.stock = 0 ;
                elm.cost += random.next()*elm.base/5 ;
            }
        }
        for(let i = 0 ; i < this.material.length ; i ++){
            const elm = this.material[i] ;
            if ( elm.stock + elm.in - elm.out > 0 ){
                elm.stock += elm.in - elm.out ;
                elm.cost += Math.log(elm.out - elm.in)*random.next()*elm.base/60
            }else{
                elm.stock = 0 ;
                elm.cost += random.next()*elm.base/15 ;
            }
        }
    }
    constructor(arr81_biomes:Uint8Array){
        
    }
}