import { RefObject } from "react"
import {RandomColorRGBwithMin} from '../../Utils/smallFunctions';
import {CanvasRoundRect} from '../../Utils/CanvasFuntions';
import { Options } from "../../Utils/TypesForOptions";

interface Ball{
    x:number,
    y:number,
    color:string,
    speed:number
    size:number;
}

export default class DrawInCanvas{
    private ctx:CanvasRenderingContext2D
    private Canvas:RefObject<HTMLCanvasElement>
    private balls:Array<Ball>
    private options:Options

    constructor(CanvasRef:RefObject<HTMLCanvasElement>,options:Options,defaultValue?:Array<Ball>){
        this.ctx = CanvasRef.current?.getContext('2d')!;
        this.Canvas = CanvasRef;
        this.options = options
        this.Canvas.current!.width = window.innerWidth;
        this.Canvas.current!.height = window.innerHeight;
        this.balls = defaultValue ? defaultValue : [];
        this.CreateBalls = this.CreateBalls.bind(this);
        this.render = this.render.bind(this);
        this.CreateBalls(50);
    }

    public render():void{
        if(this.Canvas && this.Canvas.current){
        if(this.Canvas.current!.width !== window.innerWidth){
        this.Canvas.current!.width = window.innerWidth;
        this.Canvas.current!.height = window.innerHeight;
        }
    }
        this.ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
        this.balls = this.balls.map(ball =>{
            ball.y += ball.speed;
            if(ball.y > 550){ball.y = -1 *(ball.size*3); ball.x = Math.random() * window.innerWidth};
            this.ctx.beginPath();
            this.ctx.shadowColor = this.options.ShadowColor;
            CanvasRoundRect(this.ctx,this.options.Color,Math.floor(ball.x),Math.floor(ball.y),Math.floor(ball.size),Math.floor(ball.size*3),4,true);
            return ball;
        })
    };

    private CreateBalls(quantity:number):void{
        this.ctx.shadowBlur = 4;
        for(let x = 0; x < quantity; x++){
            const ball:Ball = {
                x: window.innerWidth/quantity * x,
                y: Math.random() * window.innerHeight,
                color: this.options.Color,
                speed: Math.random() * 10 + 2,
                size: Math.random() > 0.5 ? window.innerWidth / 52 / 1.5: window.innerWidth/52/1.6 / 1.5
            }
            this.balls.push(ball);
        }
    }

    public get Blocks():Array<Ball>{
        return this.Blocks;
    }
}