import { biomes } from "../data/biomes";
import { game } from "../main"
import { random } from "../mt/random";
import { Vector2 } from "../type";
import { queue } from "./queue";

document.addEventListener("keypress",(e)=>{
    switch(e.key){
        /**
         * デバックようコマンド
         */
        case "c" :
            console.log(game.vieportMousePosition.x,game.vieportMousePosition.y)
            const [biomeid,flag] = game.gamedata.getPositionBiome(game.vieportMousePosition) ;
            if(!flag){
                console.log("マップ外")
                return 
            }
            const biome = biomes.getById(biomeid) ;
            if(typeof biome == "undefined"){
                console.log("存在しないバイオーム: ",biomeid)
                return
            }
            console.log(`id : ${biome.id} \nname : ${biome.name} \n最大人口 : ${biome.max_population}`)
            break ;
        case "l" :
            const [t1,o1] = queue.town.getQueue() ;
            if(!t1) return ;
            game.gamedata.lines.setLine(game.vieportMousePosition,o1.v2position)
            console.log("line to queue") ;
            break ;
        case "d" :
            const [t2,o2] = queue.town.getQueue() ;
            if(!t2) return ;
            let changeData = {
                x: (o2.v2position.x-4)+random.nextInt(9),
                y: (o2.v2position.y-4)+random.nextInt(9),
                biome_id: 100
            }
            const p = new Vector2(changeData.x,changeData.y) ;
            const [b,f] = game.gamedata.getPositionBiome(p)
            
            if(f && b < 200){
                game.gamedata.changeBiomeAt(changeData) ;
                console.log("create field") ;
                const [area , isSuccess ] = game.gamedata.getAreaBiome(p,4) ;
                if(!isSuccess){
                    console.log("create field is faild")
                    return
                }
                o2.upDataMaxPopulation(area)
                return
            }
            console.log("create field is faild") ;
            
            break ;
        case "v" :
            game.gamedata.cities.visible = !game.gamedata.cities.visible ;
            break ;
        default :

    }
})