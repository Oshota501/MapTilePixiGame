import { City, Town } from "../data/map/city";
import { resource_index } from "../data/map/resource";
import { uiContainer1 } from "./elms";
import { mode } from "./menue";

export function viewCityInfo (city:Town) : void{
    const handleIsCity = (s:resource_index): string =>{
        if(city instanceof City ){
            let result = "" ;
            
            for(let i = 0 ; i < city.resource.resourceNames.length ; i ++){
                let n = city.resource.resource[city.resource.resourceNames[i]][s] ;
                if(typeof n == "number"){
                    if(s=="cost")n*= 100 ;
                    n = Math.floor(n)
                    if(s=="cost")n/= 100 ;
                }

                result += `
                <tr>
                    <td>${city.resource.resource[city.resource.resourceNames[i]].name}</td>
                    <td>${n}</td>
                </tr>
                `
            }
            return result ;
        }else{
            return "" ;
        }
        
    }

    if(uiContainer1 && mode == "city"){
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
                <th colspan="2">${city.townName}</th>
            <thead>
            <tbody>
                <tr>
                    <td>人口</td>
                    <td>${city.poplation}人</td>
                </tr>
                <tr>
                    <td>人口上限</td>
                    <td>${city.max_poplation}人</td>
                </tr>
                <tr>
                    <td colspan="2">価格</td>
                </tr>
                ${handleIsCity("cost")}
                <tr>
                    <td colspan="2">保管庫</td>
                </tr>
                ${handleIsCity("stock")}
                <tr>
                    <td colspan="2">供給</td>
                </tr>
                ${handleIsCity("in")}
                <tr>
                    <td colspan="2">需要</td>
                </tr>
                ${handleIsCity("out")}
                
            </tbody>
        </table>
        `
    }
}
