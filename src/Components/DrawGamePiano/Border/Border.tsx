import React,{useRef,useEffect,useState,useCallback} from 'react';
import { useSelector } from 'react-redux'

interface Props{
    width:number,
    height:number
}

class BorderAnimation{

    private ctx:CanvasRenderingContext2D
    private width:number
    private height:number
    private blocks:{color:string,delta:number,startTime:number}
    private color:string

    constructor(ctx:CanvasRenderingContext2D,width:number,height:number){
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.color = 'rgba(0,255,0';
        this.blocks = {color:'rgba(0,255,0', delta:1,startTime:Date.now()};
    }

    public render(){
        this.ctx.beginPath();
        this.ctx.clearRect(0,0,this.width,this.height);
        const gradient = this.ctx.createLinearGradient(this.width / 2,this.height - 300,this.width / 2,this.height)
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.5, this.color + ',' + (Math.abs(this.blocks.delta) - 2).toString() + ')');
        gradient.addColorStop(1, this.color + ',' + Math.abs(this.blocks.delta).toString() + ')');
        this.ctx.fillStyle = gradient;
        this.ctx.rect(0,this.height - 300,this.width,this.height);
        this.ctx.fill();

        //Math
        this.blocks.delta = 1 / ((Date.now() -  this.blocks.startTime) / 25);

    }

    public add(Delta:number,color:'green' | 'yellow' | 'orange' | 'red' | 'black'){
        if(color === 'green'){
            this.color = 'rgba(0,255,0';
        }
        if(color === 'yellow'){
            this.color = 'rgba(0,255,255';
        }
        if(color === 'orange'){
            this.color = 'rgba(255,255,0';
        }
        if(color === 'red'){
            this.color = 'rgba(255,0,0';
        }
        if(color === 'black'){
            this.color = 'rgba(1,0,0';
        }
        this.blocks.startTime = Delta;
    }
}

export default function Border({width,height}:Props) {

    const Canvas = useRef<HTMLCanvasElement>(null);
    const AnimId = useRef<number>(0);

    const [lastScore,setLastScore] = useState<number>(0);
    const [animation,setAnimation] = useState<BorderAnimation>();
    const data:number = useSelector((state) => state as number);


    const anim = () =>{
            animation && animation.render();
            AnimId.current = requestAnimationFrame(anim);
    }


    useEffect(() => {
        setAnimation(new BorderAnimation(Canvas.current!.getContext('2d')!,width,height));
    }, [width,height])

    useEffect(() => {
        if(animation){
        AnimId.current = requestAnimationFrame(anim);
        }
        return () =>{cancelAnimationFrame(AnimId.current)}
    }, [animation])

    useEffect(() => {
        if(data - lastScore === 100){
            animation && animation.add(Date.now(),'green');
            setLastScore(data);
        }else if(data - lastScore === 50){
            //good
            animation && animation.add(Date.now(),'yellow');
            setLastScore(data);
        }else if(data - lastScore === 20){
            //ok
            animation && animation.add(Date.now(),'orange');
            setLastScore(data);
        }else if(data - lastScore === 10){
            //meh
            animation && animation.add(Date.now(),'red');
            setLastScore(data);
        }
         if(data - lastScore === -10){
            animation && animation.add(Date.now(),'black');
            setLastScore(data);
        }
        console.log(data);
    }, [data,animation,lastScore])

    return (
        <div >
            <h1 style={{color:'white', position:'absolute',top:20,left:50,fontSize:42,zIndex:555}}>Your Score: {data}</h1>
        <canvas width={width} height={height} ref={Canvas} style={{position:'absolute',zIndex:300,pointerEvents:'none'}} />
        </div>
    )
}
