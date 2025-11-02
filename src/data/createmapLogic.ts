import { size } from "../type";
import { ChunkArea } from "./chunk";
import { biome} from "./biomes";
import { terrain } from "./terrain";
import { Vector2 } from "../type";

export const createMapLogic_1 = function(mapsize:size,c:ChunkArea[]):ChunkArea[]{
    // 大陸生成
    const continents : Vector2[] = [] ;
    for(let i = 0 ; i < mapsize.width * mapsize.height * 4 ; i ++){
        continents.push(new Vector2(
            Math.floor(Math.random()*mapsize.width*ChunkArea.width),
            Math.floor(Math.random()*mapsize.height*ChunkArea.height)
        ))
    }
    for(let x = 0 ; x < mapsize.width ; x ++)for(let y = 0 ; y < mapsize.height ; y ++){
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
                if(continents_distance[i]<6){
                    arr[i] = 2 ;
                    flag = true;
                    break;
                }else {
                    if(Math.random()>(Math.tanh((continents_distance[i]-6)/5))){
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
    for(let x = 0 ; x < mapsize.width ; x ++)for(let y = 0 ; y < mapsize.height ; y ++){
        const arr = c[x+y*mapsize.width].geographyData ;
        for(let i = 0 ; i < arr.length ; i ++){
            const position = new Vector2(
                x*ChunkArea.width + i%ChunkArea.width ,
                y*ChunkArea.height + Math.floor(i/ChunkArea.height)
            )
        }
    }
    return c ;
}