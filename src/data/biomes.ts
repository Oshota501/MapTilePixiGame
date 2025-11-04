export type biome = {
    name : string
    img : string 
    max_population : number 
    id:number
}
const d_biomes : biome[] = [
    // 0番台 land
    // 0~10 草原
    {
        name : "plank" ,
        img : "plank_dot",
        max_population : 160 ,
        id : 0, 
    },{
        name : "savanna" ,
        img : "savanna_dot",
        max_population : 80 ,
        id : 1, 
    },{
        name : "fertileplank" ,
        img : "fertileplank_dot",
        max_population : 320 ,
        id : 2, 
    },
    // 10~20 森
    {
        name : "forest" ,
        img : "forest_dot",
        max_population : 130 ,
        id : 10 ,
    },{
        name : "jungle" ,
        img : "jungle_dot",
        max_population : 130 ,
        id : 11 ,
    },
    // 20~40 乾燥帯
    {
        name : "desert" ,
        img : "desert_dot",
        max_population : 10 ,
        id : 20 ,
    },{
        name : "rubble" ,
        img : "rock_dot",
        max_population : 10 ,
        id : 21 ,
    },{
        name : "grandcanyon" ,
        img : "dirt_dot",
        max_population : 10 ,
        id : 22 ,
    },{
        name : "oasis" ,
        img : "wetland_dot",
        max_population : 160 ,
        id : 23 ,
    },
    // 40~50 山岳、寒帯
    {
        name : "snowfield" ,
        img : "snow_dot",
        max_population : 20 ,
        id : 40 ,
    },{
        name : "mountain" ,
        img : "rock_dot",
        max_population : 10 ,
        id : 41 ,
    },{
        name : "mountain" ,
        img : "m1_dot",
        max_population : 10 ,
        id : 42 ,
    },{
        name : "mountain" ,
        img : "m2_dot",
        max_population : 15 ,
        id : 43 ,
    },{
        name : "mountain" ,
        img : "m3_dot",
        max_population : 15 ,
        id : 44 ,
    },{
        name : "mountain" ,
        img : "m4_dot",
        max_population : 15 ,
        id : 45 ,
    },
    // 190 ~ ゲーム要素
    {
        name : "wall" ,
        img : "wall_dot",
        max_population : 0 ,
        id : 190 ,
    },
    // 200番台 sea
    {
        name : "nomalsea" ,
        img : "water_dot",
        max_population : 0 ,
        id : 200 ,
    },{
        name : "leaf" ,
        img : "leaf_dot",
        max_population : 10 ,
        id : 201 ,
    },{
        name : "deepsea" ,
        img : "deepwater_dot",
        max_population : 0 ,
        id : 202 ,
    },
] 

class BiomeDB {
    public readonly biomes : biome[] ;
    public readonly sea_biomes : biome[] ;
    public readonly land_biomes : biome[] ;
    public isSea(id:number):boolean{
        if(id === 254)return true ;
        for(let i = 0 ; i < this.sea_biomes.length ; i ++){
            if(this.sea_biomes[i].id === id){
                return true ;
            }
        }
        return false ;
    }
    public isLand(id:number):boolean{
        if(id === 255)return true ;
        for(let i = 0 ; i < this.land_biomes.length ; i ++){
            if(this.land_biomes[i].id === id){
                return true ;
            }
        }
        return false ;
    }
    constructor(b:biome[]){
        this.biomes = b ;
        this.biomes.push({
            name : "sea" ,
            img : "water_dot",
            max_population : 0 ,
            id : 254 ,
        },{
            name : "land" ,
            img : "desert_dot",
            max_population : 20 ,
            id : 255 ,
        },)
        const sea_biomes : biome[] = [] ;
        const land_biomes : biome[] = [] ;
        for(let i = 0 ; i < b.length ; i ++){
            if(this.biomes[i].id == 254 || this.biomes[i].id ==255 ){

            }else if(this.biomes[i].id >= 200){
                sea_biomes.push(this.biomes[i])
            }else{
                land_biomes.push(this.biomes[i])
            }
            
        }
        this.sea_biomes = sea_biomes ;
        this.land_biomes = land_biomes ;
    }
}

export const biomes = new BiomeDB(d_biomes) ;