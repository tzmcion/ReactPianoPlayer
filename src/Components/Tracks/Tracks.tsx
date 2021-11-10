import React,{ReactElement, useRef, useEffect, useState} from 'react';
import './Tracks.styles.css';

import { noteEvent, blockNote } from '../../Utils/TypesForMidi';
import { Options as OptionsType } from '../../Utils/TypesForOptions';
import Blocks from '../../Helpers/Blocks/Blocks';
import MidiPlayer from '../../Helpers/MidiPlayer';
import LoadingScreen from '../DrawPiano/LoadingScreen/LoadingScreen';
import Piano from '../DrawPiano/PianoKeys/AllKeys';
import { CanvasRoundRect } from '../../Utils/CanvasFuntions';

import BG from '../../Assets/BG.jpg';

interface TracksProps{
    Speed:number
    Data: Array<noteEvent>
    BlackNumbers: Array<number>
    KeysPositions: Array<any>,
    intervalSpeed: number,
    options: OptionsType,
    Player: MidiPlayer,
    Width:number,
    Height:number
    sound:any,
}


export default function Tracks({Data,Speed,Width,Height, BlackNumbers, KeysPositions,intervalSpeed,options,Player,sound}:TracksProps):ReactElement {

    const tracksRef = useRef<HTMLCanvasElement>(null);
    const EffectsRef = useRef<HTMLCanvasElement>(null);
    const PianoRef = useRef<HTMLCanvasElement>(null);
    const PianoWhiteRef = useRef<HTMLCanvasElement>(null);
    const [pianoCtx,setPianoCtx] = useState<CanvasRenderingContext2D>();
    const [pianoWhiteCtx,setPianoWhiteCtx] = useState<CanvasRenderingContext2D>();
    const [blocks,setBlocks] = useState<Blocks>();
    const [loading,setLoading] = useState<boolean>(true);
    const [finishedLoading,setFinishedLoading] = useState<boolean>(false);

    useEffect(()=>{
        setPianoCtx(PianoRef.current?.getContext('2d')!);
        setPianoWhiteCtx(PianoWhiteRef.current?.getContext('2d')!);
        if(!loading){
        const Canvas = tracksRef.current
        const Effects = EffectsRef.current
        blocks && blocks.Update(Width,Height,KeysPositions,Canvas?.getContext('2d')!);
        !blocks && setBlocks(new Blocks(Canvas?.getContext('2d')!,Effects?.getContext('2d')!,Width,Height - Height/5,options,BlackNumbers,intervalSpeed,Speed,KeysPositions,(e:any)=>{drawPianoKeys(e)}));
        }
    },[intervalSpeed,Width,options,loading,Height]);

    const animate = () =>{
        if(!Player.isPaused){
            blocks?.render();
        }else if(Player.isReseting){
            blocks?.Reset();   
        }
        else{
            blocks?.Paused();
        }
        return requestAnimationFrame(animate)
    }

    const drawPianoKeys = (arr:Array<blockNote>) =>{
        arr.map(element =>{
            if(pianoCtx){
                const pos_x = KeysPositions[element.NoteNumber - 21].position;
                const pos_y = 0;
                const width = BlackNumbers.includes(element.NoteNumber) ? Width / 52 / 1.8 : Width / 52;
                const height = BlackNumbers.includes(element.NoteNumber) ? Height/5 / 1.6 : Height/5;
                if(element.wasDetected){
                    if(BlackNumbers.includes(element.NoteNumber)){
                        CanvasRoundRect(pianoCtx!,options.KeyPressColor,pos_x,pos_y,width+2,height+2,5);
                    }else{
                        CanvasRoundRect(pianoWhiteCtx!,options.KeyPressColor,pos_x,pos_y,width+0.5,height+1,5);
                    }
                    sound && sound.instrument.play(element.NoteNumber).stop(sound.ac.currentTime + element.duration/1000);
                }
                else{
                    if(BlackNumbers.includes(element.NoteNumber)){
                        pianoCtx?.clearRect(pos_x -1,pos_y -2,width +6,height +6);
                    }else{
                        pianoWhiteCtx?.clearRect(pos_x-0.2,pos_y,width+1.5,height+3);
                    }
                }
            }
            return null;
        })
    }

    useEffect(() => {
        let interval:any = 0;
        if(blocks){
            if(!blocks.isInterval){
                blocks.run();
                interval = animate();
            }
        }
        return () => {cancelAnimationFrame(interval)}
    }, [blocks])


    useEffect(() =>{
        blocks?.add(Data);
    },[Data])

    useEffect(()=>{
        const inter = setInterval(()=>{
            if(Player.isReady){
                setTimeout(()=>{loading && setLoading(false)},2500);
                setFinishedLoading(true)
                clearInterval(inter)
            }
        },500)
        return () => clearInterval(inter);
    },[])

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
            <Piano wh={window.innerHeight - window.innerHeight/5} WhiteKeyWidth={window.innerWidth / 52} height={window.innerHeight / 5} data={[]} sound={sound} />
            <canvas ref={PianoRef} width={Width} height={Height/5 + 5} style={{position:'absolute',zIndex:34,marginTop:window.innerHeight - window.innerHeight/5}} />
            <canvas ref={PianoWhiteRef} width={Width} height={Height/5 + 5} style={{position:'absolute',zIndex:32,marginTop:window.innerHeight - window.innerHeight/5}} />
            {loading && <LoadingScreen width={Width} onLoaded={()=>{Player.GetMidiAsObject()}} height={Height - Height/5} Finished={finishedLoading}/>}
        </div>
    )
}
