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

    constructor(ctx:CanvasRenderingContext2D,width:number,height:number){
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.blocks = {color:'rgba(0,255,0', delta:1,startTime:Date.now()};
    }

    public render(){
        this.ctx.beginPath();
        this.ctx.clearRect(0,0,this.width,this.height);
        const gradient = this.ctx.createLinearGradient(this.width / 2,this.height - 300,this.width / 2,this.height)
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.5, this.blocks.color + ',' + (this.blocks.delta - 2).toString() + ')');
        gradient.addColorStop(1, this.blocks.color + ',' + this.blocks.delta.toString() + ')');
        this.ctx.fillStyle = gradient;
        this.ctx.rect(0,this.height - 300,this.width,this.height);
        this.ctx.fill();

        //Math
        console.log(this.blocks.color);
        this.blocks.delta = 1 / ((Date.now() -  this.blocks.startTime) / 25);

    }

    public add(Delta:number){
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
            animation && animation.add(Date.now());
            setLastScore(data);
        }else if(data - lastScore === 50){
            //good
        }else if(data - lastScore === 20){
            //ok
        }else{
            //bad
        }
        console.log(data);
    }, [data,animation,lastScore])

    return (
        <canvas width={width} height={height} ref={Canvas} style={{position:'absolute',zIndex:300,pointerEvents:'none'}} />
    )
}
