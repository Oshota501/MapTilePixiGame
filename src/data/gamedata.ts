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
        for(let y = 0 ; y < worldSize.height ; y ++){
            for(let x = 0 ; x < worldSize.width ; x ++){
                this.chunks.push(new ChunkArea(new Vector2(
                    x ,
                    y
                )))
            }
        }
        createMapLogic_1(this)
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
    * @returns {boolean} isSuccess
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
    * @returns {boolean} isSuccess
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
                x:ps[i].x,
                y:ps[i].y,
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
    /**
     * getPositionBiome 
     * @param {Vector2} position 
     * @returns {number|null} biomeid
     * @returns {boolean} isSuccess(typeof biomeid == number -> true)
     * 制約
     * 0 <= position.x < ChunkArea.width * mapsize.width
     * 0 <= position.y < ChunkArea.height * mapsize.height
     */
    public getPositionBiome (position : Vector2):[number, true]|[null,false]{
        if (position.x < 0 || position.y < 0) {
            return [null, false];
        }
        const chunk = new Vector2(
            Math.floor(position.x / ChunkArea.width) ,
            Math.floor(position.y / ChunkArea.height)
         ) ;
        if(chunk.x < 0 || chunk.x >= this.s.width){
            return [null, false] ;
        }
        if(chunk.y < 0 || chunk.y >= this.s.height){
            return [null, false] ;
        }
        const positionInChunk = new Vector2(
            Math.floor(position.x % ChunkArea.width) ,
            Math.floor(position.y % ChunkArea.height)
        );
        const c = this.getChunk(chunk);
        const biomeId = c.getGeographyData(positionInChunk) ?? null;
        return [biomeId, true] ;
    }
    /**
     * getAreaBiome 
     * @param {Vector2} center_position
     * @param {number} scale
     * @returns {(Uint8Array|null)[]} biomesid
     * @returns {boolean} isSuccess(typeof biomeid == number -> true)
     * scaleが1なら3*3 scaleが2なら5*5の center_position を中心とした領域のbiomeidの配列を取得
     * 制約
     * 0 + scale <= position.x < ChunkArea.width * mapsize.width - scale
     * 0 + scale <= position.y < ChunkArea.height * mapsize.height - scale
     */
    public getAreaBiome (
        center_position : Vector2,
        scale:number
    ) : [Uint8Array,true] | [null ,false] {
            if (scale < 0 || !Number.isInteger(scale)) {
                return [null, false];
            }
            const worldWidth = ChunkArea.width * this.s.width;
            const worldHeight = ChunkArea.height * this.s.height;
            if (
                center_position.x - scale < 0 ||
                center_position.y - scale < 0 ||
                center_position.x + scale >= worldWidth ||
                center_position.y + scale >= worldHeight
            ) {
                return [null, false];
            }
            const side = scale * 2 + 1;
            const biomes_id : Uint8Array = new Uint8Array(side * side) ;
            let idx = 0;
            for (let dy = -scale; dy <= scale; dy++) {
                for (let dx = -scale; dx <= scale; dx++) {
                    const x = Math.floor(center_position.x + dx);
                    const y = Math.floor(center_position.y + dy);
                    const chunk = {
                        x : Math.floor(x / ChunkArea.width),
                        y : Math.floor(y / ChunkArea.height)
                    } ;
                    const positionInChunk = {
                        x : x % ChunkArea.width,
                        y : y % ChunkArea.height
                    } ;
                    const c = this.getChunk(chunk);
                    const id = c.geographyData[positionInChunk.y * ChunkArea.width + positionInChunk.x] ?? 0;
                    biomes_id[idx++] = id;
                }
            }
            return [biomes_id, true] ;
    }
}