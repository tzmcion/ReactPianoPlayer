/*
  This file consist of (currently) one function - CanvasRoundREct
*/

/**
 * Function draws a rounded rectangle on the canvas
 * @param ctx 
 * @param color - Color or gradient of the object
 * @param x x-position of the rectangle
 * @param y y-position of the rectange
 * @param w -width of the rectange
 * @param h -height of the rectangle
 * @param r - radious of the rounded corners
 * @param stroke - True - only draw a corners | False - fill the rectangle
 */
const CanvasRoundRect = (ctx:CanvasRenderingContext2D,color:string | CanvasGradient,x:number, y:number, w:number, h:number, r:number,stroke?:boolean):void => {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.moveTo(x+r, y);
  ctx.arcTo(x+w, y, x+w, y+h, r);
  ctx.arcTo(x+w, y+h, x, y+h, r);
  ctx.arcTo(x, y+h, x, y, r);
  ctx.arcTo(x, y, x+w, y, r);
  if(!stroke){
    ctx.fill();
  }else{
    ctx.stroke();
  }
  ctx.closePath();
}

export {CanvasRoundRect}