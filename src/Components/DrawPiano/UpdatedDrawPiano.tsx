/**
 * Component Created during new ver creation for AVANT
 * Last Update: 07/29/2025
 * - Component is a refreshed version of "DrawPiano", which can handle new, not obesolete components
 * - Component now should be able to handle different height and width, not only fixed to window Size
 * - Moved Loading Screen Here
 * - Moved Watermark render Here
 */

import React, { useEffect, useState } from "react";
import AnimationFrameMidiPlayer from "../../Helpers/MidiReader/AnimationFrameMidiPlayer";
import { TrackNoteEvent } from "../../Utils/TypesForMidi";
import LoadingScreen from "./LoadingScreen/LoadingScreen";
import soundManagerClass from "../../Helpers/soundManager";
import { useSelector } from 'react-redux';
import { Options as OptionsType } from '../../Utils/TypesForOptions';
import './DrawPiano.styles.css'
import Tracks from '../../Components/Tracks/updatedTracks';


interface dr_props{
    width:number,
    height:number,
    Player:AnimationFrameMidiPlayer | undefined,
    events: TrackNoteEvent[],
    piano_keys_height?:number,
    total_nr_of_keys?: 88| 76 | 61 | 49 | 25
}


/**
 * Updated Version of Component "DrawPiano", which can handle different number of piano keys, different widths and heights of window for piano playing
 * @param param0 props
 * @returns React Element with piano inside
 */
export default function UpdatedDrawPiano({width,height,Player,events,piano_keys_height = 200,total_nr_of_keys=88}:dr_props):React.ReactElement{

    const nr_of_white_keys = total_nr_of_keys === 25 ? 15 : total_nr_of_keys === 49 ? 28 : total_nr_of_keys === 61 ? 36 : total_nr_of_keys === 76 ? 44 : 52;    //I don't believe I had to write this...
    const [is_loading,set_is_loading] = useState<boolean>(true);
    const [soundManager,setSoundManager] = useState<soundManagerClass>();
    const options = useSelector((state:{options:OptionsType}) => state.options);

    useEffect(()=>{
        if(Player && soundManager){
            soundManager.load_sounds().then(e => set_is_loading(false));
        }
    },[Player, soundManager])

    useEffect(()=>{
        if(Player){
            console.log(Player.MidiMaxVelocity)
            setSoundManager(new soundManagerClass(Player.MidiMaxVelocity * 50))
        }
    },[Player])

    const renderTracks = ():React.ReactElement =>{
        if(Player !== undefined && soundManager !== undefined){
            return <Tracks 
                Player={Player}
                events={events}
                height={height}
                width={width}
                number_of_white_keys={nr_of_white_keys}
                white_key_height={piano_keys_height}
                options={options}
                sound={soundManager}
                number_of_keys={total_nr_of_keys}
            />
        }
        return <></>
    }

    const renderWatermark = ():React.ReactElement => {
        if(options.watermark){
            return (
            <div className="Watermark">
                <h3>Some watermark</h3>
            </div>)
        }
        return <></>
    }


    return <div className="Piano" style={{width:width, height:height}}>
        <LoadingScreen Finished={!is_loading}/> {/*Loading Screen will automatically dissapear after it's work is done, so this will become an empty component*/}
        {renderTracks()}
        {renderWatermark()}
    </div>
}