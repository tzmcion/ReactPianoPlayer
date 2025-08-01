import React,{useEffect,useState} from 'react';

import DrawPiano from '../../Components/DrawPiano/DrawPiano';
import UpdatedDrawPiano from '../../Components/DrawPiano/UpdatedDrawPiano';
import UpdatedPlayingManagement from '../../Components/PlayingManagement/UpdatedPlayingManagement';
import ReadMidiFile from '../../Helpers/ReadMidiFile';
import PlayingManagement from '../../Components/PlayingManagement/PlayingManagement';
import MidiPlayer from '../../Helpers/MidiPlayer';
import AnimationFrameMidiPlayer from '../../Helpers/MidiReader/AnimationFrameMidiPlayer';
import timeControl from '../../Helpers/MidiReader/timeSignatureValuesFromMidiFile';
import { DefaultOptions } from '../../Utils/Default';
import { Options as OptionsType } from '../../Utils/TypesForOptions';
import { IMidiFile, noteEvent, TrackNoteEvent } from "../../Utils/TypesForMidi";
import { ReadFromLocalStorageBase64 } from '../../Utils/smallFunctions';
import createNoteEvents from '../../Helpers/MidiReader/createNoteEvents';

// export default function Play() {

//     const [options,setOptions] = useState<OptionsType>(DefaultOptions);
//     const [Player,setPlayer] = useState<MidiPlayer>();
//     const [Events,setEvents] = useState<Array<noteEvent>>();

//     useEffect(() => {
//         const options = JSON.parse(localStorage.getItem('options')!);
//         const file = ReadFromLocalStorageBase64('file');
//         setOptions(options);
//         setPlayer(new MidiPlayer(file,handleMidiEvent,25));
//     }, []);

//     useEffect(() => {
//         Player?.Restart();
//         console.log(Player)
//     }, [Player])

//     const handleMidiEvent = (Events:Array<noteEvent>) =>{
//         console.log(Events)
//         Events.length > 0 && setEvents(Events);
//     }

//     return (
//         <div style={{overflow:'hidden'}}>
//             {Player && <DrawPiano Player={Player} Data={Events} options={options}/>}
//             {Player && <PlayingManagement Player={Player} onStart={()=>{}} />}
//         </div>
//     )
// }

/**
 * Component Play is a subpage to which the application routes when playing MIDI
 * @returns React Element
 */
export default function Play():React.ReactElement{
    const [player,setPlayer] = useState<AnimationFrameMidiPlayer>();
    const [events,setEvents] = useState<TrackNoteEvent[]>([]);

    const handleMidiEvent = (Events:Array<TrackNoteEvent>) =>{
        Events.length > 0 && setEvents(Events);
    }

    useEffect(()=>{
        const MidiFile = ReadFromLocalStorageBase64("file")
        ReadMidiFile(MidiFile, 'ArrayBuffer').then((src_file) =>{
            const notes = createNoteEvents(src_file,timeControl(src_file),"first_event")
            setPlayer(new AnimationFrameMidiPlayer(notes,handleMidiEvent));
        })
    },[])

    useEffect(()=>{
        return () => {
            player && player.clear_player()
        }
    },[])

    return (
        <div style={{overflow:'hidden'}}>
            <UpdatedDrawPiano width={window.innerWidth} height={window.innerHeight} events={events} Player={player} total_nr_of_keys={88} />
            {player && <UpdatedPlayingManagement Player={player}/>}
        </div>
    )
}
