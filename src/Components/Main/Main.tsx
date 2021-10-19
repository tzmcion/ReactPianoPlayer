import React,{useRef,ChangeEvent, useState,useEffect, useCallback} from 'react';
import './Main.styles.css';

import MidiPlayer from '../../Helpers/MidiPlayer';
import InputFile from '../Inputfile/InputFile';
import DrawPiano from '../DrawPiano/DrawPiano';
import Options from '../Optons/Options';
import { Options as OptionsType } from '../../Utils/TypesForOptions';
import { noteEvent } from "../../Utils/TypesForMidi";

export default function Main() {

    const DefaultSpeed = useRef<number>(35);
    const MidiFileRef = useRef<HTMLInputElement>(null);
    const [Player,setPlayer] = useState<MidiPlayer>()
    const [Events,setEvents] = useState<Array<noteEvent>>();
    const [options,setOptions] = useState<OptionsType>({Color:'#FF5532',RandomColors:false,IsEffects:false});

    const handleMidiEvent = (Events:Array<noteEvent>) =>{
        Events.length > 0 && setEvents(Events);
    }

    const handleClick = useCallback(
        () => {
            Player && Player.isReady && Player.Play((ev:Array<noteEvent>)=>{handleMidiEvent(ev)});
        },
        [Player],
    )

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

    return (
        <div className='main'>
            {!Player && <InputFile FileRef={MidiFileRef} onFileUpload={()=>{setPlayer(new MidiPlayer(MidiFileRef))}} /> }
            {!Player && <Options handleOptionsChange={handleOptionsChange} options={options} />}
            {Player &&<DrawPiano Data={Events} Speed={DefaultSpeed.current} options={options}/>}
            <div className='PlayDiv'>
            </div>
        </div>
    )
}
