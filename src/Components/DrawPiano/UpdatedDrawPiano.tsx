/**
 * Component Created during new ver creation for AVANT
 * Last Update: 12/09/2025
 * - Component is a refreshed version of "DrawPiano", which can handle new, not obesolete components
 * - Component now should be able to handle different height and width, not only fixed to window Size
 * - Moved Loading Screen Here
 */

import React, {useEffect, useState } from "react";
import AnimationFrameMidiPlayer from "../../Helpers/MidiReader/AnimationFrameMidiPlayer";
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
    piano_keys_height?:number,
    total_nr_of_keys?: 88| 76 | 61 | 49 | 25
}


/**
 * Updated Version of Component "DrawPiano", which can handle different number of piano keys, different widths and heights of window for piano playing
 * @param param0 props
 * @returns React Element with piano inside
 */
export default function UpdatedDrawPiano({width,height,Player,piano_keys_height = 200,total_nr_of_keys=88}:dr_props):React.ReactElement{

    const nr_of_white_keys = total_nr_of_keys === 25 ? 15 : total_nr_of_keys === 49 ? 28 : total_nr_of_keys === 61 ? 36 : total_nr_of_keys === 76 ? 44 : 52;    //I don't believe I had to write this...
    const [is_loading,set_is_loading] = useState<boolean>(true);
    const [soundManager,setSoundManager] = useState<soundManagerClass | null>(null);
    const options = useSelector((state:{options:OptionsType}) => state.options);

    //If player and sounds are ready, then set the loading screen to dissapear
    useEffect(()=>{
        if(Player){
            if(options.soundOn === true){
                if(soundManager)soundManager.load_sounds().then(e => set_is_loading(false));
                return;
            }
            //else
            set_is_loading(false);
        }
    },[Player, soundManager])

    //When player is ready and maxvelocity can be deducted, create sound manager
    useEffect(()=>{
        if(Player && options.soundOn === true){
            setSoundManager(new soundManagerClass(Player.MidiMaxVelocity * 50))
        }
    },[Player])

    //Function renders the tracks only when player is defined, and sounds are defined (if sounds are on)
    const renderTracks = ():React.ReactElement =>{
        if(Player !== undefined && (soundManager !== undefined || options.soundOn === false)){
            return <Tracks 
                Player={Player}
                height={height}
                width={width}
                number_of_white_keys={nr_of_white_keys}
                options={options}
                sound={soundManager}
            />
        }
        return <></>
    }

    return <div className="Piano" style={{width:width, height:height}}>
        <LoadingScreen Finished={!is_loading}/> {/*Loading Screen will automatically dissapear after it's work is done, so this will become an empty component*/}
        {renderTracks()}
    </div>
}