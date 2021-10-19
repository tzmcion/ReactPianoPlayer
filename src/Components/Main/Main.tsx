import React,{useRef, useState,useEffect} from 'react';
import SoundFont from 'soundfont-player';
import './Main.styles.css';

import MidiPlayer from '../../Helpers/MidiPlayer';
import InputFile from '../Inputfile/InputFile';
import DrawPiano from '../DrawPiano/DrawPiano';
import { noteEvent } from "../../Utils/TypesForMidi";

export default function Main() {

    const DefaultSpeed = useRef<number>(40);
    const MidiFileRef = useRef<HTMLInputElement>(null);
    const [Player,setPlayer] = useState<MidiPlayer>()
    const [Events,setEvents] = useState<Array<noteEvent>>();


    const handleInput = () =>{
        setPlayer(new MidiPlayer(MidiFileRef));
        console.log('handling Input');
    }

    const handleClick = () =>{
        Player && Player.isReady && Player.Play((ev:Array<noteEvent>)=>{handleMidiEvent(ev)});
    }

    useEffect(()=>{
        document.addEventListener('keyup',(e)=>{
            if(e.key === ' ' || e.keyCode === 32){
                handleClick();
            }
        })
    },[handleClick])

    const handleMidiEvent = (Events:Array<noteEvent>) =>{
        Events.length > 0 && setEvents(Events);
    }

    return (
        <div className='main'>
            {!Player && <InputFile FileRef={MidiFileRef} onFileUpload={handleInput} /> }
            {Player &&<DrawPiano Data={Events} Speed={DefaultSpeed.current}/>}
            <div className='PlayDiv'>
            </div>
        </div>
    )
}
