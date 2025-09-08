import React,{useEffect,useState, useCallback} from 'react';

import UpdatedDrawPiano from '../../Components/DrawPiano/UpdatedDrawPiano';
import UpdatedPlayingManagement from '../../Components/PlayingManagement/UpdatedPlayingManagement';
import ReadMidiFile from '../../Helpers/ReadMidiFile';
import AnimationFrameMidiPlayer from '../../Helpers/MidiReader/AnimationFrameMidiPlayer';
import timeControl from '../../Helpers/MidiReader/timeSignatureValuesFromMidiFile';
import { IMidiFile, noteEvent, TrackNoteEvent } from "../../Utils/TypesForMidi";
import { ReadFromLocalStorageBase64 } from '../../Utils/smallFunctions';
import createNoteEvents from '../../Helpers/MidiReader/createNoteEvents';


/**
 * Component Play is a subpage to which the application routes when playing MIDI
 * @returns React Element
 */
export default function Play():React.ReactElement{
    const [player,setPlayer] = useState<AnimationFrameMidiPlayer>();
    const [events,setEvents] = useState<TrackNoteEvent[]>([]);
    const [width_height, set_width_height] = useState<{width:number, height:number}>({width:window.innerWidth, height:window.innerHeight});

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

    const resize_listener = useCallback(()=>{
        set_width_height({
            width: window.innerWidth,
            height: window.innerHeight
        })
    },[]);

    const focus_listener = useCallback(()=>{
        if(player === undefined)return;
        if(document.visibilityState === "hidden"){
            if(player.isPlaying){
                player.pausePlay();
                player.isPausedByScript = true;
            }
        }
        if(document.visibilityState === "visible"){
            if(player.isPausedByScript === true){
                player.pausePlay();
                player.isPausedByScript = false;
            }
        }


    },[player]);

    useEffect(()=>{
        if(player){
            window.addEventListener('resize', resize_listener);
            window.addEventListener('visibilitychange', focus_listener);
            return () =>{
                window.removeEventListener('resize', resize_listener);
                window.removeEventListener('visibilitychange', focus_listener);
            }
        }
    },[player])


    return (
        <div style={{overflow:'hidden'}}>
            {width_height.width < 500 && <div className='WIDTH_INFO'><h3 className='jersey-10'>PLEASE ROTATE THE DEVICE, SCREEN WIDTH CURRENTLY IS TO SMALL TOO DISPLAY PIANO</h3></div>}
            <UpdatedDrawPiano width={width_height.width} height={width_height.height} events={events} Player={player} total_nr_of_keys={88} />
            {player && <UpdatedPlayingManagement Player={player}/>}
        </div>
    )
}
