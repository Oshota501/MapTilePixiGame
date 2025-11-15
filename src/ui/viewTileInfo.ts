import { biomes } from "../data/biomes";
import { game } from "../main";
import { Vector2 } from "../type";
import { uiContainer1 } from "./elms";
import { mode } from "./menue";

export default function viewTileInfo (v:Vector2) : void{
    const [biomeId,flag] = game.gamedata.getPositionBiome(v) ;
    if(!flag || mode != "biome") return ;
    const biome = biomes.getById(biomeId) ;
    if(typeof biome == "undefined")return ;

    const handleResource = ():string=>{
        let result = "" ;
        for(let i = 0 ; i < biome.resource.length ; i ++){
            const elm = biome.resource[i] ;
            result += `
            <tr>
                <td>${elm.rName}</td>
                <td>${elm.in}</td>
            </tr>`

        }
        return result ;
    }
    if(uiContainer1){
        uiContainer1.innerHTML = `
        <style>
        #cityInfo th{
            border:1px solid;
        }
        #cityInfo td{
            border:1px solid;
        }
        </style>
        <table id="cityInfo" style="border:1px solid;width:100%;">
            <thead>
                <th colspan="2">${biome.name}</th>
            <thead>
            <tbody>
                <tr>
                    <td>debug:id</td>
                    <td>${biome.id}</td>
                </tr>
                <tr>
                    <td>人口上限</td>
                    <td>${biome.max_population}人</td>
                </tr>
                <tr>
                    <td>開拓コスト</td>
                    <td>${biome.devcost}円</td>
                </tr>
                <tr>
                    <td colspan="2">生産性</td>
                </tr>
                <tr>
                    <td>品目</td>
                    <td>生産量</td>
                </tr>
                ${handleResource()}
            </tbody>
        </table>
        `
    }
}
