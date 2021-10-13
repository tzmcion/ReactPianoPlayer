import React,{ReactElement, useRef, useEffect, useState} from 'react';
import { noteEvent, blockNote } from '../../Utils/TypesForMidi';
import { CanvasRoundRect } from '../../Utils/CanvasFuntions';
import './Tracks.styles.css';


interface TracksProps{
    Width: number
    Height:number
    Speed:number
    Data: Array<noteEvent>
    BlackNumbers: Array<number>
    KeysPositions: Array<any>,
    intervalSpeed: number
}


export default function Tracks({Width,Height,Data,Speed, BlackNumbers, KeysPositions,intervalSpeed}:TracksProps):ReactElement {

    const tracksRef = useRef<HTMLCanvasElement>(null)
    const [blocks,setBlocks] = useState<Array<blockNote>>([]);
    const [timer,setTimer] = useState<number>(0);
    const [context,setContext] = useState<CanvasRenderingContext2D | null>();

    useEffect(()=>{
        const Canvas = tracksRef.current
        setContext(Canvas?.getContext('2d'));
        console.log(Canvas);

        setInterval(() =>{
            setTimer(prev => prev + 1)
        },intervalSpeed)
    },[])

    useEffect(()=>{
            const blocksToMap = [...blocks];
            let newBlocksToState:Array<blockNote> = [];
            context?.clearRect(0,0,Width,Height);
            blocksToMap.map(block =>{
                let newBlock = block;
                newBlock.pos_y += Speed;
                CanvasRoundRect(context!,block.color,block.pos_x,block.pos_y - block.height!,block.width,block.height!,5);
                if(newBlock.pos_y - block.height! < Height){
                newBlocksToState.push(newBlock);
                }
                return null;
            })
            setBlocks(newBlocksToState);
    },[timer])

    useEffect(() =>{
        let newblocks:Array<blockNote> = [...blocks]
        Data && Data.map(Event =>{
            const newBlock:blockNote = {
                color: `rgb(${Math.random() * 254},${Math.random() * 254}, ${Math.random() * 254})`,
                width: BlackNumbers.includes(Event.NoteNumber) ? Width / 52 / 1.8 : Width / 52,
                Velocity: Event.Velocity,
                NoteNumber: Event.NoteNumber,
                Delta: Event.Delta,
                Duration: Event.Duration,
                SoundDuration: Event.SoundDuration,
                pos_x: KeysPositions[Event.NoteNumber - 21].position,
                pos_y: 0,
                height: Event.Duration / 1000 / 5
            }
            
            newBlock.Velocity > 0 && newblocks.push(newBlock);
            return null;
        })
        setBlocks(newblocks);
    },[Data,Speed,Width,BlackNumbers])

    return (
        <div>
            <canvas ref={tracksRef} width={Width.toString() + 'px'} height={Height.toString() + 'px'} className='Canvas'></canvas>
        </div>
    )
}
