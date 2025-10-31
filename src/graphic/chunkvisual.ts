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
    #version 300 es
    precision highp float;

    in vec2 vTextureCoord;
    uniform sampler2D uSampler;
    
    // UBO (Uniform Group)
    uniform myUniforms {
        vec2 uCoords;
    };
    
    // Sampler (Texture)
    uniform sampler2D uDataSampler;

    out vec4 fragColor; // gl_FragColor の代わり

    void main(void)
    {
        // texture2D() の代わりに texture() を使用
        float dataValue = texture(uDataSampler, vTextureCoord).r;
        vec4 dataColor = vec4(dataValue, dataValue, dataValue, 1.0);
        
        if (vTextureCoord.x > uCoords.x) {
             fragColor = dataColor;
        } else {
             fragColor = texture(uSampler, vTextureCoord);
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

    constructor(chunkData: ChunkArea) {
        this.data = chunkData;
        this.filter = new PIXI.Filter({
            glProgram : new PIXI.GlProgram({
                fragment:fragment, 
                vertex:vertex,
            }),
            resources : {
                myUniforms: {
                    uCoords: { value: [100, 200], type: 'vec2<f32>' } ,
                },
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