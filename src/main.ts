import { MainApp } from "./mainApp";

// 注意：widthとheightについて
// 生成時の負荷とメモリ使用量は結構バカにならないのであまり増やしすぎないほうが合理的です。
// 1pxあたりにdata/createmapLogicの処理を毎回施していることを考えれば想像に難くないです。

export const game = new MainApp({
    width : 4 ,
    height : 4 ,
}) ;
