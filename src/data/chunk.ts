import { Vector2 } from "../type";

export class ChunkArea {
    public static readonly width = 64 ;
    public static readonly height = 64 ;
    public position : Vector2 ;
    public geographyData : Uint8Array = new Uint8Array(
        ChunkArea.width*ChunkArea.height
    ) ; 
    
    constructor(position : Vector2){
        this.position = position ;
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