import DancingLines from "./DancingLines";
import Fountain from './fountain';

const KeyGradient = (ctx:CanvasRenderingContext2D,pos_x:number,block_width:number,height:number) =>{
    const radius:number = 50;
    const radialGradient = ctx.createRadialGradient(pos_x + block_width/2, height, 0, pos_x + block_width/2, height, Math.random()*20 +  radius - 20);
    radialGradient.addColorStop(0.0, 'rgba(255,255,255,1)');
    radialGradient.addColorStop(0.2, 'rgba(255,255,255,0.7)');
    radialGradient.addColorStop(0.5, 'rgba(255,255,255,0.5)');
    radialGradient.addColorStop(0.6, 'rgba(255,255,255,0.3)');
    radialGradient.addColorStop(0.90, 'rgba(255,255,255,0.02)');
    radialGradient.addColorStop(1, 'transparent');
    ctx.fillStyle = radialGradient;
    ctx.beginPath();
    ctx.arc(pos_x + block_width/2, height, Math.random()*20 +  radius - 20, 0, 2 * Math.PI);
    ctx.fill();
}


export {DancingLines,Fountain, KeyGradient};