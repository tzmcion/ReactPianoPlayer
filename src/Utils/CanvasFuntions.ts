const CanvasRoundRect = (ctx:CanvasRenderingContext2D,color:string | CanvasGradient,x:number, y:number, w:number, h:number, r:number,stroke?:boolean):void => {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.moveTo(x+r, y);
  ctx.arcTo(x+w, y,   x+w, y+h, r);
  ctx.arcTo(x+w, y+h, x,   y+h, r);
  ctx.arcTo(x,   y+h, x,   y,   r);
  ctx.arcTo(x,   y,   x+w, y,   r);
  if(!stroke){
    ctx.fill();
  }else{
    ctx.stroke();
  }
  
}

export {CanvasRoundRect}