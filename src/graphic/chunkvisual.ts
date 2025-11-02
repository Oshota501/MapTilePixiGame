//import * as PIXI from "pixi.js";
import { CompositeTilemap } from "@pixi/tilemap"; // 👈 tilemapからインポート
import { ChunkArea } from "../data/chunk";
import { biomes } from "../data/biomes";

/**
 * チャンクの「見た目」を管理するクラス (Tilemap 1pxドット版)
 */
export class ChunkVisual {
    public tilemap: CompositeTilemap;
    private data: ChunkArea;
    //private tilesetName = "tileset.json"; // 👈 ロードしたアセット名

    constructor(chunkData: ChunkArea) {
        this.data = chunkData;

        // 1. タイルマップのインスタンスを作成
        this.tilemap = new CompositeTilemap();

        // 2. チャンクのワールド座標を設定
        // ※ 1タイル1pxなので、(0,0)チャンクは (0,0) に、
        //   (1,0)チャンクは (256, 0) に配置します
        this.tilemap.position.set(
            this.data.position.x * ChunkArea.width,
            this.data.position.y * ChunkArea.height
        );
        
        // 3. チャンクデータをループして、1pxドットを配置
        this.buildMap();
    }
    
    public buildMap() {
        this.tilemap.clear();

        const data = this.data.geographyData;
        const width = ChunkArea.width;
       

        for (let i = 0; i < data.length; i++) {
            const geoValue = data[i];
            
            const x = (i % width);
            const y = Math.floor(i / width);
            
            let tileName :string = "water_dot"; 

            for(let i = 0 ; i < biomes.biomes.length ; i ++){
                if(geoValue === biomes.biomes[i].id ){
                    tileName = biomes.biomes[i].img ;
                    break ;
                }
            }
            
            
            // 5. タイルマップに 1px のタイルを追加
            this.tilemap.tile(
                tileName, // 使うタイル（ドット）の名前
                x,        // 貼り付ける X 座標 (0~255)
                y,        // 貼り付ける Y 座標 (0~255)
                //{ tilesetName: this.tilesetName }
            );
        }
    }
    
    /**
     * データが変更されたら、マップを再構築する
     */
    public updateMap() {
        this.buildMap();
    }
}