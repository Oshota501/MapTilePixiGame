import { game } from "../../main";

const cityCreate = document.getElementById("city-select") ;
if(cityCreate)cityCreate.addEventListener("click",function(){
    const anim = game.anim.selectcity ;
    anim.isSelect = !anim.isSelect ;
    
})