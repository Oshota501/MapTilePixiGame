import { biomes } from "../data/biomes";
import { game } from "../main"

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
            console.log(`id : ${biome.id} name : ${biome.name} \n最大人口 : ${biome.max_population}`)
            break ;
        default :
    }
})