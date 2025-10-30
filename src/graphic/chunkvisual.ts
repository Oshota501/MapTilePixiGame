import * as PIXI from "pixi.js";
import { ChunkArea } from "../data/chunk";

// フラグメントシェーダーのコード（レガシー：gl_FragColor / texture2D を使用）
const fragmentCode = `
    varying vec2 vTextureCoord;
    uniform sampler2D uDataTexture; // 渡すデータテクスチャ

    void main(void) {
        float geoValue = texture2D(uDataTexture, vTextureCoord).r;
        vec4 color;
        
        if (geoValue < 0.01) { 
            color = vec4(0.1, 0.2, 0.8, 1.0); // 水
        } else if (geoValue < 0.5) {
            color = vec4(0.2, 0.7, 0.3, 1.0); // 草
        } else {
            color = vec4(0.5, 0.5, 0.5, 1.0); // 岩
        }
        gl_FragColor = color;
    }
`;


/**
 * チャンクの「見た目」を管理するクラス (v8形式)
 */
export class ChunkVisual {
    public sprite: PIXI.Sprite;
    private filter: PIXI.Filter;
    private data: ChunkArea;

    constructor(chunkData: ChunkArea) {
        this.data = chunkData;

        // Filter は従来のシグネチャで生成し、uniforms を第3引数で渡す
        this.filter = new PIXI.Filter({
            fragment: fragmentCode,            // フラグメントシェーダー
            uniforms: { uDataTexture: this.data.chunkTexture } // uniforms
        });

        // 2. フィルターを適用する土台のスプライトを作成
        this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.sprite.width = ChunkArea.width;
        this.sprite.height = ChunkArea.height;
        
        // 3. チャンクのワールド座標を設定
        this.sprite.position.set(
            this.data.position.x * ChunkArea.width,
            this.data.position.y * ChunkArea.height
        );
        
        // 4. フィルターを適用
        this.sprite.filters = [this.filter];
    }
    
    public updateTexture() {
        // データソース更新（必要に応じて）
        this.data.chunkTexture.source.update?.();
        // テクスチャが差し替わる可能性がある場合は uniforms を明示更新
        this.filter.uniforms.uDataTexture = this.data.chunkTexture;
    }
}