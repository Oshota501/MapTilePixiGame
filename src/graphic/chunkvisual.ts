import * as PIXI from "pixi.js";
import { ChunkArea } from "../data/chunk";

// 上記のGLSLコードを文字列として読み込む
const fragmentShader = `
    varying vec2 vTextureCoord;
    uniform sampler2D uDataTexture; 

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
 * チャンクの「見た目」を管理するクラス
 */
export class ChunkVisual {
    public sprite: PIXI.Sprite;
    private filter: PIXI.Filter;
    private data: ChunkArea;

    constructor(chunkData: ChunkArea) {
        this.data = chunkData;

        // 1. 「材料」 (Uniforms) を定義
        const uniforms = {
            // GLSL側の uDataTexture に、データテクスチャを渡す
            uDataTexture: this.data.chunkTexture, 
        };

        // 2. 「調理台」 (Filter) を作成
        // 引数に関するエラー、実装上の問題がないのでignore
        // @ts-ignore
        this.filter = new PIXI.Filter(null, fragmentShader, uniforms);

        // 3. フィルターを適用する「土台」のスプライトを作成
        //    Texture.WHITEは 1x1 の白い四角形。これを引き伸ばして使う。
        this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.sprite.width = ChunkArea.width;
        this.sprite.height = ChunkArea.height;
        
        // 4. チャンクのワールド座標を設定
        this.sprite.position.set(
            this.data.position.x * ChunkArea.width,
            this.data.position.y * ChunkArea.height
        );
        
        // 5. フィルターを適用！
        this.sprite.filters = [this.filter];
    }
    
    /**
     * もしデータが更新されたら、GPUに通知する
     */
    public updateTexture() {
        this.data.chunkTexture.source.update();
    }
}