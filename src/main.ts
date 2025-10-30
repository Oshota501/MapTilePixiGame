import { MainApp } from "./mainApp";
import { ChunkArea } from "./data/chunk";
import { ChunkVisual } from "./graphic/chunkvisual";
import { Vector2 } from "./type";

export const game = new MainApp({
    width : 9 ,
    height : 5 ,
}) ;

setTimeout(()=>{
    // in MainApp.ts

    // ... viewport のセットアップ ...
    // app.stage.addChild(this.viewport);

    // 1. チャンクのデータを作成 (座標 0, 0)
    const chunkData = new ChunkArea(new Vector2(0, 0));

    // (例: データを少し書き換えてみる)
    chunkData.geographyData[10 * 256 + 10] = 150; // (10, 10) の座標を「岩」にする
    chunkData.geographyData[11 * 256 + 10] = 150;
    chunkData.geographyData[12 * 256 + 10] = 150;
    chunkData.chunkTexture.source.update(); // GPUに更新を通知！

    // 2. データの「見た目」を作成
    const chunkVisual = new ChunkVisual(chunkData);

    // 3. Viewportに「見た目」のスプライトを追加
    game.viewport.addChild(chunkVisual.sprite);

    // チャンク (1, 0) も追加
    const chunkData2 = new ChunkArea(new Vector2(1, 0));
    const chunkVisual2 = new ChunkVisual(chunkData2);
    game.viewport.addChild(chunkVisual2.sprite);
},1000 ) ;
