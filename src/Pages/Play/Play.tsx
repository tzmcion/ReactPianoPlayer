import React,{useEffect,useState, useCallback} from 'react';

import UpdatedDrawPiano from '../../Components/DrawPiano/UpdatedDrawPiano';
import UpdatedPlayingManagement from '../../Components/PlayingManagement/UpdatedPlayingManagement';
import ReadMidiFile from '../../Helpers/ReadMidiFile';
import AnimationFrameMidiPlayer from '../../Helpers/MidiReader/AnimationFrameMidiPlayer';
import timeControl from '../../Helpers/MidiReader/timeSignatureValuesFromMidiFile';
import { ReadFromLocalStorageBase64 } from '../../Utils/smallFunctions';
import createNoteEvents from '../../Helpers/MidiReader/createNoteEvents';


/**
 * Component Play is a subpage to which the application routes when playing MIDI
 * It reads the MIDI file from the local storage, combines the MidiPlayer, and DrawPiano components
 * LAST UPDATE: 08/09/2025
 * @returns React Element
 */
export default function Play():React.ReactElement{
    const [player,setPlayer] = useState<AnimationFrameMidiPlayer>();
    //Dimensions of the website.
    const [width_height, set_width_height] = useState<{width:number, height:number}>({width:window.innerWidth, height:window.innerHeight}); 

    //Load the midi file from the storage, read it and then create a player
    useEffect(()=>{
        const MidiFile = ReadFromLocalStorageBase64("file")
        ReadMidiFile(MidiFile, 'ArrayBuffer').then((src_file) =>{
            const notes = createNoteEvents(src_file,timeControl(src_file),"first_event")
            setPlayer(new AnimationFrameMidiPlayer(notes));
        })
    },[])

    //Set hanlders for the resize of the website
    const resize_listener = useCallback(()=>{
        set_width_height({
            width: window.innerWidth,
            height: window.innerHeight
        })
    },[]);

    //Set handlers for the focus (user looking at the website) to automatically pause when switching pages
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

    //Set up the handlers, and clear the player when user quits the page (method clears the animationFrame)
    useEffect(()=>{
        if(player === undefined)return;
        window.addEventListener('resize', resize_listener);
        window.addEventListener('visibilitychange', focus_listener);
        return () => {
            player.clear_player()
            window.removeEventListener('resize', resize_listener);
            window.removeEventListener('visibilitychange', focus_listener);
        }
    },[player])

    //Page Renders the piano, if the width is to small, it renders "Screen Width to small"
    //Rendering the components to handle playing management, and component to handle the piano
    return (
        <div style={{overflow:'hidden', position:'relative'}}>
            <UpdatedDrawPiano width={width_height.width} height={width_height.height} Player={player} total_nr_of_keys={88} />
            {player && <UpdatedPlayingManagement Player={player}/>}
        </div>
    )
}
