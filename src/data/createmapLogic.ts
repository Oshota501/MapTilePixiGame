import { ChunkArea } from "./chunk";
import { size, Vector2 } from "../type";
import { GameDatas } from "./gamedata";
import { random } from "../mt/random";
import { biomes, biomesID } from "./biomes";
import { terrain_CreateLogicType, terrains } from "./terrain";
import { game } from "../main";

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
    createTerrain(gamedata,255,254,50);
}
type terrain = {
    name : string
    terrain : terrain_CreateLogicType
    p : Vector2
}
const createTerrain = function(gamedata :GameDatas,landid:number,seaid:number,riverid:number){
    const mapsize = gamedata.s ;
    const c = gamedata.chunks ;
    const add_terrainsOfLand : terrain[] = [] ;
    const add_terrainsOfSea : terrain[] = [] ;
    const add_river : Vector2[] = [] ;
    
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
                if(random.next() <= 0.004){
                    const b : terrain_CreateLogicType = terrains.getLandTerrainRandom(position_nr);
                    add_terrainsOfLand.push({
                        name : b.name ,
                        terrain : b ,
                        p : position
                    })
                    // game.maptag20.postText(position,b.name)
                }
            }else{
                if(random.next() <= 0.004){
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
    if(add_terrainsOfLand.length == 0 || add_terrainsOfSea.length == 0)return createTerrain(gamedata,landid,seaid,riverid) ;
    // バイオーム生成
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
            arr[i] = add_terrain[minIndex].terrain.base ;
        }
    }
    // 詳細な地形、環境
    for(let y = 0 ; y < mapsize.height ; y ++)for(let x = 0 ; x < mapsize.width ; x ++){
        const arr = c[x+y*mapsize.width].geographyData ;
        for(let i = 0 ; i < arr.length ; i ++){
            const distance :number[] = [] ;
            const position = new Vector2(
                x*ChunkArea.width + i%ChunkArea.width ,
                y*ChunkArea.height + Math.floor(i/ChunkArea.height)
            )
            let add_terrain : terrain[] ;
            if(biomes.isLand(arr[i])){
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
            arr[i] = add_terrain[minIndex].terrain.logic(position,gamedata) ;
        }
    }
        // バイオームを慣らす
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
    // かわ
    for(let y = 0 ; y < mapsize.height ; y ++)for(let x = 0 ; x < mapsize.width ; x ++){
        const arr = c[x+y*mapsize.width].geographyData ;
        for(let i = 0 ; i < arr.length ; i ++){
            const position = new Vector2(
                x*ChunkArea.width + i%ChunkArea.width ,
                y*ChunkArea.height + Math.floor(i/ChunkArea.height)
            )
            // const [land,] = gamedata.getAreaBiomeLand25(position) ;
            if( 
                arr[i] >= 40 && arr[i] < 50 
            ){
                if(random.next()<0.002){
                    add_river.push(position)
                }
            }else if(arr[i] >= 10 && arr[i] < 20 ){
                if(random.next()<0.0001){
                    add_river.push(position)
                }
            }
        }
    }
    const skip_river = new Set<number> ;
    for(let i = 0 ; i < add_river.length ; i ++ ){
        if(skip_river.has(i)){
            // console.log(i)
            continue ;
        }
        game.maptag20.postTestPin(add_river[i],"river start")
        for(let j = i+1 ; j < add_river.length ; j ++){
            if(i==j){
                continue ;
            }else{
                if(Vector2.distance(add_river[i],add_river[j] ) <= 20 ){
                    skip_river.add(j)
                };
            }
        }
    }
    for(let i = 0 ; i < add_river.length ; i ++ ){
        if(skip_river.has(i)){
            continue ;
        }
        let min_riversea = Vector2.distance(add_river[i],add_terrainsOfSea[0].p);
        let index = 0 ;
        for(let j = 0 ; j < add_terrainsOfSea.length ; j ++){
            const s = Vector2.distance(add_river[i],add_terrainsOfSea[j].p) ;
            if(s<min_riversea){
                min_riversea = s ;
                index = j ;
            }
        }
        const ps_size: size = add_river[i].diff(add_terrainsOfSea[index].p)
        const abs_f: number = Math.abs(ps_size.width)/(Math.abs(ps_size.width) +  Math.abs(ps_size.height))
        // console.log(abs_f)
        let flag = true ;
        let nowP = add_river[i] ;
        // gamedata.lines.setLine(add_river[i],add_terrainsOfSea[index].p)
        while(flag){
            if(abs_f > random.next()){
                if(ps_size.width>=0){
                    nowP.x -- ;
                }else{
                    nowP.x ++ ;
                } 
            }else{
                if(ps_size.height>=0){
                    nowP.y -- ;
                }else{
                    nowP.y ++ ;
                }
            }
            const [bio,isSuccess] = gamedata.getPositionBiome(nowP)
            if(!isSuccess)  break ;

            if(bio>200 || bio == biomesID.river) flag = false ;
            else(gamedata.changeBiomeAt({
                x:nowP.x,
                y:nowP.y,
                biome_id:biomesID.river 
            },false))
        }
    }
    // 都市
    let cityCount = 0 ;
    for(let y = 0 ; y < mapsize.height ; y ++)for(let x = 0 ; x < mapsize.width ; x ++){
        const arr = c[x+y*mapsize.width].geographyData ;
        for(let i = 0 ; i < arr.length ; i ++){
            if(0.004 > random.next() && biomes.isLand(arr[i])){
                const position = new Vector2(
                    x*ChunkArea.width + i%ChunkArea.width ,
                    y*ChunkArea.height + Math.floor(i/ChunkArea.height)
                )
                gamedata.postCity(position,`new city ${cityCount}`) ;
                cityCount ++ ;
            }
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