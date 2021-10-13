import React,{useRef, useState} from 'react';
import SoundFont from 'soundfont-player';
import './Main.styles.css';

import MidiPlayer from '../../Helpers/MidiPlayer';
import InputFile from '../Inputfile/InputFile';
import DrawPiano from '../DrawPiano/DrawPiano';
import { noteEvent } from "../../Utils/TypesForMidi";

export default function Main() {

    const DefaultSpeed = useRef<number>(45);
    const MidiFileRef = useRef<HTMLInputElement>(null);
    const [Player,setPlayer] = useState<MidiPlayer>()
    const [Events,setEvents] = useState<Array<noteEvent>>();


    const handleInput = () =>{
        setPlayer(new MidiPlayer(MidiFileRef));
        console.log('handling Input');
    }

    const handleMidiEvent = (Events:Array<noteEvent>,e:any,Acontext:any) =>{
        Events.length > 0 && setEvents(Events);
            Events.map(event =>{
                setTimeout(()=>{
                    try{
                    
                    e.play(event.NoteNumber,undefined,{gain: event.Velocity/127} ).stop(Acontext.currentTime + event.SoundDuration / 1000);
                }catch{e.play(event.NoteNumber,undefined,{gain: event.Velocity/127})}
                },5000/(100/DefaultSpeed.current));
                
                
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
            {/* <input type='file' ref={MidiFileRef} onInput={handleInput}/> */}
            {!Player && <InputFile FileRef={MidiFileRef} onFileUpload={handleInput} /> }
            {Player &&<DrawPiano Data={Events} Speed={DefaultSpeed.current}/>}
            <div className='PlayDiv'>
            <button onClick={handleClick} className='PlayButton'>Play!</button>
            </div>
        </div>
    )
}
