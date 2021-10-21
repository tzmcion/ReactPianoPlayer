import React,{useRef,ChangeEvent, useState,useEffect, useCallback} from 'react';
import './Main.styles.css';

import MidiPlayer from '../../Helpers/MidiPlayer';
import InputFile from '../Inputfile/InputFile';
import DrawPiano from '../DrawPiano/DrawPiano';
import Options from '../Optons/Options';
import Footer from '../Footer/Footer';
import { Options as OptionsType } from '../../Utils/TypesForOptions';
import { noteEvent } from "../../Utils/TypesForMidi";
import { checkExtension } from '../../Utils/smallFunctions';

export default function Main() {

    const MidiFileRef = useRef<HTMLInputElement>(null);
    const [Player,setPlayer] = useState<MidiPlayer>();
    const [windowHeight,setWindowHeight] = useState<number>(window.innerHeight);
    const [Events,setEvents] = useState<Array<noteEvent>>();
    const [options,setOptions] = useState<OptionsType>({Color:'#e5e4e2',RandomColors:false,IsEffects:false, backgroundImage: '',speed:35, playSpeed:10, watermark:true});

    const handleMidiEvent = (Events:Array<noteEvent>) =>{
        Events.length > 0 && setEvents(Events);
    }

    const handleClick = useCallback(
        () => {
            Player && Player.isReady && Player.Play((ev:Array<noteEvent>)=>{handleMidiEvent(ev)});
        },
        [Player],
    )

    const handleFileInput = () =>{
        
        if(checkExtension(MidiFileRef.current?.files![0],'mid')){
            setPlayer(new MidiPlayer(MidiFileRef))
        }else{
            alert('Error, Submited file is not MIDI file...');
        }
    }

    const handleOptionsChange = (event:ChangeEvent<HTMLInputElement>) =>{
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
            default:
                break;
        }
        setOptions(currentOptions);
    }

    useEffect(()=>{
        document.addEventListener('keyup',(e)=>{
            if(e.key === ' ' || e.keyCode === 32){
                handleClick();
            }
        })
    },[handleClick])

    useEffect(()=>{
        document.querySelector('.mainDiv')!.scrollTo(0,0);
    },[Player])

    useEffect(()=>{
        window.addEventListener('resize',()=>{setWindowHeight(window.innerHeight)});
    },[])

    return (
        <div style={{height:windowHeight, overflowY: Player? 'hidden': 'scroll'}} className='mainDiv'>
            {!Player && <InputFile FileRef={MidiFileRef} onFileUpload={handleFileInput} /> }
            {!Player && <Options handleOptionsChange={handleOptionsChange} options={options} />}
            {Player &&<DrawPiano drawSpeed={options.playSpeed} Data={Events} Speed={options.speed} options={options}/>}
            {!Player && <Footer />}
        </div>
    )
}
