import { biomeCreateLogicType } from "./data/createmapLogic"
import { game } from "./main"
import * as PIXI from "pixi.js"
export async function testfunc(){ 
    setTimeout(function(){
        
    },2000)
}

export async function biomeTag(b:biomeCreateLogicType[]){
    for(let i = 0 ; i < b.length ; i ++){
        const texture = await PIXI.Assets.load('src/graphic/img/pin.png');
        const s = new PIXI.Sprite(texture) ;
        s.interactive = true;
        s.position.set(
            b[i].p.x,
            b[i].p.y
        );
        s.texture.source.style.scaleMode = 'nearest';
        s.anchor.set(0.3);
        s.on("pointerdown",(event)=>{
            event.stopPropagation();
            console.log(b[i])
        })
        game.maptag20.addChild(s);
    }
}