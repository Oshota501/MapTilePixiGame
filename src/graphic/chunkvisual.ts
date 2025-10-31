import * as PIXI from "pixi.js";
import { ChunkArea } from "../data/chunk";

const vertex = `
    #version 300 es
    precision highp float;

    in vec2 aPosition;
    uniform mat3 projectionMatrix;
    uniform mat3 filterMatrix;
    
    out vec2 vTextureCoord;
    out vec2 vFilterCoord;

    void main(void)
    {
        gl_Position = vec4((projectionMatrix * vec3(aPosition, 1.0)).xy, 0.0, 1.0);
        vFilterCoord = (filterMatrix * vec3(aPosition, 1.0)).xy;
        vTextureCoord = aPosition;
    }
`;

const fragment = `
// v8 (GLSL 3.00 ES) 対応の
// フラグメントシェーダー
#version 300 es
precision highp float;

in vec2 vTextureCoord; // (vFilterCoord が正しい名前かもしれません。頂点シェーダーの out を確認してください)
in vec2 vFilterCoord;  // 頂点シェーダーから渡される座標 (0.0 ~ 1.0)
uniform sampler2D uSampler; // 元のテクスチャ (PIXI.Texture.WHITE)
    
// Uniform Group
uniform myUniforms {
    vec2 uCoords;
};

// ★ 256x256 のデータテクスチャ
uniform sampler2D uDataSampler;

out vec4 fragColor;

void main(void)
{
    // vFilterCoord を使って uDataSampler から値をサンプリング
    // vFilterCoord (例: 0.5, 0.5) -> uDataSampler (256x256) の (128, 128) ピクセルの値
    // 'r8unorm' なので、値は .r チャンネルに 0.0 ~ 1.0 の float として入っています
    float dataValue = texture(uDataSampler, vFilterCoord).r;

    // dataValue (0.0 ~ 1.0) を使って色を決定
    // 例: dataValue をそのままグレースケールとして描画
    fragColor = vec4(dataValue, dataValue, dataValue, 1.0);

    // 例: dataValue が 0.5 (元の値 128) より大きい場合のみ赤くする
    if (dataValue > 0.5) {
        fragColor = vec4(1.0, 0.0, 0.0, 1.0);
    } else {
        fragColor = vec4(0.0, 0.0, 1.0, 1.0);
    }
}
`;


/**
 * チャンクの「見た目」を管理するクラス (v8形式)
 */
export class ChunkVisual {
    public sprite: PIXI.Sprite;
    private filter: PIXI.Filter;
    private data: ChunkArea;
    private myUniforms: PIXI.UniformGroup;

    constructor(chunkData: ChunkArea) {
        this.data = chunkData;

        this.myUniforms = new PIXI.UniformGroup({
            uCoords: { value: [ChunkArea.width, ChunkArea.height], type: 'vec2<f32>' }

        });
        this.filter = new PIXI.Filter({
            glProgram : new PIXI.GlProgram({
                fragment:fragment, 
                vertex:vertex,
            }),
            resources : {
                myUniforms: this.myUniforms,
                uDataSampler: this.data.chunkTexture
            }
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
        this.filter.resources.uDataSampler = this.data.chunkTexture;
    }
}