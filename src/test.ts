// @ts-ignore
import { game } from "./main"
// @ts-ignore
import { Vector2 } from "./type"
// @ts-ignore
import { random } from "./mt/random"
import { Line } from "./anim/lines/Line"
import { OnLineAnimation } from "./anim/lines/onLineAnimation"
import { LineNode } from "./anim/lines/Node"

export async function testfunc(){ 
    if(game.dynamic){
        game.dynamic.player.setMoveToMap(new Vector2(0,30))
    }

    // console.log(game.gamedata.postSubCity(new Vector2(30,30),"new city 1","aaa"))
    // game.gamedata.lines.setLine(new Vector2(0,0),new Vector2(100,100))
    // const arr = game.gamedata.getAreaBiomeBreakDownCount(new Vector2(25,4),2,createList(20,40));
    // console.log(arr)
   //  console.log(game.gamedata.getAreaBiomeBreakDownCount(new Vector2(2,2),2,createList(200,240)))
   const line = new Line(0,
        new LineNode(0,0),
        new LineNode(20,20),
        new LineNode(50,20),
        new LineNode(50,50),
   )
   game.lines.setLine(line)
   line.setAnim(new OnLineAnimation(
        game.anim
   ),false)
}
