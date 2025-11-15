import { resource_variety } from "./map/resource"

export type biome = {
    name : string
    img : string 
    max_population : number 
    id:number
    resource : {
        rName : resource_variety
        in : number ,
    }[],
    devcost : number ,
}
const d_biomes : biome[] = [
    // 0番台 land
    // 0~10 草原
    {
        name : "plank" ,
        img : "plank_dot",
        max_population : 160 ,
        id : 0, 
        resource : [
            {rName:"weat",in:6},
            {rName:"rice",in:3},
            {rName:"rock",in:1},
            {rName:"beaf",in:1},
            {rName:"chicken",in:1},
        ],
        devcost:90000,
    },{
        name : "savanna" ,
        img : "savanna_dot",
        max_population : 80 ,
        id : 1, 
        resource : [
            {rName:"rock",in:1},
            {rName:"beaf",in:1},
            {rName:"chicken",in:1},
        ],
        devcost:90000,
    },{
        name : "fertileplank" ,
        img : "fertileplank_dot",
        max_population : 320 ,
        id : 2, 
        resource : [
            {rName:"weat",in:13},
            {rName:"rice",in:9},
            {rName:"rock",in:1},
            {rName:"beaf",in:1},
            {rName:"chicken",in:1},
        ],
        devcost:90000,
    },
    // 10~20 森
    {
        name : "forest" ,
        img : "forest_dot",
        max_population : 130 ,
        id : 10 ,
        resource : [
            {rName:"wood",in:16},
            {rName:"apple",in:6},
            {rName:"beaf",in:1},
            {rName:"chicken",in:1},
        ],
        devcost:180000,
    },{
        name : "jungle" ,
        img : "jungle_dot",
        max_population : 130 ,
        id : 11 ,
        resource : [
            {rName:"wood",in:24},
            {rName:"beaf",in:1},
            {rName:"chicken",in:1},
        ],
        devcost:270000,
    },{
        name : "taiga" ,
        img : "taiga_dot",
        max_population : 70 ,
        id : 12 ,
        resource : [
            {rName:"wood",in:19},
            {rName:"rock",in:4},
            {rName:"beaf",in:1},
            {rName:"chicken",in:1},
        ],
        devcost:180000,
    },{
        name : "shallow_taiga" ,
        img : "deva_taiga_dot",
        max_population : 40 ,
        id : 13 ,
        resource : [
            {rName:"wood",in:12},
            {rName:"rock",in:6},
        ],
        devcost:120000,
    },
    // 20~40 乾燥帯
    {
        name : "desert" ,
        img : "desert_dot",
        max_population : 10 ,
        id : 20 ,
        resource : [],
        devcost:140000,
    },{
        name : "rubble" ,
        img : "rock_dot",
        max_population : 10 ,
        id : 21 ,
        resource : [
            {rName:"rock",in:12},
        ],
        devcost:270000,
    },{
        name : "grandcanyon" ,
        img : "dirt_dot",
        max_population : 10 ,
        id : 22 ,
        resource : [
            {rName:"rock",in:9},
        ],
        devcost:270000,
    },{
        name : "oasis" ,
        img : "wetland_dot",
        max_population : 160 ,
        id : 23 ,
        resource : [
            {rName:"wood",in:8},
            {rName:"fish",in:2},
        ],
        devcost:120000,
    },
    // 40~50 山岳、寒帯
    {
        name : "snowfield" ,
        img : "snow_dot",
        max_population : 20 ,
        id : 40 ,
        resource : [
            {rName:"beaf",in:1},
            {rName:"chicken",in:1},
        ],
        devcost:140000,
    },{
        name : "mountain" ,
        img : "rock_dot",
        max_population : 10 ,
        id : 41 ,
        resource : [
            {rName:"rock",in:12},
        ],
        devcost:900000,
    },{
        name : "mountain" ,
        img : "m1_dot",
        max_population : 10 ,
        id : 42 ,
        resource : [
            {rName:"rock",in:12},
        ],
        devcost:550000,
    },{
        name : "mountain" ,
        img : "m2_dot",
        max_population : 15 ,
        id : 43 ,
        resource : [
            {rName:"rock",in:12},
        ],
        devcost:550000,
    },{
        name : "mountain" ,
        img : "m3_dot",
        max_population : 15 ,
        id : 44 ,
        resource : [
            {rName:"rock",in:12},
        ],
        devcost:550000,
    },{
        name : "mountain" ,
        img : "m4_dot",
        max_population : 15 ,
        id : 45 ,
        resource : [
            {rName:"rock",in:12},
        ],
        devcost:600000,
    },{
        name : "mountainForest" ,
        img : "forest_dot",
        max_population : 80 ,
        id : 46 ,
        resource : [
            {rName:"wood",in:14},
            {rName:"apple",in:12},
            {rName:"beaf",in:1},
            {rName:"chicken",in:1},
        ],
        devcost:180000,
    },
    // 50 ~ 60 川
    {
        name : "river" ,
        img : "water_dot",
        max_population : 160 ,
        id : 50,
        resource : [
            {rName:"rock",in:2},
            {rName:"fish",in:2},
        ],
        devcost:270000,
    },
    // 100 ~ 人工物関係
    // 畑 小麦 100~103
    {
        name : "dilapidatedWeatField" ,
        img : "weatField_dot",
        max_population : 350 ,
        id : 100,
        resource : [
            {rName:"weat",in:120},
        ],
        devcost:90000,
    },{
        name : "nomalWeatField" ,
        img : "weatField_dot",
        max_population : 550 ,
        id : 101,
        resource : [],
        devcost:90000,
    },{
        name : "fertileWeatField" ,
        img : "weatField_dot",
        max_population : 750 ,
        id : 102,
        resource : [],
        devcost:90000,
    },
    // 米
    {
        name : "nomalRiceField" ,
        img : "riceField_dot",
        max_population : 650 ,
        id : 101,
        resource : [],
        devcost:90000,
    },{
        name : "fertileRiceField" ,
        img : "riceField_dot",
        max_population : 850 ,
        id : 102,
        resource : [],
        devcost:90000,
    },
    // 190 ~ ゲーム要素
    {
        name : "wall" ,
        img : "wall_dot",
        max_population : 0 ,
        id : 190 ,
        resource : [],
        devcost:Infinity,
    },
    
    // 200番台 sea
    {
        name : "nomalsea" ,
        img : "water_dot",
        max_population : 0 ,
        id : 200 ,
        resource : [
            {rName:"fish",in:30},
        ],
        devcost:270000,
    },{
        name : "leaf" ,
        img : "leaf_dot",
        max_population : 10 ,
        id : 201 ,
        resource : [
            {rName:"fish",in:35},
            {rName:"rock",in:2},
        ],
        devcost:270000,
    },{
        name : "deepsea" ,
        img : "deepwater_dot",
        max_population : 0 ,
        id : 202 ,
        resource : [
            {rName:"fish",in:28},
        ],
        devcost:1650000,
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
                resource : [],
                devcost:0,
            },
            {
                name: "land",
                img: "desert_dot",
                max_population: 20,
                id: 255,
                resource : [],
                devcost:0,
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

export const biomesID = {
    sea : 254 ,
    land : 255 ,
    river : 50 ,

    forests : [10,11,12,13] ,
    forest : 10 ,
    jungle : 11 ,

    seas : [200,201,202] ,
    nomalsea : 200 ,
    deepsea : 202 ,
    leaf : 201 ,

    dry : [20,21,22,23] ,
    desert : 20 ,
}