import React,{useRef, useState} from 'react';
import SoundFont from 'soundfont-player';
import './Main.styles.css';

import MidiPlayer from '../../Helpers/MidiPlayer';
//import InputFile from '../Inputfile/InputFile';
import DrawPiano from '../DrawPiano/DrawPiano';
import { MidiEventType } from "../../Utils/TypesForMidi";

export default function Main() {

    const MidiFileRef = useRef<HTMLInputElement>(null);
    const [Player,setPlayer] = useState<MidiPlayer>()
    const [Events,setEvents] = useState<Array<MidiEventType>>();

    const handleInput = () =>{
        setPlayer(new MidiPlayer(MidiFileRef));
    }

    const handleMidiEvent = (Events:Array<MidiEventType>,e:any,Acontext:any) =>{
        setEvents(Events);
            Events.map(event =>{
                if('noteOn' in event){
                    e.play(event.noteOn.noteNumber).stop(Acontext.currentTime + 0.5)
                }
                return null;
            })
    }

    const handleClick = () =>{
        const Acontext = new AudioContext();
        SoundFont.instrument(Acontext,'accordion').then(e =>{
            Player && Player.isReady && Player.Play((ev:Array<MidiEventType>)=>{handleMidiEvent(ev,e,Acontext)});
        })
        
    }

    return (
        <div>
            <input type='file' ref={MidiFileRef} onInput={handleInput}/>
            <button onClick={handleClick}>Play!</button>
            {/* <InputFile /> */}
            <DrawPiano Data={Events}/>
        </div>
    )
}
