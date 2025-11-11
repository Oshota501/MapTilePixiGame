import { Application , Assets, Container } from "pixi.js";
import { Viewport } from "pixi-viewport";
import { GameDatas } from "./data/gamedata" ;
import { ChunkArea } from "./data/chunk";
import { size, Vector2 } from "./type";
import { testfunc } from "./test";
import { MapTag20 } from "./data/map/maptag20";
import { loadScreen } from "./ui/elms";

export class MainApp extends Application {
  public fpsCounter : number = 0 ;

  public viewport!: Viewport ;
    public vieportMousePosition = new Vector2(0,0) ;

  public render10: Container ;
    public gamedata! : GameDatas ;
    public maptag20 : MapTag20 ;
  
  public worldSize : size ;

  constructor(
    worldSize : size ,
  ){
    super() ;
    this.render10 = new Container();
    this. maptag20 = new MapTag20();
    this.worldSize = worldSize ;
    this.start();
  }

  public async start() {
    await Assets.load('src/graphic/texture-maptile/tileset.json');
    //tilesetTexture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
    await this.init({ background: '#000000ff', resizeTo: window });
    const inElm = document.getElementById("pixi-container") ;
    if(inElm != null){
      inElm.appendChild(this.canvas);
    }
      

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
    this.viewport.clampZoom({
      minScale:0.5,
      maxScale:30,
    })
    this.viewport.on("mousemove",(event)=>{
      const worldPosition = this.viewport.toWorld(event.global);
      this.vieportMousePosition.x = Math.floor(worldPosition.x );
      this.vieportMousePosition.y = Math.floor(worldPosition.y );
    });
    this.stage.addChild(this.viewport);

    // @ts-ignore
    this.ticker.add((time) => {
      this.maptag20.visible = 5 <= this.viewport.scale.x  && this.viewport.scale.x < 11
      if(this.gamedata.cities.visible){
        this.gamedata.cities.major.visible = 2 <= this.viewport.scale.x 
        this.gamedata.cities.satellite.visible = 8 <= this.viewport.scale.x 
      }
    });

    if(loadScreen)
      loadScreen.style.display = "none" ;

    testfunc()
  }
}

