import { game } from "../main";
import { modeCitiesButton, modeCityButton , modeDotButton, modeStatusButton} from "./elms";
import { queue } from "./queue";
import viewCitiesRank from "./view/viewCitiesRank";
import  viewCityInfo  from "./view/viewCityInfo";
import viewPlayerInfo from "./view/viewPlayerStatus";
import  viewTileInfo  from "./view/viewTileInfo";

export type menueMode = "city" | "biome" | "cities" | "status";
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


modeStatusButton?.addEventListener("click",()=>{
    mode = "status" ;
    viewPlayerInfo();
})