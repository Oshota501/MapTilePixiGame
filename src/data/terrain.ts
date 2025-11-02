import { random } from "../mt/random";
import { Vector2 } from "../type";
import { biomes } from "./biomes";

export type terrain_CreateLogicType = {
    name : string
    /**
     * @param arr25 Uint8Array 周辺25マスの情報
     * @returns biome_id
     */
    logic : Function
    fortune : number
}

class TerrainsDB {
    public sea_terrain : terrain_CreateLogicType[];
    public sea_terrain_sum : number = 0;
    public getSeaTerrainRandom(nr_position:Vector2):terrain_CreateLogicType{
        const r = random.nextInt(this.sea_terrain_sum) ;
        let counter = 0 ;
        for(let i = 0 ; i < this.sea_terrain.length ; i ++){
            if(counter<=r && r<counter+this.sea_terrain[i].fortune){
                return this.sea_terrain[i] ;
            }
            counter += this.sea_terrain[i].fortune ;
        }
        return this.sea_terrain[0] ;
    }

    public land_terrain : terrain_CreateLogicType[] ;
    public land_terrain_sum : number = 0;
    public getLandTerrainRandom(nr_position:Vector2):terrain_CreateLogicType{
        const r = random.nextInt(this.land_terrain_sum) ;
        let counter = 0 ;
        for(let i = 0 ; i < this.land_terrain.length ; i ++){
            if(counter<=r && r<counter+this.land_terrain[i].fortune){
                return this.land_terrain[i] ;
            }
            counter += this.land_terrain[i].fortune ;
        }
        return this.land_terrain[0] ;
    }

    constructor(
        landterrain :terrain_CreateLogicType[],
        seaterrain :terrain_CreateLogicType[]
    ){
        this.sea_terrain = seaterrain ;
        this.land_terrain = landterrain ;
        for(let i = 0 ; i < seaterrain.length ; i ++){
            this.sea_terrain_sum += seaterrain[i].fortune ;
        }
        for(let i = 0 ; i < landterrain.length ; i ++){
            this.land_terrain_sum += landterrain[i].fortune ;
        }
    }
}

export const terrains = new TerrainsDB(
    [
        {
            name : "nomal_plank" ,
            logic : function(arr25:Uint8Array){
                let land = 0 ;
                let sea = 0 ;
                for(let i = 0 ; i < arr25.length ; i ++){
                    if(biomes.isLand(arr25[i])){
                        land ++ ;
                    }else{
                        sea ++ ;
                    }
                }
                if(land>13){
                    if(random.next()<0.02)
                        return 10 ;
                    else
                        return 0 ;
                }else{
                    if(random.next()<0.15)
                        return 20 ;
                    else
                        return 0 ;
                }
                
            } ,
            fortune : 20 ,
        },{
            name : "nomal_forest" ,
            logic : function(arr25:Uint8Array){
                let land = 0 ;
                let sea = 0 ;
                for(let i = 0 ; i < arr25.length ; i ++){
                    if(biomes.isLand(arr25[i])){
                        land ++ ;
                    }else{
                        sea ++ ;
                    }
                }
                if(land>13){
                    if(random.next()<0.04)
                        return 0 ;
                    else
                        return 10 ;
                }else{
                    if(random.next()<0.5)
                        return 0 ;
                    else
                        return 10 ;
                }
                
            } ,
            fortune : 7 ,
        },{
            name : "nomal_desert" ,
            // @ts-ignore
            logic : function(arr25:Uint8Array){
                if(random.next()<0.99)
                    return 20 ;
                else 
                    return 23 ;
            } ,
            fortune : 25 ,
        },{
            name : "nomal_mountain" ,
            // @ts-ignore
            logic : function(arr25:Uint8Array){
                if(random.next()<0.74)
                    return 40 ;
                else 
                    return 41 ;
            } ,
            fortune : 7 ,
        },
    ],[
        {
            name : "nomal_sea" ,
            logic : function(arr25:Uint8Array){
                let land = 0 ;
                let sea = 0 ;
                for(let i = 0 ; i < arr25.length ; i ++){
                    if(biomes.isLand(arr25[i])){
                        land ++ ;
                    }else{
                        sea ++ ;
                    }
                }
                if(sea >= 25){
                    return 202 ;
                }else{
                    if(land<random.nextInt(25))
                        return 201 ;
                    else
                        return 200 ;
                }
                
            } ,
            fortune : 20 ,
        },
    ]
);