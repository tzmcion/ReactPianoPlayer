import { RefObject } from "react"
import {RandomColorRGBwithMin} from '../../Utils/smallFunctions';
import {CanvasRoundRect} from '../../Utils/CanvasFuntions';

interface Ball{
    x:number,
    y:number,
    color:string,
    speed:number
    size:number;
}

export default class DrawInCanvas{
    ctx:CanvasRenderingContext2D
    Canvas:RefObject<HTMLCanvasElement>
    balls:Array<Ball>
    constructor(CanvasRef:RefObject<HTMLCanvasElement>){
        this.ctx = CanvasRef.current?.getContext('2d')!;
        this.Canvas = CanvasRef;
        this.Canvas.current!.width = window.innerWidth;
        this.Canvas.current!.height = window.innerHeight;
        this.balls = [];
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
            this.ctx.shadowColor = ball.color;
            CanvasRoundRect(this.ctx,ball.color,Math.floor(ball.x),Math.floor(ball.y),Math.floor(ball.size),Math.floor(ball.size*3),4);
            return ball;
        })
    };

    private CreateBalls(quantity:number):void{
        this.ctx.shadowBlur = 4;
        for(let x = 0; x < quantity; x++){
            const ball:Ball = {
                x: window.innerWidth/quantity * x,
                y: Math.random() * window.innerHeight,
                color: RandomColorRGBwithMin(150,150,150),
                speed: Math.random() * 10 + 2,
                size: Math.random() > 0.5 ? window.innerWidth / 52: window.innerWidth/52/1.6
            }
            this.balls.push(ball);
        }
    }
}