import { game } from "./main"
import { Vector2 } from "./type"
export async function testfunc(){ 
    setTimeout(function(){
        console.log(game.gamedata.changeBiome([
            {
                x:0,
                y:0,
                biome_id:3
            }
        ]),
        game.gamedata.getAreaBiome(new Vector2(2,2),2))
    },2000)
}
