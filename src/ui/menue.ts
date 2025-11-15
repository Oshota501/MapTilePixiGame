import { game } from "../main";
import { modeCitiesButton, modeCityButton , modeDotButton} from "./elms";
import { queue } from "./queue";
import viewCitiesRank from "./viewCitiesRank";
import  viewCityInfo  from "./viewCityInfo";
import  viewTileInfo  from "./viewTileInfo";

export type menueMode = "city" | "biome" | "cities";
export let mode : menueMode = "city" ;

export const moveViewport = ()=>{

}

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
modeCitiesButton?.addEventListener("click",()=>{
    mode = "cities" ;
    viewCitiesRank(game.gamedata.cities,"population");
})


