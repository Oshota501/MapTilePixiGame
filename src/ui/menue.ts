import { game } from "../main";
import { modeCityButton , modeDotButton} from "./elms";
import { queue } from "./queue";
import { viewCityInfo } from "./viewCityInfo";
import { viewTileInfo } from "./viewTileInfo";

export type menueMode = "city" | "biome" ;
export let mode : menueMode = "city" ;

modeCityButton?.addEventListener("click",()=>{
    mode = "city" ;
    const [ f,c ] = queue.town.getQueue() ;
    if(f){
        viewCityInfo(c) ;
    }
})

modeDotButton?.addEventListener("click",()=>{
    mode = "biome" ;
    viewTileInfo(game.vieportMousePosition) ;
})


