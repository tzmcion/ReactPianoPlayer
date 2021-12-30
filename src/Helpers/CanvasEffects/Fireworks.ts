interface Effect{
    pos_x: number,
    pos_y: number,
    color: string,
    velocity_y:number,
    velocity_x:number,
    alpha:number
}

class Trail_Element{
    private pos_x:number
    private pos_y:number
    private radius:number
    private color:string
    private ticks:number
    public alpha:number
    private startalpha:number
    constructor(x:number,y:number,r:number,lifeTime:number,color:string,alpha:number){
        this.pos_x = x;
        this.pos_y = y;
        this.radius = r;
        this.alpha = alpha;
        this.ticks = 0;
        this.color = color;
        this.startalpha = Math.random() > 0.5 ? 0.5: -0.5
    }

    public Update_and_draw(ctx:CanvasRenderingContext2D):void{
        const col = this.color + `,${this.alpha})`;
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(Math.floor(this.pos_x),Math.floor(this.pos_y),Math.round(this.radius),0,Math.PI*2);
        ctx.fill();
        ctx.closePath();
        this.Updt();
    }

    private Updt():void{
        this.alpha -= 0.03
        this.ticks++;
        if(this.ticks % 15 === 0){
            this.startalpha *= -1
        }
        this.pos_x += this.startalpha
    }
}

export default class Firework{
    private ctx:CanvasRenderingContext2D
    private width:number
    private height:number
    private key_width:number
    private ticker:number
    private effects:Array<Effect>
    private trials:Array<Trail_Element>
    
    constructor(ctx:CanvasRenderingContext2D,width:number,height:number,key_width:number){
        this.ctx = ctx;
        this.width=width;
        this.height=height;
        this.key_width = key_width;
        this.ctx.globalCompositeOperation = 'lighter';
        this.ctx.shadowBlur = 0;
        this.ctx.clearRect(0,0,width,height);
        this.effects = [];
        this.trials = [];
        this.ticker = 0;
    }

    public render(){
        this.ctx.clearRect(0, 0, this.width, this.height);
        let newEffects: Array<Effect> = [];
        this.effects.map(effect =>{
            effect.alpha = this.Rect_Floor_Alpha_ReturnNewAlpha(effect.pos_x,effect.pos_y,effect.color,effect.alpha);
            effect.pos_y -= effect.velocity_y;
            effect.pos_x += Math.random() * effect.velocity_x;
            effect.velocity_x > 0 ? effect.velocity_x += Math.random() * 0.05: effect.velocity_x-= Math.random() * 0.05
            effect.alpha > 0.15 && newEffects.push(effect);
            Math.random() > 0.6 && this.trials.push(new Trail_Element(effect.pos_x + this.key_width / (2 * (Math.random() + 7)),effect.pos_y,Math.random()*2,1000,`rgba(${Math.random() * 50 + 50},150,${Math.random()*150 + 50}`,effect.alpha));
            return null;
        })
        const newTrails:any = [];
        this.trials.map(el=>{
            el.Update_and_draw(this.ctx);
            if(el.alpha > 0.15){
                newTrails.push(el);
            }
            return null;
        })
        this.trials = newTrails;
        this.effects = newEffects;
    }

    public create(pos_x:number,pos_y:number, color:string){
        const NewEffect: Effect = {
            pos_x: pos_x + Math.random() * this.key_width / 2 + this.key_width / 4,
            pos_y: pos_y,
            color: color,
            velocity_y: Math.round(Math.random() * (this.height/300) + 1.4),
            velocity_x: Math.random() > 0.5 ? 1 : -1,
            alpha:1
        }
        this.effects = [...this.effects,NewEffect];
    }

    public clear(){
        this.ctx.fillStyle = 'rgba(0,0,0,1)';
        this.effects = [];
    }

    private Rect_Floor_Alpha_ReturnNewAlpha(pos_x:number,pos_y:number, color:string, alpha:number){
        return alpha - 1/(60 + Math.random() * 50);
    }
}