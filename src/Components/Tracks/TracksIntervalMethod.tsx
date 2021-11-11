import React,{ReactElement, useRef, useEffect, useState} from 'react';
import './Tracks.styles.css';

import { noteEvent, blockNote } from '../../Utils/TypesForMidi';
import { CanvasRoundRect } from '../../Utils/CanvasFuntions';
import { Options as OptionsType } from '../../Utils/TypesForOptions';
import Effects from '../../Helpers/Effects/Effects';
import { RandomColorRGBwithMin } from '../../Utils/smallFunctions';
import MidiPlayer from '../../Helpers/MidiPlayer';
import LoadingScreen from '../DrawPiano/LoadingScreen/LoadingScreen';
import Piano from '../DrawPiano/PianoKeys/AllKeys';

import BG from '../../Assets/BG.jpg';

interface TracksProps{
    Speed:number
    Data: Array<noteEvent>
    BlackNumbers: Array<number>
    KeysPositions: Array<any>,
    intervalSpeed: number,
    options: OptionsType,
    Player: MidiPlayer,
    sound:any
}


export default function TracksIntervalMethod({Data,Speed, BlackNumbers, KeysPositions,intervalSpeed,options,Player,sound}:TracksProps):ReactElement {

    const tracksRef = useRef<HTMLCanvasElement>(null)
    const effectsRef = useRef<HTMLCanvasElement>(null);
    const [blocks,setBlocks] = useState<Array<blockNote>>([]);
    const [timer,setTimer] = useState<number>(0);
    const [context,setContext] = useState<CanvasRenderingContext2D | null>();
    const [effects,setEffects] = useState<Effects>();
    const [loading,setLoading] = useState<boolean>(true);
    const [finishedLoading,setFinishedLoading] = useState<boolean>(false);
    const [keysNotes,setKeysNotes] = useState<Array<blockNote>>([]);
    const [Width,setWindowKeyWidth] = useState<number>(window.innerWidth);
    const [Height,setWindowHeight] = useState<number>(window.innerHeight);

    useEffect(()=>{
        if(!loading){
        const Canvas = tracksRef.current
        setContext(Canvas?.getContext('2d'));
        setEffects(new Effects(effectsRef.current?.getContext('2d')!,options,Width,Height - Height/5));
        const interval = setInterval(() =>{
            setTimer(prev => prev + 1)
        },intervalSpeed)
        return () => clearInterval(interval);
    }
    },[intervalSpeed,Width,options,loading,Height]);
    
    useEffect(()=>{
        if(!Player.isPaused){
            const blocksToMap = [...blocks];
            let notesToEvent:Array<blockNote> = [];
            let newBlocksToState:Array<blockNote> = [];
            effects?.renerEffects();
            context?.clearRect(0,0,Width,Height-Height/5);
            blocksToMap.reverse().map(block =>{
                block.pos_y += Speed;
                context!.shadowColor = block.color;
                context!.shadowBlur = 8;
                CanvasRoundRect(context!,block.color,block.pos_x,block.pos_y - block.height!,block.width,block.height!,5);
                if(block.pos_y - block.height! < Height-Height/5){
                    newBlocksToState.push(block);
                    if(block.pos_y > Height-Height/5 && !block.wasDetected){
                        block.wasDetected = true;
                        notesToEvent.push(block);
                    }
                }
                else{
                    block.wasDetected = false;
                    notesToEvent.push(block);
                }
                if(block.pos_y > Height-Height/5){
                    const gradient = context!.createRadialGradient(block.pos_x + Width / 52 / 2, Height, 15, block.pos_x + Width / 52 / 2, Height, 45);
                    gradient.addColorStop(0, block.color);
                    gradient.addColorStop(0.8, 'rgba(0,0,0,0.5)');
                    gradient.addColorStop(1,'transparent')
                    context!.beginPath();
                    context!.shadowBlur = 0;
                    context!.fillStyle = gradient;
                    context!.fillRect(block.pos_x + Width / 52 / 2 - 50, Height - 50,block.pos_x + Width / 52 / 2 +50, Height +50);
                    context!.closePath();
                    options.IsEffects && effects?.triggerNewEffects(0,block.pos_x,block.width);
                }
                return null;
            })
            notesToEvent.length > 0 && setKeysNotes(notesToEvent);
            setBlocks(newBlocksToState);
        }else{
            if(Player.isReseting){
                context?.clearRect(0,0,Width,Height-Height/5);
                setBlocks([]);
            }
        }
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
                height: Event.Duration / 1000 / (intervalSpeed / Speed),
                wasDetected: false,
                duration:Event.Duration,
                creationTime: 0
            }
            newblocks.push(newBlock);
            return null;
        })
        setBlocks(newblocks);
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[Data,Speed])

    useEffect(()=>{
        window.addEventListener('resize',handleResize);
        const inter = setInterval(()=>{
            if(Player.isReady){
                setTimeout(()=>{loading && setLoading(false)},2500);
                setFinishedLoading(true)
                clearInterval(inter)
            }
        },500)
        return () => clearInterval(inter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleResize = () =>{
        setWindowKeyWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    }

    return (
        <div>
            {finishedLoading && <>{options.watermark && <div className='Mark'>
                <h1>Piano-Blocks V. 0.1</h1>
                <h2>Closed Beta Version</h2>
            </div>}
            <div className='coverPhoto' style={{width:Width.toString() + 'px', height:(Height-Height/5).toString() + 'px', backgroundImage: options.backgroundImage? `url(${options.backgroundImage})` : `url(${BG})`, backgroundSize: `${Width}px ${Height}px`}}></div>
            <div className='Summer' style={{width:Width.toString() + 'px', marginTop:(Height-Height/5 - 300).toString() + 'px' }}></div>
            <canvas ref={tracksRef} width={Width.toString() + 'px'} height={(Height-Height/5).toString() + 'px'} className='Canvas' />
            <canvas ref={effectsRef} width={Width.toString() + 'px'} height={(Height-Height/5).toString() + 'px'} className='Effects' />
            </>}
            <Piano wh={Height - Height/5} height={Height/5} WhiteKeyWidth={Width / 52} data={keysNotes} sound={sound} />
            {loading && <LoadingScreen width={Width} onLoaded={()=>{Player.GetMidiAsObject()}} height={Height} Finished={finishedLoading}/>}
        </div>
    )
}