import { ChunkArea } from "./chunk";
import { size , Vector2 } from "../type";

export class GameDatas {
    public chunks : ChunkArea[] = [] ;
    constructor(worldSize : size){
        for(let x = 0 ; x < worldSize.width ; x ++){
            for(let y = 0 ; y < worldSize.height ; y ++){
                this.chunks.push(new ChunkArea(new Vector2(
                    x*ChunkArea.width ,
                    y*ChunkArea.height
                )))
            }
        }
    }
}