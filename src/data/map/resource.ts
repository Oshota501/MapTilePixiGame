import { random } from "../../mt/random";
import { biomes } from "../biomes";

export type resource_variety = "beaf" | "chicken" | "weat" | "fish" | "rice" | "wood" | "apple" | "rock"|"iron"|"gold"|"copper"|"silver"|"tin"|"coal"|"limestone"|"bauxite" | "bricks" | "wool" | "milk" | "pickaxe" | "axe" | "hoe" | "tea" | "chocolate" ;
export type resource_index = "name" | "message" | "in" | "out" | "stock" | "base" | "cost" | "ft" ;
export type resource_type = "flesh_foods" | "foods" | "materials" | "mining_resource" | "agriculture" | "tools" | "luxury" ;
export type resource_data = {
    name : resource_variety ;
    message : string ;
    in : number ;
    out : number ;
    cost : number ;
    stock : number ;
    base : number ;
    ft: number ;
    typ : resource_type
}
export class MaterialResource {
    /**
     * 幸福度変数　最大値100 変更時は this.setHappy を参照
     */
    public happy : number = 100 ;
    /**
     * this.happy 幸福度
     * @param h 0~100の間で自動で切り捨てされます。
     * @returns void
     */
    public setHappy(h:number):void{
        this.happy = h 
        if(h >= 100){
            this.happy = 100
            return
        }else if(0 >= h){
            this.happy = 0;
            return
        }
        return
    }
    public resource: Record<resource_variety, resource_data> = {
        fish:{
            name : "fish" ,
            message : "海に面していると生産可能です。",
            in:0,
            out:0,
            cost:1200,
            stock:60,
            base:1200,
            ft:0.3,
            typ:"flesh_foods"
        },
        beaf:{
            name : "beaf" ,
            message : "狩猟で一定量手に入ります。放牧することで生産可能です。",
            in:0,
            out:0,
            cost:1600,
            stock:60,
            base:1600,
            ft:0.4,
            typ:"flesh_foods"
        },
        chicken:{
            name : "chicken" ,
            message : "狩猟で一定量手に入ります。放牧することで生産可能です。",
            in:0,
            out:0,
            cost:600,
            stock:60,
            base:600,
            ft:0.5,
            typ:"flesh_foods"
        },
        rice:{
            name : "rice",
            message : "最終で一定量手に入ります。水田があると生産可能です。",
            in:0,
            out:0,
            cost:380,
            stock:300,
            base:380,
            ft:0.9,
            typ:"foods"
        },
        weat:{
            name : "weat",
            message : "最終で一定量手に入ります。小麦畑があると生産可能です。",
            in:0,
            out:0,
            cost:380,
            stock:300,
            base:380,
            ft:0.9,
            typ:"foods"
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
            typ:"materials"
        },
        apple:{
            name : "apple",
            message : "森があると生産可能です。",
            in:0,
            out:0,
            cost:800,
            stock:300,
            base:800,
            ft:0.13,
            typ:"flesh_foods"
        },
        rock:{
            name : "rock",
            message : "森があると生産可能です。",
            in:0,
            out:0,
            cost:250,
            stock:300,
            base:250,
            ft:0.2,
            typ:"mining_resource"
        },
        iron:{
            name : "iron",
            message : "森があると生産可能です。",
            in:0,
            out:0,
            cost:800,
            stock:100,
            base:800,
            ft:0.2,
            typ:"mining_resource"
        },
        copper:{
            name : "copper",
            message : "森があると生産可能です。",
            in:0,
            out:0,
            cost:3400,
            stock:60,
            base:3400,
            ft:0.1,
            typ:"mining_resource"
        },
        silver:{
            name : "silver",
            message : "森があると生産可能です。",
            in:0,
            out:0,
            cost:6700,
            stock:30,
            base:6700,
            ft:0.02,
            typ:"mining_resource"
        },
        gold:{
            name : "gold",
            message : "鉱山で産出します。",
            in:0,
            out:0,
            cost:16800,
            stock:0,
            base:16800,
            ft:0.004,
            typ:"mining_resource"
        },
        tin:{
            name : "tin",
            message : "鉱山で産出します。",
            in:0,
            out:0,
            cost:860,
            stock:300,
            base:860,
            ft:0.2,
            typ:"mining_resource"
        },
        limestone:{
            name : "limestone",
            message : "鉱山で産出します。",
            in:0,
            out:0,
            cost:300,
            stock:300,
            base:300,
            ft:0.2,
            typ:"mining_resource"
        },
        bauxite:{
            name : "bauxite",
            message : "鉱山で産出します。",
            in:0,
            out:0,
            cost:500,
            stock:300,
            base:500,
            ft:0.2,
            typ:"mining_resource"
        },
        coal:{
            name : "coal",
            message : "鉱山で産出します。",
            in:0,
            out:0,
            cost:800,
            stock:300,
            base:800,
            ft:0.55,
            typ:"mining_resource"
        },
        bricks:{
            name : "bricks",
            message : "粘土質の土地から産出します。",
            in:0,
            out:0,
            cost:800,
            stock:300,
            base:800,
            ft:0.08,
            typ:"materials"
        },
        wool:{
            name : "wool",
            message : "放牧することで生産可能です。",
            in:0,
            out:0,
            cost:400,
            stock:300,
            base:400,
            ft:0.35,
            typ:"agriculture"
        },
        milk:{
            name : "milk",
            message : "放牧することで生産可能です。",
            in:0,
            out:0,
            cost:400,
            stock:300,
            base:400,
            ft:0.28,
            typ:"agriculture"
        },
        pickaxe:{
            name : "pickaxe",
            message : "工場を作ることで生産可能です。",
            in:0,
            out:0,
            cost:3000,
            stock:100,
            base:3000,
            ft:0.06,
            typ:"tools"
        },
        axe:{
            name : "axe",
            message : "工場を作ることで生産可能です。",
            in:0,
            out:0,
            cost:2800,
            stock:100,
            base:2800,
            ft:0.06,
            typ:"tools"
        },
        hoe:{
            name : "hoe",
            message : "工場を作ることで生産可能です。",
            in:0,
            out:0,
            cost:2400,
            stock:100,
            base:2400,
            ft:0.06,
            typ:"tools"
        },
        tea:{
            name : "tea",
            message : "茶畑を作ることで生産可能です。",
            in:0,
            out:0,
            cost:1600,
            stock:100,
            base:1600,
            ft:0.04,
            typ:"luxury"
        },
        chocolate:{
            name : "chocolate",
            message : "カカオ農場を作ると生産可能です。",
            in:0,
            out:0,
            cost:1600,
            stock:100,
            base:1600,
            ft:0.01,
            typ:"luxury"
        },
    }

    public resourceNames : resource_variety [] = [
        "beaf","chicken","fish","apple",
        "rice","weat",
        "wood","bricks",
        "wool" , "milk" ,
        "pickaxe" , "axe" ,"hoe" ,
        "tea" , "chocolate" ,
        "rock","iron","copper","gold","silver","tin","coal","limestone","bauxite",
        
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
        let count = 0 ;
        for(let i = 0 ; i < this.resourceNames.length ; i ++){
            const elm = this.resource[this.resourceNames[i]] ;
            setup(elm)
            if(elm.cost-100 > elm.base){
                count ++ ;
            }
        }
        if(count >= this.resourceNames.length/2){
            this.setHappy(this.happy + random.nextInt(6)+1) ;
        }else{
            this.setHappy(this.happy - random.nextInt(6)-1) ;
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