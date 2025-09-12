import DancingLines from "./DancingLines";
import Fountain from './fountain';
import HexagonEffect from "./HexagonEffect";
import StickyBalls from "./StickyBalls";
import Firework from "./Fireworks";
import Sparks from "./Sparks";
import EmptyEffect from "./EmptyEffect";
import DNA from "./DNA";

import hexToRgba from "hex-rgba";

/**
 * Function creates a radial gradient in the specified pos_x of the canvas
 * Should be soon replaced by a better optimized function
 */
const KeyGradient = (ctx:CanvasRenderingContext2D,pos_x:number,block_width:number,height:number,color:string, radius:number = 80):void =>{
    const radialGradient = ctx.createRadialGradient(pos_x + block_width/2, height, 0, pos_x + block_width/2, height, Math.random() * radius/15 + (radius - radius/15));
    radialGradient.addColorStop(0.0, hexToRgba(color,95));
    radialGradient.addColorStop(0.35, hexToRgba(color,40));
    radialGradient.addColorStop(0.7, hexToRgba(color,2));
    radialGradient.addColorStop(1, hexToRgba(color,0.01));
    ctx.fillStyle = radialGradient;
    ctx.beginPath();
    ctx.arc(pos_x + block_width/2, height, radius, 0, 2 * Math.PI);
    ctx.fill();
}


export {DancingLines,Fountain,HexagonEffect,StickyBalls,Firework,Sparks,EmptyEffect,KeyGradient,DNA};