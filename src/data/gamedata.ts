import { ChunkArea } from "./chunk";
import { size , Vector2 } from "../type";
import { ChunkVisual } from "../graphic/chunkvisual";
import { Container } from "pixi.js";
import { createMapLogic_1 } from "./createmapLogic";

type pos = {
    x : number
    y : number
}
export type ChangeBiomeParam = {
    x : number
    y : number 
    biome_id : number
}
export class GameDatas extends Container{
    public chunks : ChunkArea[] = [] ;
    private getChunk(p:pos): ChunkArea{
        return this.chunks[p.y*this.s.width + p.x];
    }
    private view_chunks : ChunkVisual[] = [] ;
    private getVisualChunk(p:pos): ChunkVisual{
        return this.view_chunks[p.y*this.s.width + p.x];
    }
    public allChunkShow(){
        for(let i = 0; i < this.view_chunks.length ; i ++){
            this.view_chunks[i].buildMap();
        }
    }

    public s : size ;
    constructor(worldSize : size){
        super();
        this.s = worldSize ;
        for(let x = 0 ; x < worldSize.width ; x ++){
            for(let y = 0 ; y < worldSize.height ; y ++){
                this.chunks.push(new ChunkArea(new Vector2(
                    x ,
                    y
                )))
            }
        }
        createMapLogic_1(this.s,this.chunks)
        this.setupChunk();
    }
    private setupChunk (){
        for(let i = 0 ; i < this.chunks.length ; i ++){
            this.view_chunks.push(new ChunkVisual(this.chunks[i]));
            this.addChild(this.view_chunks[i].tilemap)
        }
    }
    /**
    * changeBiomeAt : ある一点のbiomeを変更するときに最適化された関数。
    * export type ChangeBiomeParam オブジェクトを引数にしてください。
    * @param {Number} x
    * @param {Number} y
    * @param {Number} biome
    * @param {boolean} isSuccess
    */
    public changeBiomeAt(p:ChangeBiomeParam): boolean {
        if(p.biome_id>255 || p.biome_id < 0){
            console.log("uint8 の範囲を超えています。");
            return false;
        }
        const chunk : pos = {
            x : Math.floor(p.x/ChunkArea.width) ,
            y : Math.floor(p.y/ChunkArea.height)
        } ;
        if(chunk.x < 0 || chunk.x > this.s.width){
            console.log("存在しないマップ領域です。：x 座標が超過");
            return false ;
        }
        if(chunk.y < 0 || chunk.y > this.s.height){
            console.log("存在しないマップ領域です。：y 座標が超過");
            return false ;
        }
        const position : pos= {
            x : p.x%ChunkArea.width ,
            y : p.y%ChunkArea.height
        } ;
        const c = this.getChunk(chunk); 
        const cv = this.getVisualChunk(chunk);
        c.geographyData[position.y * ChunkArea.width + position.x ] = p.biome_id ;
        cv.buildMap();
        return true ;
    }
    /**
    * changeBiome : 複数の場所のbiomeをいじるときに最適化された関数。
    * arrayintの読み込みにcpuリソースを使うのでここでは複数個といっても maxLength 1000くらいに抑えるべきです、
    * 1000を超える場合は gamadata.chunks から内部配列を直接取得して gamedata.allChunkShow() で全て表示内容を適用するようにお願いします。
    * export type ChangeBiomeParam[] オブジェクトを引数にしてください。
    * 最適化のため汚いコードになっております。
    * @param {Number} x
    * @param {Number} y
    * @param {Number} biome
    * @param {boolean} isSuccess
    */
    public changeBiome(ps:ChangeBiomeParam[]): boolean{
        const changes : number[][] = [] ;
        if(ps.length > 1000 ){
            console.log("非推奨な量のオブジェクトを受け取りました。：", ps.length-1000 ,"超過");
        }
        for(let i = 0 ; i < ps.length ; i ++){ 
            const p = ps[i] ;
            if(p.biome_id>255 || p.biome_id < 0){
                console.log("uint8 の範囲を超えています。");
                return false;
            }
            const chunk = {
                x:changes[i][0],
                y:changes[i][1],
            }
            if(chunk.x < 0 || chunk.x > this.s.width){
                console.log("存在しないマップ領域です。：x 座標が超過");
                return false ;
            }
            if(chunk.y < 0 || chunk.y > this.s.height){
                console.log("存在しないマップ領域です。：y 座標が超過");
                return false ;
            }
            const position : pos= {
                x : p.x%ChunkArea.width ,
                y : p.y%ChunkArea.height
            } ;
            changes.push(
                [
                    Math.floor(p.x/ChunkArea.width),
                    Math.floor(p.y/ChunkArea.height),
                    position.y * ChunkArea.width + position.x ,
                    p.biome_id
                ]
            ) ;
        } 
        for(let i = 0 ; i < changes.length ; i ++){
            const chunk = {
                x:changes[i][0],
                y:changes[i][1],
            }
            const c = this.getChunk(chunk); 
            c.geographyData[changes[i][2]] = changes[i][3] ;
            this.getVisualChunk(chunk).buildMap();
        } 
        return true ;
    }
    
}