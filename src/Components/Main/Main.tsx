import React,{useRef, useState} from 'react';
import SoundFont from 'soundfont-player';
import './Main.styles.css';

import MidiPlayer from '../../Helpers/MidiPlayer';
//import InputFile from '../Inputfile/InputFile';
import DrawPiano from '../DrawPiano/DrawPiano';
import { noteEvent } from "../../Utils/TypesForMidi";

export default function Main() {

    const MidiFileRef = useRef<HTMLInputElement>(null);
    const [Player,setPlayer] = useState<MidiPlayer>()
    const [Events,setEvents] = useState<Array<noteEvent>>();


    const handleInput = () =>{
        setPlayer(new MidiPlayer(MidiFileRef));
    }

    const handleMidiEvent = (Events:Array<noteEvent>,e:any,Acontext:any) =>{
        Events.length > 0 && setEvents(Events);
            Events.map(event =>{
                setTimeout(()=>{
                    try{
                    
                    e.play(event.NoteNumber,undefined,{gain: event.Velocity/127} ).stop(Acontext.currentTime + event.SoundDuration / 1000);
                }catch{e.play(event.NoteNumber,undefined,{gain: event.Velocity/127})}
                },5000/5);
                
                
                return null;
            })
    }

    const handleClick = () =>{
        const Acontext = new AudioContext();
        SoundFont.instrument(Acontext,'acoustic_grand_piano').then(e =>{
            Player && Player.isReady && Player.Play((ev:Array<noteEvent>)=>{handleMidiEvent(ev,e,Acontext)});
        })
        
    }

    return (
        <div className='main'>
            <input type='file' ref={MidiFileRef} onInput={handleInput}/>
            <button onClick={handleClick}>Play!</button>
            {/* <InputFile /> */}
             <DrawPiano Data={Events}/>
        </div>
    )
}
