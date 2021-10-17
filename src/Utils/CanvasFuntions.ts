const CanvasRoundRect = (ctx:CanvasRenderingContext2D,color:string,x:number, y:number, w:number, h:number, r:number):void => {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.fillStyle = color;
  //ctx.fillRect(x,y,w,h);
  ctx.moveTo(x+r, y);
  ctx.arcTo(x+w, y,   x+w, y+h, r);
  ctx.arcTo(x+w, y+h, x,   y+h, r);
  ctx.arcTo(x,   y+h, x,   y,   r);
  ctx.arcTo(x,   y,   x+w, y,   r);
  ctx.fill();
  ctx.closePath();
}

export {CanvasRoundRect}