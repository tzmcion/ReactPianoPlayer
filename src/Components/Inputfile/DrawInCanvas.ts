/**
 * File consists of class which draws falling blocks in cavas
 * LAST UPDATE: 04/09/2025
 */

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

/**
 * Class creates an object which takes care of drawing falling blocks in canvas
 */
export default class DrawInCanvas{
    private ctx:CanvasRenderingContext2D
    private Canvas:RefObject<HTMLCanvasElement | null>
    private balls:Array<Ball> = []
    private options:Options

    /**
     * Class draws random falling blocks, with random sizes, down the screen.
     * @param CanvasRef A ref object to canvas element
     * @param options options, main variable in this app
     */
    constructor(CanvasRef:RefObject<HTMLCanvasElement | null>,options:Options){
        this.ctx = CanvasRef.current!.getContext('2d')!;
        this.Canvas = CanvasRef;
        this.options = options
        this.Canvas.current!.width = window.innerWidth / 2;
        this.Canvas.current!.height = window.innerHeight + 300;
        this.CreateBalls = this.CreateBalls.bind(this);
        this.render = this.render.bind(this);
        this.CreateBalls(Math.floor(100*(window.innerWidth/2)/900));
    }

    /**
     * Method renders the falling blocks
     * @param color color of the blocks
     * @param contours specifies if only contours are rendered, or the rectangle is filled
     */
    public render(color:string, contours:boolean=true):void{
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
            this.ctx.shadowColor = color;
            this.ctx.shadowOffsetX = 0;
            this.ctx.shadowOffsetY = 0;
            this.ctx.shadowBlur = 8;
            CanvasRoundRect(this.ctx,color,Math.floor(ball.x),Math.floor(ball.y),Math.floor(ball.size),Math.floor(ball.size*3.7),5,contours);
            return ball;
        })
    };
    }

    /**
     * Function create the blocks (idk why function name is balls)
     * @param quantity How many should appear on the screen
     */
    private CreateBalls(quantity:number):void{
        this.ctx.shadowBlur = 4;
        for(let x = 0; x < quantity; x++){
            const ball_size = (Math.random() > 0.5 ? window.innerWidth < 1200 ? 1200  / 52 / 1.5 : window.innerWidth  / 52 / 1.5 : window.innerWidth < 1200 ? 1200/52 /1.6 / 1.5 :   window.innerWidth/52 /1.6 / 1.5)
            const ball:Ball = {
                x: window.innerWidth/quantity * x,
                y: Math.random() * window.innerHeight,
                speed: Math.random() * this.options.playSpeed + 3.5,
                size: ball_size,
                start_time: Date.now() - Math.floor(Math.random() * 4000)
            }
            this.balls.push(ball);
        }
    }

    /**
     * Get the blocks array
     */
    public get Blocks():Array<Ball>{
        return this.Blocks;
    }
}