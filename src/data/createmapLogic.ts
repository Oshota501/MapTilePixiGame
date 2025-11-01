import { size } from "../type";
import { ChunkArea } from "./chunk";
import { biomes ,biome} from "./biomes";
import { Vector2 } from "../type";
import { biomeTag } from "../test";

export type biomeCreateLogicType = {
    p : Vector2 ,
    b : biome 
}
export const createMapLogic_1 = function(mapsize:size,c:ChunkArea[]):ChunkArea[]{
    const b: biomeCreateLogicType[] = [] ;
    let count = 0 ;
    for(let i = 0 ; i < biomes.length ; i ++){
        count += biomes[i].weight ;
    }
    for(let i = 0 ; i < mapsize.height*mapsize.width*2 ; i ++){
        const rand_biome = Math.floor(Math.random()*count ) ;
        let count2 = 0 ;
        let biome_id = 0 ;
        for(let i = 0 ; i < biomes.length ; i ++){
            if(count2 <= rand_biome && rand_biome < count2 + biomes[i].weight){
                biome_id = i ;
                break;
            }
            count2 += biomes[i].weight ;
        }
        b.push({
            p : new Vector2(
                Math.floor(Math.random()*ChunkArea.width*mapsize.width) ,
                Math.floor(Math.random()*ChunkArea.height*mapsize.height) 
            ),
            b : biomes[biome_id] ,
        })

    }

    biomeTag(b);

    for(let x = 0 ; x < mapsize.width ; x ++)for(let y = 0 ; y < mapsize.height ; y ++){
        const arr = c[x+y*mapsize.width].geographyData ;
        for(let i = 0 ; i < arr.length ; i ++){
            const pos : Vector2 = new Vector2(
                x*ChunkArea.width  + i%ChunkArea.width ,
                y*ChunkArea.height + Math.floor(i/ChunkArea.width)
            )
            const biome_distance : number [] = [] ;
            for(let j = 0 ; j < b.length ; j ++){
                biome_distance[j] = Vector2.distance_nonSqrt(pos, b[j].p);
            }
            
            const lg_biome_distance : number [] = [] ;
            //const minDistance = Math.min(...biome_distance);
            const maxDistance = Math.max(...biome_distance);
            let sum = 0 ;
            for(let j = 0 ; j < b.length ; j ++){
                lg_biome_distance[j] = maxDistance-(biome_distance[j])
                sum += lg_biome_distance[j] ;
            }
            const biome_random = Math.random()*sum ;
            let sum2 = 0 ;
            for(let j = 0 ; j < b.length ; j ++){
                if(sum2 <= biome_random && biome_random < sum2+biome_distance[j]){
                    arr[i] = b[j].b.id ;
                    break ;
                }
                sum2 += biome_distance[j];
            }
            
        }
    }
    return c ;
}