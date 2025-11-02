import { ChunkArea } from "./chunk";
import { Vector2 } from "../type";
import { GameDatas } from "./gamedata";
import { random } from "../mt/random";
import { biome, biomes } from "./biomes";

type CreateMapParamater = {
    terrain_clutter : number ,
    min_radiusOfTerrain : number ,
    Detailed_terrain_search_ange : number ,
    continental_density :number ,
    before_biome_id : number ,
    after_biome_id : number ,
}
export const createMapLogic_1 = function(gamedata:GameDatas):void{
    mapClear(gamedata,254)
    // 大陸生成
    const p0 : CreateMapParamater= {
        terrain_clutter : 35 ,
        min_radiusOfTerrain : 3 ,
        Detailed_terrain_search_ange : 2 ,
        continental_density : 1 ,
        before_biome_id : 254 ,
        after_biome_id : 255 ,
    }
    createContinents(gamedata,p0)
    // 島生成
    const p1 : CreateMapParamater= {
        terrain_clutter : 11 ,
        min_radiusOfTerrain : 0 ,
        Detailed_terrain_search_ange : 1 ,
        continental_density : 2 ,
        before_biome_id : 254 ,
        after_biome_id : 255 ,
    }
    createContinents(gamedata,p1)
    createTerrain(gamedata,255,254);
}
type terrain = {
    name : string
    biome : biome
    p : Vector2
}
const createTerrain = function(gamedata :GameDatas,landid:number,seaid:number){
    const mapsize = gamedata.s ;
    const c = gamedata.chunks ;
    const add_terrainsOfLand : terrain[] = [] ;
    const add_terrainsOfSea : terrain[] = [] ;
    
    for(let y = 0 ; y < mapsize.height ; y ++)for(let x = 0 ; x < mapsize.width ; x ++){
        const arr = c[x+y*mapsize.width].geographyData ;
        for(let i = 0 ; i < arr.length ; i ++){
            const position = new Vector2(
                x*ChunkArea.width + i%ChunkArea.width ,
                y*ChunkArea.height + Math.floor(i/ChunkArea.height)
            )
            const position_nr = new Vector2(
                position.x / gamedata.s.width*ChunkArea.width ,
                position.y / gamedata.s.height*ChunkArea.height 
            )
            const [nearData,isSuccess] = gamedata.getAreaBiome(position,2) ;
            if(isSuccess){
                let sea = 0 ;
                let land = 0 ;
                for(let j = 0 ; j < nearData.length ; j++){
                    if(nearData[j] == seaid)sea ++ ;
                    else land ++ ;
                }
            }
            if(arr[i] == landid){
                if(random.next() <= 0.01){
                    const b : biome = biomes.land_biomes[random.nextInt(biomes.land_biomes.length)];
                    add_terrainsOfLand.push({
                        name : b.name ,
                        biome : b ,
                        p : position
                    })
                }
            }else{
                if(random.next() <= 0.005){
                    const b : biome = biomes.sea_biomes[random.nextInt(biomes.sea_biomes.length)];
                    add_terrainsOfSea.push({
                        name : b.name ,
                        biome : b ,
                        p : position
                    })
                }
            }
        }
        
    }
    for(let y = 0 ; y < mapsize.height ; y ++)for(let x = 0 ; x < mapsize.width ; x ++){
        const arr = c[x+y*mapsize.width].geographyData ;
        for(let i = 0 ; i < arr.length ; i ++){
            const distance :number[] = [] ;
            const position = new Vector2(
                x*ChunkArea.width + i%ChunkArea.width ,
                y*ChunkArea.height + Math.floor(i/ChunkArea.height)
            )
            let add_terrain : terrain[] ;
            if(arr[i] == landid){
                add_terrain = add_terrainsOfLand ;
            }else{
                add_terrain = add_terrainsOfSea ;
            }
            let minIndex : number = 0 ;
            for(let j = 0 ; j < add_terrain.length ; j++){
                distance[j] = Vector2.distance(position,add_terrain[j].p);
                if(distance[j]<distance[minIndex]){
                    minIndex = j ;
                }
            }
            arr[i] = add_terrain[minIndex].biome.id ;
        }
    }
}
const mapClear = function(gamedata:GameDatas,clearid:number){
    const mapsize = gamedata.s ;
    const c = gamedata.chunks ;
    for(let y = 0 ; y < mapsize.height ; y ++)for(let x = 0 ; x < mapsize.width ; x ++){
        const arr = c[x+y*mapsize.width].geographyData ;
        for(let i = 0 ; i < arr.length ; i ++){
            arr[i] = clearid
        }
    }
}
const createContinents = function(gamadata:GameDatas,paramater:CreateMapParamater):void{
    const mapsize = gamadata.s ;
    const c = gamadata.chunks ;
    const continents : Vector2[] = [] ;
    for(let i = 0 ; i < mapsize.width * mapsize.height * paramater.continental_density ; i ++){
        continents.push(new Vector2(
            Math.floor(random.next()*mapsize.width*ChunkArea.width),
            Math.floor(random.next()*mapsize.height*ChunkArea.height)
        ))
    }
    for(let y = 0 ; y < mapsize.height ; y ++)for(let x = 0 ; x < mapsize.width ; x ++){
        const arr = c[x+y*mapsize.width].geographyData ;
        for(let i = 0 ; i < arr.length ; i ++){
            const position = new Vector2(
                x*ChunkArea.width + i%ChunkArea.width ,
                y*ChunkArea.height + Math.floor(i/ChunkArea.height)
            )
            const continents_distance : number[] = [] ;
            for(let j = 0 ; j < continents.length ; j ++){
                continents_distance[i]= Vector2.distance(position,continents[j])
                if(continents_distance[i]<paramater.min_radiusOfTerrain){
                    arr[i] = paramater.after_biome_id ;
                    break;
                }else {
                    if(random.next()>(Math.tanh((continents_distance[i]-paramater.min_radiusOfTerrain)/paramater.terrain_clutter))){
                        arr[i] = paramater.after_biome_id ;
                        break;
                    }
                }
            }
            
        }
    }
    // 細かい地形生成
    for(let y = 0 ; y < mapsize.height ; y ++)for(let x = 0 ; x < mapsize.width ; x ++){
        const arr = c[x+y*mapsize.width].geographyData ;
        for(let i = 0 ; i < arr.length ; i ++){
            const position = new Vector2(
                x*ChunkArea.width + i%ChunkArea.width ,
                y*ChunkArea.height + Math.floor(i/ChunkArea.height)
            )
            const [nearData,isSuccess] = gamadata.getAreaBiome(position,paramater.Detailed_terrain_search_ange) ;
            if(isSuccess){
                let sea = 0 ;
                let land = 0 ;
                for(let j = 0 ; j < nearData.length ; j++){
                    if(nearData[j] == paramater.before_biome_id)sea ++ ;
                    else land ++ ;
                }
                const minnum = Math.min(sea,land)
                sea *= sea -minnum ;
                land *= land -minnum ;
                if(random.next()*(sea+land) > sea){
                    arr[i] = paramater.after_biome_id;
                }else{
                    arr[i] = paramater.before_biome_id;
                }
            }else{
                arr[i] = paramater.before_biome_id;
            }
        }
        
    }
}