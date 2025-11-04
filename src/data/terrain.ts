import createList from "../mt/createList";
import { random } from "../mt/random";
import { Vector2 } from "../type";
import { GameDatas } from "./gamedata";

export type terrain_CreateLogicType = {
    name : string
    /**
     * @param p 座標
     * @returns biome_id
     */
    logic : (p: Vector2,gamedata:GameDatas) => number
    fortune : (y: number) => number
    base : number
}

class TerrainsDB {
    public sea_terrain : terrain_CreateLogicType[];
    public sea_terrain_sum : number[] = [];
    public getSeaTerrainRandom(nr_position:Vector2):terrain_CreateLogicType{
        const r = random.next()*this.sea_terrain_sum[Math.floor(nr_position.y*1000)] ;
        let counter = 0 ;
        for(let i = 0 ; i < this.sea_terrain.length ; i ++){
            if(counter<=r && r<counter+this.sea_terrain[i].fortune(nr_position.y)){
                return this.sea_terrain[i] ;
            }
            counter += this.sea_terrain[i].fortune(nr_position.y) ;
        }
        return this.sea_terrain[0] ;
    }

    public land_terrain : terrain_CreateLogicType[] ;
    public land_terrain_sum : number[] = [];
    public getLandTerrainRandom(nr_position:Vector2):terrain_CreateLogicType{
        const r = random.next()*this.land_terrain_sum[Math.floor(nr_position.y*1000)] ;
        let counter = 0 ;
        for(let i = 0 ; i < this.land_terrain.length ; i ++){
            if(counter<=r && r<counter+this.land_terrain[i].fortune(nr_position.y)){
                return this.land_terrain[i] ;
            }
            counter += this.land_terrain[i].fortune(nr_position.y) ;
        }
        return this.land_terrain[0] ;
    }

    constructor(
        landterrain :terrain_CreateLogicType[],
        seaterrain :terrain_CreateLogicType[]
    ){
        this.sea_terrain = seaterrain ;
        this.land_terrain = landterrain ;
        for(let j = 0 ; j < 1000 ; j ++){
            let sea_sum = 0 ;
            let land_sum = 0 ;
            for(let i = 0 ; i < seaterrain.length ; i ++){
                sea_sum += seaterrain[i].fortune(j/1000) ;
            }
            for(let i = 0 ; i < landterrain.length ; i ++){
                land_sum += landterrain[i].fortune(j/1000) ;
            }
            this.sea_terrain_sum[j] = sea_sum ;
            this.land_terrain_sum[j] = land_sum ;
        }

    }
}

export const terrains = new TerrainsDB(
    [
        {
            name : "nomal_plank" ,
            logic : function(p:Vector2,gamedata:GameDatas):number{
                const [land,_] = gamedata.getAreaBiomeLand25(p);
                if(land>13){
                    if(random.next()<0.02)
                        return 10 ;
                    else
                        return 0 ;
                }else{
                    if(random.next()<0.15)
                        return 20 ;
                    else
                        return 0 ;
                }
                
            } ,
            fortune : function(y:number):number{
                return 20*(Math.exp(-80*(y-0.36)**2)+Math.exp(-80*(y-0.64)**2))
            } ,
            base : 0 
        },{
            name : "nomal_forest" ,
            logic : function(p:Vector2,gamedata:GameDatas):number{
                const [land,_] = gamedata.getAreaBiomeLand25(p);
                if(land>13){
                    if(random.next()<0.04)
                        return 0 ;
                    else
                        return 10 ;
                }else{
                    if(random.next()<0.5)
                        return 0 ;
                    else
                        return 10 ;
                }
                
            } ,
            fortune : function(y:number):number{
                return 7*(Math.exp(-100*(y-0.41)**2)+Math.exp(-100*(y-0.59)**2))
            } ,
            base : 10
        },{
            name : "taiga_forest" ,
            // @ts-ignore
            logic : function(p:Vector2,gamedata:GameDatas):number{
                const [,desert,] = gamedata.getAreaBiomeBreakDownCount(p,2,createList(20,40))
                if(desert>=4){
                    return 13;
                }
                return 12;
            } ,
            fortune : function(y:number):number{ 
                return 25*(Math.exp(-60*(y-0.18)**2)+Math.exp(-60*(y-0.82)**2))
            },
            base : 12
        },{
            name : "nomal_desert" ,
            // @ts-ignore
            logic : function(p:Vector2,gamedata:GameDatas):number{
                if(random.next()<0.99)
                    return 20 ;
                else 
                    return 23 ;
            } ,
            fortune : function(y:number):number{ 
                return 25*(Math.exp(-40*(y-0.30)**2)+Math.exp(-40*(y-0.70)**2))
            },
            base : 20
        },{
            name : "plateau_desert" ,
            // @ts-ignore
            logic : function(p:Vector2,gamedata:GameDatas):number{
                const r = random.next() ;
                if(r<0.29)
                    return 21 ;
                else if(r<0.66)
                    return 22 ;
                else if(r<0.99)
                    return 20 ;
                else 
                    return 23 ;
            } ,
            fortune : function(y:number):number{ 
                return 20*(Math.exp(-60*(y-0.25)**2)+Math.exp(-60*(y-0.75)**2))
            },
            base : 21
        },{
            name : "nomal_mountain" ,
            // @ts-ignore
            logic : function(p:Vector2,gamedata:GameDatas):number{
                const r = random.next() ;
                let [,,notmountain] = gamedata.getAreaBiomeBreakDownCount(p,3,createList(40,50));
                if(notmountain >= 8)
                    return 46 ;
                if(r<=0.1)
                    return 40 ;
                else if(r<=0.2)
                    return 45 ;
                else if(r<=0.3)
                    return 41 ;
                else if(r<=0.6)
                    return 42 ;
                else if(r<=0.8)
                    return 43 ;
                else
                    return 44 ;
            } ,
            // @ts-ignore
            fortune : function(y:number){ 
                return 8
             } ,
             base : 41
        },{
            name : "desert_cold" ,
            // @ts-ignore
            logic : function(p:Vector2,gamedata:GameDatas):number{
                if(random.next()<0.96)
                    return 42 ;
                else 
                    return 43 ;
            } ,
            fortune : function(y:number):number{ 
                return 25*(Math.exp(-100*(y-0.08)**2)+Math.exp(-100*(y-0.92)**2))
            },
            base : 42
        },{
            name : "nomal_snowfield" ,
            // @ts-ignore
            logic : function(p:Vector2,gamedata:GameDatas):number{
                if(random.next()<0.96)
                    return 40 ;
                else 
                    return 42 ;
            } ,
            fortune : function(y:number):number{ 
                return 100*(Math.exp(-60*(y)**2)+Math.exp(-60*(y-1)**2))
            },
            base : 40
        }
    ],[
        {
            name : "nomal_sea" ,
            logic : function(p:Vector2,gamedata:GameDatas):number{
                const [land,sea] = gamedata.getAreaBiomeLand25(p);
                if(sea >= 25){
                    return 202 ;
                }else{
                    if(land<random.nextInt(25))
                        return 201 ;
                    else
                        return 200 ;
                }
                
            } ,
            fortune : function(y:number):number{
                y
                return 20 
            },
            base : 200
        },
    ]
);