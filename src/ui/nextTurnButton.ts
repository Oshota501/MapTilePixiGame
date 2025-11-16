import { game } from "../main";
import { nextTurnButton } from "./elms";
import { queue } from "./queue";
import viewCitiesRank from "./view/viewCitiesRank";
import viewCityInfo from "./view/viewCityInfo";
import viewPlayerInfo from "./view/viewPlayerStatus";
import viewTileInfo from "./view/viewTileInfo";

export let turn = 1 ;

let isLoad = false ;

nextTurnButton?.addEventListener("click",function(){
    if(nextTurnButton && !isLoad){
        game.nextTurn() ;
        isLoad = true ;
        turn ++ ;
        for(let j = 0 ; j < 4 ; j ++){
            for(let i = 0 ; i < 3 ; i ++){
                setTimeout(function(){
                    if(nextTurnButton)nextTurnButton.innerHTML = (()=>{
                        if(i==0)return "."
                        if(i==1)return ".."
                        return "..."
                    })()
                },200*i + j*600)
            }
        }
        setTimeout(function(){
            if(nextTurnButton)nextTurnButton.innerHTML = `Next Turn (${turn+1})` ;
            isLoad = false ;
        },12*200)
    }
    const [f,q] = queue.town.getQueue() ;
    if(f)viewCityInfo(q);
    viewCitiesRank(game.gamedata.cities,"population");
    viewTileInfo(game.vieportMousePosition)
    viewPlayerInfo();
})
