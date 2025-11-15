import { City, Town } from "../data/map/city";
import { resource_index } from "../data/map/resource";
import { uiContainer1 } from "./elms";
import { mode } from "./menue";

export default function viewCityInfo (city:Town) : void{
    const handleIsCity = (s:resource_index): string =>{
        if(city instanceof City ){
            let result = "" ;
            
            for(let i = 0 ; i < city.resource.resourceNames.length ; i ++){
                const resource = city.resource.resource[city.resource.resourceNames[i]] ;
                let color = "red" ;
                switch(resource.typ){
                    case "flesh_foods" :
                        color = "lightgreen";
                        break ;
                    case "foods" :
                        color = "green" ;
                        break ;
                    case "agriculture" :
                        color = "orange" ;
                        break ;
                    case "luxury" :
                        color = "yellow" ;
                        break ;
                    case "materials" :
                        color = "red" ;
                        break ;
                    case "mining_resource" :
                        color = "lightblue" ;
                        break ;
                    case "tools" :
                        color = "blue" ;
                        break ;
                }
                let n = resource[s] ;
                if(typeof n == "number"){
                    if(s=="cost")n*= 100 ;
                    n = Math.floor(n)
                    if(s=="cost")n/= 100 ;
                }

                result += `
                <tr>
                    <td style="border:2px solid;border-color:${color};">${resource.name}</td>
                    <td>${n}</td>
                </tr>
                `
            }
            return result ;
        }else{
            return "" ;
        }
        
    }

    const handleIsCityResource = () => {
        if(city instanceof City ){
            return `
                <tr>
                    <td>幸福度</td>
                    <td>${city.resource.happy}%</td>
                </tr>
            `
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
                <th colspan="2"  style="font-size:1.3rem;font-weight:700;">${city.townName}</th>
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
                ${handleIsCityResource()}
                <tr>
                    <td colspan="2" style="font-size:1.3rem;font-weight:700;">価格</td>
                </tr>
                ${handleIsCity("cost")}
                <tr>
                    <td colspan="2" style="font-size:1.3rem;font-weight:700;">保管庫</td>
                </tr>
                ${handleIsCity("stock")}
                <tr>
                    <td colspan="2" style="font-size:1.3rem;font-weight:700;">供給</td>
                </tr>
                ${handleIsCity("in")}
                <tr>
                    <td colspan="2" style="font-size:1.3rem;font-weight:700;">需要</td>
                </tr>
                ${handleIsCity("out")}
                
            </tbody>
        </table>
        `
    }
}
