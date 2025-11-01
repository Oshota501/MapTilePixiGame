export type biome = {
    name : string
    img : string 
    max_population : number 
    id:number
}
export const biomes : biome[] = [
    {
        name : "plank" ,
        img : "plank_dot",
        max_population : 160 ,
        id : 0 
    },{
        name : "sea" ,
        img : "water_dot",
        max_population : 0 ,
        id : 1
    },{
        name : "desert" ,
        img : "desert_dot",
        max_population : 20 ,
        id : 2
    },
] 