export type biome = {
    name : string
    img : string 
    max_population : number 
    id:number
}
export const biomes : biome[] = [
    {
        name : "sea" ,
        img : "water_dot",
        max_population : 0 ,
        id : 254 ,
    },{
        name : "land" ,
        img : "desert_dot",
        max_population : 20 ,
        id : 255 ,
    },
    // 上のやつは固定で
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
        img : "fertileplankplank_dot",
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
        img : "rock",
        max_population : 10 ,
        id : 41 ,
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