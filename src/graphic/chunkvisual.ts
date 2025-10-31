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
    in vec2 vFilterCoord; 
    uniform sampler2D uSampler;
        
    // Uniform Group
    uniform myUniforms {
        vec2 uCoords;
    };

    uniform sampler2D uDataSampler;

    out vec4 fragColor;

    void main(void)
    {
        float dataValue = texture(uDataSampler, vFilterCoord).r;
        if (uCoords.x > 0.0) {
            dataValue = dataValue * 1.0; // 処理を変えずに uCoords を参照する
        }
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
    // private myUniforms: PIXI.UniformGroup;

    constructor(chunkData: ChunkArea) {
        this.data = chunkData;

        // this.myUniforms = new PIXI.UniformGroup({
        //     uCoords: { 
        //         value: [ChunkArea.width, ChunkArea.height], 
        //         type: 'vec2<f32>' 
        //     }
        // });
        
        this.filter = new PIXI.Filter({
            glProgram : new PIXI.GlProgram({
                fragment:fragment, 
                vertex:vertex,
            }),
            resources : {
                // myUniforms: this.myUniforms,
                // myUniforms: {
                //     uCoords: { 
                //         value: [ChunkArea.width, ChunkArea.height], 
                //         type: 'vec2<f32>' 
                //     }
                // },
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