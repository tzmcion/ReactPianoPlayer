interface Effect{
    pos_x: number,
    pos_y: number,
    color: string,
    velocity_y:number,
    velocity_x:number,
    alpha:number
}

export default class fountain{
    private ctx:CanvasRenderingContext2D
    private width:number
    private height:number
    private key_width:number
    private effect_width:number
    private effect_height:number
    private gravitation_force:number
    private effects:Array<Effect>
    
    constructor(ctx:CanvasRenderingContext2D,width:number,height:number,key_width:number){
        this.ctx = ctx;
        this.width=width;
        this.height=height;
        this.gravitation_force = 0.20
        this.key_width = key_width;
        this.effect_height = 6;
        this.effect_width = 2;
        this.ctx.globalCompositeOperation = 'source-over';
        this.ctx.shadowBlur = 0;
        this.ctx.clearRect(0,0,width,height);
        this.effects = [];
    }

    public render(){
        let newEffects: Array<Effect> = [];
        this.effects.map(effect =>{
            effect.alpha = this.Rect_Floor_Alpha_ReturnNewAlpha(effect.pos_x,effect.pos_y,effect.color,effect.alpha);
            effect.pos_y -= Math.random() * effect.velocity_y;
            effect.pos_x += Math.random() * effect.velocity_x;
            effect.velocity_x > 0 ? effect.velocity_x += Math.random() * 0.05: effect.velocity_x-= Math.random() * 0.05
            effect.velocity_y -= this.gravitation_force / effect.alpha;
            effect.alpha > 0 && effect.pos_y < this.height && newEffects.push(effect);
            return null;
        })
        this.effects = newEffects;
        this.ctx.fillStyle = 'rgba(0,0,0,0.1)';
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.width, this.height);
        this.ctx.fill();
    }

    public create(pos_x:number,pos_y:number, color:string){
        const NewEffect: Effect = {
            pos_x: pos_x + Math.random() * this.key_width / 2 + this.key_width / 4,
            pos_y: pos_y,
            color: color,
            velocity_y: Math.round(Math.random() * (this.height/80) + 5),
            velocity_x: Math.random() > 0.5 ? 1 : -1,
            alpha:1
        }
        this.effects.push(NewEffect);
    }

    public clear(){
        this.ctx.fillStyle = 'rgba(0,0,0,1)';
        this.effects = [];
    }

    private Rect_Floor_Alpha_ReturnNewAlpha(pos_x:number,pos_y:number, color:string, alpha:number){
        this.ctx.beginPath();
        this.ctx.fillStyle = color + ',1)';
        this.ctx.arc(pos_x,pos_y,Math.random() * 2 + 0.2,0,Math.PI*2);
        this.ctx.fill();
        return alpha - 1/100;
    }
}