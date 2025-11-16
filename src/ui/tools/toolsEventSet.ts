import { toolsElms, toolsModuleElms } from "./toolsElm";
import "./handleToolsCity" ;
import "./handleToolsFood" ;
import "./handleToolsRoad" ;
import "./handleToolsTrain" ;

function allClearModule():void{
    for(let j = 0 ; j < toolsModuleElms.length ; j ++){
        const elm3 = toolsModuleElms[j] ;
        if(!elm3){
            continue ;
        }
        elm3.style.display ="none" ;
    }
}

allClearModule();

for(let i = 0 ; i < toolsElms.length; i ++){
    const elm1 = toolsElms[i] ;
    const elm2 = toolsModuleElms[i] ;
    if(!elm1 || !elm2){
        continue ;
    }
    
    elm1.addEventListener("click",()=>{
        allClearModule() ;
        elm2.style.display = "flex" ;
    })
}
