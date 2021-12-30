

interface Effect{
    pos_x: number,
    pos_y: number,
    color: string,
    velocity_y:number,
    velocity_x:number,
    alpha:number,
    lifeStart:number,
    hsl:number
}

export default class HexagonEffect{
    private ctx:CanvasRenderingContext2D
    private width:number
    private height:number
    private startTime:number
    private key_width:number
    private reseter:number
    private effects:Array<Effect>
    
    constructor(ctx:CanvasRenderingContext2D,width:number,height:number,key_width:number){
        this.ctx = ctx;
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
        this.ctx.fillStyle = 'rgba(0,0,0,0.10)';
        this.ctx.beginPath();
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.fill();
        let newEffects: Array<Effect> = [];
        this.effects.map(effect =>{
            effect.alpha = this.Rect_Floor_Alpha_ReturnNewAlpha(effect.pos_x,effect.pos_y,effect.color,effect.alpha,effect.hsl);
            effect.pos_y -= effect.velocity_y;
            effect.pos_x += effect.velocity_x;
            if(Date.now() - effect.lifeStart >= 500){
                effect.velocity_y = Math.random() > 0.5 ? 1 : Math.random() > 0.5 ? 2 : 0
                effect.velocity_x = effect.velocity_y === 2? 0 : effect.velocity_y === 1 ? Math.random() > 0.5 ? -1: 1 : Math.random() > 0.5 ? -2: 2;
                effect.lifeStart = Date.now();
            }
            effect.alpha > 0 && Math.random() > 0.005 && effect.pos_y < this.height && newEffects.push(effect);
            return null;
        })
        this.effects = newEffects;
        this.reseter++;
    }

    public create(pos_x:number,pos_y:number, color:string){
        const newEffect:Effect = {
            alpha:1,
            color: color,
            lifeStart: Date.now(),
            pos_x: pos_x + this.key_width / 2,
            pos_y:pos_y,
            velocity_x: Math.random() > 0.5 ? Math.random() > 0.5 ? 1: -1 : 2,
            velocity_y: Math.random() > 0.5 ? 1 : Math.random() > 0.5 ? 2 : 0,
            hsl:Math.random() * 2000
        }
        if((Date.now() - this.startTime) % 50 < 35){
            this.effects = [...this.effects,newEffect];
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