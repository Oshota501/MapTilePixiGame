import { ChunkArea } from "./data/chunk";
import { Vector2 } from "./type";
import { game } from "./main";
import * as PIXI from "pixi.js";

export const testfunc = ()=>{
    // in MainApp.ts
    console.log("application loaded...")
    // ... viewport のセットアップ ...
    // app.stage.addChild(this.viewport);

    // 1. チャンクのデータを作成 (座標 0, 0)
    const chunkData = new ChunkArea(new Vector2(0, 0));
    const chunkData2 = new ChunkArea(new Vector2(0, 1));
    // (例: データを少し書き換えてみる)
    chunkData.geographyData[10 * 256 + 10] = 150; // (10, 10) の座標を「岩」にする
    chunkData.geographyData[11 * 256 + 10] = 150;
    chunkData.geographyData[12 * 256 + 10] = 150;
    chunkData.chunkTexture.source.update(); // GPUに更新を通知！

    game.showChunk(chunkData)
    game.showChunk(chunkData2)

    // 2. フィルターを適用する土台のスプライトを作成
    const sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
    sprite.width = ChunkArea.width;
    sprite.height = ChunkArea.height;
    
    // 3. チャンクのワールド座標を設定
    sprite.position.set(
        1 * ChunkArea.width,
        1 * ChunkArea.height
    );
    game.render10.addChild(sprite)
    for(let i = 0 ; i < 3 ; i ++)console.log(game.render10.children[i])
}