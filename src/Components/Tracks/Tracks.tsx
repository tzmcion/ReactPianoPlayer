import React,{ReactElement, useRef, useEffect, useState} from 'react';
import './Tracks.styles.css';

import { noteEvent, blockNote } from '../../Utils/TypesForMidi';
import { CanvasRoundRect } from '../../Utils/CanvasFuntions';
import { Options as OptionsType } from '../../Utils/TypesForOptions';
import Effects from '../../Helpers/Effects/Effects';
import Blocks from '../../Helpers/Blocks/Blocks';
import {KeyGradient} from '../../Helpers/CanvasEffects';
import { RandomColorRGBwithMin } from '../../Utils/smallFunctions';
import MidiPlayer from '../../Helpers/MidiPlayer';
import LoadingScreen from '../DrawPiano/LoadingScreen/LoadingScreen';

import BG from '../../Assets/BG.jpg';

interface TracksProps{
    Speed:number
    Data: Array<noteEvent>
    BlackNumbers: Array<number>
    KeysPositions: Array<any>,
    intervalSpeed: number,
    options: OptionsType,
    Player: MidiPlayer,
    sound:any,
    setKeysNotes:Function
}


export default function Tracks({Data,Speed, BlackNumbers, KeysPositions,intervalSpeed,options,Player,setKeysNotes,sound}:TracksProps):ReactElement {

    const tracksRef = useRef<HTMLCanvasElement>(null);
    const EffectsRef = useRef<HTMLCanvasElement>(null);
    const [blocks,setBlocks] = useState<Blocks>();
    const [loading,setLoading] = useState<boolean>(true);
    const [finishedLoading,setFinishedLoading] = useState<boolean>(false);
    const [Width,setWindowKeyWidth] = useState<number>(window.innerWidth);
    const [Height,setWindowHeight] = useState<number>(window.innerHeight);

    useEffect(()=>{
        if(!loading){
        const Canvas = tracksRef.current
        const Effects = EffectsRef.current
        setBlocks(new Blocks(Canvas?.getContext('2d')!,Effects?.getContext('2d')!,Width,Height,options,BlackNumbers,intervalSpeed,Speed,KeysPositions,sound,setKeysNotes));
    }
    },[intervalSpeed,Width,options,loading,Height]);

    useEffect(() => {
        let interval:any = 0;
        if(blocks){
            if(!blocks.isInterval){
                blocks.run();
                interval = setInterval(blocks.render,intervalSpeed);
            }
        }
        return () => {clearInterval(interval)}
    }, [blocks])


    useEffect(() =>{
        blocks?.add(Data);
    },[Data])

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
            <div className='coverPhoto' style={{width:Width.toString() + 'px', height:(Height - Height/5).toString() + 'px', backgroundImage: options.backgroundImage? `url(${options.backgroundImage})` : `url(${BG})`, backgroundSize: `${Width}px ${Height}px`}}></div>
            <div className='Summer' style={{width:Width.toString() + 'px', marginTop:(Height - (Height/5)*2 ).toString() + 'px' ,height:Height/5}}></div>
            <canvas ref={tracksRef} width={Width.toString() + 'px'} height={(Height - Height/5).toString() + 'px'} className='Canvas'></canvas>
            <canvas ref={EffectsRef} width={Width} height={Height - Height/5} className='Effects'></canvas>
            </>}
            <div className='redFancyLine' style={{marginTop:Height - Height/5}} />
            {loading && <LoadingScreen width={Width} onLoaded={()=>{Player.GetMidiAsObject()}} height={Height - Height/5} Finished={finishedLoading}/>}
        </div>
    )
}
