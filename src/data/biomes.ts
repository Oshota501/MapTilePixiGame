export type biome = {
    name : string
    img : string 
    max_population : number 
    id:number
    weight:number
}
export const biomes : biome[] = [
    {
        name : "plank" ,
        img : "plank_dot",
        max_population : 160 ,
        id : 0, 
        weight : 4 
    },{
        name : "sea" ,
        img : "water_dot",
        max_population : 0 ,
        id : 1 ,
        weight : 10
    },{
        name : "desert" ,
        img : "desert_dot",
        max_population : 20 ,
        id : 2 ,
        weight : 6
    },{
        name : "forest" ,
        img : "forest_dot",
        max_population : 160 ,
        id : 3 ,
        weight : 2
    },{
        name : "jungle" ,
        img : "jungle_dot",
        max_population : 160 ,
        id : 4 ,
        weight : 2
    },
] 