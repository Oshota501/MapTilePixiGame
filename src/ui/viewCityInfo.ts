import { City, Town } from "../data/map/city";
import { resource_data } from "../data/map/resource";
import { uiContainer1 } from "./elms";

function resourceInfo(r:resource_data[]) : string{
    let result = "" ;
    for(let i = 0 ; i < r.length ; i ++){
        result += `
        <tr>
            <td>${r[i].name}</td>
            <td>${r[i].stock}</td>
        </tr>
        `
    }
    return result ;
}
export function viewCityInfo (city:Town) : void{
    const handleIsCity = (): string =>{
        if(city instanceof City ){
            return resourceInfo(city.resource.resource_all)
        }else{
            return "" ;
        }
        
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
                    <td colspan="2">資源一覧</td>
                </tr>
                ${handleIsCity()}
            </tbody>
        </table>
        `
    }
}
