import { game } from "../../main";

const cityCreate = document.getElementById("city-select") ;
if(cityCreate)cityCreate.addEventListener("click",function(){
    game.anim.selectcity.isSelect = true ;
})