import handleToolsCity from "./handleToolsCity";
import handleToolsFood from "./handleToolsFood";
import handleToolsRoad from "./handleToolsRoad";
import handleToolsTrain from "./handleToolsTrain";
import { toolsCity, toolsFood, toolsRoad, toolsTrain } from "./toolsElm";

if(toolsCity)toolsCity.addEventListener("click",handleToolsCity) ;
if(toolsRoad)toolsRoad.addEventListener("click",handleToolsRoad) ;
if(toolsTrain)toolsTrain.addEventListener("click",handleToolsTrain) ;
if(toolsFood)toolsFood.addEventListener("click",handleToolsFood) ;
