class ball {
    public y:number
    private size:number
    private x:number
    private c:CanvasRenderingContext2D
    private gradient: CanvasGradient
    private last:number
    private vy:number
    constructor(size:number,ctx:CanvasRenderingContext2D,color:string,y:number,x:number) {
      this.c = ctx
      this.y = y
      this.size = size === undefined ? Math.random() * 25 + 15 : Math.random() * size + 5;
      this.x = x;
      var colorrr = color.replace("hue", (Math.random() * 350 + 100).toString()).replace("hue", (Math.random() * 350 + 100).toString()).replace("hue", (Math.random() * 350 + 100).toString());

      this.vy = Math.random() * -5 - 3;
      this.gradient = this.c.createRadialGradient(0, 0, 0, 0, 0, this.size);
      this.gradient.addColorStop(1, colorrr.replace("alp", '0.6'));
      this.gradient.addColorStop(0, colorrr.replace("alp", '0.5'));
      this.gradient.addColorStop(0.5, colorrr.replace("alp", '0.4'));
      this.last = 1;
    }
    update() {
      this.y += this.vy;
    }

    draw() {
      this.c.fillStyle = this.gradient;
      this.c.translate(this.x | 0, this.y | 0);
      this.c.beginPath();
      this.c.arc(0, 0, this.size, 0, Math.PI * 2,false);
      this.c.fill();
      this.c.translate(-this.x | 0, -this.y | 0);
    }
  }


export default class StickyBalls{
    private ctx:CanvasRenderingContext2D
    private ctx_b:CanvasRenderingContext2D
    private width:number
    private height:number
    private startTime:number
    private key_width:number
    private reseter:number
    private effects:Array<ball>
    
    constructor(ctx:CanvasRenderingContext2D,width:number,height:number,key_width:number){
        this.ctx = ctx;
        this.ctx_b = ctx;
        this.width=width;
        this.key_width = key_width
        this.height=height;
        this.ctx.globalCompositeOperation = 'source-over';
        this.reseter = 0;
        this.ctx.shadowBlur = 0;
        this.startTime = Date.now();
        this.ctx.clearRect(0,0,width,height);
        this.effects = [];
    }

    public render(){
        if(Date.now() - this.startTime >= 30){
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.beginPath();
        const newEffects:any = [];
        this.effects.map(effect =>{
            effect.update();
            effect.draw();
            if(effect.y > 0){
                newEffects.push(effect);
            }
            return null;
        })
        this.effects = newEffects;
        this.startTime = Date.now();
        }
    }

    public create(pos_x:number,pos_y:number, color:string){
        if(Date.now() % 50 < 20){
        this.effects = [...this.effects,new ball(Math.random()* 15,this.ctx,'rgba(hue,80, 80 , alp )',pos_y,pos_x + (this.key_width / (Math.random() *2 +1)))];
        }
    }

    public clear(){
        this.ctx.fillStyle = 'rgba(0,0,0,1)';
        this.effects = [];
    }

    private Rect_Floor_Alpha_ReturnNewAlpha(pos_x:number,pos_y:number, color:string, alpha:number,hsl:number){
        this.ctx.beginPath();
        this.ctx.fillStyle = `hsl(${hsl},100%,${100 * Math.sin(alpha * 360)}%)`;
        this.ctx.shadowColor = color;
        const size = Math.random() * 2 + 1.5
        this.ctx.fillRect(pos_x,pos_y,size,size);
        this.ctx.fill();
        return alpha - 1/400;
    }
}
