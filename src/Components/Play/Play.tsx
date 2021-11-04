import React,{useEffect,useState} from 'react';

import DrawPiano from '../DrawPiano/DrawPiano';
import PlayingManagement from '../PlayingManagement/PlayingManagement';
import MidiPlayer from '../../Helpers/MidiPlayer';
import { DefaultOptions } from '../../Utils/Default';
import { Options as OptionsType } from '../../Utils/TypesForOptions';
import { noteEvent } from "../../Utils/TypesForMidi";
import { ReadFromLocalStorageBase64 } from '../../Utils/smallFunctions';


export default function Play() {

    const [options,setOptions] = useState<OptionsType>(DefaultOptions);
    const [Player,setPlayer] = useState<MidiPlayer>();
    const [Events,setEvents] = useState<Array<noteEvent>>();

    useEffect(() => {
        const options = JSON.parse(localStorage.getItem('options')!);
        const file = ReadFromLocalStorageBase64('file');
        setOptions(options);
        setPlayer(new MidiPlayer(file,handleMidiEvent,10));
    }, []);

    const handleMidiEvent = (Events:Array<noteEvent>) =>{
        Events.length > 0 && setEvents(Events);
    }

    return (
        <div style={{overflow:'hidden'}}>
            {Player &&<DrawPiano drawSpeed={options.playSpeed} Player={Player} Data={Events} Speed={options.speed} options={options}/>}
            {Player && <PlayingManagement Player={Player} />}
        </div>
    )
}
