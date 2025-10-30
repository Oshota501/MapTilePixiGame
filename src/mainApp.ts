import { Application } from "pixi.js";
import { Render10Manager } from "./data/render10container";
import { Render60Manager } from "./data/render60container";
import { Viewport } from "pixi-viewport";
import { GameDatas } from "./data/gamedata" ;
import { ChunkArea } from "./data/chunk";
import { size } from "./type";

export class MainApp extends Application {
  public gamedata : GameDatas ;

  public fpsCounter : number = 0 ;

  public viewport!: Viewport ;
  public render10: Render10Manager ;
  public render60: Render60Manager ;
  public worldSize : size ;
  
  constructor(worldSize : size){
    super() ;
    this.render10 = new Render10Manager();
    this.render60 = new Render60Manager();
    this.gamedata = new GameDatas(worldSize)
    this.worldSize = worldSize ;
    this.start();
  }

  public async start() {
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

    this.viewport.addChild(this.render10);
    this.viewport.addChild(this.render60);

    this.viewport
      .drag()
      .pinch()
      .wheel()
      .decelerate();

    this.stage.addChild(this.viewport);

    // @ts-ignore
    this.ticker.add((time) => {
      // animation/update logic
      // animation 60fps tick 

      this.fpsCounter ++ ;
      if(this.fpsCounter >= 6 ){
        // animation 10fps tick
        // console.log(this.fpsCounter) ;
        this.fpsCounter = 0 ;
      }
    });
  }
}

