import { ChunkArea } from "./chunk";
import { Vector2 } from "../type";
import { GameDatas } from "./gamedata";
import { random } from "../mt/random";

const paramater = {
    terrain_clutter : 10 ,
    min_radiusOfTerrain : 6 ,
    Detailed_terrain_search_ange : 1 ,
}
export const createMapLogic_1 = function(gamadata:GameDatas):ChunkArea[]{
    const mapsize = gamadata.s ;
    const c = gamadata.chunks ;
    // 大陸生成
    const continents : Vector2[] = [] ;
    for(let i = 0 ; i < mapsize.width * mapsize.height * 4 ; i ++){
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
            let flag = false ;
            for(let j = 0 ; j < continents.length ; j ++){
                continents_distance[i]= Vector2.distance(position,continents[j])
                if(continents_distance[i]<paramater.min_radiusOfTerrain){
                    arr[i] = 2 ;
                    flag = true;
                    break;
                }else {
                    if(random.next()>(Math.tanh((continents_distance[i]-paramater.min_radiusOfTerrain)/paramater.terrain_clutter))){
                        arr[i] = 2 ;
                        flag = true;
                        break;
                    }
                }
            }
            if(!flag)arr[i] = 1 ;
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
                    if(nearData[j] == 1)sea ++ ;
                    else land ++ ;
                }
                const minnum = Math.min(sea,land)
                sea *= sea -minnum ;
                land *= land -minnum ;
                if(random.next()*(sea+land) > sea){
                    arr[i] = 2;
                }else{
                    arr[i] = 1
                }
            }
        }
        
    }
    return c ;
}