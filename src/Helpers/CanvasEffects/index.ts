import DancingLines from "./DancingLines";
import Fountain from './fountain';

import hexToRgba from "hex-rgba";

const KeyGradient = (ctx:CanvasRenderingContext2D,pos_x:number,block_width:number,height:number,color:string) =>{
    const radius:number = 80;
    const radialGradient = ctx.createRadialGradient(pos_x + block_width/2, height, 0, pos_x + block_width/2, height, Math.random()*20 +  radius - 20);
    radialGradient.addColorStop(0.0, hexToRgba(color,90));
    radialGradient.addColorStop(0.2, hexToRgba(color,60));
    radialGradient.addColorStop(0.5, hexToRgba(color,15));
    radialGradient.addColorStop(0.7, hexToRgba(color,3));
    radialGradient.addColorStop(0.9, hexToRgba(color,1));
    radialGradient.addColorStop(1, 'transparent');
    ctx.fillStyle = radialGradient;
    ctx.beginPath();
    ctx.arc(pos_x + block_width/2, height, Math.random()*20 +  radius - 20, 0, 2 * Math.PI);
    ctx.fill();
}


export {DancingLines,Fountain, KeyGradient};