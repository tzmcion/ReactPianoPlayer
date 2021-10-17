import hexAlpha from "hex-alpha";

interface Effect{
    pos_x: number,
    pos_y: number,
    radius: number,
    color: string,
    velocity_y:number,
    velocity_x:number
    alpha:number
}

class DancingLines{
    readonly ctx:CanvasRenderingContext2D
    readonly radius_size:number
    readonly end_size:number
    readonly key_width:number
    readonly line_width:number
    readonly life_time:number;
    private Effects:Array<Effect>
    constructor(ctx:CanvasRenderingContext2D, keyWidth:number , radiusMaxSize:number,endSize:number, lineWidth:number, lifeTime:number){
        this.ctx = ctx;
        this.radius_size = radiusMaxSize;
        this.end_size = endSize;
        this.key_width = keyWidth;
        this.line_width = lineWidth;
        this.life_time = lifeTime;
        this.Effects = [];
    }

    public AddEffect(pos_x:number,pos_y:number, color:string):void{
        const NewEffect: Effect = {
            pos_x: pos_x + Math.random() * this.key_width / 2 + this.key_width / 4,
            pos_y: pos_y,
            radius: this.radius_size,
            color: color,
            velocity_y: 15,
            velocity_x: Math.random() > 0.5 ? 1 : -1,
            alpha:1,
        }
        this.Effects.push(NewEffect);
    }

    public render():void{
        let newEffects: Array<Effect> = [];
        this.Effects.map(Effect =>{
            this.ctx.beginPath();
            this.ctx.fillStyle = Effect.color + `,${Effect.alpha})`;
            this.ctx.fillRect(Math.floor(Effect.pos_x),Math.floor(Effect.pos_y),2,5);
            Effect.alpha -= 1 / this.life_time;
            Effect.pos_y -= Math.random() * Effect.velocity_y;
            Effect.pos_x += Math.random() * 0.5 * Effect.velocity_x;
            Effect.velocity_x > 0 ? Effect.velocity_x += Math.random() * 0.35: Effect.velocity_x-= Math.random() * 0.35
            Effect.velocity_y -= 0.20;
            if(Effect.alpha > 0){
                newEffects.push(Effect);
            }
            return null;
        })
        this.Effects = newEffects;
    }

}

export default DancingLines;