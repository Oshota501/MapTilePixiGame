import { Vector2 } from "../type";
import * as PIXI from "pixi.js";

export class ChunkArea {
    public static readonly width = 256 ;
    public static readonly height = 256 ;
    public position : Vector2 ;
    public geographyData : Uint8Array = new Uint8Array(
        ChunkArea.width*ChunkArea.height
    ) ; 
    public chunkTexture: PIXI.Texture;
    
    constructor(position : Vector2){
        for(let i = 0 ; i < ChunkArea.width*ChunkArea.height ; i ++ ){
            this.geographyData[i] = Math.floor(Math.random()*255) ;
        }
        this.position = position ;
        const source = new PIXI.TextureSource({
            resource: this.geographyData, // Uint8Array (BufferImageSource)
            width: ChunkArea.width,
            height: ChunkArea.height,
            format: 'r8unorm',         // データのフォーマット
            // type: 'unsigned_byte' // Uint8Array (GL_UNSIGNED_BYTE)
        });
        this.chunkTexture = new PIXI.Texture({ source: source });

    }

    public getGeographyData(x:number, y:number): number;
    public getGeographyData(v2:Vector2): number;
    public getGeographyData(xOrV2: number | Vector2, y?: number) {
        if (typeof xOrV2 === "number") {
            return this.geographyData[(y as number) * ChunkArea.width + xOrV2];
        } else {
            return this.geographyData[xOrV2.y * ChunkArea.width + xOrV2.x];
        }
    }
}