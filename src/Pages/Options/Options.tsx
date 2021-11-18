import React,{useEffect,useState,useRef,ChangeEvent} from 'react'
import { useHistory } from 'react-router-dom';
import './Options.scss';

import AdvancedOptions from '../../Components/AdvancedOptions/AdvancedOptions';
import { DefaultOptions } from '../../Utils/Default';
import { Options as OptionsType } from '../../Utils/TypesForOptions';
import { blockNote, noteEvent } from '../../Utils/TypesForMidi';
import { CanvasRoundRect } from '../../Utils/CanvasFuntions';
import Blocks from '../../Helpers/Blocks/Blocks';
import AllKeys from '../../Components/DrawPiano/PianoKeys/AllKeys';

export default function Options() {

    const BlocksCanvas = useRef<HTMLCanvasElement>(null);
    const EffectsCanvas = useRef<HTMLCanvasElement>(null);
    const GradientCanvas = useRef<HTMLCanvasElement>(null);
    const PianoBlackCanvas = useRef<HTMLCanvasElement>(null);
    const PianoWhiteCanvas = useRef<HTMLCanvasElement>(null);
    const history = useHistory();
    const requestRef = React.useRef<number>(0);
    const [options,setOptions] = useState<OptionsType>(DefaultOptions);
    const [trigger,setTrigger] = useState<number>(0);
    const [blocks,setBlocks] = useState<Blocks>();
    const [width,setWidth] = useState<number>(window.innerWidth);
    const [height,setHeight] = useState<number>(window.innerHeight);

    const handleResize = ():void =>{
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }

    useEffect(() => {
        
        const Canvas = BlocksCanvas.current
        const Effects = EffectsCanvas.current
        const Gradient = GradientCanvas.current
        setBlocks(new Blocks(Canvas?.getContext('2d')!,Effects?.getContext('2d')!,Gradient?.getContext('2d')!,width,205,options,KeysPositions('black'),options.playSpeed,options.playSpeed,KeysPositions('all'),(e:any)=>{drawBlocks(e)},blocks ? blocks.getBlocks: []));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width,height,trigger]);

    useEffect(() => {
        window.addEventListener('resize',handleResize);
        return () =>{window.removeEventListener('resize',handleResize)}
    }, [])

    const animate = () =>{
        blocks?.render();
        requestRef.current =  requestAnimationFrame(animate)
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

    const addBlock = () => {
        const event:noteEvent = {
            Delta: 1200000,
            Duration: 550000,
            NoteNumber: Math.floor(Math.random() * 20 + 22),
            SoundDuration: 4200000,
            Velocity: 100
            }
        const event_duo:noteEvent = {
            Delta: 1200000,
            Duration: 550000,
            NoteNumber: Math.floor(Math.random() * 20 + 22),
            SoundDuration: 4200000,
            Velocity: 100
            }
        blocks?.add([event,event_duo]);
    }

    useEffect(() => {
        let interval:any = 0;
        if(blocks){
            interval = setInterval(addBlock,1500)
        }
        console.log(options);
        return () =>{clearInterval(interval)}
    }, [blocks])

    const drawBlocks = (arr:Array<blockNote>) =>{
        arr.map(element =>{
                const pianoCtx = PianoBlackCanvas.current?.getContext('2d');
                const pianoWhiteCtx = PianoWhiteCanvas.current?.getContext('2d');
                const pos_x = KeysPositions('all')[element.NoteNumber - 21].position;
                const pos_y = 0;
                const Width = KeysPositions('black').includes(element.NoteNumber) ? width / 52 / 1.8 : width / 52;
                const Height = KeysPositions('black').includes(element.NoteNumber) ? 100 / 1.6 : 100;
                if(element.wasDetected){
                    if(KeysPositions('black').includes(element.NoteNumber)){
                        CanvasRoundRect(pianoCtx!,options.KeyPressColor,pos_x,pos_y,Width+2,Height+4,5);
                    }else{
                        CanvasRoundRect(pianoWhiteCtx!,options.KeyPressColor,pos_x,pos_y,Width+0.5,Height+1,5);
                    }
                }
                else{
                    if(KeysPositions('black').includes(element.NoteNumber)){
                        pianoCtx?.clearRect(pos_x -1,pos_y -2,width +6,height +6);
                    }else{
                        pianoWhiteCtx?.clearRect(pos_x-0.2,pos_y,width+1.5,height+3);
                    }
                }
            
            return null;
        })
    }

    const KeysPositions = (type:('black' | 'all')):Array<any> =>{
        let Returning:Array<any> = [];
        let counter_ids:number = 21;
        for(let x = 0; x < 52; x++){
            type === 'all' && Returning.push({position: width/52 * x, noteNumber: counter_ids,width:width/52});
            const num = counter_ids % 12;
            if(num  === 1 - 1 || num === 3 - 1 || num === 6 - 1 || num ===8 - 1 || num ===10 - 1  ){
                counter_ids++;
                if(counter_ids < 109){
                type ==='all' && Returning.push({position : width/52 * x + width/52 / 1.4, notenumber: counter_ids,width:width/52/1.8});
                type === 'black' && Returning.push(counter_ids);
                }
            }
            counter_ids++;
        }
        return Returning;
    }

    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
        let currentOptions = options;
        switch(event.target.name){
            case 'color':
                currentOptions.Color = event.target.value;
                break;
            case 'RandomColors':
                currentOptions.RandomColors = !options.RandomColors;
                break;
            case 'IsEffects':
                currentOptions.IsEffects = !options.IsEffects;
                blocks?.Reset();
                break;
            case 'Image':
                currentOptions.backgroundImage = event.target.value;
                break;
            case 'speed':
                currentOptions.speed = parseInt(event.target.value);
                break;
            case 'playSpeed':
                currentOptions.playSpeed = parseInt(event.target.value);
                break;
            case 'watermark':
                currentOptions.watermark = !options.watermark;
                break;
            case 'soundOn':
                currentOptions.soundOn = !options.soundOn;
                break;
            case 'renderMethod':
                if(event.target.value === 'Interval' || event.target.value === 'animationFrame'){
                    currentOptions.renderMethod = event.target.value;
                }
                break;
            case 'KeyPressColor':
                currentOptions.KeyPressColor = event.target.value;
                break;
            case 'blockRadius':
                currentOptions.blockRadius = parseInt(event.target.value);
                break;
            case 'Effect':
                if(event.target.value === 'fountain' || event.target.value === 'dancingLines'){
                    currentOptions.Effect = event.target.value;
                    setOptions(currentOptions);
                    setTrigger(prev => prev + 1);
                }
                break;
            case 'shadowColor':
                currentOptions.ShadowColor = event.target.value;
                break;
            case 'blockShadowColor':
                currentOptions.blockShadowRadius = parseInt(event.target.value);
                break;
            case 'EffectsBlockColor':
                currentOptions.EffectsBlockColor = !currentOptions.EffectsBlockColor
                break;
            case 'EffectsKeyColor':
                currentOptions.EffectsKeyColor = !currentOptions.EffectsKeyColor;
                break;
            case 'randomEffectsColor':
                currentOptions.randomEffectColors = !currentOptions.randomEffectColors;
                break;
            case 'EffectsColor':
                currentOptions.EffectsColor = event.target.value;
                break;
            default:
                break;
        }
        setOptions(currentOptions);
        
    }

    return (
        <div className='Options_Container' style={{height: window.innerHeight - 60}}>
            <button className='goBack' onClick={()=>{localStorage.setItem('options',JSON.stringify(options)); history.push('/');}}> Save and Go back</button>
            <div className='data'>
                <AdvancedOptions className='AdvancedOptions' onChange={handleChange} defaultValues={DefaultOptions}/>
            </div>
            <div className='Previev'>
                <div className='container_pp'>
                <canvas ref={EffectsCanvas} width={width} height={300} className='EffectsPreviev CanvasPreviev'/>
                <canvas ref={BlocksCanvas} width={width} height={300} className='BlocksPreviev CanvasPreviev'/>
                <canvas ref={GradientCanvas} width={width} height={300} style={{top:-10}} className='GradientPreviev CanvasPreviev'/>
                <canvas ref={PianoBlackCanvas} width={width} height={100 + 5} style={{position:'absolute',zIndex:34,top:200}} className='PianoBlackPreviev PianoPreviev' />
                <canvas ref={PianoWhiteCanvas} width={width} height={100 + 5} style={{position:'absolute',zIndex:32,top:200}} className='PianoWhitePreview PianoPreviev' />
                <AllKeys wh={200} WhiteKeyWidth={width/52} data={[]} sound={null} height={100} />
                </div>
            </div>
        </div>
    )
}
