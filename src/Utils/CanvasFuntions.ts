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


/**
 * Function draws a radial gradient in a specified place
 * @param ctx 
 * @param color 
 * @param size 
 */
const addShadow = (ctx:CanvasRenderingContext2D, pos_x:number, pos_y:number , height: number, width:number):void => {
  ctx.beginPath();
  const gradient = ctx.createLinearGradient(pos_x,pos_y,pos_x+7,pos_y);
  gradient.addColorStop(0,'rgba(0,0,0,0.45)');
  gradient.addColorStop(0.4,'rgba(0,0,0,0.15)');
  gradient.addColorStop(1,'transparent');
  ctx.fillStyle = gradient;
  ctx.fillRect(pos_x,pos_y,width,height);

  
  const grad_right = ctx.createLinearGradient(pos_x + Math.floor(width) - 3, pos_y, pos_x + Math.floor(width) + 1, pos_y);
  grad_right.addColorStop(0,'transparent');
  grad_right.addColorStop(0.7, 'rgba(0,0,0,0.25)');
  grad_right.addColorStop(1, 'rgba(0,0,0,0.4)');
  ctx.fillStyle = grad_right;
  ctx.fillRect(pos_x + Math.floor(width) - 3, pos_y, 4, height);
  ctx.closePath();
}

export {addShadow};