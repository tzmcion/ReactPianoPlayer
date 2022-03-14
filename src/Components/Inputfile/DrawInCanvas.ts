import { RefObject } from "react"
import {CanvasRoundRect} from '../../Utils/CanvasFuntions';
import { Options } from "../../Utils/TypesForOptions";

interface Ball{
    x:number,
    y:number,
    speed:number,
    size:number,
    start_time:number
}

export default class DrawInCanvas{
    private ctx:CanvasRenderingContext2D
    private Canvas:RefObject<HTMLCanvasElement>
    private balls:Array<Ball>
    private options:Options
    private gradient:CanvasGradient

    constructor(CanvasRef:RefObject<HTMLCanvasElement>,options:Options,defaultValue?:Array<Ball>){
        this.ctx = CanvasRef.current?.getContext('2d')!;
        this.Canvas = CanvasRef;
        this.options = options
        this.Canvas.current!.width = window.innerWidth / 2;
        this.Canvas.current!.height = window.innerHeight + 300;
        this.balls = defaultValue ? defaultValue : [];
        this.CreateBalls = this.CreateBalls.bind(this);
        this.render = this.render.bind(this);
        this.CreateBalls(100);
        this.gradient = this.ctx.createLinearGradient(0,0, this.Canvas.current!.width * Math.cos(90 / 180 * Math.PI),this.Canvas.current!.height  * Math.sin(90 / 180 * Math.PI));
        const step = 1 / this.options.GradientBlocksColor.length;
        let current_step = 0;
        console.log(this.options.GradientBlocksColor)
        this.options.GradientBlocksColor.forEach(color =>{this.gradient.addColorStop(current_step,color); current_step+=step});
    }

    public render(color:string):void{
    if(this.Canvas && this.ctx){
        if(this.Canvas && this.Canvas.current){
        if(this.Canvas.current!.width !== window.innerWidth || this.Canvas.current!.height !== window.innerHeight + 300){
            this.Canvas.current!.width = window.innerWidth > 920 ? window.innerWidth / 2 : window.innerWidth;
            this.Canvas.current!.height = window.innerHeight + 300;
        }
    }
        this.ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
        this.balls = this.balls.map(ball =>{
            ball.y = (Date.now() - ball.start_time) / ball.speed;
            if(ball.y > this.Canvas.current!.height){ball.x = Math.random() * window.innerWidth;ball.start_time = Date.now() + 500};
            this.ctx.beginPath();
            this.ctx.shadowColor = this.options.ShadowColor;
            CanvasRoundRect(this.ctx,this.options.GradientBlocks ? this.gradient:color,Math.floor(ball.x),Math.floor(ball.y),Math.floor(ball.size),Math.floor(ball.size*3.7),this.options.blockRadius,true);
            return ball;
        })
    };
    }

    private CreateBalls(quantity:number):void{
        this.ctx.shadowBlur = 4;
        for(let x = 0; x < quantity; x++){
            const ball:Ball = {
                x: window.innerWidth/quantity * x,
                y: Math.random() * window.innerHeight,
                speed: Math.random() * 2 + 2,
                size: (Math.random() > 0.5 ? window.innerWidth < 1200 ? 1200  / 52 / 1.5 : window.innerWidth  / 52 / 1.5 : window.innerWidth < 1200 ? 1200/52 /1.6 / 1.5 :   window.innerWidth/52 /1.6 / 1.5),
                start_time: Date.now() - Math.floor(Math.random() * 4000)
            }
            this.balls.push(ball);
        }
    }

    public get Blocks():Array<Ball>{
        return this.Blocks;
    }
}