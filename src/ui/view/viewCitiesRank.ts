import { CitiesDB } from "../../data/map/cities";
import { City } from "../../data/map/city";
import { uiContainer1 } from "../elms";

type cities_sort_paramater = "population" | "happy" ;

export default function viewCitiesRank(cities:CitiesDB,param:cities_sort_paramater){
    const city : City[] = cities.city
    switch (param){
        case "population" :
            city.sort((a:City,b:City)=>{
                if(a.poplation > b.poplation){
                    return -1 ;
                }else{
                    return 1 ;
                }
            })
            break;
        case "happy" :
            city.sort((a:City,b:City)=>{
                if(a.resource.happy > b.resource.happy){
                    return -1 ;
                }else{
                    return 1 ;
                }
            })
            break ;
    }   

    const handleAllCities = ():string=>{
        const handleSortVariety = (c:City):string=>{
            switch( param ){
                case "happy" :
                    return `${c.resource.happy}%` ;
                case "population" :
                    return `${c.poplation}人` ;
            }
            return "" ;
        }
        let result : string = "" ;
        for(let i = 0 ; i < city.length ; i ++){
            result += `
                <tr>
                    <td>${i+1}</td>
                    <td>${city[i].cityName}</td>
                    <td>${handleSortVariety(city[i])}</td>
                </tr>
            ` ;
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
                <th>rank</th>
                <th style="font-size:1.3rem;font-weight:700;">都市名</th>
                <th style="font-size:1.3rem;font-weight:700;">${param}</th>
            <thead>
            <tbody>
                ${handleAllCities()}
            </tbody>
        </table>
        `
    }
    
}