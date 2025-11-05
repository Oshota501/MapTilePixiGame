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
    },{
        name : "taiga" ,
        img : "taiga_dot",
        max_population : 70 ,
        id : 12 ,
    },{
        name : "deva_taiga" ,
        img : "deva_taiga_dot",
        max_population : 40 ,
        id : 13 ,
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
    },{
        name : "mountainForest" ,
        img : "forest_dot",
        max_population : 80 ,
        id : 46 ,
    },
    // 50 ~ 60 川
    {
        name : "river" ,
        img : "water_dot",
        max_population : 160 ,
        id : 50,
    },
    // 100 ~ 人工物関係
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
    public readonly biomes: biome[];
    public readonly byId: Map<number, biome>;
    public readonly sea_biomes: biome[];
    public readonly land_biomes: biome[];
    public readonly seaIds: Set<number>;
    public readonly landIds: Set<number>;

    constructor(b: biome[]) {
        // 元配列は破壊しないでコピー
        this.biomes = [...b];

        // 固有の追加バイオームを追加
        this.biomes.push(
            {
                name: "sea",
                img: "water_dot",
                max_population: 0,
                id: 254,
            },
            {
                name: "land",
                img: "desert_dot",
                max_population: 20,
                id: 255,
            },
        );

        this.byId = new Map<number, biome>();
        this.seaIds = new Set<number>();
        this.landIds = new Set<number>();

        const sea_biomes: biome[] = [];
        const land_biomes: biome[] = [];

        for (const item of this.biomes) {
            this.byId.set(item.id, item);

            // 254/255 は特別扱い（ここではカテゴリに応じて追加）
            if (item.id === 254) {
                sea_biomes.push(item);
                this.seaIds.add(item.id);
                continue;
            }
            if (item.id === 255) {
                land_biomes.push(item);
                this.landIds.add(item.id);
                continue;
            }

            if (item.id >= 200) {
                sea_biomes.push(item);
                this.seaIds.add(item.id);
            } else {
                land_biomes.push(item);
                this.landIds.add(item.id);
            }
        }

        this.sea_biomes = sea_biomes;
        this.land_biomes = land_biomes;
    }

    public isSea(id: number): boolean {
        return this.seaIds.has(id);
    }

    public isLand(id: number): boolean {
        return this.landIds.has(id);
    }

    public getById(id: number): biome | undefined {
        return this.byId.get(id);
    }
}

export const biomes = new BiomeDB(d_biomes) ;