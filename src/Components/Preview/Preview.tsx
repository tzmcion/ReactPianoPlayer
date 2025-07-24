import React, {useState, useEffect} from 'react'
import './Preview.scss'

import DrawPiano from '../DrawPiano/DrawPiano'
import MidiPlayer from '../../Helpers/MidiPlayer'
import { noteEvent } from '../../Utils/TypesForMidi'
import { useSelector } from 'react-redux'
import { Options as OptionsType } from '../../Utils/TypesForOptions';
import { ReadFromLocalStorageBase64 } from '../../Utils/smallFunctions'

interface Preview_props{
    is_on:boolean
}

export default function Preview({is_on}:Preview_props):React.ReactElement {

    const [Events,setEvents] = useState<Array<noteEvent>>();
    const [Player,setPlayer] = useState<MidiPlayer>();
    const options = useSelector((state:{options:OptionsType}) => state.options);

    useEffect(() => {
        const file = ReadFromLocalStorageBase64('file');
        setPlayer(new MidiPlayer(file,handleMidiEvent,25));
    }, []);

    useEffect(() => {
        Player?.Restart();
        Player?.PausePlay();
    }, [Player])

    const handleMidiEvent = (Events:Array<noteEvent>) =>{
        Events.length > 0 && setEvents(Events);
    }

  return (
    <div className='Preview_Window'>
        <div className='Inside_Player'>
            {Player && <DrawPiano Player={Player} Data={Events} options={options}/>}
        </div>
    </div>
  )
}
