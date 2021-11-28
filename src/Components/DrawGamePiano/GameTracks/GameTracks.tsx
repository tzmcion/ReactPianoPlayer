import React,{ReactElement, useRef, useEffect, useState} from 'react';
import './Tracks.styles.css';

import { noteEvent, blockNote } from '../../../Utils/TypesForMidi';
import { Options as OptionsType } from '../../../Utils/TypesForOptions';
import Blocks from '../../../Helpers/Blocks/Blocks';
import MidiPlayer from '../../../Helpers/MidiPlayer';
import LoadingScreen from '../../DrawPiano/LoadingScreen/LoadingScreen';
import Piano from '../../DrawPiano/PianoKeys/AllKeys';
import { CanvasRoundRect } from '../../../Utils/CanvasFuntions';
import { useDispatch } from 'react-redux'

import BG from '../../../Assets/BG.jpg';
import rgbHex from 'rgb-hex';

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


export default function GameTracks({Data,Speed,Width,Height, BlackNumbers, KeysPositions,intervalSpeed,options,Player,sound}:TracksProps):ReactElement {

    const tracksRef = useRef<HTMLCanvasElement>(null);
    const EffectsRef = useRef<HTMLCanvasElement>(null);
    const GradeintRef = useRef<HTMLCanvasElement>(null);
    const PianoRef = useRef<HTMLCanvasElement>(null);
    const PianoWhiteRef = useRef<HTMLCanvasElement>(null);
    const requestRef = React.useRef<number>(0);
    const [pianoCtx,setPianoCtx] = useState<CanvasRenderingContext2D>();
    const [pianoWhiteCtx,setPianoWhiteCtx] = useState<CanvasRenderingContext2D>();
    const [blocks,setBlocks] = useState<Blocks>();
    const [loading,setLoading] = useState<boolean>(true);
    const [finishedLoading,setFinishedLoading] = useState<boolean>(false);

    const dispatch = useDispatch();

    useEffect(()=>{
        setPianoCtx(PianoRef.current?.getContext('2d')!);
        setPianoWhiteCtx(PianoWhiteRef.current?.getContext('2d')!);
        if(!loading){
            const Canvas = tracksRef.current
            const Effects = EffectsRef.current
            const Gradient = GradeintRef.current
            setBlocks(new Blocks(Canvas?.getContext('2d')!,Effects?.getContext('2d')!,Gradient?.getContext('2d')!,Width,Height - Height/5,options,BlackNumbers,intervalSpeed,Speed,KeysPositions,(e:any)=>{drawPianoKeys(e)},blocks ? blocks.getBlocks: [],increment,rgbHex(255,20,10)));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[intervalSpeed,Width,options,loading,Height]);

    const increment = (delta:number) =>{
        if(delta < 400 && delta > 200){
            dispatch({type:'meh'});
        }
        if(delta < 200 && delta > 100){
            dispatch({type:'ok'});
        }
        if(delta < 100 && delta > 50){
            dispatch({type:'good'});
        }
        if(delta < 50){
            dispatch({type:'perfect'});
        }
        if(delta > 400){
            dispatch({type:'cheat'});
        }
    }

    const animate = () =>{
        if(!Player.isPaused){
            blocks?.render();
        }else if(Player.isReseting){
            blocks?.Reset();   
        }
        else{
            blocks?.Paused();
        }
        requestRef.current =  requestAnimationFrame(animate)
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
                    options.soundOn && sound && sound.instrument.play(element.NoteNumber).stop(sound.ac.currentTime + element.duration/1000);
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
        if(blocks){
            if(!blocks.isInterval){
                blocks.run();
                animate();
            }
        }
        return () => {cancelAnimationFrame(requestRef.current)}
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blocks])


    useEffect(() =>{
        blocks?.add(Data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() =>{
        if(blocks){
        window.addEventListener('keydown',keyPressListeners);
        }
        return () =>{window.removeEventListener('keydown',keyPressListeners)}
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[blocks])

    const keyPressListeners = (event:any) =>{
        if(event.key === 'd' || event.key === 'k'){
            if(blocks){
                blocks.addKey({name:event.key,time:Date.now()})
            }
        }
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
            <canvas ref={GradeintRef} width={Width} height={Height - Height/5 + 50} className='Gradient'></canvas>
            </>}
            <div className='redFancyLine' style={{marginTop:Height - Height/5}} />
            <Piano wh={window.innerHeight - window.innerHeight/5} WhiteKeyWidth={window.innerWidth / 52} height={window.innerHeight / 5} data={[]} sound={sound} />
            <canvas ref={PianoRef} width={Width} height={Height/5 + 5} style={{position:'absolute',zIndex:34,marginTop:window.innerHeight - window.innerHeight/5}} />
            <canvas ref={PianoWhiteRef} width={Width} height={Height/5 + 5} style={{position:'absolute',zIndex:32,marginTop:window.innerHeight - window.innerHeight/5}} />
            {loading && <LoadingScreen width={Width} onLoaded={()=>{Player.GetMidiAsObject()}} height={Height - Height/5} Finished={finishedLoading}/>}
        </div>
    )
}
