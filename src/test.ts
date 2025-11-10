// @ts-ignore
import { game } from "./main"
// @ts-ignore
import { Vector2 } from "./type"
// @ts-ignore
import { random } from "./mt/random"

export async function testfunc(){ 
    console.log(game.gamedata.postSubCity(new Vector2(30,30),"new city 1","aaa"))
    // game.gamedata.lines.setLine(new Vector2(0,0),new Vector2(100,100))
    // const arr = game.gamedata.getAreaBiomeBreakDownCount(new Vector2(25,4),2,createList(20,40));
    // console.log(arr)
   //  console.log(game.gamedata.getAreaBiomeBreakDownCount(new Vector2(2,2),2,createList(200,240)))
}
