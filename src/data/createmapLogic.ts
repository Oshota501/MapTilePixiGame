import { ChunkArea } from "./chunk";
import { Vector2 } from "../type";
import { GameDatas } from "./gamedata";
import { random } from "../mt/random";
import { biomes } from "./biomes";
import { terrain_CreateLogicType, terrains } from "./terrain";

type CreateMapParamater = {
    terrain_clutter : number ,
    min_radiusOfTerrain : number ,
    Detailed_terrain_search_ange : number ,
    continental_density :number ,
    before_biome_id : number ,
    after_biome_id : number ,
}
export const createMapLogic_1 = async function(gamedata:GameDatas):Promise<void>{
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
    terrain : terrain_CreateLogicType
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
                position.x / (gamedata.s.width*ChunkArea.width) ,
                position.y / (gamedata.s.height*ChunkArea.height )
            )
            if(arr[i] == landid){
                if(random.next() <= 0.006){
                    const b : terrain_CreateLogicType = terrains.getLandTerrainRandom(position_nr);
                    add_terrainsOfLand.push({
                        name : b.name ,
                        terrain : b ,
                        p : position
                    })
                }
            }else{
                if(random.next() <= 0.005){
                    const b : terrain_CreateLogicType = terrains.getSeaTerrainRandom(position_nr);
                    add_terrainsOfSea.push({
                        name : b.name ,
                        terrain : b ,
                        p : position
                    })
                }
            }
        }
        
    }
    if(add_terrainsOfLand.length == 0 || add_terrainsOfSea.length == 0)return createTerrain(gamedata,landid,seaid) ;
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
            add_terrain[minIndex].terrain.logic(position,gamedata) ;
        }
    }
    for(let y = 0 ; y < mapsize.height ; y ++)for(let x = 0 ; x < mapsize.width ; x ++){
        const arr = c[x+y*mapsize.width].geographyData ;
        for(let i = 0 ; i < arr.length ; i ++){
            const position = new Vector2(
                x*ChunkArea.width + i%ChunkArea.width ,
                y*ChunkArea.height + Math.floor(i/ChunkArea.height)
            )
            const [arr9,flag] = gamedata.getAreaBiome(position,1) ;
            if(flag){
                const r : number = forNot190(arr9,biomes.isLand(arr[i])) ;
                arr[i] = r;
            }
        }
    }
    function forNot190(arr9:Uint8Array,island:boolean):number{
        const r = arr9[random.nextInt(arr9.length)] ;
        if(190 <= r && r < 200)return forNot190(arr9,island);
        return r ;
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
            let [land,sea] = gamadata.getAreaBiomeLand25(position)
            const minnum = Math.min(sea,land)
            sea *= sea -minnum ;
            land *= land -minnum ;
            if(random.next()*(sea+land) > sea){
                arr[i] = paramater.after_biome_id;
            }else{
                arr[i] = paramater.before_biome_id;
            }
        }
        
    }
}