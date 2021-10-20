import React,{ReactElement, useRef, useEffect, useState} from 'react';
import { noteEvent, blockNote } from '../../Utils/TypesForMidi';
import { CanvasRoundRect } from '../../Utils/CanvasFuntions';
import { Options as OptionsType } from '../../Utils/TypesForOptions';
import DancingLines from '../../Helpers/CanvasEffects/DancingLines';
import { RandomColorRGBwithMin, RandomColorToAlphawithMin } from '../../Utils/smallFunctions';
import './Tracks.styles.css';


interface TracksProps{
    Width: number
    Height:number
    Speed:number
    Data: Array<noteEvent>
    BlackNumbers: Array<number>
    KeysPositions: Array<any>,
    intervalSpeed: number,
    options: OptionsType,
}


export default function Tracks({Width,Height,Data,Speed, BlackNumbers, KeysPositions,intervalSpeed,options}:TracksProps):ReactElement {

    const tracksRef = useRef<HTMLCanvasElement>(null)
    const [blocks,setBlocks] = useState<Array<blockNote>>([]);
    const [timer,setTimer] = useState<number>(0);
    const [context,setContext] = useState<CanvasRenderingContext2D | null>();
    const [EffectLines,setEffectLines] = useState<DancingLines | null>(null);

    useEffect(()=>{
        const Canvas = tracksRef.current
        setContext(Canvas?.getContext('2d'));
        setEffectLines(new DancingLines(Canvas?.getContext('2d')!,Width/52,90,2,7,19,false,true,true,0.20));
        const interval = setInterval(() =>{
            setTimer(prev => prev + 1)
        },intervalSpeed)
        return () => clearInterval(interval);
    },[intervalSpeed,Width]);

    useEffect(()=>{
            const blocksToMap = [...blocks];
            let newBlocksToState:Array<blockNote> = [];
            context?.clearRect(0,0,Width,Height);
            EffectLines?.render();
            blocksToMap.map(block =>{
                block.pos_y += Speed;
                context!.shadowColor = block.color;
                context!.shadowBlur = 9;
                CanvasRoundRect(context!,block.color,Math.floor(block.pos_x),Math.floor(block.pos_y - block.height!),Math.floor(block.width),Math.floor(block.height!),5);
                if(block.pos_y - block.height! < Height){
                    newBlocksToState.push(block);
                }
                if(block.pos_y > Height && timer % 1 === 0 && options.IsEffects){
                    for(let x =0; x < 3; x++){
                    EffectLines?.AddEffect(block.pos_x,Height,RandomColorToAlphawithMin(200,200,200));
                    }
                }
                return null;
            })
            setBlocks(newBlocksToState);
             // eslint-disable-next-line react-hooks/exhaustive-deps
    },[timer])

    useEffect(() =>{
        let newblocks:Array<blockNote> = [...blocks]
        Data && Data.map(Event =>{
            const newBlock:blockNote = {
                color: options.RandomColors ? RandomColorRGBwithMin(200,200,200) : options.Color,
                width: BlackNumbers.includes(Event.NoteNumber) ? Width / 52 / 1.8 : Width / 52,
                Velocity: Event.Velocity,
                NoteNumber: Event.NoteNumber,
                pos_x: KeysPositions[Event.NoteNumber - 21].position,
                pos_y: 0,
                height: Event.Duration / 1000 / (intervalSpeed / Speed)
            }
            newblocks.push(newBlock);
            return null;
        })
        setBlocks(newblocks);
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[Data,Speed,Width,BlackNumbers,KeysPositions])

    return (
        <div>
            <div className='Mark'>
                <h1>Piano-Blocks V. 0.1</h1>
                <h2>Closed Beta Version</h2>
            </div>
            <div className='coverPhoto' style={{width:Width.toString() + 'px', height:Height.toString() + 'px', background: options.backgroundImage? `url(${options.backgroundImage})` : 'black', backgroundSize: 'cover', backgroundColor:'black'}}></div>
            <div className='Summer' style={{width:Width.toString() + 'px', marginTop:(Height - 300).toString() + 'px' }}></div>
            <canvas ref={tracksRef} width={Width.toString() + 'px'} height={Height.toString() + 'px'} className='Canvas'></canvas>
        </div>
    )
}
