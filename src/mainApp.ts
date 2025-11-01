import { Application , Assets, Container } from "pixi.js";
import { Viewport } from "pixi-viewport";
import { GameDatas } from "./data/gamedata" ;
import { ChunkArea } from "./data/chunk";
import { size } from "./type";
import { testfunc } from "./test";
import { MapTag20 } from "./data/maptag20";


export class MainApp extends Application {
  public fpsCounter : number = 0 ;

  public viewport!: Viewport ;
  public render10: Container ;
    public gamedata! : GameDatas ;
    public maptag20! : MapTag20 ;
  
  public worldSize : size ;

  constructor(
    worldSize : size ,
  ){
    super() ;
    this.render10 = new Container();
    this.worldSize = worldSize ;
    this.start();
  }

  public async start() {
    await Assets.load('src/graphic/texture-maptile/tileset.json');
    //tilesetTexture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
    await this.init({ background: '#1099bb', resizeTo: window });
    document.body.appendChild(this.canvas);

    // ViewPort
    this.viewport = new Viewport({
      screenWidth: this.screen.width,
      screenHeight: this.screen.height,
      worldWidth: this.worldSize.width*ChunkArea.width, // 世界の広さ (例)
      worldHeight: this.worldSize.height*ChunkArea.height, // 世界の広さ (例)

      // ユーザー操作の有効化
      events: this.renderer.events
    })
    // chunk読み込み
    this.gamedata = new GameDatas(this.worldSize)
    this.render10.addChild(this.gamedata);
    this.render10.addChild(this.maptag20)

    this.viewport.addChild(this.render10);

    this.viewport
      .drag()
      .pinch()
      .wheel()
      .decelerate();

    this.viewport.scale = 7 ;
    this.stage.addChild(this.viewport);

    // @ts-ignore
    this.ticker.add((time) => {

    });


    testfunc()
  }
}

