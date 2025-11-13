import { Application , Assets, Container } from "pixi.js";
import { Viewport } from "pixi-viewport";
import { GameDatas } from "./data/gamedata" ;
import { ChunkArea } from "./data/chunk";
import { size, Vector2 } from "./type";
import { testfunc } from "./test";
import { MapTag20 } from "./data/map/maptag20";
import { loadScreen } from "./ui/elms";
import { viewCityInfo } from "./ui/viewCityInfo";
import { queue } from "./ui/queue";
import { viewTileInfo } from "./ui/viewTileInfo";
import { DynamicContainer } from "./dynamic/DynamicContainer";

export class MainApp extends Application {
  public fpsCounter : number = 0 ;

  public viewport!: Viewport ;
    public vieportMousePosition = new Vector2(0,0) ;

    public render10: Container ;
      public gamedata! : GameDatas ;
      public maptag20 : MapTag20 ;
      public dynamic? : DynamicContainer ;
  
  public worldSize : size ;

 

  public padding : number = 256 ;

  public nextTurn(){
    this.gamedata.nextTurn() ;
    const [f,q] = queue.town.getQueue() ;
    if(f)viewCityInfo(q)
  }
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
    this.dynamic = new DynamicContainer();

    this.render10.addChild(this.gamedata);
    this.render10.addChild(this.maptag20);
    this.render10.addChild(this.dynamic);
    
    this.viewport.addChild(this.render10);

    this.viewport
      .drag()
      .pinch()
      .wheel()
      .decelerate();

    this.viewport.scale = 7 ;
    this.viewport.clampZoom({
      minScale:1,
      maxScale:30,
    })
    // this.viewport.clamp({
    //   left: 0 - this.padding ,
    //   top: 0 - this.padding ,
    //   right: this.worldSize.width*ChunkArea.width + this.padding ,
    //   bottom: this.worldSize.height*ChunkArea.height + this.padding 
    // });
    this.viewport.on("mousemove",(event)=>{
      const worldPosition = this.viewport.toWorld(event.global);
      this.vieportMousePosition.x = Math.floor(worldPosition.x );
      this.vieportMousePosition.y = Math.floor(worldPosition.y );

      viewTileInfo(this.vieportMousePosition) ;
    });
    this.stage.addChild(this.viewport);

    this.ticker.add(() => {
      this.maptag20.visible = 5 <= this.viewport.scale.x  && this.viewport.scale.x < 11
      if(this.gamedata.cities.visible){
        this.gamedata.cities.major.visible = 2 <= this.viewport.scale.x 
        this.gamedata.cities.satellite.visible = 8 <= this.viewport.scale.x 
      }
     
      // this.gamedata.updata();
    });

    if(loadScreen)
      loadScreen.style.display = "none" ;

    testfunc()
  }
}

