import { ChunkArea } from "../data/chunk";
import { game } from "../main";
import { Vector2 } from "../type";

export function isInMapV2 (v2:Vector2) :boolean{
    return (
        (
            v2.x < game.worldSize.width * ChunkArea.width &&
            v2.x >= 0
        ) && (
            v2.y < game.worldSize.height * ChunkArea.height &&
            v2.y >= 0
        )
    )
}
export function isInMap (x:number,y:number) :boolean{
    return (
        (
            x < game.worldSize.width * ChunkArea.width &&
            x >= 0
        ) && (
            y < game.worldSize.height * ChunkArea.height &&
            y >= 0
        )
    )
}
